/* NĂNG LỰC SỐ – AN TOÀN MẠNG TOÀN DIỆN cho từng bài Tin học 6–9.
   Nguồn: “Tài liệu tập huấn phát triển năng lực số và giáo dục an toàn mạng toàn diện cho học sinh THCS – môn Tin học”
   (Bộ GDĐT, 10/2026): Phụ lục 6 (mã chỉ báo NLS theo CV 3456 cho từng bài, địa chỉ ATM [B]/[KK]),
   Bảng 7.1 (hoạt động, minh chứng), Phụ lục 2 (nội dung chỉ báo). Tiết theo PPCT 2026–2027 của trường.
   Mục tiêu tích hợp viết theo mục 5.2: “Học sinh [A – YCCĐ môn]; thông qua việc [B – chỉ báo NLS]; cụ thể là [C – yêu cầu ATM]”.
   Tệp này sinh từ cong-cu/nls-atm/ (python tao_nls_atm.py pl6.json ../../chung/nls-atm.js nls-atm.template.js).
   Dùng: window.NLS_ATM.lay("tin6-thuat-toan") → {lop, bai, ten, tiet, yccd[], nls[], atm[], mt}
   Trang giáo viên của bài (có #dang-nhap) tự hiện thẻ “Năng lực số – An toàn mạng”. */
(function () {
  "use strict";
  var DL = /*DU_LIEU*/;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lay(id) { return DL.bai[id] || null; }
  window.NLS_ATM = { lay: lay, chiBao: DL.chiBao, nhomAtm: DL.nhomAtm };

  var id = (location.pathname.match(/\/(tin[6-9]-[a-z0-9-]+)\//) || [])[1];
  var dn = document.getElementById("dang-nhap"), b = id && lay(id);
  if (!dn || !b) return;

  var css = "#nls-atm details>summary{cursor:pointer;font-weight:700;list-style:none;display:flex;align-items:center;gap:8px}" +
    "#nls-atm details>summary::-webkit-details-marker{display:none}#nls-atm details>summary::before{content:'▸';transition:transform .15s}" +
    "#nls-atm details[open]>summary::before{transform:rotate(90deg)}#nls-atm .na-body{margin-top:10px;display:grid;gap:10px}" +
    "#nls-atm h4{margin:0 0 4px;font-size:.95em}#nls-atm ul{margin:0;padding-left:20px}#nls-atm .ma{font-family:ui-monospace,Consolas,monospace;font-weight:700;white-space:nowrap}" +
    "#nls-atm .tag{display:inline-block;border-radius:99px;padding:1px 8px;font-size:.8em;font-weight:700;margin-right:4px}" +
    "#nls-atm .tag.b{background:#fee2e2;color:#991b1b}#nls-atm .tag.kk{background:#e0f2fe;color:#075985}" +
    "#nls-atm .atm{border-left:4px solid #f59e0b;padding:6px 10px;border-radius:6px;background:rgba(245,158,11,.08)}" +
    "#nls-atm .mt{border-left:4px solid #2563eb;padding:8px 10px;border-radius:6px;background:rgba(37,99,235,.07)}" +
    "#nls-atm .nguon{font-size:.85em;opacity:.75;margin:0}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var h = '<div class="act"><details><summary>📌 Năng lực số – An toàn mạng <span class="status" style="font-weight:400">Tin học ' + b.lop + " · Bài " + esc(b.bai) + " · Tiết PPCT " + esc(b.tiet) + "</span></summary><div class=\"na-body\">" +
    "<div><h4>Yêu cầu cần đạt của môn</h4><ul>" + b.yccd.map(function (y) { return "<li>" + esc(y) + "</li>"; }).join("") + "</ul></div>" +
    "<div><h4>Năng lực số (TT 02/2025, chỉ báo theo CV 3456)</h4><ul>" + b.nls.map(function (m) { return '<li><span class="ma">' + m + "</span> – " + esc(DL.chiBao[m] || "") + "</li>"; }).join("") + "</ul></div>" +
    "<div><h4>An toàn mạng toàn diện (CV 6206)</h4>" + (b.atm.length ? b.atm.map(function (a) {
      return '<div class="atm"><p style="margin:0 0 4px"><span class="tag ' + (a.muc === "B" ? "b" : "kk") + '">' + (a.muc === "B" ? "[B] Bắt buộc" : "[KK] Khuyến khích") + "</span><b>" + a.nhom + ". " + esc(DL.nhomAtm[a.nhom]) + '</b> <span class="ma">' + esc(a.ma) + "</span></p>" +
        "<p style=\"margin:0 0 4px\"><b>Yêu cầu:</b> " + esc(a.yc) + "</p><p style=\"margin:0 0 4px\"><b>Hoạt động gợi ý:</b> " + esc(a.hd) + "</p><p style=\"margin:0\"><b>Minh chứng:</b> " + esc(a.mc) + "</p></div>";
    }).join("") : '<p class="status" style="margin:0">Bài này không có địa chỉ an toàn mạng trong kế hoạch dạy học minh hoạ; chỉ ghi mã năng lực số.</p>') + "</div>" +
    '<div><h4>Mục tiêu tích hợp (ghi vào KHBD)</h4><div class="mt" id="na-mt">' + esc(b.mt) + '</div><p style="margin:6px 0 0"><button class="btn" type="button" id="na-chep">📋 Chép mục tiêu</button> <span class="status" id="na-tb"></span></p></div>' +
    '<p class="nguon">Nguồn: Tài liệu tập huấn NLS – ATM toàn diện môn Tin học THCS (Bộ GDĐT, 10/2026), Phụ lục 6, Bảng 7.1, Phụ lục 2.</p>' +
    "</div></details></div>";
  var sec = document.createElement("section");
  sec.className = "part"; sec.id = "nls-atm"; sec.innerHTML = h;
  dn.parentNode.insertBefore(sec, dn);
  document.getElementById("na-chep").addEventListener("click", function () {
    var tb = document.getElementById("na-tb");
    function xong(ok) { tb.textContent = ok ? "Đã chép." : "Không chép được, hãy bôi đen rồi Ctrl+C."; }
    try { navigator.clipboard.writeText(b.mt).then(function () { xong(true); }, function () { xong(false); }); } catch (e) { xong(false); }
  });
})();
