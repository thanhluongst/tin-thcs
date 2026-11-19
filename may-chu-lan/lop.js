/* LỚP HỌC KIỂU "GIÁO VIÊN ĐIỀU KHIỂN" (khung Web_LopHoc_AI) cho mọi bài Tin học trong tin-thcs/.
   Đường dẫn:  /lop/<thư mục bài>/<MÃ BUỔI>/      → trang học sinh
               /lop/<thư mục bài>/<MÃ BUỔI>/gv    → trang giáo viên (điều khiển, chiếu, thống kê, trưng bày, bình chọn, khen)
               /lop/<thư mục bài>/<MÃ BUỔI>/api/… → cùng các lệnh như server.py của Web_LopHoc_AI
   Nội dung lấy nguyên từ bài: content.js (câu hỏi, đáp án, ghi bài) + index.html (đoạn đọc, hình của từng hoạt động). */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");

module.exports = function(ctx){
const {ROOT, DATA, roster, hsId, pinOK, send, body, MIME} = ctx;
const LOP = path.join(__dirname, "lop"), STORE = path.join(DATA, "lop");
/* Ảnh tóm tắt bài (thầy cô soạn sẵn): ../TomTatNDSGK/Anh_Tom_Tat_Tin_Hoc_<lớp>/Bai_<số>_….png */
const TOMTAT = path.resolve(ROOT, "..", "TomTatNDSGK");
function tomtatFile(lop, so){
  if (!lop || !so) return null;
  const d = path.join(TOMTAT, "Anh_Tom_Tat_Tin_Hoc_" + lop); let fs_ = [];
  try { fs_ = fs.readdirSync(d); } catch(e) { return null; }
  const want = String(so).toLowerCase().replace(/^(\d+)/, n => n.padStart(2, "0"));
  const f = fs_.find(x => new RegExp("^Bai_" + want + "_", "i").test(x) && /\.(png|jpe?g|webp)$/i.test(x));
  return f ? path.join(d, f) : null;
}
if (!fs.existsSync(STORE)) fs.mkdirSync(STORE, {recursive: true});

/* ---------- chuyển bài Tin học → STEPS của khung ---------- */
const CACHE = new Map();
/* Dự án STEM (tin-thcs/stem/<dự án>/index.html) → dạy trên LAN với mã bài "stem-<dự án>" */
const stemFile = dir => /^stem-/.test(dir) ? path.join(ROOT, "stem", dir.slice(5), "index.html") : null;
/* Bài Giáo dục AI 12 tiết (tin-thcs/ai-12-tiet/lan/<ai8-bai3>/noidung.js + mophong.js, chép từ Web_LopHoc_AI) */
const aiDir = dir => /^ai[6-9]-bai\d+$/.test(dir) ? path.join(ROOT, "ai-12-tiet", "lan", dir) : null;
const hasLesson = dir => { const ad = aiDir(dir); if (ad) return fs.existsSync(path.join(ad, "noidung.js")); const sf = stemFile(dir); return sf ? fs.existsSync(sf) : fs.existsSync(path.join(ROOT, dir, "content.js")); };
function aiLesson(dir){
  const d = aiDir(dir), fn = path.join(d, "noidung.js"), fm = path.join(d, "mophong.js");
  const mt = fs.statSync(fn).mtimeMs + fs.statSync(fm).mtimeMs, c = CACHE.get(dir); if (c && c.mt === mt) return c;
  const n = fs.readFileSync(fn, "utf8").replace(/\r/g, ""), m = fs.readFileSync(fm, "utf8").replace(/\r/g, "");
  const cut = (s, a, b) => { const i = s.indexOf(a); if (i < 0) return ""; const j = b ? s.indexOf(b, i) : -1; return s.slice(i, j < 0 ? undefined : j); };
  const bai = cut(n, "const BAI=", "\n"), steps = cut(n, "const STEPS=", "\nconst DECL"), ghi = cut(n, "const GHIBAI=", "\nfunction renderGhiBai"), qc = cut(n, "const QCODE=", "\nfunction lessonMeta");
  let sims = cut(m, "const SIMS={"); sims = "var SIMS_BAI=Object.assign(window.SIMS_BAI||{},{" + sims.slice(12).replace(/\};\s*$/, "});\n");
  const js = "/* Sinh tự động từ ai-12-tiet/lan/" + dir + " — không sửa tay */\nif(typeof document==='undefined'){window=this;}\n" +
    bai + "\nBAI.dir='" + dir + "';BAI.buoi=(typeof location!=='undefined'?location.pathname.split('/')[3]||'':'');BAI.demo=true;BAI.mon='Giáo dục AI';\n" + steps + "\n" + ghi + "\n" + qc + "\n" + sims;
  const lop = (bai.match(/lop:(\d)/) || [])[1] || "", so = (bai.match(/so:(\d+)/) || [])[1] || "";
  const out = {mt, js, lop, so}; CACHE.set(dir, out); return out;
}
/* gắn tiền tố .stemx cho mọi luật CSS để kiểu của trang STEM không đè giao diện lớp học */
function scopeCss(css){
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  let out = "", i = 0;
  while (i < css.length) {
    const o = css.indexOf("{", i); if (o < 0) break;
    const sel = css.slice(i, o).trim(); let d = 1, j = o + 1;
    while (j < css.length && d) { if (css[j] === "{") d++; else if (css[j] === "}") d--; j++; }
    const body = css.slice(o + 1, j - 1);
    if (/^@media|^@supports/.test(sel)) out += sel + "{" + scopeCss(body) + "}";
    else if (/^@/.test(sel)) out += sel + "{" + body + "}";
    else out += sel.split(",").map(x => { x = x.trim(); return /^(:root|html|body)$/.test(x) ? ".stemx" : ".stemx " + x.replace(/^(html|body)\s+/, ""); }).join(",") + "{" + body + "}";
    i = j;
  }
  return out;
}
function stemLesson(dir){
  const f = stemFile(dir), conv = path.join(LOP, "stemlan.js"), kc = path.join(ROOT, "stem", "khung.css");
  const mt = fs.statSync(f).mtimeMs + fs.statSync(conv).mtimeMs + fs.statSync(kc).mtimeMs;
  const c = CACHE.get(dir); if (c && c.mt === mt) return c;
  const html = fs.readFileSync(f, "utf8");
  const du = (html.match(/<script>\s*(window\.DU_AN\s*=[\s\S]*?)<\/script>/) || [])[1]; if (!du) throw new Error("Trang STEM không có window.DU_AN");
  const css = scopeCss(fs.readFileSync(kc, "utf8") + "\n" + (html.match(/<style>([\s\S]*?)<\/style>/g) || []).map(x => x.slice(7, -8)).join("\n"));
  const lop = (du.match(/lop:\s*(\d)/) || [])[1] || "", so = (du.match(/bai:\s*"([^"]*)"/) || [])[1] || "";
  const js = "/* Sinh tự động từ stem/" + dir.slice(5) + "/index.html + lop/stemlan.js — không sửa tay */\n" +
    "if(typeof document==='undefined'){window=this;}\n" +
    "const BAI=" + JSON.stringify({lop, so, ten: "", yccd: "", dir}) + ";BAI.buoi=(typeof location!=='undefined'?location.pathname.split('/')[3]||'':'');BAI.demo=true;\n" +
    du + "\n" + fs.readFileSync(conv, "utf8") + "\nvar STEPS=window.STEPS, GHIBAI=window.GHIBAI;\n" +
    "if(typeof document!=='undefined'){var _st=document.createElement('style');_st.textContent=" + JSON.stringify(css) + ";document.head.appendChild(_st);}\n";
  const out = {mt, js, lop, so}; CACHE.set(dir, out); return out;
}
function lesson(dir){
  if (aiDir(dir)) return aiLesson(dir);
  if (stemFile(dir)) return stemLesson(dir);
  const f = path.join(ROOT, dir, "content.js"), h = path.join(ROOT, dir, "index.html");
  const ovf = path.join(LOP, "bai", dir + ".js"), vdf = ["mp4", "webm"].map(x => path.join(ROOT, dir, "video", "khoi-dong." + x)).find(x => fs.existsSync(x)), mt = (vdf ? fs.statSync(vdf).mtimeMs : 0) + fs.statSync(f).mtimeMs + fs.statSync(h).mtimeMs + (fs.existsSync(ovf) ? fs.statSync(ovf).mtimeMs : 0);
  const c = CACHE.get(dir); if (c && c.mt === mt) return c;
  const sb = {window: {}, console}; vm.createContext(sb); vm.runInContext(fs.readFileSync(f, "utf8"), sb, {timeout: 2000});
  const L = sb.window.LESSON; if (!L) throw new Error("Bài không có window.LESSON");
  const html = fs.readFileSync(h, "utf8");
  /* Bài soạn lại riêng (lop/bai/<thư mục>.js): giữ dòng BAI, thay STEPS + GHIBAI + mô phỏng */
  const ov = path.join(LOP, "bai", dir + ".js"); let js = build(dir, L, html);
  if (fs.existsSync(ov)) js = js.split("\nconst STEPS=")[0] + "\nBAI.demo=true;\n" + fs.readFileSync(ov, "utf8");
  /* Video khởi động: <bài>/video/khoi-dong.mp4 (hoặc .webm) → đặt đầu phần tình huống của hoạt động đầu tiên */
  const vd = ["mp4", "webm"].map(x => "video/khoi-dong." + x).find(x => fs.existsSync(path.join(ROOT, dir, x)));
  if (vd) js += "\n;(function(){var s=STEPS[1]; if(!s) return; s.story='<figure class=\"vd-kd\" style=\"margin:0 0 12px\"><video src=\"/" + dir + "/" + vd + "\" controls preload=\"metadata\" playsinline style=\"width:100%;max-height:60vh;border-radius:12px;background:#000\"></video><figcaption class=\"hint\">🎬 Xem video tình huống</figcaption></figure>'+(s.story||'');})();\n";
  const out = {mt, js, lop: (dir.match(/^tin([6-9])-/) || [])[1] || "", so: (String(L.title || "").match(/Bài\s*(\d+[a-z]?)/i) || [, ""])[1]}; CACHE.set(dir, out); return out;
}
/* Phần đọc/hình của một hoạt động trong index.html (bỏ nhãn và chỗ đặt câu hỏi) */
function story(html, dir, a){
  const sel = a.tasks.length ? 'data-task="' + a.tasks[0] + '"' : 'data-concept="' + a.concept + '"';
  const k = html.indexOf(sel); if (k < 0) return "";
  const s = Math.max(html.lastIndexOf('<div class="act"', k), html.lastIndexOf('<div class="act ', k)); if (s < 0) return "";
  const ends = [html.indexOf('<div class="act"', k), html.indexOf('<div class="act ', k), html.indexOf("</section>", k)].filter(x => x > 0);
  let b = html.slice(html.indexOf(">", s) + 1, Math.min(...ends));
  b = b.replace(/<\/div>\s*(<!--[^>]*-->\s*)*$/, "")                       // thẻ đóng của khối hoạt động
    .replace(/<div class="act-tag">[\s\S]*?<\/div>/, "")
    .replace(/<div data-(task|concept)="[^"]*"[^>]*><\/div>/g, "")
    .replace(/<div class="ht-note">[\s\S]*?<\/div>/g, "")
    .replace(/(src|href)="(?!https?:|\/|#|data:)([^"]+)"/g, (m, at, u) => at + '="/' + dir + "/" + u + '"')
    .trim();
  return b;
}
const strip = s => String(s || "").replace(/<[^>]+>/g, "").trim();
function lis(b){ const m = String(b || "").match(/<li>[\s\S]*?<\/li>/g); return m ? m.map(x => x.slice(4, -5)) : (strip(b) ? [b] : []); }
function q(id, t){
  const base = {id, code: ""};
  if (t.type === "mcq") return Object.assign(base, {type: "single", q: t.q, opts: t.o, ok: t.a});
  if (t.type === "sort") { const cols = {}; t.cats.forEach((c, i) => cols["c" + i] = c);
    return Object.assign(base, {type: "sort", q: t.q, cols, items: t.items.map(([n, c]) => ({t: n, a: "c" + c}))}); }
  if (t.type === "match") return Object.assign(base, {type: "match", q: t.q, items: t.items.map(x => x[0]), opts: t.opts, ok: t.items.map(x => x[1] - 1)});
  if (t.type === "order") { const ks = t.start || Object.keys(t.items);
    return Object.assign(base, {type: "match", q: String(t.q).replace(/\s*\(dùng nút[^)]*\)/, "") + " (chọn thứ tự cho từng bước)",
      items: ks.map(k => t.items[k]), opts: ks.map((_, i) => "Bước " + (i + 1)), ok: ks.map(k => t.ans.indexOf(k))}); }
  return Object.assign(base, {type: "text", q: t.q, ans: strip(t.k) || "Thầy cô nhận xét."});
}
function build(dir, L, html){
  const lop = (dir.match(/^tin([6-9])-/) || [])[1] || "";
  const STEPS = [{t: "Chào mừng", k: "wel"}], muc = [];
  L.STAGES.forEach(st => st.acts.forEach(a => {
    const cpt = a.concept && L.CONCEPTS[a.concept];
    if (a.ghi) {   // mục "Ghi bài": vào vở khi thầy cô chốt hoạt động trước đó (phần Khởi động không ghi bài)
      if (cpt && !/khởi động|mở đầu/i.test(st.title) && st.id !== "mo-dau") muc.push({step: Math.max(1, STEPS.length - 1), h: a.title === "Ghi bài" ? st.title : a.title.replace(/^Ghi bài:\s*/, ""), it: lis(cpt.b)});
      return;
    }
    const s = {t: a.title, hd: (st.step || "") + " · " + st.code + " " + st.title, code: a.code || st.code, ic: "",
      story: story(html, dir, a) || "Em đọc câu hỏi và trả lời.", qs: a.tasks.filter(id => L.TASKS[id]).map(id => q(id, L.TASKS[id]))};
    if (cpt) s.key = [(cpt.t ? "<b>" + cpt.t + ":</b> " : "") + cpt.b];
    STEPS.push(s);
  }));
  STEPS.push({t: "Tổng kết", hd: "Tổng kết bài học", code: "", ic: "", story: "Cùng nhìn lại những điều đã học trong bài.",
    qs: [{id: "tk", type: "text", q: "Điều em nhớ nhất sau bài học hôm nay là gì?", ans: "Tự đánh giá, không chấm đúng sai.", code: ""}]});
  const title = String(L.title || dir), m = title.match(/^(Bài\s*\d+\.?)\s*(.*)$/i);
  const so = (title.match(/Bài\s*(\d+[a-z]?)/i) || [, ""])[1];
  const BAI = {lop, so, ten: title, yccd: "", dir};
  if (tomtatFile(lop, so)) BAI.tomtat = "/lop/" + dir + "/X/tomtat.png";
  const GHIBAI = {so: m ? m[1] : "", ten: (m ? m[2] : title).toUpperCase(), muc};
  return "/* Sinh tự động từ " + dir + "/content.js và index.html — không sửa tay */\n" +
    "const BAI=" + JSON.stringify(BAI) + ";BAI.buoi=(location.pathname.split('/')[3]||'');\n" +
    "const STEPS=" + JSON.stringify(STEPS) + ";\nconst GHIBAI=" + JSON.stringify(GHIBAI) + ";\n";
}

