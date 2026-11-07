/* MÔ PHỎNG PHẦN MỀM SOẠN THẢO VĂN BẢN (Word) cho Tin 6, chủ đề 5
   SoanThao(box, tuỳ chọn) — một trang văn bản sửa được trực tiếp, với các nhóm lệnh như Word:
     "font"    Home · Font: phông chữ, cỡ chữ, B I U, màu chữ
     "para"    Home · Paragraph: căn trái / giữa / phải / đều hai bên, giãn dòng, thụt lề trái
     "find"    Home · Editing: Find (ngăn Navigation, đếm số kết quả, tô sáng)
     "replace" Home · Editing: Replace (hộp thoại Find and Replace: Find Next, Replace, Replace All, Match case)
     "picture" Insert · Picture (chọn ảnh mẫu)
     "table"   Insert · Table (lưới chọn số hàng × cột, hộp thoại Insert Table) + Table Tools · Layout
               (Insert Above / Below / Left / Right, Delete Rows / Columns / Table, Merge Cells — kéo chuột chọn nhiều ô)
     "layout"  Layout · Page Setup: Orientation (Portrait / Landscape), Margins (Normal / Narrow / Wide)
     "print"   File · Print: xem trước trang in
     "save"    File · Save As: đặt tên tệp
   Tuỳ chọn: title, note, html (nội dung ban đầu), tools[], name (tên tệp ban đầu), check(x) → [[nhãn, đúng?],…]
   x = {page, text, paras:[{el,text,align,lh,ml}], orient, margin, ev:{…}, tables:[{rows,cols,merged,el}], imgs:[{el,align}],
        find(chữ, khớp hoa thường?) → số lần xuất hiện, style(chữ) → {b,i,u,size,font,color,align} của chỗ đầu tiên chứa chữ đó} */
(function(){
"use strict";
var CSS = ".wd{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0;position:relative}"
 + ".wd .wd-t{font-weight:700}.wd .wd-note{font-size:13px;opacity:.85}"
 + ".wd .wd-msg{font-size:14px;min-height:1.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}"
 + ".wd .wd-rib{display:flex;flex-wrap:wrap;gap:6px;align-items:stretch;background:var(--sunk);border-radius:8px;padding:6px}"
 + ".wd .wd-grp{display:flex;flex-wrap:wrap;gap:4px;align-items:center;align-content:flex-start;padding-right:8px;border-right:1px solid var(--line);max-width:100%}.wd .wd-grp:last-child{border-right:0}"
 + ".wd .wd-grp>small{width:100%;font-size:11px;opacity:.65}.wd .wd-grp.wd-off{opacity:.4;pointer-events:none}"
 + ".wd button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:7px;padding:4px 9px;cursor:pointer;line-height:1.3;min-width:30px}"
 + ".wd button:hover{border-color:var(--accent,#1f8a70)}.wd button.wd-on{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}"
 + ".wd select,.wd input[type=text],.wd input[type=number]{font:inherit;font-size:13.5px;padding:3px 6px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;min-width:0;max-width:100%}"
 + ".wd input[type=color]{width:34px;height:28px;padding:1px;border:1px solid var(--line);border-radius:6px;background:var(--surface,#fff);cursor:pointer}"
 + ".wd .wd-body{display:flex;gap:10px;align-items:flex-start;min-width:0}"
 + ".wd .wd-nav{flex:0 0 200px;border:1px solid var(--line);border-radius:8px;padding:8px;font-size:13px;display:grid;gap:6px;background:var(--surface,#fff)}.wd .wd-nav[hidden]{display:none}"
 + ".wd .wd-nav ol{margin:0;padding-left:18px;max-height:220px;overflow:auto;display:grid;gap:3px}.wd .wd-nav li{cursor:pointer}.wd .wd-nav li:hover{text-decoration:underline}"
 + "@media (max-width:700px){.wd .wd-body{flex-direction:column}.wd .wd-nav{flex:auto;width:100%;box-sizing:border-box}}"
 + ".wd .wd-desk{flex:1 1 auto;min-width:0;background:#e9ebee;border-radius:8px;padding:14px;overflow:auto}"
 + ".wd .wd-page{background:#fff;color:#111;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,.18);font:16px/1.4 'Times New Roman',serif;outline:none;box-sizing:border-box;max-width:100%;transition:width .2s,padding .2s;overflow-wrap:break-word}"
 + ".wd .wd-page p,.wd .wd-page h1,.wd .wd-page h2{margin:0 0 6px}.wd .wd-page h1{font-size:22px}.wd .wd-page h2{font-size:18px}"
 + ".wd .wd-page img{max-width:100%;height:auto;vertical-align:middle}"
 + ".wd .wd-page table{border-collapse:collapse;width:100%;margin:6px 0;table-layout:fixed}.wd .wd-page td,.wd .wd-page th{border:1px solid #333;padding:3px 6px;vertical-align:top;min-width:24px;height:1.5em}"
 + ".wd .wd-page td.wd-sel{background:#cfe3ff}"
 + ".wd .wd-page mark.wd-hl{background:#ffe066;color:inherit;padding:0}.wd .wd-page mark.wd-hl.wd-cur{background:#ff9f43}"
 + ".wd .wd-pop{position:absolute;z-index:30;background:#fff;color:#111;border:1px solid #9aa4ae;border-radius:6px;box-shadow:0 6px 20px rgba(0,0,0,.22);font-size:13px;padding:8px;display:grid;gap:6px;max-width:min(92%,420px)}"
 + ".wd .wd-pop .hd{font-weight:700;display:flex;justify-content:space-between;gap:10px;align-items:center}.wd .wd-pop .hd button{border:0;background:none;font-size:16px;padding:0 4px;min-width:0}"
 + ".wd .wd-pop button{background:#f6f6f6;color:#111;border-color:#999;font-weight:500}.wd .wd-pop label{display:flex;gap:6px;align-items:center;flex-wrap:wrap}"
 + ".wd .wd-pop input[type=text],.wd .wd-pop input[type=number]{background:#fff;color:#111;border-color:#bbb}"
 + ".wd .wd-grid{display:grid;grid-template-columns:repeat(8,18px);gap:2px}.wd .wd-grid i{width:18px;height:18px;border:1px solid #bbb;display:block;cursor:pointer}.wd .wd-grid i.on{background:#ffd27a;border-color:#e08e00}"
 + ".wd .wd-pics{display:flex;gap:8px;flex-wrap:wrap}.wd .wd-pics button{padding:3px;background:#fff}.wd .wd-pics img{width:84px;height:auto;display:block}"
 + ".wd .wd-pv{position:fixed;inset:0;z-index:9000;background:rgba(40,44,52,.88);display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px;overflow:auto}"
 + ".wd .wd-pv .bar{color:#fff;font-weight:600;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center}.wd .wd-pv .bar button{background:#fff;color:#111}"
 + ".wd .wd-pv .wd-page{box-shadow:0 4px 18px rgba(0,0,0,.5);pointer-events:none}.wd .wd-pv mark.wd-hl{background:none}.wd .wd-pv td.wd-sel{background:none}"
 + ".wd .wd-ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.wd .wd-ck li::before{content:'☐ '}.wd .wd-ck li.wd-ok::before{content:'☑ ';color:#1c7c54}.wd .wd-ck li.wd-ok{color:#1c7c54;font-weight:600}"
 + ".wd .wd-file{font-size:12.5px;opacity:.8}";
function addCss(){ if (document.getElementById("soanthao-css")) return; var s = document.createElement("style"); s.id = "soanthao-css"; s.textContent = CSS; document.head.appendChild(s); }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* Ảnh mẫu (vẽ bằng SVG, không cần tệp ngoài) */
function svgUri(s){ return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s); }
var PICS = [
  ["Nhóm bạn", svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" fill="#cfeefe"/><rect y="110" width="240" height="40" fill="#8fd18a"/><circle cx="205" cy="30" r="16" fill="#ffd34d"/>'
    + [[60,"#e74c3c"],[100,"#3498db"],[140,"#9b59b6"],[180,"#f39c12"]].map(function(p){ return '<circle cx="' + p[0] + '" cy="62" r="13" fill="#f5cba7"/><rect x="' + (p[0] - 14) + '" y="76" width="28" height="36" rx="9" fill="' + p[1] + '"/><path d="M' + (p[0] - 5) + ' 64q5 5 10 0" stroke="#333" fill="none" stroke-width="2"/>'; }).join("") + '</svg>')],
  ["Trường học", svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" fill="#dff3ff"/><rect y="118" width="240" height="32" fill="#9ad08c"/><rect x="50" y="55" width="140" height="65" fill="#f6d7a7" stroke="#b07a3a"/><path d="M40 58 120 22 200 58z" fill="#d35400"/><rect x="108" y="88" width="24" height="32" fill="#7f4f24"/>'
    + [64,86,148,170].map(function(x){ return '<rect x="' + x + '" y="70" width="14" height="14" fill="#5dade2" stroke="#2c3e50"/>'; }).join("") + '<line x1="120" y1="22" x2="120" y2="4" stroke="#555" stroke-width="2"/><rect x="120" y="4" width="18" height="11" fill="#e74c3c"/></svg>')],
  ["Hoa", svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" fill="#fff6e5"/>'
    + [[70,"#ff6b81"],[120,"#ffa502"],[170,"#a29bfe"]].map(function(p){ var x = p[0]; return '<line x1="' + x + '" y1="70" x2="' + x + '" y2="140" stroke="#27ae60" stroke-width="4"/>' + [0,72,144,216,288].map(function(a){ var r = a * Math.PI / 180; return '<circle cx="' + (x + 14 * Math.cos(r)).toFixed(1) + '" cy="' + (60 + 14 * Math.sin(r)).toFixed(1) + '" r="10" fill="' + p[1] + '"/>'; }).join("") + '<circle cx="' + x + '" cy="60" r="8" fill="#ffd32a"/>'; }).join("") + '</svg>')],
  ["Kem", svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" fill="#fef9f3"/><path d="M95 70 120 140 145 70z" fill="#e0a96d" stroke="#a0522d"/><circle cx="108" cy="62" r="20" fill="#ffd166"/><circle cx="132" cy="62" r="20" fill="#ff8fab"/><circle cx="120" cy="44" r="20" fill="#fff1e6"/><circle cx="120" cy="24" r="6" fill="#d00000"/></svg>')]
];
var COVERS = {"Ion": ["#1f6fb2", "#eaf3fb", "#1f4e79", "nền xanh dương"], "Facet": ["#2e7d32", "#eef7ee", "#1b5e20", "nền xanh lá"], "Retrospect": ["#c2185b", "#fdeef4", "#ad1457", "nền hồng"]};
var FONTS = ["Times New Roman", "Arial", "Calibri", "Tahoma", "Verdana", "Courier New"];
var SIZES = [10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 48];
var MARGINS = {Normal: [2.54, 2.54], Narrow: [1.27, 1.27], Wide: [2.54, 5.08]}; /* [trên-dưới, trái-phải] cm */
var PX_CM = 15;  /* tỉ lệ thu nhỏ: 1 cm trên giấy ≈ 15 px trên màn hình (trang A4 rộng 21 cm ≈ 315 px… nhân 1.8 cho dễ đọc) */
var K = 1.8;

