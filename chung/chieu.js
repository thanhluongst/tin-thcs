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
  function chieuBox(){ const b = document.querySelector(".chieu:not([hidden])"); return b || null; }
  function ctxInfo(){
    const b = chieuBox();
    if (b) { const body = b.querySelector(".chieu-body"), part = (b.querySelector(".chieu-part") || {}).textContent || "";
      return {key: "chieu:" + part, host: b, ox: body.scrollLeft, oy: body.scrollTop, scroller: body}; }
    return {key: "page", host: document.body, ox: window.scrollX, oy: window.scrollY, scroller: null};
  }
  function strokes(){ const k = ctxInfo().key; return LAYERS[k] || (LAYERS[k] = []); }
  function mount(){ const h = ctxInfo().host; [cv, bar, fab].forEach(function(x){ if (x.parentNode !== h) h.appendChild(x); }); }
  function size(){ const r = window.devicePixelRatio || 1, w = Math.min(innerWidth, document.documentElement.clientWidth || innerWidth); cv.width = Math.round(w * r); cv.height = Math.round(innerHeight * r); cv.style.width = w + "px"; cv.style.height = innerHeight + "px"; draw(); }
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
  function watchChieu(){ document.querySelectorAll(".chieu").forEach(function(b){ if (b._penWatch) return; b._penWatch = true;
    const p = b.querySelector(".chieu-part"); if (p) new MutationObserver(draw).observe(p, {childList: true, characterData: true, subtree: true}); }); }
  function init(){ mount(); size(); sync(); new MutationObserver(watchChieu).observe(document.body, {childList: true}); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.But = {on: function(){ setOn(true); }, off: function(){ setOn(false); }, layers: LAYERS};
})();

/* ĐỒNG HỒ ĐẾM NGƯỢC: nút ⏱ ở góc phải dưới (cạnh nút bút). Chọn nhanh 30 giây, 1–15 phút hoặc tự đặt phút:giây, bắt đầu / tạm dừng / đặt lại.
   Khi chạy: ô giờ nổi ở góc, bấm vào số để phóng to giữa màn hình (cho máy chiếu). 10 giây cuối chuyển đỏ.
   Hết giờ: hiện "Hết giờ!" và đổ chuông (bật/tắt bằng nút 🔔, nhớ trên máy). Dùng được cả khi đang chiếu toàn màn hình. */
