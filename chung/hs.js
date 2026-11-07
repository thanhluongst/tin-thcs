
(function(){
"use strict";
/* ================= NỘI DUNG ================= */
const {TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, esc} = window.LESSON;
const TEACHER_PIN = "tin7";

/* ================= TRẠNG THÁI ================= */
const KEY = window.LESSON.key || (window.LESSON.id + "-v1");
function fresh(){ return {name:"Nhóm 1", ans:{}, sub:{}, mcq:{}, sort:{}, match:{}, order:{}, t:0, rev:{}, note:{}, teacher:false, groups:{}, active:"g1", ngroups:8}; }
let S = fresh();
try { const raw = JSON.parse(localStorage.getItem(KEY) || "null"); if (raw && typeof raw === "object") S = Object.assign(fresh(), raw); } catch(e) {}
["ans","sub","mcq","sort","match","order","rev","note","groups"].forEach(k => { if (!S[k] || typeof S[k] !== "object") S[k] = {}; });
if (!/^(g\d+|on:[A-Z0-9_.\-]+)$/.test(S.active)) S.active = "g1";
if (!(S.ngroups >= 1 && S.ngroups <= 20)) S.ngroups = 8;

/* Nhiều nhóm trên một máy: bài của nhóm đang chọn nằm ở S.ans/S.sub/…; các nhóm khác cất trong S.groups */
const GF = ["name","ans","sub","mcq","sort","match","order","t"];
const clone = o => JSON.parse(JSON.stringify(o));
const gNum = k => Number(k.slice(1));
function workingSet(){ const g = {}; GF.forEach(f => g[f] = clone(S[f] == null ? (f === "name" ? "" : f === "t" ? 0 : {}) : S[f])); return g; }
function stash(){ S.groups[S.active] = workingSet(); }
function groupData(k){ if (k === S.active) return workingSet(); const g = S.groups[k] || {}; return {name: g.name || (k[0] === "g" ? "Nhóm " + gNum(k) : ""),ans: g.ans || {}, sub: g.sub || {}, mcq: g.mcq || {}, sort: g.sort || {}, match: g.match || {}, order: g.order || {}, t: g.t || 0}; }
function switchGroup(k){
  if (k === S.active) return;
  stash();
  const g = groupData(k);
  S.active = k;
  GF.forEach(f => S[f] = clone(g[f]));
  saveLocal(); nm.value = S.name || "";
  renderAll();
  window.scrollTo({top: 0});
}
const groupsOn = () => mode === "local";
const noteKey = id => S.active + "|" + id;

/* mode: local (một máy, không mạng) | online (đã vào buổi học, bài gửi lên Google Sheets) */
let mode = "local";
let REV = {};            // phần chốt giáo viên mở cho buổi học
let NX = {};             // nhận xét giáo viên gửi cho máy này (theo từng câu); khoá "like.<câu>" là lượt khen
const THUMB = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';
let BAN = {};            // bạn bè thích / nhận xét bài của máy này: {câu: {n, cm:[{g, t}]}}
const HEART = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
let myWriter = null;
const classDocs = [];
if (!S.clientId) S.clientId = "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function saveLocal(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} }
let rafPending = false;
function changed(){ if (!rafPending) { rafPending = true; requestAnimationFrame(() => { rafPending = false; renderAll(); }); } S.t = Date.now(); saveLocal(); if (myWriter && mode === "online") myWriter.queue(); updateProgress(); if (dashOn()) { renderDash(); renderGroups(); } }
const dashOn = () => mode === "local" && !!S.teacher;
const isTeacher = () => mode === "local" && !!S.teacher;
const isRev = id => (mode === "local" ? !!S.rev[id] : !!REV[id]);
function setRev(id, v){
  if (mode === "local") { S.rev[id] = v; saveLocal(); }
  renderAll();
}

function el(tag, attrs, html){ const e = document.createElement(tag); if (attrs) for (const a in attrs) e.setAttribute(a, attrs[a]); if (html != null) e.innerHTML = html; return e; }

/* ================= CHẤM ĐIỂM (dùng chung cho HS và bảng GV) ================= */
/* ================= DỰNG CÂU HỎI ================= */
const renders = [];
function keyBox(id, html){
  const box = el("div", {class:"key"});
  box.appendChild(el("div", {class:"key-label"}, "Chốt kiến thức"));
  box.appendChild(el("div", null, html));
  const n = el("div", {class:"note"});
  const lid = "note-" + id;
  n.appendChild(el("label", {for:lid}, "Nhận xét của giáo viên (ghi trên máy đang trình chiếu)"));
  const ta = el("textarea", {id:lid, placeholder: window.LESSON.notePh || "Ghi nhận xét…"});
  ta.addEventListener("input", () => { S.note[noteKey(id)] = ta.value; saveLocal(); });
  n.appendChild(ta); box.appendChild(n);
  const sync = () => { if (document.activeElement !== ta) ta.value = S.note[noteKey(id)] || ""; };
  return {box, note:n, sync};
}

const BODY = {
  open(id){
    const ta = el("textarea", {id:"ans-" + id, placeholder:"Viết câu trả lời của em…"});
    ta.value = S.ans[id] || "";
    ta.addEventListener("input", () => { S.ans[id] = ta.value; changed(); });
    return {node: ta, has: () => !!(S.ans[id] || "").trim(), render(sub){ ta.readOnly = sub; }, sync(){ ta.value = S.ans[id] || ""; }};
  },
  mcq(id, t){
    const box = el("div", {class:"opts"});
    const btns = t.o.map((txt, i) => { const b = el("button", {class:"opt", type:"button"}, '<span class="l">' + L[i] + '.</span>' + esc(txt));
      b.addEventListener("click", () => { if (S.sub[id]) return; S.mcq[id] = i; changed(); renderAll(); }); box.appendChild(b); return b; });
    return {node: box, has: () => S.mcq[id] != null, render(sub, rev){ const v = S.mcq[id];
      btns.forEach((b, i) => { b.disabled = sub; b.className = "opt" + (v === i ? " sel" : "") + (rev && i === t.a ? " right" : "") + (rev && v === i && i !== t.a ? " wrong" : ""); }); }};
  },
  sort(id, t){
    if (!S.sort[id]) S.sort[id] = {};
    /* Nhãn nhóm dài (ví dụ câu ghép nối) thì xếp nút chọn xuống dưới nội dung, không chen vào cùng hàng */
    const wide = t.cats.join("").length > 36 || t.cats.some(c => c.length > 24);
    const box = el("div", {class:"sort" + (wide ? " wide" : "")});
    const cats = t.cats.concat(["?"]);
    const rows = t.items.map(([name], i) => {
      const r = el("div", {class:"sort-row"});
      const lab = el("span", null, esc(name)); const hint = el("span", {class:"hint"}); lab.appendChild(hint);
      const seg = el("div", {class:"seg", role:"group", "aria-label":"Chọn nhóm cho " + name});
      const bs = cats.map((c, ci) => { const val = ci === t.cats.length ? -1 : ci;
        /* Nút "?" = em chưa chắc, để thầy cô biết chỗ cần giải thích; nhãn dài thì ghi rõ chữ */
        const b = val === -1
          ? el("button", {type:"button", "aria-pressed":"false", class:"unsure", title:"Em chưa chắc câu này", "aria-label":"Chưa chắc"}, wide ? "? Em chưa chắc" : "?")
          : el("button", {type:"button", "aria-pressed":"false", class:""}, esc(c));
        b.addEventListener("click", () => { if (S.sub[id]) return; (S.sort[id] = S.sort[id] || {})[i] = val; changed(); renderAll(); }); seg.appendChild(b); return {b, val}; });
      r.append(lab, seg); box.appendChild(r); return {r, bs, hint};
    });
    return {node: box, has: () => Object.keys(S.sort[id] || {}).length > 0, render(sub, rev){
      const m = S.sort[id] || {};
      rows.forEach(({r, bs, hint}, i) => { const v = m[i];
        bs.forEach(({b, val}) => { b.setAttribute("aria-pressed", v === val ? "true" : "false"); b.disabled = sub; });
        const ok = v === t.items[i][1];
        r.className = "sort-row" + (rev ? (ok ? " right" : " wrong") : "");
        hint.textContent = rev && !ok ? "Đáp án: " + t.cats[t.items[i][1]] : ""; }); }};
  },
  match(id, t){
    if (!S.match[id]) S.match[id] = {};
    const grid = el("div", {class: t.opts ? "match wide" : "match"});
    const items = t.items.map(([name], i) => { const sid = "m-" + id + "-" + i;
      const lab = el("label", {for:sid}, "<span>" + esc(name) + "</span>");
      const sel = el("select", {id:sid}); sel.appendChild(el("option", {value:""}, t.ph || "Cổng…"));
      const opts = t.opts || [1,2,3,4,5,6,7,8].map(String);
      opts.forEach((o, k) => sel.appendChild(el("option", {value:String(k + 1)}, esc(o))));
      sel.addEventListener("change", () => { (S.match[id] = S.match[id] || {})[i] = sel.value; changed(); renderAll(); });
      lab.appendChild(sel); grid.appendChild(lab); return {lab, sel}; });
    return {node: grid, has: () => Object.values(S.match[id] || {}).some(Boolean), render(sub, rev){
      items.forEach(({lab, sel}, i) => { const v = (S.match[id] || {})[i] || ""; sel.value = v; sel.disabled = sub;
        lab.className = rev ? (Number(v) === t.items[i][1] ? "right" : "wrong") : ""; }); }};
  },
  order(id, t){
    if (!Array.isArray(S.order[id]) || S.order[id].length !== t.start.length) S.order[id] = t.start.slice();
    const ol = el("ol", {class:"order"});
    function move(i, dir){ const a = S.order[id].slice(), j = i + dir; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; S.order[id] = a; changed(); renderAll(); }
    return {node: ol, has: () => !!S.sub[id] || (Array.isArray(S.order[id]) && S.order[id].join() !== t.start.join()), render(sub, rev){
      if (!Array.isArray(S.order[id]) || S.order[id].length !== t.start.length) S.order[id] = t.start.slice();
      const a = S.order[id]; ol.innerHTML = "";
      a.forEach((k, i) => { const ok = k === t.ans[i];
        const li = el("li", {class: rev ? (ok ? "right" : "wrong") : ""});
        li.appendChild(el("span", {class:"pos"}, (i + 1) + "."));
        li.appendChild(el("span", null, "<b>" + k + ")</b> " + esc(t.items[k])));
        const mv = el("div", {class:"mv"});
        const up = el("button", {type:"button", "aria-label":"Đưa lên"}, "↑"); up.disabled = sub || i === 0; up.addEventListener("click", () => move(i, -1));
        const dn = el("button", {type:"button", "aria-label":"Đưa xuống"}, "↓"); dn.disabled = sub || i === a.length - 1; dn.addEventListener("click", () => move(i, 1));
        mv.append(up, dn); li.appendChild(mv); ol.appendChild(li); }); }};
  }
};

/* ================= BẠN BÈ THÍCH, NHẬN XÉT BÀI CỦA NHAU =================
   Chỉ khi học trực tuyến và thầy cô đã mở câu đó (khoá "ban.<câu>"). Mỗi nhóm thả tim một lần và viết một nhận xét
   (sửa được) cho bài của mỗi nhóm khác. Thầy cô xem được và ẩn được nhận xét không phù hợp. */
const peerOpen = id => mode === "online" && !!REV["ban." + id];
function peerText(id, t, d){
  if (t.type === "open") return esc(((d.ans || {})[id]) || "");
  if (t.type === "mcq") { const i = (d.mcq || {})[id]; return i == null ? "" : "<b>" + L[i] + ".</b> " + esc(t.o[i]); }
  const g = grade(id, d); return g ? esc(g.text) : "";
}
function makePeer(id, t){
  /* những gì bạn bè gửi cho bài của em */
  const got = el("div", {class:"peer-got", hidden:""});
  /* nút mở danh sách bài các bạn */
  const box = el("div", {class:"peer", hidden:""});
  const tog = el("button", {class:"btn peer-tog", type:"button", "aria-expanded":"false"});
  const msg = el("span", {class:"status"});
  const list = el("div", {class:"peer-list", hidden:""});
  const head = el("div", {class:"row"}); head.append(tog, msg);
  box.append(head, list);
  let open = false, timer = null, items = new Map(), busy = false;
  tog.addEventListener("click", () => { open = !open; render(); if (open) load(); else clearTimeout(timer); });
  async function load(){
    clearTimeout(timer);
    if (!open || !peerOpen(id)) return;
    if (!busy) { busy = true;
      try { const L = await API.getPeers(window.LESSON.id, S.session, id, S.clientId); draw(L); msg.textContent = L.filter(x => !x.mine).length ? "" : "Chưa có nhóm nào khác nộp câu này."; msg.className = "status"; }
      catch(e) { msg.textContent = e.message; msg.className = "status bad"; }
      busy = false; }
    timer = setTimeout(load, 20000 + Math.random() * 5000);
  }
  /* Lớp đông (tới 50 bài): mỗi máy thấy các bài theo một thứ tự xáo riêng (cố định trên máy đó), để tim và nhận xét
     chia đều cho các nhóm, không dồn vào mấy bài đầu danh sách; hiện 10 bài một lần, bấm "Xem thêm". */
  let limit = 10;
  const more = el("button", {class:"btn", type:"button", hidden:""});
  more.addEventListener("click", () => { limit += 10; draw(lastL); });
  let lastL = [];
  const rank = cid => { let h = 2166136261; const s = S.clientId + "|" + cid; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; };
  function draw(L){
    lastL = L;
    const seen = new Set();
    L = L.slice().sort((a, b) => (a.mine - b.mine) || rank(a.cid) - rank(b.cid));
    const others = L.filter(p => !p.mine);
    L = others.slice(0, limit).concat(L.filter(p => p.mine));
    more.hidden = others.length <= limit;
    more.textContent = "Xem thêm bài các bạn (còn " + (others.length - limit) + ")";
    L.forEach(p => {
      seen.add(p.cid);
      let it = items.get(p.cid);
      if (!it) { it = makeCard(p); items.set(p.cid, it); }
      list.appendChild(it.card);   // giữ đúng thứ tự
      it.update(p);
    });
    items.forEach((it, cid) => { if (!seen.has(cid)) { it.card.remove(); items.delete(cid); } });
    const mineCard = list.querySelector(".peer-card.mine");
    list.insertBefore(more, mineCard);   /* nút "Xem thêm" nằm sau bài các bạn, trước bài của em */
  }
  function makeCard(p){
    const card = el("div", {class:"peer-card" + (p.mine ? " mine" : "")});
    const who = el("div", {class:"who-l"}), txt = el("div", {class:"txt"}), cms = el("ul", {class:"peer-cms"});
    card.append(who, txt);
    const it = {card, p, dirty: false};
    if (!p.mine) {
      const like = el("button", {class:"btn heart", type:"button", "aria-pressed":"false"});
      const taId = "pc-" + id + "-" + p.cid;
      const ta = el("textarea", {id: taId, rows:"2", maxlength:"300", placeholder:"Nhận xét ngắn cho nhóm bạn: khen điều hay, góp ý điều cần sửa…"});
      const lab = el("label", {for: taId, class:"sr-only"}, "Nhận xét của em cho " + esc(p.group));
      const send = el("button", {class:"btn", type:"button"}, "Gửi nhận xét");
      const st = el("span", {class:"status"});
      const row = el("div", {class:"row"}); row.append(like, send, st);
      card.append(cms, lab, ta, row);
      Object.assign(it, {like, ta, send, st});
      ta.addEventListener("input", () => { it.dirty = true; st.textContent = "Chưa gửi"; st.className = "status"; });
      ta.addEventListener("keydown", e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) send.click(); });
      like.addEventListener("click", () => react(it, {like: !it.p.liked}));
      send.addEventListener("click", () => react(it, {text: ta.value}));
    } else card.appendChild(cms);
    it.update = q => {
      it.p = q;
      who.innerHTML = esc(q.group || "(chưa có tên)") + (q.mine ? ' <span class="chip info">Bài của em</span>' : "") + (q.n ? ' <span class="chip heart-n">' + HEART + q.n + "</span>" : "");
      txt.innerHTML = peerText(id, t, q.data || {}) || '<span class="empty">Chưa trả lời</span>';
      const others = (q.cm || []).filter(c => !c.mine);
      cms.innerHTML = others.map(c => "<li><b>" + esc(c.g || "Bạn") + ":</b> " + esc(c.t) + "</li>").join("");
      cms.hidden = !others.length;
      if (it.like) {
        it.like.setAttribute("aria-pressed", String(!!q.liked));
        it.like.innerHTML = HEART + (q.liked ? "Đã thích" : "Thích");
        const mineCm = (q.cm || []).find(c => c.mine);
        if (!it.dirty && document.activeElement !== it.ta) it.ta.value = mineCm ? mineCm.t : "";
      }
    };
    return it;
  }
  async function react(it, change){
    if (it.saving) return;
    it.saving = true; it.like.disabled = it.send.disabled = true; it.st.textContent = "Đang gửi…"; it.st.className = "status";
    try {
      const mine = await API.react(Object.assign({bai: window.LESSON.id, buoi: S.session, task: id, clientId: S.clientId, group: S.name || "", to: it.p.cid, toGroup: it.p.group}, change));
      const p = Object.assign({}, it.p);
      if ("like" in change) { p.n = Math.max(0, (p.n || 0) + (mine.like ? 1 : 0) - (p.liked ? 1 : 0)); p.liked = !!mine.like; }
      if ("text" in change) { p.cm = (p.cm || []).filter(c => !c.mine); if (mine.text) p.cm.push({g: S.name, t: mine.text, mine: true}); it.dirty = false; }
      it.update(p);
      it.st.textContent = "like" in change ? (mine.like ? "Đã thả tim" : "Đã bỏ thích") : (mine.text ? "Đã gửi lúc " + stamp() : "Đã xoá nhận xét"); it.st.className = "status ok";
    } catch(e) { it.st.textContent = e.message; it.st.className = "status bad"; }
    it.saving = false; it.like.disabled = it.send.disabled = false;
  }
  function render(){
    const on = peerOpen(id);
    box.hidden = !on;
    if (!on && open) { open = false; clearTimeout(timer); }
    tog.setAttribute("aria-expanded", String(open));
    tog.innerHTML = open ? "Ẩn bài của các bạn" : "👀 Xem bài các bạn, thả tim và nhận xét";
    list.hidden = !open;
    const b = mode === "online" ? BAN[id] : null;
    got.hidden = !b;
    if (b) got.innerHTML = '<span class="fl">Các bạn bình chọn bài của em</span>'
      + (b.n ? '<span class="heart-n">' + HEART + b.n + " bạn thích</span>" : "")
      + ((b.cm || []).length ? "<ul>" + b.cm.map(c => "<li><b>" + esc(c.g || "Bạn") + ":</b> " + esc(c.t) + "</li>").join("") + "</ul>" : "");
  }
  return {box, got, render};
}

