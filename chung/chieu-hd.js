/* TRÌNH CHIẾU TỪNG HOẠT ĐỘNG: màn hình lớn cho máy chiếu khi lên lớp.
   - Mỗi hoạt động của bài là một trang chiếu; bấm Tiếp (→, PageDown, bút trình chiếu) để hiện TỪNG BƯỚC
     (đoạn đọc, hình, từng câu hỏi), hết bước thì sang hoạt động sau. ← / PageUp để lùi.
   - Một bài có thể dạy 1, 2 hoặc 3 tiết: nút "Chia tiết" chọn số tiết và hoạt động bắt đầu mỗi tiết (tự gợi ý chỗ chia,
     lưu trên máy theo từng bài). Mỗi tiết có trang mở đầu (các hoạt động của tiết) và trang kết thúc.
   - Hoạt động được chiếu chính là phần trên trang học, nên học sinh / thầy cô làm bài, chọn đáp án, nộp bài ngay trên màn chiếu.
   - Bút viết lên trang và đồng hồ đếm ngược (chieu.js) dùng được cả khi toàn màn hình.
   - Trang giáo viên không có nội dung hoạt động: nút mở trang học sinh ở chế độ trình chiếu (index.html?chieu=1).
   Phím: → ← chuyển bước, Home về đầu tiết, A (hiện hết bước), + − cỡ chữ, F toàn màn hình, Esc đóng. */
(function(){
"use strict";
const L = window.LESSON || {};
const BAI = L.id || location.pathname;
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e) { return null; } };
const ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M10 7.5v5l4-2.5z" fill="currentColor"/><path d="M12 16v4M8 20h8"/></svg>';

