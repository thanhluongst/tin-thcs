/* Tin học 8 · Bài 1. Lược sử công cụ tính toán · 1 tiết.
   Soạn lại cho lớp LAN: 6 hoạt động, tình huống xuyên suốt "Bảo tàng máy tính của lớp 8A".
   Mô phỏng: "bantinh" (gẩy hạt bàn tính), "thehe" (cỗ máy thời gian – 5 thế hệ máy tính). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bàn tính của bà',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Lớp 8A dựng <b>“Bảo tàng máy tính”</b>. Hiện vật đầu tiên là chiếc <b>bàn tính</b> của bà An. Em hãy gẩy hạt để biểu diễn số, rồi đọc số bàn tính đang hiển thị.</p>',
  qs:[{id:'s1',type:'sim',sim:'bantinh'},
      {id:'bt1',type:'single',q:'Trên bàn tính, mỗi hạt ở <b>phần trên</b> (hạt trời) của một cột có giá trị bằng bao nhiêu hạt dưới?',opts:['1','2','5','10'],ok:2},
      {id:'bt2',type:'single',q:'Bàn tính là công cụ tính toán thuộc loại nào?',opts:['Thủ công, con người tự gẩy hạt','Cơ học, chạy bằng bánh răng','Điện tử, chạy bằng điện','Máy tính thông minh'],ok:0}],
  key:['Con người dùng công cụ tính toán từ rất sớm: <b>que tính, sỏi, bàn tính</b>… rồi đến máy tính cơ học và máy tính điện tử.']},
 {t:'Từ bánh răng đến chương trình',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2',phut:10,
  story:'<p>Phòng 2 của bảo tàng trưng bày các <b>máy tính cơ học</b>: máy của <b>Pascal</b> (1642) cộng trừ bằng bánh răng; máy của <b>Leibniz</b> làm được cả nhân chia; dự án <b>máy phân tích</b> của <b>Babbage</b> (1834) có bộ nhớ, bộ xử lí và nhận <b>chương trình</b> trên bìa đục lỗ — ý tưởng của máy tính ngày nay.</p>',
  qs:[{id:'ls1',type:'match',q:'Ghép nhà phát minh với đóng góp.',items:['Pascal','Leibniz','Babbage','Von Neumann'],
       opts:['Máy phân tích có bộ nhớ, bộ xử lí, chạy theo chương trình','Máy cộng trừ bằng bánh răng','Nguyên lí “chương trình được lưu trữ” trong bộ nhớ','Máy tính được cả nhân và chia'],ok:[1,3,0,2]},
      {id:'ls2',type:'tf',q:'Đúng hay sai về <b>kiến trúc Von Neumann</b>?',items:[
        {t:'Chương trình và dữ liệu cùng được lưu trong bộ nhớ',a:'T'},{t:'Máy tính chỉ làm được một việc cố định, muốn đổi việc phải đổi dây nối',a:'F'},{t:'Máy tính ngày nay vẫn dựa trên kiến trúc này',a:'T'}]},
      {id:'ls3',type:'single',q:'Ý tưởng nào đã thúc đẩy phát minh ra máy tính?',opts:['Muốn có đồ chơi điện tử','Muốn tự động hoá việc tính toán, tính nhanh và chính xác','Muốn thay bàn tính bằng giấy','Muốn gửi thư nhanh'],ok:1}],
  key:['Máy tính cơ học (Pascal, Leibniz, <b>Babbage</b>) → ý tưởng máy tính <b>chạy theo chương trình</b>.','<b>Von Neumann</b>: chương trình và dữ liệu cùng lưu trong <b>bộ nhớ</b>.']},
 {t:'Cỗ máy thời gian: 5 thế hệ máy tính',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2',phut:12,
  story:'<p>Bước vào <b>cỗ máy thời gian</b>: kéo thanh trượt qua từng thế hệ, quan sát <b>linh kiện</b>, <b>kích thước</b> và <b>tốc độ</b> của máy tính điện tử.</p>',
  qs:[{id:'s2',type:'sim',sim:'thehe'},
      {id:'th1',type:'match',q:'Ghép thế hệ máy tính với công nghệ chính.',items:['Thế hệ 1 (1945–1955)','Thế hệ 2 (1955–1965)','Thế hệ 3 (1965–1974)','Thế hệ 4 (1974–nay)','Thế hệ 5 (1990–nay)'],
       opts:['Bóng bán dẫn','Bộ vi xử lí (mạch tích hợp cỡ rất lớn)','Đèn điện tử chân không','Trí tuệ nhân tạo, máy tính thông minh','Mạch tích hợp'],ok:[2,0,4,1,3]},
      {id:'th2',type:'single',q:'Quan sát: qua các thế hệ, máy tính thay đổi thế nào?',opts:['To hơn, chậm hơn, tốn điện hơn','Nhỏ hơn, nhanh hơn, rẻ và tiết kiệm điện hơn','Không thay đổi gì','Chỉ thay đổi màu sắc'],ok:1},
      {id:'th3',type:'single',q:'Bộ vi xử lí là linh kiện dựa trên công nghệ nào?',opts:['Đèn điện tử','Bóng bán dẫn rời','Mạch tích hợp cỡ rất lớn (VLSI)','Bánh răng'],ok:2}],
  key:['5 thế hệ: <b>đèn điện tử</b> → <b>bóng bán dẫn</b> → <b>mạch tích hợp</b> → <b>bộ vi xử lí</b> → <b>máy tính thông minh (AI)</b>.','Máy tính ngày càng <b>nhỏ, nhanh, rẻ, tiết kiệm điện</b>.']},
 {t:'Máy tính thay đổi cuộc sống',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Bảng tin cuối bảo tàng: <i>“Máy tính làm thay đổi sâu sắc cuộc sống”</i>. Phân loại các ví dụ.</p>',
  qs:[{id:'lt1',type:'sort',q:'Việc nào làm <b>có</b> máy tính, việc nào <b>chưa có</b> máy tính?',cols:{c0:'Khi có máy tính',c1:'Khi chưa có máy tính'},items:[
      {t:'Tra từ điển giấy dày cộp',a:'c1'},{t:'Học trực tuyến với thầy cô qua video',a:'c0'},{t:'Gửi thư tay mất cả tuần',a:'c1'},{t:'Tìm đường bằng bản đồ số',a:'c0'},{t:'Thanh toán bằng mã QR',a:'c0'},{t:'Tính sổ sách bằng bàn tính',a:'c1'}]},
      {id:'lt2',type:'single',q:'Ứng dụng nào thể hiện máy tính <b>thế hệ thứ năm</b>?',opts:['Máy tính bỏ túi','Trợ lí ảo nhận lệnh bằng giọng nói','Bàn tính','Máy chữ'],ok:1}],
  key:['Máy tính giúp <b>học tập, giao tiếp, làm việc</b> nhanh và tiện hơn; máy thế hệ 5 có <b>trí tuệ nhân tạo</b>.']},
 {t:'Dự báo tương lai',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  story:'<p>Năm 1975, đất nước thống nhất, máy tính thế hệ 3–4 đã xuất hiện. Hôm nay máy tính thông minh ở khắp nơi. Còn 20 năm nữa thì sao?</p>',
  qs:[{id:'vd1',type:'single',q:'Năm 1975, thế hệ máy tính nào <b>đã ra đời</b>?',opts:['Thế hệ 1, 2, 3 và bắt đầu thế hệ 4','Chỉ thế hệ 1','Đã có thế hệ 5','Chưa có máy tính điện tử'],ok:0},
      {id:'vd2',type:'text',q:'Đưa ra một dự báo về ứng dụng của máy tính trong tương lai và giải thích cơ sở (1–2 câu).',ans:'VD: Xe tự lái phổ biến vì AI nhận dạng hình ảnh ngày càng chính xác, máy tính ngày càng nhanh và nhỏ.'}],
  key:['Dự báo dựa trên xu hướng: máy tính <b>nhanh hơn, nhỏ hơn, thông minh hơn</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  story:'<p>Sắp xếp lại hành trình của bảo tàng.</p>',
  qs:[{id:'tk',type:'single',q:'Thứ tự đúng là:',opts:['Bàn tính → máy cơ học → máy điện tử → máy thông minh','Máy điện tử → bàn tính → máy cơ học','Máy thông minh → bàn tính → máy điện tử','Máy cơ học → bàn tính → máy thông minh'],ok:0}],
  key:['<b>Thủ công → cơ học → điện tử → thông minh</b>.']}
];
const GHIBAI={so:'Bài 1:',ten:'LƯỢC SỬ CÔNG CỤ TÍNH TOÁN',muc:[
 {step:2,h:'Công cụ tính toán cơ học',it:['Bàn tính → máy <b>Pascal</b>, <b>Leibniz</b> → máy phân tích <b>Babbage</b> (chạy theo chương trình).','<b>Von Neumann</b>: chương trình và dữ liệu lưu trong bộ nhớ.']},
 {step:3,h:'Máy tính điện tử',it:[],flow:['Đèn điện tử','Bóng bán dẫn','Mạch tích hợp','Vi xử lí','AI']},
 {step:4,h:'Ảnh hưởng',it:['Máy tính thay đổi sâu sắc <b>học tập, giao tiếp, làm việc</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.bantinh=function(){
  const N=4, st=Array.from({length:N},()=>({t:0,d:0}));
  const e=_el(_shell('Bàn tính của bà','Bấm vào <b>hạt trời</b> (trên, giá trị 5) hoặc <b>hạt đất</b> (dưới, mỗi hạt 1) để gẩy. Thử biểu diễn số <b class="m8ls-tg"></b>.',
   `<div class="m8ls"><style>.m8ls svg{width:100%;max-width:520px;display:block;margin:auto;cursor:pointer}.m8ls .so{font:800 34px system-ui;text-align:center;color:#92400e}.m8ls .ok{color:#15803d}</style>
    <svg viewBox="0 0 440 260"></svg><div class="so">0</div><div class="sim-ctl" style="justify-content:center"><button class="btn ghost rs">↺ Đặt lại</button><button class="btn acc nx">🎯 Số mới</button></div></div>`));
  const sv=e.querySelector('svg'), so=e.querySelector('.so'), tgEl=e.querySelector('.m8ls-tg'); let tg=0;
  const val=()=>st.reduce((s,c)=>s*10+c.t*5+c.d,0);
  function draw(){ let h='<rect x="10" y="10" width="420" height="240" rx="14" fill="#7c2d12"/><rect x="24" y="24" width="392" height="212" rx="6" fill="#fef3c7"/><rect x="24" y="82" width="392" height="8" fill="#7c2d12"/>';
    ['nghìn','trăm','chục','đơn vị'].forEach((n,i)=>{const x=80+i*94; h+=`<line x1="${x}" y1="24" x2="${x}" y2="236" stroke="#78350f" stroke-width="4"/><text x="${x}" y="252" fill="#fde68a" font-size="12" text-anchor="middle">${n}</text>`;
      const c=st[i]; h+=`<ellipse data-c="${i}" data-k="t" cx="${x}" cy="${c.t?72:40}" rx="30" ry="13" fill="#dc2626" stroke="#7f1d1d"/>`;
      for(let k=0;k<4;k++){const up=k<c.d; const y=up?104+k*28:132+k*28; h+=`<ellipse data-c="${i}" data-k="d" data-n="${k}" cx="${x}" cy="${y}" rx="30" ry="12" fill="#2563eb" stroke="#1e3a8a"/>`;}});
    sv.innerHTML=h; const v=val(); so.textContent=v; so.classList.toggle('ok',v===tg);
    if(v===tg){so.textContent=v+' 🎉 Đúng rồi!';} }
  sv.onclick=ev=>{const b=ev.target.closest('ellipse'); if(!b) return; const c=st[+b.dataset.c];
    if(b.dataset.k==='t') c.t=1-c.t; else {const n=+b.dataset.n; c.d=(n<c.d)?n:n+1;}
    FX.play('tick'); draw(); if(val()===tg) FX.play('sparkle');};
  const nx=()=>{tg=Math.floor(Math.random()*9000)+100; tgEl.textContent=tg;}; nx();
  e.querySelector('.rs').onclick=()=>{st.forEach(c=>{c.t=0;c.d=0;}); draw();};
  e.querySelector('.nx').onclick=()=>{nx(); FX.play('whoosh'); draw();};
  draw(); return e;
};
SIMS_BAI.thehe=function(){
  const G=[['Thế hệ 1','1945–1955','💡','Đèn điện tử chân không','To bằng cả căn phòng, nặng hàng chục tấn, rất tốn điện (ENIAC).',1,30],
    ['Thế hệ 2','1955–1965','🔌','Bóng bán dẫn','Nhỏ hơn, ít tốn điện hơn, tin cậy hơn.',2,22],
    ['Thế hệ 3','1965–1974','🔲','Mạch tích hợp (IC)','Nhiều bóng bán dẫn trên một con chip; máy cỡ tủ lạnh.',3,15],
    ['Thế hệ 4','1974–nay','🖥️','Bộ vi xử lí (VLSI)','Máy tính cá nhân, laptop, điện thoại thông minh.',4,9],
    ['Thế hệ 5','1990–nay','🤖','Trí tuệ nhân tạo','Máy tính thông minh: nhận dạng giọng nói, hình ảnh, trợ lí ảo.',5,6]];
  const e=_el(_shell('Cỗ máy thời gian','Kéo <b>thanh trượt</b> hoặc bấm từng thế hệ. Quan sát kích thước (hộp xám) và tốc độ (thanh màu).',
   `<div class="m8th"><style>.m8th input{width:100%;accent-color:#7c3aed}.m8th .card{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center;background:linear-gradient(135deg,#ede9fe,#e0f2fe);border-radius:16px;padding:16px;margin:10px 0}.m8th .ic{font-size:64px;text-align:center}.m8th .box{background:#64748b;border-radius:6px;margin:6px 0;transition:all .4s;height:18px}.m8th .sp{height:14px;border-radius:7px;background:linear-gradient(90deg,#22c55e,#eab308,#ef4444);transition:width .4s}.m8th .tabs{display:flex;gap:6px;flex-wrap:wrap}.m8th .tabs button{flex:1;border:2px solid #c4b5fd;background:#fff;border-radius:10px;padding:8px;font-weight:700;cursor:pointer}.m8th .tabs .on{background:#7c3aed;color:#fff}</style>
    <div class="tabs">${G.map((g,i)=>`<button data-i="${i}">${g[2]} ${g[0]}</button>`).join('')}</div>
    <input type="range" min="0" max="4" value="0"><div class="card"><div class="ic"></div><div class="tx"></div></div></div>`));
  const r=e.querySelector('input'), ic=e.querySelector('.ic'), tx=e.querySelector('.tx');
  function show(i){const g=G[i]; r.value=i; e.querySelectorAll('.tabs button').forEach((b,k)=>b.classList.toggle('on',k==i));
    ic.textContent=g[2]; tx.innerHTML=`<b style="font-size:20px">${g[0]}</b> · ${g[1]}<br>Linh kiện: <b>${g[3]}</b><br><small>${g[4]}</small><div>Kích thước:<div class="box" style="width:${g[6]*3}%"></div></div><div>Tốc độ:<div class="sp" style="width:${g[5]*20}%"></div></div>`;
    FX.play('whoosh');}
  r.oninput=()=>show(+r.value); e.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>show(+b.dataset.i)); show(0); return e;
};
