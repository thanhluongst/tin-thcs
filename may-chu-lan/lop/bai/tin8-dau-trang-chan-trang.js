/* Tin học 8 · Bài 9a. Đầu trang, chân trang · 1 tiết.
   Tình huống: tài liệu dự án CLB Tin học (CLBTinhoc.docx) nhiều trang.
   Mô phỏng: "dautrang" (bật Header/Footer/Page Number, xem 3 trang văn bản). */
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Hai trang văn bản khác gì nhau?',hd:'Khởi động · 5 phút',code:'1',phut:5,
  story:'<p>Tài liệu dự án CLB Tin học dài nhiều trang. In ra rồi rơi lẫn lộn, An không biết trang nào trước, trang nào sau, của tài liệu nào. Quan sát các cuốn sách: phía <b>trên</b> và <b>dưới</b> mỗi trang thường có gì?</p>',
  qs:[{id:'kd',type:'multi',q:'Trong sách giáo khoa, ở lề trên/lề dưới mỗi trang thường có:',opts:['Số trang','Tên chương, tên bài','Tên sách hoặc nhà xuất bản','Toàn bộ nội dung bài'],ok:[0,1,2]}],
  key:['Lề trên, lề dưới trang thường có <b>số trang</b>, <b>tên tài liệu</b>, <b>tên chương</b>…']},
 {t:'Thiết kế đầu trang, chân trang',hd:'Hình thành kiến thức · Hoạt động 1 · 15 phút',code:'2.1',phut:15,
  story:'<p>Trong mô phỏng: chọn mẫu <b>Header</b>, nhập nội dung; chọn <b>Footer</b>; chèn <b>Page Number</b> ở vị trí em muốn. Quan sát: thông tin xuất hiện ở <b>mọi trang</b>.</p>',
  qs:[{id:'s1',type:'sim',sim:'dautrang'},
      {id:'d1',type:'single',q:'Quan sát: nội dung đầu trang chỉ gõ một lần nhưng…',opts:['Chỉ hiện ở trang 1','Tự động hiện ở mọi trang','Chỉ hiện khi in','Hiện ở trang cuối'],ok:1},
      {id:'d2',type:'single',q:'Page Number → Bottom of Page → Plain Number 2 đặt số trang ở:',opts:['Đầu trang, bên trái','Chân trang, ở giữa','Chân trang, bên phải','Lề trái'],ok:1},
      {id:'d3',type:'sort',q:'Thông tin nào thường đặt ở đầu/chân trang, thông tin nào ở nội dung?',cols:{c0:'Đầu trang / chân trang',c1:'Nội dung văn bản'},items:[{t:'Số trang',a:'c0'},{t:'Tên tài liệu, logo',a:'c0'},{t:'Các mục trình bày kế hoạch dự án',a:'c1'},{t:'Tên tác giả, ngày tháng',a:'c0'},{t:'Bảng phân công công việc',a:'c1'}]}],
  key:['<b>Đầu trang (Header)</b>, <b>chân trang (Footer)</b>: thông tin <b>lặp lại ở mọi trang</b>.','<b>Insert → Header / Footer / Page Number</b>.']},
 {t:'Đúng hay sai?',hd:'Hình thành kiến thức · Hoạt động 2 · 7 phút',code:'2.2',phut:7,
  qs:[{id:'ds',type:'tf',q:'Mỗi phương án đúng hay sai?',items:[{t:'Đầu trang, chân trang giúp văn bản chuyên nghiệp, dễ theo dõi',a:'T'},{t:'Số trang phải gõ tay ở từng trang',a:'F'},{t:'Có thể chèn hình ảnh vào đầu trang',a:'T'},{t:'Nháy đúp vào vùng đầu trang để chỉnh sửa',a:'T'}]},
      {id:'s44',type:'single',q:'Phương án <b>SAI</b>:',opts:['Số trang có thể đặt ở đầu hoặc chân trang','Số trang tự động tăng','Khi xoá một trang, số trang các trang sau phải sửa lại bằng tay','Có thể chọn kiểu số trang'],ok:2}],
  key:['Số trang <b>tự động</b> đánh và cập nhật.']},
 {t:'Luyện tập',hd:'Luyện tập · 8 phút',code:'3',phut:8,
  story:'<p>Mở CLBTinhoc.docx: thêm tên nhóm vào chân trang, số trang ở đầu trang bên phải.</p>',
  qs:[{id:'lt',type:'match',q:'Ghép yêu cầu với lệnh.',items:['Thêm tên nhóm ở cuối mỗi trang','Đặt số trang ở đầu trang bên phải','Thoát khỏi chế độ sửa đầu/chân trang'],opts:['Close Header and Footer','Insert → Footer','Page Number → Top of Page → Plain Number 3'],ok:[1,2,0]}],
  key:['Sửa xong bấm <b>Close Header and Footer</b>.']},
 {t:'Vận dụng',hd:'Vận dụng · 5 phút',code:'4',phut:5,
  qs:[{id:'vd',type:'text',q:'Em sẽ đặt gì vào đầu trang, chân trang của bài báo cáo môn học của em?',ans:'Đầu trang: tên trường, tên môn; chân trang: họ tên, lớp, số trang.'}],
  key:['Thêm <b>logo, tên, số trang</b> để văn bản chuyên nghiệp.']},
 {t:'Tổng kết',hd:'Tổng kết · 2 phút',phut:2,
  qs:[{id:'tk',type:'single',q:'Các lệnh Header, Footer, Page Number ở dải lệnh:',opts:['Home','Insert','Layout','Review'],ok:1}],
  key:['<b>Insert → Header & Footer</b>.']}
];
const GHIBAI={so:'Bài 9a:',ten:'ĐẦU TRANG, CHÂN TRANG',muc:[
 {step:2,h:'Đầu trang, chân trang',it:['Thông tin <b>lặp lại ở mọi trang</b>: tên tài liệu, tác giả, <b>số trang</b>.','<b>Insert → Header / Footer / Page Number</b>.']},
 {step:3,h:'Số trang',it:['Đánh <b>tự động</b>; chọn vị trí <b>Top/Bottom of Page</b>.']}]};