const css = ".chieu-hd .chieu-body{scroll-behavior:smooth}"
  + ".hd-slide{max-width:1180px;margin:0 auto;zoom:var(--hz,1.3)}"
  + ".hd-slide>.act{margin:0 0 24px;box-shadow:none}"
  + ".hd-an{display:none!important}"
  + ".hd-moi{animation:hdIn .4s ease}"
  + "@keyframes hdIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}"
  + "@media (prefers-reduced-motion:reduce){.hd-moi{animation:none}}"
  + ".hd-cover{max-width:1000px;margin:0 auto;padding:3vh 0;text-align:center}"
  + ".hd-cover .hd-tiet{display:inline-block;font-family:var(--font-display);font-weight:700;font-size:22px;color:#fff;background:var(--pink);border-radius:99px;padding:6px 22px}"
  + ".hd-cover h1{font-family:var(--font-display);font-size:clamp(30px,4.6vw,58px);line-height:1.2;margin:18px 0 6px;color:var(--accent)}"
  + ".hd-cover .hd-sub{color:var(--muted);font-size:20px;margin:0 0 22px}"
  + ".hd-list{list-style:none;padding:0;margin:0 auto;text-align:left;display:grid;gap:10px;max-width:820px}"
  + ".hd-list button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:14px;align-items:center;width:100%;padding:12px 18px;border:2px solid var(--line);border-radius:14px;background:var(--surface);font-size:21px;line-height:1.35}"
  + ".hd-list button:hover,.hd-list button:focus-visible{border-color:var(--accent)}"
  + ".hd-list .hd-c{flex:none;min-width:58px;text-align:center;font-family:var(--font-display);font-weight:700;color:var(--accent);background:var(--accent-soft,#d6efe9);border-radius:10px;padding:2px 8px}"
  + ".hd-list .hd-q{margin-left:auto;flex:none;color:var(--muted);font-size:16px}"
  + ".hd-cover .hd-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:26px}"
  + ".hd-cover .hd-btns .btn{font-size:19px;padding:10px 22px}"
  + ".hd-cover .hd-tip{color:var(--muted);font-size:15px;margin-top:22px}"
  + ".hd-cfg{position:absolute;right:16px;bottom:74px;z-index:3;width:min(440px,calc(100vw - 32px));max-height:calc(100vh - 160px);overflow:auto;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.3);padding:14px 16px;font-size:15px}"
  + ".hd-cfg h3{margin:0 0 8px;font-size:17px}"
  + ".hd-cfg .seg{display:flex;gap:6px;margin:4px 0 12px}"
  + ".hd-cfg .seg button{font:inherit;font-weight:600;border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:99px;padding:4px 16px;cursor:pointer}"
  + ".hd-cfg .seg button[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--accent-ink,#fff)}"
  + ".hd-cfg label{display:block;font-weight:600;margin:8px 0 4px}"
  + ".hd-cfg select{font:inherit;width:100%;padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg)}"
  + ".hd-cfg .hd-sum{margin:10px 0 0;color:var(--muted);font-size:14px}"
  + ".hd-cfg .row{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}"
  + ".chieu-hd .chieu-bar select{font:inherit;font-size:16px;padding:7px 10px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--fg)}"
  + ".chieu-hd .chieu-dots{flex-wrap:wrap;justify-content:center}"
  + ".chieu-hd .chieu-dot.hd-dc{opacity:.75}"
  + ".hd-step{font-weight:600;opacity:.9}"
  /* Lớp trả lời (trang giáo viên) */
  + ".chieu-hd .tq>.ans-list,.chieu-hd .tq>.empty{display:none}"
  + ".hd-lop{margin-top:12px;border:2px solid var(--accent);border-radius:14px;padding:10px 14px;background:var(--surface)}"
  + ".hd-lop-h{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}"
  + ".hd-lop-h .hd-n{font-family:var(--font-display);font-weight:700;font-size:1.05em}"
  + ".hd-lop-h .sp{flex:1}"
  + ".hd-lop .btn{font-size:14px;padding:5px 12px}"
  + ".hd-live{display:inline-block;width:9px;height:9px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 0 rgba(22,163,74,.5);animation:hdLive 1.6s infinite}"
  + "@keyframes hdLive{70%{box-shadow:0 0 0 8px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}"
  + ".hd-stat{display:grid;gap:6px;margin:10px 0}"
  + ".hd-bar{display:grid;grid-template-columns:minmax(0,15em) minmax(0,1fr) auto;gap:10px;align-items:center}"
  + ".hd-bar .lb{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
  + ".hd-bar .tr{height:18px;border-radius:99px;background:var(--sunk);overflow:hidden}"
  + ".hd-bar .tr i{display:block;height:100%;background:var(--accent);border-radius:99px;transition:width .4s}"
  + ".hd-bar.ok .tr i{background:#16a34a}.hd-bar.ok .lb{font-weight:700;color:#15803d}"
  + ".hd-bar .ct{font-variant-numeric:tabular-nums;font-weight:600;min-width:5.5em;text-align:right}"
  + ".hd-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin-top:8px}"
  + ".hd-card{all:unset;box-sizing:border-box;cursor:pointer;display:block;border:2px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--bg);font-size:.95em;line-height:1.4;min-width:0}"
  + ".hd-card:hover,.hd-card:focus-visible{border-color:var(--accent)}"
  + ".hd-card[aria-pressed=true]{border-color:var(--pink);box-shadow:0 0 0 3px var(--pink-soft,#fde8f1)}"
  + ".hd-card .nm{font-weight:700;display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:4px}"
  + ".hd-card .an{white-space:pre-wrap;overflow-wrap:anywhere;max-height:8.5em;overflow:hidden}"
  + ".hd-card.ok{border-color:#86efac}.hd-card.bad{border-color:#fca5a5}"
  + ".hd-chip{font-size:12px;font-weight:700;border-radius:99px;padding:1px 8px;background:var(--sunk)}"
  + ".hd-chip.ok{background:#dcfce7;color:#15803d}.hd-chip.bad{background:#fee2e2;color:#b42318}.hd-chip.kh{background:#fef3c7;color:#b45309}"
  + ".hd-spot{margin:10px 0;border:3px solid var(--pink);border-radius:14px;padding:12px 14px;background:var(--surface)}"
  + ".hd-spot .nm{font-family:var(--font-display);font-weight:700;font-size:1.15em;display:flex;gap:8px;align-items:center;flex-wrap:wrap}"
  + ".hd-spot .an{white-space:pre-wrap;overflow-wrap:anywhere;font-size:1.15em;margin:8px 0;padding:10px 12px;border-radius:10px;background:var(--bg)}"
  + ".hd-spot textarea{width:100%;font:inherit;font-size:16px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--fg);resize:vertical}"
  + ".hd-spot .mau{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}"
  + ".hd-spot .mau button{font:inherit;font-size:13px;border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:99px;padding:3px 10px;cursor:pointer}"
  + ".hd-spot .mau button.ok{border-color:#86efac}.hd-spot .mau button.fix{border-color:#fcd34d}"
  + ".hd-spot .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}"
  + ".hd-chua{color:var(--muted);font-size:.85em;margin-top:8px}";
const stEl = document.createElement("style"); stEl.textContent = css; document.head.appendChild(stEl);

/* ---------- Hoạt động trên trang ---------- */
let ACTS = null;
function txt(n){ return n ? n.textContent.replace(/\s+/g, " ").trim() : ""; }
const SKIP = ["theo-doi", "tien-do", "chia-se", "dang-nhap"];
function collect(){
  if (ACTS && ACTS.length && ACTS.every(a => a.act.isConnected || a.act === cur)) return ACTS;
  ACTS = [];
  const root = document.getElementById("lesson") || document.querySelector("main");
  if (!root) return ACTS;
  root.querySelectorAll("section.part").forEach(sec => {
    if (SKIP.includes(sec.id) || (sec.closest("[hidden]") && sec.closest("[hidden]") !== box)) return;
    const head = sec.querySelector(".part-head"), code = txt(head && head.querySelector(".sn")), h2 = head && head.querySelector("h2");
    const part = (h2 ? txt(h2).replace(code, "").trim() : "") || txt(head);
    const eyebrow = txt(head && head.querySelector(".eyebrow"));
    let n = 0;
    sec.querySelectorAll(":scope > .act").forEach(act => {
      const tag = act.querySelector(":scope > .act-tag");
      const kind = tag ? txt(tag.querySelector("b")) : "";
      const ac = tag ? txt(tag.querySelector(".code")) : "";
      let name = "";
      if (tag) { const t = tag.cloneNode(true); t.querySelectorAll(".code,b").forEach(x => x.remove()); name = txt(t); }
      const ghi = act.classList.contains("act-ghi");
      n++;
      ACTS.push({act, sec, code: ac && ac !== "✎" ? ac : "", part, eyebrow, kind, name, ghi, first: n === 1,
        label: (kind || part) + (name ? ": " + name : ""), tasks: act.querySelectorAll("[data-task]").length});
    });
  });
  return ACTS;
}

