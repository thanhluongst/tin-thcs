/* Dạy MỘT phần của bài bằng tiếng Anh (TT 94/2026). Công tắc Tiếng Việt | English:
   - English: cả phần (tiêu đề, hướng dẫn, thẻ, câu hỏi, trò chơi, giọng đọc) CHỈ bằng tiếng Anh.
   - Tiếng Việt: cùng nội dung CHỈ bằng tiếng Việt.  → mỗi lúc chỉ dạy một hình thức.
   Dùng: <div id="..."></div> rồi SongNgu(el, {
     tieuDe: {en, vi}, moDau: {en, vi}, nhom: {input: {en, vi}, ...},
     tu:  [{icon, en, vi, loai, cau (EN), dich (VI), giaiEn, giai}],
     hoi: [{q (EN), vi (câu hỏi VI), d: [đáp án EN...], dVi: [đáp án VI...], giaiEn, giai}]
   });
   Mặc định: tiếng Việt; window.SONG_NGU_MAC_DINH = "en" để mặc định English. Lựa chọn được nhớ trên máy.
   Giọng đọc: Web Speech API của trình duyệt (giọng Anh cho English, giọng Việt cho Tiếng Việt). */
(function(){
"use strict";
var HAS = "speechSynthesis" in window, V = {en: null, vi: null};
function pick(){
  if (!HAS) return;
  var vs = speechSynthesis.getVoices() || [];
  function f(lang, re){ return vs.filter(function(v){ var l = v.lang.replace("_", "-").toLowerCase(); return l.indexOf(lang) === 0 && (!re || re.test(v.name)); })[0]; }
  /* Giọng dễ nghe cho học sinh: giọng tự nhiên (Edge: Ava/Jenny/Aria/Emma Online Natural), rồi Google US English */
  V.en = f("en-us", /(ava|jenny|aria|emma|michelle).*(natural|online)/i) || f("en-us", /natural|online|neural/i) || f("en-us", /google/i) || f("en-us") || f("en-gb") || f("en") || null;
  V.vi = f("vi", /natural|online|neural/i) || f("vi", /google/i) || f("vi") || null;
}
if (HAS) { pick(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", pick); }

var rate = 1, run = 0;
function toast(msg){
  var d = document.getElementById("ta-toast");
  if (!d) { d = document.createElement("div"); d.id = "ta-toast"; d.setAttribute("role", "status"); document.body.appendChild(d); }
  d.textContent = msg; d.hidden = false; clearTimeout(d._t); d._t = setTimeout(function(){ d.hidden = true; }, 5000);
}
/* list: [{t, cham}] – tất cả cùng một ngôn ngữ L */
function say(L, list, onStep, onEnd){
  if (!HAS) { toast(L === "en" ? "This browser cannot read aloud. Please use Chrome or Edge." : "Trình duyệt này không đọc thành tiếng được. Hãy dùng Chrome hoặc Edge."); return; }
  if (!V[L]) pick();
  if (L === "vi" && !V.vi) toast("Máy chưa có giọng đọc tiếng Việt. Hãy mở bằng Microsoft Edge, hoặc cài thêm: Cài đặt › Thời gian & ngôn ngữ › Giọng nói.");
  speechSynthesis.cancel();
  var my = ++run, i = 0;
  function next(){
    if (my !== run) return;
    if (i >= list.length) { if (onEnd) onEnd(); return; }
    var it = list[i]; if (onStep) onStep(i);
    var u = new SpeechSynthesisUtterance(it.t), v = V[L];
    u.lang = v ? v.lang : (L === "vi" ? "vi-VN" : "en-US"); if (v) u.voice = v;
    u.rate = (L === "en" ? 0.85 : 1) * rate * (it.cham ? 0.7 : 1);
    u.onend = u.onerror = function(){ i++; setTimeout(next, 250); };
    speechSynthesis.speak(u);
  }
  next();
}
function stop(){ run++; if (HAS) speechSynthesis.cancel(); }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function lsSet(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
function shuffle(a){ for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pickL(x, L){ return x == null ? "" : typeof x === "string" ? x : (x[L] || ""); }

var SPK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none"/></svg>';

/* Chữ giao diện theo ngôn ngữ */
var T = {
  en: {sub: "This part is taught in English. Press 🔊 to listen.", all: "Listen to all", stop: "■ Stop", speed: "Speed", slow: "Slow", mid: "Normal", fast: "Fast",
       game: "🎧 Listen and choose", gq0: "Press <b>Start</b>, listen to the word and choose the right device.", start: "Start", again: "Listen again", replay: "Play again",
       gqn: function(a, b){ return "Question " + a + "/" + b + ": listen and choose."; }, score: "Score", right: "✅ Correct! ", wrong: "❌ Not correct. ",
       end: function(r, n){ return "🎉 Finished! You got <b>" + r + "/" + n + "</b>. "; }, ex: "Excellent!", good: "Good job!", tryA: "Try again!",
       qa: "✍️ Answer in English", qa0: "Read or listen to each question. Type your answer in English and press <b>Check</b>.", ph: "Type in English…", chk: "Check", hint: "Hint",
       empty: "Please type your answer.", notyet: "❌ Not yet. Try again! (Check your spelling or press Hint)", ansIs: "The answer is ", hintIs: "Hint: ", sayOk: "Correct! ", sayNo: "Not yet. Try again!"},
  vi: {sub: "Phần này học bằng tiếng Việt. Bấm 🔊 để nghe.", all: "Nghe cả phần", stop: "■ Dừng", speed: "Tốc độ", slow: "Chậm", mid: "Vừa", fast: "Nhanh",
       game: "🎧 Nghe và chọn", gq0: "Bấm <b>Bắt đầu</b>, nghe tên thiết bị rồi chọn đúng hình.", start: "Bắt đầu", again: "Nghe lại", replay: "Chơi lại",
       gqn: function(a, b){ return "Câu " + a + "/" + b + ": nghe và chọn."; }, score: "Đúng", right: "✅ Đúng! ", wrong: "❌ Chưa đúng. ",
       end: function(r, n){ return "🎉 Xong! Em đúng <b>" + r + "/" + n + "</b>. "; }, ex: "Xuất sắc!", good: "Làm tốt lắm!", tryA: "Thử lại nhé!",
       qa: "✍️ Trả lời câu hỏi", qa0: "Đọc hoặc nghe câu hỏi, gõ câu trả lời rồi bấm <b>Kiểm tra</b>.", ph: "Gõ câu trả lời…", chk: "Kiểm tra", hint: "Gợi ý",
       empty: "Em hãy gõ câu trả lời.", notyet: "❌ Chưa đúng. Thử lại nhé! (Kiểm tra chính tả hoặc bấm Gợi ý)", ansIs: "Đáp án là ", hintIs: "Gợi ý: ", sayOk: "Đúng rồi! ", sayNo: "Chưa đúng, thử lại nhé!"}
};

/* So khớp: bỏ dấu tiếng Việt, hoa thường, mạo từ / từ đệm */
function norm(s){
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d")
    .replace(/[^a-z0-9 ]+/g, " ").replace(/\b(a|an|the|it is|it s|its|is|la|cai|chiec|thiet bi la)\b/g, " ").replace(/\s+/g, " ").trim();
}

/* ===== Một HOẠT ĐỘNG của bài dạy bằng tiếng Anh =====
   Nạp song-ngu.js NGAY SAU content.js (trước hs.js), rồi gọi:
   SongNgu.hoatDong({id: "hd-xep-nhom",                     // id của <div class="act">
     tasks: {sortDev: {label, q, cats:[...], items:[tên EN theo đúng thứ tự], k}},   // bản tiếng Anh của câu hỏi
     nx: {sortDev: {ok:[...], fix:[...]}} });
   Trong hoạt động: phần tử có data-en="..." được thay nội dung khi chọn English.
   Chọn ngôn ngữ → nhớ trên máy, tải lại trang (bài làm của học sinh giữ nguyên vì lưu theo thứ tự). */
var UI_EN = {"Nộp câu trả lời":"Submit","Sửa câu trả lời":"Edit answer","GV nhận xét & chốt":"Teacher: check & reveal","Ẩn phần chốt":"Hide answer key",
  "Chính xác!":"Correct!","Chưa đúng, xem phần chốt.":"Not correct, see the key.","Đã nộp":"Submitted","Đã nộp. Chờ thầy cô nhận xét và chốt.":"Submitted. Wait for your teacher.",
  "Nhận xét của thầy cô":"Teacher's comment","Thầy cô khen câu trả lời của em!":"Your teacher likes your answer!","Rất tốt, em hãy tiếp tục phát huy nhé.":"Very good, keep it up!",
  "? Em chưa chắc":"? Not sure","Chưa làm":"Not started","Chưa nộp":"Not submitted","Đã nộp, chờ chốt":"Submitted, waiting","Đúng":"Correct","Cần sửa":"Needs fixing","Phần chốt":"Answer key","Cổng…":"Choose…","Chọn…":"Choose…","Đưa lên":"Move up","Đưa xuống":"Move down","Chốt":"Key","Đáp án":"Answer"};
var UI_RE = [[/^Đúng (\d+)\/(\d+)\. Xem các dòng màu đỏ\.$/, "Correct $1/$2. Check the red rows."], [/^Đáp án: (.*)$/, "Answer: $1"], [/^Chọn nhóm cho (.*)$/, "Choose a group for $1"], [/^.* sẽ được thầy cô chốt sau khi cả lớp trình bày\.?$/, "Your teacher will reveal this after the class presents."]];
function trNode(n){
  var s = n.nodeValue, k = s.trim(); if (!k) return;
  var r = UI_EN[k]; if (r == null) UI_RE.some(function(p){ if (p[0].test(k)) { r = k.replace(p[0], p[1]); return true; } });
  if (r != null && r !== k) n.nodeValue = s.replace(k, r);
}
function trTree(root){
  if (root.nodeType === 3) { if (!root.parentNode || !root.parentNode.closest(".sn-box")) trNode(root); return; }
  if (root.nodeType !== 1 || root.closest(".sn-box")) return;
  var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, a = [];
  while ((n = tw.nextNode())) if (!n.parentNode.closest(".sn-box")) a.push(n);
  a.forEach(trNode);
  root.querySelectorAll("[aria-label],[title]").forEach(function(e){ ["aria-label","title"].forEach(function(at){ var v = e.getAttribute(at); if (v) UI_RE.forEach(function(p){ if (p[0].test(v)) e.setAttribute(at, v.replace(p[0], p[1])); }); }); });
}
var HD = {};
function hdKey(id){ return "song-ngu-hd:" + location.pathname.replace(/index.html$/, "") + ":" + id; }
function hdLang(id){ var v = lsGet(hdKey(id)); return v === "en" || v === "vi" ? v : (window.SONG_NGU_MAC_DINH === "en" ? "en" : "vi"); }

function hoatDong(o){
  var L = hdLang(o.id); HD[o.id] = L;
  var LS = window.LESSON;
  if (L === "en" && LS) {
    Object.keys(o.tasks || {}).forEach(function(tid){
      var t = LS.TASKS && LS.TASKS[tid], e = o.tasks[tid]; if (!t) return;
      ["label","q","k","ph"].forEach(function(f){ if (e[f] != null) t[f] = e[f]; });
      if (e.cats) t.cats = e.cats.slice();
      if (e.o) t.o = e.o.slice();
      if (e.opts) t.opts = e.opts.slice();
      if (e.items && t.items) {
        if (Array.isArray(e.items)) e.items.forEach(function(nm, i){ if (t.items[i] != null) t.items[i] = Array.isArray(t.items[i]) ? [nm].concat(t.items[i].slice(1)) : nm; });
        else Object.keys(e.items).forEach(function(k){ if (k in t.items) t.items[k] = e.items[k]; });
      }
    });
    var NX = LS.NX_MAU; if (NX && o.nx) Object.keys(o.nx).forEach(function(tid){ NX[tid] = o.nx[tid]; });
  }
  function setup(){
    var act = document.querySelector('[data-sn-hd="' + o.id + '"]') || document.getElementById(o.id); if (!act) return;
    act.classList.add("sn-act"); act.classList.toggle("sn-act-en", L === "en"); act.setAttribute("lang", L);
    var tag = act.querySelector(".act-tag");
    var sw = document.createElement("span"); sw.className = "sn-lang sn-lang-sm"; sw.setAttribute("role", "group"); sw.setAttribute("aria-label", "Ngôn ngữ dạy / Teaching language");
    sw.innerHTML = '<button type="button" data-l="vi" aria-pressed="' + (L === "vi") + '">Tiếng Việt</button><button type="button" data-l="en" aria-pressed="' + (L === "en") + '">English</button>';
    sw.addEventListener("click", function(e){ var b = e.target.closest("button"); if (!b || b.dataset.l === L) return; lsSet(hdKey(o.id), b.dataset.l); stop(); lsSet("song-ngu-cuon", o.id); location.reload(); });
    if (tag) tag.appendChild(sw); else act.insertBefore(sw, act.firstChild);
    if (lsGet("song-ngu-cuon") === o.id) { lsSet("song-ngu-cuon", ""); setTimeout(function(){ act.scrollIntoView({block: "start"}); }, 400); }
    act.querySelectorAll("[data-en]").forEach(function(e){ if (L === "en") e.innerHTML = e.getAttribute("data-en"); });
    if (L !== "en") return;
    /* Thanh nghe đọc: đọc tiêu đề, lời dặn, câu hỏi và tên từng thiết bị – tô sáng phần đang đọc */
    var bar = document.createElement("div"); bar.className = "sn-listen";
    bar.innerHTML = '<button type="button" class="btn sn-l-go">' + SPK + 'Listen</button><button type="button" class="btn sn-l-stop" hidden>■ Stop</button>'
      + '<span class="sn-l-sp" role="group" aria-label="Speed"><button type="button" data-r="0.8" aria-pressed="true">Slow</button><button type="button" data-r="1" aria-pressed="false">Normal</button></span>';
    var rd = act.querySelector(".reading"); (rd || tag).insertAdjacentElement("afterend", bar);
    var spd = 0.8, goB = bar.querySelector(".sn-l-go"), stB = bar.querySelector(".sn-l-stop"), lit = null;
    bar.querySelector(".sn-l-sp").addEventListener("click", function(e){ var b = e.target.closest("button"); if (!b) return; spd = +b.dataset.r; bar.querySelectorAll(".sn-l-sp button").forEach(function(x){ x.setAttribute("aria-pressed", x === b); }); });
    function txt(e){ return e ? e.textContent.replace(/\s+/g, " ").trim() : ""; }
    function light(e){ if (lit) lit.classList.remove("sn-lit"); lit = e; if (e) { e.classList.add("sn-lit"); var r = e.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 20) e.scrollIntoView({block: "center", behavior: "smooth"}); } }
    function end(){ light(null); stB.hidden = true; goB.hidden = false; }
    goB.addEventListener("click", function(){
      var parts = [], own = [];
      function add(t, e, cham){ t = (t || "").replace(/^\d+\.\s*/, "").replace(/\b(INTO|OUT OF|OUT|IN)\b/g, function(w){ return w.toLowerCase(); }); if (t) { parts.push({t: t, cham: cham}); own.push(e); } }
      if (tag) { var tt = [].slice.call(tag.querySelectorAll("[data-en]")).map(txt).join(". "); add(tt, tag); }
      if (rd) rd.textContent.replace(/\s\?\s/g, " the question mark ").split(/(?<=[.?!])\s+(?=[A-Z])/).forEach(function(se){ add(se.trim(), rd); });
      act.querySelectorAll("[data-task]").forEach(function(slot){
        var tk = LS && LS.TASKS && LS.TASKS[slot.dataset.task]; add(tk ? tk.q : "", slot.querySelector(".q-text"));
        var rows = slot.querySelectorAll(".sort-row");
        if (rows.length) { var cats = [].slice.call(rows[0].querySelectorAll(".seg button")).map(txt).filter(function(c){ return c && c.indexOf("?") < 0; });
          if (cats.length) add("The groups are: " + cats.join(", ") + ".", rows[0].querySelector(".seg"));
          rows.forEach(function(r){ add(txt(r.querySelector("span")), r); }); }
        slot.querySelectorAll(".opts .opt").forEach(function(b){ add(txt(b).replace(/^([A-D])\.\s*/, "$1. "), b); });
        slot.querySelectorAll(".match label > span").forEach(function(sp){ add(txt(sp), sp.parentNode); });
        slot.querySelectorAll("ol.order li").forEach(function(li){ var sp = li.querySelectorAll("span")[1]; add(txt(sp).replace(/^[a-z]\)\s*/, ""), li); });
      });
      rate = spd; goB.hidden = true; stB.hidden = false;
      say("en", parts, function(k){ light(own[k]); }, end);
    });
    stB.addEventListener("click", function(){ stop(); end(); });
    trTree(act);
    new MutationObserver(function(rs){ rs.forEach(function(r){ if (r.type === "characterData") trNode(r.target); else r.addedNodes.forEach(trTree); }); })
      .observe(act, {childList: true, subtree: true, characterData: true});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup); else setup();
}

window.SongNgu = function(el, d){
  if (!el) return;
  var key = "song-ngu:" + location.pathname + ":" + (el.id || "");
  var L = lsGet(key); if (L !== "en" && L !== "vi") L = window.SONG_NGU_MAC_DINH === "en" ? "en" : "vi";
  if (d.theo) L = HD[d.theo] || hdLang(d.theo);   /* đi theo công tắc của hoạt động */
  el.classList.add("sn-box", "no-ta");
  if (d.theo) el.classList.add("sn-in-act");

  function wordOf(w){ return L === "en" ? w.en : w.vi; }
  function tagOf(k){ var n = (d.nhom || {})[k]; return n ? pickL(n, L) : k; }

  function render(){
    stop();
    var t = T[L], h = '<div class="sn-head"><div class="sn-tt"><b>' + esc(pickL(d.tieuDe, L)) + '</b><small>' + t.sub + '</small></div>'
      + (d.theo ? "" : '<div class="sn-lang" role="group" aria-label="Ngôn ngữ dạy / Teaching language"><button type="button" data-l="vi" aria-pressed="' + (L === "vi") + '">Tiếng Việt</button><button type="button" data-l="en" aria-pressed="' + (L === "en") + '">English</button></div>') + '</div>'
      + '<div class="sn-body" lang="' + L + '"><div class="sn-bar"><button type="button" class="btn sn-all">' + SPK + t.all + '</button><button type="button" class="btn sn-stop" hidden>' + t.stop + '</button>'
      + '<label class="sn-rate">' + t.speed + ' <select><option value="0.75"' + (rate === 0.75 ? " selected" : "") + '>' + t.slow + '</option><option value="1"' + (rate === 1 ? " selected" : "") + '>' + t.mid + '</option><option value="1.2"' + (rate === 1.2 ? " selected" : "") + '>' + t.fast + '</option></select></label></div>';
    if (d.moDau) h += '<div class="sn-intro sn-say" data-i="-1"><button type="button" class="sn-spk" aria-label="🔊">' + SPK + '</button><p class="sn-txt">' + esc(pickL(d.moDau, L)) + '</p></div>';
    h += '<div class="sn-grid">';
    d.tu.forEach(function(w, i){
      h += '<div class="sn-card sn-say" data-i="' + i + '"><div class="sn-top"><span class="sn-ic" aria-hidden="true">' + esc(w.icon) + '</span><div class="sn-w"><b class="sn-word">' + esc(wordOf(w)) + '</b>'
        + (w.loai ? '<span class="sn-tag sn-' + esc(w.loai) + '">' + esc(tagOf(w.loai)) + '</span>' : "") + '</div>'
        + '<button type="button" class="sn-spk" aria-label="🔊 ' + esc(wordOf(w)) + '">' + SPK + '</button></div>'
        + '<p class="sn-txt">' + esc(L === "en" ? w.cau : w.dich) + '</p>'
        + '<p class="sn-giai">💡 ' + esc(L === "en" ? w.giaiEn : w.giai) + '</p></div>';
    });
    h += '</div>';
    if (d.hoi && d.hoi.length) {
      h += '<div class="sn-qa"><div class="sn-gh"><b>' + t.qa + '</b><span class="sn-qsc"></span></div><p class="sn-note">' + t.qa0 + '</p>';
      d.hoi.forEach(function(x, i){
        h += '<div class="sn-qi" data-q="' + i + '"><div class="sn-top"><button type="button" class="sn-spk sn-qspk" aria-label="🔊">' + SPK + '</button><p class="sn-txt"><b>' + (i + 1) + '.</b> ' + esc(L === "en" ? x.q : x.vi) + '</p></div>'
          + '<div class="sn-row"><input type="text" class="sn-in" autocomplete="off" spellcheck="false" placeholder="' + t.ph + '" aria-label="' + (i + 1) + '">'
          + '<button type="button" class="btn primary sn-chk">' + t.chk + '</button><button type="button" class="btn sn-hint">' + t.hint + '</button></div><p class="sn-fb" aria-live="polite"></p></div>';
      });
      h += '</div>';
    }
    if (d.choi !== false) h += '<div class="sn-game"><div class="sn-gh"><b>' + t.game + '</b><span class="sn-score"></span></div><p class="sn-gq">' + t.gq0 + '</p><div class="sn-opts"></div>'
      + '<div class="sn-gbar"><button type="button" class="btn primary sn-go">' + t.start + '</button><button type="button" class="btn sn-again" hidden>' + SPK + t.again + '</button></div></div>';
    h += '</div>';
    el.innerHTML = h;
    wire();
  }

  function wire(){
    var t = T[L];
    el.querySelectorAll(".sn-lang button").forEach(function(b){ b.addEventListener("click", function(){ if (b.dataset.l === L) return; L = b.dataset.l; lsSet(key, L); render(); }); });
    el.querySelector(".sn-rate select").addEventListener("change", function(e){ rate = +e.target.value; });

    function seq(i){
      if (i < 0) return [{t: pickL(d.moDau, L)}];
      var w = d.tu[i], wd = wordOf(w);
      return L === "en" ? [{t: wd}, {t: wd, cham: true}, {t: w.cau}, {t: w.giaiEn}] : [{t: wd}, {t: w.dich}, {t: w.giai}];
    }
    var playing = null, stopB = el.querySelector(".sn-stop");
    function mark(c){ if (playing) playing.classList.remove("sn-on"); playing = c; if (c) c.classList.add("sn-on"); }
    function done(){ mark(null); stopB.hidden = true; }
    el.querySelectorAll(".sn-say").forEach(function(c){
      c.querySelector(".sn-spk").addEventListener("click", function(){ stopB.hidden = false; mark(c); say(L, seq(+c.dataset.i).filter(function(x){ return x.t; }), null, done); });
    });
    stopB.addEventListener("click", function(){ stop(); done(); });
    el.querySelector(".sn-all").addEventListener("click", function(){
      var list = [], owner = [];
      el.querySelectorAll(".sn-say").forEach(function(c){ seq(+c.dataset.i).forEach(function(x){ if (x.t) { list.push(x); owner.push(c); } }); });
      stopB.hidden = false; say(L, list, function(k){ mark(owner[k]); }, done);
    });

    /* Câu hỏi tự luận ngắn */
    var qok = {};
    function qscore(){ var s = el.querySelector(".sn-qsc"); if (s) s.textContent = t.score + ": " + Object.keys(qok).length + "/" + d.hoi.length; }
    el.querySelectorAll(".sn-qi").forEach(function(box){
      var x = d.hoi[+box.dataset.q], inp = box.querySelector(".sn-in"), fb = box.querySelector(".sn-fb"), tries = 0;
      var list = (L === "en" ? x.d : x.dVi || x.d), ans = list.map(norm), main = list[0], giai = L === "en" ? x.giaiEn : x.giai;
      box.querySelector(".sn-qspk").addEventListener("click", function(){ mark(null); say(L, [{t: L === "en" ? x.q : x.vi}]); });
      box.querySelector(".sn-hint").addEventListener("click", function(){
        fb.className = "sn-fb"; fb.textContent = t.hintIs + main.split(" ").map(function(w){ return w.charAt(0) + w.slice(1).replace(/./g, " _"); }).join("   ");
      });
      function check(){
        var v = norm(inp.value); if (!v) { fb.className = "sn-fb"; fb.textContent = t.empty; inp.focus(); return; }
        var ok = ans.some(function(a){ return v === a || (" " + v + " ").indexOf(" " + a + " ") >= 0; }); tries++;
        box.classList.toggle("ok", ok); box.classList.toggle("bad", !ok);
        if (ok) { qok[box.dataset.q] = 1; fb.className = "sn-fb ok"; fb.innerHTML = t.right + "<b>" + esc(main) + "</b>" + (giai ? " – " + esc(giai) : ""); say(L, [{t: t.sayOk + main}].concat(giai ? [{t: giai}] : [])); }
        else if (tries < 2) { fb.className = "sn-fb bad"; fb.textContent = t.notyet; say(L, [{t: t.sayNo}]); }
        else { fb.className = "sn-fb bad"; fb.innerHTML = "❌ " + t.ansIs + "<b>" + esc(main) + "</b>." + (giai ? " " + esc(giai) : ""); say(L, [{t: t.ansIs + main}].concat(giai ? [{t: giai}] : [])); }
        qscore();
      }
      box.querySelector(".sn-chk").addEventListener("click", check);
      inp.addEventListener("keydown", function(e){ if (e.key === "Enter") { e.preventDefault(); check(); } });
    });
    if (d.hoi) qscore();

    /* Trò chơi Nghe và chọn: nghe từ, chọn hình (nhãn hình cùng ngôn ngữ đang dạy) */
    var g = el.querySelector(".sn-game"); if (!g) return;
    var opts = g.querySelector(".sn-opts"), q = g.querySelector(".sn-gq"), sc = g.querySelector(".sn-score"), go = g.querySelector(".sn-go"), again = g.querySelector(".sn-again");
    var order = [], pos = 0, right = 0, ans = -1;
    function ask(){
      if (pos >= order.length) {
        var msg = right === order.length ? t.ex : right >= order.length / 2 ? t.good : t.tryA;
        q.innerHTML = t.end(right, order.length) + msg; opts.innerHTML = ""; again.hidden = true; go.hidden = false; go.textContent = t.replay;
        say(L, [{t: msg}]); return;
      }
      ans = order[pos];
      var pool = shuffle(d.tu.map(function(_, i){ return i; }).filter(function(i){ return i !== ans; })).slice(0, 3).concat(ans);
      q.innerHTML = t.gqn(pos + 1, order.length);
      opts.innerHTML = shuffle(pool).map(function(i){ return '<button type="button" class="sn-opt" data-i="' + i + '"><span aria-hidden="true">' + esc(d.tu[i].icon) + '</span>' + esc(wordOf(d.tu[i])) + '</button>'; }).join("");
      say(L, [{t: wordOf(d.tu[ans])}]);
    }
    go.addEventListener("click", function(){ order = shuffle(d.tu.map(function(_, i){ return i; })).slice(0, Math.min(6, d.tu.length)); pos = 0; right = 0; sc.textContent = ""; go.hidden = true; again.hidden = false; ask(); });
    again.addEventListener("click", function(){ if (ans >= 0) say(L, [{t: wordOf(d.tu[ans]), cham: true}]); });
    opts.addEventListener("click", function(e){
      var b = e.target.closest(".sn-opt"); if (!b || opts.dataset.lock) return;
      var wd = wordOf(d.tu[ans]), ok = +b.dataset.i === ans; opts.dataset.lock = 1;
      b.classList.add(ok ? "ok" : "bad"); if (!ok) opts.querySelector('[data-i="' + ans + '"]').classList.add("ok");
      if (ok) right++; sc.textContent = t.score + ": " + right + "/" + (pos + 1);
      q.innerHTML = (ok ? t.right : t.wrong) + "<b>" + esc(wd) + "</b>";
      say(L, [{t: ok ? t.sayOk + wd : t.ansIs + wd}], null, function(){ delete opts.dataset.lock; pos++; setTimeout(ask, 400); });
    });
  }
  render();
};
window.SongNgu.hoatDong = hoatDong;

var css = document.createElement("style");
css.textContent = ""
+ ".sn-box{border:2px solid var(--info,#1d4ed8);border-radius:16px;background:var(--surface,#fff);margin:18px 0;overflow:hidden}"
+ ".sn-head{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--info-soft,#e1eafd);flex-wrap:wrap}"
+ ".sn-tt{flex:1;min-width:180px;display:flex;flex-direction:column}.sn-tt b{font-family:var(--font-display,system-ui);font-size:17px}.sn-tt small{color:var(--muted,#5a6e6b)}"
+ ".sn-lang{display:inline-flex;border:2px solid var(--info,#1d4ed8);border-radius:999px;overflow:hidden}.sn-lang button{font:600 14px var(--font-body,system-ui);border:none;background:var(--surface,#fff);color:var(--info,#1d4ed8);padding:7px 14px;cursor:pointer}"
+ ".sn-lang button[aria-pressed=true]{background:var(--info,#1d4ed8);color:#fff}.sn-lang button:focus-visible{outline:2px solid var(--fg,#000);outline-offset:-4px}"
+ ".sn-body{padding:14px}.sn-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}.sn-bar .btn svg,.sn-gbar .btn svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px;fill:currentColor;stroke:currentColor;stroke-width:1.6}"
+ ".sn-rate{font-size:14px;color:var(--muted,#5a6e6b);display:inline-flex;gap:6px;align-items:center}"
+ ".sn-intro{display:flex;gap:10px;align-items:center;background:var(--sunk,#edf6f5);border-radius:12px;padding:10px 12px;margin-bottom:12px;border:1px solid transparent}"
+ ".sn-txt{margin:4px 0;font-weight:600}.sn-giai{margin:4px 0;font-size:14px;color:var(--muted,#5a6e6b)}.sn-note{margin:4px 0;color:var(--muted,#5a6e6b);font-size:14px}"
+ ".sn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}"
+ ".sn-card{border:1px solid var(--line,#cde3e0);border-radius:12px;padding:10px 12px;background:var(--surface,#fff);transition:box-shadow .2s,border-color .2s}"
+ ".sn-card.sn-on,.sn-intro.sn-on{border-color:var(--info,#1d4ed8);box-shadow:0 0 0 3px var(--info-soft,#e1eafd)}"
+ ".sn-top{display:flex;align-items:center;gap:10px}.sn-ic{font-size:30px;line-height:1}.sn-w{flex:1;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}.sn-word{font-size:19px;font-family:var(--font-display,system-ui)}"
+ ".sn-tag{font-size:11px;font-weight:700;text-transform:uppercase;border-radius:6px;padding:2px 6px;letter-spacing:.3px}.sn-input{background:var(--ok-soft,#dcf3e3);color:var(--ok,#15803d)}.sn-output{background:var(--pink-soft,#fde8f1);color:var(--pink,#d0186e)}.sn-both{background:var(--warn-soft,#fdf2d3);color:var(--warn,#a16207)}"
+ ".sn-spk{flex:none;width:40px;height:40px;border-radius:50%;border:none;background:var(--info,#1d4ed8);color:#fff;cursor:pointer;display:grid;place-items:center}.sn-spk svg{width:22px;height:22px;fill:#fff;stroke:#fff;stroke-width:1.6}.sn-spk:hover{filter:brightness(1.1)}"
+ ".sn-on .sn-spk{animation:snp 1s infinite}@keyframes snp{50%{box-shadow:0 0 0 6px var(--info-soft,#e1eafd)}}"
+ ".sn-game,.sn-qa{margin-top:14px;border-top:1px dashed var(--line,#cde3e0);padding-top:12px}.sn-gh{display:flex;justify-content:space-between;gap:8px}.sn-score,.sn-qsc{color:var(--ok,#15803d);font-weight:700}"
+ ".sn-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin:8px 0}"
+ ".sn-opt{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px;border:2px solid var(--line,#cde3e0);border-radius:12px;background:var(--surface,#fff);color:var(--fg,#1c2a29);font:inherit;cursor:pointer}.sn-opt span{font-size:32px}"
+ ".sn-opt:hover{border-color:var(--info,#1d4ed8)}.sn-opt.ok{border-color:var(--ok,#15803d);background:var(--ok-soft,#dcf3e3)}.sn-opt.bad{border-color:var(--bad,#b91c1c);background:var(--bad-soft,#fde3e3)}"
+ ".sn-gbar{display:flex;gap:10px;flex-wrap:wrap}"
+ ".sn-qi{border:1px solid var(--line,#cde3e0);border-radius:12px;padding:10px 12px;margin-top:10px}.sn-qi.ok{border-color:var(--ok,#15803d);background:var(--ok-soft,#dcf3e3)}.sn-qi.bad{border-color:var(--bad,#b91c1c)}"
+ ".sn-qspk{width:34px;height:34px}.sn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.sn-in{flex:1;min-width:160px;font:inherit;font-size:17px;padding:8px 10px;border:2px solid var(--line,#cde3e0);border-radius:10px;background:var(--surface,#fff);color:var(--fg,#1c2a29)}.sn-in:focus{outline:none;border-color:var(--info,#1d4ed8)}"
+ ".sn-fb{margin:6px 0 0;font-size:15px}.sn-fb.ok{color:var(--ok,#15803d)}.sn-fb.bad{color:var(--bad,#b91c1c)}"
+ ".sn-lang-sm{margin-left:auto;vertical-align:middle}.sn-lang-sm button{padding:4px 10px;font-size:13px}.act-tag:has(.sn-lang-sm){display:flex;flex-wrap:wrap;align-items:center;gap:8px}"
+ ".sn-listen{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 10px}.sn-listen .btn svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px;fill:currentColor;stroke:currentColor;stroke-width:1.6}"
+ ".sn-l-sp{display:inline-flex;border:1px solid var(--line,#cde3e0);border-radius:999px;overflow:hidden}.sn-l-sp button{border:none;background:var(--surface,#fff);color:var(--fg,#1c2a29);font:600 13px var(--font-body,system-ui);padding:6px 12px;cursor:pointer}.sn-l-sp button[aria-pressed=true]{background:var(--info,#1d4ed8);color:#fff}"
+ ".sn-lit{background:var(--warn-soft,#fdf2d3)!important;box-shadow:0 0 0 3px var(--warn-soft,#fdf2d3);border-radius:8px;transition:background .2s}"
+ ".sn-act-en{outline:2px solid var(--info,#1d4ed8);outline-offset:4px;border-radius:12px}.sn-in-act{border-width:1px;margin-top:14px}"
+ "@media(max-width:520px){.sn-grid{grid-template-columns:1fr}}@media print{.sn-bar,.sn-game,.sn-spk,.sn-lang{display:none}}";
document.head.appendChild(css);
})();
