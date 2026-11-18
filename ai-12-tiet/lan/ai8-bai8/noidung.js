/* Giáo dục AI lớp 8 · Bài 8 (2 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống giả định; mô phỏng chỉ để minh hoạ, không dùng chatbot thật. */
const BAI={lop:8,so:8,ten:'Thiết kế kịch bản hội thoại có ứng dụng AI',yccd:'8.D2.1 · 8.A3.MR1 · 8.A2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Chatbot này có ổn không?',hd:'Hoạt động 1 · Khởi động · Tiết 1',code:'8.A2.1',ic:'chat',
  story:'Chatbot thư viện trường (giả định):<br>🧑 “Thư viện có sách về vũ trụ không?”<br>🤖 “Cho mình xin <b>số điện thoại, địa chỉ nhà</b> và <b>ảnh của bạn</b> để tìm sách nhé!”',
  qs:[{id:'ok0',type:'single',q:'Chatbot này có vấn đề gì?',opts:['Không có vấn đề','Yêu cầu thông tin cá nhân không cần thiết cho việc tìm sách','Trả lời quá nhanh'],ok:1},
   {id:'fix0',type:'text',q:'Chatbot nên trả lời thế nào?',short:1,ans:'Ví dụ: “Có nhé! Thư viện có 5 cuốn về vũ trụ ở kệ B2. Bạn muốn sách dành cho lớp mấy?” – chỉ hỏi điều cần cho việc tìm sách.'}],
  key:['Chatbot là <b>công cụ hỗ trợ</b>, không được tự ý đòi <b>thông tin không cần thiết</b>.','Để chatbot hỗ trợ tốt cần <b>kịch bản hội thoại</b> có cấu trúc, có nhánh, có <b>điểm kiểm soát của con người</b>.']},
 {t:'Cấu trúc kịch bản hội thoại',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'8.D2.1',ic:'bot',
  story:'Thiết kế kịch bản cho chatbot thư viện. Bật/tắt từng phần của kịch bản rồi cho <b>6 bạn đọc giả lập</b> thử hỏi. Quan sát bạn nào được hỗ trợ, bạn nào bị "mắc kẹt".',
  qs:[{id:'sim1',type:'sim',sim:'bot'},
   {id:'obs1',type:'single',q:'Quan sát: khi kịch bản thiếu nhánh "Không hiểu" và "Chuyển cho thủ thư"…',opts:['Mọi người vẫn được hỗ trợ','Người hỏi câu lạ, câu khó bị mắc kẹt hoặc nhận câu trả lời sai','Chatbot trả lời nhanh hơn nên tốt hơn'],ok:1},
   {id:'ord',type:'match',q:'Sắp xếp cấu trúc cơ bản của kịch bản',items:['1','2','3','4','5'],opts:['Lời chào và nêu phạm vi hỗ trợ','Tiếp nhận yêu cầu','Hỏi thêm khi thiếu thông tin','Trả lời hoặc xử lí (nhánh không hiểu, chuyển cho con người)','Kết thúc, mời phản hồi'],ok:[0,1,2,3,4]}],
  key:['Kịch bản: <b>chào, nêu phạm vi</b> → <b>tiếp nhận</b> → <b>hỏi thêm</b> → <b>trả lời / không hiểu / chuyển người</b> → <b>kết thúc</b>.']},
 {t:'Người dùng tác động đến AI',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'8.A3.MR1',ic:'student',
  story:'Sau mỗi câu trả lời, chatbot hỏi “Câu trả lời có đúng không? 👍/👎”. Phản hồi của người dùng được thu thập để <b>huấn luyện tiếp</b>. Mô phỏng: thay đổi tỉ lệ người dùng phản hồi trung thực và xem chatbot thay đổi qua 5 vòng.',
  qs:[{id:'sim2',type:'sim',sim:'feedback'},
   {id:'obs2',type:'single',q:'Quan sát: nếu nhiều người cố tình bấm 👍 cho câu trả lời sai thì…',opts:['Chatbot vẫn tốt lên','Chatbot học theo và trả lời sai nhiều hơn','Không ảnh hưởng gì'],ok:1},
   {id:'tf2',type:'tf',q:'Đúng hay sai?',items:[{t:'Dữ liệu và phản hồi của người dùng có thể được dùng để tiếp tục huấn luyện AI.',a:'T'},{t:'Người dùng không có ảnh hưởng gì tới công cụ AI.',a:'F'},{t:'Không nên nhập thông tin cá nhân vào chatbot vì nó có thể được lưu và dùng lại.',a:'T'}]}],
  key:['Người dùng <b>góp phần tác động</b> đến AI: phản hồi trung thực giúp AI tốt lên, phản hồi sai làm AI kém đi.','Dữ liệu nhập vào chatbot <b>có thể được lưu</b> – không nhập thông tin cá nhân.']},
 {t:'Lưu đồ kịch bản mới',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'8.D2.1',ic:'paper',
  story:'Nhóm em thiết kế kịch bản cho <b>chatbot hỏi đáp an toàn giao thông</b> dành cho học sinh lớp 6 (giả định). Phân loại các câu thoại vào phần của kịch bản.',
  qs:[{id:'nodes',type:'sort',q:'Câu thoại này thuộc phần nào?',cols:{chao:'Chào, nêu phạm vi',hoi:'Hỏi thêm',tl:'Trả lời',kh:'Không hiểu / chuyển người'},items:[
     {t:'"Chào bạn! Mình trả lời câu hỏi về luật giao thông cho học sinh."',a:'chao'},
     {t:'"Bạn đi xe đạp hay đi bộ đến trường?"',a:'hoi'},
     {t:'"Học sinh dưới 16 tuổi không được lái xe máy."',a:'tl'},
     {t:'"Mình chưa hiểu câu hỏi, bạn nói rõ hơn nhé?"',a:'kh'},
     {t:'"Việc này cần thầy cô tổng phụ trách hỗ trợ, mình chuyển cho thầy cô nhé."',a:'kh'},
     {t:'"Đội mũ bảo hiểm cài quai đúng cách khi ngồi xe máy."',a:'tl'}]},
   {id:'flow',type:'text',q:'Viết lưu đồ kịch bản (5–7 ô) cho chatbot an toàn giao thông, có ít nhất một nhánh "không hiểu" và một điểm chuyển cho con người.',ans:'Ví dụ: Chào, nêu phạm vi → Hỏi: bạn cần biết gì? → [Hiểu] Trả lời + nguồn (luật GT) → Hỏi: còn câu nào không? → Kết thúc. [Không hiểu] Hỏi lại 1 lần → vẫn không hiểu → Chuyển thầy cô. [Tai nạn, nguy hiểm] → Gọi 115/113, báo người lớn ngay.'}],
  key:['Kịch bản tốt dự kiến cả tình huống <b>AI không hiểu</b>, <b>thiếu thông tin</b> và <b>cần con người xử lí</b>.','Lưu đồ là <b>bản thiết kế</b> trước khi tạo chatbot thật.']},
 {t:'Trình bày và góp ý',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'8.D2.1',ic:'pen',
  story:'Các nhóm đổi lưu đồ, đóng vai người dùng "khó tính" để thử kịch bản của nhóm bạn.',
  qs:[{id:'review',type:'text',q:'Góp ý cho kịch bản của nhóm bạn: một điểm tốt, một tình huống kịch bản chưa xử lí được.',ans:'Ví dụ: Tốt – có lời chào nêu rõ phạm vi. Chưa xử lí – người dùng hỏi ngoài phạm vi (bài tập Toán) hoặc gửi số điện thoại cá nhân.'},
   {id:'q4',type:'single',q:'Khi người dùng tự gửi số điện thoại cá nhân, chatbot nên…',opts:['Lưu lại để liên hệ','Nhắc không chia sẻ thông tin cá nhân và không lưu','Gửi số đó cho người khác'],ok:1}],
  key:['Chatbot <b>không thay thế trách nhiệm của con người</b>; thiết kế để <b>bảo vệ dữ liệu</b> người dùng.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.D2.1',ic:'scale',
  story:'Nhìn lại chatbot thư viện ở Hoạt động 1.',
  qs:[{id:'after',type:'text',q:'Bây giờ em sẽ sửa kịch bản chatbot thư viện như thế nào?',short:1,ans:'Thêm lời chào nêu phạm vi; chỉ hỏi thông tin cần (chủ đề, lớp); có nhánh không hiểu và chuyển thủ thư; không đòi dữ liệu cá nhân.'}],
  key:['Kịch bản hội thoại = <b>cấu trúc + nhánh + điểm kiểm soát của con người</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 8:',ten:'THIẾT KẾ KỊCH BẢN HỘI THOẠI CÓ ỨNG DỤNG AI',muc:[
 {step:1,h:'Chatbot là công cụ hỗ trợ',it:['Không đòi thông tin <b>không cần thiết</b>.']},
 {step:2,h:'Cấu trúc kịch bản',it:[],flow:['Chào, nêu phạm vi','Tiếp nhận','Hỏi thêm','Trả lời / Không hiểu / Chuyển người','Kết thúc']},
 {step:3,h:'Người dùng tác động AI',it:['Phản hồi, dữ liệu người dùng được dùng để <b>huấn luyện tiếp</b>.','Phản hồi trung thực → AI tốt lên.']},
 {step:4,h:'Lưu đồ',it:['Dự kiến tình huống <b>không hiểu, thiếu thông tin, cần con người</b>.']},
 {step:6,h:'Ghi nhớ',it:['Cấu trúc + nhánh + <b>điểm kiểm soát của con người</b>.']}]};
function renderGhiBai(){}
const QCODE={ok0:'8.A2.1',fix0:'8.A2.1',q4:'8.A2.1',obs1:'8.D2.1',ord:'8.D2.1',nodes:'8.D2.1',flow:'8.D2.1',review:'8.D2.1',after:'8.D2.1',
  obs2:'8.A3.MR1',tf2:'8.A3.MR1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
