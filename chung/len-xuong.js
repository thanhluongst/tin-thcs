/* Nút ↑ lên đầu trang / ↓ xuống cuối trang (góc trái dưới; góc phải dưới đã có nút bút, đồng hồ).
   Chỉ hiện khi trang dài; ↑ hiện khi đã cuộn xuống, ↓ ẩn khi đã gần cuối. Nhúng ở cuối mọi trang. */
(function(){
  if (window.__lenXuong) return; window.__lenXuong = 1;
  var css = ".lx{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:150;display:flex;flex-direction:column;gap:8px}"
    + ".lx button{width:44px;height:44px;border-radius:50%;border:2px solid var(--accent,#0f7a6c);background:var(--surface,#fff);color:var(--accent,#0f7a6c);"
    + "font:700 20px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.18);display:grid;place-items:center;padding:0;"
    + "transition:opacity .2s,transform .2s,visibility .2s}"
    + ".lx button:hover,.lx button:focus-visible{background:var(--accent,#0f7a6c);color:var(--accent-ink,#fff);outline:none}"
    + ".lx button.an{opacity:0;visibility:hidden;transform:translateY(8px);pointer-events:none}"
    + "@media print{.lx{display:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var box = document.createElement("div"); box.className = "lx";
  function nut(txt, nhan){ var b = document.createElement("button"); b.type = "button"; b.textContent = txt; b.title = nhan; b.setAttribute("aria-label", nhan); b.className = "an"; box.appendChild(b); return b; }
  var len = nut("↑", "Lên đầu trang"), xuong = nut("↓", "Xuống cuối trang");
  var em = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function den(y){ window.scrollTo({top: y, behavior: em ? "auto" : "smooth"}); }
  len.onclick = function(){ den(0); };
  xuong.onclick = function(){ den(document.documentElement.scrollHeight); };
  var cho = 0;
  function cap(){
    cho = 0;
    var h = document.documentElement.scrollHeight, v = window.innerHeight, y = window.scrollY || window.pageYOffset;
    var dai = h > v * 1.8;
    len.classList.toggle("an", !(dai && y > v * 0.6));
    xuong.classList.toggle("an", !(dai && h - (y + v) > v * 0.6));
  }
  function hen(){ if (!cho) cho = requestAnimationFrame(cap); }
  function gan(){ document.body.appendChild(box); cap(); }
  if (document.body) gan(); else document.addEventListener("DOMContentLoaded", gan);
  window.addEventListener("scroll", hen, {passive: true});
  window.addEventListener("resize", hen);
  /* nội dung dài ra / ngắn lại (mở mục, đổi tab) */
  if (window.ResizeObserver) new ResizeObserver(hen).observe(document.documentElement);
})();
