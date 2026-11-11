/* NỘP SẢN PHẨM VÀ ĐÁNH GIÁ CHÉO – phần trực tuyến của trang dự án STEM.
   Dùng lại máy chủ Apps Script của trang bài học (chung/api.js), không cần sửa Code.gs:
   - Nộp sản phẩm:  API.submit, mã bài "stem-<mã dự án>", câu "duan".
   - Đánh giá chéo: thầy cô mở khoá "ban.duan" ở trang giáo viên; mỗi nhóm chấm từng nhóm bạn theo
     bảng tiêu chí của dự án và viết nhận xét. Điểm được ghi ở đầu lời nhận xét:
       "Điểm 8,3/10 [3-2-3-3-2] lời nhận xét"   (mỗi số là mức 1–3 của một dòng tiêu chí)
   - Thầy cô xem thống kê, chấm điểm, xếp hạng ở stem/giaovien.html. */
(function () {
  var G = window.STEM, API = window.API, T = window.TucThi;
  var hop = document.getElementById("truc-tuyen");
  if (!G || !hop) return;
  if (!API) { hop.innerHTML = ""; return; }
  var D = G.D, S = G.S, esc = G.esc, bao = G.bao;
  var BAI = "stem-" + D.id, TASK = "duan", KHOA_MAY = "stem-may-" + D.id;
  var R = D.rubric, NR = R.length;

  /* Mã máy giữ riêng, không mất khi bấm "Làm lại từ đầu" (nộp lại sẽ ghi đè bài cũ của buổi đó) */
  var cid = "";
  try { cid = localStorage.getItem(KHOA_MAY) || ""; } catch (e) {}
  if (!/^[A-Za-z0-9_.\-]{4,60}$/.test(cid)) { cid = "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); try { localStorage.setItem(KHOA_MAY, cid); } catch (e) {} }
  S.on = S.on || {};   // {buoi, nop: thời điểm nộp, sig}

  /* ---------- mã hoá điểm trong lời nhận xét ---------- */
  function diem10(m) { var t = 0; m.forEach(function (x) { t += x; }); return Math.round(t / (3 * m.length) * 100) / 10; }
  function so(x) { return String(x).replace(".", ","); }
  function maHoa(m, chu) { return ("Điểm " + so(diem10(m)) + "/10 [" + m.join("-") + "] " + chu.trim()).slice(0, 300); }
  function giaiMa(t) {
    var k = /^Điểm\s+[\d,.]+\/10\s+\[([1-3](?:-[1-3])*)\]\s*([\s\S]*)$/.exec(String(t || ""));
    if (!k) return null;
    var m = k[1].split("-").map(Number);
    return { m: m, d: diem10(m), chu: k[2] };
  }
  window.STEM.giaiMa = giaiMa;

  /* ---------- giao diện ---------- */
  hop.innerHTML =
    '<div class="the tt" data-loai="lam"><h3>Nộp sản phẩm và đánh giá chéo</h3>' +
    '<div id="tt-vao"><p style="margin-top:0">Thầy cô cho cả lớp một <b>mã buổi</b>. Nhóm nhập mã rồi nộp sản phẩm lên lớp. Khi thầy cô mở đánh giá chéo, các nhóm sẽ xem và chấm điểm sản phẩm của nhau.</p>' +
    '<div class="tt-hang"><label for="tt-buoi">Mã buổi</label><input id="tt-buoi" maxlength="40" placeholder="VD: 7A1-STEM" autocomplete="off">' +
    '<button class="btn chinh" id="tt-nop">📤 Vào buổi và nộp sản phẩm</button></div></div>' +
    '<div id="tt-trong" hidden>' +
    '<p class="tt-trang" id="tt-trang"></p>' +
    '<div class="tt-hang"><button class="btn chinh" id="tt-nop-lai">📤 Nộp lại sản phẩm mới nhất</button><button class="btn nho" id="tt-roi">Rời buổi</button></div>' +
    '<div id="tt-gv" hidden></div>' +
    '<div id="tt-cham"></div>' +
    '<div id="tt-nhan"></div>' +
    "</div></div>";

  var $ = function (s) { return hop.querySelector(s); };
  var peers = [], moCham = false, dangTai = false, hen = null, nghe = [];
  var nhap = {};   // bản nháp đánh giá chưa gửi: {cid: {m:[], chu:""}}

  function tenNhom() { return String(S.nhom.ten || "").trim(); }
  function goiDuLieu() {
    var tc = D.tieuChi.filter(function (t) { return S.tc[t.k]; }).map(function (t) { return t.k; });
    var tong = 0, du = 0; R.forEach(function (r, i) { if (S.rub[i]) { tong += S.rub[i]; du++; } });
    var tuDanhGia = du === NR ? diem10(R.map(function (r, i) { return S.rub[i]; })) : null;
    var sp = "";
    try { sp = G.baoCao(); } catch (e) {}
    if (sp.length > 30000) sp = sp.slice(0, 30000);
    var tl = {};
    ["b3-lydo", "b3-pa-rieng", "tc-nhom"].forEach(function (k) { if (S.tl[k]) tl[k] = String(S.tl[k]).slice(0, 600); });
    (D.buoc5.hoi || []).forEach(function (q, j) { var k = "b5-" + j; if (S.tl[k]) tl[k] = String(S.tl[k]).slice(0, 600); });
    var ans = { sp: sp, tc: tc, ntc: D.tieuChi.length, tcn: S.tl["tc-nhom"] ? !!S.tcNhom : null, tdg: tuDanhGia, lop: S.nhom.lop || "", tv: S.nhom.tv || "", tl: tl };
    var cols = [
      ["Lớp", S.nhom.lop || ""], ["Thành viên", S.nhom.tv || ""],
      ["Tiêu chí sản phẩm đạt", tc.length + "/" + D.tieuChi.length],
      ["Tiêu chí riêng", (S.tl["tc-nhom"] || "") + (S.tl["tc-nhom"] ? (S.tcNhom ? " ✓" : " ✗") : "")],
      ["Tự đánh giá (thang 10)", tuDanhGia == null ? "" : so(tuDanhGia)]
    ];
    return { data: { sub: { duan: 1 }, ans: { duan: ans } }, cols: cols };
  }

  function nop(buoi) {
    if (!tenNhom()) { bao("Hãy ghi Tên nhóm ở đầu trang trước khi nộp."); var n = document.getElementById("n-ten"); if (n) n.focus(); return Promise.resolve(false); }
    var g = goiDuLieu();
    var nut = $("#tt-nop-lai"), nut2 = $("#tt-nop");
    nut.disabled = nut2.disabled = true;
    return API.submit({ bai: BAI, buoi: buoi, clientId: cid, group: tenNhom(), sub: 1, data: g.data, cols: g.cols })
      .then(function () {
        S.on.buoi = buoi; S.on.nop = Date.now(); G.luu();
        if (T) T.send(T.path(BAI, buoi, "nop"), Date.now());
        bao("✓ Đã nộp sản phẩm lên lớp."); return true;
      })
      .catch(function (e) { bao("Chưa nộp được: " + e.message); return false; })
      .then(function (ok) { nut.disabled = nut2.disabled = false; return ok; });
  }

  $("#tt-nop").addEventListener("click", function () {
    var buoi = API.normSession($("#tt-buoi").value);
    if (!buoi) { bao("Nhập mã buổi thầy cô cho."); $("#tt-buoi").focus(); return; }
    nop(buoi).then(function (ok) { if (ok) vao(); });
  });
  $("#tt-buoi").addEventListener("keydown", function (e) { if (e.key === "Enter") $("#tt-nop").click(); });
  $("#tt-nop-lai").addEventListener("click", function () { nop(S.on.buoi).then(function (ok) { if (ok) { veTrang(); taiTrangThai(); } }); });
  $("#tt-roi").addEventListener("click", function () {
    if (!confirm("Rời buổi " + S.on.buoi + "? Sản phẩm đã nộp vẫn còn trên máy chủ.")) return;
    dung(); S.on = {}; G.luu(); veVao();
  });

  function veVao() { $("#tt-vao").hidden = false; $("#tt-trong").hidden = true; }
  function veTrang() {
    var t = S.on.nop ? new Date(S.on.nop) : null;
    $("#tt-trang").innerHTML = "🌐 Buổi <b>" + esc(S.on.buoi) + "</b> · <b>" + esc(tenNhom() || "Nhóm ?") + "</b>" +
      (t ? " · đã nộp lúc " + ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) : "") +
      '<br><span class="goi-y">Sửa sản phẩm xong thì bấm “Nộp lại” để các nhóm bạn và thầy cô thấy bản mới nhất.</span>';
  }

  /* ---------- trạng thái: thầy cô đã mở đánh giá chưa, nhóm em nhận được gì ---------- */
  function taiTrangThai() {
    if (!S.on.buoi) return;
    API.getStatus(BAI, S.on.buoi, cid).then(function (st) {
      var mo = !!st.rev["ban." + TASK];
      veNhan((st.ban[TASK] || {}).cm || [], st.nx || {});
      if (mo !== moCham || (mo && !peers.length)) { moCham = mo; if (mo) taiBan(); else veCham(); }
    }).catch(function () {});
  }
  function taiBan() {
    if (dangTai) return; dangTai = true;
    API.getPeers(BAI, S.on.buoi, TASK, cid).then(function (L) { peers = L; veCham(); })
      .catch(function (e) { if (/chưa mở/i.test(e.message)) { moCham = false; peers = []; veCham(); } })
      .then(function () { dangTai = false; });
  }

  function veCham() {
    var o = $("#tt-cham");
    if (!moCham) { o.innerHTML = '<div class="tt-cho">⏳ Chờ thầy cô mở <b>đánh giá chéo</b>. Trong lúc chờ, nhóm hoàn thiện sản phẩm và bấm “Nộp lại”.</div>'; return; }
    var ban = peers.filter(function (p) { return !p.mine; });
    var da = ban.filter(function (p) { return p.cm.some(function (c) { return c.mine && giaiMa(c.t); }); }).length;
    if (!ban.length) { o.innerHTML = '<div class="tt-cho">Đánh giá chéo đã mở, nhưng chưa có nhóm nào khác nộp sản phẩm. <button class="btn nho" id="tt-tai">↻ Tải lại</button></div>'; $("#tt-tai").onclick = taiBan; return; }
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
            return '<td><button data-m="' + i + "," + mu + '" class="' + (n.m[i] === mu ? "chon" : "") + '" title="' + esc(r[mu].replace(/<[^>]+>/g, "")) + '"><b>Mức ' + mu + '</b><span>' + r[mu] + "</span></button></td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table>" +
        '<label class="tt-nx">Nhận xét: một điều em thích và một điều nên cải thiện<textarea maxlength="260" data-chu placeholder="VD: Thích: bảng in đen trắng vẫn rõ. Nên: thêm viền cho dòng tổng.">' + esc(n.chu) + "</textarea></label>" +
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
        f.srcdoc = '<!doctype html><meta charset="utf-8"><style>body{font:14px/1.5 system-ui,sans-serif;margin:8px;color:#0f172a}table{border-collapse:collapse}td,th{border:1px solid #cbd5e1;padding:3px 6px}img{max-width:100%}</style>' + (a.sp || "<p><i>Nhóm chưa có sản phẩm.</i></p>");
        k.appendChild(f);
      }
      return;
    }
    if (e.target.closest("[data-gui]")) {
      n.chu = ct.querySelector("[data-chu]").value;
      if (n.m.filter(Boolean).length < NR) { bao("Chọn mức cho đủ " + NR + " tiêu chí."); return; }
      if (n.chu.trim().length < 10) { bao("Viết nhận xét ít nhất một câu (khen và góp ý)."); ct.querySelector("[data-chu]").focus(); return; }
      if (!tenNhom()) { bao("Ghi Tên nhóm ở đầu trang trước."); return; }
      var nut = e.target.closest("[data-gui]"); nut.disabled = true;
      API.react({ bai: BAI, buoi: S.on.buoi, task: TASK, clientId: cid, group: tenNhom(), to: id, toGroup: p.group, text: maHoa(n.m, n.chu) })
        .then(function () {
          bao("✓ Đã gửi đánh giá cho " + (p.group || "nhóm bạn") + ".");
          p.cm = p.cm.filter(function (c) { return !c.mine; }).concat([{ g: tenNhom(), t: maHoa(n.m, n.chu), mine: true }]);
          veCham();
        })
        .catch(function (er) { bao(/chưa mở/i.test(er.message) ? "Thầy cô đã đóng đánh giá chéo." : "Chưa gửi được: " + er.message); nut.disabled = false; if (/chưa mở/i.test(er.message)) taiTrangThai(); });
    }
  });
  hop.addEventListener("input", function (e) {
    var ct = e.target.closest(".tt-ban"); if (ct && e.target.matches("[data-chu]")) nhap[ct.dataset.cid].chu = e.target.value;
  });

  /* ---------- điểm và lời nhận xét nhóm em nhận được ---------- */
  function veNhan(cm, nx) {
    var o = $("#tt-nhan"), ds = cm.map(function (c) { var x = giaiMa(c.t); return x ? { g: c.g, d: x.d, m: x.m, chu: x.chu } : { g: c.g, chu: c.t }; });
    var co = ds.filter(function (x) { return x.d != null; });
    var gv = $("#tt-gv"), dgv = nx && nx.diemgv;
    if (dgv) {
      var k = /^([\d.,]+)\|([\s\S]*)$/.exec(dgv);
      gv.hidden = false;
      gv.innerHTML = '<div class="tt-gv">👩‍🏫 <b>Thầy cô chấm:</b> ' + (k ? "<b class='tt-so'>" + esc(so(k[1])) + "/10</b> " + esc(k[2]) : esc(dgv)) + "</div>";
    } else gv.hidden = true;
    if (!ds.length) { o.innerHTML = moCham ? '<p class="goi-y">Chưa có nhóm bạn nào chấm sản phẩm của nhóm em.</p>' : ""; return; }
    var tb = co.length ? Math.round(co.reduce(function (s, x) { return s + x.d; }, 0) / co.length * 10) / 10 : null;
    var h = '<div class="tt-dau"><h4>📬 Nhóm bạn chấm sản phẩm của nhóm em</h4>' + (tb != null ? '<span class="tt-dem">Trung bình <b class="tt-so">' + so(tb) + "/10</b> từ " + co.length + " nhóm</span>" : "") + "</div>";
    if (co.length) {
      h += '<table class="tt-tk"><thead><tr><th>Tiêu chí</th><th>Mức trung bình</th></tr></thead><tbody>' + R.map(function (r, i) {
        var v = co.filter(function (x) { return x.m[i]; }), t = v.reduce(function (s, x) { return s + x.m[i]; }, 0) / (v.length || 1);
        return "<tr><td>" + r[0] + '</td><td><span class="tt-thanh"><i style="width:' + Math.round(t / 3 * 100) + '%"></i></span> ' + so(Math.round(t * 10) / 10) + "/3</td></tr>";
      }).join("") + "</tbody></table>";
    }
    h += '<ul class="tt-ds">' + ds.map(function (x) { return "<li><b>" + esc(x.g || "Nhóm bạn") + (x.d != null ? " · " + so(x.d) + "/10" : "") + ":</b> " + esc(x.chu) + "</li>"; }).join("") + "</ul>";
    o.innerHTML = h;
  }

  /* ---------- hỏi máy chủ định kì + nhận tin tức thì ---------- */
  function dung() { clearInterval(hen); hen = null; nghe.forEach(function (x) { x.close(); }); nghe = []; peers = []; moCham = false; }
  function vao() {
    dung();
    $("#tt-vao").hidden = true; $("#tt-trong").hidden = false; veTrang(); veCham();
    taiTrangThai();
    hen = setInterval(function () { if (!document.hidden) { taiTrangThai(); if (moCham) taiBan(); } }, 12000);
    if (T && T.on) {
      nghe.push(T.listen(T.path(BAI, S.on.buoi, "rev"), function () { taiTrangThai(); }));
      nghe.push(T.listen(T.path(BAI, S.on.buoi, "hs/" + cid), function () { taiTrangThai(); }));
    }
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden && S.on.buoi) taiTrangThai(); });

  var q = API.normSession(new URLSearchParams(location.search).get("buoi") || "");
  if (q && !S.on.buoi) $("#tt-buoi").value = q;
  if (S.on.buoi) vao(); else veVao();
})();
