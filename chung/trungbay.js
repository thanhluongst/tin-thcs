/* TRƯNG BÀY BÀI NHÓM: màn hình lớn cho máy chiếu để cả lớp xem, so sánh, nhận xét bài của các nhóm.
   - Theo câu: bài của mọi nhóm cho một câu, xếp lưới; bấm một bài để phóng to (← → sang nhóm khác).
   - Theo nhóm: toàn bộ bài của một nhóm (khi nhóm lên trình bày).
   - "Ẩn tên nhóm": hiện "Bài 1, Bài 2…" để cả lớp nhận xét khách quan.
   Đúng / chưa đúng chỉ hiện ở câu đã chốt. Có số tim bạn bè và dấu thầy cô khen nếu có.
   Phím: ← → chuyển câu / nhóm (hoặc bài khi đang phóng to), G gọi ngẫu nhiên, + − cỡ chữ, F toàn màn hình, Esc thu nhỏ / đóng.
   🎲 Gọi ngẫu nhiên: tên các nhóm chạy như vòng quay rồi dừng ở một bài (ưu tiên bài đã nộp), bài đó phóng to để sửa;
   không gọi lại bài đã gọi cho tới khi gọi hết một vòng. Trên bài phóng to, thầy cô gõ nhận xét sửa bài và bấm khen
   (khi trang truyền vào comment / like).
   Dùng: TrungBay.open({docs, rev, hearts, liked, task, view, getComment, comment, like}) — docs() trả mảng bài {key, name, ans, sub, mcq, sort, match, order}. */
