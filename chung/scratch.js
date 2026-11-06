/* MÔ PHỎNG SCRATCH 3.0 (giao diện tiếng Việt) – Tin 8 Bài 12, 13, 14,…
   Scratch(box, tuỳ chọn)
   - Khối lệnh: Sự kiện (Khi bấm vào cờ / Khi bấm vào nhân vật này), Chuyển động (di chuyển, xoay ↺ / ↻),
     Điều khiển (lặp lại, đợi, lặp lại cho đến khi ⟨khoảng cách đến … < …⟩), Bút vẽ (xoá tất cả, đặt bút, nhấc bút, chọn bút màu).
   - Bấm một khối ở bảng lệnh để thêm vào vị trí đang chọn (dấu ▸); bấm số trên khối để sửa; ↑ ↓ ✕ để sắp xếp, xoá.
   - Nhiều nhân vật (＋ Thêm nhân vật); sân khấu 480×360 như Scratch; chạy chậm (tô sáng lệnh đang chạy); dừng.
   - Sơ đồ khối tự vẽ theo chương trình của nhân vật đang chọn (Lần lặp ← 1, Lần lặp ≤ n,…).
   - opt.expr: ô giá trị nhận biến / phép toán lồng nhau (nút ▾): + − × / chia lấy dư, làm tròn, kết hợp, > < =, và, hoặc, không phải;
     khối Hiển thị (nói, nói … trong … giây), Cảm biến (hỏi … và đợi, trả lời), Các biến số (tạo biến, đặt … thành, thay đổi … một lượng);
     ô theo dõi biến trên sân khấu. opt.vars: tên các biến có sẵn.
   - Gỡ lỗi (Bài 15): opt.lineNo (đánh số (1), (2),… các lệnh), opt.mon ("hide": ẩn ô theo dõi biến, đánh dấu ☑ để hiện như Hình 15.2a),
     opt.debug (Chạy từng lệnh: dừng trước mỗi lệnh, bấm Lệnh tiếp), opt.tests [{name, secret, answers: [..] | function(câu hỏi, lời nói), expect, ok(res)}]
     → nút Kiểm thử: chạy chương trình với số bí mật và câu trả lời định sẵn, không chờ đợi; res = {says, asks, answers, vars, ended, unanswered}.
   - Điều khiển (Bài 14): nếu ⟨⟩ thì, nếu ⟨⟩ thì … nếu không thì, liên tục, lặp lại cho đến khi ⟨⟩ (untilB), dừng lại tất cả; phép toán lấy ngẫu nhiên từ … đến ….
   Tuỳ chọn: title, note, sprites:[{id, name, icon, x, y, dir, color, hat, body, fixed}], scene ("xe": xe và hòn đá), blocks (danh sách khối được dùng),
             add (cho thêm nhân vật), flow (hiện sơ đồ khối), slow (chạy chậm mặc định), save (tên tệp .sb3), check(x)
   x = {sprites:[{id, name, hat, body}], runs:[{id, hat, segs:[[x1,y1,x2,y2,màu]], end:{x,y,dir}, dist}], log:[…]}
   Scratch.shape(segs) → {n, len, equal, closed} để kiểm tra hình vẽ được. */
