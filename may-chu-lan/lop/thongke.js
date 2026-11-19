/* 📊 BÀI LÀM TỪNG HOẠT ĐỘNG (trang giáo viên): nút nổi theo hoạt động đang chiếu; bấm mở lưới bài của mọi máy
   để xem, đánh giá đúng/sai, khen ⭐, nhận xét, chọn câu trả lời hay để chiếu. Dùng biến của trang: ST, ALL, STU, ANS, FEAT, ctl, sendPraise, board. */
(function(){
"use strict";
const css = `
#tk[hidden],#tkBtn[hidden]{display:none!important}
#tkBtn{position:fixed;right:18px;bottom:18px;z-index:60;font:700 17px system-ui,sans-serif;border:0;border-radius:999px;padding:13px 20px;cursor:pointer;
  background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;box-shadow:0 10px 24px rgba(37,99,235,.4);display:flex;gap:10px;align-items:center}
#tkBtn .n{background:#fff;color:#2563eb;border-radius:999px;padding:1px 10px;font-size:15px}
#tkBtn.moi{animation:tkNhay 1s ease 2}@keyframes tkNhay{50%{transform:scale(1.08)}}
#tk{position:fixed;inset:0;z-index:70;background:#f1f5f9;display:flex;flex-direction:column;font:16px/1.45 system-ui,"Segoe UI",sans-serif;color:#0f172a}
#tk .tk-h{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px 18px;background:#fff;border-bottom:1px solid #e2e8f0}
#tk .tk-h h2{margin:0;font-size:20px;flex:1 1 300px}
#tk .tk-h label{display:flex;gap:6px;align-items:center;font-weight:600;cursor:pointer}
#tk .tk-h button{font:inherit;font-weight:700;border:0;border-radius:10px;padding:8px 14px;cursor:pointer;background:#e2e8f0}
#tk .tk-h .dong{background:#0f172a;color:#fff}
#tk .tk-tom{padding:8px 18px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;flex-wrap:wrap;gap:14px;font-weight:600}
#tk .tk-tom span b{font-size:20px}
#tk .tk-l{flex:1;overflow:auto;padding:16px 18px;display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--w,320px),1fr));gap:14px;align-content:start}
.tkc{background:#fff;border:2px solid #e2e8f0;border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:8px}
.tkc.chua{opacity:.55;border-style:dashed}
.tkc.het{border-color:#16a34a}.tkc.sai{border-color:#f59e0b}
.tkc .ten{display:flex;gap:8px;align-items:start;justify-content:space-between}
.tkc .ten b{font-size:17px}
.tkc .diem{border-radius:999px;padding:2px 10px;font-weight:800;font-size:14px;white-space:nowrap;background:#e2e8f0}
.tkc.het .diem{background:#dcfce7;color:#166534}.tkc.sai .diem{background:#fef3c7;color:#92400e}
.tkc .cau{border-top:1px dashed #e2e8f0;padding-top:6px}
.tkc .cq{font-size:13px;color:#64748b;margin-bottom:2px}
.tkc .tl{font-size:var(--fs,16px);white-space:pre-wrap;word-break:break-word}
.tkc .g{color:#16a34a;font-weight:800}.tkc .r{color:#dc2626;font-weight:800}
.tkc ul{margin:2px 0 0;padding-left:18px}.tkc li{margin:1px 0}
.tkc .kh{display:flex;flex-wrap:wrap;gap:6px;align-items:center;border-top:1px solid #e2e8f0;padding-top:8px}
.tkc .kh button{font:inherit;font-size:14px;font-weight:700;border:0;border-radius:8px;padding:6px 10px;cursor:pointer;background:#fef3c7}
.tkc .kh .gui{background:#2563eb;color:#fff}.tkc .kh .chieu{background:#e0e7ff}.tkc .kh .chieu.on{background:#4f46e5;color:#fff}
.tkc .kh input{flex:1 1 140px;min-width:0;font:inherit;font-size:14px;padding:6px 8px;border:1px solid #cbd5e1;border-radius:8px}
.tkc .da{font-size:13px;color:#92400e}
.tkc .goi{display:flex;flex-wrap:wrap;gap:4px}.tkc .goi button{font-size:12px;background:#f1f5f9;padding:3px 8px}
`;
document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
const btn = document.createElement("button"); btn.id = "tkBtn"; btn.type = "button"; btn.hidden = true;
btn.title = "Xem bài làm của các máy cho hoạt động đang chiếu (phím S)";
document.body.appendChild(btn);
const box = document.createElement("div"); box.id = "tk"; box.hidden = true; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Bài làm các máy");
document.body.appendChild(box);
let AN_TEN = false, CHI_NOP = false, DAP_AN = false, CO = 320, lastN = -1, lastStep = -1;
const KHEN = ["Trả lời chính xác!", "Giải thích rõ ràng.", "Có ý tưởng hay.", "Cần đọc kĩ câu hỏi.", "Cần sửa lại, em xem đáp án nhé."];

function laBai(q, v){
  if (v === undefined || v === null) return '<span class="cq">— chưa trả lời —</span>';
  if (q.type === "single") { const ok = q.ok === undefined ? null : v === q.ok; return (ok === null ? "" : ok ? '<span class="g">✓</span> ' : '<span class="r">✗</span> ') + esc(q.opts[v] || "") + (DAP_AN && ok === false ? '<div class="cq">Đáp án: ' + esc(q.opts[q.ok]) + "</div>" : ""); }
  if (q.type === "multi") return esc([].concat(v).map(k => q.opts[k]).join("; "));
  if (q.type === "sort" || q.type === "tf" || q.type === "match") {
    return "<ul>" + q.items.map((it, k) => { const val = v[k], ok = val !== undefined && itemOk(q, v, k);
      const ten = q.type === "match" ? it : it.t, chon = val === undefined ? "?" : q.type === "match" ? q.opts[val] : q.type === "tf" ? (val === "T" ? "Đ" : "S") : q.cols[val];
      const dung = q.type === "match" ? q.opts[q.ok[k]] : q.type === "tf" ? (it.a === "T" ? "Đ" : "S") : q.cols[it.a];
      return "<li>" + (ok ? '<span class="g">✓</span> ' : '<span class="r">✗</span> ') + esc(String(ten).replace(/<[^>]+>/g, "")) + " → <b>" + esc(chon || "?") + "</b>" + (DAP_AN && !ok ? ' <span class="cq">(đúng: ' + esc(dung) + ")</span>" : "") + "</li>"; }).join("") + "</ul>";
  }
  return esc(textOf(q, v));
}
function nhan(id, k){ return AN_TEN ? "Bài " + (k + 1) : labelOf(STU()[id]); }

function ve(){
  const i = ST.step, step = STEPS[i]; if (!step || i <= 0) { box.hidden = true; return; }
  const st = STU(), an = ANS(), kq = keyedQs(step), qs = (step.qs || []).filter(q => q.type !== "sim");
  let ids = Object.keys(st); const nop = ids.filter(id => an[id] && an[id][i]);
  if (CHI_NOP) ids = nop;
  const rows = ids.map(id => { const a = (an[id] || {})[i]; const ok = a ? kq.filter(q => isCorrect(q, a[q.id]) === true).length : 0; return {id, a, ok}; });
  rows.sort((x, y) => (!!y.a - !!x.a) || labelOf(st[x.id]).localeCompare(labelOf(st[y.id]), "vi"));
  const het = rows.filter(r => r.a && kq.length && r.ok === kq.length).length;
  const pr = ALL.praise || [];
  box.innerHTML = `<div class="tk-h"><h2>📊 Bài làm · ${esc(i + ". " + step.t)}</h2>
    <label><input type="checkbox" data-o="ten" ${AN_TEN ? "checked" : ""}> Ẩn tên</label>
    <label><input type="checkbox" data-o="nop" ${CHI_NOP ? "checked" : ""}> Chỉ máy đã nộp</label>
    <label><input type="checkbox" data-o="da" ${DAP_AN ? "checked" : ""}> Hiện đáp án đúng</label>
    <button type="button" data-o="nho" title="Thu nhỏ thẻ">A−</button><button type="button" data-o="to" title="Phóng to thẻ">A+</button>
    <button type="button" class="dong" data-o="dong">Đóng (Esc)</button></div>
   <div class="tk-tom"><span>📥 Đã nộp <b>${nop.length}/${Object.keys(st).length}</b> máy</span>${kq.length ? `<span>✅ Đúng hết <b>${het}</b> máy</span>` : ""}<span>❓ ${qs.length} câu hỏi</span></div>
   <div class="tk-l" style="--w:${CO}px;--fs:${Math.round(CO / 20)}px">${rows.map((r, k) => {
      const mine = pr.filter(p => p.id === r.id && p.step === i), sao = mine.reduce((t, p) => t + (p.stars || 0), 0), cmt = mine.filter(p => p.cmt).map(p => p.cmt).slice(-1)[0];
      const cls = !r.a ? "chua" : kq.length ? (r.ok === kq.length ? "het" : "sai") : "";
      return `<div class="tkc ${cls}" data-id="${r.id}"><div class="ten"><b>${esc(nhan(r.id, k))}</b><span class="diem">${!r.a ? "Chưa nộp" : kq.length ? "Đúng " + r.ok + "/" + kq.length : "Đã nộp"}</span></div>
        ${r.a ? qs.map((q, j) => `<div class="cau"><div class="cq">Câu ${j + 1}. ${esc(String(q.q).replace(/<[^>]+>/g, "").slice(0, 90))}</div><div class="tl">${laBai(q, r.a[q.id])}</div>
          ${(q.type === "text" || q.type === "decl") && r.a[q.id] !== undefined ? `<button type="button" class="chieu ${FEAT.some(f => f.id === r.id && f.q === q.id) ? "on" : ""}" data-q="${q.id}" style="font:inherit;font-size:13px;font-weight:700;border:0;border-radius:8px;padding:4px 10px;margin-top:4px;cursor:pointer">${FEAT.some(f => f.id === r.id && f.q === q.id) ? "Đang chọn chiếu ✓" : "📽 Chọn chiếu"}</button>` : ""}</div>`).join("") : ""}
        ${sao || cmt ? `<div class="da">Đã khen: ${"⭐".repeat(Math.min(5, sao))}${cmt ? " · “" + esc(cmt) + "”" : ""}</div>` : ""}
        <div class="kh"><button type="button" data-sao="1">⭐ +1</button><input type="text" placeholder="Nhận xét…" aria-label="Nhận xét cho ${esc(labelOf(st[r.id]))}"><button type="button" class="gui">Gửi</button>
          <div class="goi">${KHEN.map(t => `<button type="button" data-t="${esc(t)}">${esc(t)}</button>`).join("")}</div></div></div>`;
    }).join("") || '<p style="padding:20px;color:#64748b">Chưa có máy nào vào lớp.</p>'}</div>`;
  box.querySelectorAll("[data-o]").forEach(el => el.addEventListener(el.type === "checkbox" ? "change" : "click", () => {
    const o = el.dataset.o;
    if (o === "ten") AN_TEN = el.checked; if (o === "nop") CHI_NOP = el.checked; if (o === "da") DAP_AN = el.checked;
    if (o === "nho") CO = Math.max(240, CO - 40); if (o === "to") CO = Math.min(640, CO + 40);
    if (o === "dong") { box.hidden = true; return; }
    ve();
  }));
  box.querySelectorAll(".tkc").forEach(c => {
    const id = c.dataset.id, inp = c.querySelector(".kh input"), sb = c.querySelector("[data-sao]"); let sao = 0;
    sb.onclick = () => { sao++; sb.textContent = "⭐ ×" + sao; };
    c.querySelectorAll(".goi button").forEach(b => b.onclick = () => { inp.value = b.dataset.t; inp.focus(); });
    c.querySelector(".gui").onclick = () => {
      if (!sao && !inp.value.trim()) { toast("Chọn sao hoặc ghi nhận xét."); return; }
      sendPraise((ALL.praise || []).concat([{id, step: ST.step, stars: sao, cmt: inp.value.trim(), t: Date.now()}]));
      toast("Đã gửi tới " + labelOf(STU()[id]) + "."); setTimeout(ve, 300);
    };
    inp.addEventListener("keydown", e => { if (e.key === "Enter") c.querySelector(".gui").click(); });
    c.querySelectorAll(".chieu").forEach(b => b.onclick = () => {
      const q = b.dataset.q, k = FEAT.findIndex(f => f.id === id && f.q === q);
      if (k >= 0) FEAT.splice(k, 1); else { const qq = STEPS[ST.step].qs.find(x => x.id === q); FEAT.push({id, q, name: labelOf(STU()[id]), text: textOf(qq, ANS()[id][ST.step][q])}); }
      if (ST.reveal) ctl({board: board()}); else toast("Đã chọn. Khi chốt đáp án, câu này hiện cho cả lớp.");
      ve(); try { drawLive(); } catch(e) {}
    });
  });
}
function nut(){
  const i = ST.step, step = STEPS[i];
  if (!step || i <= 0 || !(step.qs || []).some(q => q.type !== "sim")) { btn.hidden = true; box.hidden = true; return; }
  const st = STU(), an = ANS(), m = Object.keys(st).length, n = Object.keys(st).filter(id => an[id] && an[id][i]).length;
  btn.innerHTML = '📊 Bài làm HĐ ' + i + ' <span class="n">' + n + "/" + m + "</span>";
  btn.hidden = false;
  if (i === lastStep && n > lastN && lastN >= 0) { btn.classList.remove("moi"); void btn.offsetWidth; btn.classList.add("moi"); }
  if (i !== lastStep && !box.hidden) ve();
  lastStep = i; lastN = n;
}
btn.onclick = () => { box.hidden = false; ve(); };
document.addEventListener("keydown", e => {
  if (e.target.closest && e.target.closest("input,textarea,select")) return;
  if (e.key === "Escape" && !box.hidden) { box.hidden = true; e.stopPropagation(); }
  else if ((e.key === "s" || e.key === "S") && !btn.hidden) { box.hidden ? btn.click() : (box.hidden = true); }
}, true);
/* vẽ lại theo mỗi lượt cập nhật của trang (drawAll) — giữ nguyên ô nhận xét đang gõ */
const goc = window.drawAll || drawAll;
drawAll = function(f){ goc(f); try { nut(); const ae = document.activeElement; if (!box.hidden && !(box.contains(ae) && ae.type === "text")) ve(); } catch(e) { console.log("thongke", e); } };
})();