(function(){
"use strict";
const L = window.LESSON;
if (!L) return;
const {TASKS, TASK_IDS, grade, esc} = L;
const LET = L.L || ["A", "B", "C", "D", "E", "F"];
function el(tag, attrs, html){ const e = document.createElement(tag); if (attrs) for (const a in attrs) e.setAttribute(a, attrs[a]); if (html != null) e.innerHTML = html; return e; }
function store(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e) { return null; } }
const HEART = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';

/* câu theo đúng tiến trình bài học, kèm số thứ tự trong hoạt động */
const QS = [];
L.STAGES.forEach(st => st.acts.forEach(a => a.tasks.forEach((t, i) => { if (TASKS[t]) QS.push({id: t, code: a.code, n: i + 1, act: a.title}); })));
TASK_IDS.forEach(t => { if (!QS.some(q => q.id === t)) QS.push({id: t, code: "", n: 0, act: ""}); });

const FS_KEY = "trungbay-fs", FS_MIN = 14, FS_MAX = 44;
let called = {}, rolling = false, spotDoc = null, spotId = "";
let box, body, opt = {}, view = "cau", qi = 0, gi = 0, spot = -1, anon = store("trungbay-an") === "1", fs = Number(store(FS_KEY)) || 22, timer = null, sig = "", lastFocus = null;

function answer(id, d){
  const t = TASKS[id];
  if (t.type === "open") { const s = ((d.ans || {})[id] || "").trim(); return s ? esc(s) : ""; }
  if (t.type === "mcq") { const i = (d.mcq || {})[id]; return i == null ? "" : "<b>" + LET[i] + ".</b> " + esc(t.o[i]); }
  const g = grade(id, d); return g && g.text ? esc(g.text) : "";
}
function docs(){ try { return (opt.docs ? opt.docs() : []).filter(Boolean); } catch(e) { return []; } }
const nameOf = (d, i) => anon ? "Bài " + (i + 1) : (d.name || "(chưa có tên)");
function badges(id, d){
  let h = "";
  const sub = !!(d.sub && d.sub[id]);
  if (!sub) h += '<span class="chip draft">Chưa nộp</span>';
  else if (opt.rev && opt.rev(id) && TASKS[id].type !== "open") { const g = grade(id, d); if (g) h += g.ok ? '<span class="chip ok">Đúng</span>' : '<span class="chip bad">Chưa đúng</span>'; }
  const n = opt.hearts ? opt.hearts(id, d) : 0;
  if (n) h += '<span class="chip heart-n" title="Số bạn thả tim">' + HEART + n + "</span>";
  if (opt.liked && opt.liked(id, d)) h += '<span class="chip like" title="Thầy cô khen">★ Thầy cô khen</span>';
  if (called[id] && called[id].has(d.key)) h += '<span class="chip called" title="Đã gọi lên sửa bài">🎲 Đã gọi</span>';
  return h;
}

function build(){
  box = el("div", {class: "chieu tbay", role: "dialog", "aria-modal": "true", "aria-label": "Trưng bày bài nhóm", hidden: ""});
  box.innerHTML =
    '<div class="chieu-top"><span class="chieu-bai"></span><span class="chieu-part"></span><span class="chieu-n"></span></div>' +
    '<div class="chieu-body"><div class="tb-page"></div></div>' +
    '<div class="chieu-bar">' +
      '<span class="tb-seg" role="group" aria-label="Cách xem"><button class="btn" type="button" data-k="cau">Theo câu</button><button class="btn" type="button" data-k="nhom">Theo nhóm</button></span>' +
      '<button class="btn" type="button" data-k="prev">← Trước</button>' +
      '<select class="tb-sel" aria-label="Chọn câu hoặc nhóm"></select>' +
      '<button class="btn primary" type="button" data-k="next">Tiếp →</button>' +
      '<button class="btn tb-pick" type="button" data-k="pick" title="Chọn ngẫu nhiên một bài để cả lớp cùng sửa">🎲 Gọi ngẫu nhiên</button>' +
      '<span class="chieu-sp"></span>' +
      '<button class="btn" type="button" data-k="anon" aria-pressed="false">Ẩn tên nhóm</button>' +
      '<button class="btn" type="button" data-k="minus" aria-label="Chữ nhỏ hơn">A−</button>' +
      '<button class="btn" type="button" data-k="plus" aria-label="Chữ to hơn">A+</button>' +
      '<button class="btn" type="button" data-k="full">Toàn màn hình</button>' +
      '<button class="btn" type="button" data-k="close">Đóng ✕</button>' +
    "</div>";
  box.querySelector(".chieu-bai").textContent = L.title;
  body = box.querySelector(".tb-page");
  box.addEventListener("click", e => {
    const card = e.target.closest("[data-spot]");
    if (card) { spot = Number(card.dataset.spot); render(true); return; }
    if (e.target.closest("[data-unspot]")) { spot = -1; render(true); return; }
    const fx = e.target.closest("[data-fix]"); if (fx) { fix(fx.dataset.fix); return; }
    const b = e.target.closest("[data-k]"); if (!b) return;
    const k = b.dataset.k;
    if (k === "cau" || k === "nhom") { view = k; spot = -1; render(true); }
    else if (k === "prev") step(-1); else if (k === "next") step(1);
    else if (k === "pick") pick();
    else if (k === "anon") { anon = !anon; store("trungbay-an", anon ? "1" : "0"); render(true); }
    else if (k === "minus") size(-2); else if (k === "plus") size(2);
    else if (k === "full") { try { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen(); } catch(err) {} }
    else if (k === "close") close();
  });
  box.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.matches("[data-spot]")) { e.preventDefault(); e.target.click(); }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && e.target.matches(".tb-fix textarea")) { e.preventDefault(); fix("send"); }
  });
  box.addEventListener("input", e => { if (e.target.matches(".tb-fix textarea")) e.target.dataset.dirty = "1"; });
  box.querySelector(".tb-sel").addEventListener("change", e => { const v = Number(e.target.value); if (view === "cau") qi = v; else gi = v; spot = -1; render(true); });
  document.addEventListener("keydown", e => {
    if (!box || box.hidden || (e.target.matches && e.target.matches("input, textarea, select"))) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); step(-1); }
    else if (e.key === "Escape" && !document.fullscreenElement) { if (spot >= 0) { spot = -1; render(true); } else close(); }
    else if (e.key === "g" || e.key === "G") pick();
    else if (e.key === "+" || e.key === "=") size(2);
    else if (e.key === "-") size(-2);
    else if (e.key === "f" || e.key === "F") { try { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen(); } catch(err) {} }
  });
  document.body.appendChild(box);
}
function size(d){ fs = Math.max(FS_MIN, Math.min(FS_MAX, fs + d)); store(FS_KEY, String(fs)); box.style.setProperty("--tb", fs + "px"); }

