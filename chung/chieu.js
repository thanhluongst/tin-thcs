/* Chiếu ghi bài: màn hình lớn cho máy chiếu, mỗi phần một trang, chữ to, kẻ dòng như trang vở.
   Phím: ← → (hoặc PageUp/PageDown của bút trình chiếu) chuyển phần, + − đổi cỡ chữ, F toàn màn hình, Esc đóng.
   Dùng chung cho trang học sinh (chế độ GV) và trang giáo viên. */
(function(){
"use strict";
const L = window.LESSON;
function el(tag, attrs, html){ const e = document.createElement(tag); if (attrs) for (const a in attrs) e.setAttribute(a, attrs[a]); if (html != null) e.innerHTML = html; return e; }
function store(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e) { return null; } }

/* Danh sách trang: mỗi mục "Ghi bài" của từng bước, thêm một trang tổng kết cả bài */
const PARTS = [];
L.STAGES.forEach(st => st.acts.forEach(a => { if (a.ghi && L.CONCEPTS[a.concept]) PARTS.push({id: a.concept, label: st.code + ". " + st.title, ids: [a.concept]}); }));
if (PARTS.length > 1) PARTS.push({id: "*", label: "Tổng kết cả bài", ids: PARTS.map(p => p.id)});

const FS_KEY = "chieu-fs", FS_MIN = 18, FS_MAX = 64;
let box = null, idx = 0, fs = Number(store(FS_KEY)) || 32, onShow = null, lastFocus = null;

function build(){
  box = el("div", {class: "chieu", role: "dialog", "aria-modal": "true", "aria-label": "Chiếu ghi bài", hidden: ""});
  box.innerHTML =
    '<div class="chieu-top"><span class="chieu-bai"></span><span class="chieu-part"></span><span class="chieu-n"></span></div>' +
    '<div class="chieu-body"><div class="concept ghi chieu-page"></div></div>' +
    '<div class="chieu-bar">' +
      '<button class="btn" type="button" data-k="prev">← Trước</button>' +
      '<span class="chieu-dots"></span>' +
      '<button class="btn primary" type="button" data-k="next">Tiếp →</button>' +
      '<span class="chieu-sp"></span>' +
      '<button class="btn" type="button" data-k="minus" aria-label="Chữ nhỏ hơn">A−</button>' +
      '<button class="btn" type="button" data-k="plus" aria-label="Chữ to hơn">A+</button>' +
      '<button class="btn" type="button" data-k="full">Toàn màn hình</button>' +
      '<button class="btn" type="button" data-k="close">Đóng ✕</button>' +
    "</div>";
  box.querySelector(".chieu-bai").textContent = L.title;
  const dots = box.querySelector(".chieu-dots");
  PARTS.forEach((p, i) => { const d = el("button", {type: "button", class: "chieu-dot", title: p.label, "aria-label": p.label}, p.id === "*" ? "★" : String(i + 1)); d.addEventListener("click", () => go(i)); dots.appendChild(d); });
  box.addEventListener("click", e => { const b = e.target.closest("[data-k]"); if (!b) return;
    const k = b.dataset.k;
    if (k === "prev") go(idx - 1); else if (k === "next") go(idx + 1);
    else if (k === "minus") size(-4); else if (k === "plus") size(4);
    else if (k === "full") full(); else if (k === "close") close(); });
  document.addEventListener("keydown", e => {
    if (!box || box.hidden) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(idx + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(idx - 1); }
    else if (e.key === "Escape" && !document.fullscreenElement) close();
    else if (e.key === "+" || e.key === "=") size(4);
    else if (e.key === "-") size(-4);
    else if (e.key === "f" || e.key === "F") full();
  });
  document.body.appendChild(box);
}
function size(d){ fs = Math.max(FS_MIN, Math.min(FS_MAX, fs + d)); store(FS_KEY, String(fs)); box.style.setProperty("--fs", fs + "px"); }
function full(){
  try { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen(); } catch(e) {}
}
function go(i){
  if (i < 0 || i >= PARTS.length) return;
  idx = i;
  const p = PARTS[i];
  box.querySelector(".chieu-part").textContent = "Ghi bài · " + p.label;
  box.querySelector(".chieu-n").textContent = (i + 1) + " / " + PARTS.length;
  const page = box.querySelector(".chieu-page");
  page.innerHTML = p.ids.map(id => L.CONCEPTS[id].b).join("");
  box.querySelector(".chieu-body").scrollTop = 0;
  box.querySelectorAll(".chieu-dot").forEach((d, j) => d.setAttribute("aria-current", j === i ? "true" : "false"));
  box.querySelector('[data-k="prev"]').disabled = i === 0;
  box.querySelector('[data-k="next"]').disabled = i === PARTS.length - 1;
  if (onShow) p.ids.forEach(id => { try { onShow(id); } catch(e) {} });
}
function open(startId, opts){
  if (!PARTS.length) return;
  if (!box) build();
  onShow = (opts && opts.onShow) || null;
  lastFocus = document.activeElement;
  box.style.setProperty("--fs", fs + "px");
  box.hidden = false;
  document.documentElement.classList.add("chieu-on");
  const i = PARTS.findIndex(p => p.id === startId);
  go(i < 0 ? 0 : i);
  box.querySelector('[data-k="next"]').focus();
}
function close(){
  if (!box) return;
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch(e) {} }
  box.hidden = true;
  document.documentElement.classList.remove("chieu-on");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
window.Chieu = {open, close, parts: PARTS};
})();

