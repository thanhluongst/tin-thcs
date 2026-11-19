/* Tin học 8 · Bài 14. Cấu trúc điều khiển · 1 tiết.
   Tình huống: trò chơi Đoán số của An và Khoa.
   Mô phỏng: "doanSo" (chơi Đoán số, sơ đồ sáng theo tuần tự – rẽ nhánh – lặp),
             "veDaGiac" (kéo thả khối lặp, Bọ rùa vẽ đa giác – Bảng 14.1). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trò chơi Đoán số',hd:'Khởi động · 8 phút',code:'1',phut:8,
  story:'<p>Máy tính nghĩ một <b>số bí mật</b> từ 1 đến 100. Em đoán; sai thì máy báo <b>“Quá thấp”</b> hoặc <b>“Quá cao”</b>; đoán đến khi đúng. Chơi thử và quan sát sơ đồ: phần nào đang chạy?</p>',
  qs:[{id:'s1',type:'sim',sim:'doanSo'},
      {id:'d1',type:'single',q:'Số bí mật 45, em nhập 30. Máy báo:',opts:['“Quá thấp”','“Quá cao”','“HOAN HÔ!”','Không báo gì'],ok:0},
      {id:'d2',type:'single',q:'Chiến thuật đoán nhanh nhất là:',opts:['Đoán 1, 2, 3… lần lượt','Đoán số ở giữa khoảng còn lại (50, 25/75…)','Đoán ngẫu nhiên','Luôn đoán 100'],ok:1}],
  key:['Đoán số ở <b>giữa khoảng</b>: mỗi lần loại một nửa → nhiều nhất <b>7 lần</b> với 100 số.']},
 {t:'Ba cấu trúc điều khiển',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Trong trò chơi có đủ ba cấu trúc: các bước <b>lần lượt</b> (tuần tự), <b>nếu</b> nhỏ hơn thì… (rẽ nhánh), đoán <b>đến khi</b> đúng (lặp).</p>',
  qs:[{id:'ct',type:'sort',q:'Khối lệnh/cách viết thể hiện cấu trúc nào?',cols:{c0:'Tuần tự hoặc rẽ nhánh',c1:'Lặp'},items:[{t:'Lắp các khối theo thứ tự từ trên xuống',a:'c0'},{t:'nếu ⟨ ⟩ thì … nếu không thì …',a:'c0'},{t:'lặp lại 10',a:'c1'},{t:'liên tục',a:'c1'},{t:'lặp lại cho đến khi ⟨ ⟩',a:'c1'},{t:'nếu ⟨ ⟩ thì',a:'c0'}]},
      {id:'rn',type:'match',q:'Ghép khối lệnh rẽ nhánh với dạng.',items:['nếu ⟨ ⟩ thì','nếu ⟨ ⟩ thì … nếu không thì …'],opts:['Rẽ nhánh dạng đầy đủ','Rẽ nhánh dạng khuyết'],ok:[1,0]},
      {id:'lp',type:'match',q:'Ghép khối lặp với dạng lặp.',items:['lặp lại 10','liên tục','lặp lại cho đến khi ⟨trả lời = số bí mật⟩'],opts:['Lặp vô hạn','Lặp có điều kiện kết thúc','Lặp với số lần định trước'],ok:[2,0,1]}],
  key:['<b>Tuần tự</b>: lắp khối từ trên xuống. <b>Rẽ nhánh</b>: nếu…thì (khuyết), nếu…thì…nếu không thì (đầy đủ).','<b>Lặp</b>: lặp lại n, liên tục, lặp lại cho đến khi.']},
 {t:'Lặp để vẽ đa giác',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Dùng khối <b>lặp lại</b> để Bọ rùa vẽ các hình ở <b>Bảng 14.1</b>. Đổi số lần lặp và góc xoay, chạy thử.</p>',
  qs:[{id:'s2',type:'sim',sim:'veDaGiac'},
      {id:'b141',type:'match',q:'Ghép đoạn lệnh với hình vẽ được.',items:['lặp lại 4: di chuyển 100, xoay 90','lặp lại 5: di chuyển 100, xoay 72','lặp lại 6: di chuyển 100, xoay 60','lặp lại 3: di chuyển 100, xoay 120'],opts:['Hình ba cạnh','Hình bốn cạnh','Hình năm cạnh','Hình sáu cạnh'],ok:[1,2,3,0]},
      {id:'p82',type:'single',q:'Cấu trúc lặp nào <b>không</b> có sẵn trong Scratch?',opts:['Lặp với số lần định trước','Lặp vô hạn','Lặp với điều kiện kiểm tra trước khi thực hiện','Lặp với điều kiện kiểm tra sau khi thực hiện'],ok:3}],
  key:['Số lần lặp = <b>số cạnh</b>; góc xoay = <b>360 : số cạnh</b>.']},
 {t:'Luyện tập: phương trình ax + b = 0',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  qs:[{id:'pt',type:'match',q:'Ghép khối vào vị trí để giải ax + b = 0.',items:['Vị trí 1','Vị trí 2','Vị trí 3','Vị trí 4'],opts:['nói nghiệm −b/a','hỏi và đặt hệ số a, b','nếu b = 0 thì “vô số nghiệm” nếu không thì “vô nghiệm”','nếu a = 0 thì [3] nếu không thì [4]'],ok:[1,3,2,0]},
      {id:'lt2',type:'single',q:'a = 0, b = 5 thì chương trình nói:',opts:['Nghiệm −5','Vô số nghiệm','Vô nghiệm','Nghiệm 0'],ok:2}],
  key:['Rẽ nhánh <b>lồng nhau</b> xử lí nhiều trường hợp.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Trong chương trình tính ƯCLN của hai số, em dùng những cấu trúc điều khiển nào? Vì sao?',ans:'Tuần tự (nhập, nói kết quả), lặp cho đến khi b = 0 (thay a, b liên tục), có thể có rẽ nhánh khi kiểm tra.'}],
  key:['Một chương trình thường <b>kết hợp cả ba</b> cấu trúc.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Ba cấu trúc điều khiển cơ bản là:',opts:['Tuần tự, rẽ nhánh, lặp','Biến, hằng, biểu thức','Nhập, xử lí, xuất','Cộng, trừ, nhân'],ok:0}],
  key:['<b>Tuần tự – rẽ nhánh – lặp</b>.']}
];
const GHIBAI={so:'Bài 14:',ten:'CẤU TRÚC ĐIỀU KHIỂN',muc:[
 {step:2,h:'Ba cấu trúc',it:['<b>Tuần tự</b>; <b>rẽ nhánh</b> (nếu…thì, nếu…thì…nếu không thì); <b>lặp</b>.'],
  tb:[['Khối Scratch','Dạng lặp'],['lặp lại n','số lần định trước'],['liên tục','vô hạn'],['lặp lại cho đến khi','có điều kiện kết thúc']]},
 {step:3,h:'Vẽ đa giác',it:['Lặp <b>n</b> lần, xoay <b>360 : n</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
/* ==== ĐỘNG CƠ KHỐI LỆNH + BỌ RÙA (m8tt) ==== */
function _m8tt(cfg){
  const PAL={mv:['di chuyển','bước','#4c97ff',100],tn:['xoay ↺','độ','#4c97ff',90],wt:['đợi','giây','#ffab19',1],rp:['lặp lại','lần','#ffab19',4],end:['kết thúc lặp','','#ffab19',null]};
  const e=_el(_shell(cfg.title,cfg.guide,
   `<div class="m8tt"><style>.m8tt .g{display:grid;grid-template-columns:150px 1fr 1.2fr;gap:10px}.m8tt .pal,.m8tt .scr{background:#f8fafc;border:2px dashed #cbd5e1;border-radius:12px;padding:8px;min-height:240px}.m8tt .scr.ov{background:#e0f2fe}.m8tt .bk{color:#fff;border-radius:8px;padding:7px 9px;margin:4px 0;font:700 14px system-ui;cursor:grab;user-select:none;display:flex;align-items:center;gap:4px;box-shadow:0 2px 0 #0002}.m8tt .bk input{width:46px;border:0;border-radius:10px;text-align:center;font:700 13px system-ui}.m8tt .bk .x{margin-left:auto;cursor:pointer;opacity:.7}.m8tt .scr .bk.in{margin-left:18px}.m8tt .bk.hl{outline:3px solid #facc15;transform:scale(1.03)}.m8tt .hat{background:#ffbf00;color:#000;border-radius:14px 14px 8px 8px}.m8tt svg{width:100%;background:#fff;border-radius:12px;border:1px solid #e2e8f0}.m8tt .st{font-weight:700;margin-top:6px;min-height:22px}@media(max-width:700px){.m8tt .g{grid-template-columns:1fr}}</style>
    <div class="g"><div class="pal"><small>Kéo khối ➜ (hoặc bấm)</small>${Object.keys(PAL).filter(k=>!cfg.only||cfg.only.includes(k)).map(k=>`<div class="bk" draggable="true" data-k="${k}" style="background:${PAL[k][2]}">${PAL[k][0]} ${PAL[k][1]?'…':''}</div>`).join('')}</div>
    <div class="scr"><div class="bk hat">🏁 khi bấm vào cờ xanh</div><div class="list"></div></div>
    <div><svg viewBox="0 0 320 260"><g class="ink"></g><text class="bug" font-size="26" text-anchor="middle" dominant-baseline="central">🐞</text></svg>
     <div class="sim-ctl"><button class="btn acc run">▶ Chạy</button><button class="btn ghost stp">⏭ Từng bước</button><button class="btn ghost clr">↺</button></div><div class="st"></div></div></div></div>`));
  let prog=(cfg.start||[]).map(b=>({...b})); const list=e.querySelector('.list'), ink=e.querySelector('.ink'), bug=e.querySelector('.bug'), st=e.querySelector('.st');
  let T, steps=[], pc=0, timer=null;
  function render(){let inR=false; list.innerHTML=prog.map((b,i)=>{const p=PAL[b.k]; if(b.k==='end') inR=false; const h=`<div class="bk ${inR?'in':''}" draggable="true" data-i="${i}" style="background:${p[2]}">${p[0]} ${p[3]!==null?`<input type="number" value="${b.v}" data-i="${i}">`:''} ${p[1]}<span class="x" data-i="${i}">✕</span></div>`; if(b.k==='rp') inR=true; return h;}).join('');
    list.querySelectorAll('input').forEach(n=>{n.onclick=ev=>ev.stopPropagation(); n.oninput=()=>{prog[+n.dataset.i].v=+n.value; reset();};});
    list.querySelectorAll('.x').forEach(x=>x.onclick=()=>{prog.splice(+x.dataset.i,1); FX.play('whoosh'); render(); reset();});
    list.querySelectorAll('.bk').forEach(b=>b.ondragstart=ev=>ev.dataTransfer.setData('text','m'+b.dataset.i));}
  const add=(k,at)=>{const b={k,v:PAL[k][3]}; if(at==null) prog.push(b); else prog.splice(at,0,b); FX.play('tick'); render(); reset();};
  e.querySelectorAll('.pal .bk').forEach(b=>{b.onclick=()=>add(b.dataset.k); b.ondragstart=ev=>ev.dataTransfer.setData('text','p'+b.dataset.k);});
  const scr=e.querySelector('.scr');
  scr.ondragover=ev=>{ev.preventDefault(); scr.classList.add('ov');}; scr.ondragleave=()=>scr.classList.remove('ov');
  scr.ondrop=ev=>{ev.preventDefault(); scr.classList.remove('ov'); const d=ev.dataTransfer.getData('text'); const tg=ev.target.closest('.list .bk'); const at=tg?+tg.dataset.i:null;
    if(d[0]==='p') add(d.slice(1),at); else {const i=+d.slice(1); const [b]=prog.splice(i,1); prog.splice(at==null?prog.length:(at>i?at-1:at),0,b); FX.play('tick'); render(); reset();}};
  function flat(){const out=[]; let i=0; while(i<prog.length){const b=prog[i]; if(b.k==='rp'){let j=i+1; while(j<prog.length&&prog[j].k!=='end') j++; const body=[]; for(let q=i+1;q<j;q++) body.push(q);
      for(let r=0;r<Math.min(b.v,40);r++){out.push(i); body.forEach(q=>out.push(q));} i=j+1;} else {if(b.k!=='end') out.push(i); i++;}} return out;}
  function reset(){clearInterval(timer); timer=null; T={x:cfg.x||110,y:cfg.y||200,a:0,len:0,turn:0}; ink.innerHTML=''; steps=flat(); pc=0; place(); st.textContent=''; list.querySelectorAll('.bk').forEach(x=>x.classList.remove('hl'));}
  function place(){bug.setAttribute('x',T.x); bug.setAttribute('y',T.y); bug.setAttribute('transform',`rotate(${T.a+90} ${T.x} ${T.y})`);}
  function step(){if(pc>=steps.length){done(); return false;} const i=steps[pc++], b=prog[i]; list.querySelectorAll('.bk').forEach(x=>x.classList.toggle('hl',+x.dataset.i===i));
    if(b.k==='mv'){const r=T.a*Math.PI/180, nx=T.x+b.v*Math.cos(r)*(cfg.scale||1), ny=T.y+b.v*Math.sin(r)*(cfg.scale||1); ink.insertAdjacentHTML('beforeend',`<line x1="${T.x}" y1="${T.y}" x2="${nx}" y2="${ny}" stroke="#e11d48" stroke-width="4" stroke-linecap="round"/>`); T.x=nx; T.y=ny; T.len+=b.v; FX.play('tick');}
    if(b.k==='tn'){T.a-=b.v; T.turn+=b.v;} place(); return true;}
  function done(){clearInterval(timer); timer=null; const r=cfg.check?cfg.check(T,prog):''; st.innerHTML=r; if(/🎉/.test(r)) FX.play('win');}
  e.querySelector('.run').onclick=()=>{reset(); FX.play('whoosh'); timer=setInterval(()=>{if(!step()) clearInterval(timer);},cfg.speed||380);};
  e.querySelector('.stp').onclick=()=>{if(timer) return; if(pc>=steps.length) reset(); step();};
  e.querySelector('.clr').onclick=()=>{prog=(cfg.start||[]).map(b=>({...b})); render(); reset();};
  render(); reset(); return e;
}
/* ==== HẾT ĐỘNG CƠ ==== */
SIMS_BAI.veDaGiac=function(){
  return _m8tt({title:'Bọ rùa vẽ đa giác',guide:'Sửa <b>số lần lặp</b> và <b>góc xoay</b> rồi <b>▶ Chạy</b>. Vẽ đủ hình 3, 4, 5, 6 cạnh (Bảng 14.1).',
    start:[{k:'rp',v:4},{k:'mv',v:60},{k:'tn',v:90}],x:130,y:220,
    check:(T,p)=>{const back=Math.hypot(T.x-130,T.y-220)<2; const r=p.find(b=>b.k==='rp'); return back&&T.len?'🎉 Khép kín: hình '+(r?r.v:'?')+' cạnh, mỗi lần xoay '+(T.turn/(r?r.v:1))+'°.':'🔍 Chưa khép kín: góc xoay × số lần lặp phải bằng 360°.';}});
};
SIMS_BAI.doanSo=function(){
  const F=[['Lấy số bí mật ngẫu nhiên 1–100','tt'],['Hỏi, nhận “trả lời”','tt'],['Lặp cho đến khi trả lời = số bí mật','lp'],['Nếu trả lời < số bí mật: “Quá thấp”, nếu không: “Quá cao”','rn'],['Hỏi lại','lp'],['Nói “HOAN HÔ!”','tt']];
  const C={tt:['#dbeafe','Tuần tự'],rn:['#fef3c7','Rẽ nhánh'],lp:['#fce7f3','Lặp']};
  const e=_el(_shell('Trò chơi Đoán số','Gõ số (1–100), bấm <b>Đoán</b>. Sơ đồ bên phải sáng phần đang chạy. Cố đoán trong ≤ 7 lần!',
   `<div class="m8ds2"><style>.m8ds2 .g{display:grid;grid-template-columns:1fr 1fr;gap:14px}.m8ds2 .cat{font-size:60px;text-align:center}.m8ds2 .bub{background:#fff;border:2px solid #94a3b8;border-radius:16px;padding:10px;text-align:center;font:800 20px system-ui;min-height:30px}.m8ds2 .in{display:flex;gap:8px;justify-content:center;margin:10px 0}.m8ds2 .in input{width:90px;font:800 22px system-ui;text-align:center;border-radius:10px;border:2px solid #94a3b8}.m8ds2 .fl div{padding:7px 10px;margin:5px 0;border-radius:8px;font-size:14px;border-left:6px solid #64748b;transition:.2s}.m8ds2 .fl div.on{outline:3px solid #f59e0b;transform:translateX(6px);font-weight:700}.m8ds2 .rg{position:relative;height:18px;background:#e2e8f0;border-radius:9px;margin:8px 0}.m8ds2 .rg i{position:absolute;top:0;bottom:0;background:#22c55e;border-radius:9px;transition:.4s}@media(max-width:620px){.m8ds2 .g{grid-template-columns:1fr}}</style>
    <div class="g"><div><div class="cat">🐱</div><div class="bub">Tớ đã nghĩ một số từ 1 đến 100!</div><div class="in"><input type="number" min="1" max="100"><button class="btn acc go">Đoán</button><button class="btn ghost nw">🔄 Ván mới</button></div><div>Khoảng còn có thể: <b class="kh">1 – 100</b><div class="rg"><i></i></div></div><div>Số lần đoán: <b class="n">0</b></div></div>
    <div class="fl">${F.map((f,i)=>`<div data-i="${i}" style="background:${C[f[1]][0]}"><small>[${C[f[1]][1]}]</small> ${f[0]}</div>`).join('')}</div></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Đoán</th><th>Máy nói</th></tr></table></div>`));
  let sec, lo, hi, n, hist; const inp=e.querySelector('input'), bub=e.querySelector('.bub');
  const hl=a=>e.querySelectorAll('.fl div').forEach(d=>d.classList.toggle('on',a.includes(+d.dataset.i)));
  const rg=()=>{e.querySelector('.kh').textContent=lo+' – '+hi; const i=e.querySelector('.rg i'); i.style.left=(lo-1)+'%'; i.style.width=(hi-lo+1)+'%'; e.querySelector('.n').textContent=n;};
  const nw=()=>{sec=1+Math.floor(Math.random()*100); lo=1; hi=100; n=0; hist=[]; histTable(e,hist,()=>''); bub.textContent='Tớ đã nghĩ một số từ 1 đến 100!'; hl([0,1]); rg(); FX.play('whoosh');};
  e.querySelector('.go').onclick=()=>{const v=Math.round(+inp.value); if(!v||v<1||v>100){bub.textContent='Hãy gõ số từ 1 đến 100!';return;} n++; let s;
    if(v===sec){s='🎉 HOAN HÔ! Đúng là '+sec+' ('+n+' lần)'; hl([2,5]); lo=hi=v; FX.play('win');}
    else {s=v<sec?'⬆️ Quá thấp!':'⬇️ Quá cao!'; if(v<sec) lo=Math.max(lo,v+1); else hi=Math.min(hi,v-1); hl([2,3,4]); FX.play('tick');}
    bub.textContent=s; hist.unshift([v,s]); histTable(e,hist,(x,j)=>j===1?(/HOAN/.test(x)?'g':''):''); rg(); inp.value=''; inp.focus();};
  inp.onkeydown=ev=>{if(ev.key==='Enter') e.querySelector('.go').click();};
  e.querySelector('.nw').onclick=nw; nw(); return e;
};
