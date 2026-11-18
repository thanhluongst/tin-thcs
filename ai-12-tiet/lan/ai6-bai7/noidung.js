/* Giáo dục AI lớp 6 · Bài 7 (1 tiết) – soạn theo KHBD-AI-LOP 6. Tên nhân vật giả định; không dùng công cụ AI thật. */
const BAI={lop:6,so:7,ten:'Lựa chọn sử dụng AI phù hợp',yccd:'6.D1.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Minh nhờ AI viết hộ',hd:'Hoạt động 1 · Mở đầu',code:'6.D1.1',ic:'chat',
  story:'Bạn Minh (giả định) định nhờ AI viết hộ bài văn tả mẹ để nộp cho cô.',
  qs:[{id:'q1',type:'single',q:'Việc này…',opts:['Nên – cho nhanh','Không nên – em cần tự luyện viết và bài văn phải là cảm xúc của em'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ: khi nào thì nên dùng AI?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Không để AI <b>làm thay</b> việc em cần tự luyện.']},
 {t:'Ba câu hỏi trước khi dùng AI',hd:'Hoạt động 2 · Hình thành kiến thức',code:'6.D1.1',ic:'scale',
  story:'Với mỗi tình huống, trả lời <b>3 câu hỏi</b>, đèn tín hiệu sẽ cho biết <b>🟢 Nên – 🟡 Cân nhắc – 🔴 Không nên</b>.',
  qs:[{id:'sim1',type:'sim',sim:'light'},
   {id:'q2',type:'multi',q:'Ba câu hỏi trước khi dùng AI',opts:['AI có giúp em học, làm tốt hơn không?','Em vẫn tự làm, tự quyết chứ?','Có an toàn, được phép không?','AI có miễn phí không?'],ok:[0,1,2]}],
  key:['3 câu hỏi: <b>Có giúp em tốt hơn? Em vẫn tự làm, tự quyết? Có an toàn, được phép?</b>']},
 {t:'Nên – Cân nhắc – Không nên',hd:'Hoạt động 3 · Luyện tập',code:'6.D1.1',ic:'paper',
  story:'Nhóm em xếp các thẻ tình huống vào 3 cột.',
  qs:[{id:'sort3',type:'sort',q:'Tình huống này…',cols:{nen:'🟢 Nên',can:'🟡 Cân nhắc',khong:'🔴 Không nên'},items:[
     {t:'Luyện phát âm tiếng Anh với ứng dụng',a:'nen'},{t:'Nhờ AI viết hộ bài văn tả mẹ',a:'khong'},{t:'Hỏi bản đồ đường đến nhà sách',a:'nen'},
     {t:'Hỏi AI tìm ý tưởng cho bài thuyết trình',a:'can'},{t:'Gửi ảnh bạn cho ứng dụng chỉnh mặt',a:'khong'},{t:'Hỏi AI cách giải rồi tự làm lại bài',a:'can'}]},
   {id:'alt',type:'text',q:'Chọn một thẻ "Không nên", đề xuất cách làm thay thế.',short:1,ans:'Ví dụ: Thay vì nhờ AI viết hộ, em tự lập dàn ý, viết rồi nhờ thầy cô hoặc bố mẹ góp ý.'}],
  key:['Hợp lí hay không tuỳ <b>mục đích</b> và em có <b>còn tự làm, tự quyết</b>; nói rõ phần AI giúp.']},
 {t:'Vận dụng: Thẻ cam kết',hd:'Hoạt động 4 · Vận dụng',code:'6.D1.1',ic:'pen',
  story:'Viết thẻ cam kết khi dùng AI.',
  qs:[{id:'cam',type:'text',q:'Em cam kết…',ans:'Ví dụ: Em hỏi 3 câu trước khi dùng AI; tự làm bài trước; nói rõ phần AI giúp; không đưa ảnh, thông tin của bạn vào ứng dụng.'},
   {id:'q4',type:'single',q:'Cam kết phù hợp?',opts:['Nói rõ phần AI hỗ trợ','Giấu việc dùng AI'],ok:0},
   {id:'after',type:'text',q:'Bây giờ em nghĩ: khi nào nên dùng AI?',short:1,ans:'Khi AI giúp em học tốt hơn, em vẫn tự làm, tự quyết và an toàn.'}],
  key:['<b>Trung thực</b>: nói rõ phần tự làm và phần AI hỗ trợ.']}
];
const DECL=[];
const GHIBAI={so:'Bài 7:',ten:'LỰA CHỌN SỬ DỤNG AI PHÙ HỢP',muc:[
 {step:2,h:'Ba câu hỏi trước khi dùng AI',it:['Có giúp em tốt hơn?','Em vẫn tự làm, tự quyết?','Có an toàn, được phép?']},
 {step:3,h:'Đèn tín hiệu',it:[],tb:[['Đèn','Ví dụ'],['🟢 Nên','luyện phát âm, hỏi đường'],['🟡 Cân nhắc','tìm ý tưởng, hỏi cách giải'],['🔴 Không nên','viết hộ bài, gửi ảnh bạn']]},
 {step:4,h:'Ghi nhớ',it:['AI hỗ trợ, <b>không làm thay</b>; nói rõ phần AI giúp.']}]};
function renderGhiBai(){}
const QCODE={q1:'6.D1.1',before:'6.D1.1',q2:'6.D1.1',sort3:'6.D1.1',alt:'6.D1.1',cam:'6.D1.1',q4:'6.D1.1',after:'6.D1.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
