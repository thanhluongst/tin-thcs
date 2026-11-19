/* MÁY CHỦ LỚP HỌC QUA MẠNG NỘI BỘ (LAN) — chạy trên máy giáo viên, không cần Internet.
   - Phục vụ toàn bộ trang bài học trong thư mục tin-thcs/.
   - /api        : cùng các lệnh như Apps Script (nộp bài, chốt, nhận xét, thống kê…), lưu vào du-lieu/lop-hoc.json
   - /tin/...json: kênh tức thì kiểu Firebase (EventSource) — chốt, nhận xét, bài vừa nộp hiện ngay
   - /dn/...     : học sinh đăng nhập bằng số căn cước, xác minh họ tên rồi mới vào lớp
   Số căn cước CHỈ nằm trong du-lieu/danh-sach.csv trên máy này; không gửi đi đâu, không trả về trình duyệt.
   Chạy: node server.js   (hoặc bấm đúp chay-may-chu.bat) */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto"), os = require("os");

const ROOT = path.resolve(__dirname, "..");
const DATA = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(__dirname, "du-lieu");
const CFG = Object.assign({port: 8080, pin: "tin7"}, readJson(path.join(DATA, "cau-hinh.json")) || {});
if (process.env.PORT) CFG.port = Number(process.env.PORT);
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA, {recursive: true});

function readJson(f){ try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch(e) { return null; } }

/* ---------- bí mật để tạo mã học sinh từ số căn cước (không lưu số căn cước vào bài làm) ---------- */
const SECRET_F = path.join(DATA, ".bi-mat");
let SECRET = ""; try { SECRET = fs.readFileSync(SECRET_F, "utf8").trim(); } catch(e) {}
if (!SECRET) { SECRET = crypto.randomBytes(24).toString("hex"); fs.writeFileSync(SECRET_F, SECRET); }
const hsId = cccd => "hs-" + crypto.createHmac("sha256", SECRET).update(cccd).digest("hex").slice(0, 14);

/* ---------- danh sách lớp: du-lieu/danh-sach.csv (lop,cccd,ho_ten) ---------- */
let ROSTER = new Map(), rosterMtime = 0;
function roster(){
  const f = path.join(DATA, "danh-sach.csv");
  let st; try { st = fs.statSync(f); } catch(e) { return ROSTER; }
  if (st.mtimeMs === rosterMtime) return ROSTER;
  rosterMtime = st.mtimeMs; ROSTER = new Map();
  fs.readFileSync(f, "utf8").replace(/^﻿/, "").split(/\r?\n/).forEach((line, i) => {
    const c = line.split(/[,;\t]/).map(s => s.trim().replace(/^"|"$/g, ""));
    if (c.length < 3 || !/^\d{12}$/.test(c[1])) return;   // bỏ dòng tiêu đề / dòng sai
    ROSTER.set(c[1], {lop: c[0], ten: c.slice(2).join(" ").trim(), id: hsId(c[1])});
  });
  console.log("Đã đọc danh sách lớp: " + ROSTER.size + " học sinh");
  return ROSTER;
}

/* ---------- dữ liệu lớp học (cùng cấu trúc máy chủ thử trong chung/api.js) ---------- */
const DB_F = path.join(DATA, "lop-hoc.json");
const d = Object.assign({bai: {}, chot: {}, nx: {}, ban: {}, hot: {}, tk: {}, dn: [], dk: {}}, readJson(DB_F) || {});
let saveT = null;
function save(){ clearTimeout(saveT); saveT = setTimeout(saveNow, 400); }
function saveNow(){ clearTimeout(saveT); saveT = null; const tmp = DB_F + ".tmp"; fs.writeFileSync(tmp, JSON.stringify(d)); fs.renameSync(tmp, DB_F); }
setInterval(() => { try { fs.copyFileSync(DB_F, path.join(DATA, "sao-luu-" + new Date().toISOString().slice(0, 10) + ".json")); } catch(e) {} }, 10 * 60 * 1000);
["SIGINT", "SIGTERM"].forEach(s => process.on(s, () => { try { saveNow(); } catch(e) {} process.exit(0); }));

