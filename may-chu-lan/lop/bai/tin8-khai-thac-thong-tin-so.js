/* Tin học 8 · Bài 3. Thông tin với giải quyết vấn đề (khai thác thông tin số) · 1 tiết.
   Tình huống: nhóm An làm bài trình chiếu về năng lượng tái tạo.
   Mô phỏng: "timkiem" (chọn từ khoá → kết quả), "nguontin" (cân độ tin cậy của nguồn). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Dự án năng lượng tái tạo',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Cô giao nhóm <b>An</b> làm bài trình chiếu về <b>năng lượng tái tạo</b> (điện gió, điện mặt trời…). Nhóm cần <b>tìm, đánh giá, sử dụng</b> thông tin số để giải quyết vấn đề.</p>',
  qs:[{id:'kd',type:'sort',q:'Việc nào cần làm khi khai thác thông tin để giải quyết vấn đề?',cols:{c0:'Nên làm',c1:'Không nên'},items:[
      {t:'Xác định rõ vấn đề cần tìm hiểu',a:'c0'},{t:'Chép nguyên văn bài đầu tiên tìm được',a:'c1'},{t:'Đánh giá độ tin cậy của nguồn',a:'c0'},{t:'Ghi lại nguồn tham khảo',a:'c0'},{t:'Tin mọi bình luận trên mạng',a:'c1'}]}],
  key:['Quy trình: <b>xác định vấn đề</b> → <b>tìm kiếm</b> → <b>đánh giá</b> → <b>tổ chức, trình bày, chia sẻ</b>.']},
 {t:'Chọn từ khoá thông minh',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',phut:10,
  story:'<p>An gõ “năng lượng” và nhận được hàng triệu kết quả lộn xộn. Em hãy <b>ghép từ khoá</b> trong mô phỏng để kết quả <b>ít và trúng</b> hơn.</p>',
  qs:[{id:'s1',type:'sim',sim:'timkiem'},
      {id:'tk1',type:'single',q:'Quan sát: thêm từ khoá cụ thể, đặt cụm từ trong dấu ngoặc kép thì kết quả…',opts:['Nhiều hơn, lộn xộn hơn','Ít hơn và sát vấn đề hơn','Không thay đổi','Biến mất hết'],ok:1},
      {id:'tk2',type:'single',q:'Từ khoá nào tốt nhất để tìm <b>quy hoạch điện gió, điện mặt trời ở Việt Nam</b>?',opts:['năng lượng','điện','“quy hoạch điện” điện gió điện mặt trời Việt Nam','hình ảnh đẹp'],ok:2}],
  key:['Từ khoá <b>cụ thể</b>, dùng <b>“ngoặc kép”</b> cho cụm từ → kết quả <b>sát</b> vấn đề.']},
 {t:'Nguồn nào đáng tin?',hd:'Hình thành kiến thức · Hoạt động 2 · 12 phút',code:'2.2',phut:12,
  story:'<p>Nhóm tìm được nhiều trang nói về tỉ lệ điện gió, điện mặt trời. Đặt từng nguồn lên <b>cân tin cậy</b> trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'nguontin'},
      {id:'ng1',type:'single',q:'Thông tin quy hoạch nguồn điện Việt Nam đáng tin nhất ở đâu?',opts:['Diễn đàn trao đổi ẩn danh','Trang web của Bộ Công Thương / văn bản Chính phủ','Video không rõ người đăng','Blog quảng cáo pin mặt trời'],ok:1},
      {id:'ng2',type:'tf',q:'Đánh giá lợi ích của thông tin: Đúng hay sai?',items:[{t:'Cần xem thông tin có đúng vấn đề đang tìm hiểu không',a:'T'},{t:'Thông tin cũ 20 năm vẫn luôn dùng được',a:'F'},{t:'Nên đối chiếu nhiều nguồn',a:'T'}]}],
  key:['Nguồn tin cậy: <b>cơ quan nhà nước, tổ chức uy tín, báo chính thống, nhà sản xuất</b>.','Đánh giá: <b>đúng vấn đề, mới, đầy đủ, chính xác</b>.']},
 {t:'Tổ chức bài trình chiếu',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Thông tin đã có. Giờ sắp xếp thành bài trình chiếu, mỗi trang không quá 6 dòng.</p>',
  qs:[{id:'lt1',type:'match',q:'Ghép trang với nội dung phù hợp.',items:['Trang 1','Trang 2','Trang 3','Trang 4'],opts:['Thực trạng năng lượng tái tạo ở Việt Nam','Tiêu đề: Năng lượng tái tạo','Kết luận, nguồn tham khảo','Lợi ích của năng lượng tái tạo'],ok:[1,3,0,2]},
      {id:'lt2',type:'single',q:'Tìm hiểu cách dùng máy ảnh mới, nguồn nào tin cậy nhất?',opts:['Hướng dẫn sử dụng của nhà sản xuất','Lời kể của hàng xóm','Bình luận trên chợ mạng','Đoán thử'],ok:0}],
  key:['Trình bày: <b>tiêu đề → nội dung chính → kết luận + nguồn</b>.']},
 {t:'Chia sẻ sản phẩm',hd:'Vận dụng · 6 phút',code:'4',phut:6,
  qs:[{id:'vd1',type:'multi',q:'Có thể chia sẻ bài trình chiếu qua phương tiện số nào?',opts:['Thư điện tử','Ổ đĩa trực tuyến (chia sẻ liên kết)','Nhóm lớp trên mạng xã hội','Bồ câu đưa thư'],ok:[0,1,2]},
      {id:'vd2',type:'text',q:'Tìm thông tin về một nghệ sĩ/đội bóng em hâm mộ: em sẽ dùng nguồn nào, vì sao? (1–2 câu)',ans:'Trang chính thức của đội bóng/nghệ sĩ, báo thể thao chính thống vì có tác giả, cập nhật và uy tín.'}],
  key:['Chia sẻ qua <b>email, ổ đĩa trực tuyến, mạng xã hội</b>; ghi rõ <b>nguồn</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Bước nào giúp tránh dùng nhầm thông tin sai?',opts:['Tìm kiếm thật nhanh','Đánh giá độ tin cậy, lợi ích của thông tin','Chọn kết quả đầu tiên','Copy toàn bộ'],ok:1}],
  key:['Khai thác thông tin số: <b>tìm – đánh giá – sử dụng – chia sẻ</b>.']}
];
const GHIBAI={so:'Bài 3:',ten:'THÔNG TIN VỚI GIẢI QUYẾT VẤN ĐỀ',muc:[
 {step:2,h:'Quy trình',it:[],flow:['Xác định vấn đề','Tìm kiếm','Đánh giá','Trình bày, chia sẻ']},
 {step:3,h:'Tìm kiếm',it:['Từ khoá <b>cụ thể</b>, cụm từ trong <b>“ngoặc kép”</b>.']},
 {step:4,h:'Đánh giá',it:['Nguồn <b>tin cậy</b>; thông tin <b>đúng vấn đề, mới, chính xác</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.timkiem=function(){
  const K=[['nl','năng lượng',0],['tt','tái tạo',1],['gio','điện gió',2],['mt','điện mặt trời',2],['vn','Việt Nam',2],['qh','“quy hoạch điện”',3],['an','ăn uống',-9]];
  const e=_el(_shell('Máy tìm kiếm của An','Bấm các <b>từ khoá</b> để thêm/bớt, quan sát số kết quả và độ “trúng”.',
   `<div class="m8tk"><style>.m8tk .kw{display:flex;flex-wrap:wrap;gap:8px}.m8tk .kw button{border:2px solid #93c5fd;background:#fff;border-radius:999px;padding:8px 14px;font-weight:700;cursor:pointer}.m8tk .kw .on{background:#2563eb;color:#fff}.m8tk .bar{margin:12px 0;border:2px solid #cbd5e1;border-radius:999px;padding:10px 16px;font:600 17px system-ui;background:#fff}.m8tk .meta{display:flex;gap:14px;flex-wrap:wrap;font-weight:700}.m8tk .res div{border-left:4px solid #2563eb;padding:6px 10px;margin:6px 0;background:#f8fafc;border-radius:6px}</style>
    <div class="kw">${K.map(k=>`<button data-k="${k[0]}">${k[1]}</button>`).join('')}</div>
    <div class="bar">🔍 <span class="q"></span></div><div class="meta"><span class="n"></span><span class="t"></span></div><div class="res"></div></div>`));
  const on=new Set(['nl']);
  function upd(){const ks=K.filter(k=>on.has(k[0])), sc=ks.reduce((s,k)=>s+k[2],0);
    e.querySelectorAll('.kw button').forEach(b=>b.classList.toggle('on',on.has(b.dataset.k)));
    e.querySelector('.q').textContent=ks.map(k=>k[1]).join(' ')||'(trống)';
    const n=ks.length?Math.max(120,Math.round(48000000/Math.pow(6,ks.length+(sc>3?1:0)))):0, pct=Math.max(0,Math.min(100,sc*12+10));
    e.querySelector('.n').textContent='≈ '+n.toLocaleString('vi')+' kết quả';
    e.querySelector('.t').innerHTML='Độ trúng: '+'⭐'.repeat(Math.round(pct/20))+(sc<0?' ❌ lạc đề':'');
    const R=sc<0?['Món ăn ngon mỗi ngày','Cách nấu phở']:sc<2?['Năng lượng là gì? – Từ điển','Nước tăng lực năng lượng','Năng lượng tích cực trong cuộc sống']:sc<6?['Năng lượng tái tạo là gì – Bách khoa','Điện gió và điện mặt trời trên thế giới','Lợi ích của năng lượng sạch']:['Quy hoạch điện VIII – Bộ Công Thương','Tỉ lệ điện gió, mặt trời trong cơ cấu nguồn điện Việt Nam','Báo cáo năng lượng tái tạo Việt Nam'];
    e.querySelector('.res').innerHTML=R.map(r=>`<div>🔗 ${r}</div>`).join('');}
  e.querySelectorAll('.kw button').forEach(b=>b.onclick=()=>{on.has(b.dataset.k)?on.delete(b.dataset.k):on.add(b.dataset.k); FX.play('tick'); upd();});
  upd(); return e;
};
SIMS_BAI.nguontin=function(){
  const S=[['🏛️ Bộ Công Thương (moit.gov.vn)',95],['📰 Báo điện tử chính thống',80],['📚 Bách khoa toàn thư mở',60],['🛒 Blog bán pin mặt trời',35],['💬 Diễn đàn ẩn danh',20],['🎬 Video không rõ người đăng',10]];
  const e=_el(_shell('Cân độ tin cậy','Bấm từng <b>nguồn</b> để đặt lên cân. Kim chỉ độ tin cậy.',
   `<div class="m8nt"><style>.m8nt .g{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:center}.m8nt .ls button{display:block;width:100%;margin:6px 0;text-align:left;border:2px solid #e2e8f0;background:#fff;border-radius:12px;padding:10px;font-weight:600;cursor:pointer}.m8nt .ls .on{border-color:#7c3aed;background:#f5f3ff}.m8nt svg{width:100%}.m8nt .v{text-align:center;font:800 20px system-ui}@media(max-width:560px){.m8nt .g{grid-template-columns:1fr}}</style>
    <div class="g"><div class="ls">${S.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join('')}</div>
    <div><svg viewBox="0 0 200 120"><path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="url(#m8ntg)" stroke-width="18"/><defs><linearGradient id="m8ntg"><stop offset="0" stop-color="#ef4444"/><stop offset=".5" stop-color="#eab308"/><stop offset="1" stop-color="#22c55e"/></linearGradient></defs><line class="kim" x1="100" y1="110" x2="100" y2="40" stroke="#1e293b" stroke-width="5" stroke-linecap="round" style="transition:transform .6s;transform-origin:100px 110px;transform:rotate(-90deg)"/><circle cx="100" cy="110" r="8" fill="#1e293b"/></svg><div class="v">Chọn một nguồn</div></div></div></div>`));
  e.querySelectorAll('.ls button').forEach(b=>b.onclick=()=>{const s=S[+b.dataset.i]; e.querySelectorAll('.ls button').forEach(x=>x.classList.toggle('on',x===b));
    e.querySelector('.kim').style.transform=`rotate(${-90+s[1]*1.8}deg)`; const v=e.querySelector('.v');
    v.textContent=s[1]>=75?'✅ Rất tin cậy':s[1]>=50?'🟡 Tham khảo, cần đối chiếu':'⚠️ Kém tin cậy'; v.style.color=s[1]>=75?'#15803d':s[1]>=50?'#a16207':'#b91c1c'; FX.play(s[1]>=75?'ding':'tick');});
  return e;
};
