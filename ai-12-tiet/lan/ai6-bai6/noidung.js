/* Giáo dục AI lớp 6 · Bài 6 (1 tiết) – soạn theo KHBD-AI-LOP 6. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:6,so:6,ten:'Nhận diện ứng dụng và công nghệ AI quanh em',yccd:'6.C2.1 · 6.C2.2 · 6.C3.1 · 6.B2.1 · 6.C3.MR1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Đồ điện tử nào cũng có AI?',hd:'Hoạt động 1 · Khởi động',code:'6.C2.1',ic:'bot',
  story:'Kể nhanh 3 đồ vật hoặc ứng dụng em nghĩ là có AI.',
  qs:[{id:'q1',type:'single',q:'Máy tính bỏ túi có dùng AI không?',opts:['Có','Không – chỉ tính theo công thức cố định'],ok:1}],
  key:['Không phải đồ điện tử nào cũng có AI.']},
 {t:'Máy dò AI',hd:'Hoạt động 2 · Hình thành kiến thức',code:'6.C2.1',ic:'img',
  story:'Dùng "máy dò": thử mỗi công cụ với <b>3 tình huống khác nhau</b>. Công cụ có AI <b>nhận dạng, đoán, gợi ý, trả lời linh hoạt</b> theo dữ liệu; công cụ không có AI chỉ làm một việc cố định.',
  qs:[{id:'sim1',type:'sim',sim:'detect'},
   {id:'sortai',type:'sort',q:'Có AI hay không?',cols:{co:'Có AI',khong:'Không AI'},items:[
     {t:'Trợ lí ảo trên điện thoại',a:'co'},{t:'Máy tính bỏ túi',a:'khong'},{t:'Bản đồ gợi ý đường tránh tắc',a:'co'},{t:'Quạt điện hẹn giờ',a:'khong'},
     {t:'Ứng dụng dịch bằng camera',a:'co'},{t:'Đèn bật khi có người đi qua',a:'khong'},{t:'Gợi ý video trên mạng',a:'co'},{t:'Máy giặt bấm nút chọn chế độ',a:'khong'}]}],
  key:['Có AI: công cụ <b>học từ dữ liệu</b> để nhận dạng, gợi ý, dịch, trả lời. Không AI: làm theo <b>công thức, nút bấm cố định</b>.']},
 {t:'Công cụ AI thông dụng làm gì?',hd:'Hoạt động 3 · Luyện tập',code:'6.C2.2',ic:'paper',
  story:'Nối công cụ AI với chức năng chính.',
  qs:[{id:'lab',type:'sim',sim:'lab_thanhpho'},{id:'match3',type:'match',q:'Công cụ – chức năng chính',items:['Trợ lí ảo','Ứng dụng bản đồ','Công cụ dịch','Mạng xã hội'],opts:['Nghe câu hỏi bằng giọng nói, trả lời, nhắc việc','Tìm đường, gợi ý tránh tắc','Dịch chữ, giọng nói sang ngôn ngữ khác','Gợi ý bài viết, quảng cáo theo sở thích'],ok:[0,1,2,3]},
   {id:'cn',type:'multi',q:'Đâu là tên công nghệ AI quen thuộc?',opts:['Nhận dạng hình ảnh, khuôn mặt','Chuyển giọng nói thành văn bản','Dịch tự động','Hẹn giờ tắt quạt'],ok:[0,1,2]},
   {id:'q3',type:'single',q:'"Gợi ý cho bạn" trên mạng xã hội là tính năng AI gì?',opts:['Đề xuất nội dung theo dữ liệu thói quen','Máy tính cộng trừ','Hẹn giờ tắt máy'],ok:0}],
  key:['Tính năng AI tích hợp: <b>gợi ý nội dung, quảng cáo cá nhân, nhận dạng khuôn mặt, dịch</b>.']},
 {t:'Vận dụng: Hỏi trước khi dùng',hd:'Hoạt động 4 · Vận dụng',code:'6.B2.1',ic:'lock',
  story:'Chọn một ứng dụng em hay dùng (hoặc gia đình dùng).',
  qs:[{id:'van',type:'text',q:'Ứng dụng có tính năng AI nào? Viết 2 câu hỏi kiểm tra an toàn, minh bạch.',ans:'Ví dụ: Bản đồ – gợi ý đường. Câu hỏi: "Ứng dụng thu vị trí của em để làm gì?", "Có tắt được định vị khi không dùng không?"'},
   {id:'q4',type:'single',q:'Câu hỏi kiểm tra an toàn phù hợp?',opts:['Ứng dụng có đẹp không?','Ứng dụng thu thập dữ liệu gì của em?'],ok:1}],
  key:['Luôn hỏi: <b>Ai làm ra? Lấy dữ liệu gì? Có an toàn không?</b>']}
];
const DECL=[];
const GHIBAI={so:'Bài 6:',ten:'NHẬN DIỆN ỨNG DỤNG VÀ CÔNG NGHỆ AI QUANH EM',muc:[
 {step:2,h:'Có AI hay không?',it:[],tb:[['Có AI','Không AI'],['học từ dữ liệu, nhận dạng, gợi ý','làm theo công thức, nút bấm cố định'],['trợ lí ảo, bản đồ, dịch','máy tính bỏ túi, quạt hẹn giờ']]},
 {step:3,h:'Công cụ AI thông dụng',it:['Trợ lí ảo, bản đồ, dịch, gợi ý trên mạng xã hội.']},
 {step:4,h:'Ghi nhớ',it:['Hỏi trước khi dùng: ai làm ra, lấy dữ liệu gì, có an toàn.']}]};
function renderGhiBai(){}
const QCODE={q1:'6.C2.1',sortai:'6.C2.1',match3:'6.C2.2',cn:'6.C3.1',q3:'6.C3.MR1',van:'6.B2.1',q4:'6.B2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