const syncers = [];
document.querySelectorAll("[data-task]").forEach(slot => {
  const id = slot.dataset.task, t = TASKS[id];
  slot.className = "q";
  const pill = el("span", {class:"pill-state"});
  const qt = el("p", {class:"q-text"}, (slot.dataset.n ? '<span class="n">' + slot.dataset.n + '.</span>' : "") + esc(t.q));
  qt.insertBefore(pill, qt.firstChild);
  slot.appendChild(qt);
  const body = BODY[t.type](id, t);
  slot.appendChild(body.node);
  if (body.sync) syncers.push(body.sync);
  const row = el("div", {class:"row"});
  const bSub = el("button", {class:"btn primary", type:"button"});
  const bKey = el("button", {class:"btn keybtn", type:"button"});
  const st = el("span", {class:"status"});
  row.append(bSub, bKey, st); slot.appendChild(row);
  const kb = keyBox(id, (t.type === "mcq" ? "Đáp án đúng: <b>" + L[t.a] + "</b>. " : "") + t.k);
  const liked = el("div", {class:"liked praise"}, '<span class="praise-medal">' + (window.Khen ? window.Khen.STAR : THUMB) + '</span><span class="praise-tx"><b>Thầy cô khen câu trả lời của em!</b><span>Rất tốt, em hãy tiếp tục phát huy nhé.</span></span>');
  const fb = el("div", {class:"feedback"}, '<span class="fl">Nhận xét của thầy cô</span>');
  const fbText = el("span", {class:"ft"}); fb.appendChild(fbText);
  slot.insertBefore(fb, row.nextSibling);
  slot.insertBefore(liked, fb);
  slot.appendChild(kb.box);
  const peer = makePeer(id, t);
  slot.insertBefore(peer.got, fb.nextSibling);
  slot.appendChild(peer.box);
  let err = "";
  function render(){
    const sub = !!S.sub[id], rev = isRev(id), T = isTeacher();
    body.render(sub, rev);
    if (body.sync && document.activeElement !== body.node) body.sync();
    bSub.textContent = sub ? "Sửa câu trả lời" : "Nộp câu trả lời";
    bSub.classList.toggle("primary", !sub);
    bKey.hidden = !T;
    bKey.textContent = rev ? "Ẩn phần chốt" : "GV nhận xét & chốt";
    const g = rev ? grade(id, S) : null;
    if (err) { st.textContent = err; st.className = "status bad"; }
    else if (g) { st.textContent = g.ok ? "Chính xác!" : (t.type === "mcq" || t.type === "order" ? "Chưa đúng, xem phần chốt." : "Đúng " + g.right + "/" + g.total + ". Xem các dòng màu đỏ."); st.className = "status " + (g.ok ? "ok" : "bad"); }
    else if (sub) { st.textContent = rev ? "Đã nộp" : (T ? "Đã nộp" : "Đã nộp. Chờ thầy cô nhận xét và chốt."); st.className = "status ok"; }
    else { st.textContent = ""; st.className = "status"; }
    kb.box.hidden = !rev;
    kb.note.hidden = !T;
    kb.sync();
    const nx = mode === "online" ? (NX[id] || "") : "";
    fbText.textContent = nx; fb.hidden = !nx;
    liked.hidden = !(mode === "online" && NX["like." + id]);
    slot.classList.toggle("praised", !liked.hidden);
    peer.render();
    /* màu trạng thái: chưa làm / đang làm / đã nộp / đúng / cần sửa */
    const gg = rev ? grade(id, S) : null;
    const state = !body.has() ? "empty" : !sub ? "draft" : gg ? (gg.ok ? "right" : "wrong") : "sub";
    slot.dataset.state = state;
    pill.textContent = {empty: "Chưa làm", draft: "Chưa nộp", sub: rev ? "Đã nộp" : "Đã nộp, chờ chốt", right: "Đúng", wrong: "Cần sửa"}[state];
  }
  bSub.addEventListener("click", () => {
    if (!S.sub[id] && !body.has()) { err = "Em hãy trả lời trước khi nộp."; render(); return; }
    err = ""; S.sub[id] = !S.sub[id]; changed(); renderAll();
  });
  bKey.addEventListener("click", () => setRev(id, !isRev(id)));
  renders.push(render);
});

