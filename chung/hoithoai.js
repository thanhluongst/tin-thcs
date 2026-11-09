/* HỘI THOẠI DẠNG CHAT — tự đổi các đoạn hội thoại An – Minh – Khoa thành khung trò chuyện.
   Tự nhận: <div class="reading"> gồm các dòng cách nhau bằng <br>, mỗi dòng bắt đầu <b>Tên:</b>
   (tên trong NV dưới đây, ít nhất 2 lượt nói). Dòng không có tên = lời dẫn chuyện.
   Học sinh bấm "Tiếp" để hiện từng tin nhắn (có hiệu ứng đang gõ) hoặc "Hiện tất cả".
   Tắt trên một trang: window.HOI_THOAI_TAT = true; */
(function(){
"use strict";
if (window.HOI_THOAI_TAT) return;
var NV = {
  "An":   {e: "👧", c: "#e85d9a"},
  "Minh": {e: "👦", c: "#2f7fd8"},
  "Khoa": {e: "🧑", c: "#1f9d6b"}
};
var CSS = ".hthc{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--surface,#fff);margin:6px 0}"
 + ".hthc .ht-head{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--accent,#00877d);color:var(--accent-ink,#fff);font-weight:700;font-size:14.5px}"
 + ".hthc .ht-av3{display:flex}.hthc .ht-av3 span{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:17px;background:#fff;border:2px solid var(--accent,#00877d);margin-left:-6px}.hthc .ht-av3 span:first-child{margin-left:0}"
 + ".hthc .ht-on{margin-left:auto;font-size:12px;font-weight:600;opacity:.9}.hthc .ht-on::before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;background:#7CFC9A;margin-right:5px}"
 + ".hthc .ht-list{display:flex;flex-direction:column;gap:10px;padding:14px 12px;background:var(--sunk);min-height:90px;max-height:520px;overflow-y:auto;scroll-behavior:smooth}"
 + ".hthc .ht-msg{display:flex;gap:8px;align-items:flex-end;max-width:88%;animation:htVao .35s ease-out}"
 + ".hthc .ht-msg.r{align-self:flex-end;flex-direction:row-reverse}"
 + ".hthc .ht-av{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:23px;background:var(--surface,#fff);border:2px solid var(--c)}"
 + ".hthc .ht-bub{background:var(--surface,#fff);border:1.5px solid var(--c);border-radius:16px 16px 16px 4px;padding:7px 12px;line-height:1.5;box-shadow:0 1px 2px rgba(0,0,0,.06)}"
 + ".hthc .ht-msg.r .ht-bub{border-radius:16px 16px 4px 16px;background:color-mix(in srgb,var(--c) 12%,var(--surface,#fff))}"
 + ".hthc .ht-name{display:block;font-size:12.5px;font-weight:800;color:var(--c);margin-bottom:1px}"
 + ".hthc .ht-msg.r .ht-name{text-align:right}"
 + ".hthc .ht-dan{align-self:center;max-width:92%;text-align:center;font-size:13.5px;font-style:italic;opacity:.85;background:var(--surface,#fff);border:1px dashed var(--line);border-radius:999px;padding:4px 14px;animation:htVao .35s ease-out}"
 + ".hthc .ht-typ .ht-bub{display:flex;gap:4px;padding:12px 14px}.hthc .ht-typ i{width:7px;height:7px;border-radius:50%;background:var(--c);opacity:.5;animation:htCham 1s infinite}"
 + ".hthc .ht-typ i:nth-child(2){animation-delay:.15s}.hthc .ht-typ i:nth-child(3){animation-delay:.3s}"
 + ".hthc .ht-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 12px;border-top:1px solid var(--line)}"
 + ".hthc .ht-bar button{font:inherit;font-size:14px;font-weight:600;border:1px solid var(--line);background:none;color:inherit;border-radius:999px;padding:5px 14px;cursor:pointer}"
 + ".hthc .ht-bar button.ht-next{background:var(--accent,#00877d);border-color:var(--accent,#00877d);color:var(--accent-ink,#fff);animation:htNhip 1.6s ease-in-out infinite}"
 + ".hthc .ht-bar button:disabled{opacity:.45;cursor:default;animation:none}"
 + ".hthc .ht-cnt{margin-left:auto;font-size:13px;opacity:.75}"
 + "@keyframes htVao{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}"
 + "@keyframes htCham{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}"
 + "@keyframes htNhip{0%,100%{box-shadow:0 0 0 0 rgba(0,135,125,.45)}50%{box-shadow:0 0 0 6px rgba(0,135,125,0)}}"
 + "@media (max-width:480px){.hthc .ht-on{font-size:0}.hthc .ht-on::before{margin:0}.hthc .ht-msg{max-width:96%}.hthc .ht-av{width:32px;height:32px;font-size:19px}}"
 + "@media (prefers-reduced-motion:reduce){.hthc *{animation:none!important}}"
 + "@media print{.hthc{display:none!important}.reading.ht-goc{display:block!important}}";

function parse(html){
  var parts = html.split(/<br\s*\/?>/i), out = [], ten = 0;
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].trim(); if (!p) continue;
    var m = p.match(/^<b>\s*([^<:]{1,12}?)\s*:\s*<\/b>\s*([\s\S]*)$/);
    if (m) { if (!NV[m[1]]) return null; out.push({ai: m[1], t: m[2]}); ten++; }
    else out.push({ai: "", t: p});
  }
  return ten >= 2 ? out : null;
}