/* ---------- trạng thái từng phòng học (bài + buổi) ---------- */
const ROOMS = new Map();
const fresh = () => ({step: 0, open: true, reveal: false, board: null, vote: null, ov: null, timer: null, praise: [], votes: {}, students: {}, answers: {}, meta: null, ver: 0});
function room(dir, buoi){
  const k = dir + "__" + buoi; let r = ROOMS.get(k);
  if (!r) { let d = null; try { d = JSON.parse(fs.readFileSync(path.join(STORE, k + ".json"), "utf8")); } catch(e) {}
    r = {k, S: Object.assign(fresh(), d || {}), t: null}; ROOMS.set(k, r); }
  return r;
}
function persist(r){ clearTimeout(r.t); r.t = setTimeout(() => { const f = path.join(STORE, r.k + ".json"); fs.writeFileSync(f + ".tmp", JSON.stringify(r.S)); fs.renameSync(f + ".tmp", f); }, 300); }
const state = S => ({step: S.step, open: S.open, reveal: S.reveal, ver: S.ver, tuhoc: !!S.tuhoc, part: S.part || 0});
const isLocal = req => /^(127\.0\.0\.1|::1|::ffff:127\.0\.0\.1)$/.test(req.socket.remoteAddress || "");

function rosterClasses(){ const cl = {}; roster().forEach(h => { (cl[h.lop] = cl[h.lop] || []).push(h.ten); }); return cl; }

