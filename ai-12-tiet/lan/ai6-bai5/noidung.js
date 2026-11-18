/* Giáo dục AI lớp 6 · Bài 5 (2 tiết) – soạn theo KHBD-AI-LOP 6 (Unplugged AI). Mô phỏng chỉ để minh hoạ, không dùng công cụ AI trực tuyến. */
const BAI={lop:6,so:5,ten:'Bên trong một công cụ AI',yccd:'6.C1.1 · 6.C3.1 · 6.C1.MR1 · 6.C1.MR2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Máy học như thế nào?',hd:'Hoạt động 1 · Khởi động · Tiết 1',code:'6.C1.1',ic:'student',
  story:'Hồi nhỏ, em nhận ra con mèo nhờ được người lớn chỉ cho xem <b>rất nhiều con mèo</b>. Máy tính cũng "học" theo cách tương tự.',
  qs:[{id:'q1',type:'single',q:'Để dạy (huấn luyện) AI, cần hai thành phần chính nào?',opts:['Điện và màn hình','Dữ liệu và thuật toán','Bàn phím và chuột'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ máy "học" như thế nào?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Huấn luyện AI = <b>dữ liệu</b> (ví dụ: ảnh, văn bản) + <b>thuật toán</b> (cách học từ dữ liệu).']},
 {t:'Dạy máy phân loại quả',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'6.C1.1',ic:'bot',
  story:'Em là người dạy máy: bấm lên bảng để thêm ví dụ 🍎 táo (đỏ) và 🍋 chanh (vàng), rồi cho máy thử đoán 20 quả mới.',
  qs:[{id:'sim1',type:'sim',sim:'train'},
   {id:'q2',type:'single',q:'Thêm nhiều ví dụ đúng thì máy…',opts:['Đoán đúng hơn','Đoán sai hơn','Không đổi'],ok:0},
   {id:'q2b',type:'single',q:'Máy trả lời được vì…',opts:['Máy tự hiểu mọi thứ','Đã được huấn luyện với dữ liệu em đưa','Có người trốn bên trong'],ok:1}],
  key:['Máy đoán dựa vào <b>dữ liệu đã học</b>: nhiều dữ liệu tốt → đoán đúng hơn.']},
 {t:'Thử nghiệm: dữ liệu sai thì sao?',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'6.C1.MR2',ic:'paper',
  story:'Làm thử nghiệm: thay đổi <b>% ví dụ bị dán nhãn sai</b> và <b>số ví dụ</b>, ghi độ chính xác vào bảng, rồi nhận xét.',
  qs:[{id:'sim2',type:'sim',sim:'noise'},
   {id:'q3',type:'single',q:'Nhãn sai càng nhiều thì máy…',opts:['Càng giỏi','Càng dễ đoán sai','Tự sửa được'],ok:1},
   {id:'nx3',type:'text',q:'Nhận xét các bước em đã làm trong thử nghiệm',short:1,ans:'Ví dụ: Em giữ số ví dụ 40, tăng nhãn sai 0% → 30% → 50%, độ chính xác giảm dần; dữ liệu sai làm AI sai.'}],
  key:['Dữ liệu <b>sai</b> → AI <b>sai</b>. Con người chịu trách nhiệm chọn dữ liệu và <b>kiểm chứng</b> đầu ra.']},
 {t:'Công nghệ AI quanh em',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'6.C3.1',ic:'img',
  story:'Nối ví dụ với công nghệ AI. Liên hệ: công cụ đó đã được huấn luyện bằng dữ liệu gì?',
  qs:[{id:'match3',type:'match',q:'Ví dụ nào dùng công nghệ nào?',items:['Mở khoá điện thoại bằng khuôn mặt','Đọc tin nhắn thành tiếng','Chụp biển báo tiếng Anh ra tiếng Việt','Ứng dụng nhạc gợi ý bài hát'],opts:['Nhận dạng hình ảnh','Chuyển văn bản ↔ giọng nói','Dịch tự động','Gợi ý theo sở thích'],ok:[0,1,2,3]},
   {id:'q3b',type:'single',q:'Ứng dụng nhận biết tên cây qua ảnh đã được huấn luyện bằng…',opts:['Rất nhiều ảnh cây đã gắn tên','Bài hát','Số điện thoại'],ok:0}],
  key:['Công nghệ AI quen thuộc: <b>nhận dạng hình ảnh, chuyển giọng nói ↔ văn bản, dịch, gợi ý</b>.','Công cụ hoạt động được nhờ <b>đã huấn luyện</b> với dữ liệu phù hợp.']},
 {t:'Vận dụng',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'6.C1.MR1',ic:'lock',
  story:'Một ứng dụng nhận dạng cây (giả định) mời em gửi thêm ảnh để "dạy" nó, kèm ảnh khuôn mặt em.',
  qs:[{id:'van',type:'text',q:'Ứng dụng cần dữ liệu gì để học? Em có nên gửi ảnh khuôn mặt không? Vì sao?',ans:'Cần nhiều ảnh cây có tên đúng. Không gửi ảnh mặt: không cần cho việc nhận dạng cây, là dữ liệu cá nhân – hỏi bố mẹ trước.'},
   {id:'after',type:'text',q:'Bây giờ em nghĩ máy "học" như thế nào?',short:1,ans:'Máy học từ dữ liệu bằng thuật toán; dữ liệu tốt thì đoán tốt, vẫn cần kiểm chứng.'}],
  key:['Dữ liệu tốt → AI tốt; chỉ đưa dữ liệu <b>cần thiết, được phép</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 5:',ten:'BÊN TRONG MỘT CÔNG CỤ AI',muc:[
 {step:1,h:'Huấn luyện AI',it:[],flow:['Dữ liệu','Thuật toán','Mô hình AI']},
 {step:3,h:'Dữ liệu quyết định chất lượng',it:['Nhiều dữ liệu tốt → đoán đúng hơn; dữ liệu sai → AI sai.']},
 {step:4,h:'Công nghệ AI quanh em',it:['Nhận dạng ảnh, giọng nói ↔ văn bản, dịch, gợi ý.']},
 {step:5,h:'Ghi nhớ',it:['Chỉ đưa dữ liệu cần thiết, được phép; luôn kiểm chứng.']}]};
function renderGhiBai(){}
const QCODE={q1:'6.C1.1',before:'6.C1.1',q2:'6.C1.1',q2b:'6.C1.MR1',q3:'6.C1.MR2',nx3:'6.C1.MR2',match3:'6.C3.1',q3b:'6.C1.MR1',van:'6.C1.MR1',after:'6.C1.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