function build(rd, ds){
  var ai = [], ben = {};
  ds.forEach(function(d){ if (d.ai && ai.indexOf(d.ai) < 0) { ben[d.ai] = ai.length % 2 ? "r" : ""; ai.push(d.ai); } });
  var box = document.createElement("div"); box.className = "hthc";
  var h = '<div class="ht-head"><span class="ht-av3">';
  ai.forEach(function(a){ h += '<span>' + NV[a].e + '</span>'; });
  h += '</span><span>💬 ' + ai.join(", ") + '</span><span class="ht-on">đang trò chuyện</span></div><div class="ht-list" aria-live="polite"></div>'
    + '<div class="ht-bar"><button type="button" class="ht-next">▶ Tiếp</button><button type="button" class="ht-all">⏩ Hiện tất cả</button>'
    + '<button type="button" class="ht-lai">↺ Xem lại</button><span class="ht-cnt"></span></div>';
  box.innerHTML = h;
  var list = box.querySelector(".ht-list"), bNext = box.querySelector(".ht-next"), cnt = box.querySelector(".ht-cnt");
  var i = 0, busy = null, tong = ds.filter(function(d){ return d.ai; }).length, da = 0;
  function el(d){
    var x = document.createElement("div");
    if (!d.ai) { x.className = "ht-dan"; x.innerHTML = d.t; return x; }
    var n = NV[d.ai]; x.className = "ht-msg " + ben[d.ai]; x.style.setProperty("--c", n.c);
    x.innerHTML = '<span class="ht-av" aria-hidden="true">' + n.e + '</span><div class="ht-bub"><span class="ht-name">' + d.ai + '</span>' + d.t + '</div>';
    return x;
  }
  function cuon(){ list.scrollTop = list.scrollHeight; }
  function upd(){ cnt.textContent = da + "/" + tong + " tin nhắn"; bNext.disabled = i >= ds.length; if (i >= ds.length) bNext.textContent = "✔ Hết hội thoại"; }
  function mot(nhanh){
    if (i >= ds.length) return;
    var d = ds[i++];
    if (!d.ai || nhanh) { list.appendChild(el(d)); if (d.ai) da++; cuon(); if (!d.ai && i < ds.length && !nhanh) mot(); upd(); return; }
    var t = document.createElement("div"); t.className = "ht-msg ht-typ " + ben[d.ai]; t.style.setProperty("--c", NV[d.ai].c);
    t.innerHTML = '<span class="ht-av">' + NV[d.ai].e + '</span><div class="ht-bub"><i></i><i></i><i></i></div>';
    list.appendChild(t); cuon(); bNext.disabled = true;
    busy = setTimeout(function(){ busy = null; t.replaceWith(el(d)); da++; cuon(); upd(); }, Math.min(1100, 350 + d.t.length * 6));
  }
  function xong(){ if (busy) { clearTimeout(busy); busy = null; var t = list.querySelector(".ht-typ"); if (t) t.remove(); i--; } }
  bNext.addEventListener("click", function(){ if (!busy) mot(); });
  box.querySelector(".ht-all").addEventListener("click", function(){ xong(); while (i < ds.length) mot(true); upd(); });
  box.querySelector(".ht-lai").addEventListener("click", function(){ xong(); list.innerHTML = ""; i = 0; da = 0; bNext.textContent = "▶ Tiếp"; mot(); upd(); });
  rd.classList.add("ht-goc"); rd.style.display = "none";
  rd.parentNode.insertBefore(box, rd.nextSibling);
  mot(); upd();
}

function run(){
  if (!document.getElementById("hoithoai-css")) { var s = document.createElement("style"); s.id = "hoithoai-css"; s.textContent = CSS; document.head.appendChild(s); }
  document.querySelectorAll(".reading").forEach(function(rd){
    if (rd.dataset.ht) return; rd.dataset.ht = "1";
    var ds = parse(rd.innerHTML); if (ds) build(rd, ds);
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