document.querySelectorAll("[data-concept]").forEach(slot => {
  const id = slot.dataset.concept, d = CONCEPTS[id];
  slot.className = "concept-wrap";
  const b = el("button", {class:"btn keybtn", type:"button"});
  const wait = el("p", {class:"wait"}, d.t + " sẽ được thầy cô chốt sau khi cả lớp trình bày.");
  const box = el("div", {class: d.ghi ? "concept ghi" : "concept"}, "<h3>" + d.t + "</h3>" + d.b);
  // mục Ghi bài: thêm nút chiếu lên màn hình lớn cho học sinh chép
  const row = el("div", {class:"btn-row"}); row.appendChild(b);
  if (d.ghi && window.Chieu) {
    const pj = el("button", {class:"btn chieu-btn", type:"button"}, '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/></svg>Chiếu ghi bài');
    pj.addEventListener("click", () => window.Chieu.open(id, {onShow: k => { if (!isRev(k)) setRev(k, true); }}));
    row.appendChild(pj);
  }
  slot.append(row, wait, box);
  renders.push(() => { const rev = isRev(id), T = isTeacher();
    box.hidden = !rev; wait.hidden = rev || T; row.hidden = !T;
    b.textContent = rev ? "Ẩn " + d.t.toLowerCase() : "GV chốt " + d.t.toLowerCase(); });
  b.addEventListener("click", () => setRev(id, !isRev(id)));
});

