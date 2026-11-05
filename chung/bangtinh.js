/* BẢNG TÍNH MÔ PHỎNG dùng chung cho các bài bảng tính (Tin 7 Bài 7, 8, 9,…)
   BangTinh(phần tử, tuỳ chọn) — chọn ô/vùng/hàng/cột, nhập, sửa, xoá, tự căn chỉnh, định dạng, độ rộng cột,
   đổi tên trang tính, công thức (+ - * / ^, ngoặc, địa chỉ ô, vùng), hàm SUM AVERAGE MIN MAX COUNT,
   tự động tính lại, sao chép công thức (địa chỉ tương đối), chèn/xoá hàng, cột, ẩn/hiện hàng, cột,
   gộp ô (Merge & Center), Format Cells (Number, Percentage, Date kiểu Việt Nam), cộng trừ ngày tháng.
   Tuỳ chọn: title, note, cols, rows, widths[], data{A1:"…"}, fmt{A1:{b,fill,al,nf,m}}, sheet, tools[], extra[{label,title,run(api)}],
             check(x) → [[nhãn, đúng?],…]
   x = {d, f, sheet, w, hr, hc, log, C, R, val(địa chỉ), text(địa chỉ): chữ hiển thị} */
(function(){
"use strict";
var CSS = ".bt{border:1px solid var(--line);border-radius:12px;padding:10px;margin:10px 0;display:grid;gap:8px;outline:none;min-width:0}"
 + ".bt .t{font-weight:700}.bt .note{font-size:13px;opacity:.85}"
 + ".bt .tb{display:flex;flex-wrap:wrap;gap:4px;align-items:center}"
 + ".bt .tb button{font:inherit;font-size:13px;min-width:30px;border:1px solid var(--line);background:transparent;color:inherit;border-radius:6px;padding:3px 8px;cursor:pointer}"
 + ".bt .tb button:hover{border-color:var(--accent)}.bt .tb .sep{width:1px;height:20px;background:var(--line);margin:0 3px}"
 + ".bt .fc{border:1px solid #9bb7a3;background:#f6faf7;color:#111;border-radius:8px;padding:8px 10px;display:grid;gap:6px;font-size:13.5px;max-width:520px}"
 + ".bt .fc .h{font-weight:700}.bt .fc .row{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}"
 + ".bt .fc input[type=number]{width:4em;font:inherit;padding:1px 4px}.bt .fc .smp{font:600 14px Consolas,monospace;border:1px solid #ccc;background:#fff;padding:2px 8px;min-width:120px}"
 + ".bt .fc button{font:inherit;font-size:13px;border:1px solid #888;background:#fff;border-radius:5px;padding:2px 14px;cursor:pointer}"
 + ".bt .fb{display:flex;gap:6px;align-items:center}"
 + ".bt .nb{font:600 13px/1.6 Consolas,monospace;border:1px solid var(--line);border-radius:4px;padding:2px 6px;min-width:88px;text-align:center;background:var(--bg,#fff)}"
 + ".bt .fx{font-style:italic;font-weight:700;opacity:.6}"
 + ".bt .fb input{flex:1;min-width:0;font:14px Consolas,'Be Vietnam Pro',monospace;padding:3px 6px;border:1px solid var(--line);border-radius:4px;background:var(--bg,#fff);color:inherit}"
 + ".bt .gw{overflow:auto;max-height:560px;border:1px solid #c8c8c8;-webkit-user-select:none;user-select:none}"
 + ".bt table{border-collapse:collapse;table-layout:fixed;font:14px/1.3 Calibri,'Be Vietnam Pro',Arial,sans-serif;background:#fff;color:#111}"
 + ".bt th{background:#efefef;color:#333;font-weight:500;font-size:12.5px;border:1px solid #d0d0d0;height:22px;position:relative;cursor:pointer;padding:0}"
 + ".bt th.hl{background:#d6e6d9;color:#1d6b36;border-bottom-color:#217346}"
 + ".bt th.hb{border-left:3px double #217346}.bt tr.hb > th{border-top:3px double #217346}"
 + ".bt th .rz{position:absolute;right:-3px;top:0;width:6px;height:100%;cursor:col-resize;z-index:2}"
 + ".bt td{border:1px solid #e1e1e1;height:22px;padding:0 4px;white-space:nowrap;overflow:hidden;cursor:cell}"
 + ".bt td.sel{background:#d3e3fb}.bt td.act{outline:2px solid #217346;outline-offset:-2px}"
 + ".bt td.cp{outline:2px dashed #217346;outline-offset:-3px}.bt td.pk{outline:2px dashed #1f5fbf;outline-offset:-3px;background:#e8f0fe}.bt td.err{color:#c0392b}"
 + ".bt .tabs{display:flex;gap:4px;align-items:center;font-size:13px}"
 + ".bt .tab{border:1px solid var(--line);border-top:0;border-radius:0 0 6px 6px;padding:2px 12px;cursor:pointer;background:#fff;color:#217346;font-weight:700}"
 + ".bt .tab input{font:inherit;font-size:13px;width:14em;padding:0 2px}"
 + ".bt .msg{font-size:13.5px;min-height:1.2em}.bt .msg.bad{color:#c0392b}"
 + ".bt .ck{list-style:none;margin:0;padding:0;display:grid;gap:2px;font-size:13.5px}"
 + ".bt .ck li::before{content:'☐ '}.bt .ck li.ok::before{content:'☑ ';color:#1c7c54}.bt .ck li.ok{color:#1c7c54;font-weight:600}";
function addCss(){ if (document.getElementById("bangtinh-css")) return; var s = document.createElement("style"); s.id = "bangtinh-css"; s.textContent = CSS; document.head.appendChild(s); }

var TOOLS = {
  copy:['📋 Sao chép','Sao chép (Ctrl+C)'], paste:['📌 Dán','Dán (Ctrl+V)'],
  insert:['➕ Chèn','Chèn (Insert): chọn cả cột thì chèn cột bên trái; chọn hàng hoặc ô thì chèn hàng phía trên'],
  del:['➖ Xoá hàng/cột','Xoá (Delete) các hàng hoặc cột đang chọn (nháy tên hàng/cột để chọn)'],
  hide:['🙈 Ẩn','Ẩn (Hide) các hàng hoặc cột đang chọn'], unhide:['👁 Hiện','Hiện lại (Unhide): chọn các hàng/cột xung quanh vị trí bị ẩn'],
  merge:['⬌ Gộp ô','Merge & Center: gộp các ô của vùng và căn giữa'], fmt:['🔢 Format Cells','Định dạng dữ liệu số, phần trăm, ngày tháng'],
  b:['<b>B</b>','Chữ đậm'], i:['<i>I</i>','Chữ nghiêng'], big:['A⁺','Tăng cỡ chữ'], green:['<span style="color:#1d8a3a;font-weight:700">A</span>','Chữ xanh lá'],
  fill:['🟨 Nền','Màu nền vàng'], left:['⇤','Căn trái'], center:['↔','Căn giữa'], right:['⇥','Căn phải'], reset:['Làm lại','Làm lại từ đầu']
};
var DEF_TOOLS = ["copy","paste","|","b","fill","left","center","right","|","reset"];

function L(c){ return c < 26 ? String.fromCharCode(65 + c) : String.fromCharCode(64 + Math.floor(c / 26)) + String.fromCharCode(65 + c % 26); }
function colIdx(s){ s = s.toUpperCase(); var n = 0; for (var i = 0; i < s.length; i++) n = n * 26 + s.charCodeAt(i) - 64; return n - 1; }
function isNum(v){ return /^-?\d+(\.\d+)?$/.test(String(v).trim()); }
function parseDate(v){ var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(v).trim()); if (!m) return null; var dt = new Date(Date.UTC(+m[3], +m[1] - 1, +m[2]));
  if (dt.getUTCMonth() !== +m[1] - 1 || dt.getUTCDate() !== +m[2]) return null; return Math.round((dt - Date.UTC(1899, 11, 30)) / 864e5); }
function isDate(v){ return parseDate(v) !== null; }
function dateStr(n, vn){ var dt = new Date(Date.UTC(1899, 11, 30) + Math.round(n) * 864e5), D = dt.getUTCDate(), M = dt.getUTCMonth() + 1, Y = dt.getUTCFullYear();
  return vn ? (D < 10 ? "0" : "") + D + "/" + (M < 10 ? "0" : "") + M + "/" + Y : M + "/" + D + "/" + Y; }
function general(v){ return String(Math.abs(v) < 1e11 ? parseFloat(v.toPrecision(10)) : v); }
function fixed(v, dp, sep){ var s = Math.abs(v).toFixed(dp), p = s.split("."); if (sep) p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return (v < 0 ? "-" : "") + p.join("."); }
var REF = /(\$?)([A-Za-z]{1,2})(\$?)(\d+)(?![\w(])/g;

window.BangTinh = function(box, opt){
  addCss(); opt = opt || {};
  var C, R, q = function(s){ return box.querySelector(s); };
  var d, f, w, a, s, e, sheet, hr, hc, log, clip = null, drag = false, hdr = null, pick = null;
  function k(c, r){ return L(c) + (r + 1); }
  function reset(){ C = opt.cols || 6; R = opt.rows || 12; d = {}; f = {}; w = (opt.widths || []).slice(); for (var i = w.length; i < C; i++) w.push(72);
    a = [0, 0]; s = [0, 0]; e = [0, 0]; sheet = opt.sheet || "Sheet1"; clip = null; pick = null; hr = {}; hc = {}; log = [];
    if (opt.data) Object.keys(opt.data).forEach(function(x){ d[x] = opt.data[x]; });
    if (opt.fmt) Object.keys(opt.fmt).forEach(function(x){ f[x] = JSON.parse(JSON.stringify(opt.fmt[x])); }); }
  reset();

  /* ---------- Bộ tính công thức ---------- */
  function E(code){ throw {e: code}; }
  function tokenize(src){
    var t = [], i = 0, m;
    while (i < src.length) {
      var r = src.slice(i);
      if ((m = /^\s+/.exec(r))) { i += m[0].length; continue; }
      if ((m = /^\d+(\.\d+)?|^\.\d+/.exec(r))) { t.push({t:"n", v:+m[0]}); i += m[0].length; continue; }
      if ((m = /^["“”]([^"“”]*)["“”]/.exec(r))) { t.push({t:"s", v:m[1]}); i += m[0].length; continue; }
      if ((m = /^\$?([A-Za-z]{1,2})\$?(\d+)(?![A-Za-z(])/.exec(r))) { t.push({t:"r", c:colIdx(m[1]), r:+m[2] - 1}); i += m[0].length; continue; }
      if ((m = /^[A-Za-z][A-Za-z0-9.]*/.exec(r))) { t.push({t:"f", v:m[0].toUpperCase()}); i += m[0].length; continue; }
      if ("+-*/^(),;:".indexOf(r[0]) >= 0) { t.push({t:r[0]}); i++; continue; }
      if (r[0] === "#") { m = /^#[A-Z/0!?]+/.exec(r); E(m ? m[0] : "#SYNTAX"); }
      E("#SYNTAX");
    }
    return t;
  }
  function evaluate(src, depth){
    var t = tokenize(src), p = 0;
    function peek(x){ return t[p] && t[p].t === x; }
    function eat(x){ if (!peek(x)) E("#SYNTAX"); return t[p++]; }
    function cell(c, r){ if (c >= C || r >= R || c < 0 || r < 0) return ""; var v = val(k(c, r), depth + 1); if (typeof v === "string" && v[0] === "#" && (d[k(c, r)] || "")[0] === "=") E(v); return v; }
    function scalar(x){ if (x && x.rg) { var g = x.rg; if (g[0] !== g[2] || g[1] !== g[3]) E("#VALUE!"); return cell(g[0], g[1]); } return x; }
    function num(x){ x = scalar(x); if (typeof x === "number") return x; if (x === "") return 0; if (isNum(x)) return +x; E("#VALUE!"); }
    function expr(){ var v = term(); while (peek("+") || peek("-")) { var o = t[p++].t, b = term(); v = o === "+" ? num(v) + num(b) : num(v) - num(b); } return v; }
    function term(){ var v = pow(); while (peek("*") || peek("/")) { var o = t[p++].t, b = pow(); if (o === "*") v = num(v) * num(b); else { var y = num(b); if (y === 0) E("#DIV/0!"); v = num(v) / y; } } return v; }
    function pow(){ var v = unary(); while (peek("^")) { p++; var b = unary(); v = Math.pow(num(v), num(b)); } return v; }
    function unary(){ if (peek("-")) { p++; return -num(unary()); } if (peek("+")) { p++; return num(unary()); } return prim(); }
    function prim(){
      var x = t[p];
      if (!x) E("#SYNTAX");
      if (x.t === "n") { p++; return x.v; }
      if (x.t === "s") { p++; return x.v; }
      if (x.t === "r") { p++; if (peek(":")) { p++; var y = eat("r"); return {rg:[Math.min(x.c, y.c), Math.min(x.r, y.r), Math.max(x.c, y.c), Math.max(x.r, y.r)]}; } return {rg:[x.c, x.r, x.c, x.r]}; }
      if (x.t === "(") { p++; var v = expr(); eat(")"); return v; }
      if (x.t === "f") { p++; if (!peek("(")) E("#NAME?"); p++; var args = [];
        if (!peek(")")) { args.push(expr()); while (peek(",") || peek(";")) { p++; args.push(expr()); } }
        eat(")"); return fn(x.v, args); }
      E("#SYNTAX");
    }
    function fn(name, args){
      if (["SUM","AVERAGE","MIN","MAX","COUNT"].indexOf(name) < 0) E("#NAME?");
      var ns = [];
      args.forEach(function(x){
        if (x && x.rg) { var g = x.rg; for (var r = g[1]; r <= g[3]; r++) for (var c = g[0]; c <= g[2]; c++) { var v = cell(c, r); if (typeof v === "number") ns.push(v); } }
        else if (typeof x === "number") ns.push(x);
        else if (isNum(x)) ns.push(+x);
        else if (name !== "COUNT") E("#VALUE!");
      });
      if (name === "COUNT") return ns.length;
      if (name === "SUM") return ns.reduce(function(m, v){ return m + v; }, 0);
      if (name === "AVERAGE") { if (!ns.length) E("#DIV/0!"); return ns.reduce(function(m, v){ return m + v; }, 0) / ns.length; }
      if (!ns.length) return 0;
      return name === "MIN" ? Math.min.apply(null, ns) : Math.max.apply(null, ns);
    }
    var v = expr(); if (p < t.length) E("#SYNTAX");
    v = scalar(v); if (v === "") return 0; return v;
  }
  function compile(src, depth){
    try { var v = evaluate(src, depth || 0); if (typeof v === "number" && !isFinite(v)) return "#DIV/0!"; return typeof v === "number" ? +v.toPrecision(15) : v; }
    catch (x) { if (x && x.e) return x.e; return "#SYNTAX"; }
  }
  /* Giá trị của ô: số, chuỗi, "" hoặc lỗi "#…". Ngày tháng (tháng/ngày/năm) được lưu như số ngày, giống Excel. */
  function val(key, depth){ depth = depth || 0; var v = d[key]; if (v == null || v === "") return "";
    if (v[0] === "=") return depth > 60 ? "#VÒNG!" : compile(v.slice(1), depth);
    if (isNum(v)) return +v; var dt = parseDate(v); return dt !== null ? dt : v; }
  /* Ô hiển thị kiểu ngày: nhập ngày, hoặc công thức có đúng một ô ngày tháng (ví dụ =A2+B2) */
  function dateCell(key, depth){ var v = d[key]; if (!v) return false; if (isDate(v)) return true; if (v[0] !== "=" || (depth || 0) > 20) return false;
    var n = 0; v.slice(1).replace(/(\$?)([A-Za-z]{1,2})(\$?)(\d+)(?![\w(:])/g, function(m0, d1, cl, d2, rw){ var kk = cl.toUpperCase() + rw; if (kk !== key && dateCell(kk, (depth || 0) + 1)) n++; return m0; });
    return n === 1; }
  function text(key){ var v = val(key), F = f[key] || {}, nf = F.nf;
    if (typeof v !== "number") return String(v);
    if (nf && nf.t === "pct") return fixed(v * 100, nf.dp, false) + "%";
    if (nf && nf.t === "num") return fixed(v, nf.dp, nf.sep);
    if (nf && nf.t === "date") return dateStr(v, true);
    if (dateCell(key)) return dateStr(v, false);
    return general(v); }
  function kind(v){ return v == null || v === "" ? "" : v[0] === "=" ? "công thức" : isNum(v) ? "số" : isDate(v) ? "ngày tháng" : "văn bản"; }
  function shift(raw, dc, dr){ if (!raw || raw[0] !== "=") return raw;
    return "=" + raw.slice(1).replace(REF, function(m, d1, cl, d2, rw){
      var c = colIdx(cl) + (d1 ? 0 : dc), r = +rw + (d2 ? 0 : dr);
      return c < 0 || r < 1 ? "#REF!" : d1 + L(c) + d2 + r; }); }
  /* Đổi vị trí toàn bảng khi chèn/xoá hàng, cột: mc(c), mr(r) trả về vị trí mới hoặc null nếu bị xoá */
  function remap(mc, mr){
    var nd = {}, nf = {}, nhr = {}, nhc = {};
    function mk(key){ var m = /^([A-Z]+)(\d+)$/.exec(key), c = mc(colIdx(m[1])), r = mr(+m[2] - 1); return c == null || r == null ? null : k(c, r); }
    Object.keys(d).forEach(function(key){ var nk = mk(key); if (nk) nd[nk] = d[key]; });
    Object.keys(f).forEach(function(key){ var nk = mk(key); if (nk) nf[nk] = f[key]; });
    Object.keys(nd).forEach(function(key){ var v = nd[key]; if (v && v[0] === "=") nd[key] = "=" + v.slice(1).replace(REF, function(m0, d1, cl, d2, rw){
      var c = mc(colIdx(cl)), r = mr(+rw - 1); return c == null || r == null ? "#REF!" : d1 + L(c) + d2 + (r + 1); }); });
    Object.keys(hr).forEach(function(r){ var n = mr(+r); if (n != null) nhr[n] = 1; });
    Object.keys(hc).forEach(function(c){ var n = mc(+c); if (n != null) nhc[n] = 1; });
    d = nd; f = nf; hr = nhr; hc = nhc; clip = null; }

  /* ---------- Giao diện ---------- */
  var tools = opt.tools || DEF_TOOLS, CAT = "cat" + (++window.BangTinh.n);
  box.innerHTML = '<div class="t">' + (opt.title || "Bảng tính mô phỏng") + '</div>'
    + '<div class="tb">' + tools.map(function(x){ return x === "|" ? '<span class="sep"></span>' : '<button type="button" data-f="' + x + '" title="' + TOOLS[x][1] + '">' + TOOLS[x][0] + "</button>"; }).join("")
    + (opt.extra || []).map(function(x, i){ return '<button type="button" data-x="' + i + '" title="' + (x.title || "") + '">' + x.label + "</button>"; }).join("") + "</div>"
    + '<div class="fc" data-fc hidden><div class="h">Format Cells · Number</div>'
    + '<div class="row"><span>Category:</span><label><input type="radio" name="' + CAT + '" value="gen" checked> General</label><label><input type="radio" name="' + CAT + '" value="num"> Number</label><label><input type="radio" name="' + CAT + '" value="pct"> Percentage</label><label><input type="radio" name="' + CAT + '" value="date"> Date</label></div>'
    + '<div class="row" data-fdp><label>Decimal places: <input type="number" min="0" max="10" value="2" data-dp></label><label data-fsep><input type="checkbox" data-sep> Use 1000 Separator (,)</label></div>'
    + '<div class="row" data-fdt hidden><label>Type: <select><option>dd/mm/yyyy (14/03/2012)</option></select></label><label>Locale: <select><option>Vietnamese</option></select></label></div>'
    + '<div class="row">Sample: <span class="smp" data-smp></span></div>'
    + '<div class="row"><button type="button" data-fok>OK</button><button type="button" data-fno>Cancel</button></div></div>'
    + '<div class="fb"><span class="nb" data-nb>A1</span><span class="fx">fx</span><input data-in aria-label="Vùng nhập dữ liệu" placeholder="Vùng nhập dữ liệu (công thức bắt đầu bằng =)" autocomplete="off" spellcheck="false"></div>'
    + '<div class="gw"><table data-g></table></div>'
    + '<div class="tabs"><span class="tab" data-tab title="Nháy đúp để đổi tên"></span></div>'
    + '<div class="msg" data-msg aria-live="polite"></div>'
    + (opt.check ? '<ul class="ck" data-ck></ul>' : "")
    + '<div class="note">' + (opt.note || "") + "</div>";
  box.tabIndex = 0;
  var inp = q("[data-in]");
  function rg(){ return [Math.min(s[0], e[0]), Math.min(s[1], e[1]), Math.max(s[0], e[0]), Math.max(s[1], e[1])]; }
  function mergeAt(c, r){ /* ô gộp chứa (c, r): trả về [c0, r0, c1, r1] hoặc null */
    var ks = Object.keys(f); for (var i = 0; i < ks.length; i++) { var m = f[ks[i]].m; if (!m) continue; var mm = /^([A-Z]+)(\d+)$/.exec(ks[i]), c0 = colIdx(mm[1]), r0 = +mm[2] - 1;
      if (c >= c0 && c < c0 + m[0] && r >= r0 && r < r0 + m[1]) return [c0, r0, c0 + m[0] - 1, r0 + m[1] - 1]; } return null; }
  function wholeRows(g){ return g[0] === 0 && g[2] === C - 1; }
  function wholeCols(g){ return g[1] === 0 && g[3] === R - 1; }
  function draw(){
    var g = rg(), cov = {};
    Object.keys(f).forEach(function(key){ var m = f[key].m; if (!m) return; var mm = /^([A-Z]+)(\d+)$/.exec(key), c0 = colIdx(mm[1]), r0 = +mm[2] - 1;
      for (var c = c0; c < c0 + m[0]; c++) for (var r = r0; r < r0 + m[1]; r++) if (c !== c0 || r !== r0) cov[k(c, r)] = 1; });
    var h = "<colgroup><col style='width:34px'>", c, r;
    for (c = 0; c < C; c++) if (!hc[c]) h += "<col style='width:" + w[c] + "px'>";
    h += "</colgroup><tr><th></th>";
    for (c = 0; c < C; c++) if (!hc[c]) h += "<th data-c='" + c + "' class='" + (c >= g[0] && c <= g[2] ? "hl" : "") + (c > 0 && hc[c - 1] ? " hb" : "") + "'>" + L(c) + "<span class='rz' data-rz='" + c + "'></span></th>";
    h += "</tr>";
    for (r = 0; r < R; r++) { if (hr[r]) continue;
      h += "<tr class='" + (r > 0 && hr[r - 1] ? "hb" : "") + "'><th class='" + (r >= g[1] && r <= g[3] ? "hl" : "") + "' data-r='" + r + "'>" + (r + 1) + "</th>";
      for (c = 0; c < C; c++) { if (hc[c]) continue; var key = k(c, r); if (cov[key]) continue;
        var v = val(key), F = f[key] || {}, err = typeof v === "string" && v[0] === "#" && (d[key] || "")[0] === "=",
          al = F.al || (typeof v === "number" || err ? "right" : "left"), st = "text-align:" + al + ";", span = "";
        if (F.b) st += "font-weight:700;"; if (F.i) st += "font-style:italic;"; if (F.big) st += "font-size:17px;"; if (F.green) st += "color:#1d8a3a;"; if (F.fill) st += "background:#ffe94d;";
        if (F.m) { var cs = 0, rs = 0, x; for (x = c; x < c + F.m[0]; x++) if (!hc[x]) cs++; for (x = r; x < r + F.m[1]; x++) if (!hr[x]) rs++; span = " colspan='" + cs + "' rowspan='" + rs + "'"; st += "vertical-align:middle;"; }
        var inC = clip && c >= clip.g[0] && c <= clip.g[2] && r >= clip.g[1] && r <= clip.g[3];
        var inP = pick && c >= pick.g[0] && c <= pick.g[2] && r >= pick.g[1] && r <= pick.g[3];
        var cls = inP ? "pk" : (c === a[0] && r === a[1]) ? "act" : inC ? "cp" : (c >= g[0] && c <= g[2] && r >= g[1] && r <= g[3] && (g[0] !== g[2] || g[1] !== g[3])) ? "sel" : "";
        if (err) cls += " err";
        h += "<td data-k='" + key + "' data-c='" + c + "' data-r='" + r + "' class='" + cls + "' style='" + st + "'" + span + ">" + text(key).replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</td>"; }
      h += "</tr>"; }
    q("[data-g]").innerHTML = h;
    var n = (g[2] - g[0] + 1) * (g[3] - g[1] + 1), mg = mergeAt(a[0], a[1]);
    q("[data-nb]").textContent = n > 1 && !(mg && mg[0] === g[0] && mg[1] === g[1] && mg[2] === g[2] && mg[3] === g[3]) ? k(g[0], g[1]) + ":" + k(g[2], g[3]) : k(a[0], a[1]);
    if (document.activeElement !== inp) inp.value = d[k(a[0], a[1])] || "";
    if (!q("[data-tab] input")) q("[data-tab]").textContent = sheet;
    if (opt.check) { var res = opt.check({d: d, f: f, sheet: sheet, w: w, hr: hr, hc: hc, log: log, C: C, R: R, val: val, text: text});
      q("[data-ck]").innerHTML = res.map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  }
  function say(t, bad){ var m = q("[data-msg]"); m.textContent = t; m.className = "msg" + (bad ? " bad" : ""); }
  function selInfo(){ var g = rg(), n = (g[2] - g[0] + 1) * (g[3] - g[1] + 1), key = k(a[0], a[1]), raw = d[key];
    say(wholeCols(g) && n > 1 ? "Đã chọn " + (g[0] === g[2] ? "cột " + L(g[0]) : "các cột " + L(g[0]) + " đến " + L(g[2])) + "."
      : wholeRows(g) && n > 1 ? "Đã chọn " + (g[1] === g[3] ? "hàng " + (g[1] + 1) : "các hàng " + (g[1] + 1) + " đến " + (g[3] + 1)) + "."
      : n > 1 && !mergeAt(a[0], a[1]) ? "Đã chọn vùng " + k(g[0], g[1]) + ":" + k(g[2], g[3]) + " (" + n + " ô)."
      : "Ô " + key + (raw ? ": dữ liệu kiểu " + kind(raw) + (raw[0] === "=" ? ", kết quả " + text(key) : "") + "." : " đang trống.")); }
  function selectCell(ce){ var mg = mergeAt(ce[0], ce[1]); if (mg) { a = [mg[0], mg[1]]; s = [mg[0], mg[1]]; e = [mg[2], mg[3]]; } else { a = ce.slice(); s = a.slice(); e = a.slice(); } }
  function commit(move){
    var key = k(a[0], a[1]), v = inp.value.trim(); pick = null;
    if (v[0] === "=") { var t = compile(v.slice(1), 0);
      if (t === "#SYNTAX" || t === "#NAME?" || v.length === 1) { say("Công thức " + v + " có lỗi" + (t === "#NAME?" ? " (tên hàm không đúng hoặc có kí tự lạ)" : " (thiếu hoặc thừa dấu ngoặc, thiếu phép toán, thiếu dấu phẩy…)") + ". Em sửa lại rồi nhấn Enter.", true); return; } }
    if (v) d[key] = v; else delete d[key];
    if (v) say("Đã nhập vào " + key + ": " + kind(v) + (v[0] === "=" ? " → kết quả " + text(key) + ". Vùng nhập dữ liệu hiện công thức, ô hiện kết quả." : "."));
    if (move) { var mg = mergeAt(a[0], a[1]), nr = (mg ? mg[3] : a[1]) + 1; while (nr < R - 1 && hr[nr]) nr++; if (nr < R) a[1] = nr; }
    selectCell(a); inp.blur(); draw(); box.focus();
  }
  function copy(){ clip = {g: rg(), raw: {}, fm: {}}; for (var c = clip.g[0]; c <= clip.g[2]; c++) for (var r = clip.g[1]; r <= clip.g[3]; r++) { clip.raw[k(c, r)] = d[k(c, r)]; if (f[k(c, r)]) { var o = JSON.parse(JSON.stringify(f[k(c, r)])); delete o.m; clip.fm[k(c, r)] = o; } }
    say("Đã sao chép " + q("[data-nb]").textContent + " (Ctrl+C). Chọn ô hoặc vùng muốn dán rồi bấm Dán (Ctrl+V)."); draw(); }
  function paste(){ if (!clip) { say("Chưa sao chép gì. Chọn ô rồi bấm Sao chép (Ctrl+C) trước.", true); return; }
    var g = rg(), cw = clip.g[2] - clip.g[0] + 1, ch = clip.g[3] - clip.g[1] + 1, tw = Math.max(cw, g[2] - g[0] + 1), th = Math.max(ch, g[3] - g[1] + 1), out = [];
    for (var dc = 0; dc < tw; dc++) for (var dr = 0; dr < th; dr++) { var tc = g[0] + dc, tr = g[1] + dr; if (tc >= C || tr >= R) continue;
      var sc = clip.g[0] + dc % cw, sr = clip.g[1] + dr % ch, raw = clip.raw[k(sc, sr)], nv = shift(raw, tc - sc, tr - sr);
      if (nv) d[k(tc, tr)] = nv; else delete d[k(tc, tr)]; if (nv && nv[0] === "=") out.push(k(tc, tr) + " " + nv);
      var fm = clip.fm[k(sc, sr)], old = f[k(tc, tr)] || {}; if (fm) { fm = JSON.parse(JSON.stringify(fm)); if (old.m) fm.m = old.m; f[k(tc, tr)] = fm; } else if (old.m) f[k(tc, tr)] = {m: old.m}; else delete f[k(tc, tr)]; }
    say("Đã dán (Ctrl+V)." + (out.length ? " Công thức sau khi dán: " + (out.length > 4 ? out.slice(0, 3).join("; ") + "; …; " + out[out.length - 1] : out.join("; ")) + "." : "")); draw(); }
  function insert(){
    var g = rg();
    if (wholeCols(g) && !wholeRows(g)) { var at = g[0], n = g[2] - g[0] + 1;
      remap(function(c){ return c >= at ? c + n : c; }, function(r){ return r; });
      for (var i = 0; i < n; i++) w.splice(at, 0, 72); C += n; s = [at, 0]; e = [at + n - 1, R - 1]; a = [at, 0]; log.push("insert-col");
      say("Đã chèn " + n + " cột trống bên trái (cột " + L(at) + "). Các cột phía sau dịch sang phải, công thức tự điều chỉnh địa chỉ."); draw(); return; }
    var at2 = g[1], n2 = wholeRows(g) ? g[3] - g[1] + 1 : 1;
    remap(function(c){ return c; }, function(r){ return r >= at2 ? r + n2 : r; });
    R += n2; s = [0, at2]; e = [C - 1, at2 + n2 - 1]; a = [0, at2]; log.push("insert-row");
    say("Đã chèn " + n2 + " hàng trống ở hàng " + (at2 + 1) + ". Các hàng phía dưới dịch xuống, công thức tự điều chỉnh địa chỉ."); draw(); }
  function delRC(){
    var g = rg();
    if (wholeCols(g) && !wholeRows(g)) { var n = g[2] - g[0] + 1;
      remap(function(c){ return c < g[0] ? c : c > g[2] ? c - n : null; }, function(r){ return r; });
      w.splice(g[0], n); C -= n; selectCell([Math.min(g[0], C - 1), 0]); log.push("del-col"); say("Đã xoá " + n + " cột. Các cột bên phải dịch sang trái."); draw(); return; }
    if (wholeRows(g) && !wholeCols(g)) { var n2 = g[3] - g[1] + 1;
      remap(function(c){ return c; }, function(r){ return r < g[1] ? r : r > g[3] ? r - n2 : null; });
      R -= n2; selectCell([0, Math.min(g[1], R - 1)]); log.push("del-row"); say("Đã xoá " + n2 + " hàng. Các hàng phía dưới dịch lên."); draw(); return; }
    say("Hãy chọn cả hàng hoặc cả cột trước (nháy vào tên hàng hoặc tên cột, kéo để chọn nhiều), rồi bấm Xoá.", true); }
  function hide(on){
    var g = rg(), i, n = 0;
    if (wholeCols(g) && !wholeRows(g)) { for (i = g[0]; i <= g[2]; i++) { if (on) hc[i] = 1; else if (hc[i]) { delete hc[i]; n++; } }
      log.push(on ? "hide-col" : "unhide-col"); say(on ? "Đã ẩn cột " + L(g[0]) + (g[2] > g[0] ? " đến " + L(g[2]) : "") + ". Vạch kép trên tên cột cho biết chỗ có cột bị ẩn." : n ? "Đã hiện lại " + n + " cột." : "Không có cột nào bị ẩn trong vùng chọn. Hãy chọn các cột hai bên chỗ bị ẩn."); }
    else if (wholeRows(g) && !wholeCols(g)) { for (i = g[1]; i <= g[3]; i++) { if (on) hr[i] = 1; else if (hr[i]) { delete hr[i]; n++; } }
      log.push(on ? "hide-row" : "unhide-row"); say(on ? "Đã ẩn hàng " + (g[1] + 1) + (g[3] > g[1] ? " đến " + (g[3] + 1) : "") + ". Vạch kép trên tên hàng cho biết chỗ có hàng bị ẩn." : n ? "Đã hiện lại " + n + " hàng." : "Không có hàng nào bị ẩn trong vùng chọn. Hãy chọn các hàng hai bên chỗ bị ẩn."); }
    else { say("Hãy chọn cả hàng hoặc cả cột trước (nháy vào tên hàng hoặc tên cột, kéo để chọn nhiều).", true); return; }
    if (on) { if (hc[a[0]] || hr[a[1]]) { var c = 0, r = 0; while (hc[c] && c < C - 1) c++; while (hr[r] && r < R - 1) r++; selectCell([c, r]); } }
    draw(); }
  function merge(){
    var g = rg(), tl = k(g[0], g[1]), F = f[tl] || {};
    if (F.m) { delete F.m; delete F.al; say("Đã bỏ gộp ô " + tl + "."); draw(); return; }
    if (g[0] === g[2] && g[1] === g[3]) { say("Hãy đánh dấu vùng gồm nhiều ô muốn gộp.", true); return; }
    var lost = 0; for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r); if (key !== tl) { if (d[key]) lost++; delete d[key]; if (f[key] && f[key].m) delete f[key].m; } }
    f[tl] = F; F.m = [g[2] - g[0] + 1, g[3] - g[1] + 1]; F.al = "center"; log.push("merge");
    say("Đã gộp vùng " + k(g[0], g[1]) + ":" + k(g[2], g[3]) + " và căn giữa. Ô kết quả có địa chỉ là " + tl + (lost ? "; dữ liệu trong " + lost + " ô khác đã bị xoá." : "."));
    a = [g[0], g[1]]; draw(); }
  /* Hộp Format Cells */
  var fc = q("[data-fc]");
  function fcCat(){ return (fc.querySelector("input[name=" + CAT + "]:checked") || {}).value; }
  function fcSample(){ var cat = fcCat(), dp = Math.max(0, Math.min(10, +fc.querySelector("[data-dp]").value || 0)), v = val(k(a[0], a[1]));
    fc.querySelector("[data-fdp]").hidden = cat === "gen" || cat === "date"; fc.querySelector("[data-fsep]").hidden = cat !== "num"; fc.querySelector("[data-fdt]").hidden = cat !== "date";
    if (typeof v !== "number") v = 1234.1; var x = cat === "num" ? fixed(v, dp, fc.querySelector("[data-sep]").checked) : cat === "pct" ? fixed(v * 100, dp) + "%" : cat === "date" ? dateStr(v, true) : general(v);
    fc.querySelector("[data-smp]").textContent = x; }
  function fcOpen(){ var F = f[k(a[0], a[1])] || {}, nf = F.nf || {t:"gen"};
    fc.querySelector("input[value=" + (nf.t || "gen") + "]").checked = true; fc.querySelector("[data-dp]").value = nf.dp != null ? nf.dp : 2; fc.querySelector("[data-sep]").checked = !!nf.sep;
    fc.hidden = false; fcSample(); }
  fc.addEventListener("input", fcSample); fc.addEventListener("change", fcSample);
  fc.querySelector("[data-fno]").addEventListener("click", function(){ fc.hidden = true; box.focus(); });
  fc.querySelector("[data-fok]").addEventListener("click", function(){
    var cat = fcCat(), dp = Math.max(0, Math.min(10, Math.round(+fc.querySelector("[data-dp]").value || 0))), g = rg(), nf = cat === "num" ? {t:"num", dp:dp, sep:fc.querySelector("[data-sep]").checked} : cat === "pct" ? {t:"pct", dp:dp} : cat === "date" ? {t:"date"} : null;
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {}; if (nf) F.nf = JSON.parse(JSON.stringify(nf)); else delete F.nf; }
    fc.hidden = true; log.push("fmt-" + cat); say("Đã định dạng " + q("[data-nb]").textContent + " kiểu " + {gen:"General", num:"Number", pct:"Percentage", date:"Date (Việt Nam)"}[cat] + ". Chỉ cách hiển thị thay đổi, dữ liệu trong ô vẫn giữ nguyên."); draw(); box.focus(); });

  function cellAt(ev){ var t = ev.target; return t && t.tagName === "TD" ? [+t.dataset.c, +t.dataset.r] : null; }
  function pickText(){ var g = pick.g; return g[0] === g[2] && g[1] === g[3] ? k(g[0], g[1]) : k(g[0], g[1]) + ":" + k(g[2], g[3]); }
  var tbl = q("[data-g]"), rz = null;
  tbl.addEventListener("mousedown", function(ev){
    var t = ev.target, ce = cellAt(ev);
    if (t.dataset.rz != null) { rz = {c: +t.dataset.rz, x: ev.clientX, w: w[+t.dataset.rz]}; ev.preventDefault(); return; }
    /* Đang gõ công thức: nháy/kéo chuột để đưa địa chỉ ô, vùng vào công thức */
    if (ce && document.activeElement === inp && inp.value.trim()[0] === "=" && /[=(+\-*/^,;:]\s*$/.test(inp.value.slice(0, inp.selectionStart))) {
      pick = {st: ce, g: [ce[0], ce[1], ce[0], ce[1]], pos: inp.selectionStart, len: 0}; var tx = pickText();
      inp.value = inp.value.slice(0, pick.pos) + tx + inp.value.slice(pick.pos); pick.len = tx.length; drag = true; draw(); ev.preventDefault();
      var at = pick.pos + pick.len; setTimeout(function(){ inp.focus(); inp.setSelectionRange(at, at); }, 0); return; }
    if (ce) { selectCell(ce); drag = true; hdr = null; }
    else if (t.dataset.c != null) { s = [+t.dataset.c, 0]; e = [+t.dataset.c, R - 1]; a = s.slice(); hdr = "c"; drag = true; }
    else if (t.dataset.r != null) { s = [0, +t.dataset.r]; e = [C - 1, +t.dataset.r]; a = s.slice(); hdr = "r"; drag = true; }
    else return;
    pick = null; if (document.activeElement === inp) inp.blur();
    draw(); selInfo(); box.focus(); ev.preventDefault();
  });
  tbl.addEventListener("mouseover", function(ev){ if (!drag) return; var t = ev.target, ce = cellAt(ev);
    if (hdr === "c" && t.dataset && t.dataset.c != null && t.tagName === "TH") { e = [+t.dataset.c, R - 1]; draw(); selInfo(); return; }
    if (hdr === "r" && t.dataset && t.dataset.r != null && t.tagName === "TH") { e = [C - 1, +t.dataset.r]; draw(); selInfo(); return; }
    if (!ce || hdr) return;
    if (pick) { pick.g = [Math.min(pick.st[0], ce[0]), Math.min(pick.st[1], ce[1]), Math.max(pick.st[0], ce[0]), Math.max(pick.st[1], ce[1])]; var tx = pickText();
      inp.value = inp.value.slice(0, pick.pos) + tx + inp.value.slice(pick.pos + pick.len); pick.len = tx.length; draw(); inp.focus(); inp.setSelectionRange(pick.pos + pick.len, pick.pos + pick.len); return; }
    var mg = mergeAt(ce[0], ce[1]); e = mg ? [Math.max(mg[2], ce[0]), Math.max(mg[3], ce[1])] : ce; draw(); selInfo(); });
  window.addEventListener("mousemove", function(ev){ if (!rz) return; w[rz.c] = Math.max(24, rz.w + ev.clientX - rz.x); var cols = q("[data-g]").querySelectorAll("col"), idx = 0;
    for (var c = 0; c <= rz.c; c++) if (!hc[c]) idx++; if (cols[idx]) cols[idx].style.width = w[rz.c] + "px"; });
  window.addEventListener("mouseup", function(){ if (rz) { say("Đã đổi độ rộng cột " + L(rz.c) + "."); rz = null; draw(); } if (pick && drag) { drag = false; inp.focus(); } drag = false; hdr = null; });
  tbl.addEventListener("touchstart", function(ev){ var ce = cellAt(ev); if (ce && !(document.activeElement === inp && inp.value.trim()[0] === "=")) { selectCell(ce); draw(); selInfo(); } }, {passive: true});
  tbl.addEventListener("dblclick", function(ev){ if (ev.target.tagName !== "TD") return; inp.value = d[k(a[0], a[1])] || ""; inp.focus(); say("Đang sửa ô " + k(a[0], a[1]) + ". Sửa xong nhấn Enter."); });
  inp.addEventListener("keydown", function(ev){ if (ev.key === "Enter") { ev.preventDefault(); commit(true); } else if (ev.key === "Escape") { pick = null; inp.value = d[k(a[0], a[1])] || ""; inp.blur(); draw(); box.focus(); } else pick = null; });
  inp.addEventListener("focus", function(){ if (!pick) { s = a.slice(); e = a.slice(); var mg = mergeAt(a[0], a[1]); if (mg) e = [mg[2], mg[3]]; } });
  box.addEventListener("keydown", function(ev){
    if (ev.target !== box) return;
    if ((ev.ctrlKey || ev.metaKey) && /^[cC]$/.test(ev.key)) { copy(); ev.preventDefault(); return; }
    if ((ev.ctrlKey || ev.metaKey) && /^[vV]$/.test(ev.key)) { paste(); ev.preventDefault(); return; }
    if (ev.key === "Escape") { clip = null; fc.hidden = true; draw(); return; }
    var mv = {ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0]}[ev.key];
    if (mv) { var c = a[0], r = a[1]; do { c += mv[0]; r += mv[1]; } while (c >= 0 && r >= 0 && c < C && r < R && (hc[c] || hr[r]));
      if (c >= 0 && r >= 0 && c < C && r < R) selectCell([c, r]); draw(); selInfo(); ev.preventDefault(); return; }
    if (ev.key === "Delete" || ev.key === "Backspace") { var g = rg(); for (var x = g[0]; x <= g[2]; x++) for (var y = g[1]; y <= g[3]; y++) delete d[k(x, y)]; say("Đã xoá dữ liệu trong " + q("[data-nb]").textContent + "."); draw(); ev.preventDefault(); return; }
    if (ev.key === "Enter") { var nr = rg()[3] + 1; while (nr < R - 1 && hr[nr]) nr++; selectCell([a[0], Math.min(R - 1, nr)]); draw(); selInfo(); ev.preventDefault(); return; }
    if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) { inp.focus(); inp.value = ev.key; ev.preventDefault(); say("Đang nhập vào ô " + k(a[0], a[1]) + ". Nhập xong nhấn Enter. Công thức: có thể nháy, kéo chuột trên bảng để đưa địa chỉ ô, vùng vào."); }
  });
  box.querySelectorAll("[data-f]").forEach(function(b){ b.addEventListener("click", function(){
    var t = b.dataset.f, g = rg();
    if (t === "reset") { reset(); fc.hidden = true; say("Đã làm lại từ đầu."); draw(); return; }
    if (t === "copy") { copy(); box.focus(); return; }
    if (t === "paste") { paste(); box.focus(); return; }
    if (t === "insert") { insert(); box.focus(); return; }
    if (t === "del") { delRC(); box.focus(); return; }
    if (t === "hide" || t === "unhide") { hide(t === "hide"); box.focus(); return; }
    if (t === "merge") { merge(); box.focus(); return; }
    if (t === "fmt") { if (fc.hidden) fcOpen(); else fc.hidden = true; return; }
    var first = f[k(g[0], g[1])] || {}, on = !first[t];
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {};
      if (t === "left" || t === "center" || t === "right") F.al = t; else F[t] = on; }
    say("Đã định dạng " + q("[data-nb]").textContent + "."); draw(); box.focus();
  }); });
  var api = {val: val, text: text, raw: function(key){ return d[key]; }, set: function(key, v){ if (v) d[key] = v; else delete d[key]; }, redraw: function(){ draw(); }, say: say};
  box.querySelectorAll("[data-x]").forEach(function(b){ b.addEventListener("click", function(){ opt.extra[+b.dataset.x].run(api); draw(); box.focus(); }); });
  q("[data-tab]").addEventListener("dblclick", function(){
    var tab = q("[data-tab]"); if (tab.querySelector("input")) return; tab.innerHTML = "<input value='" + sheet.replace(/'/g, "&#39;") + "'>"; var i = tab.querySelector("input"), ok = false; i.focus(); i.select();
    function done(){ if (ok) return; ok = true; sheet = i.value.trim() || sheet; tab.textContent = sheet; say("Đã đổi tên trang tính thành " + sheet + "."); draw(); }
    i.addEventListener("keydown", function(ev){ if (ev.key === "Enter") done(); }); i.addEventListener("blur", done);
  });
  draw(); selInfo();
  return api;
};
window.BangTinh.n = 0;
})();
