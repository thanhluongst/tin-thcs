/* Giáo dục AI lớp 8 · Bài 6 (1 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống, nhân vật giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:6,ten:'AI nhận diện cảm xúc dựa trên những dấu hiệu nào?',yccd:'8.C5.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'"Ừ, được thôi." – vui hay buồn?',hd:'Hoạt động 1 · Mở đầu',code:'8.C5.1',ic:'chat',
  story:'Bạn Hùng (giả định) được nhóm phân công thuyết trình. Hùng nhắn: <b>“Ừ, được thôi.”</b>',
  qs:[{id:'pred',type:'single',q:'Hùng đang vui hay không vui?',opts:['Vui','Không vui','Chưa đủ dấu hiệu để biết'],ans:'Dự đoán – chỉ một câu chữ thì chưa đủ dấu hiệu; sẽ đối chiếu ở Hoạt động 2.2.'},
   {id:'need',type:'text',q:'Em cần thêm dấu hiệu gì để đoán đúng hơn?',short:1,ans:'Ví dụ: nét mặt, giọng nói (ngữ điệu), cử chỉ, các từ Hùng dùng thêm.'}],
  key:['Người đoán cảm xúc nhờ <b>nhiều dấu hiệu</b>; AI cũng chỉ dựa vào <b>dấu hiệu thu được</b>, không thấy suy nghĩ bên trong.']},
 {t:'Bốn nhóm dấu hiệu',hd:'Hoạt động 2.1 · Hình thành kiến thức',code:'8.C5.1',ic:'img',
  story:'Xếp các thẻ dấu hiệu vào bốn nhóm mà AI có thể dùng.',
  qs:[{id:'grp',type:'sort',q:'Thẻ này thuộc nhóm dấu hiệu nào?',cols:{mat:'Nét mặt',tu:'Từ khoá',ngu:'Ngữ điệu',cu:'Cử chỉ'},items:[
     {t:'Khoé miệng kéo lên',a:'mat'},{t:'Lông mày nhíu lại',a:'mat'},{t:'Câu có từ "chán quá"',a:'tu'},{t:'Biểu tượng 😭 trong tin nhắn',a:'tu'},
     {t:'Giọng cao, nhanh',a:'ngu'},{t:'Giọng trầm, kéo dài',a:'ngu'},{t:'Gật đầu',a:'cu'},{t:'Khoanh tay, quay đi',a:'cu'}]},
   {id:'per',type:'single',q:'Nét mặt, giọng nói mà AI dùng để nhận diện cảm xúc là…',opts:['Dữ liệu công khai, ai dùng cũng được','Dữ liệu cá nhân, cần được bảo vệ','Không phải dữ liệu'],ok:1}],
  key:['Bốn nhóm: <b>nét mặt, từ khoá, ngữ điệu, cử chỉ</b>.','Nét mặt, giọng nói là <b>dữ liệu cá nhân</b>.']},
 {t:'Một câu nói, nhiều cách đoán',hd:'Hoạt động 2.2 · Hình thành kiến thức',code:'8.C5.1',ic:'bot',
  story:'Mô phỏng một "máy đoán cảm xúc". Bật các dấu hiệu máy được thấy kèm câu “Ừ, được thôi.”, bấm đoán, rồi bấm <b>Hỏi Hùng</b> để biết Hùng thật sự thấy thế nào.',
  qs:[{id:'sim1',type:'sim',sim:'emo'},
   {id:'obs1',type:'single',q:'Quan sát: khi máy dùng nhiều dấu hiệu cùng lúc thì…',opts:['Luôn đúng 100%','Thường sát hơn nhưng vẫn có thể sai, kể cả khi tự tin cao','Kém hơn dùng một dấu hiệu'],ok:1},
   {id:'tf1',type:'tf',q:'Đúng hay sai?',items:[{t:'Máy báo "tự tin 90%" thì chắc chắn đúng.',a:'F'},{t:'Cách biểu lộ cảm xúc khác nhau giữa từng người, từng nền văn hoá.',a:'T'},{t:'Muốn biết bạn thấy thế nào, cách tốt nhất là hỏi bạn.',a:'T'}]}],
  key:['Kết hợp nhiều dấu hiệu <b>thường sát hơn</b> nhưng <b>vẫn có thể sai</b>; tự tin cao <b>chưa chắc đúng</b>.','Muốn biết bạn thấy thế nào – <b>hãy hỏi bạn</b>.']},
 {t:'Sơ đồ cho tình huống mới',hd:'Hoạt động 3 · Luyện tập',code:'8.C5.1',ic:'paper',
  story:'Ứng dụng học trực tuyến (giả định) có tính năng đoán học sinh “đang chán” qua camera. Điền sơ đồ: (1) Dấu hiệu thu được → (2) AI so với dữ liệu đã học → (3) Nhãn dự kiến → (4) Con người kiểm tra, quyết định.',
  qs:[{id:'flow',type:'match',q:'Ghép ô sơ đồ với nội dung',items:['(1) Dấu hiệu','(2) Xử lí','(3) Nhãn dự kiến','(4) Con người'],opts:['Nét mặt cúi xuống, ngáp, ít gật đầu','So với ảnh mẫu đã gắn nhãn cảm xúc','“Có thể đang chán – 70%”','Thầy cô hỏi han, quyết định cách hỗ trợ'],ok:[0,1,2,3]},
   {id:'q3',type:'single',q:'Nhãn "đang chán" của AI nên được dùng thế nào?',opts:['Trừ điểm học sinh ngay','Chỉ là gợi ý; thầy cô kiểm tra và hỏi học sinh','Gửi cho cả lớp xem'],ok:1}],
  key:['Nhãn dự kiến chỉ là <b>gợi ý</b>; <b>con người kiểm tra</b> và quyết định cách phản hồi.']},
 {t:'Có nên bật camera?',hd:'Hoạt động 4 · Vận dụng',code:'8.C5.1',ic:'lock',
  story:'Một ứng dụng lạ (giả định) mời: “Bật camera và micro để AI đoán tâm trạng, gợi ý nhạc hợp tâm trạng bạn!”',
  qs:[{id:'cam',type:'text',q:'Em có bật không? Vì sao?',ans:'Không bật camera, micro cho ứng dụng lạ: khuôn mặt, giọng nói là dữ liệu cá nhân; AI đoán cảm xúc cũng có thể sai; hỏi bố mẹ, thầy cô trước.'}],
  key:['Không bật camera, micro cho ứng dụng lạ – <b>khuôn mặt, giọng nói là dữ liệu cá nhân</b>.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.C5.1',ic:'scale',
  story:'Quay lại câu “Ừ, được thôi.” của Hùng.',
  qs:[{id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: cần nhiều dấu hiệu, vẫn có thể sai; hỏi trực tiếp Hùng là tốt nhất.'}],
  key:['AI đoán cảm xúc từ <b>nét mặt, từ khoá, ngữ điệu, cử chỉ</b> – có thể sai, cần con người kiểm tra.']}
];
const DECL=[];
const GHIBAI={so:'Bài 6:',ten:'AI NHẬN DIỆN CẢM XÚC DỰA TRÊN NHỮNG DẤU HIỆU NÀO?',muc:[
 {step:1,h:'AI không thấy suy nghĩ',it:['AI chỉ dựa vào <b>dấu hiệu thu được</b>.']},
 {step:2,h:'Bốn nhóm dấu hiệu',it:['Nét mặt, giọng nói là <b>dữ liệu cá nhân</b>.'],tb:[['Nhóm','Ví dụ'],['Nét mặt','cười, nhíu mày'],['Từ khoá','"chán quá", 😭'],['Ngữ điệu','cao nhanh, trầm'],['Cử chỉ','gật, lắc đầu']]},
 {step:3,h:'Nhiều dấu hiệu vẫn có thể sai',it:['Tự tin cao <b>chưa chắc đúng</b>. Muốn biết bạn thấy thế nào – <b>hỏi bạn</b>.']},
 {step:4,h:'Sơ đồ',it:[],flow:['Dấu hiệu','So với dữ liệu đã học','Nhãn dự kiến','Con người kiểm tra']},
 {step:6,h:'Ghi nhớ',it:['Không bật camera, micro cho ứng dụng lạ.']}]};
function renderGhiBai(){}
const QCODE={pred:'8.C5.1',need:'8.C5.1',grp:'8.C5.1',per:'8.C5.1',obs1:'8.C5.1',tf1:'8.C5.1',flow:'8.C5.1',q3:'8.C5.1',cam:'8.C5.1',after:'8.C5.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
