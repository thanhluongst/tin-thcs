/* Giáo dục AI lớp 9 · Bài 2 (2 tiết) – soạn theo KHBD-AI-LOP 9. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:9,so:2,ten:'Học tập, thể hiện bản thân và định hướng nghề nghiệp trong thế giới AI',yccd:'9.A3.1 · 9.A3.2 · 9.A3.3 · 9.A3.4'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Năng lực cần rèn trong thế giới có AI',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'9.A3.1',ic:'student',
  story:'AI tóm tắt sách, viết đoạn văn, giải bài toán trong vài giây. Vậy học sinh lớp 9 còn cần rèn luyện gì?',
  qs:[{id:'nl',type:'multi',q:'Năng lực con người cần rèn luyện trong thế giới có AI',opts:['Biết học cách học, tự học suốt đời','Tư duy phản biện: phân tích, đánh giá thông tin do AI đưa ra','Sáng tạo, giao tiếp, hợp tác','Chỉ cần biết gõ câu lệnh cho AI'],ok:[0,1,2]},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ: có AI rồi thì có cần học nhiều nữa không?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Cần rèn: <b>học cách học, tư duy phản biện, sáng tạo, giao tiếp, hợp tác</b>.']},
 {t:'Mục tiêu học tập của em',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'9.A3.2',ic:'paper',
  story:'Phân loại các mục tiêu học tập có dùng AI.',
  qs:[{id:'mt',type:'sort',q:'Mục tiêu này…',cols:{tot:'Mục tiêu tốt',chua:'Chưa phù hợp'},items:[
     {t:'Dùng AI tóm tắt tài liệu rồi tự kiểm chứng ý chính',a:'tot'},{t:'Luyện nói tiếng Anh với AI 15 phút mỗi ngày',a:'tot'},{t:'Nhờ AI làm hết bài tập Toán',a:'chua'},
     {t:'Dùng AI ra đề luyện tư duy logic, tự giải trước',a:'tot'},{t:'Dùng AI viết thay bài văn nghị luận',a:'chua'}]},
   {id:'mtem',type:'text',q:'Viết một mục tiêu học tập cá nhân có dùng AI (cụ thể, có thời hạn).',ans:'Ví dụ: Trong 4 tuần, mỗi tối em dùng AI ra 5 câu hỏi đọc hiểu tiếng Anh, tự làm rồi đối chiếu, ghi lỗi sai vào sổ.'}],
  key:['Mục tiêu tốt: AI giúp <b>em luyện tập</b>, em <b>tự làm và kiểm chứng</b>; cụ thể, có thời hạn.']},
 {t:'AI giúp thể hiện bản thân',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 2',code:'9.A3.3',ic:'img',
  story:'Bạn Khánh (giả định) mê sáng tác nhạc. Bạn dùng AI gợi ý hoà âm, còn lời và giai điệu chính do bạn tự viết.',
  qs:[{id:'q3',type:'single',q:'Cách dùng nào giúp Khánh thể hiện bản thân?',opts:['Để AI sáng tác toàn bộ bài rồi đăng tên mình','Tự viết ý tưởng chính, dùng AI gợi ý phần phụ và ghi rõ','Không bao giờ dùng AI'],ok:1},
   {id:'vd3',type:'text',q:'Ví dụ em dùng AI để theo đuổi một đam mê của em.',short:1,ans:'Ví dụ: Em thích vẽ, dùng AI gợi ý bảng màu rồi tự vẽ; ghi rõ phần AI gợi ý.'}],
  key:['AI là <b>công cụ</b> giúp thể hiện bản thân; <b>ý tưởng và dấu ấn</b> là của em.']},
 {t:'Nghề nghiệp thay đổi thế nào?',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'9.A3.4',ic:'bot',
  story:'Dùng "bản đồ nghề tương lai": chọn một nghề, xem việc nào AI làm, việc nào con người vẫn giữ và kĩ năng cần trang bị.',
  qs:[{id:'lab',type:'sim',sim:'lab_nghenghiep'},{id:'sim1',type:'sim',sim:'job'},
   {id:'q4',type:'single',q:'Nhận xét chung đúng nhất',opts:['AI sẽ thay hết mọi nghề','Nhiều việc lặp lại do AI làm; con người cần kĩ năng làm việc cùng AI và những việc cần phán đoán, giao tiếp, sáng tạo','Nghề nghiệp không thay đổi gì'],ok:1}],
  key:['AI thay đổi <b>cách làm</b> của nhiều nghề; cần kĩ năng <b>dùng AI, kiểm chứng, giao tiếp, sáng tạo</b>.']},
 {t:'Vận dụng: Nghề em quan tâm',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'9.A3.4',ic:'pen',
  story:'Chọn một nghề em quan tâm.',
  qs:[{id:'nghe',type:'text',q:'AI có thể thay đổi nghề đó thế nào? Em cần trang bị 2 kĩ năng gì?',ans:'Ví dụ: Nghề kế toán – AI nhập liệu, đối chiếu sổ; người kế toán phân tích, tư vấn. Kĩ năng: dùng phần mềm có AI, kiểm tra số liệu, giao tiếp với khách hàng.'},
   {id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá.'}],
  key:['Học để <b>làm chủ AI</b>, không để AI làm thay mình.']}
];
const DECL=[];
const GHIBAI={so:'Bài 2:',ten:'HỌC TẬP, THỂ HIỆN BẢN THÂN VÀ ĐỊNH HƯỚNG NGHỀ NGHIỆP TRONG THẾ GIỚI AI',muc:[
 {step:1,h:'Năng lực cần rèn',it:['Học cách học, tư duy phản biện, sáng tạo, giao tiếp, hợp tác.']},
 {step:2,h:'Mục tiêu học tập',it:['AI giúp em luyện tập; em tự làm, kiểm chứng; cụ thể, có thời hạn.']},
 {step:3,h:'Thể hiện bản thân',it:['Ý tưởng, dấu ấn là của em; AI hỗ trợ.']},
 {step:4,h:'Nghề nghiệp',it:[],tb:[['AI làm','Con người giữ'],['việc lặp lại, nhiều dữ liệu','phán đoán, giao tiếp, sáng tạo, chịu trách nhiệm']]}]};
function renderGhiBai(){}
const QCODE={nl:'9.A3.1',before:'9.A3.1',mt:'9.A3.2',mtem:'9.A3.2',q3:'9.A3.3',vd3:'9.A3.3',q4:'9.A3.4',nghe:'9.A3.4',after:'9.A3.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
