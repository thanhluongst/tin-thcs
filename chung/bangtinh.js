/* BẢNG TÍNH MÔ PHỎNG dùng chung cho các bài bảng tính (Tin 7 Bài 7, 8, 9,…)
   BangTinh(phần tử, tuỳ chọn) — chọn ô/vùng/hàng/cột, nhập, sửa, xoá, tự căn chỉnh, định dạng, độ rộng cột,
   đổi tên trang tính, công thức (+ - * / ^, & ghép xâu, so sánh = < > <= >= <>, ngoặc, địa chỉ ô, vùng), hàm SUM AVERAGE MIN MAX COUNT COUNTIF SUMIF IF,
   tự động tính lại, sao chép công thức (địa chỉ tương đối), chèn/xoá hàng, cột, ẩn/hiện hàng, cột,
   gộp ô (Merge & Center), Format Cells (Number, Percentage, Date kiểu Việt Nam), cộng trừ ngày tháng,
   kẻ đường viền/khung (Border), màu nền, xem trước khi in (không có đường lưới).
   Data Validation (tools "valid"): Settings (Any value, Whole number, Decimal, List, Date, Text length; between, greater than,…; Source),
   Input Message, Error Alert (Stop / Warning / Information); danh sách thả xuống ▾ ở ô; thông báo lỗi khi nhập sai. Lưu trong f[ô].dv.
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
 + ".bt .pal{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:13px}.bt .pal button{width:26px;height:22px;border:1px solid #888;border-radius:4px;cursor:pointer;padding:0}"
 + ".bt .pv{border:1px solid #999;background:#e9e9e9;padding:10px;display:grid;gap:6px;overflow:auto;max-height:520px}.bt .pv .pg{background:#fff;color:#111;padding:18px 22px;box-shadow:0 1px 4px rgba(0,0,0,.3);justify-self:start;min-width:300px}"
 + ".bt .pv table{border-collapse:collapse;font:12px/1.3 Calibri,'Be Vietnam Pro',Arial,sans-serif;background:#fff}.bt .pv td{border:0;padding:1px 4px;white-space:nowrap;height:18px}"
 + ".bt .pv .h{font-weight:700;color:#333;font-size:13.5px;display:flex;gap:10px;align-items:center}.bt .pv .h button{font:inherit;font-size:13px;border:1px solid #888;background:#fff;border-radius:5px;padding:1px 12px;cursor:pointer;font-weight:400}"
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
 + ".bt{position:relative}.bt td .dd{float:right;margin-right:-3px;width:16px;height:18px;border:1px solid #999;background:#f3f3f3;font-size:10px;line-height:16px;text-align:center;cursor:pointer;color:#333}"
 + ".bt .ddl{position:absolute;z-index:20;background:#fff;color:#111;border:1px solid #888;box-shadow:0 3px 10px rgba(0,0,0,.2);max-height:200px;overflow:auto;font:13.5px Calibri,'Be Vietnam Pro',Arial,sans-serif;min-width:120px}"
 + ".bt .ddl div{padding:2px 8px;cursor:pointer;white-space:nowrap}.bt .ddl div:hover{background:#d3e3fb}"
 + ".bt .imt{position:absolute;z-index:15;background:#ffffe1;color:#111;border:1px solid #777;padding:4px 8px;font:12.5px Calibri,'Be Vietnam Pro',Arial,sans-serif;max-width:220px;box-shadow:1px 2px 4px rgba(0,0,0,.2);pointer-events:none}"
 + ".bt .dvd{border:1px solid #9aa4ae;background:#fff;color:#111;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.18);font-size:13px;max-width:460px}"
 + ".bt .dvd .hd{display:flex;justify-content:space-between;padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600}.bt .dvd .hd button{border:0;background:none;font-size:16px;cursor:pointer}"
 + ".bt .dvd .tabs2{display:flex;gap:2px;padding:6px 10px 0}.bt .dvd .tabs2 button{font:inherit;font-size:12.5px;border:1px solid #ccc;border-bottom:0;background:#eee;border-radius:4px 4px 0 0;padding:3px 10px;cursor:pointer;color:#111}.bt .dvd .tabs2 button.on{background:#fff;font-weight:600}"
 + ".bt .dvd .bx{border-top:1px solid #ccc;padding:8px 10px;display:grid;gap:6px}.bt .dvd label{display:block}.bt .dvd .two{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:end}"
 + ".bt .dvd select,.bt .dvd input[type=text],.bt .dvd textarea{font:inherit;font-size:13px;border:1px solid #bbb;border-radius:3px;padding:2px 5px;width:100%;box-sizing:border-box;background:#fff;color:#111}.bt .dvd textarea{min-height:52px}"
 + ".bt .dvd .ft2{display:flex;gap:6px;justify-content:space-between;padding:8px 10px;border-top:1px solid #ddd}.bt .dvd .ft2 button,.bt .ea button{font:inherit;font-size:13px;border:1px solid #999;background:#f6f6f6;color:#111;border-radius:4px;padding:3px 12px;cursor:pointer}"
 + ".bt .ea{position:absolute;z-index:30;left:50%;top:40%;transform:translate(-50%,-50%);background:#fff;color:#111;border:1px solid #888;box-shadow:0 6px 24px rgba(0,0,0,.3);min-width:280px;max-width:92%;border-radius:4px;font-size:13.5px}"
 + ".bt .ea .hd{padding:6px 10px;border-bottom:1px solid #ddd;font-weight:600}.bt .ea .bd{display:flex;gap:10px;align-items:center;padding:12px}.bt .ea .ic{font-size:26px}.bt .ea .bt2{display:flex;gap:6px;justify-content:center;padding:0 12px 12px}"
 + ".bt .ck li::before{content:'☐ '}.bt .ck li.ok::before{content:'☑ ';color:#1c7c54}.bt .ck li.ok{color:#1c7c54;font-weight:600}";
function addCss(){ if (document.getElementById("bangtinh-css")) return; var s = document.createElement("style"); s.id = "bangtinh-css"; s.textContent = CSS; document.head.appendChild(s); }

var TOOLS = {
  copy:['📋 Sao chép','Sao chép (Ctrl+C)'], paste:['📌 Dán','Dán (Ctrl+V)'],
  insert:['➕ Chèn','Chèn (Insert): chọn cả cột thì chèn cột bên trái; chọn hàng hoặc ô thì chèn hàng phía trên'],
  del:['➖ Xoá hàng/cột','Xoá (Delete) các hàng hoặc cột đang chọn (nháy tên hàng/cột để chọn)'],
  hide:['🙈 Ẩn','Ẩn (Hide) các hàng hoặc cột đang chọn'], unhide:['👁 Hiện','Hiện lại (Unhide): chọn các hàng/cột xung quanh vị trí bị ẩn'],
  merge:['⬌ Gộp ô','Merge & Center: gộp các ô của vùng và căn giữa'], fmt:['🔢 Format Cells','Định dạng dữ liệu số, phần trăm, ngày tháng'],
  border:['▦ Kẻ viền','Format Cells → Border: kẻ đường viền ô và khung bao quanh vùng'], fillc:['🎨 Màu nền','Chọn màu nền cho ô'],
  print:['🖨 Xem trước khi in','File/Print: xem trang in (đang chọn vùng thì in vùng chọn – Print Selection)'],
  b:['<b>B</b>','Chữ đậm'], i:['<i>I</i>','Chữ nghiêng'], big:['A⁺','Tăng cỡ chữ'], green:['<span style="color:#1d8a3a;font-weight:700">A</span>','Chữ xanh lá'],
  valid:['✅ Data Validation','Data/Data Tools/Data Validation: giới hạn kiểu dữ liệu hoặc giá trị nhập vào ô'],
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
      if ((m = /^(<=|>=|<>)/.exec(r))) { t.push({t:m[0]}); i += 2; continue; }
      if ("+-*/^(),;:&<>=".indexOf(r[0]) >= 0) { t.push({t:r[0]}); i++; continue; }
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
    function txt(x){ x = scalar(x); return typeof x === "boolean" ? (x ? "TRUE" : "FALSE") : String(x); }
    function cmp(){ var v = cat(); while (["=","<",">","<=",">=","<>"].some(peek)) { var o = t[p++].t, b = cat(), a1 = scalar(v), b1 = scalar(b), c;
        if ((typeof a1 === "number" || isNum(a1)) && (typeof b1 === "number" || isNum(b1))) c = +a1 - +b1; else { var x1 = txt(a1).toLowerCase(), y1 = txt(b1).toLowerCase(); c = x1 < y1 ? -1 : x1 > y1 ? 1 : 0; }
        v = o === "=" ? c === 0 : o === "<" ? c < 0 : o === ">" ? c > 0 : o === "<=" ? c <= 0 : o === ">=" ? c >= 0 : c !== 0; } return v; }
    function cat(){ var v = expr(); while (peek("&")) { p++; var b = expr(); v = txt(v) + txt(b); } return v; }
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
      if (x.t === "(") { p++; var v = cmp(); eat(")"); return v; }
      if (x.t === "f") { p++; if (!peek("(")) E("#NAME?"); p++; var args = [];
        if (!peek(")")) { args.push(cmp()); while (peek(",") || peek(";")) { p++; args.push(cmp()); } }
        eat(")"); return fn(x.v, args); }
      E("#SYNTAX");
    }
    function crit(cr){ /* điều kiện của COUNTIF/SUMIF: ">100", "Yes", "Y*", số, giá trị ô */
      cr = scalar(cr); if (typeof cr === "boolean") cr = cr ? "TRUE" : "FALSE";
      var op = "=", rhs = cr;
      if (typeof cr === "string") { var m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(cr); op = m[1] || "="; rhs = m[2]; }
      var rn = typeof rhs === "number" ? rhs : isNum(rhs) ? +rhs : null;
      var re = typeof rhs === "string" && /[*?]/.test(rhs) ? new RegExp("^" + rhs.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i") : null;
      return function(v){
        if (rn !== null && op !== "=" && op !== "<>") { if (typeof v !== "number") return false; return op === "<" ? v < rn : op === ">" ? v > rn : op === "<=" ? v <= rn : v >= rn; }
        var eq;
        if (rn !== null) eq = typeof v === "number" ? v === rn : isNum(v) && +v === rn;
        else if (re) eq = typeof v === "string" && re.test(v);
        else eq = String(v === true ? "TRUE" : v === false ? "FALSE" : v).toLowerCase() === String(rhs).toLowerCase() && !(rhs === "" && v !== "");
        return op === "<>" ? !eq : eq; }; }
    function cells(x){ if (!x || !x.rg) E("#VALUE!"); var g = x.rg, out = []; for (var r = g[1]; r <= g[3]; r++) for (var c = g[0]; c <= g[2]; c++) out.push({c: c, r: r, v: cell(c, r)}); return out; }
    function fn(name, args){
      if (name === "COUNTIF") { if (args.length !== 2) E("#VALUE!"); var t = crit(args[1]); return cells(args[0]).filter(function(o){ return o.v !== "" && t(o.v); }).length; }
      if (name === "SUMIF") { if (args.length < 2 || args.length > 3) E("#VALUE!"); var t2 = crit(args[1]), rg0 = args[0].rg || E("#VALUE!"), sr = args[2] && args[2].rg ? args[2].rg : rg0;
        return cells(args[0]).reduce(function(m, o){ if (o.v === "" || !t2(o.v)) return m; var v = cell(sr[0] + (o.c - rg0[0]), sr[1] + (o.r - rg0[1])); return m + (typeof v === "number" ? v : 0); }, 0); }
      if (name === "IF") { if (args.length < 2 || args.length > 3) E("#VALUE!"); var cnd = scalar(args[0]); if (typeof cnd !== "boolean") { if (typeof cnd === "number") cnd = cnd !== 0; else if (/^(true|false)$/i.test(cnd)) cnd = /^true$/i.test(cnd); else E("#VALUE!"); }
        var out = cnd ? args[1] : (args.length === 3 ? args[2] : false); out = scalar(out); return out === "" ? 0 : out; }
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
    var v = cmp(); if (p < t.length) E("#SYNTAX");
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
    if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
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
    + '<div class="fc" data-bd hidden><div class="h">Format Cells · Border</div><div class="row">Presets: <button type="button" data-bp="none">None</button><button type="button" data-bp="outline">Outline</button><button type="button" data-bp="inside">Inside</button><button type="button" data-bp="all">Outline + Inside</button><button type="button" data-bp="x">Đóng</button></div><div class="row" style="font-size:12.5px">None: không kẻ khung · Outline: kẻ khung bên ngoài · Inside: kẻ đường viền ô bên trong</div></div>'
    + '<div class="pal" data-pal hidden>Màu nền: <button type="button" data-pc="#ffe94d" style="background:#ffe94d" title="Vàng"></button><button type="button" data-pc="#f4a340" style="background:#f4a340" title="Cam"></button><button type="button" data-pc="#3e9b5a" style="background:#3e9b5a" title="Xanh lá đậm"></button><button type="button" data-pc="#a9dcb5" style="background:#a9dcb5" title="Xanh lá nhạt"></button><button type="button" data-pc="#9cc3f0" style="background:#9cc3f0" title="Xanh dương nhạt"></button><button type="button" data-pc="#f3b6c8" style="background:#f3b6c8" title="Hồng"></button><button type="button" data-pc="" style="background:#fff" title="Không màu">✕</button></div>'
    + '<div class="pv" data-pv hidden></div><div class="dvd" data-dvd hidden></div>'
    + '<div class="fb"><span class="nb" data-nb>A1</span><span class="fx">fx</span><input data-in aria-label="Vùng nhập dữ liệu" placeholder="Vùng nhập dữ liệu (công thức bắt đầu bằng =)" autocomplete="off" spellcheck="false"></div>'
    + '<div class="gw"><table data-g></table></div>'
    + '<div class="tabs"><span class="tab" data-tab title="Nháy đúp để đổi tên"></span></div>'
    + '<div class="msg" data-msg aria-live="polite"></div><div class="ddl" data-ddl hidden></div><div class="imt" data-imt hidden></div><div class="ea" data-ea hidden role="alertdialog"></div>'
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
  var BL = "1px solid #222";
  function bstyle(c, r, F){ var x = "", m = F.m, c1 = m ? c + m[0] - 1 : c, r1 = m ? r + m[1] - 1 : r, Fb = f[k(c, r1)] || {}, Fr = f[k(c1, r)] || {};
    if (F.bt) x += "border-top:" + BL + ";"; if (F.bl) x += "border-left:" + BL + ";"; if (Fb.bb) x += "border-bottom:" + BL + ";"; if (Fr.br) x += "border-right:" + BL + ";"; return x; }
  function border(t){ var g = rg();
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {};
      if (t === "none") { delete F.bt; delete F.bb; delete F.bl; delete F.br; continue; }
      if (t === "outline" || t === "all") { if (r === g[1]) F.bt = 1; if (r === g[3]) F.bb = 1; if (c === g[0]) F.bl = 1; if (c === g[2]) F.br = 1; }
      if (t === "inside" || t === "all") { if (r > g[1]) F.bt = 1; if (r < g[3]) F.bb = 1; if (c > g[0]) F.bl = 1; if (c < g[2]) F.br = 1; } }
    log.push("border-" + t); say({none:"Đã bỏ đường kẻ", outline:"Đã kẻ khung bao quanh", inside:"Đã kẻ đường viền các ô bên trong", all:"Đã kẻ khung và đường viền các ô"}[t] + " vùng " + q("[data-nb]").textContent + "."); draw(); }
  function used(){ var c0 = 1e9, r0 = 1e9, c1 = -1, r1 = -1; Object.keys(d).forEach(function(key){ var m = /^([A-Z]+)(\d+)$/.exec(key), c = colIdx(m[1]), r = +m[2] - 1; c0 = Math.min(c0, c); r0 = Math.min(r0, r); c1 = Math.max(c1, c); r1 = Math.max(r1, r); });
    return c1 < 0 ? [0, 0, 0, 0] : [c0, r0, c1, r1]; }
  function preview(){
    var g = rg(), sel = (g[0] !== g[2] || g[1] !== g[3]) && !mergeAt(a[0], a[1]), z = sel ? g : used(), cov = {}, h = "", c, r;
    Object.keys(f).forEach(function(key){ var m = f[key].m; if (!m) return; var mm = /^([A-Z]+)(\d+)$/.exec(key), c0 = colIdx(mm[1]), r0 = +mm[2] - 1;
      for (c = c0; c < c0 + m[0]; c++) for (r = r0; r < r0 + m[1]; r++) if (c !== c0 || r !== r0) cov[k(c, r)] = 1; });
    for (r = z[1]; r <= z[3]; r++) { if (hr[r]) continue; h += "<tr>";
      for (c = z[0]; c <= z[2]; c++) { if (hc[c]) continue; var key = k(c, r); if (cov[key]) continue; var v = val(key), F = f[key] || {}, span = "",
        st = "text-align:" + (F.al || (typeof v === "number" ? "right" : "left")) + ";min-width:" + Math.round(w[c] * 0.8) + "px;";
        if (F.b) st += "font-weight:700;"; if (F.i) st += "font-style:italic;"; if (F.big) st += "font-size:15px;"; if (F.green) st += "color:#1d8a3a;"; if (F.fill) st += "background:" + (F.fill === true ? "#ffe94d" : F.fill) + ";"; st += bstyle(c, r, F);
        if (F.m) { var cs = 0, rs = 0, x; for (x = c; x < c + F.m[0] && x <= z[2]; x++) if (!hc[x]) cs++; for (x = r; x < r + F.m[1] && x <= z[3]; x++) if (!hr[x]) rs++; span = " colspan='" + cs + "' rowspan='" + rs + "'"; st += "vertical-align:middle;"; }
        h += "<td style='" + st + "'" + span + ">" + text(key).replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</td>"; }
      h += "</tr>"; }
    var pv = q("[data-pv]"), hcs = Object.keys(hc).map(Number).sort(function(x, y){ return x - y; });
    pv.innerHTML = "<div class='h'>🖨 Xem trước khi in · " + (sel ? "Print Selection (" + k(z[0], z[1]) + ":" + k(z[2], z[3]) + ")" : "Print Active Sheets") + " · A4<button type='button' data-pvx>Đóng</button></div>"
      + "<div class='pg'><table>" + h + "</table></div><div style='font-size:12.5px;color:#333'>Trên giấy in không có các đường lưới của trang tính, chỉ có những đường viền, khung em đã kẻ" + (hcs.length ? "; các cột, hàng bị ẩn không được in" : "") + ".</div>";
    pv.hidden = false; pv.querySelector("[data-pvx]").addEventListener("click", function(){ pv.hidden = true; box.focus(); });
    log.push("print:" + hcs.join(",") + (sel ? ":sel" : "")); say("Đã mở xem trước khi in. Muốn in thật, em dùng lệnh File/Print (Ctrl+P) trong phần mềm bảng tính."); draw(); }
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
        if (F.b) st += "font-weight:700;"; if (F.i) st += "font-style:italic;"; if (F.big) st += "font-size:17px;"; if (F.green) st += "color:#1d8a3a;"; if (F.fill) st += "background:" + (F.fill === true ? "#ffe94d" : F.fill) + ";"; st += bstyle(c, r, F);
        if (F.m) { var cs = 0, rs = 0, x; for (x = c; x < c + F.m[0]; x++) if (!hc[x]) cs++; for (x = r; x < r + F.m[1]; x++) if (!hr[x]) rs++; span = " colspan='" + cs + "' rowspan='" + rs + "'"; st += "vertical-align:middle;"; }
        var inC = clip && c >= clip.g[0] && c <= clip.g[2] && r >= clip.g[1] && r <= clip.g[3];
        var inP = pick && c >= pick.g[0] && c <= pick.g[2] && r >= pick.g[1] && r <= pick.g[3];
        var cls = inP ? "pk" : (c === a[0] && r === a[1]) ? "act" : inC ? "cp" : (c >= g[0] && c <= g[2] && r >= g[1] && r <= g[3] && (g[0] !== g[2] || g[1] !== g[3])) ? "sel" : "";
        if (err) cls += " err";
        var dvA = c === a[0] && r === a[1] && F.dv && F.dv.allow === "list" && F.dv.drop !== false ? "<span class='dd' data-dd title='Chọn từ danh sách'>▼</span>" : "";
        h += "<td data-k='" + key + "' data-c='" + c + "' data-r='" + r + "' class='" + cls + "' style='" + st + "'" + span + ">" + dvA + text(key).replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</td>"; }
      h += "</tr>"; }
    q("[data-g]").innerHTML = h;
    var n = (g[2] - g[0] + 1) * (g[3] - g[1] + 1), mg = mergeAt(a[0], a[1]);
    q("[data-nb]").textContent = n > 1 && !(mg && mg[0] === g[0] && mg[1] === g[1] && mg[2] === g[2] && mg[3] === g[3]) ? k(g[0], g[1]) + ":" + k(g[2], g[3]) : k(a[0], a[1]);
    if (document.activeElement !== inp) inp.value = d[k(a[0], a[1])] || "";
    if (!q("[data-tab] input")) q("[data-tab]").textContent = sheet;
    imsg();
    if (opt.check) { var res = opt.check({d: d, f: f, sheet: sheet, dv: function(key){ return (f[key] || {}).dv || null; }, w: w, hr: hr, hc: hc, log: log, C: C, R: R, val: val, text: text});
      q("[data-ck]").innerHTML = res.map(function(x){ return "<li class='" + (x[1] ? "ok" : "") + "'>" + x[0] + "</li>"; }).join(""); }
  }
  function say(t, bad){ var m = q("[data-msg]"); m.textContent = t; m.className = "msg" + (bad ? " bad" : ""); }
  function selInfo(){ var g = rg(), n = (g[2] - g[0] + 1) * (g[3] - g[1] + 1), key = k(a[0], a[1]), raw = d[key];
    say(wholeCols(g) && n > 1 ? "Đã chọn " + (g[0] === g[2] ? "cột " + L(g[0]) : "các cột " + L(g[0]) + " đến " + L(g[2])) + "."
      : wholeRows(g) && n > 1 ? "Đã chọn " + (g[1] === g[3] ? "hàng " + (g[1] + 1) : "các hàng " + (g[1] + 1) + " đến " + (g[3] + 1)) + "."
      : n > 1 && !mergeAt(a[0], a[1]) ? "Đã chọn vùng " + k(g[0], g[1]) + ":" + k(g[2], g[3]) + " (" + n + " ô)."
      : "Ô " + key + (raw ? ": dữ liệu kiểu " + kind(raw) + (raw[0] === "=" ? ", kết quả " + text(key) : "") + "." : " đang trống.")); }
  function selectCell(ce){ var mg = mergeAt(ce[0], ce[1]); if (mg) { a = [mg[0], mg[1]]; s = [mg[0], mg[1]]; e = [mg[2], mg[3]]; } else { a = ce.slice(); s = a.slice(); e = a.slice(); } }
  function commit(move, force){
    var key = k(a[0], a[1]), v = inp.value.trim(); pick = null;
    if (v[0] === "=") { var t = compile(v.slice(1), 0);
      if (t === "#SYNTAX" || t === "#NAME?" || v.length === 1) { say("Công thức " + v + " có lỗi" + (t === "#NAME?" ? " (tên hàm không đúng hoặc có kí tự lạ)" : " (thiếu hoặc thừa dấu ngoặc, thiếu phép toán, thiếu dấu phẩy…)") + ". Em sửa lại rồi nhấn Enter.", true); return; } }
    var DV = (f[key] || {}).dv;
    if (DV && !(force === true) && !(v === "" && DV.blank !== false) && !dvOK(DV, v)) { log.push("dv-reject"); errAlert(DV, key, v); return; }
    if (DV && v) log.push("dv-ok");
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

  /* ---------- Data Validation ---------- */
  var ALLOW = [["any","Any value"],["whole","Whole number"],["decimal","Decimal"],["list","List"],["date","Date"],["time","Time"],["len","Text length"],["custom","Custom"]];
  var OPS = [["between","between"],["nbetween","not between"],["eq","equal to"],["ne","not equal to"],["gt","greater than"],["lt","less than"],["ge","greater than or equal to"],["le","less than or equal to"]];
  function listItems(src){ src = String(src || "").trim().replace(/^=/, "").replace(/\$/g, "");
    var m = /^([A-Za-z]{1,2})(\d+):([A-Za-z]{1,2})(\d+)$/.exec(src);
    if (m) { var out = [], c0 = colIdx(m[1]), r0 = +m[2] - 1, c1 = colIdx(m[3]), r1 = +m[4] - 1; for (var r = Math.min(r0, r1); r <= Math.max(r0, r1); r++) for (var c = Math.min(c0, c1); c <= Math.max(c0, c1); c++) { var t = text(k(c, r)); if (t !== "") out.push(t); } return out; }
    return src ? src.split(/[,;]/).map(function(x){ return x.trim(); }).filter(Boolean) : []; }
  function dvNum(x){ x = String(x == null ? "" : x).trim(); if (/^[A-Za-z]{1,2}\d+$/.test(x)) return val(x.toUpperCase()); var dt = parseDate(x); return dt !== null ? dt : isNum(x) ? +x : NaN; }
  function cmpOp(op, v, a1, b1){ switch (op) { case "between": return v >= a1 && v <= b1; case "nbetween": return v < a1 || v > b1; case "eq": return v === a1; case "ne": return v !== a1; case "gt": return v > a1; case "lt": return v < a1; case "ge": return v >= a1; case "le": return v <= a1; } return true; }
  function dvOK(D, raw){ var t = String(raw).trim();
    if (D.allow === "any" || D.allow === "custom" || D.allow === "time") return true;
    if (D.allow === "list") { var it = listItems(D.src).map(function(x){ return x.toLowerCase(); }); return it.indexOf(t.toLowerCase()) >= 0; }
    if (t[0] === "=") { var cv = compile(t.slice(1), 0); t = String(cv); }
    var v;
    if (D.allow === "len") v = t.length;
    else if (D.allow === "date") { v = parseDate(t); if (v === null) return false; }
    else { if (!isNum(t)) return false; v = +t; if (D.allow === "whole" && Math.floor(v) !== v) return false; }
    return cmpOp(D.op, v, dvNum(D.min), dvNum(D.max)); }
  function dvDefaultMsg(D){ var o = (OPS.filter(function(x){ return x[0] === D.op; })[0] || ["",""])[1];
    return "Giá trị này không khớp với các hạn chế xác thực dữ liệu đã đặt cho ô (" + (ALLOW.filter(function(x){ return x[0] === D.allow; })[0] || ["", D.allow])[1] + (D.allow === "list" ? ": " + listItems(D.src).join(", ") : ", " + o + " " + (D.min || "") + (/between/.test(D.op) ? " và " + (D.max || "") : "")) + ")."; }
  var EA = null;
  function errAlert(D, key, v){ var E = D.err || {}, st = E.style || "stop", ea = q("[data-ea]");
    if (E.show === false) { d[key] = v; say("Đã nhập vào " + key + " (Error Alert đang tắt nên không báo lỗi)."); inp.blur(); draw(); return; }
    var ic = st === "stop" ? "⛔" : st === "warn" ? "⚠️" : "ℹ️", msg = E.text || "This value doesn't match the data validation restrictions defined for this cell.";
    var btns = st === "stop" ? [["retry","Retry"],["cancel","Cancel"],["help","Help"]] : st === "warn" ? [["yes","Yes"],["no","No"],["cancel","Cancel"]] : [["ok","OK"],["cancel","Cancel"]];
    ea.innerHTML = '<div class="hd">' + (E.title || "Microsoft Excel").replace(/</g, "&lt;") + '</div><div class="bd"><span class="ic">' + ic + "</span><div>" + msg.replace(/</g, "&lt;") + (st === "warn" ? "<br><b>Continue?</b>" : "") + '</div></div><div class="bt2">' + btns.map(function(b){ return '<button type="button" data-eb="' + b[0] + '">' + b[1] + "</button>"; }).join("") + "</div>";
    ea.hidden = false; EA = {key: key, v: v}; say("Ô " + key + " không nhận giá trị “" + v + "”. " + dvDefaultMsg(D), true);
    var first = ea.querySelector("button"); if (first) first.focus(); }
  q("[data-ea]").addEventListener("click", function(ev){ var b = ev.target.closest("[data-eb]"); if (!b || !EA) return; var t = b.dataset.eb, ea = q("[data-ea]");
    if (t === "help") { say("Retry: nhập lại giá trị; Cancel: huỷ, giữ dữ liệu cũ."); return; }
    ea.hidden = true; var o = EA; EA = null;
    if (t === "retry" || t === "no") { inp.focus(); inp.select(); say("Nhập lại giá trị cho ô " + o.key + " rồi nhấn Enter."); return; }
    if (t === "cancel") { inp.value = d[o.key] || ""; inp.blur(); draw(); box.focus(); say("Đã huỷ, ô " + o.key + " giữ nguyên dữ liệu cũ."); return; }
    inp.value = o.v; commit(true, true); log.push("dv-override"); });
  function imsg(){ var im = q("[data-imt]"), F = f[k(a[0], a[1])] || {}, D = F.dv, td = q("td[data-k='" + k(a[0], a[1]) + "']");
    if (!D || !D.imsg || D.imsg.show === false || !(D.imsg.title || D.imsg.text) || !td) { im.hidden = true; return; }
    var br = box.getBoundingClientRect(), tr = td.getBoundingClientRect();
    im.innerHTML = (D.imsg.title ? "<b>" + D.imsg.title.replace(/</g, "&lt;") + "</b><br>" : "") + (D.imsg.text || "").replace(/</g, "&lt;");
    im.style.left = Math.max(0, tr.left - br.left + 12) + "px"; im.style.top = (tr.bottom - br.top + 4) + "px"; im.hidden = false; }
  function openList(){ var key = k(a[0], a[1]), D = (f[key] || {}).dv, td = q("td[data-k='" + key + "']"); if (!D || !td) return;
    var dl = q("[data-ddl]"), br = box.getBoundingClientRect(), tr = td.getBoundingClientRect(), it = listItems(D.src);
    dl.innerHTML = it.length ? it.map(function(x){ return "<div data-li>" + x.replace(/</g, "&lt;") + "</div>"; }).join("") : "<div>(danh sách trống)</div>";
    dl.style.left = (tr.left - br.left) + "px"; dl.style.top = (tr.bottom - br.top) + "px"; dl.style.minWidth = tr.width + "px"; dl.hidden = false; q("[data-imt]").hidden = true; }
  q("[data-ddl]").addEventListener("mousedown", function(ev){ var t = ev.target.closest("[data-li]"); ev.preventDefault(); if (!t) return; q("[data-ddl]").hidden = true;
    inp.value = t.textContent; log.push("dv-pick"); commit(false); say("Đã chọn “" + t.textContent + "” từ danh sách thả xuống của ô " + k(a[0], a[1]) + "."); });
  var DVT = null, DVTAB = "set";
  function dvOpen(){ var F = f[k(a[0], a[1])] || {}, D = F.dv ? JSON.parse(JSON.stringify(F.dv)) : {allow: "any", op: "between", min: "", max: "", src: "", blank: true, drop: true, imsg: {show: true, title: "", text: ""}, err: {show: true, style: "stop", title: "", text: ""}};
    DVT = D; DVTAB = "set"; dvDraw(); q("[data-dvd]").hidden = false; say("Hộp thoại Data Validation cho vùng " + q("[data-nb]").textContent + ". Đặt điều kiện rồi bấm OK."); }
  function sel(name, opts, v){ return '<select data-dvk="' + name + '">' + opts.map(function(o){ return '<option value="' + o[0] + '"' + (o[0] === v ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select>"; }
  function txt(name, v, ph){ return '<input type="text" data-dvk="' + name + '" value="' + String(v || "").replace(/"/g, "&quot;") + '"' + (ph ? ' placeholder="' + ph + '"' : "") + ">"; }
  function dvDraw(){ var D = DVT, el = q("[data-dvd]"), body;
    if (DVTAB === "set") { var one = /^(eq|ne|gt|lt|ge|le)$/.test(D.op), lab = {eq:"Value", ne:"Value", gt:"Minimum", ge:"Minimum", lt:"Maximum", le:"Maximum"}[D.op] || "Minimum";
      body = '<b style="font-size:12px;color:#555">Validation criteria</b><div class="two"><label>Allow:' + sel("allow", ALLOW, D.allow) + '</label><div><label><input type="checkbox" data-dvc="blank"' + (D.blank !== false ? " checked" : "") + "> Ignore blank</label>" + (D.allow === "list" ? '<label><input type="checkbox" data-dvc="drop"' + (D.drop !== false ? " checked" : "") + "> In-cell dropdown</label>" : "") + "</div></div>"
        + (D.allow === "any" ? "" : D.allow === "list" ? "<label>Source:" + txt("src", D.src, "Ví dụ =$F$2:$F$10 hoặc Quỹ,Tài trợ") + "</label>" : D.allow === "custom" || D.allow === "time" ? '<div style="font-size:12.5px;color:#555">(Mô phỏng chưa kiểm tra kiểu này.)</div>'
          : "<label>Data:" + sel("op", OPS, D.op) + "</label>" + (one ? "<label>" + lab + ":" + txt("min", D.min) + "</label>" : '<div class="two"><label>Minimum:' + txt("min", D.min) + "</label><label>Maximum:" + txt("max", D.max) + "</label></div>")); }
    else if (DVTAB === "im") body = '<label><input type="checkbox" data-dvc="imsg.show"' + (D.imsg.show !== false ? " checked" : "") + "> Show input message when cell is selected</label><div style=\"font-size:12px;color:#555\">When cell is selected, show this input message:</div><label>Title:" + txt("imsg.title", D.imsg.title) + '</label><label>Input message:<textarea data-dvk="imsg.text">' + (D.imsg.text || "").replace(/</g, "&lt;") + "</textarea></label>";
    else body = '<label><input type="checkbox" data-dvc="err.show"' + (D.err.show !== false ? " checked" : "") + "> Show error alert after invalid data is entered</label><div style=\"font-size:12px;color:#555\">When user enters invalid data, show this error alert:</div><div class=\"two\"><label>Style:" + sel("err.style", [["stop","⛔ Stop"],["warn","⚠️ Warning"],["info","ℹ️ Information"]], D.err.style) + "</label><label>Title:" + txt("err.title", D.err.title) + '</label></div><label>Error message:<textarea data-dvk="err.text">' + (D.err.text || "").replace(/</g, "&lt;") + "</textarea></label>";
    el.innerHTML = '<div class="hd">Data Validation<button type="button" data-dvb="x" aria-label="Đóng">✕</button></div><div class="tabs2">' + [["set","Settings"],["im","Input Message"],["err","Error Alert"]].map(function(t){ return '<button type="button" data-dvt="' + t[0] + '" class="' + (t[0] === DVTAB ? "on" : "") + '">' + t[1] + "</button>"; }).join("")
      + '</div><div class="bx">' + body + '</div><div class="ft2"><button type="button" data-dvb="clear">Clear All</button><span style="display:flex;gap:6px"><button type="button" data-dvb="ok" style="border-color:#2f6fb3">OK</button><button type="button" data-dvb="x">Cancel</button></span></div>'; }
  function dvSet(path, v){ var ks = path.split("."), o = DVT; for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]]; o[ks[ks.length - 1]] = v; }
  var dvd = q("[data-dvd]");
  dvd.addEventListener("click", function(ev){ var t = ev.target.closest("[data-dvt],[data-dvb]"); if (!t || !DVT) return;
    if (t.dataset.dvt) { DVTAB = t.dataset.dvt; dvDraw(); return; }
    var b = t.dataset.dvb, g = rg();
    if (b === "x") { dvd.hidden = true; DVT = null; say("Đã đóng hộp thoại (Cancel)."); box.focus(); return; }
    if (b === "clear") { DVT = {allow: "any", op: "between", min: "", max: "", src: "", blank: true, drop: true, imsg: {show: true, title: "", text: ""}, err: {show: true, style: "stop", title: "", text: ""}}; dvDraw(); return; }
    if (DVT.allow === "list" && !listItems(DVT.src).length) { say("Ô Source chưa có danh sách hợp lệ (ví dụ =$F$2:$F$10).", true); return; }
    if (!/^(any|list|custom|time)$/.test(DVT.allow) && (DVT.min === "" || (/between/.test(DVT.op) && DVT.max === ""))) { say("Hãy nhập giá trị Minimum/Maximum (hoặc Value).", true); return; }
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {}; if (DVT.allow === "any" && !DVT.imsg.title && !DVT.imsg.text) delete F.dv; else F.dv = JSON.parse(JSON.stringify(DVT)); }
    var rgT = q("[data-nb]").textContent; log.push("dv:" + DVT.allow + ":" + rgT); dvd.hidden = true; DVT = null;
    say("Đã đặt xác thực dữ liệu cho vùng " + rgT + ". Thử nhập dữ liệu vào các ô của vùng này."); draw(); box.focus(); });
  dvd.addEventListener("input", function(ev){ var t = ev.target; if (!DVT) return; if (t.dataset.dvk) dvSet(t.dataset.dvk, t.value); });
  dvd.addEventListener("change", function(ev){ var t = ev.target; if (!DVT) return;
    if (t.dataset.dvc) dvSet(t.dataset.dvc, t.checked); else if (t.dataset.dvk) { dvSet(t.dataset.dvk, t.value); if (t.tagName === "SELECT") dvDraw(); } });
  function cellAt(ev){ var t = ev.target; return t && t.tagName === "TD" ? [+t.dataset.c, +t.dataset.r] : null; }
  function pickText(){ var g = pick.g; return g[0] === g[2] && g[1] === g[3] ? k(g[0], g[1]) : k(g[0], g[1]) + ":" + k(g[2], g[3]); }
  var tbl = q("[data-g]"), rz = null;
  tbl.addEventListener("mousedown", function(ev){
    var t = ev.target, ce = cellAt(ev);
    if (t.dataset.dd != null) { ev.preventDefault(); openList(); return; }
    q("[data-ddl]").hidden = true;
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
    if (t === "reset") { reset(); fc.hidden = true; q("[data-bd]").hidden = true; q("[data-pal]").hidden = true; q("[data-pv]").hidden = true; say("Đã làm lại từ đầu."); draw(); return; }
    if (t === "copy") { copy(); box.focus(); return; }
    if (t === "paste") { paste(); box.focus(); return; }
    if (t === "insert") { insert(); box.focus(); return; }
    if (t === "del") { delRC(); box.focus(); return; }
    if (t === "hide" || t === "unhide") { hide(t === "hide"); box.focus(); return; }
    if (t === "merge") { merge(); box.focus(); return; }
    if (t === "fmt") { if (fc.hidden) fcOpen(); else fc.hidden = true; return; }
    if (t === "border") { q("[data-bd]").hidden = !q("[data-bd]").hidden; return; }
    if (t === "fillc") { q("[data-pal]").hidden = !q("[data-pal]").hidden; return; }
    if (t === "print") { preview(); return; }
    if (t === "valid") { if (q("[data-dvd]").hidden) dvOpen(); else q("[data-dvd]").hidden = true; return; }
    var first = f[k(g[0], g[1])] || {}, on = !first[t];
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {};
      if (t === "left" || t === "center" || t === "right") F.al = t; else F[t] = on; }
    say("Đã định dạng " + q("[data-nb]").textContent + "."); draw(); box.focus();
  }); });
  box.querySelectorAll("[data-bp]").forEach(function(b){ b.addEventListener("click", function(){ if (b.dataset.bp === "x") { q("[data-bd]").hidden = true; } else border(b.dataset.bp); box.focus(); }); });
  box.querySelectorAll("[data-pc]").forEach(function(b){ b.addEventListener("click", function(){ var g = rg(), col = b.dataset.pc;
    for (var c = g[0]; c <= g[2]; c++) for (var r = g[1]; r <= g[3]; r++) { var key = k(c, r), F = f[key] = f[key] || {}; if (col) F.fill = col; else delete F.fill; }
    say(col ? "Đã tô màu nền vùng " + q("[data-nb]").textContent + "." : "Đã bỏ màu nền."); draw(); box.focus(); }); });
  var api = {dv: function(key){ return (f[key] || {}).dv || null; }, log: function(x){ log.push(x); }, sheet: function(){ return sheet; }, val: val, text: text, raw: function(key){ return d[key]; }, set: function(key, v){ if (v) d[key] = v; else delete d[key]; }, redraw: function(){ draw(); }, say: say};
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
