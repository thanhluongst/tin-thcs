/* MÔ PHỎNG THUẬT TOÁN SẮP XẾP (Tin 7 Bài 16)
   SapXep(box, tuỳ chọn) — chạy từng bước thuật toán sắp xếp nổi bọt / sắp xếp chọn đúng như SGK:
     · nổi bọt: với mỗi vị trí i, so sánh từng cặp cạnh nhau từ cuối dãy lên vị trí i, phần tử sau "nhỏ hơn" thì hoán đổi;
     · chọn: với mỗi vị trí i, so sánh từng phần tử phía sau với phần tử tại vị trí i, "nhỏ hơn" thì hoán đổi ngay.
   Tuỳ chọn: title, note, algo ("bubble" | "selection"), algos (cho chọn thuật toán), items (số hoặc {k, label}),
             order ("asc" | "desc"), edit ("nums" | "named"), self (cho học sinh tự quyết định hoán đổi), speed,
             check(x) → [[nhãn, đúng?],…]; x = {log:[{algo, input, order, mode, mistakes, comps, swaps}]}
   HoanDoiCoc(box, tuỳ chọn) — trò chơi đổi chỗ hai chất lỏng bằng cốc thứ ba (Hoạt động khởi động). */
(function(){
"use strict";
var CSS = ".sx{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:10px;min-width:0}"
 + ".sx .t{font-weight:700}.sx .note{font-size:13px;opacity:.85}.sx .msg{font-size:14px;min-height:2.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}"
 + ".sx .xbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}"
 + ".sx .xbar input,.sx .xbar select{font:inherit;font-size:14px;padding:4px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;min-width:0;max-width:100%}"
 + ".sx button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".sx button.pri{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}.sx button:disabled{opacity:.45;cursor:default}"
 + ".sx button.swp{background:#c0392b;border-color:#c0392b;color:#fff}.sx button.kh{background:#2f6fb3;border-color:#2f6fb3;color:#fff}"
 + ".sx .cards{display:flex;flex-wrap:wrap;gap:8px;padding:6px 0}"
 + ".sx .cd{border:2px solid var(--line);border-radius:10px;padding:4px 6px;min-width:52px;text-align:center;background:var(--surface,#fff);transition:background .25s,border-color .25s,transform .25s}"
 + ".sx .cd small{display:block;font-size:11px;opacity:.6}.sx .cd b{display:block;font-size:20px;line-height:1.25}.sx .cd i{display:block;font-style:normal;font-size:12px;max-width:110px;overflow-wrap:anywhere}"
 + ".sx .cd.k-done{background:#d5d8dc;border-color:#aab;color:#222}.sx .cd.k-pos{border-color:#2f6fb3;box-shadow:0 0 0 2px #2f6fb3 inset}"
 + ".sx .cd.k-cmp{border-color:#e0a800;background:#fff3c4;color:#222;transform:translateY(-3px)}.sx .cd.k-sw{border-color:#c0392b;background:#fde2df;color:#222;transform:translateY(-3px)}"
 + ".sx .cd.k-fin{border-color:#1c7c54;background:#d9f2e4;color:#222}"
 + ".sx .grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:start}@media (max-width:980px){.sx .grid{grid-template-columns:1fr}}"
 + ".sx .tw{overflow-x:auto;max-height:340px;overflow-y:auto}"
 + ".sx table{border-collapse:collapse;width:100%;font-size:13px}.sx th,.sx td{border:1px solid var(--line);padding:3px 6px;text-align:left}.sx th{background:var(--sunk);position:sticky;top:0}"
 + ".sx td.yes{color:#c0392b;font-weight:700}.sx td.no{color:#2f6fb3}.sx tr.end td{background:var(--sunk);font-weight:700}"
 + ".sx .st{font-size:13.5px;display:grid;gap:2px}.sx .st div{padding:2px 6px;border-radius:5px}.sx .st div.on{background:#fff3c4;font-weight:600;color:#222}"
 + ".sx .cnt{font-size:13px;opacity:.85}"
 + ".sx textarea{width:100%;box-sizing:border-box;font:13px Consolas,monospace;border:1px solid var(--line);border-radius:6px;padding:6px;min-height:110px;background:var(--bg,#fff);color:inherit}"
 + ".sx .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.sx .ck li::before{content:'☐ '}.sx .ck li.ok::before{content:'☑ ';color:#1c7c54}.sx .ck li.ok{color:#1c7c54;font-weight:600}"
 /* cốc */
 + ".sx .cups{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-end;padding:6px 2px}"
 + ".sx .cup{width:74px;height:96px;border:3px solid #7a8a99;border-top:none;border-radius:0 0 14px 14px;position:relative;cursor:pointer;background:#fff;overflow:hidden}"
 + ".sx .cup .liq{position:absolute;left:0;right:0;bottom:0;height:70%;transition:height .35s}.sx .cup .nm{position:absolute;left:0;right:0;bottom:6px;text-align:center;font-weight:700;color:#222;font-size:18px}"
 + ".sx .cup.sel{box-shadow:0 0 0 4px #ffd54f}.sx .cupw{display:grid;gap:4px;justify-items:center;font-size:12.5px}";
function addCss(){ var s = document.getElementById("sapxep-css"); if (!s) { s = document.createElement("style"); s.id = "sapxep-css"; document.head.appendChild(s); } s.textContent = CSS; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function cmp(a, b){ if (typeof a === "number" && typeof b === "number") return a - b; return String(a).localeCompare(String(b), "vi", {sensitivity: "base"}); }
var NAME = {bubble: "Sắp xếp nổi bọt", selection: "Sắp xếp chọn"};
function stepsText(algo, desc){
  var nho = desc ? "lớn hơn" : "nhỏ hơn", nn = desc ? "lớn nhất" : "nhỏ nhất";
  if (algo === "bubble") return [
    ["cmp", "So sánh hai phần tử đứng cạnh nhau, theo thứ tự từ cuối dãy lên vị trí đang xét."],
    ["swap", "Nếu phần tử đứng sau " + nho + " phần tử đứng trước thì đổi chỗ chúng cho nhau."],
    ["end", "Cuối vòng lặp: phần tử " + nn + " (của phần chưa sắp xếp) “nổi” lên vị trí đang xét."],
    ["next", "Tương tự với vị trí tiếp theo, … đến vị trí trước vị trí cuối cùng."],
    ["fin", "Kết thúc: dãy đã được sắp xếp theo thứ tự " + (desc ? "giảm dần" : "tăng dần") + "."]];
  return [
    ["cmp", "So sánh từng phần tử (từ vị trí ngay sau vị trí đang xét đến cuối dãy) với phần tử tại vị trí đang xét."],
    ["swap", "Nếu phần tử được xét " + nho + " phần tử tại vị trí đang xét thì hoán đổi nó với phần tử tại vị trí đang xét."],
    ["end", "Cuối vòng lặp: phần tử " + nn + " (của phần chưa sắp xếp) được đưa về vị trí đang xét."],
    ["next", "Tương tự với vị trí tiếp theo, … đến vị trí trước vị trí cuối cùng."],
    ["fin", "Kết thúc: dãy đã được sắp xếp theo thứ tự " + (desc ? "giảm dần" : "tăng dần") + "."]];
}
var THU = ["nhất","hai","ba","tư","năm","sáu","bảy","tám","chín","mười"];
function thu(i){ return "thứ " + (THU[i] || (i + 1)); }
/* Lập sẵn toàn bộ các khung hình của thuật toán */
function trace(items, algo, desc){
  var a = items.slice(), F = [], n = a.length, comps = 0, swaps = 0;
  function less(x, y){ var c = cmp(x.k, y.k); return desc ? c > 0 : c < 0; }
  function show(x){ return x.label ? x.label + " (" + x.k + ")" : String(x.k); }
  var sign = desc ? ">" : "<";
  F.push({t: "start", a: a.slice(), done: 0, msg: "Đầu vào: " + a.map(function(x){ return x.k; }).join(", ") + ". Bấm “Bước tiếp” để bắt đầu vòng lặp thứ nhất (xét vị trí đầu tiên)."});
  for (var i = 0; i < n - 1; i++) {
    var loopSw = 0;
    var js = [];
    if (algo === "bubble") for (var j = n - 1; j > i; j--) js.push([j, j - 1]); else for (var j2 = i + 1; j2 < n; j2++) js.push([j2, i]);
    js.forEach(function(p){
      var later = p[0], earlier = p[1], x = a[later], y = a[earlier], sw = less(x, y);
      comps++;
      var cmpTxt = sw ? x.k + " " + sign + " " + y.k + " ⇒ hoán đổi" : "KHÔNG " + x.k + " " + sign + " " + y.k + " ⇒ không hoán đổi";
      F.push({t: "cmp", a: a.slice(), loop: i, pair: [earlier, later], sw: sw, done: i, cmpTxt: cmpTxt,
        msg: "Vòng lặp " + thu(i) + " (vị trí " + (i + 1) + "): so sánh " + show(x) + " ở vị trí " + (later + 1) + " với " + show(y) + " ở vị trí " + (earlier + 1) + "."});
      if (sw) { a[later] = y; a[earlier] = x; swaps++; loopSw++;
        F.push({t: "swap", a: a.slice(), loop: i, pair: [earlier, later], done: i, row: {loop: i, pair: [earlier + 1, later + 1], txt: cmpTxt, sw: true, arr: a.slice()},
          msg: x.k + " " + sign + " " + y.k + " nên hoán đổi: " + x.k + " lên vị trí " + (earlier + 1) + ", " + y.k + " xuống vị trí " + (later + 1) + "."}); }
      else F[F.length - 1].row = {loop: i, pair: [earlier + 1, later + 1], txt: cmpTxt, sw: false, arr: a.slice()};
    });
    F.push({t: "end", a: a.slice(), loop: i, done: i + 1, row: {loop: i, end: true, arr: a.slice()},
      msg: "Kết thúc vòng lặp " + thu(i) + ": phần tử " + (desc ? "lớn" : "nhỏ") + " " + (i ? thu(i) : "nhất") + " là " + a[i].k + " đã ở vị trí " + (i + 1) + (loopSw ? " (" + loopSw + " lần hoán đổi)." : " (vòng này không có hoán đổi nào).")});
  }
  F.push({t: "fin", a: a.slice(), done: n, comps: comps, swaps: swaps,
    msg: "Đầu ra: " + a.map(function(x){ return x.label ? x.label + " " + x.k : x.k; }).join(", ") + ". Tổng cộng " + comps + " lần so sánh, " + swaps + " lần hoán đổi."});
  return F;
}
function parseItems(text, named){
  var lines = String(text || "").split(/\n/).map(function(s){ return s.trim(); }).filter(Boolean);
  if (!named) { var parts = lines.join(" ").split(/[\s,;]+/).filter(Boolean);
    return parts.map(function(p){ var v = Number(p.replace(",", ".")); return {k: isNaN(v) ? p : v}; }); }
  return lines.map(function(l){ var m = l.match(/^(.*?)[\s:;,\-–]+(-?\d+(?:[.,]\d+)?)$/);
    if (m) return {label: m[1].trim(), k: Number(m[2].replace(",", "."))};
    var v = Number(l.replace(",", ".")); return {k: isNaN(v) ? l : v}; });
}
window.SapXep = function(box, opt){
  addCss(); opt = opt || {};
  var algo = opt.algo || "bubble", desc = opt.order === "desc", named = opt.edit === "named";
  var items = (opt.items || []).map(function(x){ return typeof x === "object" ? {k: x.k, label: x.label} : {k: x}; });
  var F, pos, timer = null, mode = "auto", mistakes = 0, waiting = false, log = [], rows = [], q = function(s){ return box.querySelector(s); };
  box.classList.add("sx");
  var algoSel = opt.algos ? '<label>Thuật toán: <select data-algo>' + opt.algos.map(function(a){ return '<option value="' + a + '"' + (a === algo ? " selected" : "") + ">" + NAME[a] + "</option>"; }).join("") + "</select></label>" : "";
  var editor = opt.edit === "nums" ? '<label>Dãy số: <input data-ed type="text" size="22"></label><button type="button" data-a="apply">Dùng dãy này</button>'
    : (named ? "" : "");
  box.innerHTML = '<div class="t">' + esc(opt.title || "Mô phỏng thuật toán sắp xếp") + "</div>"
    + '<div class="xbar">' + algoSel + editor
    + (opt.self ? '<label>Cách làm: <select data-mode><option value="auto">Máy chạy từng bước</option><option value="self">Em tự quyết định hoán đổi</option></select></label>' : "") + "</div>"
    + (named ? '<details><summary style="cursor:pointer;font-size:13.5px">Sửa danh sách (mỗi dòng: Tên, điểm)</summary><textarea data-ed></textarea><div class="xbar"><button type="button" data-a="apply">Dùng danh sách này</button></div></details>' : "")
    + '<div class="cards" data-cards></div>'
    + '<div class="xbar" data-btns></div>'
    + '<div class="msg" data-msg aria-live="polite"></div><div class="cnt" data-cnt></div>'
    + '<div class="grid"><div class="st" data-st></div><div class="tw"><table><thead><tr><th>Vòng lặp</th><th>So sánh vị trí</th><th>Kết quả</th><th>Dãy sau bước</th></tr></thead><tbody data-rows></tbody></table></div></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + (opt.note ? '<div class="note">' + opt.note + "</div>" : "");
  function fillEditor(){ var ed = q("[data-ed]"); if (!ed) return;
    ed.value = named ? items.map(function(x){ return (x.label ? x.label + ", " : "") + x.k; }).join("\n") : items.map(function(x){ return x.k; }).join(" "); }
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }
  function reset(){ stop(); F = trace(items, algo, desc); pos = 0; rows = []; mistakes = 0; waiting = false; render(); }
  function cur(){ return F[pos]; }
  function render(){
    var f = cur(), a = f.a;
    q("[data-cards]").innerHTML = a.map(function(x, i){
      var c = "";
      if (f.t === "fin") c = "k-fin"; else if (i < f.done) c = "k-done";
      if (algo === "selection" && (f.t === "cmp" || f.t === "swap") && i === f.loop) c += " k-pos";
      if (f.pair && f.pair.indexOf(i) >= 0) c += f.t === "swap" ? " k-sw" : " k-cmp";
      return '<div class="cd ' + c + '"><small>' + (i + 1) + "</small><b>" + esc(x.k) + "</b>" + (x.label ? "<i>" + esc(x.label) + "</i>" : "") + "</div>"; }).join("");
    var key = f.t === "swap" ? "swap" : f.t === "cmp" ? "cmp" : f.t === "end" ? "end" : f.t === "fin" ? "fin" : "";
    if (f.t === "start" && pos > 0) key = "next";
    q("[data-st]").innerHTML = '<b style="font-size:13.5px">' + NAME[algo] + " – các bước (" + (desc ? "giảm dần" : "tăng dần") + ")</b>"
      + stepsText(algo, desc).map(function(s, i){ return '<div class="' + (s[0] === key ? "on" : "") + '">' + (i + 1) + ". " + s[1] + "</div>"; }).join("");
    q("[data-msg]").textContent = f.msg + (waiting ? " Em quyết định: có hoán đổi không?" : "");
    q("[data-rows]").innerHTML = rows.map(function(r){
      var arr = r.arr.map(function(x){ return x.k; }).join(" ");
      if (r.end) return '<tr class="end"><td colspan="3">Kết quả vòng lặp ' + thu(r.loop) + "</td><td>" + esc(arr) + "</td></tr>";
      return "<tr><td>" + (r.loop + 1) + "</td><td>" + r.pair[0] + " – " + r.pair[1] + '</td><td class="' + (r.sw ? "yes" : "no") + '">' + esc(r.txt) + "</td><td>" + esc(arr) + "</td></tr>"; }).join("");
    var tw = q(".tw"); tw.scrollTop = tw.scrollHeight;
    var comps = F.slice(0, pos + 1).filter(function(x){ return x.t === "cmp"; }).length, sws = F.slice(0, pos + 1).filter(function(x){ return x.t === "swap"; }).length;
    q("[data-cnt]").textContent = "Đã so sánh: " + comps + " lần · Đã hoán đổi: " + sws + " lần" + (mode === "self" ? " · Em quyết định sai: " + mistakes + " lần" : "");
    var b = q("[data-btns]"), end = f.t === "fin";
    if (waiting) b.innerHTML = '<button type="button" class="swp" data-a="yes">⇄ Hoán đổi</button><button type="button" class="kh" data-a="no">→ Không hoán đổi</button><button type="button" data-a="reset">↺ Làm lại</button>';
    else b.innerHTML = '<button type="button" class="pri" data-a="step"' + (end ? " disabled" : "") + ">▶ Bước tiếp</button>"
      + (mode === "auto" ? '<button type="button" data-a="run"' + (end ? " disabled" : "") + ">" + (timer ? "⏸ Dừng" : "⏩ Chạy tự động") + "</button>" : "")
      + '<button type="button" data-a="reset">↺ Làm lại</button>';
    if (opt.check) q("[data-ck]").innerHTML = opt.check({log: log, algo: algo}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function advance(){
    if (pos >= F.length - 1) { stop(); return; }
    pos++; var f = cur();
    if (mode === "self" && f.t === "cmp") waiting = true;
    else if (f.row) rows.push(f.row);
    if (f.t === "fin") { stop(); log.push({algo: algo, input: items.map(function(x){ return x.k; }).join(" "), order: desc ? "desc" : "asc", mode: mode, mistakes: mistakes, comps: f.comps, swaps: f.swaps}); }
    render();
  }
  function decide(yes){
    var f = cur();
    if (yes !== f.sw) { mistakes++; q("[data-msg]").textContent = "Chưa đúng: " + f.cmpTxt.replace("KHÔNG ", "không phải ") + ". Em thử lại."; q("[data-cnt]").textContent = q("[data-cnt]").textContent.replace(/sai: \d+/, "sai: " + mistakes); return; }
    waiting = false; if (f.row) rows.push(f.row);
    advance();
  }
  box.addEventListener("click", function(ev){ var t = ev.target.closest("[data-a]"); if (!t || !box.contains(t)) return; var a = t.dataset.a;
    if (a === "step") { stop(); advance(); }
    else if (a === "run") { if (timer) { stop(); render(); } else { timer = setInterval(advance, opt.speed || 900); advance(); } }
    else if (a === "reset") reset();
    else if (a === "yes") decide(true);
    else if (a === "no") decide(false);
    else if (a === "apply") { var it = parseItems(q("[data-ed]").value, named); if (it.length < 2) { q("[data-msg]").textContent = "Cần ít nhất 2 phần tử."; return; } if (it.length > 12) it = it.slice(0, 12); items = it; reset(); }
  });
  var as = q("[data-algo]"); if (as) as.addEventListener("change", function(){ algo = this.value; reset(); });
  var ms = q("[data-mode]"); if (ms) ms.addEventListener("change", function(){ mode = this.value; reset(); });
  fillEditor(); reset();
  return {log: function(){ return log; }};
};
/* Hoạt động khởi động: đổi chỗ chất lỏng hai cốc A, B nhờ cốc C */
window.HoanDoiCoc = function(box, opt){
  addCss(); opt = opt || {};
  var COL = {xanh: "#4a5fc1", "đỏ": "#e0413a"};
  var st, sel, moves, log = [], q = function(s){ return box.querySelector(s); };
  box.classList.add("sx");
  box.innerHTML = '<div class="t">' + esc(opt.title || "Đổi chỗ hai chất lỏng") + "</div>"
    + '<div class="cups" data-cups></div><div class="xbar"><button type="button" data-a="reset">↺ Làm lại</button></div>'
    + '<div class="msg" data-msg aria-live="polite"></div><div class="cnt" data-mv></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + (opt.note ? '<div class="note">' + opt.note + "</div>" : "");
  function reset(){ st = {A: "xanh", B: "đỏ", C: null}; sel = null; moves = []; say("Nháy vào một cốc để chọn cốc rót, rồi nháy vào cốc muốn rót sang. Mục tiêu: cốc A đựng chất lỏng màu đỏ, cốc B đựng chất lỏng màu xanh."); draw(); }
  function say(t){ q("[data-msg]").textContent = t; }
  function draw(){
    q("[data-cups]").innerHTML = ["A","B","C"].map(function(k){ var c = st[k];
      return '<div class="cupw"><div class="cup' + (sel === k ? " sel" : "") + '" data-c="' + k + '" role="button" tabindex="0" aria-label="Cốc ' + k + (c ? " đựng chất lỏng màu " + c : " rỗng") + '"><div class="liq" style="height:' + (c ? 70 : 0) + "%;background:" + (c ? COL[c] : "transparent") + '"></div><div class="nm">' + k + "</div></div><span>" + (c ? "màu " + c : "(rỗng)") + "</span></div>"; }).join("");
    q("[data-mv]").textContent = moves.length ? "Các lần rót: " + moves.join(" ; ") : "";
    box.querySelectorAll("[data-c]").forEach(function(e){ e.addEventListener("click", function(){ pick(e.dataset.c); }); e.addEventListener("keydown", function(ev){ if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(e.dataset.c); } }); });
    if (opt.check) q("[data-ck]").innerHTML = opt.check({log: log}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function pick(k){
    if (st.A === "đỏ" && st.B === "xanh") return;
    if (!sel) { if (!st[k]) { say("Cốc " + k + " đang rỗng, hãy chọn cốc có chất lỏng để rót."); return; } sel = k; say("Rót cốc " + k + " sang cốc nào?"); draw(); return; }
    if (k === sel) { sel = null; say("Đã bỏ chọn."); draw(); return; }
    if (st[k]) { say("Cốc " + k + " đang có chất lỏng: rót vào sẽ bị trộn lẫn hai màu! Hãy rót sang cốc rỗng."); return; }
    st[k] = st[sel]; st[sel] = null; moves.push("Rót " + sel + " → " + k); sel = null;
    if (st.A === "đỏ" && st.B === "xanh") { log.push({moves: moves.length}); say("Hoàn thành sau " + moves.length + " lần rót! Cốc C giúp “giữ tạm” một chất lỏng — đó chính là cách hoán đổi giá trị hai phần tử. 🎉"); }
    else say("Đã rót. Tiếp tục…");
    draw();
  }
  q('[data-a="reset"]').addEventListener("click", reset);
  reset();
  return {log: function(){ return log; }};
};
})();
