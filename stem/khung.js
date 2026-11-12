/* KHUNG DỰ ÁN STEM – dùng chung cho mọi trang trong thư mục stem/
   Mỗi trang dự án khai báo window.DU_AN = {...} rồi nạp tệp này.
   Quy trình 5 bước theo hướng dẫn giáo dục STEM (CV 3089/BGDĐT-GDTrH):
     1 Xác định vấn đề · 2 Nghiên cứu kiến thức nền · 3 Đề xuất và chọn giải pháp
     4 Chế tạo, thử nghiệm · 5 Chia sẻ, đánh giá, điều chỉnh
   Phần "xưởng" (bước 4) là hàm DU_AN.xuong(hop, api) do trang dự án tự viết:
     api.w        – đối tượng lưu trạng thái riêng của xưởng (tự lưu khi gọi api.luu())
     api.luu()    – lưu
     api.dat(k,b) – đánh dấu tiêu chí sản phẩm k đạt / chưa đạt (tự hiện ở bước 1 và 4)
     api.bao(t)   – hiện thông báo ngắn
   Hàm xuong trả về {baoCao: () => "html"} để in vào báo cáo dự án. */
(function () {
  var D = window.DU_AN;
  var KHOA = "stem-" + D.id + "-v1";
  var S = { nhom: {}, tl: {}, quiz: {}, xong: [], tc: {}, rub: {}, pc: [], w: {}, buoc: 0 };
  try { var cu = JSON.parse(localStorage.getItem(KHOA) || "null"); if (cu) for (var k in cu) S[k] = cu[k]; } catch (e) {}
  function luu() { try { localStorage.setItem(KHOA, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function $(s, g) { return (g || document).querySelector(s); }
  function $$(s, g) { return Array.prototype.slice.call((g || document).querySelectorAll(s)); }
  var hen;
  function bao(t) { var b = $(".thong-bao"); b.textContent = t; b.classList.add("hien"); clearTimeout(hen); hen = setTimeout(function () { b.classList.remove("hien"); }, 2600); }

  var TEN_BUOC = ["Xác định vấn đề", "Nghiên cứu kiến thức nền", "Đề xuất và chọn giải pháp", "Chế tạo và thử nghiệm", "Chia sẻ và điều chỉnh"];
  var MUC_TIEU = [
    "Hiểu tình huống, nêu được vấn đề cần giải quyết và tiêu chí của sản phẩm.",
    "Tìm hiểu kiến thức Khoa học – Công nghệ – Kĩ thuật – Toán liên quan.",
    "Nhóm đưa ra ý tưởng, chọn phương án tốt nhất và phân công công việc.",
    "Làm sản phẩm trên máy, chạy thử, tìm lỗi và sửa cho đạt tiêu chí.",
    "Trình bày sản phẩm, tự đánh giá theo tiêu chí, đề xuất cải tiến."
  ];
  var MON = { S: ["Khoa học", "var(--S)"], T: ["Công nghệ", "var(--T)"], E: ["Kĩ thuật", "var(--E)"], M: ["Toán học", "var(--M)"] };

  function hoi(k, nhan, goiY, mot) {
    return '<div class="hoi"><label for="h-' + k + '">' + nhan + "</label>" +
      (mot ? '<input type="text" id="h-' + k + '" data-tl="' + k + '">' : '<textarea id="h-' + k + '" data-tl="' + k + '"></textarea>') +
      (goiY ? '<div class="goi-y">' + goiY + "</div>" : "") + "</div>";
  }
  function tieuChiHtml(o) {
    var tn = D.tieuChiNhom, them = "";
    if (tn && o === 1) them = '<li class="tc-nhom"><span class="o" aria-hidden="true">★</span><span style="flex:1"><label for="h-tc-nhom"><b>Tiêu chí riêng của nhóm em</b> (tự đặt, tự kiểm tra ở Bước 4)</label>' +
      '<input type="text" id="h-tc-nhom" data-tl="tc-nhom" placeholder="' + esc(tn.viDu || "") + '">' + (tn.goiY ? '<span class="goi-y">' + tn.goiY + "</span>" : "") + "</span></li>";
    if (tn && o === 4) them = '<li class="tc-nhom" data-tcn><label class="tcn-chk"><input type="checkbox" data-tcn-chk aria-label="Nhóm kiểm tra: đạt tiêu chí riêng"></label><span><b>Tiêu chí riêng của nhóm:</b> <span class="tcn-text"></span> <span class="goi-y">(nhóm tự kiểm tra rồi đánh dấu)</span></span></li>';
    return '<ul class="tieu-chi">' + D.tieuChi.map(function (t) {
      return '<li data-tc="' + t.k + '"><span class="o" aria-hidden="true"></span><span>' + t.t + "</span></li>";
    }).join("") + them + "</ul>";
  }
  var MUC_SS = ["–", "✗ Kém", "◐ Được", "✓ Tốt"];
  function chanBuoc(i) {
    return '<div class="chan-buoc"><label class="xong-buoc"><input type="checkbox" data-xong="' + i + '"> Nhóm em đã xong bước ' + (i + 1) + "</label><span>" +
      (i > 0 ? '<button class="btn" data-di="' + (i - 1) + '">← Bước ' + i + "</button> " : "") +
      (i < 4 ? '<button class="btn chinh" data-di="' + (i + 1) + '">Bước ' + (i + 2) + " →</button>" : '<button class="btn chinh" data-in>🖨 In báo cáo dự án</button>') +
      "</span></div>";
  }

  /* ---------- dựng trang ---------- */
  document.title = D.ten + " – Dự án STEM";
  var b1 = D.buoc1, b2 = D.buoc2, b3 = D.buoc3, b5 = D.buoc5;
  var h = [];
  h.push('<header class="dau" style="--mau1:' + (D.mau1 || "#1e3a8a") + ";--mau2:" + (D.mau2 || "#2563eb") + '"><div class="wrap">');
  h.push('<a class="ve" href="../">← Mục lục bài dạy STEM</a>');
  h.push('<div class="nhan"><span>Tin học ' + D.lop + "</span><span>Bài " + esc(D.bai) + ". " + esc(D.tenBai) + "</span><span>" + esc(D.tiet) + '</span><span class="stem-chu" aria-label="STEM"><b>S</b><b>T</b><b>E</b><b>M</b></span></div>');
  h.push("<h1>" + D.bieuTuong + " " + esc(D.ten) + "</h1><p>" + D.moTa + "</p></div></header>");
  h.push('<div class="wrap"><div class="nhom" role="group" aria-label="Thông tin nhóm">' +
    '<div><label for="n-ten">Tên nhóm</label><input id="n-ten" data-nhom="ten" placeholder="VD: Nhóm 3"></div>' +
    '<div><label for="n-lop">Lớp</label><input id="n-lop" data-nhom="lop" placeholder="' + D.lop + 'A1"></div>' +
    '<div><label for="n-tv">Thành viên</label><input id="n-tv" data-nhom="tv" placeholder="An, Minh, Khoa, Lan"></div></div><div id="lop-nhom"></div></div>');
  h.push('<div class="wrap"><p class="chu-giai-loai" aria-label="Chú giải màu"><span class="cg doc">Đọc, tìm hiểu</span><span class="cg lam">Nhóm làm, viết</span><span class="cg kt">Kiểm tra, đánh giá</span></p></div>');
  h.push('<nav class="buoc-nav" aria-label="Các bước dự án"><div class="wrap"><ol>' + TEN_BUOC.map(function (t, i) {
    return '<li><button data-di="' + i + '" aria-label="Bước ' + (i + 1) + ": " + t + '"><span class="so">' + (i + 1) + '</span><span class="ten">' + t + "</span></button></li>";
  }).join("") + '</ol><div class="tien-do" aria-hidden="true"><i></i></div></div></nav>');
  h.push('<main class="wrap" style="--mau1:' + (D.mau1 || "#1e3a8a") + ";--mau2:" + (D.mau2 || "#2563eb") + '">');

  function dau(i) { return '<div class="buoc-dau"><span class="so-buoc" aria-hidden="true">' + (i + 1) + '</span><div><h2>Bước ' + (i + 1) + ". " + TEN_BUOC[i] + '</h2><span class="muc-tieu">' + MUC_TIEU[i] + "</span></div></div>"; }

  // Bước 1
  h.push('<section class="buoc" data-buoc="0">' + dau(0));
  h.push('<div class="the tinh-huong" data-loai="doc"><span class="nhan-the">Tình huống</span>' + b1.tinhHuong + "</div>");
  h.push('<div class="the nhiem-vu" data-loai="doc"><span class="nhan-the">Nhiệm vụ của nhóm</span>' + b1.nhiemVu + "</div>");
  h.push('<div class="the" data-loai="kt"><h3>Tiêu chí sản phẩm</h3><p class="goi-y" style="margin:0">Ô vuông tự đánh dấu ✓ khi sản phẩm ở Bước 4 đạt tiêu chí.</p>' + tieuChiHtml(1) + "</div>");
  h.push('<div class="the" data-loai="lam"><h3>Nhóm em trả lời</h3>' + b1.hoi.map(function (q, j) { return hoi("b1-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push(chanBuoc(0) + "</section>");

  // Bước 2
  h.push('<section class="buoc" data-buoc="1">' + dau(1) + '<p class="nhan-loai doc">Kiến thức nền: đọc 4 thẻ S – T – E – M</p><div class="luoi-stem">');
  b2.kienThuc.forEach(function (m) {
    h.push('<div class="mon" style="--m:' + MON[m.mon][1] + '"><h4><span class="chu-to">' + m.mon + "</span>" + MON[m.mon][0] + (m.ten ? ": " + m.ten : "") + "</h4>" + m.nd + "</div>");
  });
  h.push('</div><div class="the" data-loai="kt"><h3>Kiểm tra nhanh</h3>');
  b2.quiz.forEach(function (c, i) {
    h.push('<div class="cau" data-cau="' + i + '"><div class="q">Câu ' + (i + 1) + ". " + c.q + '</div><div class="lc">' +
      c.o.map(function (o, j) { return '<button data-chon="' + j + '">' + String.fromCharCode(65 + j) + ". " + o + "</button>"; }).join("") +
      '</div><div class="gt" hidden></div></div>');
  });
  h.push('<p class="goi-y" id="diem-quiz"></p></div>' + chanBuoc(1) + "</section>");

  // Bước 3
  h.push('<section class="buoc" data-buoc="2">' + dau(2));
  var ss = b3.soSanh, nPa = ss ? ss.phuongAn.length + 1 : 0;
  if (ss) {
    h.push('<div class="the" data-loai="lam"><h3>' + ss.tieuDe + '</h3><p class="goi-y" style="margin-top:0">' + (ss.goiY || "Không có đáp án đúng duy nhất. Nhóm bấm vào từng ô để chấm mỗi phương án theo từng tiêu chí (bấm nhiều lần để đổi mức), có thể tự thêm phương án ở dòng cuối, rồi chọn phương án tốt nhất và giải thích.") + "</p>" +
      '<div class="rubric-wrap"><table class="so-sanh"><thead><tr><th>Phương án</th>' + ss.tieuChi.map(function (t) { return "<th>" + t + "</th>"; }).join("") + '<th>Tổng</th><th>Chọn</th></tr></thead><tbody>' +
      ss.phuongAn.concat([null]).map(function (p, i) {
        var ten = p ? "<b>" + p[0] + "</b><br><span class='goi-y'>" + p[1] + "</span>" :
          '<input type="text" data-tl="b3-pa-rieng" aria-label="Phương án do nhóm tự đề xuất" placeholder="Phương án của nhóm em (nếu có)…">';
        return "<tr><th>" + ten + "</th>" + ss.tieuChi.map(function (t, j) {
          return '<td><button class="ss-o" data-ss="' + i + "," + j + '" aria-label="Mức của phương án ' + (i + 1) + " theo tiêu chí " + (j + 1) + '">–</button></td>';
        }).join("") + '<td class="ss-tong" data-ss-tong="' + i + '">–</td><td><input type="radio" name="ss-chon" data-ss-chon="' + i + '" aria-label="Chọn phương án ' + (i + 1) + '"></td></tr>';
      }).join("") + "</tbody></table></div>" + hoi("b3-lydo", "Vì sao nhóm em chọn phương án này? Nó còn điểm yếu nào và nhóm khắc phục thế nào?", "") + "</div>");
  } else if (b3.phuongAn) {
    h.push('<div class="the" data-loai="lam"><h3>' + b3.phuongAn.tieuDe + '</h3><div class="cau" data-pa><div class="lc">' +
      b3.phuongAn.o.map(function (o, j) { return '<button data-pa="' + j + '"><b>' + o[0] + "</b><br><span class='goi-y'>" + o[1] + "</span></button>"; }).join("") +
      '</div><div class="gt" hidden></div></div></div>');
  }
  h.push('<div class="the" data-loai="lam"><h3>Ý tưởng của nhóm</h3>' + b3.hoi.map(function (q, j) { return hoi("b3-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push('<div class="the" data-loai="lam"><h3>Phân công công việc</h3><table class="phan-cong"><thead><tr><th style="width:30%">Thành viên</th><th>Nhiệm vụ</th></tr></thead><tbody>' +
    b3.viec.map(function (v, j) { return '<tr><td><input data-pc="' + j + '" placeholder="Tên bạn phụ trách" aria-label="Người phụ trách: ' + esc(v) + '"></td><td>' + v + "</td></tr>"; }).join("") +
    "</tbody></table></div>");
  h.push(chanBuoc(2) + "</section>");

  // Bước 4
  h.push('<section class="buoc" data-buoc="3">' + dau(3));
  h.push('<div class="the" data-loai="kt"><h3>Tiêu chí cần đạt</h3>' + tieuChiHtml(4) + "</div>");
  h.push('<div id="xuong"></div><p class="cham-nhanh"><button class="btn" data-cham-di>🤖 Nhờ hệ thống chấm và góp ý sản phẩm</button></p>' + chanBuoc(3) + "</section>");

  // Bước 5
  h.push('<section class="buoc" data-buoc="4">' + dau(4));
  h.push('<div class="the he-cham" data-loai="kt" id="he-cham"><h3>🤖 Hệ thống chấm sản phẩm</h3><p class="goi-y" style="margin-top:0">Hệ thống xem sản phẩm ở Bước 4 và câu trả lời của nhóm, chấm theo bảng tiêu chí bên dưới và <b>đề xuất chỉnh sửa</b>. Sửa xong, bấm chấm lại để xem điểm thay đổi.</p><button class="btn chinh" data-cham>🤖 Chấm sản phẩm của nhóm</button><div id="kq-cham" aria-live="polite"></div></div>');
  h.push('<div class="the" data-loai="kt"><h3>Tự đánh giá sản phẩm</h3><p class="goi-y" style="margin-top:0">Bấm vào ô mức độ phù hợp với nhóm em (giáo viên và nhóm bạn có thể cùng chấm).</p><div class="rubric-wrap"><table class="rubric"><thead><tr><th>Tiêu chí</th><th>Mức 1 (1 điểm)</th><th>Mức 2 (2 điểm)</th><th>Mức 3 (3 điểm)</th></tr></thead><tbody>' +
    D.rubric.map(function (r, i) { return "<tr><th>" + r[0] + "</th>" + [1, 2, 3].map(function (m) { return '<td class="muc" data-rub="' + i + '" data-muc="' + m + '" tabindex="0">' + r[m] + "</td>"; }).join("") + "</tr>"; }).join("") +
    '</tbody></table></div><p style="display:flex;align-items:center;gap:12px;margin:12px 0 0"><span class="diem-to" id="diem-rub">–</span><span class="goi-y" id="diem-rub-t">Tổng điểm quy về thang 10</span></p></div>');
  h.push('<div class="the" data-loai="lam"><h3>Chia sẻ và điều chỉnh</h3>' + b5.hoi.map(function (q, j) { return hoi("b5-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push('<div id="truc-tuyen"></div>');
  h.push('<div class="the" data-loai="nop"><h3>Báo cáo dự án</h3><p style="margin-top:0">Bấm <b>In báo cáo</b> để in hoặc lưu thành PDF (chọn “Lưu dưới dạng PDF” trong hộp in) và nộp cho giáo viên. Báo cáo gồm thông tin nhóm, câu trả lời ở mọi bước, sản phẩm và điểm tự đánh giá.</p><button class="btn chinh" data-in>🖨 In báo cáo dự án</button> <button class="btn" id="xoa-het">Làm lại từ đầu</button></div>');
  h.push(chanBuoc(4) + "</section>");

  // Giáo viên
  var g = D.gv;
  h.push('<details class="gv"><summary>📋 Dành cho giáo viên: kế hoạch 2 tiết, chuẩn bị, đánh giá</summary><div class="noi">' +
    '<p class="khbd-mo" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:0"><button class="btn chinh" data-khbd>📄 Kế hoạch bài dạy đầy đủ (mẫu 5512) · tải Word</button><span class="goi-y">Điền tên trường, tổ, giáo viên rồi tải tệp .docx để nộp Ban giám hiệu.</span></p>' +
    "<p><b>Vị trí trong PPCT:</b> " + esc(D.tiet) + ". <b>Yêu cầu cần đạt (Tin học):</b> " + g.yccd + "</p>" +
    "<p><b>Chuẩn bị:</b> " + g.chuanBi + "</p>" +
    ["Tiết 1", "Tiết 2"].map(function (t, i) {
      return "<h4 style='margin:14px 0 6px'>" + t + "</h4><table><thead><tr><th style='width:90px'>Thời gian</th><th>Hoạt động</th></tr></thead><tbody>" +
        g.tiet[i].map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; }).join("") + "</tbody></table>";
    }).join("") +
    (g.luuY ? "<p style='margin-top:12px'><b>Lưu ý:</b> " + g.luuY + "</p>" : "") +
    "<p><b>Liên kết với bài học:</b> <a href='../../" + D.thuMucBai + "/' target='_blank' rel='noopener'>trang học sinh</a> · <a href='../../" + D.thuMucBai + "/giaovien.html' target='_blank' rel='noopener'>trang giáo viên</a> của Bài " + esc(D.bai) + ".</p>" +
    "</div></details>");
  h.push('<p class="chan-trang">Dự án STEM – Tin học ' + D.lop + " · Trường THCS Nhơn Mỹ · Bài làm được lưu trên trình duyệt của máy này.</p></main>");
  h.push('<div class="thong-bao" role="status" aria-live="polite"></div><div id="bao-cao"></div>');
  document.body.innerHTML = h.join("");

  /* ---------- trạng thái & sự kiện ---------- */
  $$("[data-nhom]").forEach(function (el) {
    el.value = S.nhom[el.dataset.nhom] || "";
    el.addEventListener("input", function () { S.nhom[el.dataset.nhom] = el.value; luu(); });
  });
  $$("[data-tl]").forEach(function (el) {
    el.value = S.tl[el.dataset.tl] || "";
    el.addEventListener("input", function () { S.tl[el.dataset.tl] = el.value; luu(); });
  });
  $$("[data-pc]").forEach(function (el) {
    el.value = S.pc[el.dataset.pc] || "";
    el.addEventListener("input", function () { S.pc[el.dataset.pc] = el.value; luu(); });
  });
  $$("[data-xong]").forEach(function (el) {
    el.checked = !!S.xong[el.dataset.xong];
    el.addEventListener("change", function () { S.xong[el.dataset.xong] = el.checked; luu(); veNav(); if (el.checked) bao("Tuyệt! Đã xong bước " + (+el.dataset.xong + 1) + "."); });
  });

  function veNav() {
    $$(".buoc-nav button").forEach(function (b, i) { b.classList.toggle("dang", i === S.buoc); b.classList.toggle("xong", !!S.xong[i]); });
    var n = S.xong.filter(Boolean).length;
    $(".tien-do i").style.width = (n * 20) + "%";
  }
  function di(i) {
    S.buoc = i; luu();
    $$(".buoc").forEach(function (s, j) { s.classList.toggle("dang", j === i); });
    veNav();
    var nav = $(".buoc-nav"); if (window.scrollY > nav.offsetTop) window.scrollTo({ top: nav.offsetTop, behavior: "smooth" });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-di]"); if (t) { di(+t.dataset.di); return; }
    if (e.target.closest("[data-in]")) inBaoCao();
    if (e.target.closest("[data-cham]")) cham(true);
    if (e.target.closest("[data-cham-di]")) { di(4); cham(true); setTimeout(function () { var hc = $("#he-cham"); if (hc) hc.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); }
  });

  // câu hỏi nhanh
  function veQuiz() {
    var dung = 0, lam = 0;
    b2.quiz.forEach(function (c, i) {
      var box = $('[data-cau="' + i + '"]'), ch = S.quiz[i];
      $$("[data-chon]", box).forEach(function (b, j) {
        b.classList.toggle("dung", ch != null && j === c.d);
        b.classList.toggle("sai", ch === j && j !== c.d);
      });
      var gt = $(".gt", box);
      if (ch != null) { lam++; if (ch === c.d) dung++; gt.hidden = false; gt.innerHTML = (ch === c.d ? "✅ Chính xác! " : "💡 Chưa đúng. ") + c.g; }
      else gt.hidden = true;
    });
    $("#diem-quiz").textContent = lam ? "Đúng " + dung + "/" + b2.quiz.length + " câu." + (lam === b2.quiz.length && dung < lam ? " Đọc lại thẻ kiến thức rồi bấm lại đáp án khác." : "") : "";
  }
  $$("[data-cau]").forEach(function (box) {
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-chon]"); if (!b) return;
      S.quiz[box.dataset.cau] = +b.dataset.chon; luu(); veQuiz();
    });
  });
  veQuiz();

  // chọn phương án
  if (ss) {
    S.ss = S.ss || {};
    var veSs = function () {
      for (var i = 0; i < nPa; i++) {
        var t = 0, co = 0;
        for (var j = 0; j < ss.tieuChi.length; j++) { var v = S.ss[i + "," + j] || 0; if (v) { t += v - 1; co++; } }
        $('[data-ss-tong="' + i + '"]').textContent = co ? t + "/" + ss.tieuChi.length * 2 : "–";
        $('[data-ss-chon="' + i + '"]').checked = S.pa === i;
        $('[data-ss-chon="' + i + '"]').closest("tr").classList.toggle("chon", S.pa === i);
      }
      $$("[data-ss]").forEach(function (b) { var v = S.ss[b.dataset.ss] || 0; b.textContent = MUC_SS[v]; b.className = "ss-o m" + v; });
    };
    $$("[data-ss]").forEach(function (b) { b.addEventListener("click", function () { S.ss[b.dataset.ss] = ((S.ss[b.dataset.ss] || 0) + 1) % 4; luu(); veSs(); }); });
    $$("[data-ss-chon]").forEach(function (r) { r.addEventListener("change", function () { S.pa = +r.dataset.ssChon; luu(); veSs(); }); });
    veSs();
  } else if (b3.phuongAn) {
    var pa = $("[data-pa]");
    var vePa = function () {
      $$("[data-pa]", pa).forEach(function (b) {
        if (!b.dataset.pa) return;
        var j = +b.dataset.pa;
        b.classList.toggle("dung", S.pa === j && j === b3.phuongAn.d);
        b.classList.toggle("sai", S.pa === j && j !== b3.phuongAn.d);
      });
      var gt = $(".gt", pa);
      if (S.pa != null) { gt.hidden = false; gt.innerHTML = b3.phuongAn.g[S.pa]; } else gt.hidden = true;
    };
    pa.addEventListener("click", function (e) { var b = e.target.closest("button[data-pa]"); if (!b) return; S.pa = +b.dataset.pa; luu(); vePa(); });
    vePa();
  }

  // tiêu chí
  function veTc() { $$("[data-tc]").forEach(function (li) { li.classList.toggle("dat", !!S.tc[li.dataset.tc]); }); }
  veTc();
  if (D.tieuChiNhom) {
    var tcn = $("[data-tcn]"), tcnChk = $("[data-tcn-chk]");
    var veTcn = function () {
      var t = (S.tl["tc-nhom"] || "").trim();
      $(".tcn-text", tcn).textContent = t || "(nhóm chưa đặt – quay lại Bước 1 để viết)";
      tcnChk.disabled = !t; tcnChk.checked = !!(t && S.tcNhom);
      tcn.classList.toggle("dat", !!(t && S.tcNhom));
    };
    $("#h-tc-nhom").addEventListener("input", veTcn);
    tcnChk.addEventListener("change", function () { S.tcNhom = tcnChk.checked; luu(); veTcn(); if (tcnChk.checked) bao("✓ Nhóm xác nhận đạt tiêu chí riêng."); });
    veTcn();
  }

  // rubric
  function veRub() {
    var tong = 0, du = 0;
    $$("[data-rub]").forEach(function (td) { td.classList.toggle("chon", S.rub[td.dataset.rub] === +td.dataset.muc); });
    D.rubric.forEach(function (r, i) { if (S.rub[i]) { tong += S.rub[i]; du++; } });
    var max = D.rubric.length * 3;
    $("#diem-rub").textContent = du ? (Math.round(tong / max * 100) / 10).toString().replace(".", ",") : "–";
    $("#diem-rub-t").textContent = du ? "Tổng " + tong + "/" + max + " điểm → quy về thang 10" + (du < D.rubric.length ? " (còn " + (D.rubric.length - du) + " tiêu chí chưa chấm)" : "") : "Chưa chấm tiêu chí nào";
  }
  $$("[data-rub]").forEach(function (td) {
    var chon = function () { S.rub[td.dataset.rub] = +td.dataset.muc; luu(); veRub(); };
    td.addEventListener("click", chon);
    td.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); chon(); } });
  });
  veRub();

  $("#xoa-het").addEventListener("click", function () {
    if (!confirm("Xoá toàn bộ bài làm của nhóm trên máy này và làm lại từ đầu?")) return;
    try { localStorage.removeItem(KHOA); } catch (e) {}
    location.reload();
  });

  // xưởng
  var api = {
    w: S.w, luu: luu, bao: bao,
    dat: function (k, b) { if (!!S.tc[k] === !!b) return; S.tc[k] = !!b; luu(); veTc(); if (b) bao("✓ Đạt tiêu chí: " + D.tieuChi.filter(function (t) { return t.k === k; })[0].t.replace(/<[^>]+>/g, "")); },
    datHet: function () { return D.tieuChi.every(function (t) { return S.tc[t.k]; }); }
  };
  var X = D.xuong($("#xuong"), api) || {};

  /* ---------- HỆ THỐNG CHẤM: chấm theo bảng tiêu chí + đề xuất chỉnh sửa ----------
     Trang dự án cho xưởng trả về cham(c) → { rub: [{m: 1|2|3|null, ly: "lí do"}] (khớp D.rubric), cach: {k: "cách sửa tiêu chí k"} }
     và có thể gọi c.goi(buoc, "đề xuất", khoá) để thêm đề xuất riêng. m = null: hệ thống không chấm được (GV chấm). */
  function chuTron(s) { return String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
  function soTieng(k) { var t = (S.tl[k] || "").trim(); return t ? t.split(/\s+/).length : 0; }
  function cham(hien, im) {
    var DS = [], daCo = {};
    var C = {
      S: S, D: D,
      tc: function (k) { return !!S.tc[k]; },
      tl: function (k) { return (S.tl[k] || "").trim(); },
      tieng: soTieng,
      goi: function (b, t, k) { if (k && daCo[k]) return; if (k) daCo[k] = 1; DS.push({ b: b, t: t }); },
      hopTac: function () {
        var n = b3.viec.length, pc = b3.viec.filter(function (v, j) { return (S.pc[j] || "").trim(); }).length;
        var ten = {}; b3.viec.forEach(function (v, j) { var x = (S.pc[j] || "").trim().toLowerCase(); if (x) ten[x] = 1; });
        var nt = Object.keys(ten).length, tl5 = b5.hoi.filter(function (q, j) { return soTieng("b5-" + j) >= 5; }).length;
        if (pc < n) C.goi(2, "Bảng phân công còn " + (n - pc) + " việc chưa có người phụ trách: ghi tên bạn phụ trách cho từng việc.", "pc");
        else if (nt < 2) C.goi(2, "Bảng phân công mới có một bạn làm tất cả: chia việc cho các thành viên khác.", "pc");
        return { m: pc === n && nt >= 2 && tl5 === b5.hoi.length ? 3 : pc > 0 ? 2 : 1,
          ly: "Phân công " + pc + "/" + n + " việc cho " + nt + " bạn; trả lời " + tl5 + "/" + b5.hoi.length + " câu Bước 5. Phần trình bày do giáo viên, nhóm bạn đánh giá thêm." };
      },
      thietKe: function () {
        var ss_ = b3.soSanh, n = ss_ ? ss_.phuongAn.length * ss_.tieuChi.length : 0, da = 0;
        if (ss_) for (var i = 0; i < ss_.phuongAn.length; i++) for (var j = 0; j < ss_.tieuChi.length; j++) if ((S.ss || {})[i + "," + j]) da++;
        var chon = S.pa != null, lyDo = soTieng("b3-lydo") >= 15, tcn = !D.tieuChiNhom || ((S.tl["tc-nhom"] || "").trim() && S.tcNhom), thu = soTieng("b5-0") >= 10;
        if (ss_ && da < n) C.goi(2, "Bảng so sánh mới chấm " + da + "/" + n + " ô: chấm đủ mọi phương án theo từng tiêu chí.", "ss");
        if (!chon) C.goi(2, "Chưa chọn phương án: đánh dấu ô Chọn ở phương án tốt nhất.", "pa");
        if (soTieng("b3-lydo") < 15) C.goi(2, "Viết rõ hơn lí do chọn phương án, điểm yếu của nó và cách khắc phục (ít nhất 15 tiếng).", "tl:b3-lydo");
        if (!thu) C.goi(4, "Câu 1 Bước 5: thử sản phẩm với người thật (nhóm bạn) và ghi lại kết quả, chỗ họ hiểu nhầm.", "tl:b5-0");
        return { m: chon && da >= n && lyDo && tcn && thu ? 3 : chon && (da > 0 || !ss_) ? 2 : 1,
          ly: (ss_ ? "Chấm " + da + "/" + n + " ô so sánh; " : "") + (chon ? "đã chọn phương án" : "chưa chọn phương án") + (lyDo ? ", có lí do" : ", lí do còn sơ sài") +
            (D.tieuChiNhom ? (tcn ? "; đạt tiêu chí riêng" : "; tiêu chí riêng chưa đặt hoặc chưa đạt") : "") + (thu ? "; đã thử với người thật." : "; chưa ghi kết quả thử với người thật.") };
      }
    };
    var KQ = X.cham ? X.cham(C) : null;
    var rub = KQ && KQ.rub ? KQ.rub : D.rubric.map(function () { return { m: null, ly: "Giáo viên chấm." }; });
    var cach = (KQ && KQ.cach) || {};

    // đề xuất chung
    if (!(KQ && KQ.boQuaTc)) D.tieuChi.forEach(function (t) { if (!S.tc[t.k] && cach[t.k] !== false) C.goi(3, "Chưa đạt: " + chuTron(t.t) + (cach[t.k] ? " <b>Cách sửa:</b> " + cach[t.k] : ""), "tc:" + t.k); });
    if (D.tieuChiNhom) {
      if (!(S.tl["tc-nhom"] || "").trim()) C.goi(0, "Nhóm chưa đặt tiêu chí riêng (cuối bảng Tiêu chí sản phẩm ở Bước 1).", "tcn");
      else if (!S.tcNhom) C.goi(3, "Kiểm tra tiêu chí riêng “" + esc(S.tl["tc-nhom"]) + "”; đạt thì đánh dấu ở bảng Tiêu chí cần đạt.", "tcn");
    }
    if (!ss && b3.phuongAn) {
      if (S.pa == null) C.goi(2, "Chưa chọn cách làm ở Bước 3.", "pa");
      else if (S.pa !== b3.phuongAn.d) C.goi(2, "Xem lại cách làm đã chọn: " + chuTron(b3.phuongAn.g[S.pa]), "pa");
    }
    function cauHoi(buoc, ds, tien) {
      ds.forEach(function (q, j) {
        var k = tien + j, n = soTieng(k);
        if (n < 3) C.goi(buoc, "Trả lời câu hỏi: <i>" + chuTron(q[0]) + "</i>", "tl:" + k);
        else if (n < 8) C.goi(buoc, "Viết đầy đủ hơn câu: <i>" + chuTron(q[0]) + "</i> (hiện " + n + " tiếng).", "tl:" + k);
      });
    }
    cauHoi(2, b3.hoi, "b3-"); cauHoi(4, b5.hoi, "b5-"); cauHoi(0, b1.hoi, "b1-");
    var sai = [], chua = 0;
    b2.quiz.forEach(function (c, i) { if (S.quiz[i] == null) chua++; else if (S.quiz[i] !== c.d) sai.push(i + 1); });
    if (chua) C.goi(1, "Còn " + chua + " câu Kiểm tra nhanh chưa làm.", "quiz");
    else if (sai.length) C.goi(1, "Kiểm tra nhanh còn sai câu " + sai.join(", ") + ": đọc lại thẻ kiến thức rồi chọn lại.", "quiz");

    // xếp: sản phẩm (B4) trước, rồi giải pháp, chia sẻ, vấn đề, kiến thức
    var THU_TU = [3, 4, 1, 0, 2]; // hạng của Bước 1..5: Bước 4 (sản phẩm) trước, rồi Bước 3, 5, 1, 2
    DS.sort(function (a, b) { return THU_TU[a.b] - THU_TU[b.b]; });
    // so với tự đánh giá
    var lech = [];
    rub.forEach(function (r, i) { if (r.m && S.rub[i] && S.rub[i] > r.m) lech.push("<b>" + D.rubric[i][0] + "</b>: nhóm tự chấm mức " + S.rub[i] + ", hệ thống thấy mức " + r.m); });

    var co = rub.filter(function (r) { return r.m; }), tong = 0;
    co.forEach(function (r) { tong += r.m; });
    var d10 = co.length ? Math.round(tong / (3 * co.length) * 100) / 10 : null;
    var moi = { d: d10, m: rub.map(function (r) { return r.m || 0; }), n: DS.length, luc: Date.now() }, cu_ = S.cham;
    if (cu_ && cu_.d === moi.d && cu_.n === moi.n && cu_.m.join() === moi.m.join()) moi.luc = cu_.luc;   // không đổi thì giữ giờ chấm cũ
    else { S.cham = moi; luu(); }
    var traVe = { d: moi.d, m: moi.m, n: moi.n, luc: moi.luc, ly: rub.map(function (r) { return chuTron(r.ly); }), ds: DS.map(function (x) { return { b: x.b + 1, t: chuTron(x.t).slice(0, 220) }; }) };
    if (!hien && !$("#kq-cham").innerHTML) return traVe;

    function dsDx(ds) { return '<ol class="de-xuat">' + ds.map(function (x) { return '<li><span class="bb">Bước ' + (x.b + 1) + '</span><span class="nd">' + x.t + '</span><button class="btn nho" data-di="' + x.b + '">Sửa →</button></li>'; }).join("") + "</ol>"; }
    var MAU_M = ["", "m1", "m2", "m3"], g = new Date(S.cham.luc);
    S.cham = moi;
    $("[data-cham]").textContent = "🔄 Chấm lại";
    $("#kq-cham").innerHTML =
      '<div class="cham-dau"><span class="diem-to">' + (d10 == null ? "–" : String(d10).replace(".", ",")) + '</span><div><b>Điểm hệ thống chấm (thang 10)</b><br><span class="goi-y">Chấm lúc ' + ("0" + g.getHours()).slice(-2) + ":" + ("0" + g.getMinutes()).slice(-2) +
      " · " + co.length + "/" + rub.length + " tiêu chí" + (co.length < rub.length ? " (tiêu chí còn lại do giáo viên chấm)" : "") + "</span></div></div>" +
      '<div class="rubric-wrap"><table class="rubric cham-bang"><thead><tr><th>Tiêu chí</th><th>Mức</th><th>Vì sao</th></tr></thead><tbody>' +
      rub.map(function (r, i) {
        return "<tr><th>" + D.rubric[i][0] + '</th><td class="muc ' + (MAU_M[r.m] || "") + '">' + (r.m ? "Mức " + r.m : "GV chấm") + "</td><td>" + r.ly +
          (r.m ? '<br><span class="goi-y">' + D.rubric[i][r.m] + "</span>" : "") + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      (DS.length ? "<h4>✏️ Đề xuất chỉnh sửa (" + DS.length + ")" + (DS.length > 6 ? " – sửa từ trên xuống" : "") + "</h4>" + dsDx(DS.slice(0, 6)) +
        (DS.length > 6 ? '<details class="dx-them"><summary>Xem thêm ' + (DS.length - 6) + " đề xuất</summary>" + dsDx(DS.slice(6)) + "</details>" : "") : '<p class="cham-tot">🎉 Hệ thống không còn đề xuất chỉnh sửa nào. Nhóm hãy thuyết trình và nhờ nhóm bạn góp ý.</p>') +
      (lech.length ? '<p class="cham-lech">⚖️ Nhóm tự chấm cao hơn hệ thống ở: ' + lech.join("; ") + ". Xem lại bảng tự đánh giá bên dưới.</p>" : "") +
      '<p class="goi-y" style="margin-bottom:0">Hệ thống chỉ chấm những gì đo được trên trang. Phần thuyết trình, ý tưởng sáng tạo do giáo viên và nhóm bạn đánh giá.</p>';
    if (hien && !im) bao(DS.length ? "Hệ thống có " + DS.length + " đề xuất chỉnh sửa." : "Sản phẩm đạt mọi yêu cầu hệ thống kiểm tra được!");
    return traVe;
  }
  if (S.cham) cham(true, true);
  /* cho phần trực tuyến (truc-tuyen.js): nộp sản phẩm, đánh giá chéo */
  window.STEM = { D: D, S: S, KHOA: KHOA, luu: luu, bao: bao, esc: esc, baoCao: function () { return X.baoCao ? X.baoCao() : ""; }, cham: function () { return cham(false); } };

  // báo cáo
  function inBaoCao() {
    var r = [];
    r.push("<h1>Báo cáo dự án STEM: " + esc(D.ten) + "</h1>");
    r.push("<p>Tin học " + D.lop + " · Bài " + esc(D.bai) + ". " + esc(D.tenBai) + " · " + esc(D.tiet) + "</p>");
    r.push("<p><b>Nhóm:</b> " + esc(S.nhom.ten || "…") + " · <b>Lớp:</b> " + esc(S.nhom.lop || "…") + " · <b>Thành viên:</b> " + esc(S.nhom.tv || "…") + "</p>");
    var tl = function (k, q) { return '<div class="giu"><p><b>' + q + "</b><br>" + (esc(S.tl[k] || "").replace(/\n/g, "<br>") || "<i>(chưa trả lời)</i>") + "</p></div>"; };
    r.push("<h2>1. Xác định vấn đề</h2>" + b1.hoi.map(function (q, j) { return tl("b1-" + j, q[0]); }).join(""));
    var dq = b2.quiz.filter(function (c, i) { return S.quiz[i] === c.d; }).length;
    r.push("<h2>2. Kiến thức nền</h2><p>Kiểm tra nhanh: đúng " + dq + "/" + b2.quiz.length + " câu.</p>");
    var tenPa = function (i) { return i < ss.phuongAn.length ? ss.phuongAn[i][0] : esc(S.tl["b3-pa-rieng"] || "Phương án của nhóm"); };
    r.push("<h2>3. Giải pháp</h2>" + (ss ? "<table><tr><th>Phương án</th>" + ss.tieuChi.map(function (t) { return "<th>" + t + "</th>"; }).join("") + "</tr>" +
        Array.apply(null, Array(nPa)).map(function (x, i) {
          if (i === nPa - 1 && !(S.tl["b3-pa-rieng"] || "").trim()) return "";
          return "<tr><td>" + (S.pa === i ? "<b>➜ " + tenPa(i) + "</b>" : tenPa(i)) + "</td>" + ss.tieuChi.map(function (t, j) { return "<td>" + MUC_SS[(S.ss || {})[i + "," + j] || 0] + "</td>"; }).join("") + "</tr>";
        }).join("") + "</table>" + (S.pa != null ? "<p><b>Phương án chọn:</b> " + tenPa(S.pa) + "</p>" : "") + tl("b3-lydo", "Lí do chọn, điểm yếu và cách khắc phục") :
      (b3.phuongAn && S.pa != null ? "<p><b>Phương án chọn:</b> " + b3.phuongAn.o[S.pa][0] + "</p>" : "")) +
      b3.hoi.map(function (q, j) { return tl("b3-" + j, q[0]); }).join("") +
      "<table><tr><th>Thành viên</th><th>Nhiệm vụ</th></tr>" + b3.viec.map(function (v, j) { return "<tr><td>" + esc(S.pc[j] || "") + "</td><td>" + v + "</td></tr>"; }).join("") + "</table>");
    r.push('<h2>4. Sản phẩm</h2><div class="giu">' + (X.baoCao ? X.baoCao() : "") + "</div>");
    r.push("<p><b>Tiêu chí đạt:</b></p><ul>" + D.tieuChi.map(function (t) { return "<li>" + (S.tc[t.k] ? "☑ " : "☐ ") + t.t + "</li>"; }).join("") +
      (D.tieuChiNhom ? "<li>" + (S.tcNhom && (S.tl["tc-nhom"] || "").trim() ? "☑ " : "☐ ") + "<b>Tiêu chí riêng của nhóm:</b> " + (esc(S.tl["tc-nhom"] || "") || "<i>(chưa đặt)</i>") + "</li>" : "") + "</ul>");
    var tong = 0; D.rubric.forEach(function (x, i) { tong += S.rub[i] || 0; });
    r.push("<h2>5. Đánh giá và điều chỉnh</h2><table><tr><th>Tiêu chí</th><th>Mức tự đánh giá</th></tr>" +
      D.rubric.map(function (x, i) { return "<tr><td>" + x[0] + "</td><td>" + (S.rub[i] ? "Mức " + S.rub[i] + ": " + x[S.rub[i]] : "") + "</td></tr>"; }).join("") +
      "</table><p><b>Tổng:</b> " + tong + "/" + D.rubric.length * 3 + " điểm (" + (Math.round(tong / (D.rubric.length * 3) * 100) / 10).toString().replace(".", ",") + "/10)</p>" +
      (function () { var k = cham(false); return k && k.d != null ? "<p><b>Hệ thống chấm:</b> " + String(k.d).replace(".", ",") + "/10 (mức " + k.m.map(function (x) { return x || "GV"; }).join(" – ") + "); còn " + k.n + " đề xuất chỉnh sửa.</p>" : ""; })() +
      b5.hoi.map(function (q, j) { return tl("b5-" + j, q[0]); }).join(""));
    $("#bao-cao").innerHTML = r.join("");
    setTimeout(function () { window.print(); }, 50);
  }

  di(Math.min(4, Math.max(0, S.buoc || 0)));
})();
