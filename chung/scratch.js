/* MÔ PHỎNG SCRATCH 3.0 (giao diện tiếng Việt) – Tin 8 Bài 12, 13, 14,…
   Scratch(box, tuỳ chọn)
   - Khối lệnh: Sự kiện (Khi bấm vào cờ / Khi bấm vào nhân vật này), Chuyển động (di chuyển, xoay ↺ / ↻),
     Điều khiển (lặp lại, đợi, lặp lại cho đến khi ⟨khoảng cách đến … < …⟩), Bút vẽ (xoá tất cả, đặt bút, nhấc bút, chọn bút màu).
   - Bấm một khối ở bảng lệnh để thêm vào vị trí đang chọn (dấu ▸); bấm số trên khối để sửa; ↑ ↓ ✕ để sắp xếp, xoá.
   - Nhiều nhân vật (＋ Thêm nhân vật); sân khấu 480×360 như Scratch; chạy chậm (tô sáng lệnh đang chạy); dừng.
   - Sơ đồ khối tự vẽ theo chương trình của nhân vật đang chọn (Lần lặp ← 1, Lần lặp ≤ n,…).
   Tuỳ chọn: title, note, sprites:[{id, name, icon, x, y, dir, color, hat, body, fixed}], scene ("xe": xe và hòn đá), blocks (danh sách khối được dùng),
             add (cho thêm nhân vật), flow (hiện sơ đồ khối), slow (chạy chậm mặc định), save (tên tệp .sb3), check(x)
   x = {sprites:[{id, name, hat, body}], runs:[{id, hat, segs:[[x1,y1,x2,y2,màu]], end:{x,y,dir}, dist}], log:[…]}
   Scratch.shape(segs) → {n, len, equal, closed} để kiểm tra hình vẽ được. */
