/* ĐĂNG NHẬP HỌC SINH (chế độ LAN): nhập số căn cước → xác minh đúng họ tên → mới vào lớp.
   Sai tên thì chọn "Không phải em" và nhập lại từ đầu. Đăng nhập lại (kể cả máy khác) vẫn giữ bài đã làm. */
(function(){
"use strict";
const qs = new URLSearchParams(location.search);
const css = `
#lan-dn{position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:16px;font:16px/1.5 system-ui,"Segoe UI",sans-serif}
#lan-dn .hop{background:#fff;color:#0f172a;border-radius:14px;max-width:420px;width:100%;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
#lan-dn h2{margin:0 0 4px;font-size:22px}#lan-dn p{margin:6px 0 14px;color:#475569}
#lan-dn label{display:block;font-weight:600;margin:12px 0 4px}
#lan-dn input{width:100%;box-sizing:border-box;font-size:20px;padding:10px 12px;border:2px solid #cbd5e1;border-radius:10px;letter-spacing:.06em}
#lan-dn input:focus{outline:none;border-color:#2563eb}
#lan-dn button{font:inherit;font-weight:700;border:0;border-radius:10px;padding:12px 16px;cursor:pointer;width:100%;margin-top:14px}
#lan-dn .chinh{background:#2563eb;color:#fff}#lan-dn .phu{background:#e2e8f0;color:#0f172a}
#lan-dn .ten{font-size:24px;font-weight:800;color:#1d4ed8;margin:8px 0 2px}#lan-dn .loi{color:#b91c1c;min-height:1.5em;margin-top:8px}
#lan-the{position:fixed;top:8px;right:8px;z-index:9999;background:#1d4ed8;color:#fff;border-radius:999px;padding:6px 8px 6px 14px;font:14px system-ui,sans-serif;display:flex;gap:10px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.2)}
#lan-the button{font:inherit;border:0;border-radius:999px;padding:4px 10px;cursor:pointer;background:#fff;color:#1d4ed8;font-weight:700}`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
async function post(url, body){
  const r = await fetch(url, {method: "POST", body: JSON.stringify(body)});
  const j = await r.json(); if (!j.ok) throw new Error(j.error || "Lỗi máy chủ"); return j;
}
function lastBuoi(){ try { return localStorage.getItem("lan-buoi") || ""; } catch(e) { return ""; } }

function logout(){ try { localStorage.removeItem("lan-hs"); } catch(e) {} location.reload(); }

/* Đã đăng nhập: thẻ tên + nút Đăng xuất */
if (window.LAN_HS) {
  const v = window.LAN_HS;
  if (qs.get("buoi")) v.buoi = String(qs.get("buoi")).toUpperCase();
  document.addEventListener("DOMContentLoaded", () => {
    const t = document.createElement("div"); t.id = "lan-the";
    t.innerHTML = "👤 " + esc(v.ten) + " – " + esc(v.lop) + " · " + esc(v.buoi || "") + ' <button type="button">Đăng xuất</button>';
    t.querySelector("button").onclick = () => { if (confirm("Đăng xuất? Bài đã làm vẫn được lưu trên máy thầy cô; em đăng nhập lại là làm tiếp.")) logout(); };
    document.body.appendChild(t);
  });
  return;
}

/* Chưa đăng nhập: hộp đăng nhập che trang */
document.addEventListener("DOMContentLoaded", () => {
  const box = document.createElement("div"); box.id = "lan-dn"; document.body.appendChild(box);
  let cccd = "", buoi = (qs.get("buoi") || lastBuoi()).toUpperCase();

  function buoc1(loi){
    box.innerHTML = `<div class="hop" role="dialog" aria-labelledby="lan-h">
      <h2 id="lan-h">Đăng nhập vào lớp</h2><p>Bước 1/2 — nhập mã buổi học thầy cô cho và số căn cước của em.</p>
      <label for="lan-buoi">Mã buổi học</label><input id="lan-buoi" autocomplete="off" placeholder="Ví dụ: 7A1-T5" value="${esc(buoi)}">
      <label for="lan-cccd">Số căn cước (12 chữ số)</label><input id="lan-cccd" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="0xxxxxxxxxxx">
      <div class="loi" role="alert">${esc(loi || "")}</div>
      <button class="chinh" type="button">Tiếp tục</button>
      <p style="text-align:center;margin:14px 0 0"><a href="giaovien.html${buoi ? "?buoi=" + encodeURIComponent(buoi) : ""}">Thầy cô vào trang giáo viên →</a></p></div>`;
    const ib = box.querySelector("#lan-buoi"), ic = box.querySelector("#lan-cccd"), err = box.querySelector(".loi"), go = box.querySelector("button");
    ic.addEventListener("input", () => { ic.value = ic.value.replace(/\D/g, "").slice(0, 12); });
    (buoi ? ic : ib).focus();
    async function next(){
      buoi = ib.value.trim().toUpperCase().replace(/\s+/g, "-").replace(/[^A-Z0-9_.\-]/g, "");
      cccd = ic.value;
      if (!buoi) { err.textContent = "Em nhập mã buổi học thầy cô cho."; ib.focus(); return; }
      if (!/^\d{12}$/.test(cccd)) { err.textContent = "Số căn cước phải đủ 12 chữ số."; ic.focus(); return; }
      go.disabled = true; err.textContent = "Đang kiểm tra…";
      try { const j = await post("/dn/tra", {cccd}); buoc2(j); }
      catch(e) { err.textContent = e.message; go.disabled = false; ic.select(); }
    }
    go.onclick = next;
    [ib, ic].forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") next(); }));
  }

  function buoc2(hs){
    box.innerHTML = `<div class="hop" role="dialog" aria-labelledby="lan-h">
      <h2 id="lan-h">Em có phải là bạn này không?</h2><p>Bước 2/2 — kiểm tra kĩ họ tên và lớp.</p>
      <div class="ten">${esc(hs.ten)}</div><div>Lớp <b>${esc(hs.lop)}</b> · Buổi <b>${esc(buoi)}</b></div>
      <div class="loi" role="alert"></div>
      <button class="chinh" type="button" id="lan-dung">Đúng là em — vào lớp</button>
      <button class="phu" type="button" id="lan-sai">Không phải em — nhập lại</button></div>`;
    const err = box.querySelector(".loi");
    box.querySelector("#lan-dung").focus();
    box.querySelector("#lan-sai").onclick = () => { cccd = ""; buoc1("Em nhập lại số căn cước của mình cho đúng."); };
    box.querySelector("#lan-dung").onclick = async e => {
      e.target.disabled = true; err.textContent = "Đang vào lớp…";
      try {
        const j = await post("/dn/vao", {cccd, buoi});
        cccd = "";   // không giữ số căn cước trên máy học sinh
        localStorage.setItem("lan-hs", JSON.stringify({id: j.id, ten: j.ten, lop: j.lop, tk: j.tk, buoi}));
        localStorage.setItem("lan-buoi", buoi);
        const u = new URL(location.href); u.searchParams.delete("buoi"); u.searchParams.delete("ten");
        location.replace(u.href);
      } catch(x) { err.textContent = x.message; e.target.disabled = false; }
    };
  }
  buoc1();
});
})();
