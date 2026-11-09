/* MỞ BẰNG TRÌNH DUYỆT — khi trang được mở bên trong ứng dụng (Zalo, Facebook, Messenger, Instagram, TikTok…),
   hiện thanh nhắc ở đầu trang với nút "Mở bằng trình duyệt" (Android: mở Chrome; iPhone: mở Safari nếu được)
   và nút "Sao chép liên kết" + hướng dẫn mở bằng tay.
   Thử trên máy tính: thêm ?mo=1 vào địa chỉ trang. */
(function(){
"use strict";
var ua = navigator.userAgent || "";
var force = /[?&]mo=1\b/.test(location.search);
var APP = [["Zalo", /Zalo/i], ["Facebook", /FBAN|FBAV|FB_IAB|FBIOS/i], ["Messenger", /Messenger/i], ["Instagram", /Instagram/i],
  ["TikTok", /TikTok|musical_ly|BytedanceWebview/i], ["Line", /\bLine\//i], ["WeChat", /MicroMessenger/i], ["ứng dụng", /; wv\)/]];
var app = null;
for (var i = 0; i < APP.length; i++) if (APP[i][1].test(ua)) { app = APP[i][0]; break; }
if (!app && !force) return;
if (!app) app = "ứng dụng";
try { if (sessionStorage.getItem("mo-td-an") === "1" && !force) return; } catch (e) {}
var android = /Android/i.test(ua), ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);

var CSS = ".motd{background:#fff4d6;color:#4a3500;border-bottom:2px solid #f0b429;padding:10px 40px 10px 14px;font-size:15px;line-height:1.45;position:relative;z-index:50}"
 + ".motd .motd-in{max-width:880px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}"
 + ".motd .motd-t{flex:1 1 220px}"
 + ".motd button{font:inherit;font-weight:700;border-radius:999px;padding:8px 16px;cursor:pointer;border:2px solid #c98a00;background:#fff;color:#4a3500}"
 + ".motd .motd-mo{background:#00877d;border-color:#00877d;color:#fff;font-size:16px}"
 + ".motd .motd-x{border:0;background:none;padding:4px 8px;font-size:18px;position:absolute;top:4px;right:4px}"
 + ".motd .motd-hd{flex-basis:100%;display:none;background:#fff;border:1px dashed #c98a00;border-radius:10px;padding:8px 12px;font-size:14px}"
 + ".motd .motd-u{display:block;width:100%;box-sizing:border-box;margin-top:6px;font:inherit;font-size:13.5px;padding:6px 8px;border:1px solid #c98a00;border-radius:8px;background:#fffdf5;color:#333}"
 + ".motd.hd .motd-hd{display:block}.motd .motd-hd b{white-space:nowrap}";
function css(){ var s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); }
function url(){ return location.href.replace(/([?&])mo=1(&|$)/, function(m, a, b){ return b ? a : ""; }).replace(/[?&]$/, ""); }
function copy(t, cb){
  function old(){ var a = document.createElement("textarea"); a.value = t; a.style.cssText = "position:fixed;top:0;left:0;opacity:0"; document.body.appendChild(a); a.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) {} a.remove(); cb(ok); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){ cb(true); }, old); else old();
}
function show(){
  css();
  var bar = document.createElement("div"); bar.className = "motd"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Mở bằng trình duyệt");
  var menu = ios ? "<b>⋯</b> hoặc <b>⬆ Chia sẻ</b>" : "<b>⋮</b>";
  bar.innerHTML = '<div class="motd-in"><span class="motd-t">📱 Em đang xem trang trong <b>' + app + '</b>. Hãy mở bằng <b>trình duyệt</b> (' + (ios ? "Safari" : "Chrome") + ') để nộp bài và dùng đủ tính năng.</span>'
    + '<button type="button" class="motd-mo">🌐 Mở bằng trình duyệt</button><button type="button" class="motd-cp">🔗 Sao chép liên kết</button>'
    + '<div class="motd-hd">Nếu trang chưa mở ra: bấm nút ' + menu + ' ở góc trên bên phải màn hình, chọn <b>Mở bằng trình duyệt</b>'
    + (ios ? ' (hoặc <b>Mở trong Safari</b>)' : '') + '. Hoặc bấm <b>Sao chép liên kết</b> rồi dán vào ' + (ios ? "Safari" : "Chrome") + ':<input class="motd-u" readonly aria-label="Liên kết trang"></div></div>'
    + '<button type="button" class="motd-x" aria-label="Đóng">✕</button>';
  document.body.insertBefore(bar, document.body.firstChild);
  var inp = bar.querySelector(".motd-u"); inp.value = url();
  inp.addEventListener("focus", function(){ inp.select(); });
  bar.querySelector(".motd-mo").addEventListener("click", function(){
    var u = url();
    if (android) {
      var p = u.replace(/^https?:\/\//, "");
      location.href = "intent://" + p + "#Intent;scheme=" + (u.indexOf("http:") === 0 ? "http" : "https") + ";package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(u) + ";end";
    } else if (ios) {
      location.href = "x-safari-" + u;
    }
    setTimeout(function(){ bar.classList.add("hd"); }, android || ios ? 1200 : 0);
  });
  bar.querySelector(".motd-cp").addEventListener("click", function(){
    var b = this;
    copy(url(), function(ok){ b.textContent = ok ? "✔ Đã sao chép" : "Nhấn giữ liên kết bên dưới để sao chép"; bar.classList.add("hd"); if (!ok) { inp.focus(); inp.select(); } setTimeout(function(){ b.textContent = "🔗 Sao chép liên kết"; }, 2500); });
  });
  bar.querySelector(".motd-x").addEventListener("click", function(){ bar.remove(); try { sessionStorage.setItem("mo-td-an", "1"); } catch (e) {} });
}
if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
})();