const DIEM_F = path.join(DATA, "diem-cong.json");
const DGAI_F = path.join(DATA, "danh-gia-ai.json");   /* Giáo dục AI: GV sửa Đạt/Chưa đạt, nhận xét từng em */   /* cấu hình điểm cộng + điểm giáo viên chỉnh tay */
const pinOK = p => { if (String(p || "") !== String(CFG.pin)) throw new Error("Sai mã giáo viên"); };
function dOpen(p){ if (!(d.chot[p.bai + "|" + p.buoi] || {})["ban." + p.task]) throw new Error("Thầy cô chưa mở phần xem bài của bạn cho câu này"); }
function dBan(p, to){ const k = p.bai + "|" + p.buoi + "|" + p.task + "|" + to; return d.ban[k] = d.ban[k] || {like: {}, cm: {}}; }
function dBanOf(bai, buoi, cid, withHidden){
  const out = {}, pre = bai + "|" + buoi + "|";
  Object.keys(d.ban).forEach(k => { if (k.indexOf(pre) !== 0) return; const [task, to] = k.slice(pre.length).split("|"); if (to !== cid) return;
    const r = d.ban[k], cm = Object.keys(r.cm).filter(f => withHidden || !r.cm[f][2]).map(f => withHidden ? {g: r.cm[f][0], t: r.cm[f][1], from: f, an: r.cm[f][2]} : {g: r.cm[f][0], t: r.cm[f][1]});
    const n = Object.keys(r.like).length; if (n || cm.length) out[task] = {n, cm}; });
  return out;
}
/* Mã học sinh "hs-…" chỉ dùng được khi kèm vé đăng nhập đúng của em đó (chống làm hộ / sửa bài bạn) */
function own(p){ if (/^hs-/.test(String(p.clientId || "")) && d.tk[p.tk] !== p.clientId) throw new Error("Phiên đăng nhập đã hết, em hãy đăng nhập lại"); }

