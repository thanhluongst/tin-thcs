/* PHẦN MỀM TRÌNH CHIẾU MÔ PHỎNG dùng chung cho các bài trình chiếu (Tin 7 Bài 11, 12, 13,…)
   TrinhChieu(phần tử, tuỳ chọn) — trang tiêu đề (Title Slide), New Slide với Layout (Title and Content, Title Only),
   danh sách nhiều cấp: Enter thêm dòng, Tab / Shift+Tab (Increase / Decrease List Level), chọn nhiều dòng (Shift + nháy, Shift + ↑↓),
   đổi kí hiệu đầu dòng, đánh số thứ tự, màu kí hiệu (Bullets and Numbering), xoá trang, trình chiếu toàn màn hình.
   Tuỳ chọn: title, note, slides[] (trạng thái ban đầu), extra[{label,title,run(api)}], check(x) → [[nhãn, đúng?],…]
   x = {slides:[{layout, title, sub, lines:[{t, lv, b, c}]}], log:[…]} */
(function(){
"use strict";
var CSS = ".tc{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0}"
 + ".tc .t{font-weight:700}.tc .note{font-size:13px;opacity:.85}.tc .msg{font-size:13.5px;min-height:1.2em}.tc .msg.bad{color:#c0392b}"
 + ".tc .rb{display:flex;flex-wrap:wrap;gap:4px;align-items:center;background:#f3f3f3;border:1px solid #d6d6d6;border-radius:8px;padding:5px;color:#222}"
 + ".tc .rb button,.tc .rb select{font:inherit;font-size:13px;border:1px solid #bbb;background:#fff;color:#222;border-radius:6px;padding:3px 8px;cursor:pointer}"
 + ".tc .rb button:hover{border-color:#c4501b}.tc .rb .sep{width:1px;height:22px;background:#ccc;margin:0 3px}.tc .rb .lb{font-size:12px;color:#555}"
 + ".tc .wk{display:grid;grid-template-columns:110px 1fr;gap:8px;min-width:0}@media (max-width:620px){.tc .wk{grid-template-columns:70px 1fr}}"
 + ".tc .th{display:grid;gap:6px;align-content:start;max-height:440px;overflow:auto;padding-right:2px}"
 + ".tc .th button{display:grid;grid-template-columns:16px 1fr;gap:3px;align-items:start;background:none;border:0;padding:0;cursor:pointer;text-align:left;color:inherit;font:inherit}"
 + ".tc .th .n{font-size:11px;opacity:.7}.tc .th .mini{aspect-ratio:16/9;background:#fff;border:1px solid #bbb;border-radius:3px;font-size:7px;line-height:1.2;color:#222;padding:3px;overflow:hidden}"
 + ".tc .th button.on .mini{outline:2px solid #c4501b}"
 + ".tc .sl{aspect-ratio:16/9;background:#fff;color:#222;border:1px solid #bbb;box-shadow:0 1px 4px rgba(0,0,0,.15);border-radius:4px;padding:3.5% 5%;display:flex;flex-direction:column;gap:2%;min-width:0;container-type:inline-size;overflow:hidden}"
 + ".tc .sl.ti{justify-content:center}"
 + ".tc .sl input,.tc .sl textarea{font-family:'Be Vietnam Pro',Calibri,Arial,sans-serif;color:#222;background:transparent;border:1px dashed transparent;border-radius:3px;width:100%;box-sizing:border-box;outline:none;padding:2px 4px}"
 + ".tc .sl input:hover,.tc .sl textarea:hover{border-color:#bbb}.tc .sl input:focus,.tc .sl textarea:focus{border-color:#c4501b}"
 + ".tc .sl .tt{font-size:5.6cqw;text-align:center}.tc .sl.ti .tt{font-size:6.4cqw;font-weight:700}.tc .sl .sb{font-size:2.8cqw;text-align:center;resize:none;height:22%}"
 + ".tc .sl .bd{flex:1;border:1px dashed #ccc;border-radius:3px;padding:1% 2%;overflow:auto}"
 + ".tc .ln{display:flex;align-items:baseline;gap:.6em}.tc .ln .bu{flex:none;min-width:1em;text-align:right}.tc .ln input{padding:1px 2px}"
 + ".tc .ln.sel{background:#fde3d6;border-radius:3px}"
 + ".tc .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}"
 + ".tc .ck li::before{content:'☐ '}.tc .ck li.ok::before{content:'☑ ';color:#1c7c54}.tc .ck li.ok{color:#1c7c54;font-weight:600}"
 + ".tc-show{position:fixed;inset:0;z-index:9999;background:#111;display:grid;place-items:center;cursor:pointer}"
 + ".tc-show .sl{width:min(96vw,170vh);border:0;border-radius:0;box-shadow:none}"
 + ".tc-show .sl input,.tc-show .sl textarea{pointer-events:none;border-color:transparent!important}.tc-show .sl .bd{border-color:transparent}"
 + ".tc-show .hint{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);color:#ccc;font:13px sans-serif}";
function addCss(){ if (document.getElementById("trinhchieu-css")) return; var s = document.createElement("style"); s.id = "trinhchieu-css"; s.textContent = CSS; document.head.appendChild(s); }
var SIZE = [0, 3.4, 2.8, 2.4, 2.1, 1.9];
var BUL = [["•","Chấm tròn"],["■","Hình vuông"],["➢","Mũi tên"],["✓","Dấu tích"],["◆","Hình thoi"],["❖","Hoa văn"],["1.","Đánh số 1. 2. 3."],["a.","Đánh số a. b. c."]];
var COL = [["","Đen (mặc định)"],["#c0392b","Đỏ"],["#d35400","Cam"],["#1e8449","Xanh lá"],["#1f5fbf","Xanh dương"],["#7d3c98","Tím"]];
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function blank(lay){ return lay === "title" ? {layout:"title", title:"", sub:""} : lay === "only" ? {layout:"only", title:""} : {layout:"content", title:"", lines:[{t:"", lv:1}]}; }
/* Kí hiệu hiển thị của dòng i (đánh số theo các dòng cùng cấp liền nhau) */
function mark(lines, i){ var L = lines[i], b = L.b || "•";
  if (b !== "1." && b !== "a.") return b;
  var n = 1; for (var j = i - 1; j >= 0; j--) { if (lines[j].lv < L.lv) break; if (lines[j].lv === L.lv) { if ((lines[j].b || "•") === b) n++; else break; } }
  return b === "1." ? n + "." : String.fromCharCode(96 + n) + "."; }

window.TrinhChieu = function(box, opt){
  addCss(); opt = opt || {};
  var S, cur, sel, log, q = function(s){ return box.querySelector(s); };
  function reset(){ S = clone(opt.slides || [blank("title")]); cur = 0; sel = null; log = []; }
  reset();
  box.classList.add("tc");
  box.innerHTML = '<div class="t">' + (opt.title || "Phần mềm trình chiếu mô phỏng") + "</div>"
    + '<div class="rb">'
    + '<span class="lb">Slides:</span><button type="button" data-a="new" title="New Slide: thêm trang mới (Title and Content)">➕ New Slide</button>'
    + '<select data-lay title="Layout: mẫu bố trí cho trang đang chọn"><option value="">Layout…</option><option value="title">Title Slide</option><option value="content">Title and Content</option><option value="only">Title Only</option></select>'
    + '<button type="button" data-a="delslide" title="Xoá trang đang chọn">🗑 Xoá trang</button><span class="sep"></span>'
    + '<span class="lb">Paragraph:</span><button type="button" data-a="dec" title="Decrease List Level (Shift+Tab)">⇤ Giảm cấp</button><button type="button" data-a="inc" title="Increase List Level (Tab)">⇥ Tăng cấp</button>'
    + '<select data-bul title="Bullets and Numbering: kí hiệu đầu dòng"><option value="">Kí hiệu…</option>' + BUL.map(function(b){ return '<option value="' + b[0] + '">' + b[0] + " " + b[1] + "</option>"; }).join("") + "</select>"
    + '<select data-col title="Color: màu kí hiệu đầu dòng"><option value="-">Màu kí hiệu…</option>' + COL.map(function(c){ return '<option value="' + c[0] + '">' + c[1] + "</option>"; }).join("") + "</select>"
    + '<span class="sep"></span><button type="button" data-a="show" title="Trình chiếu từ trang đầu (F5)">▶ Trình chiếu</button><button type="button" data-a="reset">Làm lại</button>'
    + (opt.extra || []).map(function(x, i){ return '<button type="button" data-x="' + i + '" title="' + esc(x.title || "") + '">' + x.label + "</button>"; }).join("")
    + "</div>"
    + '<div class="wk"><div class="th" data-th></div><div data-ed></div></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  function say(t, bad){ var m = q("[data-msg]"); m.textContent = t; m.className = "msg" + (bad ? " bad" : ""); }
  function lineHtml(L, lines, i, live){ var st = "font-size:" + SIZE[L.lv] + "cqw;padding-left:" + ((L.lv - 1) * 4.2) + "cqw";
    return '<div class="ln' + (sel && i >= sel[0] && i <= sel[1] ? " sel" : "") + '" style="' + st + '" data-i="' + i + '"><span class="bu" style="' + (L.c ? "color:" + L.c : "") + '">' + esc(mark(lines, i)) + "</span>"
      + (live ? '<input data-li="' + i + '" value="' + esc(L.t) + '" placeholder="' + (i === 0 && lines.length === 1 ? "Click to add text" : "") + '" aria-label="Dòng ' + (i + 1) + '" style="font-size:inherit">' : "<span>" + esc(L.t) + "</span>") + "</div>"; }
  function slideHtml(s, live){
    if (s.layout === "title") return '<div class="sl ti">' + (live ? '<input class="tt" data-tt value="' + esc(s.title) + '" placeholder="Click to add title" aria-label="Tiêu đề bài trình chiếu"><textarea class="sb" data-sb placeholder="Click to add subtitle" aria-label="Phụ đề">' + esc(s.sub) + "</textarea>"
      : '<div class="tt">' + esc(s.title) + '</div><div class="sb" style="white-space:pre-line">' + esc(s.sub) + "</div>") + "</div>";
    var h = '<div class="sl">' + (live ? '<input class="tt" data-tt value="' + esc(s.title) + '" placeholder="Click to add title" aria-label="Tiêu đề trang">' : '<div class="tt">' + esc(s.title) + "</div>");
    if (s.layout === "content") h += '<div class="bd">' + s.lines.map(function(L, i){ return lineHtml(L, s.lines, i, live); }).join("") + "</div>";
    return h + "</div>"; }
  function mini(s){ var x = "<b>" + esc(s.title || (s.layout === "title" ? "(Trang tiêu đề)" : "(Chưa có tiêu đề)")) + "</b>";
    if (s.layout === "title") x += "<br>" + esc((s.sub || "").split("\n")[0]); else if (s.lines) x += s.lines.slice(0, 7).map(function(L){ return "<br>" + "&nbsp;".repeat((L.lv - 1) * 3) + "• " + esc(L.t); }).join("");
    return x; }
  function thumbs(){ q("[data-th]").innerHTML = S.map(function(s, i){ return '<button type="button" data-s="' + i + '" class="' + (i === cur ? "on" : "") + '"><span class="n">' + (i + 1) + '</span><span class="mini">' + mini(s) + "</span></button>"; }).join("");
    box.querySelectorAll("[data-s]").forEach(function(b){ b.addEventListener("click", function(){ cur = +b.dataset.s; sel = null; draw(); }); }); }
  function check(){ if (opt.check) q("[data-ck]").innerHTML = opt.check({slides: S, log: log}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function focusLine(i, pos){ var el = q('[data-li="' + i + '"]'); if (el) { el.focus(); var p = pos == null ? el.value.length : pos; el.setSelectionRange(p, p); } }
  function draw(fi, pos){ thumbs(); var s = S[cur]; q("[data-ed]").innerHTML = slideHtml(s, true); bind(); check(); if (fi != null) focusLine(fi, pos); }
  function lines(){ return S[cur].lines; }
  function range(i){ return sel ? sel : [i, i]; }
  function level(d, i){ var s = S[cur]; if (s.layout !== "content") { say("Trang này không có khung nội dung dạng danh sách.", true); return; }
    var r = range(i == null ? 0 : i), ok = 0; for (var j = r[0]; j <= r[1]; j++) { var nv = s.lines[j].lv + d; if (nv >= 1 && nv <= 5) { s.lines[j].lv = nv; ok++; } }
    if (ok) { log.push(d > 0 ? "inc" : "dec"); say((d > 0 ? "Đã tăng bậc phân cấp (Increase List Level / Tab)" : "Đã giảm bậc phân cấp (Decrease List Level / Shift+Tab)") + " cho " + (r[1] - r[0] + 1) + " dòng."); }
    draw(i == null ? r[0] : i); }
  var lastLine = 0;
  function bind(){
    var s = S[cur], tt = q("[data-tt]"), sb = q("[data-sb]");
    tt.addEventListener("input", function(){ s.title = tt.value; thumbs(); check(); });
    tt.addEventListener("keydown", function(ev){ if (ev.key === "Enter") { ev.preventDefault(); if (s.layout === "content") focusLine(0); else if (sb) sb.focus(); } });
    if (sb) sb.addEventListener("input", function(){ s.sub = sb.value; thumbs(); check(); });
    box.querySelectorAll("[data-li]").forEach(function(inp){ var i = +inp.dataset.li;
      inp.addEventListener("focus", function(){ lastLine = i; if (sel && (i < sel[0] || i > sel[1])) { sel = null; box.querySelectorAll(".ln.sel").forEach(function(x){ x.classList.remove("sel"); }); } });
      inp.addEventListener("mousedown", function(ev){ if (ev.shiftKey) { ev.preventDefault(); var a = sel ? sel[0] : lastLine; sel = [Math.min(a, i), Math.max(a, i)]; say("Đã chọn " + (sel[1] - sel[0] + 1) + " dòng. Bấm Tab / Shift+Tab hoặc chọn kí hiệu, màu cho các dòng này."); draw(i); }
        else if (sel) { sel = null; draw(i, null); } });
      inp.addEventListener("input", function(){ s.lines[i].t = inp.value; thumbs(); check(); });
      inp.addEventListener("keydown", function(ev){
        if (ev.key === "Tab") { ev.preventDefault(); level(ev.shiftKey ? -1 : 1, i); return; }
        if (ev.key === "Enter") { ev.preventDefault(); var p = inp.selectionStart, L = s.lines[i], rest = L.t.slice(p); L.t = L.t.slice(0, p);
          s.lines.splice(i + 1, 0, {t: rest, lv: L.lv, b: L.b, c: L.c}); sel = null; draw(i + 1, 0); return; }
        if (ev.key === "Backspace" && inp.selectionStart === 0 && inp.selectionEnd === 0 && i > 0) { ev.preventDefault(); var prev = s.lines[i - 1], len = prev.t.length; prev.t += s.lines[i].t; s.lines.splice(i, 1); sel = null; draw(i - 1, len); return; }
        if (ev.key === "ArrowUp" || ev.key === "ArrowDown") { ev.preventDefault(); var n = i + (ev.key === "ArrowUp" ? -1 : 1); if (n < 0 || n >= s.lines.length) return;
          if (ev.shiftKey) { var a = sel ? (sel[0] === i ? sel[1] : sel[0]) : i; sel = [Math.min(a, n), Math.max(a, n)]; } else sel = null; draw(n); return; }
      }); });
  }
  box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ var a = b.dataset.a;
    if (a === "new") { S.splice(cur + 1, 0, blank("content")); cur++; sel = null; log.push("new"); say("Đã thêm trang " + (cur + 1) + " với mẫu bố trí Title and Content. Nháy vào Click to add title để nhập tiêu đề trang."); draw(); return; }
    if (a === "delslide") { if (S.length === 1) { say("Bài trình chiếu phải có ít nhất một trang.", true); return; } S.splice(cur, 1); cur = Math.min(cur, S.length - 1); sel = null; say("Đã xoá trang."); draw(); return; }
    if (a === "inc" || a === "dec") { level(a === "inc" ? 1 : -1, lastLine); return; }
    if (a === "show") { show(); return; }
    if (a === "reset") { reset(); say("Đã làm lại từ đầu."); draw(); }
  }); });
  q("[data-lay]").addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var s = S[cur], n = blank(v); n.title = s.title || "";
    if (v === "title") n.sub = s.sub || (s.lines ? s.lines.map(function(L){ return L.t; }).join("\n") : ""); if (v === "content") n.lines = s.lines || (s.sub ? s.sub.split("\n").map(function(t){ return {t: t, lv: 1}; }) : [{t:"", lv:1}]);
    S[cur] = n; log.push("layout-" + v); say("Đã đổi mẫu bố trí (Layout) của trang " + (cur + 1) + " thành " + {title:"Title Slide", content:"Title and Content", only:"Title Only"}[v] + "."); draw(); });
  q("[data-bul]").addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var s = S[cur]; if (s.layout !== "content") { say("Hãy đặt con trỏ vào các dòng của khung nội dung trước.", true); return; }
    var r = range(lastLine); for (var j = r[0]; j <= r[1]; j++) s.lines[j].b = v; log.push("bullet"); say("Đã đổi kí hiệu đầu dòng của " + (r[1] - r[0] + 1) + " dòng."); draw(r[0]); });
  q("[data-col]").addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-") return; var s = S[cur]; if (s.layout !== "content") return;
    var r = range(lastLine); for (var j = r[0]; j <= r[1]; j++) { if (v) s.lines[j].c = v; else delete s.lines[j].c; } log.push("color"); say("Đã đổi màu kí hiệu đầu dòng của " + (r[1] - r[0] + 1) + " dòng."); draw(r[0]); });
  function show(){ var i = 0, ov = document.createElement("div"); ov.className = "tc-show"; ov.tabIndex = 0; document.body.appendChild(ov); log.push("show");
    function paint(){ ov.innerHTML = slideHtml(S[i], false) + '<div class="hint">Trang ' + (i + 1) + "/" + S.length + " · nháy chuột, → hoặc Space: trang sau · ←: trang trước · Esc: thoát</div>"; }
    function close(){ document.removeEventListener("keydown", key); ov.remove(); say("Đã kết thúc trình chiếu."); check(); }
    function key(ev){ if (ev.key === "Escape") close(); else if (ev.key === "ArrowRight" || ev.key === " " || ev.key === "PageDown" || ev.key === "Enter") { ev.preventDefault(); if (i < S.length - 1) { i++; paint(); } else close(); }
      else if (ev.key === "ArrowLeft" || ev.key === "PageUp") { ev.preventDefault(); if (i > 0) { i--; paint(); } } }
    ov.addEventListener("click", function(){ if (i < S.length - 1) { i++; paint(); } else close(); });
    document.addEventListener("keydown", key); paint(); ov.focus(); }
  var api = {slides: function(){ return S; }, cur: function(){ return cur; }, say: say, redraw: function(){ draw(); }};
  box.querySelectorAll("[data-x]").forEach(function(b){ b.addEventListener("click", function(){ opt.extra[+b.dataset.x].run(api); draw(); }); });
  draw();
  return api;
};
})();
