/* GỌI TÊN HỌC SINH: danh sách lớp lấy từ Excel (dán hoặc tải tệp .xlsx/.xls/.csv), mỗi bạn một hàng.
   - Tự nhận cột họ tên (kể cả khi tách "Họ đệm" | "Tên"), bỏ hàng tiêu đề, cột STT, ngày sinh…
   - Nhiều lớp (7A1, 7A2…), lưu trên máy của thầy cô (không gửi lên mạng).
   - Gọi ngẫu nhiên có vòng quay tên; không gọi lại bạn đã gọi cho tới khi hết lượt; "Vắng" thì bỏ qua cả lượt;
     "★ Khen" cộng sao cho bạn đó. Phím: Space/G gọi tên, F toàn màn hình, Esc đóng.
   Dùng: GoiTen.open() */
(function(){
"use strict";
const KEY = "goiten-v1";
const XLSX_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
function el(tag, attrs, html){ const e = document.createElement(tag); if (attrs) for (const a in attrs) e.setAttribute(a, attrs[a]); if (html != null) e.innerHTML = html; return e; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c])); }
function load(){ try { const d = JSON.parse(localStorage.getItem(KEY) || "null"); if (d && d.lop) return d; } catch(e) {} return {lop: {}, cur: ""}; }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(D)); } catch(e) {} }
let D = load();

