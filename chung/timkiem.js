/* MÔ PHỎNG THUẬT TOÁN TÌM KIẾM TUẦN TỰ (Tin 7 Bài 14)
   TimKiem(phần tử, tuỳ chọn) — chạy từng bước theo sơ đồ khối, tô sáng khối đang thực hiện, phần tử đang xét,
   tự lập bảng các bước (lần lặp, phần tử, có đúng cần tìm?, đã hết danh sách?).
   Tuỳ chọn: title, note, items[{k, v}] (k: giá trị so sánh, v: thông tin trả ra), target, kName ("Họ tên"), vName ("Địa chỉ"),
             editable (cho sửa danh sách), check(x) → [[nhãn, đúng?],…]; x = {log:[{target, result, steps}], items, target} */
(function(){
"use strict";
var CSS = ".tk{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:10px;min-width:0}"
 + ".tk .t{font-weight:700}.tk .note{font-size:13px;opacity:.85}.tk .msg{font-size:14px;min-height:2.6em;background:var(--sunk);border-radius:8px;padding:6px 10px}"
 + ".tk .xbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}"
 + ".tk .xbar input,.tk .xbar select{font:inherit;font-size:14px;padding:4px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg,#fff);color:inherit;min-width:0}"
 + ".tk .xbar button{font:inherit;font-size:13px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:8px;padding:5px 12px;cursor:pointer}"
 + ".tk .xbar button.pri{background:var(--accent,#1f8a70);border-color:var(--accent,#1f8a70);color:#fff}.tk .xbar button:disabled{opacity:.45;cursor:default}"
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
    + (opt.editable ? '<details><summary style="cursor:pointer;font-size:14px">✎ Sửa danh sách (mỗi dòng một phần tử' + (vName ? ", dạng: " + esc(kName) + " | " + esc(vName) : "") + ")</summary><textarea data-ed></textarea><div class='xbar'><button type='button' data-a='apply'>Dùng danh sách này</button></div></details>" : "")
    + '<div class="xbar"><label>Cần tìm: <input data-tg value="' + esc(opt.target || "") + '" placeholder="' + esc(kName) + ' cần tìm" style="width:12em"></label>'
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
window.TimKiem.css = addCss;
})();

/* ---------- TÌM KIẾM NHỊ PHÂN (Tin 7 Bài 15) ----------
   TimNhiPhan(phần tử, tuỳ chọn): items[{k, v, pre}] đã/chưa sắp xếp, target, kName, vName, editable, check(x)
   Mỗi lần bấm "Bước tiếp" thực hiện một bước lặp: xác định vị trí giữa (phần nguyên của (đầu + cuối)/2), so sánh, thu hẹp vùng tìm kiếm.
   TroChoiTimSo(phần tử, tuỳ chọn): trò chơi Hoạt động 2 – 10 tấm thẻ úp, người chơi lật thẻ ở vị trí giữa. */
