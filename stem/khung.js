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
  function tieuChiHtml() {
    return '<ul class="tieu-chi">' + D.tieuChi.map(function (t) {
      return '<li data-tc="' + t.k + '"><span class="o" aria-hidden="true"></span><span>' + t.t + "</span></li>";
    }).join("") + "</ul>";
  }
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
    '<div><label for="n-tv">Thành viên</label><input id="n-tv" data-nhom="tv" placeholder="An, Minh, Khoa, Lan"></div></div></div>');
  h.push('<nav class="buoc-nav" aria-label="Các bước dự án"><div class="wrap"><ol>' + TEN_BUOC.map(function (t, i) {
    return '<li><button data-di="' + i + '" aria-label="Bước ' + (i + 1) + ": " + t + '"><span class="so">' + (i + 1) + '</span><span class="ten">' + t + "</span></button></li>";
  }).join("") + '</ol><div class="tien-do" aria-hidden="true"><i></i></div></div></nav>');
  h.push('<main class="wrap">');

  function dau(i) { return '<div class="buoc-dau"><h2>Bước ' + (i + 1) + ". " + TEN_BUOC[i] + '</h2><span class="muc-tieu">' + MUC_TIEU[i] + "</span></div>"; }

  // Bước 1
  h.push('<section class="buoc" data-buoc="0">' + dau(0));
  h.push('<div class="the tinh-huong"><span class="nhan-the">Tình huống</span>' + b1.tinhHuong + "</div>");
  h.push('<div class="the nhiem-vu"><span class="nhan-the">Nhiệm vụ của nhóm</span>' + b1.nhiemVu + "</div>");
  h.push('<div class="the"><h3>Tiêu chí sản phẩm</h3><p class="goi-y" style="margin:0">Ô vuông tự đánh dấu ✓ khi sản phẩm ở Bước 4 đạt tiêu chí.</p>' + tieuChiHtml() + "</div>");
  h.push('<div class="the"><h3>Nhóm em trả lời</h3>' + b1.hoi.map(function (q, j) { return hoi("b1-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push(chanBuoc(0) + "</section>");

  // Bước 2
  h.push('<section class="buoc" data-buoc="1">' + dau(1) + '<div class="luoi-stem">');
  b2.kienThuc.forEach(function (m) {
    h.push('<div class="mon" style="--m:' + MON[m.mon][1] + '"><h4><span class="chu-to">' + m.mon + "</span>" + MON[m.mon][0] + (m.ten ? ": " + m.ten : "") + "</h4>" + m.nd + "</div>");
  });
  h.push('</div><div class="the"><h3>Kiểm tra nhanh</h3>');
  b2.quiz.forEach(function (c, i) {
    h.push('<div class="cau" data-cau="' + i + '"><div class="q">Câu ' + (i + 1) + ". " + c.q + '</div><div class="lc">' +
      c.o.map(function (o, j) { return '<button data-chon="' + j + '">' + String.fromCharCode(65 + j) + ". " + o + "</button>"; }).join("") +
      '</div><div class="gt" hidden></div></div>');
  });
  h.push('<p class="goi-y" id="diem-quiz"></p></div>' + chanBuoc(1) + "</section>");

  // Bước 3
  h.push('<section class="buoc" data-buoc="2">' + dau(2));
  if (b3.phuongAn) {
    h.push('<div class="the"><h3>' + b3.phuongAn.tieuDe + '</h3><div class="cau" data-pa><div class="lc">' +
      b3.phuongAn.o.map(function (o, j) { return '<button data-pa="' + j + '"><b>' + o[0] + "</b><br><span class='goi-y'>" + o[1] + "</span></button>"; }).join("") +
      '</div><div class="gt" hidden></div></div></div>');
  }
  h.push('<div class="the"><h3>Ý tưởng của nhóm</h3>' + b3.hoi.map(function (q, j) { return hoi("b3-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push('<div class="the"><h3>Phân công công việc</h3><table class="phan-cong"><thead><tr><th style="width:30%">Thành viên</th><th>Nhiệm vụ</th></tr></thead><tbody>' +
    b3.viec.map(function (v, j) { return '<tr><td><input data-pc="' + j + '" placeholder="Tên bạn phụ trách" aria-label="Người phụ trách: ' + esc(v) + '"></td><td>' + v + "</td></tr>"; }).join("") +
    "</tbody></table></div>");
  h.push(chanBuoc(2) + "</section>");

  // Bước 4
  h.push('<section class="buoc" data-buoc="3">' + dau(3));
  h.push('<div class="the"><h3>Tiêu chí cần đạt</h3>' + tieuChiHtml() + "</div>");
  h.push('<div id="xuong"></div>' + chanBuoc(3) + "</section>");

  // Bước 5
  h.push('<section class="buoc" data-buoc="4">' + dau(4));
  h.push('<div class="the"><h3>Tự đánh giá sản phẩm</h3><p class="goi-y" style="margin-top:0">Bấm vào ô mức độ phù hợp với nhóm em (giáo viên và nhóm bạn có thể cùng chấm).</p><div class="rubric-wrap"><table class="rubric"><thead><tr><th>Tiêu chí</th><th>Mức 1 (1 điểm)</th><th>Mức 2 (2 điểm)</th><th>Mức 3 (3 điểm)</th></tr></thead><tbody>' +
    D.rubric.map(function (r, i) { return "<tr><th>" + r[0] + "</th>" + [1, 2, 3].map(function (m) { return '<td class="muc" data-rub="' + i + '" data-muc="' + m + '" tabindex="0">' + r[m] + "</td>"; }).join("") + "</tr>"; }).join("") +
    '</tbody></table></div><p style="display:flex;align-items:center;gap:12px;margin:12px 0 0"><span class="diem-to" id="diem-rub">–</span><span class="goi-y" id="diem-rub-t">Tổng điểm quy về thang 10</span></p></div>');
  h.push('<div class="the"><h3>Chia sẻ và điều chỉnh</h3>' + b5.hoi.map(function (q, j) { return hoi("b5-" + j, q[0], q[1]); }).join("") + "</div>");
  h.push('<div class="the"><h3>Báo cáo dự án</h3><p style="margin-top:0">Bấm <b>In báo cáo</b> để in hoặc lưu thành PDF (chọn “Lưu dưới dạng PDF” trong hộp in) và nộp cho giáo viên. Báo cáo gồm thông tin nhóm, câu trả lời ở mọi bước, sản phẩm và điểm tự đánh giá.</p><button class="btn chinh" data-in>🖨 In báo cáo dự án</button> <button class="btn" id="xoa-het">Làm lại từ đầu</button></div>');
  h.push(chanBuoc(4) + "</section>");

  // Giáo viên
  var g = D.gv;
  h.push('<details class="gv"><summary>📋 Dành cho giáo viên: kế hoạch 2 tiết, chuẩn bị, đánh giá</summary><div class="noi">' +
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
  if (b3.phuongAn) {
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
    r.push("<h2>3. Giải pháp</h2>" + (b3.phuongAn && S.pa != null ? "<p><b>Phương án chọn:</b> " + b3.phuongAn.o[S.pa][0] + "</p>" : "") +
      b3.hoi.map(function (q, j) { return tl("b3-" + j, q[0]); }).join("") +
      "<table><tr><th>Thành viên</th><th>Nhiệm vụ</th></tr>" + b3.viec.map(function (v, j) { return "<tr><td>" + esc(S.pc[j] || "") + "</td><td>" + v + "</td></tr>"; }).join("") + "</table>");
    r.push('<h2>4. Sản phẩm</h2><div class="giu">' + (X.baoCao ? X.baoCao() : "") + "</div>");
    r.push("<p><b>Tiêu chí đạt:</b></p><ul>" + D.tieuChi.map(function (t) { return "<li>" + (S.tc[t.k] ? "☑ " : "☐ ") + t.t + "</li>"; }).join("") + "</ul>");
    var tong = 0; D.rubric.forEach(function (x, i) { tong += S.rub[i] || 0; });
    r.push("<h2>5. Đánh giá và điều chỉnh</h2><table><tr><th>Tiêu chí</th><th>Mức tự đánh giá</th></tr>" +
      D.rubric.map(function (x, i) { return "<tr><td>" + x[0] + "</td><td>" + (S.rub[i] ? "Mức " + S.rub[i] + ": " + x[S.rub[i]] : "") + "</td></tr>"; }).join("") +
      "</table><p><b>Tổng:</b> " + tong + "/" + D.rubric.length * 3 + " điểm (" + (Math.round(tong / (D.rubric.length * 3) * 100) / 10).toString().replace(".", ",") + "/10)</p>" +
      b5.hoi.map(function (q, j) { return tl("b5-" + j, q[0]); }).join(""));
    $("#bao-cao").innerHTML = r.join("");
    setTimeout(function () { window.print(); }, 50);
  }

  di(Math.min(4, Math.max(0, S.buoc || 0)));
})();
