/* Giáo dục AI lớp 8 · Bài 4 (2 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống, nhân vật giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:4,ten:'Nhận diện, phòng tránh rủi ro và phát triển AI có đạo đức',yccd:'8.B1.1 · 8.B2.1 · 8.B3.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Cuộc gọi video lúc nửa đêm',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'8.B1.1',ic:'video',
  story:'<b>Tình huống (giả định):</b> 23 giờ, em nhận cuộc gọi video từ tài khoản của <b>anh họ</b>. Hình đúng mặt anh, giọng đúng giọng anh: “Anh bị tai nạn, chuyển gấp 3 triệu vào số tài khoản này, đừng nói bố mẹ!” Cuộc gọi tắt sau 10 giây.',
  qs:[{id:'pay',type:'single',q:'Em có chuyển tiền ngay không?',opts:['Chuyển ngay vì đúng mặt, đúng giọng','Không chuyển; gọi lại số điện thoại thường của anh hoặc hỏi người nhà để xác minh','Gửi mã OTP để anh tự chuyển'],ok:1},
   {id:'data',type:'multi',q:'Kẻ gian đã lấy những dữ liệu nào của anh họ để dựng cuộc gọi?',opts:['Ảnh, video khuôn mặt','Giọng nói','Quyền đăng nhập tài khoản','Điểm thi của em'],ok:[0,1,2]},
   {id:'risk0',type:'text',q:'Ngoài lừa đảo, AI còn có thể gây hại theo cách nào khác?',short:1,ans:'Hướng hợp lí: AI trả lời sai; đối xử không công bằng (thiên vị); lộ thông tin khi nhập vào chatbot.'}],
  key:['<b>Thấy mặt, nghe giọng chưa đủ để tin.</b>','Câu hỏi lớn: AI có những rủi ro nào, phòng tránh ra sao, và người làm ra AI cần lưu ý gì?']},
 {t:'Ba nhóm rủi ro',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'8.B1.1',ic:'scale',
  story:'Mô phỏng: một trường thử máy chấm điểm danh bằng khuôn mặt. Máy chỉ <b>học từ ảnh mẫu</b>. Thay đổi thành phần dữ liệu huấn luyện và xem máy nhận đúng mỗi nhóm học sinh bao nhiêu.',
  qs:[{id:'sim1',type:'sim',sim:'bias'},
   {id:'obs1',type:'single',q:'Khi dữ liệu huấn luyện gần như chỉ có ảnh nhóm A, máy…',opts:['Nhận đúng mọi người như nhau','Nhận sai nhiều với nhóm B – kết luận thiên vị','Không chạy được'],ok:1},
   {id:'six',type:'sort',q:'Xếp sáu nhận định (sai) vào nhóm rủi ro liên quan',cols:{dl:'Dữ liệu, quyền riêng tư',tt:'Thiên vị, kết luận sai',gm:'Giả mạo do AI tạo'},items:[
     {t:'“Nhập ảnh căn cước vào chatbot để nhờ điền đơn cho nhanh cũng không sao.”',a:'dl'},
     {t:'“Máy tính thì khách quan, AI không thể thiên vị ai.”',a:'tt'},
     {t:'“Video có mặt người thật nói thì chắc chắn là thật.”',a:'gm'},
     {t:'“Chatbot trả lời tự tin thì chắc đúng.”',a:'tt'},
     {t:'“Ứng dụng miễn phí thì không thu dữ liệu gì của mình.”',a:'dl'},
     {t:'“Giọng nói qua điện thoại không thể làm giả.”',a:'gm'}]}],
  key:['Ba nhóm rủi ro: <b>dữ liệu và quyền riêng tư</b>; <b>thuật toán thiên vị hoặc kết luận sai</b>; <b>giả mạo do AI tạo</b>.','Nguyên nhân gốc: AI <b>học từ dữ liệu</b> – dữ liệu lệch thì kết quả lệch.']},
 {t:'Ba trạm phòng tránh',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1–2',code:'8.B2.1',ic:'lock',
  story:'<b>Trạm 1 – Dữ liệu cá nhân</b>, <b>Trạm 2 – Bản quyền</b>, <b>Trạm 3 – Phòng tránh giả mạo</b>. Ở Trạm 3, dùng mô phỏng cuộc gọi xin tiền gấp để thử các bước.',
  qs:[{id:'st1',type:'sort',q:'Trạm 1: Thông tin này khi làm dự án học tập với AI thì…',cols:{ok:'Nhập được',gia:'Thay bằng dữ liệu giả',no:'Không nhập'},items:[
     {t:'Chủ đề dự án: rác thải nhựa',a:'ok'},{t:'Họ tên, lớp của bạn trong khảo sát',a:'gia'},{t:'Mật khẩu tài khoản',a:'no'},
     {t:'Ảnh khuôn mặt bạn khác',a:'no'},{t:'Số liệu khảo sát đã bỏ tên',a:'ok'},{t:'Địa chỉ nhà của em',a:'gia'}]},
   {id:'st2',type:'tf',q:'Trạm 2: Đúng hay sai?',items:[
     {t:'Dùng ảnh trên mạng cho bài thuyết trình cần ghi nguồn.',a:'T'},
     {t:'Bài có dùng AI hỗ trợ thì không cần ghi nhận việc dùng AI.',a:'F'},
     {t:'Tranh do AI vẽ theo phong cách một hoạ sĩ có thể đụng tới quyền của hoạ sĩ đó.',a:'T'}]},
   {id:'sim2',type:'sim',sim:'scam'},
   {id:'obs2',type:'single',q:'Thứ tự xử lí an toàn khi nhận tin nhắn xin tiền gấp?',opts:['Chuyển – Hỏi – Kiểm','Dừng – Hỏi – Kiểm','Kiểm – Chuyển – Dừng'],ok:1}],
  key:['Dữ liệu: <b>nhập ít, nhập giả, nhập khi được phép</b>.','Bản quyền: <b>ghi nguồn</b> và <b>ghi nhận việc dùng AI</b>.','Giả mạo: <b>Dừng – Hỏi – Kiểm</b>.']},
 {t:'Hội đồng thẩm định',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'8.B3.1',ic:'student',
  story:'Một trường (giả định) định lắp <b>camera nhận diện khuôn mặt</b> ở cửa lớp để điểm danh tự động. Nhóm em là Hội đồng thẩm định (Chủ toạ, Thư kí, Đại diện HS, Đại diện phụ huynh, Kĩ thuật viên). Dùng mô phỏng để thử các biện pháp giảm thiểu.',
  qs:[{id:'lab',type:'sim',sim:'lab_thamtu'},{id:'sim3',type:'sim',sim:'council'},
   {id:'risk3',type:'text',q:'(1) Hai rủi ro và nhóm rủi ro; (2) hai biện pháp giảm thiểu',ans:'Ví dụ: lộ ảnh khuôn mặt HS (dữ liệu); nhận sai bạn đeo kính, da tối (thiên vị). Biện pháp: xin đồng ý của phụ huynh, có cách điểm danh thay thế, mã hoá và xoá ảnh định kì, kiểm thử với đủ nhóm HS.'},
   {id:'dec',type:'single',q:'(3) Quyết định của Hội đồng',opts:['Triển khai ngay','Triển khai có điều kiện','Không triển khai'],ans:'Không có đáp án duy nhất; cần lập luận dựa trên vấn đề đạo đức. Thường hợp lí: triển khai có điều kiện.'},
   {id:'eth',type:'multi',q:'Vấn đề đạo đức cần lưu ý khi phát triển AI',opts:['Bảo mật thông tin','Không cung cấp thông tin sai lệch','Không xúc phạm người khác','Làm càng nhanh càng tốt'],ok:[0,1,2]}],
  key:['Ba vấn đề đạo đức: <b>bảo mật thông tin</b>; <b>không cung cấp thông tin sai lệch</b>; <b>không xúc phạm người khác</b>.']},
 {t:'Bản quy ước của lớp',hd:'Hoạt động 4 · Vận dụng · Tiết 2 và ở nhà',code:'8.B3.1',ic:'pen',
  story:'Soạn <b>Bản quy ước dùng AI trong dự án học tập</b> của lớp: mỗi điều khoản gắn với một vấn đề đạo đức.',
  qs:[{id:'rule',type:'text',q:'Viết 3 điều khoản (bảo mật – không sai lệch – không xúc phạm)',ans:'Ví dụ: 1. Không nhập dữ liệu thật của bạn vào công cụ AI. 2. Kiểm chứng mọi thông tin AI đưa ra trước khi đưa vào sản phẩm. 3. Không dùng AI tạo ảnh, video chế giễu người khác.'}],
  key:['Quy ước tốt có điều khoản cho <b>cả ba</b> vấn đề đạo đức.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.B1.1 – 8.B3.1',ic:'scale',
  story:'Quay lại cuộc gọi lúc nửa đêm ở Hoạt động 1.',
  qs:[{id:'after',type:'text',q:'Bây giờ nếu nhận cuộc gọi đó, em sẽ…',short:1,ans:'Dừng (không chuyển tiền, không đọc OTP) – Hỏi (gọi số thường, hỏi người nhà) – Kiểm (xác minh qua kênh khác), rồi báo người lớn.'}],
  key:['3 nhóm rủi ro · 3 cách phòng tránh · 3 vấn đề đạo đức.']}
];
const DECL=[];
/* ---- Ghi bài ---- */
const GHIBAI={so:'Bài 4:',ten:'NHẬN DIỆN, PHÒNG TRÁNH RỦI RO VÀ PHÁT TRIỂN AI CÓ ĐẠO ĐỨC',muc:[
 {step:1,h:'Thấy mặt, nghe giọng chưa đủ để tin',it:['Kẻ gian dùng AI và dữ liệu bị lấy để làm giả.']},
 {step:2,h:'Ba nhóm rủi ro',it:['Nguyên nhân gốc: AI <b>học từ dữ liệu</b>.'],tb:[['Nhóm','Dấu hiệu'],['Dữ liệu, quyền riêng tư','xin dữ liệu không cần thiết'],['Thiên vị, kết luận sai','đúng với nhóm này, sai với nhóm khác'],['Giả mạo','gấp, xin tiền, OTP, bí mật']]},
 {step:3,h:'Phòng tránh',it:['Nhập ít, nhập giả, nhập khi được phép.','Ghi nguồn, ghi nhận việc dùng AI.'],flow:['Dừng','Hỏi','Kiểm']},
 {step:4,h:'Đạo đức khi phát triển AI',it:['Bảo mật thông tin','Không cung cấp thông tin sai lệch','Không xúc phạm người khác']},
 {step:6,h:'Ghi nhớ',it:['3 rủi ro – 3 cách phòng tránh – 3 vấn đề đạo đức.']}]};
function renderGhiBai(){}
/* ---- Mã YCCĐ của từng câu ---- */
const QCODE={pay:'8.B1.1',data:'8.B1.1',risk0:'8.B1.1',obs1:'8.B1.1',six:'8.B1.1',after:'8.B1.1',
  st1:'8.B2.1',st2:'8.B2.1',obs2:'8.B2.1',risk3:'8.B2.1',
  dec:'8.B3.1',eth:'8.B3.1',rule:'8.B3.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
