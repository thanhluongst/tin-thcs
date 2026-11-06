/* MÔ PHỎNG SOẠN THẢO VĂN BẢN (Tin 8 Bài 8a)
   DanhSach(box, tuỳ chọn) — trang soạn thảo nhỏ: gõ chữ, Enter tạo mục mới (số thứ tự tự cập nhật), Enter ở mục trống thì thoát danh sách,
     Backspace ở dòng trống thì xoá dòng, Tab / Shift+Tab đổi mức; bấm ô đầu dòng để chọn nhiều dòng; thư viện Numbering / Bullets;
     tuỳ chọn custom: tự tạo mẫu dấu đầu dòng, mẫu thứ tự.
     Tuỳ chọn: title, note, lines ([chữ, kiểu "num"|"bul"|"", mức 0|1]), num (kiểu số mặc định), bul, custom,
               check(x) → [[nhãn, đúng?],…]; x = {lines, num, bul, ev}
   ToRoi(box, tuỳ chọn) — tờ rơi: ảnh nền (Wrap Text, kích thước), hình mũi tên (kéo thả, Shape Fill), màu chữ, ảnh nhỏ (Square).
   DauChanTrang(box, tuỳ chọn) — đầu trang, chân trang, số trang (Tin 8 Bài 9a). */
(function(){
"use strict";
var CSS = ".vb{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0}"
 + ".vb .vb-t{font-weight:700}.vb .vb-note{font-size:13px;opacity:.85}"
 + ".vb .vb-msg{font-size:14px;min-height:1.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}"
 + ".vb .vb-rib{display:flex;flex-wrap:wrap;gap:6px;align-items:center;background:var(--sunk);border-radius:8px;padding:6px}"
 + ".vb .vb-grp{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding-right:8px;border-right:1px solid var(--line)}.vb .vb-grp:last-child{border-right:0}"
 + ".vb .vb-grp>small{width:100%;font-size:11px;opacity:.65}"
 + ".vb button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:7px;padding:4px 9px;cursor:pointer;line-height:1.3}"
 + ".vb button:hover{border-color:var(--accent,#1f8a70)}.vb button.vb-on{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}"
 + ".vb select,.vb input[type=text]{font:inherit;font-size:13.5px;padding:3px 6px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;min-width:0;max-width:100%}"
 + ".vb .vb-lib{display:none;flex-wrap:wrap;gap:6px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface,#fff)}.vb .vb-lib.vb-open{display:flex}"
 + ".vb .vb-lib button{min-width:64px;text-align:left;font-weight:500;white-space:pre;font-family:'Times New Roman',serif;font-size:13px}"
 + ".vb .vb-page{background:#fff;color:#111;border:1px solid #c9ced6;box-shadow:0 2px 6px rgba(0,0,0,.08);border-radius:4px;padding:14px 16px;font-family:'Times New Roman',serif;font-size:16px;min-height:120px;overflow-x:auto}"
 + ".vb .vb-ln{display:flex;align-items:flex-start;gap:4px;border-radius:3px;padding-top:1px;padding-bottom:1px}.vb .vb-ln.vb-cur{background:#eef6ff}.vb .vb-ln.vb-pick{background:#cfe3ff}"
 + ".vb .vb-gut{flex:0 0 18px;height:18px;margin-top:2px;padding:0;border:1px solid #c9ced6;border-radius:4px;cursor:pointer;font:11px sans-serif;color:#2f6fb3;text-align:center;line-height:16px;background:#fff}"
 + ".vb .vb-ln.vb-pick .vb-gut{background:#2f6fb3;color:#fff;border-color:#2f6fb3}"
 + ".vb .vb-mk{flex:0 0 auto;min-width:2em;text-align:left;white-space:pre;line-height:1.35;padding-top:2px}"
 + ".vb .vb-ln textarea{flex:1 1 auto;min-width:4em;border:0;background:transparent;font:inherit;color:#111;padding:2px 0;outline:none;resize:none;overflow:hidden;line-height:1.35;height:1.6em;display:block;min-height:0;width:auto;border-radius:0;font-size:inherit;box-sizing:content-box}.vb .vb-ln textarea:focus-visible{outline:none}"
 + ".vb .vb-ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.vb .vb-ck li::before{content:'☐ '}.vb .vb-ck li.vb-ok::before{content:'☑ ';color:#1c7c54}.vb .vb-ck li.vb-ok{color:#1c7c54;font-weight:600}"
 /* tờ rơi */
 + ".vb .vb-grid{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:12px;align-items:start}@media (max-width:760px){.vb .vb-grid{grid-template-columns:1fr}}"
 + ".vb .vb-fly{position:relative;width:100%;max-width:340px;aspect-ratio:3/4;background:#fff;border:1px solid #c9ced6;box-shadow:0 2px 6px rgba(0,0,0,.1);overflow:hidden;font-family:Arial,sans-serif;color:#111;touch-action:none;user-select:none}"
 + ".vb .vb-flow{position:relative;z-index:1;padding:8% 7%;text-align:center}"
 + ".vb .vb-bg{display:block}.vb .vb-bg svg{display:block;width:100%;height:100%}"
 + ".vb .vb-bg.vb-inline{position:relative;width:var(--w);aspect-ratio:3/4;margin:0 auto 6px}"
 + ".vb .vb-bg.vb-behind,.vb .vb-bg.vb-front{position:absolute;left:0;top:0;width:var(--w);aspect-ratio:3/4}.vb .vb-bg.vb-behind{z-index:0}.vb .vb-bg.vb-front{z-index:3}"
 + ".vb .vb-club{font-size:12px}.vb .vb-big{font-weight:800;font-size:30px;letter-spacing:1px;line-height:1.05;margin-top:6px}.vb .vb-big2{font-weight:700;font-size:15px}"
 + ".vb .vb-sm{font-size:10.5px;margin:8% 6% 0}.vb .vb-time{font-weight:700;font-size:12px;margin-top:9%;line-height:1.4}"
 + ".vb .vb-pic{float:right;width:22%;margin:0 0 4px 6px;shape-outside:margin-box}"
 + ".vb .vb-shape{position:absolute;z-index:2;width:16%;cursor:grab}.vb .vb-shape svg{display:block;width:100%;height:auto;overflow:visible}"
 + ".vb .vb-shape.vb-selx{outline:2px dashed #2f6fb3;outline-offset:2px}"
 + ".vb .vb-sw{display:inline-block;width:16px;height:16px;border-radius:4px;border:1px solid #888;vertical-align:-3px;cursor:pointer;padding:0}";
function fit(el){ el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }
function addCss(){ var s = document.getElementById("vanban-css"); if (!s) { s = document.createElement("style"); s.id = "vanban-css"; document.head.appendChild(s); } s.textContent = CSS; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function roman(n){ var r = "", m = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]]; m.forEach(function(p){ while (n >= p[0]) { r += p[1]; n -= p[0]; } }); return r; }
function alpha(n){ var s = ""; while (n > 0) { n--; s = String.fromCharCode(97 + n % 26) + s; n = Math.floor(n / 26); } return s; }
var NUMS = {"1.": "1. 2. 3.", "1)": "1) 2) 3)", "a.": "a. b. c.", "a)": "a) b) c)", "A.": "A. B. C.", "I.": "I. II. III.", "i.": "i. ii. iii."};
var BULS = ["•", "◦", "▪", "◆", "➢", "✓", "–", "★"];
function fmtNum(style, n){
  if (typeof style === "object") { var c = style.kind === "a" ? alpha(n) : style.kind === "A" ? alpha(n).toUpperCase() : style.kind === "I" ? roman(n) : String(n); return style.pre + c + style.post; }
  var k = style.charAt(0), sep = style.slice(1);
  var v = k === "1" ? n : k === "a" ? alpha(n) : k === "A" ? alpha(n).toUpperCase() : k === "I" ? roman(n) : roman(n).toLowerCase();
  return v + sep;
}
function nameNum(s){ return typeof s === "object" ? "mẫu riêng “" + fmtNum(s, 1) + "”" : (NUMS[s] || s); }

window.DanhSach = function(box, opt){
  addCss(); opt = opt || {};
  var L = (opt.lines || []).map(function(x){ x = Array.isArray(x) ? x : [x]; return {t: x[0] || "", f: x[1] || "", l: x[2] || 0}; });
  if (!L.length) L.push({t: "", f: "", l: 0});
  var num = opt.num || "1.", bul = opt.bul || "•", cur = 0, pick = {}, ev = {}, start = JSON.stringify(L), q = function(s){ return box.querySelector(s); };
  box.classList.add("vb");
  box.innerHTML = '<div class="vb-t">' + esc(opt.title || "Mô phỏng danh sách dạng liệt kê") + "</div>"
    + '<div class="vb-rib">'
    + '<div class="vb-grp"><small>Home · Paragraph</small><button type="button" data-a="bul" title="Bullets">•≡ Bullets</button><button type="button" data-a="bulLib" aria-label="Thư viện dấu đầu dòng">▾</button>'
    + '<button type="button" data-a="num" title="Numbering">1≡ Numbering</button><button type="button" data-a="numLib" aria-label="Thư viện số thứ tự">▾</button></div>'
    + '<div class="vb-grp"><small>Mức</small><button type="button" data-a="out" title="Shift+Tab">⇤ Giảm mức</button><button type="button" data-a="in" title="Tab">⇥ Tăng mức</button></div>'
    + '<div class="vb-grp"><small>Đoạn văn</small><button type="button" data-a="enter">↵ Enter</button><button type="button" data-a="del">✕ Xoá dòng</button><button type="button" data-a="reset">↺ Ban đầu</button></div>'
    + "</div>"
    + '<div class="vb-lib" data-lib="num"></div><div class="vb-lib" data-lib="bul"></div>'
    + (opt.custom ? '<div class="vb-rib"><div class="vb-grp"><small>Define New Bullet – mẫu dấu đầu dòng mới</small><input type="text" data-cb maxlength="3" size="4" placeholder="❀"><button type="button" data-a="cbul">Dùng kí hiệu này</button></div>'
      + '<div class="vb-grp"><small>Define New Number Format – mẫu thứ tự mới</small><input type="text" data-cp size="6" placeholder="Bước "><select data-ck><option value="1">1, 2, 3</option><option value="a">a, b, c</option><option value="A">A, B, C</option><option value="I">I, II, III</option></select><input type="text" data-cs size="3" placeholder=":"><button type="button" data-a="cnum">Dùng mẫu này</button></div></div>' : "")
    + '<div class="vb-page" data-page></div>'
    + '<div class="vb-msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="vb-ck" data-ckl></ul>' : "") + '<div class="vb-note">' + (opt.note || "Gõ chữ trực tiếp. <b>Enter</b>: tạo đoạn mới · <b>Enter</b> ở mục trống: thoát danh sách · <b>Backspace</b> ở dòng trống: xoá dòng · <b>Tab</b>/<b>Shift+Tab</b>: đổi mức. Bấm ô vuông đầu dòng để chọn nhiều dòng rồi bấm Numbering hoặc Bullets.") + "</div>";
  function say(t){ q("[data-msg]").textContent = t; }
  function marks(){ var c0 = 0, c1 = 0, out = [];
    L.forEach(function(x){
      if (x.l === 0) c1 = 0;
      if (x.f === "num") { if (x.l === 0) { c0++; out.push(fmtNum(num, c0)); } else { c1++; out.push(fmtNum(typeof num === "object" ? "a)" : (num.charAt(0) === "1" ? "a)" : "1)"), c1)); } }
      else if (x.f === "bul") out.push(x.l ? (bul === "◦" ? "▪" : bul === "•" ? "◦" : bul) : bul);
      else out.push("");
    }); return out; }
  function draw(focus){
    var mk = marks();
    q("[data-page]").innerHTML = L.map(function(x, i){
      var pad = x.l ? 30 : 0;
      return '<div class="vb-ln' + (i === cur ? " vb-cur" : "") + (pick[i] ? " vb-pick" : "") + '" data-i="' + i + '" style="padding-left:' + pad + 'px">'
        + '<button type="button" class="vb-gut" data-g="' + i + '" aria-label="Chọn dòng ' + (i + 1) + '">' + (pick[i] ? "✓" : "") + "</button>"
        + (x.f ? '<span class="vb-mk">' + esc(mk[i]) + "</span>" : "")
        + '<textarea rows="1" data-in="' + i + '" aria-label="Dòng ' + (i + 1) + '">' + esc(x.t) + "</textarea></div>"; }).join("");
    box.querySelectorAll(".vb-ln textarea").forEach(fit);
    if (focus != null) { var inp = q('[data-in="' + focus + '"]'); if (inp) { inp.focus(); var n = inp.value.length; try { inp.setSelectionRange(focus === cur && draw.caret != null ? draw.caret : n, focus === cur && draw.caret != null ? draw.caret : n); } catch (e) {} draw.caret = null; } }
    q("[data-lib=num]").innerHTML = '<button type="button" data-n="">None</button>' + Object.keys(NUMS).map(function(k){ return '<button type="button" data-n="' + k + '" class="' + (k === num ? "vb-on" : "") + '">' + [1,2,3].map(function(n){ return fmtNum(k, n) + " ──"; }).join("\n") + "</button>"; }).join("");
    q("[data-lib=bul]").innerHTML = '<button type="button" data-b="">None</button>' + BULS.map(function(k){ return '<button type="button" data-b="' + k + '" class="' + (k === bul ? "vb-on" : "") + '">' + [1,2,3].map(function(){ return k + " ──"; }).join("\n") + "</button>"; }).join("");
    if (opt.check) q("[data-ckl]").innerHTML = opt.check({lines: L, num: num, bul: bul, ev: ev}).map(function(x){ return "<li class='" + (x[1] ? "vb-ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function targets(){ var t = Object.keys(pick).filter(function(k){ return pick[k]; }).map(Number); return t.length ? t : [cur]; }
  function apply(f, style){
    var t = targets(); if (style != null) { if (f === "num") num = style; else bul = style; }
    var all = t.every(function(i){ return L[i].f === f; });
    t.forEach(function(i){ L[i].f = (all && style == null) ? "" : f; });
    if (f === "num" && !(all && style == null)) { ev.num = true; if (t.length > 1) ev.numMany = true; }
    if (f === "bul" && !(all && style == null)) ev.bul = true;
    if (style != null) ev[f === "num" ? "numStyle" : "bulStyle"] = true;
    pick = {};
    say((all && style == null) ? "Đã bỏ định dạng danh sách cho " + t.length + " dòng." : "Đã áp dụng " + (f === "num" ? "danh sách có thứ tự (" + nameNum(num) + ")" : "danh sách dấu đầu dòng “" + bul + "”") + " cho " + t.length + " dòng. Thứ tự được đánh tự động.");
    draw();
  }
  function enter(i, caret){
    var x = L[i];
    if (x.f && !x.t.trim()) { x.f = ""; x.l = 0; say("Nhấn Enter ở mục trống: thoát khỏi danh sách (dòng này không còn số thứ tự/dấu đầu dòng)."); cur = i; draw(i); return; }
    var c = caret == null ? x.t.length : caret, rest = x.t.slice(c); x.t = x.t.slice(0, c);
    L.splice(i + 1, 0, {t: rest, f: x.f, l: x.l}); cur = i + 1; ev.enter = (ev.enter || 0) + 1;
    if (x.f === "num" && i === 1 && L.length >= 5) ev.after2 = true;
    say(x.f ? "Nhấn Enter: tạo một mục mới ở vị trí " + (i + 2) + "; " + (x.f === "num" ? "các mục phía sau tự động đánh số lại." : "mục mới tự có dấu đầu dòng.") : "Nhấn Enter: tạo một đoạn văn bản mới.");
    pick = {}; draw.caret = 0; draw(i + 1);
  }
  function remove(i){ if (L.length <= 1) { L[0] = {t: "", f: "", l: 0}; draw(0); return; }
    L.splice(i, 1); cur = Math.max(0, i - 1); ev.del = true; say("Đã xoá một đoạn. " + (L.some(function(x){ return x.f === "num"; }) ? "Số thứ tự tự động cập nhật." : "")); pick = {}; draw(cur); }
  function level(d){ var t = targets(), ch = false; t.forEach(function(i){ var nl = Math.max(0, Math.min(1, L[i].l + d)); if (nl !== L[i].l) { L[i].l = nl; ch = true; if (nl && !L[i].f) L[i].f = "bul"; } });
    if (ch && d > 0) { ev.lvl = true; say("Tăng mức: dòng lùi vào, trở thành mục con (cấp 2) của danh sách."); } else if (ch) say("Giảm mức: dòng trở về cấp 1."); else say(d > 0 ? "Chỉ có 2 mức trong mô phỏng này." : "Dòng đã ở mức 1.");
    draw(); }
  var page = q("[data-page]");
  page.addEventListener("input", function(e){ var i = e.target.dataset.in; if (i != null) { L[+i].t = e.target.value.replace(/\n/g, " "); fit(e.target); if (opt.check) q("[data-ckl]").innerHTML = opt.check({lines: L, num: num, bul: bul, ev: ev}).map(function(x){ return "<li class='" + (x[1] ? "vb-ok" : "") + "'>" + x[0] + "</li>"; }).join(""); } });
  page.addEventListener("focusin", function(e){ var i = e.target.dataset.in; if (i != null && +i !== cur) { cur = +i; box.querySelectorAll(".vb-ln").forEach(function(d){ d.classList.toggle("vb-cur", +d.dataset.i === cur); }); } });
  page.addEventListener("keydown", function(e){ var i = e.target.dataset.in; if (i == null) return; i = +i;
    if (e.key === "Enter") { e.preventDefault(); enter(i, e.target.selectionStart); }
    else if (e.key === "Backspace" && e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
      e.preventDefault();
      if (L[i].f) { L[i].f = ""; L[i].l = 0; say("Backspace ở đầu mục: bỏ số thứ tự/dấu đầu dòng của dòng này."); draw.caret = 0; draw(i); }
      else if (!L[i].t && i > 0) remove(i);
      else if (i > 0) { var p = L[i - 1], n = p.t.length; p.t += L[i].t; L.splice(i, 1); cur = i - 1; draw.caret = n; draw(i - 1); } }
    else if (e.key === "Tab") { e.preventDefault(); cur = i; pick = {}; level(e.shiftKey ? -1 : 1); var inp = q('[data-in="' + i + '"]'); if (inp) inp.focus(); }
    else if (e.key === "ArrowUp" && i > 0) { e.preventDefault(); cur = i - 1; draw(i - 1); }
    else if (e.key === "ArrowDown" && i < L.length - 1) { e.preventDefault(); cur = i + 1; draw(i + 1); } });
  box.addEventListener("click", function(e){
    var g = e.target.closest("[data-g]"); if (g) { var gi = +g.dataset.g;
      if (e.shiftKey) { var a = Math.min(cur, gi), b = Math.max(cur, gi); for (var k = a; k <= b; k++) pick[k] = true; } else pick[gi] = !pick[gi];
      cur = gi; var c = Object.keys(pick).filter(function(k){ return pick[k]; }).length; say(c ? "Đang chọn " + c + " dòng. Bấm Numbering hoặc Bullets để tạo danh sách." : "Đã bỏ chọn."); draw(); return; }
    var nb = e.target.closest("[data-n]"); if (nb) { q("[data-lib=num]").classList.remove("vb-open"); if (nb.dataset.n === "") { targets().forEach(function(i){ if (L[i].f === "num") L[i].f = ""; }); pick = {}; say("None: bỏ danh sách có thứ tự."); draw(); } else apply("num", nb.dataset.n); return; }
    var bb = e.target.closest("[data-b]"); if (bb) { q("[data-lib=bul]").classList.remove("vb-open"); if (bb.dataset.b === "") { targets().forEach(function(i){ if (L[i].f === "bul") L[i].f = ""; }); pick = {}; say("None: bỏ dấu đầu dòng."); draw(); } else apply("bul", bb.dataset.b); return; }
    var t = e.target.closest("[data-a]"); if (!t) return; var a2 = t.dataset.a;
    if (a2 === "num" || a2 === "bul") apply(a2);
    else if (a2 === "numLib" || a2 === "bulLib") { var lib = q("[data-lib=" + a2.slice(0, 3) + "]"), open = !lib.classList.contains("vb-open"); box.querySelectorAll(".vb-lib").forEach(function(x){ x.classList.remove("vb-open"); }); if (open) lib.classList.add("vb-open"); say(open ? (a2 === "numLib" ? "Numbering Library: chọn một kiểu danh sách có thứ tự." : "Bullet Library: chọn một kiểu dấu đầu dòng.") : ""); }
    else if (a2 === "in") level(1);
    else if (a2 === "out") level(-1);
    else if (a2 === "enter") enter(cur);
    else if (a2 === "del") remove(cur);
    else if (a2 === "reset") { L = JSON.parse(start); num = opt.num || "1."; bul = opt.bul || "•"; cur = 0; pick = {}; ev = {}; say("Đã trả về văn bản ban đầu."); draw(); }
    else if (a2 === "cbul") { var s = q("[data-cb]").value.trim(); if (!s) { say("Nhập một kí hiệu (có thể dán biểu tượng như ❀ ☺ ►)."); return; } ev.custom = ev.cbul = true; apply("bul", s); }
    else if (a2 === "cnum") { var st = {pre: q("[data-cp]").value, kind: q("[data-ck]").value, post: q("[data-cs]").value}; if (!st.pre && !st.post) { say("Nhập phần chữ đứng trước hoặc sau số, ví dụ “Bước ” và “:”."); return; } ev.custom = ev.cnum = true; apply("num", st); }
  });
  say(opt.msg || "Bấm vào một dòng để đặt con trỏ soạn thảo.");
  draw();
  return {lines: function(){ return L; }, ev: function(){ return ev; }};
};

/* ---------- TỜ RƠI ---------- */
var BG = '<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>'
 + '<radialGradient id="vbg1" cx="50%" cy="55%" r="70%"><stop offset="0" stop-color="#2d8bd8"/><stop offset=".55" stop-color="#103d8a"/><stop offset="1" stop-color="#06173f"/></radialGradient>'
 + '<radialGradient id="vbg2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#9be7ff" stop-opacity=".9"/><stop offset="1" stop-color="#2d8bd8" stop-opacity="0"/></radialGradient></defs>'
 + '<rect width="300" height="400" fill="url(#vbg1)"/>'
 + (function(){ var s = ""; for (var i = 0; i < 16; i++) s += '<line x1="0" y1="' + (25 * i) + '" x2="300" y2="' + (25 * i) + '" stroke="#5fc4ff" stroke-opacity=".12"/>'; for (var j = 0; j < 13; j++) s += '<line x1="' + (25 * j) + '" y1="0" x2="' + (25 * j) + '" y2="400" stroke="#5fc4ff" stroke-opacity=".12"/>'; return s; })()
 + '<circle cx="150" cy="215" r="95" fill="url(#vbg2)"/><circle cx="150" cy="215" r="80" fill="none" stroke="#bdf0ff" stroke-opacity=".7"/>'
 + '<ellipse cx="150" cy="215" rx="80" ry="28" fill="none" stroke="#bdf0ff" stroke-opacity=".5"/><ellipse cx="150" cy="215" rx="30" ry="80" fill="none" stroke="#bdf0ff" stroke-opacity=".5"/>'
 + '<text x="40" y="330" fill="#7fe0ff" fill-opacity=".35" font-family="monospace" font-size="11">01001011 10110 0110 1001</text><text x="70" y="110" fill="#7fe0ff" fill-opacity=".35" font-family="monospace" font-size="11">1101 0010 111010 01</text></svg>';
var PIC = '<svg viewBox="0 0 60 50" aria-hidden="true"><rect x="2" y="2" width="56" height="34" rx="3" fill="#e9f3ff" stroke="#2f6fb3" stroke-width="2"/><rect x="7" y="7" width="46" height="24" fill="#2f6fb3"/><path d="M12 26l9-10 7 7 5-5 9 8z" fill="#ffd54f"/><rect x="24" y="37" width="12" height="5" fill="#2f6fb3"/><rect x="16" y="42" width="28" height="4" rx="2" fill="#2f6fb3"/></svg>';
var ARROW = '<svg viewBox="0 0 60 80"><path d="M6 4 C40 4 54 28 44 54 L56 54 L36 78 L18 54 L31 54 C38 32 28 16 6 16 Z" fill="FILL" stroke="#1f3f7a" stroke-width="1.5"/></svg>';
var COLORS = [["#4472c4","Xanh (mặc định)"],["#ffd400","Vàng"],["#e0413a","Đỏ"],["#21a366","Xanh lá"],["#ffffff","Trắng"]];
window.ToRoi = function(box, opt){
  addCss(); opt = opt || {};
  var st, sel = null, ev = {}, q = function(s){ return box.querySelector(s); };
  box.classList.add("vb");
  box.innerHTML = '<div class="vb-t">' + esc(opt.title || "Mô phỏng tờ rơi") + "</div>"
    + '<div class="vb-grid"><div class="vb-fly" data-fly></div><div style="display:grid;gap:8px;min-width:0">'
    + '<div class="vb-rib"><div class="vb-grp"><small>Insert</small><button type="button" data-a="pic">🖼 Picture (ảnh nền)</button><button type="button" data-a="ar">↷ Shapes: mũi tên cong phải</button><button type="button" data-a="al">↶ Shapes: mũi tên cong trái</button><button type="button" data-a="sm">🖥 Picture (ảnh nhỏ)</button></div></div>'
    + '<div class="vb-rib" data-fmt-bg><div class="vb-grp"><small>Format ảnh nền · Arrange → Wrap Text</small><button type="button" data-w="inline">In Line with Text</button><button type="button" data-w="behind">Behind Text</button><button type="button" data-w="front">In Front of Text</button></div>'
    + '<div class="vb-grp"><small>Kích thước ảnh nền (kéo góc ảnh)</small><input type="range" min="30" max="110" step="5" data-sz aria-label="Kích thước ảnh nền"> <span data-szv></span></div></div>'
    + '<div class="vb-rib"><div class="vb-grp"><small>Format hình đồ hoạ · Shape Styles → Shape Fill</small><span data-fill></span></div>'
    + '<div class="vb-grp"><small>Home · Font Color – chữ “TUYỂN THÀNH VIÊN”</small><span data-tc></span></div>'
    + '<div class="vb-grp"><small>Xoá / làm lại</small><button type="button" data-a="delete">Delete đối tượng đang chọn</button><button type="button" data-a="reset">↺ Làm lại</button></div></div>'
    + '<div class="vb-msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="vb-ck" data-ckl></ul>' : "") + "</div></div>"
    + (opt.note ? '<div class="vb-note">' + opt.note + "</div>" : "");
  function say(t){ q("[data-msg]").textContent = t; }
  function reset(){ st = {bg: false, wrap: "inline", size: 55, shapes: [], tc: "#111111", pic: false}; sel = null; ev = {}; say("Tờ rơi đang chỉ có chữ (Hình 8a.5). Bấm Insert → Picture để chèn ảnh nền."); draw(); }
  function draw(){
    var fly = q("[data-fly]"), bgHtml = st.bg ? '<div class="vb-bg vb-' + st.wrap + '" style="--w:' + st.size + '%">' + BG + "</div>" : "";
    var light = st.bg && st.wrap === "behind" && st.size >= 100;
    var base = light ? "#ffffff" : "#111111";
    fly.innerHTML = (st.wrap !== "inline" ? bgHtml : "")
      + '<div class="vb-flow" style="color:' + base + '">' + (st.wrap === "inline" ? bgHtml : "")
      + (st.pic ? '<div class="vb-pic">' + PIC + "</div>" : "")
      + '<div class="vb-club">Câu lạc bộ Tin học</div><div class="vb-big" style="color:' + st.tc + '">TUYỂN</div><div class="vb-big2" style="color:' + st.tc + '">THÀNH VIÊN</div>'
      + '<div class="vb-sm">Hãy đến với chúng tôi để cùng nhau thoả sức sáng tạo với đam mê Tin học</div>'
      + '<div class="vb-time">15h ngày ……<br>Tại phòng 305<br>Nhà A</div></div>'
      + st.shapes.map(function(s, i){ return '<div class="vb-shape' + (sel === i ? " vb-selx" : "") + '" data-s="' + i + '" style="left:' + s.x + "%;top:" + s.y + "%;" + (s.flip ? "transform:scaleX(-1)" : "") + '">' + ARROW.replace("FILL", s.fill) + "</div>"; }).join("");
    q("[data-fmt-bg]").style.opacity = st.bg ? 1 : .45;
    box.querySelectorAll("[data-w]").forEach(function(b){ b.classList.toggle("vb-on", st.bg && b.dataset.w === st.wrap); b.disabled = !st.bg; });
    q("[data-sz]").value = st.size; q("[data-sz]").disabled = !st.bg; q("[data-szv]").textContent = st.size + "%";
    q("[data-fill]").innerHTML = COLORS.map(function(c){ return '<button type="button" class="vb-sw" data-f="' + c[0] + '" title="' + c[1] + '" aria-label="' + c[1] + '" style="background:' + c[0] + '"></button>'; }).join(" ");
    q("[data-tc]").innerHTML = [["#111111","Đen"],["#ffd400","Vàng"],["#ffffff","Trắng"],["#e0413a","Đỏ"]].map(function(c){ return '<button type="button" class="vb-sw" data-c="' + c[0] + '" title="' + c[1] + '" aria-label="Chữ màu ' + c[1] + '" style="background:' + c[0] + '"></button>'; }).join(" ");
    if (opt.check) q("[data-ckl]").innerHTML = opt.check(info()).map(function(x){ return "<li class='" + (x[1] ? "vb-ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function info(){ return {bg: st.bg, wrap: st.wrap, size: st.size, shapes: st.shapes.slice(), tc: st.tc, pic: st.pic, ev: ev,
    cover: st.bg && st.wrap === "behind" && st.size >= 100, yellowShapes: st.shapes.filter(function(s){ return s.fill === "#ffd400"; }).length}; }
  box.addEventListener("click", function(e){
    var t = e.target.closest("[data-a],[data-w],[data-f],[data-c]"); if (!t) return;
    if (t.dataset.w) { st.wrap = t.dataset.w; ev[st.wrap] = true;
      say(st.wrap === "inline" ? "In Line with Text: ảnh nằm cùng dòng với chữ, đẩy nội dung xuống dưới (Hình 8a.9b)." : st.wrap === "behind" ? "Behind Text: ảnh nằm ở lớp dưới, chữ ở lớp trên (Hình 8a.9c). Giờ kéo kích thước để ảnh phủ kín tờ rơi." : "In Front of Text: ảnh nằm ở lớp trên, che mất chữ — không phù hợp với ảnh nền."); draw(); return; }
    if (t.dataset.f) { if (sel == null) { say("Hãy nháy chuột chọn một hình mũi tên trước, rồi chọn màu Shape Fill."); return; } st.shapes[sel].fill = t.dataset.f; ev.fill = true; say("Đã đổi màu tô (Shape Fill) của hình đang chọn."); draw(); return; }
    if (t.dataset.c) { st.tc = t.dataset.c; ev.tc = true; say(st.tc === "#ffd400" ? "Chữ “TUYỂN THÀNH VIÊN” màu vàng nổi bật trên nền xanh." : "Đã đổi màu chữ."); draw(); return; }
    var a = t.dataset.a;
    if (a === "pic") { if (st.bg) { say("Tờ rơi đã có ảnh nền."); return; } st.bg = true; st.wrap = "inline"; st.size = 55; say("Đã chèn ảnh (mặc định In Line with Text): ảnh đẩy chữ xuống dưới (Hình 8a.9b). Chọn Wrap Text → Behind Text."); }
    else if (a === "ar" || a === "al") { st.shapes.push({x: a === "ar" ? 10 : 74, y: 66, fill: "#4472c4", flip: a === "al"}); sel = st.shapes.length - 1; ev.shape = true; say("Đã vẽ hình mũi tên (màu mặc định). Kéo thả để di chuyển; chọn màu ở Shape Fill."); }
    else if (a === "sm") { if (st.pic) { say("Đã có ảnh nhỏ ở góc trên bên phải."); return; } st.pic = true; say("Đã chèn ảnh nhỏ ở góc trên bên phải, Wrap Text → Square: chữ bao quanh ảnh."); }
    else if (a === "delete") { if (sel == null) { say("Chưa chọn hình nào. Nháy vào hình mũi tên để chọn."); return; } st.shapes.splice(sel, 1); sel = null; say("Đã xoá hình đang chọn (phím Delete)."); }
    else if (a === "reset") { reset(); return; }
    draw();
  });
  q("[data-sz]").addEventListener("input", function(){ st.size = +this.value; ev.size = true; q("[data-szv]").textContent = st.size + "%";
    var b = q(".vb-bg"); if (b) b.style.setProperty("--w", st.size + "%");
    if (st.size >= 100) say(st.wrap === "behind" ? "Ảnh nền đã phủ kín tờ rơi (Hình 8a.9d)." : "Ảnh đã to bằng trang, nhưng chưa ở lớp dưới chữ."); });
  q("[data-sz]").addEventListener("change", draw);
  /* kéo thả hình */
  var drag = null, fly = q("[data-fly]");
  fly.addEventListener("pointerdown", function(e){ var s = e.target.closest("[data-s]"); if (!s) { if (sel != null) { sel = null; draw(); } return; }
    sel = +s.dataset.s; var r = fly.getBoundingClientRect(), sh = st.shapes[sel];
    drag = {dx: (e.clientX - r.left) / r.width * 100 - sh.x, dy: (e.clientY - r.top) / r.height * 100 - sh.y, el: s, moved: false};
    box.querySelectorAll(".vb-shape").forEach(function(x){ x.classList.toggle("vb-selx", x === s); }); try { fly.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
  fly.addEventListener("pointermove", function(e){ if (!drag) return; var r = fly.getBoundingClientRect(), sh = st.shapes[sel];
    sh.x = Math.max(-5, Math.min(90, (e.clientX - r.left) / r.width * 100 - drag.dx)); sh.y = Math.max(-5, Math.min(88, (e.clientY - r.top) / r.height * 100 - drag.dy));
    drag.el.style.left = sh.x + "%"; drag.el.style.top = sh.y + "%"; drag.moved = true; });
  fly.addEventListener("pointerup", function(){ if (drag) { if (drag.moved) { ev.move = true; say("Đã di chuyển hình."); } else say("Đã chọn hình mũi tên. Có thể đổi màu (Shape Fill) hoặc Delete."); drag = null; draw(); } });
  reset();
  return {info: info};
};

/* ---------- ĐẦU TRANG, CHÂN TRANG, SỐ TRANG (Tin 8 Bài 9a) ----------
   DauChanTrang(box, tuỳ chọn): Insert → Header / Footer / Page Number như Word; tự lặp lại trên mọi trang.
   Tuỳ chọn: title, note, start (trạng thái ban đầu), check(x) → [[nhãn, đúng?],…]; x = {h, f, pn, edit, ev} */
var CSS2 = ".vb .vb-pages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:640px}@media (max-width:520px){.vb .vb-pages{grid-template-columns:1fr;max-width:300px}}"
 + ".vb .vb-pg{position:relative;aspect-ratio:210/297;background:#fff;color:#111;border:1px solid #c9ced6;box-shadow:0 2px 6px rgba(0,0,0,.1);font-family:'Times New Roman',serif;overflow:hidden}"
 + ".vb .vb-hf{position:absolute;left:0;right:0;padding:3% 9%;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;gap:4px;font-size:10px;min-height:7%;cursor:pointer;box-sizing:border-box}"
 + ".vb .vb-hf.vb-h{top:0}.vb .vb-hf.vb-f{bottom:0}.vb .vb-hf>span:nth-child(1){text-align:left}.vb .vb-hf>span:nth-child(2){text-align:center}.vb .vb-hf>span:nth-child(3){text-align:right}"
 + ".vb .vb-hf .vb-ph{color:#7a7a7a;background:#e8e8e8;padding:0 3px;font-style:normal;font-weight:400}"
 + ".vb .vb-hf.vb-ed{outline:1px dashed #2f6fb3;outline-offset:-2px;background:rgba(47,111,179,.05)}"
 + ".vb .vb-hf .vb-lab{position:absolute;left:4px;font:9px sans-serif;color:#fff;background:#2f6fb3;padding:0 4px;border-radius:2px}.vb .vb-hf.vb-h .vb-lab{bottom:-12px}.vb .vb-hf.vb-f .vb-lab{top:-12px}"
 + ".vb .vb-hl{position:absolute;left:9%;right:9%;height:0;border-top:1.5px solid}"
 + ".vb .vb-body{position:absolute;left:9%;right:9%;top:13%;bottom:12%;font-size:7.6px;line-height:1.45;transition:opacity .2s}.vb .vb-body.vb-dim{opacity:.35}"
 + ".vb .vb-body h4{margin:2px 0 4px;text-align:center;font-size:10.5px;line-height:1.2}.vb .vb-body p{margin:0}.vb .vb-body .vb-i{padding-left:9px}.vb .vb-body .vb-ii{padding-left:20px}"
 + ".vb .vb-menu{display:none;flex-wrap:wrap;gap:6px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface,#fff)}.vb .vb-menu.vb-open{display:flex}"
 + ".vb .vb-menu b{width:100%;font-size:12.5px}"
 + ".vb .vb-tools{display:none;gap:6px;flex-wrap:wrap;align-items:center;background:#e8f1fb;border:1px solid #b9d3ef;border-radius:8px;padding:6px;color:#111}.vb .vb-tools.vb-open{display:flex}"
 + ".vb .vb-tools label{font-size:13px;display:inline-flex;gap:4px;align-items:center}";
var BODY1 = '<h4>DỰ ÁN<br>THÀNH LẬP CLB TIN HỌC</h4><p><b>A. Các công việc cần làm</b></p><p>1) Khảo sát:</p><p class="vb-ii">• Tạo Phiếu khảo sát.</p><p class="vb-ii">• Phát Phiếu khảo sát.</p><p class="vb-ii">• Thu Phiếu khảo sát.</p>'
 + '<p>2) Xử lí dữ liệu:</p><p class="vb-ii">• Nhập dữ liệu vào phần mềm bảng tính.</p><p class="vb-ii">• Lọc, sắp xếp dữ liệu, tạo biểu đồ.</p><p class="vb-ii">• Từ kết quả xử lí đưa ra kết luận.</p>'
 + '<p>3) Quảng cáo và tuyển thành viên:</p><p class="vb-ii">• Tạo tờ rơi quảng cáo và tuyển thành viên.</p><p class="vb-ii">• Phát tờ rơi đến học sinh trong trường.</p>'
 + '<p>4) Tổ chức buổi ra mắt CLB Tin học:</p><p class="vb-ii">• Tạo bài trình chiếu.</p><p class="vb-ii">• Tạo tài liệu CLB.</p><p><b>B. Phân công thực hiện</b></p><p class="vb-i">Phụ lục 1</p>';
var BODY2 = '<p><b>C. Tài liệu dự án</b></p><h4>PHIẾU KHẢO SÁT</h4><p>Họ và tên: ................................</p><p>Lớp: ......................................</p>'
 + '<p>Bạn mong muốn tìm hiểu thêm nội dung nào của môn Tin học? (Chọn một nội dung)</p>'
 + ["Ngôn ngữ lập trình","Mạng máy tính","Đồ hoạ máy tính","Bảng tính điện tử","Soạn thảo văn bản","Phần mềm trình chiếu"].map(function(t, i){ return '<p class="vb-i" style="display:flex;justify-content:space-between"><span>' + (i + 1) + ". " + t + "</span><span>☐</span></p>"; }).join("");
var HCOL = [["#111111","Đen"],["#ed7d31","Cam"],["#2f6fb3","Xanh"],["#c00000","Đỏ"]];
function blankHF(){ return {on: false, mode: "blank", text: "", al: "L", L: "", C: "", R: "", it: false, b: false, col: "#111111", line: false}; }
window.DauChanTrang = function(box, opt){
  addCss(); opt = opt || {};
  var s0 = document.getElementById("vanban-css2"); if (!s0) { s0 = document.createElement("style"); s0.id = "vanban-css2"; document.head.appendChild(s0); } s0.textContent = CSS2;
  var S, ev, q = function(x){ return box.querySelector(x); };
  function init(){ S = {h: blankHF(), f: blankHF(), pn: null, edit: null}; if (opt.start) { var st = JSON.parse(JSON.stringify(opt.start)); ["h","f"].forEach(function(k){ if (st[k]) S[k] = Object.assign(blankHF(), st[k]); }); S.pn = st.pn || null; } ev = {pos: {}}; }
  box.classList.add("vb");
  box.innerHTML = '<div class="vb-t">' + esc(opt.title || "Mô phỏng đầu trang, chân trang") + "</div>"
    + '<div class="vb-rib"><div class="vb-grp"><small>Insert · Header &amp; Footer</small><button type="button" data-m="h">Header ▾</button><button type="button" data-m="f">Footer ▾</button><button type="button" data-m="p">Page Number ▾</button></div>'
    + '<div class="vb-grp"><small>Làm lại</small><button type="button" data-a="reset">↺ Ban đầu</button></div></div>'
    + '<div class="vb-menu" data-menu="h"><b>Header</b><button type="button" data-a="hBlank">Blank</button><button type="button" data-a="hThree">Blank (Three Columns)</button><button type="button" data-a="hEdit">Edit Header</button><button type="button" data-a="hRemove">Remove Header</button></div>'
    + '<div class="vb-menu" data-menu="f"><b>Footer</b><button type="button" data-a="fBlank">Blank</button><button type="button" data-a="fThree">Blank (Three Columns)</button><button type="button" data-a="fEdit">Edit Footer</button><button type="button" data-a="fRemove">Remove Footer</button></div>'
    + '<div class="vb-menu" data-menu="p"><b>Top of Page</b><button type="button" data-pn="top-L">Plain Number 1 (trái)</button><button type="button" data-pn="top-C">Plain Number 2 (giữa)</button><button type="button" data-pn="top-R">Plain Number 3 (phải)</button>'
    + '<b>Bottom of Page</b><button type="button" data-pn="bottom-L">Plain Number 1 (trái)</button><button type="button" data-pn="bottom-C">Plain Number 2 (giữa)</button><button type="button" data-pn="bottom-R">Plain Number 3 (phải)</button><button type="button" data-pn="">Remove Page Numbers</button></div>'
    + '<div class="vb-tools" data-tools></div>'
    + '<div class="vb-pages" data-pages></div>'
    + '<div class="vb-msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="vb-ck" data-ckl></ul>' : "") + '<div class="vb-note">' + (opt.note || "Nháy đúp vào phần trên cùng hoặc dưới cùng của trang để sửa đầu trang/chân trang (giống Word).") + "</div>";
  function say(t){ q("[data-msg]").textContent = t; }
  function slots(k, page){
    var o = S[k], sl = {L: "", C: "", R: ""}, sty = 'style="color:' + o.col + ";" + (o.it ? "font-style:italic;" : "") + (o.b ? "font-weight:700;" : "") + '"';
    var ph = S.edit === k ? '<span class="vb-ph">[Type here]</span>' : "";
    if (o.on) { if (o.mode === "blank") sl[o.al] = o.text ? "<span " + sty + ">" + esc(o.text) + "</span>" : ph;
      else ["L","C","R"].forEach(function(a){ sl[a] = o[a] ? "<span " + sty + ">" + esc(o[a]) + "</span>" : ph; }); }
    if (S.pn && S.pn.pos === (k === "h" ? "top" : "bottom")) { var n = '<span style="color:' + (o.on ? o.col : "#111") + '">' + page + "</span>"; sl[S.pn.al] = sl[S.pn.al] ? (S.pn.al === "R" ? sl[S.pn.al] + "&nbsp;&nbsp;" + n : n + "&nbsp;&nbsp;" + sl[S.pn.al]) : n; }
    return sl;
  }
  function hf(k, page){ var sl = slots(k, page), ed = S.edit === k;
    return '<div class="vb-hf vb-' + k + (ed ? " vb-ed" : "") + '" data-hf="' + k + '" title="Nháy đúp để sửa ' + (k === "h" ? "đầu trang" : "chân trang") + '"><span>' + sl.L + "</span><span>" + sl.C + "</span><span>" + sl.R + "</span>" + (ed ? '<i class="vb-lab">' + (k === "h" ? "Header" : "Footer") + "</i>" : "") + "</div>"
      + (S[k].on && S[k].line ? '<div class="vb-hl" style="border-color:' + S[k].col + ";" + (k === "h" ? "top:11%" : "bottom:9.5%") + '"></div>' : ""); }
  function tools(){
    var t = q("[data-tools]"), k = S.edit; if (!k) { t.classList.remove("vb-open"); t.innerHTML = ""; return; }
    var o = S[k], nm = k === "h" ? "Header" : "Footer";
    var fields = o.mode === "blank"
      ? '<label>Nội dung ' + nm + ' <input type="text" data-tx="text" size="16" value="' + esc(o.text) + '" placeholder="Type here"></label>'
        + ' <span>Căn lề:</span><button type="button" data-al="L" class="' + (o.al === "L" ? "vb-on" : "") + '">⯇ Trái</button><button type="button" data-al="C" class="' + (o.al === "C" ? "vb-on" : "") + '">Giữa</button><button type="button" data-al="R" class="' + (o.al === "R" ? "vb-on" : "") + '">Phải ⯈</button>'
      : ["L","C","R"].map(function(a){ return '<label>' + {L: "Trái", C: "Giữa", R: "Phải"}[a] + ' <input type="text" data-tx="' + a + '" size="9" value="' + esc(o[a]) + '"></label>'; }).join(" ");
    t.innerHTML = '<b style="font-size:13px;width:100%">Header &amp; Footer Tools – đang sửa ' + (k === "h" ? "đầu trang" : "chân trang") + "</b>" + fields
      + ' <button type="button" data-st="it" class="' + (o.it ? "vb-on" : "") + '"><i>I</i> Nghiêng</button><button type="button" data-st="b" class="' + (o.b ? "vb-on" : "") + '"><b>B</b> Đậm</button>'
      + ' <span>Màu chữ:</span>' + HCOL.map(function(c){ return '<button type="button" class="vb-sw" data-col="' + c[0] + '" title="' + c[1] + '" aria-label="Màu ' + c[1] + '" style="background:' + c[0] + (o.col === c[0] ? ";outline:2px solid #2f6fb3;outline-offset:1px" : "") + '"></button>'; }).join(" ")
      + ' <button type="button" data-st="line" class="' + (o.line ? "vb-on" : "") + '">― Shapes: đường thẳng ' + (k === "h" ? "dưới đầu trang" : "trên chân trang") + "</button>"
      + ' <button type="button" class="pri" data-a="close" style="background:#c00000;color:#fff;border-color:#c00000">✕ Close Header and Footer</button>';
    t.classList.add("vb-open");
  }
  function info(){ return {h: S.h, f: S.f, pn: S.pn, edit: S.edit, ev: ev}; }
  function draw(){
    q("[data-pages]").innerHTML = [BODY1, BODY2].map(function(b, i){ return '<div class="vb-pg" aria-label="Trang ' + (i + 1) + '">' + hf("h", i + 1) + '<div class="vb-body' + (S.edit ? " vb-dim" : "") + '">' + b + "</div>" + hf("f", i + 1) + "</div>"; }).join("");
    tools(); ck();
  }
  function ck(){ if (opt.check) q("[data-ckl]").innerHTML = opt.check(info()).map(function(x){ return "<li class='" + (x[1] ? "vb-ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function menus(open){ box.querySelectorAll(".vb-menu").forEach(function(m){ m.classList.toggle("vb-open", m.dataset.menu === open); }); }
  function edit(k){ S.edit = k; if (!S[k].on) { S[k].on = true; S[k].mode = "blank"; } menus(null); draw(); var i = q("[data-tx]"); if (i) i.focus(); }
  box.addEventListener("click", function(e){
    var m = e.target.closest("[data-m]"); if (m) { var mm = q('[data-menu="' + m.dataset.m + '"]'); menus(mm.classList.contains("vb-open") ? null : m.dataset.m); return; }
    var p = e.target.closest("[data-pn]"); if (p) { menus(null);
      if (!p.dataset.pn) { S.pn = null; say("Đã xoá số trang."); draw(); return; }
      var a = p.dataset.pn.split("-"); S.pn = {pos: a[0], al: a[1]}; ev.pos[p.dataset.pn] = true;
      say("Đã đánh số trang " + (a[0] === "top" ? "ở đầu trang" : "ở chân trang") + ", " + {L: "bên trái", C: "giữa", R: "bên phải"}[a[1]] + ". Số trang tự động tăng: trang 1, trang 2,…"); draw(); return; }
    var al = e.target.closest("[data-al]"); if (al) { S[S.edit].al = al.dataset.al; draw(); return; }
    var stb = e.target.closest("[data-st]"); if (stb) { var o = S[S.edit]; o[stb.dataset.st] = !o[stb.dataset.st]; if (stb.dataset.st === "line" && o.line) ev.line = true; draw(); return; }
    var c = e.target.closest("[data-col]"); if (c) { S[S.edit].col = c.dataset.col; draw(); return; }
    var t = e.target.closest("[data-a]"); if (!t) return; var a2 = t.dataset.a, k = a2.charAt(0);
    if (a2 === "reset") { init(); menus(null); say("Đã trả về văn bản ban đầu."); draw(); return; }
    if (a2 === "close") { S.edit = null; ev.closed = true; say("Đã đóng Header & Footer: quay lại sửa nội dung văn bản. Đầu trang, chân trang xuất hiện ở tất cả các trang."); draw(); return; }
    if (/Blank$/.test(a2)) { S[k] = Object.assign(S[k], {on: true, mode: "blank"}); say("Đã chọn mẫu Blank: nhập nội dung vào ô [Type here], rồi căn lề, định dạng."); edit(k); return; }
    if (/Three$/.test(a2)) { if (S[k].on && S[k].mode === "blank" && S[k].text && !S[k][S[k].al]) S[k][S[k].al] = S[k].text; S[k] = Object.assign(S[k], {on: true, mode: "three"}); say("Mẫu Blank (Three Columns): có ba ô [Type here] ở bên trái, giữa và bên phải."); edit(k); return; }
    if (/Edit/.test(a2)) { edit(k); say("Đang sửa " + (k === "h" ? "đầu trang." : "chân trang.")); return; }
    if (/Remove/.test(a2)) { S[k] = blankHF(); if (S.edit === k) S.edit = null; menus(null); say("Đã xoá " + (k === "h" ? "đầu trang." : "chân trang.")); draw(); }
  });
  box.addEventListener("dblclick", function(e){ var h = e.target.closest("[data-hf]"); if (h) { edit(h.dataset.hf); say("Nháy đúp: mở chế độ sửa " + (h.dataset.hf === "h" ? "đầu trang." : "chân trang.")); } });
  box.addEventListener("input", function(e){ var f = e.target.dataset.tx; if (!f || !S.edit) return; S[S.edit][f] = e.target.value;
    var pos = e.target.selectionStart; draw(); var i = q('[data-tx="' + f + '"]'); if (i) { i.focus(); try { i.setSelectionRange(pos, pos); } catch (er) {} } });
  init(); say(opt.msg || "Chọn Insert → Header, Footer hoặc Page Number."); draw();
  return {info: info};
};
})();