/* ================= TIẾN ĐỘ, CHẾ ĐỘ ================= */
function updateProgress(){
  const n = mode === "online" ? Object.keys(NX).filter(k => k.indexOf("like.") === 0 && TASKS[k.slice(5)]).length : 0;
  const p = document.getElementById("prog");
  p.innerHTML = "Đã nộp " + countSub(S) + "/" + TASK_IDS.length + " câu" + (n ? ' <span class="praise-count" title="Số câu được thầy cô khen">⭐ ' + n + " lời khen</span>" : "");
}
/* Lời khen mới của thầy cô: chúc mừng một lần cho mỗi câu (nhớ trên máy, tải lại trang không lặp lại) */
function celebrateNew(){
  if (mode !== "online" || !S.session) return;
  const liked = Object.keys(NX).filter(k => k.indexOf("like.") === 0).map(k => k.slice(5)).filter(id => TASKS[id]);
  S.seenLike = S.seenLike || {};
  const seen = S.seenLike[S.session] = S.seenLike[S.session] || {};
  Object.keys(seen).forEach(id => { if (liked.indexOf(id) < 0) delete seen[id]; });   /* thầy cô bỏ khen rồi khen lại thì chúc mừng lại */
  const fresh = liked.filter(id => !seen[id]);
  if (!fresh.length) return;
  fresh.forEach(id => { seen[id] = 1; }); saveLocal();
  if (window.Khen) window.Khen.celebrate(fresh.map(id => ({id, label: TASKS[id].label, el: document.querySelector('[data-task="' + id + '"]')})), liked.length);
}

