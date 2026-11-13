/* Song ngữ (English corner) cho MỘT phần của bài – theo TT 94/2026 (dạy một số nội dung bằng tiếng Anh).
   Dùng:  <div data-song-ngu></div>  rồi  SongNgu(el, {
     tieuDe: "English corner: Input & Output devices",
     moDau: {en: "...", vi: "..."},                  // câu dẫn (tuỳ chọn)
     tu: [{icon:"⌨️", en:"keyboard", loai:"input", vi:"bàn phím", cau:"We type letters with the keyboard.", dich:"Ta gõ chữ bằng bàn phím.", giai:"Keyboard là bàn phím – thiết bị vào."}],
     nhom: {input: "Input device – thiết bị vào", output: "Output device – thiết bị ra"},  // nhãn loại (tuỳ chọn)
     choi: true                                       // trò chơi "Nghe và chọn"
   });
   Bật/tắt: nút trên khối (nhớ trên máy). Mặc định đang bật; đặt window.SONG_NGU_TAT = true để mặc định tắt.
   Âm thanh: giọng đọc có sẵn của trình duyệt (Web Speech API) – đọc tiếng Anh giọng Anh, giải thích giọng Việt. */
(function(){
"use strict";
var HAS = "speechSynthesis" in window;
var vEn = null, vVi = null;
function pick(){
  if (!HAS) return;
  var vs = speechSynthesis.getVoices() || [];
  function f(lang, re){ return vs.filter(function(v){ var l = v.lang.replace("_", "-").toLowerCase(); return l.indexOf(lang) === 0 && (!re || re.test(v.name)); })[0]; }
  vEn = f("en-us", /natural|online|neural/i) || f("en-us", /google/i) || f("en-us") || f("en-gb") || f("en") || null;
  vVi = f("vi", /natural|online|neural/i) || f("vi", /google/i) || f("vi") || null;
}
if (HAS) { pick(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", pick); }

var rate = 1, run = 0;
function toast(msg){
  var d = document.getElementById("ta-toast");
  if (!d) { d = document.createElement("div"); d.id = "ta-toast"; d.setAttribute("role", "status"); document.body.appendChild(d); }
  d.textContent = msg; d.hidden = false; clearTimeout(d._t); d._t = setTimeout(function(){ d.hidden = true; }, 5000);
}
/* Đọc lần lượt một dãy [{t, lang:"en"|"vi"}]; onStep(i) báo câu đang đọc. */
function say(list, onStep, onEnd){
  if (!HAS) { toast("Trình duyệt này không hỗ trợ đọc thành tiếng. Hãy dùng Chrome hoặc Edge."); return; }
  if (!vEn || !vVi) pick();
  speechSynthesis.cancel();
  var my = ++run, i = 0, warned = false;
  function next(){
    if (my !== run) return;
    if (i >= list.length) { if (onEnd) onEnd(); return; }
    var it = list[i], v = it.lang === "vi" ? vVi : vEn;
    if (it.lang === "vi" && !vVi) { if (!warned) toast("Máy chưa có giọng đọc tiếng Việt – phần giải thích hiện bằng chữ. (Cài thêm: Cài đặt › Thời gian & ngôn ngữ › Giọng nói)"); warned = true; i++; return next(); }
    if (onStep) onStep(i);
    var u = new SpeechSynthesisUtterance(it.t);
    u.lang = v ? v.lang : (it.lang === "vi" ? "vi-VN" : "en-US"); if (v) u.voice = v;
    u.rate = (it.lang === "en" ? 0.85 : 1) * rate * (it.cham ? 0.7 : 1);
    u.onend = u.onerror = function(){ i++; setTimeout(next, it.lang === "en" ? 250 : 150); };
    speechSynthesis.speak(u);
  }
  next();
}
function stop(){ run++; if (HAS) speechSynthesis.cancel(); }

function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function lsSet(k, v){ try { localStorage.setItem(k, v); } catch(e){} }

var SPK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none"/></svg>';

window.SongNgu = function(el, d){
  if (!el) return;
  var key = "song-ngu:" + location.pathname + ":" + (el.id || d.tieuDe || "");
  var st = lsGet(key), on = st == null ? !window.SONG_NGU_TAT : st === "1";
  var nhom = d.nhom || {};
  el.classList.add("sn-box", "no-ta");
  var h = '<div class="sn-head"><span class="sn-flag" aria-hidden="true">EN</span><div class="sn-tt"><b>' + esc(d.tieuDe || "English corner") + '</b><small>Song ngữ Anh – Việt · bấm 🔊 để nghe đọc và giải thích</small></div>'
    + '<label class="sn-sw"><input type="checkbox"' + (on ? " checked" : "") + '><span class="sn-knob" aria-hidden="true"></span><span class="sn-swl">' + (on ? "Đang bật" : "Đang tắt") + '</span></label></div>'
    + '<div class="sn-body"' + (on ? "" : " hidden") + '>';
  h += '<div class="sn-bar"><button type="button" class="btn sn-all">' + SPK + 'Nghe cả phần</button><button type="button" class="btn sn-stop" hidden>■ Dừng</button>'
    + '<label class="sn-rate">Tốc độ <select><option value="0.75">Chậm</option><option value="1" selected>Vừa</option><option value="1.2">Nhanh</option></select></label>'
    + '<label class="sn-hide"><input type="checkbox"> Ẩn nghĩa tiếng Việt (tự đoán)</label></div>';
  if (d.moDau) h += '<div class="sn-intro sn-say" data-i="-1"><button type="button" class="sn-spk" aria-label="Nghe câu dẫn">' + SPK + '</button><div><p class="sn-en">' + esc(d.moDau.en) + '</p><p class="sn-vi">' + esc(d.moDau.vi) + '</p></div></div>';
  h += '<div class="sn-grid">';
  d.tu.forEach(function(w, i){
    h += '<div class="sn-card sn-say" data-i="' + i + '"><div class="sn-top"><span class="sn-ic" aria-hidden="true">' + esc(w.icon) + '</span><div class="sn-w"><b class="sn-word">' + esc(w.en) + '</b>'
      + (w.loai ? '<span class="sn-tag sn-' + esc(w.loai) + '">' + esc(w.loai) + '</span>' : "") + '<span class="sn-vi sn-mean">' + esc(w.vi) + '</span></div>'
      + '<button type="button" class="sn-spk" aria-label="Nghe: ' + esc(w.en) + '">' + SPK + '</button></div>'
      + (w.cau ? '<p class="sn-en sn-sent">' + esc(w.cau) + '</p>' : "") + (w.dich ? '<p class="sn-vi">' + esc(w.dich) + '</p>' : "")
      + (w.giai ? '<p class="sn-giai sn-vi">💡 ' + esc(w.giai) + '</p>' : "") + '</div>';
  });
  h += '</div>';
  if (Object.keys(nhom).length) h += '<div class="sn-legend">' + Object.keys(nhom).map(function(k){ return '<span><span class="sn-tag sn-' + esc(k) + '">' + esc(k) + '</span> ' + esc(nhom[k]) + '</span>'; }).join("") + '</div>';
  if (d.choi !== false) h += '<div class="sn-game"><div class="sn-gh"><b>🎧 Listen and choose – Nghe và chọn</b><span class="sn-score"></span></div>'
    + '<p class="sn-gq">Bấm <b>Bắt đầu</b>, nghe từ tiếng Anh rồi chọn đúng thiết bị.</p><div class="sn-opts"></div>'
    + '<div class="sn-gbar"><button type="button" class="btn primary sn-go">Bắt đầu</button><button type="button" class="btn sn-again" hidden>' + SPK + 'Nghe lại</button></div></div>';
  if (d.hoi && d.hoi.length) {
    h += '<div class="sn-qa"><div class="sn-gh"><b>✍️ Answer in English – Trả lời bằng tiếng Anh</b><span class="sn-qsc"></span></div><p class="sn-vi">Đọc (hoặc bấm 🔊 nghe) câu hỏi, gõ câu trả lời bằng <b>chữ tiếng Anh</b> rồi bấm <b>Check</b>.</p>';
    d.hoi.forEach(function(x, i){
      h += '<div class="sn-qi" data-q="' + i + '"><div class="sn-top"><button type="button" class="sn-spk sn-qspk" aria-label="Nghe câu hỏi">' + SPK + '</button><div class="sn-w"><span class="sn-en"><b>' + (i + 1) + '.</b> ' + esc(x.q) + '</span><span class="sn-vi sn-mean">' + esc(x.vi || "") + '</span></div></div>'
        + '<div class="sn-row"><input type="text" class="sn-in" autocomplete="off" spellcheck="false" placeholder="Type in English…" aria-label="Câu trả lời câu ' + (i + 1) + '">'
        + '<button type="button" class="btn primary sn-chk">Check</button><button type="button" class="btn sn-hint">Gợi ý</button></div><p class="sn-fb" aria-live="polite"></p></div>';
    });
    h += '</div>';
  }
  h += '</div>';
  el.innerHTML = h;

  var body = el.querySelector(".sn-body"), sw = el.querySelector(".sn-sw input"), swl = el.querySelector(".sn-swl");
  sw.addEventListener("change", function(){ on = sw.checked; body.hidden = !on; swl.textContent = on ? "Đang bật" : "Đang tắt"; lsSet(key, on ? "1" : "0"); if (!on) stop(); });
  el.querySelector(".sn-rate select").addEventListener("change", function(e){ rate = +e.target.value; });
  el.querySelector(".sn-hide input").addEventListener("change", function(e){ el.classList.toggle("sn-novi", e.target.checked); });

  function seq(i){
    if (i < 0) return [{t: d.moDau.en, lang: "en"}, {t: d.moDau.vi, lang: "vi"}];
    var w = d.tu[i], a = [{t: w.en, lang: "en"}, {t: w.en, lang: "en", cham: true}];
    if (w.cau) a.push({t: w.cau, lang: "en"});
    a.push({t: w.giai || (w.en + " nghĩa là " + w.vi + ". " + (w.dich || "")), lang: "vi"});
    return a;
  }
  var playing = null, stopB = el.querySelector(".sn-stop");
  function mark(c){ if (playing) playing.classList.remove("sn-on"); playing = c; if (c) { c.classList.add("sn-on"); if (c.scrollIntoViewIfNeeded) c.scrollIntoViewIfNeeded(); } }
  function done(){ mark(null); stopB.hidden = true; }
  el.querySelectorAll(".sn-say").forEach(function(c){
    c.querySelector(".sn-spk").addEventListener("click", function(){ var i = +c.dataset.i; stopB.hidden = false; mark(c); say(seq(i), null, done); });
  });
  stopB.addEventListener("click", function(){ stop(); done(); });
  el.querySelector(".sn-all").addEventListener("click", function(){
    var cards = [].slice.call(el.querySelectorAll(".sn-say")), list = [], owner = [];
    cards.forEach(function(c){ seq(+c.dataset.i).forEach(function(x){ list.push(x); owner.push(c); }); });
    stopB.hidden = false; say(list, function(k){ mark(owner[k]); }, done);
  });

  /* Câu hỏi trả lời bằng chữ tiếng Anh. hoi: [{q, vi, d:["keyboard","a keyboard"], goiY:"k _ _ _"}] */
  function norm(s){ return String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\b(a|an|the|it is|it's|its|is)\b/g, " ").replace(/\s+/g, " ").trim(); }
  var qok = {};
  function qscore(){ var s = el.querySelector(".sn-qsc"); if (s) s.textContent = "Đúng: " + Object.keys(qok).length + "/" + d.hoi.length; }
  el.querySelectorAll(".sn-qi").forEach(function(box){
    var x = d.hoi[+box.dataset.q], inp = box.querySelector(".sn-in"), fb = box.querySelector(".sn-fb"), tries = 0;
    var ans = x.d.map(norm), main = x.d[0];
    box.querySelector(".sn-qspk").addEventListener("click", function(){ mark(null); say([{t: x.q, lang: "en"}, {t: x.vi || "", lang: "vi"}].filter(function(a){ return a.t; })); });
    box.querySelector(".sn-hint").addEventListener("click", function(){
      var hint = x.goiY || main.split(" ").map(function(w){ return w.charAt(0) + w.slice(1).replace(/./g, " _"); }).join("   ");
      fb.className = "sn-fb"; fb.textContent = "Gợi ý: " + hint + (x.vi ? "" : "");
      say([{t: main, lang: "en", cham: true}]);
    });
    function check(){
      var v = norm(inp.value); if (!v) { fb.className = "sn-fb"; fb.textContent = "Em hãy gõ câu trả lời bằng tiếng Anh."; inp.focus(); return; }
      var ok = ans.some(function(a){ return v === a || (" " + v + " ").indexOf(" " + a + " ") >= 0; });
      tries++;
      box.classList.toggle("ok", ok); box.classList.toggle("bad", !ok);
      if (ok) { qok[box.dataset.q] = 1; fb.className = "sn-fb ok"; fb.innerHTML = "✅ Correct! <b>" + esc(main) + "</b>" + (x.giai ? " – " + esc(x.giai) : ""); say([{t: "Correct! " + main, lang: "en"}].concat(x.giai ? [{t: x.giai, lang: "vi"}] : [])); }
      else if (tries < 2) { fb.className = "sn-fb bad"; fb.textContent = "❌ Not yet. Try again! (Kiểm tra chính tả, hoặc bấm Gợi ý)"; say([{t: "Not yet. Try again!", lang: "en"}]); }
      else { fb.className = "sn-fb bad"; fb.innerHTML = "❌ Đáp án: <b>" + esc(main) + "</b>. Em gõ lại cho đúng nhé." + (x.giai ? " " + esc(x.giai) : ""); say([{t: "The answer is " + main, lang: "en"}, {t: "Đáp án là " + main + ". " + (x.giai || ""), lang: "vi"}]); }
      qscore();
    }
    box.querySelector(".sn-chk").addEventListener("click", check);
    inp.addEventListener("keydown", function(e){ if (e.key === "Enter") { e.preventDefault(); check(); } });
  });
  if (d.hoi) qscore();

  /* Trò chơi Nghe và chọn */
  var g = el.querySelector(".sn-game"); if (!g) return;
  var opts = g.querySelector(".sn-opts"), q = g.querySelector(".sn-gq"), sc = g.querySelector(".sn-score"), go = g.querySelector(".sn-go"), again = g.querySelector(".sn-again");
  var order = [], pos = 0, right = 0, ans = -1;
  function shuffle(a){ for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function ask(){
    if (pos >= order.length) {
      q.innerHTML = "🎉 Xong! Em đúng <b>" + right + "/" + order.length + "</b>. " + (right === order.length ? "Excellent!" : right >= order.length / 2 ? "Good job!" : "Try again!");
      opts.innerHTML = ""; again.hidden = true; go.hidden = false; go.textContent = "Chơi lại";
      say([{t: right === order.length ? "Excellent!" : right >= order.length / 2 ? "Good job!" : "Try again!", lang: "en"}]); return;
    }
    ans = order[pos];
    var pool = shuffle(d.tu.map(function(_, i){ return i; }).filter(function(i){ return i !== ans; })).slice(0, 3).concat(ans);
    q.innerHTML = "Câu " + (pos + 1) + "/" + order.length + ": nghe và chọn thiết bị đúng.";
    opts.innerHTML = shuffle(pool).map(function(i){ return '<button type="button" class="sn-opt" data-i="' + i + '"><span aria-hidden="true">' + esc(d.tu[i].icon) + '</span>' + esc(d.tu[i].vi) + '</button>'; }).join("");
    say([{t: d.tu[ans].en, lang: "en"}]);
  }
  go.addEventListener("click", function(){ order = shuffle(d.tu.map(function(_, i){ return i; })).slice(0, Math.min(6, d.tu.length)); pos = 0; right = 0; sc.textContent = ""; go.hidden = true; again.hidden = false; ask(); });
  again.addEventListener("click", function(){ if (ans >= 0) say([{t: d.tu[ans].en, lang: "en", cham: true}]); });
  opts.addEventListener("click", function(e){
    var b = e.target.closest(".sn-opt"); if (!b || opts.dataset.lock) return;
    var w = d.tu[ans], ok = +b.dataset.i === ans; opts.dataset.lock = 1;
    b.classList.add(ok ? "ok" : "bad");
    if (!ok) opts.querySelector('[data-i="' + ans + '"]').classList.add("ok");
    if (ok) right++; sc.textContent = "Đúng: " + right + "/" + (pos + 1);
    q.innerHTML = (ok ? "✅ Đúng! " : "❌ Chưa đúng. ") + "<b>" + esc(w.en) + "</b> = " + esc(w.vi) + ".";
    say([{t: ok ? "Correct! " + w.en : "It is " + w.en, lang: "en"}, {t: (ok ? "Đúng rồi. " : "Đáp án là ") + w.vi, lang: "vi"}], null, function(){ delete opts.dataset.lock; pos++; setTimeout(ask, 400); });
  });
};

var css = document.createElement("style");
css.textContent = ""
+ ".sn-box{border:2px solid var(--info,#1d4ed8);border-radius:16px;background:var(--surface,#fff);margin:18px 0;overflow:hidden}"
+ ".sn-head{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--info-soft,#e1eafd);flex-wrap:wrap}"
+ ".sn-flag{font:700 14px var(--font-display,system-ui);background:var(--info,#1d4ed8);color:#fff;border-radius:8px;padding:6px 8px;letter-spacing:.5px}"
+ ".sn-tt{flex:1;min-width:180px;display:flex;flex-direction:column}.sn-tt b{font-family:var(--font-display,system-ui);font-size:17px}.sn-tt small{color:var(--muted,#5a6e6b)}"
+ ".sn-sw{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-weight:600;user-select:none}.sn-sw input{position:absolute;opacity:0;width:1px;height:1px}"
+ ".sn-knob{width:44px;height:24px;border-radius:12px;background:var(--line,#cde3e0);position:relative;transition:.2s}.sn-knob::after{content:'';position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:.2s}"
+ ".sn-sw input:checked+.sn-knob{background:var(--info,#1d4ed8)}.sn-sw input:checked+.sn-knob::after{left:23px}.sn-sw input:focus-visible+.sn-knob{outline:2px solid var(--info,#1d4ed8);outline-offset:2px}"
+ ".sn-body{padding:14px}.sn-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}.sn-bar .btn svg,.sn-gbar .btn svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px;fill:currentColor;stroke:currentColor;stroke-width:1.6}"
+ ".sn-rate,.sn-hide{font-size:14px;color:var(--muted,#5a6e6b);display:inline-flex;gap:6px;align-items:center}"
+ ".sn-intro{display:flex;gap:10px;align-items:flex-start;background:var(--sunk,#edf6f5);border-radius:12px;padding:10px 12px;margin-bottom:12px}"
+ ".sn-en{margin:2px 0;font-weight:600;color:var(--info,#1d4ed8)}.sn-vi{margin:2px 0;color:var(--muted,#5a6e6b)}.sn-novi .sn-vi{visibility:hidden}.sn-novi .sn-opt{visibility:visible}"
+ ".sn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}"
+ ".sn-card{border:1px solid var(--line,#cde3e0);border-radius:12px;padding:10px 12px;background:var(--surface,#fff);transition:box-shadow .2s,border-color .2s}"
+ ".sn-card.sn-on,.sn-intro.sn-on{border-color:var(--info,#1d4ed8);box-shadow:0 0 0 3px var(--info-soft,#e1eafd)}"
+ ".sn-top{display:flex;align-items:center;gap:10px}.sn-ic{font-size:30px;line-height:1}.sn-w{flex:1;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}.sn-word{font-size:19px;font-family:var(--font-display,system-ui)}.sn-mean{width:100%}"
+ ".sn-sent{font-size:15px;margin-top:8px}.sn-giai{font-size:14px}"
+ ".sn-tag{font-size:11px;font-weight:700;text-transform:uppercase;border-radius:6px;padding:2px 6px;letter-spacing:.3px}.sn-input{background:var(--ok-soft,#dcf3e3);color:var(--ok,#15803d)}.sn-output{background:var(--pink-soft,#fde8f1);color:var(--pink,#d0186e)}.sn-both{background:var(--warn-soft,#fdf2d3);color:var(--warn,#a16207)}"
+ ".sn-spk{flex:none;width:40px;height:40px;border-radius:50%;border:none;background:var(--info,#1d4ed8);color:#fff;cursor:pointer;display:grid;place-items:center}.sn-spk svg{width:22px;height:22px;fill:#fff;stroke:#fff;stroke-width:1.6}.sn-spk:hover{filter:brightness(1.1)}"
+ ".sn-on .sn-spk{animation:snp 1s infinite}@keyframes snp{50%{box-shadow:0 0 0 6px var(--info-soft,#e1eafd)}}"
+ ".sn-legend{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:10px;font-size:14px;color:var(--muted,#5a6e6b)}"
+ ".sn-game{margin-top:14px;border-top:1px dashed var(--line,#cde3e0);padding-top:12px}.sn-gh{display:flex;justify-content:space-between;gap:8px}.sn-score{color:var(--ok,#15803d);font-weight:700}"
+ ".sn-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin:8px 0}"
+ ".sn-opt{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px;border:2px solid var(--line,#cde3e0);border-radius:12px;background:var(--surface,#fff);color:var(--fg,#1c2a29);font:inherit;cursor:pointer}.sn-opt span{font-size:32px}"
+ ".sn-opt:hover{border-color:var(--info,#1d4ed8)}.sn-opt.ok{border-color:var(--ok,#15803d);background:var(--ok-soft,#dcf3e3)}.sn-opt.bad{border-color:var(--bad,#b91c1c);background:var(--bad-soft,#fde3e3)}"
+ ".sn-gbar{display:flex;gap:10px;flex-wrap:wrap}"
+ ".sn-qa{margin-top:14px;border-top:1px dashed var(--line,#cde3e0);padding-top:12px}.sn-qi{border:1px solid var(--line,#cde3e0);border-radius:12px;padding:10px 12px;margin-top:10px}.sn-qi.ok{border-color:var(--ok,#15803d);background:var(--ok-soft,#dcf3e3)}.sn-qi.bad{border-color:var(--bad,#b91c1c)}"
+ ".sn-qspk{width:34px;height:34px}.sn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.sn-in{flex:1;min-width:160px;font:inherit;font-size:17px;padding:8px 10px;border:2px solid var(--line,#cde3e0);border-radius:10px;background:var(--surface,#fff);color:var(--fg,#1c2a29)}.sn-in:focus{outline:none;border-color:var(--info,#1d4ed8)}"
+ ".sn-fb{margin:6px 0 0;font-size:15px;min-height:1px}.sn-fb.ok{color:var(--ok,#15803d)}.sn-fb.bad{color:var(--bad,#b91c1c)}.sn-novi .sn-qa .sn-vi{visibility:visible}"
+ "@media(max-width:520px){.sn-grid{grid-template-columns:1fr}}@media print{.sn-bar,.sn-game,.sn-spk,.sn-sw{display:none}}";
document.head.appendChild(css);
})();
