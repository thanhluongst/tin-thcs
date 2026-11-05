/* PHẦN MỀM TRÌNH CHIẾU MÔ PHỎNG dùng chung cho các bài trình chiếu (Tin 7 Bài 11, 12, 13,…)
   TrinhChieu(phần tử, tuỳ chọn)
   - Trang: trang tiêu đề (Title Slide), New Slide, Layout (Title and Content, Title Only), xoá trang, chọn nhiều trang (Ctrl + nháy).
   - Danh sách nhiều cấp: Enter thêm dòng, Tab / Shift+Tab (Increase / Decrease List Level), chọn nhiều dòng (Shift + nháy),
     kí hiệu đầu dòng, đánh số, màu kí hiệu (Bullets and Numbering).
   - Font: phông, cỡ chữ, đậm, nghiêng, màu chữ, căn lề cho khung đang chọn (tiêu đề / phụ đề / nội dung).
   - Design: mẫu định dạng (Themes) cho các trang đang chọn hoặc tất cả; Format Background (màu nền trang).
   - Insert/Pictures: chèn hình từ thư viện; kéo thả để di chuyển, nút góc để đổi kích thước giữ tỉ lệ, nút cạnh để đổi chiều ngang/dọc;
     Bring Forward / Send Backward; Picture Border; Delete để xoá hình.
   - Dán (Ctrl+V) văn bản nhiều đoạn vào khung nội dung; tệp văn bản mẫu (opt.doc) để sao chép; Undo; trình chiếu toàn màn hình.
   Tuỳ chọn: title, note, slides[], tools[] ("slides","para","font","design","insert","show"), doc{name, paras[]}, extra[], check(x)
   x = {slides:[{layout, title, sub, lines:[{t, lv, b, c}], theme, bg, tf:{title,sub,body}, imgs:[{g,x,y,w,h,back,bd}]}], log:[…]} */
