/* Giáo dục AI lớp 7 · Bài 7 (1 tiết) – soạn theo KHBD-AI-LOP 7. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:7,so:7,ten:'Phát hiện ý tưởng dự án AI từ thực tiễn',yccd:'7.D1.1 · 7.D1.MR1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Vấn đề quanh em',hd:'Hoạt động 1 · Khởi động',code:'7.D1.1',ic:'student',
  story:'Kể nhanh một điều chưa thuận tiện ở trường hoặc khu phố em (ví dụ: học sinh hay hỏi đi hỏi lại về lịch thi, giờ mượn sách…).',
  qs:[{id:'vd',type:'text',q:'Vấn đề em thấy là gì? Ai gặp vấn đề đó?',short:1,ans:'Ví dụ: học sinh khối 6 hay hỏi về nội quy, lịch thi; thầy cô mất nhiều thời gian trả lời lặp lại.'}],
  key:['Ý tưởng dự án AI bắt đầu từ <b>một vấn đề thật</b> của <b>người cụ thể</b>.']},
 {t:'Phạm vi của vấn đề',hd:'Hoạt động 2 · Hình thành kiến thức',code:'7.D1.1',ic:'paper',
  story:'Ví dụ: <b>chatbot giải đáp thắc mắc thường gặp</b> về nội quy, lịch học cho học sinh khối 6. Phạm vi phải <b>rõ và vừa sức</b>.',
  qs:[{id:'pv',type:'single',q:'Phạm vi nào vừa sức cho một nhóm học sinh lớp 7?',opts:['Chatbot trả lời mọi câu hỏi trên đời','Chatbot trả lời khoảng 30 câu hỏi thường gặp về nội quy, lịch học của trường','Robot thay thầy cô dạy học'],ok:1},
   {id:'pvmo',type:'text',q:'Mô tả phạm vi ý tưởng của em: giúp ai, làm việc gì, ở đâu.',short:1,ans:'Ví dụ: giúp học sinh khối 6 trường em tra nhanh lịch thi, nội quy thư viện trong năm học này.'}],
  key:['Mô tả phạm vi: <b>giúp ai – làm việc gì – ở đâu, khi nào</b>; nhỏ, rõ, làm được.']},
 {t:'Ý tưởng có khả thi không?',hd:'Hoạt động 3 · Luyện tập',code:'7.D1.MR1',ic:'scale',
  story:'Dùng "máy soi khả thi": chọn ý tưởng, đánh giá 3 câu hỏi.',
  qs:[{id:'sim1',type:'sim',sim:'feas'},
   {id:'kt',type:'multi',q:'Câu hỏi để phân tích tính khả thi',opts:['Dữ liệu có dễ thu thập không?','Có rủi ro đạo đức không?','Mức độ phức tạp, chi phí có phù hợp không?','Tên dự án có hay không?'],ok:[0,1,2]}],
  key:['Khả thi khi: <b>dữ liệu dễ thu thập</b>, <b>rủi ro đạo đức thấp</b>, <b>độ phức tạp và chi phí phù hợp</b>.']},
 {t:'Vận dụng',hd:'Hoạt động 4 · Vận dụng',code:'7.D1.MR1',ic:'pen',
  story:'Phân tích ý tưởng của nhóm em.',
  qs:[{id:'pt',type:'text',q:'Ý tưởng – dữ liệu lấy ở đâu – rủi ro đạo đức – độ phức tạp, chi phí – kết luận khả thi?',ans:'Ví dụ: Chatbot nội quy – dữ liệu từ sổ tay học sinh (dễ) – rủi ro thấp nếu không hỏi thông tin cá nhân – làm bằng công cụ miễn phí thầy cô hướng dẫn – khả thi.'}],
  key:['Mỗi ý tưởng cần được <b>hỏi kĩ</b> trước khi thành dự án.']}
];
const DECL=[];
const GHIBAI={so:'Bài 7:',ten:'PHÁT HIỆN Ý TƯỞNG DỰ ÁN AI TỪ THỰC TIỄN',muc:[
 {step:2,h:'Phạm vi vấn đề',it:['Giúp ai – làm việc gì – ở đâu, khi nào; nhỏ, rõ, làm được.']},
 {step:3,h:'Tính khả thi',it:[],flow:['Dữ liệu dễ thu thập?','Rủi ro đạo đức?','Phức tạp, chi phí?']},
 {step:4,h:'Ghi nhớ',it:['Bắt đầu từ vấn đề thật, hỏi kĩ trước khi làm.']}]};
function renderGhiBai(){}
const QCODE={vd:'7.D1.1',pv:'7.D1.1',pvmo:'7.D1.1',kt:'7.D1.MR1',pt:'7.D1.MR1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
