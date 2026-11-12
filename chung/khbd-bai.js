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
      .filter(function (t) { var x = t.toLowerCase(); return x !== String(s.title).toLowerCase() && !/^(ghi nhớ|ghi bài)$/.test(x); });
  }
  function mucTieu(s) {
    var ten = acts(s).map(function (a) { return a.title.replace(/^(Hoạt động \d+|Đọc hiểu|Thực hành)\s*[:–-]\s*/, ""); });
    if (s.id === "mo-dau") return "Tạo hứng thú, huy động hiểu biết đã có của HS và dẫn dắt vào bài học qua hoạt động: " + ten.join("; ") + ".";
    if (s.id === "luyen-tap") return "HS củng cố, luyện tập kiến thức của bài qua các nhiệm vụ: " + ten.join("; ") + ".";
    if (s.id === "van-dung") return "HS vận dụng kiến thức đã học vào tình huống thực tiễn: " + ten.join("; ") + ".";
    var kn = khaiNiem(s);
    return "HS tìm hiểu và nắm được kiến thức về " + thuong(s.title) + (kn.length ? " (" + kn.join("; ") + ")" : "") + " thông qua các nhiệm vụ: " + ten.join("; ") + ".";
  }

  /* Màu theo loại hoạt động: [đậm (thanh tiêu đề), nhạt (ô bước)] */
  function mauHD(s) {
    if (s.id === "mo-dau") return ["C55A11", "FBE5D6"];
    if (s.id === "luyen-tap") return ["548235", "E2F0D9"];
    if (s.id === "van-dung") return ["7030A0", "E4DFEC"];
    return ["2E75B6", "DEEBF7"];
  }
  function loaiHD(s) { return s.id === "mo-dau" ? "Mở đầu" : s.id === "luyen-tap" ? "Luyện tập" : s.id === "van-dung" ? "Vận dụng" : "Hình thành kiến thức"; }
  function Nhan(text, mau) { return P("<b>" + text + "</b>", { mau: mau || K.MAU.nhan, truoc: 3 }); }

  /* ---------- Hình minh hoạ lấy từ trang học sinh của bài (index.html) ---------- */
  var HINH = {};   // stageId → { task: {taskId: [hình]}, cuoi: [hình] }
  function chuanBi() {
    if (!window.fetch || !window.DOMParser) return Promise.resolve();
    return fetch(baseUrl + "index.html").then(function (r) { return r.ok ? r.text() : ""; }).then(function (html) {
      if (!html) return;
      var doc = new DOMParser().parseFromString(html, "text/html"), viec = [];
      ST.forEach(function (s) {
        var sec = doc.getElementById(s.id); if (!sec) return;
        var h = HINH[s.id] = { task: {}, cuoi: [] }, cho = [];
        Array.prototype.forEach.call(sec.querySelectorAll("figure.fig, [data-task]"), function (el) {
          if (el.tagName === "FIGURE") {
            var img = el.querySelector("img"); if (!img || !img.getAttribute("src")) return;
            var cap = el.querySelector("figcaption");
            var x = K.H(baseUrl + img.getAttribute("src"), +img.getAttribute("width") || 0, +img.getAttribute("height") || 0, cap ? chu(cap.innerHTML) : (img.getAttribute("alt") || ""));
            cho.push(x);
            viec.push(fetch(x.src).then(function (r) { return r.ok ? r.arrayBuffer() : null; }).then(function (b) { x.data = b; }).catch(function () {}));
          } else if (cho.length) { var k = el.getAttribute("data-task"); h.task[k] = (h.task[k] || []).concat(cho); cho = []; }
        });
        h.cuoi = cho;
      });
      return Promise.all(viec);
    }).catch(function () {});
  }

  function dung() {
    var N = K.dauTrang(CFG, L.title, null, soTiet), M = K.MAU;

    /* I. MỤC TIÊU */
    N.push(K.Muc("I. MỤC TIÊU"));
    N.push(Nhan("1. Về kiến thức"));
    (NA ? NA.yccd : []).forEach(function (y) { N.push(G(esc(y) + ".")); });
    N.push(Nhan("2. Về năng lực"));
    N.push(P("<b><i>a) Năng lực chung</i></b>", { thut: 1 }));
    N.push(G("<i>Tự chủ và tự học:</i> tự đọc phần kiến thức (Đọc hiểu, SGK), tự trả lời câu hỏi và đối chiếu với đáp án được chốt."));
    N.push(G("<i>Giao tiếp và hợp tác:</i> làm việc nhóm, trình bày bài làm trước lớp, nhận xét và góp ý bài của nhóm bạn."));
    N.push(G("<i>Giải quyết vấn đề và sáng tạo:</i> vận dụng kiến thức của bài để giải quyết các nhiệm vụ luyện tập và tình huống thực tiễn ở phần vận dụng."));
    N.push(P("<b><i>b) Năng lực Tin học</i></b>", { thut: 1 }));
    var daCo = {};
    (NA ? NA.nls : []).forEach(function (m) {
      var nl = nlTheoMa(m); if (daCo[nl]) return; daCo[nl] = 1;
      N.push(G("<i>" + nl + " – " + NL_TIN[nl] + ":</i> " + esc(thuong(NA.yccd[0] || L.title)) + "."));
    });
    if (!daCo.NLe) N.push(G("<i>NLe – " + NL_TIN.NLe + ":</i> cùng nhóm thực hiện nhiệm vụ, chia sẻ bài làm và nhận xét bài của nhóm bạn trên trang học tập trực tuyến."));
    if (NA) {
      N.push(P("<b><i>c) Năng lực số</i></b> <i>(Thông tư 02/2025/TT-BGDĐT; chỉ báo theo Công văn 3456)</i>", { thut: 1 }));
      NA.nls.forEach(function (m) { N.push(G("<b>" + m + ":</b> " + esc(NLS_ATM.chiBao[m] || ""))); });
      if (NA.atm.length) {
        N.push(P("<b><i>d) An toàn mạng toàn diện</i></b> <i>(Công văn 6206)</i>", { thut: 1 }));
        NA.atm.forEach(function (a) { N.push(G("<b>" + a.nhom + " [" + a.muc + "]</b> – " + esc(NLS_ATM.nhomAtm[a.nhom]) + ": " + esc(a.yc))); });
      }
      N.push(T([100], [[{ c: [P("<b>Mục tiêu tích hợp:</b> " + esc(NA.mt))], nen: "EAF1FB" }]], { vien: "9DC3E6" }));
    }
    N.push(Nhan("3. Về phẩm chất"));
    N.push(G("<i>Chăm chỉ:</i> tích cực tham gia, hoàn thành các nhiệm vụ học tập được giao."));
    N.push(G("<i>Trung thực:</i> tự làm bài, báo cáo đúng kết quả của nhóm; nhận xét bài bạn khách quan."));
    N.push(G("<i>Trách nhiệm:</i> có trách nhiệm với nhiệm vụ chung của nhóm" + (NA && NA.atm.length ? "; có ý thức sử dụng môi trường số an toàn, văn minh." : "; sử dụng thiết bị đúng quy định của phòng máy.")));

    /* II. THIẾT BỊ */
    N.push(K.Muc("II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU"));
    N.push(Nhan("1. Giáo viên"));
    N.push(G("Máy tính, máy chiếu; SGK Tin học " + lop + "; kế hoạch bài dạy."));
    N.push(G("Trang giáo viên của bài (mở buổi học, mã QR, theo dõi tiến độ các nhóm, chiếu bài làm, chốt đáp án): <i>" + esc(baseUrl + "giaovien.html") + "</i>"));
    (NA ? NA.atm : []).forEach(function (a) { N.push(G("Học liệu cho hoạt động an toàn mạng (" + a.nhom + "): " + esc(a.hd))); });
    N.push(Nhan("2. Học sinh"));
    N.push(G("SGK Tin học " + lop + ", vở ghi."));
    N.push(G("Mỗi nhóm một máy tính hoặc thiết bị truy cập trang học sinh của bài: <i>" + esc(baseUrl) + "</i> (nếu thiếu thiết bị: GV chiếu câu hỏi, nhóm trả lời trên phiếu)."));

    /* III. TIẾN TRÌNH – bảng tóm tắt */
    N.push(K.Muc("III. TIẾN TRÌNH DẠY HỌC"));
    N.push(P("<b><i>Tóm tắt tiến trình</i></b>", { mau: M.nhan }));
    var tieuDe = function (t) { return { c: [P("<b>" + t + "</b>", { giua: 1, mau: "FFFFFF" })], nen: M.dam }; };
    N.push(T([30, 12, 58], [[tieuDe("Hoạt động"), tieuDe("Thời gian"), tieuDe("Mục tiêu chính")]].concat(ST.map(function (s, i) {
      var m = mauHD(s);
      return [{ c: [P("<b>" + esc(tenHD(s, i).replace(/^Hoạt động /, "HĐ ")) + "</b>", { mau: m[0] })], nen: m[1] }, { c: [P(PHUT[i] + " phút", { giua: 1 })] }, { c: [P(esc(mucTieu(s)))] }];
    })), { vien: "8EAADB", nho: 1 }));

    var daQua = 0, tietDaGhi = 0;
    var oAtm = ST.findIndex(function (s) { return s.id === "luyen-tap"; }); if (oAtm < 0) oAtm = ST.length - 1;
    ST.forEach(function (s, i) {
      var tietSo = Math.min(soTiet, Math.floor(daQua / 45) + 1), mau = mauHD(s), hinhS = HINH[s.id] || { task: {}, cuoi: [] }, daDung = {};
      if (soTiet > 1 && tietSo !== tietDaGhi) { N.push(P("<b>TIẾT " + tietSo + "</b>", { giua: 1, truoc: 10, sau: 2, nen: "D9D9D9", mau: M.dam })); tietDaGhi = tietSo; }
      daQua += PHUT[i];
      var A = acts(s), ghi = s.acts.filter(function (a) { return a.ghi && a.concept && L.CONCEPTS[a.concept]; });
      var nd = [], sp = [G("Câu trả lời của các nhóm trên trang học tập.", 2)];
      A.forEach(function (a) {
        var ts = (a.tasks || []).map(function (k) { return [k, L.TASKS[k]]; }).filter(function (x) { return x[1]; });
        var c = a.concept && L.CONCEPTS[a.concept];
        nd.push(P("▸ <b>" + esc(a.title) + "</b>" + (c ? ": đọc mục “" + esc(c.t) + "” (SGK, trang học tập)" + (ts.length ? " rồi trả lời câu hỏi." : ".") : (ts.length ? ":" : ".")), { thut: 2, mau: undefined }));
        ts.forEach(function (x) {
          var k = x[0], t = x[1];
          (hinhS.task[k] || []).forEach(function (h) { nd.push(h); daDung[h.src] = 1; });
          nd.push(G("<i>" + esc(t.label) + (/[?!.:]$/.test(t.label) ? "" : ".") + "</i> " + cauHoi(t), 3));
          sp.push(G("<i>" + esc(t.label.replace(/[?.:]+$/, "")) + ":</i> " + t.k, 2));
        });
      });
      Object.keys(hinhS.task).forEach(function (k) { hinhS.task[k].forEach(function (h) { if (!daDung[h.src]) { nd.push(h); daDung[h.src] = 1; } }); });
      hinhS.cuoi.forEach(function (h) { nd.push(h); });
      var atmHere = NA && NA.atm.length && i === oAtm ? NA.atm : [];
      atmHere.forEach(function (a) {
        nd.push(T([100], [[{ c: [P("<b>Hoạt động tích hợp an toàn mạng (" + a.nhom + " [" + a.muc + "]):</b> " + esc(a.hd))], nen: "FCE4D6" }]], { vien: "F4B183" }));
        sp.push(G("<i>Minh chứng an toàn mạng:</i> " + esc(a.mc), 2));
      });
      var ghiDong = [];
      ghi.forEach(function (a) { ghiDong = ghiDong.concat(dong(L.CONCEPTS[a.concept].b)); });
      var ghiNho = ghiDong.map(function (x) { return x.charAt(0) === "\u0001" ? { td: esc(chu(x.slice(1))) } : x; });
      var tenViec = A.map(function (a) { return a.title; }).join("; ");
      var tc = [
        (s.id === "mo-dau" ? ["GV mở buổi học trên trang giáo viên, chiếu mã QR; các nhóm vào trang học sinh của bài."] : [])
          .concat(["GV giao nhiệm vụ: " + esc(tenViec) + "."])
          .concat(atmHere.map(function (a) { return "GV tổ chức hoạt động an toàn mạng: " + esc(a.hd); })),
        ["HS làm việc nhóm, đọc SGK/phần Đọc hiểu, trả lời các câu hỏi trên trang học tập.", "GV theo dõi bảng tiến độ trên trang giáo viên, hỗ trợ nhóm còn lúng túng."],
        ["GV chiếu bài làm của 1 – 2 nhóm; đại diện nhóm trình bày, các nhóm khác nhận xét, bổ sung.", "GV gửi nhận xét, khen trên trang cho các nhóm."],
        ["GV nhận xét, chốt đáp án (nút Chốt trên trang giáo viên)" + (atmHere.length ? "; thu minh chứng an toàn mạng." : ".")].concat(ghiDong.length ? ["GV chốt kiến thức; HS ghi bài theo ô Ghi nhớ."] : [])
      ];

      N.push(P("", { truoc: 4 }));
      N.push(K.Thanh(esc(tenHD(s, i)).toUpperCase(), PHUT[i] + " phút", mau[0]));
      N.push(Nhan("a) Mục tiêu", mau[0])); N.push(P(esc(mucTieu(s)), { thut: 1 }));
      N.push(Nhan("b) Nội dung", mau[0])); nd.forEach(function (x) { N.push(x); });
      N.push(Nhan("c) Sản phẩm", mau[0])); sp.forEach(function (x) { N.push(x); });
      if (ghiNho.length) N.push(K.GhiNho("GHI NHỚ", ghiNho));
      N.push(Nhan("d) Tổ chức thực hiện", mau[0]));
      var dau = function (t) { return { c: [P("<b>" + t + "</b>", { giua: 1, mau: "FFFFFF" })], nen: mau[0] }; };
      N.push(T([26, 74], [[dau("Bước"), dau("Hoạt động của giáo viên và học sinh")]].concat(
        [["Bước 1. Chuyển giao nhiệm vụ", tc[0]], ["Bước 2. Thực hiện nhiệm vụ", tc[1]], ["Bước 3. Báo cáo, thảo luận", tc[2]], ["Bước 4. Kết luận, nhận định", tc[3]]]
          .map(function (r) { return [{ c: [P("<b>" + r[0] + "</b>", { mau: mau[0] })], nen: mau[1] }, r[1].map(function (x) { return P("- " + x); })]; })), { vien: mau[0] }));
    });
    return N.concat(K.chuKi());
  }

  var CFG = { id: id, lop: lop, tietMacDinh: NA ? NA.tiet : "", tieuDe: "KHBD – " + L.title + " – Tin học " + lop,
    tenTep: "KHBD-Tin" + lop + "-Bai" + (NA ? NA.bai : "") + "-" + id.replace(/^tin\d-/, ""), dung: dung, chuanBi: chuanBi };
  window.KHBD_BAI = { dung: dung, taoBlob: function () { return K.taoBlob(CFG); }, mo: function () { K.mo(CFG); } };

  /* Nút trên trang giáo viên: đầu khu #app (chỉ hiện sau khi mở buổi học bằng mã giáo viên) */
  var app = document.getElementById("app");
  if (app && document.getElementById("dang-nhap")) {
    var sec = document.createElement("section");
    sec.className = "part"; sec.id = "khbd-bai";
    sec.innerHTML = '<div class="act" style="display:flex;flex-wrap:wrap;gap:10px;align-items:center"><button class="btn primary" type="button" id="khbd-mo">📄 Kế hoạch bài dạy (mẫu 5512) · tải Word</button>' +
      '<span class="status">Dựng từ nội dung bài trên trang' + (NA ? ", kèm năng lực số – an toàn mạng; tiết PPCT " + esc(NA.tiet) : "") + '. Có hình minh hoạ lấy từ trang học sinh; xem trước rồi tải tệp .docx nộp tổ trưởng.</span></div>';
    app.insertBefore(sec, app.firstChild);
    sec.querySelector("#khbd-mo").addEventListener("click", function () { K.mo(CFG); });
  }
})();
