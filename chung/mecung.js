/* MÔ PHỎNG ROBOT THOÁT MÊ CUNG (Tin 9 Bài 14)
   MeCung(box, tuỳ chọn)
   Robot chỉ làm được: phát hiện tường (trái, phải, phía trước), quay trái/phải 90°, tiến một bước.
   Tuỳ chọn: title, note, mazes:[{name, map:[chuỗi], dir:"N"|"E"|"S"|"W"}]  (# tường, . lối đi, S lối vào, R robot đặt sẵn, E lối ra)
             mode: "tay" (học sinh tự điều khiển) | "ct" (chạy thuật toán)
             rule: "R" | "L" (chế độ tay: kiểm tra từng động tác theo thuật toán bám tường phải/trái)
             prog: {c1, a1:[,], c2, a2:[ ], a3:[ ]} giá trị ban đầu (c: "R","L","F",""; a: "R","L","F","")
             lock (không cho sửa thuật toán), style: "list" | "scratch", speed
             check(x) → [[nhãn, đúng?],…]; x = {runs:[{maze, mode, prog, result, steps, turns, miss, ok}], prog, maze}
   MeCung.sig(p) → chuỗi mô tả thuật toán, ví dụ "R:R,F|F:F|L" (bám tường phải). */
(function(){
"use strict";
var CSS = ".mc{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:10px;min-width:0}"
 + ".mc .t{font-weight:700}.mc .note{font-size:13px;opacity:.85}.mc .msg{font-size:14px;min-height:2.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}.mc .msg.bad{background:#fde2df;color:#7a1f15}.mc .msg.good{background:#d9f2e4;color:#14583c}"
 + ".mc .xbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}"
 + ".mc select{font:inherit;font-size:14px;padding:3px 6px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;max-width:100%}"
 + ".mc button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".mc button.pri{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}.mc button:disabled{opacity:.45;cursor:default}"
 + ".mc .mv button{font-size:14px;padding:7px 14px}"
 + ".mc .lay{display:grid;grid-template-columns:minmax(0,auto) minmax(0,1fr);gap:12px;align-items:start}@media (max-width:760px){.mc .lay{grid-template-columns:minmax(0,1fr)}}"
 + ".mc .stage{background:#f4f1e8;border-radius:8px;padding:6px;max-width:100%;overflow:auto}.mc .stage svg{display:block;max-width:100%;height:auto}"
 + ".mc .sen{display:flex;flex-wrap:wrap;gap:6px;font-size:13px}.mc .sen span{border-radius:6px;padding:2px 8px;border:1px solid var(--line)}.mc .sen span.w{background:#3a3a3a;color:#fff;border-color:#3a3a3a}.mc .sen span.o{background:#fff;color:#14583c;border-color:#7cc4a4}"
 + ".mc .stat{font-size:13px;opacity:.9}"
 + ".mc .pg{font-size:14.5px;line-height:1.5;display:grid;gap:2px;background:var(--surface,#fff);border:1px solid var(--line);border-radius:8px;padding:8px 10px;overflow-x:auto}"
 + ".mc .pg .ln{padding:2px 6px;border-radius:5px;white-space:nowrap}.mc .pg .ln.on{background:#fff3c4;color:#222;box-shadow:0 0 0 2px #e0a800 inset}"
 + ".mc .pg b{font-weight:700}.mc .pg select{font-size:13.5px;padding:1px 4px}"
 + ".mc .pg.sc{background:#fff;color:#fff;font-size:13.5px;font-weight:600}.mc .pg.sc .ln{width:max-content;border-radius:6px;padding:4px 10px;margin:1px 0}.mc .pg.sc .ln.on{box-shadow:0 0 0 3px #222 inset}"
 + ".mc .pg.sc .k-ctl{background:#ffab19;border:1px solid #cf8b17}.mc .pg.sc .k-mot{background:#4c97ff;border:1px solid #3373cc}.mc .pg.sc .k-ev{background:#ffbf00;border:1px solid #cc9900;border-radius:16px 16px 6px 6px}.mc .pg.sc .k-end{background:#ffab19;border:1px solid #cf8b17;padding:2px 10px;min-width:60px}"
 + ".mc .pg.sc .sn{display:inline-block;background:#5cb1d6;border:1px solid #2e8eb8;border-radius:12px;padding:0 8px;margin:0 2px}.mc .pg.sc .op{display:inline-block;background:#59c059;border:1px solid #389438;border-radius:12px;padding:0 6px;margin:0 2px}"
 + ".mc .pg.sc select{background:#fff;color:#222;border-radius:10px;border:none}"
 + ".mc table{border-collapse:collapse;width:100%;font-size:13px}.mc th,.mc td{border:1px solid var(--line);padding:3px 6px;text-align:left}.mc th{background:var(--sunk)}"
 + ".mc .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.mc .ck li::before{content:'☐ '}.mc .ck li.ok::before{content:'☑ ';color:#1c7c54}.mc .ck li.ok{color:#1c7c54;font-weight:600}";
function addCss(){ var s = document.getElementById("mecung-css"); if (!s) { s = document.createElement("style"); s.id = "mecung-css"; document.head.appendChild(s); } s.textContent = CSS; }
var DIRS = [[-1,0],[0,1],[1,0],[0,-1]], DN = {N:0, E:1, S:2, W:3}, HUONG = ["Bắc ↑","Đông →","Nam ↓","Tây ←"];
var SIDE = {R:"bên phải", L:"bên trái", F:"phía trước"}, ACT = {R:"quay phải 90°", L:"quay trái 90°", F:"tiến một bước"};
var SC_SIDE = {R:"phải", L:"trái", F:"trước"}, SC_ACT = {R:"xoay ↻ 90 độ", L:"xoay ↺ 90 độ", F:"di chuyển 1 ô"};
function sig(p){ var a = function(x){ return (x || []).filter(Boolean).join(","); }; return (p.c1 || "?") + ":" + a(p.a1) + "|" + (p.c2 || "?") + ":" + a(p.a2) + "|" + a(p.a3); }
var FLAG = '<svg width="16" height="16" viewBox="0 0 16 16" style="vertical-align:-3px"><path d="M3 1v14" stroke="#455a64" stroke-width="1.6"/><path d="M3.8 2c3-1.6 5 1.4 9 0v7c-4 1.4-6-1.6-9 0z" fill="#4cbf56" stroke="#2e8b3a" stroke-width=".8"/></svg>';

window.MeCung = function(box, opt){
  opt = opt || {}; addCss();
  var mazes = opt.mazes, mi = 0, mode = opt.mode || "ct", style = opt.style || "list", T = 26;
  var P = JSON.parse(JSON.stringify(opt.prog || {c1:"", a1:["",""], c2:"", a2:[""], a3:[""]}));
  var g, H, W, st, rb, trail, steps, turns, miss, seen, q, done, busy = false, timer = null, pending = null, cur = -1, runs = [], ran = false;
  var q$ = function(s){ return box.querySelector(s); };
  box.classList.add("mc");
  box.innerHTML = (opt.title ? '<div class="t">' + opt.title + "</div>" : "")
    + '<div class="xbar">' + (mazes.length > 1 ? '<label>Mê cung: <select data-mz>' + mazes.map(function(m, i){ return '<option value="' + i + '">' + m.name + "</option>"; }).join("") + "</select></label>" : "")
    + (mode === "ct" ? '<button type="button" class="pri" data-run>▶ Chạy</button><button type="button" data-step>Chạy từng bước</button><button type="button" data-stop>■ Dừng</button><label style="font-size:13px">Tốc độ <input type="range" min="1" max="5" value="' + (opt.speed || 3) + '" data-sp style="width:90px;vertical-align:middle"></label>' : "")
    + '<button type="button" data-rs>↺ Về lối vào</button></div>'
    + '<div class="lay"><div class="stage" data-st></div><div style="display:grid;gap:8px;min-width:0">'
    + '<div class="sen" data-sen></div><div class="stat" data-stat></div>'
    + (mode === "tay" ? '<div class="xbar mv"><button type="button" data-a="L">↺ Quay trái 90°</button><button type="button" data-a="F">⬆ Tiến một bước</button><button type="button" data-a="R">↻ Quay phải 90°</button></div>' : '<div class="pg" data-pg></div>')
    + "</div></div>"
    + '<div class="msg" data-msg></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + (opt.note ? '<div class="note">' + opt.note + "</div>" : "");

  function say(t, k){ var m = q$("[data-msg]"); m.innerHTML = t; m.className = "msg" + (k ? " " + k : ""); }
  function load(){
    var m = mazes[mi]; g = m.map.map(function(r){ return r.split(""); }); H = g.length; W = g[0].length;
    for (var r = 0; r < H; r++) for (var c = 0; c < W; c++) if (g[r][c] === "S" || g[r][c] === "R") st = [r, c];
    rb = {r: st[0], c: st[1], d: DN[m.dir || "E"]}; trail = [[rb.r, rb.c]]; steps = 0; turns = 0; miss = 0; seen = {}; q = []; done = false; pending = null; cur = -1; ran = false;
  }
  function wall(r, c){ return r < 0 || c < 0 || r >= H || c >= W || g[r][c] === "#"; }
  function dirOf(s){ return s === "R" ? (rb.d + 1) % 4 : s === "L" ? (rb.d + 3) % 4 : rb.d; }
  function open(s){ var d = dirOf(s); return !wall(rb.r + DIRS[d][0], rb.c + DIRS[d][1]); }
  function atExit(){ return g[rb.r][rb.c] === "E"; }
  function draw(){
    var s = '<svg viewBox="0 0 ' + W * T + " " + H * T + '" width="' + W * T + '" role="img" aria-label="Mê cung và robot">';
    for (var r = 0; r < H; r++) for (var c = 0; c < W; c++) { var ch = g[r][c];
      if (ch === "#") s += '<rect x="' + c * T + '" y="' + r * T + '" width="' + T + '" height="' + T + '" fill="#2b2b2b"/>';
      else if (ch === "E") s += '<rect x="' + c * T + '" y="' + r * T + '" width="' + T + '" height="' + T + '" fill="#f6c3bd"/>';
      else if (ch === "S") s += '<rect x="' + c * T + '" y="' + r * T + '" width="' + T + '" height="' + T + '" fill="#cfe2f7"/>'; }
    for (r = 0; r < H; r++) for (c = 0; c < W; c++) { if (g[r][c] === "E") s += lab(r, c, "Lối ra", "#c0392b"); if (g[r][c] === "S") s += lab(r, c, "Lối vào", "#2f6fb3"); }
    if (trail.length > 1) s += '<polyline points="' + trail.map(function(p){ return (p[1] * T + T / 2) + "," + (p[0] * T + T / 2); }).join(" ") + '" fill="none" stroke="#e03a2f" stroke-width="2.5" stroke-linejoin="round" opacity=".85"/>';
    var cx = rb.c * T + T / 2, cy = rb.r * T + T / 2;
    s += '<g transform="translate(' + cx + "," + cy + ") rotate(" + rb.d * 90 + ')">'
      + '<rect x="-9" y="-9" width="18" height="18" rx="4" fill="#9aa5ad" stroke="#4d585f" stroke-width="1.4"/>'
      + '<path d="M0 -7 L5 1 L-5 1 Z" fill="#1c9a5a"/>'
      + '<rect x="-4" y="-12.5" width="8" height="3" fill="#e84393"/>'
      + '<rect x="9.5" y="-4" width="3" height="8" fill="#2fb66b"/>'
      + '<rect x="-12.5" y="-4" width="3" height="8" fill="#3b6fe0"/></g>';
    s += "</svg>"; q$("[data-st]").innerHTML = s;
    var sd = ["L","F","R"].map(function(x){ var o = open(x); return '<span class="' + (o ? "o" : "w") + '">' + (x === "L" ? "Trái" : x === "R" ? "Phải" : "Trước") + ": " + (o ? "không có tường" : "có tường") + "</span>"; }).join("");
    q$("[data-sen]").innerHTML = sd;
    q$("[data-stat]").innerHTML = "Hướng robot: <b>" + HUONG[rb.d] + "</b> · Số bước tiến: <b>" + steps + "</b> · Số lần quay: <b>" + turns + "</b>" + (mode === "tay" && opt.rule ? " · Động tác sai thuật toán: <b>" + miss + "</b>" : "");
    if (mode === "ct") hl();
    if (opt.check) q$("[data-ck]").innerHTML = opt.check(api()).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function lab(r, c, t, col){ var x = c * T + T / 2, y = r === 0 ? T * 1.6 : r === H - 1 ? (r - 0.35) * T : r * T - 4, anc = c === 0 ? "start" : c === W - 1 ? "end" : "middle";
    if (c === 0) x = 2; if (c === W - 1) x = W * T - 2; if (r > 0 && r < H - 1) y = r * T - 5;
    return '<text x="' + x + '" y="' + y + '" font-size="11" font-weight="700" fill="' + col + '" text-anchor="' + anc + '" paint-order="stroke" stroke="#fff" stroke-width="3">' + t + "</text>"; }
  function api(){ return {runs: runs, prog: sig(P), maze: mi, P: P}; }

  /* ---------- Chương trình ---------- */
  function selS(k){ var v = P[k]; if (opt.lock) return style === "scratch" ? SC_SIDE[v] : SIDE[v];
    return '<select data-k="' + k + '" aria-label="Chọn hướng">' + (v ? "" : '<option value="">(chọn)</option>') + ["R","L","F"].map(function(x){ return '<option value="' + x + '"' + (v === x ? " selected" : "") + ">" + (style === "scratch" ? SC_SIDE[x] : SIDE[x]) + "</option>"; }).join("") + "</select>"; }
  function selA(k, i){ var v = P[k][i]; if (opt.lock) return v ? (style === "scratch" ? SC_ACT[v] : ACT[v]) : "";
    return '<select data-k="' + k + '" data-i="' + i + '" aria-label="Chọn động tác"><option value="">' + (v ? "(bỏ trống)" : "(chọn)") + "</option>" + ["R","L","F"].map(function(x){ return '<option value="' + x + '"' + (v === x ? " selected" : "") + ">" + (style === "scratch" ? SC_ACT[x] : ACT[x]) + "</option>"; }).join("") + "</select>"; }
  function prog(){ var el = q$("[data-pg]"), ind = function(n){ return "padding-left:" + (6 + n * 26) + "px"; }, L = [];
    if (style === "scratch") {
      el.className = "pg sc";
      var cond = function(k){ return 'nếu <span class="op">không <span class="sn">chạm tường ' + selS(k) + " ?</span></span> thì"; };
      L = ['<div class="ln k-ev" data-l="h">khi bấm vào ' + FLAG + "</div>",
        '<div class="ln k-ctl" data-l="0">lặp lại cho đến khi <span class="sn">chạm vào màu <span style="display:inline-block;width:12px;height:12px;background:#e03a2f;border:1px solid #fff;vertical-align:-1px"></span> lối ra ?</span></div>',
        '<div class="ln k-ctl" data-l="1" style="margin-left:18px">' + cond("c1") + "</div>",
        '<div class="ln k-mot" data-l="2" style="margin-left:36px">' + selA("a1", 0) + "</div>",
        '<div class="ln k-mot" data-l="3" style="margin-left:36px">' + selA("a1", 1) + "</div>",
        '<div class="ln k-ctl" data-l="4" style="margin-left:18px">nếu không</div>',
        '<div class="ln k-ctl" data-l="5" style="margin-left:36px">' + cond("c2") + "</div>",
        '<div class="ln k-mot" data-l="6" style="margin-left:54px">' + selA("a2", 0) + "</div>",
        '<div class="ln k-ctl" data-l="7" style="margin-left:36px">nếu không</div>',
        '<div class="ln k-mot" data-l="8" style="margin-left:54px">' + selA("a3", 0) + "</div>",
        '<div class="ln k-end" style="margin-left:36px">&nbsp;</div><div class="ln k-end" style="margin-left:18px">&nbsp;</div><div class="ln k-end">&nbsp;</div>'];
    } else {
      el.className = "pg";
      L = ['<div class="ln" data-l="0" style="' + ind(0) + '"><b>lặp lại</b> động tác sau <b>cho đến khi</b> tìm thấy lối ra</div>',
        '<div class="ln" data-l="1" style="' + ind(1) + '"><b>nếu</b> ' + selS("c1") + " không có tường <b>thì</b></div>",
        '<div class="ln" data-l="2" style="' + ind(2) + '">' + selA("a1", 0) + "</div>",
        '<div class="ln" data-l="3" style="' + ind(2) + '">' + selA("a1", 1) + "</div>",
        '<div class="ln" data-l="4" style="' + ind(1) + '"><b>nếu không thì</b></div>',
        '<div class="ln" data-l="5" style="' + ind(2) + '"><b>nếu</b> ' + selS("c2") + " không có tường <b>thì</b></div>",
        '<div class="ln" data-l="6" style="' + ind(3) + '">' + selA("a2", 0) + "</div>",
        '<div class="ln" data-l="7" style="' + ind(2) + '"><b>nếu không thì</b></div>',
        '<div class="ln" data-l="8" style="' + ind(3) + '">' + selA("a3", 0) + "</div>"];
    }
    el.innerHTML = L.join("");
    el.querySelectorAll("select").forEach(function(s){ s.addEventListener("change", function(){ var k = s.dataset.k; if (s.dataset.i != null) P[k][+s.dataset.i] = s.value; else P[k] = s.value; halt(); reset(); prog(); say("Đã sửa thuật toán. Bấm ▶ Chạy để thử."); }); });
  }
  function hl(){ var el = q$("[data-pg]"); if (!el) return; el.querySelectorAll(".ln").forEach(function(l){ l.classList.toggle("on", l.dataset.l === String(cur)); }); }

  function act(a, line){ cur = line;
    if (a === "R" || a === "L") { rb.d = dirOf(a); turns++; return true; }
    if (a === "F") { var r = rb.r + DIRS[rb.d][0], c = rb.c + DIRS[rb.d][1]; if (wall(r, c)) return false; rb.r = r; rb.c = c; steps++; trail.push([r, c]); return true; }
    return true; }
  function finish(result, text, k){ done = true; halt(); runs.push({maze: mi, mode: "ct", prog: sig(P), result: result, steps: steps, turns: turns}); say(text, k); }
  function step(){
    if (done) return false;
    if (!q.length) {
      if (atExit()) { finish("exit", "🎉 Robot đã tìm thấy <b>lối ra</b> sau " + steps + " bước tiến và " + turns + " lần quay. Vòng lặp kết thúc.", "good"); cur = 0; draw(); return false; }
      if (!P.c1 || !P.c2 || !P.a1.some(Boolean) || !P.a3[0] && !P.a2[0]) { say("Thuật toán còn chỗ <b>(chọn)</b> chưa điền. Hãy chọn đủ hướng và động tác.", "bad"); halt(); return false; }
      var key = rb.r + "," + rb.c + "," + rb.d;
      if (seen[key] && steps + turns > 0) { finish("loop", "🔁 Robot quay lại đúng vị trí và hướng cũ: nó sẽ <b>đi vòng mãi</b> mà không tìm thấy lối ra! Đây là tình huống đặc biệt cần cải tiến thuật toán (thử bám tường phía bên kia).", "bad"); draw(); return false; }
      seen[key] = 1; if (steps + turns > 3000) { finish("max", "Robot đã đi quá lâu mà chưa thấy lối ra.", "bad"); draw(); return false; }
      q = [{k: "if1"}]; cur = 0; say("Chưa tới lối ra → thực hiện các động tác trong vòng lặp."); draw(); return true; }
    var it = q.shift();
    if (it.k === "if1") { var o = open(P.c1); cur = 1; say((style === "scratch" ? "Kiểm tra " : "Kiểm tra: ") + SIDE[P.c1] + (o ? " <b>không có tường</b> → thực hiện nhánh “thì”." : " <b>có tường</b> → chuyển sang nhánh “nếu không thì”."));
      if (o) q = P.a1.map(function(a, i){ return {k: "a", a: a, l: 2 + i}; }).filter(function(x){ return x.a; }); else q = [{k: "else1"}]; draw(); return true; }
    if (it.k === "else1") { cur = 4; q = [{k: "if2"}]; draw(); return true; }
    if (it.k === "if2") { var o2 = open(P.c2); cur = 5; say("Kiểm tra: " + SIDE[P.c2] + (o2 ? " <b>không có tường</b> → thực hiện nhánh “thì”." : " <b>có tường</b> → thực hiện nhánh “nếu không thì”."));
      q = o2 ? (P.a2[0] ? [{k: "a", a: P.a2[0], l: 6}] : []) : [{k: "else2"}]; draw(); return true; }
    if (it.k === "else2") { cur = 7; q = P.a3[0] ? [{k: "a", a: P.a3[0], l: 8}] : []; draw(); return true; }
    if (it.k === "a") { if (!act(it.a, it.l)) { finish("crash", "💥 Robot <b>đâm vào tường</b> khi tiến một bước! Thuật toán chưa đúng: chỉ được tiến khi phía trước không có tường.", "bad"); draw(); return false; }
      say("Robot " + ACT[it.a] + "."); draw(); return true; }
    return true;
  }
  function delay(){ var v = +(q$("[data-sp]") || {value: 3}).value; return [0, 600, 320, 160, 60, 12][v]; }
  function loop(){ if (!busy) return; if (step()) timer = setTimeout(loop, delay()); else busy = false; }
  function halt(){ busy = false; clearTimeout(timer); }
  function reset(){ load(); draw(); }

  /* ---------- Điều khiển tay ---------- */
  function expect(){ if (pending) return pending; var s = opt.rule, o = s === "R" ? "L" : "R";
    if (open(s)) return {a: s, why: "a) " + SIDE[s] + " không có tường → quay sang " + (s === "R" ? "phải" : "trái") + " rồi tiến một bước", then: "F"};
    if (open("F")) return {a: "F", why: "b) " + SIDE[s] + " có tường, phía trước không có tường → tiến một bước"};
    return {a: o, why: "c) " + SIDE[s] + " và phía trước đều có tường → quay sang " + (o === "R" ? "phải" : "trái") + " để chọn lại hướng"}; }
  function manual(a){
    if (done) { say("Robot đã ra khỏi mê cung. Bấm ↺ Về lối vào để đi lại.", "good"); return; }
    var e = opt.rule ? expect() : null, okA = !e || e.a === a, msg = "";
    if (a === "F" && !open("F")) { say("💥 Phía trước <b>có tường</b>, robot không tiến được!", "bad"); if (e) miss++; draw(); return; }
    act(a); ran = true;
    if (e) { if (okA) { msg = "✔ Đúng thuật toán: " + (pending ? "vừa quay xong, giờ tiến một bước" : e.why) + "."; pending = (!pending && e.then) ? {a: e.then, why: "vừa quay sang hướng không có tường → tiến một bước"} : null; }
      else { miss++; msg = "✘ Chưa đúng thuật toán bám tường " + (opt.rule === "R" ? "phải" : "trái") + ". Lẽ ra: " + e.why + "."; pending = null; } }
    else msg = "Robot " + ACT[a] + ".";
    if (atExit()) { done = true; runs.push({maze: mi, mode: "tay", rule: opt.rule || "", result: "exit", steps: steps, turns: turns, miss: miss}); say("🎉 Robot đã tìm thấy <b>lối ra</b>! " + steps + " bước tiến, " + turns + " lần quay" + (opt.rule ? ", " + miss + " động tác sai thuật toán." : "."), "good"); }
    else say(msg, e && !okA ? "bad" : "");
    draw(); }

  if (mode === "tay") box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ manual(b.dataset.a); }); });
  else {
    q$("[data-run]").addEventListener("click", function(){ if (done || ran) reset(); ran = true; busy = true; loop(); });
    q$("[data-step]").addEventListener("click", function(){ halt(); if (done) reset(); ran = true; step(); });
    q$("[data-stop]").addEventListener("click", function(){ halt(); say("Đã dừng. Bấm Chạy từng bước để đi tiếp, hoặc ↺ Về lối vào."); });
    prog(); }
  q$("[data-rs]").addEventListener("click", function(){ halt(); reset(); say("Robot đã về vị trí xuất phát."); });
  if (q$("[data-mz]")) q$("[data-mz]").addEventListener("change", function(){ halt(); mi = +this.value; reset(); say("Đã chọn " + mazes[mi].name + "."); });
  load(); draw();
  say(mode === "tay" ? "Bấm các nút để điều khiển robot. Ô màu cho biết cảm biến của robot phát hiện tường ở bên trái, phía trước, bên phải." : "Bấm ▶ Chạy để robot thực hiện thuật toán, hoặc Chạy từng bước để theo dõi từng dòng.");
  return {state: function(){ return {r: rb.r, c: rb.c, d: rb.d, steps: steps, turns: turns, done: done, miss: miss}; }, runs: runs, P: P, step: step, reset: reset};
};
window.MeCung.sig = sig;
})();
