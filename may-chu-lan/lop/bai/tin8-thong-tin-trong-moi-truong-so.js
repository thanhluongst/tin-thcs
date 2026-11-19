/* Tin học 8 · Bài 2. Thông tin trong môi trường số · 1 tiết.
   Tình huống: bức ảnh ruộng bậc thang Khoa gửi An.
   Mô phỏng: "guianh" (gửi ảnh qua nhiều đường – bản sao nhân lên), "tingia" (thám tử tin giả). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Bức ảnh đi đâu?',hd:'Khởi động · 7 phút',code:'1',phut:7,
  story:'<p><b>Khoa</b> chụp bức ảnh ruộng bậc thang rất đẹp và muốn gửi cho <b>An</b>. Em hãy thử gửi ảnh bằng nhiều cách trong mô phỏng, đếm xem có <b>bao nhiêu bản</b> của bức ảnh tồn tại.</p>',
  qs:[{id:'s1',type:'sim',sim:'guianh'},
      {id:'g1',type:'single',q:'Sau khi An nhận ảnh, Khoa có bị mất ảnh gốc không?',opts:['Có, ảnh chuyển hẳn sang máy An','Không, Khoa vẫn giữ ảnh gốc; An có một bản sao','Ảnh bị chia đôi','Chỉ mất khi gửi qua email'],ok:1},
      {id:'g2',type:'multi',q:'An có thể lưu ảnh vào những nơi nào? (chọn nhiều)',opts:['Điện thoại, máy tính','USB, thẻ nhớ','Ổ đĩa trực tuyến (Google Drive…)','Tờ giấy nháp'],ok:[0,1,2]}],
  key:['Thông tin số dễ dàng được <b>nhân bản</b> và <b>lan truyền</b>; người gửi vẫn giữ bản gốc.']},
 {t:'Đặc điểm của thông tin số',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>Nhìn lại mô phỏng: ảnh nằm trên <b>máy chủ</b> email, trên <b>mạng xã hội</b>, có thể bị <b>chỉnh sửa</b> rồi gửi tiếp. Rất khó xoá hết mọi bản sao.</p>',
  qs:[{id:'dd',type:'tf',q:'Đúng hay sai về thông tin số?',items:[
      {t:'Dễ dàng được nhân bản và lan truyền nhanh',a:'T'},{t:'Khó bị xoá bỏ hoàn toàn',a:'T'},{t:'Có thể được truy cập từ xa',a:'T'},{t:'Không thể bị chỉnh sửa',a:'F'},{t:'Luôn đáng tin cậy',a:'F'}]},
      {id:'dd2',type:'single',q:'Thông tin số được lưu trữ với dung lượng rất lớn bởi…',opts:['Chỉ cơ quan nhà nước','Nhiều tổ chức và cá nhân, trên nhiều thiết bị','Chỉ người tạo ra nó','Chỉ máy tính ở trường'],ok:1}],
  key:['Thông tin số: <b>nhân bản, lan truyền</b> nhanh, <b>khó xoá</b>, có thể <b>truy cập từ xa</b>, được lưu trữ lớn, <b>độ tin cậy khác nhau</b>.']},
 {t:'Thám tử tin giả',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Nhóm lớp nhận được nhiều tin “nóng”. Em là <b>thám tử</b>: soi từng dấu hiệu (nguồn, tác giả, ngày đăng, lời lẽ) rồi phán quyết <b>Tin thật</b> hay <b>Tin giả</b>.</p>',
  qs:[{id:'s2',type:'sim',sim:'tingia'},
      {id:'tg1',type:'multi',q:'Dấu hiệu nào giúp nhận ra tin <b>có thể là giả</b>?',opts:['Không rõ nguồn, không có tác giả','Tiêu đề giật gân, kêu gọi “chia sẻ ngay”','Đăng trên trang web chính thức của cơ quan nhà nước','Nội dung không khớp với các nguồn uy tín khác'],ok:[0,1,3]},
      {id:'tg2',type:'single',q:'Khi gặp một tin đáng ngờ, em nên…',opts:['Chia sẻ ngay cho mọi người biết','Kiểm tra lại ở nguồn chính thống trước khi tin hay chia sẻ','Bình luận chê bai','Bỏ qua mọi tin trên mạng'],ok:1}],
  key:['Đánh giá độ tin cậy: <b>nguồn</b>, <b>tác giả</b>, <b>thời gian</b>, đối chiếu <b>nhiều nguồn</b>.','Tin giả gây <b>hoang mang, thiệt hại</b> — không chia sẻ khi chưa kiểm chứng.']},
 {t:'Ứng dụng thu thập thông tin',hd:'Luyện tập · 7 phút',code:'3',phut:7,
  story:'<p>Nhiều ứng dụng thu thập thông tin của người dùng: vị trí, danh bạ, lịch sử xem…</p>',
  qs:[{id:'lt1',type:'sort',q:'Nguồn thông tin nào <b>tin cậy hơn</b>?',cols:{c0:'Tin cậy hơn',c1:'Cần kiểm chứng'},items:[
      {t:'Cổng thông tin Bộ Y tế',a:'c0'},{t:'Bài đăng ẩn danh trên nhóm chat',a:'c1'},{t:'Báo điện tử chính thống',a:'c0'},{t:'Video “bí mật động trời” không rõ ai làm',a:'c1'},{t:'Bình luận của người lạ',a:'c1'}]},
      {id:'lt2',type:'single',q:'Ứng dụng bản đồ thu thập vị trí của em để làm gì là hợp lí nhất?',opts:['Chỉ đường, báo tắc đường','Đăng vị trí lên mạng xã hội','Bán cho người lạ','Không để làm gì'],ok:0}],
  key:['Ứng dụng thu thập thông tin để <b>phục vụ người dùng</b>, nhưng em cần <b>cân nhắc quyền truy cập</b>.']},
 {t:'Tin đồn quanh em',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  story:'<p>Có tin đồn: <i>“Mai trường nghỉ học vì bão!”</i> lan trong nhóm lớp.</p>',
  qs:[{id:'vd1',type:'text',q:'Em sẽ kiểm tra tin này thế nào trước khi báo cho bố mẹ? (1–2 câu)',ans:'Xem thông báo chính thức của nhà trường/Sở GD, hỏi giáo viên chủ nhiệm; không chia sẻ khi chưa xác thực.'}],
  key:['Kiểm chứng ở <b>nguồn chính thức</b> trước khi tin và chia sẻ.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Đặc điểm nào <b>không</b> phải của thông tin số?',opts:['Dễ nhân bản','Lan truyền nhanh','Luôn chính xác tuyệt đối','Khó xoá bỏ hoàn toàn'],ok:2}],
  key:['Thông tin số tiện lợi nhưng <b>cần đánh giá độ tin cậy</b>.']}
];
const GHIBAI={so:'Bài 2:',ten:'THÔNG TIN TRONG MÔI TRƯỜNG SỐ',muc:[
 {step:3,h:'Đặc điểm thông tin số',it:['Dễ <b>nhân bản, lan truyền</b>; <b>khó xoá</b>; truy cập <b>từ xa</b>.','Được nhiều tổ chức, cá nhân lưu trữ với dung lượng <b>rất lớn</b>.']},
 {step:4,h:'Độ tin cậy',it:['Xem <b>nguồn, tác giả, thời gian</b>; đối chiếu nhiều nguồn.','Không chia sẻ <b>tin giả</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.guianh=function(){
  const W=[['email','📧 Email','Máy chủ email',1],['zalo','💬 Zalo/Messenger','Máy chủ tin nhắn',1],['usb','💾 USB','—',0],['mxh','🌐 Đăng mạng xã hội','Máy chủ MXH + bạn bè xem',3]];
  const e=_el(_shell('Gửi bức ảnh ruộng bậc thang','Chọn cách gửi rồi bấm <b>📤 Gửi</b>. Đếm số bản ảnh xuất hiện. Thử <b>✏️ Chỉnh sửa</b> ảnh ở máy An.',
   `<div class="m8ga"><style>.m8ga .row{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.m8ga .dev{flex:1;min-width:120px;border:2px dashed #94a3b8;border-radius:14px;padding:10px;text-align:center;min-height:90px;background:#f8fafc}.m8ga .dev b{display:block}.m8ga .pic{display:inline-block;font-size:28px;animation:m8gapop .4s}.m8ga .ed{filter:hue-rotate(160deg)}@keyframes m8gapop{from{transform:scale(0)}to{transform:scale(1)}}.m8ga .cnt{font:800 22px system-ui;text-align:center;color:#0f766e}</style>
    <div class="sim-ctl">${_seg('w',W.map(w=>[w[0],w[1]]),'email')}<button class="btn acc go">📤 Gửi</button><button class="btn ghost edit">✏️ Chỉnh sửa ở máy An</button><button class="btn ghost rs">↺</button></div>
    <div class="row"><div class="dev" data-d="khoa"><b>📱 Máy Khoa</b></div><div class="dev" data-d="sv"><b>🗄️ Máy chủ / mạng</b></div><div class="dev" data-d="an"><b>💻 Máy An</b></div><div class="dev" data-d="ban"><b>👥 Bạn bè</b></div></div>
    <div class="cnt"></div></div>`));
  let w='email'; _wireSeg(e,(n,v)=>w=v);
  const add=(d,cls)=>{const s=document.createElement('span'); s.className='pic '+(cls||''); s.textContent='🏞️'; e.querySelector(`[data-d="${d}"]`).appendChild(s);};
  const cnt=()=>{const n=e.querySelectorAll('.pic').length; e.querySelector('.cnt').textContent='Số bản ảnh đang tồn tại: '+n+(n>3?' — rất khó xoá hết!':'');};
  const rs=()=>{e.querySelectorAll('.pic').forEach(p=>p.remove()); add('khoa'); cnt();};
  e.querySelector('.go').onclick=()=>{const x=W.find(a=>a[0]===w); FX.play('whoosh');
    for(let i=0;i<x[3];i++) add('sv'); add('an'); if(w==='mxh'){add('ban');add('ban');} setTimeout(()=>{FX.play('ding');cnt();},200);};
  e.querySelector('.edit').onclick=()=>{if(!e.querySelector('[data-d="an"] .pic')){e.querySelector('.cnt').textContent='Máy An chưa có ảnh – hãy gửi trước!';return;} add('an','ed'); add('ban','ed'); FX.play('sparkle'); cnt(); e.querySelector('.cnt').textContent+=' (ảnh đã sửa cũng lan truyền tiếp)';};
  e.querySelector('.rs').onclick=rs; rs(); return e;
};
SIMS_BAI.tingia=function(){
  const T=[{h:'CỰC SỐC!!! Ăn tỏi sống chữa khỏi mọi bệnh, chia sẻ ngay kẻo muộn!',src:'Trang “Sức khoẻ 24h vip” (không rõ)',tg:'Không có',ng:'Không có ngày',ld:'Giật gân, ép chia sẻ',f:1},
    {h:'Bộ GD&ĐT công bố lịch thi tốt nghiệp THPT năm nay',src:'moet.gov.vn',tg:'Văn phòng Bộ',ng:'12/03',ld:'Trung tính, có văn bản kèm',f:0},
    {h:'Ảnh: cá mập bơi trên đường phố Hà Nội sau mưa',src:'Tài khoản lạ mới lập hôm qua',tg:'Ẩn danh',ng:'Không rõ',ld:'Ảnh ghép, không nguồn khác đưa tin',f:1},
    {h:'Trung tâm Khí tượng: bão số 3 đổ bộ Quảng Ninh chiều mai',src:'nchmf.gov.vn',tg:'Trung tâm Dự báo KTTV',ng:'Hôm nay',ld:'Có số liệu, nhiều báo cùng đưa',f:0},
    {h:'Nhắn tin này cho 10 người để nhận thẻ cào 500k miễn phí',src:'Tin nhắn chuyển tiếp',tg:'Không rõ',ng:'—',ld:'Hứa hẹn quà, đòi chuyển tiếp',f:1}];
  const e=_el(_shell('Thám tử tin giả','Bấm <b>🔍 Soi</b> từng dấu hiệu, rồi phán quyết. Điểm thám tử ghi bên dưới.',
   `<div class="m8tg"><style>.m8tg .card{border-radius:16px;padding:16px;background:#fff7ed;border:2px solid #fdba74}.m8tg h4{margin:0 0 10px;font-size:19px}.m8tg .clues{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.m8tg .clues button{border:2px solid #e2e8f0;border-radius:10px;background:#fff;padding:8px;cursor:pointer;font-size:13px;min-height:64px}.m8tg .clues button.op{background:#fef9c3}.m8tg .vd{display:flex;gap:10px;justify-content:center;margin:12px 0}.m8tg .vd button{font-size:18px;padding:12px 22px}.m8tg .msg{text-align:center;font-weight:700;min-height:24px}@media(max-width:560px){.m8tg .clues{grid-template-columns:1fr 1fr}}</style>
    <div class="card"><div class="no"></div><h4></h4><div class="clues"></div></div>
    <div class="vd"><button class="btn" style="background:#16a34a" data-v="0">✅ Tin thật</button><button class="btn" style="background:#dc2626" data-v="1">🚫 Tin giả</button></div><div class="msg"></div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Tin</th><th>Em chọn</th><th>Kết quả</th></tr></table></div>`));
  let i=0; const hist=[];
  function show(){const t=T[i%T.length]; e.querySelector('.no').textContent='Tin '+(i%T.length+1)+'/'+T.length; e.querySelector('h4').textContent='📰 '+t.h;
    e.querySelector('.clues').innerHTML=[['🌐 Nguồn',t.src],['✍️ Tác giả',t.tg],['📅 Ngày đăng',t.ng],['🗣️ Lời lẽ',t.ld]].map(c=>`<button data-x="${c[1]}">${c[0]}<br><small>🔍 Soi</small></button>`).join('');
    e.querySelectorAll('.clues button').forEach(b=>b.onclick=()=>{b.innerHTML=b.innerHTML.split('<br>')[0]+'<br><b>'+b.dataset.x+'</b>'; b.classList.add('op'); FX.play('tick');});}
  e.querySelectorAll('.vd button').forEach(b=>b.onclick=()=>{const t=T[i%T.length], ok=+b.dataset.v===t.f, m=e.querySelector('.msg');
    m.innerHTML=ok?'🎉 Chính xác, thám tử giỏi!':'❌ Chưa đúng: '+(t.f?'đây là tin giả':'đây là tin từ nguồn chính thống'); m.style.color=ok?'#15803d':'#b91c1c';
    hist.unshift([t.h.slice(0,32)+'…',t.f===+b.dataset.v?(t.f?'Giả':'Thật'):(+b.dataset.v?'Giả':'Thật'),ok?'Đúng':'Sai']); histTable(e,hist,(v,j)=>j===2?(v==='Đúng'?'g':'r'):'');
    FX.play(ok?'ding':'tick'); i++; setTimeout(show,900);});
  show(); return e;
};
