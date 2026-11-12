/* KẾ HOẠCH BÀI DẠY STEM – theo Phụ lục IV, Công văn 5512/BGDĐT-GDTrH,
   tiến trình 5 hoạt động theo Công văn 3089/BGDĐT-GDTrH (bài học STEM).
   Dựng từ window.DU_AN (cùng dữ liệu với trang học sinh), xem trước trên trang
   và tải về tệp Word (.docx) để nộp Ban giám hiệu.
   Mở: KHBD.mo()  ·  hoặc thêm #khbd vào địa chỉ trang dự án. */
(function () {
  var D = window.DU_AN, g = D.gv || {};
  var KHOA_TT = "stem-khbd-thong-tin";
  var DOCX_URL = "https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function boEmoji(s) { return String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]️?/gu, "").replace(/️/g, "").replace(/ (<\/[bi]>)/g, "$1 ").replace(/ {2,}/g, " ").replace(/ ([,.;:)])/g, "$1").replace(/\( /g, "("); }
  function chu(html) { var d = document.createElement("div"); d.innerHTML = html; return (d.textContent || "").trim(); }
  function bo(s) {
    s = String(s).replace(/^<b>Bước \d\.<\/b>\s*/, "");
    return /^(GV|HS|Nhóm|Các|Cả|Hai|Mỗi|\d)/.test(s) ? s : "GV " + s.charAt(0).toLowerCase() + s.slice(1);
  }

  /* ---------- thông tin giáo viên (lưu trên máy) ---------- */
  var TT = { truong: "THCS Nhơn Mỹ", to: "", gv: "", lopDay: "", ngaySoan: "", ngayDay: "", tietPPCT: "", diaDanh: "Nhơn Mỹ" };
  try { var cu = JSON.parse(localStorage.getItem(KHOA_TT) || "null"); if (cu) for (var k in cu) TT[k] = cu[k]; } catch (e) {}
  function luuTT() { try { localStorage.setItem(KHOA_TT, JSON.stringify(TT)); } catch (e) {} }
  function o(v, dai) { return v ? esc(v) : (dai ? "……………………………" : "…………"); }

  /* ---------- mô hình tài liệu: P (đoạn) và T (bảng) ---------- */
  function P(html, k) { k = k || {}; k.t = "p"; k.h = html; return k; }
  function G(html, cap) { return P("- " + html, { thut: cap || 1 }); }          // gạch đầu dòng
  function T(cot, hang, k) { k = k || {}; k.t = "t"; k.cot = cot; k.hang = hang; return k; }

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
    /* Đầu trang theo mẫu 5512 */
    N.push(T([50, 50], [[
      [P("Trường: " + o(TT.truong, 1)), P("Tổ: " + o(TT.to, 1))],
      [P("Họ và tên giáo viên:", { giua: 1 }), P(TT.gv ? "<b>" + esc(TT.gv) + "</b>" : "……………………………", { giua: 1 })]
    ]], { khung: 0 }));
    N.push(P("", {}));
    N.push(P("<b>KẾ HOẠCH BÀI DẠY</b>", { giua: 1, co: 15, sau: 2 }));
    N.push(P("<b>TÊN BÀI DẠY: BÀI HỌC STEM – " + esc(D.ten.toUpperCase()) + "</b>", { giua: 1, co: 14 }));
    N.push(P("<i>(Vận dụng " + esc(BAI) + " – " + LOP + ")</i>", { giua: 1 }));
    N.push(P("Môn học: Tin học; lớp: " + (TT.lopDay ? esc(TT.lopDay) : D.lop), { giua: 1 }));
    N.push(P("Thời gian thực hiện: 02 tiết" + (TT.tietPPCT ? " (Tiết PPCT: " + esc(TT.tietPPCT) + ")" : ""), { giua: 1 }));
    if (TT.ngaySoan || TT.ngayDay) N.push(P("<i>Ngày soạn: " + o(TT.ngaySoan) + " · Ngày dạy: " + o(TT.ngayDay) + "</i>", { giua: 1 }));
    N.push(P("", {}));

    /* I. MỤC TIÊU */
    N.push(P("<b>I. MỤC TIÊU</b>", { truoc: 6 }));
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
    N.push(P("<b>3. Về phẩm chất</b>"));
    N.push(G("<i>Chăm chỉ:</i> kiên trì thử nghiệm, sửa lỗi đến khi sản phẩm đạt tiêu chí."));
    N.push(G("<i>Trách nhiệm:</i> hoàn thành phần việc được phân công, có trách nhiệm với sản phẩm chung của nhóm."));
    N.push(G("<i>Trung thực:</i> tự đánh giá và đánh giá chéo khách quan, đúng với kết quả thử nghiệm."));
    (g.pc || []).forEach(function (s) { N.push(G(s)); });

    /* II. THIẾT BỊ */
    N.push(P("<b>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</b>", { truoc: 6 }));
    N.push(P("<b>1. Giáo viên</b>"));
    N.push(G(g.chuanBi));
    N.push(G("Trang dự án STEM trực tuyến (tình huống, thẻ kiến thức nền, xưởng thực hành mô phỏng, bảng tiêu chí): <i>" + esc(location.href.split("#")[0]) + "</i>"));
    N.push(G("Trang giáo viên để mở đánh giá chéo, chấm điểm và xếp hạng sản phẩm các nhóm; bảng tiêu chí đánh giá sản phẩm (Phụ lục)."));
    N.push(P("<b>2. Học sinh</b>"));
    N.push(G("SGK " + LOP + " – " + esc(BAI) + "; vở ghi, giấy nháp."));
    N.push(G("Chia nhóm 3 – 4 HS, mỗi nhóm một máy tính; các nhóm làm trên cùng một máy trong cả 2 tiết (hoặc lưu bài lên lớp bằng mã buổi để mở lại ở máy khác)."));

    /* III. TIẾN TRÌNH */
    N.push(P("<b>III. TIẾN TRÌNH DẠY HỌC</b>", { truoc: 6 }));
    var NOI = noiDung();
    [0, 1, 2, 3, 4].forEach(function (i) {
      if (i === 0) N.push(P("<b>TIẾT 1</b>", { giua: 1, truoc: 6 }));
      if (i === 3) N.push(P("<b>TIẾT 2</b>", { giua: 1, truoc: 6 }));
      N.push(P("<b>Hoạt động " + (i + 1) + ". " + TEN_HD[i] + "</b>" + (HD[i].phut ? " <i>(" + HD[i].phut + " phút)</i>" : ""), { truoc: 4 }));
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
    N.push(P("<b>PHỤ LỤC. CÔNG CỤ ĐÁNH GIÁ</b>", { truoc: 10 }));
    N.push(P("<b>1. Tiêu chí sản phẩm</b> (HS xác định ở Hoạt động 1, kiểm tra ở Hoạt động 4)"));
    D.tieuChi.forEach(function (t, j) { N.push(P("TC" + (j + 1) + ". " + t.t, { thut: 1 })); });
    if (D.tieuChiNhom) N.push(P("<i>Mỗi nhóm đặt thêm một tiêu chí riêng và tự kiểm tra.</i>", { thut: 1 }));
    N.push(P("<b>2. Bảng đánh giá sản phẩm</b> (tự đánh giá, đánh giá chéo và GV đánh giá; tổng điểm quy về thang 10)", { truoc: 4 }));
    N.push(T([22, 26, 26, 26], [["<b>Tiêu chí</b>", "<b>Mức 1 (1 điểm)</b>", "<b>Mức 2 (2 điểm)</b>", "<b>Mức 3 (3 điểm)</b>"]].concat(
      D.rubric.map(function (r) { return ["<b>" + r[0] + "</b>", r[1], r[2], r[3]]; })), { dau: 1, nho: 1 }));

    /* Chữ kí */
    N.push(P("", {}));
    N.push(T([34, 33, 33], [[
      [P("<b>DUYỆT CỦA BAN GIÁM HIỆU</b>", { giua: 1 })],
      [P("<b>TỔ TRƯỞNG CHUYÊN MÔN</b>", { giua: 1 })],
      [P("<i>" + esc(TT.diaDanh || "……") + ", ngày …… tháng …… năm 20……</i>", { giua: 1 }), P("<b>GIÁO VIÊN</b>", { giua: 1 }),
       P("", {}), P("", {}), P("", {}), P(TT.gv ? "<b>" + esc(TT.gv) + "</b>" : "", { giua: 1 })]
    ]], { khung: 0 }));
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
      sp: ["Sản phẩm của nhóm; các tiêu chí đạt được tự đánh dấu trên trang dự án."].concat(g.luuY ? ["<i>Gợi ý cho GV:</i> " + g.luuY] : []),
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

  /* ---------- xem trước HTML ---------- */
  function veHtml(N) {
    return N.map(function (n) {
      if (n.t === "p") return '<p class="kp' + (n.giua ? " giua" : "") + '" style="' + (n.thut ? "padding-left:" + (n.thut * 1.2) + "em;" : "") + (n.co ? "font-size:" + (n.co / 13) + "em;" : "") + (n.truoc ? "margin-top:" + n.truoc + "pt;" : "") + '">' + (boEmoji(n.h) || "&nbsp;") + "</p>";
      return '<table class="kt' + (n.khung === 0 ? " khong" : "") + (n.nho ? " nho" : "") + '"><colgroup>' + n.cot.map(function (w) { return '<col style="width:' + w + '%">'; }).join("") + "</colgroup>" +
        n.hang.map(function (row) { return "<tr>" + row.map(function (c) { return "<td>" + (typeof c === "string" ? boEmoji(c) : veHtml(c)) + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
    }).join("");
  }

  /* ---------- xuất DOCX ---------- */
  function napDocx() {
    return new Promise(function (ok, loi) {
      if (window.docx) return ok(window.docx);
      var s = document.createElement("script"); s.src = DOCX_URL;
      s.onload = function () { window.docx ? ok(window.docx) : loi(new Error("docx")); };
      s.onerror = function () { loi(new Error("Không tải được thư viện tạo Word (cần mạng Internet).")); };
      document.head.appendChild(s);
    });
  }
  function runs(X, html, co) {
    var d = document.createElement("div"); d.innerHTML = boEmoji(html); var out = [];
    (function di(el, b, it) {
      el.childNodes.forEach(function (c) {
        if (c.nodeType === 3) { var t = c.nodeValue.replace(/\s+/g, " "); if (t) out.push(new X.TextRun({ text: t, bold: b, italics: it, size: co })); }
        else if (c.nodeType === 1) {
          var tag = c.tagName;
          if (tag === "BR") { out.push(new X.TextRun({ break: 1 })); return; }
          if (tag === "LI" || tag === "P") { if (out.length) out.push(new X.TextRun({ text: " ", size: co })); }
          di(c, b || tag === "B" || tag === "STRONG", it || tag === "I" || tag === "EM");
        }
      });
    })(d, false, false);
    return out;
  }
  function docxNodes(X, N, nho) {
    var co = nho ? 24 : 26;
    return N.map(function (n) {
      if (n.t === "p") return new X.Paragraph({
        children: runs(X, n.h, n.co ? n.co * 2 : co), alignment: n.giua ? X.AlignmentType.CENTER : X.AlignmentType.JUSTIFIED,
        indent: n.thut ? { left: 284 * n.thut } : undefined, spacing: { before: (n.truoc || 0) * 20, after: 40, line: 276 }
      });
      var khong = n.khung === 0, B = khong ? { style: X.BorderStyle.NONE, size: 0, color: "FFFFFF" } : { style: X.BorderStyle.SINGLE, size: 4, color: "000000" };
      var bien = { top: B, bottom: B, left: B, right: B, insideHorizontal: B, insideVertical: B };
      return new X.Table({
        width: { size: 100, type: X.WidthType.PERCENTAGE }, borders: bien,
        columnWidths: n.cot.map(function (w) { return Math.round(9071 * w / 100); }),
        rows: n.hang.map(function (row, ri) {
          return new X.TableRow({
            tableHeader: !!(n.dau && ri === 0), cantSplit: false,
            children: row.map(function (c, ci) {
              var ch = typeof c === "string" ? [P(c, { giua: n.dau && ri === 0 })] : c;
              return new X.TableCell({
                width: { size: n.cot[ci], type: X.WidthType.PERCENTAGE }, borders: khong ? { top: B, bottom: B, left: B, right: B } : undefined,
                margins: { top: 40, bottom: 40, left: 90, right: 90 },
                shading: n.dau && ri === 0 ? { fill: "EDEDED", type: X.ShadingType.CLEAR, color: "auto" } : undefined,
                children: docxNodes(X, ch, n.nho)
              });
            })
          });
        })
      });
    });
  }
  function taoBlob() {
    return napDocx().then(function (X) {
      var doc = new X.Document({
        creator: TT.gv || "Giáo viên", title: "KHBD STEM – " + D.ten, description: "Kế hoạch bài dạy STEM " + LOP,
        styles: { default: { document: { run: { font: "Times New Roman", size: 26 } } } },
        sections: [{
          properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1701, right: 1134 } } },
          footers: { default: new X.Footer({ children: [new X.Paragraph({ alignment: X.AlignmentType.CENTER, children: [new X.TextRun({ children: [X.PageNumber.CURRENT], size: 22 })] })] }) },
          children: docxNodes(X, dung())
        }]
      });
      return X.Packer.toBlob(doc);
    });
  }
  function taiDocx(nut) {
    var cu = nut.textContent; nut.disabled = true; nut.textContent = "Đang tạo tệp Word…";
    taoBlob().then(function (blob) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = "KHBD-STEM-Tin" + D.lop + "-" + D.id.replace(/^tin\d-/, "") + ".docx";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      nut.textContent = "✓ Đã tải tệp Word";
    }).catch(function (e) { alert(e.message || e); nut.textContent = cu; })
      .then(function () { setTimeout(function () { nut.disabled = false; nut.textContent = cu; }, 2500); });
  }

  /* ---------- hộp xem trước ---------- */
  var CSS = ".khbd-nen{position:fixed;inset:0;z-index:60;background:rgba(15,23,42,.6);display:flex;flex-direction:column}" +
    ".khbd-thanh{background:#fff;padding:10px 16px;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:end;border-bottom:1px solid #e2e8f0}" +
    ".khbd-thanh label{font-size:12px;font-weight:700;color:#475569;display:flex;flex-direction:column;gap:2px;flex:1 1 150px;max-width:230px}" +
    ".khbd-thanh input{border:1px solid #cbd5e1;border-radius:8px;padding:6px 8px;font:inherit;font-size:14px;font-weight:400;color:#0f172a}" +
    ".khbd-nut{display:flex;gap:8px;margin-left:auto}.khbd-cuon{flex:1;overflow:auto;padding:18px 12px}" +
    ".khbd-giay{background:#fff;color:#000;max-width:794px;margin:0 auto;padding:56px 56px 56px 84px;font-family:'Times New Roman',Times,serif;font-size:16px;line-height:1.45;box-shadow:0 6px 30px rgba(0,0,0,.3)}" +
    ".khbd-giay .kp{margin:0 0 3px;text-align:justify}.khbd-giay .kp.giua{text-align:center}" +
    ".khbd-giay table.kt{width:100%;border-collapse:collapse;margin:4px 0 8px;table-layout:fixed}.khbd-giay .kt td{border:1px solid #000;padding:3px 6px;vertical-align:top}" +
    ".khbd-giay .kt tr:first-child td{background:#ededed}.khbd-giay .kt.khong td{border:0;background:none}.khbd-giay .kt.nho{font-size:15px}" +
    ".khbd-giay .kt td .kp{text-align:left}" +
    "@media (max-width:640px){.khbd-giay{padding:22px 16px;font-size:14px}.khbd-thanh label{max-width:none}.khbd-nut{margin-left:0;width:100%}}" +
    "@media print{body.khbd-in>*:not(.khbd-nen){display:none!important}body.khbd-in .khbd-nen{position:static;background:none}body.khbd-in .khbd-thanh{display:none}body.khbd-in .khbd-cuon{padding:0;overflow:visible}body.khbd-in .khbd-giay{box-shadow:none;padding:0;max-width:none}}";

  function mo() {
    if (window.GvKhoa && !GvKhoa.laGv()) { GvKhoa.mo(mo); return; }   // chỉ giáo viên
    if (document.querySelector(".khbd-nen")) return;
    if (!document.getElementById("khbd-css")) { var st = document.createElement("style"); st.id = "khbd-css"; st.textContent = CSS; document.head.appendChild(st); }
    var O = [["truong", "Trường"], ["to", "Tổ chuyên môn"], ["gv", "Họ và tên giáo viên"], ["lopDay", "Lớp dạy", D.lop + "A1, " + D.lop + "A2"], ["tietPPCT", "Tiết PPCT", "VD: 30, 31"], ["ngaySoan", "Ngày soạn", "dd/mm/yyyy"], ["ngayDay", "Ngày dạy", "dd/mm/yyyy"], ["diaDanh", "Địa danh (chỗ kí)"]];
    var nen = document.createElement("div"); nen.className = "khbd-nen"; nen.setAttribute("role", "dialog"); nen.setAttribute("aria-modal", "true"); nen.setAttribute("aria-label", "Kế hoạch bài dạy");
    nen.innerHTML = '<div class="khbd-thanh">' + O.map(function (f) {
      return '<label>' + f[1] + '<input data-tt="' + f[0] + '" value="' + esc(TT[f[0]]) + '" placeholder="' + esc(f[2] || "") + '"></label>';
    }).join("") + '<div class="khbd-nut"><button class="btn chinh" data-khbd-tai>⬇ Tải Word (.docx)</button><button class="btn" data-khbd-in>🖨 In</button><button class="btn" data-khbd-dong aria-label="Đóng">✕ Đóng</button></div></div>' +
      '<div class="khbd-cuon"><div class="khbd-giay"></div></div>';
    document.body.appendChild(nen); document.body.style.overflow = "hidden";
    var giay = nen.querySelector(".khbd-giay");
    function ve() { giay.innerHTML = veHtml(dung()); }
    ve();
    nen.addEventListener("input", function (e) { var k = e.target.dataset.tt; if (k) { TT[k] = e.target.value.trim(); luuTT(); ve(); } });
    nen.addEventListener("click", function (e) {
      if (e.target.closest("[data-khbd-tai]")) taiDocx(e.target.closest("[data-khbd-tai]"));
      else if (e.target.closest("[data-khbd-in]")) { document.body.classList.add("khbd-in"); window.print(); document.body.classList.remove("khbd-in"); }
      else if (e.target.closest("[data-khbd-dong]") || e.target === nen) dong();
    });
    function phim(e) { if (e.key === "Escape") dong(); }
    function dong() { nen.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", phim); if (location.hash === "#khbd") history.replaceState(null, "", location.pathname + location.search); }
    document.addEventListener("keydown", phim);
    nen.querySelector("[data-khbd-tai]").focus();
  }

  window.KHBD = { mo: mo, dung: dung, taoBlob: taoBlob };
  document.addEventListener("click", function (e) { if (e.target.closest("[data-khbd]")) { e.preventDefault(); mo(); } });
  if (location.hash === "#khbd") mo();
})();
