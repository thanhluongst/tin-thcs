/* KẾ HOẠCH BÀI DẠY CHO TỪNG BÀI HỌC (Phụ lục IV, Công văn 5512/BGDĐT-GDTrH)
   Dựng tự động từ nội dung bài trên trang (window.LESSON trong content.js) và dữ liệu
   năng lực số – an toàn mạng (chung/nls-atm.js); xem trước, in, tải Word qua chung/khbd-loi.js.
   Trên trang giáo viên của bài: nút “📄 Kế hoạch bài dạy” hiện sau khi mở buổi học (mục #app).
   Thứ tự nạp: content.js … nls-atm.js, khbd-loi.js, khbd-bai.js.  Kiểm thử: KHBD_BAI.dung(), KHBD_BAI.taoBlob(). */
(function () {
  "use strict";
  var L = window.LESSON, K = window.KhbdLoi;
  if (!L || !K) return;
  var esc = K.esc, chu = K.chu, P = K.P, G = K.G, T = K.T;
  var id = (location.pathname.match(/\/(tin[6-9]-[a-z0-9-]+)\//) || [])[1] || "";
  var NA = window.NLS_ATM && id ? NLS_ATM.lay(id) : null;
  var lop = NA ? NA.lop : +((id.match(/^tin(\d)/) || [])[1] || 0);
  var soTiet = NA ? (NA.tiet.match(/\d+/g) || [1]).length : 1;
  var baseUrl = location.href.replace(/[?#].*$/, "").replace(/[^/]*$/, "");
  var CHU = ["A", "B", "C", "D", "E", "F"];

  /* Năng lực Tin học (CT 2018) suy từ miền của mã chỉ báo năng lực số */
  var NL_TIN = {
    NLa: "Sử dụng và quản lí các phương tiện công nghệ thông tin và truyền thông",
    NLb: "Ứng xử phù hợp trong môi trường số",
    NLc: "Giải quyết vấn đề với sự hỗ trợ của công nghệ thông tin và truyền thông",
    NLd: "Ứng dụng công nghệ thông tin và truyền thông trong học và tự học",
    NLe: "Hợp tác trong môi trường số"
  };
  function nlTheoMa(m) {
    var a = m.slice(0, 3);
    if (/^1\./.test(a) || /^6\./.test(a)) return "NLd";
    if (a === "2.1" || a === "2.2" || a === "2.4") return "NLe";
    if (a === "3.1" || a === "3.2") return "NLa";
    if (a === "3.4" || /^5\./.test(a)) return "NLc";
    return "NLb";   // 2.3, 2.5, 2.6, 3.3, 4.x
  }
  function thuong(s) { s = String(s || "").trim().replace(/\.$/, ""); return s.charAt(0).toLowerCase() + s.slice(1); }

  /* Ghi bài (HTML) → các dòng */
  function dong(html) {
    var d = document.createElement("div"); d.innerHTML = html || ""; var out = [];
    Array.prototype.forEach.call(d.childNodes, function (n) {
      if (n.nodeType === 1 && (n.tagName === "UL" || n.tagName === "OL")) Array.prototype.forEach.call(n.children, function (li) { out.push(li.innerHTML.trim()); });
      else if (n.nodeType === 1) { var h = n.innerHTML.trim(); if (h) out.push(n.classList && n.classList.contains("gh") ? "\u0001" + h : h); }   // \u0001 = tiêu đề mục ghi bài
      else if (n.nodeType === 3 && n.nodeValue.trim()) out.push(esc(n.nodeValue.trim()));
    });
    return out;
  }
  /* Câu hỏi + phương án */
  function cauHoi(t) {
    var s = t.q || "";
    if (t.type === "mcq" && t.o) s += " " + t.o.map(function (x, i) { return CHU[i] + ". " + String(x).replace(/\.\s*$/, ""); }).join("; ") + ".";
    else if (t.type === "match" && t.items) s += " Cột trái: " + t.items.map(function (x) { return x[0]; }).join("; ") + ". Cột phải: " + (t.opts || []).join("; ") + ".";
    else if (t.type === "sort" && t.items) s += " Nhóm: " + (t.cats || []).join("; ") + ". Các mục: " + t.items.map(function (x) { return x[0]; }).join("; ") + ".";
    else if (t.type === "order" && t.items) s += " Các bước (chưa theo thứ tự): " + (t.start || Object.keys(t.items)).map(function (k) { return k + ") " + t.items[k]; }).join(" ");
    return s;
  }

  /* Chia thời lượng cho các hoạt động */
  var ST = L.STAGES, tong = 45 * soTiet;
  var phan = ST.filter(function (s) { return /^phan-/.test(s.id); }).length || 1;
  var MO_DAU = soTiet > 1 ? 7 : 5;
  function trongSo(s) { return s.id === "luyen-tap" ? 0.22 : s.id === "van-dung" ? 0.16 : 0.62 / phan; }
  var PHUT = ST.map(function (s) { return s.id === "mo-dau" ? MO_DAU : Math.max(3, Math.round((tong - MO_DAU) * trongSo(s))); });
  var du = tong - PHUT.reduce(function (a, b) { return a + b; }, 0);
  var iPhan = ST.findIndex(function (s) { return /^phan-/.test(s.id); }); PHUT[iPhan < 0 ? 0 : iPhan] += du;

  /* Tên và mục tiêu hoạt động */
  function tenHD(s, i) {
    if (s.id === "mo-dau") return "Hoạt động 1. Mở đầu: " + s.title;
    if (s.id === "luyen-tap") return "Hoạt động 3. Luyện tập";
    if (s.id === "van-dung") return "Hoạt động 4. Vận dụng";
    return "Hoạt động " + (s.code || "2") + ". Hình thành kiến thức mới: " + s.title;
  }
  function acts(s) { return s.acts.filter(function (a) { return !a.ghi; }); }
  function khaiNiem(s) {
    return acts(s).filter(function (a) { return a.concept && L.CONCEPTS[a.concept]; }).map(function (a) { return L.CONCEPTS[a.concept].t; })
      .filter(function (t) { return t.toLowerCase() !== String(s.title).toLowerCase(); });
  }
  function mucTieu(s) {
    var ten = acts(s).map(function (a) { return a.title.replace(/^(Hoạt động \d+|Đọc hiểu|Thực hành)\s*[:–-]\s*/, ""); });
    if (s.id === "mo-dau") return "Tạo hứng thú, huy động hiểu biết đã có của HS và dẫn dắt vào bài học qua hoạt động: " + ten.join("; ") + ".";
    if (s.id === "luyen-tap") return "HS củng cố, luyện tập kiến thức của bài qua các nhiệm vụ: " + ten.join("; ") + ".";
    if (s.id === "van-dung") return "HS vận dụng kiến thức đã học vào tình huống thực tiễn: " + ten.join("; ") + ".";
    var kn = khaiNiem(s);
    return "HS tìm hiểu và nắm được kiến thức về " + thuong(s.title) + (kn.length ? " (" + kn.join("; ") + ")" : "") + " thông qua các nhiệm vụ: " + ten.join("; ") + ".";
  }

  function dung() {
    var N = K.dauTrang(CFG, L.title, null, soTiet);

    /* I. MỤC TIÊU */
    N.push(P("<b>I. MỤC TIÊU</b>", { truoc: 6 }));
    N.push(P("<b>1. Về kiến thức</b>"));
    (NA ? NA.yccd : []).forEach(function (y) { N.push(G(esc(y) + ".")); });
    N.push(P("<b>2. Về năng lực</b>"));
    N.push(P("<i>a) Năng lực chung</i>", { thut: 1 }));
    N.push(G("<i>Tự chủ và tự học:</i> tự đọc phần kiến thức (Đọc hiểu, SGK), tự trả lời câu hỏi và đối chiếu với đáp án được chốt."));
    N.push(G("<i>Giao tiếp và hợp tác:</i> làm việc nhóm, trình bày bài làm trước lớp, nhận xét và góp ý bài của nhóm bạn."));
    N.push(G("<i>Giải quyết vấn đề và sáng tạo:</i> vận dụng kiến thức của bài để giải quyết các nhiệm vụ luyện tập và tình huống thực tiễn ở phần vận dụng."));
    N.push(P("<i>b) Năng lực Tin học</i>", { thut: 1 }));
    var daCo = {};
    (NA ? NA.nls : []).forEach(function (m) {
      var nl = nlTheoMa(m); if (daCo[nl]) return; daCo[nl] = 1;
      N.push(G("<i>" + nl + " – " + NL_TIN[nl] + ":</i> " + esc(thuong(NA.yccd[0] || L.title)) + "."));
    });
    if (!daCo.NLe) N.push(G("<i>NLe – " + NL_TIN.NLe + ":</i> cùng nhóm thực hiện nhiệm vụ, chia sẻ bài làm và nhận xét bài của nhóm bạn trên trang học tập trực tuyến."));
    if (NA) {
      N.push(P("<i>c) Năng lực số (Thông tư 02/2025/TT-BGDĐT; chỉ báo theo Công văn 3456)</i>", { thut: 1 }));
      NA.nls.forEach(function (m) { N.push(G("<i>" + m + ":</i> " + esc(NLS_ATM.chiBao[m] || ""))); });
      if (NA.atm.length) {
        N.push(P("<i>d) An toàn mạng toàn diện (Công văn 6206)</i>", { thut: 1 }));
        NA.atm.forEach(function (a) { N.push(G("<i>" + a.nhom + " [" + a.muc + "] – " + esc(NLS_ATM.nhomAtm[a.nhom]) + ":</i> " + esc(a.yc))); });
      }
      N.push(G("<i>Mục tiêu tích hợp:</i> " + esc(NA.mt)));
    }
    N.push(P("<b>3. Về phẩm chất</b>"));
    N.push(G("<i>Chăm chỉ:</i> tích cực tham gia, hoàn thành các nhiệm vụ học tập được giao."));
    N.push(G("<i>Trung thực:</i> tự làm bài, báo cáo đúng kết quả của nhóm; nhận xét bài bạn khách quan."));
    N.push(G("<i>Trách nhiệm:</i> có trách nhiệm với nhiệm vụ chung của nhóm" + (NA && NA.atm.length ? "; có ý thức sử dụng môi trường số an toàn, văn minh." : "; sử dụng thiết bị đúng quy định của phòng máy.")));

    /* II. THIẾT BỊ */
    N.push(P("<b>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</b>", { truoc: 6 }));
    N.push(P("<b>1. Giáo viên</b>"));
    N.push(G("Máy tính, máy chiếu; SGK Tin học " + lop + "; kế hoạch bài dạy."));
    N.push(G("Trang giáo viên của bài (mở buổi học, mã QR, theo dõi tiến độ các nhóm, chiếu bài làm, chốt đáp án): <i>" + esc(baseUrl + "giaovien.html") + "</i>"));
    (NA ? NA.atm : []).forEach(function (a) { N.push(G("Học liệu cho hoạt động an toàn mạng (" + a.nhom + "): " + esc(a.hd))); });
    N.push(P("<b>2. Học sinh</b>"));
    N.push(G("SGK Tin học " + lop + ", vở ghi."));
    N.push(G("Mỗi nhóm một máy tính hoặc thiết bị truy cập trang học sinh của bài: <i>" + esc(baseUrl) + "</i> (nếu thiếu thiết bị: GV chiếu câu hỏi, nhóm trả lời trên phiếu)."));

    /* III. TIẾN TRÌNH */
    N.push(P("<b>III. TIẾN TRÌNH DẠY HỌC</b>", { truoc: 6 }));
    var daQua = 0, tietDaGhi = 0;
    var oAtm = ST.findIndex(function (s) { return s.id === "luyen-tap"; }); if (oAtm < 0) oAtm = ST.length - 1;
    ST.forEach(function (s, i) {
      var tietSo = Math.min(soTiet, Math.floor(daQua / 45) + 1);
      if (soTiet > 1 && tietSo !== tietDaGhi) { N.push(P("<b>TIẾT " + tietSo + "</b>", { giua: 1, truoc: 6 })); tietDaGhi = tietSo; }
      daQua += PHUT[i];
      var A = acts(s), ghi = s.acts.filter(function (a) { return a.ghi && a.concept && L.CONCEPTS[a.concept]; });
      var nd = [], sp = ["Câu trả lời của các nhóm trên trang học tập."];
      A.forEach(function (a) {
        var ts = (a.tasks || []).map(function (k) { return L.TASKS[k]; }).filter(Boolean);
        var c = a.concept && L.CONCEPTS[a.concept];
        nd.push("<b>" + esc(a.title) + "</b>" + (c ? ": đọc mục “" + esc(c.t) + "” (SGK, trang học tập)" + (ts.length ? " rồi trả lời câu hỏi." : ".") : (ts.length ? ":" : ".")));
        ts.forEach(function (t) { nd.push("<i>" + esc(t.label) + (/[?!.:]$/.test(t.label) ? "" : ".") + "</i> " + cauHoi(t)); sp.push("<i>" + esc(t.label.replace(/[?.:]+$/, "")) + ":</i> " + t.k); });
      });
      var ghiDong = [];
      ghi.forEach(function (a) { ghiDong = ghiDong.concat(dong(L.CONCEPTS[a.concept].b)); });
      var ghiCau = ghiDong.map(function (x, j) {
        var td = x.charAt(0) === "\u0001", t = chu(td ? x.slice(1) : x).replace(/[.;:]\s*$/, "");
        return td ? (j ? " " : "") + "<b>" + t + "</b>:" : " " + t + ";";
      }).join("").replace(/;\s*<b>/g, ". <b>").replace(/;$/, ".").trim();
      if (ghiDong.length) sp.push("<i>Kiến thức ghi bài:</i> " + ghiCau);
      var atmHere = NA && NA.atm.length && i === oAtm ? NA.atm : [];
      atmHere.forEach(function (a) {
        nd.push("<b>Hoạt động tích hợp an toàn mạng (" + a.nhom + " [" + a.muc + "]):</b> " + esc(a.hd));
        sp.push("<i>Minh chứng an toàn mạng:</i> " + esc(a.mc));
      });
      var tenViec = A.map(function (a) { return a.title; }).join("; ");
      var tc = [
        (s.id === "mo-dau" ? ["GV mở buổi học trên trang giáo viên, chiếu mã QR; các nhóm vào trang học sinh của bài."] : [])
          .concat(["GV giao nhiệm vụ: " + esc(tenViec) + "."])
          .concat(atmHere.map(function (a) { return "GV tổ chức hoạt động an toàn mạng: " + esc(a.hd); })),
        ["HS làm việc nhóm, đọc SGK/phần Đọc hiểu, trả lời các câu hỏi trên trang học tập.", "GV theo dõi bảng tiến độ trên trang giáo viên, hỗ trợ nhóm còn lúng túng."],
        ["GV chiếu bài làm của 1 – 2 nhóm; đại diện nhóm trình bày, các nhóm khác nhận xét, bổ sung.", "GV gửi nhận xét, khen trên trang cho các nhóm."],
        ["GV nhận xét, chốt đáp án (nút Chốt trên trang giáo viên)" + (atmHere.length ? "; thu minh chứng an toàn mạng." : ".")].concat(ghiDong.length ? ["GV chốt kiến thức; HS ghi bài các ý chính (mục Kiến thức ghi bài ở phần Sản phẩm)."] : [])
      ];
      N.push(P("<b>" + esc(tenHD(s, i)) + "</b> <i>(" + PHUT[i] + " phút)</i>", { truoc: 4 }));
      N.push(P("<b>a) Mục tiêu:</b> " + esc(mucTieu(s)), { thut: 1 }));
      N.push(P("<b>b) Nội dung:</b>", { thut: 1 })); nd.forEach(function (x) { N.push(G(x, 2)); });
      N.push(P("<b>c) Sản phẩm:</b>", { thut: 1 })); sp.forEach(function (x) { N.push(G(x, 2)); });
      N.push(P("<b>d) Tổ chức thực hiện:</b>", { thut: 1 }));
      N.push(T([28, 72], [["<b>Bước</b>", "<b>Hoạt động của giáo viên và học sinh</b>"]].concat(
        [["Chuyển giao nhiệm vụ", tc[0]], ["Thực hiện nhiệm vụ", tc[1]], ["Báo cáo, thảo luận", tc[2]], ["Kết luận, nhận định", tc[3]]]
          .map(function (r) { return ["<b>" + r[0] + "</b>", r[1].map(function (x) { return P("- " + x); })]; })), { dau: 1 }));
    });
    return N.concat(K.chuKi());
  }

  var CFG = { id: id, lop: lop, tietMacDinh: NA ? NA.tiet : "", tieuDe: "KHBD – " + L.title + " – Tin học " + lop,
    tenTep: "KHBD-Tin" + lop + "-Bai" + (NA ? NA.bai : "") + "-" + id.replace(/^tin\d-/, ""), dung: dung };
  window.KHBD_BAI = { dung: dung, taoBlob: function () { return K.taoBlob(CFG); }, mo: function () { K.mo(CFG); } };

  /* Nút trên trang giáo viên: đầu khu #app (chỉ hiện sau khi mở buổi học bằng mã giáo viên) */
  var app = document.getElementById("app");
  if (app && document.getElementById("dang-nhap")) {
    var sec = document.createElement("section");
    sec.className = "part"; sec.id = "khbd-bai";
    sec.innerHTML = '<div class="act" style="display:flex;flex-wrap:wrap;gap:10px;align-items:center"><button class="btn primary" type="button" id="khbd-mo">📄 Kế hoạch bài dạy (mẫu 5512) · tải Word</button>' +
      '<span class="status">Dựng từ nội dung bài trên trang' + (NA ? ", kèm năng lực số – an toàn mạng; tiết PPCT " + esc(NA.tiet) : "") + '. Điền tên trường, tổ, giáo viên rồi tải tệp .docx nộp tổ trưởng.</span></div>';
    app.insertBefore(sec, app.firstChild);
    sec.querySelector("#khbd-mo").addEventListener("click", function () { K.mo(CFG); });
  }
})();