(function(){
  const css = ".tm-fab{position:fixed;right:70px;bottom:14px;z-index:310;width:46px;height:46px;border-radius:50%;border:2px solid var(--accent,#0c665e);background:var(--surface,#fff);color:var(--fg,#1d2433);font-size:22px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.25);display:grid;place-items:center;padding:0}"
    + ".tm-fab[aria-expanded=true]{background:var(--accent,#0c665e);color:#fff}"
    + ".tm-pan{position:fixed;right:14px;bottom:70px;z-index:311;width:min(300px,calc(100vw - 28px));box-sizing:border-box;display:grid;gap:10px;padding:12px;border-radius:14px;background:var(--surface,#fff);color:var(--fg,#1d2433);border:1px solid var(--line,#ccd);box-shadow:0 4px 16px rgba(0,0,0,.25);font-size:15px}"
    + ".tm-pan[hidden]{display:none}.tm-pan .h{display:flex;justify-content:space-between;align-items:center;font-weight:700}"
    + ".tm-pan .pre{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.tm-pan .pre button{padding:6px 2px;white-space:nowrap}"
    + ".tm-pan .pre button.nhanh{font-weight:700;border-color:var(--accent,#0c665e);color:var(--accent,#0c665e)}"
    + ".tm-pan button{font:inherit;font-size:14px;border:1px solid var(--line,#ccd);background:var(--bg,#fff);color:inherit;border-radius:9px;padding:6px 8px;cursor:pointer}"
    + ".tm-pan button:hover{border-color:var(--accent,#0c665e)}.tm-pan button.main{background:var(--accent,#0c665e);color:#fff;border-color:var(--accent,#0c665e);font-weight:700}"
    + ".tm-pan .set{display:flex;align-items:center;justify-content:center;gap:6px}"
    + ".tm-pan .set input{width:3.2em;font:700 22px/1.2 var(--font-display,inherit);text-align:center;padding:4px;border:1px solid var(--line,#ccd);border-radius:8px;background:var(--bg,#fff);color:inherit}"
    + ".tm-pan .set b{font-size:22px}.tm-pan .set button{width:38px;font-size:20px;padding:2px}.tm-pan .row{display:grid;grid-template-columns:1fr 1fr;gap:6px}"
    + ".tm-pan .snd{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px}"
    + ".tm-pill{position:fixed;right:126px;bottom:14px;z-index:309;height:46px;padding:0 14px;border-radius:23px;border:2px solid var(--accent,#0c665e);background:var(--surface,#fff);color:var(--fg,#1d2433);font:700 26px/42px var(--font-display,inherit);font-variant-numeric:tabular-nums;box-shadow:0 3px 10px rgba(0,0,0,.25);cursor:pointer;white-space:nowrap}"
    + ".tm-pill[hidden]{display:none}.tm-pill.warn{border-color:#d32f2f;color:#d32f2f}.tm-pill.pause{opacity:.65}"
    + ".tm-pill.big{right:50%;bottom:50%;transform:translate(50%,50%);height:auto;padding:2vh 6vw;border-radius:4vw;font-size:min(22vw,40vh);line-height:1.1;border-width:4px;z-index:312}"
    + ".tm-pill.end{border-color:#d32f2f;background:#d32f2f;color:#fff;animation:tm-blink .8s steps(2,start) infinite}"
    + "@keyframes tm-blink{to{background:#fff;color:#d32f2f}}"
    + "@media (prefers-reduced-motion:reduce){.tm-pill.end{animation:none}}"
    + "@media (max-width:480px){.tm-pill{right:auto;left:14px}}"
    + ".chieu .chieu-bar{padding-right:240px}"
    + "@media (max-width:700px){.chieu .chieu-bar{padding-right:16px;padding-bottom:70px}}"
    + "@media print{.tm-fab,.tm-pan,.tm-pill{display:none}}";
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const ls = function(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e) { return null; } };

  const fab = document.createElement("button"); fab.type = "button"; fab.className = "tm-fab"; fab.textContent = "⏱";
  fab.title = "Đồng hồ đếm ngược"; fab.setAttribute("aria-label", "Đồng hồ đếm ngược"); fab.setAttribute("aria-expanded", "false");
  const pan = document.createElement("div"); pan.className = "tm-pan"; pan.hidden = true; pan.setAttribute("role", "dialog"); pan.setAttribute("aria-label", "Đặt thời gian đếm ngược");
  pan.innerHTML = '<div class="h"><span>⏱ Đếm ngược</span><button type="button" data-a="x" aria-label="Đóng" title="Đóng">✕</button></div>'
    + '<div class="pre">' + [30, 60, 120, 180, 300, 600, 900].map(function(s){ return '<button type="button" data-sec="' + s + '"' + (s < 60 ? ' class="nhanh"' : '') + '>' + (s < 60 ? s + ' giây' : s / 60 + ' phút') + '</button>'; }).join("") + '</div>'
    + '<div class="set"><button type="button" data-d="-60" aria-label="Bớt 1 phút" title="Bớt 1 phút">−</button><input type="number" min="0" max="99" value="5" aria-label="Phút" data-f="m"><b>:</b><input type="number" min="0" max="59" step="5" value="0" aria-label="Giây" data-f="s"><button type="button" data-d="60" aria-label="Thêm 1 phút" title="Thêm 1 phút">+</button></div>'
    + '<div class="row"><button type="button" class="main" data-a="go">▶ Bắt đầu</button><button type="button" data-a="reset">↺ Đặt lại</button></div>'
    + '<div class="snd"><span>Chuông khi hết giờ</span><span><button type="button" data-a="snd" aria-pressed="true">🔔 Bật</button> <button type="button" data-a="test" title="Nghe thử chuông">▷ Thử</button></span></div>';
  const pill = document.createElement("button"); pill.type = "button"; pill.className = "tm-pill"; pill.hidden = true; pill.title = "Bấm để phóng to / thu nhỏ";
  const inM = pan.querySelector('[data-f="m"]'), inS = pan.querySelector('[data-f="s"]'), bGo = pan.querySelector('[data-a="go"]'), bSnd = pan.querySelector('[data-a="snd"]');

  /* state: idle | run | pause | end */
  let total = 300, left = 300, endAt = 0, timer = 0, state = "idle", sound = ls("tm-sound") !== "0", ac = null;
  const last = Number(ls("tm-last")); if (last > 0) { total = left = last; }
  function fmt(s){ s = Math.max(0, Math.ceil(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
  function setInputs(){ inM.value = Math.floor(total / 60); inS.value = total % 60; }
  function readInputs(){ const m = Math.min(99, Math.max(0, parseInt(inM.value, 10) || 0)), s = Math.min(59, Math.max(0, parseInt(inS.value, 10) || 0)); return m * 60 + s; }
  function render(){
    pill.hidden = state === "idle";
    pill.textContent = state === "end" ? "Hết giờ!" : fmt(left);
    pill.classList.toggle("warn", state === "run" && left <= 10); pill.classList.toggle("pause", state === "pause"); pill.classList.toggle("end", state === "end");
    pill.setAttribute("aria-label", state === "end" ? "Hết giờ. Bấm để tắt" : "Còn " + fmt(left) + ". Bấm để phóng to hoặc thu nhỏ");
    bGo.textContent = state === "run" ? "⏸ Tạm dừng" : state === "pause" ? "▶ Chạy tiếp" : "▶ Bắt đầu";
    bSnd.setAttribute("aria-pressed", String(sound)); bSnd.textContent = sound ? "🔔 Bật" : "🔕 Tắt";
    fab.setAttribute("aria-expanded", String(!pan.hidden));
  }
  function audio(){ try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); } catch(e) { ac = null; } return ac; }
  function ring(rounds){
    const a = audio(); if (!a) return;
    const t0 = a.currentTime + .05;
    for (let r = 0; r < rounds; r++) for (let i = 0; i < 3; i++) {
      const t = t0 + r * 1.3 + i * .28, o = a.createOscillator(), g = a.createGain();
      o.type = "sine"; o.frequency.value = i === 2 ? 1175 : 880;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.35, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + .24);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + .25);
    }
  }
  function tick(){
    left = (endAt - Date.now()) / 1000;
    if (left <= 0) { left = 0; clearInterval(timer); state = "end"; if (sound) ring(3); }
    render();
  }
  function start(){
    if (state === "idle" || state === "end") { total = readInputs(); if (!total) return; left = total; ls("tm-last", total); }
    audio(); endAt = Date.now() + left * 1000; state = "run"; clearInterval(timer); timer = setInterval(tick, 200); tick();
  }
  function pause(){ clearInterval(timer); left = (endAt - Date.now()) / 1000; state = "pause"; render(); }
  function reset(){ clearInterval(timer); state = "idle"; left = total; pill.classList.remove("big"); render(); }
  function preset(sec){ total = sec; setInputs(); clearInterval(timer); state = "idle"; start(); }

  fab.addEventListener("click", function(){ pan.hidden = !pan.hidden; if (!pan.hidden && state === "idle") setInputs(); mount(); render(); });
  pill.addEventListener("click", function(){ if (state === "end") { reset(); return; } pill.classList.toggle("big"); });
  pan.addEventListener("click", function(e){ const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.sec) preset(Number(b.dataset.sec));
    else if (b.dataset.d) {
      const d = Number(b.dataset.d);
      if (state === "run" || state === "pause") { left = Math.max(1, left + d); endAt = Date.now() + left * 1000; }
      else { total = Math.max(0, Math.min(99 * 60 + 59, readInputs() + d)); setInputs(); }
    }
    else if (b.dataset.a === "go") { if (state === "run") pause(); else start(); }
    else if (b.dataset.a === "reset") reset();
    else if (b.dataset.a === "snd") { sound = !sound; ls("tm-sound", sound ? "1" : "0"); if (sound) audio(); }
    else if (b.dataset.a === "test") ring(1);
    else if (b.dataset.a === "x") pan.hidden = true;
    render(); });
  pan.addEventListener("keydown", function(e){
    if (e.key === "Enter" && e.target.tagName === "INPUT") { e.preventDefault(); clearInterval(timer); state = "idle"; start(); render(); }
    if (e.key === "Escape") { pan.hidden = true; render(); fab.focus(); }
  });
  /* đặt nút vào đúng chỗ: trang học hoặc màn "Chiếu ghi bài" (kể cả toàn màn hình) */
  function host(){ return document.querySelector(".chieu:not([hidden])") || document.body; }
  function mount(){ const h = host(); [pill, pan, fab].forEach(function(x){ if (x.parentNode !== h) h.appendChild(x); }); }
  function init(){
    setInputs(); mount(); render();
    new MutationObserver(mount).observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});
    new MutationObserver(mount).observe(document.body, {childList: true});
    document.addEventListener("fullscreenchange", function(){ setTimeout(mount, 60); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.DemNguoc = {start: function(sec){ preset(sec); render(); }, reset: reset};
})();

