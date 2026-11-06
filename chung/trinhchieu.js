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
   - Animations: hiệu ứng cho đối tượng (Appear, Fade, Fly In, Float In, Wipe, Zoom), Start (On Click / With / After Previous), Duration,
     Animation Pane (đổi thứ tự, xoá), Preview; Transitions: hiệu ứng chuyển trang, Apply To All.
   - Insert/Header & Footer (tools "hf"): hộp thoại Header and Footer – thẻ Slide (Date and time: Update automatically / Fixed, Slide number,
     Footer, Don't show on title slide; Apply / Apply to All) và thẻ Notes and Handouts (Header, Page number, Footer).
   - opt.advice: bảng "Gợi ý của máy" cho trang đang chọn (độ tương phản chữ/nền, cỡ chữ, độ dài dòng, số màu, số phông).
   - Ctrl + nháy chọn nhiều trang rồi định dạng chữ: áp dụng cho khung cùng loại ở các trang đã chọn.
   Tuỳ chọn: title, note, slides[], tools[] ("slides","para","font","design","insert","anim","trans","hf","show"), doc{name, html}, extra[], advice, check(x)
   x = {slides:[{layout, title, sub, lines:[{t, lv, b, c}], theme, bg, tf:{title,sub,body}, imgs:[{g,x,y,w,h,back,bd}], hf}], log:[…], nh, advice(i)} */
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
 + ".tc .stx{white-space:pre-line;overflow-wrap:anywhere}"
 + ".tc .pane{border:1px solid #d6d6d6;background:#fbfbfb;color:#222;border-radius:8px;padding:6px 8px;font-size:13px;display:grid;gap:3px}"
 + ".tc .pane .h{font-weight:700;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.tc .pane .h span{font-weight:400;color:#666}"
 + ".tc .pane .r{display:flex;gap:6px;align-items:center;padding:2px 4px;border-radius:4px;cursor:pointer}.tc .pane .r.on{background:#fde3d6}"
 + ".tc .pane .r b{min-width:1.6em;color:#c4501b}.tc .pane .r em{flex:1;font-style:normal}.tc .pane button{font:inherit;font-size:12px;border:1px solid #bbb;background:#fff;border-radius:4px;padding:0 6px;cursor:pointer}"
 + ".tc .th .star{position:absolute;left:0;bottom:-2px;font-size:10px;color:#c4501b}"
 + "@keyframes tc-fade{from{opacity:0}to{opacity:1}}@keyframes tc-fly{from{transform:translateY(130%);opacity:.3}to{transform:none;opacity:1}}"
 + "@keyframes tc-float{from{transform:translateY(40%);opacity:0}to{transform:none;opacity:1}}@keyframes tc-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}"
 + "@keyframes tc-zoom{from{transform:scale(.2);opacity:0}to{transform:none;opacity:1}}"
 + "@keyframes tr-fade{from{opacity:0}to{opacity:1}}@keyframes tr-push{from{transform:translateX(100%)}to{transform:none}}@keyframes tr-wipe{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0)}}"
 + ".tc .sl .ft{position:absolute;left:5%;right:5%;bottom:2.4%;z-index:2;display:grid;grid-template-columns:1fr 2fr 1fr;gap:2%;pointer-events:none;opacity:.85}"
 + ".tc .sl .ft span:nth-child(2){text-align:center}.tc .sl .ft span:nth-child(3){text-align:right}"
 + ".tc .mini .mft{position:absolute;left:4%;right:4%;bottom:3%;display:flex;justify-content:space-between;font-size:5px;opacity:.85;z-index:2}"
 + ".tc .hfd{border:1px solid #9aa4ae;background:#fff;color:#222;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.18);font-size:13px;max-width:560px}"
 + ".tc .hfd .hd{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600}"
 + ".tc .hfd .tabs{display:flex;gap:2px;padding:6px 10px 0}.tc .hfd .tabs button{font:inherit;font-size:12.5px;border:1px solid #ccc;border-bottom:0;background:#eee;border-radius:4px 4px 0 0;padding:3px 10px;cursor:pointer}.tc .hfd .tabs button.on{background:#fff;font-weight:600}"
 + ".tc .hfd .bx{border-top:1px solid #ccc;padding:8px 10px;display:grid;grid-template-columns:1fr 120px;gap:10px}@media (max-width:520px){.tc .hfd .bx{grid-template-columns:1fr}}"
 + ".tc .hfd fieldset{border:1px solid #ddd;border-radius:4px;margin:0;padding:6px 8px;display:grid;gap:5px}.tc .hfd legend{font-size:12px;color:#555}"
 + ".tc .hfd label{display:block}.tc .hfd label input{margin:0 5px 0 0;vertical-align:-2px}.tc .hfd .in{padding-left:20px}"
 + ".tc .hfd input[type=text]{font:inherit;font-size:13px;border:1px solid #bbb;border-radius:3px;padding:2px 5px;width:100%;box-sizing:border-box;background:#fff;color:#222}.tc .hfd input:disabled{background:#f1f1f1;color:#888}"
 + ".tc .hfd .pv{border:1px solid #ccc;aspect-ratio:16/9;position:relative;background:#fafafa;max-width:160px}.tc .hfd .pv i{position:absolute;bottom:8%;height:9%;border:1px dashed #999}.tc .hfd .pv i.on{background:#333;border-color:#333}"
 + ".tc .hfd .ft2{display:flex;justify-content:flex-end;gap:6px;padding:8px 10px;border-top:1px solid #ddd}.tc .hfd .ft2 button{font:inherit;font-size:13px;border:1px solid #999;background:#f6f6f6;color:#222;border-radius:4px;padding:3px 12px;cursor:pointer}.tc .hfd .ft2 button.pr{border-color:#2f6fb3;box-shadow:inset 0 0 0 1px #2f6fb3}"
 + ".tc .adv{border:1px solid #d6d6d6;border-radius:8px;padding:6px 10px;font-size:13px;display:grid;gap:2px;background:#fbfbfb;color:#222}.tc .adv b{font-size:13px}.tc .adv .g{color:#1c7c54}.tc .adv .w{color:#b9480f}"
 + "@keyframes tr-split{from{clip-path:inset(0 50% 0 50%)}to{clip-path:inset(0)}}@keyframes tr-zoom{from{transform:scale(.3);opacity:0}to{transform:none;opacity:1}}";
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
function hex(c){ var m = /#([0-9a-f]{6}|[0-9a-f]{3})\b/i.exec(String(c || "")); if (!m) return "#ffffff"; var h = m[1]; if (h.length === 3) h = h.replace(/./g, "$&$&"); return "#" + h.toLowerCase(); }
function lum(c){ c = hex(c); var v = [1, 3, 5].map(function(i){ var x = parseInt(c.substr(i, 2), 16) / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
function contrast(a, b){ var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function today(){ var d = new Date(); return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
function blank(lay){ var s = lay === "title" ? {layout:"title", title:"", sub:""} : lay === "only" ? {layout:"only", title:""} : {layout:"content", title:"", lines:[{t:"", lv:1}]}; s.theme = 0; s.tf = {}; s.imgs = []; s.anim = []; return s; }
function norm(s){ if (!s.tf) s.tf = {}; if (!s.imgs) s.imgs = []; if (s.theme == null) s.theme = 0; if (!s.anim) s.anim = []; return s; }
function mark(lines, i){ var L = lines[i], b = L.b || "•";
  if (b !== "1." && b !== "a.") return b;
  var n = 1; for (var j = i - 1; j >= 0; j--) { if (lines[j].lv < L.lv) break; if (lines[j].lv === L.lv) { if ((lines[j].b || "•") === b) n++; else break; } }
  return b === "1." ? n + "." : String.fromCharCode(96 + n) + "."; }
var DEF_TOOLS = ["slides","para","show"];
var EFFECTS = [["appear","Appear"],["fade","Fade"],["fly","Fly In"],["float","Float In"],["wipe","Wipe"],["zoom","Zoom"]];
var TRANS = [["","None"],["fade","Fade"],["push","Push"],["wipe","Wipe"],["split","Split"],["zoom","Zoom"]];
var STARTS = {click:"On Click", "with":"With Previous", after:"After Previous"};
function effName(e){ for (var i = 0; i < EFFECTS.length; i++) if (EFFECTS[i][0] === e) return EFFECTS[i][1]; return e; }
function trName(e){ for (var i = 0; i < TRANS.length; i++) if (TRANS[i][0] === e) return TRANS[i][1]; return e; }

window.TrinhChieu = function(box, opt){
  addCss(); opt = opt || {};
  var tools = opt.tools || DEF_TOOLS, has = function(t){ return tools.indexOf(t) >= 0; };
  var S, cur, sel, log, ms, hist, lastBox, lastLine = 0, imgSel = null, clip = "", q = function(s){ return box.querySelector(s); };
  var NH, HF;
  function reset(){ S = clone(opt.slides || [blank("title")]).map(norm); cur = 0; sel = null; log = []; ms = {}; hist = []; lastBox = "title"; imgSel = null; NH = {hdr: false, htext: "", num: true, foot: false, ftext: ""}; HF = null; }
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
  if (has("anim")) R += '<span class="lb">Animations</span><select data-eff title="Chọn hiệu ứng cho đối tượng đang chọn (nháy vào tiêu đề, khung nội dung hoặc hình ảnh trước)"><option value="">Hiệu ứng…</option>' + EFFECTS.map(function(x){ return '<option value="' + x[0] + '">' + x[1] + "</option>"; }).join("") + '<option value="none">✕ Bỏ hiệu ứng</option></select>'
    + '<select data-start title="Start: cách đối tượng xuất hiện"><option value="">Start…</option><option value="click">On Click</option><option value="with">With Previous</option><option value="after">After Previous</option></select>'
    + '<select data-dur title="Duration: thời lượng hiệu ứng"><option value="">Duration…</option><option value="0.5">0,5 giây</option><option value="1">1 giây</option><option value="2">2 giây</option></select>'
    + '<button type="button" data-a="preview" title="Preview: xem trước hiệu ứng của trang">👁 Preview</button><span class="sep"></span>';
  if (has("trans")) R += '<span class="lb">Transitions</span><select data-tr title="Hiệu ứng chuyển trang cho trang đang chọn"><option value="-">Chuyển trang…</option>' + TRANS.map(function(x){ return '<option value="' + x[0] + '">' + x[1] + "</option>"; }).join("") + "</select>"
    + '<select data-trd title="Duration: thời lượng chuyển trang"><option value="">Thời lượng…</option><option value="0.5">0,5 giây</option><option value="1">1 giây</option><option value="2">2 giây</option></select>'
    + '<button type="button" data-a="trall" title="Apply To All: áp dụng hiệu ứng chuyển trang này cho tất cả các trang">Apply To All</button><span class="sep"></span>';
  if (has("hf")) R += '<span class="lb">Insert · Text</span><button type="button" data-a="hf" title="Insert/Header &amp; Footer: số trang, ngày giờ, chân trang">▤ Header &amp; Footer</button><button type="button" data-a="hf" title="Insert/Slide Number: mở hộp thoại Header and Footer"># Slide Number</button><button type="button" data-a="hf" title="Insert/Date &amp; Time: mở hộp thoại Header and Footer">📅 Date &amp; Time</button><span class="sep"></span>';
  if (has("show")) R += '<button type="button" data-a="show" title="Trình chiếu từ trang đầu (F5)">▶ Trình chiếu</button>';
  R += '<button type="button" data-a="reset">Làm lại</button>' + (opt.extra || []).map(function(x, i){ return '<button type="button" data-x="' + i + '" title="' + esc(x.title || "") + '">' + x.label + "</button>"; }).join("");

  box.classList.add("tc");
  box.innerHTML = '<div class="t">' + (opt.title || "Phần mềm trình chiếu mô phỏng") + "</div>"
    + (opt.doc ? '<div class="dh">📄 <b>' + esc(opt.doc.name) + "</b> (tệp văn bản) – bôi đen phần cần sao chép rồi bấm <button type='button' data-a='copydoc'>Copy (Ctrl+C)</button></div><div class='doc' data-doc>" + opt.doc.html + "</div>" : "")
    + '<div class="rb">' + R + "</div>"
    + (has("hf") ? '<div class="hfd" data-hfd hidden></div>' : "")
    + '<div class="pop" data-gal hidden><b>Insert Picture:</b> chọn một hình để chèn vào trang đang chọn' + GALLERY.map(function(g, i){ return '<img src="' + g.src + '" alt="' + g.n + '" title="' + g.n + '" data-g="' + i + '">'; }).join("") + '<button type="button" data-a="galx">Đóng</button></div>'
    + (has("anim") ? '<div class="pane" data-pane></div>' : "")
    + '<div class="wk"><div class="th" data-th></div><div data-ed></div></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + (opt.advice ? '<div class="adv" data-adv></div>' : "")
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  function say(t, bad){ var m = q("[data-msg]"); m.textContent = t; m.className = "msg" + (bad ? " bad" : ""); }

  /* ---------- Vẽ trang ---------- */
  function imgsHtml(s, back, live){ return s.imgs.map(function(im, i){ if (!!im.back !== back) return "";
    return '<img src="' + GALLERY[im.g].src + '" alt="" ' + (live ? 'data-im="' + i + '" ' : 'data-o="img:' + i + '" ') + 'style="left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + "%;z-index:" + (back ? 1 : 3) + ";" + (im.bd ? "border:0.6cqw solid " + im.bd + ";box-sizing:border-box;" : "") + '">'; }).join(""); }
  function lineHtml(s, i, live){ var L = s.lines[i], F = tf(s, "body"), T = th(s), st = css(F, LV[L.lv]) + "padding-left:" + ((L.lv - 1) * 4.2) + "cqw";
    return '<div class="ln' + (live && sel && i >= sel[0] && i <= sel[1] ? " sel" : "") + '" style="' + st + '"><span class="bu" style="color:' + (L.c || T.ac || F.color) + ';font-style:normal;font-weight:400">' + esc(mark(s.lines, i)) + "</span>"
      + (live ? '<textarea rows="1" data-li="' + i + '" placeholder="' + (i === 0 && s.lines.length === 1 ? "Click to add text" : "") + '" aria-label="Dòng ' + (i + 1) + '" style="font:inherit;color:inherit;text-align:inherit">' + esc(L.t) + "</textarea>" : '<span class="stx" style="flex:1">' + esc(L.t) + "</span>") + "</div>"; }
  function slideHtml(s, live){
    var h = '<div class="sl' + (s.layout === "title" ? " ti" : "") + '" style="' + bgcss(s) + '">' + imgsHtml(s, true, live) + '<div class="tx">';
    var FT = tf(s, "title");
    h += live ? '<textarea rows="1" class="tt" data-tt placeholder="Click to add title" aria-label="Tiêu đề" style="' + css(FT) + '">' + esc(s.title) + "</textarea>" : '<div class="stx" data-o="title" style="' + css(FT) + 'padding:2px 4px">' + esc(s.title) + "</div>";
    if (s.layout === "title") { var FS = tf(s, "sub"); h += live ? '<textarea rows="2" class="sb" data-sb placeholder="Click to add subtitle" aria-label="Phụ đề" style="' + css(FS) + '">' + esc(s.sub) + "</textarea>" : '<div class="stx" data-o="sub" style="' + css(FS) + 'padding:2px 4px">' + esc(s.sub) + "</div>"; }
    if (s.layout === "content") h += '<div class="bd"' + (live ? "" : ' data-o="body"') + ">" + s.lines.map(function(L, i){ return lineHtml(s, i, live); }).join("") + "</div>";
    h += "</div>" + imgsHtml(s, false, live) + footHtml(s);
    if (live && imgSel != null && s.imgs[imgSel]) { var im = s.imgs[imgSel];
      h += '<div class="fr" data-fr style="left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + '%"><i data-h="r" style="right:-6px;top:calc(50% - 5px);cursor:ew-resize"></i><i data-h="b" style="bottom:-6px;left:calc(50% - 5px);cursor:ns-resize"></i><i data-h="br" style="right:-6px;bottom:-6px;cursor:nwse-resize"></i><i data-h="t" style="top:-6px;left:calc(50% - 5px);cursor:ns-resize"></i><i data-h="l" style="left:-6px;top:calc(50% - 5px);cursor:ew-resize"></i></div>'; }
    return h + "</div>"; }
  function footParts(s){ var f = s.hf; if (!f || f.off || !(f.date || f.num || f.foot)) return null;
    return [f.date ? (f.auto ? today() : (f.fixed || "")) : "", f.foot ? (f.ftext || "") : "", f.num ? String(S.indexOf(s) + 1) : ""]; }
  function footHtml(s){ var p = footParts(s); if (!p) return ""; var T = th(s), F = tf(s, "body");
    return '<div class="ft" style="font-family:\'' + F.font + "',sans-serif;font-size:" + (12 * PT).toFixed(3) + "cqw;color:" + T.bc + '"><span>' + esc(p[0]) + "</span><span>" + esc(p[1]) + "</span><span>" + esc(p[2]) + "</span></div>"; }
  function mini(s){ var T = th(s), x = '<span style="position:relative;z-index:2"><b style="color:' + T.tc + '">' + esc(s.title || (s.layout === "title" ? "(Trang tiêu đề)" : "(Chưa có tiêu đề)")) + "</b>";
    if (s.layout === "title") x += "<br>" + esc((s.sub || "").split("\n")[0]); else if (s.lines) x += s.lines.slice(0, 6).map(function(L){ return "<br>" + "&nbsp;".repeat((L.lv - 1) * 3) + "• " + esc(L.t.slice(0, 40)); }).join("");
    return '<span class="mini" style="' + bgcss(s) + "color:" + T.bc + '">' + s.imgs.map(function(im){ return '<img src="' + GALLERY[im.g].src + '" alt="" style="position:absolute;left:' + im.x + "%;top:" + im.y + "%;width:" + im.w + "%;height:" + im.h + "%;z-index:" + (im.back ? 1 : 3) + '">'; }).join("") + x + "</span>" + (footParts(s) ? '<span class="mft">' + footParts(s).map(function(t){ return "<span>" + esc(t) + "</span>"; }).join("") + "</span>" : "") + "</span>"; }
  function thumbs(){ q("[data-th]").innerHTML = S.map(function(s, i){ return '<button type="button" data-s="' + i + '" class="' + (i === cur ? "on" : "") + (ms[i] ? " ms" : "") + '"><span class="n" style="position:relative">' + (i + 1) + ((s.anim && s.anim.length) || s.tr ? '<span class="star" title="Có hiệu ứng">★</span>' : "") + "</span>" + mini(s) + "</button>"; }).join("");
    box.querySelectorAll("[data-s]").forEach(function(b){ b.addEventListener("click", function(ev){ var i = +b.dataset.s;
      if (ev.ctrlKey || ev.metaKey) { if (ms[i]) delete ms[i]; else ms[i] = 1; ms[cur] = 1; say("Đã chọn " + Object.keys(ms).length + " trang (giữ Ctrl để chọn nhiều trang). Mẫu định dạng sẽ áp dụng cho các trang này."); }
      else ms = {};
      cur = i; sel = null; imgSel = null; draw(); }); }); }
  function advice(i){ var s = S[i], T = th(s), bgc = s.bg || T.bg, out = [], FT = tf(s, "title"), FB = tf(s, "body"), FS = tf(s, "sub");
    var boxes = [["tiêu đề", FT, s.title]].concat(s.layout === "title" ? [["phụ đề", FS, s.sub]] : s.layout === "content" ? [["nội dung", FB, (s.lines || []).map(function(L){ return L.t; }).join(" ")]] : []).filter(function(b){ return String(b[2] || "").trim(); });
    boxes.forEach(function(b){ var c = contrast(b[1].color, bgc); out.push({k: "ct-" + b[0], ok: c >= 4.5, t: "Độ tương phản chữ " + b[0] + " với màu nền: " + c.toFixed(1).replace(".", ",") + (c >= 4.5 ? " – dễ đọc" : " – khó đọc, nên ≥ 4,5 (chọn màu chữ tương phản với nền)")}); });
    if (s.layout === "content" && boxes.some(function(b){ return b[0] === "nội dung"; })) {
      out.push({k: "size", ok: FB.size >= 24, t: "Cỡ chữ nội dung " + FB.size + " pt" + (FB.size >= 24 ? " – đủ lớn" : " – quá nhỏ khi chiếu, nên từ 24 pt trở lên")});
      var longL = (s.lines || []).filter(function(L){ return L.t.trim().split(/\s+/).length > 12; }).length;
      out.push({k: "short", ok: !longL, t: longL ? longL + " dòng quá dài (trên 12 từ) – chỉ nêu ý chính, ngắn gọn" : "Các dòng ngắn gọn, chỉ nêu ý chính"}); }
    var fonts = {}, cols = {}; boxes.forEach(function(b){ fonts[b[1].font] = 1; cols[hex(b[1].color)] = 1; }); cols[hex(bgc)] = 1;
    var nf = Object.keys(fonts).length, nc = Object.keys(cols).length;
    out.push({k: "fonts", ok: nf <= 2, t: nf + " phông chữ trên trang" + (nf <= 2 ? "" : " – nên dùng tối đa 2 phông")});
    out.push({k: "cols", ok: nc <= 3, t: nc + " màu (chữ và nền)" + (nc <= 3 ? " – hài hoà" : " – quá nhiều màu, nên dùng ít màu cùng nhóm")});
    return out; }
  function advPanel(){ var el = q("[data-adv]"); if (!el) return; var a = advice(cur);
    el.innerHTML = "<b>Gợi ý của máy cho trang " + (cur + 1) + ":</b>" + a.map(function(x){ return '<span class="' + (x.ok ? "g" : "w") + '">' + (x.ok ? "✓ " : "⚠ ") + esc(x.t) + "</span>"; }).join(""); }
  function check(){ advPanel(); if (opt.check) q("[data-ck]").innerHTML = opt.check({slides: S, log: log, nh: NH, advice: advice}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function fit(el){ el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }
  function focusLine(i, pos){ var el = q('[data-li="' + i + '"]'); if (el) { el.focus(); var p = pos == null ? el.value.length : pos; el.setSelectionRange(p, p); } }
  var paneSel = null;
  function oName(s, o){ if (o === "title") return "Tiêu đề"; if (o === "sub") return "Phụ đề"; if (o === "body") return "Khung nội dung"; return "Hình ảnh " + (+o.split(":")[1] + 1); }
  function curObj(){ return lastBox === "img" && imgSel != null ? "img:" + imgSel : (lastBox === "sub" && S[cur].layout === "title") ? "sub" : (lastBox === "body" && S[cur].layout === "content") ? "body" : "title"; }
  function pane(){ var el = q("[data-pane]"); if (!el) return; var s = S[cur];
    el.innerHTML = '<div class="h">Animation Pane · trang ' + (cur + 1) + '<span>Chuyển trang: ' + (s.tr ? trName(s.tr.e) + " (" + s.tr.d + " giây)" : "None") + "</span></div>"
      + (s.anim.length ? s.anim.map(function(a, i){ return '<div class="r' + (paneSel === i ? " on" : "") + '" data-pi="' + i + '"><b>' + (i + 1) + '.</b><em>★ ' + oName(s, a.o) + " – " + effName(a.e) + " (" + STARTS[a.st] + ", " + a.d + " giây)</em>"
        + '<button type="button" data-pm="up" title="Move Earlier">▲</button><button type="button" data-pm="dn" title="Move Later">▼</button><button type="button" data-pm="x" title="Xoá hiệu ứng">✕</button></div>'; }).join("")
        : '<div style="color:#666">Chưa có hiệu ứng. Nháy chọn một đối tượng trên trang rồi chọn hiệu ứng.</div>');
    el.querySelectorAll("[data-pi]").forEach(function(r){ var i = +r.dataset.pi;
      r.addEventListener("click", function(ev){ var m = ev.target.dataset && ev.target.dataset.pm;
        if (m === "x") { snap(); s.anim.splice(i, 1); paneSel = null; log.push("unanim"); say("Đã xoá hiệu ứng."); }
        else if (m === "up" || m === "dn") { var j = i + (m === "up" ? -1 : 1); if (j < 0 || j >= s.anim.length) return; snap(); var t = s.anim[i]; s.anim[i] = s.anim[j]; s.anim[j] = t; paneSel = j; log.push("reorder"); say("Đã thay đổi thứ tự xuất hiện (Reorder Animation)."); }
        else { paneSel = paneSel === i ? null : i; say(paneSel == null ? "" : "Đã chọn hiệu ứng " + (i + 1) + ". Có thể đổi Start, Duration hoặc thứ tự."); }
        draw(); }); }); }
  function draw(fi, pos){ thumbs(); var s = S[cur]; if (paneSel != null && !s.anim[paneSel]) paneSel = null; pane(); q("[data-ed]").innerHTML = slideHtml(s, true); bind(); check(); box.querySelectorAll(".sl textarea").forEach(fit); if (fi != null) focusLine(fi, pos); }
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
    var keys = Object.keys(ms).map(Number).filter(function(i){ return S[i] && (b !== "body" || S[i].layout === "content") && (b !== "sub" || S[i].layout === "title"); });
    if (keys.length < 2) keys = [cur];
    var curv = tf(s, b); keys.forEach(function(i){ var x = S[i]; x.tf[b] = x.tf[b] || {}; fn(x.tf[b], curv); });
    log.push("font"); say("Đã định dạng " + {title:"tiêu đề", sub:"phụ đề", body:"khung nội dung"}[b] + (keys.length > 1 ? " của " + keys.length + " trang đã chọn (" + keys.map(function(i){ return i + 1; }).join(", ") + ")." : " của trang " + (cur + 1) + ".")); draw(); }

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
  function delPic(){ var s = S[cur]; if (imgSel == null || !s.imgs[imgSel]) { say("Hãy nháy chọn hình ảnh trước.", true); return; } snap(); var gone = imgSel; s.imgs.splice(gone, 1); s.anim = s.anim.filter(function(a){ return a.o !== "img:" + gone; }).map(function(a){ var m = /^img:(\d+)$/.exec(a.o); if (m && +m[1] > gone) a.o = "img:" + (+m[1] - 1); return a; }); imgSel = null; log.push("delpic"); say("Đã xoá hình ảnh."); draw(); }
  function undo(){ if (!hist.length) { say("Không còn thao tác để khôi phục.", true); return; } var o = JSON.parse(hist.pop()); S = o.S; cur = Math.min(o.cur, S.length - 1); imgSel = null; sel = null; log.push("undo"); say("Đã khôi phục lại (Undo)."); draw(); }
  function needImg(){ if (imgSel == null || !S[cur].imgs[imgSel]) { say("Hãy nháy chọn hình ảnh trên trang trước.", true); return false; } return true; }

  /* ---------- Nút lệnh ---------- */
  box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("mousedown", function(ev){ if (b.tagName === "BUTTON") ev.preventDefault(); });
    b.addEventListener("click", function(){ var a = b.dataset.a, s = S[cur];
    if (a === "new") { snap(); S.splice(cur + 1, 0, blank("content")); S[cur + 1].theme = s.theme; if (s.tr) S[cur + 1].tr = {e: s.tr.e, d: s.tr.d}; cur++; sel = null; imgSel = null; ms = {}; log.push("new"); say("Đã thêm trang " + (cur + 1) + " với mẫu bố trí Title and Content. Nháy vào Click to add title để nhập tiêu đề trang."); draw(); return; }
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
    if (a === "show") { show(0); return; }
    if (a === "hf") { openHF(); return; }
    if (a === "preview") { show(cur, true); return; }
    if (a === "trall") { if (!s.tr) { say("Hãy chọn hiệu ứng chuyển trang cho trang này trước.", true); return; } snap(); S.forEach(function(x){ x.tr = {e: s.tr.e, d: s.tr.d}; }); log.push("trall"); say("Đã áp dụng hiệu ứng chuyển trang " + trName(s.tr.e) + " cho tất cả " + S.length + " trang (Apply To All)."); draw(); return; }
    if (a === "reset") { reset(); q("[data-gal]") && (q("[data-gal]").hidden = true); say("Đã làm lại từ đầu."); draw(); }
  }); });
  /* ---------- Hộp thoại Header and Footer ---------- */
  function openHF(){ var f = S[cur].hf || {}; HF = {tab: "slide", date: !!f.date, auto: f.auto !== false, fixed: f.fixed || today(), num: !!f.num, foot: !!f.foot, ftext: f.ftext || "", nt: !!f.nt};
    if (S[cur].hf && S[cur].hf.off) HF.nt = true; drawHF(); var d = q("[data-hfd]"); d.hidden = false; say("Đã mở hộp thoại Header and Footer. Đánh dấu các mục cần hiện rồi bấm Apply (trang đang chọn) hoặc Apply to All (tất cả các trang)."); }
  function drawHF(){ var d = q("[data-hfd]"), h = HF, ck = function(k, v){ return '<input type="checkbox" data-hk="' + k + '"' + (v ? " checked" : "") + ">"; };
    var body = h.tab === "slide"
      ? '<fieldset><legend>Include on slide</legend><label>' + ck("date", h.date) + " <u>D</u>ate and time</label>"
        + '<label class="in"><input type="radio" name="hfa" data-hk="auto"' + (h.auto ? " checked" : "") + (h.date ? "" : " disabled") + '> <u>U</u>pdate automatically</label><div class="in" style="padding-left:40px"><input type="text" value="' + today() + '" disabled></div>'
        + '<label class="in"><input type="radio" name="hfa" data-hk="fix"' + (!h.auto ? " checked" : "") + (h.date ? "" : " disabled") + '> Fi<u>x</u>ed</label><div class="in" style="padding-left:40px"><input type="text" data-hv="fixed" value="' + esc(h.fixed) + '"' + (h.date && !h.auto ? "" : " disabled") + "></div>"
        + "<label>" + ck("num", h.num) + " Slide <u>n</u>umber</label><label>" + ck("foot", h.foot) + " <u>F</u>ooter</label>"
        + '<div class="in"><input type="text" data-hv="ftext" value="' + esc(h.ftext) + '"' + (h.foot ? "" : " disabled") + ' placeholder="Nhập thông tin xuất hiện ở chân trang"></div></fieldset>'
        + "<label>" + ck("nt", h.nt) + " Don't show on title <u>s</u>lide</label>"
      : '<fieldset><legend>Include on page (Notes and Handouts – bản in phát cho người nghe)</legend><label>' + ck("nhdr", NH.hdr) + " <u>H</u>eader</label>"
        + '<div class="in"><input type="text" data-hv="htext" value="' + esc(NH.htext) + '"' + (NH.hdr ? "" : " disabled") + ' placeholder="Nội dung đầu trang"></div>'
        + "<label>" + ck("nnum", NH.num) + " Page number</label><label>" + ck("nfoot", NH.foot) + " <u>F</u>ooter</label>"
        + '<div class="in"><input type="text" data-hv="nftext" value="' + esc(NH.ftext) + '"' + (NH.foot ? "" : " disabled") + "></div></fieldset>";
    var pv = h.tab === "slide" ? '<i style="left:6%;width:22%" class="' + (h.date ? "on" : "") + '"></i><i style="left:34%;width:32%" class="' + (h.foot ? "on" : "") + '"></i><i style="right:6%;width:14%" class="' + (h.num ? "on" : "") + '"></i>'
      : '<i style="left:6%;top:8%;width:40%" class="' + (NH.hdr ? "on" : "") + '"></i><i style="left:6%;width:40%" class="' + (NH.foot ? "on" : "") + '"></i><i style="right:6%;width:14%" class="' + (NH.num ? "on" : "") + '"></i>';
    d.innerHTML = '<div class="hd">Header and Footer<button type="button" data-hb="cancel" aria-label="Đóng" style="border:0;background:none;font-size:16px;cursor:pointer;color:#222">✕</button></div>'
      + '<div class="tabs"><button type="button" data-ht="slide" class="' + (h.tab === "slide" ? "on" : "") + '">Slide</button><button type="button" data-ht="notes" class="' + (h.tab === "notes" ? "on" : "") + '">Notes and Handouts</button></div>'
      + '<div class="bx"><div style="display:grid;gap:6px">' + body + '</div><div><div style="font-size:12px;color:#555">Preview</div><div class="pv">' + pv + "</div></div></div>"
      + '<div class="ft2">' + (h.tab === "slide" ? '<button type="button" data-hb="apply">Apply</button>' : "") + '<button type="button" class="pr" data-hb="all">Apply to All</button><button type="button" data-hb="cancel">Cancel</button></div>'; }
  function applyHF(all){ var h = HF, cfg = {date: h.date, auto: h.auto, fixed: h.fixed, num: h.num, foot: h.foot, ftext: h.ftext, nt: h.nt}; snap();
    var targets = all ? S.map(function(x, i){ return i; }) : [cur];
    targets.forEach(function(i){ var c = clone(cfg); if (h.nt && S[i].layout === "title") c.off = true; S[i].hf = c; });
    log.push(all ? "hfall" : "hf1"); q("[data-hfd]").hidden = true; HF = null;
    say(all ? "Apply to All: đã áp dụng cho tất cả " + S.length + " trang" + (h.nt ? " (trừ trang tiêu đề)." : ".") : "Apply: chỉ áp dụng cho trang " + (cur + 1) + ". Muốn áp dụng cho mọi trang, bấm Apply to All."); draw(); }
  var hfd = q("[data-hfd]");
  if (hfd) { hfd.addEventListener("click", function(ev){ var t = ev.target.closest("[data-ht],[data-hb]"); if (!t || !HF) return;
      if (t.dataset.ht) { HF.tab = t.dataset.ht; drawHF(); return; }
      var b = t.dataset.hb; if (b === "cancel") { hfd.hidden = true; HF = null; say("Đã đóng hộp thoại, không thay đổi gì (Cancel)."); return; }
      if (HF.tab === "notes") { log.push("notes"); hfd.hidden = true; HF = null; say("Đã áp dụng đầu trang, chân trang cho bản in Notes and Handouts" + (NH.hdr && NH.htext ? " (đầu trang: “" + NH.htext + "”)" : "") + ". Ở chế độ Slide không thêm được đầu trang."); check(); return; }
      applyHF(b === "all"); });
    hfd.addEventListener("change", function(ev){ var k = ev.target.dataset.hk; if (!k || !HF) return; var v = ev.target.checked;
      if (k === "auto") HF.auto = true; else if (k === "fix") HF.auto = false; else if (k === "nhdr") NH.hdr = v; else if (k === "nnum") NH.num = v; else if (k === "nfoot") NH.foot = v; else HF[k] = v; drawHF(); });
    hfd.addEventListener("input", function(ev){ var k = ev.target.dataset.hv; if (!k || !HF) return; var v = ev.target.value; if (k === "htext") NH.htext = v; else if (k === "nftext") NH.ftext = v; else HF[k] = v; }); }
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
  /* Trình chiếu: hiệu ứng chuyển trang, hiệu ứng đối tượng theo nhóm (On Click mở nhóm mới; With / After Previous đi cùng nhóm) */
  function groups(s){ var gs = [], g = null, t = 0, last = 0;
    (s.anim || []).forEach(function(a){ if (a.st === "click" || !g) { g = {click: a.st === "click", items: []}; gs.push(g); t = 0; last = 0; }
      var start = a.st === "after" ? last : a.st === "with" ? t : 0; if (a.st !== "with") t = start; g.items.push({a: a, at: start}); last = start + a.d; });
    if (gs.length && gs[0].click === false) gs[0].auto = true; return gs; }
  function show(from, preview){ var i = from || 0, ov = document.createElement("div"), gs = [], gi = 0, timers = [], done = false; ov.className = "tc-show"; ov.tabIndex = 0; document.body.appendChild(ov); log.push(preview ? "preview" : "show");
    function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
    function runGroup(g, extra){ var end = 0; g.items.forEach(function(it){ var el = ov.querySelector('[data-o="' + it.a.o + '"]'); if (!el) return; end = Math.max(end, it.at + it.a.d);
      later(function(){ el.style.visibility = "visible"; if (it.a.e !== "appear") el.style.animation = "tc-" + it.a.e + " " + it.a.d + "s both"; }, (extra + it.at) * 1000); }); return extra + end; }
    function paint(){ timers.forEach(clearTimeout); timers = []; var s = S[i]; gs = groups(s); gi = 0;
      ov.innerHTML = slideHtml(s, false) + '<div class="hint">' + (preview ? "Preview hiệu ứng trang " + (i + 1) : "Trang " + (i + 1) + "/" + S.length + " · nháy chuột, → hoặc Space: tiếp · ←: trang trước · Esc: thoát") + "</div>";
      (s.anim || []).forEach(function(a){ var el = ov.querySelector('[data-o="' + a.o + '"]'); if (el) el.style.visibility = "hidden"; });
      var sl = ov.querySelector(".sl"), td = s.tr ? s.tr.d : 0; if (s.tr) sl.style.animation = "tr-" + s.tr.e + " " + td + "s both";
      if (gs[0] && gs[0].auto) { runGroup(gs[0], td); gi = 1; }
      if (preview) auto(td); }
    function auto(t0){ var t = t0 + (gs[0] && gs[0].auto ? groups(S[i])[0].items.reduce(function(m, it){ return Math.max(m, it.at + it.a.d); }, 0) : 0) + 0.5;
      for (var k = gi; k < gs.length; k++) { (function(g, at){ later(function(){ runGroup(g, 0); }, at * 1000); })(gs[k], t); t += g_end(gs[k]) + 0.5; }
      gi = gs.length; later(close, (t + 0.8) * 1000); }
    function g_end(g){ return g.items.reduce(function(m, it){ return Math.max(m, it.at + it.a.d); }, 0); }
    function next(){ if (preview) return; if (gi < gs.length) { runGroup(gs[gi], 0); gi++; return; } if (i < S.length - 1) { i++; paint(); } else close(); }
    function close(){ if (done) return; done = true; timers.forEach(clearTimeout); document.removeEventListener("keydown", key); ov.remove(); say(preview ? "Đã xem trước hiệu ứng (Preview)." : "Đã kết thúc trình chiếu."); check(); }
    function key(ev){ if (ev.key === "Escape") close(); else if (ev.key === "ArrowRight" || ev.key === " " || ev.key === "PageDown" || ev.key === "Enter") { ev.preventDefault(); next(); }
      else if (ev.key === "ArrowLeft" || ev.key === "PageUp") { ev.preventDefault(); if (!preview && i > 0) { i--; paint(); } } }
    ov.addEventListener("click", function(){ if (preview) close(); else next(); });
    document.addEventListener("keydown", key); paint(); ov.focus(); }
  function needAnimSel(){ var s = S[cur]; if (paneSel != null && s.anim[paneSel]) return s.anim[paneSel]; var o = curObj(); for (var i = 0; i < s.anim.length; i++) if (s.anim[i].o === o) return s.anim[i];
    say("Hãy chọn một hiệu ứng trong Animation Pane (hoặc nháy vào đối tượng đã có hiệu ứng) trước.", true); return null; }
  var effSel = q("[data-eff]"); if (effSel) effSel.addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var s = S[cur], o = curObj();
    if (o === "body" && s.layout !== "content") o = "title";
    snap(); var a = null; for (var i = 0; i < s.anim.length; i++) if (s.anim[i].o === o) a = s.anim[i];
    if (v === "none") { s.anim = s.anim.filter(function(x){ return x.o !== o; }); log.push("unanim"); say("Đã bỏ hiệu ứng của " + oName(s, o) + "."); draw(); return; }
    if (a) a.e = v; else { a = {o: o, e: v, st: "click", d: 1}; s.anim.push(a); } paneSel = s.anim.indexOf(a); log.push("anim");
    say("Đã tạo hiệu ứng " + effName(v) + " cho " + oName(s, o) + " (thứ tự " + (paneSel + 1) + "). Bấm Preview để xem trước."); draw(); });
  var stSel = q("[data-start]"); if (stSel) stSel.addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var a = needAnimSel(); if (!a) return; snap(); a.st = v; log.push("timing"); say("Đã chọn cách xuất hiện: " + STARTS[v] + "."); draw(); });
  var duSel = q("[data-dur]"); if (duSel) duSel.addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var a = needAnimSel(); if (!a) return; snap(); a.d = +v; log.push("timing"); say("Đã đặt thời lượng hiệu ứng " + v + " giây."); draw(); });
  var trSel = q("[data-tr]"); if (trSel) trSel.addEventListener("change", function(){ var v = this.value; this.value = "-"; if (v === "-") return; var s = S[cur]; snap();
    if (v) s.tr = {e: v, d: s.tr ? s.tr.d : 1}; else delete s.tr; log.push("trans"); say(v ? "Đã tạo hiệu ứng chuyển trang " + trName(v) + " cho trang " + (cur + 1) + ". Bấm Apply To All để dùng thống nhất cho tất cả các trang." : "Đã bỏ hiệu ứng chuyển trang."); draw(); });
  var trd = q("[data-trd]"); if (trd) trd.addEventListener("change", function(){ var v = this.value; this.value = ""; if (!v) return; var s = S[cur]; if (!s.tr) { say("Trang này chưa có hiệu ứng chuyển trang.", true); return; } snap(); s.tr.d = +v; log.push("trans"); draw(); });
  var api = {slides: function(){ return S; }, cur: function(){ return cur; }, say: say, redraw: function(){ draw(); }};
  box.querySelectorAll("[data-x]").forEach(function(b){ b.addEventListener("click", function(){ opt.extra[+b.dataset.x].run(api); draw(); }); });
  draw();
  return api;
};
window.TrinhChieu.THEMES = THEMES;
window.TrinhChieu.contrast = contrast;
})();