/* ---------- Chia tiết ---------- */
const CFG_KEY = "chieu-hd|" + BAI;
function autoCuts(n){
  const A = collect(), w = A.map(a => a.ghi ? 0.5 : Math.max(1, a.tasks)), tot = w.reduce((s, x) => s + x, 0), cuts = [];
  for (let k = 1; k < n; k++) {
    const target = tot * k / n; let best = -1, bd = 1e9, acc = 0;
    for (let i = 1; i < A.length; i++) {
      acc += w[i - 1];
      if (cuts.length && i <= cuts[cuts.length - 1]) continue;
      const d = Math.abs(acc - target) - (A[i].first ? tot * 0.06 : 0);   /* ưu tiên chia ở đầu một bước (phần) của bài */
      if (d < bd) { bd = d; best = i; }
    }
    if (best > 0) cuts.push(best);
  }
  return cuts;
}
function loadCfg(){
  let c = null; try { c = JSON.parse(store(CFG_KEY) || "null"); } catch(e) {}
  const A = collect();
  if (!c || !(c.n >= 1 && c.n <= 3) || !Array.isArray(c.cuts)) c = {n: 1, cuts: []};
  c.cuts = c.cuts.filter((x, i, a) => x > 0 && x < A.length && (!i || x > a[i - 1])).slice(0, c.n - 1);
  if (c.cuts.length !== c.n - 1) c.cuts = autoCuts(c.n);
  if (c.cuts.length !== c.n - 1) c.n = c.cuts.length + 1;
  return c;
}
let CFG = null;
function saveCfg(){ store(CFG_KEY, JSON.stringify(CFG)); }
function range(t){ const A = collect(), b = [0].concat(CFG.cuts, [A.length]); return [b[t - 1], b[t]]; }   /* [đầu, cuối) của tiết t */

/* ---------- Màn chiếu ---------- */
let box = null, tiet = 1, slides = [], si = 0, steps = {}, home = null, cur = null, lastFocus = null;
let hz = Number(store("chieu-hd-zoom")) || 1.3;
function el(tag, attrs, html){ const e = document.createElement(tag); if (attrs) for (const a in attrs) e.setAttribute(a, attrs[a]); if (html != null) e.innerHTML = html; return e; }
function build(){
  box = el("div", {class: "chieu chieu-hd", role: "dialog", "aria-modal": "true", "aria-label": "Trình chiếu hoạt động", hidden: ""});
  box.innerHTML =
    '<div class="chieu-top"><span class="chieu-bai"></span><span class="chieu-part"></span><span class="chieu-n"></span></div>' +
    '<div class="chieu-body"><div class="hd-slide"></div></div>' +
    '<div class="chieu-bar">' +
      '<button class="btn" type="button" data-k="prev">← Trước</button>' +
      '<span class="chieu-dots"></span>' +
      '<button class="btn primary" type="button" data-k="next">Tiếp →</button>' +
      '<button class="btn" type="button" data-k="all" title="Hiện hết các bước của hoạt động (phím A)">Hiện hết</button>' +
      '<span class="chieu-sp"></span>' +
      '<label class="sr-only" for="hd-tiet">Chọn tiết</label><select id="hd-tiet"></select>' +
      '<button class="btn" type="button" data-k="cfg" aria-expanded="false">Chia tiết</button>' +
      '<button class="btn" type="button" data-k="minus" aria-label="Chữ nhỏ hơn">A−</button>' +
      '<button class="btn" type="button" data-k="plus" aria-label="Chữ to hơn">A+</button>' +
      '<button class="btn" type="button" data-k="full">Toàn màn hình</button>' +
      '<button class="btn" type="button" data-k="close">Đóng ✕</button>' +
    "</div>" +
    '<div class="hd-cfg" hidden></div>';
  box.querySelector(".chieu-bai").textContent = L.title || document.title;
  box.addEventListener("click", e => {
    const b = e.target.closest("[data-k],[data-go],[data-tiet]"); if (!b || !box.contains(b)) return;
    if (b.dataset.go != null) { goSlide(Number(b.dataset.go)); return; }
    if (b.dataset.tiet != null) { setTiet(Number(b.dataset.tiet)); return; }
    const k = b.dataset.k;
    if (k === "prev") prev(); else if (k === "next") next(); else if (k === "all") showAll();
    else if (k === "minus") zoom(-0.1); else if (k === "plus") zoom(0.1);
    else if (k === "full") full(); else if (k === "close") close(); else if (k === "cfg") toggleCfg();
  });
  box.querySelector("#hd-tiet").addEventListener("change", e => setTiet(Number(e.target.value)));
  document.addEventListener("keydown", onKey);
  document.body.appendChild(box);
}
function typing(t){ return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || (t.closest && t.closest(".bt,.cm,[contenteditable]"))); }
function onKey(e){
  if (!box || box.hidden || document.querySelector(".chieu:not(.chieu-hd):not([hidden])") || document.querySelector(".zoom-ov")) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (typing(e.target)) { if (e.key === "Escape") e.target.blur(); return; }
  const k = e.key;
  if (k === "ArrowRight" || k === "PageDown") { e.preventDefault(); next(); }
  else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); prev(); }
  else if (k === "Home") { e.preventDefault(); goSlide(0); }
  else if (k === "a" || k === "A") showAll();
  else if (k === "+" || k === "=") zoom(0.1);
  else if (k === "-") zoom(-0.1);
  else if (k === "f" || k === "F") full();
  else if (k === "Escape" && !document.fullscreenElement) { if (!box.querySelector(".hd-cfg").hidden) toggleCfg(false); else close(); }
}
function zoom(d){ hz = Math.round(Math.max(0.8, Math.min(2.4, hz + d)) * 10) / 10; store("chieu-hd-zoom", String(hz)); box.style.setProperty("--hz", hz); }
function full(){ try { if (document.fullscreenElement) document.exitFullscreen(); else box.requestFullscreen(); } catch(e) {} }

