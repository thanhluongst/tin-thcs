/* KHOÁ GIÁO VIÊN cho các trang STEM: phần dành cho giáo viên (kế hoạch, lời giải, KHBD) chỉ hiện khi đã nhập mã giáo viên.
   Dùng chung mã với trang giáo viên (sessionStorage "gv-pin"): đã đăng nhập trang giáo viên trong tab này thì tự mở.
   GvKhoa.laGv()      – đã mở khoá chưa
   GvKhoa.mo(cb)      – hỏi mã (hộp nhập ẩn kí tự), kiểm tra với máy chủ rồi gọi cb()
   GvKhoa.khoa()      – khoá lại
   GvKhoa.nghe(fn)    – fn(laGv) mỗi khi trạng thái đổi
   Lưu ý: chỉ ẩn khỏi giao diện học sinh; nội dung vẫn nằm trong mã nguồn trang. */
(function () {
  var KHOA = "gv-pin", ds = [];
  function ss(v) { try { if (v === undefined) return sessionStorage.getItem(KHOA); if (v === null) sessionStorage.removeItem(KHOA); else sessionStorage.setItem(KHOA, v); } catch (e) { return null; } }
  function laGv() { return !!ss(); }
  function bao() { ds.forEach(function (f) { try { f(laGv()); } catch (e) {} }); }

  var CSS = ".gvk-nen{position:fixed;inset:0;z-index:70;background:rgba(15,23,42,.55);display:grid;place-items:center;padding:16px}" +
    ".gvk-hop{background:#fff;border-radius:16px;padding:20px;width:min(360px,100%);box-shadow:0 10px 40px rgba(0,0,0,.3)}" +
    ".gvk-hop h3{margin:0 0 6px}.gvk-hop input{width:100%;border:1px solid #cbd5e1;border-radius:10px;padding:9px 10px;font:inherit;margin:8px 0}" +
    ".gvk-hop .tb{min-height:20px;font-size:14px;color:#dc2626}.gvk-nut{display:flex;gap:8px;justify-content:flex-end;margin-top:6px}" +
    ".gv-mo{background:none;border:0;color:inherit;opacity:.7;font:inherit;cursor:pointer;text-decoration:underline;padding:0 4px}.gv-mo:hover{opacity:1}#khu-gv[hidden]{display:none!important}";
  var st = document.createElement("style"); st.id = "gvk-css"; st.textContent = CSS; document.head.appendChild(st);

  function mo(cb) {
    if (laGv()) { if (cb) cb(); return; }
    if (document.querySelector(".gvk-nen")) return;
    var nen = document.createElement("div"); nen.className = "gvk-nen"; nen.setAttribute("role", "dialog"); nen.setAttribute("aria-modal", "true"); nen.setAttribute("aria-label", "Mở phần dành cho giáo viên");
    nen.innerHTML = '<form class="gvk-hop"><h3>🔒 Dành cho giáo viên</h3><p class="goi-y" style="margin:0">Nhập mã giáo viên (giống mã ở trang giáo viên) để xem kế hoạch dạy học, lời giải và KHBD.</p>' +
      '<input type="password" autocomplete="current-password" aria-label="Mã giáo viên" placeholder="Mã giáo viên"><div class="tb" role="status"></div>' +
      '<div class="gvk-nut"><button type="button" class="btn" data-huy>Huỷ</button><button class="btn chinh">Mở</button></div></form>';
    document.body.appendChild(nen);
    var o = nen.querySelector("input"), tb = nen.querySelector(".tb"), f = nen.querySelector("form");
    function dong() { nen.remove(); document.removeEventListener("keydown", phim); }
    function phim(e) { if (e.key === "Escape") dong(); }
    document.addEventListener("keydown", phim);
    nen.addEventListener("click", function (e) { if (e.target === nen || e.target.closest("[data-huy]")) dong(); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var pin = o.value.trim(); if (!pin) { tb.textContent = "Nhập mã giáo viên."; return; }
      if (!window.API || !API.checkPin) { tb.textContent = "Trang chưa nối được máy chủ."; return; }
      tb.style.color = "#475569"; tb.textContent = "Đang kiểm tra…";
      API.checkPin(pin).then(function () { ss(pin); dong(); bao(); if (cb) cb(); })
        .catch(function (er) { tb.style.color = "#dc2626"; tb.textContent = "❌ " + (er && er.message || "Sai mã."); o.select(); });
    });
    o.focus();
  }
  function khoa() { ss(null); bao(); }
  window.GvKhoa = { laGv: laGv, mo: mo, khoa: khoa, nghe: function (fn) { ds.push(fn); fn(laGv()); } };
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-gv-mo]")) { e.preventDefault(); laGv() ? khoa() : mo(); }
  });
})();
