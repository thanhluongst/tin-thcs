/* Giáo dục AI lớp 6 · Bài 3 (2 tiết) – soạn theo KHBD-AI-LOP 6. Tình huống, ảnh giả định; không dùng dữ liệu thật của học sinh. */
const BAI={lop:6,so:3,ten:'Dữ liệu cá nhân, quyền riêng tư và an toàn AI',yccd:'6.A3.3 · 6.A3.4 · 6.B2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Một bức ảnh kể được gì?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'6.A3.3',ic:'img',
  story:'Bạn Lan (giả định) chụp ảnh trước cổng trường và định đăng lên mạng. Em hãy "soi" xem bức ảnh làm lộ những thông tin gì.',
  qs:[{id:'sim1',type:'sim',sim:'photo'},
   {id:'q1',type:'single',q:'Một bức ảnh đăng lên mạng có thể làm lộ…',opts:['Không gì cả','Trường, nhà, khuôn mặt, vị trí…','Chỉ màu áo'],ok:1}],
  key:['Hình ảnh, giọng nói, họ tên, địa chỉ, thông tin học tập, thói quen dùng mạng… là <b>dữ liệu cá nhân</b>.']},
 {t:'Dữ liệu cá nhân – ai quyết định?',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'6.A3.3',ic:'lock',
  story:'Phân loại 8 thẻ dữ liệu theo đèn: <b>🟢 Xanh</b> (chia sẻ được), <b>🟡 Vàng</b> (cân nhắc, tuỳ bối cảnh), <b>🔴 Đỏ</b> (không chia sẻ).',
  qs:[{id:'den',type:'sort',q:'Thẻ dữ liệu này là đèn gì?',cols:{x:'🟢 Xanh',v:'🟡 Vàng',d:'🔴 Đỏ'},items:[
     {t:'Môn học yêu thích',a:'x'},{t:'Họ tên đầy đủ',a:'v'},{t:'Địa chỉ nhà',a:'d'},{t:'Mật khẩu',a:'d'},
     {t:'Ảnh khuôn mặt',a:'v'},{t:'Màu sắc yêu thích',a:'x'},{t:'Số điện thoại bố mẹ',a:'d'},{t:'Ảnh của bạn khác',a:'d'}]},
   {id:'q2',type:'single',q:'Ai có quyền quyết định chia sẻ ảnh của bạn Lan?',opts:['Người chụp ảnh','Lan (và bố mẹ Lan)','Ứng dụng AI'],ok:1}],
  key:['Dữ liệu cá nhân là <b>tài sản</b> của mỗi người; <b>người đó (và bố mẹ)</b> quyết định.']},
 {t:'Quyền riêng tư và ứng phó',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'6.A3.4',ic:'student',
  story:'Ảnh của em bị một tài khoản lạ (giả định) dùng làm ảnh đại diện và nhắn tin xin tiền bạn bè.',
  qs:[{id:'q3',type:'single',q:'Việc đầu tiên em nên làm?',opts:['Im lặng cho qua','Báo ngay bố mẹ, thầy cô','Lấy ảnh người khác trả đũa'],ok:1},
   {id:'tf3',type:'tf',q:'Đúng hay sai?',items:[{t:'Quyền riêng tư là quyền giữ kín thông tin của mình, không để người khác tự ý biết, dùng.',a:'T'},{t:'Dữ liệu bị dùng sai mục đích có thể khiến em bị lừa, bị bắt nạt.',a:'T'},{t:'Đăng ảnh bạn khác lên mạng không cần hỏi bạn.',a:'F'}]}],
  key:['Quyền riêng tư: <b>thông tin của em do em quyết định</b>. Bị lộ, bị dùng sai → <b>báo người lớn tin cậy</b>.']},
 {t:'Kiểm tra ứng dụng AI trước khi dùng',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'6.B2.1',ic:'bot',
  story:'Ứng dụng "Đổi ảnh vui" (giả định) đòi nhiều quyền. Dùng mô phỏng để thử các câu hỏi trước khi cài.',
  qs:[{id:'lab',type:'sim',sim:'lab_canhsat'},{id:'sim2',type:'sim',sim:'app'},
   {id:'q4',type:'multi',q:'Câu hỏi nên đặt trước khi dùng một ứng dụng AI',opts:['Ai làm ra ứng dụng này?','Ứng dụng lấy dữ liệu gì, để làm gì?','Có giới hạn độ tuổi không? Có cần bố mẹ đồng ý?','Biểu tượng có đẹp không?'],ok:[0,1,2]}],
  key:['Hỏi trước khi dùng: <b>Ai làm ra? Lấy dữ liệu gì? An toàn không? Cần người lớn đồng ý?</b>']},
 {t:'Vận dụng: Quy tắc 4 bước',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'6.B2.1',ic:'pen',
  story:'Viết quy tắc bảo vệ dữ liệu của em khi gặp ứng dụng lạ.',
  qs:[{id:'rule',type:'text',q:'Quy tắc 4 bước của em',ans:'Dừng lại – Hỏi người lớn – Kiểm tra (ai làm ra, lấy dữ liệu gì) – Quyết định (Xanh/Vàng/Đỏ), không để ứng dụng quyết định thay.'},
   {id:'after',type:'text',q:'Bây giờ em sẽ làm gì trước khi đăng một bức ảnh?',short:1,ans:'Soi xem ảnh lộ thông tin gì, hỏi ý người trong ảnh và bố mẹ.'}],
  key:['<b>Dừng – Hỏi – Kiểm tra – Quyết định</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 3:',ten:'DỮ LIỆU CÁ NHÂN, QUYỀN RIÊNG TƯ VÀ AN TOÀN AI',muc:[
 {step:1,h:'Dữ liệu cá nhân',it:['Hình ảnh, giọng nói, họ tên, địa chỉ, thông tin học tập, thói quen dùng mạng.']},
 {step:2,h:'Ai quyết định?',it:['Dữ liệu là tài sản của mỗi người; người đó quyết định.'],tb:[['Đèn','Ví dụ'],['🟢 Xanh','môn học, màu yêu thích'],['🟡 Vàng','họ tên, ảnh mặt'],['🔴 Đỏ','địa chỉ, mật khẩu, ảnh bạn khác']]},
 {step:3,h:'Quyền riêng tư',it:['Bị lộ, bị dùng sai → báo bố mẹ, thầy cô.']},
 {step:5,h:'Quy tắc 4 bước',it:[],flow:['Dừng','Hỏi','Kiểm tra','Quyết định']}]};
function renderGhiBai(){}
const QCODE={q1:'6.A3.3',den:'6.A3.3',q2:'6.A3.3',q3:'6.A3.4',tf3:'6.A3.4',q4:'6.B2.1',rule:'6.B2.1',after:'6.A3.4'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