/* ẨN/HIỆN NÚT GÓC PHẢI (⏱ và ✏️): trên máy có chuột, hai nút ẩn đi cho gọn; rê chuột vào góc phải dưới thì hiện,
   rời khỏi góc khoảng 1 giây thì ẩn lại. Nút luôn hiện khi đang dùng bút, đang mở bảng đếm ngược, hoặc khi chọn bằng phím Tab.
   Màn hình cảm ứng (không có chuột) thì nút luôn hiện. Ô số giờ đang đếm vẫn luôn hiện. */
(function(){
  const css = "@media (hover:hover) and (pointer:fine){"
    + ".pen-fab,.tm-fab{transition:opacity .2s,transform .2s}"
    + "html:not(.fab-show) .pen-fab:not([aria-pressed=true]):not(:focus-visible),html:not(.fab-show) .tm-fab:not([aria-expanded=true]):not(:focus-visible){opacity:0;transform:translateY(10px);pointer-events:none}"
    + "}";
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const root = document.documentElement; let t = 0;
  function near(x, y){ return x > innerWidth - 200 && y > innerHeight - 110; }
  document.addEventListener("mousemove", function(e){
    if (near(e.clientX, e.clientY)) { clearTimeout(t); t = 0; root.classList.add("fab-show"); }
    else if (root.classList.contains("fab-show") && !t) t = setTimeout(function(){ root.classList.remove("fab-show"); t = 0; }, 1000);
  }, {passive: true});
  document.addEventListener("mouseleave", function(){ clearTimeout(t); t = setTimeout(function(){ root.classList.remove("fab-show"); t = 0; }, 1000); });
})();
