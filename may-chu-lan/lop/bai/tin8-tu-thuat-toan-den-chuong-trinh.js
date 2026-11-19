/* Tin học 8 · Bài 12. Từ thuật toán đến chương trình · 1 tiết.
   Tình huống: Khoa điều khiển nhân vật Bọ rùa đi theo hình tam giác đều.
   Mô phỏng: "veHinh" (kéo thả khối lệnh kiểu Scratch, chạy từng bước với Bọ rùa),
             "xeDa" (xe chạy đến khi cách hòn đá < 120 bước – sơ đồ khối sáng từng bước). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bọ rùa đi tam giác',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>Khoa</b> muốn Bọ rùa 🐞 đi theo đường <b>tam giác đều</b> cạnh 100 bước. Em hãy <b>kéo các khối lệnh</b> vào vùng chương trình rồi bấm <b>▶ Chạy</b> hoặc <b>⏭ Từng bước</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'veHinh'},
      {id:'k1',type:'single',q:'Đi hết một cạnh tam giác đều, Bọ rùa phải xoay một góc bao nhiêu độ?',opts:['60°','90°','120°','180°'],ok:2},
      {id:'k2',type:'single',q:'Chương trình ngắn gọn nhất để vẽ tam giác đều là:',opts:['di chuyển 100, xoay 120 (1 lần)','lặp lại 3: di chuyển 100, xoay 120','lặp lại 4: di chuyển 100, xoay 90','lặp lại 3: di chuyển 120, xoay 100'],ok:1}],
  key:['Tam giác đều: <b>lặp lại 3</b> lần {di chuyển 100; xoay <b>120°</b>}. Góc xoay = 360° : số cạnh.']},
 {t:'Từ sơ đồ khối đến chương trình',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Thuật toán được mô tả bằng <b>sơ đồ khối</b>. Mỗi khối trong sơ đồ được “dịch” thành một (hoặc vài) <b>khối lệnh Scratch</b>. Máy tính chỉ hiểu và thực hiện được <b>chương trình</b>.</p>',
  qs:[{id:'sd',type:'match',q:'Ghép khối trong sơ đồ với lệnh Scratch.',items:['Bắt đầu','Lặp 3 lần','Di chuyển 100 bước','Quay 120°'],opts:['xoay ↺ 120 độ','khi bấm vào lá cờ xanh','di chuyển 100 bước','lặp lại 3'],ok:[1,3,2,0]},
      {id:'ct',type:'single',q:'Chương trình là:',opts:['Một dãy hình vẽ','Mô tả thuật toán bằng ngôn ngữ lập trình để máy tính hiểu và thực hiện','Sơ đồ khối','Một tệp ảnh'],ok:1},
      {id:'tf',type:'tf',q:'Đúng hay sai?',items:[{t:'Có thể có nhiều chương trình khác nhau thực hiện cùng một thuật toán',a:'T'},{t:'Máy tính hiểu trực tiếp sơ đồ khối vẽ trên giấy',a:'F'},{t:'Thêm lệnh “đợi 1 giây” sau “di chuyển” giúp thấy rõ nhân vật dừng ở mỗi đỉnh',a:'T'}]}],
  key:['<b>Chương trình</b> = thuật toán viết bằng <b>ngôn ngữ lập trình</b>; máy tính hiểu và thực hiện được.']},
 {t:'Xe tự dừng trước hòn đá',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Xe 🚗 chạy mỗi lần 10 bước, <b>dừng lại khi cách hòn đá nhỏ hơn 120 bước</b>. Chạy từng bước, xem khối nào trong sơ đồ đang sáng.</p>',
  qs:[{id:'s2',type:'sim',sim:'xeDa'},
      {id:'x1',type:'single',q:'Khối kiểm tra điều kiện trong sơ đồ (hình thoi) là:',opts:['Khoảng cách đến hòn đá < 120?','Di chuyển 10 bước','Bắt đầu','Kết thúc'],ok:0},
      {id:'x2',type:'single',q:'Trong Scratch, dùng khối nào cho thuật toán này?',opts:['lặp lại 10','liên tục','lặp lại cho đến khi ⟨khoảng cách tới Đá < 120⟩','nếu … thì'],ok:2}],
  key:['Lặp <b>đến khi điều kiện đúng</b> thì dừng: khối <b>lặp lại cho đến khi</b>.']},
 {t:'Luyện tập: hình vuông',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Quay lại mô phỏng Bọ rùa, sửa chương trình để vẽ <b>hình vuông</b> và <b>lục giác đều</b>.</p>',
  qs:[{id:'lt1',type:'single',q:'Sơ đồ khối vẽ hình vuông khác tam giác đều ở:',opts:['Số lần lặp 4 và góc xoay 90°','Chỉ khác màu','Không khác gì','Độ dài cạnh'],ok:0},
      {id:'lt2',type:'match',q:'Ghép hình với số lần lặp và góc xoay.',items:['Tam giác đều','Hình vuông','Lục giác đều'],opts:['lặp 6, xoay 60°','lặp 3, xoay 120°','lặp 4, xoay 90°'],ok:[1,2,0]}],
  key:['Đa giác đều n cạnh: <b>lặp n lần</b>, xoay <b>360 : n</b> độ.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Muốn Bọ rùa vẽ được hình bất kì (vuông, lục giác…), những con số nào trong chương trình phải thay đổi?',ans:'Số lần lặp (số cạnh n) và góc xoay (360 : n); có thể đổi độ dài cạnh.'}],
  key:['Số lần lặp và góc xoay <b>phụ thuộc số cạnh</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Thứ tự đúng:',opts:['Bài toán → thuật toán → chương trình → máy tính thực hiện','Chương trình → thuật toán → bài toán','Máy tính → chương trình → thuật toán','Thuật toán → bài toán → chương trình'],ok:0}],
  key:['<b>Bài toán → Thuật toán → Chương trình</b>.']}
];
const GHIBAI={so:'Bài 12:',ten:'TỪ THUẬT TOÁN ĐẾN CHƯƠNG TRÌNH',muc:[
 {step:3,h:'Chương trình',it:['Mô tả thuật toán bằng <b>ngôn ngữ lập trình</b> để máy tính thực hiện.']},
 {step:2,h:'Vẽ đa giác đều',it:['Lặp <b>n</b> lần {di chuyển a; xoay <b>360 : n</b>}.']},
 {step:4,h:'Quy trình',it:[],flow:['Bài toán','Thuật toán','Chương trình','Máy tính thực hiện']}]};

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
SIMS_BAI.veHinh=function(){
  return _m8tt({title:'Bọ rùa vẽ hình',guide:'Kéo khối <b>di chuyển</b>, <b>xoay</b>, <b>lặp lại</b> vào chương trình, sửa số, bấm <b>▶ Chạy</b>. Thử thách: vẽ <b>tam giác đều</b> cạnh 100, rồi <b>hình vuông</b>.',
    start:[{k:'mv',v:100},{k:'tn',v:90}],x:110,y:200,
    check:(T,p)=>{const back=Math.hypot(T.x-110,T.y-200)<2; if(!back||T.len===0) return '🔍 Đường đi chưa khép kín. Thử thêm khối <b>lặp lại</b>!';
      const nC=Math.round(T.len/(p.find(b=>b.k==='mv')||{v:1}).v); return '🎉 Khép kín! Hình '+nC+' cạnh, tổng góc xoay '+T.turn+'°.'+(nC===3?' Tam giác đều!':nC===4?' Hình vuông!':'');}});
};
SIMS_BAI.xeDa=function(){
  const F=[['Bắt đầu','ov'],['Khoảng cách tới đá < 120?','dm'],['Di chuyển 10 bước','rc'],['Kết thúc','ov']];
  const e=_el(_shell('Xe tự dừng trước hòn đá','Đặt vị trí hòn đá, bấm <b>⏭ Từng bước</b> hoặc <b>▶ Chạy</b>. Khối đang thực hiện trong sơ đồ sẽ sáng lên.',
   `<div class="m8xd"><style>.m8xd .g{display:grid;grid-template-columns:200px 1fr;gap:12px;align-items:start}.m8xd .fl div{margin:0 auto 18px;text-align:center;padding:8px;font-weight:700;border:2px solid #64748b;background:#fff;position:relative;width:170px}.m8xd .fl div:not(:last-child):after{content:'↓';position:absolute;left:50%;bottom:-20px;font-size:16px}.m8xd .ov{border-radius:999px}.m8xd .dm{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);padding:22px 8px!important;background:#fef3c7!important;font-size:12px}.m8xd .on{background:#fde047!important;box-shadow:0 0 0 4px #facc15}.m8xd svg{width:100%;background:linear-gradient(#bae6fd 60%,#86efac 60%);border-radius:12px}.m8xd input{width:100%}</style>
    <div class="g"><div class="fl">${F.map((f,i)=>`<div class="${f[1]}" data-i="${i}">${f[0]}</div>`).join('')}</div>
    <div><svg viewBox="0 0 480 160"><line x1="0" y1="130" x2="480" y2="130" stroke="#475569" stroke-width="3"/><text class="car" y="128" font-size="40">🚗</text><text class="rock" y="130" font-size="40">🪨</text><line class="gap" y1="70" y2="70" stroke="#dc2626" stroke-width="2" stroke-dasharray="4"/><text class="gt" y="62" font-size="14" font-weight="700" fill="#b91c1c" text-anchor="middle"></text></svg>
     Vị trí hòn đá: <input type="range" min="200" max="440" value="400">
     <div class="sim-ctl"><button class="btn acc run">▶ Chạy</button><button class="btn ghost stp">⏭ Từng bước</button><button class="btn ghost rs">↺</button></div><div class="ms" style="font-weight:700"></div></div></div></div>`));
  let x=10, rk=400, ph=0, tm=null, n=0; const car=e.querySelector('.car'), rock=e.querySelector('.rock');
  const hl=i=>e.querySelectorAll('.fl div').forEach(d=>d.classList.toggle('on',+d.dataset.i===i));
  function draw(){car.setAttribute('x',x); rock.setAttribute('x',rk); const g=e.querySelector('.gap'), d=rk-(x+40); g.setAttribute('x1',x+40); g.setAttribute('x2',rk); const t=e.querySelector('.gt'); t.setAttribute('x',(x+40+rk)/2); t.textContent='cách '+Math.max(0,d)+' bước';}
  function step(){const d=rk-(x+40), ms=e.querySelector('.ms');
    if(ph===0){hl(0); ph=1; ms.textContent='Bắt đầu chương trình.';}
    else if(ph===1){hl(1); if(d<120){ph=3; ms.textContent='Điều kiện ĐÚNG ('+d+' < 120) → thoát vòng lặp.'; FX.play('ding');} else {ph=2; ms.textContent='Điều kiện SAI ('+d+' ≥ 120) → tiếp tục lặp.';}}
    else if(ph===2){hl(2); x+=10; n++; draw(); ph=1; FX.play('tick'); ms.textContent='Di chuyển 10 bước (lần '+n+').';}
    else if(ph===3){hl(3); ph=4; ms.textContent='🎉 Xe dừng sau '+n+' lần di chuyển, cách đá '+d+' bước.'; FX.play('win'); return false;}
    else return false; return true;}
  const rs=()=>{clearInterval(tm); tm=null; x=10; ph=0; n=0; hl(-1); e.querySelector('.ms').textContent=''; draw();};
  e.querySelector('input').oninput=ev=>{rk=+ev.target.value; rs();};
  e.querySelector('.run').onclick=()=>{rs(); tm=setInterval(()=>{if(!step()) clearInterval(tm);},160);};
  e.querySelector('.stp').onclick=()=>{if(!tm&&ph<4) step();}; e.querySelector('.rs').onclick=rs; rs(); return e;
};
