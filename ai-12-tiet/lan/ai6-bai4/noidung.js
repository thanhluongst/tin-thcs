/* Giáo dục AI lớp 6 · Bài 4 (2 tiết) – soạn theo KHBD-AI-LOP 6. Số liệu mô phỏng, giả định; không dùng công cụ AI thật. */
const BAI={lop:6,so:4,ten:'Mặt tốt, mặt hạn chế và giới hạn của AI',yccd:'6.B1.1 · 6.C1.2 · 6.D2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ứng dụng đoán gì?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'6.B1.1',ic:'video',
  story:'Bạn Bình (giả định) xem vài video bóng đá. Hôm sau, mở ứng dụng thấy toàn video bóng đá.',
  qs:[{id:'q1',type:'single',q:'Vì sao ứng dụng "đoán" trúng sở thích của Bình?',opts:['Phép màu','Nhờ dữ liệu về những video Bình đã xem','Ngẫu nhiên hoàn toàn'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ: tính năng gợi ý video tốt hay không tốt?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Ứng dụng "đoán" được nhờ <b>dữ liệu</b> về việc em đã xem.']},
 {t:'Hai mặt của tính năng gợi ý video',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'6.B1.1',ic:'video',
  story:'Mô phỏng: chọn loại video em thích, kéo thanh <b>số video cùng loại đã xem</b>, xem gợi ý thay đổi ra sao.',
  qs:[{id:'sim1',type:'sim',sim:'feed'},
   {id:'q2',type:'single',q:'Xem càng nhiều một loại thì…',opts:['Gợi ý càng đa dạng','Gợi ý bị thu hẹp và dễ xem lâu hơn','Không đổi gì'],ok:1},
   {id:'two',type:'sort',q:'Mặt tốt hay hạn chế?',cols:{tot:'Mặt tốt',han:'Hạn chế'},items:[{t:'Gợi ý đúng sở thích',a:'tot'},{t:'Tiết kiệm thời gian tìm kiếm',a:'tot'},{t:'Chỉ thấy một loại nội dung',a:'han'},{t:'Dễ xem quá giờ, ảnh hưởng giấc ngủ',a:'han'}]}],
  key:['Mặt tốt: <b>tiện, nhanh, đúng sở thích</b>. Hạn chế: <b>thu hẹp nội dung, kéo dài thời gian xem</b>.']},
 {t:'AI tác động tới em và gia đình',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'6.C1.2',ic:'student',
  story:'Xếp các ví dụ vào tác động tích cực hay tiêu cực tới bản thân và gia đình.',
  qs:[{id:'tacdong',type:'sort',q:'Tác động này…',cols:{tc:'Tích cực',tieu:'Tiêu cực'},items:[
     {t:'Bản đồ gợi ý đường tránh tắc giúp bố đi làm đúng giờ',a:'tc'},{t:'Em chơi trò chơi được gợi ý đến khuya',a:'tieu'},
     {t:'Ứng dụng dịch giúp bà đọc hướng dẫn thuốc nhập khẩu',a:'tc'},{t:'Quảng cáo nhắm theo sở thích làm em đòi mua đồ',a:'tieu'},
     {t:'Trợ lí ảo nhắc lịch uống thuốc cho ông',a:'tc'},{t:'Tin giả do AI tạo khiến cả nhà hoang mang',a:'tieu'}]}],
  key:['AI tác động <b>hai chiều</b>; phát huy lợi ích bằng cách <b>dùng có mục đích</b>, giảm rủi ro bằng cách <b>kiểm tra lại</b>.']},
 {t:'AI hay con người phù hợp hơn?',hd:'Hoạt động 2.3 · Hình thành kiến thức · Tiết 2',code:'6.D2.1',ic:'scale',
  story:'Tranh biện nhanh: với mỗi việc, AI hay con người phù hợp hơn? Dùng mô phỏng để xem kết quả của từng lựa chọn.',
  qs:[{id:'sim2',type:'sim',sim:'who'},
   {id:'q4',type:'multi',q:'Giới hạn của AI so với con người',opts:['Không có trải nghiệm cảm xúc thật','Chỉ tạo ra từ dữ liệu đã có','Không nắm hết hoàn cảnh cụ thể','Tính toán chậm hơn người'],ok:[0,1,2]}],
  key:['AI làm nhanh việc <b>lặp lại, nhiều dữ liệu</b>, nhưng <b>không có cảm xúc thật</b>, chỉ tạo từ dữ liệu đã có, không nắm hết hoàn cảnh.']},
 {t:'Luyện tập – Vận dụng: AI trong nhà em',hd:'Hoạt động 3–4 · Luyện tập, vận dụng · Tiết 2',code:'6.B1.1',ic:'pen',
  story:'Chọn một tính năng AI trong nhà em (gợi ý video, bản đồ, trợ lí ảo…).',
  qs:[{id:'home',type:'text',q:'Ghi 1 mặt tốt – 1 hạn chế – 1 cách dùng hợp lí',ans:'Ví dụ: Gợi ý video – tốt: tìm nhanh video học vẽ; hạn chế: dễ xem quá giờ; cách dùng: đặt hẹn giờ 30 phút, tự tìm chủ đề cần học.'},
   {id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: tính năng AI nào cũng có hai mặt, cần dùng có mục đích và giới hạn.'}],
  key:['Dùng AI <b>có mục đích, có giới hạn</b>; giữ cho con người việc cần <b>cảm xúc, sáng tạo, quyết định</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 4:',ten:'MẶT TỐT, MẶT HẠN CHẾ VÀ GIỚI HẠN CỦA AI',muc:[
 {step:2,h:'Hai mặt của gợi ý video',it:[],tb:[['Mặt tốt','Hạn chế'],['đúng sở thích, nhanh','thu hẹp nội dung'],['tiết kiệm thời gian','xem quá giờ']]},
 {step:3,h:'Tác động hai chiều',it:['Dùng có mục đích, kiểm tra lại.']},
 {step:4,h:'Giới hạn của AI',it:['Không có cảm xúc thật; chỉ tạo từ dữ liệu đã có; không nắm hết hoàn cảnh.']},
 {step:5,h:'Ghi nhớ',it:['Dùng AI có mục đích và giới hạn.']}]};
function renderGhiBai(){}
const QCODE={q1:'6.B1.1',before:'6.B1.1',q2:'6.B1.1',two:'6.B1.1',home:'6.B1.1',tacdong:'6.C1.2',q4:'6.D2.1',after:'6.D2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
