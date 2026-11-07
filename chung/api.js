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
function dLoad(){ let d; try { d = JSON.parse(localStorage.getItem(DEMO_KEY) || "null"); } catch(e) {} d = d || {}; d.bai = d.bai || {}; d.chot = d.chot || {}; d.nx = d.nx || {}; d.ban = d.ban || {}; return d; }
function dSave(d){ try { localStorage.setItem(DEMO_KEY, JSON.stringify(d)); } catch(e) {} }
function dPin(p){ if (String(p || "") !== DEMO_PIN) throw new Error("Sai mã giáo viên"); }
function dOpen(d, p){ if (!(d.chot[p.bai + "|" + p.buoi] || {})["ban." + p.task]) throw new Error("Thầy cô chưa mở phần xem bài của bạn cho câu này"); }
function dBan(d, p, to){ const k = p.bai + "|" + p.buoi + "|" + p.task + "|" + to; return d.ban[k] = d.ban[k] || {like: {}, cm: {}}; }
function dBanOf(d, bai, buoi, cid, withHidden){
  const out = {}, pre = bai + "|" + buoi + "|";
  Object.keys(d.ban).forEach(k => { if (k.indexOf(pre) !== 0) return; const [task, to] = k.slice(pre.length).split("|"); if (to !== cid) return;
    const r = d.ban[k], cm = Object.keys(r.cm).filter(f => withHidden || !r.cm[f][2]).map(f => withHidden ? {g: r.cm[f][0], t: r.cm[f][1], from: f, an: r.cm[f][2]} : {g: r.cm[f][0], t: r.cm[f][1]});
    const n = Object.keys(r.like).length; if (n || cm.length) out[task] = {n, cm}; });
  return out;
}
async function demoCall(action, p){
  await new Promise(r => setTimeout(r, 150));
  const d = dLoad();
  if (action === "submit") { d.bai[p.bai + "|" + p.buoi + "|" + p.clientId] = {bai: p.bai, buoi: p.buoi, clientId: p.clientId, group: p.group, t: Date.now(), data: p.data}; dSave(d); return {ok: true}; }
  if (action === "reveal") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}};
  if (action === "setReveal") { dPin(p.pin); d.chot[p.bai + "|" + p.buoi] = p.rev || {}; dSave(d); return {ok: true}; }
  if (action === "class") { dPin(p.pin); return {ok: true, docs: Object.values(d.bai).filter(x => x.bai === p.bai && x.buoi === p.buoi)
    .map(x => Object.assign({}, x, {nx: d.nx[p.bai + "|" + p.buoi + "|" + x.clientId] || {}, ban: dBanOf(d, p.bai, p.buoi, x.clientId, true)}))}; }
  if (action === "status") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}, nx: d.nx[p.bai + "|" + p.buoi + "|" + p.clientId] || {}, ban: dBanOf(d, p.bai, p.buoi, p.clientId, false)};
  if (action === "peers") { dOpen(d, p);
    return {ok: true, list: Object.values(d.bai).filter(x => x.bai === p.bai && x.buoi === p.buoi && x.data && x.data.sub && x.data.sub[p.task]).map(x => {
      const r = dBan(d, p, x.clientId), part = {};
      ["ans", "mcq", "sort", "match", "order", "sub"].forEach(f => { if (x.data[f] && x.data[f][p.task] != null) part[f] = {[p.task]: x.data[f][p.task]}; });
      return {cid: x.clientId, group: x.group, data: part, mine: x.clientId === p.clientId, n: Object.keys(r.like).length, liked: !!r.like[p.clientId],
        cm: Object.keys(r.cm).filter(f => !r.cm[f][2]).map(f => ({g: r.cm[f][0], t: r.cm[f][1], mine: f === p.clientId}))}; })}; }
  if (action === "react") { dOpen(d, p); if (p.clientId === p.to) throw new Error("Em không tự bình chọn bài của mình được");
    const r = dBan(d, p, p.to);
    if (p.like != null) { if (p.like) r.like[p.clientId] = 1; else delete r.like[p.clientId]; }
    if (p.text != null) { const t = String(p.text).trim().slice(0, 300); if (t) r.cm[p.clientId] = [p.group || "", t, 0]; else delete r.cm[p.clientId]; }
    dSave(d); return {ok: true, mine: {like: !!r.like[p.clientId], text: (r.cm[p.clientId] || [])[1] || ""}}; }
  if (action === "banHide") { dPin(p.pin); const r = dBan(d, p, p.to); if (r.cm[p.from]) r.cm[p.from][2] = p.hide ? 1 : 0; dSave(d); return {ok: true}; }
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

function newGs(e){ if (/Hành động không hợp lệ/i.test(e.message)) throw new Error("Cần dán Code.gs mới vào Apps Script và triển khai phiên bản mới (xem README)"); throw e; }

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
    .then(j => ({rev: j.rev || {}, nx: j.nx || {}, ban: j.ban || {}}))
    .catch(e => { if (/không hợp lệ/i.test(e.message)) return call("GET", "reveal", {bai, buoi}).then(j => ({rev: j.rev || {}, nx: {}, ban: {}})); throw e; }),
  setComment: (bai, buoi, pin, clientId, group, task, text) => call("POST", "comment", {bai, buoi, pin, clientId, group, task, text})
    .then(j => j.nx || null)
    .catch(e => { if (/Hành động không hợp lệ/i.test(e.message)) throw new Error("Cần cập nhật Code.gs trong Apps Script để lưu nhận xét (xem README)"); throw e; }),
  checkPin: pin => call("GET", "checkpin", {pin}),
  /* Bạn bè xem, thích, nhận xét bài của nhau (giáo viên mở từng câu bằng khoá "ban.<câu>" trong phần chốt) */
  getPeers: (bai, buoi, task, clientId) => call("GET", "peers", {bai, buoi, task, clientId}).then(j => j.list || []).catch(newGs),
  react: p => call("POST", "react", p).then(j => j.mine || {}).catch(newGs),
  banHide: (bai, buoi, pin, task, from, to, hide) => call("POST", "banHide", {bai, buoi, pin, task, from, to, hide}).catch(newGs),
  /* Thống kê theo bài cho trang mục lục. Gửi bằng POST để mã giáo viên không nằm trên đường link. */
  stats: pin => call("POST", "stats", {pin}).then(j => j.bai || [])
    .catch(e => { if (/Hành động không hợp lệ/i.test(e.message)) throw new Error("Cần dán Code.gs mới vào Apps Script và triển khai phiên bản mới (xem README)"); throw e; })
};
})();