(function(){
"use strict";
var C = {ev:"#ffbf00", mo:"#4c97ff", ct:"#ffab19", pen:"#0fbd8c", se:"#5cb1d6"};
var CSS = ".scx{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;min-width:0}"
 + ".scx .t{font-weight:700}.scx .note{font-size:13px;opacity:.85}.scx .msg{font-size:13.5px;min-height:1.2em}"
 + ".scx .top{display:flex;flex-wrap:wrap;gap:6px;align-items:center;background:#e9effa;border:1px solid #c7d3ea;border-radius:8px;padding:5px;color:#222}"
 + ".scx .top button,.scx .top select,.scx .top input{font:inherit;font-size:13px;border:1px solid #b9c4da;background:#fff;color:#222;border-radius:6px;padding:3px 8px;cursor:pointer}"
 + ".scx .top .go{background:#4cbf56;border-color:#3a9e43;color:#fff;font-weight:700}.scx .top .stop{background:#ec5959;border-color:#c94040;color:#fff;font-weight:700}"
 + ".scx .wk{display:grid;grid-template-columns:minmax(150px,190px) minmax(0,1fr) minmax(0,1fr);gap:8px;min-width:0}"
 + "@media (max-width:900px){.scx .wk{grid-template-columns:minmax(140px,170px) minmax(0,1fr)}.scx .stg{grid-column:1 / -1}}"
 + "@media (max-width:560px){.scx .wk{grid-template-columns:1fr}.scx .pal{max-height:230px}}"
 + ".scx .pal{display:grid;gap:4px;align-content:start;background:#f7f8fb;border:1px solid #dde2ec;border-radius:8px;padding:6px;max-height:440px;overflow:auto}"
 + ".scx .pal h5{margin:4px 0 0;font-size:12px;color:#555}"
 + ".scx .code{background:#f9f9f9;background-image:radial-gradient(#d9dde6 1px,transparent 1px);background-size:14px 14px;border:1px solid #dde2ec;border-radius:8px;padding:8px;min-height:220px;overflow:auto;color:#fff}"
 + ".scx .b{display:inline-flex;flex-wrap:wrap;align-items:center;gap:5px;font:600 13px/1.2 'Be Vietnam Pro',sans-serif;color:#fff;border-radius:6px;padding:6px 9px;margin:1px 0;cursor:pointer;border:1px solid rgba(0,0,0,.15);user-select:none;text-align:left}"
 + ".scx .pal .b{width:100%;box-sizing:border-box}.scx .pal .b:hover{filter:brightness(1.08)}"
 + ".scx .b input,.scx .b select{font:600 12.5px sans-serif;width:3.2em;border:0;border-radius:10px;padding:2px 4px;text-align:center;color:#333;background:#fff}"
 + ".scx .b select{width:auto}.scx .b .cond{background:" + C.se + ";border-radius:12px;padding:3px 8px;display:inline-flex;gap:4px;align-items:center}"
 + ".scx .hat{border-radius:16px 16px 6px 6px;padding-top:9px}"
 + ".scx .cw{display:block;margin:1px 0}.scx .cw>.b{border-radius:6px 6px 0 0;display:flex}"
 + ".scx .in{border-left:14px solid;min-height:20px;padding:2px 0 2px 6px}.scx .ce{height:14px;border-radius:0 0 6px 6px;width:100px}"
 + ".scx .row{display:flex;align-items:center;gap:4px}.scx .row>.b{display:inline-flex}"
 + ".scx .sel{outline:3px solid #222;outline-offset:1px}.scx .run{box-shadow:0 0 0 3px #ffe066,0 0 10px #ffe066}"
 + ".scx .ins{display:block;height:6px;margin:2px 0;border-radius:3px;cursor:pointer;background:transparent}.scx .ins:hover{background:rgba(0,0,0,.15)}.scx .ins.on{background:#222;height:5px}"
 + ".scx .tools{display:inline-flex;gap:2px;margin-left:4px}.scx .tools button{font:12px sans-serif;border:1px solid #bbb;background:#fff;color:#222;border-radius:4px;padding:1px 5px;cursor:pointer}"
 + ".scx .stg{display:grid;gap:6px;align-content:start;min-width:0}"
 + ".scx canvas{width:100%;height:auto;aspect-ratio:4/3;background:#fff;border:1px solid #c7d3ea;border-radius:6px;display:block;touch-action:manipulation}"
 + ".scx .spr{display:flex;flex-wrap:wrap;gap:6px}.scx .spr button{font:inherit;font-size:12.5px;border:2px solid #c7d3ea;background:#fff;color:#222;border-radius:8px;padding:3px 8px;cursor:pointer}.scx .spr button.on{border-color:#4c97ff;background:#e9f1ff}"
 + ".scx .flow{background:#fff;border:1px solid #dde2ec;border-radius:8px;padding:4px;overflow:auto;max-height:520px}.scx .flow svg{display:block;margin:auto}"
 + ".scx .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.scx .ck li::before{content:'☐ '}.scx .ck li.ok::before{content:'☑ ';color:#1c7c54}.scx .ck li.ok{color:#1c7c54;font-weight:600}"
 + ".scx .lib{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px;background:#fff;border:1px solid #c7d3ea;border-radius:8px;padding:6px;color:#222}.scx .lib button{font-size:20px;border:1px solid #ccc;background:#fff;border-radius:8px;padding:2px 8px;cursor:pointer}";
function addCss(){ var s = document.getElementById("scratch-css"); if (!s) { s = document.createElement("style"); s.id = "scratch-css"; document.head.appendChild(s); } s.textContent = CSS; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
var PENC = [["#8e2c8e","tím"],["#e74c3c","đỏ"],["#2e86de","xanh dương"],["#27ae60","xanh lá"],["#f39c12","cam"],["#222222","đen"]];
var LIB = [{icon:"✏️", name:"Bút chì"},{icon:"🐱", name:"Mèo"},{icon:"⭐", name:"Ngôi sao"},{icon:"🦋", name:"Bướm"}];
var DEF = {move:{op:"move", n:10}, turnL:{op:"turnL", n:15}, turnR:{op:"turnR", n:15}, repeat:{op:"repeat", n:10, body:[]}, wait:{op:"wait", n:1},
  until:{op:"until", n:120, body:[]}, clear:{op:"clear"}, down:{op:"down"}, up:{op:"up"}, color:{op:"color", c:"#8e2c8e"}};
var ALLB = ["move","turnL","turnR","repeat","wait","until","clear","down","up","color"];
function isC(op){ return op === "repeat" || op === "until"; }
function col(op){ return /move|turn/.test(op) ? C.mo : /repeat|wait|until/.test(op) ? C.ct : C.pen; }
function label(b, live, target){
  var num = function(k){ return live ? '<input type="number" data-k="' + k + '" value="' + b[k] + '" aria-label="số">' : '<input type="number" value="' + b[k] + '" tabindex="-1" readonly>'; };
  switch (b.op) {
    case "move": return "di chuyển " + num("n") + " bước";
    case "turnL": return "xoay ↺ " + num("n") + " độ";
    case "turnR": return "xoay ↻ " + num("n") + " độ";
    case "repeat": return "lặp lại " + num("n");
    case "wait": return "đợi " + num("n") + " giây";
    case "until": return 'lặp lại cho đến khi <span class="cond">khoảng cách đến ' + esc(target || "Hòn đá") + " &lt; " + num("n") + "</span>";
    case "clear": return "🖊 xoá tất cả";
    case "down": return "🖊 đặt bút";
    case "up": return "🖊 nhấc bút";
    case "color": return "🖊 chọn bút màu " + (live ? '<select data-c aria-label="màu bút">' + PENC.map(function(p){ return '<option value="' + p[0] + '"' + (p[0] === b.c ? " selected" : "") + ">● " + p[1] + "</option>"; }).join("") + "</select>" : '<span style="color:' + b.c + ';font-size:16px">●</span>');
  }
  return b.op;
}
var FLAG = '<svg viewBox="0 0 16 16" width="16" height="16" style="vertical-align:-3px" aria-label="lá cờ xanh"><path d="M3 1v14" stroke="#3a7d22" stroke-width="1.6"/><path d="M3.8 2.2c2.6-1.2 4.4 1.3 7.6.2v6.2c-3.2 1.1-5-1.4-7.6-.2z" fill="#4cbf56" stroke="#3a7d22" stroke-width=".8"/></svg>';
function rad(d){ return d * Math.PI / 180; }
window.Scratch = function(box, opt){
  addCss(); opt = opt || {};
  var blocks = opt.blocks || ALLB, scene = opt.scene || "", log = [], runs = [], running = false, stopFlag = false;
  var SP, cur, ins, selB, pen, slow = !!opt.slow;
  var q = function(s){ return box.querySelector(s); };
  function reset(){ SP = clone(opt.sprites || [{id:"bo", name:"Bọ rùa", icon:"🐞", x:0, y:0, dir:90, hat:"flag", body:[]}]).map(function(s){ s.x0 = s.x || 0; s.y0 = s.y || 0; s.d0 = s.dir == null ? 90 : s.dir; s.hat = s.hat || "flag"; s.body = s.body || []; s.pc = "#8e2c8e"; s.pd = false; return s; });
    if (scene === "xe") SP.push({id:"da", name:"Hòn đá", icon:"🪨", x0:170, y0:-40, d0:90, hat:"none", body:[], fixed:true});
    SP.forEach(home); cur = 0; ins = {arr: SP[0].body, i: SP[0].body.length}; selB = null; pen = []; runs = []; log = []; }
  function home(s){ s.x = s.x0; s.y = s.y0; s.dir = s.d0; s.pd = false; }
  box.classList.add("scx");
  box.innerHTML = '<div class="t">' + (opt.title || "Scratch mô phỏng") + "</div>"
    + '<div class="top"><button type="button" class="go" data-a="go" title="Bấm vào lá cờ xanh để chạy">' + FLAG + ' Chạy</button><button type="button" class="stop" data-a="stop" title="Dừng">⏹ Dừng</button>'
    + '<label style="font-size:13px"><input type="checkbox" data-slow' + (slow ? " checked" : "") + '> Chạy chậm (tô sáng lệnh đang chạy)</label>'
    + '<button type="button" data-a="home" title="Đưa nhân vật về vị trí ban đầu, xoá nét vẽ">↺ Về vị trí đầu</button>'
    + (opt.flow ? '<label style="font-size:13px"><input type="checkbox" data-flow checked> Sơ đồ khối</label>' : "")
    + (opt.save ? '<button type="button" data-a="save" title="Tệp → Lưu về máy tính">💾 Lưu ' + esc(opt.save) + "</button>" : "")
    + '<button type="button" data-a="reset">Làm lại từ đầu</button></div>'
    + '<div class="wk"><div class="pal" data-pal></div><div class="code" data-code aria-label="Vùng chương trình"></div>'
    + '<div class="stg"><canvas width="480" height="360" data-cv aria-label="Sân khấu"></canvas><div class="spr" data-spr></div><div class="lib" data-lib hidden></div>' + (opt.flow ? '<div class="flow" data-fl></div>' : "") + "</div></div>"
    + '<div class="msg" data-msg aria-live="polite"></div>' + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + '<div class="note">' + (opt.note || "") + "</div>";
  var cv = q("[data-cv]"), g = cv.getContext("2d");
  function say(t){ q("[data-msg]").textContent = t; }
  function sp(){ return SP[cur]; }
  /* ---------- Bảng lệnh ---------- */
  function palette(){
    var groups = [["Sự kiện", []], ["Chuyển động", ["move","turnL","turnR"]], ["Điều khiển", ["repeat","wait","until"]], ["Bút vẽ", ["clear","down","up","color"]]];
    var h = '<h5>Sự kiện</h5><div class="b hat" data-hat="flag" style="background:' + C.ev + '">Khi bấm vào ' + FLAG + '</div>'
      + (SP.length > 1 || opt.add ? '<div class="b hat" data-hat="click" style="background:' + C.ev + '">Khi bấm vào nhân vật này</div>' : "");
    groups.slice(1).forEach(function(gp){ var list = gp[1].filter(function(o){ return blocks.indexOf(o) >= 0; }); if (!list.length) return;
      h += "<h5>" + gp[0] + "</h5>" + list.map(function(o){ return '<div class="b" data-add="' + o + '" style="background:' + col(o) + '" role="button" tabindex="0">' + label(DEF[o], false, "Hòn đá") + "</div>"; }).join(""); });
    q("[data-pal]").innerHTML = h + '<div style="font-size:11.5px;color:#666;margin-top:4px">Bấm một khối để thêm vào vị trí ▸ đang chọn trong chương trình.</div>'; }
  /* ---------- Vùng chương trình ---------- */
  function blocksHtml(arr, depth){
    var h = '<span class="ins' + (ins.arr === arr && ins.i === 0 ? " on" : "") + '" data-ins="' + key(arr) + ':0" title="Chèn vào đây"></span>';
    arr.forEach(function(b, i){ var id = key(arr) + ":" + i, c = col(b.op), tl = selB === b ? '<span class="tools"><button type="button" data-mv="-1">↑</button><button type="button" data-mv="1">↓</button><button type="button" data-del>✕</button></span>' : "";
      if (isC(b.op)) h += '<div class="cw" data-bid="' + id + '"><div class="b' + (selB === b ? " sel" : "") + '" data-sb="' + id + '" style="background:' + c + '">' + label(b, true, "Hòn đá") + tl + '</div><div class="in" style="border-color:' + c + '">' + blocksHtml(b.body, depth + 1) + '</div><div class="ce" style="background:' + c + '"></div></div>';
      else h += '<div class="row" data-bid="' + id + '"><div class="b' + (selB === b ? " sel" : "") + '" data-sb="' + id + '" style="background:' + c + '">' + label(b, true) + tl + "</div></div>";
      h += '<span class="ins' + (ins.arr === arr && ins.i === i + 1 ? " on" : "") + '" data-ins="' + key(arr) + ":" + (i + 1) + '" title="Chèn vào đây"></span>'; });
    return h; }
  var KEYS, KA;
  function key(arr){ var i = KA.indexOf(arr); if (i < 0) { KA.push(arr); i = KA.length - 1; } return i; }
  function find(id){ var p = String(id).split(":"); return {arr: KA[+p[0]], i: +p[1]}; }
  function code(){ KA = []; var s = sp();
    if (s.fixed) { q("[data-code]").innerHTML = '<p style="color:#555">' + esc(s.name) + " không có chương trình.</p>"; return; }
    q("[data-code]").innerHTML = '<div class="b hat" style="background:' + C.ev + '">' + (s.hat === "click" ? "Khi bấm vào nhân vật này" : "Khi bấm vào " + FLAG) + "</div>" + '<div style="padding-left:2px">' + blocksHtml(s.body, 0) + "</div>"; }
  /* ---------- Sân khấu ---------- */
  function stage(){ g.clearRect(0, 0, 480, 360);
    if (scene === "xe") { g.fillStyle = "#e8f6ff"; g.fillRect(0, 0, 480, 360); g.fillStyle = "#9bd27a"; g.fillRect(0, 215, 480, 145); g.fillStyle = "#777"; g.fillRect(0, 225, 480, 40); g.strokeStyle = "#fff"; g.setLineDash([18, 14]); g.lineWidth = 3; g.beginPath(); g.moveTo(0, 245); g.lineTo(480, 245); g.stroke(); g.setLineDash([]); }
    g.lineCap = "round"; g.lineWidth = 3;
    pen.forEach(function(p){ g.strokeStyle = p[4]; g.beginPath(); g.moveTo(240 + p[0], 180 - p[1]); g.lineTo(240 + p[2], 180 - p[3]); g.stroke(); });
    SP.forEach(function(s, i){ g.save(); g.translate(240 + s.x, 180 - s.y); if (!s.fixed && s.icon !== "🚌") g.rotate(rad(s.dir - 90)); g.font = (s.icon === "🚌" || s.icon === "🪨" ? 40 : 30) + "px 'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(s.icon, 0, 0); g.restore();
      if (i === cur && !s.fixed && SP.length > 1) { g.strokeStyle = "rgba(76,151,255,.6)"; g.lineWidth = 1.5; g.strokeRect(240 + s.x - 20, 180 - s.y - 20, 40, 40); g.lineWidth = 3; } });
    if (scene === "xe") { var car = SP[0], rock = SP[SP.length - 1], d = dist(car, rock); g.fillStyle = "#333"; g.font = "13px sans-serif"; g.textAlign = "left"; g.fillText("Khoảng cách đến Hòn đá: " + Math.round(d) + " bước", 8, 18); } }
  function dist(a, b){ return Math.hypot(a.x - b.x, a.y - b.y); }
  function sprites(){ q("[data-spr]").innerHTML = SP.map(function(s, i){ return '<button type="button" data-sp="' + i + '" class="' + (i === cur ? "on" : "") + '">' + s.icon + " " + esc(s.name) + "</button>"; }).join("") + (opt.add ? '<button type="button" data-a="addsp">＋ Thêm nhân vật</button>' : ""); }
  /* ---------- Sơ đồ khối ---------- */
  function flowSvg(s){
    var W = 370, cx = 175, y = 12, parts = [], edges = [];
    function txt(b){ return b.op === "move" ? "Di chuyển " + b.n + " bước" : b.op === "turnL" ? "Quay trái " + b.n + " độ" : b.op === "turnR" ? "Quay phải " + b.n + " độ" : b.op === "wait" ? "Đợi " + b.n + " giây" : b.op === "clear" ? "Xoá tất cả" : b.op === "down" ? "Đặt bút" : b.op === "up" ? "Nhấc bút" : b.op === "color" ? "Chọn bút màu" : b.op; }
    function node(kind, t, h){ var n = {kind: kind, t: t, y: y, h: h || 26}; n.m = n.y + n.h / 2; parts.push(n); y += n.h + 20; return n; }
    function line(pts, lab, lx, ly){ edges.push('<polyline fill="none" points="' + pts.map(function(p){ return p.join(","); }).join(" ") + '" marker-end="url(#fa)"/>' + (lab ? '<text x="' + lx + '" y="' + ly + '" class="lb">' + lab + "</text>" : "")); }
    function connect(pend, t){ pend.forEach(function(p){
      if (p.down) line([[cx, p.down.y + p.down.h], [cx, t.y]], p.lab, cx + 5, p.down.y + p.down.h + 12);
      else { var xr = cx + 125 + p.off; line([[cx + 84, p.exit.m], [xr, p.exit.m], [xr, t.y - 9], [cx, t.y - 9]], p.lab, cx + 88, p.exit.m - 4); } }); }
    function back(pend, d, off){ var xl = cx - 125 - off; pend.forEach(function(p){ var from = p.down || p.exit; line([[cx - (from.kind === "dec" ? 84 : 112), from.m], [xl, from.m], [xl, d.y - 9], [cx, d.y - 9]]); }); }
    function seq(arr, depth, pend){ arr.forEach(function(b){ var off = Math.max(0, 30 - depth * 10);
        if (b.op === "repeat") { var v = "Lần lặp" + (depth ? " " + (depth + 1) : ""), a = node("proc", v + " ← 1"); connect(pend, a);
          var d = node("dec", v + " ≤ " + b.n, 40); connect([{down: a}], d);
          var p2 = seq(b.body, depth + 1, [{down: d, lab: "Đúng"}]), inc = node("proc", "Tăng " + v + " lên 1 đơn vị"); connect(p2, inc);
          back([{down: inc}], d, off); pend = [{exit: d, lab: "Sai", off: off}]; }
        else if (b.op === "until") { var d2 = node("dec", "Cách hòn đá < " + b.n + " bước?", 40); connect(pend, d2);
          var p3 = seq(b.body, depth + 1, [{down: d2, lab: "Sai"}]); if (b.body.length) back(p3, d2, off); pend = [{exit: d2, lab: "Đúng", off: off}]; }
        else { var n = node("proc", txt(b)); connect(pend, n); pend = [{down: n}]; } }); return pend; }
    var st = node("term", "Bắt đầu"), pend = seq(s.body, 0, [{down: st}]), end = node("term", "Kết thúc"); connect(pend, end);
    var shapes = parts.map(function(n){ var t = '<text x="' + cx + '" y="' + (n.m + 4) + '" text-anchor="middle">' + esc(n.t) + "</text>";
      if (n.kind === "term") return '<ellipse cx="' + cx + '" cy="' + n.m + '" rx="56" ry="' + n.h / 2 + '" fill="#d7f0e0" stroke="#3a8f5c"/>' + t;
      if (n.kind === "dec") return '<polygon points="' + cx + "," + n.y + " " + (cx + 84) + "," + n.m + " " + cx + "," + (n.y + n.h) + " " + (cx - 84) + "," + n.m + '" fill="#d6ecfa" stroke="#3a7fbf"/>' + t;
      return '<rect x="' + (cx - 112) + '" y="' + n.y + '" width="224" height="' + n.h + '" rx="3" fill="#e4f4d8" stroke="#6a9f3a"/>' + t; }).join("");
    return '<svg viewBox="0 0 ' + W + " " + (y - 6) + '" width="' + W + '" style="max-width:100%;font:11.5px sans-serif" role="img" aria-label="Sơ đồ khối"><defs><marker id="fa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L8,4L0,8z" fill="#555"/></marker></defs><style>polyline{stroke:#555;stroke-width:1.2}.lb{font-size:10.5px;fill:#333}</style>' + edges.join("") + shapes + "</svg>"; }
  function flow(){ var el = q("[data-fl]"); if (!el) return; var on = q("[data-flow]").checked, s = sp(); el.hidden = !on || s.fixed; if (on && !s.fixed) el.innerHTML = '<div style="font-size:12px;color:#555;padding:2px 4px">Sơ đồ khối của chương trình (' + esc(s.name) + ")</div>" + flowSvg(s); }
  function check(){ if (opt.check) q("[data-ck]").innerHTML = opt.check(info()).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function info(){ return {sprites: SP.filter(function(s){ return !s.fixed; }).map(function(s){ return {id: s.id, name: s.name, hat: s.hat, body: clone(s.body)}; }), runs: runs, log: log}; }
  function draw(){ palette(); code(); sprites(); stage(); flow(); check(); }
  /* ---------- Chạy chương trình ---------- */
  function sleep(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
  function frame(){ return new Promise(function(r){ setTimeout(r, 16); }); }
  async function exec(s, arr, rec){
    for (var i = 0; i < arr.length; i++) { if (stopFlag) return; var b = arr[i];
      var el = s === sp() ? q('[data-sb="' + b._id + '"]') : null; if (slow && el) el.classList.add("run");
      if (b.op === "move") { var n = +b.n || 0, x0 = s.x, y0 = s.y, x1 = s.x + n * Math.sin(rad(s.dir)), y1 = s.y + n * Math.cos(rad(s.dir));
        if (slow) { var st = 12; for (var k = 1; k <= st && !stopFlag; k++) { s.x = x0 + (x1 - x0) * k / st; s.y = y0 + (y1 - y0) * k / st; if (s.pd) { pen.push([x0 + (x1 - x0) * (k - 1) / st, y0 + (y1 - y0) * (k - 1) / st, s.x, s.y, s.pc]); } stage(); await sleep(25); } }
        else { s.x = x1; s.y = y1; if (s.pd) pen.push([x0, y0, x1, y1, s.pc]); }
        if (s.pd) rec.segs.push([x0, y0, x1, y1, s.pc]); }
      else if (b.op === "turnL") s.dir -= +b.n || 0;
      else if (b.op === "turnR") s.dir += +b.n || 0;
      else if (b.op === "wait") { stage(); rec.waits++; await sleep(Math.min(3, +b.n || 0) * 1000); }
      else if (b.op === "clear") { pen = []; rec.segs = []; }
      else if (b.op === "down") { s.pd = true; if (!rec.segs.length) rec.segs = []; }
      else if (b.op === "up") s.pd = false;
      else if (b.op === "color") s.pc = b.c;
      else if (b.op === "repeat") { for (var r = 0; r < Math.min(200, +b.n || 0) && !stopFlag; r++) { await exec(s, b.body, rec); stage(); await frame(); } }
      else if (b.op === "until") { var tgt = SP[SP.length - 1], guard = 0; while (!stopFlag && dist(s, tgt) >= (+b.n || 0) && guard++ < 1000) { await exec(s, b.body, rec); stage(); await frame(); } }
      if (slow) { stage(); await sleep(260); }
      if (el) el.classList.remove("run"); } }
  function ids(){ KA.forEach(function(arr, ai){ arr.forEach(function(b, i){ b._id = ai + ":" + i; }); }); }
  async function run(hat, only){
    if (running) { say("Chương trình đang chạy…"); return; } running = true; stopFlag = false; ids();
    var list = SP.filter(function(s){ return !s.fixed && (only ? s === only : s.hat === hat); });
    if (!list.length) { running = false; say(hat === "flag" ? "Chưa có nhân vật nào có chương trình bắt đầu bằng “Khi bấm vào lá cờ xanh”." : ""); return; }
    log.push("run:" + hat); say("Đang chạy…");
    await Promise.all(list.map(async function(s){ var rec = {id: s.id, hat: hat, segs: [], waits: 0}; await exec(s, s.body, rec); rec.end = {x: s.x, y: s.y, dir: s.dir};
      if (scene === "xe") rec.dist = dist(s, SP[SP.length - 1]); runs.push(rec); }));
    running = false; stage(); var last = runs[runs.length - 1];
    say(stopFlag ? "Đã dừng." : "Chạy xong." + (last && last.segs.length ? " Nhân vật đã vẽ " + last.segs.length + " đoạn thẳng." : "") + (scene === "xe" && last ? " Xe dừng lại khi cách hòn đá " + Math.round(last.dist) + " bước." : ""));
    box.querySelectorAll(".run").forEach(function(e){ e.classList.remove("run"); }); check(); }
  /* ---------- Sự kiện ---------- */
  box.addEventListener("click", function(ev){
    var t;
    if ((t = ev.target.closest("[data-add]"))) { if (sp().fixed) { say("Hòn đá không có chương trình. Chọn nhân vật khác."); return; } var b = clone(DEF[t.dataset.add]); ins.arr.splice(ins.i, 0, b); selB = b; ins = isC(b.op) ? {arr: b.body, i: 0} : {arr: ins.arr, i: ins.i + 1}; log.push("add:" + b.op); say(isC(b.op) ? "Đã thêm khối “" + t.textContent.trim() + "”. Các khối thêm tiếp sẽ nằm bên trong khối này (dấu ▸ đen)." : "Đã thêm khối."); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-hat]"))) { var s = sp(); if (s.fixed) return; s.hat = t.dataset.hat; log.push("hat:" + s.hat); say("Đã đổi khối bắt đầu của " + s.name + "."); code(); check(); return; }
    if ((t = ev.target.closest("[data-ins]"))) { var f = find(t.dataset.ins); ins = f; selB = null; code(); return; }
    if ((t = ev.target.closest("[data-mv]"))) { var p = locate(selB); if (!p) return; var j = p.i + +t.dataset.mv; if (j < 0 || j >= p.arr.length) return; p.arr.splice(p.i, 1); p.arr.splice(j, 0, selB); log.push("move"); code(); flow(); check(); return; }
    if (ev.target.closest("[data-del]")) { var p2 = locate(selB); if (!p2) return; p2.arr.splice(p2.i, 1); ins = {arr: p2.arr, i: p2.i}; selB = null; log.push("del"); say("Đã xoá khối."); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-sb]")) && !ev.target.closest("input,select")) { var f2 = find(t.dataset.sb), b2 = f2.arr[f2.i]; selB = selB === b2 ? null : b2; ins = isC(b2.op) ? {arr: b2.body, i: b2.body.length} : {arr: f2.arr, i: f2.i + 1}; code(); return; }
    if ((t = ev.target.closest("[data-sp]"))) { cur = +t.dataset.sp; selB = null; ins = {arr: sp().body, i: sp().body.length}; draw(); return; }
    if ((t = ev.target.closest("[data-lb]"))) { var L = LIB[+t.dataset.lb], n = {id: "s" + SP.length, name: L.name, icon: L.icon, x0: -120, y0: 60, d0: 90, hat: "click", body: [], pc: "#2e86de"}; home(n);
      var at = scene === "xe" ? SP.length - 1 : SP.length; SP.splice(at, 0, n); cur = at; ins = {arr: n.body, i: 0}; selB = null; q("[data-lib]").hidden = true; log.push("addsp"); say("Đã thêm nhân vật " + L.name + ". Khối bắt đầu là “Khi bấm vào nhân vật này”: viết chương trình rồi nháy vào nhân vật trên sân khấu để chạy."); draw(); return; }
    if (!(t = ev.target.closest("[data-a]"))) return; var a = t.dataset.a;
    if (a === "go") run("flag");
    else if (a === "stop") { stopFlag = true; }
    else if (a === "home") { if (running) return; SP.forEach(home); pen = []; log.push("home"); say("Đã đưa nhân vật về vị trí ban đầu, xoá nét vẽ."); stage(); }
    else if (a === "reset") { stopFlag = true; running = false; reset(); say("Đã làm lại từ đầu."); draw(); }
    else if (a === "addsp") { var lb = q("[data-lib]"); lb.innerHTML = "Chọn nhân vật: " + LIB.map(function(L, i){ return '<button type="button" data-lb="' + i + '" title="' + L.name + '">' + L.icon + "</button>"; }).join(""); lb.hidden = !lb.hidden; }
    else if (a === "save") { log.push("save"); say("Đã lưu tệp " + opt.save + " (mô phỏng: Tệp → Lưu về máy tính)."); check(); }
  });
  function locate(b){ var r = null; (function walk(arr){ arr.forEach(function(x, i){ if (x === b) r = {arr: arr, i: i}; if (x.body) walk(x.body); }); })(sp().body); return r; }
  box.addEventListener("input", function(ev){ var t = ev.target, h = t.closest("[data-sb]"); if (!h) return; var f = find(h.dataset.sb), b = f.arr[f.i];
    if (t.dataset.k) b[t.dataset.k] = t.value === "" ? 0 : +t.value; else if (t.dataset.c != null) b.c = t.value; log.push("edit"); flow(); check(); });
  box.addEventListener("change", function(ev){ if (ev.target.dataset.slow != null) slow = ev.target.checked; if (ev.target.dataset.flow != null) flow(); });
  box.addEventListener("keydown", function(ev){ var t = ev.target.closest("[data-add]"); if (t && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); t.click(); } });
  cv.addEventListener("click", function(ev){ var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * 480 - 240, y = 180 - (ev.clientY - r.top) / r.height * 360;
    for (var i = SP.length - 1; i >= 0; i--) { var s = SP[i]; if (!s.fixed && Math.abs(s.x - x) < 24 && Math.abs(s.y - y) < 24) { if (s.hat === "click") run("click", s); else say("Nhân vật " + s.name + " chạy khi bấm vào lá cờ xanh."); return; } } });
  reset(); draw(); say(opt.msg || "Bấm vào các khối ở bên trái để ghép chương trình, rồi bấm lá cờ xanh (Chạy).");
  return {info: info};
};
/* Phân tích các đoạn thẳng đã vẽ: số cạnh (gộp các đoạn thẳng hàng), độ dài, khép kín */
window.Scratch.shape = function(segs){
  var S = []; (segs || []).forEach(function(s){ var L = S[S.length - 1], dx = s[2] - s[0], dy = s[3] - s[1];
    if (Math.hypot(dx, dy) < 0.5) return;
    if (L && Math.abs(L[2] - s[0]) < 0.5 && Math.abs(L[3] - s[1]) < 0.5 && Math.abs((L[2] - L[0]) * dy - (L[3] - L[1]) * dx) < 1e-3 * Math.hypot(dx, dy) * Math.hypot(L[2] - L[0], L[3] - L[1]) + 0.01) { L[2] = s[2]; L[3] = s[3]; }
    else S.push(s.slice()); });
  var lens = S.map(function(s){ return Math.hypot(s[2] - s[0], s[3] - s[1]); }), n = S.length;
  var eq = n > 0 && lens.every(function(l){ return Math.abs(l - lens[0]) < 1; });
  var closed = n > 2 && Math.hypot(S[0][0] - S[n - 1][2], S[0][1] - S[n - 1][3]) < 1;
  return {n: n, len: n ? Math.round(lens[0]) : 0, equal: eq, closed: closed};
};
})();