/* Đưa hoạt động lên màn chiếu (di chuyển chính phần tử trên trang để giữ nguyên tương tác), rồi trả về chỗ cũ */
function putBack(){
  if (cur) cur.querySelectorAll(".hd-lop").forEach(x => x.remove());
  if (cur && home && home.parentNode) home.parentNode.replaceChild(cur, home);
  if (cur) cur.querySelectorAll(".hd-an,.hd-moi").forEach(x => x.classList.remove("hd-an", "hd-moi"));
  cur = null; home = null;
}
function stepEls(act){
  return [...act.children].filter(c => !c.classList.contains("act-tag") && !c.hidden && c.tagName !== "SCRIPT"
    && (c.classList.contains("hd-an") || getComputedStyle(c).display !== "none"));
}

function buildSlides(){
  const [a, b] = range(tiet), out = [{type: "cover"}];
  for (let i = a; i < b; i++) out.push({type: "act", i});
  out.push({type: "end"});
  slides = out;
  const dots = box.querySelector(".chieu-dots"); dots.innerHTML = "";
  const A = collect();
  slides.forEach((s, j) => {
    const lab = s.type === "cover" ? "Mở đầu tiết " + tiet : s.type === "end" ? "Kết thúc tiết " + tiet : A[s.i].code + " · " + A[s.i].label;
    const d = el("button", {type: "button", class: "chieu-dot" + (s.type !== "act" ? " hd-dc" : ""), title: lab, "aria-label": lab, "data-go": j},
      s.type === "cover" ? "▶" : s.type === "end" ? "■" : A[s.i].ghi ? "✎" : String(j));
    dots.appendChild(d);
  });
  const sel = box.querySelector("#hd-tiet");
  sel.innerHTML = Array.from({length: CFG.n}, (_, k) => '<option value="' + (k + 1) + '">Tiết ' + (k + 1) + "/" + CFG.n + "</option>").join("");
  sel.value = String(tiet); sel.hidden = CFG.n < 2;
}
function actList(a, b){
  const A = collect(); let h = "";
  for (let i = a; i < b; i++) {
    const x = A[i], j = slides.findIndex(s => s.type === "act" && s.i === i);
    h += "<li><button type=\"button\"" + (j >= 0 ? ' data-go="' + j + '"' : ' data-tiet="' + tietOf(i) + '"') + '><span class="hd-c">' + esc(x.ghi ? "✎" : x.code || "•") + "</span><span>" + esc(x.label)
      + "</span>" + (x.tasks ? '<span class="hd-q">' + x.tasks + " câu</span>" : "") + "</button></li>";
  }
  return '<ol class="hd-list">' + h + "</ol>";
}
function tietOf(i){ let t = 1; CFG.cuts.forEach(c => { if (i >= c) t++; }); return t; }
function render(){
  const s = slides[si], A = collect(), slide = box.querySelector(".hd-slide"), body = box.querySelector(".chieu-body");
  putBack(); slide.innerHTML = "";
  const tt = CFG.n > 1 ? "Tiết " + tiet + "/" + CFG.n : "";
  const nAct = slides.length - 2;
  if (s.type === "cover") {
    const [a, b] = range(tiet);
    slide.innerHTML = '<div class="hd-cover">' + (tt ? '<span class="hd-tiet">' + tt + "</span>" : "") + "<h1>" + esc(L.title || document.title) + "</h1>"
      + '<p class="hd-sub">' + (nAct ? "Hôm nay chúng ta cùng thực hiện " + nAct + " hoạt động:" : "Tiết này chưa có hoạt động.") + "</p>" + actList(a, b)
      + '<div class="hd-btns"><button class="btn primary" type="button" data-go="1">Bắt đầu →</button></div>'
      + '<p class="hd-tip">Phím → / ← (hoặc bút trình chiếu) để hiện từng bước · A hiện hết bước · + − cỡ chữ · F toàn màn hình · ✏️ bút viết, ⏱ đồng hồ ở góc phải.</p></div>';
    box.querySelector(".chieu-part").textContent = tt ? "Mở đầu " + tt.toLowerCase() : "Mở đầu";
    box.querySelector(".chieu-n").textContent = "";
  } else if (s.type === "end") {
    const last = tiet === CFG.n, [a, b] = last ? [0, 0] : range(tiet + 1);
    slide.innerHTML = '<div class="hd-cover">' + (tt ? '<span class="hd-tiet">' + tt + "</span>" : "") + "<h1>" + (last ? "Hoàn thành bài học 🎉" : "Kết thúc tiết " + tiet) + "</h1>"
      + (last ? '<p class="hd-sub">Em hãy kiểm tra đã nộp đủ câu trả lời và chép phần Ghi bài vào vở.</p>'
        : '<p class="hd-sub">Tiết sau chúng ta tiếp tục với:</p>' + actList(a, b))
      + '<div class="hd-btns">' + (last ? "" : '<button class="btn primary" type="button" data-tiet="' + (tiet + 1) + '">Sang tiết ' + (tiet + 1) + " →</button>")
      + '<button class="btn" type="button" data-go="0">Về đầu tiết</button><button class="btn" type="button" data-k="close">Đóng trình chiếu</button></div></div>';
    box.querySelector(".chieu-part").textContent = last ? "Kết thúc bài" : "Kết thúc " + tt.toLowerCase();
    box.querySelector(".chieu-n").textContent = "";
  } else {
    const x = A[s.i];
    home = document.createComment("chieu-hd"); x.act.parentNode.replaceChild(home, x.act); cur = x.act;
    slide.appendChild(cur);
    box.querySelector(".chieu-part").textContent = (x.code ? x.code + " · " : "") + x.label;
    mountLop();
    applySteps(false);
  }
  body.scrollTop = 0;
  box.querySelectorAll(".chieu-dot").forEach((d, j) => d.setAttribute("aria-current", j === si ? "true" : "false"));
  box.querySelector('[data-k="prev"]').disabled = si === 0 && tiet === 1;
  box.querySelector('[data-k="all"]').hidden = s.type !== "act";
}
function applySteps(animate){
  const s = slides[si]; if (!s || s.type !== "act" || !cur) return;
  cur.querySelectorAll(":scope > .hd-an").forEach(x => x.classList.remove("hd-an"));
  const all = stepEls(cur), n = all.length;
  if (steps[s.i] == null) steps[s.i] = Math.min(1, n);
  const k = Math.max(Math.min(1, n), Math.min(n, steps[s.i]));
  steps[s.i] = k;
  all.forEach((c, j) => { c.classList.toggle("hd-an", j >= k); c.classList.remove("hd-moi"); });
  if (animate && k > 0) { const c = all[k - 1]; void c.offsetWidth; c.classList.add("hd-moi"); setTimeout(() => c.scrollIntoView({block: "nearest", behavior: "smooth"}), 30); }
  const nAct = slides.length - 2;
  box.querySelector(".chieu-n").innerHTML = (CFG.n > 1 ? "Tiết " + tiet + "/" + CFG.n + " · " : "") + "Hoạt động " + si + "/" + nAct
    + (n > 1 ? ' · <span class="hd-step">Bước ' + k + "/" + n + "</span>" : "");
  box.querySelector('[data-k="all"]').disabled = k >= n;
}
function goSlide(j){ if (j < 0 || j >= slides.length) return; si = j; render(); box.querySelector('[data-k="next"]').focus(); }
function next(){
  const s = slides[si];
  if (s && s.type === "act" && cur) { const n = stepEls(cur).length; if ((steps[s.i] || 0) < n) { steps[s.i]++; applySteps(true); return; } }
  if (si < slides.length - 1) goSlide(si + 1);
  else if (tiet < CFG.n) setTiet(tiet + 1);
}
function prev(){
  const s = slides[si];
  if (s && s.type === "act" && cur && (steps[s.i] || 0) > 1) { steps[s.i]--; applySteps(false); return; }
  if (si > 0) goSlide(si - 1);
  else if (tiet > 1) { setTiet(tiet - 1); goSlide(slides.length - 1); }
}
function showAll(){ const s = slides[si]; if (s && s.type === "act" && cur) { steps[s.i] = stepEls(cur).length; applySteps(false); } }
function setTiet(t){ putBack(); tiet = Math.max(1, Math.min(CFG.n, t)); store("chieu-hd-tiet|" + BAI, String(tiet)); buildSlides(); goSlide(0); }

