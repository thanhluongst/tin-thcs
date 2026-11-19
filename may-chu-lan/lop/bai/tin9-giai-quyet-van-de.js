/* Tin học 9 · Bài 14. Giải quyết vấn đề · 1 tiết (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: Minh lạc trong mê cung không có sơ đồ; robot tìm lối ra bằng thuật toán bám tường.
   Mô phỏng: t9mctay (Tự đi mê cung khi chỉ nhìn thấy ô bên cạnh), t9mcrobot (Robot bám tường phải/trái – chạy từng bước, 3 mê cung). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Lạc trong mê cung',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p><b>Minh</b> vào mê cung ở khu vui chơi, <b>không có sơ đồ</b>, chỉ nhìn thấy các ô ngay cạnh mình. Em hãy thử tự tìm lối ra 🚪 và nghĩ: có <b>quy tắc</b> nào giúp chắc chắn ra được không?</p>',
  qs:[{id:'s1',type:'sim',sim:'t9mctay'},
      {id:'k1',type:'single',q:'Một mẹo hay để không lạc mãi trong mê cung:',opts:['Đi ngẫu nhiên','Luôn để một tay chạm vào bức tường và đi theo nó','Đứng yên chờ','Luôn đi thẳng'],ok:1}],
  key:['Giải quyết vấn đề cần một <b>chiến lược</b> (thuật toán) rõ ràng, không đi “may rủi”.']},

 {t:'Robot bám tường phải',hd:'Hình thành kiến thức · Hoạt động 1 · 12 phút',code:'2.1',phut:12,
  story:'<p>Robot chỉ biết: <b>phát hiện tường</b> ở trước, phải; <b>rẽ phải, rẽ trái, đi thẳng</b>. Cho robot chạy <b>từng bước</b> với thuật toán bám tường phải, đọc dòng giải thích mỗi bước.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9mcrobot'},
      {id:'h1',type:'match',q:'Thuật toán bám tường phải: ghép tình huống với lựa chọn của robot.',items:['Bên phải không có tường','Bên phải có tường, phía trước trống','Bên phải và phía trước đều có tường'],opts:['Đi thẳng','Quay sang trái (chọn lại hướng)','Rẽ phải rồi đi'],ok:[2,0,1]},
      {id:'h2',type:'single',q:'Vì sao bám tường phải dẫn robot tới lối ra (mê cung 1, 2)?',opts:['Vì robot may mắn','Vì bức tường dẫn robot qua mọi chỗ nối với nó, trong đó có lối ra','Vì robot nhìn thấy lối ra','Vì mê cung nhỏ'],ok:1}],
  key:['<b>Bám tường phải</b>: phải trống → rẽ phải; phải có tường, trước trống → đi thẳng; cả hai có tường → quay trái.']},

 {t:'Các bước giải quyết vấn đề',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',phut:10,
  story:'<p>Từ mê cung đến chọn trường THPT, giải quyết vấn đề đều qua các bước giống nhau.</p>',
  qs:[{id:'h3',type:'match',q:'Trong bài toán mê cung, mỗi việc thuộc bước nào?',items:['Xác định: robot cần thoát mê cung, chỉ biết một số thao tác','Phân tích: robot gặp 3 tình huống khi di chuyển','Chọn cách bám tường phải','Cho robot chạy theo thuật toán','Kiểm tra robot có ra được không'],
       opts:['Lựa chọn giải pháp','Thực hiện giải pháp','Tìm hiểu vấn đề','Đánh giá kết quả','Phân tích vấn đề'],ok:[2,4,0,1,3]},
      {id:'h4',type:'single',q:'Thứ tự đúng:',opts:['Tìm hiểu → Phân tích → Lựa chọn giải pháp → Thực hiện → Đánh giá','Thực hiện → Tìm hiểu → Đánh giá','Lựa chọn → Tìm hiểu → Thực hiện','Đánh giá → Phân tích → Thực hiện'],ok:0}],
  key:['5 bước: <b>tìm hiểu</b> → <b>phân tích</b> → <b>lựa chọn giải pháp</b> → <b>thực hiện</b> → <b>đánh giá</b>.']},

 {t:'Bám tường trái và mê cung 3',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Quay lại mô phỏng robot: chọn <b>Mê cung 3</b> (robot cạnh khối tường đứng riêng), chạy cả hai thuật toán.</p>',
  qs:[{id:'l1',type:'single',q:'Thuật toán bám tường trái: khi bên trái không có tường, robot:',opts:['Rẽ trái rồi đi','Đi thẳng','Quay phải','Dừng lại'],ok:0},
      {id:'l2',type:'tf',q:'Kết quả chạy Mê cung 3:',items:[{t:'Bám tường phải: robot đi vòng quanh khối tường mãi',a:'T'},{t:'Bám tường trái: robot ra được',a:'T'},{t:'Một thuật toán đúng ở mê cung này thì đúng ở mọi mê cung',a:'F'}]}],
  key:['Phải <b>đánh giá</b> giải pháp trên nhiều tình huống; có trường hợp thuật toán <b>lặp mãi</b>.']},

 {t:'Chọn trường sau THCS',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Áp dụng 5 bước giải quyết vấn đề cho việc chọn trường.</p>',
  qs:[{id:'v1',type:'text',q:'Mô tả ngắn giải pháp chọn trường của em dưới dạng các bước.',ans:'B1 liệt kê các trường; B2 thu thập điểm chuẩn, khoảng cách, môn thế mạnh; B3 so với năng lực, sở thích; B4 xếp nguyện vọng; B5 đăng kí và theo dõi kết quả.'}],
  key:['Quy trình giải quyết vấn đề dùng được cho <b>mọi</b> vấn đề trong cuộc sống.']},

 {t:'Tổng kết',hd:'Tổng kết · 4 phút',phut:4,
  story:'<p>Một thuật toán tốt + kiểm tra kĩ = giải quyết vấn đề hiệu quả.</p>',
  qs:[{id:'t1',type:'single',q:'Bước “Đánh giá kết quả” giúp:',opts:['Biết giải pháp có giải quyết được vấn đề không, cần sửa gì','Bỏ qua lỗi','Chọn mê cung khác','Không cần thiết'],ok:0},
      {id:'t2',type:'text',short:1,q:'Em sẽ dùng quy trình 5 bước cho vấn đề nào?',ans:'Tự đánh giá.'}],
  key:['Giải quyết vấn đề: <b>5 bước</b>; thuật toán <b>bám tường</b> là một giải pháp cho mê cung.']}
];

const GHIBAI={so:'Bài 14:',ten:'GIẢI QUYẾT VẤN ĐỀ',muc:[
 {step:2,h:'Thuật toán bám tường phải',it:['Phải trống → <b>rẽ phải</b>; phải tường, trước trống → <b>đi thẳng</b>; cả hai tường → <b>quay trái</b>.']},
 {step:3,h:'Các bước giải quyết vấn đề',it:[],flow:['Tìm hiểu','Phân tích','Lựa chọn giải pháp','Thực hiện','Đánh giá']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
var T9MC={m1:['Mê cung 1',['###########','#S........#','###.#.###.#','#...#...#.#','#.#####.#.#','#.....#.#.#','#####.#.#.#','#.....#...E','###########'],1],
  m2:['Mê cung 2',['#########','#S#.....#','#.#.###.#','#.......#','####.#.##','#....#..E','#########'],2],
  m3:['Mê cung 3 (robot cạnh khối tường riêng)',['###########','#.........#','#.........#','#S##......#','#.##......#','#.........E','###########'],0]};
var T9DR=[[-1,0],[0,1],[1,0],[0,-1]],T9AR=['⬆️','➡️','⬇️','⬅️'];
function t9mcSvg(M,fn){const H=M.length,W=M[0].length,c=30;let s=`<svg viewBox="0 0 ${W*c} ${H*c}" width="${Math.min(W*c,420)}" style="max-width:100%;background:#fff;border-radius:10px;border:2px solid #475569">`;
  for(let r=0;r<H;r++)for(let k=0;k<W;k++)s+=fn(r,k,M[r][k],c);return s+'</svg>';}
SIMS_BAI.t9mctay=function(){
  const M=T9MC.m1[1];let p=[1,1],st=0,seen={};const see=()=>{[[0,0],...T9DR].forEach(d=>seen[(p[0]+d[0])+','+(p[1]+d[1])]=1);};
  const e=_el(_shell('Tự đi mê cung','Dùng nút mũi tên (hoặc phím mũi tên) để đi. Em chỉ nhìn thấy các ô <b>đã qua</b> và ô <b>ngay cạnh</b>. Tìm 🚪!',
   `<div class="m-t9mt"><style>.m-t9mt{display:flex;flex-wrap:wrap;gap:16px;align-items:center}.m-t9mt .pad{display:grid;grid-template-columns:repeat(3,56px);gap:6px}
   .m-t9mt .pad button{height:52px;font-size:24px;border-radius:12px;border:0;background:#1d4e89;color:#fff;cursor:pointer}.m-t9mt .pad button:hover{background:#2f6fb5}
   .m-t9mt .kq{font-weight:800;font-size:18px}</style><div class="mz" tabindex="0"></div>
   <div><div class="pad"><span></span><button data-d="0">⬆</button><span></span><button data-d="3">⬅</button><button class="rs" style="background:#e2932b;font-size:16px">↺</button><button data-d="1">➡</button><span></span><button data-d="2">⬇</button><span></span></div>
   <p class="kq">Số bước: 0</p></div></div>`));
  const draw=()=>{e.querySelector('.mz').innerHTML=t9mcSvg(M,(r,k,ch,c)=>{const v=seen[r+','+k],x=k*c,y=r*c;if(!v)return `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="#1e293b"/>`;
    let s=`<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${ch==='#'?'#64748b':'#f8fafc'}" stroke="#e2e8f0"/>`;if(ch==='E')s+=`<text x="${x+4}" y="${y+22}" font-size="20">🚪</text>`;
    if(r===p[0]&&k===p[1])s+=`<text x="${x+3}" y="${y+23}" font-size="22">🧒</text>`;return s;});};
  const mv=d=>{const n=[p[0]+T9DR[d][0],p[1]+T9DR[d][1]],ch=(M[n[0]]||'')[n[1]];if(!ch||ch==='#'){FX.play('tick');return;}p=n;st++;see();draw();
    if(ch==='E'){e.querySelector('.kq').textContent='🎉 Thoát ra sau '+st+' bước!';FX.play('win');}else{e.querySelector('.kq').textContent='Số bước: '+st;FX.play('tick');}};
  e.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>mv(+b.dataset.d));
  e.querySelector('.rs').onclick=()=>{p=[1,1];st=0;seen={};see();draw();e.querySelector('.kq').textContent='Số bước: 0';};
  e.querySelector('.mz').onkeydown=ev=>{const d={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3}[ev.key];if(d!==undefined){ev.preventDefault();mv(d);}};
  see();draw();return e;
};
SIMS_BAI.t9mcrobot=function(){
  const e=_el(_shell('Robot bám tường','Chọn <b>mê cung</b> và <b>thuật toán</b>. Bấm <b>⏭ Một bước</b> để xem robot quyết định, hoặc <b>▶ Chạy</b>.',
   `<div class="m-t9mr"><style>.m-t9mr .w{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.m-t9mr .lg{font-weight:700;min-height:50px;padding:10px;border-radius:12px;background:#f1f5f9;max-width:360px}
   .m-t9mr .lg.ok{background:#dcfce7}.m-t9mr .lg.bad{background:#fee2e2}.m-t9mr .rl{font-size:14px;line-height:1.7;max-width:360px}</style>
   <div class="sim-ctl"><div><b>Mê cung</b><br>${_seg('m',Object.entries(T9MC).map(([k,v])=>[k,v[0]]),'m1')}</div><div><b>Thuật toán</b><br>${_seg('a',[['R','Bám tường phải'],['L','Bám tường trái']],'R')}</div></div>
   <div class="sim-ctl"><button class="btn st">⏭ Một bước</button><button class="btn acc run">▶ Chạy</button><button class="btn ghost rs">↺ Đặt lại</button></div>
   <div class="w"><div class="mz"></div><div><div class="lg">Robot sẵn sàng.</div><div class="rl"></div></div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Mê cung</th><th>Thuật toán</th><th>Kết quả</th></tr></table></div>`));
  let mk='m1',al='R',M,p,d,trail,states,steps,done,tm=0;const hist=[];
  const reset=()=>{clearInterval(tm);M=T9MC[mk][1];d=T9MC[mk][2];M.forEach((row,r)=>{const k=row.indexOf('S');if(k>=0)p=[r,k];});trail={};states={};steps=0;done=false;
    e.querySelector('.lg').className='lg';e.querySelector('.lg').textContent='Robot sẵn sàng, đang nhìn '+T9AR[d]+'.';
    e.querySelector('.rl').innerHTML=al==='R'?'<b>Bám tường phải</b><br>① Phải trống → rẽ phải, đi<br>② Phải tường, trước trống → đi thẳng<br>③ Phải và trước đều tường → quay trái':'<b>Bám tường trái</b><br>① Trái trống → rẽ trái, đi<br>② Trái tường, trước trống → đi thẳng<br>③ Trái và trước đều tường → quay phải';draw();};
  const open=(q,dd)=>{const ch=(M[q[0]+T9DR[dd][0]]||'')[q[1]+T9DR[dd][1]];return ch&&ch!=='#';};
  const draw=()=>{e.querySelector('.mz').innerHTML=t9mcSvg(M,(r,k,ch,c)=>{const x=k*c,y=r*c;let s=`<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${ch==='#'?'#475569':trail[r+','+k]?'#fde68a':'#f8fafc'}" stroke="#e2e8f0"/>`;
    if(ch==='E')s+=`<text x="${x+4}" y="${y+22}" font-size="20">🚪</text>`;if(r===p[0]&&k===p[1])s+=`<text x="${x+15}" y="${y+21}" font-size="18" text-anchor="middle">🤖</text><text x="${x+15}" y="${y+12}" font-size="10" text-anchor="middle">${T9AR[d]}</text>`;return s;});};
  const finish=(msg,ok)=>{done=true;clearInterval(tm);const l=e.querySelector('.lg');l.className='lg '+(ok?'ok':'bad');l.textContent=msg;FX.play(ok?'win':'tick');
    hist.unshift([T9MC[mk][0].split(' (')[0],al==='R'?'Tường phải':'Tường trái',ok?'Ra được ('+steps+' bước)':'Lặp mãi']);if(hist.length>6)hist.pop();histTable(e,hist,(v,j)=>j===2?(/Ra/.test(v)?'g':'r'):'');};
  const step=()=>{if(done)return;const key=p+'|'+d;if(states[key]){finish('🔁 Robot quay lại đúng vị trí và hướng cũ → sẽ đi vòng mãi, không tìm được lối ra!',false);return;}states[key]=1;
    const side=al==='R'?(d+1)%4:(d+3)%4,other=al==='R'?(d+3)%4:(d+1)%4,sT=al==='R'?'phải':'trái';let msg;
    if(open(p,side)){d=side;p=[p[0]+T9DR[d][0],p[1]+T9DR[d][1]];msg='① Bên '+sT+' trống → rẽ '+sT+' và đi.';}
    else if(open(p,d)){p=[p[0]+T9DR[d][0],p[1]+T9DR[d][1]];msg='② Bên '+sT+' có tường, phía trước trống → đi thẳng.';}
    else{d=other;msg='③ Bên '+sT+' và phía trước đều có tường → quay sang '+(al==='R'?'trái':'phải')+'.';}
    trail[p[0]+','+p[1]]=1;steps++;draw();e.querySelector('.lg').textContent='Bước '+steps+': '+msg;FX.play('tick');
    if(M[p[0]][p[1]]==='E')finish('🎉 Robot tìm thấy lối ra sau '+steps+' bước!',true);else if(steps>400)finish('Quá nhiều bước!',false);};
  _wireSeg(e,(n,v)=>{if(n==='m')mk=v;else al=v;reset();});
  e.querySelector('.st').onclick=step;e.querySelector('.rs').onclick=reset;
  e.querySelector('.run').onclick=()=>{if(done)reset();clearInterval(tm);tm=setInterval(()=>{if(!e.isConnected||done){clearInterval(tm);return;}step();},180);};
  reset();return e;
};
