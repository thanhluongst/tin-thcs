/* Giáo dục AI lớp 7 · Bài 4 (2 tiết) – soạn theo KHBD-AI-LOP 7. Ứng dụng giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:7,so:4,ten:'Đánh giá ứng dụng và xây dựng môi trường AI có đạo đức',yccd:'7.B2.1 · 7.B2.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ứng dụng này có ổn không?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'7.B2.1',ic:'bot',
  story:'Ba ứng dụng (giả định): <b>A</b> – chatbot học tiếng Anh; <b>B</b> – "Đoán tương lai qua khuôn mặt"; <b>C</b> – chấm điểm bài văn tự động.',
  qs:[{id:'pred',type:'text',q:'Muốn biết một ứng dụng AI có phù hợp, an toàn không, em sẽ xem những điều gì?',ans:'Dự đoán: có lấy dữ liệu thừa không, có công bằng không, có nói rõ cách hoạt động không, có đúng không, ai chịu trách nhiệm…'}],
  key:['Những điều em vừa nêu chính là <b>tiêu chí</b> để đánh giá ứng dụng AI.']},
 {t:'Năm tiêu chí đạo đức',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'7.B2.1',ic:'scale',
  story:'Dùng "phiếu chấm ứng dụng": với mỗi ứng dụng, đánh giá 5 tiêu chí rồi so với nhận xét mẫu.',
  qs:[{id:'sim1',type:'sim',sim:'rate'},
   {id:'tc',type:'multi',q:'Năm tiêu chí (dựa trên nguyên tắc đạo đức)',opts:['Riêng tư: chỉ lấy dữ liệu cần thiết','Công bằng, không thiên vị','Minh bạch, giải thích được','Chính xác và an toàn','Có con người chịu trách nhiệm','Giao diện đẹp'],ok:[0,1,2,3,4]},
   {id:'q2',type:'single',q:'Một ứng dụng đạt tiêu chí này thì…',opts:['Chắc chắn đạt hết tiêu chí khác','Có thể vẫn chưa đạt tiêu chí khác','Không cần xem tiếp'],ok:1}],
  key:['5 tiêu chí: <b>riêng tư – công bằng – minh bạch – chính xác, an toàn – trách nhiệm của con người</b>. Một ứng dụng có thể đạt tiêu chí này nhưng chưa đạt tiêu chí khác.']},
 {t:'Hành động xây dựng môi trường AI có đạo đức',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 2',code:'7.B2.2',ic:'student',
  story:'Người dùng cũng góp phần làm môi trường AI tốt hơn. Phân loại các hành động.',
  qs:[{id:'hd',type:'sort',q:'Hành động này…',cols:{tot:'Góp phần xây dựng',xau:'Làm môi trường xấu đi'},items:[
     {t:'Báo lỗi khi chatbot trả lời sai',a:'tot'},{t:'Chia sẻ ứng dụng "đoán tương lai qua khuôn mặt" cho cả lớp',a:'xau'},{t:'Yêu cầu ứng dụng giải thích vì sao gợi ý như vậy',a:'tot'},
     {t:'Không dùng ứng dụng tạo ảnh chế giễu người khác',a:'tot'},{t:'Dùng AI tạo tin giả cho vui',a:'xau'},{t:'Đánh giá trung thực ứng dụng trên kho ứng dụng',a:'tot'}]}],
  key:['Hành động: <b>báo cáo lỗi, không dùng ứng dụng độc hại, yêu cầu minh bạch</b>, góp ý trung thực.']},
 {t:'Luyện tập – Vận dụng',hd:'Hoạt động 3–4 · Luyện tập, vận dụng · Tiết 2',code:'7.B2.1',ic:'pen',
  story:'Chọn một ứng dụng AI em biết, đánh giá theo 5 tiêu chí.',
  qs:[{id:'lab',type:'sim',sim:'lab_tuyenchon'},{id:'dg',type:'text',q:'Ứng dụng – đạt tiêu chí nào – chưa đạt tiêu chí nào – em sẽ làm gì?',ans:'Ví dụ: Ứng dụng dịch – minh bạch (ghi rõ dịch máy), chính xác khá; riêng tư chưa rõ (lưu đoạn văn?) → em không dịch thông tin cá nhân, báo lỗi khi dịch sai.'},
   {id:'cam',type:'single',q:'Việc em cam kết',opts:['Báo lỗi và không dùng ứng dụng độc hại','Dùng ứng dụng nào đông người dùng là được'],ok:0}],
  key:['Đánh giá trước khi dùng; <b>hành động</b> để môi trường AI tốt hơn.']}
];
const DECL=[];
const GHIBAI={so:'Bài 4:',ten:'ĐÁNH GIÁ ỨNG DỤNG VÀ XÂY DỰNG MÔI TRƯỜNG AI CÓ ĐẠO ĐỨC',muc:[
 {step:2,h:'Năm tiêu chí',it:[],tb:[['Tiêu chí','Câu hỏi'],['Riêng tư','Có lấy dữ liệu thừa?'],['Công bằng','Có thiên vị ai?'],['Minh bạch','Có giải thích được?'],['Chính xác, an toàn','Có đúng, có gây hại?'],['Trách nhiệm','Ai chịu trách nhiệm?']]},
 {step:3,h:'Hành động của người dùng',it:['Báo lỗi; không dùng ứng dụng độc hại; yêu cầu minh bạch.']},
 {step:4,h:'Ghi nhớ',it:['Đánh giá trước khi dùng.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.B2.1',tc:'7.B2.1',q2:'7.B2.1',dg:'7.B2.1',hd:'7.B2.2',cam:'7.B2.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
