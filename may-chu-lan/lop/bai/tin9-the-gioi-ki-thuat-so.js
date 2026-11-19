/* Tin học 9 · Bài 1. Thế giới kĩ thuật số · 1 tiết 45 phút (soạn lại cho lớp học LAN).
   Tình huống xuyên suốt: nhà bạn An có ti vi, đồng hồ thông minh… mọi thứ đều có "bộ não".
   Mô phỏng: t9tv (Ti vi kĩ thuật số: đầu vào → xử lí → đầu ra), t9xuli (Thiết bị nào có bộ xử lí?),
   t9dua (Thi tính nhanh: người và máy). */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Chiếc điều khiển ti vi',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Tối nay <b>An</b> cầm điều khiển, bấm số <b>7</b> là ti vi chuyển ngay sang kênh hoạt hình. Ti vi đã “hiểu” An bằng cách nào?</p><p>Em hãy bấm thử các nút trên điều khiển và quan sát <b>đường đi của thông tin</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'t9tv'},
      {id:'k1',type:'single',q:'Khi em bấm nút, ti vi nhận <b>đầu vào</b> là gì?',opts:['Hình ảnh trên màn hình','Tín hiệu yêu cầu từ nút bấm','Âm thanh từ loa','Dòng điện từ ổ cắm'],ok:1},
      {id:'k2',type:'single',q:'Bộ phận nào giúp ti vi “hiểu” yêu cầu và chuyển kênh?',opts:['Loa','Màn hình','Bộ xử lí','Ăng-ten'],ok:2}],
  key:['Ti vi kĩ thuật số: <b>đầu vào</b> (tín hiệu nút bấm) → <b>bộ xử lí</b> → <b>đầu ra</b> (hình, tiếng kênh mới).']},

 {t:'Bộ xử lí có ở khắp nơi',hd:'Hình thành kiến thức · Hoạt động 1 · 9 phút',code:'2.1',phut:9,
  story:'<p>Không chỉ máy tính, rất nhiều thiết bị quanh An cũng có <b>bộ xử lí</b>. Mở từng thiết bị trong mô phỏng để xem bên trong.</p>',
  qs:[{id:'s2',type:'sim',sim:'t9xuli'},
      {id:'h1',type:'sort',q:'Thiết bị nào có gắn bộ xử lí?',cols:{c0:'Có bộ xử lí',c1:'Không có'},items:[
        {t:'Đồng hồ thông minh',a:'c0'},{t:'Cái kéo',a:'c1'},{t:'Máy giặt tự động',a:'c0'},{t:'Bảng điện tử ở sân bay',a:'c0'},{t:'Quạt nan',a:'c1'},{t:'Ô tô lái tự động',a:'c0'}]},
      {id:'h2',type:'match',q:'Thiết bị có bộ xử lí (Hình 1.2) thường gặp ở đâu?',items:['Bảng điện tử','Máy chụp cắt lớp','Robot lắp ráp','Ô tô lái tự động'],opts:['Bệnh viện','Nhà máy sản xuất','Sân bay, nhà ga','Đường phố'],ok:[2,0,1,3]}],
  key:['<b>Bộ xử lí</b> được gắn vào nhiều thiết bị (điện thoại, ti vi, máy giặt, robot…) để chúng <b>xử lí thông tin</b> như máy tính.']},

 {t:'Máy tính thật là cần thiết',hd:'Hình thành kiến thức · Hoạt động 2 · 9 phút',code:'2.2',phut:9,
  story:'<p>An cá với máy tính: “Tớ cộng nhẩm nhanh lắm!”. Hãy thi xem ai nhanh và chính xác hơn.</p>',
  qs:[{id:'s3',type:'sim',sim:'t9dua'},
      {id:'h3',type:'tf',q:'Đúng hay Sai về <b>khả năng của máy tính</b>?',items:[
        {t:'Tính toán nhanh, chính xác (hàng tỉ phép tính mỗi giây)',a:'T'},{t:'Làm việc bền bỉ, không mệt mỏi',a:'T'},
        {t:'Lưu trữ được lượng dữ liệu rất lớn',a:'T'},{t:'Tự suy nghĩ và làm việc khi không có chương trình',a:'F'}]},
      {id:'h4',type:'match',q:'Ghép ứng dụng với lĩnh vực.',items:['Dự báo thời tiết','Học trực tuyến','Chẩn đoán bằng máy chụp cắt lớp','Robot hàn ô tô'],opts:['Y tế','Sản xuất','Khoa học','Giáo dục'],ok:[2,3,0,1]}],
  key:['Máy tính <b>tính nhanh, chính xác, bền bỉ</b>, <b>lưu trữ</b> lớn, <b>kết nối</b> toàn cầu → ứng dụng trong mọi lĩnh vực.','Máy tính chỉ làm việc theo <b>chương trình</b> do con người tạo ra.']},

 {t:'Tác động của công nghệ thông tin',hd:'Hình thành kiến thức · Hoạt động 3 · 8 phút',code:'2.3',phut:8,
  story:'<p>Nhờ công nghệ thông tin, An học trực tuyến, tra cứu mọi lúc. Nhưng em trai An lại thức khuya chơi game…</p>',
  qs:[{id:'h5',type:'sort',q:'Tác động tích cực hay tiêu cực?',cols:{c0:'Tích cực',c1:'Tiêu cực'},items:[
        {t:'Học trực tuyến, thư viện điện tử miễn phí',a:'c0'},{t:'Nghiện trò chơi điện tử, mất ngủ',a:'c1'},{t:'Thanh toán, mua sắm nhanh qua điện thoại',a:'c0'},
        {t:'Tin giả lan nhanh trên mạng xã hội',a:'c1'},{t:'Bác sĩ hội chẩn từ xa',a:'c0'},{t:'Ít giao tiếp trực tiếp với gia đình',a:'c1'}]},
      {id:'h6',type:'text',q:'Kể một ứng dụng CNTT em hay dùng và một tác động tích cực của nó (1–2 câu).',ans:'Ví dụ: Zalo giúp liên lạc nhanh, miễn phí, nhận thông báo của lớp; chỉ dùng khi cần, không thức khuya.'}],
  key:['CNTT tác động mạnh đến <b>giáo dục</b> và <b>xã hội</b>; dùng <b>đúng cách, có trách nhiệm</b> để tránh tác động tiêu cực.']},

 {t:'Đồng hồ thông minh',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>An được tặng một chiếc <b>đồng hồ thông minh</b>: đo nhịp tim, đếm bước chân, báo tin nhắn.</p>',
  qs:[{id:'l1',type:'multi',q:'Chức năng nào đồng hồ thông minh có mà đồng hồ thường <b>không</b> có?',opts:['Xem giờ','Đo nhịp tim, đếm bước chân','Nhận thông báo tin nhắn','Định vị GPS'],ok:[1,2,3]},
      {id:'l2',type:'single',q:'Vì sao đồng hồ thông minh cần bộ xử lí?',opts:['Để chạy được bằng pin','Để tiếp nhận và xử lí dữ liệu từ cảm biến, điện thoại','Để có mặt kính đẹp','Để nặng hơn'],ok:1},
      {id:'l3',type:'single',q:'Nếu một ngày mọi bộ xử lí biến mất, điều gì <b>không</b> bị ảnh hưởng?',opts:['Đèn giao thông tự động','Điện thoại thông minh','Cây bút chì','Thẻ ngân hàng ATM'],ok:2}],
  key:['Thiết bị “thông minh” = có <b>bộ xử lí</b> + chương trình xử lí dữ liệu đầu vào.']},

 {t:'Tổng kết',hd:'Tổng kết · 3 phút',phut:3,
  story:'<p>Nhìn quanh lớp học: có bao nhiêu thiết bị đang “nghĩ” bằng bộ xử lí?</p>',
  qs:[{id:'t1',type:'single',q:'Câu nào đúng nhất?',opts:['Chỉ máy tính mới có bộ xử lí','Bộ xử lí có trong nhiều thiết bị, giúp chúng xử lí thông tin','Máy tính làm được mọi việc không cần con người','CNTT chỉ có tác động tích cực'],ok:1},
      {id:'t2',type:'text',short:1,q:'Điều em nhớ nhất hôm nay?',ans:'Tự đánh giá.'}],
  key:['<b>Thế giới kĩ thuật số</b>: bộ xử lí ở khắp nơi; máy tính hỗ trợ đắc lực; dùng CNTT có trách nhiệm.']}
];

