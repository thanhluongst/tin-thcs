/* KÊNH BÁO TIN TỨC THÌ (Firebase Realtime Database qua REST, không cần thư viện Firebase).
   Bài làm vẫn lưu ở Google Sheets (Apps Script) như cũ; kênh này chỉ đẩy tin để máy kia biết NGAY (thường dưới 1 giây):
   - Thầy cô khen / nhận xét  → /tin/<bài>/<buổi>/hs/<mã máy> = {t, nx}   (máy học sinh đó hiện chúc mừng ngay)
   - Thầy cô chốt đáp án     → /tin/<bài>/<buổi>/rev = {t, rev}
   - Học sinh vừa nộp bài    → /tin/<bài>/<buổi>/nop = thời điểm         (trang giáo viên tải bài của lớp ngay)
   Không gửi họ tên hay bài làm lên kênh này. Tin trên kênh chỉ để hiện nhanh; lần hỏi Apps Script sau đó vẫn là dữ liệu chính.
   Cấu hình: FIREBASE_URL trong chung/config.js (địa chỉ Realtime Database). Để trống thì tắt, trang hỏi Apps Script như cũ.
   "demo:" = kênh giả giữa các thẻ của cùng trình duyệt (để thử trên máy). */
(function(){
"use strict";
const cfg = window.APP_CONFIG || {};
const RAW = String(cfg.FIREBASE_URL || "").trim().replace(/\/+$/, "");
const DEMO = RAW === "demo:";
const ON = DEMO || /^https:\/\/[^/]+$/.test(RAW);
const key = s => String(s).replace(/[.#$\[\]\/]/g, "_");
const path = (bai, buoi, rest) => "tin/" + key(bai) + "/" + key(buoi) + (rest ? "/" + rest : "");

/* ---------- kênh giả (thử trên máy) ---------- */
const subs = {};
let bc = null; try { bc = new BroadcastChannel("tuc-thi-demo"); } catch(e) {}
function demoGet(p){ try { return JSON.parse(localStorage.getItem("tt-demo|" + p) || "null"); } catch(e) { return null; } }
function demoFire(p, v){ (subs[p] || []).forEach(cb => { try { cb(v); } catch(e) {} }); }
if (bc) bc.onmessage = e => { if (e.data && e.data.p) demoFire(e.data.p, e.data.v); };

/* ---------- nghe một nút: gọi cb(giá trị) mỗi khi nút đổi ---------- */
function listen(p, cb){
  if (!ON) return {close(){}};
  if (DEMO) {
    (subs[p] = subs[p] || []).push(cb);
    const v = demoGet(p); if (v != null) setTimeout(() => cb(v), 0);
    return {close(){ subs[p] = (subs[p] || []).filter(x => x !== cb); }};
  }
  let es = null, val = null, dead = false, retry = null, first = true;
  function setAt(obj, rel, data){
    const parts = rel.split("/").filter(Boolean);
    if (!parts.length) return data;
    obj = (obj && typeof obj === "object") ? obj : {};
    let o = obj; for (let i = 0; i < parts.length - 1; i++) { o[parts[i]] = (o[parts[i]] && typeof o[parts[i]] === "object") ? o[parts[i]] : {}; o = o[parts[i]]; }
    if (data == null) delete o[parts[parts.length - 1]]; else o[parts[parts.length - 1]] = data;
    return obj;
  }
  function open(){
    if (dead) return;
    try { es = new EventSource(RAW + "/" + p + ".json"); } catch(e) { return; }
    es.addEventListener("put", e => { try { const m = JSON.parse(e.data); val = setAt(val, m.path, m.data); if (first) { first = false; if (val == null) return; } cb(val); } catch(err) {} });
    es.addEventListener("patch", e => { try { const m = JSON.parse(e.data); Object.keys(m.data || {}).forEach(k => { val = setAt(val, (m.path === "/" ? "" : m.path) + "/" + k, m.data[k]); }); cb(val); } catch(err) {} });
    es.addEventListener("cancel", () => { close(); });
    es.onerror = () => { if (es && es.readyState === 2) { es = null; clearTimeout(retry); retry = setTimeout(open, 5000); } };   /* trình duyệt tự nối lại; đóng hẳn thì thử lại sau 5 giây */
  }
  function close(){ dead = true; clearTimeout(retry); if (es) es.close(); es = null; }
  open();
  return {close};
}

/* ---------- ghi một nút (không chờ, lỗi thì bỏ qua: Apps Script vẫn là đường chính) ---------- */
function send(p, v){
  if (!ON) return Promise.resolve();
  if (DEMO) { try { localStorage.setItem("tt-demo|" + p, JSON.stringify(v)); } catch(e) {}
    demoFire(p, v); if (bc) bc.postMessage({p, v}); return Promise.resolve(); }
  return fetch(RAW + "/" + p + ".json", {method: "PUT", body: JSON.stringify(v), keepalive: true}).catch(() => {});
}

window.TucThi = {on: ON, demo: DEMO, path, listen, send};
})();