async function apiCall(req, res, r, p){
  const S = r.S;
  if (req.method === "GET") {
    if (p === "info") { const os = require("os"); return send(res, 200, JSON.stringify({ips: ctx.lanIps(), port: ctx.CFG.port})); }
    if (p === "roster") return send(res, 200, JSON.stringify({classes: rosterClasses(), taken: []}));
    if (p === "s") {
      const sid = new URL(req.url, "http://x").searchParams.get("id") || "";
      if (!S.students[sid]) return send(res, 200, JSON.stringify({unknown: true}));
      const o = state(S); o.board = S.reveal ? S.board : null; o.mine = S.answers[sid] || {}; o.vote = S.vote; o.ov = S.ov; o.timer = S.timer;
      o.myPraise = S.praise.filter(x => x.id === sid); o.myVote = (S.votes[String(S.step)] || {})[sid];
      return send(res, 200, JSON.stringify(o));
    }
    return send(res, 404, '{"err":"not found"}');
  }
  const b = JSON.parse(await body(req) || "{}");
  if (p === "join") {
    /* nhóm 1–4 bạn, mỗi bạn đã xác minh bằng số căn cước; cùng nhóm đăng nhập lại → cùng mã, bài cũ còn nguyên */
    const R = roster(), mem = [...new Set((b.cccds || []).map(x => String(x).replace(/\D/g, "")))].slice(0, 4);
    if (!mem.length) return send(res, 200, JSON.stringify({err: "Chưa có bạn nào trong nhóm."}));
    const hs = mem.map(c => R.get(c)); if (hs.some(x => !x)) return send(res, 200, JSON.stringify({err: "Có số căn cước không đúng. Em đăng nhập lại."}));
    const sid = "n" + crypto.createHash("sha256").update(hs.map(h => h.id).sort().join("|")).digest("hex").slice(0, 10);
    const may = String(b.may || "").slice(0, 10).trim();
    S.students[sid] = Object.assign(S.students[sid] || {}, {name: hs.map(h => h.ten).join(", "), members: hs.map(h => h.ten), cls: [...new Set(hs.map(h => h.lop))].join("+"), may,
      t: S.students[sid] ? S.students[sid].t : new Date().toLocaleTimeString("vi-VN"), ids: hs.map(h => h.id)});
    { const st = S.students[sid], nd = new Date().toLocaleDateString("vi-VN"); st.ngay = st.ngay || []; if (!st.ngay.includes(nd)) st.ngay.push(nd); }   /* chuyên cần */
    persist(r);
    return send(res, 200, JSON.stringify({id: sid, members: S.students[sid].members, cls: S.students[sid].cls}));
  }
  if (p === "ans") {
    const sid = b.id, st = String(b.step);
    if (!S.students[sid]) return send(res, 200, '{"ok":false,"unknown":true}');
    const tuhoc = S.tuhoc || /^TUHOC/.test(r.k.split("__")[1] || "");
    if (!tuhoc && (!S.open || S.reveal || st !== String(S.step))) return send(res, 200, '{"ok":false,"locked":true}');
    (S.answers[sid] = S.answers[sid] || {})[st] = b.a || {}; persist(r); return send(res, 200, '{"ok":true}');
  }
  if (p === "vote") {
    const sid = b.id, tg = b.target, v = S.vote;
    if (!S.students[sid] || !S.students[tg] || tg === sid || !v || v.closed || String(v.step) !== String(S.step)) return send(res, 200, '{"ok":false}');
    (S.votes[String(S.step)] = S.votes[String(S.step)] || {})[sid] = tg; persist(r); return send(res, 200, '{"ok":true}');
  }
  if (["t", "all", "reset", "roster", "meta"].includes(p)) {
    if (!isLocal(req)) { try { pinOK(b.pin); } catch(e) { return send(res, 403, '{"err":"forbidden"}'); } }
    if (p === "roster") return send(res, 200, JSON.stringify({ok: false, err: "Danh sách lớp sửa trong file du-lieu/danh-sach.csv (có số căn cước)."}));
    if (p === "meta") { S.meta = b.meta; persist(r); return send(res, 200, '{"ok":true}'); }
    if (p === "t") { ["step", "open", "reveal", "board", "vote", "ov", "praise", "timer", "tuhoc", "part"].forEach(k => { if (k in b) S[k] = b[k]; }); S.ver++; persist(r); return send(res, 200, JSON.stringify(state(S))); }
    if (p === "all") {
      /* mỗi ngày giáo viên mở lớp = một tiết: ghi lại để dạy tiếp tuần sau */
      const nd = new Date().toLocaleDateString("vi-VN"); S.tiet = S.tiet || [];
      if (!S.tiet.length || S.tiet[S.tiet.length - 1].ngay !== nd) { S.tiet.push({ngay: nd, tu: S.step}); persist(r); }
      const o = state(S); o.tiet = S.tiet; ["students", "answers", "votes", "praise", "vote", "ov", "timer"].forEach(k => o[k] = S[k]); return send(res, 200, JSON.stringify(o)); }
    if (p === "reset") { Object.assign(S, fresh(), {ver: S.ver + 1}); persist(r); return send(res, 200, JSON.stringify(state(S))); }
  }
  return send(res, 404, '{"err":"not found"}');
}