window.SoanThao = function(box, opt){
  addCss(); opt = opt || {};
  var T = opt.tools || ["font", "para", "layout", "print", "save"], has = function(t){ return T.indexOf(t) >= 0; };
  var ev = {orient: 0, margin: 0, find: [], replaced: 0, replaceAll: [], saved: "", printed: 0, table: [], merged: 0, rowcol: 0, pic: 0, cover: ""};
  var S = {orient: opt.orient || "portrait", margin: opt.margin || "Normal", name: opt.name || "Document1.docx", range: null};
  box.classList.add("wd"); box.innerHTML = "";
  function mk(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  if (opt.title) box.appendChild(mk("div", "wd-t", esc(opt.title)));
  if (opt.note) box.appendChild(mk("div", "wd-note", opt.note));
  var file = mk("div", "wd-file"); box.appendChild(file);
  var rib = mk("div", "wd-rib"); box.appendChild(rib);
  var msg = mk("div", "wd-msg"); box.appendChild(msg);
  var body = mk("div", "wd-body"); box.appendChild(body);
  var nav = mk("div", "wd-nav"); nav.hidden = true; body.appendChild(nav);
  var desk = mk("div", "wd-desk"); body.appendChild(desk);
  var page = mk("div", "wd-page", opt.html || "<p><br></p>"); page.contentEditable = "true"; page.spellcheck = false; desk.appendChild(page);
  var ck = mk("ul", "wd-ck"); if (opt.check) box.appendChild(ck);
  var html0 = page.innerHTML;
  function say(t){ msg.innerHTML = t; }
  function showFile(){ file.innerHTML = "📄 Tệp: <b>" + esc(S.name) + "</b>"; }

  /* ---------- Vùng chọn: lưu lại khi rời trang để lệnh trên thanh công cụ vẫn áp dụng đúng chỗ ---------- */
  function inPage(n){ return n && (n === page || page.contains(n)); }
  document.addEventListener("selectionchange", function(){ var s = window.getSelection(); if (s.rangeCount && inPage(s.anchorNode)) { S.range = s.getRangeAt(0).cloneRange(); syncUI(); } });
  function live(){ var s = window.getSelection(); if (s.rangeCount && inPage(s.anchorNode)) S.range = s.getRangeAt(0).cloneRange(); }
  function restore(){ var s = window.getSelection(); if (S.range && inPage(S.range.startContainer)) { s.removeAllRanges(); s.addRange(S.range); return true; } return false; }
  function cmd(c, v){ page.focus({preventScroll: true}); restore(); try { document.execCommand("styleWithCSS", false, true); } catch (e) {} document.execCommand(c, false, v); S.range = window.getSelection().rangeCount ? window.getSelection().getRangeAt(0).cloneRange() : S.range; changed(); }
  function emptySel(){ return !S.range || S.range.collapsed; }

  /* ---------- Thanh lệnh ---------- */
  function grp(label){ var g = mk("div", "wd-grp"); g.appendChild(mk("small", "", label)); rib.appendChild(g); return g; }
  function btn(g, html, title, fn){ var b = mk("button", "", html); b.type = "button"; b.title = title; b.addEventListener("mousedown", function(e){ e.preventDefault(); }); b.addEventListener("click", function(e){ fn(e, b); }); g.appendChild(b); return b; }
  var UI = {};
  if (has("save") || has("print")) {
    var gF = grp("File");
    if (has("save")) btn(gF, "💾 Save As", "File › Save As: lưu tệp với tên mới", function(e, b){ popSave(b); });
    if (has("print")) btn(gF, "🖨 Print", "File › Print: xem trước trang in", preview);
  }
  if (has("font")) {
    var g1 = grp("Home · Font");
    UI.font = mk("select"); UI.font.title = "Phông chữ (Font)"; FONTS.forEach(function(f){ var o = mk("option", "", f); o.value = f; UI.font.appendChild(o); }); g1.appendChild(UI.font);
    UI.size = mk("select"); UI.size.title = "Cỡ chữ (Font Size)"; SIZES.forEach(function(n){ var o = mk("option", "", n); o.value = n; UI.size.appendChild(o); }); g1.appendChild(UI.size);
    UI.font.addEventListener("change", function(){ if (emptySel()) return say("Hãy <b>chọn (bôi đen)</b> phần văn bản cần đổi phông chữ trước."); cmd("fontName", UI.font.value); say("Đã đổi phông chữ thành <b>" + esc(UI.font.value) + "</b>."); });
    UI.size.addEventListener("change", function(){ if (emptySel()) return say("Hãy <b>chọn (bôi đen)</b> phần văn bản cần đổi cỡ chữ trước."); setSize(+UI.size.value); });
    UI.b = btn(g1, "<b>B</b>", "Bold – chữ đậm (Ctrl+B)", function(){ if (emptySel()) return say("Chọn phần văn bản rồi bấm <b>B</b>."); cmd("bold"); say("Chữ <b>đậm</b> (Bold)."); });
    UI.i = btn(g1, "<i>I</i>", "Italic – chữ nghiêng (Ctrl+I)", function(){ if (emptySel()) return say("Chọn phần văn bản rồi bấm <i>I</i>."); cmd("italic"); say("Chữ <i>nghiêng</i> (Italic)."); });
    UI.u = btn(g1, "<u>U</u>", "Underline – chữ gạch chân (Ctrl+U)", function(){ if (emptySel()) return say("Chọn phần văn bản rồi bấm <u>U</u>."); cmd("underline"); say("Chữ <u>gạch chân</u> (Underline)."); });
    UI.col = mk("input"); UI.col.type = "color"; UI.col.value = "#c00000"; UI.col.title = "Font Color – màu chữ"; g1.appendChild(UI.col);
    btn(g1, "A", "Tô màu chữ đang chọn bằng màu bên cạnh", function(){ if (emptySel()) return say("Chọn phần văn bản rồi chọn màu chữ."); cmd("foreColor", UI.col.value); say("Đã đổi màu chữ."); });
    UI.col.addEventListener("change", function(){ if (!emptySel()) { cmd("foreColor", UI.col.value); say("Đã đổi màu chữ."); } });
  }
  if (has("para")) {
    var g2 = grp("Home · Paragraph");
    UI.al = {};
    [["left", "justifyLeft", "⯇≡", "Align Left – căn thẳng lề trái (Ctrl+L)"], ["center", "justifyCenter", "≡", "Center – căn giữa (Ctrl+E)"], ["right", "justifyRight", "≡⯈", "Align Right – căn thẳng lề phải (Ctrl+R)"], ["justify", "justifyFull", "☰", "Justify – căn đều hai bên (Ctrl+J)"]].forEach(function(a){
      UI.al[a[0]] = btn(g2, alIcon(a[0]), a[3], function(){ cmd(a[1]); say(a[3].split(" – ")[1].replace(/ \(.*/, "") + " cho đoạn văn bản đang chọn."); });
    });
    UI.lh = mk("select"); UI.lh.title = "Line Spacing – khoảng cách giữa các dòng"; ["1.0", "1.15", "1.5", "2.0"].forEach(function(n){ var o = mk("option", "", "↕ " + n); o.value = n; UI.lh.appendChild(o); }); g2.appendChild(UI.lh);
    UI.lh.addEventListener("change", function(){ blocks().forEach(function(b){ b.style.lineHeight = (+UI.lh.value * 1.25).toFixed(3); }); changed(); say("Giãn dòng <b>" + UI.lh.value + "</b> cho đoạn đang chọn."); });
    btn(g2, "⇤", "Decrease Indent – giảm thụt lề trái", function(){ blocks().forEach(function(b){ var m = parseFloat(b.style.marginLeft) || 0; b.style.marginLeft = Math.max(0, m - 1.27 * PX_CM * K) + "px"; }); changed(); });
    btn(g2, "⇥", "Increase Indent – tăng thụt lề trái", function(){ blocks().forEach(function(b){ var m = parseFloat(b.style.marginLeft) || 0; b.style.marginLeft = (m + 1.27 * PX_CM * K) + "px"; }); changed(); say("Đã tăng thụt lề trái của đoạn."); });
  }
  if (has("find") || has("replace")) {
    var g3 = grp("Home · Editing");
    if (has("find")) btn(g3, "🔍 Find", "Find (Ctrl+F): tìm một từ hoặc cụm từ trong văn bản", openNav);
    if (has("replace")) btn(g3, "⇄ Replace", "Replace (Ctrl+H): tìm và thay thế", function(e, b){ popReplace(b); });
  }
  if (has("picture") || has("table")) {
    var g4 = grp("Insert");
    if (has("table")) btn(g4, "▦ Table ▾", "Insert › Table: chèn bảng", function(e, b){ popTable(b); });
    if (has("cover")) btn(g4, "📘 Cover Page ▾", "Insert › Pages › Cover Page: chèn trang bìa theo mẫu", function(e, b){ popMenu(b, "Cover Page – Built-in", Object.keys(COVERS).map(function(k){ return [k, k + " – " + COVERS[k][3]]; }), insertCover); });
    if (has("picture")) btn(g4, "🖼 Picture", "Insert › Picture: chèn hình ảnh tại vị trí con trỏ", function(e, b){ popPic(b); });
  }
  if (has("layout")) {
    var g5 = grp("Layout · Page Setup");
    btn(g5, "📄 Orientation ▾", "Orientation: hướng trang đứng (Portrait) hoặc nằm ngang (Landscape)", function(e, b){ popMenu(b, "Orientation", [["Portrait", "▯ Portrait – trang đứng"], ["Landscape", "▭ Landscape – trang nằm ngang"]], function(v){ S.orient = v.toLowerCase(); ev.orient++; layout(); changed(); say("Hướng trang: <b>" + v + "</b> (" + (v === "Portrait" ? "trang đứng" : "trang nằm ngang") + ")."); }); });
    btn(g5, "▣ Margins ▾", "Margins: lề trang", function(e, b){ popMenu(b, "Margins", Object.keys(MARGINS).map(function(k){ var m = MARGINS[k]; return [k, k + " – trên/dưới " + m[0] + " cm, trái/phải " + m[1] + " cm"]; }), function(v){ S.margin = v; ev.margin++; layout(); changed(); say("Lề trang: <b>" + v + "</b>."); }); });
  }
  var gT = null;
  if (has("table")) {
    gT = grp("Table Tools · Layout");
    btn(gT, "Insert Above", "Chèn hàng phía trên", function(){ tblOp("above"); });
    btn(gT, "Insert Below", "Chèn hàng phía dưới", function(){ tblOp("below"); });
    btn(gT, "Insert Left", "Chèn cột bên trái", function(){ tblOp("left"); });
    btn(gT, "Insert Right", "Chèn cột bên phải", function(){ tblOp("right"); });
    btn(gT, "Delete Rows", "Xoá các hàng đang chọn", function(){ tblOp("delrow"); });
    btn(gT, "Delete Columns", "Xoá các cột đang chọn", function(){ tblOp("delcol"); });
    btn(gT, "Delete Table", "Xoá cả bảng", function(){ tblOp("deltable"); });
    btn(gT, "⊞ Merge Cells", "Gộp các ô đang chọn thành một ô (kéo chuột qua các ô để chọn)", function(){ tblOp("merge"); });
  }
  var gR = grp("");
  btn(gR, "↺ Làm lại", "Khôi phục văn bản ban đầu", function(){ page.innerHTML = html0; S.orient = opt.orient || "portrait"; S.margin = opt.margin || "Normal"; clearHL(); layout(); changed(); say("Đã khôi phục văn bản ban đầu."); });

  function alIcon(k){ var w = {left: [14, 10, 14, 8], center: [14, 10, 14, 8], right: [14, 10, 14, 8], justify: [14, 14, 14, 14]}[k], s = '<svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">';
    w.forEach(function(len, i){ var x = k === "center" ? (16 - len) / 2 : k === "right" ? 16 - len : 1; s += '<rect x="' + x + '" y="' + (1 + i * 3.4) + '" width="' + len + '" height="1.8" fill="currentColor"/>'; }); return s + "</svg>"; }

  /* ---------- Cỡ chữ ---------- */
  function setSize(pt){
    cmd("fontSize", "7");
    page.querySelectorAll('font[size="7"]').forEach(function(f){ var s = document.createElement("span"); s.style.fontSize = pt + "pt"; while (f.firstChild) s.appendChild(f.firstChild); f.replaceWith(s); });
    page.querySelectorAll("span").forEach(function(s){ if (/xxx-large/.test(s.style.fontSize)) s.style.fontSize = pt + "pt"; });
    changed(); say("Cỡ chữ <b>" + pt + "</b>.");
  }

  /* ---------- Đoạn văn đang chọn ---------- */
  function topBlocks(){ var out = []; (function walk(n){ [].forEach.call(n.children, function(c){ if (c.tagName === "DIV" && c.querySelector("p,h1,h2,h3,div,table")) walk(c); else if (/^(P|H1|H2|H3|DIV|LI|BLOCKQUOTE)$/.test(c.tagName)) out.push(c); else if (/^(UL|OL)$/.test(c.tagName)) walk(c); else if (c.tagName === "TABLE") c.querySelectorAll("td,th").forEach(function(td){ out.push(td); }); }); })(page); return out; }
  function blocks(){ restore(); var r = S.range; if (!r) return []; var bs = topBlocks().filter(function(b){ return r.intersectsNode(b); }); if (!bs.length) { var n = r.startContainer; while (n && n !== page && !(n.nodeType === 1 && /^(P|H1|H2|H3|DIV|LI|TD|TH)$/.test(n.tagName))) n = n.parentNode; if (n && n !== page) bs = [n]; } return bs; }

  /* ---------- Trang: hướng, lề ---------- */
  function layout(){
    var m = MARGINS[S.margin] || MARGINS.Normal, land = S.orient === "landscape", W = (land ? 29.7 : 21) * PX_CM * K, H = (land ? 21 : 29.7) * PX_CM * K;
    page.style.width = W + "px"; page.style.minHeight = (H * 0.55) + "px";
    page.style.padding = (m[0] * PX_CM * K * 0.6) + "px " + (m[1] * PX_CM * K * 0.6) + "px";
  }
  layout(); showFile();

  /* ---------- Hộp thoại nổi ---------- */
  var pop = null;
  function closePop(){ if (pop) { pop.remove(); pop = null; } }
  function openPop(anchor, html){
    closePop(); pop = mk("div", "wd-pop", html); box.appendChild(pop);
    var br = box.getBoundingClientRect(), ar = anchor.getBoundingClientRect();
    pop.style.top = (ar.bottom - br.top + 4) + "px"; pop.style.left = Math.max(4, Math.min(ar.left - br.left, br.width - pop.offsetWidth - 8)) + "px";
    var x = pop.querySelector("[data-x]"); if (x) x.addEventListener("click", closePop);
    pop.addEventListener("mousedown", function(e){ if (!/INPUT|SELECT|TEXTAREA|LABEL/.test(e.target.tagName)) e.preventDefault(); });
    return pop;
  }
  document.addEventListener("mousedown", function(e){ if (pop && !pop.contains(e.target) && !(e.target.closest && e.target.closest(".wd-rib"))) closePop(); });
  function popMenu(anchor, title, items, fn){
    var p = openPop(anchor, '<div class="hd">' + esc(title) + '<button type="button" data-x aria-label="Đóng">✕</button></div>');
    items.forEach(function(it){ var b = mk("button", "", esc(it[1])); b.type = "button"; b.style.textAlign = "left"; b.addEventListener("click", function(){ closePop(); fn(it[0]); }); p.appendChild(b); });
  }
  function popSave(anchor){
    var p = openPop(anchor, '<div class="hd">Save As<button type="button" data-x aria-label="Đóng">✕</button></div><label>File name: <input type="text" data-n style="width:16em"></label><div><button type="button" data-ok>Save</button> <button type="button" data-x2>Cancel</button></div>');
    var n = p.querySelector("[data-n]"); n.value = S.name; n.focus(); n.select();
    function ok(){ var v = n.value.trim(); if (!v) return; if (!/\.docx?$/i.test(v)) v += ".docx"; S.name = v; ev.saved = v; showFile(); closePop(); say("Đã lưu tệp <b>" + esc(v) + "</b>."); changed(); }
    p.querySelector("[data-ok]").addEventListener("click", ok); p.querySelector("[data-x2]").addEventListener("click", closePop);
    n.addEventListener("keydown", function(e){ if (e.key === "Enter") { e.preventDefault(); ok(); } });
  }
  function popPic(anchor){
    var p = openPop(anchor, '<div class="hd">Insert Picture – chọn ảnh<button type="button" data-x aria-label="Đóng">✕</button></div><div class="wd-pics"></div>'), w = p.querySelector(".wd-pics");
    PICS.forEach(function(pc){ var b = mk("button", "", '<img alt="' + esc(pc[0]) + '" src="' + pc[1] + '">'); b.type = "button"; b.title = pc[0]; b.addEventListener("click", function(){ closePop(); insertPic(pc); }); w.appendChild(b); });
  }
  function insertPic(pc){
    page.focus({preventScroll: true}); if (!restore()) { var r = document.createRange(); r.selectNodeContents(page); r.collapse(false); window.getSelection().removeAllRanges(); window.getSelection().addRange(r); }
    document.execCommand("insertHTML", false, '<img src="' + pc[1] + '" alt="' + esc(pc[0]) + '" width="240" height="150">');
    ev.pic++; changed(); say("Đã chèn ảnh <b>" + esc(pc[0]) + "</b>. Đặt con trỏ ngay cạnh ảnh rồi bấm nút căn lề để căn ảnh.");
  }

  /* ---------- Trang bìa ---------- */
  function insertCover(k){
    var c = COVERS[k], old = page.querySelector(".wd-cover"); if (old) old.remove();
    var d = document.createElement("div"); d.className = "wd-cover"; d.setAttribute("style", "border:3px solid " + c[0] + ";background:" + c[1] + ";padding:22px 16px;margin:0 0 18px;text-align:center;border-radius:4px");
    d.innerHTML = '<p style="text-align:center"><span style="font-size:26pt;color:' + c[2] + '"><b>[Tiêu đề tài liệu]</b></span></p><p style="text-align:center"><span style="font-size:15pt">[Phụ đề tài liệu]</span></p><p style="text-align:center"><img src="' + PICS[k === "Retrospect" ? 1 : 0][1] + '" alt="Ảnh trang bìa" width="240" height="150"></p><p style="text-align:center"><span style="font-size:13pt">[Năm học]</span></p>';
    page.insertBefore(d, page.firstChild); ev.cover = k; changed(); d.scrollIntoView({block: "nearest"});
    say("Đã chèn trang bìa mẫu <b>" + esc(k) + "</b> ở đầu văn bản. Bôi đen từng chữ trong ngoặc [ … ] rồi gõ nội dung của em. Muốn thay ảnh: xoá ảnh cũ, đặt con trỏ ở dòng đó rồi dùng Insert → Picture.");
  }

  /* ---------- Bảng ---------- */
  function popTable(anchor){
    var p = openPop(anchor, '<div class="hd"><span data-l>Insert Table</span><button type="button" data-x aria-label="Đóng">✕</button></div><div class="wd-grid"></div><button type="button" data-dlg>Insert Table…</button>'), g = p.querySelector(".wd-grid"), l = p.querySelector("[data-l]");
    for (var r = 1; r <= 6; r++) for (var c = 1; c <= 8; c++) (function(r, c){ var i = mk("i"); i.title = c + " × " + r; i.addEventListener("mouseenter", function(){ [].forEach.call(g.children, function(x, k){ x.classList.toggle("on", k % 8 < c && Math.floor(k / 8) < r); }); l.textContent = c + "x" + r + " Table (" + c + " cột, " + r + " hàng)"; }); i.addEventListener("click", function(){ closePop(); insertTable(r, c); }); g.appendChild(i); })(r, c);
    p.querySelector("[data-dlg]").addEventListener("click", function(){
      var q = openPop(anchor, '<div class="hd">Insert Table<button type="button" data-x aria-label="Đóng">✕</button></div><b>Table size</b><label>Number of columns: <input type="number" min="1" max="12" value="5" data-c style="width:4em"></label><label>Number of rows: <input type="number" min="1" max="40" value="2" data-r style="width:4em"></label><div><button type="button" data-ok>OK</button> <button type="button" data-x2>Cancel</button></div>');
      q.querySelector("[data-x2]").addEventListener("click", closePop);
      q.querySelector("[data-ok]").addEventListener("click", function(){ var c = Math.max(1, Math.min(12, +q.querySelector("[data-c]").value || 1)), r = Math.max(1, Math.min(40, +q.querySelector("[data-r]").value || 1)); closePop(); insertTable(r, c); });
    });
  }
  function insertTable(r, c){
    var h = "<table><tbody>"; for (var i = 0; i < r; i++) { h += "<tr>"; for (var j = 0; j < c; j++) h += "<td><br></td>"; h += "</tr>"; } h += "</tbody></table><p><br></p>";
    page.focus({preventScroll: true}); if (!restore()) { var rg = document.createRange(); rg.selectNodeContents(page); rg.collapse(false); window.getSelection().removeAllRanges(); window.getSelection().addRange(rg); }
    document.execCommand("insertHTML", false, h); ev.table.push([r, c]); changed();
    say("Đã chèn bảng <b>" + c + " cột × " + r + " hàng</b>. Nháy vào ô để gõ; nhấn <b>Tab</b> để sang ô kế tiếp.");
  }
  /* Mô hình bảng: lưới M[r][c] = mã ô; các ô gộp dùng chung một mã */
  function read(t){
    var M = [], cells = {}, id = 0;
    [].forEach.call(t.rows, function(tr, r){ M[r] = M[r] || []; var c = 0; [].forEach.call(tr.cells, function(td){ while (M[r][c] != null) c++; var k = ++id; cells[k] = {html: td.innerHTML, style: td.getAttribute("style") || ""}; td._k = k;
      for (var i = 0; i < (td.rowSpan || 1); i++) for (var j = 0; j < (td.colSpan || 1); j++) { M[r + i] = M[r + i] || []; M[r + i][c + j] = k; } c += td.colSpan || 1; }); });
    var w = 0; M.forEach(function(row){ w = Math.max(w, row.length); }); M.forEach(function(row){ for (var j = 0; j < w; j++) if (row[j] == null) { var k = ++id; cells[k] = {html: "<br>", style: ""}; row[j] = k; } });
    return {M: M, cells: cells, next: id};
  }
  function write(t, T, selKeys){
    var seen = {}, tb = document.createElement("tbody");
    T.M.forEach(function(row, r){ var tr = document.createElement("tr"); row.forEach(function(k, c){ if (seen[k]) return; seen[k] = 1;
      var rs = 0, cs = 0; while (T.M[r + rs] && T.M[r + rs][c] === k) rs++; while (row[c + cs] === k) cs++;
      var td = document.createElement("td"); td.innerHTML = T.cells[k].html || "<br>"; if (T.cells[k].style) td.setAttribute("style", T.cells[k].style); if (rs > 1) td.rowSpan = rs; if (cs > 1) td.colSpan = cs; if (selKeys && selKeys[k]) td.classList.add("wd-sel"); tr.appendChild(td); }); tb.appendChild(tr); });
    t.innerHTML = ""; t.appendChild(tb);
  }
  function curCell(){ var n = S.range && S.range.startContainer; while (n && n !== page) { if (n.nodeType === 1 && /^(TD|TH)$/.test(n.tagName)) return n; n = n.parentNode; } return null; }
  var dragSel = null;
  function selCells(t){ return [].slice.call(t.querySelectorAll("td.wd-sel,th.wd-sel")); }
  function bounds(T, keys){ var r0 = 1e9, r1 = -1, c0 = 1e9, c1 = -1; T.M.forEach(function(row, r){ row.forEach(function(k, c){ if (keys[k]) { r0 = Math.min(r0, r); r1 = Math.max(r1, r); c0 = Math.min(c0, c); c1 = Math.max(c1, c); } }); });
    /* mở rộng cho đủ các ô gộp nằm vắt qua biên */
    var grow = true; while (grow) { grow = false; for (var r = r0; r <= r1; r++) for (var c = c0; c <= c1; c++) { var k = T.M[r][c]; T.M.forEach(function(row, rr){ row.forEach(function(kk, cc){ if (kk === k) { if (rr < r0) { r0 = rr; grow = true; } if (rr > r1) { r1 = rr; grow = true; } if (cc < c0) { c0 = cc; grow = true; } if (cc > c1) { c1 = cc; grow = true; } } }); }); } }
    return [r0, r1, c0, c1]; }
  function tblOp(op){
    live(); var td = curCell(), t = td ? td.closest("table") : null;
    if (!t) { var s = page.querySelector("td.wd-sel"); if (s) { t = s.closest("table"); td = s; } }
    if (!t) return say("Hãy nháy chuột vào một ô của bảng trước (Table Tools chỉ dùng khi con trỏ ở trong bảng).");
    if (op === "deltable") { var nx = t.nextElementSibling; t.remove(); if (!page.firstChild) page.innerHTML = "<p><br></p>"; changed(); ev.rowcol++; return say("Đã xoá bảng."); }
    var T = read(t), keys = {}, sel = selCells(t); (sel.length ? sel : [td]).forEach(function(x){ keys[x._k] = 1; });
    var b = bounds(T, keys), w = T.M[0].length, i, j;
    function nk(){ var k = ++T.next; T.cells[k] = {html: "<br>", style: ""}; return k; }
    if (op === "above" || op === "below") {
      var at = op === "above" ? b[0] : b[1] + 1, row = [];
      for (j = 0; j < w; j++) { var up = at > 0 ? T.M[at - 1][j] : null, dn = at < T.M.length ? T.M[at][j] : null; row.push(up != null && up === dn ? up : nk()); }
      T.M.splice(at, 0, row); ev.rowcol++; say("Đã chèn một hàng " + (op === "above" ? "phía trên" : "phía dưới") + ".");
    } else if (op === "left" || op === "right") {
      var ac = op === "left" ? b[2] : b[3] + 1;
      T.M.forEach(function(row){ var l = ac > 0 ? row[ac - 1] : null, r = ac < row.length ? row[ac] : null; row.splice(ac, 0, l != null && l === r ? l : nk()); });
      ev.rowcol++; say("Đã chèn một cột " + (op === "left" ? "bên trái" : "bên phải") + ".");
    } else if (op === "delrow") {
      if (b[1] - b[0] + 1 >= T.M.length) { t.remove(); changed(); return say("Đã xoá tất cả các hàng (cả bảng)."); }
      T.M.splice(b[0], b[1] - b[0] + 1); ev.rowcol++; say("Đã xoá " + (b[1] - b[0] + 1) + " hàng.");
    } else if (op === "delcol") {
      if (b[3] - b[2] + 1 >= w) { t.remove(); changed(); return say("Đã xoá tất cả các cột (cả bảng)."); }
      T.M.forEach(function(row){ row.splice(b[2], b[3] - b[2] + 1); }); ev.rowcol++; say("Đã xoá " + (b[3] - b[2] + 1) + " cột.");
    } else if (op === "merge") {
      if (b[0] === b[1] && b[2] === b[3] || Object.keys(keys).length < 2 && sel.length < 2) return say("Hãy <b>kéo chuột</b> qua các ô cần gộp (các ô được tô xanh) rồi bấm <b>Merge Cells</b>.");
      var k0 = T.M[b[0]][b[2]], parts = [], seen = {};
      for (i = b[0]; i <= b[1]; i++) for (j = b[2]; j <= b[3]; j++) { var k = T.M[i][j]; if (!seen[k]) { seen[k] = 1; var h = T.cells[k].html.replace(/<br\s*\/?>\s*$/i, "").trim(); if (h) parts.push(h); } T.M[i][j] = k0; }
      T.cells[k0].html = parts.join(" ") || "<br>"; ev.merged++; say("Đã gộp " + Object.keys(seen).length + " ô thành một ô (Merge Cells).");
    }
    write(t, T); changed();
  }
  page.addEventListener("mousedown", function(e){
    var td = e.target.closest && e.target.closest("td,th"); page.querySelectorAll(".wd-sel").forEach(function(x){ x.classList.remove("wd-sel"); });
    dragSel = td ? {t: td.closest("table"), a: td} : null;
  });
  page.addEventListener("mouseover", function(e){
    if (!dragSel || !(e.buttons & 1)) return; var td = e.target.closest && e.target.closest("td,th"); if (!td || td.closest("table") !== dragSel.t) return;
    if (td === dragSel.a && !page.querySelector(".wd-sel")) return;
    var T = read(dragSel.t), keys = {}; keys[dragSel.a._k] = 1; keys[td._k] = 1; var b = bounds(T, keys), on = {};
    for (var i = b[0]; i <= b[1]; i++) for (var j = b[2]; j <= b[3]; j++) on[T.M[i][j]] = 1;
    dragSel.t.querySelectorAll("td,th").forEach(function(x){ x.classList.toggle("wd-sel", !!on[x._k]); });
    if (Object.keys(on).length > 1) { window.getSelection().removeAllRanges(); }
  });
  document.addEventListener("mouseup", function(){ if (dragSel) { var n = page.querySelectorAll(".wd-sel").length; if (n > 1) say("Đã chọn <b>" + n + "</b> ô. Bấm <b>Merge Cells</b> để gộp, hoặc lệnh chèn/xoá hàng, cột."); } dragSel = null; });
  page.addEventListener("keydown", function(e){
    live();
    if (e.key === "Tab") { var td = curCell(); if (td) { e.preventDefault(); var t2 = td.closest("table"), all = [].slice.call(t2.querySelectorAll("td,th")), i = all.indexOf(td) + (e.shiftKey ? -1 : 1);
      if (i >= all.length && !e.shiftKey) { tblOp("below"); all = [].slice.call(t2.querySelectorAll("td,th")); i = all.length - t2.rows[t2.rows.length - 1].cells.length; }
      var n = all[Math.max(0, i)]; if (n) { var r = document.createRange(); r.selectNodeContents(n); r.collapse(false); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } } }
    if ((e.ctrlKey || e.metaKey) && !e.altKey) { var k = e.key.toLowerCase();
      if (k === "f" && has("find")) { e.preventDefault(); openNav(); }
      else if (k === "h" && has("replace")) { e.preventDefault(); popReplace(rib); }
      else if (has("para") && {l: 1, e: 1, r: 1, j: 1}[k]) { e.preventDefault(); cmd({l: "justifyLeft", e: "justifyCenter", r: "justifyRight", j: "justifyFull"}[k]); } }
  });

  /* ---------- Tìm kiếm, thay thế ---------- */
  function textNodes(){ var out = [], tw = document.createTreeWalker(page, NodeFilter.SHOW_TEXT, null), n; while ((n = tw.nextNode())) out.push(n); return out; }
  function clearHL(){ page.querySelectorAll("mark.wd-hl").forEach(function(m){ m.replaceWith(document.createTextNode(m.textContent)); }); page.normalize(); }
  /* Như Word: chữ tìm được viết hoa chữ đầu thì chữ thay thế cũng viết hoa chữ đầu */
  function capLike(m, r){ var a = m.charAt(0); return r && a !== a.toLowerCase() && a === a.toUpperCase() && m.slice(1) === m.slice(1).toLowerCase() ? r.charAt(0).toUpperCase() + r.slice(1) : r; }
  function reOf(s, mc){ return new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), mc ? "g" : "gi"); }
  function countOf(s, mc){ if (!s) return 0; var m = (page.textContent || "").normalize("NFC").match(reOf(s.normalize("NFC"), mc)); return m ? m.length : 0; }
  function highlight(s, mc){
    clearHL(); if (!s) return [];
    var re = reOf(s.normalize("NFC"), mc), marks = [];
    textNodes().forEach(function(t){ var v = t.nodeValue.normalize("NFC"); if (v !== t.nodeValue) t.nodeValue = v; re.lastIndex = 0; if (!re.test(v)) return; re.lastIndex = 0;
      var f = document.createDocumentFragment(), last = 0, m; while ((m = re.exec(v))) { f.appendChild(document.createTextNode(v.slice(last, m.index))); var mk2 = document.createElement("mark"); mk2.className = "wd-hl"; mk2.textContent = m[0]; f.appendChild(mk2); marks.push(mk2); last = m.index + m[0].length; }
      f.appendChild(document.createTextNode(v.slice(last))); t.parentNode.replaceChild(f, t); });
    return marks;
  }
  function openNav(){
    nav.hidden = false;
    if (!nav.firstChild) {
      nav.innerHTML = '<b>Navigation</b><input type="text" placeholder="Search document" aria-label="Tìm trong văn bản"><div data-c></div><ol></ol><button type="button">✕ Đóng</button>';
      var inp = nav.querySelector("input"), out = nav.querySelector("[data-c]"), ol = nav.querySelector("ol");
      var run = function(){ var s = inp.value.trim(), ms = highlight(s, false); out.innerHTML = s ? "<b>" + ms.length + "</b> result" + (ms.length === 1 ? "" : "s") + " (" + ms.length + " kết quả)" : "";
        ol.innerHTML = ""; ms.forEach(function(m, i){ var p = m.closest("p,h1,h2,h3,td,li,div") || m.parentNode, li = mk("li", "", esc((p.textContent || "").slice(0, 60)) + "…"); li.addEventListener("click", function(){ ms.forEach(function(x){ x.classList.remove("wd-cur"); }); m.classList.add("wd-cur"); m.scrollIntoView({block: "nearest", behavior: "smooth"}); }); ol.appendChild(li); });
        if (s) { ev.find.push({s: s, n: ms.length}); changed(); say(ms.length ? "Tìm thấy <b>" + ms.length + "</b> chỗ có “" + esc(s) + "” (tô vàng). Bấm vào từng kết quả ở ngăn Navigation để di chuyển tới." : "Không tìm thấy “" + esc(s) + "” trong văn bản."); } };
      inp.addEventListener("input", run); nav.querySelector("button").addEventListener("click", function(){ nav.hidden = true; clearHL(); changed(); });
    }
    var i2 = nav.querySelector("input"); i2.focus(); i2.select(); say("Gõ từ hoặc cụm từ cần tìm vào ô <b>Search document</b> của ngăn Navigation.");
  }
  function popReplace(anchor){
    clearHL();
    var p = openPop(anchor, '<div class="hd">Find and Replace<button type="button" data-x aria-label="Đóng">✕</button></div><label>Find what: <input type="text" data-f style="width:14em"></label><label>Replace with: <input type="text" data-r style="width:14em"></label><label><input type="checkbox" data-mc> Match case</label><div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" data-a="rep">Replace</button><button type="button" data-a="all">Replace All</button><button type="button" data-a="next">Find Next</button><button type="button" data-x2>Cancel</button></div><div data-o style="min-height:1.2em"></div>');
    var F = p.querySelector("[data-f]"), R = p.querySelector("[data-r]"), MC = p.querySelector("[data-mc]"), O = p.querySelector("[data-o]"), cur = null;
    if (ev.find.length) F.value = ev.find[ev.find.length - 1].s; F.focus();
    p.querySelector("[data-x2]").addEventListener("click", closePop);
    function findNext(){ var s = F.value; if (!s) { O.textContent = "Nhập từ cần tìm vào ô Find what."; return null; }
      clearHL(); var re = reOf(s.normalize("NFC"), MC.checked), ts = textNodes(), startN = cur && cur.node, startO = cur ? cur.end : 0, pass = 0, i = startN ? ts.indexOf(startN) : 0; if (i < 0) { i = 0; startO = 0; }
      for (var guard = 0; guard < ts.length * 2 + 2; guard++) { var t = ts[i]; if (t) { var v = t.nodeValue.normalize("NFC"); if (v !== t.nodeValue) t.nodeValue = v; re.lastIndex = startO; var m = re.exec(v);
          if (m) { var rg = document.createRange(); rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length); var sl = window.getSelection(); sl.removeAllRanges(); sl.addRange(rg); S.range = rg.cloneRange(); cur = {node: t, start: m.index, end: m.index + m[0].length};
            var el = t.parentNode; if (el.scrollIntoView) el.scrollIntoView({block: "nearest"}); O.textContent = "Đã tìm thấy (được bôi đen trong văn bản)."; return cur; } }
        i++; startO = 0; if (i >= ts.length) { i = 0; pass++; if (pass > 1) break; } }
      cur = null; O.textContent = "Word đã tìm hết văn bản, không còn “" + s + "”."; return null; }
    p.querySelector('[data-a="next"]').addEventListener("click", function(){ findNext(); });
    p.querySelector('[data-a="rep"]').addEventListener("click", function(){
      var s = F.value; if (!s) return;
      if (cur && cur.node.isConnected && reOf(s.normalize("NFC"), MC.checked).test(cur.node.nodeValue.slice(cur.start, cur.end))) { var v = cur.node.nodeValue; var rv = MC.checked ? R.value : capLike(v.slice(cur.start, cur.end), R.value); cur.node.nodeValue = v.slice(0, cur.start) + rv + v.slice(cur.end); cur.end = cur.start + rv.length; ev.replaced++; changed(); }
      if (!findNext()) O.textContent = "Đã thay thế. Không còn chỗ nào khác.";
    });
    p.querySelector('[data-a="all"]').addEventListener("click", function(){
      var s = F.value; if (!s) { O.textContent = "Nhập từ cần tìm vào ô Find what."; return; }
      var re = reOf(s.normalize("NFC"), MC.checked), n = 0; clearHL();
      textNodes().forEach(function(t){ var v = t.nodeValue.normalize("NFC"), w = v.replace(re, function(m){ n++; return MC.checked ? R.value : capLike(m, R.value); }); if (w !== t.nodeValue) t.nodeValue = w; });
      ev.replaceAll.push({f: s, r: R.value, n: n}); changed(); cur = null;
      O.innerHTML = "All done. We made <b>" + n + "</b> replacement" + (n === 1 ? "" : "s") + ".";
      say(n ? "Đã thay thế <b>" + n + "</b> chỗ “" + esc(s) + "” bằng “" + esc(R.value) + "”." : "Không tìm thấy “" + esc(s) + "” nên không thay thế được chỗ nào.");
    });
  }

  /* ---------- Xem trước trang in ---------- */
  function preview(){
    var ov = mk("div", "wd-pv"), bar = mk("div", "bar", "<span>🖨 Print Preview – " + esc(S.name) + " · " + (S.orient === "landscape" ? "Landscape" : "Portrait") + " · Margins: " + esc(S.margin) + "</span>"), cl = mk("button", "", "✕ Đóng xem trước"); cl.type = "button";
    bar.appendChild(cl); ov.appendChild(bar); var pg = page.cloneNode(true); pg.removeAttribute("contenteditable"); pg.style.minHeight = (parseFloat(page.style.width) * (S.orient === "landscape" ? 21 / 29.7 : 29.7 / 21)) + "px"; ov.appendChild(pg); box.appendChild(ov);
    function close(){ ov.remove(); document.removeEventListener("keydown", key); }
    function key(e){ if (e.key === "Escape") close(); }
    cl.addEventListener("click", close); ov.addEventListener("click", function(e){ if (e.target === ov) close(); }); document.addEventListener("keydown", key);
    ev.printed++; changed(); say("Đang xem trước trang in (Print Preview). Kiểm tra hướng trang, lề, căn lề rồi đóng để chỉnh sửa tiếp.");
  }

  /* ---------- Trạng thái nút theo vị trí con trỏ ---------- */
  function styleAt(node){ var el = node && (node.nodeType === 1 ? node : node.parentNode); if (!el || !inPage(el)) return null; var cs = getComputedStyle(el);
    var blk = el; while (blk && blk !== page && !/^(P|H1|H2|H3|DIV|LI|TD|TH)$/.test(blk.tagName)) blk = blk.parentNode;
    var al = blk && blk !== page ? getComputedStyle(blk).textAlign : "left";
    return {b: +cs.fontWeight >= 600 || cs.fontWeight === "bold", i: cs.fontStyle === "italic", u: (function(){ for (var e = el; e && e !== page; e = e.parentNode) if (/underline/.test(getComputedStyle(e).textDecorationLine)) return true; return false; })(),
      size: Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2, font: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(), color: cs.color, align: al === "start" ? "left" : al === "end" ? "right" : al, block: blk}; }
  function syncUI(){
    var st = S.range && styleAt(S.range.startContainer); if (!st) return;
    if (UI.b) { UI.b.classList.toggle("wd-on", st.b); UI.i.classList.toggle("wd-on", st.i); UI.u.classList.toggle("wd-on", st.u); }
    if (UI.font && document.activeElement !== UI.font) UI.font.value = FONTS.indexOf(st.font) >= 0 ? st.font : "";
    if (UI.size && document.activeElement !== UI.size) UI.size.value = SIZES.indexOf(st.size) >= 0 ? st.size : "";
    if (UI.al) Object.keys(UI.al).forEach(function(k){ UI.al[k].classList.toggle("wd-on", st.align === k); });
    if (gT) gT.classList.toggle("wd-off", !curCell() && !page.querySelector(".wd-sel"));
  }

  /* ---------- Kiểm tra nhiệm vụ ---------- */
  function api(){
    var paras = topBlocks().map(function(b){ var cs = getComputedStyle(b), al = cs.textAlign; return {el: b, text: (b.textContent || "").trim(), align: al === "start" ? "left" : al === "end" ? "right" : al, lh: parseFloat(b.style.lineHeight) || 0, ml: parseFloat(b.style.marginLeft) || 0}; });
    return {page: page, text: (page.textContent || "").normalize("NFC"), paras: paras, orient: S.orient, margin: S.margin, name: S.name, ev: ev,
      tables: [].map.call(page.querySelectorAll("table"), function(t){ var T = read(t), merged = 0; [].forEach.call(t.querySelectorAll("td,th"), function(td){ if (td.rowSpan > 1 || td.colSpan > 1) merged++; }); return {el: t, rows: T.M.length, cols: T.M[0] ? T.M[0].length : 0, merged: merged, text: function(r, c){ var k = T.M[r] && T.M[r][c]; if (k == null) return ""; var d = document.createElement("div"); d.innerHTML = T.cells[k].html; return (d.textContent || "").trim(); }}; }),
      imgs: [].map.call(page.querySelectorAll("img"), function(im){ var p = im.closest("p,div,h1,h2,td,li"); var al = p && p !== page ? getComputedStyle(p).textAlign : "left"; return {el: im, align: al === "start" ? "left" : al}; }),
      find: function(s, mc){ return countOf(s, mc); },
      style: function(s){ var re = reOf(s.normalize("NFC"), false), ts = textNodes(); for (var i = 0; i < ts.length; i++) { var v = ts[i].nodeValue.normalize("NFC"); if (re.test(v)) return styleAt(ts[i]); } return null; },
      paraOf: function(s){ var l = s.toLowerCase(); for (var i = 0; i < paras.length; i++) if (paras[i].text.toLowerCase().indexOf(l) >= 0) return paras[i]; return null; }};
  }
  var tmr = 0;
  function changed(){ clearTimeout(tmr); tmr = setTimeout(run, 150); }
  function run(){ syncUI(); if (!opt.check) return; var r; try { r = opt.check(api()) || []; } catch (e) { r = []; }
    ck.innerHTML = r.map(function(x){ return '<li class="' + (x[1] ? "wd-ok" : "") + '">' + x[0] + "</li>"; }).join("");
    if (r.length && r.every(function(x){ return x[1]; })) say("🎉 Em đã hoàn thành tất cả yêu cầu!"); }
  page.addEventListener("input", function(){ changed(); });
  page.addEventListener("paste", function(e){ /* dán chữ thuần cho gọn */ var t = (e.clipboardData || window.clipboardData).getData("text/plain"); if (t != null) { e.preventDefault(); document.execCommand("insertText", false, t); } });
  say(opt.msg || "Nháy chuột vào trang văn bản để sửa. Chọn (bôi đen) phần cần định dạng rồi bấm lệnh trên thanh công cụ.");
  run();
  return {api: api, page: page};
};
})();