const $ = id => document.getElementById(id);
function setSync(t){ $("sync").textContent = t; }
function updateModeUI(){
  const T = isTeacher();
  const texts = {
    local: T ? "Chế độ giáo viên trên máy này: chọn nhóm để ghi câu trả lời khi nhóm báo cáo, xem bảng Theo dõi lớp, rồi chốt kiến thức." : "Bài làm được lưu trên máy này. Nhiều nhóm có thể dùng chung máy: chọn đúng nhóm trước khi làm.",
    online: "Bài làm của em được gửi cho thầy cô. Phần chốt hiện ra khi thầy cô chốt." + (window.API && API.demo ? " (Chế độ thử: chưa nối Google Sheets.)" : "")
  };
  $("join-box").hidden = mode !== "local" || T || API.demo;   // chưa nối Google Sheets: chỉ dùng chế độ một máy
  $("join-info").hidden = mode !== "online";
  $("join-code").textContent = S.session || "";
  $("mode-pill").textContent = T ? "Giáo viên" : "Học sinh";
  $("mode-pill").className = "pill" + (T ? " t" : "");
  $("mode-text").textContent = texts[mode];
  $("pin-box").hidden = mode !== "local" || T;
  $("t-exit").hidden = !(mode === "local" && T);
  $("reveal-all").hidden = !T; $("hide-all").hidden = !T;
  if ($("chieu-all")) $("chieu-all").hidden = !T || !window.Chieu || !window.Chieu.parts.length;
  if ($("tb-all")) $("tb-all").hidden = !(T && groupsOn());
  if ($("gt-btn")) $("gt-btn").hidden = !T;
  $("theo-doi").hidden = !dashOn(); $("toc-dash").hidden = !dashOn();
  $("group-bar").hidden = !groupsOn();
  $("name-label").textContent = groupsOn() ? "Tên nhóm / học sinh:" : "Họ tên / Nhóm:";
  $("dash-open-h").textContent = groupsOn() ? "Mở bài" : "";
}
function renderGroups(){
  if (!groupsOn()) return;
  const box = $("gchips"); box.innerHTML = "";
  for (let i = 1; i <= S.ngroups; i++) {
    const k = "g" + i, g = groupData(k);
    const b = el("button", {class:"gchip", type:"button", "aria-pressed": k === S.active ? "true" : "false", title: g.name},
      '<span class="gn">' + esc(g.name || ("Nhóm " + i)) + '</span><span class="gc">' + countSub(g) + "/" + TASK_IDS.length + "</span>");
    b.addEventListener("click", () => switchGroup(k));
    box.appendChild(b);
  }
  if (S.ngroups < 20) {
    const add = el("button", {class:"gchip add", type:"button"}, "+ Thêm nhóm");
    add.addEventListener("click", () => { S.ngroups++; saveLocal(); switchGroup("g" + S.ngroups); });
    box.appendChild(add);
  }
}
let outline = null;
function renderAll(){ renders.forEach(r => r()); updateProgress(); updateModeUI(); renderGroups(); if (dashOn()) renderDash(); if (outline) outline.update(); }

