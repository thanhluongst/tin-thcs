/* GIÁO VIÊN ĐIỀU KHIỂN BƯỚC (chế độ LAN): thầy cô chiếu tới hoạt động nào thì máy học sinh chỉ thấy tới hoạt động đó.
   - Trang giáo viên: thanh "Điều khiển lớp" — ← → chuyển hoạt động, "Cho HS xem tới đây", bật/tắt "HS theo thầy cô".
   - Trang học sinh: tự chuyển tới hoạt động thầy cô mở; các hoạt động sau bị ẩn; xem lại hoạt động trước được.
   Trạng thái nằm ở máy chủ (/api dieukhien) và được đẩy tức thì qua kênh tin/<bài>/<buổi>/dk. */
(function(){
"use strict";
function ready(f){ if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(f, 0)); else setTimeout(f, 0); }
ready(function(){
  const L = window.LESSON, O = window.Outline && window.Outline.last, T = window.TucThi;
  if (!L || !L.STAGES || !O || !T || !T.on) return;
  const ACTS = []; L.STAGES.forEach(st => st.acts.forEach(a => ACTS.push({id: a.id, code: a.code, title: a.title, stage: st.id})));
  if (!ACTS.length) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const GV = /giaovien\.html$/.test(location.pathname);
  document.head.insertAdjacentHTML("beforeend", `<style>
.dk-an{display:none!important}
#dk-bar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:9990;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;
  max-width:calc(100vw - 24px);background:#0f172a;color:#fff;border-radius:14px;padding:8px 10px;font:14px/1.3 system-ui,"Segoe UI",sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3)}
#dk-bar button{font:inherit;font-weight:700;border:0;border-radius:9px;padding:7px 11px;cursor:pointer;background:#334155;color:#fff}
#dk-bar button.on{background:#16a34a}#dk-bar button.chinh{background:#2563eb}#dk-bar button:disabled{opacity:.4;cursor:default}
#dk-bar .dk-t{padding:0 6px;max-width:42ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#dk-bar .dk-m{font-size:12px;opacity:.75;width:100%;text-align:center}
</style>`);
  const bar = document.createElement("div"); bar.id = "dk-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Điều khiển lớp");

  /* ================= TRANG GIÁO VIÊN ================= */
  if (GV) {
    const ss = k => { try { return sessionStorage.getItem(k) || ""; } catch(e) { return ""; } };
    const ls = k => { try { return localStorage.getItem(k) || ""; } catch(e) { return ""; } };
    let DK = {theo: false, idx: 0};
    bar.innerHTML = `<button type="button" data-k="theo" title="Bật: máy học sinh chỉ thấy tới hoạt động thầy cô mở">HS theo thầy cô: TẮT</button>
      <button type="button" data-k="prev" aria-label="Hoạt động trước">←</button><span class="dk-t"></span><button type="button" data-k="next" aria-label="Hoạt động sau">→</button>
      <button type="button" class="chinh" data-k="here" title="Mở cho học sinh tới hoạt động thầy cô đang xem">📢 Cho HS xem tới đây</button><div class="dk-m"></div>`;
    document.body.appendChild(bar);
    const $ = k => bar.querySelector('[data-k="' + k + '"]'), msg = bar.querySelector(".dk-m");
    function draw(){
      const a = ACTS[DK.idx] || ACTS[0];
      $("theo").textContent = "HS theo thầy cô: " + (DK.theo ? "BẬT" : "TẮT"); $("theo").classList.toggle("on", !!DK.theo);
      bar.querySelector(".dk-t").innerHTML = "<b>" + esc(a.code) + "</b> " + esc(a.title);
      $("prev").disabled = DK.idx <= 0; $("next").disabled = DK.idx >= ACTS.length - 1;
    }
    async function push(ch){
      const pin = ss("gv-pin"), buoi = ls("gv-buoi");
      if (!pin || !buoi) { msg.textContent = "Thầy cô đăng nhập trang giáo viên (mã giáo viên + mã buổi) trước."; return; }
      const nd = Object.assign({}, DK, ch), a = ACTS[nd.idx];
      nd.act = a.id;
      try {
        const r = await fetch("/api", {method: "POST", body: JSON.stringify({action: "dieukhien", bai: L.id, buoi, pin, dk: nd})}).then(r => r.json());
        if (!r.ok) throw new Error(r.error);
        DK = nd; draw(); O.show({type: "act", id: a.id});
        msg.textContent = DK.theo ? "Học sinh đang xem tới " + a.code + " (" + new Date().toLocaleTimeString("vi-VN") + ")" : "Học sinh tự do xem cả bài.";
      } catch(e) { msg.textContent = "Chưa gửi được: " + e.message; }
    }
    $("theo").onclick = () => push({theo: !DK.theo});
    $("prev").onclick = () => push({idx: Math.max(0, DK.idx - 1)});
    $("next").onclick = () => push({idx: Math.min(ACTS.length - 1, DK.idx + 1)});
    $("here").onclick = () => {
      const f = O.current(); let i = f && f.type === "act" ? ACTS.findIndex(a => a.id === f.id) : f && f.type === "stage" ? ACTS.findIndex(a => a.stage === f.id) : -1;
      if (i < 0) { msg.textContent = "Thầy cô bấm chọn một hoạt động ở thanh Tiến trình trước."; return; }
      push({idx: i, theo: true});
    };
    /* phím tắt khi trình chiếu: Alt+→ / Alt+← */
    document.addEventListener("keydown", e => { if (!e.altKey) return; if (e.key === "ArrowRight") $("next").click(); if (e.key === "ArrowLeft") $("prev").click(); });
    const buoi = ls("gv-buoi");
    if (buoi) fetch("/api?" + new URLSearchParams({action: "dk", bai: L.id, buoi})).then(r => r.json()).then(r => { if (r.dk) { DK = Object.assign(DK, r.dk); } draw(); }).catch(draw);
    draw();
    return;
  }

  /* ================= TRANG HỌC SINH ================= */
  const HS = window.LAN_HS; if (!HS || !HS.buoi) return;
  bar.innerHTML = `<span class="dk-t"></span><button type="button" class="chinh">Về hoạt động đang học</button>`;
  bar.hidden = true; document.body.appendChild(bar);
  let cur = null;
  bar.querySelector("button").onclick = () => { if (cur) O.show({type: "act", id: cur.id}); };
  function apply(dk){
    const on = !!(dk && dk.theo), idx = on ? Math.max(0, ACTS.findIndex(a => a.id === dk.act)) : ACTS.length - 1;
    ACTS.forEach((a, i) => {
      const hide = on && i > idx;
      const n = document.getElementById(a.id); if (n) n.classList.toggle("dk-an", hide);
      document.querySelectorAll('[data-act="' + a.id + '"]').forEach(x => x.classList.toggle("dk-an", hide));
    });
    /* ẩn cả bước (giai đoạn) khi mọi hoạt động của nó còn khoá */
    L.STAGES.forEach(st => {
      const lock = on && st.acts.every(a => ACTS.findIndex(x => x.id === a.id) > idx);
      const sec = document.getElementById(st.id); if (sec) sec.classList.toggle("dk-an", lock);
      document.querySelectorAll('[data-stage="' + st.id + '"]').forEach(x => x.classList.toggle("dk-an", lock));
    });
    document.querySelectorAll(".ol-all").forEach(b => b.classList.toggle("dk-an", on));
    if (!on) { bar.hidden = true; cur = null; return; }
    const a = ACTS[idx], moved = !cur || cur.id !== a.id;
    cur = a; bar.hidden = false;
    bar.querySelector(".dk-t").innerHTML = "📽 Thầy cô đang chiếu: <b>" + esc(a.code) + "</b> " + esc(a.title);
    if (moved) O.show({type: "act", id: a.id});
  }
  T.listen(T.path(L.id, HS.buoi, "dk"), v => apply(v));
});
})();