var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.dautrang=function(){
  const e=_el(_shell('Tài liệu dự án CLB Tin học','Bật <b>Header</b>, <b>Footer</b>, chọn vị trí <b>số trang</b>. Gõ nội dung đầu trang để thấy nó hiện ở mọi trang.',
   `<div class="m8dt"><style>.m8dt .row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:12px}.m8dt .pg{width:170px;height:240px;background:#fff;box-shadow:0 3px 12px #0003;display:flex;flex-direction:column;font-size:10px;border-radius:3px}.m8dt .hd,.m8dt .ft{min-height:22px;padding:4px 8px;display:flex;justify-content:space-between;align-items:center;color:#c2410c;font-weight:700}.m8dt .hd{border-bottom:1px dashed #fdba74}.m8dt .ft{border-top:1px dashed #fdba74}.m8dt .bd{flex:1;padding:8px}.m8dt .bd i{display:block;height:6px;background:#cbd5e1;margin:5px 0;border-radius:3px}.m8dt .pn{background:#1d4ed8;color:#fff;border-radius:4px;padding:0 5px;animation:m8dtp .4s}@keyframes m8dtp{from{transform:scale(2)}}.m8dt input{font-size:15px;padding:6px;border-radius:8px;border:2px solid #cbd5e1}</style>
    <div class="sim-ctl"><div>Header ${_seg('h',[['0','Tắt'],['1','Bật']],'0')} <input class="ht" value="Tài liệu dự án – CLB Tin học" size="24"></div>
    <div>Footer ${_seg('f',[['0','Tắt'],['1','Bật']],'0')}</div><div>Số trang ${_seg('p',[['','Không'],['tl','Top · trái'],['tr','Top · phải'],['bc','Bottom · giữa'],['br','Bottom · phải']],'')}</div></div>
    <div class="row"></div></div>`));
  const o={h:'0',f:'0',p:''}, row=e.querySelector('.row'), ht=e.querySelector('.ht');
  function draw(){let h=''; for(let i=1;i<=3;i++){const pn=`<span class="pn">${i}</span>`, P=o.p;
      const hdL=(P==='tl'?pn:'')+(o.h==='1'?' '+ht.value:''), hdR=P==='tr'?pn:'', ftL=o.f==='1'?'Nhóm 3 – Lớp 8A':'', ftC=P==='bc'?pn:'', ftR=P==='br'?pn:'';
      h+=`<div class="pg"><div class="hd"><span>${hdL}</span><span>${hdR}</span></div><div class="bd"><b style="font-size:11px">${['I. Mục tiêu','II. Kế hoạch','III. Phân công'][i-1]}</b>${'<i></i>'.repeat(11)}</div><div class="ft"><span>${ftL}</span><span>${ftC}</span><span>${ftR}</span></div></div>`;}
    row.innerHTML=h;}
  _wireSeg(e,(n,v)=>{o[n]=v; FX.play(v&&v!=='0'?'sparkle':'tick'); draw();}); ht.oninput=draw; draw(); return e;
};