function api(action, p){
  if (action === "ping") return {ok: true};
  /* Trang chủ giáo viên (/gv): địa chỉ máy này + danh sách bài có trang học sinh và trang giáo viên */
  if (action === "info") return {ok: true, ips: lanIps(), port: CFG.port};
  if (action === "baihoc") return {ok: true, list: baiHoc()};
  if (action === "xoaphong") { pinOK(p.pin); const dir = String(p.dir || ""), buoi = String(p.buoi || "");
    if (!/^[a-z0-9-]+$/.test(dir) || !/^[A-Z0-9_.\-]+$/.test(buoi)) throw new Error("Tên phòng không hợp lệ");
    return {ok: lopH().del(dir, buoi)}; }
  if (action === "phonghoc") { pinOK(p.pin); return {ok: true, list: lopH().rooms(String(p.dir || "").replace(/[^a-z0-9-]/g, ""))}; }
  if (action === "submit") { own(p);
    const k = p.bai + "|" + p.buoi + "|" + p.clientId, old = d.bai[k];
    d.bai[k] = {bai: p.bai, buoi: p.buoi, clientId: p.clientId, group: p.group, t: Date.now(), t0: old ? old.t0 || old.t : Date.now(), n: (old ? old.n || 1 : 0) + 1, data: p.data, cols: p.cols};
    save(); return {ok: true}; }
  if (action === "reveal") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}};
  if (action === "setReveal") { pinOK(p.pin); d.chot[p.bai + "|" + p.buoi] = p.rev || {}; d.hot[p.bai + "|" + p.buoi] = Date.now(); save();
    publish(ttPath(p.bai, p.buoi, "rev"), {t: Date.now(), rev: p.rev || {}}); return {ok: true}; }
  if (action === "class") { pinOK(p.pin); return {ok: true, docs: Object.values(d.bai).filter(x => x.bai === p.bai && x.buoi === p.buoi)
    .map(x => Object.assign({}, x, {nx: d.nx[p.bai + "|" + p.buoi + "|" + x.clientId] || {}, ban: dBanOf(p.bai, p.buoi, x.clientId, true)}))}; }
  if (action === "status") return {ok: true, rev: d.chot[p.bai + "|" + p.buoi] || {}, nx: d.nx[p.bai + "|" + p.buoi + "|" + p.clientId] || {}, ban: dBanOf(p.bai, p.buoi, p.clientId, false), hot: Date.now() - (d.hot[p.bai + "|" + p.buoi] || 0) < 180000};
  if (action === "peers") { dOpen(p);
    return {ok: true, list: Object.values(d.bai).filter(x => x.bai === p.bai && x.buoi === p.buoi && x.data && x.data.sub && x.data.sub[p.task]).map(x => {
      const r = dBan(p, x.clientId), part = {};
      ["ans", "mcq", "sort", "match", "order", "sub"].forEach(f => { if (x.data[f] && x.data[f][p.task] != null) part[f] = {[p.task]: x.data[f][p.task]}; });
      return {cid: x.clientId, group: x.group, data: part, mine: x.clientId === p.clientId, n: Object.keys(r.like).length, liked: !!r.like[p.clientId],
        cm: Object.keys(r.cm).filter(f => !r.cm[f][2]).map(f => ({g: r.cm[f][0], t: r.cm[f][1], mine: f === p.clientId}))}; })}; }
  if (action === "react") { own(p); dOpen(p); if (p.clientId === p.to) throw new Error("Em không tự bình chọn bài của mình được");
    const r = dBan(p, p.to);
    if (p.like != null) { if (p.like) r.like[p.clientId] = 1; else delete r.like[p.clientId]; }
    if (p.text != null) { const t = String(p.text).trim().slice(0, 300); if (t) r.cm[p.clientId] = [p.group || "", t, 0]; else delete r.cm[p.clientId]; }
    save(); return {ok: true, mine: {like: !!r.like[p.clientId], text: (r.cm[p.clientId] || [])[1] || ""}}; }
  if (action === "banHide") { pinOK(p.pin); const r = dBan(p, p.to); if (r.cm[p.from]) r.cm[p.from][2] = p.hide ? 1 : 0; save(); return {ok: true}; }
  if (action === "comment") { pinOK(p.pin); const k = p.bai + "|" + p.buoi + "|" + p.clientId; const nx = d.nx[k] || {};
    const t = String(p.text || "").trim(); if (t) nx[p.task] = t; else delete nx[p.task]; d.nx[k] = nx; d.hot[p.bai + "|" + p.buoi] = Date.now(); save();
    publish(ttPath(p.bai, p.buoi, "hs/" + p.clientId), {t: Date.now(), nx}); return {ok: true, nx}; }
  /* Trang thống kê (/thong-ke): mọi phòng lớp học + danh sách (chỉ tên, lớp, mã hs — không có số căn cước) */
  if (action === "thongke") { pinOK(p.pin); const hs = []; roster().forEach(h => hs.push({id: h.id, ten: h.ten, lop: h.lop}));
    return {ok: true, phong: lopH().stats(), hs, diem: readJson(DIEM_F) || {}}; }
  /* Giáo dục AI 12 tiết: số liệu theo YCCĐ + đánh giá, nhận xét GV (du-lieu/danh-gia-ai.json) */
  if (action === "thongkeAI") { pinOK(p.pin); const hs = []; roster().forEach(h => hs.push({id: h.id, ten: h.ten, lop: h.lop}));
    return {ok: true, hs, bai: lopH().aiLessons(), phong: lopH().aiStats(), dg: readJson(DGAI_F) || {}}; }
  if (action === "luuDanhGiaAI") { pinOK(p.pin); const o = readJson(DGAI_F) || {}; o.sua = o.sua || {}; o.nx = o.nx || {}; o.truong = o.truong || {};
    Object.entries(p.sua || {}).forEach(([k, v]) => { if (v === "D" || v === "C") o.sua[k] = v; else delete o.sua[k]; });
    Object.entries(p.nx || {}).forEach(([k, v]) => { v = String(v || "").slice(0, 300); if (v) o.nx[k] = v; else delete o.nx[k]; });
    if (p.truong) Object.assign(o.truong, p.truong);
    fs.writeFileSync(DGAI_F, JSON.stringify(o, null, 1)); return {ok: true, dg: o}; }
  if (action === "luuDiem") { pinOK(p.pin); const o = readJson(DIEM_F) || {}; if (p.cfg) o.cfg = p.cfg; if (p.chinh) o.chinh = Object.assign(o.chinh || {}, p.chinh);
    Object.keys(o.chinh || {}).forEach(k => { if (o.chinh[k] === "" || o.chinh[k] == null) delete o.chinh[k]; });
    fs.writeFileSync(DIEM_F, JSON.stringify(o, null, 1)); return {ok: true, diem: o}; }
  if (action === "checkpin") { pinOK(p.pin); return {ok: true}; }
  /* Mở lại bài đã làm (mọi bài, không chỉ STEM): đăng nhập lại / đổi máy vẫn làm tiếp */
  if (action === "load") { own(p);
    const x = d.bai[p.bai + "|" + p.buoi + "|" + p.clientId]; return x ? {ok: true, found: true, group: x.group, t: x.t, data: x.data} : {ok: true, found: false}; }
  if (action === "stats") { pinOK(p.pin); const by = {};
    Object.values(d.bai).forEach(x => { const s = by[x.bai] = by[x.bai] || {bai: x.bai, cau: 0, nop: 0, tong: 0, du: 0, last: 0, m: {}};
      const n = Object.keys((x.data && x.data.sub) || {}).filter(k => x.data.sub[k]).length;
      const b = s.m[x.buoi] = s.m[x.buoi] || {ma: x.buoi, nhom: 0, tong: 0, du: 0, dau: x.t, cuoi: 0};
      b.nhom++; b.tong += n; b.dau = Math.min(b.dau, x.t); b.cuoi = Math.max(b.cuoi, x.t);
      s.nop++; s.tong += n; s.last = Math.max(s.last, x.t || 0); });
    return {ok: true, bai: Object.values(by).map(s => { s.buoi = Object.values(s.m).sort((a, b) => b.cuoi - a.cuoi); delete s.m; return s; })}; }
  if (action === "ver") { if (p.hot) d.hot[p.bai + "|" + p.buoi] = Date.now(); let v = 0; Object.values(d.bai).forEach(x => { if (x.bai === p.bai && x.buoi === p.buoi) v = Math.max(v, x.t || 0); }); return {ok: true, v: String(v)}; }
  if (action === "hocsinh") { pinOK(p.pin);
    return {ok: true, hs: Object.values(d.bai).map(x => { const cols = x.cols || [], nx = d.nx[x.bai + "|" + x.buoi + "|" + x.clientId] || {};
      let dung = 0, sai = 0; cols.forEach(c => { const s = String(c[1] || ""); if (/^\(nháp\)/.test(s)) return; if (/✓\s*$/.test(s)) dung++; else if (/✗\s*$/.test(s)) sai++; });
      return [x.bai, x.buoi, x.group || "", x.clientId, x.t || 0, Object.keys((x.data && x.data.sub) || {}).filter(k => x.data.sub[k]).length,
        dung, sai, Object.keys(nx).filter(k => k.indexOf("like.") === 0 && nx[k]).length, cols.length]; })}; }
  /* Giáo viên điều khiển: học sinh chỉ thấy tới hoạt động thầy cô đang chiếu */
  if (action === "dieukhien") { pinOK(p.pin); const v = Object.assign({t: Date.now()}, p.dk || {}); d.dk[p.bai + "|" + p.buoi] = v; save();
    publish(ttPath(p.bai, p.buoi, "dk"), v); return {ok: true, dk: v}; }
  if (action === "dk") return {ok: true, dk: d.dk[p.bai + "|" + p.buoi] || null};
  /* Nhật kí đăng nhập (giờ vào lớp, đổi máy) cho giáo viên */
  if (action === "dangnhap") { pinOK(p.pin); return {ok: true, list: d.dn.slice(-500)}; }
  throw new Error("Hành động không hợp lệ");
}