(function(){
"use strict";
var C = {ev:"#ffbf00", mo:"#4c97ff", ct:"#ffab19", pen:"#0fbd8c", se:"#5cb1d6", lo:"#9966ff", va:"#ff8c1a", op:"#59c059"};
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
 + ".scx .b .rp{display:inline-flex;flex-wrap:wrap;align-items:center;gap:3px;border-radius:12px;padding:2px 6px;border:1px solid rgba(0,0,0,.18);color:#fff}.scx .b .rp.bool{border-radius:4px}"
 + ".scx .b input.tx{width:auto;min-width:2.2em;border-radius:10px}.scx .b .rm,.scx .b .rx{font:11px sans-serif;border:0;background:rgba(255,255,255,.4);color:#fff;border-radius:6px;padding:0 4px;cursor:pointer;line-height:1.4}"
 + ".scx .b select[data-vs]{border-radius:6px;background:#fff;color:#333;font:600 12px sans-serif;padding:1px 2px;width:auto}"
 + ".scx .vp{display:inline-block;background:" + "#ff8c1a" + ";color:#fff;border-radius:12px;padding:3px 9px;font:600 12.5px sans-serif;margin:1px 2px}"
 + ".scx .nv{display:flex;gap:4px}.scx .nv input{min-width:0;flex:1;font:inherit;font-size:12.5px;border:1px solid #ccc;border-radius:6px;padding:2px 5px}.scx .nv button{font:inherit;font-size:12px;border:1px solid #ccc;background:#fff;border-radius:6px;padding:2px 6px;cursor:pointer;color:#222}"
 + ".scx .askb{display:flex;gap:6px;background:#fff;border:2px solid #5cb1d6;border-radius:20px;padding:4px 6px}.scx .askb input{flex:1;min-width:0;font:inherit;font-size:14px;border:0;outline:none;padding:3px 6px}.scx .askb button{border:0;background:#5cb1d6;color:#fff;border-radius:50%;width:28px;height:28px;cursor:pointer;font-weight:700}"
 + ".scx .rmenu{display:flex;flex-wrap:wrap;gap:4px;align-items:center;background:#fff;border:1px solid #c7d3ea;border-radius:8px;padding:6px;color:#222;font-size:12.5px}.scx .rmenu b{width:100%;font-size:12px;color:#555}.scx .rmenu button{font:600 12.5px sans-serif;border:0;color:#fff;border-radius:12px;padding:3px 10px;cursor:pointer}"
 + ".scx .hexs{display:inline-flex;align-items:center;min-width:34px;height:20px;background:rgba(0,0,0,.18);clip-path:polygon(12% 0,88% 0,100% 50%,88% 100%,12% 100%,0 50%);justify-content:center}"
 + ".scx .mid{border-radius:0!important;display:flex}"
 + ".scx .lnum{display:inline-block;min-width:2.3em;font:600 11.5px sans-serif;color:#555;margin-right:2px}.scx .row,.scx .cw{position:relative}"
 + ".scx .cw>.lnum{position:absolute;left:-2.6em;top:6px}.scx .code.lnc{padding-left:2.9em}.scx .row>.lnum{margin-left:-2.6em}"
 + ".scx .vp input{margin:0 4px 0 0;vertical-align:-2px}"
 + ".scx .tr{width:100%;border-collapse:collapse;font-size:13px;color:inherit}.scx .tr th,.scx .tr td{border:1px solid var(--line);padding:3px 6px;text-align:left;vertical-align:top}.scx .tr th{background:var(--sunk)}.scx .tr td.p{color:#1c7c54;font-weight:700}.scx .tr td.f{color:#c0392b;font-weight:700}"
 + ".scx .lib{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px;background:#fff;border:1px solid #c7d3ea;border-radius:8px;padding:6px;color:#222}.scx .lib button{font-size:20px;border:1px solid #ccc;background:#fff;border-radius:8px;padding:2px 8px;cursor:pointer}";
function addCss(){ var s = document.getElementById("scratch-css"); if (!s) { s = document.createElement("style"); s.id = "scratch-css"; document.head.appendChild(s); } s.textContent = CSS; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
var PENC = [["#8e2c8e","tím"],["#e74c3c","đỏ"],["#2e86de","xanh dương"],["#27ae60","xanh lá"],["#f39c12","cam"],["#222222","đen"]];
var LIB = [{icon:"✏️", name:"Bút chì"},{icon:"🐱", name:"Mèo"},{icon:"⭐", name:"Ngôi sao"},{icon:"🦋", name:"Bướm"}];
var DEF = {move:{op:"move", n:10}, turnL:{op:"turnL", n:15}, turnR:{op:"turnR", n:15}, repeat:{op:"repeat", n:10, body:[]}, wait:{op:"wait", n:1},
  until:{op:"until", n:120, body:[]}, clear:{op:"clear"}, down:{op:"down"}, up:{op:"up"}, color:{op:"color", c:"#8e2c8e"}};
var ALLB = ["move","turnL","turnR","repeat","wait","until","clear","down","up","color"];
DEF.say = {op:"say", v:"Xin chào!"}; DEF.sayFor = {op:"sayFor", v:"Xin chào!", n:2}; DEF.ask = {op:"ask", v:"Bạn tên là gì?"};
DEF.set = {op:"set", "var":"", v:0}; DEF.change = {op:"change", "var":"", v:1};
var OPS = {add:["+",2], sub:["−",2], mul:["×",2], div:["/",2], mod:["chia lấy dư",2], round:["làm tròn",1], join:["kết hợp",2], gt:[">",2], lt:["<",2], eq:["=",2], and:["và",2], or:["hoặc",2], not:["không phải",1]};
function getv(b, path){ return path.split(".").reduce(function(o, k){ return o == null ? o : o[k]; }, b); }
function setv(b, path, v){ var ks = path.split("."), o = b; for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]]; o[ks[ks.length - 1]] = v; }
function isNumStr(x){ return typeof x === "number" || (typeof x === "string" && x.trim() !== "" && !isNaN(+x)); }
function num(x){ if (typeof x === "boolean") return x ? 1 : 0; var n = +x; return isNaN(n) ? 0 : n; }
function str(x){ if (typeof x === "boolean") return x ? "true" : "false"; if (typeof x === "number") return isFinite(x) ? String(+x.toPrecision(12)) : (x > 0 ? "Infinity" : "-Infinity"); return String(x == null ? "" : x); }
function cmpv(a, b){ if (isNumStr(a) && isNumStr(b)) return num(a) - num(b); var x = str(a).toLowerCase(), y = str(b).toLowerCase(); return x < y ? -1 : x > y ? 1 : 0; }
function truth(x){ if (typeof x === "boolean") return x; var t = str(x).toLowerCase(); return !(t === "" || t === "0" || t === "false"); }
function etext(x){ if (x == null) return ""; if (typeof x !== "object") return isNumStr(x) ? str(x) : "“" + x + "”"; if (x.r === "var") return x.name; if (x.r === "answer") return "trả lời";
  var a = function(i){ return etext(x.a[i]); };
  if (x.r === "round") return "làm tròn(" + a(0) + ")"; if (x.r === "rand") return "ngẫu nhiên(" + a(0) + ", " + a(1) + ")"; if (x.r === "not") return "không phải (" + a(0) + ")"; if (x.r === "join") return "kết hợp(" + a(0) + ", " + a(1) + ")";
  return "(" + a(0) + " " + OPS[x.r][0] + " " + a(1) + ")"; }
function isC(op){ return /^(repeat|until|if|ifElse|forever|untilB)$/.test(op); }
DEF["if"] = {op:"if", cond:"", body:[]}; DEF.ifElse = {op:"ifElse", cond:"", body:[], body2:[]}; DEF.forever = {op:"forever", body:[]}; DEF.untilB = {op:"untilB", cond:"", body:[]}; DEF.stop = {op:"stop"};
OPS.rand = ["lấy ngẫu nhiên", 2];
function col(op){ return /move|turn/.test(op) ? C.mo : /repeat|wait|until|^if|forever|stop/.test(op) ? C.ct : /say/.test(op) ? C.lo : op === "ask" ? C.se : /set|change/.test(op) ? C.va : C.pen; }
function slotHtml(v, path, env, kind){
  if (v && typeof v === "object") return repHtml(v, path, env);
  if (kind === "b") return '<span class="hexs" title="Ô điều kiện (kiểu lôgic)">' + (env.live && env.expr ? '<button type="button" class="rm" data-rm="' + path + '" title="Đặt phép so sánh hoặc phép toán lôgic vào ô này">▾</button>' : "") + "</span>";
  var t = v == null ? "" : String(v), w = Math.max(2, t.length + 1) + "ch";
  if (!env.live) return '<input class="tx" value="' + esc(t) + '" tabindex="-1" readonly style="width:' + w + '">';
  return '<input class="tx" data-p="' + path + '" value="' + esc(t) + '" style="width:' + w + '" aria-label="giá trị">' + (env.expr ? '<button type="button" class="rm" data-rm="' + path + '" title="Đặt biến hoặc phép toán vào ô này">▾</button>' : ""); }
function repHtml(r, path, env){
  var x = env.live ? '<button type="button" class="rx" data-rx="' + path + '" title="Bỏ, trả lại ô trống">×</button>' : "";
  if (r.r === "var") return '<span class="rp" style="background:' + C.va + '">' + esc(r.name) + x + "</span>";
  if (r.r === "answer") return '<span class="rp" style="background:' + C.se + '">trả lời' + x + "</span>";
  var o = OPS[r.r], bool = /^(gt|lt|eq|and|or|not)$/.test(r.r), a = function(i){ return slotHtml(r.a[i], path + ".a." + i, env, /^(and|or|not)$/.test(r.r) ? "b" : ""); };
  var inner = r.r === "rand" ? "lấy ngẫu nhiên từ " + a(0) + " đến " + a(1) : r.r === "join" ? "kết hợp " + a(0) + " " + a(1) : r.r === "mod" ? a(0) + " chia lấy dư " + a(1) : o[1] === 1 ? o[0] + " " + a(0) : a(0) + " " + o[0] + " " + a(1);
  return '<span class="rp' + (bool ? " bool" : "") + '" style="background:' + C.op + '">' + inner + x + "</span>"; }
function label(b, env, target){
  if (typeof env !== "object") env = {live: !!env, expr: false, vars: []};
  var live = env.live, num = function(k){ return slotHtml(b[k], k, env); };
  var vsel = function(){ return live ? '<select data-vs aria-label="biến">' + (env.vars.length ? env.vars.map(function(v){ return "<option" + (v === b["var"] ? " selected" : "") + ">" + esc(v) + "</option>"; }).join("") : "<option>(chưa có biến)</option>") + "</select>" : '<span class="vp" style="padding:1px 6px">' + esc(b["var"] || env.vars[0] || "biến") + "</span>"; };
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
    case "say": return "nói " + slotHtml(b.v, "v", env);
    case "sayFor": return "nói " + slotHtml(b.v, "v", env) + " trong " + num("n") + " giây";
    case "ask": return "hỏi " + slotHtml(b.v, "v", env) + " và đợi";
    case "set": return "đặt " + vsel() + " thành " + slotHtml(b.v, "v", env);
    case "if": case "ifElse": return "nếu " + slotHtml(b.cond, "cond", env, "b") + " thì";
    case "untilB": return "lặp lại cho đến khi " + slotHtml(b.cond, "cond", env, "b");
    case "forever": return "liên tục";
    case "stop": return 'dừng lại <span class="rp" style="background:rgba(0,0,0,.15)">tất cả ▾</span>';
    case "change": return "thay đổi " + vsel() + " một lượng " + slotHtml(b.v, "v", env);
  }
  return b.op;
}
var FLAG = '<svg viewBox="0 0 16 16" width="16" height="16" style="vertical-align:-3px" aria-label="lá cờ xanh"><path d="M3 1v14" stroke="#3a7d22" stroke-width="1.6"/><path d="M3.8 2.2c2.6-1.2 4.4 1.3 7.6.2v6.2c-3.2 1.1-5-1.4-7.6-.2z" fill="#4cbf56" stroke="#3a7d22" stroke-width=".8"/></svg>';
function rad(d){ return d * Math.PI / 180; }
window.Scratch = function(box, opt){
  addCss(); opt = opt || {};
  var blocks = opt.blocks || ALLB, scene = opt.scene || "", log = [], runs = [], running = false, stopFlag = false;
  var TESTING = false, TEST = null, STEP = false, stepRes = null, HID = {}, LN = 0, TRES = null, stopAll = false, SP, cur, ins, selB, pen, slow = !!opt.slow, VARS, VN, ANSWER = "", SAYS = [], RM = null, askRes = null;
  function env(live){ return {live: live, expr: !!opt.expr, vars: VN}; }
  var q = function(s){ return box.querySelector(s); };
  function reset(){ SP = clone(opt.sprites || [{id:"bo", name:"Bọ rùa", icon:"🐞", x:0, y:0, dir:90, hat:"flag", body:[]}]).map(function(s){ s.x0 = s.x || 0; s.y0 = s.y || 0; s.d0 = s.dir == null ? 90 : s.dir; s.hat = s.hat || "flag"; s.body = s.body || []; s.pc = "#8e2c8e"; s.pd = false; return s; });
    if (scene === "xe") SP.push({id:"da", name:"Hòn đá", icon:"🪨", x0:170, y0:-40, d0:90, hat:"none", body:[], fixed:true});
    SP.forEach(home); cur = 0; ins = {arr: SP[0].body, i: SP[0].body.length}; selB = null; pen = []; runs = []; log = []; VARS = {}; VN = []; ANSWER = ""; SAYS = []; RM = null;
    (opt.vars || []).forEach(function(n){ VN.push(n); VARS[n] = 0; if (opt.mon === "hide") HID[n] = true; }); TRES = null; }
  function home(s){ s.x = s.x0; s.y = s.y0; s.dir = s.d0; s.pd = false; s.bubble = null; }
  box.classList.add("scx");
  box.innerHTML = '<div class="t">' + (opt.title || "Scratch mô phỏng") + "</div>"
    + '<div class="top"><button type="button" class="go" data-a="go" title="Bấm vào lá cờ xanh để chạy">' + FLAG + ' Chạy</button><button type="button" class="stop" data-a="stop" title="Dừng">⏹ Dừng</button>'
    + '<label style="font-size:13px"><input type="checkbox" data-slow' + (slow ? " checked" : "") + '> Chạy chậm (tô sáng lệnh đang chạy)</label>'
    + '<button type="button" data-a="home" title="Đưa nhân vật về vị trí ban đầu, xoá nét vẽ">↺ Về vị trí đầu</button>'
    + (opt.flow ? '<label style="font-size:13px"><input type="checkbox" data-flow checked> Sơ đồ khối</label>' : "")
    + (opt.debug ? '<label style="font-size:13px" title="Dừng trước mỗi lệnh để theo dõi giá trị các biến"><input type="checkbox" data-step> Chạy từng lệnh</label><button type="button" data-a="next" disabled title="Thực hiện lệnh đang tô sáng">⏭ Lệnh tiếp</button>' : "")
    + (opt.tests ? '<button type="button" data-a="test" title="Chạy chương trình với các tình huống định sẵn và so sánh với kịch bản">🧪 Kiểm thử</button>' : "")
    + (opt.save ? '<button type="button" data-a="save" title="Tệp → Lưu về máy tính">💾 Lưu ' + esc(opt.save) + "</button>" : "")
    + '<button type="button" data-a="reset">Làm lại từ đầu</button></div>'
    + '<div class="rmenu" data-rmenu hidden></div>'
    + '<div class="wk"><div class="pal" data-pal></div><div class="code" data-code aria-label="Vùng chương trình"></div>'
    + '<div class="stg"><canvas width="480" height="360" data-cv aria-label="Sân khấu"></canvas><div class="askb" data-ask hidden><input data-askin placeholder="Nhập câu trả lời rồi nhấn Enter" aria-label="Câu trả lời"><button type="button" data-a="askok" aria-label="Xong">✓</button></div><div class="spr" data-spr></div><div class="lib" data-lib hidden></div>' + (opt.flow ? '<div class="flow" data-fl></div>' : "") + "</div></div>"
    + '<div class="msg" data-msg aria-live="polite"></div>' + (opt.tests ? '<div data-tests></div>' : "") + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + '<div class="note">' + (opt.note || "") + "</div>";
  var cv = q("[data-cv]"), g = cv.getContext("2d");
  function say(t){ q("[data-msg]").textContent = t; }
  function sp(){ return SP[cur]; }
  /* ---------- Bảng lệnh ---------- */
  function palette(){
    var groups = [["Sự kiện", []], ["Chuyển động", ["move","turnL","turnR"]], ["Hiển thị", ["say","sayFor"]], ["Điều khiển", ["wait","repeat","forever","if","ifElse","untilB","until","stop"]], ["Cảm biến", ["ask"]], ["Các biến số", ["set","change"]], ["Bút vẽ", ["clear","down","up","color"]]];
    var h = '<h5>Sự kiện</h5><div class="b hat" data-hat="flag" style="background:' + C.ev + '">Khi bấm vào ' + FLAG + '</div>'
      + (SP.length > 1 || opt.add ? '<div class="b hat" data-hat="click" style="background:' + C.ev + '">Khi bấm vào nhân vật này</div>' : "");
    groups.slice(1).forEach(function(gp){ var list = gp[1].filter(function(o){ return blocks.indexOf(o) >= 0; }); if (!list.length) return;
      h += "<h5>" + gp[0] + "</h5>";
      if (gp[0] === "Cảm biến") h += '<div><span class="vp" style="background:' + C.se + '">trả lời</span></div>';
      if (gp[0] === "Các biến số") h += '<div class="nv"><input data-nv placeholder="Tên biến mới" aria-label="Tên biến mới"><button type="button" data-a="newvar">Tạo một biến</button></div><div>' + VN.map(function(n){ return '<span class="vp">' + (opt.mon ? '<input type="checkbox" data-mon="' + esc(n) + '"' + (HID[n] ? "" : " checked") + ' title="Hiện giá trị biến trên sân khấu">' : "") + esc(n) + "</span>"; }).join("") + "</div>";
      h += list.map(function(o){ var d = clone(DEF[o]); if (d["var"] === "") d["var"] = VN[0] || "biến"; return '<div class="b" data-add="' + o + '" style="background:' + col(o) + '" role="button" tabindex="0">' + label(d, env(false), "Hòn đá") + "</div>"; }).join(""); });
    if (opt.expr) h += '<h5>Các phép toán</h5><div style="font-size:11.5px;color:#555">Bấm nút ▾ trong một ô của khối lệnh để đặt biến hoặc phép toán vào ô đó.</div>';
    q("[data-pal]").innerHTML = h + '<div style="font-size:11.5px;color:#666;margin-top:4px">Bấm một khối để thêm vào vị trí ▸ đang chọn trong chương trình.</div>'; }
  /* ---------- Vùng chương trình ---------- */
  function blocksHtml(arr, depth){
    var h = '<span class="ins' + (ins.arr === arr && ins.i === 0 ? " on" : "") + '" data-ins="' + key(arr) + ':0" title="Chèn vào đây"></span>';
    arr.forEach(function(b, i){ var lnh = ""; if (opt.lineNo) { b._ln = ++LN; lnh = '<span class="lnum">(' + LN + ")</span>"; }
      var id = key(arr) + ":" + i, c = col(b.op), tl = selB === b ? '<span class="tools"><button type="button" data-mv="-1">↑</button><button type="button" data-mv="1">↓</button><button type="button" data-del>✕</button></span>' : "";
      if (isC(b.op)) h += '<div class="cw" data-bid="' + id + '">' + lnh + '<div class="b' + (selB === b ? " sel" : "") + '" data-sb="' + id + '" style="background:' + c + '">' + label(b, env(true), "Hòn đá") + tl + '</div><div class="in" style="border-color:' + c + '">' + blocksHtml(b.body, depth + 1) + "</div>"
        + (b.op === "ifElse" ? '<div class="b mid" style="background:' + c + '">nếu không thì</div><div class="in" style="border-color:' + c + '">' + blocksHtml(b.body2, depth + 1) + "</div>" : "") + '<div class="ce" style="background:' + c + '"></div></div>';
      else h += '<div class="row" data-bid="' + id + '">' + lnh + '<div class="b' + (selB === b ? " sel" : "") + '" data-sb="' + id + '" style="background:' + c + '">' + label(b, env(true)) + tl + "</div></div>";
      h += '<span class="ins' + (ins.arr === arr && ins.i === i + 1 ? " on" : "") + '" data-ins="' + key(arr) + ":" + (i + 1) + '" title="Chèn vào đây"></span>'; });
    return h; }
  var KEYS, KA;
  function key(arr){ var i = KA.indexOf(arr); if (i < 0) { KA.push(arr); i = KA.length - 1; } return i; }
  function find(id){ var p = String(id).split(":"); return {arr: KA[+p[0]], i: +p[1]}; }
  function code(){ KA = []; LN = 1; var s = sp(); q("[data-code]").classList.toggle("lnc", !!opt.lineNo);
    if (s.fixed) { q("[data-code]").innerHTML = '<p style="color:#555">' + esc(s.name) + " không có chương trình.</p>"; return; }
    q("[data-code]").innerHTML = (opt.lineNo ? '<span class="lnum" style="margin-left:-2.6em">(1)</span>' : "") + '<div class="b hat" style="background:' + C.ev + '">' + (s.hat === "click" ? "Khi bấm vào nhân vật này" : "Khi bấm vào " + FLAG) + "</div>" + '<div style="padding-left:2px">' + blocksHtml(s.body, 0) + "</div>"; }
  /* ---------- Sân khấu ---------- */
  function stage(){ g.clearRect(0, 0, 480, 360);
    if (scene === "xe") { g.fillStyle = "#e8f6ff"; g.fillRect(0, 0, 480, 360); g.fillStyle = "#9bd27a"; g.fillRect(0, 215, 480, 145); g.fillStyle = "#777"; g.fillRect(0, 225, 480, 40); g.strokeStyle = "#fff"; g.setLineDash([18, 14]); g.lineWidth = 3; g.beginPath(); g.moveTo(0, 245); g.lineTo(480, 245); g.stroke(); g.setLineDash([]); }
    g.lineCap = "round"; g.lineWidth = 3;
    pen.forEach(function(p){ g.strokeStyle = p[4]; g.beginPath(); g.moveTo(240 + p[0], 180 - p[1]); g.lineTo(240 + p[2], 180 - p[3]); g.stroke(); });
    SP.forEach(function(s, i){ g.save(); g.translate(240 + s.x, 180 - s.y); if (!s.fixed && s.icon !== "🚌") g.rotate(rad(s.dir - 90)); g.font = (s.icon === "🚌" || s.icon === "🪨" ? 40 : 30) + "px 'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(s.icon, 0, 0); g.restore();
      if (i === cur && !s.fixed && SP.length > 1) { g.strokeStyle = "rgba(76,151,255,.6)"; g.lineWidth = 1.5; g.strokeRect(240 + s.x - 20, 180 - s.y - 20, 40, 40); g.lineWidth = 3; } });
    g.font = "12px sans-serif"; g.textBaseline = "middle";
    VN.filter(function(n){ return !HID[n]; }).forEach(function(n, i){ var v = str(VARS[n]), w1 = g.measureText(n).width, w2 = Math.max(24, g.measureText(v).width + 10), y0 = 6 + i * 24;
      g.fillStyle = "#e6f0ff"; g.strokeStyle = "#c4d0e6"; g.lineWidth = 1; g.fillRect(6, y0, w1 + w2 + 18, 20); g.strokeRect(6, y0, w1 + w2 + 18, 20);
      g.fillStyle = "#333"; g.textAlign = "left"; g.fillText(n, 11, y0 + 10); g.fillStyle = C.va; g.fillRect(w1 + 16, y0 + 3, w2, 14); g.fillStyle = "#fff"; g.textAlign = "center"; g.fillText(v, w1 + 16 + w2 / 2, y0 + 10); });
    SP.forEach(function(s){ if (s.bubble == null || s.bubble === "") return; var words = String(s.bubble).split(" "), lines = [], ln = "";
      g.font = "14px sans-serif"; words.forEach(function(w){ var t = ln ? ln + " " + w : w; if (g.measureText(t).width > 170 && ln) { lines.push(ln); ln = w; } else ln = t; }); lines.push(ln);
      var bw = Math.min(190, Math.max.apply(null, lines.map(function(l){ return g.measureText(l).width; })) + 18), bh = lines.length * 18 + 12;
      var bx = Math.max(4, Math.min(476 - bw, 240 + s.x + 16)), by = Math.max(4, 180 - s.y - 28 - bh);
      g.fillStyle = "#fff"; g.strokeStyle = "#999"; g.lineWidth = 1.5; g.beginPath(); g.rect(bx, by, bw, bh); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(bx + 14, by + bh); g.lineTo(bx + 8, by + bh + 12); g.lineTo(bx + 26, by + bh); g.fillStyle = "#fff"; g.fill(); g.stroke();
      g.fillStyle = "#222"; g.textAlign = "left"; lines.forEach(function(l, i){ g.fillText(l, bx + 9, by + 15 + i * 18); }); });
    if (scene === "xe") { var car = SP[0], rock = SP[SP.length - 1], d = dist(car, rock); g.fillStyle = "#333"; g.font = "13px sans-serif"; g.textAlign = "left"; g.fillText("Khoảng cách đến Hòn đá: " + Math.round(d) + " bước", 8, 18); } }
  function dist(a, b){ return Math.hypot(a.x - b.x, a.y - b.y); }
  function sprites(){ q("[data-spr]").innerHTML = SP.map(function(s, i){ return '<button type="button" data-sp="' + i + '" class="' + (i === cur ? "on" : "") + '">' + s.icon + " " + esc(s.name) + "</button>"; }).join("") + (opt.add ? '<button type="button" data-a="addsp">＋ Thêm nhân vật</button>' : ""); }
  /* ---------- Sơ đồ khối ---------- */
  function flowSvg(s){
    var W = 370, cx = 175, y = 12, parts = [], edges = [];
    function txt(b){ return b.op === "move" ? "Di chuyển " + etext(b.n) + " bước" : b.op === "turnL" ? "Quay trái " + etext(b.n) + " độ" : b.op === "turnR" ? "Quay phải " + etext(b.n) + " độ" : b.op === "wait" ? "Đợi " + etext(b.n) + " giây" :
      b.op === "say" || b.op === "sayFor" ? "Nói " + etext(b.v) : b.op === "ask" ? "Hỏi " + etext(b.v) + ", nhận trả lời" : b.op === "set" ? b["var"] + " ← " + etext(b.v).replace(/^\((.*)\)$/, "$1") : b.op === "change" ? b["var"] + " ← " + b["var"] + " + " + etext(b.v) : b.op === "clear" ? "Xoá tất cả" : b.op === "down" ? "Đặt bút" : b.op === "up" ? "Nhấc bút" : b.op === "color" ? "Chọn bút màu" : b.op; }
    function node(kind, t, h){ var n = {kind: kind, t: t, y: y, h: h || 26}; n.m = n.y + n.h / 2; parts.push(n); y += n.h + 20; return n; }
    function line(pts, lab, lx, ly){ edges.push('<polyline fill="none" points="' + pts.map(function(p){ return p.join(","); }).join(" ") + '" marker-end="url(#fa)"/>' + (lab ? '<text x="' + lx + '" y="' + ly + '" class="lb">' + lab + "</text>" : "")); }
    function connect(pend, t){ pend.forEach(function(p){
      if (p.down) line([[cx, p.down.y + p.down.h], [cx, t.y]], p.lab, cx + 5, p.down.y + p.down.h + 12);
      else { var xr = cx + 125 + p.off; line([[cx + 84, p.exit.m], [xr, p.exit.m], [xr, t.y - 9], [cx, t.y - 9]], p.lab, cx + 88, p.exit.m - 4); } }); }
    function back(pend, d, off){ var xl = cx - 125 - off; pend.forEach(function(p){ var from = p.down || p.exit; line([[cx - (from.kind === "dec" ? 84 : 112), from.m], [xl, from.m], [xl, d.y - 9], [cx, d.y - 9]]); }); }
    function seq(arr, depth, pend){ arr.forEach(function(b){ var off = Math.max(0, 30 - depth * 10);
        if (b.op === "repeat") { var v = "Lần lặp" + (depth ? " " + (depth + 1) : ""), a = node("proc", v + " ← 1"); connect(pend, a);
          var d = node("dec", v + " ≤ " + etext(b.n), 40); connect([{down: a}], d);
          var p2 = seq(b.body, depth + 1, [{down: d, lab: "Đúng"}]), inc = node("proc", "Tăng " + v + " lên 1 đơn vị"); connect(p2, inc);
          back([{down: inc}], d, off); pend = [{exit: d, lab: "Sai", off: off}]; }
        else if (b.op === "until") { var d2 = node("dec", "Cách hòn đá < " + b.n + " bước?", 40); connect(pend, d2);
          var p3 = seq(b.body, depth + 1, [{down: d2, lab: "Sai"}]); if (b.body.length) back(p3, d2, off); pend = [{exit: d2, lab: "Đúng", off: off}]; }
        else { var n = node("proc", txt(b)); connect(pend, n); pend = [{down: n}]; } }); return pend; }
    var st = node("term", "Bắt đầu"), pend = seq(s.body, 0, [{down: st}]), end = node("term", "Kết thúc"); connect(pend, end);
    parts.forEach(function(n){ if (n.t.length > 34) n.t = n.t.slice(0, 33) + "…"; });
    var shapes = parts.map(function(n){ var t = '<text x="' + cx + '" y="' + (n.m + 4) + '" text-anchor="middle">' + esc(n.t) + "</text>";
      if (n.kind === "term") return '<ellipse cx="' + cx + '" cy="' + n.m + '" rx="56" ry="' + n.h / 2 + '" fill="#d7f0e0" stroke="#3a8f5c"/>' + t;
      if (n.kind === "dec") return '<polygon points="' + cx + "," + n.y + " " + (cx + 84) + "," + n.m + " " + cx + "," + (n.y + n.h) + " " + (cx - 84) + "," + n.m + '" fill="#d6ecfa" stroke="#3a7fbf"/>' + t;
      return '<rect x="' + (cx - 112) + '" y="' + n.y + '" width="224" height="' + n.h + '" rx="3" fill="#e4f4d8" stroke="#6a9f3a"/>' + t; }).join("");
    return '<svg viewBox="0 0 ' + W + " " + (y - 6) + '" width="' + W + '" style="max-width:100%;font:11.5px sans-serif" role="img" aria-label="Sơ đồ khối"><defs><marker id="fa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L8,4L0,8z" fill="#555"/></marker></defs><style>polyline{stroke:#555;stroke-width:1.2}.lb{font-size:10.5px;fill:#333}</style>' + edges.join("") + shapes + "</svg>"; }
  function branchy(arr){ return arr.some(function(b){ return /^(if|ifElse|forever|untilB)$/.test(b.op) || (b.body && branchy(b.body)); }); }
  function flow(){ var el = q("[data-fl]"); if (!el) return; var on = q("[data-flow]").checked, s = sp(); el.hidden = !on || s.fixed;
    if (on && !s.fixed && branchy(s.body)) { el.innerHTML = '<div style="font-size:12.5px;color:#555;padding:6px">Chương trình có cấu trúc rẽ nhánh hoặc lặp có điều kiện: xem sơ đồ khối mẫu trong SGK (Hình 14.2b, 14.4a, 14.7).</div>'; return; }
    if (on && !s.fixed) el.innerHTML = '<div style="font-size:12px;color:#555;padding:2px 4px">Sơ đồ khối của chương trình (' + esc(s.name) + ")</div>" + flowSvg(s); }
  function check(){ if (opt.check) q("[data-ck]").innerHTML = opt.check(info()).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function info(){ return {sprites: SP.filter(function(s){ return !s.fixed; }).map(function(s){ return {id: s.id, name: s.name, hat: s.hat, body: clone(s.body)}; }), runs: runs, log: log, tests: TRES, vars: clone(VARS), varNames: VN.slice(), says: SAYS.slice()}; }
  function draw(){ palette(); code(); sprites(); stage(); flow(); check(); }
  /* ---------- Chạy chương trình ---------- */
  function sleep(ms){ if (TESTING) return Promise.resolve(); return new Promise(function(r){ setTimeout(r, ms); }); }
  function frame(){ return new Promise(function(r){ setTimeout(r, 16); }); }
  function ev(x){ if (x == null) return ""; if (typeof x !== "object") return x;
    if (x.r === "var") return VARS[x.name] == null ? 0 : VARS[x.name]; if (x.r === "answer") return ANSWER;
    var a = function(i){ return ev(x.a[i]); };
    switch (x.r) { case "add": return num(a(0)) + num(a(1)); case "sub": return num(a(0)) - num(a(1)); case "mul": return num(a(0)) * num(a(1)); case "div": return num(a(0)) / num(a(1));
      case "mod": var n = num(a(0)), m = num(a(1)), r = n % m; if (r !== 0 && (r < 0) !== (m < 0)) r += m; return r;
      case "round": return Math.round(num(a(0)));
      case "rand": if (TESTING && TEST && TEST.secret != null) return TEST.secret; var lo = num(a(0)), hi = num(a(1)); if (lo > hi) { var tt = lo; lo = hi; hi = tt; } return (lo % 1 === 0 && hi % 1 === 0) ? lo + Math.floor(Math.random() * (hi - lo + 1)) : lo + Math.random() * (hi - lo); case "join": return str(a(0)) + str(a(1));
      case "gt": return cmpv(a(0), a(1)) > 0; case "lt": return cmpv(a(0), a(1)) < 0; case "eq": return cmpv(a(0), a(1)) === 0;
      case "and": return truth(a(0)) && truth(a(1)); case "or": return truth(a(0)) || truth(a(1)); case "not": return !truth(a(0)); }
    return ""; }
  function N(x){ return num(ev(x)); }
  async function exec(s, arr, rec){
    for (var i = 0; i < arr.length; i++) { if (stopFlag) return; var b = arr[i];
      var el = s === sp() ? q('[data-sb="' + b._id + '"]') : null; if (slow && el) el.classList.add("run");
      if (STEP && !TESTING) { if (el) el.classList.add("run"); stage(); q('[data-a="next"]').disabled = false;
        say("Chạy từng lệnh: sắp thực hiện lệnh " + (b._ln ? "(" + b._ln + ") " : "") + "đang tô sáng. Quan sát giá trị các biến rồi bấm ⏭ Lệnh tiếp.");
        await new Promise(function(res){ stepRes = res; }); stepRes = null; q('[data-a="next"]').disabled = true; if (!slow && el) el.classList.remove("run"); if (stopFlag) return; }
      if (b.op === "move") { var n = N(b.n), x0 = s.x, y0 = s.y, x1 = s.x + n * Math.sin(rad(s.dir)), y1 = s.y + n * Math.cos(rad(s.dir));
        if (slow) { var st = 12; for (var k = 1; k <= st && !stopFlag; k++) { s.x = x0 + (x1 - x0) * k / st; s.y = y0 + (y1 - y0) * k / st; if (s.pd) { pen.push([x0 + (x1 - x0) * (k - 1) / st, y0 + (y1 - y0) * (k - 1) / st, s.x, s.y, s.pc]); } stage(); await sleep(25); } }
        else { s.x = x1; s.y = y1; if (s.pd) pen.push([x0, y0, x1, y1, s.pc]); }
        if (s.pd) rec.segs.push([x0, y0, x1, y1, s.pc]); }
      else if (b.op === "turnL") s.dir -= N(b.n);
      else if (b.op === "turnR") s.dir += N(b.n);
      else if (b.op === "wait") { stage(); rec.waits++; await sleep(Math.min(3, N(b.n)) * 1000); }
      else if (b.op === "say" || b.op === "sayFor") { var t = str(ev(b.v)); s.bubble = t; SAYS.push(t); rec.says.push(t); log.push("say"); stage();
        if (b.op === "sayFor") { await sleep(Math.min(5, N(b.n)) * 1000); s.bubble = null; } }
      else if (b.op === "ask" && TESTING) { var tq = str(ev(b.v)); TEST.asks.push(tq); var an = typeof TEST.answers === "function" ? TEST.answers(tq, rec.says.slice()) : TEST.answers[TEST.ai++];
        if (an == null || TEST.asks.length > 60) { TEST.unanswered = true; stopFlag = true; return; } ANSWER = an; rec.answers.push(an); }
      else if (b.op === "ask") { var qq = str(ev(b.v)); s.bubble = qq; stage(); var ab = q("[data-ask]"), ai = q("[data-askin]"); ab.hidden = false; ai.value = ""; try { ai.focus({preventScroll: true}); } catch (e) {}
        say("Nhân vật đang hỏi: “" + qq + "”. Nhập câu trả lời ở ô bên dưới sân khấu rồi nhấn Enter.");
        ANSWER = await new Promise(function(res){ askRes = res; }); askRes = null; ab.hidden = true; s.bubble = null; rec.answers.push(ANSWER); log.push("ask"); stage(); }
      else if (b.op === "set") { if (b["var"] in VARS) { VARS[b["var"]] = ev(b.v); log.push("set:" + b["var"]); } }
      else if (b.op === "change") { if (b["var"] in VARS) VARS[b["var"]] = num(VARS[b["var"]]) + N(b.v); }
      else if (b.op === "clear") { pen = []; rec.segs = []; }
      else if (b.op === "down") { s.pd = true; if (!rec.segs.length) rec.segs = []; }
      else if (b.op === "up") s.pd = false;
      else if (b.op === "color") s.pc = b.c;
      else if (b.op === "repeat") { var cnt = Math.round(N(b.n)); for (var r = 0; r < Math.min(200, cnt) && !stopFlag; r++) { await exec(s, b.body, rec); stage(); await frame(); } }
      else if (b.op === "if") { if (truth(ev(b.cond))) await exec(s, b.body, rec); }
      else if (b.op === "ifElse") { await exec(s, truth(ev(b.cond)) ? b.body : b.body2, rec); }
      else if (b.op === "forever") { var gf = 0; while (!stopFlag && gf++ < 3000) { await exec(s, b.body, rec); stage(); await frame(); } }
      else if (b.op === "untilB") { var gu = 0; while (!stopFlag && !truth(ev(b.cond)) && gu++ < 3000) { await exec(s, b.body, rec); stage(); await frame(); } }
      else if (b.op === "stop") { stopFlag = true; stopAll = true; log.push("stopall"); }
      else if (b.op === "until") { var tgt = SP[SP.length - 1], guard = 0; while (!stopFlag && dist(s, tgt) >= N(b.n) && guard++ < 1000) { await exec(s, b.body, rec); stage(); await frame(); } }
      if (slow) { stage(); await sleep(260); }
      if (el) el.classList.remove("run"); } }
  function ids(){ KA.forEach(function(arr, ai){ arr.forEach(function(b, i){ b._id = ai + ":" + i; }); }); }
  async function run(hat, only){
    if (running) { say("Chương trình đang chạy…"); return; } running = true; stopFlag = false; stopAll = false; ids();
    var list = SP.filter(function(s){ return !s.fixed && (only ? s === only : s.hat === hat); });
    if (!list.length) { running = false; say(hat === "flag" ? "Chưa có nhân vật nào có chương trình bắt đầu bằng “Khi bấm vào lá cờ xanh”." : ""); return; }
    log.push("run:" + hat); say("Đang chạy…");
    await Promise.all(list.map(async function(s){ var rec = {id: s.id, hat: hat, segs: [], waits: 0, says: [], answers: []}; SP.forEach(function(x){ x.bubble = null; }); await exec(s, s.body, rec); rec.end = {x: s.x, y: s.y, dir: s.dir};
      if (scene === "xe") rec.dist = dist(s, SP[SP.length - 1]); runs.push(rec); }));
    running = false; stage(); var last = runs[runs.length - 1];
    say(stopAll ? "Chương trình kết thúc (dừng lại tất cả)." + (runs.length && runs[runs.length - 1].says.length ? " Lời nói cuối: “" + runs[runs.length - 1].says[runs[runs.length - 1].says.length - 1] + "”." : "") : stopFlag ? "Đã dừng." : "Chạy xong." + (last && last.segs.length ? " Nhân vật đã vẽ " + last.segs.length + " đoạn thẳng." : "") + (scene === "xe" && last ? " Xe dừng lại khi cách hòn đá " + Math.round(last.dist) + " bước." : ""));
    box.querySelectorAll(".run").forEach(function(e){ e.classList.remove("run"); }); check(); }
  async function runTests(){
    if (running) { say("Chương trình đang chạy…"); return; } var out = [], stepWas = STEP; STEP = false;
    for (var k = 0; k < opt.tests.length; k++) { var c = opt.tests[k];
      TESTING = true; TEST = {secret: c.secret, answers: c.answers, ai: 0, asks: [], unanswered: false};
      VN.forEach(function(n){ VARS[n] = 0; }); SP.forEach(home); pen = []; var before = runs.length;
      await run("flag"); var r = runs[before] || {says: [], answers: []};
      var res = {says: r.says, asks: TEST.asks, answers: r.answers, vars: clone(VARS), ended: !TEST.unanswered, unanswered: TEST.unanswered};
      TESTING = false; out.push({name: c.name, expect: c.expect, got: (res.unanswered ? "Chương trình vẫn hỏi tiếp sau câu trả lời cuối. " : "") + (res.says.length ? "Nói: “" + res.says.join("”, “") + "”" : "Không nói gì"), pass: !!c.ok(res)}); }
    TEST = null; STEP = stepWas; runs.splice(runs.length - opt.tests.length, opt.tests.length); TRES = out;
    var np = out.filter(function(o){ return o.pass; }).length; log.push("test:" + np + "/" + out.length);
    q("[data-tests]").innerHTML = '<table class="tr"><thead><tr><th>Tình huống kiểm thử</th><th>Kịch bản (kết quả đúng)</th><th>Chương trình thực hiện</th><th>Đạt?</th></tr></thead><tbody>'
      + out.map(function(o){ return "<tr><td>" + esc(o.name) + "</td><td>" + esc(o.expect) + "</td><td>" + esc(o.got) + '</td><td class="' + (o.pass ? "p" : "f") + '">' + (o.pass ? "✓ Đạt" : "✗ Lỗi") + "</td></tr>"; }).join("") + "</tbody></table>";
    say("Kiểm thử xong: " + np + "/" + out.length + " tình huống đạt." + (np < out.length ? " Hãy tìm lệnh gây ra lỗi và sửa." : " Chương trình chạy đúng kịch bản.")); check(); }
  /* ---------- Sự kiện ---------- */
  function rmenu(){ var m = q("[data-rmenu]"), btn = function(k, lab, c){ return '<button type="button" data-ro="' + k + '" style="background:' + c + '">' + esc(lab) + "</button>"; };
    m.innerHTML = "<b>Đặt vào ô đã chọn:</b>" + VN.map(function(n){ return btn("var:" + n, n, C.va); }).join("") + (blocks.indexOf("ask") >= 0 ? btn("answer", "trả lời", C.se) : "")
      + ["add","sub","mul","div","mod","round","rand","join"].map(function(k){ return btn(k, k === "rand" ? "lấy ngẫu nhiên từ ( ) đến ( )" : k === "round" ? "làm tròn ( )" : k === "join" ? "kết hợp ( ) ( )" : k === "mod" ? "( ) chia lấy dư ( )" : "( ) " + OPS[k][0] + " ( )", C.op); }).join("")
      + ["gt","lt","eq","and","or","not"].map(function(k){ return btn(k, k === "not" ? "không phải ⟨ ⟩" : "⟨ ) " + OPS[k][0] + " ( ⟩", C.op); }).join("")
      + '<button type="button" data-ro="x" style="background:#888">Đóng</button>'; m.hidden = false; }
  box.addEventListener("click", function(ev){
    var t;
    if ((t = ev.target.closest("[data-rm]"))) { var hb = t.closest("[data-sb]"); RM = {bid: hb.dataset.sb, path: t.dataset.rm}; rmenu(); say("Chọn biến hoặc phép toán để đặt vào ô."); return; }
    if ((t = ev.target.closest("[data-rx]"))) { var hb2 = t.closest("[data-sb]"), f0 = find(hb2.dataset.sb); setv(f0.arr[f0.i], t.dataset.rx, ""); log.push("unrep"); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-ro]"))) { var m = q("[data-rmenu]"); m.hidden = true; var k = t.dataset.ro; if (k === "x" || !RM) { RM = null; return; }
      var fb = find(RM.bid), blk = fb.arr[fb.i], val = k === "answer" ? {r: "answer"} : k.indexOf("var:") === 0 ? {r: "var", name: k.slice(4)} : {r: k, a: OPS[k][1] === 1 ? [""] : ["", ""]};
      setv(blk, RM.path, val); RM = null; log.push("rep:" + (val.r)); say("Đã đặt " + (val.r === "var" ? "biến " + val.name : val.r === "answer" ? "trả lời" : "phép toán") + " vào ô."); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-add]"))) { if (sp().fixed) { say("Hòn đá không có chương trình. Chọn nhân vật khác."); return; } var b = clone(DEF[t.dataset.add]); if (b["var"] === "") { if (!VN.length) { say("Hãy tạo một biến trước (nút Tạo một biến)."); return; } b["var"] = VN[0]; } ins.arr.splice(ins.i, 0, b); selB = b; ins = isC(b.op) ? {arr: b.body, i: 0} : {arr: ins.arr, i: ins.i + 1}; log.push("add:" + b.op); say(isC(b.op) ? "Đã thêm khối “" + t.textContent.trim() + "”. Các khối thêm tiếp sẽ nằm bên trong khối này (dấu ▸ đen)." : "Đã thêm khối."); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-hat]"))) { var s = sp(); if (s.fixed) return; s.hat = t.dataset.hat; log.push("hat:" + s.hat); say("Đã đổi khối bắt đầu của " + s.name + "."); code(); check(); return; }
    if ((t = ev.target.closest("[data-ins]"))) { var f = find(t.dataset.ins); ins = f; selB = null; code(); return; }
    if ((t = ev.target.closest("[data-mv]"))) { var p = locate(selB); if (!p) return; var j = p.i + +t.dataset.mv; if (j < 0 || j >= p.arr.length) return; p.arr.splice(p.i, 1); p.arr.splice(j, 0, selB); log.push("move"); code(); flow(); check(); return; }
    if (ev.target.closest("[data-del]")) { var p2 = locate(selB); if (!p2) return; p2.arr.splice(p2.i, 1); ins = {arr: p2.arr, i: p2.i}; selB = null; log.push("del"); say("Đã xoá khối."); code(); flow(); check(); return; }
    if ((t = ev.target.closest("[data-sb]")) && !ev.target.closest("input,select,button")) { var f2 = find(t.dataset.sb), b2 = f2.arr[f2.i]; selB = selB === b2 ? null : b2; ins = isC(b2.op) ? {arr: b2.body, i: b2.body.length} : {arr: f2.arr, i: f2.i + 1}; code(); return; }
    if ((t = ev.target.closest("[data-sp]"))) { cur = +t.dataset.sp; selB = null; ins = {arr: sp().body, i: sp().body.length}; draw(); return; }
    if ((t = ev.target.closest("[data-lb]"))) { var L = LIB[+t.dataset.lb], n = {id: "s" + SP.length, name: L.name, icon: L.icon, x0: -120, y0: 60, d0: 90, hat: "click", body: [], pc: "#2e86de"}; home(n);
      var at = scene === "xe" ? SP.length - 1 : SP.length; SP.splice(at, 0, n); cur = at; ins = {arr: n.body, i: 0}; selB = null; q("[data-lib]").hidden = true; log.push("addsp"); say("Đã thêm nhân vật " + L.name + ". Khối bắt đầu là “Khi bấm vào nhân vật này”: viết chương trình rồi nháy vào nhân vật trên sân khấu để chạy."); draw(); return; }
    if (!(t = ev.target.closest("[data-a]"))) return; var a = t.dataset.a;
    if (a === "go") run("flag");
    else if (a === "stop") { stopFlag = true; if (askRes) askRes(""); if (stepRes) stepRes(); }
    else if (a === "next") { if (stepRes) stepRes(); }
    else if (a === "test") runTests();
    else if (a === "askok") { if (askRes) askRes(q("[data-askin]").value); }
    else if (a === "newvar") { var nm = q("[data-nv]").value.trim(); if (!nm) { say("Nhập tên biến rồi bấm Tạo một biến."); return; } if (VN.indexOf(nm) >= 0) { say("Đã có biến " + nm + "."); return; }
      VN.push(nm); VARS[nm] = 0; if (opt.mon === "hide") HID[nm] = true; log.push("var:" + nm); say("Đã tạo biến " + nm + ". Biến xuất hiện ở bảng lệnh, trong nút ▾ của các ô và trên sân khấu."); palette(); code(); stage(); check(); }
    else if (a === "home") { if (running) return; SP.forEach(home); pen = []; log.push("home"); say("Đã đưa nhân vật về vị trí ban đầu, xoá nét vẽ."); stage(); }
    else if (a === "reset") { stopFlag = true; if (askRes) askRes(""); running = false; q("[data-ask]").hidden = true; reset(); say("Đã làm lại từ đầu."); draw(); }
    else if (a === "addsp") { var lb = q("[data-lib]"); lb.innerHTML = "Chọn nhân vật: " + LIB.map(function(L, i){ return '<button type="button" data-lb="' + i + '" title="' + L.name + '">' + L.icon + "</button>"; }).join(""); lb.hidden = !lb.hidden; }
    else if (a === "save") { log.push("save"); say("Đã lưu tệp " + opt.save + " (mô phỏng: Tệp → Lưu về máy tính)."); check(); }
  });
  function locate(b){ var r = null; (function walk(arr){ arr.forEach(function(x, i){ if (x === b) r = {arr: arr, i: i}; if (x.body) walk(x.body); if (x.body2) walk(x.body2); }); })(sp().body); return r; }
  box.addEventListener("input", function(ev){ var t = ev.target, h = t.closest("[data-sb]"); if (!h) return; var f = find(h.dataset.sb), b = f.arr[f.i];
    if (t.dataset.p) { var v = t.value; setv(b, t.dataset.p, /^-?\d+(\.\d+)?$/.test(v.trim()) ? +v : v); t.style.width = Math.max(2, v.length + 1) + "ch"; }
    else if (t.dataset.c != null) b.c = t.value; else if (t.dataset.vs != null) b["var"] = t.value; log.push("edit"); flow(); check(); });
  box.addEventListener("change", function(ev){ if (ev.target.dataset.step != null) { STEP = ev.target.checked; log.push(STEP ? "step-on" : "step-off"); if (!STEP && stepRes) stepRes(); }
    if (ev.target.dataset.mon != null) { var mn = ev.target.dataset.mon; HID[mn] = !ev.target.checked; if (ev.target.checked) log.push("mon:" + mn); stage(); }
    if (ev.target.dataset.slow != null) slow = ev.target.checked; if (ev.target.dataset.flow != null) flow(); });
  box.addEventListener("change", function(ev){ var t = ev.target; if (t.dataset.vs == null) return; var h = t.closest("[data-sb]"), f = find(h.dataset.sb); f.arr[f.i]["var"] = t.value; log.push("edit"); flow(); check(); });
  box.addEventListener("keydown", function(ev){ if (ev.target.dataset.askin != null && ev.key === "Enter") { ev.preventDefault(); if (askRes) askRes(ev.target.value); return; } if (ev.target.dataset.nv != null && ev.key === "Enter") { ev.preventDefault(); q('[data-a="newvar"]').click(); return; }
    var t = ev.target.closest("[data-add]"); if (t && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); t.click(); } });
  cv.addEventListener("click", function(ev){ var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * 480 - 240, y = 180 - (ev.clientY - r.top) / r.height * 360;
    for (var i = SP.length - 1; i >= 0; i--) { var s = SP[i]; if (!s.fixed && Math.abs(s.x - x) < 24 && Math.abs(s.y - y) < 24) { if (s.hat === "click") run("click", s); else say("Nhân vật " + s.name + " chạy khi bấm vào lá cờ xanh."); return; } } });
  reset(); draw(); say(opt.msg || "Bấm vào các khối ở bên trái để ghép chương trình, rồi bấm lá cờ xanh (Chạy).");
  return {info: info};
};
/* Phân tích các đoạn thẳng đã vẽ: số cạnh (gộp các đoạn thẳng hàng), độ dài, khép kín */
window.Scratch.str = str;
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
