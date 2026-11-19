/* Giáo dục AI lớp 8 · Bài 1 (2 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống, nhân vật giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:1,ten:'AI không thay thế con người và rủi ro khi lạm dụng AI tạo sinh',yccd:'8.A1.1 · 8.A1.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Lời nhắn nào do AI viết?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'8.A1.1',ic:'chat',
  story:'<b>Tình huống:</b> Bạn Minh (giả định) bị ốm phải nghỉ học một tuần. Minh nhận được hai lời nhắn:<br><b>X:</b> “Ê Minh, hôm nay cô hỏi mày đó. Mai tao mang vở qua chép bài cho, nhớ ăn cháo nha 😄”<br><b>Y:</b> “Chúc bạn sớm hồi phục sức khoẻ. Sức khoẻ là tài sản quý giá nhất. Hãy nghỉ ngơi hợp lí và bổ sung dinh dưỡng đầy đủ.”',
  qs:[{id:'pred',type:'single',q:'Lời nhắn nào nhiều khả năng do AI viết?',opts:['Lời nhắn X','Lời nhắn Y','Không đoán được'],ans:'Dự đoán: Y trơn tru nhưng chung chung; X có chi tiết riêng (cô hỏi, mang vở, ăn cháo) chỉ bạn thân mới biết.'},
      {id:'before',type:'text',q:'Lúc đầu em nghĩ: AI có thể thay con người làm mọi việc không? Vì sao?',short:1,ph:'Lúc đầu em nghĩ … vì …',ans:'Dự đoán, không chấm đúng sai. Sẽ đối chiếu ở cuối bài.'}],
  key:['Lời nhắn của bạn thân có <b>tình cảm và chi tiết riêng</b> – điều AI khó thay thế.','Câu hỏi lớn: <b>Việc nào không nên giao cho AI, dù AI làm được?</b>']},
 {t:'Ba lĩnh vực: Giáo dục, Y tế, Nghệ thuật',hd:'Hoạt động 2.1–2.2 · Hình thành kiến thức · Tiết 1',code:'8.A1.1',ic:'student',
  story:'Ba thẻ tình huống (giả định): <b>Giáo dục</b> – trường định để AI chấm và nhận xét toàn bộ bài văn; <b>Y tế</b> – phòng khám định để AI báo kết quả bệnh nặng cho bệnh nhân; <b>Nghệ thuật</b> – cuộc thi vẽ cho phép nộp tranh AI vẽ thay. Dùng mô phỏng để xem điều gì xảy ra khi giao <b>hết</b> cho AI.',
  qs:[{id:'sim1',type:'sim',sim:'replace'},
   {id:'obs1',type:'single',q:'Quan sát mô phỏng (thử cả 3 lĩnh vực): mức giao việc nào giữ được cả tốc độ lẫn sự thấu hiểu, trách nhiệm?',opts:['Giao hết cho AI (100%)','AI hỗ trợ, con người quyết định và trò chuyện (khoảng 30–50%)','Không dùng AI chút nào (0%)'],ok:1},
   {id:'match1',type:'match',q:'Nối mỗi lĩnh vực với việc KHÔNG nên giao hẳn cho AI',items:['Giáo dục','Y tế','Nghệ thuật'],opts:['Động viên, hiểu tâm lí học sinh khi nhận xét bài','Báo tin bệnh nặng và cùng bệnh nhân quyết định cách chữa','Thể hiện cảm xúc, trải nghiệm riêng trong tác phẩm'],ok:[0,1,2]},
   {id:'add',type:'text',q:'Bổ sung một ý cho phiếu của nhóm bạn (lĩnh vực khác):',short:1,ans:'Ví dụ: Y tế – AI gợi ý chẩn đoán, nhưng bác sĩ trò chuyện, giải thích và chịu trách nhiệm quyết định.'}],
  key:['AI có thể <b>hỗ trợ</b> (chấm nhanh, gợi ý chẩn đoán, gợi ý màu) nhưng không nên <b>thay thế</b> con người ở phần cần tình cảm, trách nhiệm, sáng tạo.']},
 {t:'Bốn tiêu chí "không nên giao"',hd:'Hoạt động 2.3 · Hình thành kiến thức · Tiết 1',code:'8.A1.1',ic:'scale',
  story:'Tranh biện: <i>“AI viết lời an ủi còn hay hơn người, vậy cứ để AI an ủi bạn buồn.”</i> Em đồng ý không? Lí do “AI còn làm chưa tốt” có đủ không?',
  qs:[{id:'tf1',type:'tf',q:'Đúng hay sai?',items:[
     {t:'Kể cả khi AI làm được, việc cần cảm xúc và quan hệ tin cậy giữa người với người không nên giao hẳn cho AI.',a:'T'},
     {t:'Lí do duy nhất không giao cho AI là vì AI hiện nay còn làm sai nhiều.',a:'F'},
     {t:'Quyết định quan trọng cần một người chịu trách nhiệm, nên con người phải là người quyết định cuối cùng.',a:'T'},
     {t:'Tác phẩm nghệ thuật do AI vẽ thay vẫn thể hiện trải nghiệm riêng của người nộp.',a:'F'}]},
   {id:'crit',type:'multi',q:'Chọn các tiêu chí "không nên giao cho AI, dù AI làm được"',opts:['Cần cảm xúc, quan hệ tin cậy giữa người với người','Cần phán đoán đạo đức, giá trị','Cần người chịu trách nhiệm cho quyết định quan trọng','Cần dấu ấn sáng tạo, trải nghiệm riêng của con người','Việc lặp lại, tính toán nhiều'],ok:[0,1,2,3]}],
  key:['Bốn tiêu chí: (1) <b>cảm xúc, quan hệ tin cậy</b>; (2) <b>phán đoán đạo đức, giá trị</b>; (3) <b>trách nhiệm</b> quyết định quan trọng; (4) <b>dấu ấn sáng tạo</b> riêng.']},
 {t:'Lĩnh vực của em',hd:'Hoạt động 3.1 · Luyện tập · Tiết 1',code:'8.A1.1',ic:'pen',
  story:'Chọn một lĩnh vực mới (chăm sóc ông bà, thể thao, pháp luật, nấu ăn…). Nêu một việc không nên giao hẳn cho AI và lí do theo tiêu chí số mấy.',
  qs:[{id:'lab',type:'sim',sim:'lab_gaccong'},{id:'mine',type:'text',q:'Lĩnh vực – việc không nên giao cho AI – vì sao (tiêu chí số …)',ph:'Ví dụ: Trọng tài – …',ans:'Ví dụ đạt: “Trọng tài: camera AI hỗ trợ phát hiện việt vị, nhưng quyết định cuối cùng và chịu trách nhiệm là của trọng tài (tiêu chí 3).”'},
   {id:'q31',type:'single',q:'Lí do nào ĐÚNG theo bốn tiêu chí?',opts:['Không giao vì robot chăm ông bà còn vụng','Không giao việc trò chuyện, an ủi ông bà vì ông bà cần tình cảm của người thân','Không giao vì robot đắt'],ok:1}],
  key:['Lí do tốt nói về <b>giá trị của con người</b>, không chỉ “AI chưa giỏi”.']},
 {t:'Hai bạn, hai cách làm',hd:'Hoạt động 2.4–2.5 · Hình thành kiến thức · Tiết 2',code:'8.A1.2',ic:'bot',
  story:'Cô giao bài: viết báo cáo ngắn về rác thải nhựa ở địa phương. <b>An</b> (giả định) gõ đề vào chatbot rồi nộp nguyên văn. <b>Bình</b> tự lập dàn ý, hỏi chatbot gợi ý số liệu, rồi tự hỏi “số này lấy ở đâu, có đúng không”, đối chiếu sách và cộng lại bảng. Mô phỏng 10 tuần làm bài theo mỗi cách.',
  qs:[{id:'sim2',type:'sim',sim:'brain'},
   {id:'obs2',type:'single',q:'Sau 10 tuần, cách nào làm kĩ năng tư duy phản biện, sáng tạo giảm và để lọt nhiều thông tin sai nhất?',opts:['Cách của Bình: tự làm trước, đối chiếu sau','Cách của An: chép nguyên đầu ra AI','Hai cách như nhau'],ok:1},
   {id:'sortab',type:'sort',q:'Hợp lí hay lạm dụng AI tạo sinh?',cols:{ok:'Hợp lí',bad:'Lạm dụng'},items:[
     {t:'Nhờ AI viết hộ cả bài văn rồi nộp.',a:'bad'},{t:'Tự viết rồi nhờ AI chỉ lỗi chính tả, tự sửa.',a:'ok'},
     {t:'Hỏi AI gợi ý ý tưởng, chọn lọc rồi tự triển khai.',a:'ok'},{t:'Lấy số liệu AI đưa ra dùng ngay, không kiểm tra.',a:'bad'},
     {t:'Lần nào gặp bài khó cũng hỏi AI đáp án trước khi nghĩ.',a:'bad'},{t:'Đối chiếu câu trả lời của AI với sách giáo khoa.',a:'ok'}]}],
  key:['Lạm dụng AI tạo sinh có ba rủi ro: <b>suy giảm tư duy phản biện</b>, <b>suy giảm sáng tạo</b>, <b>dùng thông tin sai</b> không phát hiện.']},
 {t:'Quy trình năm bước',hd:'Hoạt động 2.6–3.2 · Luyện tập · Tiết 2',code:'8.A1.2',ic:'paper',
  story:'Dựng lại cách làm của Bình thành <b>quy trình năm bước</b> dùng AI tạo sinh có kiểm chứng. Bước nào chặn nguy cơ nào?',
  qs:[{id:'sim3',type:'sim',sim:'steps5'},
   {id:'match2',type:'match',q:'Bước nào chặn rủi ro nào?',items:['① Tự làm trước','③ Kiểm chứng với nguồn tin cậy','⑤ Ghi rõ phần tự làm, phần AI hỗ trợ'],opts:['Giữ tư duy, sáng tạo của em','Không dùng thông tin sai','Trung thực, có trách nhiệm'],ok:[0,1,2]},
   {id:'task',type:'text',q:'Nhiệm vụ: "Kể tên 3 loại rác thải nhựa phổ biến." Ghi ô ① (em tự làm) và ④ (giữ hay sửa ý AI, vì sao).',ans:'Ví dụ: ① chai nhựa, túi ni lông, ống hút. AI (mô phỏng) thêm "lon nhôm" → ④ sửa: lon nhôm không phải nhựa (đối chiếu SGK KHTN).'}],
  key:['① <b>Tự làm trước</b> → ② <b>Hỏi AI có mục đích</b> → ③ <b>Kiểm chứng</b> với nguồn → ④ <b>Quyết định</b> giữ/sửa có lí do → ⑤ <b>Ghi rõ</b> phần AI hỗ trợ.']},
 {t:'Vì sao phải kiểm chứng?',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'8.A1.2',ic:'lock',
  story:'Viết 1–2 câu trả lời: <i>Vì sao phải kiểm chứng đầu ra AI trước khi dùng?</i> Gợi ý: “Vì AI có thể …, nên em …”.',
  qs:[{id:'why',type:'text',q:'Vì sao phải kiểm chứng?',ans:'Vì AI tạo sinh có thể đưa ra thông tin sai nhưng nghe rất thuyết phục, nên em phải đối chiếu với nguồn tin cậy; em là người chịu trách nhiệm với sản phẩm của mình.'},
   {id:'q4',type:'single',q:'Nguồn kiểm chứng phù hợp nhất cho số liệu trong bài?',opts:['Hỏi lại chính chatbot đó','Sách giáo khoa, trang của cơ quan nhà nước, hỏi thầy cô','Bình luận trên mạng xã hội'],ok:1}],
  key:['AI có thể <b>sai mà vẫn tự tin</b>; em chịu trách nhiệm với bài của mình.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.A1.1 – 8.A1.2',ic:'scale',
  story:'Nhìn lại dự đoán lúc đầu của em ở Hoạt động 1.',
  qs:[{id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: em giữ hay đổi ý, vì sao.'}],
  key:['AI <b>hỗ trợ</b>, không <b>thay thế</b> con người ở việc cần tình cảm, đạo đức, trách nhiệm, sáng tạo.','Dùng AI tạo sinh theo <b>5 bước</b>, luôn <b>kiểm chứng</b>.']}
];
const DECL=[];
/* ---- Ghi bài ---- */
const GHIBAI={so:'Bài 1:',ten:'AI KHÔNG THAY THẾ CON NGƯỜI VÀ RỦI RO KHI LẠM DỤNG AI TẠO SINH',muc:[
 {step:1,h:'Câu hỏi lớn',it:['Việc nào <b>không nên giao cho AI</b>, dù AI làm được?']},
 {step:2,h:'AI hỗ trợ – con người quyết định',it:['Giáo dục, y tế, nghệ thuật: AI <b>hỗ trợ</b>, con người giữ phần cần tình cảm, trách nhiệm.'],
  tb:[['Lĩnh vực','Không nên giao hẳn cho AI'],['Giáo dục','động viên, hiểu tâm lí HS'],['Y tế','báo tin, quyết định cách chữa'],['Nghệ thuật','cảm xúc, trải nghiệm riêng']]},
 {step:3,h:'Bốn tiêu chí',it:['(1) Cảm xúc, tin cậy','(2) Đạo đức, giá trị','(3) Trách nhiệm','(4) Dấu ấn sáng tạo']},
 {step:5,h:'Rủi ro khi lạm dụng AI tạo sinh',it:['Giảm <b>tư duy phản biện</b>, giảm <b>sáng tạo</b>, dùng <b>thông tin sai</b>.']},
 {step:6,h:'Quy trình 5 bước',it:[],flow:['Tự làm trước','Hỏi AI','Kiểm chứng','Quyết định','Ghi rõ']},
 {step:8,h:'Ghi nhớ',it:['AI hỗ trợ, <b>không thay thế</b> con người.','Luôn <b>kiểm chứng</b> đầu ra AI.']}]};
function renderGhiBai(){}
/* ---- Mã YCCĐ của từng câu ---- */
const QCODE={pred:'8.A1.1',before:'8.A1.1',obs1:'8.A1.1',match1:'8.A1.1',add:'8.A1.1',tf1:'8.A1.1',crit:'8.A1.1',mine:'8.A1.1',q31:'8.A1.1',
  obs2:'8.A1.2',sortab:'8.A1.2',match2:'8.A1.2',task:'8.A1.2',why:'8.A1.2',q4:'8.A1.2',after:'8.A1.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
