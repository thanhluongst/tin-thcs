/* Tin học 8 · Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu · 1 tiết.
   Tình huống: bài trình chiếu “An toàn trong phòng thực hành” (AnToanPhongThucHanh.pptx).
   Mô phỏng: "banmau" (so sánh Theme và Template – tạo bài trình chiếu trong vài giây). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trang chiếu đẹp trong 1 phút?',hd:'Khởi động · 6 phút',code:'1',phut:6,
  story:'<p>Cô giao nhóm làm bài trình chiếu <b>“An toàn trong phòng thực hành”</b> chỉ trong 1 tiết. Bạn Minh tự thiết kế từng trang thì mất cả buổi. Bạn An có cách nhanh hơn: dùng <b>bản mẫu</b>.</p>',
  qs:[{id:'kd',type:'single',q:'Để tạo nhanh các trang chiếu đẹp, có bố cục và nội dung gợi ý sẵn, em dùng:',opts:['Tự vẽ từng trang','Bản mẫu (Template)','Chỉ đổi phông chữ','Chèn bảng'],ok:1}],
  key:['Phần mềm trình chiếu có <b>bản mẫu</b> giúp tạo bài trình chiếu <b>nhanh, đẹp</b>.']},
 {t:'Mẫu định dạng hay bản mẫu?',hd:'Hình thành kiến thức · Hoạt động 1 · 15 phút',code:'2.1',phut:15,
  story:'<p>Trong mô phỏng, thử tạo bài trình chiếu bằng <b>Theme</b> (mẫu định dạng) rồi bằng <b>Template</b> (bản mẫu). So sánh: có gì giống, có gì khác?</p>',
  qs:[{id:'s1',type:'sim',sim:'banmau'},
      {id:'b1',type:'sort',q:'Thành phần nào có ở cả hai, thành phần nào chỉ bản mẫu có?',cols:{c0:'Có ở cả Theme và Template',c1:'Chỉ Template có'},items:[{t:'Màu sắc, phông chữ',a:'c0'},{t:'Hình nền, bố cục',a:'c0'},{t:'Nội dung gợi ý, hướng dẫn sẵn',a:'c1'},{t:'Nhiều trang chiếu mẫu cho một chủ đề',a:'c1'}]},
      {id:'b2',type:'single',q:'Bản mẫu được lưu dưới dạng tệp có phần mở rộng:',opts:['.pptx','.potx','.docx','.xlsx'],ok:1},
      {id:'b3',type:'single',q:'Bản mẫu khác mẫu định dạng ở chỗ:',opts:['Bản mẫu chỉ có màu nền','Bản mẫu có thêm nội dung gợi ý, nhiều trang theo chủ đề','Không khác gì','Mẫu định dạng có nội dung gợi ý'],ok:1}],
  key:['<b>Theme</b>: màu, phông, nền, bố cục. <b>Template</b> (.potx): Theme + <b>nội dung gợi ý</b> theo chủ đề.','<b>File → New</b> → chọn bản mẫu → <b>Create</b>.']},
 {t:'Các bước dùng bản mẫu',hd:'Hình thành kiến thức · Hoạt động 2 · 7 phút',code:'2.2',phut:7,
  qs:[{id:'bb',type:'match',q:'Ghép bước với thao tác.',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Chọn bản mẫu phù hợp, nháy Create','File → New','Thay nội dung gợi ý bằng nội dung của em, xoá trang không cần','Lưu tệp .pptx'],ok:[1,0,2,3]},
      {id:'lk',type:'single',q:'Đưa đường dẫn đến video NhungSuCoPhongThucHanh.mp4 vào trang tiêu đề, em dùng:',opts:['Insert → Link (Hyperlink)','Home → Bold','Design → Themes','View → Zoom'],ok:0}],
  key:['<b>File → New → bản mẫu → Create</b> → sửa nội dung → lưu.','<b>Insert → Link</b>: tạo đường dẫn đến tệp, trang web.']},
 {t:'Luyện tập',hd:'Luyện tập · 6 phút',code:'3',phut:6,
  qs:[{id:'lt',type:'tf',q:'Đúng hay sai?',items:[{t:'Có thể thay đổi nội dung, hình ảnh trong bản mẫu',a:'T'},{t:'Bản mẫu chỉ có trong máy, không tải được trên mạng',a:'F'},{t:'Có thể xoá bớt các trang chiếu mẫu không cần',a:'T'}]}],
  key:['Bản mẫu là <b>điểm khởi đầu</b>, em được <b>tuỳ chỉnh</b>.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Em sẽ dùng bản mẫu nào để làm bài trình chiếu giới thiệu trường em? Em sẽ sửa những gì?',ans:'VD: bản mẫu giáo dục/giới thiệu; thay tiêu đề, ảnh trường, nội dung, xoá trang thừa.'}],
  key:['Chọn bản mẫu <b>phù hợp chủ đề</b>.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Lợi ích lớn nhất của bản mẫu:',opts:['Tiết kiệm thời gian, có bố cục và gợi ý sẵn','Làm tệp nặng hơn','Không cần nội dung','Tự trình bày thay em'],ok:0}],
  key:['Bản mẫu: <b>nhanh, đẹp, có gợi ý nội dung</b>.']}
];
const GHIBAI={so:'Bài 11a:',ten:'SỬ DỤNG BẢN MẪU TẠO BÀI TRÌNH CHIẾU',muc:[
 {step:2,h:'Bản mẫu (Template)',it:['= mẫu định dạng (màu, phông, nền) + <b>nội dung gợi ý</b>; tệp <b>.potx</b>.']},
 {step:3,h:'Các bước',it:[],flow:['File → New','Chọn bản mẫu','Create','Sửa nội dung, lưu']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.banmau=function(){
  const TH={a:['#0f766e','#ccfbf1','Teal'],b:['#9a3412','#ffedd5','Cam'],c:['#1e3a8a','#dbeafe','Xanh']};
  const TP=['An toàn trong phòng thực hành','1. Nội quy phòng máy','2. An toàn điện','3. Sự cố thường gặp','4. Cách xử lí'];
  const e=_el(_shell('Tạo bài trình chiếu','Chọn <b>Theme</b> hoặc <b>Template</b>, chọn mẫu màu, bấm <b>Create</b>. Đồng hồ đo thời gian bạn phải tự làm thêm.',
   `<div class="m8bm"><style>.m8bm .row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:12px 0}.m8bm .sl{width:150px;aspect-ratio:16/9;border-radius:6px;box-shadow:0 2px 8px #0003;padding:8px;font-size:11px;overflow:hidden;animation:m8bmi .4s both}.m8bm .sl b{display:block;font-size:12px;margin-bottom:4px}.m8bm .sl i{display:block;height:4px;border-radius:2px;margin:3px 0;opacity:.5}@keyframes m8bmi{from{transform:translateY(20px);opacity:0}}.m8bm .tm{text-align:center;font:800 18px system-ui}</style>
    <div class="sim-ctl"><div>${_seg('k',[['theme','🎨 Theme (mẫu định dạng)'],['tpl','📦 Template (bản mẫu)']],'theme')}</div><div>${_seg('c',Object.entries(TH).map(([k,v])=>[k,v[2]]),'a')}</div><button class="btn acc go">Create</button></div>
    <div class="row"></div><div class="tm"></div></div>`));
  let k='theme', c='a'; _wireSeg(e,(n,v)=>{if(n==='k')k=v; else c=v;});
  e.querySelector('.go').onclick=()=>{const t=TH[c], row=e.querySelector('.row'); FX.play('whoosh');
    const n=k==='tpl'?5:1; row.innerHTML=Array.from({length:n},(x,i)=>`<div class="sl" style="background:linear-gradient(135deg,${t[1]},#fff);border-top:8px solid ${t[0]};color:${t[0]};animation-delay:${i*.12}s">${k==='tpl'?`<b>${TP[i]}</b>${i?'<i style="background:'+t[0]+'"></i><i style="background:'+t[0]+';width:70%"></i><small>✏️ Gõ nội dung của em…</small>':'<small>Nhóm …, lớp 8A</small>'}`:'<b>Nhấp để thêm tiêu đề</b><small>(trống – tự nghĩ bố cục, nội dung)</small>'}</div>`).join('');
    e.querySelector('.tm').textContent=k==='tpl'?'⏱ Có sẵn 5 trang theo chủ đề + nội dung gợi ý → chỉ cần sửa ~10 phút':'⏱ Chỉ có màu, phông, nền → tự thêm trang, nghĩ nội dung ~40 phút';
    setTimeout(()=>FX.play(k==='tpl'?'sparkle':'tick'),400);};
  return e;
};