/* ---------- Lớp trả lời: thống kê, câu trả lời các nhóm, chọn một bài để nhận xét / khen ----------
   Chỉ có trên trang giáo viên đã vào buổi học (window.GV do gv.js cung cấp). Tự cập nhật mỗi lần trang giáo viên tải bài mới (8 giây). */
const LOP = {show: {}, sel: {}, anon: store("trungbay-an") === "1", msg: {}};
const lopOn = () => !!(window.GV && window.GV.ready && window.GV.ready());
const LET = L.L || ["A", "B", "C", "D", "E", "F", "G", "H"];
function ansHtml(id, d){
  const t = (L.TASKS || {})[id]; if (!t) return "";
  if (t.type === "open") { const s = ((d.ans || {})[id] || "").trim(); return s ? esc(s) : ""; }
  if (t.type === "mcq") { const i = (d.mcq || {})[id]; return i == null ? "" : "<b>" + LET[i] + ".</b> " + esc(t.o[i]); }
  const g = L.grade ? L.grade(id, d) : null; return g && g.text ? esc(g.text) : "";
}
function mountLop(){
  if (!cur || !lopOn()) return;
  cur.querySelectorAll("[data-task]").forEach(slot => { const p = el("div", {class: "hd-lop", "data-lop": slot.dataset.task}); slot.appendChild(p); drawLop(p); });
}
function refreshLop(){
  if (!box || box.hidden || !cur) return;
  const a = document.activeElement;
  cur.querySelectorAll(".hd-lop").forEach(p => { if (a && p.contains(a) && a.tagName === "TEXTAREA") { drawHead(p); return; } drawLop(p); });
}
document.addEventListener("gv-update", refreshLop);
function lopData(id){
  const D = window.GV.docs() || [];
  const list = D.map((d, i) => ({d, i, name: LOP.anon ? "Bài " + (i + 1) : (d.name || "(chưa có tên)"), sub: !!(d.sub && d.sub[id]), a: ansHtml(id, d)}));
  const sub = list.filter(x => x.sub && x.a);
  const g = x => (L.grade ? L.grade(id, x.d) : null);
  sub.forEach(x => { x.g = (L.TASKS[id].type === "open") ? null : g(x); });
  return {list, sub, ok: sub.filter(x => x.g && x.g.ok).length, graded: L.TASKS[id].type !== "open"};
}
function drawHead(p){
  const id = p.dataset.lop, R = lopData(id), rev = window.GV.rev(id), show = !!LOP.show[id];
  const h = p.querySelector(".hd-lop-h"); if (!h) return;
  h.querySelector(".hd-n").innerHTML = '<span class="hd-live" title="Tự cập nhật"></span> Đã nộp ' + R.sub.length + "/" + R.list.length
    + (R.graded && R.sub.length && (show || rev) ? " · Đúng " + R.ok + "/" + R.sub.length : "");
}
function drawLop(p){
  const id = p.dataset.lop, t = L.TASKS[id]; if (!t) return;
  const R = lopData(id), rev = window.GV.rev(id), show = !!LOP.show[id];
  let h = '<div class="hd-lop-h"><b>Lớp trả lời</b><span class="hd-n"></span><span class="sp"></span>'
    + '<button class="btn primary" type="button" data-l="show">' + (show ? "Ẩn kết quả" : "📊 Xem kết quả lớp") + "</button>"
    + '<button class="btn" type="button" data-l="anon" aria-pressed="' + LOP.anon + '">' + (LOP.anon ? "Hiện tên nhóm" : "Ẩn tên nhóm") + "</button>"
    + '<button class="btn" type="button" data-l="rev">' + (rev ? "Ẩn đáp án" : "✓ Chốt đáp án") + "</button>"
    + '<button class="btn" type="button" data-l="reload" title="Tải lại bài của lớp ngay">↻</button></div>';
  if (show) {
    /* thống kê */
    if (t.type === "mcq" && R.sub.length) {
      const c = t.o.map(() => 0); R.sub.forEach(x => { const v = (x.d.mcq || {})[id]; if (v != null) c[v]++; });
      h += '<div class="hd-stat">' + t.o.map((o, i) => { const pc = Math.round(100 * c[i] / R.sub.length);
        return '<div class="hd-bar' + (rev && i === t.a ? " ok" : "") + '"><span class="lb"><b>' + LET[i] + ".</b> " + esc(o) + (rev && i === t.a ? " ✓" : "") + '</span><span class="tr"><i style="width:' + pc + '%"></i></span><span class="ct">' + c[i] + " · " + pc + "%</span></div>"; }).join("") + "</div>";
    } else if (R.graded && R.sub.length) {
      const by = {}; let tot = 0;
      R.sub.forEach(x => { if (!x.g) return; tot = Math.max(tot, x.g.total); by[x.g.right] = (by[x.g.right] || 0) + 1; });
      const ks = Object.keys(by).map(Number).sort((a, b) => b - a);
      h += '<div class="hd-stat">' + ks.map(k => { const pc = Math.round(100 * by[k] / R.sub.length);
        return '<div class="hd-bar' + (rev && k === tot ? " ok" : "") + '"><span class="lb">Đúng ' + k + "/" + tot + (k === tot ? " (hoàn toàn)" : "") + '</span><span class="tr"><i style="width:' + pc + '%"></i></span><span class="ct">' + by[k] + " · " + pc + "%</span></div>"; }).join("") + "</div>";
    }
    /* bài được chọn */
    const sel = R.sub.find(x => x.d.clientId === LOP.sel[id]);
    if (sel) {
      const liked = window.GV.liked(id, sel.d), cm = window.GV.getComment(id, sel.d), mau = window.GV.mau(id);
      const okc = rev && sel.g ? (sel.g.ok ? '<span class="hd-chip ok">Đúng</span>' : '<span class="hd-chip bad">Chưa đúng</span>') : "";
      h += '<div class="hd-spot" data-cid="' + esc(sel.d.clientId) + '"><div class="nm">' + esc(sel.name) + okc + (liked ? '<span class="hd-chip kh">★ Thầy cô khen</span>' : "") + "</div>"
        + '<div class="an">' + sel.a + "</div>"
        + (mau.ok.length + mau.fix.length ? '<div class="mau">' + mau.ok.map(s => '<button type="button" class="ok" data-mau="' + esc(s) + '">' + esc(s) + "</button>").join("")
          + mau.fix.map(s => '<button type="button" class="fix" data-mau="' + esc(s) + '">' + esc(s) + "</button>").join("") + "</div>" : "")
        + '<label class="sr-only" for="hd-nx-' + esc(id) + '">Nhận xét cho ' + esc(sel.name) + '</label><textarea id="hd-nx-' + esc(id) + '" rows="2" placeholder="Nhận xét gửi cho nhóm (nhóm thấy ngay trên máy)…">' + esc(cm) + "</textarea>"
        + '<div class="row"><button class="btn primary" type="button" data-l="send">Gửi nhận xét</button>'
        + '<button class="btn like-btn" type="button" data-l="like" aria-pressed="' + liked + '">★ ' + (liked ? "Bỏ khen" : "Khen") + "</button>"
        + '<button class="btn" type="button" data-l="unsel">Đóng</button><span class="status">' + esc(LOP.msg[id] || "") + "</span></div></div>";
    }
    h += R.sub.length ? '<div class="hd-cards">' + R.sub.map(x => {
      const okc = rev && x.g ? (x.g.ok ? " ok" : " bad") : "";
      const liked = window.GV.liked(id, x.d), hasNx = !!window.GV.getComment(id, x.d);
      return '<button type="button" class="hd-card' + okc + '" data-sel="' + esc(x.d.clientId) + '" aria-pressed="' + (LOP.sel[id] === x.d.clientId) + '"><span class="nm">' + esc(x.name)
        + (liked ? '<span class="hd-chip kh">★</span>' : "") + (hasNx ? '<span class="hd-chip">Đã nhận xét</span>' : "") + '</span><span class="an">' + x.a + "</span></button>"; }).join("") + "</div>"
      : '<p class="hd-chua">Chưa có nhóm nào nộp câu này.</p>';
    const chua = R.list.filter(x => !x.sub);
    if (chua.length) h += '<p class="hd-chua">Chưa nộp (' + chua.length + "): " + (LOP.anon ? "" : chua.map(x => esc(x.name)).join(", ")) + "</p>";
  }
  p.innerHTML = h;
  drawHead(p);
}
document.addEventListener("click", async e => {
  const p = e.target.closest && e.target.closest(".hd-lop"); if (!p || !box || !box.contains(p)) return;
  const id = p.dataset.lop, b = e.target.closest("[data-l],[data-sel],[data-mau]"); if (!b) return;
  if (b.dataset.sel != null) { LOP.sel[id] = LOP.sel[id] === b.dataset.sel ? "" : b.dataset.sel; LOP.msg[id] = ""; drawLop(p);
    const s = p.querySelector(".hd-spot"); if (s) s.scrollIntoView({block: "nearest", behavior: "smooth"}); return; }
  if (b.dataset.mau != null) { const ta = p.querySelector(".hd-spot textarea"); if (ta) { const v = ta.value.trim(); ta.value = v ? v + " " + b.dataset.mau : b.dataset.mau; ta.focus(); } return; }
  const k = b.dataset.l;
  if (k === "show") { LOP.show[id] = !LOP.show[id]; drawLop(p); }
  else if (k === "anon") { LOP.anon = !LOP.anon; store("trungbay-an", LOP.anon ? "1" : "0"); cur.querySelectorAll(".hd-lop").forEach(drawLop); }
  else if (k === "rev") window.GV.toggleRev(id);
  else if (k === "reload") { b.disabled = true; try { await window.GV.refresh(); } finally { b.disabled = false; } }
  else if (k === "unsel") { LOP.sel[id] = ""; drawLop(p); }
  else if (k === "send" || k === "like") {
    const cid = LOP.sel[id], ta = p.querySelector(".hd-spot textarea"); if (!cid) return;
    b.disabled = true; LOP.msg[id] = "Đang gửi…"; const st = p.querySelector(".hd-spot .status"); if (st) st.textContent = LOP.msg[id];
    try {
      if (k === "send") { await window.GV.comment(id, cid, ta ? ta.value.trim() : ""); LOP.msg[id] = "Đã gửi nhận xét lúc " + new Date().toLocaleTimeString("vi-VN", {hour: "2-digit", minute: "2-digit"}); }
      else { await window.GV.like(id, cid); LOP.msg[id] = "Đã cập nhật lời khen"; }
    } catch(err) { LOP.msg[id] = "Chưa gửi được: " + err.message; }
    if (document.activeElement && p.contains(document.activeElement)) document.activeElement.blur();
    drawLop(p);
  }
});

