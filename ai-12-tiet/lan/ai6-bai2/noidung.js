/* Giáo dục AI lớp 6 · Bài 2 (2 tiết) – soạn theo KHBD-AI-LOP 6. Tình huống giả định; mô phỏng chỉ để minh hoạ, không dùng công cụ AI thật. */
const BAI={lop:6,so:2,ten:'Học tập, kiểm chứng và ra quyết định với AI',yccd:'6.A1.3 · 6.A3.1 · 6.A3.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Trợ lí ảo luôn đúng?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'6.A1.3',ic:'chat',
  story:'Bạn Nam (giả định) hỏi trợ lí ảo để làm bài tập và định chép nguyên câu trả lời vào vở.',
  qs:[{id:'pred',type:'single',q:'Trợ lí ảo có thể trả lời sai không?',opts:['Không bao giờ','Có thể sai','Chỉ sai khi mất mạng'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ: có nên chép ngay câu trả lời của AI không?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['AI <b>có thể sai</b> dù trả lời rất tự tin.']},
 {t:'Kiểm tra lại kết quả AI',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'6.A1.3',ic:'paper',
  story:'Trợ lí ảo giả lập trả lời 6 câu. Em <b>đoán</b> câu nào tin được, rồi bấm <b>📖 Tra SGK</b> để kiểm chứng.',
  qs:[{id:'sim1',type:'sim',sim:'check'},
   {id:'q2',type:'single',q:'Trước khi dùng kết quả AI, em cần…',opts:['Chép ngay cho nhanh','Đối chiếu SGK, nguồn tin cậy hoặc hỏi thầy cô','Hỏi lại chính AI đó'],ok:1},
   {id:'q2b',type:'multi',q:'Nguồn nào dùng để kiểm chứng được?',opts:['Sách giáo khoa','Thầy cô','Trang web của cơ quan nhà nước, nhà trường','Bình luận của người lạ trên mạng'],ok:[0,1,2]}],
  key:['Kiểm chứng: <b>SGK – nguồn tin cậy – thầy cô</b>.']},
 {t:'Ai ra quyết định?',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'6.A3.1',ic:'scale',
  story:'Mô phỏng <b>bác sĩ và AI</b>: AI gợi ý chẩn đoán kèm độ tin cậy; bác sĩ xem xét rồi mới quyết định.',
  qs:[{id:'sim2',type:'sim',sim:'doctor'},
   {id:'q3',type:'single',q:'Trong y tế, ai quyết định chẩn đoán?',opts:['AI','Bác sĩ, có AI hỗ trợ','Bệnh nhân tự đoán'],ok:1},
   {id:'ex3',type:'text',q:'Nêu một ví dụ khác con người ra quyết định với sự hỗ trợ của AI.',short:1,ans:'Ví dụ: bản đồ gợi ý đường, bố mẹ chọn đường đi; ứng dụng thời tiết báo mưa, em quyết định mang áo mưa.'}],
  key:['AI <b>gợi ý</b> → con người <b>cân nhắc</b> → con người <b>quyết định</b> kèm lí do.']},
 {t:'AI giúp em học tốt hơn',hd:'Hoạt động 2.3 · Hình thành kiến thức · Tiết 2',code:'6.A3.2',ic:'student',
  story:'Phân loại các cách dùng AI: <b>giúp em học</b> hay <b>làm thay em</b>?',
  qs:[{id:'sort4',type:'sort',q:'Cách dùng này…',cols:{hoc:'Giúp em học',thay:'Làm thay em'},items:[
     {t:'Luyện phát âm tiếng Anh rồi tự sửa',a:'hoc'},{t:'Nhờ AI viết hộ bài văn',a:'thay'},{t:'Hỏi gợi ý rồi tự giải bài toán',a:'hoc'},
     {t:'Chép nguyên đáp án bài tập',a:'thay'},{t:'Tra nghĩa từ mới rồi tự đặt câu',a:'hoc'},{t:'Nhờ AI làm bài thu hoạch',a:'thay'}]},
   {id:'q4',type:'multi',q:'Ba lợi ích của AI khi dùng đúng cách',opts:['Học hỏi','Rèn luyện kĩ năng','Mở rộng hiểu biết','Làm bài thay em'],ok:[0,1,2]}],
  key:['Lợi ích: <b>học hỏi, rèn luyện kĩ năng, mở rộng hiểu biết</b> – khi em vẫn tự suy nghĩ, tự làm và kiểm tra lại.']},
 {t:'Luyện tập – Vận dụng: Ba bước ra quyết định',hd:'Hoạt động 3–4 · Luyện tập, vận dụng · Tiết 2',code:'6.A3.1',ic:'pen',
  story:'Ứng dụng thời tiết (giả định) báo: <b>“70% khả năng mưa chiều nay”</b>. Lớp em định đi tham quan vườn trường lúc 15 giờ.',
  qs:[{id:'lab',type:'sim',sim:'lab_thamtu'},{id:'dec',type:'text',q:'Ra quyết định theo 3 bước: nêu lại gợi ý – cân nhắc – lựa chọn kèm lí do.',ans:'Gợi ý: 70% có mưa. Cân nhắc: xem trời, hỏi thầy cô, mưa thì đường trơn. Lựa chọn: vẫn đi nhưng mang áo mưa / dời sang sáng mai, vì …'},
   {id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: kết quả AI phải kiểm chứng; AI gợi ý, em quyết định.'}],
  key:['Ba bước: <b>nêu lại gợi ý → cân nhắc → lựa chọn kèm lí do</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 2:',ten:'HỌC TẬP, KIỂM CHỨNG VÀ RA QUYẾT ĐỊNH VỚI AI',muc:[
 {step:2,h:'Kiểm tra lại kết quả AI',it:['AI có thể sai.'],flow:['SGK','Nguồn tin cậy','Thầy cô']},
 {step:3,h:'Con người ra quyết định',it:[],flow:['AI gợi ý','Con người cân nhắc','Con người quyết định']},
 {step:4,h:'Lợi ích khi dùng đúng cách',it:['Học hỏi, rèn luyện kĩ năng, mở rộng hiểu biết.']},
 {step:5,h:'Ghi nhớ',it:['Kiểm chứng trước khi dùng; AI gợi ý – <b>em quyết định</b>.']}]};
function renderGhiBai(){}
const QCODE={pred:'6.A1.3',before:'6.A1.3',q2:'6.A1.3',q2b:'6.A1.3',q3:'6.A3.1',ex3:'6.A3.1',dec:'6.A3.1',sort4:'6.A3.2',q4:'6.A3.2',after:'6.A3.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
