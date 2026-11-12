/* PHẦN TRỰC TUYẾN của trang dự án STEM (dùng máy chủ Apps Script của trang bài học, chung/api.js).

   1. LƯU BÀI LÊN LỚP – làm tiếp ở tiết sau trên máy bất kì
      Nhóm nhập Mã buổi (thầy cô cho, dùng chung cho cả dự án) + Tên nhóm ở đầu trang rồi bấm "Vào lớp".
      Mã máy của nhóm = "g-<tên nhóm không dấu>", nên cùng mã buổi + cùng tên nhóm luôn là MỘT bài trên máy chủ.
      Trang tự lưu lên lớp mỗi khi có thay đổi (tối đa mỗi phút một lần) và khi rời trang.
      Tiết sau, ở máy nào cũng vậy: nhập lại đúng mã buổi + tên nhóm → mở lại bài (API.load, Code.gs có "load").
      Máy đang giữ bài của nhóm khác (lớp trước dùng máy này) → trang hỏi "Đây có phải nhóm em không?".

   2. ĐÁNH GIÁ CHÉO – thầy cô mở khoá "ban.duan" ở stem/giaovien.html; mỗi nhóm chấm từng nhóm bạn theo bảng
      tiêu chí, điểm ghi ở đầu lời nhận xét: "Điểm 8,3/10 [3-2-3-3-2] lời nhận xét". */
