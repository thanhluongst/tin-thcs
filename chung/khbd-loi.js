/* LÕI KẾ HOẠCH BÀI DẠY (dùng chung cho KHBD bài học và KHBD STEM)
   – Mô hình văn bản: P(html, {giua, thut, co, truoc}) đoạn; G(html, cap) gạch đầu dòng; T([% cột], [[ô]], {khung:0, dau, nho}) bảng.
   – Đầu trang và ô kí theo Phụ lục IV, Công văn 5512/BGDĐT-GDTrH.
   – Hộp xem trước A4 có ô nhập thông tin giáo viên (lưu trên máy; tiết PPCT lưu riêng từng bài), in, tải Word (.docx).
   Dùng: KhbdLoi.mo({ id, tietMacDinh, lop, tieuDe, tenTep, dung: function () { return [nodes]; }, truocKhiMo })
         KhbdLoi.taoBlob(cfg) → Promise<Blob>  (để kiểm thử) */
(function () {
  "use strict";
  var KHOA_TT = "khbd-thong-tin", KHOA_CU = "stem-khbd-thong-tin";
  var DOCX_URL = "https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function boEmoji(s) { return String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]️?/gu, "").replace(/️/g, "").replace(/ (<\/[bi]>)/g, "$1 ").replace(/ {2,}/g, " ").replace(/ ([,.;:)])/g, "$1").replace(/\( /g, "("); }
  function chu(html) { var d = document.createElement("div"); d.innerHTML = String(html == null ? "" : html); return (d.textContent || "").replace(/\s+/g, " ").trim(); }

  /* ---------- thông tin giáo viên (lưu trên máy) ---------- */
  var MAC_DINH = { truong: "THCS Nhơn Mỹ", to: "Tin học", gv: "Nguyễn Thanh Lương", diaDanh: "Nhơn Mỹ", ngayTuan1: "07/09/2026" };
  var TT = { lopDay: "", tiet: {}, ngay: {} };
  for (var k0 in MAC_DINH) TT[k0] = MAC_DINH[k0];
  try {
    var cu = JSON.parse(localStorage.getItem(KHOA_TT) || localStorage.getItem(KHOA_CU) || "null");
    if (cu) for (var k in cu) if (!(k in MAC_DINH) || cu[k]) TT[k] = cu[k];   // ô để trống thì dùng giá trị mặc định
  } catch (e) {}
  if (!TT.tiet || typeof TT.tiet !== "object") TT.tiet = {};
  if (!TT.ngay || typeof TT.ngay !== "object") TT.ngay = {};
  delete TT.tietPPCT; delete TT.ngaySoan; delete TT.ngayDay;   // bản cũ lưu một ô chung cho mọi bài
  function luuTT() { try { localStorage.setItem(KHOA_TT, JSON.stringify(TT)); } catch (e) {} }
  function tiet(cfg) { var v = TT.tiet[cfg.id]; return v != null ? v : (cfg.tietMacDinh || ""); }

  /* Tuần, tiết, ngày: PPCT 1 tiết/tuần nên tuần = số tiết; ngày dạy = ngày dạy tuần 1 + 7 × (tuần − 1); ngày soạn = ngày dạy − 6 ngày */
  function so(cfg) { return (tiet(cfg).match(/\d+/g) || []).map(Number); }
  function hai(n) { return (n < 10 ? "0" : "") + n; }
  function dsSo(a) {   // [1,2] → "01-02"; [32,35] → "32, 35"
    if (!a.length) return "";
    var lien = a.every(function (x, i) { return !i || x === a[i - 1] + 1; });
    return lien && a.length > 1 ? hai(a[0]) + "-" + hai(a[a.length - 1]) : a.map(hai).join(", ");
  }
  function docNgay(s) { var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(s || "").trim()); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
  function vietNgay(d) { return hai(d.getDate()) + "/" + hai(d.getMonth() + 1) + "/" + d.getFullYear(); }
  function congNgay(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function ngayMacDinh(cfg) {
    var t1 = docNgay(TT.ngayTuan1), a = so(cfg);
    if (!t1 || !a.length) return { soan: "", day: "" };
    var day = congNgay(t1, 7 * (a[0] - 1));
    return { soan: vietNgay(congNgay(day, -6)), day: vietNgay(day) };
  }
  function ngay(cfg, k) { var r = TT.ngay[cfg.id] || {}; return r[k] != null && r[k] !== "" ? r[k] : ngayMacDinh(cfg)[k]; }
  function o(v, dai) { return v ? esc(v) : (dai ? "……………………………" : "…………"); }

  /* ---------- mô hình văn bản ---------- */
  function P(html, k) { k = k || {}; k.t = "p"; k.h = html; return k; }
  function G(html, cap) { return P("- " + html, { thut: cap || 1 }); }
  function T(cot, hang, k) { k = k || {}; k.t = "t"; k.cot = cot; k.hang = hang; return k; }

  /* Đầu trang theo mẫu 5512: Trường/Tổ – Họ tên GV; KẾ HOẠCH BÀI DẠY; tên bài; môn, lớp; thời gian */
  function dauTrang(cfg, tenBai, phu, soTiet) {
    var N = [], a = so(cfg), ds = dsSo(a);
    N.push(T([50, 50], [[
      [P("Tuần: " + (ds || "……")), P("Tiết: " + (ds || "……"))],
      [P("Ngày soạn: " + (ngay(cfg, "soan") || "……/……/20……"), { phai: 1 }), P("Ngày dạy: " + (ngay(cfg, "day") || "……/……/20……"), { phai: 1 })]
    ]], { khung: 0 }));
    N.push(P("", {}));
    N.push(P("<b>KẾ HOẠCH BÀI DẠY</b>", { giua: 1, co: 15 }));
    N.push(P("<b>TÊN BÀI DẠY: " + esc(tenBai.toUpperCase()) + "</b>", { giua: 1, co: 14 }));
    if (phu) N.push(P("<i>" + phu + "</i>", { giua: 1 }));
    N.push(P("Môn học: Tin học; lớp: " + (TT.lopDay ? esc(TT.lopDay) : cfg.lop), { giua: 1 }));
    N.push(P("Thời gian thực hiện: " + hai(soTiet) + " tiết", { giua: 1 }));
    N.push(P("", {}));
    return N;
  }
  /* Ô kí: Duyệt của BGH – Tổ trưởng chuyên môn – Giáo viên */
  function chuKi() {
    return [P("", {}), T([34, 33, 33], [[
      [P("<b>DUYỆT CỦA BAN GIÁM HIỆU</b>", { giua: 1 })],
      [P("<b>TỔ TRƯỞNG CHUYÊN MÔN</b>", { giua: 1 })],
      [P("<i>" + esc(TT.diaDanh || "……") + ", ngày …… tháng …… năm 20……</i>", { giua: 1 }), P("<b>GIÁO VIÊN</b>", { giua: 1 }),
       P("", {}), P("", {}), P("", {}), P(TT.gv ? "<b>" + esc(TT.gv) + "</b>" : "", { giua: 1 })]
    ]], { khung: 0 })];
  }

  /* ---------- xem trước HTML ---------- */
  function veHtml(N) {
    return N.map(function (n) {
      if (n.t === "p") return '<p class="kp' + (n.giua ? " giua" : n.phai ? " phai" : "") + '" style="' + (n.thut ? "padding-left:" + (n.thut * 1.2) + "em;" : "") + (n.co ? "font-size:" + (n.co / 13) + "em;" : "") + (n.truoc ? "margin-top:" + n.truoc + "pt;" : "") + '">' + (boEmoji(n.h) || "&nbsp;") + "</p>";
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
        children: runs(X, n.h, n.co ? n.co * 2 : co), alignment: n.giua ? X.AlignmentType.CENTER : n.phai ? X.AlignmentType.RIGHT : X.AlignmentType.JUSTIFIED,
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
  function taoBlob(cfg) {
    return napDocx().then(function (X) {
      var doc = new X.Document({
        creator: TT.gv || "Giáo viên", title: cfg.tieuDe || "Kế hoạch bài dạy", description: "Kế hoạch bài dạy Tin học " + cfg.lop,
        styles: { default: { document: { run: { font: "Times New Roman", size: 26 } } } },
        sections: [{
          properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1701, right: 1134 } } },
          footers: { default: new X.Footer({ children: [new X.Paragraph({ alignment: X.AlignmentType.CENTER, children: [new X.TextRun({ children: [X.PageNumber.CURRENT], size: 22 })] })] }) },
          children: docxNodes(X, cfg.dung())
        }]
      });
      return X.Packer.toBlob(doc);
    });
  }
  function taiDocx(cfg, nut) {
    var cu = nut.textContent; nut.disabled = true; nut.textContent = "Đang tạo tệp Word…";
    taoBlob(cfg).then(function (blob) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = (cfg.tenTep || "KHBD") + ".docx";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      nut.textContent = "✓ Đã tải tệp Word";
    }).catch(function (e) { alert(e.message || e); nut.textContent = cu; })
      .then(function () { setTimeout(function () { nut.disabled = false; nut.textContent = cu; }, 2500); });
  }

  /* ---------- hộp xem trước ---------- */
  var CSS = ".khbd-nen{position:fixed;inset:0;z-index:80;background:rgba(15,23,42,.6);display:flex;flex-direction:column;font-family:system-ui,'Segoe UI',sans-serif}" +
    ".khbd-thanh{background:#fff;color:#0f172a;padding:10px 16px;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:end;border-bottom:1px solid #e2e8f0}" +
    ".khbd-thanh label{font-size:12px;font-weight:700;color:#475569;display:flex;flex-direction:column;gap:2px;flex:1 1 150px;max-width:230px}" +
    ".khbd-thanh input{border:1px solid #cbd5e1;border-radius:8px;padding:6px 8px;font:inherit;font-size:14px;font-weight:400;color:#0f172a;background:#fff}" +
    ".khbd-nut{display:flex;gap:8px;margin-left:auto}.khbd-nut button{border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:10px;padding:8px 14px;font:inherit;font-weight:600;cursor:pointer}" +
    ".khbd-nut button.chinh{background:#2563eb;border-color:#2563eb;color:#fff}.khbd-nut button:disabled{opacity:.6}" +
    ".khbd-cuon{flex:1;overflow:auto;padding:18px 12px}" +
    ".khbd-giay{background:#fff;color:#000;max-width:794px;margin:0 auto;padding:56px 56px 56px 84px;font-family:'Times New Roman',Times,serif;font-size:16px;line-height:1.45;box-shadow:0 6px 30px rgba(0,0,0,.3)}" +
    ".khbd-giay .kp{margin:0 0 3px;text-align:justify}.khbd-giay .kp.giua{text-align:center}.khbd-giay .kt td .kp.phai,.khbd-giay .kp.phai{text-align:right}" +
    ".khbd-giay table.kt{width:100%;border-collapse:collapse;margin:4px 0 8px;table-layout:fixed}.khbd-giay .kt td{border:1px solid #000;padding:3px 6px;vertical-align:top}" +
    ".khbd-giay .kt tr:first-child td{background:#ededed}.khbd-giay .kt.khong tr td{border:0;background:none}.khbd-giay .kt.nho{font-size:15px}" +
    ".khbd-giay .kt td .kp{text-align:left}" +
    "@media (max-width:640px){.khbd-giay{padding:22px 16px;font-size:14px}.khbd-thanh label{max-width:none}.khbd-nut{margin-left:0;width:100%}}" +
    "@media print{body.khbd-in>*:not(.khbd-nen){display:none!important}body.khbd-in .khbd-nen{position:static;background:none}body.khbd-in .khbd-thanh{display:none}body.khbd-in .khbd-cuon{padding:0;overflow:visible}body.khbd-in .khbd-giay{box-shadow:none;padding:0;max-width:none}}";

  function mo(cfg) {
    if (document.querySelector(".khbd-nen")) return;
    if (!document.getElementById("khbd-css")) { var st = document.createElement("style"); st.id = "khbd-css"; st.textContent = CSS; document.head.appendChild(st); }
    var O = [["gv", "Họ và tên giáo viên (ô kí)"], ["lopDay", "Lớp dạy", cfg.lop + "A1, " + cfg.lop + "A2"], ["tiet", "Tiết PPCT", cfg.tietMacDinh || "VD: 30, 31"], ["soan", "Ngày soạn (bài này)", "để trống = tự tính"], ["day", "Ngày dạy (bài này)", "để trống = tự tính"], ["ngayTuan1", "Ngày dạy tuần 1 (mọi bài)", "dd/mm/yyyy"], ["diaDanh", "Địa danh (chỗ kí)"]];
    function giaTri(k) { return k === "tiet" ? tiet(cfg) : k === "soan" || k === "day" ? ((TT.ngay[cfg.id] || {})[k] || "") : TT[k]; }
    var nen = document.createElement("div"); nen.className = "khbd-nen"; nen.setAttribute("role", "dialog"); nen.setAttribute("aria-modal", "true"); nen.setAttribute("aria-label", "Kế hoạch bài dạy");
    nen.innerHTML = '<div class="khbd-thanh">' + O.map(function (f) {
      return "<label>" + f[1] + '<input data-tt="' + f[0] + '" value="' + esc(giaTri(f[0])) + '" placeholder="' + esc(f[0] === "soan" || f[0] === "day" ? (ngayMacDinh(cfg)[f[0]] || f[2]) : (f[2] || "")) + '"></label>';
    }).join("") + '<div class="khbd-nut"><button type="button" class="chinh" data-khbd-tai>⬇ Tải Word (.docx)</button><button type="button" data-khbd-in>🖨 In</button><button type="button" data-khbd-dong aria-label="Đóng">✕ Đóng</button></div></div>' +
      '<div class="khbd-cuon"><div class="khbd-giay"></div></div>';
    document.body.appendChild(nen); document.body.style.overflow = "hidden";
    var giay = nen.querySelector(".khbd-giay");
    function ve() { giay.innerHTML = veHtml(cfg.dung()); }
    ve();
    nen.addEventListener("input", function (e) {
      var k = e.target.dataset.tt; if (!k) return;
      var v = e.target.value.trim();
      if (k === "tiet") TT.tiet[cfg.id] = v;
      else if (k === "soan" || k === "day") { var r = TT.ngay[cfg.id] || (TT.ngay[cfg.id] = {}); r[k] = v; }
      else TT[k] = v;
      luuTT(); ve();
      // ngày tự tính đổi theo tiết / ngày tuần 1: cập nhật gợi ý trong ô ngày
      var md = ngayMacDinh(cfg);
      nen.querySelectorAll('[data-tt="soan"],[data-tt="day"]').forEach(function (o2) { o2.placeholder = md[o2.dataset.tt] || "để trống = tự tính"; });
    });
    nen.addEventListener("click", function (e) {
      if (e.target.closest("[data-khbd-tai]")) taiDocx(cfg, e.target.closest("[data-khbd-tai]"));
      else if (e.target.closest("[data-khbd-in]")) { document.body.classList.add("khbd-in"); window.print(); document.body.classList.remove("khbd-in"); }
      else if (e.target.closest("[data-khbd-dong]") || e.target === nen) dong();
    });
    function phim(e) { if (e.key === "Escape") dong(); }
    function dong() { nen.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", phim); if (cfg.khiDong) cfg.khiDong(); }
    document.addEventListener("keydown", phim);
    nen.querySelector("[data-khbd-tai]").focus();
  }

  window.KhbdLoi = { esc: esc, chu: chu, boEmoji: boEmoji, P: P, G: G, T: T, o: o, TT: TT, tiet: tiet, dauTrang: dauTrang, chuKi: chuKi, veHtml: veHtml, taoBlob: taoBlob, mo: mo };
})();
