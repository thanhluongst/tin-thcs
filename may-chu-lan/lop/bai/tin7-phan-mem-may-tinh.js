/* BÀI DEMO (soạn lại theo đề xuất) – Tin học 7 · Bài 2. Phần mềm máy tính · 1 tiết 45 phút.
   Thay đổi so với bản tự chuyển từ content.js:
   - 6 hoạt động thay vì 10 (gộp câu hỏi SGK vào hoạt động liên quan), có thời lượng từng hoạt động.
   - Khởi động: đọc tình huống → làm mô phỏng → trả lời câu hỏi quan sát.
   - Tình huống xuyên suốt: máy tính mới của bạn Minh.
   - 2 mô phỏng: "Bật máy tính" và "Mở tệp bằng phần mềm nào?".
   - Tự luận còn 2 câu (để trưng bày, bình chọn); phần còn lại chấm tự động.
   Được máy chủ ghép sau dòng BAI (lop.js); định nghĩa STEPS, GHIBAI và thêm mô phỏng vào SIMS_BAI. */

const STEPS=[
 {t:'Chào mừng',k:'wel'},

 {t:'Máy tính mới của Minh',hd:'Khởi động · 5 phút',code:'1',ic:'',phut:5,
  story:'<p><b>Minh:</b> Tớ vừa lắp xong máy tính: có thân máy, màn hình, bàn phím, chuột. Bật lên thì màn hình chỉ hiện dòng chữ <i>“No operating system found”</i>. Máy bị hỏng à?</p><p>Em hãy <b>bật thử máy</b> trong phòng thí nghiệm bên dưới (thử đủ các lựa chọn), <b>quan sát</b> màn hình rồi trả lời hai câu hỏi.</p>',
  qs:[{id:'s1',type:'sim',sim:'batmay'},
      {id:'qs1',type:'single',q:'Quan sát: Máy chỉ khởi động được khi nào?',opts:['Khi có phần mềm Scratch','Khi có hệ điều hành','Khi có cả hai','Lúc nào cũng khởi động được'],ok:1},
      {id:'du',type:'single',q:'Vậy máy của Minh cần thêm gì để hoạt động?',opts:['Thêm bộ nhớ RAM','Cài hệ điều hành','Cài phần mềm Word','Thay màn hình mới'],ok:1}],
  key:['Máy tính = <b>phần cứng</b> + <b>phần mềm</b>. Thiếu hệ điều hành, máy không khởi động được.']},

 {t:'Hệ điều hành – “trưởng nhóm” của máy tính',hd:'Hình thành kiến thức · Hoạt động 1 · 10 phút',code:'2.1',ic:'',phut:10,
  story:'<p>Trong dự án Sổ lưu niệm, bạn <b>An</b> là trưởng nhóm. An không tự làm từng phần việc mà <b>điều phối</b> cả nhóm. Trong máy tính cũng có một “trưởng nhóm” như vậy.</p>',
  qs:[{id:'hd1',type:'sort',q:'Việc nào thể hiện vai trò <b>điều hành</b> của An? (có đúng 3 việc)',cols:{c0:'Điều hành',c1:'Không phải'},
      items:[{t:'Mô tả nội dung sổ lưu niệm bằng phần mềm sơ đồ tư duy',a:'c1'},{t:'Quản lí công việc của cả nhóm, theo dõi thời gian',a:'c0'},{t:'Định dạng các đoạn văn bản trong sổ',a:'c1'},{t:'Phân công nhiệm vụ, kết nối các thành viên',a:'c0'},{t:'Thiết kế bài trình chiếu giới thiệu sản phẩm',a:'c1'},{t:'Thay mặt nhóm trao đổi với cô giáo và nhóm khác',a:'c0'}]},
      {id:'cn',type:'tf',q:'Đúng (Đ) hay Sai (S)? Hệ điều hành có chức năng…',items:[
        {t:'Quản lí thiết bị và dữ liệu, điều khiển chúng phối hợp hoạt động',a:'T'},
        {t:'Tạo giao diện để người dùng trao đổi với máy tính',a:'T'},
        {t:'Cho phép chạy các phần mềm ứng dụng',a:'T'},
        {t:'Tạo và chỉnh sửa một bức ảnh',a:'F'}]},
      {id:'p11a',type:'single',q:'Phần mềm nào <b>không phải</b> là hệ điều hành?',opts:['Windows 10','Windows Phone','Windows Explorer','Android'],ok:2},
      {id:'ss',type:'text',q:'Hệ điều hành giống bạn An ở điểm nào? (1–2 câu)',ans:'Cùng làm nhiệm vụ điều phối, kết nối: hệ điều hành kết nối người dùng với phần cứng và các phần mềm khác. Không có hệ điều hành, máy tính không hoạt động.'}],
  key:['<b>Hệ điều hành</b> quản lí, điều khiển toàn bộ máy tính: thiết bị, dữ liệu, giao diện và chạy phần mềm ứng dụng.','Ví dụ: Windows, macOS, Linux (máy tính); Android, iOS (điện thoại).']},

 {t:'Tệp này mở bằng phần mềm nào?',hd:'Hình thành kiến thức · Hoạt động 2 · 10 phút',code:'2.2',ic:'',phut:10,
  story:'<p><b>Minh</b> chép bài từ máy ở trường về: <code>Bai1.sb3</code>, <code>Anh-lop.jpg</code>, <code>Bai-hat.mp3</code>, <code>Tap-lam-van.docx</code>. Bấm đúp vào <code>Bai1.sb3</code> thì máy hỏi: <i>“Bạn muốn mở tệp này bằng ứng dụng nào?”</i></p><p>Phần chữ <b>sau dấu chấm cuối cùng</b> của tên tệp gọi là <b>phần mở rộng</b>. Thử mở từng tệp bằng các phần mềm trong mô phỏng.</p>',
  qs:[{id:'s2',type:'sim',sim:'motep'},
      {id:'qs2',type:'single',q:'Nhờ đâu hệ điều hành biết nên mở tệp bằng phần mềm nào?',opts:['Nhờ dung lượng tệp','Nhờ phần mở rộng của tên tệp','Nhờ ngày tạo tệp','Nhờ thư mục chứa tệp'],ok:1},
      {id:'hd2',type:'match',q:'Ghép loại tệp với phần mở rộng phù hợp.',items:['Tài liệu Word','Chương trình Scratch','Hình ảnh','Ứng dụng (tệp cài đặt)','Trang web','Bài trình chiếu PowerPoint'],
       opts:['.jpg, .png, .bmp','.exe, .msi','.sb3','.ppt, .pptx','.htm, .html','.doc, .docx'],ok:[5,2,0,1,4,3]}],
  key:['<b>Phần mềm ứng dụng</b> giúp làm một việc cụ thể và xử lí một loại dữ liệu cụ thể.','<b>Phần mở rộng</b> cho biết loại tệp và phần mềm mở được tệp đó.']},

 {t:'Hệ điều hành hay phần mềm ứng dụng?',hd:'Hình thành kiến thức · Hoạt động 3 · 7 phút',code:'2.3',ic:'',phut:7,
  story:'<p>Thảo luận nhóm 2 bạn: đặt từng đặc điểm, từng phần mềm vào đúng cột. Đối chiếu Bảng 2.1 (SGK trang 12).</p>',
  qs:[{id:'cmp',type:'sort',q:'Đặc điểm nào của hệ điều hành, đặc điểm nào của phần mềm ứng dụng?',cols:{c0:'Hệ điều hành',c1:'Phần mềm ứng dụng'},items:[
        {t:'Trực tiếp điều khiển bàn phím, chuột, màn hình, máy in',a:'c0'},{t:'Làm việc với phần cứng thông qua hệ điều hành',a:'c1'},
        {t:'Phải cài đặt đầu tiên thì máy mới hoạt động',a:'c0'},{t:'Cài hay không tuỳ nhu cầu người dùng',a:'c1'},
        {t:'Tạo môi trường để chạy phần mềm khác',a:'c0'},{t:'Phải chọn phiên bản hợp với hệ điều hành',a:'c1'}]},
      {id:'p12a',type:'sort',q:'Xếp các phần mềm vào đúng nhóm.',cols:{c0:'Hệ điều hành',c1:'Ứng dụng'},items:[
        {t:'Linux',a:'c0'},{t:'Gmail',a:'c1'},{t:'UnikeyNT',a:'c1'},{t:'Windows 8',a:'c0'},{t:'Zalo',a:'c1'},{t:'Windows Media Player',a:'c1'}]}],
  key:['Hệ điều hành cài <b>trước</b>; phần mềm ứng dụng chạy <b>trên</b> hệ điều hành.']},

 {t:'Thử thách nhanh',hd:'Luyện tập · 6 phút',code:'3',ic:'',phut:6,
  story:'<p>⏱ Thầy cô bật đồng hồ 3 phút. Nhóm nào <b>đúng hết</b> được vinh danh!</p>',
  qs:[{id:'lt2',type:'single',q:'Phát biểu nào <b>SAI</b>?',opts:['Người dùng xử lí việc cụ thể bằng phần mềm ứng dụng','Phần mềm ứng dụng cần hệ điều hành để chạy','Máy tính phải có phần mềm ứng dụng mới hoạt động được','Máy tính phải có hệ điều hành mới hoạt động được'],ok:2},
      {id:'p11b',type:'single',q:'Việc nào <b>không phải</b> chức năng của hệ điều hành?',opts:['Quản lí các tệp trên đĩa','Tạo và chỉnh sửa một tệp hình ảnh','Điều khiển thiết bị vào – ra','Quản lí giao diện người dùng'],ok:1},
      {id:'p12b',type:'sort',q:'Windows Media Player dùng được với tệp nào?',cols:{c0:'Dùng được',c1:'Không dùng được'},items:[{t:'.mp3',a:'c0'},{t:'.jpg',a:'c1'},{t:'.avi',a:'c0'},{t:'.mp4',a:'c0'},{t:'.txt',a:'c1'}]}],
  key:['Chỉ cần <b>hệ điều hành</b> là máy tính hoạt động; phần mềm ứng dụng cài thêm theo nhu cầu.']},

 {t:'Cài Scratch cho máy của Minh',hd:'Vận dụng · 5 phút',code:'4',ic:'',phut:5,
  story:'<p>Máy của Minh đã cài <b>Windows 10</b>. Minh vào trang tải Scratch và thấy 3 tệp cài đặt.</p>',
  qs:[{id:'tai',type:'single',q:'Minh nên tải tệp nào?',opts:['Scratch.dmg (cho macOS)','Scratch Setup.exe (cho Windows)','scratch.apk (cho Android)'],ok:1},
      {id:'vd1',type:'text',q:'Vì sao phải chọn bản Scratch hợp với hệ điều hành của máy? (1–2 câu)',ans:'Scratch là phần mềm ứng dụng, chỉ chạy trên hệ điều hành và làm việc với phần cứng thông qua hệ điều hành. Mỗi hệ điều hành chạy phần mềm theo cách khác nhau nên phải chọn đúng bản.'}],
  key:['Tải phần mềm phải chọn bản <b>hợp với hệ điều hành</b> của máy.']},

 {t:'Tổng kết',hd:'Tổng kết · 2 phút',code:'',ic:'',phut:2,
  story:'<p>Bạn <b>Khoa</b> nói: <i>“Máy tính chỉ cần cài Word là dùng được, không cần gì thêm.”</i></p>',
  qs:[{id:'sau',type:'single',q:'Em có đồng ý với Khoa không?',opts:['Đồng ý: có Word là đủ','Không đồng ý: phải có hệ điều hành trước, Word chạy trên hệ điều hành','Không đồng ý: phải có Scratch','Không đồng ý: phải có Internet'],ok:1},
      {id:'doi',type:'text',short:1,q:'Điều em nhớ nhất trong bài hôm nay là gì?',ans:'Tự đánh giá, không chấm đúng sai.'}],
  key:['Máy tính cần <b>hệ điều hành</b> để hoạt động; <b>phần mềm ứng dụng</b> chạy trên hệ điều hành để làm việc cụ thể.']}
];