(function(){
"use strict";
var CSS = ".tc{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0}"
 + ".tc .t{font-weight:700}.tc .note{font-size:13px;opacity:.85}.tc .msg{font-size:13.5px;min-height:1.2em}.tc .msg.bad{color:#c0392b}"
 + ".tc .rb{display:flex;flex-wrap:wrap;gap:4px;align-items:center;background:#f3f3f3;border:1px solid #d6d6d6;border-radius:8px;padding:5px;color:#222}"
 + ".tc .rb button,.tc .rb select{font:inherit;font-size:13px;border:1px solid #bbb;background:#fff;color:#222;border-radius:6px;padding:3px 7px;cursor:pointer}"
 + ".tc .rb button:hover{border-color:#c4501b}.tc .rb .sep{width:1px;height:22px;background:#ccc;margin:0 3px}.tc .rb .lb{font-size:12px;color:#555;font-weight:600}"
 + ".tc .rb .thm{width:46px;height:28px;padding:0;font-size:11px;font-weight:700}"
 + ".tc .wk{display:grid;grid-template-columns:110px 1fr;gap:8px;min-width:0}@media (max-width:620px){.tc .wk{grid-template-columns:70px 1fr}}"
 + ".tc .th{display:grid;gap:6px;align-content:start;max-height:480px;overflow:auto;padding-right:2px}"
 + ".tc .th button{display:grid;grid-template-columns:16px 1fr;gap:3px;align-items:start;background:none;border:0;padding:0;cursor:pointer;text-align:left;color:inherit;font:inherit}"
 + ".tc .th .n{font-size:11px;opacity:.7}.tc .th .mini{aspect-ratio:16/9;border:1px solid #bbb;border-radius:3px;font-size:7px;line-height:1.2;padding:3px;overflow:hidden;position:relative}"
 + ".tc .th button.on .mini{outline:2px solid #c4501b}.tc .th button.ms .mini{outline:2px dashed #c4501b;outline-offset:1px}"
 + ".tc .sl{aspect-ratio:16/9;color:#222;border:1px solid #bbb;box-shadow:0 1px 4px rgba(0,0,0,.15);border-radius:4px;min-width:0;container-type:inline-size;overflow:hidden;position:relative;background:#fff}"
 + ".tc .sl .tx{position:absolute;inset:0;padding:3.5% 5%;display:flex;flex-direction:column;gap:2%;z-index:2;pointer-events:none}.tc .sl.ti .tx{justify-content:center}"
 + ".tc .sl .tx>*{pointer-events:auto}"
 + ".tc .sl input,.tc .sl textarea{font-family:inherit;color:inherit;background:transparent;border:1px dashed transparent;border-radius:3px;width:100%;box-sizing:border-box;outline:none;padding:2px 4px;resize:none;overflow:hidden;line-height:1.2}"
 + ".tc .sl input:hover,.tc .sl textarea:hover{border-color:rgba(127,127,127,.6)}.tc .sl input:focus,.tc .sl textarea:focus{border-color:#c4501b}"
 + ".tc .sl .sb{height:auto}"
 + ".tc .sl .bd{flex:1;border:1px dashed rgba(127,127,127,.45);border-radius:3px;padding:1% 2%;overflow:auto}"
 + ".tc .ln{display:flex;align-items:baseline;gap:.5em}.tc .ln .bu{flex:none;min-width:1em;text-align:right}.tc .ln textarea{padding:1px 2px}"
 + ".tc .ln.sel{background:rgba(253,183,150,.5);border-radius:3px}"
 + ".tc .sl img{position:absolute;display:block;object-fit:fill;cursor:move;-webkit-user-drag:none;user-select:none}"
 + ".tc .sl .fr{position:absolute;z-index:5;outline:1.5px solid #c4501b;cursor:move}.tc .sl .fr i{position:absolute;width:10px;height:10px;background:#fff;border:1.5px solid #c4501b;border-radius:2px}"
 + ".tc .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}"
 + ".tc .ck li::before{content:'☐ '}.tc .ck li.ok::before{content:'☑ ';color:#1c7c54}.tc .ck li.ok{color:#1c7c54;font-weight:600}"
 + ".tc .pop{border:1px solid #bbb;background:#fafafa;color:#222;border-radius:8px;padding:8px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px}"
 + ".tc .pop img{width:110px;aspect-ratio:4/3;border:2px solid #ccc;border-radius:4px;cursor:pointer}.tc .pop img:hover{border-color:#c4501b}"
 + ".tc .doc{border:1px solid #bbb;background:#fff;color:#222;border-radius:6px;padding:10px 14px;font:14px/1.5 'Times New Roman',serif;max-height:240px;overflow:auto}"
 + ".tc .doc h4{margin:0 0 4px;font:700 17px 'Times New Roman',serif}.tc .doc p{margin:0 0 6px}.tc .dh{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:13px}"
 + ".tc .dh b{color:#1f5fbf}.tc .dh button{font:inherit;font-size:13px;border:1px solid #bbb;background:#fff;border-radius:6px;padding:2px 8px;cursor:pointer}"
 + ".tc-show{position:fixed;inset:0;z-index:9999;background:#111;display:grid;place-items:center;cursor:pointer}"
 + ".tc-show .sl{width:min(96vw,170vh);border:0;border-radius:0;box-shadow:none}.tc-show .sl .bd{border-color:transparent}"
 + ".tc-show .hint{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);color:#ccc;font:13px sans-serif}"
 + ".tc .stx{white-space:pre-line;overflow-wrap:anywhere}";
function addCss(){ var s = document.getElementById("trinhchieu-css"); if (!s) { s = document.createElement("style"); s.id = "trinhchieu-css"; document.head.appendChild(s); } s.textContent = CSS; }
var PT = 0.1042;                    /* 1 pt = 0.1042 % bề rộng trang chiếu 16:9 (13,33 in) */
var LV = [0, 1, 0.85, 0.75, 0.68, 0.62];
var BUL = [["•","Chấm tròn"],["■","Hình vuông"],["➢","Mũi tên"],["✓","Dấu tích"],["◆","Hình thoi"],["❖","Hoa văn"],["1.","Đánh số 1. 2. 3."],["a.","Đánh số a. b. c."]];
var COL = [["","Theo mẫu (mặc định)"],["#000000","Đen"],["#ffffff","Trắng"],["#c0392b","Đỏ"],["#d35400","Cam"],["#1e8449","Xanh lá"],["#1f5fbf","Xanh dương"],["#7d3c98","Tím"],["#f1c40f","Vàng"]];
var FONTS = ["Calibri","Arial","Tahoma","Times New Roman","Verdana","Georgia","Comic Sans MS"];
var SIZES = [12,14,16,18,20,24,28,32,36,40,44,48,54,60,72];
var THEMES = [
  {n:"Office", bg:"#ffffff", tc:"#222222", bc:"#222222", ac:"", font:"Calibri"},
  {n:"Lá xanh", bg:"linear-gradient(135deg,#f3fbf4 0%,#d7efdc 100%)", tc:"#1e6b34", bc:"#1f2d22", ac:"#2e8b4a", font:"Times New Roman", band:"#2e8b4a"},
  {n:"Gỗ", bg:"linear-gradient(180deg,#fffaf1 0%,#f3e3c7 100%)", tc:"#7a3e10", bc:"#3a2a1a", ac:"#b5651d", font:"Georgia", band:"#8a5a2b"},
  {n:"Đêm", bg:"linear-gradient(135deg,#1d3557 0%,#2b5583 100%)", tc:"#ffd166", bc:"#f1f5f9", ac:"#ffd166", font:"Tahoma"},
  {n:"Hoa đào", bg:"linear-gradient(135deg,#fff3f8 0%,#ffd6e6 100%)", tc:"#b0306a", bc:"#40202d", ac:"#d63384", font:"Verdana", band:"#d63384"}
];
/* Thư viện hình ảnh minh hoạ (vẽ bằng SVG, không cần tải về) */
function svg(b){ return "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="none">' + b + "</svg>"); }
var GBLADE = ""; (function(){ for (var i = 0; i < 70; i++) { var x = (i * 37) % 400, h = 60 + (i * 53) % 90, c = i % 3 ? "#3f8f2f" : "#6cb33f"; GBLADE += '<path d="M' + x + ' 300 Q' + (x + 6) + " " + (300 - h / 2) + " " + (x + ((i % 2) ? 14 : -10)) + " " + (300 - h) + '" stroke="' + c + '" stroke-width="5" fill="none"/>'; } })();
var GALLERY = [
  {n:"Đồng cỏ bình minh", src: svg('<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3a55"/><stop offset=".55" stop-color="#f6b26b"/><stop offset="1" stop-color="#ffe08a"/></linearGradient><radialGradient id="u"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient></defs><rect width="400" height="300" fill="url(#s)"/><circle cx="210" cy="170" r="90" fill="url(#u)"/><rect y="200" width="400" height="100" fill="#2f6b25"/>' + GBLADE)},
  {n:"Cây xanh", src: svg('<rect width="400" height="300" fill="#dff1ff"/><rect y="230" width="400" height="70" fill="#7cc36b"/><rect x="185" y="150" width="30" height="100" fill="#8a5a2b"/><circle cx="200" cy="120" r="70" fill="#2e8b4a"/><circle cx="150" cy="140" r="45" fill="#3fa35a"/><circle cx="250" cy="140" r="45" fill="#3fa35a"/><circle cx="200" cy="80" r="40" fill="#4cb868"/><circle cx="330" cy="50" r="25" fill="#ffd34d"/>')},
  {n:"Trường học", src: svg('<rect width="400" height="300" fill="#e8f4fd"/><rect y="240" width="400" height="60" fill="#9ccc65"/><rect x="90" y="110" width="220" height="130" fill="#f6e3b4" stroke="#b5651d" stroke-width="3"/><polygon points="80,115 200,50 320,115" fill="#c0392b"/><rect x="180" y="180" width="40" height="60" fill="#8a5a2b"/>' + [110,150,240,280].map(function(x){ return '<rect x="' + x + '" y="135" width="26" height="26" fill="#9cc3f0" stroke="#555"/>'; }).join("") + '<line x1="200" y1="50" x2="200" y2="20" stroke="#555" stroke-width="3"/><polygon points="200,20 230,28 200,36" fill="#d32f2f"/><circle cx="50" cy="220" r="28" fill="#2e8b4a"/><circle cx="350" cy="220" r="28" fill="#2e8b4a"/>')},
  {n:"Vườn hoa", src: svg('<rect width="400" height="300" fill="#fff8e7"/><rect y="200" width="400" height="100" fill="#8bc34a"/>' + [[60,150,"#e91e63"],[130,120,"#ff9800"],[200,145,"#9c27b0"],[270,115,"#f44336"],[340,150,"#ffc107"]].map(function(p){ var x = p[0], y = p[1]; return '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="260" stroke="#2e7d32" stroke-width="5"/>' + [0,72,144,216,288].map(function(a){ var r = a * Math.PI / 180; return '<circle cx="' + (x + 18 * Math.cos(r)).toFixed(1) + '" cy="' + (y + 18 * Math.sin(r)).toFixed(1) + '" r="14" fill="' + p[2] + '"/>'; }).join("") + '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#ffeb3b"/>'; }).join(""))}
];
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function blank(lay){ var s = lay === "title" ? {layout:"title", title:"", sub:""} : lay === "only" ? {layout:"only", title:""} : {layout:"content", title:"", lines:[{t:"", lv:1}]}; s.theme = 0; s.tf = {}; s.imgs = []; return s; }
function norm(s){ if (!s.tf) s.tf = {}; if (!s.imgs) s.imgs = []; if (s.theme == null) s.theme = 0; return s; }
function mark(lines, i){ var L = lines[i], b = L.b || "•";
  if (b !== "1." && b !== "a.") return b;
  var n = 1; for (var j = i - 1; j >= 0; j--) { if (lines[j].lv < L.lv) break; if (lines[j].lv === L.lv) { if ((lines[j].b || "•") === b) n++; else break; } }
  return b === "1." ? n + "." : String.fromCharCode(96 + n) + "."; }
var DEF_TOOLS = ["slides","para","show"];

window.TrinhChieu = function(box, opt){
  addCss(); opt = opt || {};
  var tools = opt.tools || DEF_TOOLS, has = function(t){ return tools.indexOf(t) >= 0; };
  var S, cur, sel, log, ms, hist, lastBox, lastLine = 0, imgSel = null, clip = "", q = function(s){ return box.querySelector(s); };
  function reset(){ S = clone(opt.slides || [blank("title")]).map(norm); cur = 0; sel = null; log = []; ms = {}; hist = []; lastBox = "title"; imgSel = null; }
  reset();
  function snap(){ hist.push(JSON.stringify({S: S, cur: cur})); if (hist.length > 40) hist.shift(); }
  function th(s){ return THEMES[s.theme || 0] || THEMES[0]; }
  function tf(s, box){ var T = th(s), f = (s.tf || {})[box] || {}, def = box === "title" ? (s.layout === "title" ? 54 : 44) : box === "sub" ? 24 : 28;
    return {font: f.font || T.font, size: f.size || def, b: f.b == null ? box === "title" && s.layout === "title" : f.b, i: !!f.i, color: f.color || (box === "title" ? T.tc : T.bc), al: f.al || (box === "body" ? "left" : "center")}; }
  function css(F, mul){ return "font-family:'" + F.font + "',sans-serif;font-size:" + (F.size * PT * (mul || 1)).toFixed(3) + "cqw;font-weight:" + (F.b ? 700 : 400) + ";font-style:" + (F.i ? "italic" : "normal") + ";color:" + F.color + ";text-align:" + F.al + ";"; }
  function bgcss(s){ var T = th(s); return "background:" + (s.bg || T.bg) + ";" + (T.band && !s.bg ? "box-shadow:inset 0 -2.2cqw 0 " + T.band + ",0 1px 4px rgba(0,0,0,.15);" : ""); }

  /* ---------- Ribbon ---------- */
  var R = "";
  if (has("slides")) R += '<span class="lb">Slides</span><button type="button" data-a="new" title="New Slide: thêm trang mới (Title and Content)">➕ New Slide</button>'
    + '<select data-lay title="Layout: mẫu bố trí cho trang đang chọn"><option value="">Layout…</option><option value="title">Title Slide</option><option value="content">Title and Content</option><option value="only">Title Only</option></select>'
    + '<button type="button" data-a="delslide" title="Xoá trang đang chọn">🗑 Xoá trang</button><span class="sep"></span>';
  if (has("font")) R += '<span class="lb">Font</span><select data-font title="Phông chữ"><option value="">Phông…</option>' + FONTS.map(function(x){ return '<option style="font-family:\'' + x + '\'">' + x + "</option>"; }).join("") + "</select>"
    + '<select data-size title="Cỡ chữ"><option value="">Cỡ…</option>' + SIZES.map(function(x){ return "<option>" + x + "</option>"; }).join("") + "</select>"
    + '<button type="button" data-a="b" title="Chữ đậm"><b>B</b></button><button type="button" data-a="i" title="Chữ nghiêng"><i>I</i></button>'
    + '<select data-fcol title="Màu chữ"><option value="-">Màu chữ…</option>' + COL.map(function(c){ return '<option value="' + c[0] + '">' + c[1] + "</option>"; }).join("") + "</select>"
    + '<button type="button" data-a="al-left" title="Căn trái">⇤</button><button type="button" data-a="al-center" title="Căn giữa">↔</button><button type="button" data-a="al-right" title="Căn phải">⇥</button><span class="sep"></span>';
  if (has("para")) R += '<span class="lb">Paragraph</span><button type="button" data-a="dec" title="Decrease List Level (Shift+Tab)">⇤ Giảm cấp</button><button type="button" data-a="inc" title="Increase List Level (Tab)">⇥ Tăng cấp</button>'
    + '<select data-bul title="Bullets and Numbering: kí hiệu đầu dòng"><option value="">Kí hiệu…</option>' + BUL.map(function(b){ return '<option value="' + b[0] + '">' + b[0] + " " + b[1] + "</option>"; }).join("") + "</select>"
    + '<select data-col title="Color: màu kí hiệu đầu dòng"><option value="-">Màu kí hiệu…</option>' + COL.map(function(c){ return '<option value="' + c[0] + '">' + c[1] + "</option>"; }).join("") + '</select><span class="sep"></span>';
  if (has("design")) R += '<span class="lb">Design · Themes</span>' + THEMES.map(function(T, i){ return '<button type="button" class="thm" data-thm="' + i + '" title="Mẫu ' + T.n + '" style="background:' + T.bg + ";color:" + T.tc + ";font-family:'" + T.font + "'" + (T.band ? ";box-shadow:inset 0 -5px 0 " + T.band : "") + '">Aa</button>'; }).join("")
    + '<select data-bg title="Format Background: màu nền trang đang chọn"><option value="-">Màu nền…</option><option value="">Theo mẫu</option><option value="#ffffff">Trắng</option><option value="#5a9e46">Xanh lá</option><option value="#2e7d32">Xanh lá đậm</option><option value="#1f5fbf">Xanh dương</option><option value="#fff3c4">Vàng nhạt</option><option value="#222222">Đen</option></select><span class="sep"></span>';
  if (has("insert")) R += '<span class="lb">Insert · Picture</span><button type="button" data-a="pic" title="Insert/Pictures: chèn hình ảnh">🖼 Chèn hình</button>'
    + '<button type="button" data-a="fwd" title="Format/Arrange/Bring Forward: đưa hình lên trên văn bản">⬆ Bring Forward</button><button type="button" data-a="bwd" title="Format/Arrange/Send Backward: đưa hình xuống dưới văn bản">⬇ Send Backward</button>'
    + '<select data-bd title="Format/Picture Styles/Picture Border: viền hình"><option value="-">Viền hình…</option><option value="">Không viền</option><option value="#ffffff">Trắng</option><option value="#000000">Đen</option><option value="#2e7d32">Xanh lá</option><option value="#c0392b">Đỏ</option></select>'
    + '<button type="button" data-a="delpic" title="Xoá hình đang chọn (Delete)">✕ Xoá hình</button><span class="sep"></span>';
  if (has("font") || has("insert")) R += '<button type="button" data-a="paste" title="Home/Paste (Ctrl+V): dán văn bản đã sao chép">📋 Paste</button><button type="button" data-a="undo" title="Undo (Ctrl+Z): khôi phục lại">↶ Undo</button><span class="sep"></span>';
  if (has("show")) R += '<button type="button" data-a="show" title="Trình chiếu từ trang đầu (F5)">▶ Trình chiếu</button>';
  R += '<button type="button" data-a="reset">Làm lại</button>' + (opt.extra || []).map(function(x, i){ return '<button type="button" data-x="' + i + '" title="' + esc(x.title || "") + '">' + x.label + "</button>"; }).join("");

  box.classList.add("tc");
  box.innerHTML = '<div class="t">' + (opt.title || "Phần mềm trình chiếu mô phỏng") + "</div>"
    + (opt.doc ? '<div class="dh">📄 <b>' + esc(opt.doc.name) + "</b> (tệp văn bản) – bôi đen phần cần sao chép rồi bấm <button type='button' data-a='copydoc'>Copy (Ctrl+C)</button></div><div class='doc' data-doc>" + opt.doc.html + "</div>" : "")
    + '<div class="rb">' + R + "</div>"
    + '<div class="pop" data-gal hidden><b>Insert Picture:</b> chọn một hình để chèn vào trang đang chọn' + GALLERY.map(function(g, i){ return '<img src="' + g.src + '" alt="' + g.n + '" title="' + g.n + '" data-g="' + i + '">'; }).join("") + '<button type="button" data-a="galx">Đóng</button></div>'
    + '<div class="wk"><div class="th" data-th></div><div data-ed></div></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  function say(t, bad){ var m = q("[data-msg]"); m.textContent = t; m.className = "msg" + (bad ? " bad" : ""); }

  /* ---------- Vẽ trang ---------- */
  function imgsHtml(s, back, live){ return s.imgs.map(function(im, i){ if (!!im.back !== back) return "";
    return '<img src="' + GALLERY[im.g].src + '" alt="" ' + (live ? 'data-im="' + i + '" ' : "") + 'style="left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + "%;z-index:" + (back ? 1 : 3) + ";" + (im.bd ? "border:0.6cqw solid " + im.bd + ";box-sizing:border-box;" : "") + '">'; }).join(""); }
  function lineHtml(s, i, live){ var L = s.lines[i], F = tf(s, "body"), T = th(s), st = css(F, LV[L.lv]) + "padding-left:" + ((L.lv - 1) * 4.2) + "cqw";
    return '<div class="ln' + (live && sel && i >= sel[0] && i <= sel[1] ? " sel" : "") + '" style="' + st + '"><span class="bu" style="color:' + (L.c || T.ac || F.color) + ';font-style:normal;font-weight:400">' + esc(mark(s.lines, i)) + "</span>"
      + (live ? '<textarea rows="1" data-li="' + i + '" placeholder="' + (i === 0 && s.lines.length === 1 ? "Click to add text" : "") + '" aria-label="Dòng ' + (i + 1) + '" style="font:inherit;color:inherit;text-align:inherit">' + esc(L.t) + "</textarea>" : '<span class="stx" style="flex:1">' + esc(L.t) + "</span>") + "</div>"; }
  function slideHtml(s, live){
    var h = '<div class="sl' + (s.layout === "title" ? " ti" : "") + '" style="' + bgcss(s) + '">' + imgsHtml(s, true, live) + '<div class="tx">';
    var FT = tf(s, "title");
    h += live ? '<textarea rows="1" class="tt" data-tt placeholder="Click to add title" aria-label="Tiêu đề" style="' + css(FT) + '">' + esc(s.title) + "</textarea>" : '<div class="stx" style="' + css(FT) + 'padding:2px 4px">' + esc(s.title) + "</div>";
    if (s.layout === "title") { var FS = tf(s, "sub"); h += live ? '<textarea rows="2" class="sb" data-sb placeholder="Click to add subtitle" aria-label="Phụ đề" style="' + css(FS) + '">' + esc(s.sub) + "</textarea>" : '<div class="stx" style="' + css(FS) + 'padding:2px 4px">' + esc(s.sub) + "</div>"; }
    if (s.layout === "content") h += '<div class="bd">' + s.lines.map(function(L, i){ return lineHtml(s, i, live); }).join("") + "</div>";
    h += "</div>" + imgsHtml(s, false, live);
    if (live && imgSel != null && s.imgs[imgSel]) { var im = s.imgs[imgSel];
      h += '<div class="fr" data-fr style="left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + '%"><i data-h="r" style="right:-6px;top:calc(50% - 5px);cursor:ew-resize"></i><i data-h="b" style="bottom:-6px;left:calc(50% - 5px);cursor:ns-resize"></i><i data-h="br" style="right:-6px;bottom:-6px;cursor:nwse-resize"></i><i data-h="t" style="top:-6px;left:calc(50% - 5px);cursor:ns-resize"></i><i data-h="l" style="left:-6px;top:calc(50% - 5px);cursor:ew-resize"></i></div>'; }
    return h + "</div>"; }
  function mini(s){ var T = th(s), x = '<span style="position:relative;z-index:2"><b style="color:' + T.tc + '">' + esc(s.title || (s.layout === "title" ? "(Trang tiêu đề)" : "(Chưa có tiêu đề)")) + "</b>";
    if (s.layout === "title") x += "<br>" + esc((s.sub || "").split("\n")[0]); else if (s.lines) x += s.lines.slice(0, 6).map(function(L){ return "<br>" + "&nbsp;".repeat((L.lv - 1) * 3) + "• " + esc(L.t.slice(0, 40)); }).join("");
    return '<span class="mini" style="' + bgcss(s) + "color:" + T.bc + '">' + s.imgs.map(function(im){ return '<img src="' + GALLERY[im.g].src + '" alt="" style="position:absolute;left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + "%;z-index:" + (im.back ? 1 : 3) + '">'; }).join("") + x + "</span></span>"; }
  function thumbs(){ q("[data-th]").innerHTML = S.map(function(s, i){ return '<button type="button" data-s="' + i + '" class="' + (i === cur ? "on" : "") + (ms[i] ? " ms" : "") + '"><span class="n">' + (i + 1) + "</span>" + mini(s) + "</button>"; }).join("");
    box.querySelectorAll("[data-s]").forEach(function(b){ b.addEventListener("click", function(ev){ var i = +b.dataset.s;
      if (ev.ctrlKey || ev.metaKey) { if (ms[i]) delete ms[i]; else ms[i] = 1; ms[cur] = 1; say("Đã chọn " + Object.keys(ms).length + " trang (giữ Ctrl để chọn nhiều trang). Mẫu định dạng sẽ áp dụng cho các trang này."); }
      else ms = {};
      cur = i; sel = null; imgSel = null; draw(); }); }); }
  function check(){ if (opt.check) q("[data-ck]").innerHTML = opt.check({slides: S, log: log}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function fit(el){ el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }
  function focusLine(i, pos){ var el = q('[data-li="' + i + '"]'); if (el) { el.focus(); var p = pos == null ? el.value.length : pos; el.setSelectionRange(p, p); } }
  function draw(fi, pos){ thumbs(); var s = S[cur]; q("[data-ed]").innerHTML = slideHtml(s, true); bind(); check(); box.querySelectorAll(".sl textarea").forEach(fit); if (fi != null) focusLine(fi, pos); }
  function range(i){ return sel ? sel : [i, i]; }
  function level(d, i){ var s = S[cur]; if (s.layout !== "content") { say("Trang này không có khung nội dung dạng danh sách.", true); return; }
    snap(); var r = range(i == null ? 0 : i), ok = 0; for (var j = r[0]; j <= r[1]; j++) { var nv = s.lines[j].lv + d; if (nv >= 1 && nv <= 5) { s.lines[j].lv = nv; ok++; } }
    if (ok) { log.push(d > 0 ? "inc" : "dec"); say((d > 0 ? "Đã tăng bậc phân cấp (Increase List Level / Tab)" : "Đã giảm bậc phân cấp (Decrease List Level / Shift+Tab)") + " cho " + (r[1] - r[0] + 1) + " dòng."); }
    draw(i == null ? r[0] : i); }
  function pasteText(txt, i){ var s = S[cur]; txt = String(txt || "").replace(/\r/g, "").replace(/ /g, " ");
    var paras = txt.split(/\n+/).map(function(x){ return x.trim(); }).filter(Boolean); if (!paras.length) return false;
    snap();
    if (lastBox === "title" || s.layout !== "content") { if (lastBox === "sub" && s.layout === "title") s.sub = (s.sub ? s.sub + "\n" : "") + paras.join("\n"); else s.title = (s.title ? s.title + " " : "") + paras.join(" "); }
    else { var L = s.lines[i] || s.lines[lastLine] || s.lines[0], at = s.lines.indexOf(L), lv = L.lv;
      if (!L.t) { L.t = paras[0]; paras.shift(); } else at = at; paras.forEach(function(p, k){ s.lines.splice(at + 1 + k, 0, {t: p, lv: lv, b: L.b, c: L.c}); }); }
    log.push("paste"); say("Đã dán (Paste) văn bản vào trang " + (cur + 1) + ". Hãy biên tập lại cho ngắn gọn, cô đọng."); draw(); return true; }
  function fmtBox(fn){ var s = S[cur]; snap(); var b = lastBox === "sub" && s.layout !== "title" ? "title" : lastBox; if (b === "body" && s.layout !== "content") b = "title";
    s.tf[b] = s.tf[b] || {}; fn(s.tf[b], tf(s, b)); log.push("font"); say("Đã định dạng " + {title:"tiêu đề", sub:"phụ đề", body:"khung nội dung"}[b] + " của trang " + (cur + 1) + "."); draw(); }

  /* ---------- Sự kiện trong trang ---------- */
  function bind(){
    var s = S[cur], tt = q("[data-tt]"), sb = q("[data-sb]");
    tt.addEventListener("focus", function(){ lastBox = "title"; imgSelClear(); });
    tt.addEventListener("input", function(){ s.title = tt.value.replace(/\n/g, " "); fit(tt); thumbs(); check(); });
    tt.addEventListener("keydown", function(ev){ if (ev.key === "Enter") { ev.preventDefault(); if (s.layout === "content") focusLine(0); else if (sb) sb.focus(); } });
    tt.addEventListener("paste", function(ev){ var t = (ev.clipboardData || window.clipboardData).getData("text"); if (/\n/.test(t)) { ev.preventDefault(); pasteText(t); } else log.push("paste"); });
    if (sb) { sb.addEventListener("focus", function(){ lastBox = "sub"; imgSelClear(); }); sb.addEventListener("input", function(){ s.sub = sb.value; fit(sb); thumbs(); check(); }); }
    box.querySelectorAll("[data-li]").forEach(function(inp){ var i = +inp.dataset.li;
      inp.addEventListener("focus", function(){ lastBox = "body"; lastLine = i; imgSelClear(); if (sel && (i < sel[0] || i > sel[1])) { sel = null; box.querySelectorAll(".ln.sel").forEach(function(x){ x.classList.remove("sel"); }); } });
      inp.addEventListener("mousedown", function(ev){ if (ev.shiftKey) { ev.preventDefault(); var a = sel ? sel[0] : lastLine; sel = [Math.min(a, i), Math.max(a, i)]; say("Đã chọn " + (sel[1] - sel[0] + 1) + " dòng. Bấm Tab / Shift+Tab hoặc chọn kí hiệu, màu cho các dòng này."); draw(i); }
        else if (sel) { sel = null; draw(i, null); } });
      inp.addEventListener("input", function(){ s.lines[i].t = inp.value.replace(/\n/g, " "); fit(inp); thumbs(); check(); });
      inp.addEventListener("paste", function(ev){ var t = (ev.clipboardData || window.clipboardData).getData("text"); if (/\n/.test(t)) { ev.preventDefault(); pasteText(t, i); } else log.push("paste"); });
      inp.addEventListener("keydown", function(ev){
        if (ev.key === "Tab") { ev.preventDefault(); level(ev.shiftKey ? -1 : 1, i); return; }
        if (ev.key === "Enter") { ev.preventDefault(); var p = inp.selectionStart, L = s.lines[i], rest = L.t.slice(p); L.t = L.t.slice(0, p);
          s.lines.splice(i + 1, 0, {t: rest, lv: L.lv, b: L.b, c: L.c}); sel = null; draw(i + 1, 0); return; }
        if (ev.key === "Backspace" && inp.selectionStart === 0 && inp.selectionEnd === 0 && i > 0) { ev.preventDefault(); var prev = s.lines[i - 1], len = prev.t.length; prev.t += s.lines[i].t; s.lines.splice(i, 1); sel = null; draw(i - 1, len); return; }
        var up = ev.key === "ArrowUp", dn = ev.key === "ArrowDown";
        if ((up && inp.selectionStart === 0) || (dn && inp.selectionEnd === inp.value.length)) { var n = i + (up ? -1 : 1); if (n < 0 || n >= s.lines.length) return; ev.preventDefault();
          if (ev.shiftKey) { var a = sel ? (sel[0] === i ? sel[1] : sel[0]) : i; sel = [Math.min(a, n), Math.max(a, n)]; } else sel = null; draw(n, up ? null : 0); }
      }); });
    /* Hình ảnh: chọn, kéo thả, đổi kích thước */
    var sl = q("[data-ed] .sl");
    function startDrag(ev, mode){ ev.preventDefault(); ev.stopPropagation(); var im = s.imgs[imgSel], r = sl.getBoundingClientRect(), x0 = ev.clientX, y0 = ev.clientY, o = clone(im), moved = false; snap();
      function mv(e){ var dx = (e.clientX - x0) / r.width * 100, dy = (e.clientY - y0) / r.height * 100; moved = true;
        if (mode === "move") { im.x = +(o.x + dx).toFixed(2); im.y = +(o.y + dy).toFixed(2); }
        else if (mode === "br") { var nw = Math.max(5, o.w + dx); im.w = +nw.toFixed(2); im.h = +(o.h * nw / o.w).toFixed(2); }
        else if (mode === "r") im.w = +Math.max(5, o.w + dx).toFixed(2);
        else if (mode === "l") { var w2 = Math.max(5, o.w - dx); im.x = +(o.x + o.w - w2).toFixed(2); im.w = +w2.toFixed(2); }
        else if (mode === "b") im.h = +Math.max(5, o.h + dy).toFixed(2);
        else if (mode === "t") { var h2 = Math.max(5, o.h - dy); im.y = +(o.y + o.h - h2).toFixed(2); im.h = +h2.toFixed(2); }
        place(); }
      function up(){ window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); if (moved) { log.push(mode === "move" ? "move" : "resize"); say(mode === "move" ? "Đã thay đổi vị trí hình ảnh." : mode === "br" ? "Đã thay đổi kích thước hình ảnh (giữ nguyên tỉ lệ)." : "Đã thay đổi kích thước hình ảnh."); } else hist.pop(); thumbs(); check(); }
      window.addEventListener("mousemove", mv); window.addEventListener("mouseup", up); }
    function place(){ var im = s.imgs[imgSel], el = sl.querySelector('[data-im="' + imgSel + '"]'), fr = sl.querySelector("[data-fr]");
      [el, fr].forEach(function(x){ if (x) { x.style.left = im.x + "%"; x.style.top = im.y + "%"; x.style.width = im.w + "%"; x.style.height = im.h + "%"; } }); }
    sl.querySelectorAll("[data-im]").forEach(function(img){ img.addEventListener("mousedown", function(ev){ imgSel = +img.dataset.im; lastBox = "img"; draw(); box.focus({preventScroll: true}); startDrag(ev, "move"); say("Đã chọn hình ảnh. Kéo thả để di chuyển, kéo nút ở góc để đổi kích thước; nhấn Delete để xoá."); }); });
    var fr = sl.querySelector("[data-fr]");
    if (fr) { fr.addEventListener("mousedown", function(ev){ var h = ev.target.dataset && ev.target.dataset.h; startDrag(ev, h || "move"); }); }
    sl.addEventListener("mousedown", function(ev){ if (ev.target === sl && imgSel != null) { imgSel = null; draw(); } });
  }
  function imgSelClear(){ if (imgSel != null) { imgSel = null; var fr = q("[data-fr]"); if (fr) fr.remove(); } }
  box.tabIndex = -1;
  box.addEventListener("keydown", function(ev){
    if ((ev.key === "Delete" || ev.key === "Backspace") && imgSel != null && !/TEXTAREA|INPUT|SELECT/.test(ev.target.tagName)) { ev.preventDefault(); delPic(); }
    if ((ev.ctrlKey || ev.metaKey) && /^[zZ]$/.test(ev.key) && !/TEXTAREA|INPUT/.test(ev.target.tagName)) { ev.preventDefault(); undo(); } });
  function delPic(){ var s = S[cur]; if (imgSel == null || !s.imgs[imgSel]) { say("Hãy nháy chọn hình ảnh trước.", true); return; } snap(); s.imgs.splice(imgSel, 1); imgSel = null; log.push("delpic"); say("Đã xoá hình ảnh."); draw(); }
  function undo(){ if (!hist.length) { say("Không còn thao tác để khôi phục.", true); return; } var o = JSON.parse(hist.pop()); S = o.S; cur = Math.min(o.cur, S.length - 1); imgSel = null; sel = null; log.push("undo"); say("Đã khôi phục lại (Undo)."); draw(); }
  function needImg(){ if (imgSel == null || !S[cur].imgs[imgSel]) { say("Hãy nháy chọn hình ảnh trên trang trước.", true); return false; } return true; }

  /* ---------- Nút lệnh ---------- */
  box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("mousedown", function(ev){ if (b.tagName === "BUTTON") ev.preventDefault(); });
    b.addEventListener("click", function(){ var a = b.dataset.a, s = S[cur];
    if (a === "new") { snap(); S.splice(cur + 1, 0, blank("content")); S[cur + 1].theme = s.theme; cur++; sel = null; imgSel = null; ms = {}; log.push("new"); say("Đã thêm trang " + (cur + 1) + " với mẫu bố trí Title and Content. Nháy vào Click to add title để nhập tiêu đề trang."); draw(); return; }
    if (a === "delslide") { if (S.length === 1) { say("Bài trình chiếu phải có ít nhất một trang.", true); return; } snap(); S.splice(cur, 1); cur = Math.min(cur, S.length - 1); sel = null; imgSel = null; ms = {}; say("Đã xoá trang."); draw(); return; }
    if (a === "inc" || a === "dec") { level(a === "inc" ? 1 : -1, lastLine); return; }
    if (a === "b" || a === "i") { fmtBox(function(o, cur){ o[a] = !cur[a]; }); return; }
    if (a.indexOf("al-") === 0) { fmtBox(function(o){ o.al = a.slice(3); }); return; }
    if (a === "pic") { q("[data-gal]").hidden = !q("[data-gal]").hidden; return; }
    if (a === "galx") { q("[data-gal]").hidden = true; return; }
    if (a === "fwd" || a === "bwd") { if (!needImg()) return; snap(); s.imgs[imgSel].back = a === "bwd"; log.push(a === "bwd" ? "back" : "front");
      say(a === "bwd" ? "Đã đưa hình ảnh xuống dưới văn bản (Send Backward): văn bản không bị che nữa." : "Đã đưa hình ảnh lên trên (Bring Forward)."); draw(); return; }
    if (a === "delpic") { delPic(); return; }
    if (a === "undo") { undo(); return; }
    if (a === "paste") { if (!clip) { say("Chưa sao chép gì. Hãy bôi đen văn bản trong tệp văn bản rồi bấm Copy.", true); return; } pasteText(clip, lastLine); return; }
    if (a === "copydoc") { var t = String(window.getSelection ? window.getSelection() : ""); var dc = q("[data-doc]");
      if (!t.trim() || !dc.contains(window.getSelection().anchorNode)) { say("Hãy bôi đen (chọn) phần văn bản cần sao chép trong tệp văn bản trước.", true); return; }
      clip = t; log.push("copy"); say("Đã sao chép (Copy) " + t.trim().split(/\s+/).length + " từ. Đặt con trỏ vào khung cần dán trên trang chiếu rồi bấm Paste (Ctrl+V)."); return; }
    if (a === "show") { show(); return; }
    if (a === "reset") { reset(); q("[data-gal]") && (q("[data-gal]").hidden = true); say("Đã làm lại từ đầu."); draw(); }
  }); });
  function sel1(name, fn){ var el = q(name); if (el) el.addEventListener("change", function(){ var v = this.value; this.value = this.options[0].value; if (v === "" && this.options[0].value === "") return; if (v === "-") return; fn(v); }); }
  sel1("[data-lay]", function(v){ var s = S[cur]; snap(); var n = blank(v); n.title = s.title || ""; n.theme = s.theme; n.bg = s.bg; n.tf = s.tf; n.imgs = s.imgs;
    if (v === "title") n.sub = s.sub || (s.lines ? s.lines.map(function(L){ return L.t; }).join("\n") : ""); if (v === "content") n.lines = s.lines || (s.sub ? s.sub.split("\n").map(function(t){ return {t: t, lv: 1}; }) : [{t:"", lv:1}]);
    S[cur] = n; log.push("layout-" + v); say("Đã đổi mẫu bố trí (Layout) của trang " + (cur + 1) + " thành " + {title:"Title Slide", content:"Title and Content", only:"Title Only"}[v] + "."); draw(); });
  sel1("[data-bul]", function(v){ var s = S[cur]; if (s.layout !== "content") { say("Hãy đặt con trỏ vào các dòng của khung nội dung trước.", true); return; }
    snap(); var r = range(lastLine); for (var j = r[0]; j <= r[1]; j++) s.lines[j].b = v; log.push("bullet"); say("Đã đổi kí hiệu đầu dòng của " + (r[1] - r[0] + 1) + " dòng."); draw(r[0]); });
  var colSel = q("[data-col]"); if (colSel) colSel.addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-") return; var s = S[cur]; if (s.layout !== "content") return;
    snap(); var r = range(lastLine); for (var j = r[0]; j <= r[1]; j++) { if (v) s.lines[j].c = v; else delete s.lines[j].c; } log.push("color"); say("Đã đổi màu kí hiệu đầu dòng của " + (r[1] - r[0] + 1) + " dòng."); draw(r[0]); });
  sel1("[data-font]", function(v){ fmtBox(function(o){ o.font = v; }); });
  sel1("[data-size]", function(v){ fmtBox(function(o){ o.size = +v; }); });
  var fc = q("[data-fcol]"); if (fc) fc.addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-") return; fmtBox(function(o){ if (v) o.color = v; else delete o.color; }); });
  var bg = q("[data-bg]"); if (bg) bg.addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-") return; snap(); var s = S[cur]; if (v) s.bg = v; else delete s.bg; log.push("bg"); say("Đã đổi màu nền trang " + (cur + 1) + " (Format Background)."); draw(); });
  var bd = q("[data-bd]"); if (bd) bd.addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-" || !needImg()) return; snap(); var im = S[cur].imgs[imgSel]; if (v) im.bd = v; else delete im.bd; log.push("border"); say(v ? "Đã thêm đường viền cho hình ảnh (Picture Border)." : "Đã bỏ đường viền hình ảnh."); draw(); });
  box.querySelectorAll("[data-thm]").forEach(function(b){ b.addEventListener("click", function(){ var t = +b.dataset.thm, keys = Object.keys(ms).map(Number); snap();
    if (keys.length > 1) keys.forEach(function(i){ S[i].theme = t; }); else S.forEach(function(s){ s.theme = t; });
    log.push("theme"); say("Đã áp dụng mẫu định dạng " + THEMES[t].n + " cho " + (keys.length > 1 ? keys.length + " trang đã chọn" : "tất cả các trang") + ". Bấm Undo để khôi phục mẫu trước đó."); draw(); }); });
  box.querySelectorAll("[data-g]").forEach(function(im){ im.addEventListener("click", function(){ var s = S[cur]; snap(); s.imgs.push({g: +im.dataset.g, x: 25, y: 16, w: 50, h: +(50 * (16 / 9) * (3 / 4)).toFixed(2)});
    imgSel = s.imgs.length - 1; q("[data-gal]").hidden = true; box.focus({preventScroll: true}); log.push("pic"); say("Đã chèn hình ảnh vào trang " + (cur + 1) + ". Hình đang che văn bản: dùng Send Backward để đưa hình xuống dưới, kéo thả để đổi vị trí, kéo nút góc để đổi kích thước."); draw(); }); });
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
window.TrinhChieu.THEMES = THEMES;
})();
