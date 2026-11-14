/* Chạy được khi mạng yếu / mất mạng: lưu tạm các trang đã mở.
   - Trang HTML: lấy bản mới trên mạng trước (tối đa 4 giây), mất mạng thì dùng bản đã lưu.
   - Tệp tĩnh (js, css, hình, phông chữ, Tailwind): dùng bản đã lưu ngay, đồng thời tải bản mới về cho lần sau.
   - Không bao giờ lưu yêu cầu gửi bài / máy chủ Apps Script / Firebase.
   Đổi PHIEN khi muốn xoá sạch bộ nhớ tạm cũ. */
const PHIEN = "tin-thcs-v1";
const NAP_SAN = ["./", "chung/style.css", "ho-so/", "on-tap/", "on-tap/ngan-hang.js?v=2", "danh-muc.js?v=1", "chung/nls-atm.js?v=1"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(PHIEN).then(c => Promise.all(NAP_SAN.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== PHIEN).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const BO_QUA = /script\.google|googleusercontent|firebaseio|firebasedatabase|googleapis\.com\/(?!css)/;
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || BO_QUA.test(r.url)) return;
  const u = new URL(r.url);
  if (u.protocol !== "http:" && u.protocol !== "https:") return;
  const laTrang = r.mode === "navigate" || (r.headers.get("accept") || "").includes("text/html");
  e.respondWith(laTrang ? mangTruoc(r) : boNhoTruoc(e, r));
});

async function luu(r, res){
  if (res && (res.ok || res.type === "opaque")) { const c = await caches.open(PHIEN); await c.put(r, res.clone()); }
  return res;
}
async function mangTruoc(r){
  try {
    const res = await Promise.race([fetch(r), new Promise((_, no) => setTimeout(() => no(new Error("chậm")), 4000))]);
    return luu(r, res);
  } catch (e) {
    const c = await caches.match(r, {ignoreSearch: true});
    return c || new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="font:16px system-ui;padding:24px">'
      + "<h2>📴 Chưa có mạng</h2><p>Trang này chưa được mở lần nào trên máy nên chưa lưu sẵn. Hãy kết nối mạng rồi thử lại.</p></body>", {headers: {"Content-Type": "text/html; charset=utf-8"}});
  }
}
async function boNhoTruoc(e, r){
  const c = await caches.match(r);
  const moi = fetch(r).then(res => luu(r, res)).catch(() => null);
  if (c) { e.waitUntil(moi); return c; }
  return (await moi) || (await caches.match(r, {ignoreSearch: true})) || new Response("", {status: 504});
}