/* tên */
const nm = $("hs-name");
nm.value = S.name || "";
nm.addEventListener("input", () => { S.name = nm.value; changed(); });

/* PIN giáo viên (chế độ một máy) */
$("pin-go").addEventListener("click", () => {
  if ($("pin").value.trim().toLowerCase() === TEACHER_PIN) { S.teacher = true; $("pin").value = ""; $("pin-msg").textContent = ""; saveLocal(); renderAll(); }
  else $("pin-msg").textContent = "Mã chưa đúng.";
});
$("pin").addEventListener("keydown", e => { if (e.key === "Enter") $("pin-go").click(); });
$("t-exit").addEventListener("click", () => { S.teacher = false; saveLocal(); renderAll(); });
const ALL_REV = TASK_IDS.concat(Object.keys(CONCEPTS));
function setAll(v){
  if (mode === "local") { ALL_REV.forEach(k => S.rev[k] = v); saveLocal(); }
  renderAll();
}
$("reveal-all").addEventListener("click", () => setAll(true));
/* Trưng bày bài nhóm (giáo viên, một máy nhiều nhóm): chiếu bài các nhóm đã ghi trên máy này */
const TB_ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>';
if ($("chieu-all") && window.TrungBay) {
  const b = el("button", {class:"btn tb-btn", type:"button", id:"tb-all", hidden:""}, TB_ICON + "Trưng bày bài nhóm");
  b.addEventListener("click", () => {
    if (groupsOn()) stash();
    window.TrungBay.open({
      docs: () => { const out = []; for (let i = 1; i <= S.ngroups; i++) { const k = "g" + i, g = groupData(k); if (countSub(g) || Object.keys(g.ans || {}).some(x => (g.ans[x] || "").trim()) || Object.keys(g.mcq || {}).length) out.push(Object.assign({key: k}, g, {name: g.name || ("Nhóm " + i)})); } return out; },
      rev: id => isRev(id),
      getComment: (id, d) => S.note[d.key + "|" + id] || "",
      commentLabel: "Lưu nhận xét",
      commentHint: "ghi trên máy này, hiện ở ô nhận xét của câu",
      comment: async (id, d, text) => { if (text) S.note[d.key + "|" + id] = text; else delete S.note[d.key + "|" + id]; saveLocal(); renderAll(); }
    });
  });
  $("chieu-all").after(b);
  if (window.GoiTen) { const gtb = el("button", {class:"btn tb-btn", type:"button", id:"gt-btn"}, "🎯 Gọi tên học sinh");
  gtb.addEventListener("click", () => window.GoiTen.open()); gtb.hidden = true; b.after(gtb); }
}
if ($("chieu-all")) $("chieu-all").addEventListener("click", () => window.Chieu.open(null, {onShow: k => { if (!isRev(k)) setRev(k, true); }}));
$("hide-all").addEventListener("click", () => setAll(false));

/* làm lại */
$("reset").addEventListener("click", () => {
  $("reset-q").textContent = groupsOn() ? "Xoá câu trả lời của " + (S.name || "nhóm này") + "?" : "Xoá toàn bộ câu trả lời của em?";
  $("reset-all").hidden = !(groupsOn() && isTeacher());
  $("reset-confirm").hidden = false;
});
$("reset-no").addEventListener("click", () => { $("reset-confirm").hidden = true; });
$("reset-yes").addEventListener("click", async () => {
  ["ans","sub","mcq","sort","match","order"].forEach(f => S[f] = {}); S.t = 0;
  if (groupsOn()) { Object.keys(S.note).forEach(k => { if (k.indexOf(S.active + "|") === 0) delete S.note[k]; }); stash(); }
  saveLocal();
  if (myWriter && mode === "online") { try { await myWriter.now(); } catch(e) {} }
  location.reload();
});
$("reset-all").addEventListener("click", () => {
  const keep = {teacher: S.teacher, ngroups: S.ngroups};
  S = fresh(); S.teacher = keep.teacher; S.ngroups = keep.ngroups; saveLocal();
  location.reload();
});

