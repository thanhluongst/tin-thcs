/* KẾ HOẠCH BÀI DẠY STEM – theo Phụ lục IV, Công văn 5512/BGDĐT-GDTrH,
   tiến trình 5 hoạt động theo Công văn 3089/BGDĐT-GDTrH (bài học STEM).
   Dựng từ window.DU_AN (cùng dữ liệu với trang học sinh), xem trước trên trang
   và tải về tệp Word (.docx) để nộp Ban giám hiệu.
   Mở: KHBD.mo()  ·  hoặc thêm #khbd vào địa chỉ trang dự án. */
(function () {
  var D = window.DU_AN, g = D.gv || {};
  var K = window.KhbdLoi;   // chung/khbd-loi.js
  var esc = K.esc, chu = K.chu, P = K.P, G = K.G, T = K.T, o = K.o, TT = K.TT;
  function bo(s) {
    s = String(s).replace(/^<b>Bước \d\.<\/b>\s*/, "");
    return /^(GV|HS|Nhóm|Các|Cả|Hai|Mỗi|\d)/.test(s) ? s : "GV " + s.charAt(0).toLowerCase() + s.slice(1);
  }
  /* Năng lực số – an toàn mạng của bài gốc (chung/nls-atm.js) */
  var NA = window.NLS_ATM ? NLS_ATM.lay(D.thuMucBai) : null;
  var CFG = { id: D.id, lop: D.lop, tietMacDinh: NA ? NA.tiet : "", tieuDe: "KHBD STEM – " + D.ten,
    tenTep: "KHBD-STEM-Tin" + D.lop + "-" + D.id.replace(/^tin\d-/, ""), dung: function () { return dung(); },
    khiDong: function () { if (location.hash === "#khbd") history.replaceState(null, "", location.pathname + location.search); } };

  /* Gom các dòng kế hoạch thời gian vào 5 hoạt động */
  var TEN_HD = ["Xác định vấn đề", "Nghiên cứu kiến thức nền", "Đề xuất và lựa chọn giải pháp", "Chế tạo sản phẩm, thử nghiệm và điều chỉnh", "Chia sẻ, thảo luận, đánh giá sản phẩm"];
  var HD = [0, 1, 2, 3, 4].map(function () { return { phut: 0, chinh: "", them: [] }; });
  var TIET_CUA = [1, 1, 1, 2, 2];
  (g.tiet || []).forEach(function (tiet) {
    var cur = -1;
    tiet.forEach(function (r) {
      var m = /^<b>Bước (\d)\.<\/b>/.exec(r[1]);
      if (m) cur = +m[1] - 1;
      if (cur < 0) return;
      HD[cur].phut += parseInt(r[0], 10) || 0;
      if (m) HD[cur].chinh = bo(r[1]); else HD[cur].them.push(r[1]);
    });
  });
  function tachChot(s) { var i = s.indexOf("GV chốt"); return i < 0 ? [s, ""] : [s.slice(0, i).replace(/[\s.;,]+$/, ""), s.slice(i)]; }

  var MON = { S: "Khoa học (S)", T: "Công nghệ – Tin học (T)", E: "Kĩ thuật (E)", M: "Toán học (M)" };
  var b1 = D.buoc1, b2 = D.buoc2, b3 = D.buoc3, b5 = D.buoc5, ss = b3.soSanh, pa = b3.phuongAn;
  var LOP = "Tin học " + D.lop, BAI = "Bài " + D.bai + ". " + D.tenBai;

  function dung() {
    var N = [];
    N = N.concat(K.dauTrang(CFG, "Bài học STEM – " + D.ten, "(Vận dụng " + esc(BAI) + " – " + LOP + ")", 2));

    /* I. MỤC TIÊU */
    N.push(K.Muc("I. MỤC TIÊU"));
    N.push(P("<b>1. Về kiến thức</b>"));
    N.push(G("Yêu cầu cần đạt (Chương trình Tin học 2018): " + g.yccd));
    N.push(G("Kiến thức liên môn STEM được vận dụng trong bài học:"));
    b2.kienThuc.forEach(function (m) { N.push(P("+ " + MON[m.mon] + ": " + esc(m.ten) + ".", { thut: 2 })); });
    N.push(P("<b>2. Về năng lực</b>"));
    N.push(P("<i>a) Năng lực chung</i>", { thut: 1 }));
    N.push(G("<i>Tự chủ và tự học:</i> chủ động đọc tài liệu, tự kiểm tra kiến thức nền qua câu hỏi nhanh; tự đánh giá sản phẩm của nhóm theo tiêu chí."));
    N.push(G("<i>Giao tiếp và hợp tác:</i> phân công nhiệm vụ trong nhóm, trao đổi, thống nhất phương án; trình bày và lắng nghe góp ý về sản phẩm."));
    N.push(G("<i>Giải quyết vấn đề và sáng tạo:</i> xác định vấn đề và tiêu chí sản phẩm, đề xuất và so sánh các phương án, thử nghiệm, phát hiện lỗi và điều chỉnh sản phẩm."));
    N.push(P("<i>b) Năng lực đặc thù (Tin học)</i>", { thut: 1 }));
    (g.nl || [["NLc", "Giải quyết vấn đề với sự hỗ trợ của công nghệ thông tin và truyền thông: vận dụng kiến thức " + esc(BAI) + " để tạo sản phẩm đáp ứng các tiêu chí đặt ra."],
              ["NLe", "Hợp tác trong môi trường số: cùng nhóm xây dựng, chia sẻ và góp ý sản phẩm số."]])
      .forEach(function (n) { N.push(G("<i>" + n[0] + ":</i> " + n[1])); });
    if (NA) {
      N.push(P("<i>c) Năng lực số (Thông tư 02/2025/TT-BGDĐT; chỉ báo theo Công văn 3456)</i>", { thut: 1 }));
      NA.nls.forEach(function (m) { N.push(G("<i>" + m + ":</i> " + esc(NLS_ATM.chiBao[m] || ""))); });
      if (NA.atm.length) {
        N.push(P("<i>d) An toàn mạng toàn diện (Công văn 6206)</i>", { thut: 1 }));
        NA.atm.forEach(function (a) { N.push(G("<i>" + a.nhom + " [" + a.muc + "]:</i> " + esc(a.yc))); });
      }
      N.push(G("<i>Mục tiêu tích hợp:</i> " + esc(NA.mt)));
    }
    N.push(P("<b>3. Về phẩm chất</b>"));
    N.push(G("<i>Chăm chỉ:</i> kiên trì thử nghiệm, sửa lỗi đến khi sản phẩm đạt tiêu chí."));
    N.push(G("<i>Trách nhiệm:</i> hoàn thành phần việc được phân công, có trách nhiệm với sản phẩm chung của nhóm."));
    N.push(G("<i>Trung thực:</i> tự đánh giá và đánh giá chéo khách quan, đúng với kết quả thử nghiệm."));
    (g.pc || []).forEach(function (s) { N.push(G(s)); });

    /* II. THIẾT BỊ */
    N.push(K.Muc("II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU"));
    N.push(P("<b>1. Giáo viên</b>"));
    N.push(G(g.chuanBi));
    N.push(G("Trang dự án STEM trực tuyến (tình huống, thẻ kiến thức nền, xưởng thực hành mô phỏng, bảng tiêu chí): <i>" + esc(location.href.split("#")[0]) + "</i>"));
    N.push(G("Trang giáo viên để mở đánh giá chéo, chấm điểm và xếp hạng sản phẩm các nhóm; bảng tiêu chí đánh giá sản phẩm (Phụ lục)."));
    N.push(P("<b>2. Học sinh</b>"));
    N.push(G("SGK " + LOP + " – " + esc(BAI) + "; vở ghi, giấy nháp."));
    N.push(G("Chia nhóm 3 – 4 HS, mỗi nhóm một máy tính; các nhóm làm trên cùng một máy trong cả 2 tiết (hoặc lưu bài lên lớp bằng mã buổi để mở lại ở máy khác)."));

    /* III. TIẾN TRÌNH */
    N.push(K.Muc("III. TIẾN TRÌNH DẠY HỌC"));
    var NOI = noiDung();
    [0, 1, 2, 3, 4].forEach(function (i) {
      if (i === 0) N.push(P("<b>TIẾT 1</b>", { giua: 1, truoc: 10, sau: 2, nen: "D9D9D9", mau: K.MAU.dam }));
      if (i === 3) N.push(P("<b>TIẾT 2</b>", { giua: 1, truoc: 10, sau: 2, nen: "D9D9D9", mau: K.MAU.dam }));
      N.push(P("", { truoc: 4 })); N.push(K.Thanh(("Hoạt động " + (i + 1) + ". " + TEN_HD[i]).toUpperCase(), HD[i].phut ? HD[i].phut + " phút" : "", ["C55A11", "2E75B6", "2E75B6", "548235", "7030A0"][i]));
      var x = NOI[i];
      N.push(P("<b>a) Mục tiêu:</b> " + x.mt, { thut: 1 }));
      N.push(P("<b>b) Nội dung:</b>", { thut: 1 })); x.nd.forEach(function (s) { N.push(G(s, 2)); });
      N.push(P("<b>c) Sản phẩm:</b>", { thut: 1 })); x.sp.forEach(function (s) { N.push(G(s, 2)); });
      N.push(P("<b>d) Tổ chức thực hiện:</b>", { thut: 1 }));
      N.push(T([28, 72], [["<b>Bước</b>", "<b>Hoạt động của giáo viên và học sinh</b>"]].concat(
        [["Chuyển giao nhiệm vụ", x.tc[0]], ["Thực hiện nhiệm vụ", x.tc[1]], ["Báo cáo, thảo luận", x.tc[2]], ["Kết luận, nhận định", x.tc[3]]]
          .map(function (r) { return ["<b>" + r[0] + "</b>", r[1].map(function (s) { return P("- " + s); })]; })), { dau: 1 }));
    });

    /* Phụ lục: bảng đánh giá */
    N.push(K.Muc("PHỤ LỤC. CÔNG CỤ ĐÁNH GIÁ"));
    N.push(P("<b>1. Tiêu chí sản phẩm</b> (HS xác định ở Hoạt động 1, kiểm tra ở Hoạt động 4)"));
    D.tieuChi.forEach(function (t, j) { N.push(P("TC" + (j + 1) + ". " + t.t, { thut: 1 })); });
    if (D.tieuChiNhom) N.push(P("<i>Mỗi nhóm đặt thêm một tiêu chí riêng và tự kiểm tra.</i>", { thut: 1 }));
    N.push(P("<b>2. Bảng đánh giá sản phẩm</b> (tự đánh giá, đánh giá chéo và GV đánh giá; tổng điểm quy về thang 10)", { truoc: 4 }));
    N.push(T([22, 26, 26, 26], [["<b>Tiêu chí</b>", "<b>Mức 1 (1 điểm)</b>", "<b>Mức 2 (2 điểm)</b>", "<b>Mức 3 (3 điểm)</b>"]].concat(
      D.rubric.map(function (r) { return ["<b>" + r[0] + "</b>", r[1], r[2], r[3]]; })), { dau: 1, nho: 1 }));

    N = N.concat(K.chuKi());
    return N;
  }

  function noiDung() {
    var r = [];
    var s1 = tachChot(HD[0].chinh), s2 = tachChot(HD[1].chinh);
    var dapAn = b2.quiz.map(function (c, i) { return "Câu " + (i + 1) + ": " + String.fromCharCode(65 + c.d) + " (" + c.o[c.d] + ")"; }).join("; ");
    r.push({
      mt: "HS nêu được vấn đề cần giải quyết trong tình huống thực tiễn, xác định được nhiệm vụ và các tiêu chí của sản phẩm.",
      nd: ["Tình huống: " + b1.tinhHuong, "Nhiệm vụ: " + b1.nhiemVu, "Nhóm trả lời các câu hỏi: " + b1.hoi.map(function (q) { return "<i>" + q[0] + "</i>"; }).join(" ")],
      sp: ["Câu trả lời của nhóm (ghi trên trang dự án, Bước 1): vấn đề cần giải quyết, đầu vào – đầu ra/yêu cầu của sản phẩm.",
           "Bảng " + D.tieuChi.length + " tiêu chí sản phẩm được cả lớp thống nhất" + (D.tieuChiNhom ? " và tiêu chí riêng của mỗi nhóm" : "") + " (Phụ lục, mục 1)."],
      tc: [[s1[0] || "GV chiếu tình huống, nêu nhiệm vụ.", "GV chia nhóm, yêu cầu nhóm đọc tình huống, nhiệm vụ, tiêu chí sản phẩm (Bước 1) và trả lời câu hỏi."],
           ["HS đọc tình huống, thảo luận nhóm, ghi câu trả lời vào trang dự án.", "GV quan sát, gợi ý cho nhóm gặp khó khăn."],
           ["GV gọi 1 – 2 nhóm nêu vấn đề và tiêu chí sản phẩm; các nhóm khác nhận xét, bổ sung."],
           ["GV chốt vấn đề cần giải quyết và các tiêu chí sản phẩm; đây là căn cứ để thử nghiệm ở Hoạt động 4 và đánh giá ở Hoạt động 5."]]
    });
    r.push({
      mt: "HS tìm hiểu được kiến thức nền Khoa học – Công nghệ – Kĩ thuật – Toán cần dùng để giải quyết vấn đề, trọng tâm là kiến thức của " + esc(BAI) + ".",
      nd: ["Nhóm đọc 4 thẻ kiến thức nền: " + b2.kienThuc.map(function (m) { return MON[m.mon] + " – " + esc(m.ten); }).join("; ") + ".",
           "Nhóm làm " + b2.quiz.length + " câu Kiểm tra nhanh trên trang dự án (trang phản hồi đúng/sai và giải thích ngay)."],
      sp: ["Kết quả Kiểm tra nhanh của nhóm. Đáp án: " + dapAn + ".", "HS nắm được kiến thức trọng tâm của bài để vận dụng ở các hoạt động sau."],
      tc: [["GV yêu cầu nhóm đọc 4 thẻ kiến thức nền S – T – E – M (Bước 2) và làm phần Kiểm tra nhanh."],
           [s2[0] || "HS đọc cá nhân, trao đổi trong nhóm, chọn đáp án.", "HS đọc cá nhân rồi trao đổi trong nhóm; câu sai thì đọc lại thẻ kiến thức và chọn lại. GV hỗ trợ nhóm còn lúng túng."],
           ["Đại diện nhóm trả lời câu hỏi GV nêu, giải thích lựa chọn; nhóm khác nhận xét."],
           [s2[1] ? s2[1] + (/[.!?]$/.test(s2[1]) ? "" : ".") : "GV chốt kiến thức trọng tâm của bài.", "GV liên hệ kiến thức với nhiệm vụ của dự án."]]
    });
    var nd3 = [], sp3 = [], kl3 = [];
    if (ss) {
      nd3.push("Nhóm so sánh các phương án theo tiêu chí (" + ss.tieuChi.join("; ") + "): " + ss.phuongAn.map(function (p, j) { return "(" + (j + 1) + ") <i>" + p[0] + "</i>: " + p[1]; }).join(" ") + " Nhóm có thể đề xuất phương án riêng.");
      sp3.push("Bảng so sánh có chấm mức từng phương án, phương án được chọn và lí do, điểm yếu và cách khắc phục.");
      kl3.push("GV nhận xét lí do lựa chọn của các nhóm (không có đáp án đúng duy nhất), lưu ý ưu, nhược điểm của từng phương án.");
    } else if (pa) {
      nd3.push(pa.tieuDe + " Các phương án: " + pa.o.map(function (p, j) { return "(" + (j + 1) + ") <i>" + p[0] + "</i>: " + p[1]; }).join(" "));
      sp3.push("Phương án nhóm chọn. Phương án phù hợp: <i>" + pa.o[pa.d][0] + "</i> – " + chu(pa.g[pa.d]).replace(/^✅\s*/, ""));
      kl3.push("GV chốt phương án phù hợp: " + pa.o[pa.d][0] + ".");
    }
    nd3.push("Nhóm trả lời: " + b3.hoi.map(function (q) { return "<i>" + q[0] + "</i>"; }).join(" "));
    nd3.push("Nhóm lập bảng phân công: " + b3.viec.join("; ") + ".");
    sp3.push("Ý tưởng, phác thảo giải pháp và bảng phân công công việc của nhóm (Bước 3 trên trang dự án).");
    r.push({
      mt: "HS đề xuất, so sánh các phương án, lựa chọn được phương án phù hợp và lập kế hoạch, phân công thực hiện.",
      nd: nd3, sp: sp3,
      tc: [["GV yêu cầu nhóm " + (ss ? "chấm các phương án theo từng tiêu chí trong bảng so sánh" : "chọn cách làm") + ", trả lời câu hỏi ý tưởng và lập bảng phân công (Bước 3)."],
           [HD[2].chinh || "Nhóm thảo luận, chọn phương án, phân công.", "GV đi đến từng nhóm, đặt câu hỏi gợi mở “Vì sao chọn cách này?”."],
           HD[2].them.length ? HD[2].them : ["Đại diện nhóm trình bày phương án đã chọn; các nhóm khác góp ý."],
           kl3.concat(["GV nhắc nhóm điều chỉnh phương án theo góp ý trước khi bước vào Tiết 2."])]
    });
    r.push({
      mt: "HS thực hiện được sản phẩm theo phương án đã chọn, thử nghiệm, phát hiện lỗi và điều chỉnh để sản phẩm đạt các tiêu chí.",
      nd: ["Nhóm làm sản phẩm trong xưởng thực hành (Bước 4) trên trang dự án; chạy thử và đối chiếu từng tiêu chí: " + D.tieuChi.map(function (t) { return chu(t.t); }).join(" ") ],
      sp: ["Sản phẩm của nhóm; các tiêu chí đạt được tự đánh dấu trên trang dự án."].concat(
           NA ? ["<i>Minh chứng năng lực số</i> (" + NA.nls.join(", ") + "): sản phẩm của nhóm, điểm và đề xuất chỉnh sửa của hệ thống chấm, báo cáo dự án."] : []).concat(g.luuY ? ["<i>Gợi ý cho GV:</i> " + g.luuY] : []),
      tc: [["GV yêu cầu nhóm làm sản phẩm theo phương án đã chọn, đối chiếu " + D.tieuChi.length + " tiêu chí; các thành viên làm đúng phần việc được phân công."],
           [HD[3].chinh || "Nhóm làm sản phẩm, chạy thử, sửa lỗi.", "GV quan sát, hỗ trợ; không đưa lời giải sớm mà gợi ý nhóm thử nghiệm để tự tìm lỗi."],
           ["Nhóm bấm “Nhờ hệ thống chấm” trên trang dự án để nhận điểm theo bảng tiêu chí và danh sách đề xuất chỉnh sửa, rồi sửa sản phẩm theo đề xuất.", "Nhóm báo cáo tiến độ, những tiêu chí đã đạt, lỗi đã gặp và cách sửa."],
           ["GV nhận xét tiến độ, chỉ ra lỗi thường gặp; nhắc các nhóm hoàn thiện sản phẩm để chia sẻ."]]
    });
    var them5 = HD[4].them.slice();
    r.push({
      mt: "HS trình bày, chia sẻ được sản phẩm; đánh giá sản phẩm theo tiêu chí; đề xuất được phương án cải tiến.",
      nd: ["Nhóm trình bày sản phẩm, tự đánh giá và đánh giá chéo theo bảng tiêu chí (Phụ lục, mục 2).", "Nhóm trả lời câu hỏi điều chỉnh: " + b5.hoi.map(function (q) { return "<i>" + q[0] + "</i>"; }).join(" ")],
      sp: ["Bài trình bày của nhóm; điểm tự đánh giá, điểm của nhóm bạn và của GV.", "Báo cáo dự án của nhóm (in hoặc lưu PDF từ trang dự án)."],
      tc: [["GV tổ chức cho các nhóm trình bày sản phẩm và đánh giá theo bảng tiêu chí; có thể mở đánh giá chéo trực tuyến ở trang giáo viên (nhóm nộp sản phẩm bằng mã buổi)."],
           [HD[4].chinh || "Các nhóm trình bày, chấm bảng tự đánh giá.", "HS trả lời câu hỏi điều chỉnh, ghi đề xuất cải tiến."],
           ["Các nhóm nhận xét, đặt câu hỏi, góp ý cho nhóm bạn; nhóm trình bày giải thích và tiếp thu."],
           them5.length ? them5.concat(["GV tổng hợp điểm (tự đánh giá, nhóm bạn, giáo viên), nhận xét, tuyên dương nhóm làm tốt."]) : ["GV chốt kiến thức, tổng hợp điểm, nhận xét, tuyên dương; nhóm in hoặc lưu PDF báo cáo."]]
    });
    return r;
  }

  function mo() {
    if (window.GvKhoa && !GvKhoa.laGv()) { GvKhoa.mo(mo); return; }   // chỉ giáo viên
    K.mo(CFG);
  }
  window.KHBD = { mo: mo, dung: dung, taoBlob: function () { return K.taoBlob(CFG); } };
  document.addEventListener("click", function (e) { if (e.target.closest("[data-khbd]")) { e.preventDefault(); mo(); } });
  if (location.hash === "#khbd") mo();
})();
