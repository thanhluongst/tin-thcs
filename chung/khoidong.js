/* KHỞI ĐỘNG BẰNG HÌNH — cảnh minh hoạ động + thẻ lật + đoán nhanh.
   KhoiDong(box, tuỳ chọn)
     nen:   "troi" | "dem" | "cay" | "cam" | "tim" | "bien"  — nền sân khấu (mặc định "troi")
     canh:  ["👧","💬","👦"] — các hình lớn trên sân khấu (bấm vào thì nhảy lên)
     trang: "⭐☁️"           — hình nhỏ trôi lơ lửng phía sau (tuỳ chọn)
     title: dòng chữ trên sân khấu
     the:   [[emoji, nhãn, lời giải thích], …] — thẻ lật: mặt trước hình + nhãn, mặt sau lời giải thích
     doan:  {q, o:[…], d: chỉ số đáp án đúng, g: lời giải thích}  — hiện sau khi lật hết thẻ (tuỳ chọn)
     hoi:   câu hỏi gợi mở cuối cùng (tuỳ chọn)
   Không lưu bài làm. */
(function(){
"use strict";
var CSS = ".kdg{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin:10px 0;background:var(--surface,#fff);min-width:0}"
 + ".kdg .kd-stage{position:relative;overflow:hidden;padding:18px 12px 14px;text-align:center;color:#13212b;min-height:150px}"
 + ".kdg .kd-n-troi{background:linear-gradient(180deg,#bfe6ff 0%,#e6f6ff 70%,#d6f5d6 100%)}"
 + ".kdg .kd-n-dem{background:linear-gradient(180deg,#1e2a5a 0%,#35407a 60%,#5b4f96 100%);color:#fff}"
 + ".kdg .kd-n-cay{background:linear-gradient(180deg,#d9f7c9 0%,#f1fbe7 60%,#bfe9a8 100%)}"
 + ".kdg .kd-n-cam{background:linear-gradient(180deg,#ffe2b8 0%,#fff3df 65%,#ffd7c2 100%)}"
 + ".kdg .kd-n-tim{background:linear-gradient(180deg,#e7dcff 0%,#f6f0ff 65%,#ffdff0 100%)}"
 + ".kdg .kd-n-bien{background:linear-gradient(180deg,#c7f2f0 0%,#eafbfa 60%,#b8e3f7 100%)}"
 + ".kdg .kd-deco{position:absolute;inset:0;pointer-events:none}"
 + ".kdg .kd-deco span{position:absolute;font-size:22px;opacity:.55;animation:kdTroi 9s ease-in-out infinite}"
 + ".kdg .kd-title{position:relative;display:inline-block;font-weight:800;font-size:clamp(16px,2.6vw,21px);padding:5px 14px;border-radius:999px;background:rgba(255,255,255,.78);color:#13212b;box-shadow:0 2px 8px rgba(0,0,0,.08)}"
 + ".kdg .kd-hero{position:relative;display:flex;justify-content:center;align-items:flex-end;flex-wrap:wrap;gap:clamp(6px,2vw,22px);margin-top:12px}"
 + ".kdg .kd-hero button{font:inherit;border:0;background:none;cursor:pointer;padding:0;line-height:1;font-size:clamp(40px,8vw,68px);animation:kdNoi 3.2s ease-in-out infinite;filter:drop-shadow(0 4px 4px rgba(0,0,0,.18))}"
 + ".kdg .kd-hero button.kd-nho{font-size:clamp(26px,5vw,40px);align-self:center}"
 + ".kdg .kd-hero button.kd-jump{animation:kdNhay .6s ease-out}"
 + ".kdg .kd-hint{position:relative;font-size:13px;margin-top:8px;opacity:.8}"
 + ".kdg .kd-body{padding:12px;display:grid;gap:10px}"
 + ".kdg .kd-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;font-size:14px}"
 + ".kdg .kd-dots{display:flex;gap:5px}.kdg .kd-dots i{width:11px;height:11px;border-radius:50%;background:var(--line);transition:background .3s,transform .3s}"
 + ".kdg .kd-dots i.on{background:var(--accent,#00877d);transform:scale(1.2)}"
 + ".kdg .kd-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}"
 + ".kdg .kd-card{font:inherit;color:inherit;border:0;padding:0;background:none;cursor:pointer;perspective:900px;min-height:150px;text-align:center}"
 + ".kdg .kd-in{position:relative;width:100%;height:100%;min-height:150px;transition:transform .6s cubic-bezier(.3,1.4,.5,1);transform-style:preserve-3d}"
 + ".kdg .kd-card.lat .kd-in{transform:rotateY(180deg)}"
 + ".kdg .kd-f,.kdg .kd-b{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px;box-sizing:border-box}"
 + ".kdg .kd-f{background:var(--sunk);border:2px solid var(--line);box-shadow:0 3px 0 var(--line)}"
 + ".kdg .kd-card:hover .kd-f{border-color:var(--accent,#00877d);transform:translateY(-2px)}"
 + ".kdg .kd-f .kd-e{font-size:46px;line-height:1;transition:transform .3s}.kdg .kd-card:hover .kd-e{transform:scale(1.15) rotate(-6deg)}"
 + ".kdg .kd-f .kd-l{font-weight:700;font-size:14.5px;line-height:1.25}"
 + ".kdg .kd-f .kd-q{position:absolute;top:6px;right:8px;font-size:12px;font-weight:700;color:var(--accent,#00877d);opacity:.85}"
 + ".kdg .kd-b{transform:rotateY(180deg);background:var(--accent-soft,#d8f0ed);border:2px solid var(--accent,#00877d);font-size:14px;line-height:1.4}"
 + ".kdg .kd-b .kd-e{font-size:24px;line-height:1}"
 + ".kdg .kd-card:focus-visible{outline:3px solid var(--accent,#00877d);outline-offset:3px;border-radius:12px}"
 + ".kdg .kd-doan{display:none;border:2px dashed var(--accent,#00877d);border-radius:12px;padding:12px;background:var(--surface,#fff);animation:kdHien .5s ease-out}"
 + ".kdg .kd-doan.mo{display:grid;gap:8px}.kdg .kd-doan .kd-dq{font-weight:700}"
 + ".kdg .kd-opts{display:flex;flex-wrap:wrap;gap:8px}"
 + ".kdg .kd-opts button{font:inherit;font-size:14.5px;font-weight:600;border:1.5px solid var(--line);background:var(--sunk);color:inherit;border-radius:10px;padding:7px 14px;cursor:pointer;transition:transform .15s}"
 + ".kdg .kd-opts button:hover{transform:translateY(-2px);border-color:var(--accent,#00877d)}"
 + ".kdg .kd-opts button.dung{background:#dff5e8;border-color:#1c7c54;color:#14583c}.kdg .kd-opts button.sai{background:#fdecea;border-color:#c0392b;color:#8e2a20;animation:kdLac .4s}"
 + ".kdg .kd-g{font-size:14px}.kdg .kd-g.ok{color:#1c7c54;font-weight:600}"
 + ".kdg .kd-hoi{font-size:15px;padding:10px 12px;border-radius:10px;background:var(--sunk);border-left:4px solid var(--accent,#00877d)}"
 + ".kdg .kd-bar button{font:inherit;font-size:13px;border:1px solid var(--line);background:none;color:inherit;border-radius:8px;padding:4px 10px;cursor:pointer}"
 + ".kd-boom{position:fixed;z-index:9999;pointer-events:none;font-size:26px;animation:kdBay 1.3s ease-out forwards}"
 + "@keyframes kdNoi{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}"
 + "@keyframes kdNhay{0%{transform:translateY(0) scale(1)}35%{transform:translateY(-26px) scale(1.15) rotate(-8deg)}70%{transform:translateY(0) scale(.95)}100%{transform:none}}"
 + "@keyframes kdTroi{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-12px)}}"
 + "@keyframes kdHien{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}"
 + "@keyframes kdLac{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}"
 + "@keyframes kdBay{0%{opacity:1;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.2) rotate(var(--r))}}"
 + "@media (max-width:480px){.kdg .kd-f .kd-e{font-size:38px}.kdg .kd-b{font-size:13px;padding:8px}.kdg .kd-card,.kdg .kd-in{min-height:140px}}"
 + "@media (prefers-reduced-motion:reduce){.kdg *,.kd-boom{animation:none!important;transition:none!important}}";
function addCss(){ if (document.getElementById("khoidong-css")) return; var s = document.createElement("style"); s.id = "khoidong-css"; s.textContent = CSS; document.head.appendChild(s); }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function chars(s){ return Array.isArray(s) ? s : Array.from(String(s || "")).filter(function(c){ return c.trim() && c !== "️" && c !== "‍"; }); }
function boom(el, list){
  if (window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  for (var i = 0; i < 16; i++) {
    var s = document.createElement("span"); s.className = "kd-boom"; s.textContent = list[i % list.length];
    var a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 140;
    s.style.left = cx + "px"; s.style.top = cy + "px";
    s.style.setProperty("--dx", Math.cos(a) * d + "px"); s.style.setProperty("--dy", Math.sin(a) * d - 60 + "px"); s.style.setProperty("--r", (Math.random() * 360 - 180) + "deg");
    document.body.appendChild(s); setTimeout(function(n){ return function(){ n.remove(); }; }(s), 1400);
  }
}
window.KhoiDong = function(box, o){
  addCss(); o = o || {};
  var the = o.the || [], hero = o.canh || [], deco = chars(o.trang);
  var h = '<div class="kdg"><div class="kd-stage kd-n-' + esc(o.nen || "troi") + '"><div class="kd-deco">';
  for (var i = 0; i < Math.min(deco.length * 2, 10); i++)
    h += '<span style="left:' + ((i * 37 + 7) % 92) + '%;top:' + ((i * 53 + 11) % 70) + '%;animation-delay:-' + (i * 1.3) + 's">' + esc(deco[i % deco.length]) + '</span>';
  h += '</div>' + (o.title ? '<div class="kd-title">' + esc(o.title) + '</div>' : '') + '<div class="kd-hero">';
  hero.forEach(function(e, k){
    var nho = /^(➡️|⬅️|↔️|💬|➕|=|→|⇢|✨|❓|❔|⚡|🔁|＋)$/.test(e);
    h += '<button type="button" class="' + (nho ? 'kd-nho' : '') + '" style="animation-delay:-' + (k * .45) + 's" aria-label="Hình ' + (k + 1) + '">' + esc(e) + '</button>';
  });
  h += '</div><div class="kd-hint">👆 Bấm vào hình trên sân khấu và lật từng thẻ bên dưới để khám phá</div></div>';
  h += '<div class="kd-body"><div class="kd-top"><b>Lật thẻ khám phá</b><span class="kd-dots">';
  the.forEach(function(){ h += '<i></i>'; });
  h += '</span><span class="kd-cnt">0/' + the.length + '</span></div><div class="kd-cards">';
  the.forEach(function(t, k){
    h += '<button type="button" class="kd-card" data-k="' + k + '" aria-pressed="false"><div class="kd-in">'
      + '<div class="kd-f"><span class="kd-q">' + (k + 1) + '</span><span class="kd-e">' + esc(t[0]) + '</span><span class="kd-l">' + esc(t[1]) + '</span></div>'
      + '<div class="kd-b"><span class="kd-e">' + esc(t[0]) + '</span><span>' + t[2] + '</span></div></div></button>';
  });
  h += '</div>';
  if (o.doan) {
    h += '<div class="kd-doan"><div class="kd-dq">🎯 Đoán nhanh: ' + esc(o.doan.q) + '</div><div class="kd-opts">';
    o.doan.o.forEach(function(x, k){ h += '<button type="button" data-o="' + k + '">' + esc(x) + '</button>'; });
    h += '</div><div class="kd-g" aria-live="polite"></div></div>';
  }
  if (o.hoi) h += '<div class="kd-hoi" hidden>💡 ' + o.hoi + '</div>';
  h += '<div class="kd-bar"><button type="button" class="kd-reset">↺ Úp lại tất cả thẻ</button></div></div></div>';
  box.innerHTML = h;
  var root = box.firstChild, seen = {}, n = 0, done = false;
  var emo = the.map(function(t){ return t[0]; }).concat(hero.filter(function(e){ return e.length <= 4; }));
  if (!emo.length) emo = ["⭐"];
  root.querySelectorAll(".kd-hero button").forEach(function(b){
    b.addEventListener("click", function(){ b.classList.remove("kd-jump"); void b.offsetWidth; b.classList.add("kd-jump"); });
    b.addEventListener("animationend", function(e){ if (e.animationName === "kdNhay") b.classList.remove("kd-jump"); });
  });
  var dots = root.querySelectorAll(".kd-dots i"), cnt = root.querySelector(".kd-cnt"), dv = root.querySelector(".kd-doan"), hoi = root.querySelector(".kd-hoi");
  function upd(){
    dots.forEach(function(d, k){ d.classList.toggle("on", !!seen[k]); });
    cnt.textContent = n + "/" + the.length;
    if (n === the.length && the.length && !done) {
      done = true;
      boom(cnt, emo);
      if (dv) dv.classList.add("mo"); else if (hoi) hoi.hidden = false;
    }
  }
  root.querySelectorAll(".kd-card").forEach(function(c){
    c.addEventListener("click", function(){
      var k = +c.dataset.k, on = !c.classList.contains("lat");
      c.classList.toggle("lat", on); c.setAttribute("aria-pressed", on);
      if (on && !seen[k]) { seen[k] = 1; n++; upd(); }
    });
  });
  if (dv) dv.querySelectorAll(".kd-opts button").forEach(function(b){
    b.addEventListener("click", function(){
      var g = dv.querySelector(".kd-g"), k = +b.dataset.o;
      if (k === o.doan.d) {
        dv.querySelectorAll(".kd-opts button").forEach(function(x){ x.disabled = true; });
        b.classList.add("dung"); g.className = "kd-g ok"; g.innerHTML = "🎉 Chính xác! " + (o.doan.g || "");
        boom(b, ["🎉", "⭐", "✨", "👏"]); if (hoi) hoi.hidden = false;
      } else { b.classList.remove("sai"); void b.offsetWidth; b.classList.add("sai"); g.className = "kd-g"; g.textContent = "Chưa đúng, em thử lại nhé!"; }
    });
  });
  root.querySelector(".kd-reset").addEventListener("click", function(){
    root.querySelectorAll(".kd-card").forEach(function(c){ c.classList.remove("lat"); c.setAttribute("aria-pressed", "false"); });
  });
};
})();
