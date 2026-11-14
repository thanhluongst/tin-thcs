/* Đăng kí sw.js (ở gốc kho) để trang chạy được khi mạng yếu. Nhúng ở cuối mọi trang. */
(function(){
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  var s = document.currentScript && document.currentScript.src; if (!s) return;
  var url = new URL("../sw.js", s);
  window.addEventListener("load", function(){ navigator.serviceWorker.register(url.href, {scope: new URL("./", url).pathname}).catch(function(){}); });
})();
