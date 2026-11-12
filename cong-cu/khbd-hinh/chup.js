// Tạo hình minh hoạ cho KHBD từ trang học sinh:
//  - fig: các hình vẽ lại (figure.fig không có <img>: lưu đồ, sơ đồ, bảng minh hoạ) → khbd/f<i>.jpg (i = thứ tự figure.fig trong trang)
//  - hd : hoạt động không có hình nào → chụp khung nhiệm vụ trên trang học sinh → khbd/<hđ>.jpg
const pp = require('puppeteer-core'); const fs = require('fs'); const path = require('path');
const root = process.argv[2], chi = process.argv[3];
const CAO = 560; // px CSS tối đa của ảnh chụp hoạt động (vừa khung 500×360 trong Word)
(async () => {
  const b = await pp.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const p = await b.newPage(); await p.setViewport({ width: 820, height: 1200, deviceScaleFactor: 1.25 });
  let tf = 0, th = 0;
  for (const id of fs.readdirSync(root).filter(d => /^tin[6-9]-/.test(d) && (!chi || d === chi))) {
    const thu = path.join(root, id, 'khbd');
    if (fs.existsSync(thu)) for (const f of fs.readdirSync(thu)) fs.unlinkSync(path.join(thu, f));
    await p.goto('http://localhost:8768/' + id + '/index.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 700));
    await p.addStyleTag({ content: 'header,.topbar,.toc,nav,.hs-bar,#dang-nhap{display:none!important} *{animation:none!important;transition:none!important} figure.fig button{display:none!important}' });
    const ds = await p.evaluate(() => {
      const fig = [], hd = [];
      document.querySelectorAll('section.part figure.fig').forEach((f, i) => {
        if (f.querySelector('img')) return;
        const box = document.createElement('div'); // vùng hình, không gồm chú thích
        [...f.childNodes].filter(n => n.nodeName !== 'FIGCAPTION').forEach(n => box.appendChild(n));
        box.id = 'chupf' + i; box.style.cssText = 'display:block;padding:6px;background:#fff'; f.insertBefore(box, f.firstChild);
        if (box.offsetHeight > 30) fig.push({ i, el: box.id });
      });
      document.querySelectorAll('section.part[id]').forEach(sec => {
        if (sec.querySelector('figure.fig')) return;
        const acts = [...sec.querySelectorAll(':scope > .act')].filter(a => !a.classList.contains('act-ghi') && !a.classList.contains('act-chat'));
        const a = (sec.id === 'mo-dau' && acts.find(x => x.classList.contains('act-kd') && x.offsetHeight > 80))
          || acts.find(x => x.querySelector('[data-task]')) || acts[0];
        if (!a) return;
        let t = a.querySelector('[data-task]');
        if (!t) t = [...sec.querySelectorAll('[data-task]')].find(x => a.compareDocumentPosition(x) & 4);
        const tag = a.querySelector('.act-tag');
        const cap = tag ? [...tag.childNodes].map(n => n.textContent.trim()).filter(s => s && !/^[\d.]+$/.test(s)).join(': ') : '';
        a.id = a.id || ('chup-' + sec.id);
        hd.push({ hd: sec.id, el: a.id, task: t ? t.getAttribute('data-task') : '', cap });
      });
      return { fig, hd };
    });
    const man = { fig: {}, hd: {} };
    const chup = async (sel, f, maxH) => {
      const bb = await p.evaluate(s => { const e = document.getElementById(s); if (!e) return null; window.scrollTo(0, 0); const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height }; }, sel);
      if (!bb || bb.height < 30) return null;
      const h = Math.min(bb.height, maxH || 1e9);
      await p.screenshot({ path: f, type: 'jpeg', quality: 78, clip: { x: bb.x, y: bb.y, width: bb.width, height: h }, captureBeyondViewport: true });
      return { w: Math.round(bb.width), h: Math.round(h), cat: h < bb.height ? 1 : 0 };
    };
    if (ds.fig.length || ds.hd.length) fs.mkdirSync(thu, { recursive: true });
    for (const x of ds.fig) { const r = await chup(x.el, path.join(thu, 'f' + x.i + '.jpg')); if (r) { man.fig[x.i] = r; tf++; } }
    for (const x of ds.hd) { const r = await chup(x.el, path.join(thu, x.hd + '.jpg'), CAO); if (r) { man.hd[x.hd] = Object.assign({ task: x.task, cap: x.cap }, r); th++; } }
    if (ds.fig.length || ds.hd.length) fs.writeFileSync(path.join(thu, 'hinh.json'), JSON.stringify(man));
    console.log(id, 'hình vẽ:', Object.keys(man.fig).length, 'hđ:', Object.keys(man.hd).join(','));
  }
  console.log('tổng hình vẽ', tf, 'tổng hđ', th); await b.close();
})();
