/* CHÚC MỪNG KHI THẦY CÔ KHEN (trang học sinh, học trực tuyến)
   - Pháo giấy bắn từ hai góc dưới, rơi nhẹ khoảng 3 giây (tắt khi máy đặt "giảm chuyển động").
   - Thẻ chúc mừng ở đầu màn hình: tên câu được khen, nút "Xem câu được khen" (cuộn tới câu, câu sáng lên).
   - Tiếng chuông 3 nốt nhẹ (theo nút 🔔 của đồng hồ đếm ngược; trình duyệt chặn âm thanh khi em chưa bấm gì thì bỏ qua).
   Dùng: Khen.celebrate([{id, label, el}], total) */
(function(){
"use strict";
const COLORS = ["#d0186e", "#0c665e", "#f2b705", "#1d4ed8", "#ff7a45", "#22a06b"];
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>';
function store(k){ try { return localStorage.getItem(k); } catch(e) { return null; } }
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function confetti(){
  if (reduce()) return;
  const cv = document.createElement("canvas");
  cv.className = "khen-cv"; cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  const r = window.devicePixelRatio || 1, W = innerWidth, H = innerHeight;
  cv.width = W * r; cv.height = H * r; cv.style.width = W + "px"; cv.style.height = H + "px";
  const g = cv.getContext("2d"); g.scale(r, r);
  const N = Math.min(180, Math.round(W / 6)), P = [];
  for (let i = 0; i < N; i++) {
    const left = i % 2 === 0, a = (left ? -60 : -120) * Math.PI / 180 + (Math.random() - .5) * .9, v = 9 + Math.random() * 9;
    P.push({x: left ? W * .05 : W * .95, y: H + 10, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 1.35, w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * .35, c: COLORS[i % COLORS.length], shape: Math.random() < .25 ? 1 : 0, wob: Math.random() * 6.28});
  }
  const t0 = performance.now();
  (function frame(t){
    const dt = Math.min(2, (t - (frame.last || t)) / 16.7); frame.last = t;
    g.clearRect(0, 0, W, H);
    const life = (t - t0) / 3200;
    P.forEach(p => {
      p.vy += .32 * dt; p.vx *= Math.pow(.985, dt); p.vy *= Math.pow(.985, dt);
      p.x += (p.vx + Math.sin(p.wob += .1 * dt) * .6) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      g.save(); g.globalAlpha = Math.max(0, 1 - Math.max(0, life - .7) / .3); g.translate(p.x, p.y); g.rotate(p.rot); g.fillStyle = p.c;
      if (p.shape) { g.beginPath(); g.arc(0, 0, p.w / 2, 0, 6.28); g.fill(); } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot)));
      g.restore();
    });
    if (life < 1) requestAnimationFrame(frame); else cv.remove();
  })(t0);
}

function chime(){
  if ((store("tm-sound") || "1") === "0") return;
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === "suspended") ac.resume();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const t = ac.currentTime + .05 + i * .11, o = ac.createOscillator(), gn = ac.createGain();
      o.type = "sine"; o.frequency.value = f;
      gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(.18, t + .02); gn.gain.exponentialRampToValueAtTime(.001, t + .7);
      o.connect(gn); gn.connect(ac.destination); o.start(t); o.stop(t + .72);
    });
    setTimeout(() => { try { ac.close(); } catch(e) {} }, 1600);
  } catch(e) {}
}

let toast = null, hideT = null;
function card(list, total){
  if (toast) toast.remove();
  clearTimeout(hideT);
  const one = list.length === 1;
  toast = document.createElement("div");
  toast.className = "khen-toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
  toast.innerHTML = '<div class="khen-medal">' + STAR + "</div>" +
    '<div class="khen-tx"><b>Chúc mừng em! 🎉</b><span>Thầy cô vừa khen ' + (one ? "câu trả lời <q>" + esc(list[0].label) + "</q>" : list.length + " câu trả lời") + " của em.</span>" +
    (total > 1 ? '<span class="khen-total">⭐ Em đã có ' + total + " lời khen trong bài này</span>" : "") + "</div>" +
    '<div class="khen-act"><button class="btn primary" type="button" data-go>Xem câu được khen</button><button class="khen-x" type="button" aria-label="Đóng">✕</button></div>';
  document.body.appendChild(toast);
  const t0 = toast; requestAnimationFrame(() => t0.classList.add("on")); setTimeout(() => t0.classList.add("on"), 60);   /* dự phòng khi trình duyệt chưa vẽ khung */
  const close = () => { if (!toast) return; const t = toast; t.classList.remove("on"); setTimeout(() => t.remove(), 300); toast = null; };
  toast.querySelector(".khen-x").addEventListener("click", close);
  toast.querySelector("[data-go]").addEventListener("click", () => {
    const el = list[0].el; close();
    if (el) { el.scrollIntoView({behavior: reduce() ? "auto" : "smooth", block: "center"}); el.classList.remove("khen-flash"); void el.offsetWidth; el.classList.add("khen-flash"); }
  });
  hideT = setTimeout(close, 9000);
}
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c])); }

window.Khen = {
  STAR,
  celebrate(list, total){
    if (!list || !list.length) return;
    confetti(); chime(); card(list, total || list.length);
    list.forEach(x => { if (x.el) { x.el.classList.remove("khen-new"); void x.el.offsetWidth; x.el.classList.add("khen-new"); } });
  }
};
})();