/* ---------- Bảng chia tiết ---------- */
function toggleCfg(force){
  const p = box.querySelector(".hd-cfg"), b = box.querySelector('[data-k="cfg"]');
  const open = force == null ? p.hidden : force;
  p.hidden = !open; b.setAttribute("aria-expanded", String(open));
  if (open) drawCfg();
}
function drawCfg(){
  const p = box.querySelector(".hd-cfg"), A = collect();
  let h = "<h3>Chia bài thành nhiều tiết</h3><div>Số tiết của bài:</div><div class=\"seg\" role=\"group\" aria-label=\"Số tiết\">"
    + [1, 2, 3].map(n => '<button type="button" data-n="' + n + '" aria-pressed="' + (CFG.n === n) + '"' + (n > A.length ? " disabled" : "") + ">" + n + " tiết</button>").join("") + "</div>";
  CFG.cuts.forEach((c, k) => {
    h += '<label for="hd-cut' + k + '">Tiết ' + (k + 2) + " bắt đầu từ hoạt động:</label><select id=\"hd-cut" + k + '" data-cut="' + k + '">'
      + A.map((x, i) => i === 0 ? "" : '<option value="' + i + '"' + (i === c ? " selected" : "") + ">" + esc((x.ghi ? "✎ " : (x.code ? x.code + " · " : "")) + x.label) + "</option>").join("") + "</select>";
  });
  const sum = Array.from({length: CFG.n}, (_, k) => { const [a, b] = range(k + 1); let q = 0; for (let i = a; i < b; i++) q += A[i].tasks; return "Tiết " + (k + 1) + ": " + (b - a) + " hoạt động, " + q + " câu"; });
  h += '<p class="hd-sum">' + sum.join(" · ") + "</p>"
    + '<div class="row">' + (CFG.n > 1 ? '<button class="btn" type="button" data-auto>Chia tự động</button>' : "") + '<button class="btn primary" type="button" data-ok>Xong</button></div>'
    + '<p class="hd-sum">Lưu trên máy này, riêng cho bài này.</p>';
  p.innerHTML = h;
  p.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { const n = Number(b.dataset.n); CFG = {n, cuts: autoCuts(n)}; if (CFG.cuts.length !== n - 1) CFG = {n: CFG.cuts.length + 1, cuts: CFG.cuts}; saveCfg(); setTiet(1); drawCfg(); });
  p.querySelectorAll("[data-cut]").forEach(s => s.onchange = () => {
    const k = Number(s.dataset.cut), v = Number(s.value), c = CFG.cuts.slice(); c[k] = v;
    for (let j = k + 1; j < c.length; j++) if (c[j] <= c[j - 1]) c[j] = Math.min(A.length - (c.length - j), c[j - 1] + 1);
    for (let j = k - 1; j >= 0; j--) if (c[j] >= c[j + 1]) c[j] = Math.max(1 + j, c[j + 1] - 1);
    CFG.cuts = c; saveCfg(); const t = Math.min(tiet, CFG.n); putBack(); tiet = t; buildSlides(); si = Math.min(si, slides.length - 1); render(); drawCfg(); });
  const au = p.querySelector("[data-auto]"); if (au) au.onclick = () => { CFG.cuts = autoCuts(CFG.n); saveCfg(); setTiet(tiet); drawCfg(); };
  p.querySelector("[data-ok]").onclick = () => toggleCfg(false);
}

