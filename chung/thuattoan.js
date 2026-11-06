/* MÔ PHỎNG CHẠY THUẬT TOÁN TỪNG BƯỚC (Tin 9 Bài 15)
   ThuatToan(box, tuỳ chọn) — thuật toán dạng liệt kê các bước; nhập dữ liệu (đầu vào), chạy từng bước,
   tô sáng bước đang thực hiện, bảng theo dõi giá trị các biến, đầu ra.
   Tuỳ chọn: title, note, vars:["x","max"], input:"5, 12, 7, 0", inputHint, speed
     lines:[{n:"1.", t:"html", ind:0, inp:"x" | f:function(e, note){ … return chỉ số dòng tiếp | "end" | undefined } | out:function(e){ return chuỗi }, end:true}]
     check(x) → [[nhãn, đúng?],…]; x = {runs:[{inputs, outputs, done, steps, used}]}  */
(function(){
"use strict";
var CSS = ".tt{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:10px;min-width:0}"
 + ".tt .t{font-weight:700}.tt .note{font-size:13px;opacity:.85}.tt .msg{font-size:14px;min-height:1.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}.tt .msg.bad{background:#fde2df;color:#7a1f15}.tt .msg.good{background:#d9f2e4;color:#14583c}"
 + ".tt .xbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}"
 + ".tt .xbar input[type=text]{font:inherit;font-size:14px;padding:4px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;flex:1 1 200px;min-width:0;width:auto}"
 + ".tt button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".tt button.pri{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}"
 + ".tt .lay{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:start}@media (max-width:760px){.tt .lay{grid-template-columns:minmax(0,1fr)}}"
 + ".tt .pg{font-size:14.5px;line-height:1.45;background:var(--surface,#fff);border:1px solid var(--line);border-radius:8px;padding:6px 8px;display:grid;gap:1px;overflow-x:auto}"
 + ".tt .pg .ln{padding:2px 6px;border-radius:5px;white-space:nowrap}.tt .pg .ln.on{background:#fff3c4;color:#222;box-shadow:0 0 0 2px #e0a800 inset}.tt .pg .ln.was{background:var(--sunk)}"
 + ".tt .vs{display:flex;flex-wrap:wrap;gap:6px}.tt .vs span{border:1px solid var(--line);border-radius:8px;padding:3px 10px;font-size:14px;background:var(--surface,#fff)}.tt .vs span.ch{border-color:#e0a800;background:#fff3c4;color:#222}"
 + ".tt .vs i{font-style:italic}.tt .io{font-size:14px;display:grid;gap:4px}.tt .io b{font-weight:700}.tt .q{display:inline-block;border-radius:6px;padding:0 6px;margin:1px;background:var(--sunk);font-variant-numeric:tabular-nums}.tt .q.used{opacity:.45;text-decoration:line-through}.tt .q.nx{background:#cfe2f7;color:#123}"
 + ".tt .out{font-weight:700;color:#14583c}"
 + ".tt .tw{max-height:260px;overflow:auto;border:1px solid var(--line);border-radius:8px}.tt table{border-collapse:collapse;width:100%;font-size:13px}.tt th,.tt td{border-bottom:1px solid var(--line);padding:3px 6px;text-align:left;white-space:nowrap}.tt th{background:var(--sunk);position:sticky;top:0}"
 + ".tt .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.tt .ck li::before{content:'☐ '}.tt .ck li.ok::before{content:'☑ ';color:#1c7c54}.tt .ck li.ok{color:#1c7c54;font-weight:600}";
function addCss(){ var s = document.getElementById("thuattoan-css"); if (!s) { s = document.createElement("style"); s.id = "thuattoan-css"; document.head.appendChild(s); } s.textContent = CSS; }
function fmt(v){ if (v === undefined) return "?"; if (typeof v === "number") return String(+v.toFixed(6)).replace(".", ","); return String(v); }
function plain(h){ var d = document.createElement("div"); d.innerHTML = h; return d.textContent; }

window.ThuatToan = function(box, opt){
  opt = opt || {}; addCss();
  var L = opt.lines, V = opt.vars || [], runs = [], e, pc, queue, used, outs, steps, done, rows, timer = null, busy = false, last = -1, changed = {}, cur = null;
  var q$ = function(s){ return box.querySelector(s); };
  box.classList.add("tt");
  box.innerHTML = (opt.title ? '<div class="t">' + opt.title + "</div>" : "")
    + '<div class="xbar"><label for="tt-in-' + (++window.ThuatToan.n) + '" style="font-size:14px;font-weight:600">Đầu vào:</label><input type="text" id="tt-in-' + window.ThuatToan.n + '" data-in value="' + (opt.input || "") + '" placeholder="' + (opt.inputHint || "Các số, cách nhau bởi dấu phẩy") + '" autocomplete="off"></div>'
    + '<div class="xbar"><button type="button" class="pri" data-run>▶ Chạy</button><button type="button" data-step>Chạy từng bước</button><button type="button" data-rs>↺ Bắt đầu lại</button></div>'
    + '<div class="lay"><div class="pg" data-pg></div><div style="display:grid;gap:8px;min-width:0"><div class="vs" data-vs></div><div class="io" data-io></div><div class="tw"><table data-tb></table></div></div></div>'
    + '<div class="msg" data-msg></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + (opt.note ? '<div class="note">' + opt.note + "</div>" : "");
  q$("[data-pg]").innerHTML = L.map(function(l, i){ return '<div class="ln" data-l="' + i + '" style="padding-left:' + (6 + (l.ind || 0) * 22) + 'px">' + (l.n ? l.n + " " : "") + l.t + "</div>"; }).join("");
  function say(t, k){ var m = q$("[data-msg]"); m.innerHTML = t; m.className = "msg" + (k ? " " + k : ""); }
  function parse(){ var s = q$("[data-in]").value.trim(); if (!s) return []; var a = s.split(/[\s,;]+/).filter(Boolean).map(Number); return a.some(isNaN) ? null : a; }
  function reset(){ halt(); var p = parse(); e = {}; pc = 0; queue = p || []; used = 0; outs = []; steps = 0; done = false; rows = []; last = -1; changed = {}; cur = null; draw();
    if (!p) say("Đầu vào chỉ gồm các số, cách nhau bởi dấu phẩy hoặc dấu cách.", "bad"); else say("Bấm <b>Chạy từng bước</b> để thực hiện lần lượt từng bước, hoặc <b>▶ Chạy</b> để chạy hết."); return !!p; }
  function draw(){
    q$("[data-pg]").querySelectorAll(".ln").forEach(function(d){ var i = +d.dataset.l; d.classList.toggle("on", !done && i === pc); d.classList.toggle("was", i === last); });
    q$("[data-vs]").innerHTML = V.map(function(v){ return '<span class="' + (changed[v] ? "ch" : "") + '"><i>' + v + "</i> = <b>" + fmt(e[v]) + "</b></span>"; }).join("");
    q$("[data-io]").innerHTML = "<div><b>Dữ liệu chờ nhập:</b> " + (queue.length ? queue.map(function(x, i){ return '<span class="q' + (i < used ? " used" : i === used ? " nx" : "") + '">' + fmt(x) + "</span>"; }).join("") : "<i>(trống)</i>") + "</div>"
      + "<div><b>Đầu ra:</b> " + (outs.length ? outs.map(function(o){ return '<span class="out">' + o + "</span>"; }).join(", ") : "<i>(chưa có)</i>") + "</div>";
    q$("[data-tb]").innerHTML = "<tr><th>Lượt</th><th>Bước</th>" + V.map(function(v){ return "<th><i>" + v + "</i></th>"; }).join("") + "<th>Ghi chú</th></tr>"
      + rows.map(function(r){ return "<tr><td>" + r.k + "</td><td>" + r.n + "</td>" + V.map(function(v){ return "<td>" + fmt(r.v[v]) + "</td>"; }).join("") + "<td>" + r.note + "</td></tr>"; }).join("");
    var tw = q$(".tw"); tw.scrollTop = tw.scrollHeight;
    if (opt.check) q$("[data-ck]").innerHTML = opt.check({runs: runs}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function finish(ok, t, k){ done = true; halt(); if (cur) { cur.done = ok; cur.outputs = outs.slice(); cur.steps = steps; cur.used = used; } say(t, k); }
  function step(){
    if (done) return false;
    if (!cur) { cur = {inputs: queue.slice(), outputs: [], done: false, steps: 0, used: 0}; runs.push(cur); }
    var l = L[pc], nx, note = "", before = JSON.stringify(e); changed = {};
    if (steps > 3000) { finish(false, "Thuật toán chạy quá lâu – có thể vòng lặp không bao giờ kết thúc. Hãy kiểm tra đầu vào (dãy phải kết thúc bởi số 0).", "bad"); draw(); return false; }
    if (l.inp) { if (used >= queue.length) { finish(false, "Thuật toán cần <b>nhập " + l.inp + "</b> nhưng đã hết dữ liệu đầu vào. Hãy bổ sung đầu vào rồi bấm ↺ Bắt đầu lại.", "bad"); draw(); return false; }
      e[l.inp] = queue[used++]; note = "nhập " + l.inp + " = " + fmt(e[l.inp]); }
    if (l.f) nx = l.f(e, function(s){ note = note ? note + "; " + s : s; });
    if (l.out) { var o = l.out(e); outs.push(o); note = "xuất " + o; if (cur) cur.outputs = outs.slice(); }
    V.forEach(function(v){ if (JSON.stringify(JSON.parse(before)[v]) !== JSON.stringify(e[v])) changed[v] = 1; });
    if (!note) note = Object.keys(changed).map(function(v){ return v + " ← " + fmt(e[v]); }).join("; ");
    steps++; rows.push({k: steps, n: l.n || "", v: JSON.parse(JSON.stringify(e)), note: note}); last = pc;
    if (l.end || nx === "end") { pc = -1; finish(true, "✔ Thuật toán kết thúc. Đầu ra: <b>" + (outs.join(", ") || "(không có)") + "</b>.", "good"); draw(); return false; }
    pc = typeof nx === "number" ? nx : pc + 1;
    say("Vừa thực hiện bước <b>" + (l.n || "") + "</b> " + plain(l.t) + (note ? " → " + note : "") + ".");
    draw(); return true; }
  function delay(){ return opt.speed || 260; }
  function loop(){ if (!busy) return; if (step()) timer = setTimeout(loop, delay()); else busy = false; }
  function halt(){ busy = false; clearTimeout(timer); }
  q$("[data-run]").addEventListener("click", function(){ if (!reset()) return; busy = true; loop(); });
  q$("[data-step]").addEventListener("click", function(){ halt(); if (done) { if (!reset()) return; } else if (!cur) { var p = parse(); if (p === null) { reset(); return; } queue = p; used = 0; } step(); });
  q$("[data-rs]").addEventListener("click", reset);
  q$("[data-in]").addEventListener("change", reset);
  q$("[data-in]").addEventListener("keydown", function(ev){ if (ev.key === "Enter") { ev.preventDefault(); reset(); } });
  reset();
  return {runs: runs, step: step, reset: reset};
};
window.ThuatToan.n = 0;
})();
