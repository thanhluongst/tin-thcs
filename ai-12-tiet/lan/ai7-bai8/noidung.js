/* Giáo dục AI lớp 7 · Bài 8 (2 tiết) – soạn theo KHBD-AI-LOP 7. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:7,so:8,ten:'Lập kế hoạch dự án sáng tạo có sử dụng AI',yccd:'7.D2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ý tưởng đã thành kế hoạch chưa?',hd:'Hoạt động 1 · Khởi động · Tiết 1',code:'7.D2.1',ic:'student',
  story:'Nhóm em đã có ý tưởng ở Bài 7. Sáu câu hỏi trên bảng: <b>Làm gì? Cho ai? AI làm việc gì? Dữ liệu từ đâu? Ai làm, khi nào? Đo thế nào là thành công?</b>',
  qs:[{id:'pred',type:'single',q:'Ý tưởng của nhóm em đã trả lời đủ 6 câu chưa?',opts:['Đủ rồi','Chưa đủ'],ans:'Tự đánh giá – sẽ hoàn thiện trong bài.'}],
  key:['Câu hỏi lớn: <b>Ý tưởng của nhóm em đã thành một kế hoạch làm được chưa?</b>']},
 {t:'Ba phần của kế hoạch',hd:'Hoạt động 2 · Hình thành kiến thức · Tiết 1',code:'7.D2.1',ic:'paper',
  story:'Dùng "máy kiểm tra kế hoạch": điền kế hoạch mẫu, máy chỉ ra mục còn thiếu hoặc chưa đo được.',
  qs:[{id:'sim1',type:'sim',sim:'plan'},
   {id:'q2',type:'single',q:'Mục "AI làm gì" viết đúng là…',opts:['"AI giúp mọi người"','"AI trả lời câu hỏi về lịch thi cho học sinh khối 6, dựa trên lịch thi nhà trường công bố"','"Dùng AI hiện đại"'],ok:1},
   {id:'q2b',type:'single',q:'Tiêu chí thành công đo được là…',opts:['"Chatbot rất tốt"','"Trả lời đúng ít nhất 8/10 câu hỏi thử, 6/10 bạn khối 6 thấy hữu ích"','"Mọi người thích"'],ok:1}],
  key:['Kế hoạch có: <b>mục tiêu</b> (làm gì, cho ai) – <b>cách làm</b> (AI làm một việc dựa trên dữ liệu nào, ai làm, khi nào) – <b>kiểm tra</b> (tiêu chí đo được, có người đối chiếu kết quả AI).']},
 {t:'Rủi ro và biện pháp',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'7.D2.1',ic:'lock',
  story:'Ghép rủi ro với biện pháp cụ thể.',
  qs:[{id:'rr',type:'match',q:'Rủi ro – biện pháp',items:['Chatbot trả lời sai lịch thi','Học sinh nhập họ tên, số điện thoại vào chatbot','Nhóm làm không kịp'],opts:['Thầy cô đối chiếu 10 câu trả lời trước khi cho dùng','Ghi rõ "không nhập thông tin cá nhân", không lưu tên','Chia việc theo tuần, thu hẹp còn 20 câu hỏi'],ok:[0,1,2]}],
  key:['Biện pháp tốt là biện pháp <b>cụ thể, có người làm</b>, không chung chung.']},
 {t:'Hoàn thiện và góp ý',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'7.D2.1',ic:'pen',
  story:'Nhóm viết kế hoạch hoàn chỉnh, đổi chéo với nhóm bạn để góp ý, rồi sửa.',
  qs:[{id:'kh',type:'text',q:'Kế hoạch dự án của nhóm (mục tiêu – cách làm – kiểm tra – rủi ro)',ans:'Kế hoạch đạt khi trả lời đủ 6 câu hỏi; AI làm một việc cụ thể dựa trên dữ liệu đã nêu; tiêu chí đo được; có người đối chiếu kết quả AI; có biện pháp cho rủi ro.'},
   {id:'sua',type:'text',q:'Nhóm đã sửa điều gì sau góp ý?',short:1,ans:'Ví dụ: đổi tiêu chí "chatbot tốt" thành "đúng 8/10 câu thử".'}],
  key:['Kế hoạch tốt là kế hoạch <b>đã được hỏi, được thử và được sửa</b> có ghi lại.']}
];
const DECL=[];
const GHIBAI={so:'Bài 8:',ten:'LẬP KẾ HOẠCH DỰ ÁN SÁNG TẠO CÓ SỬ DỤNG AI',muc:[
 {step:2,h:'Ba phần của kế hoạch',it:[],flow:['Mục tiêu','Cách làm','Kiểm tra']},
 {step:3,h:'Rủi ro – biện pháp',it:['Biện pháp cụ thể, có người làm.']},
 {step:4,h:'Ghi nhớ',it:['Hỏi – thử – sửa – ghi lại.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.D2.1',q2:'7.D2.1',q2b:'7.D2.1',rr:'7.D2.1',kh:'7.D2.1',sua:'7.D2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
