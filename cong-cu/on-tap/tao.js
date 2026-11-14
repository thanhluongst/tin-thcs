/* Gom câu tự chấm (mcq, sort, match, order) và khái niệm (CONCEPTS) của mọi bài thành on-tap/ngan-hang.js
   Chạy: node cong-cu/on-tap/tao.js   (từ thư mục tin-thcs). Chạy lại mỗi khi sửa content.js của bài. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const goc = path.resolve(__dirname, "../..");
const out = {};
let nCau = 0, nThe = 0;
for (const d of fs.readdirSync(goc).sort()) {
  const f = path.join(goc, d, "content.js");
  if (!/^tin[6-9]-/.test(d) || !fs.existsSync(f)) continue;
  const ctx = {window: {}, console};
  try { vm.runInNewContext(fs.readFileSync(f, "utf8"), ctx, {filename: f, timeout: 2000}); }
  catch (e) { console.error("Bỏ qua", d, e.message); continue; }
  const L = ctx.window.LESSON; if (!L) continue;
  const cau = [];
  for (const id of L.TASK_IDS) {
    const t = L.TASKS[id], c = {id, type: t.type, q: t.q, k: t.k || ""};
    if (t.type === "mcq") Object.assign(c, {o: t.o, a: t.a});
    else if (t.type === "sort") Object.assign(c, {cats: t.cats, items: t.items});
    else if (t.type === "match") Object.assign(c, {items: t.items, opts: t.opts});
    else if (t.type === "order") Object.assign(c, {items: t.items, ans: t.ans, start: t.start});
    else continue;
    cau.push(c);
  }
  const the = Object.values(L.CONCEPTS || {}).filter(c => !c.ghi && c.t && c.b).map(c => ({t: c.t, b: c.b}));
  out[d] = {id: L.id, ten: L.title, cau, the};
  nCau += cau.length; nThe += the.length;
}
fs.writeFileSync(path.join(goc, "on-tap", "ngan-hang.js"),
  "/* SINH TỰ ĐỘNG bởi cong-cu/on-tap/tao.js – đừng sửa tay. */\nwindow.NGAN_HANG = " + JSON.stringify(out) + ";\n");
console.log(Object.keys(out).length + " bài, " + nCau + " câu tự chấm, " + nThe + " thẻ ghi nhớ");