/* Bấm vào hình trong bài (figure.fig img) để xem phóng to; bấm lại hoặc Esc để đóng. */
(function(){
  let ov = null;
  function close(){ if (ov) { ov.remove(); ov = null; } }
  document.addEventListener("click", e => {
    const img = e.target.closest && e.target.closest("figure.fig img");
    if (!img || ov) return;
    ov = document.createElement("div"); ov.className = "zoom-ov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Hình phóng to");
    const big = document.createElement("img"); big.src = img.currentSrc || img.src; big.alt = img.alt;
    /* phóng to tối đa gấp đôi cỡ thật, vừa màn hình */
    big.style.width = Math.min(img.naturalWidth * 2, window.innerWidth * 0.96) + "px";
    ov.appendChild(big);
    const cap = img.closest("figure").querySelector("figcaption");
    if (cap) { const p = document.createElement("p"); p.textContent = cap.textContent; ov.appendChild(p); }
    ov.addEventListener("click", close);
    document.body.appendChild(ov);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();

/* BÚT VIẾT LÊN TRANG: nút ✏️ ở góc phải dưới. Bút nhiều màu, bút dạ quang, tẩy (xoá từng nét), hoàn tác, xoá hết, ẩn/hiện nét.
   Nét vẽ gắn với nội dung: cuộn trang thì nét cuộn theo. Trong "Chiếu ghi bài", mỗi phần có nét riêng; vẫn dùng được khi toàn màn hình.
   Nét vẽ chỉ nằm trên máy đang dùng, tải lại trang là mất. Phím tắt khi đang vẽ: Esc thoát bút, Ctrl+Z hoàn tác. */
(function(){
  const COLORS = [["#e53935","Đỏ"],["#1e88e5","Xanh dương"],["#2e7d32","Xanh lá"],["#212121","Đen"]];
  const css = ".pen-fab{position:fixed;right:14px;bottom:14px;z-index:310;width:46px;height:46px;border-radius:50%;border:2px solid var(--accent,#0c665e);background:var(--surface,#fff);color:var(--fg,#1d2433);font-size:22px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.25);display:grid;place-items:center;padding:0}"
    + ".pen-fab[aria-pressed=true]{background:var(--accent,#0c665e);color:#fff}"
    + ".pen-cv{position:fixed;left:0;top:0;z-index:300;pointer-events:none;touch-action:none}"
    + ".pen-cv.on{pointer-events:auto;cursor:crosshair}.pen-cv.on.er{cursor:cell}"
    + ".pen-bar{position:fixed;right:14px;bottom:70px;z-index:310;display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:14px;background:var(--surface,#fff);border:1px solid var(--line,#ccd);box-shadow:0 4px 16px rgba(0,0,0,.25);max-height:calc(100vh - 90px);overflow:auto}"
    + ".pen-bar[hidden]{display:none}"
    + ".pen-bar button{width:40px;height:36px;border-radius:9px;border:2px solid transparent;background:transparent;color:var(--fg,#1d2433);font-size:18px;cursor:pointer;display:grid;place-items:center;padding:0}"
    + ".pen-bar button:hover{border-color:var(--line,#ccd)}"
    + ".pen-bar button[aria-pressed=true]{border-color:var(--accent,#0c665e);background:var(--sunk,#eef)}"
    + ".pen-bar .dot{width:20px;height:20px;border-radius:50%;display:block}"
    + ".pen-bar .ln{height:1px;background:var(--line,#ccd);margin:2px 0}"
    + ".pen-bar .w{display:block;border-radius:4px;background:currentColor;width:22px}";
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const fab = document.createElement("button"); fab.type = "button"; fab.className = "pen-fab"; fab.title = "Bút viết lên trang"; fab.setAttribute("aria-label", "Bút viết lên trang"); fab.setAttribute("aria-pressed", "false"); fab.textContent = "✏️";
  const cv = document.createElement("canvas"); cv.className = "pen-cv"; cv.setAttribute("aria-hidden", "true");
  const bar = document.createElement("div"); bar.className = "pen-bar"; bar.hidden = true; bar.setAttribute("role", "toolbar"); bar.setAttribute("aria-label", "Công cụ bút");
  bar.innerHTML = COLORS.map(function(c){ return '<button type="button" data-c="' + c[0] + '" title="Bút ' + c[1] + '" aria-label="Bút ' + c[1] + '"><span class="dot" style="background:' + c[0] + '"></span></button>'; }).join("")
    + '<button type="button" data-t="hl" title="Bút dạ quang" aria-label="Bút dạ quang"><span class="dot" style="background:#ffeb3b;border-radius:3px;width:22px;height:12px"></span></button>'
    + '<span class="ln"></span>'
    + '<button type="button" data-w="3" title="Nét mảnh" aria-label="Nét mảnh"><span class="w" style="height:2px"></span></button>'
    + '<button type="button" data-w="6" title="Nét vừa" aria-label="Nét vừa"><span class="w" style="height:5px"></span></button>'
    + '<button type="button" data-w="11" title="Nét đậm" aria-label="Nét đậm"><span class="w" style="height:9px"></span></button>'
    + '<span class="ln"></span>'
    + '<button type="button" data-t="er" title="Tẩy: chạm vào nét nào thì xoá nét đó" aria-label="Tẩy">🧽</button>'
    + '<button type="button" data-a="undo" title="Hoàn tác (Ctrl+Z)" aria-label="Hoàn tác">↶</button>'
    + '<button type="button" data-a="clear" title="Xoá hết nét vẽ" aria-label="Xoá hết nét vẽ">🗑️</button>'
    + '<button type="button" data-a="eye" title="Ẩn / hiện nét vẽ" aria-label="Ẩn hoặc hiện nét vẽ" aria-pressed="false">👁️</button>'
    + '<button type="button" data-a="done" title="Xong (Esc): thôi vẽ, giữ nét để bấm, cuộn trang" aria-label="Xong">✓</button>';

  let on = false, tool = "pen", color = COLORS[0][0], width = 3, hidden = false, cur = null;
  const LAYERS = {};   /* "page" hoặc "chieu:<phần>" → mảng nét {c, w, hl, p:[[x,y],…]}, toạ độ theo nội dung */
  function chieuBox(){ const b = document.querySelector(".chieu"); return b && !b.hidden ? b : null; }
  function ctxInfo(){
    const b = chieuBox();
    if (b) { const body = b.querySelector(".chieu-body"), part = (b.querySelector(".chieu-part") || {}).textContent || "";
      return {key: "chieu:" + part, host: b, ox: body.scrollLeft, oy: body.scrollTop, scroller: body}; }
    return {key: "page", host: document.body, ox: window.scrollX, oy: window.scrollY, scroller: null};
  }
  function strokes(){ const k = ctxInfo().key; return LAYERS[k] || (LAYERS[k] = []); }
  function mount(){ const h = ctxInfo().host; [cv, bar, fab].forEach(function(x){ if (x.parentNode !== h) h.appendChild(x); }); }
  function size(){ const r = window.devicePixelRatio || 1; cv.width = Math.round(innerWidth * r); cv.height = Math.round(innerHeight * r); cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px"; draw(); }
  function path(g, s, ox, oy){
    const p = s.p; g.beginPath(); g.moveTo(p[0][0] - ox, p[0][1] - oy);
    if (p.length === 1) g.lineTo(p[0][0] - ox + .1, p[0][1] - oy);
    for (let i = 1; i < p.length - 1; i++) { const mx = (p[i][0] + p[i + 1][0]) / 2, my = (p[i][1] + p[i + 1][1]) / 2; g.quadraticCurveTo(p[i][0] - ox, p[i][1] - oy, mx - ox, my - oy); }
    if (p.length > 1) g.lineTo(p[p.length - 1][0] - ox, p[p.length - 1][1] - oy);
  }
  function draw(){
    const g = cv.getContext("2d"), r = window.devicePixelRatio || 1; g.setTransform(r, 0, 0, r, 0, 0); g.clearRect(0, 0, innerWidth, innerHeight);
    if (hidden) return;
    const I = ctxInfo(); g.lineCap = "round"; g.lineJoin = "round";
    strokes().concat(cur && !cur.er ? [cur] : []).forEach(function(s){ g.globalAlpha = s.hl ? .38 : 1; g.strokeStyle = s.c; g.lineWidth = s.w; path(g, s, I.ox, I.oy); g.stroke(); });
    g.globalAlpha = 1;
  }
  function pt(e){ const I = ctxInfo(); return [e.clientX + I.ox, e.clientY + I.oy]; }
  function near(s, x, y, R){
    const p = s.p, rr = R + s.w / 2;
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[i + 1] || a, dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
      let t = L2 ? ((x - a[0]) * dx + (y - a[1]) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t));
      const qx = a[0] + t * dx - x, qy = a[1] + t * dy - y; if (qx * qx + qy * qy <= rr * rr) return true;
    }
    return false;
  }
  function erase(e){ const q = pt(e), S = strokes(); for (let i = S.length - 1; i >= 0; i--) if (near(S[i], q[0], q[1], 10)) { (S.undo = S.undo || []).push(["del", S[i], i]); S.splice(i, 1); } draw(); }
  cv.addEventListener("pointerdown", function(e){
    if (!on) return; e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch(x) {}
    if (hidden) { hidden = false; sync(); }
    if (tool === "er") { cur = {er: true}; erase(e); return; }
    cur = tool === "hl" ? {c: "#ffeb3b", w: Math.max(14, width * 3), hl: true, p: [pt(e)]} : {c: color, w: width, p: [pt(e)]}; draw();
  });
  cv.addEventListener("pointermove", function(e){
    if (!cur) return;
    if (cur.er) { erase(e); return; }
    let evs = e.getCoalescedEvents ? e.getCoalescedEvents() : []; if (!evs.length) evs = [e];
    evs.forEach(function(ev){ cur.p.push(pt(ev)); }); draw();
  });
  function up(){ if (!cur) return; if (!cur.er) { const S = strokes(); S.push(cur); (S.undo = S.undo || []).push(["add", cur]); } cur = null; draw(); }
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  /* lăn chuột khi đang vẽ: cuộn trang (hoặc phần chiếu) bên dưới */
  cv.addEventListener("wheel", function(e){ const I = ctxInfo(); if (I.scroller) I.scroller.scrollBy(e.deltaX, e.deltaY); else window.scrollBy(e.deltaX, e.deltaY); }, {passive: true});
  function undo(){ const S = strokes(), u = S.undo && S.undo.pop(); if (!u) return;
    if (u[0] === "add") { const i = S.indexOf(u[1]); if (i >= 0) S.splice(i, 1); }
    else if (u[0] === "del") S.splice(Math.min(u[2], S.length), 0, u[1]);
    else if (u[0] === "clear") Array.prototype.push.apply(S, u[1]);
    draw(); }
  function sync(){
    fab.setAttribute("aria-pressed", String(on)); bar.hidden = !on; cv.classList.toggle("on", on); cv.classList.toggle("er", tool === "er");
    bar.querySelectorAll("[data-c]").forEach(function(b){ b.setAttribute("aria-pressed", String(tool === "pen" && b.dataset.c === color)); });
    bar.querySelectorAll("[data-w]").forEach(function(b){ b.setAttribute("aria-pressed", String(Number(b.dataset.w) === width)); });
    bar.querySelectorAll("[data-t]").forEach(function(b){ b.setAttribute("aria-pressed", String(tool === b.dataset.t)); });
    bar.querySelector('[data-a="eye"]').setAttribute("aria-pressed", String(hidden));
    draw();
  }
  function setOn(v){ on = v; mount(); sync(); }
  fab.addEventListener("click", function(){ setOn(!on); });
  bar.addEventListener("click", function(e){ const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.c) { tool = "pen"; color = b.dataset.c; }
    else if (b.dataset.w) { width = Number(b.dataset.w); if (tool === "er") tool = "pen"; }
    else if (b.dataset.t) tool = tool === b.dataset.t ? "pen" : b.dataset.t;
    else if (b.dataset.a === "undo") undo();
    else if (b.dataset.a === "clear") { const S = strokes(); if (S.length) (S.undo = S.undo || []).push(["clear", S.splice(0)]); }
    else if (b.dataset.a === "eye") hidden = !hidden;
    else if (b.dataset.a === "done") { setOn(false); return; }
    sync(); });
  document.addEventListener("keydown", function(e){
    if (!on) return;
    if (e.key === "Escape") { e.stopImmediatePropagation(); e.preventDefault(); setOn(false); }
    else if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) { e.preventDefault(); undo(); }
  }, true);
  window.addEventListener("scroll", draw, {passive: true});
  window.addEventListener("resize", size);
  document.addEventListener("scroll", function(e){ if (e.target && e.target.classList && e.target.classList.contains("chieu-body")) draw(); }, true);
  /* mở/đóng màn chiếu, đổi phần chiếu, vào/thoát toàn màn hình: chuyển lớp nét vẽ cho đúng chỗ */
  function re(){ mount(); draw(); }
  new MutationObserver(re).observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});
  document.addEventListener("fullscreenchange", function(){ setTimeout(function(){ size(); re(); }, 60); });
  function watchChieu(){ const b = document.querySelector(".chieu"); if (!b || b._penWatch) return; b._penWatch = true;
    const p = b.querySelector(".chieu-part"); if (p) new MutationObserver(draw).observe(p, {childList: true, characterData: true, subtree: true}); }
  function init(){ mount(); size(); sync(); new MutationObserver(watchChieu).observe(document.body, {childList: true}); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.But = {on: function(){ setOn(true); }, off: function(){ setOn(false); }, layers: LAYERS};
})();