/* trả true nếu đã xử lí */
/* Các buổi (lớp) đã dạy một bài: để trang chủ cho "Dạy tiếp" */
function rooms(dir){
  const out = {};
  try { fs.readdirSync(STORE).forEach(f => { const m = f.match(/^(.+)__(.+)\.json$/); if (!m || m[1] !== dir) return; room(m[1], m[2]); }); } catch(e) {}
  ROOMS.forEach((r, k) => { const [d, buoi] = k.split("__"); if (d !== dir) return; const S = r.S, ids = Object.keys(S.students || {});
    if (!ids.length && !(S.tiet || []).length) return;
    out[buoi] = {buoi, step: S.step, may: ids.length, hs: ids.reduce((t, id) => t + ((S.students[id].members || []).length || 1), 0),
      nop: ids.filter(id => Object.keys(S.answers[id] || {}).length).length, tiet: S.tiet || [], tuhoc: !!S.tuhoc}; });
  let n = 0; try { const sb = {location: {pathname: "/"}, window: {}}; vm.createContext(sb); vm.runInContext(lesson(dir).js + ";this.n=STEPS.length", sb, {timeout: 1000}); n = sb.n - 1; } catch(e) {}
  return Object.values(out).map(x => Object.assign(x, {tong: n}));
}
const handle = async function(req, res, u){
  const m = u.pathname.match(/^\/lop\/([a-z0-9-]+)\/([A-Z0-9_.\-]+)\/(.*)$/);
  if (!m) { if (/^\/lop\/[a-z0-9-]+\/[A-Za-z0-9_.\-]+$/.test(u.pathname)) { res.writeHead(302, {Location: u.pathname.replace(/\/([^/]+)$/, (x, b) => "/" + b.toUpperCase() + "/")}); res.end(); return true; } return false; }
  const [, dir, buoi, rest] = m;
  if (!hasLesson(dir)) { send(res, 404, "Không có bài này", "text/plain; charset=utf-8"); return true; }
  if (rest.startsWith("api/")) { await apiCall(req, res, room(dir, buoi), rest.slice(4)); return true; }
  if (rest === "tomtat.png") { const L0 = lesson(dir), f = tomtatFile(L0.lop, L0.so);
    if (!f) { send(res, 404, "Chưa có ảnh tóm tắt", "text/plain; charset=utf-8"); return true; }
    send(res, 200, fs.readFileSync(f), MIME[path.extname(f).toLowerCase()] || "image/png"); return true; }
  if (rest === "noidung.js") { send(res, 200, lesson(dir).js, MIME[".js"]); return true; }
  const file = rest === "" ? "hocsinh.html" : rest === "gv" ? "giaovien.html" : rest;
  if (!/^[a-z]+\.(html|js|css)$/.test(file) || file.startsWith("_") || !fs.existsSync(path.join(LOP, file))) { send(res, 404, "Không tìm thấy", "text/plain; charset=utf-8"); return true; }
  send(res, 200, fs.readFileSync(path.join(LOP, file)), MIME[path.extname(file)]);
  return true;
};
handle.rooms = rooms;
/* Xoá phòng (tạo nhầm): không xoá hẳn, chuyển tệp vào du-lieu/lop/da-xoa/ để khôi phục được */
handle.del = function(dir, buoi){
  const k = dir + "__" + buoi, r = ROOMS.get(k); if (r) clearTimeout(r.t); ROOMS.delete(k);
  const f = path.join(STORE, k + ".json"); if (!fs.existsSync(f)) return false;
  const bin = path.join(STORE, "da-xoa"); if (!fs.existsSync(bin)) fs.mkdirSync(bin, {recursive: true});
  const d = new Date(), ts = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0") + "-" + String(d.getHours()).padStart(2, "0") + String(d.getMinutes()).padStart(2, "0");
  fs.renameSync(f, path.join(bin, k + "__xoa-" + ts + ".json")); return true;
};
/* Thống kê mọi phòng cho trang /thong-ke: chấm đúng/sai bằng keyedQs + isCorrect của lop/khung.js */
const KHUNG = (() => { const k = fs.readFileSync(path.join(LOP, "khung.js"), "utf8");
  return ["isCorrect", "keyedQs"].map(n => { const i = k.indexOf("function " + n + "("); let j = k.indexOf("\nfunction ", i + 1); return k.slice(i, j < 0 ? undefined : j); }).join("\n"); })();