/* ---------- kênh tức thì kiểu Firebase REST: GET (EventSource) / PUT trên /<đường>.json ---------- */
const ttKey = s => String(s).replace(/[.#$\[\]\/]/g, "_");
const ttPath = (bai, buoi, rest) => "tin/" + ttKey(bai) + "/" + ttKey(buoi) + "/" + rest;
const TT = new Map(), SUBS = new Map();
Object.keys(d.dk).forEach(k => { const [bai, buoi] = k.split("|"); TT.set(ttPath(bai, buoi, "dk"), d.dk[k]); });
function publish(p, v){
  TT.set(p, v);
  (SUBS.get(p) || new Set()).forEach(res => res.write("event: put\ndata: " + JSON.stringify({path: "/", data: v}) + "\n\n"));
}
setInterval(() => SUBS.forEach(set => set.forEach(res => res.write("event: keep-alive\ndata: null\n\n"))), 25000);

/* ---------- đăng nhập bằng số căn cước ---------- */
const FAIL = new Map();   // ip → [thời điểm nhập sai]
function tooMany(ip){ const now = Date.now(), a = (FAIL.get(ip) || []).filter(t => now - t < 5 * 60000); FAIL.set(ip, a); return a.length >= 8; }
function dn(action, p, ip){
  const cccd = String(p.cccd || "").replace(/\D/g, "");
  if (tooMany(ip)) throw new Error("Em nhập sai nhiều lần. Đợi 5 phút hoặc nhờ thầy cô giúp.");
  if (!/^\d{12}$/.test(cccd)) throw new Error("Số căn cước gồm đúng 12 chữ số.");
  const hs = roster().get(cccd);
  if (!hs) { FAIL.get(ip).push(Date.now()); throw new Error("Không tìm thấy số căn cước này trong danh sách lớp. Em kiểm tra lại từng số."); }
  if (action === "tra") return {ok: true, ten: hs.ten, lop: hs.lop};
  if (action === "vao") {
    const tk = crypto.randomBytes(18).toString("base64url");
    Object.keys(d.tk).forEach(k => { if (d.tk[k] === hs.id && p.cu === k) delete d.tk[k]; });
    d.tk[tk] = hs.id;
    d.dn.push({t: Date.now(), id: hs.id, ten: hs.ten, lop: hs.lop, ip, buoi: String(p.buoi || "")});
    save();
    return {ok: true, id: hs.id, ten: hs.ten, lop: hs.lop, tk};
  }
  throw new Error("Hành động không hợp lệ");
}

function lanIps(){
  const all = Object.values(os.networkInterfaces()).flat().filter(a => a && a.family === "IPv4" && !a.internal).map(a => a.address);
  /* card mạng ảo (VirtualBox, VMware, Hyper-V…) hay dùng .1 ở cuối: xếp sau */
  return all.sort((a, b) => (/\.1$/.test(a) ? 1 : 0) - (/\.1$/.test(b) ? 1 : 0));
}
function baiHoc(){
  /* 4 dự án STEM (stem/<dự án>/index.html) dạy trên LAN với mã "stem-<dự án>" */
  const stem = []; try { fs.readdirSync(path.join(ROOT, "stem"), {withFileTypes: true}).forEach(e => { const f = path.join(ROOT, "stem", e.name, "index.html");
    if (!e.isDirectory() || !fs.existsSync(f)) return; const h = fs.readFileSync(f, "utf8"), g = re => (h.match(re) || [])[1] || "";
    stem.push({dir: "stem-" + e.name, title: g(/<title>([^<]*)</), lop: g(/lop:\s*(\d)/), so: g(/bai:\s*"([^"]*)"/), ten: g(/\bten:\s*"([^"]*)"/), bieu: g(/bieuTuong:\s*"([^"]*)"/), lop2: true, demo: true, stem: true}); }); } catch(x) {}
  /* Bài Giáo dục AI 12 tiết (ai-12-tiet/lan/ai<lớp>-bai<n>/) */
  try { fs.readdirSync(path.join(ROOT, "ai-12-tiet", "lan"), {withFileTypes: true}).forEach(e => { const f = path.join(ROOT, "ai-12-tiet", "lan", e.name, "noidung.js");
    if (!e.isDirectory() || !/^ai[6-9]-bai\d+$/.test(e.name) || !fs.existsSync(f)) return; const h = fs.readFileSync(f, "utf8"), g = re => (h.match(re) || [])[1] || "";
    stem.push({dir: e.name, title: "Giáo dục AI " + g(/lop:(\d)/) + " · Bài " + g(/so:(\d+)/), lop: g(/lop:(\d)/), so: "AI" + g(/so:(\d+)/), ten: g(/ten:'([^']*)'/), bieu: "🤖", lop2: true, demo: true, ai: true}); }); } catch(x) {}
  return stem.concat(fs.readdirSync(ROOT, {withFileTypes: true}).filter(e => e.isDirectory() && !e.name.startsWith(".")
      && fs.existsSync(path.join(ROOT, e.name, "index.html")) && fs.existsSync(path.join(ROOT, e.name, "giaovien.html")))
    .map(e => {
      let t = e.name; try { const m = fs.readFileSync(path.join(ROOT, e.name, "index.html"), "utf8").match(/<title>([^<]*)<\/title>/i); if (m) t = m[1].trim(); } catch(x) {}
      const lop = (e.name.match(/^tin([6-9])-/) || [])[1] || "";
      let so = "", ten = t;
      try { const m = fs.readFileSync(path.join(ROOT, e.name, "content.js"), "utf8").match(/title:\s*"Bài\s*(\d+[a-z]?)\.?\s*([^"]*)"/i); if (m) { so = m[1]; ten = m[2]; } } catch(x) {}
      return {dir: e.name, title: t, lop, so, ten, lop2: fs.existsSync(path.join(ROOT, e.name, "content.js")), demo: fs.existsSync(path.join(__dirname, "lop", "bai", e.name + ".js"))};
    })).sort((a, b) => (a.lop || "z").localeCompare(b.lop || "z") || (parseInt(a.so) || 99) - (parseInt(b.so) || 99) || a.so.localeCompare(b.so) || a.title.localeCompare(b.title, "vi"));
}

/* ---------- trang tĩnh ---------- */
const MIME = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp", ".gif": "image/gif", ".ico": "image/x-icon",
  ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".webm": "video/webm", ".vtt": "text/vtt; charset=utf-8", ".woff2": "font/woff2", ".pdf": "application/pdf"};
/* config.js riêng cho chế độ LAN: API và kênh tức thì đều về máy này; trang học sinh nạp phần đăng nhập */
const LAN_CONFIG = `window.APP_CONFIG = {API_URL: location.origin + "/api", FIREBASE_URL: location.origin, LAN: true};
(function(){ try { var v = JSON.parse(localStorage.getItem("lan-hs") || "null"); if (v && v.id && v.tk) window.LAN_HS = v; } catch(e) {}
  document.write('<script src="/may-chu-lan/dieu-khien.js?v=1" defer></scr' + 'ipt>');
  if (!/giaovien\\.html$/.test(location.pathname) && document.querySelector("#hs-name")) document.write('<script src="/may-chu-lan/dang-nhap.js?v=2"><\\/script>'); })();`;
/* Tắt bộ nhớ đệm ngoại tuyến (sw.js) khi chạy LAN để trang luôn lấy bản mới từ máy giáo viên */
const NO_SW = `self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.registration.unregister()));`;

function send(res, code, body, type){ res.writeHead(code, {"Content-Type": type || "application/json; charset=utf-8", "Cache-Control": "no-store"}); res.end(body); }
function body(req){ return new Promise((ok, no) => { let s = ""; req.on("data", c => { s += c; if (s.length > 2e6) { no(new Error("Dữ liệu quá lớn")); req.destroy(); } }); req.on("end", () => ok(s)); }); }

let LOPH = null;   /* lớp học kiểu giáo viên điều khiển (lop.js) */
const lopH = () => LOPH || (LOPH = require("./lop.js")({ROOT, DATA, roster, hsId, pinOK, send, body, MIME, lanIps, CFG}));
http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://x"), ip = (req.socket.remoteAddress || "").replace(/^::ffff:/, "");
  try {
    if (u.pathname.startsWith("/lop/")) {
      if (await lopH()(req, res, u)) return;
    }
    if (u.pathname === "/api") {
      const p = req.method === "POST" ? JSON.parse(await body(req) || "{}") : Object.fromEntries(u.searchParams);
      const action = p.action; delete p.action;
      return send(res, 200, JSON.stringify(api(action, p)));
    }
    if (u.pathname.startsWith("/dn/") && req.method === "POST") return send(res, 200, JSON.stringify(dn(u.pathname.slice(4), JSON.parse(await body(req) || "{}"), ip)));
    if (u.pathname.startsWith("/tin/") && u.pathname.endsWith(".json")) {
      const p = decodeURIComponent(u.pathname.slice(1, -5));
      if (req.method === "PUT") {
        /* máy trình duyệt chỉ được báo "vừa nộp"; chốt / nhận xét do máy chủ tự đẩy sau khi kiểm tra mã giáo viên */
        if (!/\/nop$/.test(p)) return send(res, 403, "null");
        publish(p, JSON.parse(await body(req) || "null")); return send(res, 200, "null");
      }
      res.writeHead(200, {"Content-Type": "text/event-stream", "Cache-Control": "no-store", "Connection": "keep-alive"});
      res.write("event: put\ndata: " + JSON.stringify({path: "/", data: TT.has(p) ? TT.get(p) : null}) + "\n\n");
      if (!SUBS.has(p)) SUBS.set(p, new Set()); SUBS.get(p).add(res);
      req.on("close", () => { const s = SUBS.get(p); if (s) { s.delete(res); if (!s.size) SUBS.delete(p); } });
      return;
    }
    if (u.pathname === "/gv" || u.pathname === "/gv/") { u.pathname = "/may-chu-lan/trang-chu.html"; }
    if (u.pathname === "/thong-ke" || u.pathname === "/thong-ke/") { u.pathname = "/may-chu-lan/thong-ke.html"; }
    if (u.pathname === "/chung/config.js") return send(res, 200, LAN_CONFIG, MIME[".js"]);
    if (u.pathname === "/sw.js") return send(res, 200, NO_SW, MIME[".js"]);
    let f = path.normalize(path.join(ROOT, decodeURIComponent(u.pathname)));
    if (!f.startsWith(ROOT) || /[\\/]may-chu-lan[\\/]du-lieu/.test(f) || /[\\/]\./.test(f.slice(ROOT.length))) return send(res, 403, "Không được phép", "text/plain; charset=utf-8");
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
      if (!u.pathname.endsWith("/")) { res.writeHead(302, {Location: u.pathname + "/" + u.search}); return res.end(); }
      f = path.join(f, "index.html");
    }
    if (!fs.existsSync(f)) return send(res, 404, "Không tìm thấy", "text/plain; charset=utf-8");
    /* Range: trình duyệt tua video/âm thanh (bắt buộc với .mp4) */
    const type = MIME[path.extname(f).toLowerCase()] || "application/octet-stream", size = fs.statSync(f).size;
    const rg = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
    if (rg && size) {
      let a = rg[1] === "" ? Math.max(0, size - Number(rg[2])) : Number(rg[1]), b = rg[1] !== "" && rg[2] !== "" ? Math.min(Number(rg[2]), size - 1) : size - 1;
      if (a > b || a >= size) { res.writeHead(416, {"Content-Range": "bytes */" + size}); return res.end(); }
      res.writeHead(206, {"Content-Type": type, "Content-Range": "bytes " + a + "-" + b + "/" + size, "Accept-Ranges": "bytes", "Content-Length": b - a + 1, "Cache-Control": "no-cache"});
      return fs.createReadStream(f, {start: a, end: b}).pipe(res);
    }
    res.writeHead(200, {"Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes", "Cache-Control": "no-cache"});
    fs.createReadStream(f).pipe(res);
  } catch(e) {
    send(res, 200, JSON.stringify({ok: false, error: e.message || String(e)}));
  }
}).on("error", e => {
  if (e.code === "EADDRINUSE") console.log("\nCổng " + CFG.port + " đang bận: máy chủ lớp học có thể ĐANG CHẠY ở một cửa sổ khác.\nĐóng cửa sổ đó (hoặc đổi \"port\" trong du-lieu/cau-hinh.json) rồi chạy lại.\n");
  else console.log("Lỗi máy chủ: " + e.message);
  process.exit(1);
}).listen(CFG.port, "0.0.0.0", () => {
  roster();
  const ips = lanIps();
  console.log("\nMÁY CHỦ LỚP HỌC ĐANG CHẠY — giữ cửa sổ này mở trong suốt giờ học.");
  ips.forEach(ip => console.log("  Học sinh mở:  http://" + ip + ":" + CFG.port + "/"));
  console.log("  Máy giáo viên: http://localhost:" + CFG.port + "/");
  console.log("  Mã giáo viên: xem du-lieu/cau-hinh.json (mặc định tin7). Bấm Ctrl+C để tắt.\n");
});