/* ================= BẢNG THEO DÕI CỦA GV ================= */
const dsel = $("dash-select");
TASK_IDS.forEach(id => dsel.appendChild(el("option", {value:id}, esc(TASKS[id].label))));
dsel.addEventListener("change", renderDash);
$("dash-reveal").addEventListener("click", () => setRev(dsel.value, !isRev(dsel.value)));
function timeAgo(t){ if (!t) return "—"; const s = Math.round((Date.now() - t) / 1000); if (s < 60) return "vừa xong"; if (s < 3600) return Math.floor(s / 60) + " phút trước"; return new Date(t).toLocaleTimeString("vi-VN", {hour:"2-digit", minute:"2-digit"}); }
$("dash-rows").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (b) switchGroup(b.getAttribute("data-g")); });
function renderDash(){
  const local = []; for (let i = 1; i <= S.ngroups; i++) local.push(Object.assign({gk: "g" + i}, groupData("g" + i)));
  let docs;
  if (mode === "local") docs = local;
  else {
    docs = classDocs.slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "vi"));
    const used = local.filter(g => g.t || countSub(g));
    docs = docs.concat(used.length || docs.length ? used : local);
  }
  const id = dsel.value, t = TASKS[id];
  const nSub = docs.filter(d => d.sub && d.sub[id]).length;
  $("dash-sum").innerHTML = "<span>Số bài làm: <b>" + docs.length + "</b></span><span>Đã nộp câu đang xem: <b>" + nSub + "/" + docs.length + "</b></span>";
  const tb = $("dash-rows"); tb.innerHTML = "";
  if (!docs.length) tb.appendChild(el("tr", null, '<td colspan="4" class="empty">Chưa có bài làm nào. Học sinh mở trang, nhập tên nhóm và trả lời để bài hiện ở đây.</td>'));
  docs.forEach(d => tb.appendChild(el("tr", null, "<td>" + esc(d.name || "(chưa nhập tên)") + (d.gk && d.gk === S.active ? ' <span class="chip sub">Đang mở</span>' : "") + '</td><td class="num">' + countSub(d) + "/" + TASK_IDS.length + '</td><td class="num">' + timeAgo(d.t) + "</td><td>" + (d.gk && d.gk !== S.active ? '<button class="btn" type="button" data-g="' + d.gk + '">Mở</button>' : "") + "</td>")));
  $("dash-reveal").textContent = isRev(id) ? "Ẩn phần chốt câu này" : "GV chốt câu này";
  const list = $("dash-answers"); list.innerHTML = "";
  if (!docs.length) { list.appendChild(el("p", {class:"empty"}, "Câu trả lời của học sinh sẽ hiện ở đây.")); return; }
  docs.forEach(d => {
    const sub = !!(d.sub && d.sub[id]);
    let body = "", chip = sub ? '<span class="chip sub">Đã nộp</span>' : '<span class="chip draft">Đang làm</span>';
    if (t.type === "open") body = esc((d.ans && d.ans[id]) || "");
    else { const g = grade(id, d); if (g) { body = esc(g.text); if (sub) chip += g.ok ? ' <span class="chip ok">Đúng</span>' : ' <span class="chip bad">Chưa đúng</span>'; } }
    if (!body) { body = '<span class="empty">Chưa trả lời</span>'; chip = '<span class="chip draft">Chưa làm</span>'; }
    const item = el("div", {class:"ans-item"});
    item.appendChild(el("div", {class:"who-l"}, esc(d.name || "(chưa nhập tên)") + " " + chip));
    item.appendChild(el("div", {class:"txt"}, body));
    list.appendChild(item);
  });
}

/* ================= BUỔI HỌC TRỰC TUYẾN (Google Sheets) ================= */
function stamp(){ return new Date().toLocaleTimeString("vi-VN", {hour:"2-digit", minute:"2-digit"}); }
/* Gửi bài lên Google Sheets. Lớp tới 50 máy dùng chung một Apps Script nên gửi tiết kiệm:
   bấm Nộp / Sửa → gửi sau 1,5 giây; đang gõ nháp → gửi tối đa mỗi 8 giây; không đổi gì thì không gửi;
   lỗi mạng hoặc máy chủ bận → thử lại sau 15, 30, 60 giây (cộng thêm vài giây ngẫu nhiên để các máy không dồn cùng lúc). */
function makeWriter(){
  let timer = null, due = 0, busy = false, again = false, retry = null, fails = 0, lastSig = "", lastSub = -1;
  async function flush(){
    timer = null; due = 0;
    if (mode !== "online") return;
    if (busy) { again = true; return; }
    const data = {ans: S.ans, sub: S.sub, mcq: S.mcq, sort: S.sort, match: S.match, order: S.order};
    const sig = JSON.stringify([S.session, S.name || "", data]);
    if (sig === lastSig) return;
    busy = true; setSync("Đang gửi bài…");
    try {
      const sub = countSub(S);
      await API.submit({bai: window.LESSON.id, buoi: S.session, clientId: S.clientId, group: S.name || "", sub, data, cols: window.LESSON.summary(S)});
      lastSig = sig; lastSub = sub; fails = 0;
      clearTimeout(retry); setSync("Đã gửi lúc " + stamp());
    } catch(e) {
      fails++;
      const wait = Math.min(60000, 15000 * Math.pow(2, fails - 1)) + Math.random() * 5000;
      setSync("Chưa gửi được (" + e.message + "). Bài vẫn lưu trên máy, trang tự gửi lại sau " + Math.round(wait / 1000) + " giây.");
      clearTimeout(retry); retry = setTimeout(flush, wait);
    }
    busy = false; if (again) { again = false; flush(); }
  }
  return {
    queue(){
      const urgent = countSub(S) !== lastSub, at = Date.now() + (urgent ? 1500 : 8000);
      if (timer && due <= at) return;            // đã hẹn gửi sớm hơn: giữ lịch cũ
      clearTimeout(timer); due = at; timer = setTimeout(flush, at - Date.now());
    },
    now(){ clearTimeout(timer); timer = null; lastSig = ""; return flush(); }
  };
}