(function(){
"use strict";
var CSS2 = ".tk .cd.out{opacity:.28;background:var(--sunk)}.tk .cd.mid{border-color:#e67e22;background:#ffe2c4;color:#222}.tk .cd.lo{box-shadow:inset 4px 0 0 #1f5fbf}.tk .cd.hi{box-shadow:inset -4px 0 0 #1f5fbf}"
 + ".tk .cd.lo.hi{box-shadow:inset 4px 0 0 #1f5fbf,inset -4px 0 0 #1f5fbf}.tk .zone{font-size:12.5px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap}.tk .zone i{display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:-2px;margin-right:4px}"
 + ".tk .cd.back{background:repeating-linear-gradient(45deg,#2e8b4a,#2e8b4a 6px,#38a35a 6px,#38a35a 12px);color:transparent;cursor:pointer;border-color:#1e6b34}.tk .cd.back small{color:#fff;opacity:.9}"
 + ".tk .cnt{font-weight:700;color:#c4501b}";
function css2(){ if (window.TimKiem && window.TimKiem.css) window.TimKiem.css(); var s = document.getElementById("timkiem-css2"); if (!s) { s = document.createElement("style"); s.id = "timkiem-css2"; document.head.appendChild(s); } s.textContent = CSS2; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function isNum(s){ return /^-?\d+(\.\d+)?$/.test(String(s).trim()); }
function cmp(a, b){ a = String(a).trim(); b = String(b).trim(); if (isNum(a) && isNum(b)) return (+a) - (+b); return a.localeCompare(b, "vi", {sensitivity: "base"}); }
var NSTEPS = ["Bước 1. Nếu vùng tìm kiếm không có phần tử nào thì kết luận không tìm thấy và thuật toán kết thúc.",
  "Bước 2. Xác định vị trí ở giữa của vùng tìm kiếm. Vị trí này chia vùng tìm kiếm thành hai nửa: nửa trước và nửa sau vị trí giữa.",
  "Bước 3. Nếu giá trị cần tìm bằng giá trị ở vị trí giữa thì kết luận “giá trị cần tìm xuất hiện tại vị trí giữa” và kết thúc.",
  "Bước 4. Nếu giá trị cần tìm nhỏ hơn giá trị ở vị trí giữa thì vùng tìm kiếm mới được thu hẹp lại, chỉ còn nửa trước. Ngược lại vùng tìm kiếm mới được thu hẹp lại, chỉ còn nửa sau.",
  "Bước 5. Lặp lại từ Bước 1 đến Bước 4 cho đến khi tìm thấy giá trị cần tìm (Bước 3) hoặc vùng tìm kiếm không còn phần tử nào (Bước 1)."];
window.TimNhiPhan = function(box, opt){
  css2(); opt = opt || {};
  var items = (opt.items || []).slice(), kName = opt.kName || "Giá trị", vName = opt.vName || "", log = [], st, timer = null, q = function(s){ return box.querySelector(s); };
  box.classList.add("tk");
  box.innerHTML = '<div class="t">' + esc(opt.title || "Mô phỏng thuật toán tìm kiếm nhị phân") + "</div>"
    + (opt.editable ? '<details><summary style="cursor:pointer;font-size:14px">✎ Sửa danh sách (mỗi dòng một phần tử)</summary><textarea data-ed></textarea><div class="xbar"><button type="button" data-a="apply">Dùng danh sách này</button></div></details>' : "")
    + '<div class="xbar"><label>Cần tìm: <input data-tg value="' + esc(opt.target || "") + '" placeholder="' + esc(kName) + ' cần tìm" style="width:11em"></label>'
    + '<button type="button" class="pri" data-a="step">▶ Bước lặp tiếp</button><button type="button" data-a="auto">⏩ Chạy tự động</button><button type="button" data-a="reset">↺ Làm lại</button>'
    + '<button type="button" data-a="sort" title="Sắp xếp danh sách tăng dần (theo bảng chữ cái hoặc từ nhỏ đến lớn)">⇅ Sắp xếp danh sách</button></div>'
    + '<div class="cards" data-cards></div>'
    + '<div class="zone"><span><i style="background:#ffe2c4;border:1px solid #e67e22"></i>Vị trí giữa</span><span><i style="box-shadow:inset 3px 0 0 #1f5fbf,inset -3px 0 0 #1f5fbf;border:1px solid var(--line)"></i>Đầu, cuối vùng tìm kiếm</span><span><i style="background:var(--sunk);opacity:.5"></i>Đã loại khỏi vùng tìm kiếm</span><span><i style="background:#d9f2e4;border:1px solid #1c7c54"></i>Tìm thấy</span></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + '<div class="grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)"><div class="st" data-st></div><div style="overflow-x:auto"><table data-tb></table></div></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  function sorted(){ for (var i = 1; i < items.length; i++) if (cmp(items[i - 1].k, items[i].k) > 0) return false; return true; }
  function fill(){ var ed = q("[data-ed]"); if (ed) ed.value = items.map(function(x){ return x.k; }).join("\n"); }
  function tg(){ return q("[data-tg]").value.trim(); }
  function reset(){ clearInterval(timer); timer = null; st = {lo: 0, hi: items.length - 1, mid: -1, rows: [], done: false, res: null, sb: -1};
    draw(sorted() ? "Danh sách đã được sắp xếp. Ban đầu vùng tìm kiếm là toàn bộ danh sách (vị trí 1 đến " + items.length + "). Bấm ▶ Bước lặp tiếp." : "⚠ Danh sách CHƯA được sắp xếp nên không thực hiện được tìm kiếm nhị phân. Bấm ⇅ Sắp xếp danh sách trước."); }
  function draw(m){
    q("[data-cards]").innerHTML = items.map(function(x, i){ var c = st.res === "found" && i === st.mid ? "ok" : (i < st.lo || i > st.hi) ? "out" : i === st.mid && !st.done ? "mid" : "";
      if (!st.done && i === st.lo) c += " lo"; if (!st.done && i === st.hi) c += " hi";
      return '<div class="cd ' + c + '"><small>Vị trí ' + (i + 1) + "</small><b>" + esc(x.k) + "</b>" + (x.pre ? "<small>" + esc(x.pre) + "</small>" : "") + (vName && x.v ? "<small>" + esc(x.v) + "</small>" : "") + "</div>"; }).join("");
    q("[data-st]").innerHTML = "<b>Mô tả bằng ngôn ngữ tự nhiên</b>" + NSTEPS.map(function(s, i){ return '<div class="' + (i === st.sb ? "on" : "") + '">' + esc(s) + "</div>"; }).join("");
    q("[data-tb]").innerHTML = "<tr><th>Bước lặp</th><th>Vùng tìm kiếm</th><th>Vị trí giữa</th><th>" + esc(kName) + " ở giữa</th><th>So sánh với “" + esc(tg()) + "”</th></tr>"
      + st.rows.map(function(r, i){ return "<tr><td>" + (i + 1) + "</td><td>" + r.z + "</td><td>" + (r.m || "") + "</td><td>" + esc(r.k || "") + "</td><td>" + esc(r.c) + "</td></tr>"; }).join("");
    if (m != null) q("[data-msg]").textContent = m;
    q('[data-a="step"]').disabled = st.done || !sorted(); q('[data-a="auto"]').disabled = (st.done || !sorted()) && !timer; q('[data-a="auto"]').textContent = timer ? "⏸ Dừng" : "⏩ Chạy tự động";
    if (opt.check) q("[data-ck]").innerHTML = opt.check({log: log, items: items, sorted: sorted(), target: tg()}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join("");
  }
  function finish(res){ st.done = true; st.res = res; clearInterval(timer); timer = null;
    var seqSteps = res === "found" ? st.mid + 1 : items.length;
    log.push({target: tg(), result: res, steps: st.rows.length, pos: res === "found" ? st.mid + 1 : 0, seq: seqSteps});
    return " Tìm kiếm nhị phân: " + st.rows.length + " bước lặp. (Tìm kiếm tuần tự trên danh sách này cần " + seqSteps + " bước lặp.)"; }
  function step(){
    var t = tg(); if (st.done) return; if (!t) { draw("Hãy nhập giá trị cần tìm trước."); return; } if (!sorted()) { draw("⚠ Danh sách chưa được sắp xếp. Bấm ⇅ Sắp xếp danh sách trước."); return; }
    if (st.lo > st.hi) { st.sb = 0; draw("Bước 1: vùng tìm kiếm không còn phần tử nào → Không tìm thấy “" + t + "”." + finish("notfound")); return; }
    st.mid = Math.floor((st.lo + st.hi) / 2); var x = items[st.mid], c = cmp(t, x.k), z = (st.lo + 1) + " → " + (st.hi + 1), r = {z: z, m: st.mid + 1, k: x.k};
    if (c === 0) { st.sb = 2; r.c = "Bằng nhau → tìm thấy"; st.rows.push(r); draw("Vị trí giữa = phần nguyên của (" + (st.lo + 1) + " + " + (st.hi + 1) + ")/2 = " + (st.mid + 1) + ". “" + t + "” bằng “" + x.k + "”: TÌM THẤY ở vị trí " + (st.mid + 1) + (x.v ? " (" + x.v + ")" : "") + "." + finish("found")); return; }
    st.sb = 3;
    if (c < 0) { r.c = "Nhỏ hơn (đứng trước) → nửa trước"; st.rows.push(r); var m = "Vị trí giữa = phần nguyên của (" + (st.lo + 1) + " + " + (st.hi + 1) + ")/2 = " + (st.mid + 1) + ". “" + t + "” đứng trước “" + x.k + "” nên chỉ tìm ở nửa trước: vị trí " + (st.lo + 1) + " → " + st.mid + "."; st.hi = st.mid - 1; }
    else { r.c = "Lớn hơn (đứng sau) → nửa sau"; st.rows.push(r); var m = "Vị trí giữa = phần nguyên của (" + (st.lo + 1) + " + " + (st.hi + 1) + ")/2 = " + (st.mid + 1) + ". “" + t + "” đứng sau “" + x.k + "” nên chỉ tìm ở nửa sau: vị trí " + (st.mid + 2) + " → " + (st.hi + 1) + "."; st.lo = st.mid + 1; }
    if (st.lo > st.hi) m += " Vùng tìm kiếm mới không còn phần tử nào.";
    st.mid = -1; draw(m);
  }
  box.querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ var a = b.dataset.a;
    if (a === "step") step();
    else if (a === "auto") { if (timer) { clearInterval(timer); timer = null; draw(); return; } if (!tg()) { draw("Hãy nhập giá trị cần tìm trước."); return; } timer = setInterval(step, opt.speed || 1100); step(); }
    else if (a === "reset") reset();
    else if (a === "sort") { items.sort(function(x, y){ return cmp(x.k, y.k); }); log.push({sorted: true}); fill(); reset(); }
    else if (a === "apply") { var lines = q("[data-ed]").value.split("\n").map(function(s){ return s.trim(); }).filter(Boolean); if (!lines.length) return; items = lines.map(function(s){ return {k: s}; }); reset(); }
  }); });
  q("[data-tg]").addEventListener("input", function(){ if (st.rows.length) reset(); else draw(); });
  q("[data-tg]").addEventListener("keydown", function(ev){ if (ev.key === "Enter") step(); });
  fill(); reset();
  return {log: function(){ return log; }};
};
/* Trò chơi tìm số (Hoạt động 2) */
window.TroChoiTimSo = function(box, opt){
  css2(); opt = opt || {};
  var nums, target, lo, hi, opened, turns, done, log = [], q = function(s){ return box.querySelector(s); };
  box.classList.add("tk");
  box.innerHTML = '<div class="t">' + esc(opt.title || "Trò chơi tìm số") + "</div>"
    + '<div class="xbar"><button type="button" class="pri" data-a="new">🎲 Ván mới (A chọn 10 số, B chọn số cần tìm)</button><label>Số B cần tìm: <select data-tg></select></label></div>'
    + '<div class="cards" data-cards></div><div class="msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "") + '<div class="note">' + (opt.note || "") + "</div>";
  function newGame(){ var pool = []; for (var i = 1; i < 20; i++) pool.push(i); pool.sort(function(){ return Math.random() - .5; });
    nums = pool.slice(0, 10).sort(function(a, b){ return a - b; }); lo = 0; hi = 9; opened = {}; turns = 0; done = false;
    var sel = q("[data-tg]"), extra = 0; do { extra = 1 + Math.floor(Math.random() * 19); } while (nums.indexOf(extra) >= 0);
    var choices = nums.slice(); choices.push(extra); choices.sort(function(a, b){ return a - b; });
    sel.innerHTML = choices.map(function(n){ return "<option>" + n + "</option>"; }).join(""); target = nums[Math.floor(Math.random() * 10)]; sel.value = target;
    say("A đã úp 10 tấm thẻ theo thứ tự số tăng dần. B cần tìm số " + target + ". Hãy lật tấm thẻ ở vị trí giữa của dãy (vị trí " + (Math.floor((lo + hi) / 2) + 1) + ")."); draw(); }
  function say(t){ q("[data-msg]").textContent = t; }
  function draw(){ q("[data-cards]").innerHTML = nums.map(function(n, i){ var c = opened[i] ? (n === target ? "ok" : "") : "back"; if (i < lo || i > hi) c += " out";
      return '<div class="cd ' + c + '" data-i="' + i + '" role="button" tabindex="0"><small>Vị trí ' + (i + 1) + "</small><b>" + (opened[i] || done ? n : "?") + "</b></div>"; }).join("");
    box.querySelectorAll("[data-i]").forEach(function(c){ c.addEventListener("click", function(){ flip(+c.dataset.i); }); });
    if (opt.check) q("[data-ck]").innerHTML = opt.check({log: log}).map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  function flip(i){ if (done) return; var mid = Math.floor((lo + hi) / 2);
    if (i < lo || i > hi) { say("Tấm thẻ này đã bị loại khỏi dãy cần tìm. Hãy chọn thẻ ở vị trí giữa (vị trí " + (mid + 1) + ")."); return; }
    if (i !== mid) { say("Theo luật chơi, B phải chọn thẻ ở vị trí giữa của dãy: vị trí " + (mid + 1) + " = phần nguyên của (" + (lo + 1) + " + " + (hi + 1) + ")/2."); return; }
    turns++; opened[i] = true; var n = nums[i];
    if (n === target) { done = true; log.push({turns: turns, found: true}); say("A nói: “Bằng nhau”. B tìm thấy số " + target + " ở vị trí " + (i + 1) + " sau " + turns + " lượt lật thẻ. 🎉"); }
    else if (target < n) { hi = i - 1; say("Thẻ là " + n + ". A nói: “Bé hơn” (" + target + " < " + n + "). B chọn nửa dãy bên trái: vị trí " + (lo + 1) + " → " + (hi + 1) + "."); }
    else { lo = i + 1; say("Thẻ là " + n + ". A nói: “Lớn hơn” (" + target + " > " + n + "). B chọn nửa dãy bên phải: vị trí " + (lo + 1) + " → " + (hi + 1) + "."); }
    if (!done && lo > hi) { done = true; log.push({turns: turns, found: false}); say("Dãy không còn thẻ nào: số " + target + " không có trong 10 tấm thẻ (sau " + turns + " lượt)."); }
    if (!done) say(q("[data-msg]").textContent + " Lật tiếp thẻ ở vị trí " + (Math.floor((lo + hi) / 2) + 1) + ".");
    draw(); }
  q('[data-a="new"]').addEventListener("click", newGame);
  q("[data-tg]").addEventListener("change", function(){ target = +this.value; lo = 0; hi = 9; opened = {}; turns = 0; done = false; say("B cần tìm số " + target + ". Lật thẻ ở vị trí giữa (vị trí 5)."); draw(); });
  newGame();
  return {nums: function(){ return nums; }, log: function(){ return log; }};
};
})();
