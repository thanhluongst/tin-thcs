/* Tin học 9 · Bài 6. Thực hành: Khai thác phần mềm mô phỏng · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: phòng thí nghiệm ảo của lớp 9A (kiểu PhET, GeoGebra).
   Mô phỏng: t9nangluong (Chuỗi chuyển hoá năng lượng), t9mach (Đo dòng điện bằng ampe kế), t9saovang (Ngôi sao tỉ lệ vàng). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Năng lượng biến hoá',hd:'Khởi động · Nhiệm vụ 1 · 9 phút',code:'1',phut:9,
  story:'<p>Như mô phỏng PhET <i>“Năng lượng: các dạng và sự chuyển hoá”</i>: chọn <b>nguồn</b> → <b>thiết bị chuyển hoá</b> → <b>thiết bị tiêu thụ</b>, bấm chạy và xem năng lượng đổi dạng ra sao.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9nangluong'},
      {id:'k1',type:'match',q:'Ghép tình huống với sự chuyển hoá năng lượng.',items:['Người đạp xe','Máy phát điện quay','Tấm pin Mặt Trời','Bóng đèn sáng'],opts:['Quang năng → điện năng','Điện năng → quang năng (và nhiệt)','Hoá năng → cơ năng','Cơ năng → điện năng'],ok:[2,3,0,1]},
      {id:'k2',type:'single',q:'Tấm pin Mặt Trời không hoạt động khi nguồn là:',opts:['Ánh sáng Mặt Trời','Vòi nước chảy','Đèn chiếu mạnh','Trời nắng'],ok:1}],
  key:['Năng lượng không tự mất đi mà <b>chuyển hoá</b> từ dạng này sang dạng khác.']},

 {t:'Đo cường độ dòng điện',hd:'Hình thành kiến thức · Nhiệm vụ 2 · 12 phút',code:'2.1',phut:12,
  story:'<p>Trong “Bộ lắp ráp mạch điện DC”, em đo <b>cường độ dòng điện</b> qua bóng đèn. Thử mắc ampe kế theo 3 cách, thay điện áp và điện trở.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9mach'},
      {id:'h1',type:'single',q:'Dụng cụ đo cường độ dòng điện là:',opts:['Vôn kế','Ampe kế','Nhiệt kế','Lực kế'],ok:1},
      {id:'h2',type:'single',q:'Ampe kế được mắc thế nào với đoạn mạch cần đo?',opts:['Song song','Nối tiếp','Trực tiếp vào hai cực nguồn','Không cần mắc'],ok:1},
      {id:'h3',type:'single',q:'Mắc ampe kế trực tiếp vào hai cực nguồn thì:',opts:['Đo chính xác hơn','Đoản mạch, dòng điện rất lớn, có thể hỏng','Bóng đèn sáng hơn','Không có gì xảy ra'],ok:1}],
  key:['<b>Ampe kế</b> mắc <b>nối tiếp</b>; <b>vôn kế</b> mắc <b>song song</b>. Không mắc ampe kế thẳng vào hai cực nguồn (<b>đoản mạch</b>).']},

 {t:'Ngôi sao tỉ lệ vàng',hd:'Hình thành kiến thức · Nhiệm vụ 3 · 10 phút',code:'2.2',phut:10,
  story:'<p>Trong GeoGebra, đo các đoạn AB, BC, AC, AD trên ngôi sao năm cánh rồi tính tỉ lệ. Kéo thanh để <b>đổi kích thước</b> ngôi sao.</p>',
  qs:[{id:'s3',type:'sim',sim:'t9saovang'},
      {id:'h4',type:'single',q:'Các tỉ lệ AB/BC, AC/AB, AD/AC xấp xỉ:',opts:['1','1,41','1,62','3,14'],ok:2},
      {id:'h5',type:'single',q:'Khi phóng to, thu nhỏ ngôi sao, các tỉ lệ đó:',opts:['Tăng','Giảm','Không đổi','Lúc tăng lúc giảm'],ok:2}],
  key:['Các tỉ lệ bằng nhau ≈ <b>1,618</b> (<b>tỉ lệ vàng</b>), không phụ thuộc kích thước.']},

 {t:'Đo điện áp',hd:'Luyện tập · 6 phút',code:'3',phut:6,
  story:'<p>Đo điện áp giữa hai đầu điện trở bằng phần mềm mô phỏng.</p>',
  qs:[{id:'l1',type:'single',q:'Vôn kế được mắc thế nào?',opts:['Nối tiếp với điện trở','Song song với điện trở (hai đầu vôn kế nối hai đầu điện trở)','Vào một đầu điện trở','Thay cho nguồn'],ok:1},
      {id:'l2',type:'tf',q:'Theo mô phỏng mạch điện (điện trở không đổi):',items:[{t:'Tăng điện áp thì cường độ dòng điện tăng',a:'T'},{t:'Tăng điện trở thì cường độ dòng điện tăng',a:'F'},{t:'I = U / R',a:'T'}]}],
  key:['Cường độ dòng điện <b>tỉ lệ thuận</b> với điện áp, <b>tỉ lệ nghịch</b> với điện trở.']},

 {t:'Phát biểu quy luật',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Từ các lần thử ở mô phỏng mạch điện, em hãy tự phát biểu quy luật.</p>',
  qs:[{id:'v1',type:'text',q:'Quan hệ giữa điện trở R, cường độ dòng điện I và điện áp U là gì?',ans:'I tỉ lệ thuận với U, tỉ lệ nghịch với R: I = U/R (định luật Ohm).'}],
  key:['Phần mềm mô phỏng giúp <b>phát hiện quy luật</b> qua nhiều lần thử.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Phòng thí nghiệm ảo: an toàn, thử lại không giới hạn, đo chính xác.</p>',
  qs:[{id:'t1',type:'single',q:'Lợi ích lớn nhất khi khai thác phần mềm mô phỏng mạch điện:',opts:['Không cần học lí thuyết','Thử nhiều lần an toàn, không hỏng linh kiện','Mạch luôn đúng','Không cần máy tính'],ok:1},
      {id:'t2',type:'text',short:1,q:'Thí nghiệm ảo em thích nhất hôm nay? Vì sao?',ans:'Tự đánh giá.'}],
  key:['Khai thác mô phỏng: <b>thay tham số → quan sát → rút ra quy luật</b>.']}
];

const GHIBAI={so:'Bài 6:',ten:'THỰC HÀNH: KHAI THÁC PHẦN MỀM MÔ PHỎNG',muc:[
 {step:1,h:'Chuyển hoá năng lượng',it:['VD: hoá năng → cơ năng → điện năng → quang năng.']},
 {step:2,h:'Đo điện',it:['<b>Ampe kế</b> mắc <b>nối tiếp</b>, <b>vôn kế</b> mắc <b>song song</b>.','I = U / R.']},
 {step:3,h:'Tỉ lệ vàng',it:['Ngôi sao năm cánh: AB/BC = AC/AB = AD/AC ≈ <b>1,618</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9nangluong=function(){
  const SRC={xe:['🚴 Người đạp xe','co','Hoá năng → Cơ năng'],nuoc:['🚰 Vòi nước chảy','co','Thế năng → Cơ năng'],mt:['☀️ Mặt Trời','quang','Quang năng'],am:['♨️ Ấm nước sôi','co','Nhiệt năng → Cơ năng (hơi nước)']};
  const CV={mp:['⚙️ Máy phát điện','co','Cơ năng → Điện năng'],pin:['🔲 Tấm pin Mặt Trời','quang','Quang năng → Điện năng']};
  const US={den:['💡 Bóng đèn','Điện năng → Quang năng + Nhiệt năng'],quat:['🌀 Quạt điện','Điện năng → Cơ năng'],dun:['🔥 Máy đun nước','Điện năng → Nhiệt năng']};
  const e=_el(_shell('Chuỗi chuyển hoá năng lượng','Chọn <b>nguồn</b>, <b>thiết bị chuyển hoá</b>, <b>thiết bị tiêu thụ</b>, bấm <b>▶ Chạy</b>.',
   `<div class="m-t9nl"><style>.m-t9nl .ch{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;margin:12px 0}
   .m-t9nl .ch div{border-radius:14px;padding:12px;min-width:150px;text-align:center;background:#f1f5f9;font-weight:700;transition:.3s}.m-t9nl .ch div small{display:block;font-weight:500;color:#475569}
   .m-t9nl .ch .on{background:#fef3c7;box-shadow:0 0 0 3px #f59e0b}.m-t9nl .ch .x{background:#fee2e2}.m-t9nl .ar{font-size:26px}</style>
   <div class="sim-ctl"><div><b>Nguồn</b><br>${_seg('s',Object.entries(SRC).map(([k,v])=>[k,v[0]]),'xe')}</div><div><b>Chuyển hoá</b><br>${_seg('c',Object.entries(CV).map(([k,v])=>[k,v[0]]),'mp')}</div>
   <div><b>Tiêu thụ</b><br>${_seg('u',Object.entries(US).map(([k,v])=>[k,v[0]]),'den')}</div><button class="btn acc run">▶ Chạy</button></div>
   <div class="ch"><div></div><span class="ar">➜</span><div></div><span class="ar">➜</span><div></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Nguồn</th><th>Chuyển hoá</th><th>Tiêu thụ</th><th>Kết quả</th></tr></table></div>`));
  const s={s:'xe',c:'mp',u:'den'},hist=[],box=e.querySelectorAll('.ch div');_wireSeg(e,(n,v)=>s[n]=v);
  e.querySelector('.run').onclick=()=>{const a=SRC[s.s],b=CV[s.c],c=US[s.u],ok=a[1]===b[1];box.forEach(x=>x.className='');FX.play('whoosh');
    box[0].innerHTML=a[0]+'<small>'+a[2]+'</small>';box[1].innerHTML=b[0]+'<small>'+(ok?b[2]:'Không nhận được năng lượng phù hợp')+'</small>';box[2].innerHTML=c[0]+'<small>'+(ok?c[1]:'Không hoạt động')+'</small>';
    [0,1,2].forEach(i=>setTimeout(()=>{box[i].classList.add(ok||i===0?'on':'x');if(i===2)FX.play(ok?'ding':'tick');},i*400));
    hist.unshift([a[0],b[0],c[0],ok?'Hoạt động':'Không chạy']);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===3?(v==='Hoạt động'?'g':'r'):'');};
  return e;
};
SIMS_BAI.t9mach=function(){
  const e=_el(_shell('Đo dòng điện bằng ampe kế','Chọn <b>cách mắc ampe kế</b>, kéo <b>điện áp</b> và <b>điện trở bóng đèn</b>, bấm <b>⚡ Đóng công tắc</b>.',
   `<div class="m-t9mc"><style>.m-t9mc .w{display:flex;flex-wrap:wrap;gap:16px;align-items:center}.m-t9mc svg{background:#f8fafc;border:2px solid #c7d6ea;border-radius:14px}
   .m-t9mc .rd{font:800 20px system-ui;margin:6px 0}.m-t9mc .warn{color:#b91c1c;font-weight:800}.m-t9mc input{width:200px}</style>
   <div class="sim-ctl"><div><b>Cách mắc ampe kế</b><br>${_seg('m',[['nt','Nối tiếp'],['ss','Song song với đèn'],['tt','Thẳng vào 2 cực nguồn']],'nt')}</div>
   <div><b>Điện áp U = <span class="U">6</span> V</b><br><input class="iu" type="range" min="1.5" max="12" step="1.5" value="6"></div>
   <div><b>Điện trở đèn R = <span class="R">12</span> Ω</b><br><input class="ir" type="range" min="3" max="30" step="3" value="12"></div><button class="btn acc run">⚡ Đóng công tắc</button></div>
   <div class="w"><svg viewBox="0 0 320 200" width="320" height="200">
    <rect x="30" y="30" width="260" height="140" fill="none" stroke="#334155" stroke-width="4" rx="6"/>
    <g transform="translate(30,100)"><rect x="-12" y="-22" width="24" height="44" fill="#f8fafc"/><line x1="-12" y1="-8" x2="12" y2="-8" stroke="#334155" stroke-width="5"/><line x1="-7" y1="8" x2="7" y2="8" stroke="#334155" stroke-width="5"/><text x="18" y="5" font-size="13">Nguồn</text></g>
    <g class="bulb" transform="translate(220,30)"><circle r="18" fill="#fff" stroke="#334155" stroke-width="3"/><path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#334155" stroke-width="2"/></g>
    <g class="am" transform="translate(120,30)"><circle r="17" fill="#fff" stroke="#1d4e89" stroke-width="3"/><text x="-6" y="6" font-size="16" font-weight="800" fill="#1d4e89">A</text></g>
    <path class="par" d="M200 30 V-2" stroke="none"/><text class="lb" x="150" y="195" font-size="13" text-anchor="middle" fill="#475569"></text></svg>
   <div><div class="rd">Ampe kế: — A</div><div class="br">Đèn: tắt</div><div class="warn"></div></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Cách mắc</th><th>U (V)</th><th>R (Ω)</th><th>Ampe kế</th></tr></table></div>`));
  let m='nt',U=6,R=12;const hist=[],am=e.querySelector('.am'),bulb=e.querySelector('.bulb circle');
  const place=()=>{const p={nt:[120,30],ss:[220,75],tt:[60,100]}[m];am.setAttribute('transform','translate('+p[0]+','+p[1]+')');e.querySelector('.lb').textContent={nt:'Ampe kế nằm trên dây, nối tiếp với đèn',ss:'Ampe kế mắc song song hai đầu đèn',tt:'Ampe kế nối thẳng hai cực nguồn'}[m];};
  _wireSeg(e,(n,v)=>{m=v;place();});e.querySelector('.iu').oninput=ev=>{U=+ev.target.value;e.querySelector('.U').textContent=U;};e.querySelector('.ir').oninput=ev=>{R=+ev.target.value;e.querySelector('.R').textContent=R;};
  e.querySelector('.run').onclick=()=>{let I,rd,br,w='';
    if(m==='nt'){I=U/R;rd=I.toFixed(2)+' A';br=I;}else if(m==='ss'){I=U/0.1;rd='Kim vọt quá thang đo!';br=0;w='⚠️ Ampe kế (điện trở rất nhỏ) làm dòng đi tắt qua nó: đèn tắt, ampe kế có thể hỏng.';}
    else{I=U/0.05;rd='CHÁY! 💥';br=0;w='🔥 Đoản mạch! Dòng điện rất lớn, hỏng ampe kế và nguồn.';}
    const lv=Math.min(1,br/1.5);bulb.setAttribute('fill',br?`rgba(250,204,21,${0.25+lv*0.75})`:'#fff');bulb.style.filter=br?`drop-shadow(0 0 ${6+lv*18}px #facc15)`:'none';
    e.querySelector('.rd').textContent='Ampe kế: '+rd;e.querySelector('.br').textContent='Đèn: '+(br?(lv>0.6?'sáng mạnh':lv>0.25?'sáng vừa':'sáng yếu'):'tắt');e.querySelector('.warn').textContent=w;
    FX.play(w?'tick':'ding');hist.unshift([{nt:'Nối tiếp',ss:'Song song',tt:'Thẳng 2 cực'}[m],U,R,rd]);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===3?(/A$/.test(v)?'g':'r'):'');};
  place();return e;
};
SIMS_BAI.t9saovang=function(){
  const e=_el(_shell('Ngôi sao tỉ lệ vàng','Kéo thanh để <b>đổi kích thước</b> ngôi sao. Bấm <b>📏 Đo</b> để ghi độ dài và tỉ lệ.',
   `<div class="m-t9sv"><style>.m-t9sv .w{display:flex;flex-wrap:wrap;gap:16px;align-items:center}.m-t9sv svg{background:#fff;border:2px solid #c7d6ea;border-radius:14px}.m-t9sv input{width:240px}
   .m-t9sv .r{font-weight:700;line-height:1.8}</style>
   <div class="sim-ctl"><div><b>Bán kính: <span class="rr">3.0</span> cm</b><br><input type="range" min="1.5" max="5" step="0.1" value="3"></div><button class="btn acc do">📏 Đo</button></div>
   <div class="w"><svg viewBox="-120 -120 240 240" width="260" height="260"><polygon class="st" fill="#fef3c7" stroke="#b45309" stroke-width="2"/><line class="ln" stroke="#dc2626" stroke-width="4"/><g class="pt"></g></svg>
   <div class="r">—</div></div><table class="tbl sim-hist"><tr><th>Lần</th><th>AB</th><th>BC</th><th>AC</th><th>AD</th><th>AB/BC</th><th>AD/AC</th></tr></table></div>`));
  let R=3;const hist=[],P=(1+Math.sqrt(5))/2;
  const geo=()=>{const k=R*20,V=[0,1,2,3,4].map(i=>[k*Math.sin(i*2*Math.PI/5),-k*Math.cos(i*2*Math.PI/5)]),ord=[0,2,4,1,3];
    e.querySelector('.st').setAttribute('points',ord.map(i=>V[i].join(',')).join(' '));const A=V[0],D=V[2];const AD=Math.hypot(D[0]-A[0],D[1]-A[1])/20,AC=AD/P,AB=AC/P,BC=AB/P;
    const pt=t=>[A[0]+(D[0]-A[0])*t,A[1]+(D[1]-A[1])*t],B=pt(AB/AD),C=pt(AC/AD);const l=e.querySelector('.ln');l.setAttribute('x1',A[0]);l.setAttribute('y1',A[1]);l.setAttribute('x2',D[0]);l.setAttribute('y2',D[1]);
    e.querySelector('.pt').innerHTML=[['A',A],['B',B],['C',C],['D',D]].map(([n,p])=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#1d4e89"/><text x="${p[0]+6}" y="${p[1]-6}" font-size="14" font-weight="800" fill="#1d4e89">${n}</text>`).join('');
    return {AB,BC,AC,AD};};
  const f=x=>x.toFixed(2).replace('.',',');
  e.querySelector('input').oninput=ev=>{R=+ev.target.value;e.querySelector('.rr').textContent=R.toFixed(1);geo();};
  e.querySelector('.do').onclick=()=>{const g=geo();e.querySelector('.r').innerHTML=`AB = ${f(g.AB)} cm · BC = ${f(g.BC)} cm<br>AC = ${f(g.AC)} cm · AD = ${f(g.AD)} cm<br>AB/BC ≈ ${f(g.AB/g.BC)} · AC/AB ≈ ${f(g.AC/g.AB)} · AD/AC ≈ ${f(g.AD/g.AC)}`;
    hist.unshift([f(g.AB),f(g.BC),f(g.AC),f(g.AD),f(g.AB/g.BC),f(g.AD/g.AC)]);if(hist.length>5)hist.pop();histTable(e,hist,(v,j)=>j>=4?'g':'');FX.play('ding');};
  geo();return e;
};
