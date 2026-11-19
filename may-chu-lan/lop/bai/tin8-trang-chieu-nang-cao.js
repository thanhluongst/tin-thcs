/* Tin học 8 · Bài 10a. Định dạng nâng cao cho trang chiếu · 1 tiết.
   Tình huống: An làm bài trình chiếu cho lễ ra mắt CLB Tin học.
   Mô phỏng: "rutgon" (rút gọn văn bản trang chiếu), "phoimau" (phối màu chữ/nền, gam nóng/lạnh, độ tương phản). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trang chiếu của An',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>An chép nguyên đoạn văn dài lên trang chiếu. Khi chiếu, các bạn cuối lớp không đọc kịp. Em hãy giúp An <b>rút gọn</b> trang chiếu trong mô phỏng.</p>',
  qs:[{id:'s1',type:'sim',sim:'rutgon'},
      {id:'r1',type:'single',q:'Văn bản trên trang chiếu nên:',opts:['Viết đầy đủ câu như văn bản','Ngắn gọn, nêu ý chính, từ khoá','Càng nhiều chữ càng tốt','Chỉ có hình, không chữ'],ok:1},
      {id:'r2',type:'single',q:'Quan sát: bỏ bớt chữ thừa thì cỡ chữ có thể…',opts:['Nhỏ đi','To hơn, dễ đọc hơn','Không đổi','Biến mất'],ok:1}],
  key:['Văn bản trang chiếu: <b>ngắn gọn</b>, nêu <b>ý chính</b>, không cần đủ thành phần câu.']},
 {t:'Phối màu cho trang chiếu',hd:'Hình thành kiến thức · Hoạt động 1 · 13 phút',code:'2.1',phut:13,
  story:'<p>Chọn <b>màu nền</b> và <b>màu chữ</b> trên bánh xe màu. Đồng hồ <b>tương phản</b> cho biết chữ có dễ đọc không; mô phỏng cho biết đó là gam <b>nóng</b> hay <b>lạnh</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'phoimau'},
      {id:'m1',type:'sort',q:'Xếp màu vào đúng nhóm.',cols:{c0:'Màu nóng',c1:'Màu lạnh'},items:[{t:'Đỏ',a:'c0'},{t:'Xanh dương',a:'c1'},{t:'Cam',a:'c0'},{t:'Tím than',a:'c1'},{t:'Vàng',a:'c0'},{t:'Xanh lục lam',a:'c1'}]},
      {id:'m2',type:'match',q:'Bài trình chiếu nên dùng gam màu nào?',items:['Lễ hội, ra mắt CLB sôi động','Thuyết trình khoa học về đại dương'],opts:['Gam màu lạnh','Gam màu nóng'],ok:[1,0]},
      {id:'m3',type:'tf',q:'Nên hay không nên?',items:[{t:'Màu chữ tương phản với màu nền',a:'T'},{t:'Dùng quá nhiều màu trên một trang',a:'F'},{t:'Chữ vàng trên nền trắng',a:'F'}]}],
  key:['Màu <b>nóng</b> (đỏ, cam, vàng): sôi động; màu <b>lạnh</b> (xanh, tím): nhẹ nhàng.','Chữ và nền phải <b>tương phản</b>; không dùng quá nhiều màu.']},
 {t:'Thông tin trên trang chiếu',hd:'Hình thành kiến thức · Hoạt động 2 · 8 phút',code:'2.2',phut:8,
  story:'<p>Thêm <b>số trang chiếu</b>, <b>ngày</b>, <b>chân trang</b> giúp người xem theo dõi: <b>Insert → Header &amp; Footer</b>.</p>',
  qs:[{id:'hf',type:'match',q:'Ghép mục trong hộp thoại Header and Footer với tác dụng.',items:['Date and time','Slide number','Footer','Don’t show on title slide','Apply to All'],opts:['Áp dụng cho mọi trang chiếu','Hiện ngày giờ','Không hiện trên trang tiêu đề','Hiện số trang chiếu','Dòng chữ ở chân trang'],ok:[1,3,4,2,0]},
      {id:'hd',type:'single',q:'PowerPoint muốn có “đầu trang” thì:',opts:['Có sẵn mục Header cho trang chiếu','Dùng hộp văn bản (Text Box) đặt ở phía trên, có thể đưa vào Slide Master','Không thể làm được','Dùng Page Number'],ok:1}],
  key:['<b>Insert → Header &amp; Footer</b>: ngày, số trang chiếu, chân trang.']},
 {t:'Luyện tập',hd:'Luyện tập · 6 phút',code:'3',phut:6,
  qs:[{id:'lt',type:'single',q:'Phương án <b>SAI</b>:',opts:['Nên dùng màu tương phản giữa chữ và nền','Mỗi trang chiếu nên có ít ý chính','Nên dùng nhiều phông chữ khác nhau trên một trang để sinh động','Có thể thêm số trang chiếu'],ok:2}],
  key:['Thống nhất <b>phông chữ, màu sắc</b> trong toàn bài.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Em làm bài trình chiếu giới thiệu một nội dung Tin học: chọn gam màu nào, màu chữ/nền ra sao? Vì sao?',ans:'VD: Giới thiệu AI → gam lạnh (xanh), nền xanh đậm chữ trắng, tương phản tốt.'}],
  key:['Màu sắc <b>phù hợp chủ đề</b> và <b>dễ đọc</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Điều quan trọng nhất khi chọn màu chữ là:',opts:['Màu thật nổi','Tương phản với nền','Giống màu nền','Nhiều màu'],ok:1}],
  key:['<b>Ngắn gọn – tương phản – thống nhất</b>.']}
];
const GHIBAI={so:'Bài 10a:',ten:'ĐỊNH DẠNG NÂNG CAO CHO TRANG CHIẾU',muc:[
 {step:2,h:'Văn bản trên trang chiếu',it:['<b>Ngắn gọn</b>, nêu ý chính.']},
 {step:3,h:'Màu sắc',it:['Màu <b>nóng</b>/ <b>lạnh</b> theo chủ đề; chữ – nền <b>tương phản</b>.']},
 {step:4,h:'Thông tin bổ sung',it:['<b>Insert → Header &amp; Footer</b>: ngày, số trang chiếu, chân trang.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.rutgon=function(){
  const P=[['Câu lạc bộ Tin học của trường chúng em được thành lập vào',' '],['ngày 20 tháng 11',1],[' với mục đích là giúp các bạn học sinh có cơ hội được tìm hiểu thêm về ',0],['lập trình, đồ hoạ, robot',1],[' và tạo ra các ',0],['sản phẩm sáng tạo',1],[' để tham gia các cuộc thi, đồng thời giúp các bạn ',0],['kết bạn, học hỏi',1],[' lẫn nhau trong suốt năm học.',0]];
  const e=_el(_shell('Rút gọn trang chiếu','Bấm vào <b>cụm chữ thừa</b> để gạch bỏ (cụm từ khoá được tô vàng nên giữ). Rồi bấm <b>✨ Chuyển thành gạch đầu dòng</b>.',
   `<div class="m8rg"><style>.m8rg .sl{aspect-ratio:16/9;max-width:560px;margin:10px auto;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border-radius:12px;padding:20px 26px;overflow:hidden;transition:font-size .4s}.m8rg .sl h4{margin:0 0 8px;color:#fde68a;font-size:1.3em}.m8rg span.w{cursor:pointer;border-radius:4px}.m8rg span.k{background:#fde68a55}.m8rg span.x{text-decoration:line-through;opacity:.35}.m8rg .meter{text-align:center;font-weight:700}</style>
    <div class="sl"><h4>Giới thiệu CLB Tin học</h4><div class="bd"></div></div><div class="meter"></div>
    <div class="sim-ctl" style="justify-content:center"><button class="btn acc bl">✨ Chuyển thành gạch đầu dòng</button><button class="btn ghost rs">↺</button></div></div>`));
  const bd=e.querySelector('.bd'), sl=e.querySelector('.sl'); let cut=new Set();
  function draw(){bd.innerHTML=P.map((p,i)=>`<span class="w ${p[1]===1?'k':''} ${cut.has(i)?'x':''}" data-i="${i}">${p[0]}</span>`).join('');
    const n=P.filter((p,i)=>!cut.has(i)).reduce((s,p)=>s+p[0].split(' ').filter(Boolean).length,0); sl.style.fontSize=(n>45?14:n>25?18:22)+'px';
    e.querySelector('.meter').textContent='Số chữ: '+n+(n>45?' 😵 quá dài':n>25?' 🙂 ổn hơn':' 🤩 gọn, dễ đọc');
    bd.querySelectorAll('.w').forEach(s=>s.onclick=()=>{const i=+s.dataset.i; cut.has(i)?cut.delete(i):cut.add(i); FX.play(P[i][1]===1?'drum':'tick'); draw();});}
  e.querySelector('.bl').onclick=()=>{bd.innerHTML='<ul style="font-size:1.3em;line-height:1.6;margin:0">'+['Thành lập: 20/11','Học: lập trình, đồ hoạ, robot','Tạo sản phẩm sáng tạo','Kết bạn, học hỏi'].map(x=>'<li>'+x+'</li>').join('')+'</ul>'; sl.style.fontSize='20px'; e.querySelector('.meter').textContent='Số chữ: 15 🤩 ngắn gọn, nêu ý chính!'; FX.play('sparkle');};
  e.querySelector('.rs').onclick=()=>{cut=new Set(); draw();}; draw(); return e;
};
SIMS_BAI.phoimau=function(){
  const C=[['#dc2626','Đỏ','n'],['#ea580c','Cam','n'],['#facc15','Vàng','n'],['#16a34a','Lục','l'],['#0891b2','Lục lam','l'],['#1d4ed8','Xanh dương','l'],['#6d28d9','Tím','l'],['#ffffff','Trắng',''],['#111827','Đen','']];
  const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)); return .2126*c[0]+.7152*c[1]+.0722*c[2];};
  const e=_el(_shell('Bánh xe phối màu','Chọn <b>màu nền</b> rồi <b>màu chữ</b>. Xem độ tương phản và gam màu.',
   `<div class="m8pm"><style>.m8pm .pal{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:4px 0}.m8pm .pal button{width:40px;height:40px;border-radius:50%;border:3px solid #e2e8f0;cursor:pointer}.m8pm .pal .on{border-color:#111;transform:scale(1.15)}.m8pm .sl{aspect-ratio:16/9;max-width:520px;margin:10px auto;border-radius:12px;display:grid;place-items:center;text-align:center;font:800 30px system-ui;box-shadow:0 3px 12px #0003;transition:.3s}.m8pm .ct{display:flex;gap:16px;justify-content:center;font-weight:700;flex-wrap:wrap}</style>
    <div><b>Nền:</b><div class="pal" data-t="bg">${C.map(c=>`<button data-c="${c[0]}" title="${c[1]}" style="background:${c[0]}"></button>`).join('')}</div></div>
    <div><b>Chữ:</b><div class="pal" data-t="fg">${C.map(c=>`<button data-c="${c[0]}" title="${c[1]}" style="background:${c[0]}"></button>`).join('')}</div></div>
    <div class="sl">LỄ RA MẮT<br>CLB TIN HỌC</div><div class="ct"></div></div>`));
  const o={bg:'#ffffff',fg:'#facc15'}, sl=e.querySelector('.sl');
  function draw(){sl.style.background=o.bg; sl.style.color=o.fg; const a=lum(o.bg),b=lum(o.fg), r=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    const g=C.find(c=>c[0]===o.bg)[2], gam=g==='n'?'🔥 Gam nóng: sôi động, rực rỡ':g==='l'?'❄️ Gam lạnh: nhẹ nhàng, tin cậy':'⚪ Màu trung tính';
    e.querySelector('.ct').innerHTML=`<span>Tương phản: ${r.toFixed(1)} ${r>=4.5?'✅ dễ đọc':r>=3?'🟡 tạm':'❌ khó đọc'}</span><span>${gam}</span>`;
    e.querySelectorAll('.pal').forEach(p=>p.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.c===o[p.dataset.t]))); return r;}
  e.querySelectorAll('.pal').forEach(p=>p.querySelectorAll('button').forEach(b=>b.onclick=()=>{o[p.dataset.t]=b.dataset.c; const r=draw(); FX.play(r>=4.5?'ding':'tick');}));
  draw(); return e;
};
