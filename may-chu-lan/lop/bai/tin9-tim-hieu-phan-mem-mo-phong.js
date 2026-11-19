/* Tin học 9 · Bài 5. Tìm hiểu phần mềm mô phỏng · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: Minh tập pha màu vẽ tranh mà không muốn tốn màu.
   Mô phỏng: t9phamau (Pha màu CMYK), t9conlac (Con lắc: thay độ dài, nơi thí nghiệm). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Minh tập pha màu',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>Minh</b> tập pha màu nước, pha hỏng mấy lần, hỗn hợp xỉn đục phải đổ đi. Có cách nào thử thoải mái mà không tốn màu?</p><p>Dùng <b>phần mềm pha màu</b> bên dưới: tăng giảm lượng từng màu, xem ngay màu kết quả.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9phamau'},
      {id:'k1',type:'match',q:'Pha hai màu cơ bản CMYK với lượng bằng nhau được màu gì?',items:['Xanh lơ + Vàng','Xanh lơ + Hồng sẫm','Hồng sẫm + Vàng'],opts:['Đỏ','Lục','Lam'],ok:[1,2,0]},
      {id:'k2',type:'single',q:'Phần mềm giúp Minh điều gì?',opts:['Vẽ tranh thay Minh','Thử pha màu nhiều lần, thấy ngay kết quả, không tốn màu','Mua màu rẻ hơn','In tranh ra giấy'],ok:1}],
  key:['<b>Phần mềm mô phỏng</b> cho thử nhiều lần, thấy ngay kết quả, <b>tiết kiệm</b> vật liệu, thời gian.']},

 {t:'Phần mềm mô phỏng là gì?',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Phần mềm mô phỏng <b>tái hiện</b> hoạt động của sự vật, hiện tượng thật trên máy tính. Thí nghiệm “con lắc” dưới đây: thay độ dài dây, đổi nơi làm thí nghiệm (cả lên Mặt Trăng!).</p>',
  qs:[{id:'s2',type:'sim',sim:'t9conlac'},
      {id:'h1',type:'single',q:'Quan sát: dây con lắc càng <b>dài</b> thì một dao động:',opts:['Càng nhanh (thời gian ngắn)','Càng chậm (thời gian dài)','Không đổi','Con lắc đứng yên'],ok:1},
      {id:'h2',type:'single',q:'Vì sao làm thí nghiệm con lắc trên Mặt Trăng chỉ thực hiện được bằng mô phỏng?',opts:['Vì trên Mặt Trăng không có dây','Vì không thể (hoặc quá tốn kém) đến Mặt Trăng làm thí nghiệm thật','Vì Mặt Trăng quá sáng','Vì máy tính ở Trái Đất'],ok:1},
      {id:'h3',type:'match',q:'Ghép phần mềm với đối tượng mô phỏng.',items:['PhET – Circuit Construction Kit','GeoGebra','Stellarium','Phần mềm tập lái xe'],opts:['Bầu trời sao','Mạch điện','Lái ô tô trên đường','Hình học, đồ thị'],ok:[1,3,0,2]}],
  key:['Phần mềm mô phỏng <b>tái hiện</b> sự vật, hiện tượng thật; dùng trong <b>học tập, nghiên cứu, giao thông</b>…']},

 {t:'Lợi ích và lưu ý',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>So sánh pha màu thật với pha màu bằng phần mềm, thí nghiệm thật với thí nghiệm ảo.</p>',
  qs:[{id:'h4',type:'tf',q:'Lợi ích của phần mềm mô phỏng?',items:[{t:'Tiết kiệm chi phí, vật liệu, thời gian',a:'T'},{t:'An toàn với thí nghiệm nguy hiểm',a:'T'},{t:'Quan sát được hiện tượng khó thấy, rất nhanh hoặc rất chậm',a:'T'},{t:'Thay thế hoàn toàn mọi thực hành thật',a:'F'}]},
      {id:'h5',type:'single',q:'Khi dùng phần mềm mô phỏng em cần lưu ý:',opts:['Dùng bất kì phần mềm nào','Chọn phần mềm chất lượng, không vi phạm bản quyền','Chỉ dùng phần mềm trả phí','Tin tuyệt đối kết quả'],ok:1}],
  key:['Lợi ích: <b>tiết kiệm, an toàn, trực quan</b>, thử được nhiều tình huống.','Lưu ý: chọn phần mềm <b>chất lượng</b>, <b>đúng bản quyền</b>.']},

 {t:'Tìm phần mềm mô phỏng',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Tìm một phần mềm mô phỏng hỗ trợ học tập (gợi ý: phet.colorado.edu).</p>',
  qs:[{id:'l1',type:'sort',q:'Đâu là phần mềm (trang web) mô phỏng?',cols:{c0:'Mô phỏng',c1:'Không phải'},items:[{t:'PhET',a:'c0'},{t:'Stellarium',a:'c0'},{t:'Microsoft Word',a:'c1'},{t:'Phần mềm luyện lái máy bay',a:'c0'},{t:'Zalo',a:'c1'}]},
      {id:'l2',type:'text',q:'Kể tên 1 phần mềm mô phỏng em biết, nó mô phỏng gì và giúp em điều gì?',ans:'Ví dụ: PhET mạch điện – lắp mạch ảo, đo dòng điện, an toàn, không tốn linh kiện.'}],
  key:['Mỗi phần mềm mô phỏng một <b>đối tượng</b> cụ thể.']},

 {t:'Thử thách pha màu',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Quay lại phần mềm pha màu ở phần Khởi động: tìm cách pha ra màu <b>đen</b> và màu <b>cam</b>.</p>',
  qs:[{id:'v1',type:'single',q:'Pha cả ba màu C, M, Y ở mức tối đa, em được:',opts:['Trắng','Gần đen','Đỏ','Lục'],ok:1},
      {id:'v2',type:'single',q:'Muốn được màu cam, em pha:',opts:['Nhiều Vàng + ít Hồng sẫm','Xanh lơ + Vàng','Chỉ Xanh lơ','Hồng sẫm + Xanh lơ'],ok:0}],
  key:['Mô phỏng giúp <b>khám phá quy luật</b> nhanh bằng cách thay tham số.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Thí nghiệm ảo không thay hết thí nghiệm thật, nhưng là “phòng thí nghiệm bỏ túi” rất mạnh.</p>',
  qs:[{id:'t1',type:'single',q:'Phần mềm mô phỏng là phần mềm:',opts:['Soạn thảo văn bản','Tái hiện hoạt động của sự vật, hiện tượng thật trên máy tính','Chỉ để chơi game','Diệt virus'],ok:1},
      {id:'t2',type:'text',short:1,q:'Em muốn dùng phần mềm mô phỏng nào cho môn học khác?',ans:'Tự đánh giá.'}],
  key:['<b>Phần mềm mô phỏng</b>: tái hiện thực tế, tiết kiệm, an toàn, giúp khám phá.']}
];

const GHIBAI={so:'Bài 5:',ten:'TÌM HIỂU PHẦN MỀM MÔ PHỎNG',muc:[
 {step:2,h:'Phần mềm mô phỏng',it:['<b>Tái hiện</b> hoạt động của sự vật, hiện tượng thật trên máy tính.','VD: PhET (mạch điện), GeoGebra (hình học), Stellarium (bầu trời).']},
 {step:3,h:'Lợi ích – Lưu ý',it:['<b>Tiết kiệm</b>, <b>an toàn</b>, trực quan, thử nhiều lần.','Chọn phần mềm <b>chất lượng</b>, <b>đúng bản quyền</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9phamau=function(){
  const e=_el(_shell('Pha màu CMYK','Kéo thanh để thêm <b>Xanh lơ (C)</b>, <b>Hồng sẫm (M)</b>, <b>Vàng (Y)</b>. Bấm <b>💾 Lưu lần pha</b> để ghi lại.',
   `<div class="m-t9pm"><style>.m-t9pm{display:flex;flex-wrap:wrap;gap:18px;align-items:center}.m-t9pm .sl{flex:1;min-width:240px}
   .m-t9pm .sl label{display:flex;align-items:center;gap:8px;font-weight:700;margin:8px 0}.m-t9pm .sl input{flex:1}.m-t9pm .sl i{width:22px;height:22px;border-radius:50%;display:inline-block}
   .m-t9pm .cup{width:170px;height:170px;border-radius:0 0 80px 80px;border:6px solid #475569;border-top:0;position:relative;overflow:hidden;background:#fff}
   .m-t9pm .cup div{position:absolute;inset:0;transition:background .3s}.m-t9pm .nm{font:800 18px system-ui;text-align:center;margin-top:6px}
   .m-t9pm .sv{font-size:14px;color:#166534;font-weight:700}</style>
   <div class="sl">${[['c','Xanh lơ (C)','#00b7eb'],['m','Hồng sẫm (M)','#e5007e'],['y','Vàng (Y)','#ffe600']].map(x=>`<label><i style="background:${x[2]}"></i>${x[1]}<input type="range" min="0" max="100" value="0" data-k="${x[0]}"><span>0%</span></label>`).join('')}
   <button class="btn acc sv2">💾 Lưu lần pha</button> <span class="sv">Đã thử 0 lần · tiết kiệm 0 ml màu thật</span></div>
   <div><div class="cup"><div></div></div><div class="nm">Nước trong</div></div>
   <table class="tbl sim-hist" style="flex-basis:100%"><tr><th>Lần</th><th>C</th><th>M</th><th>Y</th><th>Kết quả</th></tr></table></div>`));
  const v={c:0,m:0,y:0},hist=[];let n=0;
  const name=()=>{const {c,m,y}=v,hi=x=>x>=60,lo=x=>x<25;
    if(c+m+y===0)return'Nước trong';if(hi(c)&&hi(m)&&hi(y))return'Gần đen';if(hi(c)&&hi(y)&&lo(m))return'Lục';if(hi(c)&&hi(m)&&lo(y))return'Lam';if(hi(m)&&hi(y)&&lo(c))return'Đỏ';
    if(hi(y)&&m>=25&&m<60&&lo(c))return'Cam';if(c>=m&&c>=y)return'Ngả xanh lơ';if(m>=y)return'Ngả hồng';return'Ngả vàng';};
  const up=()=>{const r=Math.round(255*(1-v.c/100)),g=Math.round(255*(1-v.m/100)),b=Math.round(255*(1-v.y/100));e.querySelector('.cup div').style.background=`rgb(${r},${g},${b})`;e.querySelector('.nm').textContent=name();};
  e.querySelectorAll('input').forEach(i=>i.oninput=()=>{v[i.dataset.k]=+i.value;i.nextElementSibling.textContent=i.value+'%';up();});
  e.querySelector('.sv2').onclick=()=>{n++;hist.unshift([v.c+'%',v.m+'%',v.y+'%',name()]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');
    e.querySelector('.sv').textContent='Đã thử '+n+' lần · tiết kiệm '+n*20+' ml màu thật';FX.play('ding');};
  up();return e;
};
SIMS_BAI.t9conlac=function(){
  const G={td:[9.8,'🌍 Trái Đất'],mt:[1.6,'🌙 Mặt Trăng'],sh:[3.7,'🔴 Sao Hoả']};
  const e=_el(_shell('Con lắc đơn','Chọn <b>độ dài dây</b> và <b>nơi thí nghiệm</b>, bấm <b>▶ Thả</b>. Đọc thời gian một dao động.',
   `<div class="m-t9cl"><style>.m-t9cl .w{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.m-t9cl svg{background:linear-gradient(#e0f2fe,#fff);border-radius:14px;border:2px solid #c7d6ea}
   .m-t9cl .T{font:800 22px system-ui;color:#1d4e89;margin:8px 0}.m-t9cl input{width:220px}</style>
   <div class="sim-ctl"><div><b>Độ dài dây: <span class="L">1.0</span> m</b><br><input type="range" min="0.2" max="2" step="0.1" value="1"></div>
   <div><b>Nơi thí nghiệm</b> ${_seg('g',Object.entries(G).map(([k,x])=>[k,x[1]]),'td')}</div><button class="btn acc run">▶ Thả</button></div>
   <div class="w"><svg viewBox="0 0 300 240" width="300" height="240"><rect x="90" y="6" width="120" height="8" rx="3" fill="#475569"/><line class="d" x1="150" y1="14" x2="150" y2="150" stroke="#334155" stroke-width="3"/><circle class="b" cx="150" cy="150" r="16" fill="#e2932b" stroke="#9a3412" stroke-width="3"/></svg>
   <div><div class="T">T = — giây</div><div class="ct">Số dao động: 0</div><table class="tbl sim-hist"><tr><th>Lần</th><th>Dây</th><th>Nơi</th><th>T (giây)</th></tr></table></div></div></div>`));
  let L=1,g='td',raf=0,t0=0,cnt=0;const hist=[],sl=e.querySelector('input'),d=e.querySelector('.d'),b=e.querySelector('.b');
  _wireSeg(e,(n,x)=>{g=x;});sl.oninput=()=>{L=+sl.value;e.querySelector('.L').textContent=L.toFixed(1);pos(0.5);};
  const pos=a=>{const len=40+L*85,x=150+len*Math.sin(a),y=14+len*Math.cos(a);d.setAttribute('x2',x);d.setAttribute('y2',y);b.setAttribute('cx',x);b.setAttribute('cy',y);};
  e.querySelector('.run').onclick=()=>{cancelAnimationFrame(raf);const T=2*Math.PI*Math.sqrt(L/G[g][0]);t0=performance.now();cnt=0;FX.play('whoosh');
    e.querySelector('.T').textContent='T ≈ '+T.toFixed(2)+' giây';hist.unshift([L.toFixed(1)+' m',G[g][1],T.toFixed(2)]);if(hist.length>6)hist.pop();histTable(e,hist,()=>'');
    const loop=now=>{const t=(now-t0)/1000,c=Math.floor(t/T);if(c!==cnt){cnt=c;e.querySelector('.ct').textContent='Số dao động: '+cnt;FX.play('tick');}pos(0.5*Math.cos(2*Math.PI*t/T));if(t<T*6&&e.isConnected)raf=requestAnimationFrame(loop);};raf=requestAnimationFrame(loop);};
  pos(0.5);return e;
};