function open(opt){
  opt = opt || {};
  if (!collect().length) return;
  if (!box) build();
  CFG = loadCfg();
  lastFocus = document.activeElement;
  box.style.setProperty("--hz", hz);
  box.hidden = false;
  document.documentElement.classList.add("chieu-on");
  const t = Number(opt.tiet || store("chieu-hd-tiet|" + BAI)) || 1;
  tiet = Math.max(1, Math.min(CFG.n, t)); buildSlides();
  let j = 0;
  if (opt.act != null) { const i = collect().findIndex(x => x.act === opt.act); if (i >= 0) { tiet = tietOf(i); buildSlides(); j = slides.findIndex(s => s.type === "act" && s.i === i); } }
  goSlide(Math.max(0, j));
}
function close(){
  if (!box || box.hidden) return;
  if (document.fullscreenElement) { try { document.exitFullscreen(); } catch(e) {} }
  const back = cur;
  putBack(); toggleCfg(false);
  box.hidden = true;
  if (!document.querySelector(".chieu:not(.chieu-hd):not([hidden])")) document.documentElement.classList.remove("chieu-on");
  if (back) back.scrollIntoView({block: "start"});
  else if (lastFocus && lastFocus.focus) lastFocus.focus();
}
window.ChieuHD = {open, close};

/* ---------- Nút mở trình chiếu ---------- */
function addButton(){
  const anchor = document.getElementById("chieu-all");
  const b = el("button", {class: "btn chieu-btn", type: "button", id: "chieu-hd", title: "Chiếu từng hoạt động, hiện từng bước khi lên lớp; chia bài thành nhiều tiết"}, ICON + "Trình chiếu hoạt động");
  b.addEventListener("click", () => {
    ACTS = null;
    if (collect().length) open();
    else { const u = new URL("index.html", location.href); u.search = "?chieu=1"; window.open(u.toString(), "_blank", "noopener"); }
  });
  if (anchor) anchor.before(b);
  else { const t = document.querySelector("header .tools, .tools"); if (t) t.prepend(b); else return; }
}
function init(){
  addButton();
  const q = new URLSearchParams(location.search);
  if (q.get("chieu") === "1") setTimeout(() => open({tiet: q.get("tiet")}), 300);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else setTimeout(init, 0);
})();