(function () {
  var G = window.STEM, API = window.API, T = window.TucThi;
  var dau = document.getElementById("lop-nhom"), hop = document.getElementById("truc-tuyen");
  if (!G || !dau || !hop || !API) return;
  var D = G.D, S = G.S, esc = G.esc, bao = G.bao;
  var BAI = "stem-" + D.id, TASK = "duan", MAX = 44000, CHO_HOI = 15 * 60000, TU_LUU = 60000;
  var R = D.rubric, NR = R.length;

  function so(x) { return String(x).replace(".", ","); }
  function gio(t, ngay) {
    if (!t) return "";
    var d = new Date(t), h = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return ngay || new Date().toDateString() !== d.toDateString() ? h + " ngày " + d.getDate() + "/" + (d.getMonth() + 1) : h;
  }
  function slug(t) {
    return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
  }
  function maNhom(ten) { var s = slug(ten); return s ? "g-" + s : ""; }

  /* ---------- điểm trong lời nhận xét ---------- */
  function diem10(m) { var t = 0; m.forEach(function (x) { t += x; }); return Math.round(t / (3 * m.length) * 100) / 10; }
  function maHoa(m, chu) { return ("Điểm " + so(diem10(m)) + "/10 [" + m.join("-") + "] " + chu.trim()).slice(0, 300); }
  function giaiMa(t) {
    var k = /^Điểm\s+[\d,.]+\/10\s+\[([1-3](?:-[1-3])*)\]\s*([\s\S]*)$/.exec(String(t || ""));
    if (!k) return null;
    var m = k[1].split("-").map(Number);
    return { m: m, d: diem10(m), chu: k[2] };
  }

  /* ================= 1. LƯU BÀI LÊN LỚP ================= */
  var ON = S.on && S.on.cid ? S.on : null;          // {buoi, cid, ten, luc: lần lưu lên lớp gần nhất, hd: lần sửa gần nhất}
  var choXacNhan = false, dangLuu = false, loiLuu = "", chuKy = "", henLuu = null;

  function banSao() { var o = {}; Object.keys(S).forEach(function (k) { if (k !== "on") o[k] = S[k]; }); return JSON.parse(JSON.stringify(o)); }
  function goi() {
    var htc = null; try { htc = G.cham ? G.cham() : null; } catch (e) {}   // chấm lại trước khi lấy bản sao bài làm
    var st = banSao();
    var tc = D.tieuChi.filter(function (t) { return S.tc[t.k]; }).map(function (t) { return t.k; });
    var du = R.every(function (r, i) { return S.rub[i]; });
    var tdg = du ? diem10(R.map(function (r, i) { return S.rub[i]; })) : null;
    var tl = {};
    ["b3-lydo", "b3-pa-rieng", "tc-nhom"].forEach(function (k) { if (S.tl[k]) tl[k] = String(S.tl[k]).slice(0, 600); });
    (D.buoc5.hoi || []).forEach(function (q, j) { var k = "b5-" + j; if (S.tl[k]) tl[k] = String(S.tl[k]).slice(0, 600); });
    var sp = ""; try { sp = G.baoCao(); } catch (e) {}
    var ans = { sp: "", tc: tc, ntc: D.tieuChi.length, tcn: S.tl["tc-nhom"] ? !!S.tcNhom : null, tdg: tdg, lop: S.nhom.lop || "", tv: S.nhom.tv || "", tl: tl, buoc: S.xong.filter(Boolean).length,
      htc: htc ? { d: htc.d, m: htc.m, ly: htc.ly.map(function (x) { return x.slice(0, 200); }), n: htc.n, ds: htc.ds.slice(0, 10), luc: htc.luc } : null };
    var data = { sub: { duan: 1 }, ans: { duan: ans }, luu: st };
    var con = MAX - JSON.stringify(data).length;
    if (con < 0) throw new Error("Bài của nhóm quá dài để lưu lên lớp. Hãy rút gọn các câu trả lời.");
    ans.sp = sp.length > con - 200 ? "" : sp;      // sản phẩm quá dài thì bỏ phần xem trước, vẫn lưu đủ bài làm
    var cols = [["Lớp", S.nhom.lop || ""], ["Thành viên", S.nhom.tv || ""], ["Đã xong (bước)", ans.buoc + "/5"],
      ["Tiêu chí sản phẩm đạt", tc.length + "/" + D.tieuChi.length],
      ["Tiêu chí riêng", (S.tl["tc-nhom"] || "") + (S.tl["tc-nhom"] ? (S.tcNhom ? " ✓" : " ✗") : "")],
      ["Tự đánh giá (thang 10)", tdg == null ? "" : so(tdg)],
      ["Hệ thống chấm (thang 10)", htc && htc.d != null ? so(htc.d) : ""], ["Đề xuất chỉnh sửa còn lại", htc ? htc.n : ""]];
    return { data: data, cols: cols, sig: JSON.stringify(st) };
  }

  function luuLop(baoNhom) {
    if (!ON || choXacNhan || dangLuu) return Promise.resolve(false);
    var g; try { g = goi(); } catch (e) { loiLuu = e.message; veDau(); return Promise.resolve(false); }
    dangLuu = true; veDau();
    return API.submit({ bai: BAI, buoi: ON.buoi, clientId: ON.cid, group: ON.ten, sub: 1, data: g.data, cols: g.cols })
      .then(function () {
        chuKy = g.sig; ON.luc = ON.hd = Date.now(); ON.chuaLuu = JSON.stringify(banSao()) !== g.sig; loiLuu = ""; G.luu();
        if (baoNhom && T) T.send(T.path(BAI, ON.buoi, "nop"), Date.now());
        if (baoNhom) bao("☁️ Đã lưu bài của nhóm lên lớp.");
        return true;
      })
      .catch(function (e) { loiLuu = e.message; return false; })
      .then(function (ok) { dangLuu = false; veDau(); return ok; });
  }
  /* tự lưu: có thay đổi thì lưu, nhưng không quá mỗi phút một lần */
  function kiemTraThayDoi() {
    if (!ON || choXacNhan) return;
    var sig = JSON.stringify(banSao());
    if (sig !== chuKy) {
      if (!ON.chuaLuu) { ON.chuaLuu = true; veDau(); }
      ON.hd = Date.now(); G.luu();
      if (Date.now() - (ON.luc || 0) >= TU_LUU) luuLop(false);
    }
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden && ON && !choXacNhan && JSON.stringify(banSao()) !== chuKy) luuLop(false); });
  window.addEventListener("pagehide", function () { if (ON && !choXacNhan && JSON.stringify(banSao()) !== chuKy) luuLop(false); });

  /* mở bài đã lưu trên lớp: ghi đè trạng thái trên máy rồi tải lại trang */
  function moBai(r, buoi, cid, ten) {
    var st = r.data && r.data.luu;
    if (!st) { bao("Bài trên lớp chưa có dữ liệu để mở lại."); return; }
    st.on = { buoi: buoi, cid: cid, ten: ten, luc: r.t || Date.now(), hd: Date.now() };
    st.nhom = st.nhom || {}; st.nhom.ten = ten;
    try { localStorage.setItem(G.KHOA, JSON.stringify(st)); sessionStorage.setItem("stem-vua-mo", gio(r.t, true)); } catch (e) { bao("Máy này không lưu được dữ liệu trình duyệt."); return; }
    location.reload();
  }
  function boBaiTrenMay(thongBao) {
    try { localStorage.removeItem(G.KHOA); if (thongBao) sessionStorage.setItem("stem-thong-bao", thongBao); } catch (e) {}
    location.reload();
  }

  /* ---------- giao diện đầu trang ---------- */
  function veDau() {
    var nt = document.getElementById("n-ten");
    if (!ON) {
      if (nt) { nt.readOnly = false; nt.title = ""; }
      dau.innerHTML = '<div class="lop-nhom chua"><div class="ln-chu">☁️ <b>Lưu bài lên lớp</b> để tiết sau làm tiếp trên máy bất kì. Ghi <b>Tên nhóm</b> ở trên, nhập <b>Mã buổi</b> thầy cô cho rồi bấm Vào lớp.<span class="goi-y">Tiết sau: nhập lại đúng mã buổi và tên nhóm như hôm nay để mở bài cũ.</span></div>' +
        '<div class="ln-vao"><input id="ln-buoi" maxlength="40" placeholder="Mã buổi" aria-label="Mã buổi" autocomplete="off"><button class="btn chinh" id="ln-vao">Vào lớp</button></div><div class="ln-hoi" id="ln-hoi" hidden></div></div>';
      var q = API.normSession(new URLSearchParams(location.search).get("buoi") || "");
      if (q) dau.querySelector("#ln-buoi").value = q;
      dau.querySelector("#ln-vao").onclick = vaoLop;
      dau.querySelector("#ln-buoi").onkeydown = function (e) { if (e.key === "Enter") vaoLop(); };
      return;
    }
    if (nt) { nt.readOnly = true; nt.title = "Muốn đổi tên nhóm, bấm “Đổi nhóm”."; }
    var tt = dangLuu ? '<span class="ln-tt dang">⏳ Đang lưu lên lớp…</span>' :
      loiLuu ? '<span class="ln-tt loi">⚠️ Chưa lưu được: ' + esc(loiLuu) + "</span>" :
      ON.chuaLuu ? '<span class="ln-tt sua">✏️ Có thay đổi, sẽ tự lưu trong ít phút</span>' :
      '<span class="ln-tt ok">✓ Đã lưu lên lớp' + (ON.luc ? " lúc " + gio(ON.luc) : "") + "</span>";
    dau.innerHTML = '<div class="lop-nhom vao"><div class="ln-chu">☁️ <b>' + esc(ON.ten) + "</b> · buổi <b>" + esc(ON.buoi) + "</b> " + tt + "</div>" +
      '<div class="ln-vao"><button class="btn chinh nho" id="ln-luu">💾 Lưu ngay</button><button class="btn nho" id="ln-doi">Đổi nhóm</button></div><div class="ln-hoi" id="ln-hoi" hidden></div></div>';
    dau.querySelector("#ln-luu").onclick = function () { luuLop(true); };
    dau.querySelector("#ln-doi").onclick = function () {
      if (!confirm("Lưu bài của " + ON.ten + " lên lớp rồi xoá khỏi máy này để nhóm khác dùng?")) return;
      luuLop(false).then(function (ok) {
        if (!ok && !confirm("Chưa lưu được lên lớp (" + loiLuu + "). Vẫn xoá bài khỏi máy này?")) return;
        boBaiTrenMay("Đã lưu và đóng bài của " + ON.ten + ". Nhóm em ghi tên nhóm, nhập mã buổi rồi bấm Vào lớp.");
      });
    };
  }
  function hoiDau(html) { var h = dau.querySelector("#ln-hoi"); h.hidden = !html; h.innerHTML = html || ""; return h; }

  function vaoLop() {
    var buoi = API.normSession(dau.querySelector("#ln-buoi").value), ten = String(S.nhom.ten || "").trim(), cid = maNhom(ten);
    if (!ten || !cid) { bao("Ghi Tên nhóm ở ô phía trên trước (VD: Nhóm 3)."); var n = document.getElementById("n-ten"); if (n) n.focus(); return; }
    if (!buoi) { bao("Nhập mã buổi thầy cô cho."); dau.querySelector("#ln-buoi").focus(); return; }
    var nut = dau.querySelector("#ln-vao"); nut.disabled = true; nut.textContent = "Đang tìm bài…";
    var coBai = S.xong.some(Boolean) || Object.keys(S.tl).some(function (k) { return S.tl[k]; }) || Object.keys(S.tc).some(function (k) { return S.tc[k]; }) || Object.keys(S.rub).length > 0;
    API.load(BAI, buoi, cid).then(function (r) {
      if (!r.found) { ganNhom(buoi, cid, ten, true); return; }
      var h = hoiDau('<p>📂 Trên lớp đã có bài của <b>' + esc(r.group || ten) + "</b> (buổi " + esc(buoi) + "), lưu lúc <b>" + gio(r.t, true) + "</b>.</p>" +
        '<button class="btn chinh" data-mo>📂 Mở bài này để làm tiếp</button> ' +
        (coBai ? '<button class="btn" data-giu>Giữ bài đang có trên máy này (lưu đè lên lớp)</button> ' : "") + '<button class="btn nho" data-huy>Huỷ</button>' +
        '<p class="goi-y">Không phải nhóm em? Bấm Huỷ và đặt tên nhóm khác, để không ghi đè bài của nhóm bạn.</p>');
      h.querySelector("[data-mo]").onclick = function () { moBai(r, buoi, cid, r.group || ten); };
      if (coBai) h.querySelector("[data-giu]").onclick = function () { if (confirm("Bài trên lớp của " + ten + " sẽ bị thay bằng bài trên máy này. Chắc chắn?")) ganNhom(buoi, cid, ten, true); };
      h.querySelector("[data-huy]").onclick = function () { hoiDau(""); };
    }).catch(function (e) {
      /* Code.gs chưa cập nhật: vẫn lưu được, chỉ chưa mở lại được trên máy khác */
      if (/Code\.gs/.test(e.message)) { bao("Thầy cô cần cập nhật Code.gs để mở lại bài trên máy khác. Bài vẫn được lưu lên lớp."); ganNhom(buoi, cid, ten, true); }
      else bao("Không kết nối được máy chủ: " + e.message);
    }).then(function () { if (nut.isConnected) { nut.disabled = false; nut.textContent = "Vào lớp"; } });
  }
  function ganNhom(buoi, cid, ten, luuNgay) {
    ON = S.on = { buoi: buoi, cid: cid, ten: ten, luc: 0, hd: Date.now() };
    G.luu(); chuKy = ""; veDau(); batDauLop();
    if (luuNgay) luuLop(true);
  }

  /* Mở trang: máy đang giữ bài của một nhóm. Lâu không dùng → hỏi có đúng nhóm không.
     Bài trên lớp mới hơn bài trên máy (nhóm đã làm ở máy khác) → đề nghị mở bản trên lớp. */
  function kiemTraKhiMo() {
    if (!ON) return;
    var lau = Date.now() - (ON.hd || ON.luc || 0) > CHO_HOI;
    if (lau) {
      choXacNhan = true;
      var m = document.createElement("div");
      m.className = "ln-man"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
      m.innerHTML = '<div class="ln-hop"><div class="ln-icon">👋</div><h2>Đây có phải nhóm em không?</h2>' +
        "<p>Máy này đang mở bài của <b>" + esc(ON.ten) + "</b>" + (S.nhom.lop ? " lớp <b>" + esc(S.nhom.lop) + "</b>" : "") + " (buổi " + esc(ON.buoi) + "), làm lần cuối lúc " + gio(ON.hd || ON.luc, true) + ".</p>" +
        (S.nhom.tv ? '<p class="goi-y">Thành viên: ' + esc(S.nhom.tv) + "</p>" : "") +
        '<div class="ln-nut"><button class="btn chinh" data-dung>✓ Đúng, làm tiếp</button><button class="btn" data-khong>✗ Không phải, mở bài nhóm em</button></div></div>';
      document.body.appendChild(m);
      m.querySelector("[data-dung]").focus();
      m.querySelector("[data-dung]").onclick = function () { m.remove(); choXacNhan = false; ON.hd = Date.now(); G.luu(); soVoiLop(); };
      m.querySelector("[data-khong]").onclick = function () {
        /* lưu nốt phần chưa lưu của nhóm cũ (nếu có) rồi đóng bài khỏi máy */
        choXacNhan = false;
        var xong = JSON.stringify(banSao()) !== chuKy && ON.luc ? luuLop(false) : Promise.resolve(true);
        xong.then(function () { boBaiTrenMay("Ghi tên nhóm em, nhập mã buổi rồi bấm Vào lớp để mở bài của nhóm."); });
      };
      return;
    }
    soVoiLop();
  }
  function soVoiLop() {
    API.load(BAI, ON.buoi, ON.cid).then(function (r) {
      if (!r.found) { luuLop(false); return; }
      if ((r.t || 0) > (ON.luc || 0) + 5000) {
        var h = hoiDau('<p>🔄 Trên lớp có bản bài <b>mới hơn</b> (lưu lúc ' + gio(r.t, true) + "), có thể nhóm đã làm ở máy khác.</p>" +
          '<button class="btn chinh" data-mo>Mở bản trên lớp</button> <button class="btn nho" data-giu>Giữ bản trên máy này</button>');
        h.querySelector("[data-mo]").onclick = function () { moBai(r, ON.buoi, ON.cid, ON.ten); };
        h.querySelector("[data-giu]").onclick = function () { hoiDau(""); luuLop(true); };
      }
    }).catch(function () {});
  }

  /* ================= 2. ĐÁNH GIÁ CHÉO (Bước 5) ================= */
  hop.innerHTML = '<div class="the tt" data-loai="lam"><h3>Sản phẩm trên lớp và đánh giá chéo</h3><div id="tt-noi"></div></div>';
  var $ = function (s) { return hop.querySelector(s); };
  var peers = [], moCham = false, dangTai = false, hen = null, nghe = [], nhap = {};

  function veKhung() {
    if (!ON) { $("#tt-noi").innerHTML = '<p style="margin:0">Nhóm em chưa <b>vào lớp</b>. Ở <b>đầu trang</b>, ghi Tên nhóm, nhập Mã buổi rồi bấm <b>Vào lớp</b>. Bài của nhóm sẽ tự lưu lên lớp; khi thầy cô mở đánh giá chéo, các nhóm chấm sản phẩm của nhau ở đây.</p>'; return; }
    $("#tt-noi").innerHTML = '<p style="margin-top:0">Sản phẩm của nhóm tự cập nhật lên lớp mỗi phút. Sửa xong muốn nhóm bạn thấy ngay thì bấm <button class="btn nho" id="tt-luu">💾 Lưu ngay</button></p>' +
      '<div id="tt-gv" hidden></div><div id="tt-cham"></div><div id="tt-nhan"></div>';
    $("#tt-luu").onclick = function () { luuLop(true); };
    veCham();
  }

  function taiTrangThai() {
    if (!ON || choXacNhan) return;
    API.getStatus(BAI, ON.buoi, ON.cid).then(function (st) {
      var mo = !!st.rev["ban." + TASK];
      veNhan((st.ban[TASK] || {}).cm || [], st.nx || {});
      if (mo !== moCham || (mo && !peers.length)) { moCham = mo; if (mo) taiBan(); else veCham(); }
    }).catch(function () {});
  }
  function taiBan() {
    if (dangTai || !ON) return; dangTai = true;
    API.getPeers(BAI, ON.buoi, TASK, ON.cid).then(function (L) { peers = L; veCham(); })
      .catch(function (e) { if (/chưa mở/i.test(e.message)) { moCham = false; peers = []; veCham(); } })
      .then(function () { dangTai = false; });
  }

  function veCham() {
    var o = $("#tt-cham"); if (!o) return;
    if (!moCham) { o.innerHTML = '<div class="tt-cho">⏳ Chờ thầy cô mở <b>đánh giá chéo</b>.</div>'; return; }
    var ban = peers.filter(function (p) { return !p.mine; });
    var da = ban.filter(function (p) { return p.cm.some(function (c) { return c.mine && giaiMa(c.t); }); }).length;
    if (!ban.length) { o.innerHTML = '<div class="tt-cho">Đánh giá chéo đã mở, nhưng chưa có nhóm nào khác lưu sản phẩm lên lớp. <button class="btn nho" id="tt-tai">↻ Tải lại</button></div>'; $("#tt-tai").onclick = taiBan; return; }
    var h = '<div class="tt-dau"><h4>🔄 Chấm sản phẩm của các nhóm bạn</h4><span class="tt-dem">Đã chấm <b>' + da + "/" + ban.length + "</b> nhóm</span>" +
      '<button class="btn nho" id="tt-tai">↻ Tải lại</button></div>' +
      '<p class="goi-y" style="margin-top:0">Xem sản phẩm (hoặc đến xem màn hình của nhóm bạn), chọn mức cho từng tiêu chí, viết một lời khen và một góp ý, rồi bấm Gửi. Gửi lại được để sửa.</p>';
    ban.forEach(function (p) {
      var cu = null; p.cm.forEach(function (c) { if (c.mine) cu = giaiMa(c.t); });
      var n = nhap[p.cid] || (nhap[p.cid] = cu ? { m: cu.m.slice(), chu: cu.chu } : { m: [], chu: "" });
      var a = (p.data.ans && p.data.ans[TASK]) || {};
      h += '<details class="tt-ban' + (cu ? " xong" : "") + '" data-cid="' + esc(p.cid) + '"' + (cu ? "" : " open") + "><summary><b>" + esc(p.group || "Nhóm ?") + "</b>" +
        (a.lop ? ' <span class="goi-y">' + esc(a.lop) + "</span>" : "") +
        '<span class="tt-nhan">' + (cu ? "✓ Đã chấm " + so(cu.d) + "/10" : "Chưa chấm") + "</span></summary>" +
        '<div class="tt-sp"><div class="tt-sp-dau">Sản phẩm: đạt ' + (a.tc ? a.tc.length : "?") + "/" + (a.ntc || D.tieuChi.length) + " tiêu chí máy kiểm tra" +
        (a.tl && a.tl["tc-nhom"] ? " · Tiêu chí riêng: “" + esc(a.tl["tc-nhom"]) + "”" + (a.tcn ? " ✓" : "") : "") + "</div>" +
        '<button class="btn nho" data-xem>👁 Xem sản phẩm</button><div class="tt-khung" hidden></div></div>' +
        '<table class="tt-rub"><tbody>' + R.map(function (r, i) {
          return "<tr><th>" + r[0] + "</th>" + [1, 2, 3].map(function (mu) {
            return '<td><button data-m="' + i + "," + mu + '" class="' + (n.m[i] === mu ? "chon" : "") + '"><b>Mức ' + mu + "</b><span>" + r[mu] + "</span></button></td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table>" +
        '<label class="tt-nx">Nhận xét: một điều em thích và một điều nên cải thiện<textarea maxlength="260" data-chu placeholder="VD: Thích: … Nên: …">' + esc(n.chu) + "</textarea></label>" +
        '<div class="tt-hang"><span class="tt-diem" data-diem>' + (n.m.filter(Boolean).length === NR ? so(diem10(n.m)) + "/10" : "Chọn đủ " + NR + " tiêu chí") + '</span><button class="btn chinh" data-gui>Gửi đánh giá</button></div></details>';
    });
    o.innerHTML = h;
    $("#tt-tai").onclick = taiBan;
  }

  hop.addEventListener("click", function (e) {
    var ct = e.target.closest(".tt-ban"); if (!ct) return;
    var id = ct.dataset.cid, n = nhap[id], p = peers.filter(function (x) { return x.cid === id; })[0];
    var b = e.target.closest("[data-m]");
    if (b) {
      var v = b.dataset.m.split(","); n.m[+v[0]] = +v[1];
      ct.querySelectorAll('[data-m^="' + v[0] + ',"]').forEach(function (x) { x.classList.toggle("chon", x === b); });
      ct.querySelector("[data-diem]").textContent = n.m.filter(Boolean).length === NR ? so(diem10(n.m)) + "/10" : "Chọn đủ " + NR + " tiêu chí";
      return;
    }
    if (e.target.closest("[data-xem]")) {
      var k = ct.querySelector(".tt-khung"); k.hidden = !k.hidden;
      if (!k.hidden && !k.firstChild) {
        var a = (p.data.ans && p.data.ans[TASK]) || {}, f = document.createElement("iframe");
        f.setAttribute("sandbox", ""); f.title = "Sản phẩm của " + (p.group || "nhóm bạn");
        f.srcdoc = '<!doctype html><meta charset="utf-8"><style>body{font:14px/1.5 system-ui,sans-serif;margin:8px;color:#0f172a}table{border-collapse:collapse}td,th{border:1px solid #cbd5e1;padding:3px 6px}img{max-width:100%}</style>' + (a.sp || "<p><i>Chưa xem trước được: hãy đến xem màn hình của nhóm bạn.</i></p>");
        k.appendChild(f);
      }
      return;
    }
    if (e.target.closest("[data-gui]")) {
      n.chu = ct.querySelector("[data-chu]").value;
      if (n.m.filter(Boolean).length < NR) { bao("Chọn mức cho đủ " + NR + " tiêu chí."); return; }
      if (n.chu.trim().length < 10) { bao("Viết nhận xét ít nhất một câu (khen và góp ý)."); ct.querySelector("[data-chu]").focus(); return; }
      var nut = e.target.closest("[data-gui]"); nut.disabled = true;
      API.react({ bai: BAI, buoi: ON.buoi, task: TASK, clientId: ON.cid, group: ON.ten, to: id, toGroup: p.group, text: maHoa(n.m, n.chu) })
        .then(function () {
          bao("✓ Đã gửi đánh giá cho " + (p.group || "nhóm bạn") + ".");
          p.cm = p.cm.filter(function (c) { return !c.mine; }).concat([{ g: ON.ten, t: maHoa(n.m, n.chu), mine: true }]);
          veCham();
        })
        .catch(function (er) { bao(/chưa mở/i.test(er.message) ? "Thầy cô đã đóng đánh giá chéo." : "Chưa gửi được: " + er.message); nut.disabled = false; if (/chưa mở/i.test(er.message)) taiTrangThai(); });
    }
  });
  hop.addEventListener("input", function (e) {
    var ct = e.target.closest(".tt-ban"); if (ct && e.target.matches("[data-chu]")) nhap[ct.dataset.cid].chu = e.target.value;
  });

  function veNhan(cm, nx) {
    var o = $("#tt-nhan"), gv = $("#tt-gv"); if (!o) return;
    var dgv = nx && nx.diemgv;
    if (dgv) {
      var k = /^([\d.,]*)\|([\s\S]*)$/.exec(dgv);
      gv.hidden = false;
      gv.innerHTML = '<div class="tt-gv">👩‍🏫 <b>Thầy cô chấm:</b> ' + (k ? (k[1] ? "<b class='tt-so'>" + esc(so(k[1])) + "/10</b> " : "") + esc(k[2]) : esc(dgv)) + "</div>";
    } else gv.hidden = true;
    var ds = cm.map(function (c) { var x = giaiMa(c.t); return x ? { g: c.g, d: x.d, m: x.m, chu: x.chu } : { g: c.g, chu: c.t }; });
    var co = ds.filter(function (x) { return x.d != null; });
    if (!ds.length) { o.innerHTML = moCham ? '<p class="goi-y">Chưa có nhóm bạn nào chấm sản phẩm của nhóm em.</p>' : ""; return; }
    var tb = co.length ? Math.round(co.reduce(function (s, x) { return s + x.d; }, 0) / co.length * 10) / 10 : null;
    var h = '<div class="tt-dau"><h4>📬 Nhóm bạn chấm sản phẩm của nhóm em</h4>' + (tb != null ? '<span class="tt-dem">Trung bình <b class="tt-so">' + so(tb) + "/10</b> từ " + co.length + " nhóm</span>" : "") + "</div>";
    if (co.length) h += '<table class="tt-tk"><thead><tr><th>Tiêu chí</th><th>Mức trung bình</th></tr></thead><tbody>' + R.map(function (r, i) {
      var v = co.filter(function (x) { return x.m[i]; }), t = v.reduce(function (s, x) { return s + x.m[i]; }, 0) / (v.length || 1);
      return "<tr><td>" + r[0] + '</td><td><span class="tt-thanh"><i style="width:' + Math.round(t / 3 * 100) + '%"></i></span> ' + so(Math.round(t * 10) / 10) + "/3</td></tr>";
    }).join("") + "</tbody></table>";
    h += '<ul class="tt-ds">' + ds.map(function (x) { return "<li><b>" + esc(x.g || "Nhóm bạn") + (x.d != null ? " · " + so(x.d) + "/10" : "") + ":</b> " + esc(x.chu) + "</li>"; }).join("") + "</ul>";
    o.innerHTML = h;
  }

  function batDauLop() {
    clearInterval(hen); nghe.forEach(function (x) { x.close(); }); nghe = []; peers = []; moCham = false;
    veKhung();
    if (!ON) return;
    taiTrangThai();
    hen = setInterval(function () { if (!document.hidden) { taiTrangThai(); if (moCham) taiBan(); } }, 12000);
    if (T && T.on) {
      nghe.push(T.listen(T.path(BAI, ON.buoi, "rev"), function () { taiTrangThai(); }));
      nghe.push(T.listen(T.path(BAI, ON.buoi, "hs/" + ON.cid), function () { taiTrangThai(); }));
    }
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden && ON) taiTrangThai(); });

  /* ---------- khởi động ---------- */
  try {
    var vm = sessionStorage.getItem("stem-vua-mo"), tb = sessionStorage.getItem("stem-thong-bao");
    sessionStorage.removeItem("stem-vua-mo"); sessionStorage.removeItem("stem-thong-bao");
    if (vm) setTimeout(function () { bao("📂 Đã mở bài của nhóm (lưu lúc " + vm + "). Làm tiếp nhé!"); }, 300);
    if (tb) setTimeout(function () { bao(tb); }, 300);
  } catch (e) {}
  if (ON) chuKy = ON.luc && !ON.chuaLuu ? JSON.stringify(banSao()) : "";   // đã lưu hết: bài trên máy trùng bản trên lớp
  veDau(); batDauLop(); kiemTraKhiMo();
  setInterval(kiemTraThayDoi, 15000);
})();
