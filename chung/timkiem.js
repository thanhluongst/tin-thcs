/* MÔ PHỎNG THUẬT TOÁN TÌM KIẾM TUẦN TỰ (Tin 7 Bài 14)
   TimKiem(phần tử, tuỳ chọn) — chạy từng bước theo sơ đồ khối, tô sáng khối đang thực hiện, phần tử đang xét,
   tự lập bảng các bước (lần lặp, phần tử, có đúng cần tìm?, đã hết danh sách?).
   Tuỳ chọn: title, note, items[{k, v}] (k: giá trị so sánh, v: thông tin trả ra), target, kName ("Họ tên"), vName ("Địa chỉ"),
             editable (cho sửa danh sách), check(x) → [[nhãn, đúng?],…]; x = {log:[{target, result, steps}], items, target} */
(function(){
"use strict";
var CSS = ".tk{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:10px;min-width:0}"
 + ".tk .t{font-weight:700}.tk .note{font-size:13px;opacity:.85}.tk .msg{font-size:14px;min-height:2.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}"
 + ".tk .bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}"
 + ".tk .bar input,.tk .bar select{font:inherit;font-size:14px;padding:4px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;min-width:0}"
 + ".tk .bar button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".tk .bar button.pri{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}.tk .bar button:disabled{opacity:.45;cursor:default}"
 + ".tk .cards{display:flex;flex-wrap:wrap;gap:6px}"
 + ".tk .cd{border:2px solid var(--line);border-radius:8px;padding:4px 8px;min-width:76px;background:var(--surface,#fff);font-size:13.5px;transition:background .2s,border-color .2s}"
 + ".tk .cd small{display:block;font-size:11px;opacity:.65}.tk .cd b{display:block}"
 + ".tk .cd.seen{opacity:.5}.tk .cd.cur{border-color:#e0a800;background:#fff3c4;color:#222}.tk .cd.ok{border-color:#1c7c54;background:#d9f2e4;color:#222}"
 + ".tk .grid{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:12px;align-items:start}@media (max-width:700px){.tk .grid{grid-template-columns:1fr}}"
 + ".tk svg{width:100%;height:auto;display:block;background:#fff;border:1px solid var(--line);border-radius:8px}"
 + ".tk svg .b rect,.tk svg .b polygon,.tk svg .b ellipse{stroke:#555;stroke-width:1;transition:fill .2s}.tk svg .b text{font:11px 'Be Vietnam Pro',sans-serif;fill:#222}"
 + ".tk svg .b.on rect,.tk svg .b.on polygon,.tk svg .b.on ellipse{fill:#ffd54f!important;stroke:#c77700;stroke-width:2.5}"
 + ".tk svg line,.tk svg path{stroke:#555;stroke-width:1.3;fill:none}.tk svg .lb{font:10.5px sans-serif;fill:#333}"
 + ".tk table{border-collapse:collapse;width:100%;font-size:13.5px}.tk th,.tk td{border:1px solid var(--line);padding:3px 6px;text-align:left}.tk th{background:var(--sunk)}"
 + ".tk td.yes{color:#1c7c54;font-weight:700}.tk td.no{color:#c0392b}"
 + ".tk .st{font-size:13.5px;display:grid;gap:2px}.tk .st div{padding:2px 6px;border-radius:5px}.tk .st div.on{background:#fff3c4;font-weight:600;color:#222}"
 + ".tk textarea{width:100%;box-sizing:border-box;font:13px Consolas,monospace;border:1px solid var(--line);border-radius:6px;padding:6px;min-height:90px;background:var(--bg,#fff);color:inherit}"
 + ".tk .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}.tk .ck li::before{content:'☐ '}.tk .ck li.ok::before{content:'☑ ';color:#1c7c54}.tk .ck li.ok{color:#1c7c54;font-weight:600}";
function addCss(){ var s = document.getElementById("timkiem-css"); if (!s) { s = document.createElement("style"); s.id = "timkiem-css"; document.head.appendChild(s); } s.textContent = CSS; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function norm(s){ return String(s || "").normalize("NFC").trim().toLowerCase().replace(/\s+/g, " "); }
/* Sơ đồ khối Hình 14.1 */
var FLOW = '<svg viewBox="0 0 300 470" role="img" aria-label="Sơ đồ khối thuật toán tìm kiếm tuần tự">'
 + '<defs><marker id="tkar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#555" stroke="none"/></marker></defs>'
 + '<g class="b" data-b="start"><ellipse cx="110" cy="20" rx="50" ry="14" fill="#f9c6d3"/><text x="110" y="24" text-anchor="middle">Bắt đầu</text></g>'
 + '<g class="b" data-b="input"><polygon points="45,48 185,48 175,82 35,82" fill="#bfe6dc"/><text x="110" y="62" text-anchor="middle">Danh sách, giá trị</text><text x="110" y="76" text-anchor="middle">cần tìm</text></g>'
 + '<g class="b" data-b="first"><rect x="30" y="102" width="160" height="26" fill="#fff5b8"/><text x="110" y="119" text-anchor="middle">Xem phần tử đầu tiên</text></g>'
 + '<g class="b" data-b="cmp"><polygon points="110,152 190,186 110,220 30,186" fill="#9ed49a"/><text x="110" y="183" text-anchor="middle">Có đúng giá trị</text><text x="110" y="197" text-anchor="middle">cần tìm không?</text></g>'
 + '<g class="b" data-b="found"><polygon points="215,170 295,170 287,202 207,202" fill="#bfe6dc"/><text x="251" y="183" text-anchor="middle">Ghi ra</text><text x="251" y="196" text-anchor="middle">kết quả</text></g>'
 + '<g class="b" data-b="last"><polygon points="110,250 190,284 110,318 30,284" fill="#9ed49a"/><text x="110" y="281" text-anchor="middle">Đã hết</text><text x="110" y="295" text-anchor="middle">danh sách chưa?</text></g>'
 + '<g class="b" data-b="notfound"><polygon points="215,268 295,268 287,300 207,300" fill="#bfe6dc"/><text x="251" y="281" text-anchor="middle">Không</text><text x="251" y="294" text-anchor="middle">tìm thấy</text></g>'
 + '<g class="b" data-b="next"><rect x="30" y="344" width="160" height="26" fill="#fff5b8"/><text x="110" y="361" text-anchor="middle">Xem phần tử tiếp theo</text></g>'
 + '<g class="b" data-b="end"><ellipse cx="251" cy="430" rx="44" ry="14" fill="#f9c6d3"/><text x="251" y="434" text-anchor="middle">Kết thúc</text></g>'
 + '<line x1="110" y1="34" x2="110" y2="47" marker-end="url(#tkar)"/><line x1="110" y1="82" x2="110" y2="101" marker-end="url(#tkar)"/><line x1="110" y1="128" x2="110" y2="151" marker-end="url(#tkar)"/>'
 + '<line x1="190" y1="186" x2="208" y2="186" marker-end="url(#tkar)"/><text class="lb" x="192" y="180">Đúng</text>'
 + '<line x1="110" y1="220" x2="110" y2="249" marker-end="url(#tkar)"/><text class="lb" x="114" y="238">Sai</text>'
 + '<line x1="190" y1="284" x2="208" y2="284" marker-end="url(#tkar)"/><text class="lb" x="192" y="278">Đúng</text>'
 + '<line x1="110" y1="318" x2="110" y2="343" marker-end="url(#tkar)"/><text class="lb" x="114" y="334">Sai</text>'
 + '<path d="M30 357 H12 V140 H108" marker-end="url(#tkar)"/>'
 + '<path d="M291 186 H298 V415" marker-end="url(#tkar)"/><path d="M291 284 H298"/>'
 + "</svg>";
var STEPS = [["first","Bước 1. Xét vị trí đầu tiên của danh sách."],["cmp","Bước 2. Nếu giá trị ở vị trí đang xét bằng giá trị cần tìm thì chuyển sang Bước 4, nếu không thì chuyển đến vị trí tiếp theo."],
  ["last","Bước 3. Kiểm tra đã hết danh sách chưa. Nếu đã hết thì chuyển sang Bước 5, nếu chưa thì lặp lại từ Bước 2."],["found","Bước 4. Trả lời “Tìm thấy” và chỉ ra vị trí phần tử tìm được; Kết thúc."],["notfound","Bước 5. Trả lời “Không tìm thấy”; Kết thúc."]];

window.TimKiem = function(box, opt){
  addCss(); opt = opt || {};
  var items = (opt.items || []).slice(), kName = opt.kName || "Giá trị", vName = opt.vName || "", log = [], st, timer = null;
  box.classList.add("tk");
  box.innerHTML = '<div class="t">' + esc(opt.title || "Mô phỏng thuật toán tìm kiếm tuần tự") + "</div>"
    + (opt.editable ? '<details><summary style="cursor:pointer;font-size:14px">✎ Sửa danh sách (mỗi dòng một phần tử' + (vName ? ", dạng: " + esc(kName) + " | " + esc(vName) : "") + ")</summary><textarea data-ed></textarea><div class='bar'><button type='button' data-a='apply'>Dùng danh sách này</button></div></details>" : "")
    + '<div class="bar"><label>Cần tìm: <input data-tg value="' + esc(opt.target || "") + '" placeholder="' + esc(kName) + ' cần tìm" style="width:12em"></label>'
    + '<button type="button" class="pri" data-a="step">▶ Bước tiếp</button><button type="button" data-a="auto">⏩ Chạy tự động</button><button type="button" data-a="reset">↺ Làm lại</button></div>'
    + '<div class="cards" data-cards></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + '<div class="grid"><div>' + FLOW + '</div><div style="display:grid;gap:8px;min-width:0"><div class="st" data-st></div><div style="overflow-x:auto"><table data-tb></table></div></div></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  var q = function(s){ return box.querySelector(s); };
  function fill(){ var ed = q("[data-ed]"); if (ed) ed.value = items.map(function(x){ return x.k + (vName ? " | " + (x.v || "") : ""); }).join("\n"); }
  function reset(){ clearInterval(timer); timer = null; st = {b: "start", i: -1, rows: [], done: false, res: null}; draw("Nhập giá trị cần tìm rồi bấm ▶ Bước tiếp để chạy từng bước theo sơ đồ khối (hoặc ⏩ Chạy tự động)."); }
  function target(){ return q("[data-tg]").value.trim(); }
  function draw(m){
    q("[data-cards]").innerHTML = items.map(function(x, i){ var c = st.res === "found" && i === st.i ? "ok" : i === st.i && !st.done ? "cur" : i < st.i || (st.done && i <= st.i) ? "seen" : "";
      return '<div class="cd ' + c + '"><small>Vị trí ' + (i + 1) + "</small><b>" + esc(x.k) + "</b>" + (vName && x.v ? "<small>" + esc(x.v) + "</small>" : "") + "</div>"; }).join("");
    box.querySelectorAll("svg .b").forEach(function(g){ g.classList.toggle("on", g.dataset.b === st.b); });
    var sb = {first:0, cmp:1, next:1, last:2, found:3, notfound:4}[st.b];
    q("[data-st]").innerHTML = "<b>Mô tả bằng ngôn ngữ tự nhiên</b>" + STEPS.map(function(s, i){ return '<div class="' + (i === sb ? "on" : "") + '">' + esc(s[1]) + "</div>"; }).join("");
    q("[data-tb]").innerHTML = "<tr><th>Lần lặp</th><th>" + esc(kName) + "</th><th>Có đúng cần tìm không?</th><th>Có đúng là đã hết danh sách không?</th>" + (st.res ? "<th>Đầu ra</th>" : "") + "</tr>"
      + st.rows.map(function(r, i){ return "<tr><td>" + (i + 1) + "</td><td>" + esc(r.k) + '</td><td class="' + (r.eq == null ? "" : r.eq ? "yes" : "no") + '">' + (r.eq == null ? "" : r.eq ? "Đúng" : "Sai") + '</td><td class="' + (r.last == null ? "" : r.last ? "yes" : "no") + '">' + (r.last == null ? (r.eq ? "–" : "") : r.last ? "Đúng" : "Sai") + "</td>" + (st.res ? "<td>" + esc(r.out || "") + "</td>" : "") + "</tr>"; }).join("");
    if (m != null) q("[data-msg]").textContent = m;
    q('[data-a="step"]').disabled = st.done; q('[data-a="auto"]').textContent = timer ? "⏸ Dừng" : "⏩ Chạy tự động"; q('[data-a="auto"]').disabled = st.done && !timer;
    if (opt.check) q("[data-ck]").innerHTML = opt.check({log: log, items: items, target: target()}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function step(){
    var tg = target(), n = items.length, r = st.rows[st.rows.length - 1], m;
    if (st.done) return;
    if (!tg && st.b === "start") { draw("Hãy nhập giá trị cần tìm trước."); return; }
    switch (st.b) {
      case "start": st.b = "input"; m = "Đầu vào: danh sách " + n + " phần tử; " + kName.toLowerCase() + " cần tìm là “" + tg + "”."; break;
      case "input": st.b = "first"; st.i = 0; st.rows.push({k: items[0].k}); m = "Xem phần tử đầu tiên (vị trí 1): " + items[0].k + "."; break;
      case "first": case "next": st.b = "cmp"; r.eq = norm(items[st.i].k) === norm(tg); m = "So sánh “" + items[st.i].k + "” với “" + tg + "”: " + (r.eq ? "ĐÚNG." : "sai."); break;
      case "cmp": if (r.eq) { st.b = "found"; st.res = "found"; r.out = "Tìm thấy ở vị trí " + (st.i + 1) + (items[st.i].v ? ": " + items[st.i].v : ""); m = "Tìm thấy “" + tg + "” ở vị trí " + (st.i + 1) + (items[st.i].v ? ". " + vName + ": " + items[st.i].v : "") + "."; }
        else { st.b = "last"; r.last = st.i === n - 1; m = "Kiểm tra đã hết danh sách chưa? " + (r.last ? "ĐÃ HẾT (đây là phần tử cuối)." : "Chưa hết (còn " + (n - st.i - 1) + " phần tử)."); } break;
      case "last": if (r.last) { st.b = "notfound"; st.res = "notfound"; r.out = "Không tìm thấy"; m = "Đã xét hết danh sách mà không thấy “" + tg + "”: Không tìm thấy."; }
        else { st.b = "next"; st.i++; st.rows.push({k: items[st.i].k}); m = "Xem phần tử tiếp theo (vị trí " + (st.i + 1) + "): " + items[st.i].k + ". Quay lại kiểm tra điều kiện thứ nhất."; } break;
      case "found": case "notfound": st.b = "end"; st.done = true; log.push({target: tg, result: st.res, steps: st.rows.length, pos: st.res === "found" ? st.i + 1 : 0});
        m = "Kết thúc. " + (st.res === "found" ? "Thuật toán lặp " + st.rows.length + " lần." : "Thuật toán đã xét cả " + n + " phần tử."); clearInterval(timer); timer = null; break;
    }
    draw(m);
  }
  box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ var a = b.dataset.a;
    if (a === "step") step();
    else if (a === "auto") { if (timer) { clearInterval(timer); timer = null; draw(); return; } if (!target()) { draw("Hãy nhập giá trị cần tìm trước."); return; } timer = setInterval(step, opt.speed || 700); step(); }
    else if (a === "reset") reset();
    else if (a === "apply") { var lines = q("[data-ed]").value.split("\n").map(function(s){ return s.trim(); }).filter(Boolean);
      if (!lines.length) return; items = lines.map(function(s){ var p = s.split("|"); return {k: p[0].trim(), v: (p[1] || "").trim()}; }); reset(); draw("Đã dùng danh sách mới gồm " + items.length + " phần tử."); }
  }); });
  q("[data-tg]").addEventListener("input", function(){ if (st.b !== "start") reset(); });
  q("[data-tg]").addEventListener("keydown", function(ev){ if (ev.key === "Enter") step(); });
  fill(); reset();
  return {log: function(){ return log; }};
};
})();