function cham(dir){
  const sb = {location: {pathname: "/"}, window: {}}; vm.createContext(sb);
  vm.runInContext(lesson(dir).js + "\n" + KHUNG + ";this.K=STEPS.map((s,i)=>({i,t:s.t,qs:(s.qs||[]).map(q=>({id:q.id,q:String(q.q||'').replace(/<[^>]+>/g,''),k:keyedQs(s).includes(q)}))}));this.ok=(i,id,v)=>{const q=STEPS[i].qs.find(x=>x.id===id);return q?isCorrect(q,v):null;};this.ten=BAI.ten;", sb, {timeout: 2000});
  return sb;
}
handle.stats = function(){
  const out = [];
  let files = []; try { files = fs.readdirSync(STORE); } catch(e) {}
  files.forEach(f => { const m = f.match(/^(.+)__(.+).json$/); if (!m) return;
    const S = room(m[1], m[2]).S, sids = Object.keys(S.students || {}); if (!sids.length && !(S.tiet || []).length) return;
    let C; try { C = cham(m[1]); } catch(e) { return; }
    const cau = {};   /* "bước|câu" → {q, step, n, dung} */
    C.K.forEach(s => s.qs.forEach(q => { cau[s.i + "|" + q.id] = {step: s.i, hd: s.t, id: q.id, q: q.q.slice(0, 160), k: q.k, n: 0, dung: 0}; }));
    const nhom = sids.map(sid => { const st = S.students[sid], A = S.answers[sid] || {}; let nop = 0, dung = 0, cham_ = 0;
      Object.keys(A).forEach(i => Object.keys(A[i] || {}).forEach(id => { const v = A[i][id]; if (v === undefined || v === "" ) return; nop++;
        const c = cau[i + "|" + id]; if (c) c.n++; const ok = C.ok(Number(i), id, v); if (ok !== null) { cham_++; if (ok) { dung++; if (c) c.dung++; } } }));
      return {sid, ids: st.ids || [], ten: st.members || [st.name], may: st.may || "", ngay: st.ngay || [], nop, cham: cham_, dung,
        sao: (S.praise || []).filter(p => p.id === sid).reduce((t, p) => t + (p.stars || 0), 0),
        bc: Object.values(S.votes || {}).reduce((t, v) => t + Object.values(v).filter(x => x === sid).length, 0)}; });
    out.push({dir: m[1], buoi: m[2], ten: C.ten, tiet: (S.tiet || []).map(t => t.ngay), step: S.step, tong: C.K.length - 1, nhom, cau: Object.values(cau).filter(c => c.n || c.k)});
  });
  return out;
};
/* ---------- Giáo dục AI 12 tiết: đánh giá theo YCCĐ (mỗi câu có mã q.code) ---------- */
const aiBase = path.join(ROOT, "ai-12-tiet", "lan");
function chamAI(dir){
  const sb = {location: {pathname: "/"}, window: {}}; vm.createContext(sb);
  vm.runInContext(lesson(dir).js + "\n" + KHUNG + `;
    this.Q={}; this.codes=[]; STEPS.forEach((s,i)=>(s.qs||[]).forEach(q=>{ if(q.type==='sim'||!q.code) return; this.Q[i+'|'+q.id]={code:q.code,k:keyedQs(s).includes(q)}; if(!this.codes.includes(q.code)) this.codes.push(q.code); }));
    this.ok=(i,id,v)=>{const q=STEPS[i].qs.find(x=>x.id===id);return q?isCorrect(q,v):false;};
    this.B={lop:String(BAI.lop),so:String(BAI.so),ten:BAI.ten,yccd:String(BAI.yccd||'').split(/[·,;]/).map(x=>x.trim()).filter(Boolean),
      tiet:STEPS.some(s=>/Tiết 2/.test(s.hd||''))?2:1, n:STEPS.length-1};`, sb, {timeout: 2000});
  sb.B.codes = sb.B.yccd.concat(sb.codes.filter(c => !sb.B.yccd.includes(c)));
  return sb;
}
/* Danh mục bài AI đã cài (kể cả chưa dạy) */
handle.aiLessons = function(){
  let ds = []; try { ds = fs.readdirSync(aiBase).filter(d => /^ai[6-9]-bai\d+$/.test(d)); } catch(e) {}
  return ds.map(dir => { try { return Object.assign({dir}, chamAI(dir).B); } catch(e) { return null; } }).filter(Boolean)
    .sort((a, b) => a.lop - b.lop || a.so - b.so);
};
/* Mọi phòng AI: từng nhóm máy → số câu chấm / đúng / tự luận theo từng mã YCCĐ */
handle.aiStats = function(){
  const out = []; let files = []; try { files = fs.readdirSync(STORE); } catch(e) {}
  ROOMS.forEach((r, k) => { if (!files.includes(k + ".json")) files.push(k + ".json"); });   /* phòng vừa dạy, chưa kịp ghi đĩa */
  files.forEach(f => { const m = f.match(/^(ai[6-9]-bai\d+)__(.+)\.json$/); if (!m) return;
    const S = room(m[1], m[2]).S, sids = Object.keys(S.students || {}); if (!sids.length) return;
    let C; try { C = chamAI(m[1]); } catch(e) { return; }
    const nhom = sids.map(sid => { const st = S.students[sid], A = S.answers[sid] || {}, yc = {};
      Object.keys(A).forEach(i => Object.keys(A[i] || {}).forEach(id => { const v = A[i][id];
        if (v === undefined || v === null || v === "" || (typeof v === "object" && !Object.keys(v).length)) return;
        const q = C.Q[i + "|" + id]; if (!q) return; const o = yc[q.code] = yc[q.code] || {c: 0, d: 0, t: 0};
        if (q.k) { o.c++; if (C.ok(Number(i), id, v)) o.d++; } else o.t++; }));
      return {ids: st.ids || [], ten: st.members || [st.name], ngay: st.ngay || [], yc,
        sao: (S.praise || []).filter(p => p.id === sid).reduce((t, p) => t + (p.stars || 0), 0)}; });
    out.push({dir: m[1], buoi: m[2], lop: C.B.lop, so: C.B.so, ten: C.B.ten, tiet: (S.tiet || []).map(t => t.ngay), step: S.step, tong: C.B.n, nhom});
  });
  return out;
};
return handle;
};
