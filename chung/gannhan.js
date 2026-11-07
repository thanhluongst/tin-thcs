/* GẮN NHÃN LÊN HÌNH — kéo thả (chuột hoặc ngón tay) hay bấm nhãn rồi bấm ô trống.
   GanNhan(box, tuỳ chọn)
     title, note
     svg: chuỗi SVG vẽ hình (có viewBox) — hoặc img: {src, alt}
     ratio: tỉ lệ rộng/cao của hình (mặc định lấy từ viewBox của svg)
     slots: [{x, y, a, w?, px?, py?}]  — x, y: tâm ô trống theo % chiều rộng/chiều cao hình;
            a: nhãn đúng (hoặc mảng các nhãn được chấp nhận); w: độ rộng ô (% hình, mặc định 22);
            px, py: (tuỳ chọn) điểm trên hình mà ô trỏ tới — vẽ đường nối
     extra: [nhãn gây nhiễu]
     done: lời khen khi đúng hết (tuỳ chọn)
   Không lưu bài làm; học sinh tự kiểm tra bằng nút "Kiểm tra". */
(function(){
"use strict";
var CSS = ".gnh{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0}"
 + ".gnh .gn-t{font-weight:700}.gnh .gn-note{font-size:13.5px;opacity:.85}"
 + ".gnh .gn-bank{display:flex;flex-wrap:wrap;gap:6px;min-height:40px;padding:6px;border:1px dashed var(--line);border-radius:10px;background:var(--sunk)}"
 + ".gnh .gn-bank:empty::after{content:'Đã dùng hết nhãn';font-size:13px;opacity:.6;align-self:center}"
 + ".gnh .gn-chip{font:inherit;font-size:13.5px;font-weight:600;line-height:1.25;border:1.5px solid var(--accent,#1f8a70);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 10px;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;max-width:100%;text-align:center}"
 + ".gnh .gn-chip:hover{background:var(--accent-soft,#e3f4f4)}.gnh .gn-chip.gn-pick{background:var(--accent,#1f8a70);color:#fff}"
 + ".gnh .gn-chip:focus-visible{outline:2px solid var(--accent,#1f8a70);outline-offset:2px}"
 + ".gnh .gn-wrap{overflow-x:auto;min-width:0;-webkit-overflow-scrolling:touch}.gnh .gn-stage{position:relative;width:100%;min-width:560px;max-width:820px;margin:0 auto;container-type:inline-size}"
 + ".gnh .gn-swipe{display:none;font-size:12.5px;opacity:.7}@media (max-width:600px){.gnh .gn-swipe{display:block}}"
 + ".gnh .gn-stage>svg,.gnh .gn-stage>img{display:block;width:100%;height:auto;border-radius:8px}"
 + ".gnh .gn-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}"
 + ".gnh .gn-slot{position:absolute;transform:translate(-50%,-50%);min-height:30px;display:flex;align-items:center;justify-content:center;border:2px dashed #6b7c8f;background:rgba(255,255,255,.88);border-radius:8px;padding:2px;box-sizing:border-box;color:#111;font-size:clamp(10.5px,1.7cqi,13.5px)}"
 + ".gnh .gn-slot .gn-chip{font-size:inherit;padding:3px 6px;width:100%;border-width:1px;background:#fff;color:#111}"
 + ".gnh .gn-slot.gn-hot{border-color:var(--accent,#1f8a70);background:#e6f6f1;box-shadow:0 0 0 3px rgba(31,138,112,.25)}"
 + ".gnh .gn-slot.gn-ok{border:2px solid #1c7c54;background:#e3f6ec}.gnh .gn-slot.gn-ok .gn-chip{border-color:#1c7c54;color:#14583c}"
 + ".gnh .gn-slot.gn-no{border:2px solid #c0392b;background:#fdecea}.gnh .gn-slot.gn-no .gn-chip{border-color:#c0392b;color:#8e2a20}"
 + ".gnh .gn-slot .gn-n{font-size:11px;font-weight:700;color:#6b7c8f}"
 + ".gnh .gn-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}"
 + ".gnh .gn-bar button{font:inherit;font-size:13.5px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".gnh .gn-bar button.gn-main{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}"
 + ".gnh .gn-msg{font-size:14px}.gnh .gn-msg.gn-good{color:#1c7c54;font-weight:700}"
 + ".gn-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.92;transform:translate(-50%,-50%) rotate(-2deg);box-shadow:0 6px 16px rgba(0,0,0,.25)}";
function addCss(){ if (document.getElementById("gannhan-css")) return; var s = document.createElement("style"); s.id = "gannhan-css"; s.textContent = CSS; document.head.appendChild(s); }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function norm(s){ return String(s).trim().toLowerCase().normalize("NFC"); }
function shuffle(a){ for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

window.GanNhan = function(box, opt){
  addCss(); opt = opt || {};
  box.classList.add("gnh"); box.innerHTML = "";
  function mk(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  if (opt.title) box.appendChild(mk("div", "gn-t", esc(opt.title)));
  box.appendChild(mk("div", "gn-note", opt.note || "Kéo mỗi nhãn vào đúng ô trên hình (hoặc bấm vào nhãn rồi bấm vào ô). Muốn bỏ nhãn ra, kéo nhãn về khay hoặc bấm vào nhãn trong ô."));
  var bank = mk("div", "gn-bank"); bank.setAttribute("aria-label", "Khay nhãn"); box.appendChild(bank);
  box.appendChild(mk("div", "gn-swipe", "↔ Vuốt ngang để xem hết hình."));
  var wrap = mk("div", "gn-wrap"), stage = mk("div", "gn-stage"); wrap.appendChild(stage); box.appendChild(wrap);
  if (opt.svg) stage.innerHTML = opt.svg; else if (opt.img) { var im = mk("img"); im.src = opt.img.src; im.alt = opt.img.alt || ""; stage.appendChild(im); }
  var pic = stage.firstElementChild, ratio = opt.ratio;
  if (!ratio && pic && pic.getAttribute && pic.getAttribute("viewBox")) { var vb = pic.getAttribute("viewBox").split(/[\s,]+/); ratio = +vb[2] / +vb[3]; }
  ratio = ratio || 16 / 9;
  var bar = mk("div", "gn-bar"), bCk = mk("button", "gn-main", "✔ Kiểm tra"), bRs = mk("button", "", "↺ Làm lại"), msg = mk("span", "gn-msg");
  bCk.type = bRs.type = "button"; bar.appendChild(bCk); bar.appendChild(bRs); bar.appendChild(msg); box.appendChild(bar);

  /* Đường nối từ ô tới điểm trên hình */
  var NS = "http://www.w3.org/2000/svg", lines = document.createElementNS(NS, "svg"); lines.setAttribute("class", "gn-lines"); lines.setAttribute("viewBox", "0 0 100 " + (100 / ratio)); lines.setAttribute("preserveAspectRatio", "none");
  var slots = (opt.slots || []).map(function(sl, i){
    if (sl.px != null) { var ln = document.createElementNS(NS, "line"); ln.setAttribute("x1", sl.x); ln.setAttribute("y1", sl.y / ratio); ln.setAttribute("x2", sl.px); ln.setAttribute("y2", sl.py / ratio);
      ln.setAttribute("stroke", "#3d4b5c"); ln.setAttribute("stroke-width", ".35"); ln.setAttribute("stroke-dasharray", "1 .7"); lines.appendChild(ln);
      var dot = document.createElementNS(NS, "circle"); dot.setAttribute("cx", sl.px); dot.setAttribute("cy", sl.py / ratio); dot.setAttribute("r", ".9"); dot.setAttribute("fill", "#d0186e"); dot.setAttribute("stroke", "#fff"); dot.setAttribute("stroke-width", ".3"); lines.appendChild(dot); }
    var el = mk("div", "gn-slot"); el.style.left = sl.x + "%"; el.style.top = sl.y + "%"; el.style.width = (sl.w || 22) + "%";
    el.dataset.i = i; el.setAttribute("aria-label", "Ô " + (i + 1)); el.innerHTML = '<span class="gn-n">' + (i + 1) + "</span>";
    return {el: el, ok: [].concat(sl.a).map(norm), chip: null};
  });
  stage.appendChild(lines); slots.forEach(function(s){ stage.appendChild(s.el); });

  var labels = [], chips = [];
  slots.forEach(function(s){ labels.push([].concat(opt.slots[s.el.dataset.i].a)[0]); });
  (opt.extra || []).forEach(function(x){ labels.push(x); });
  function build(){
    bank.innerHTML = ""; chips = []; slots.forEach(function(s){ s.chip = null; s.el.className = "gn-slot"; s.el.innerHTML = '<span class="gn-n">' + (+s.el.dataset.i + 1) + "</span>"; });
    shuffle(labels.slice()).forEach(function(t){ var c = mk("button", "gn-chip", esc(t)); c.type = "button"; c.dataset.t = t; chips.push(c); bank.appendChild(c); });
    msg.textContent = ""; msg.className = "gn-msg"; picked = null;
  }
  var picked = null;
  function unpick(){ if (picked) picked.classList.remove("gn-pick"); picked = null; }
  function slotOf(chip){ for (var i = 0; i < slots.length; i++) if (slots[i].chip === chip) return slots[i]; return null; }
  function clearMarks(){ slots.forEach(function(s){ s.el.classList.remove("gn-ok", "gn-no"); }); msg.textContent = ""; msg.className = "gn-msg"; }
  function place(chip, slot){
    clearMarks(); var from = slotOf(chip);
    if (slot) {
      if (slot.chip && slot.chip !== chip) { var old = slot.chip; if (from) { from.chip = old; from.el.innerHTML = ""; from.el.appendChild(old); } else bank.appendChild(old); }
      else if (from && from !== slot) { from.chip = null; from.el.innerHTML = '<span class="gn-n">' + (+from.el.dataset.i + 1) + "</span>"; }
      slot.chip = chip; slot.el.innerHTML = ""; slot.el.appendChild(chip);
    } else { if (from) { from.chip = null; from.el.innerHTML = '<span class="gn-n">' + (+from.el.dataset.i + 1) + "</span>"; } bank.appendChild(chip); }
    if (slots.every(function(s){ return s.chip; })) msg.textContent = "Đã điền đủ các ô. Bấm “Kiểm tra”.";
  }
  function check(){
    var n = 0; slots.forEach(function(s){ var ok = !!s.chip && s.ok.indexOf(norm(s.chip.dataset.t)) >= 0; if (ok) n++; s.el.classList.toggle("gn-ok", ok); s.el.classList.toggle("gn-no", !!s.chip && !ok); });
    if (n === slots.length) { msg.textContent = "🎉 " + (opt.done || "Chính xác! Em đã gắn đúng tất cả các nhãn."); msg.className = "gn-msg gn-good"; }
    else { var empty = slots.filter(function(s){ return !s.chip; }).length; msg.textContent = "Đúng " + n + "/" + slots.length + " ô." + (empty ? " Còn " + empty + " ô trống." : "") + " Kéo lại các nhãn ở ô màu đỏ."; msg.className = "gn-msg"; }
  }
  bCk.addEventListener("click", check); bRs.addEventListener("click", build);

  /* Kéo thả bằng Pointer Events (chuột, bút, ngón tay) */
  var drag = null;
  function slotAt(x, y){ for (var i = 0; i < slots.length; i++) { var r = slots[i].el.getBoundingClientRect(); if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6) return slots[i]; } return null; }
  function overBank(x, y){ var r = bank.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; }
  box.addEventListener("pointerdown", function(e){
    var c = e.target.closest && e.target.closest(".gn-chip"); if (!c || !box.contains(c) || e.button > 0) return;
    drag = {c: c, x: e.clientX, y: e.clientY, moved: false, id: e.pointerId}; try { c.setPointerCapture(e.pointerId); } catch (x) {}
  });
  box.addEventListener("pointermove", function(e){
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) < 6) return;
    if (!drag.moved) { drag.moved = true; unpick(); drag.g = drag.c.cloneNode(true); drag.g.classList.add("gn-ghost"); drag.g.style.width = drag.c.offsetWidth + "px"; document.body.appendChild(drag.g); drag.c.style.opacity = ".35"; }
    e.preventDefault(); drag.g.style.left = e.clientX + "px"; drag.g.style.top = e.clientY + "px";
    var s = slotAt(e.clientX, e.clientY); slots.forEach(function(x){ x.el.classList.toggle("gn-hot", x === s); });
  });
  function endDrag(e){
    if (!drag || e.pointerId !== drag.id) return; var d = drag; drag = null;
    if (!d.moved) return; /* là cú bấm: xử lí ở sự kiện click */
    d.g.remove(); d.c.style.opacity = ""; slots.forEach(function(x){ x.el.classList.remove("gn-hot"); });
    var s = e.type === "pointerup" ? slotAt(e.clientX, e.clientY) : null;
    if (s) place(d.c, s); else if (e.type === "pointerup" && overBank(e.clientX, e.clientY)) place(d.c, null);
    d.c._skipClick = true; setTimeout(function(){ d.c._skipClick = false; }, 0);
  }
  box.addEventListener("pointerup", endDrag); box.addEventListener("pointercancel", endDrag);
  /* Bấm: chọn nhãn → bấm ô */
  box.addEventListener("click", function(e){
    var c = e.target.closest && e.target.closest(".gn-chip");
    if (c && box.contains(c)) { if (c._skipClick) return;
      if (slotOf(c) && !picked) { place(c, null); return; }           /* bấm nhãn đang nằm trong ô → trả về khay */
      if (picked === c) { unpick(); return; }
      if (picked && slotOf(c)) { var s0 = slotOf(c); var p = picked; unpick(); place(p, s0); return; }
      unpick(); picked = c; c.classList.add("gn-pick"); msg.textContent = "Đã chọn “" + c.dataset.t + "”. Bấm vào ô cần đặt nhãn."; msg.className = "gn-msg"; return; }
    var sl = e.target.closest && e.target.closest(".gn-slot");
    if (sl && picked) { var p2 = picked; unpick(); place(p2, slots[+sl.dataset.i]); }
  });
  box.addEventListener("keydown", function(e){ if (e.key === "Escape") unpick(); });
  build();
  return {check: check, reset: build};
};
})();