/* bài có trả lời cho câu đang xem */
const withAns = (id, D) => D.map((d, i) => ({d, i})).filter(x => answer(id, x.d));
function step(dir){
  const D = docs();
  if (view === "cau" && spot >= 0) {
    const list = withAns(QS[qi].id, D);
    const k = list.findIndex(x => x.i === spot);
    const nk = k + dir; if (nk >= 0 && nk < list.length) { spot = list[nk].i; render(true); }
    return;
  }
  if (view === "cau") { const n = qi + dir; if (n >= 0 && n < QS.length) { qi = n; render(true); } }
  else { const n = gi + dir; if (n >= 0 && n < D.length) { gi = n; render(true); } }
}

function render(force){
  if (!box || box.hidden || rolling) return;
  const fta = box.querySelector(".tb-fix textarea");
  if (!force && fta && (document.activeElement === fta || fta.dataset.dirty)) return;   /* đang gõ nhận xét: không vẽ lại */
  const D = docs();
  const s = JSON.stringify([view, qi, gi, spot, anon, D.map(d => [d.key, d.name, d.ans, d.sub, d.mcq, d.sort, d.match, d.order, opt.hearts ? QS.map(q => opt.hearts(q.id, d)) : 0, opt.liked ? QS.map(q => !!opt.liked(q.id, d)) : 0]), QS.map(q => opt.rev ? !!opt.rev(q.id) : 0)]);
  if (!force && s === sig) return;
  sig = s;
  const keepScroll = !force ? box.querySelector(".chieu-body").scrollTop : 0;
  box.querySelectorAll(".tb-seg [data-k]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === view)));
  const ab = box.querySelector('[data-k="anon"]'); ab.setAttribute("aria-pressed", String(anon)); ab.textContent = anon ? "Hiện tên nhóm" : "Ẩn tên nhóm";
  const sel = box.querySelector(".tb-sel");
  if (gi >= D.length) gi = Math.max(0, D.length - 1);
  if (view === "cau") {
    sel.innerHTML = QS.map((q, i) => '<option value="' + i + '">' + esc((q.code ? q.code + " · câu " + q.n : "Câu " + (i + 1)) + " – " + TASKS[q.id].label) + "</option>").join("");
    sel.value = String(qi);
    renderCau(D);
  } else {
    sel.innerHTML = D.length ? D.map((d, i) => '<option value="' + i + '">' + esc(nameOf(d, i)) + "</option>").join("") : '<option value="0">(chưa có nhóm)</option>';
    sel.value = String(gi);
    renderNhom(D);
  }
  box.querySelector('[data-k="prev"]').disabled = view === "cau" ? (spot < 0 && qi === 0) : gi === 0;
  box.querySelector('[data-k="next"]').disabled = view === "cau" ? (spot < 0 && qi === QS.length - 1) : gi >= D.length - 1;
  box.querySelector(".chieu-body").scrollTop = keepScroll;
}

function qHead(q){
  const t = TASKS[q.id];
  let extra = "";
  if (t.type === "mcq") extra = '<ol class="tb-opts" type="A">' + t.o.map(o => "<li>" + esc(o) + "</li>").join("") + "</ol>";
  return '<div class="tb-q"><span class="tb-qn">' + esc(q.code ? q.code + " · Câu " + q.n : "Câu") + "</span> " + esc(t.q) + extra + "</div>";
}

function renderCau(D){
  const q = QS[qi], id = q.id, list = withAns(id, D);
  const nSub = D.filter(d => d.sub && d.sub[id]).length;
  box.querySelector(".chieu-part").textContent = "Trưng bày · " + TASKS[id].label;
  box.querySelector(".chieu-n").textContent = "Câu " + (qi + 1) + "/" + QS.length + " · " + nSub + "/" + D.length + " bài đã nộp";
  if (spot >= 0 && !list.some(x => x.i === spot)) spot = -1;
  if (spot >= 0) {
    const k = list.findIndex(x => x.i === spot), x = list[k];
    body.className = "tb-page spot";
    body.innerHTML = qHead(q) + '<article class="tb-card big"><header><span class="tb-name">' + esc(nameOf(x.d, x.i)) + "</span>" + badges(id, x.d) +
      '<span class="tb-pos">' + (k + 1) + "/" + list.length + '</span></header><div class="tb-ans">' + answer(id, x.d) + "</div></article>" +
      fixPanel(id, x.d) +
      '<p class="tb-hint"><button class="btn" type="button" data-unspot>← Xem tất cả bài</button><button class="btn tb-pick" type="button" data-k="pick">🎲 Gọi bài khác</button> Dùng ← → để chuyển sang bài khác.</p>';
    return;
  }
  body.className = "tb-page";
  body.innerHTML = qHead(q) + (list.length
    ? '<div class="tb-grid">' + list.map(x => '<article class="tb-card" data-spot="' + x.i + '" tabindex="0" role="button" aria-label="Phóng to bài của ' + esc(nameOf(x.d, x.i)) + '"><header><span class="tb-name">' + esc(nameOf(x.d, x.i)) + "</span>" + badges(id, x.d) + '</header><div class="tb-ans">' + answer(id, x.d) + "</div></article>").join("") + "</div>"
    : '<p class="tb-empty">Chưa có nhóm nào trả lời câu này.</p>');
}

function renderNhom(D){
  const d = D[gi];
  box.querySelector(".chieu-part").textContent = "Trưng bày · " + (d ? nameOf(d, gi) : "Bài các nhóm");
  box.querySelector(".chieu-n").textContent = D.length ? "Nhóm " + (gi + 1) + "/" + D.length : "";
  body.className = "tb-page";
  if (!d) { body.innerHTML = '<p class="tb-empty">Chưa có nhóm nào gửi bài.</p>'; return; }
  const rows = QS.filter(q => answer(q.id, d));
  body.innerHTML = rows.length
    ? '<div class="tb-list">' + rows.map(q => '<article class="tb-card"><header><span class="tb-qn">' + esc(q.code ? q.code + " · Câu " + q.n : "Câu") + "</span> " + esc(TASKS[q.id].label) + badges(q.id, d) +
      '</header><p class="tb-qs">' + esc(TASKS[q.id].q) + '</p><div class="tb-ans">' + answer(q.id, d) + "</div></article>").join("") + "</div>"
    : '<p class="tb-empty">Nhóm này chưa trả lời câu nào.</p>';
}

/* ---------- Khung sửa bài trên bài đang phóng to ---------- */
function fixPanel(id, d){
  spotDoc = d; spotId = id;
  if (!opt.comment) return "";
  const cur = opt.getComment ? (opt.getComment(id, d) || "") : "";
  const liked = opt.liked ? !!opt.liked(id, d) : false;
  return '<div class="tb-fix"><label for="tb-fix-ta">Nhận xét sửa bài' + (opt.commentHint ? " (" + esc(opt.commentHint) + ")" : "") + '</label>' +
    '<textarea id="tb-fix-ta" rows="2" placeholder="Ví dụ: Đúng ý chính; cần nêu thêm ví dụ… (Ctrl+Enter để gửi)">' + esc(cur) + "</textarea>" +
    '<div class="row"><button class="btn primary" type="button" data-fix="send">' + (opt.commentLabel || "Gửi nhận xét") + "</button>" +
    (opt.like ? '<button class="btn like-btn" type="button" data-fix="like" aria-pressed="' + liked + '">★ ' + (liked ? "Đã khen" : "Khen") + "</button>" : "") +
    '<span class="status" aria-live="polite"></span></div></div>';
}
async function fix(kind){
  const p = box.querySelector(".tb-fix"); if (!p || !spotDoc) return;
  const ta = p.querySelector("textarea"), st = p.querySelector(".status");
  p.querySelectorAll("button").forEach(b => b.disabled = true); st.textContent = "Đang lưu…"; st.className = "status";
  try {
    if (kind === "send") await opt.comment(spotId, spotDoc, ta.value.trim());
    else if (kind === "like") await opt.like(spotId, spotDoc);
    delete ta.dataset.dirty;
    const msg = kind === "send" ? (ta.value.trim() ? "Đã lưu nhận xét lúc " + new Date().toLocaleTimeString("vi-VN", {hour: "2-digit", minute: "2-digit"}) : "Đã xoá nhận xét") : "Đã cập nhật lời khen";
    render(true);
    const st2 = box.querySelector(".tb-fix .status"); if (st2) { st2.textContent = msg; st2.className = "status ok"; }
  } catch(e) { st.textContent = e.message; st.className = "status bad"; p.querySelectorAll("button").forEach(b => b.disabled = false); }
}

/* ---------- 🎲 Gọi ngẫu nhiên ---------- */
function rnd(n){ try { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } catch(e) { return Math.floor(Math.random() * n); } }
function pool(){
  const D = docs();
  if (view === "cau") {
    const id = QS[qi].id; let all = withAns(id, D);
    const sub = all.filter(x => x.d.sub && x.d.sub[id]); if (sub.length) all = sub;   /* ưu tiên bài đã nộp */
    return {all, key: id};
  }
  return {all: D.map((d, i) => ({d, i})).filter(x => QS.some(q => answer(q.id, x.d))), key: "*"};
}
let ac = null;
function tick(f, len, vol){
  if ((store("tm-sound") || "1") === "0") return;
  try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
    const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + len);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + len); } catch(e) {}
}
function flash(text){
  const n = el("div", {class: "tb-toast", role: "status"}, esc(text)); box.appendChild(n);
  setTimeout(() => n.remove(), 2600);
}
function pick(){
  if (rolling) return;
  const {all, key} = pool();
  if (!all.length) { flash(view === "cau" ? "Chưa có bài nào cho câu này." : "Chưa có nhóm nào gửi bài."); return; }
  const done = called[key] = called[key] || new Set();
  let left = all.filter(x => !done.has(x.d.key)), msg = "";
  if (!left.length) { done.clear(); left = all.length > 1 ? all.filter(x => x.d.key !== done.last) : all; msg = "Đã gọi hết một vòng, bắt đầu vòng mới."; }
  const win = left[rnd(left.length)];
  const names = all.map(x => nameOf(x.d, x.i));
  const finish = () => {
    done.add(win.d.key); done.last = win.d.key; rolling = false; roll.remove();
    if (view === "cau") spot = win.i; else gi = win.i;
    render(true); if (msg) flash(msg);
  };
  rolling = true;
  const roll = el("div", {class: "tb-roll", "aria-live": "assertive"}, '<div class="tb-roll-in"><span class="tb-roll-h">🎲 Mời…</span><span class="tb-roll-n"></span></div>');
  box.appendChild(roll);
  const out = roll.querySelector(".tb-roll-n");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let k = 0, delay = 50;
  const steps = reduce || names.length < 2 ? 0 : 18;
  (function spin(){
    if (k < steps) {
      let s; do { s = names[rnd(names.length)]; } while (names.length > 1 && s === out.textContent);
      out.textContent = s; tick(520 + rnd(200), .05, .12); k++; delay *= 1.09;
      setTimeout(spin, delay);
    } else {
      out.textContent = nameOf(win.d, win.i); roll.classList.add("win"); tick(880, .25, .25); setTimeout(() => tick(1320, .35, .25), 140);
      setTimeout(finish, reduce ? 700 : 1100);
    }
  })();
}

function open(o){
  opt = o || {};
  if (!box) build();
  lastFocus = document.activeElement;
  view = opt.view === "nhom" ? "nhom" : "cau";
  const k = QS.findIndex(q => q.id === opt.task); if (k >= 0) qi = k;
  if (opt.group != null) { const g = docs().findIndex(d => d.key === opt.group); if (g >= 0) gi = g; }
  spot = -1; called = {};
  box.style.setProperty("--tb", fs + "px");
  box.hidden = false;
  document.documentElement.classList.add("chieu-on");
  render(true);
  clearInterval(timer); timer = setInterval(() => render(false), 4000);   /* bài mới nộp tự hiện thêm */
  box.querySelector('[data-k="next"]').focus();
}
function close(){
  if (!box) return;
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch(e) {} }
  clearInterval(timer);
  box.hidden = true;
  document.documentElement.classList.remove("chieu-on");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
window.TrungBay = {open, close, refresh: () => render(false)};
})();