const GHIBAI={so:'Bài 2:',ten:'PHẦN MỀM MÁY TÍNH',muc:[
 {step:2,h:'Hệ điều hành',it:['Phần mềm <b>quản lí, điều khiển</b> toàn bộ máy tính.','Chức năng: quản lí <b>thiết bị, dữ liệu</b>; tạo <b>giao diện</b>; cho <b>chạy phần mềm ứng dụng</b>.','VD: Windows, macOS, Linux; Android, iOS.']},
 {step:3,h:'Phần mềm ứng dụng',it:['Giúp làm <b>một việc cụ thể</b>. VD: Word, Paint, Scratch, Zalo.','<b>Phần mở rộng</b> (sau dấu chấm cuối tên tệp) cho biết loại tệp.'],
  tb:[['Phần mở rộng','Loại tệp'],['.docx','văn bản'],['.jpg, .png','hình ảnh'],['.mp3 / .mp4','âm thanh / video'],['.sb3','Scratch']]},
 {step:4,h:'Phân biệt',it:[],flow:['Phần cứng','Hệ điều hành','Phần mềm ứng dụng','Người dùng']},
 {step:6,h:'Vận dụng',it:['Tải phần mềm phải chọn bản <b>hợp với hệ điều hành</b>.']}]};

/* ---------------- MÔ PHỎNG ---------------- */
var SIMS_BAI=window.SIMS_BAI||{};
SIMS_BAI.batmay=function(){
  const e=_el(_shell('Bật máy tính của Minh','Chọn máy <b>có</b> hoặc <b>không có</b> hệ điều hành, có hoặc không có Scratch, rồi bấm <b>▶ Bật máy</b>. Thử đủ các trường hợp.',
   `<div class="sim-ctl"><div><b>Hệ điều hành</b> ${_seg('os',[['0','Không có'],['1','Có (Windows)']],'0')}</div>
     <div><b>Scratch</b> ${_seg('app',[['0','Chưa cài'],['1','Đã cài']],'0')}</div>
     <button type="button" class="btn acc run">▶ Bật máy</button></div>
    <div class="mh" style="margin:12px auto;max-width:460px;aspect-ratio:16/10;border:10px solid #1f2937;border-radius:12px;background:#000;color:#e5e7eb;display:grid;place-items:center;text-align:center;font:600 16px/1.4 Consolas,monospace;padding:12px">Máy đang tắt</div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Hệ điều hành</th><th>Scratch</th><th>Kết quả</th></tr></table>`));
  let os='0',app='0'; const hist=[], mh=e.querySelector('.mh');
  _wireSeg(e,(n,v)=>{if(n==='os')os=v; else app=v;});
  e.querySelector('.run').onclick=()=>{
    FX.play('whoosh'); mh.style.background='#000'; mh.innerHTML='⏳ Đang khởi động…';
    setTimeout(()=>{ let kq;
      if(os==='0'){ mh.innerHTML='<div>⚠️ No operating system found<br><small style="opacity:.7">Không tìm thấy hệ điều hành</small></div>'; kq='Không chạy'; }
      else { mh.style.background='linear-gradient(135deg,#1d4ed8,#60a5fa)';
        mh.innerHTML='<div style="font-family:system-ui"><div style="font-size:40px">🪟</div>Màn hình Windows<br><span style="display:inline-block;margin-top:8px;background:#fff;color:#1d4ed8;border-radius:8px;padding:4px 10px">'+(app==='1'?'🐱 Scratch mở được!':'🐱 Scratch: chưa cài, không mở được')+'</span></div>';
        kq=app==='1'?'Chạy, mở được Scratch':'Chạy, chưa có Scratch'; }
      hist.unshift([os==='1'?'Có':'Không',app==='1'?'Đã cài':'Chưa',kq]); if(hist.length>6) hist.pop();
      histTable(e,hist,(v,j)=>j===2?(/Không chạy/.test(v)?'r':'g'):''); FX.play('ding'); },900);
  };
  return e;
};
SIMS_BAI.motep=function(){
  const TEP=[['Bai1.sb3','sb3'],['Anh-lop.jpg','jpg'],['Bai-hat.mp3','mp3'],['Tap-lam-van.docx','docx'],['Phim.mp4','mp4']];
  const APP=[['scratch','🐱 Scratch',['sb3']],['paint','🎨 Paint',['jpg','png','bmp']],['wmp','🎵 Media Player',['mp3','mp4','avi']],['word','📝 Word',['doc','docx']]];
  const e=_el(_shell('Mở tệp bằng phần mềm nào?','Chọn một <b>tệp</b>, chọn một <b>phần mềm</b>, bấm <b>▶ Mở</b>. Để ý phần chữ sau dấu chấm.',
   `<div class="sim-ctl"><div><b>Tệp</b> ${_seg('tep',TEP.map(t=>[t[1],'📄 '+t[0]]),'sb3')}</div>
     <div><b>Phần mềm</b> ${_seg('app',APP.map(a=>[a[0],a[1]]),'scratch')}</div>
     <button type="button" class="btn acc run">▶ Mở</button></div>
    <div class="kq" style="margin:12px 0;padding:14px;border-radius:12px;background:#f1f5f9;font-weight:700;text-align:center">Chưa mở tệp nào</div>
    <table class="tbl sim-hist"><tr><th>Lần</th><th>Tệp</th><th>Phần mềm</th><th>Kết quả</th></tr></table>`));
  let tep='sb3',app='scratch'; const hist=[], kq=e.querySelector('.kq');
  _wireSeg(e,(n,v)=>{if(n==='tep')tep=v; else app=v;});
  e.querySelector('.run').onclick=()=>{
    const t=TEP.find(x=>x[1]===tep), a=APP.find(x=>x[0]===app), ok=a[2].includes(tep); FX.play('whoosh');
    kq.style.background=ok?'#dcfce7':'#fee2e2'; kq.style.color=ok?'#166534':'#991b1b';
    kq.innerHTML=ok?'✓ '+a[1]+' mở được <code>'+t[0]+'</code> (tệp <b>.'+tep+'</b>)':'✗ '+a[1]+' không đọc được tệp <b>.'+tep+'</b>. Thử phần mềm khác!';
    hist.unshift([t[0],a[1],ok?'Mở được':'Không mở được']); if(hist.length>6) hist.pop();
    histTable(e,hist,(v,j)=>j===2?(v==='Mở được'?'g':'r'):''); FX.play(ok?'ding':'tick');
  };
  return e;
};