let pollTimer = null;
async function pollReveal(){
  if (mode !== "online") return;
  try {
    const st = await API.getStatus(window.LESSON.id, S.session, S.clientId);
    const banNew = JSON.stringify(st.ban || {}) !== JSON.stringify(BAN);
    const fresh = banNew || JSON.stringify(st.rev) !== JSON.stringify(REV) || JSON.stringify(st.nx) !== JSON.stringify(NX);
    if (fresh) {
      const changedKeys = Object.keys(st.nx).filter(k => st.nx[k] !== NX[k]);
      const newLike = changedKeys.some(k => k.indexOf("like.") === 0), newNx = changedKeys.some(k => k.indexOf("like.") !== 0);
      const banMore = Object.keys(st.ban || {}).some(k => { const a = st.ban[k], b = BAN[k] || {n: 0, cm: []}; return a.n > b.n || (a.cm || []).length > (b.cm || []).length; });
      REV = st.rev; NX = st.nx; BAN = st.ban || {}; renderAll(); celebrateNew();
      if (banMore && !(newNx || newLike)) setSync("Các bạn vừa bình chọn bài của em lúc " + stamp() + ".");
      if (newNx || newLike) setSync("Thầy cô vừa " + (newNx && newLike ? "gửi nhận xét và khen" : newLike ? "khen câu trả lời của em" : "gửi nhận xét mới") + " lúc " + stamp() + ".");
    }
  } catch(e) { setSync("Chưa nhận được phần chốt (" + e.message + ")."); }
  clearTimeout(pollTimer);
  pollTimer = setTimeout(pollReveal, 10000 + Math.random() * 5000);
}

function goOnline(){
  mode = "online"; S.teacher = false;
  myWriter = makeWriter();
  saveLocal(); renderAll();
  myWriter.now(); pollReveal();
}
function joinSession(){
  const code = API.normSession($("buoi").value);
  const msg = $("join-msg");
  if (!code) { msg.textContent = "Em hãy nhập mã buổi học thầy cô cho."; return; }
  if (!(S.name || "").trim() || /^Nhóm \d+$/.test(S.name) && !$("hs-name").dataset.touched) {
    msg.textContent = "Em hãy nhập tên nhóm hoặc tên của em trước."; $("hs-name").focus(); return; }
  msg.textContent = "";
  const name = S.name;
  stash();
  S.localActive = S.active;
  S.session = code;
  const k = "on:" + code;
  const g = groupData(k);
  S.active = k;
  GF.forEach(f => S[f] = clone(g[f]));
  S.name = name; nm.value = name;
  REV = {}; NX = {}; BAN = {};
  goOnline();
}
function leaveSession(){
  stash();
  clearTimeout(pollTimer);
  myWriter = null; mode = "local"; REV = {}; NX = {}; BAN = {};
  const k = S.localActive && S.localActive[0] === "g" ? S.localActive : "g1";
  const g = groupData(k);
  S.active = k; S.session = "";
  GF.forEach(f => S[f] = clone(g[f]));
  nm.value = S.name || "";
  setSync("");
  saveLocal(); renderAll();
}
nm.addEventListener("input", () => { nm.dataset.touched = "1"; });
$("join-go").addEventListener("click", joinSession);
$("buoi").addEventListener("keydown", e => { if (e.key === "Enter") joinSession(); });
$("leave").addEventListener("click", leaveSession);

/* Link có ?buoi=MÃ thì điền sẵn mã buổi học */
const qBuoi = API.normSession(new URLSearchParams(location.search).get("buoi") || "");
if (qBuoi) $("buoi").value = qBuoi;

if (API.demo) {
  const lead = document.querySelector("header .lead");
  if (lead) lead.innerHTML = "Chọn đúng <b>nhóm</b> của em, quan sát hình, trả lời từng câu hỏi trong sách giáo khoa rồi bấm <b>Nộp câu trả lời</b>. Sau khi các nhóm trình bày, thầy cô nhận xét và <b>chốt kiến thức</b>.";
}
outline = window.Outline.mount({
  root: document.querySelector("main"), aside: $("outline"), pagerHost: document.querySelector("main .wrap"), storeKey: "focus-hs-" + window.LESSON.id,
  progress: a => a.tasks.length ? {done: a.tasks.filter(t => S.sub[t]).length, total: a.tasks.length} : {done: 0, total: 0, label: ""},
  chot: a => a.tasks.length ? a.tasks.every(t => isRev(t)) : isRev(a.concept)
});
renderAll();
if (S.session && String(S.active).indexOf("on:") === 0) {
  if (API.demo) leaveSession();
  else { $("buoi").value = S.session; goOnline(); }
}
else if (qBuoi && !API.demo) setSync("Nhập tên nhóm rồi bấm Vào buổi học.");
})();
