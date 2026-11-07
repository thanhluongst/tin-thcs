/* HÌNH VẼ LẠI (nét ở mọi cỡ màn hình) thay cho ảnh chụp SGK bị mờ.
   Cách dùng: trong content.js khai báo  window.HINH_VE = {h61: {loai:"bang", …tuỳ chọn}};
   trong index.html đặt  <figure class="fig ve"><div data-hv="h61"></div><figcaption>…</figcaption></figure>
   Trang học sinh tự vẽ khi tải; trang giáo viên gọi HinhVe.render(khung) sau khi chép nội dung bài.
   HinhBang(phần tử, tuỳ chọn) — vẽ một trang tính tĩnh kiểu Excel, có số chú thích ①②… và chú giải bên dưới.
   Tuỳ chọn:
     cols: số cột (mặc định 7), rows: số hàng (mặc định 10), widths: {B:150,…} (px)
     data: {B5:"Họ tên", D6:7, …}  fmt: {D2:{b:1,al:"c",fill:"#ffe08a",color:"#c00",i:1}}  (al: l/c/r; số tự căn phải)
     cell: "B6" ô hiện thời (hộp địa chỉ + thanh công thức tự lấy theo ô này), range: "B4:E11" vùng chọn (tô xám)
     fx: chữ trong thanh công thức (mặc định = nội dung ô hiện thời), tabs: ["Sheet1","Sheet2"]
     marks: [{n:1, at:"B6"|"namebox"|"fx"|"cols"|"rows"|"tabs"|"grid"|"col:B"|"row:6", t:"Ô hiện thời"}]
*/
(function(){
"use strict";
var CSS = ".hv{display:grid;gap:10px;width:100%;justify-items:stretch}"
 + ".hv-x{background:#fff;color:#111;border:1px solid #b9c2cc;border-radius:6px;overflow:auto;font:14px/1.3 Calibri,'Be Vietnam Pro',Arial,sans-serif;max-width:100%}"
 + ".hv-fb{display:flex;align-items:center;gap:6px;padding:5px 6px;border-bottom:1px solid #d0d0d0;background:#f8f8f8;min-width:max-content}"
 + ".hv-nb{border:1px solid #bbb;background:#fff;padding:2px 6px;width:70px;margin-right:26px;font:600 13px Consolas,monospace;position:relative}"
 + ".hv-fx{font-style:italic;font-weight:700;color:#777;padding:0 4px}"
 + ".hv-fi{flex:1;min-width:180px;border:1px solid #bbb;background:#fff;padding:2px 6px;position:relative}"
 + ".hv-x table{border-collapse:collapse;table-layout:fixed}"
 + ".hv-x th{background:#efefef;color:#444;font-weight:500;font-size:12.5px;border:1px solid #d0d0d0;height:22px;padding:0;position:relative}"
 + ".hv-x th.hl{background:#d6e6d9;color:#1d6b36;border-bottom:2px solid #217346}"
 + ".hv-x tbody th.hl{border-bottom:1px solid #d0d0d0;border-right:2px solid #217346}"
 + ".hv-x td{border:1px solid #e3e3e3;height:22px;padding:0 5px;white-space:nowrap;overflow:visible;position:relative}"
 + ".hv-x td.rg{background:#e2e2e2}.hv-x td.act{outline:2px solid #217346;outline-offset:-2px}"
 + ".hv-tabs{display:flex;gap:4px;align-items:center;padding:3px 6px 5px;border-top:1px solid #d0d0d0;background:#f8f8f8;font-size:13px;min-width:max-content;position:relative}"
 + ".hv-tab{border:1px solid #c8c8c8;border-top:0;border-radius:0 0 5px 5px;padding:1px 12px;background:#fff;color:#444}.hv-tab.on{color:#217346;font-weight:700;border-bottom:2px solid #217346}"
 + ".hv-m{position:absolute;z-index:2;width:22px;height:22px;border-radius:50%;background:#d6336c;color:#fff;font:700 13px/22px 'Be Vietnam Pro',Arial,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff;pointer-events:none}"
 + ".hv-lg{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:6px 14px;font-size:15px;color:var(--fg,#111)}"
 + ".hv-lg li{display:flex;gap:8px;align-items:flex-start}.hv-lg .hv-m{position:static;flex:none}";
function css(){ if (document.getElementById("hv-css")) return; var s = document.createElement("style"); s.id = "hv-css"; s.textContent = CSS; document.head.appendChild(s); }
function L(i){ return String.fromCharCode(65 + i); }
function parse(a){ var m = /^([A-Z])(\d+)$/.exec(a); return m ? {c: m[1].charCodeAt(0) - 65, r: +m[2]} : null; }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function mk(n, pos){ return '<span class="hv-m" style="' + pos + '">' + n + '</span>'; }

window.HinhBang = function(box, o){
  css(); o = o || {};
  var C = o.cols || 7, R = o.rows || 10, d = o.data || {}, f = o.fmt || {}, w = o.widths || {};
  var cur = o.cell && parse(o.cell), rg = null;
  if (o.range){ var p = o.range.split(":"); rg = [parse(p[0]), parse(p[1])]; }
  var M = {}; (o.marks || []).forEach(function(m){ (M[m.at] = M[m.at] || []).push(m); });
  function marks(at, pos){ return (M[at] || []).map(function(m){ return mk(m.n, pos); }).join(""); }
  var h = '<div class="hv-x" role="img" aria-label="' + esc(o.alt || "Trang tính") + '">';
  var fx = o.fx != null ? o.fx : (o.cell && d[o.cell] != null ? d[o.cell] : "");
  h += '<div class="hv-fb"><span class="hv-nb">' + esc(o.cell || "") + marks("namebox", "right:-27px;top:0") + '</span>'
     + '<span class="hv-fx">✕ ✓ fx</span><span class="hv-fi">' + esc(fx) + marks("fx", "right:3px;top:1px") + '</span></div>';
  h += '<table><colgroup><col style="width:34px">';
  for (var c = 0; c < C; c++) h += '<col style="width:' + (w[L(c)] || 80) + 'px">';
  h += '</colgroup><thead><tr><th></th>';
  for (c = 0; c < C; c++) h += '<th class="' + (cur && cur.c === c ? "hl" : "") + '">' + L(c)
     + (c === C - 1 ? marks("cols", "left:50%;margin-left:-11px;top:0") : "") + marks("col:" + L(c), "right:2px;top:-1px") + '</th>';
  h += '</tr></thead><tbody>';
  for (var r = 1; r <= R; r++){
    h += '<tr><th class="' + (cur && cur.r === r ? "hl" : "") + '">' + r
       + (r === R ? marks("rows", "left:-2px;top:0") : "") + marks("row:" + r, "left:-2px;top:0") + '</th>';
    for (c = 0; c < C; c++){
      var a = L(c) + r, v = d[a], ff = f[a] || {}, cls = [], st = [];
      if (rg && c >= rg[0].c && c <= rg[1].c && r >= rg[0].r && r <= rg[1].r) cls.push("rg");
      if (cur && cur.c === c && cur.r === r) cls.push("act");
      var num = typeof v === "number";
      var al = ff.al || (num ? "r" : "l"); if (al !== "l") st.push("text-align:" + (al === "c" ? "center" : "right"));
      if (ff.b) st.push("font-weight:700"); if (ff.i) st.push("font-style:italic");
      if (ff.fill) st.push("background:" + ff.fill); if (ff.color) st.push("color:" + ff.color);
      var gm = (r === Math.ceil(R / 2) && c === C - 1) ? marks("grid", "right:6px;top:0") : "";
      h += '<td class="' + cls.join(" ") + '" style="' + st.join(";") + '">' + (v == null ? "" : esc(v)) + marks(a, "right:-11px;top:-11px") + gm + '</td>';
    }
    h += '</tr>';
  }
  h += '</tbody></table>';
  var tabs = o.tabs || ["Sheet1"];
  h += '<div class="hv-tabs">' + tabs.map(function(t, i){ return '<span class="hv-tab' + (i ? "" : " on") + '">' + esc(t) + '</span>'; }).join("") + ' <span style="color:#777">⊕</span>'
     + marks("tabs", "left:" + (tabs.length * 70 + 40) + "px;top:2px") + '</div></div>';
  if (o.marks && o.marks.length){
    h += '<ol class="hv-lg">' + o.marks.slice().sort(function(a, b){ return a.n - b.n; }).map(function(m){ return '<li>' + mk(m.n, "") + '<span>' + m.t + '</span></li>'; }).join("") + '</ol>';
  }
  box.classList.add("hv"); box.innerHTML = h;
  // Màn hình hẹp: thu nhỏ vừa khung (không nhỏ hơn 75%), phần còn lại cuộn ngang trong khung
  var x = box.querySelector(".hv-x"), t = x.querySelector("table");
  function fit(){ x.style.zoom = ""; var need = t.offsetWidth + 2, have = box.clientWidth; x.style.zoom = need > have ? Math.max(.75, have / need) : ""; }
  fit(); window.addEventListener("resize", fit);
};
var LOAI = {bang: window.HinhBang};
window.HinhVe = {render: function(root){
  var H = window.HINH_VE || {};
  (root || document).querySelectorAll("[data-hv]").forEach(function(el){
    var o = H[el.dataset.hv], fn = o && LOAI[o.loai || "bang"];
    if (fn && !el.dataset.hvOk){ fn(el, o); el.dataset.hvOk = "1"; }
  });
}};
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ HinhVe.render(); }); else HinhVe.render();
})();