/* ---------- Đọc bảng Excel ---------- */
const NAME_RE = /^[\p{L}][\p{L}\p{M}'’.\- ]*$/u;
const isName = s => NAME_RE.test(s) && /\p{L}/u.test(s) && s.length >= 2;
const norm = s => String(s == null ? "" : s).replace(/\s+/g, " ").trim();
/* rows: mảng hàng, mỗi hàng là mảng ô → danh sách họ tên */
function namesFromRows(rows){
  rows = rows.map(r => r.map(norm)).filter(r => r.some(Boolean));
  if (!rows.length) return [];
  const width = Math.max(...rows.map(r => r.length));
  if (width === 1) return rows.map(r => r[0]).filter(isName).filter(s => !/^(họ (và )?tên|tên|họ tên học sinh|name)$/i.test(s));
  /* hàng tiêu đề: có chữ "họ", "tên" hoặc "name" */
  let hi = rows.slice(0, 5).findIndex(r => r.some(c => /(^|\s)(họ|tên|name)(\s|$)/i.test(c)));
  const head = hi >= 0 ? rows[hi].map(c => c.toLowerCase()) : [];
  const body = hi >= 0 ? rows.slice(hi + 1) : rows;
  /* "Họ đệm" | "Tên" tách hai cột → ghép */
  const cTen = head.findIndex(c => /^tên$/.test(c)), cHo = head.findIndex(c => /^họ( (và )?(tên )?đệm| đệm| lót)?$/.test(c) && !/họ (và )?tên$/.test(c));
  if (cTen >= 0 && cHo >= 0 && cHo !== cTen) return body.map(r => norm((r[cHo] || "") + " " + (r[cTen] || ""))).filter(isName);
  const cFull = head.findIndex(c => /họ (và )?tên|họ tên|full ?name|^name$/.test(c));
  if (cFull >= 0) return body.map(r => r[cFull] || "").filter(isName);
  /* không có tiêu đề: chọn cột có nhiều ô giống họ tên nhất (ưu tiên có dấu cách) */
  let best = -1, bestS = 0;
  for (let c = 0; c < width; c++) {
    const s = body.reduce((n, r) => n + (isName(r[c] || "") ? (/\s/.test(r[c]) ? 2 : 1) : 0), 0);
    if (s > bestS) { bestS = s; best = c; }
  }
  if (best < 0) return [];
  /* cột tốt nhất toàn một chữ (tên riêng) mà cột trái là họ đệm → ghép */
  const single = body.filter(r => isName(r[best] || "") && !/\s/.test(r[best])).length > body.length * .6;
  if (single && best > 0 && body.filter(r => isName(r[best - 1] || "")).length > body.length * .6) return body.map(r => norm((r[best - 1] || "") + " " + (r[best] || ""))).filter(isName);
  /* cột tốt nhất là họ đệm, cột phải là tên riêng (nhiều giá trị khác nhau, không phải Nam/Nữ) → ghép */
  const right = body.map(r => r[best + 1] || "");
  const oneWord = right.filter(x => isName(x) && !/\s/.test(x)).length;
  if (best + 1 < width && oneWord > body.length * .6 && new Set(right).size >= Math.max(3, Math.ceil(body.length * .5))) return body.map(r => norm((r[best] || "") + " " + (r[best + 1] || ""))).filter(isName);
  return body.map(r => r[best] || "").filter(isName);
}
function rowsFromText(t){
  const lines = String(t).replace(/\r/g, "").split("\n");
  const tab = lines.some(l => l.indexOf("\t") >= 0);
  const semi = !tab && lines.filter(l => l.indexOf(";") >= 0).length > lines.length / 2;
  const comma = !tab && !semi && lines.filter(l => l.indexOf(",") >= 0).length > lines.length / 2;
  return lines.map(l => tab ? l.split("\t") : semi ? l.split(";") : comma ? l.split(",").map(x => x.replace(/^"|"$/g, "")) : [l]);
}
function loadXlsx(){
  if (window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((ok, no) => { const s = el("script", {src: XLSX_URL}); s.onload = () => ok(window.XLSX); s.onerror = () => no(new Error("Không tải được bộ đọc Excel (cần mạng)")); document.head.appendChild(s); });
}
async function rowsFromFile(f){
  if (/\.(csv|txt)$/i.test(f.name)) return rowsFromText(await f.text());
  const X = await loadXlsx();
  const wb = X.read(await f.arrayBuffer(), {type: "array"});
  /* lấy trang tính có nhiều họ tên nhất */
  let best = [];
  wb.SheetNames.forEach(n => { const rows = X.utils.sheet_to_json(wb.Sheets[n], {header: 1, raw: false, defval: ""}); if (namesFromRows(rows).length > namesFromRows(best).length) best = rows; });
  return best;
}

/* ---------- Giao diện ---------- */
let box, lastFocus = null, mode = "goi", rolling = false, current = "", ac = null;
const lop = () => D.lop[D.cur] || null;
function hist(){ const l = lop(); if (!l) return null; l.goi = l.goi || []; l.vang = l.vang || []; l.sao = l.sao || {}; return l; }

function build(){
  box = el("div", {class: "chieu goiten", role: "dialog", "aria-modal": "true", "aria-label": "Gọi tên học sinh", hidden: ""});
  box.innerHTML =
    '<div class="chieu-top"><span class="chieu-bai">Gọi tên học sinh</span><span class="chieu-part"></span><span class="chieu-n"></span></div>' +
    '<div class="chieu-body"><div class="gt-page"></div></div>' +
    '<div class="chieu-bar">' +
      '<select class="tb-sel gt-lop" aria-label="Chọn lớp"></select>' +
      '<button class="btn" type="button" data-k="ds">📋 Danh sách lớp</button>' +
      '<button class="btn" type="button" data-k="moi" title="Bắt đầu lượt gọi mới: mọi bạn lại có thể được gọi">↺ Lượt mới</button>' +
      '<span class="chieu-sp"></span>' +
      '<button class="btn" type="button" data-k="full">Toàn màn hình</button>' +
      '<button class="btn" type="button" data-k="close">Đóng ✕</button>' +
    "</div>";
  box.addEventListener("click", onClick);
  box.querySelector(".gt-lop").addEventListener("change", e => { D.cur = e.target.value; save(); mode = lop() ? "goi" : "ds"; current = ""; render(); });
  box.addEventListener("change", e => { if (e.target.matches(".gt-file")) fromFile(e.target.files[0]); });
  box.addEventListener("paste", e => {
    if (!e.target.matches(".gt-ta")) return;
    const t = e.clipboardData && e.clipboardData.getData("text/plain");
    if (t && t.indexOf("\t") >= 0) { e.preventDefault(); const n = namesFromRows(rowsFromText(t)); e.target.value = (e.target.value.trim() ? e.target.value.trim() + "\n" : "") + n.join("\n"); count(); msg("Đã nhận " + n.length + " bạn từ Excel. Kiểm tra lại rồi bấm Lưu danh sách.", "ok"); }
  });
  box.addEventListener("input", e => { if (e.target.matches(".gt-ta")) count(); });
  document.addEventListener("keydown", e => {
    if (!box || box.hidden || (e.target.matches && e.target.matches("input, textarea, select"))) return;
    if ((e.key === " " || e.key === "g" || e.key === "G") && mode === "goi") { e.preventDefault(); goi(); }
    else if (e.key === "f" || e.key === "F") full();
    else if (e.key === "Escape" && !document.fullscreenElement) close();
  });
  document.body.appendChild(box);
}
function full(){ try { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen(); } catch(e) {} }
function msg(t, k){ const m = box.querySelector(".gt-msg"); if (m) { m.textContent = t; m.className = "gt-msg status " + (k || ""); } }
function count(){ const ta = box.querySelector(".gt-ta"), c = box.querySelector(".gt-count"); if (ta && c) c.textContent = ta.value.split("\n").map(norm).filter(Boolean).length + " bạn"; }

async function fromFile(f){
  if (!f) return;
  msg("Đang đọc tệp " + f.name + "…");
  try {
    const n = namesFromRows(await rowsFromFile(f));
    if (!n.length) throw new Error("Không tìm thấy cột họ tên trong tệp");
    box.querySelector(".gt-ta").value = n.join("\n"); count();
    const nm = box.querySelector(".gt-name"); if (nm && !nm.value.trim()) nm.value = f.name.replace(/\.[^.]+$/, "").slice(0, 30);
    msg("Đã đọc " + n.length + " bạn từ tệp. Kiểm tra lại rồi bấm Lưu danh sách.", "ok");
  } catch(e) { msg(e.message, "bad"); }
}

function onClick(e){
  const b = e.target.closest("[data-k]"); if (!b) return;
  const k = b.dataset.k, l = hist();
  if (k === "close") close();
  else if (k === "full") full();
  else if (k === "ds") { mode = "ds"; render(); }
  else if (k === "goi") goi();
  else if (k === "moi") { if (l) { l.goi = []; l.vang = []; current = ""; save(); mode = "goi"; render(); } }
  else if (k === "vang") { if (l && current) { if (l.vang.indexOf(current) < 0) l.vang.push(current); save(); goi(); } }
  else if (k === "sao") { if (l && current) { l.sao[current] = (l.sao[current] || 0) + 1; save(); render(); } }
  else if (k === "pick-file") box.querySelector(".gt-file").click();
  else if (k === "luu") {
    const name = norm(box.querySelector(".gt-name").value).slice(0, 30) || "Lớp của tôi";
    const ds = Array.from(new Set(box.querySelector(".gt-ta").value.split("\n").map(norm).filter(Boolean)));
    if (!ds.length) { msg("Danh sách đang trống: dán từ Excel hoặc tải tệp.", "bad"); return; }
    const old = D.lop[name] || {};
    D.lop[name] = {ds, goi: (old.goi || []).filter(x => ds.indexOf(x) >= 0), vang: [], sao: old.sao || {}};
    D.cur = name; save(); mode = "goi"; current = ""; render();
  }
  else if (k === "xoa") { if (D.cur && confirm("Xoá danh sách lớp " + D.cur + " khỏi máy này?")) { delete D.lop[D.cur]; D.cur = Object.keys(D.lop)[0] || ""; save(); mode = lop() ? "goi" : "ds"; render(); } }
  else if (k === "lop-moi") { D.cur = ""; mode = "ds"; render(); }
}

function render(){
  const sel = box.querySelector(".gt-lop"), names = Object.keys(D.lop);
  sel.innerHTML = names.length ? names.map(n => '<option value="' + esc(n) + '">' + esc(n) + " (" + D.lop[n].ds.length + ")</option>").join("") : '<option value="">(chưa có lớp)</option>';
  if (D.cur && D.lop[D.cur]) sel.value = D.cur;
  sel.hidden = !names.length;
  box.querySelector('[data-k="moi"]').hidden = mode !== "goi";
  const page = box.querySelector(".gt-page"), l = hist();
  if (mode === "ds" || !l) {
    box.querySelector(".chieu-part").textContent = "Danh sách lớp";
    box.querySelector(".chieu-n").textContent = "";
    const cur = l ? l.ds.join("\n") : "";
    page.innerHTML =
      '<div class="gt-setup">' +
      '<p class="gt-help">Mỗi bạn một hàng. Cách nhanh nhất: trong Excel, <b>bôi đen cột họ tên</b> (hoặc cả bảng) → <b>Ctrl+C</b> → bấm vào ô dưới đây → <b>Ctrl+V</b>. ' +
      'Trang tự nhận cột họ tên, kể cả khi tách cột "Họ đệm" và "Tên", và bỏ cột STT, ngày sinh. Hoặc tải tệp <b>.xlsx, .xls, .csv</b>.</p>' +
      '<div class="gt-row"><label>Tên lớp <input class="gt-name" type="text" maxlength="30" placeholder="Ví dụ: 7A1" value="' + esc(D.cur || "") + '"></label>' +
      '<input class="gt-file" type="file" accept=".xlsx,.xls,.csv,.txt" hidden><button class="btn" type="button" data-k="pick-file">📂 Tải tệp Excel / CSV</button>' +
      (names.length ? '<button class="btn" type="button" data-k="lop-moi">＋ Lớp mới</button>' : "") + "</div>" +
      '<textarea class="gt-ta" rows="12" placeholder="Nguyễn Văn An&#10;Trần Thị Bình&#10;Lê Hoàng Cường&#10;…" aria-label="Danh sách học sinh, mỗi bạn một hàng">' + esc(cur) + "</textarea>" +
      '<div class="gt-row"><span class="gt-count chip info"></span><button class="btn primary" type="button" data-k="luu">💾 Lưu danh sách</button>' +
      (l ? '<button class="btn" type="button" data-k="xoa">🗑 Xoá lớp này</button>' : "") + "</div>" +
      '<p class="gt-msg status" aria-live="polite"></p>' +
      '<p class="gt-note">Danh sách chỉ lưu trên trình duyệt của máy này, không gửi lên mạng.</p></div>';
    count();
    if (l) { const back = el("button", {class: "btn", type: "button"}, "← Quay lại gọi tên"); back.addEventListener("click", () => { mode = "goi"; render(); }); page.querySelector(".gt-setup .gt-row:last-of-type").appendChild(back); }
    return;
  }
  const pool = l.ds.filter(n => l.goi.indexOf(n) < 0 && l.vang.indexOf(n) < 0);
  box.querySelector(".chieu-part").textContent = /^lớp/i.test(D.cur) ? D.cur : "Lớp " + D.cur;   /* tên đã có chữ "Lớp" thì không thêm nữa */
  box.querySelector(".chieu-n").textContent = "Đã gọi " + l.goi.length + "/" + l.ds.length + (l.vang.length ? " · vắng " + l.vang.length : "");
  page.innerHTML =
    '<div class="gt-stage">' +
      '<div class="gt-card' + (current ? " has" : "") + '"><span class="gt-h">' + (current ? "🎯 Mời bạn" : "Bấm “Gọi tên” hoặc phím Space") + '</span><span class="gt-name-big">' + esc(current || "?") + "</span>" +
        (current && l.sao[current] ? '<span class="gt-sao">' + "★".repeat(Math.min(5, l.sao[current])) + (l.sao[current] > 5 ? " ×" + l.sao[current] : "") + "</span>" : "") + "</div>" +
      '<div class="gt-acts"><button class="btn primary gt-go" type="button" data-k="goi">🎲 Gọi tên</button>' +
        (current ? '<button class="btn" type="button" data-k="sao">★ Khen</button><button class="btn" type="button" data-k="vang" title="Bạn vắng: bỏ qua trong lượt này và gọi bạn khác">Vắng, gọi bạn khác</button>' : "") + "</div>" +
      '<p class="gt-left">' + (pool.length ? "Còn " + pool.length + " bạn chưa được gọi trong lượt này." : "Đã gọi hết lớp. Bấm “Gọi tên” để bắt đầu lượt mới.") + "</p>" +
      (l.goi.length ? '<div class="gt-hist"><b>Đã gọi:</b> ' + l.goi.slice().reverse().map(n => '<span class="chip' + (n === current ? " cur" : "") + '">' + esc(n) + (l.sao[n] ? " ★" + l.sao[n] : "") + "</span>").join("") + "</div>" : "") +
    "</div>";
}

function rnd(n){ try { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } catch(e) { return Math.floor(Math.random() * n); } }
function tick(f, len, vol){
  if ((localStorage.getItem("tm-sound") || "1") === "0") return;
  try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
    const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + len);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + len); } catch(e) {}
}
function goi(){
  const l = hist(); if (!l || rolling) return;
  let pool = l.ds.filter(n => l.goi.indexOf(n) < 0 && l.vang.indexOf(n) < 0);
  if (!pool.length) { l.goi = []; pool = l.ds.filter(n => l.vang.indexOf(n) < 0 && n !== current); if (!pool.length) pool = l.ds.slice(); }
  const win = pool[rnd(pool.length)];
  const big = box.querySelector(".gt-name-big"), card = box.querySelector(".gt-card");
  rolling = true; card.classList.add("rolling"); card.classList.remove("has");
  box.querySelector(".gt-h").textContent = "🎲 Đang chọn…";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, all = l.ds.filter(n => l.vang.indexOf(n) < 0);
  let k = 0, delay = 45; const steps = reduce || all.length < 2 ? 0 : 20;
  (function spin(){
    if (k < steps) { let s; do { s = all[rnd(all.length)]; } while (all.length > 1 && s === big.textContent); big.textContent = s; tick(520 + rnd(200), .05, .12); k++; delay *= 1.1; setTimeout(spin, delay); }
    else {
      current = win; l.goi.push(win); save();
      tick(880, .25, .25); setTimeout(() => tick(1320, .35, .25), 140);
      rolling = false; render();
      const c = box.querySelector(".gt-card"); c.classList.add("win");
    }
  })();
}

function open(){
  if (!box) build();
  D = load();
  if (D.cur && !D.lop[D.cur]) D.cur = "";
  if (!D.cur) D.cur = Object.keys(D.lop)[0] || "";
  mode = lop() ? "goi" : "ds"; current = "";
  lastFocus = document.activeElement;
  box.hidden = false;
  document.documentElement.classList.add("chieu-on");
  render();
  const f = box.querySelector(mode === "goi" ? ".gt-go" : ".gt-ta"); if (f) f.focus();
}
function close(){
  if (!box) return;
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch(e) {} }
  box.hidden = true;
  if (!document.querySelector(".chieu:not([hidden])")) document.documentElement.classList.remove("chieu-on");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
window.GoiTen = {open, close, _namesFromRows: namesFromRows, _rowsFromText: rowsFromText};
})();
