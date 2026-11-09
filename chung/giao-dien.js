/* GIAO DIỆN SÁNG / TỐI — trang mặc định giao diện SÁNG (kể cả khi điện thoại bật chế độ tối).
   Đoạn mã nhỏ trong <head> mỗi trang đặt data-theme trước khi hiển thị (đọc lựa chọn đã lưu "giao-dien").
   Tệp này thêm nút "🌙 Giao diện tối / ☀️ Giao diện sáng" vào chân trang; lựa chọn được nhớ trên máy. */
(function(){
"use strict";
var root = document.documentElement;
function meta(t){
  var m = document.querySelector('meta[name="color-scheme"]');
  if (!m) { m = document.createElement("meta"); m.name = "color-scheme"; document.head.appendChild(m); }
  m.content = t === "dark" ? "dark" : "only light";
}
function set(t){
  root.setAttribute("data-theme", t); meta(t);
  try { localStorage.setItem("giao-dien", t); } catch (e) {}
}
if (!root.getAttribute("data-theme")) { var t0 = "light"; try { t0 = localStorage.getItem("giao-dien") || "light"; } catch (e) {} root.setAttribute("data-theme", t0); meta(t0); }
function add(){
  var w = document.querySelector("footer .wrap"); if (!w || w.querySelector(".gd-btn")) return;
  var s = document.createElement("style");
  s.textContent = ".gd-btn{font:inherit;font-size:14px;font-weight:600;border:1px solid var(--line);background:var(--surface,#fff);color:inherit;border-radius:999px;padding:5px 14px;cursor:pointer;margin:8px 0 0;display:inline-block}";
  document.head.appendChild(s);
  var b = document.createElement("button"); b.type = "button"; b.className = "gd-btn";
  function lab(){ b.textContent = root.getAttribute("data-theme") === "dark" ? "☀️ Giao diện sáng" : "🌙 Giao diện tối"; }
  b.addEventListener("click", function(){ set(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); lab(); });
  lab();
  var p = document.createElement("div"); p.appendChild(b); w.appendChild(p);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add); else add();
})();
