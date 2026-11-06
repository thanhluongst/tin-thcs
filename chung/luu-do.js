/* Vẽ sơ đồ khối (SVG) và khối lệnh Scratch (HTML) cho các bài thuật toán.
   Sơ đồ khối:  LD.draw(phanTu, danhSach, {w: độ rộng tối đa})  → {hi(id), clear()}
   danhSach là mảng các bước:
     {t:"start"|"end"|"io"|"op", s:"Chữ\nxuống dòng", id:"x"}
     {t:"if", s:"Điều kiện?", yes:[...], no:[...], id}     (no rỗng = rẽ nhánh dạng thiếu)
     {t:"while", s:"Điều kiện?", body:[...], id}            (Đúng → làm body rồi quay lại; Sai → ra)
     {t:"blank"}  ô trống để học sinh điền (khung nét đứt)
   Tự động vẽ khi trang có <div data-ld='[...]'></div>. */
(function(){
"use strict";
const COL = {start:["#f8bbd0","#c2185b"], end:["#f8bbd0","#c2185b"], io:["#b2dfdb","#00796b"], op:["#fff59d","#c9a800"], cond:["#aed581","#558b2f"], blank:["#ffffff","#90a4ae"]};
const G = 24, FS = 13, LH = 16;
let ctx;
function tw(s){ if (!ctx) { ctx = document.createElement("canvas").getContext("2d"); ctx.font = FS + 'px "Be Vietnam Pro", Arial, sans-serif'; } return ctx.measureText(s).width; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function lines(s){ return String(s || "").split("\n"); }
function text(cx, cy, s, cls){ const L = lines(s), y0 = cy - (L.length - 1) * LH / 2 + 4.5;
  return L.map((l, i) => `<text x="${cx}" y="${y0 + i * LH}" text-anchor="middle" class="${cls || "ld-tx"}">${esc(l)}</text>`).join(""); }
function arrow(x1, y1, x2, y2){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ld-ln" marker-end="url(#ld-ah)"/>`; }
function line(pts){ return `<polyline points="${pts.map(p => p.join(",")).join(" ")}" class="ld-ln" fill="none"/>`; }
function lbl(x, y, s, anchor){ return `<text x="${x}" y="${y}" text-anchor="${anchor || "middle"}" class="ld-lb">${s}</text>`; }

/* Mỗi khối trả về {l, r, h, draw(cx, y)}: l, r = phần rộng bên trái/phải trục; vào ở đỉnh, ra ở đáy, trên trục cx. */
function node(n){
  const L = lines(n.s), w0 = Math.max(...L.map(tw));
  if (n.t === "if" || n.t === "while") return n.t === "if" ? ifBlock(n) : whileBlock(n);
  if (n.t === "cond") { const D = diamond(n); return {l: D.dw / 2, r: D.dw / 2, h: D.dh, draw: D.draw}; }
  let w = Math.max(n.t === "start" || n.t === "end" ? 96 : 120, w0 + (n.t === "io" ? 46 : 28)), h = Math.max(32, L.length * LH + 14);
  if (n.t === "blank") { w = Math.max(120, w); }
  return {l: w / 2, r: w / 2, h, draw(cx, y){
    const c = COL[n.t] || COL.op, a = `data-ld-id="${esc(n.id || "")}" class="ld-n${n.t === "blank" ? " ld-blank" : ""}"`;
    let sh;
    if (n.t === "start" || n.t === "end") sh = `<ellipse cx="${cx}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${c[0]}" stroke="${c[1]}"/>`;
    else if (n.t === "io") { const k = 12; sh = `<polygon points="${cx - w / 2 + k},${y} ${cx + w / 2},${y} ${cx + w / 2 - k},${y + h} ${cx - w / 2},${y + h}" fill="${c[0]}" stroke="${c[1]}"/>`; }
    else sh = `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c[0]}" stroke="${c[1]}"${n.t === "blank" ? ' stroke-dasharray="5 4"' : ""}/>`;
    return `<g ${a}>${sh}${text(cx, y + h / 2, n.s || (n.t === "blank" ? "……" : ""))}</g>`;
  }};
}
function diamond(n){ const L = lines(n.s), w0 = Math.max(...L.map(tw)); const dw = Math.max(120, w0 * 1.5 + 30), dh = Math.max(52, L.length * LH + 34);
  return {dw, dh, draw(cx, y){ const c = COL.cond;
    return `<g data-ld-id="${esc(n.id || "")}" class="ld-n"><polygon points="${cx},${y} ${cx + dw / 2},${y + dh / 2} ${cx},${y + dh} ${cx - dw / 2},${y + dh / 2}" fill="${c[0]}" stroke="${c[1]}"/>${text(cx, y + dh / 2, n.s)}</g>`; }}; }
function seq(list){
  const B = (list || []).map(node);
  if (!B.length) return {l: 0, r: 0, h: 0, empty: true, draw(){ return ""; }};
  return {l: Math.max(...B.map(b => b.l)), r: Math.max(...B.map(b => b.r)), h: B.reduce((s, b) => s + b.h, 0) + G * (B.length - 1),
    draw(cx, y){ let s = "", yy = y; B.forEach((b, i) => { if (i) { s += arrow(cx, yy, cx, yy + G); yy += G; } s += b.draw(cx, yy); yy += b.h; }); return s; }};
}
function ifBlock(n){
  const D = diamond(n), Y = seq(n.yes), N = seq(n.no), yl = n.yl || "Đúng", nl = n.nl || "Sai";
  if (N.empty) { /* dạng thiếu: Đúng đi xuống, Sai vòng bên phải */
    const xr = Math.max(D.dw / 2 + 16, Y.r + 22), h = D.dh + G + Y.h + 26;
    return {l: Math.max(D.dw / 2, Y.l), r: xr + 4, h, draw(cx, y){
      const yb = y + D.dh, ym = yb + G + Y.h + 16;
      return D.draw(cx, y) + arrow(cx, yb, cx, yb + G) + lbl(cx + 6, yb + 15, yl, "start") + Y.draw(cx, yb + G) +
        line([[cx, yb + G + Y.h], [cx, y + h]]) +
        line([[cx + D.dw / 2, y + D.dh / 2], [cx + xr, y + D.dh / 2], [cx + xr, ym]]) + arrow(cx + xr, ym, cx + 2, ym) + lbl(cx + D.dw / 2 + 4, y + D.dh / 2 - 6, nl, "start");
    }};
  }
  const oL = Math.max(D.dw / 2 + 6, Y.r + 16), oR = Math.max(D.dw / 2 + 6, N.l + 16), bh = Math.max(Y.h, N.h), h = D.dh / 2 + G + bh + 26;
  return {l: Math.max(D.dw / 2, oL + Y.l), r: Math.max(D.dw / 2, oR + N.r), h: Math.max(h, D.dh + 10), draw(cx, y){
    const ym = y + D.dh / 2, yb = ym + G, ye = yb + bh + 16, xl = cx - oL, xr = cx + oR;
    return D.draw(cx, y) + line([[cx - D.dw / 2, ym], [xl, ym]]) + arrow(xl, ym, xl, yb) + lbl(cx - D.dw / 2 - 4, ym - 6, yl, "end") +
      line([[cx + D.dw / 2, ym], [xr, ym]]) + arrow(xr, ym, xr, yb) + lbl(cx + D.dw / 2 + 4, ym - 6, nl, "start") +
      Y.draw(xl, yb) + N.draw(xr, yb) +
      line([[xl, yb + Y.h], [xl, ye], [xr, ye], [xr, yb + N.h]]) + line([[cx, ye], [cx, y + Math.max(h, D.dh + 10)]]);
  }};
}
function whileBlock(n){
  const D = diamond(n), B = seq(n.body), yl = n.yl || "Đúng", nl = n.nl || "Sai";
  const xl = Math.max(D.dw / 2 + 16, B.l + 22), xr = Math.max(D.dw / 2 + 16, B.r + 22), top = 14, h = top + D.dh + G + B.h + 40;
  return {l: xl + 4, r: xr + 4, h, draw(cx, y){
    const yd = y + top, yb = yd + D.dh, yback = yb + G + B.h + 14, yex = y + h - 8;
    return line([[cx, y], [cx, yd]]) + D.draw(cx, yd) + arrow(cx, yb, cx, yb + G) + lbl(cx + 6, yb + 15, yl, "start") + B.draw(cx, yb + G) +
      line([[cx, yb + G + B.h], [cx, yback], [cx - xl, yback], [cx - xl, y + 6]]) + arrow(cx - xl, y + 6, cx - 2, y + 6) +
      line([[cx + D.dw / 2, yd + D.dh / 2], [cx + xr, yd + D.dh / 2], [cx + xr, yex]]) + arrow(cx + xr, yex, cx + 2, yex) + lbl(cx + D.dw / 2 + 4, yd + D.dh / 2 - 6, nl, "start") +
      line([[cx, yex], [cx, y + h]]);
  }};
}
function draw(el, list, opt){
  opt = opt || {};
  const S = seq(list), pad = 10, tail = opt.arrows ? 18 : 0, W = S.l + S.r + pad * 2, H = S.h + pad * 2 + tail * 2, cx = pad + S.l;
  let body = S.draw(cx, pad + tail);
  if (opt.arrows) body = arrow(cx, pad, cx, pad + tail) + body + arrow(cx, pad + tail + S.h, cx, pad + tail * 2 + S.h);
  el.innerHTML = `<svg class="ld-svg" viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto" role="img" aria-label="${esc(opt.label || "Sơ đồ khối")}">
<defs><marker id="ld-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#37474f"/></marker></defs>${body}</svg>`;
  const svg = el.querySelector("svg");
  return {svg, hi(id){ svg.querySelectorAll(".ld-n").forEach(g => g.classList.toggle("ld-on", !!id && g.dataset.ldId === id)); }, clear(){ this.hi(null); }};
}

const css = `.ld-box{display:flex;justify-content:center;width:100%;overflow-x:auto}
.ld-svg{background:#fff;border-radius:8px}
.ld-tx{font:${FS}px "Be Vietnam Pro",Arial,sans-serif;fill:#1d2433}
.ld-lb{font:600 12px "Be Vietnam Pro",Arial,sans-serif;fill:#37474f}
.ld-ln{stroke:#37474f;stroke-width:1.6}
.ld-n polygon,.ld-n rect,.ld-n ellipse{stroke-width:1.4;transition:filter .2s,stroke-width .2s}
.ld-n.ld-on polygon,.ld-n.ld-on rect,.ld-n.ld-on ellipse{stroke:#e65100;stroke-width:4;filter:drop-shadow(0 0 6px #ff9800)}
.ld-legend{display:grid;gap:6px;font-size:14px}.ld-legend span{display:inline-flex;align-items:center;gap:8px}
/* Khối lệnh Scratch */
.sb{display:inline-flex;flex-direction:column;align-items:flex-start;font:600 13px/1.2 "Be Vietnam Pro",Arial,sans-serif;color:#fff;text-align:left}
.sb .b{background:var(--c);border:1px solid rgba(0,0,0,.18);border-radius:5px;padding:6px 10px;margin:0 0 1px;display:flex;align-items:center;gap:5px;flex-wrap:wrap;position:relative}
.sb .b.hat{border-radius:16px 16px 5px 5px;padding-top:10px}
.sb .b.on{outline:3px solid #ff9800;outline-offset:1px}
.sb .c{background:var(--c);border:1px solid rgba(0,0,0,.18);border-radius:5px;margin:0 0 1px;padding:0}
.sb .c>.h{padding:6px 10px;display:flex;align-items:center;gap:5px;flex-wrap:wrap}
.sb .c>.in{margin-left:14px;background:transparent;padding:1px 0;min-height:14px;display:flex;flex-direction:column;align-items:flex-start}
.sb .c>.ft{height:14px}
.sb .c.on>.h{outline:3px solid #ff9800}
.sb .v{background:#fff;color:#333;border-radius:10px;padding:2px 8px;font-weight:500}
.sb .r{background:var(--c);border:1px solid rgba(0,0,0,.2);border-radius:12px;padding:2px 7px;display:inline-flex;gap:4px;align-items:center}
.sb .p{background:var(--c);border:1px solid rgba(0,0,0,.2);clip-path:polygon(8px 0,calc(100% - 8px) 0,100% 50%,calc(100% - 8px) 100%,8px 100%,0 50%);padding:2px 12px;display:inline-flex;gap:4px;align-items:center}
.sb .n{display:inline-block;background:#fff;color:#c62828;border:1px solid #c62828;border-radius:50%;width:18px;height:18px;font-size:11px;line-height:16px;text-align:center;margin-left:4px}
.ev{--c:#ffbf00}.lk{--c:#9966ff}.ss{--c:#5cb1d6}.va{--c:#ff8c1a}.op{--c:#59c059}.ct{--c:#ffab19}.mo{--c:#4c97ff}.so{--c:#cf63cf}`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

window.LD = {draw};
function auto(){ document.querySelectorAll("[data-ld]").forEach(el => { if (el._ld) return; try { el._ld = draw(el, JSON.parse(el.dataset.ld), {label: el.dataset.label, arrows: el.hasAttribute("data-arrows")}); } catch (e) { console.error(e); } }); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", auto); else auto();
/* Trang giáo viên chèn nội dung bài sau khi tải: tự vẽ các sơ đồ mới xuất hiện */
let tm; new MutationObserver(() => { clearTimeout(tm); tm = setTimeout(auto, 50); }).observe(document.documentElement, {childList: true, subtree: true});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { ctx = null; document.querySelectorAll("[data-ld]").forEach(el => { el._ld = Object.assign(el._ld || {}, draw(el, JSON.parse(el.dataset.ld), {label: el.dataset.label, arrows: el.hasAttribute("data-arrows")})); }); });
})();
