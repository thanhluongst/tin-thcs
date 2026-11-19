/* Giáo dục AI lớp 9 · Bài 3 (2 tiết) – soạn theo KHBD-AI-LOP 9. Nội dung, tài khoản trong mô phỏng là giả định; không dùng hình, giọng người thật. */
const BAI={lop:9,so:3,ten:'Người dùng có trách nhiệm và ứng phó nội dung giả mạo do AI',yccd:'9.B2.3 · 9.B2.1 · 9.B2.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Tin này thật hay giả?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'9.B2.3',ic:'video',
  story:'Nhóm lớp nhận được một "video" (mô tả bằng lời): <i>"Thầy hiệu trưởng thông báo cả trường nghỉ học ngày mai, chia sẻ ngay!"</i> – gửi từ một tài khoản lạ lúc 23 giờ.',
  qs:[{id:'pred',type:'single',q:'Em làm gì?',opts:['Chia sẻ ngay cho bạn bè','Dừng lại, kiểm chứng qua trang chính thức của trường hoặc hỏi thầy cô','Bình luận "thật hả?" rồi chia sẻ'],ok:1}],
  key:['Nội dung gây <b>bất ngờ, hoang mang, thúc giục chia sẻ, thiếu nguồn rõ</b> → <b>dừng lại và kiểm chứng</b>.']},
 {t:'Dấu hiệu nội dung giả mạo',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'9.B2.3',ic:'img',
  story:'Dùng "kính lúp thám tử": soi từng nội dung, đánh dấu các dấu hiệu nghi giả mạo, rồi chọn nguồn kiểm chứng.',
  qs:[{id:'sim1',type:'sim',sim:'fake'},
   {id:'dh',type:'multi',q:'Dấu hiệu nội dung có thể do AI giả mạo',opts:['Thúc giục chia sẻ, chuyển tiền gấp','Nguồn lạ, không có trên kênh chính thức','Hình, tiếng có chi tiết bất thường (tay, chữ, khẩu hình lệch)','Gây cảm xúc mạnh: sợ hãi, phẫn nộ','Có trên trang chính thức của cơ quan'],ok:[0,1,2,3]}],
  key:['Dấu hiệu: <b>thúc giục – nguồn lạ – chi tiết bất thường – cảm xúc mạnh</b>. Kiểm chứng bằng <b>kênh chính thức, nguồn độc lập, người có thẩm quyền</b>.']},
 {t:'Ứng phó khi phát hiện giả mạo',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 2',code:'9.B2.2',ic:'lock',
  story:'Em phát hiện một video giả mạo giọng thầy cô đang lan trong nhóm lớp.',
  qs:[{id:'up',type:'sort',q:'Việc này…',cols:{nen:'Nên làm',khong:'Không nên'},items:[
     {t:'Không chia sẻ tiếp',a:'nen'},{t:'Báo cho thầy cô, người quản trị nhóm',a:'nen'},{t:'Dùng chức năng báo cáo nội dung của nền tảng',a:'nen'},
     {t:'Bình luận chế giễu người trong video',a:'khong'},{t:'Tải về rồi gửi thêm cho bạn để "cảnh báo"',a:'khong'},{t:'Nhắc bạn bè kiểm chứng trước khi tin',a:'nen'}]},
   {id:'cd',type:'single',q:'Vai trò của cộng đồng',opts:['Không liên quan, chỉ nền tảng lo','Cùng giám sát, phản hồi, báo cáo và đề xuất cách dùng AI an toàn','Chia sẻ càng nhiều càng tốt'],ok:1}],
  key:['Cá nhân và cộng đồng: <b>không lan truyền – báo cáo – phản hồi – đề xuất giải pháp</b>.']},
 {t:'Người dùng chịu trách nhiệm',hd:'Hoạt động 3–4 · Luyện tập, vận dụng · Tiết 2',code:'9.B2.1',ic:'pen',
  story:'Em dùng AI tạo ảnh minh hoạ cho bài thuyết trình về di tích địa phương.',
  qs:[{id:'lab',type:'sim',sim:'lab_thamtu'},{id:'tn',type:'single',q:'Ai chịu trách nhiệm cuối cùng về ảnh đó?',opts:['Công cụ AI','Em – người dùng quyết định dùng ảnh','Không ai'],ok:1},
   {id:'kb',type:'text',q:'Viết khai báo việc dùng AI cho sản phẩm (công cụ – mục đích – phần hỗ trợ – kiểm chứng – phần tự làm) và ghi chú "ảnh do AI tạo".',ans:'Ví dụ: Dùng công cụ tạo ảnh (thầy cô hướng dẫn) để vẽ ảnh minh hoạ cổng đình; đã đối chiếu ảnh chụp thật trên trang của UBND xã; nội dung, bố cục do em làm. Chú thích: "Ảnh minh hoạ do AI tạo".'}],
  key:['Người dùng <b>kiểm soát và chịu trách nhiệm</b> với kết quả cuối cùng; <b>khai báo</b> và <b>gắn nhãn</b> nội dung AI tạo.']}
];
const DECL=[];
const GHIBAI={so:'Bài 3:',ten:'NGƯỜI DÙNG CÓ TRÁCH NHIỆM VÀ ỨNG PHÓ NỘI DUNG GIẢ MẠO DO AI',muc:[
 {step:2,h:'Dấu hiệu giả mạo',it:['Thúc giục – nguồn lạ – chi tiết bất thường – cảm xúc mạnh.'],flow:['Dừng','Kiểm chứng kênh chính thức','Hỏi người có thẩm quyền']},
 {step:3,h:'Ứng phó',it:['Không lan truyền; báo cáo; nhắc bạn bè kiểm chứng.']},
 {step:4,h:'Trách nhiệm người dùng',it:['Kiểm soát kết quả cuối; khai báo; gắn nhãn "do AI tạo".']}]};
function renderGhiBai(){}
const QCODE={pred:'9.B2.3',dh:'9.B2.3',up:'9.B2.2',cd:'9.B2.2',tn:'9.B2.1',kb:'9.B2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
