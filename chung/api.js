/* Kết nối với Google Apps Script (Google Sheets).
   Khi config.js chưa có API_URL, trang chạy CHẾ ĐỘ THỬ: "máy chủ" giả nằm trong trình duyệt,
   mở trang học sinh và trang giáo viên trên cùng một máy để thử quy trình. Mã giáo viên thử: tin7 */
(function(){
"use strict";
const cfg = window.APP_CONFIG || {};
const URL_API = String(cfg.API_URL || "").trim();
const demo = !URL_API;
const fake = demo || URL_API === "demo:";   // "demo:" = thử quy trình trực tuyến bằng máy chủ giả trong trình duyệt
const TIMEOUT = 20000;

function normSession(s){
  return String(s || "").trim().toUpperCase().replace(/\s+/g, "-").replace(/[^A-Z0-9_.\-]/g, "").slice(0, 40);
}

async function request(method, params, body){
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    let res;
    if (method === "GET") res = await fetch(URL_API + "?" + new URLSearchParams(params).toString(), {signal: ctrl.signal});
    else res = await fetch(URL_API, {method: "POST", body: JSON.stringify(body), signal: ctrl.signal}); // text/plain: không cần preflight CORS
    if (!res.ok) throw new Error("Máy chủ trả lỗi " + res.status);
    const j = await res.json();
    if (!j || j.ok !== true) throw new Error((j && j.error) || "Phản hồi không hợp lệ");
    return j;
  } catch (e) {
    if (e.name === "AbortError") throw new Error("Hết thời gian chờ mạng");
    if (e instanceof TypeError) throw new Error("Không kết nối được máy chủ");
    throw e;
  } finally { clearTimeout(timer); }
}

/* ---------- Máy chủ giả cho chế độ thử ---------- */
const DEMO_KEY = "demo-server-v1", DEMO_PIN = "tin7";
function dLoad(){ let d; try { d = JSON.parse(localStorage.getItem(DEMO_KEY) || "null"); } catch(e) {} d = d || {}; d.bai = d.bai || {}; d.chot = d.chot || {}; d.nx = d.nx || {}; return d; }
function dSave(d){ try { localStorage.setItem(DEMO_KEY, JSON.stringify(d)); } catch(e) {} }
function dPin(p){ if (String(p || "") !== DEMO_PIN) throw new Error("Sai mã giáo viên"); }
async function demoCall(action, p){
  await new Promise(r => setTimeout(r, 150));
  const d = dLoad();
  if (action === "submit") { d.bai[p.bai + "|" + p.buoi + "|" + p.clientId] = {bai: p.bai, buoi: p.buoi, clientId: p.clientId, group: p.group, t: Date.now(), data: p.data}; dSave(d); return {ok: true}; }
  if (action === "reveal") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}};
  if (action === "setReveal") { dPin(p.pin); d.chot[p.bai + "|" + p.buoi] = p.rev || {}; dSave(d); return {ok: true}; }
  if (action === "class") { dPin(p.pin); return {ok: true, docs: Object.values(d.bai).filter(x => x.bai === p.bai && x.buoi === p.buoi)
    .map(x => Object.assign({}, x, {nx: d.nx[p.bai + "|" + p.buoi + "|" + x.clientId] || {}}))}; }
  if (action === "status") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}, nx: d.nx[p.bai + "|" + p.buoi + "|" + p.clientId] || {}};
  if (action === "comment") { dPin(p.pin); const k = p.bai + "|" + p.buoi + "|" + p.clientId; const nx = d.nx[k] || {};
    const t = String(p.text || "").trim(); if (t) nx[p.task] = t; else delete nx[p.task]; d.nx[k] = nx; dSave(d); return {ok: true, nx}; }
  if (action === "checkpin") { dPin(p.pin); return {ok: true}; }
  if (action === "stats") { dPin(p.pin); const by = {};
    Object.values(d.bai).forEach(x => { const s = by[x.bai] = by[x.bai] || {bai: x.bai, cau: 0, nop: 0, tong: 0, du: 0, last: 0, m: {}};
      const n = Object.keys((x.data && x.data.sub) || {}).filter(k => x.data.sub[k]).length;
      const b = s.m[x.buoi] = s.m[x.buoi] || {ma: x.buoi, nhom: 0, tong: 0, du: 0, dau: x.t, cuoi: 0};
      b.nhom++; b.tong += n; b.dau = Math.min(b.dau, x.t); b.cuoi = Math.max(b.cuoi, x.t);
      s.nop++; s.tong += n; s.last = Math.max(s.last, x.t || 0); });
    return {ok: true, bai: Object.values(by).map(s => { s.buoi = Object.values(s.m).sort((a, b) => b.cuoi - a.cuoi); delete s.m; return s; })}; }
  throw new Error("Hành động không hợp lệ");
}

function call(method, action, payload){
  if (fake) return demoCall(action, payload);
  return method === "GET" ? request("GET", Object.assign({action}, payload)) : request("POST", null, Object.assign({action}, payload));
}

window.API = {
  demo, normSession,
  submit: p => call("POST", "submit", p),
  getReveal: (bai, buoi) => call("GET", "reveal", {bai, buoi}).then(j => j.rev || {}),
  setReveal: (bai, buoi, pin, rev) => call("POST", "setReveal", {bai, buoi, pin, rev}),
  getClass: (bai, buoi, pin) => call("GET", "class", {bai, buoi, pin}).then(j => j.docs || []),
  /* Phần chốt + nhận xét của giáo viên cho máy này. Code.gs cũ chưa có "status" thì chỉ lấy phần chốt. */
  getStatus: (bai, buoi, clientId) => call("GET", "status", {bai, buoi, clientId})
    .then(j => ({rev: j.rev || {}, nx: j.nx || {}}))
    .catch(e => { if (/không hợp lệ/i.test(e.message)) return call("GET", "reveal", {bai, buoi}).then(j => ({rev: j.rev || {}, nx: {}})); throw e; }),
  setComment: (bai, buoi, pin, clientId, group, task, text) => call("POST", "comment", {bai, buoi, pin, clientId, group, task, text})
    .then(j => j.nx || null)
    .catch(e => { if (/Hành động không hợp lệ/i.test(e.message)) throw new Error("Cần cập nhật Code.gs trong Apps Script để lưu nhận xét (xem README)"); throw e; }),
  checkPin: pin => call("GET", "checkpin", {pin}),
  /* Thống kê theo bài cho trang mục lục. Gửi bằng POST để mã giáo viên không nằm trên đường link. */
  stats: pin => call("POST", "stats", {pin}).then(j => j.bai || [])
    .catch(e => { if (/Hành động không hợp lệ/i.test(e.message)) throw new Error("Cần dán Code.gs mới vào Apps Script và triển khai phiên bản mới (xem README)"); throw e; })
};
})();