const GHIBAI={so:'Bài 1:',ten:'THẾ GIỚI KĨ THUẬT SỐ',muc:[
 {step:1,h:'Thiết bị có bộ xử lí',it:['Nhiều thiết bị có <b>bộ xử lí</b>: điện thoại, ti vi, máy giặt, robot, ô tô tự lái…'],flow:['Đầu vào','Bộ xử lí','Đầu ra']},
 {step:3,h:'Khả năng của máy tính',it:['<b>Tính nhanh, chính xác, bền bỉ</b>; <b>lưu trữ</b> lớn; <b>kết nối</b> toàn cầu.','Ứng dụng trong mọi lĩnh vực: y tế, giáo dục, sản xuất, khoa học…']},
 {step:4,h:'Tác động của CNTT',it:['Thay đổi <b>giáo dục</b> và <b>xã hội</b>; dùng sai cách gây tác động <b>tiêu cực</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.t9tv=function(){
  const CH={1:['VTV1','📰 Thời sự','#1e3a8a'],3:['VTV3','🎤 Ca nhạc','#7c2d12'],7:['Hoạt hình','🐼 Gấu trúc phiêu lưu','#15803d'],9:['Thể thao','⚽ Bóng đá','#065f46']};
  const e=_el(_shell('Ti vi kĩ thuật số','Bấm nút trên <b>điều khiển</b>. Quan sát ba ô <b>Đầu vào → Bộ xử lí → Đầu ra</b> sáng lần lượt.',
   `<div class="m-t9tv"><style>.m-t9tv{display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center}
   .m-t9tv .rm{background:#1f2937;border-radius:26px;padding:14px;display:grid;grid-template-columns:repeat(3,52px);gap:8px}
   .m-t9tv .rm button{height:46px;border-radius:12px;border:0;font:700 18px system-ui;cursor:pointer;background:#374151;color:#fff}
   .m-t9tv .rm button:hover{background:#4b5563}.m-t9tv .rm .w{grid-column:span 3;background:#e2932b}
   .m-t9tv .tv{width:300px;aspect-ratio:16/10;border:12px solid #111827;border-radius:14px;display:grid;place-items:center;color:#fff;font:700 20px system-ui;text-align:center;transition:background .4s;background:#000}
   .m-t9tv .fl{display:flex;gap:6px;align-items:center;width:100%;justify-content:center;font-weight:700}
   .m-t9tv .fl span{padding:8px 12px;border-radius:10px;background:#eef1f6;transition:.25s}.m-t9tv .fl span.on{background:#fde68a;transform:scale(1.08)}
   .m-t9tv .vol{font-size:14px;opacity:.85}</style>
   <div class="rm">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-k="${n}">${n}</button>`).join('')}<button data-k="-">🔉</button><button data-k="0">⏻</button><button data-k="+">🔊</button></div>
   <div class="tv">Ti vi đang tắt</div>
   <div class="fl"><span>📡 Đầu vào</span>➜<span>🧠 Bộ xử lí</span>➜<span>📺 Đầu ra</span></div>
   <table class="tbl sim-hist" style="max-width:520px"><tr><th>Lần</th><th>Đầu vào</th><th>Xử lí</th><th>Đầu ra</th></tr></table></div>`));
  const tv=e.querySelector('.tv'),f=e.querySelectorAll('.fl span'),hist=[];let on=false,ch=1,vol=10;
  const light=(cb)=>{f.forEach(x=>x.classList.remove('on'));[0,1,2].forEach(i=>setTimeout(()=>{f.forEach(x=>x.classList.remove('on'));f[i].classList.add('on');if(i===2)cb();},i*350));};
  e.querySelectorAll('.rm button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;FX.play('tick');
    light(()=>{let inp='Nút '+b.textContent,xl,out;
      if(k==='0'){on=!on;xl=on?'Bật nguồn':'Tắt nguồn';out=on?'Màn hình sáng':'Màn hình tắt';}
      else if(!on){xl='Đang tắt, bỏ qua';out='Không đổi';}
      else if(k==='+'||k==='-'){vol=Math.max(0,Math.min(30,vol+(k==='+'?2:-2)));xl='Đổi âm lượng';out='Âm lượng '+vol;}
      else {ch=+k;xl='Tìm kênh '+k;out=CH[k]?CH[k][0]:'Kênh '+k;}
      const c=CH[ch]||['Kênh '+ch,'📺 Chương trình','#334155'];
      tv.style.background=on?c[2]:'#000';tv.innerHTML=on?`<div>${c[1]}<div class="vol">${c[0]} · 🔊 ${vol}</div></div>`:'Ti vi đang tắt';
      hist.unshift([inp,xl,out]);if(hist.length>5)hist.pop();histTable(e,hist,()=>'');FX.play('ding');});});
  return e;
};
SIMS_BAI.t9xuli=function(){
  const D=[['⌚','Đồng hồ thông minh',1,'Đọc cảm biến nhịp tim, đếm bước, báo tin nhắn'],['✂️','Cái kéo',0,'Chỉ là dụng cụ cơ học'],['🧺','Máy giặt tự động',1,'Tự chọn lượng nước, thời gian giặt theo chương trình'],
   ['🚦','Đèn giao thông thông minh',1,'Đếm xe, đổi đèn theo lưu lượng'],['🎐','Quạt nan',0,'Không có mạch điện'],['🚗','Ô tô lái tự động',1,'Xử lí camera, radar để tự lái'],['🏥','Máy chụp cắt lớp',1,'Dựng ảnh cơ thể từ hàng nghìn lần chụp'],['🔨','Cái búa',0,'Không xử lí thông tin']];
  const e=_el(_shell('Thiết bị nào có bộ xử lí?','Đoán trước rồi bấm <b>🔍 Soi bên trong</b> từng thiết bị. Ghi điểm nếu đoán đúng!',
   `<div class="m-t9xl"><style>.m-t9xl .g{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
   .m-t9xl .c{border:2px solid #dbe4f0;border-radius:14px;padding:10px;text-align:center;background:#fff}
   .m-t9xl .c .i{font-size:42px}.m-t9xl .c b{display:block;font-size:14px;min-height:36px}
   .m-t9xl .c button{margin:3px;border:0;border-radius:8px;padding:6px 8px;font-weight:700;cursor:pointer}
   .m-t9xl .c .y{background:#dcfce7}.m-t9xl .c .n{background:#fee2e2}.m-t9xl .c.ok{border-color:#16a34a;background:#f0fdf4}.m-t9xl .c.bad{border-color:#dc2626;background:#fef2f2}
   .m-t9xl .c small{display:block;margin-top:4px;color:#475569}.m-t9xl .sc{font:800 20px system-ui;margin:8px 0;color:#1d4e89}</style>
   <div class="sc">Điểm: 0 / ${D.length}</div><div class="g">${D.map((d,i)=>`<div class="c" data-i="${i}"><div class="i">${d[0]}</div><b>${d[1]}</b><button class="y">🧠 Có</button><button class="n">🚫 Không</button><small></small></div>`).join('')}</div></div>`));
  let sc=0,done=0;
  e.querySelectorAll('.c').forEach(c=>c.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(c.dataset.x)return;c.dataset.x=1;const d=D[+c.dataset.i],g=b.classList.contains('y')?1:0,ok=g===d[2];
    if(ok)sc++;done++;c.classList.add(ok?'ok':'bad');c.querySelector('small').innerHTML=(d[2]?'🧠 Có bộ xử lí: ':'🚫 Không: ')+d[3];
    e.querySelector('.sc').textContent='Điểm: '+sc+' / '+D.length+(done===D.length?' 🎉':'');FX.play(ok?'ding':'tick');if(done===D.length)FX.play('sparkle');}));
  return e;
};
SIMS_BAI.t9dua=function(){
  const e=_el(_shell('Thi tính nhanh: em và máy tính','Bấm <b>▶ Bắt đầu</b>, cộng 5 phép tính thật nhanh. Máy tính cũng làm cùng lúc (và làm thêm 1 tỉ phép tính!).',
   `<div class="m-t9du"><style>.m-t9du .q{font:800 30px system-ui;text-align:center;margin:10px}.m-t9du input{font:700 22px system-ui;width:120px;text-align:center;border:2px solid #c7d6ea;border-radius:10px;padding:6px}
   .m-t9du .row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}.m-t9du .vs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
   .m-t9du .vs div{border-radius:12px;padding:12px;text-align:center;font-weight:700;background:#f1f5f9}</style>
   <div class="row"><button class="btn acc go">▶ Bắt đầu</button></div><div class="q">—</div>
   <div class="row"><input class="in" type="number" placeholder="?"><button class="btn ok">Trả lời</button></div>
   <div class="vs"><div class="me">🧑 Em: chưa làm</div><div class="pc">💻 Máy tính: chưa làm</div></div>
   <table class="tbl sim-hist"><tr><th>Lần</th><th>Thời gian của em</th><th>Đúng</th><th>Máy tính</th></tr></table></div>`));
  let P=[],i=0,t0=0,okc=0;const hist=[],q=e.querySelector('.q'),inp=e.querySelector('.in');
  const next=()=>{const p=P[i];q.textContent=p[0]+' + '+p[1]+' = ?';inp.value='';inp.focus();};
  e.querySelector('.go').onclick=()=>{P=Array.from({length:5},()=>[10+Math.floor(Math.random()*890),10+Math.floor(Math.random()*890)]);i=0;okc=0;t0=Date.now();FX.play('whoosh');
    e.querySelector('.pc').innerHTML='💻 Máy tính: xong 5 phép + 1 000 000 000 phép khác trong <b>~0,3 giây</b>, đúng 5/5';e.querySelector('.me').textContent='🧑 Em: đang làm…';next();};
  const ans=()=>{if(!P.length||i>=5)return;const p=P[i];if(+inp.value===p[0]+p[1]){okc++;FX.play('ding');}else FX.play('tick');i++;
    if(i<5)next();else{const s=((Date.now()-t0)/1000).toFixed(1);q.textContent='Xong!';e.querySelector('.me').innerHTML='🧑 Em: <b>'+s+' giây</b>, đúng '+okc+'/5';
      hist.unshift([s+' giây',okc+'/5','~0,3 giây, 5/5']);if(hist.length>5)hist.pop();histTable(e,hist,(v,j)=>j===1?(v==='5/5'?'g':'r'):'');FX.play('sparkle');}};
  e.querySelector('.ok').onclick=ans;inp.onkeydown=ev=>{if(ev.key==='Enter')ans();};
  return e;
};
