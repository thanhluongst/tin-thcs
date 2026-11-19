/* Giáo dục AI lớp 7 · Bài 2 (1 tiết) – soạn theo KHBD-AI-LOP 7. Mọi tình huống giả định ở "đất nước X"; tên công ty, trường là hư cấu. */
const BAI={lop:7,so:2,ten:'Quy định pháp lý ngăn chặn công cụ AI có hại',yccd:'7.A2.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ở đất nước X chưa có luật',hd:'Hoạt động 1 · Mở đầu',code:'7.A2.2',ic:'bot',
  story:'Ở đất nước X (giả định) chưa có quy định nào về AI. Công ty Z làm ra ứng dụng <b>"Giọng nói thần kì"</b>: chỉ cần 10 giây ghi âm là giả được giọng bất kì ai, ai cũng tải được, không ghi là do AI tạo.',
  qs:[{id:'pred',type:'text',q:'Em đoán chuyện gì có thể xảy ra?',short:1,ans:'Dự đoán: kẻ gian giả giọng người thân gọi lừa tiền; giả giọng thầy cô, người nổi tiếng nói điều sai…'}],
  key:['Câu hỏi lớn: <b>Nếu không có quy định pháp lý, công cụ AI có hại gây hậu quả gì?</b>']},
 {t:'Chuỗi hậu quả',hd:'Hoạt động 2 · Hình thành kiến thức',code:'7.A2.2',ic:'scale',
  story:'Mô phỏng 30 ngày ở đất nước X. Bật/tắt từng <b>quy định</b> và xem số người bị hại thay đổi thế nào.',
  qs:[{id:'sim1',type:'sim',sim:'law'},
   {id:'obs1',type:'single',q:'Khi không có quy định nào thì…',opts:['Số người bị hại ít','Hậu quả lan rộng và kéo dài, người bị hại không biết kêu ai','Công ty tự sửa ngay'],ok:1},
   {id:'chuoi',type:'match',q:'Xếp chuỗi 4 ô',items:['Công cụ có hại','Bị dùng sai','Người bị hại','Hậu quả kéo dài'],opts:['Ứng dụng giả giọng không kiểm soát','Kẻ gian giả giọng con gọi xin tiền','Ông bà chuyển tiền cho kẻ gian','Mất tiền, mất lòng tin; không ai chịu trách nhiệm'],ok:[0,1,2,3]}],
  key:['Không có quy định: công cụ có hại <b>được làm ra, phát tán tự do</b> → hậu quả <b>xảy ra, lan rộng, kéo dài</b>; người bị hại khó đòi quyền lợi.']},
 {t:'Viết một nguyên tắc',hd:'Hoạt động 3 · Luyện tập',code:'7.A2.2',ic:'pen',
  story:'Nhóm em là "Hội đồng soạn luật" của đất nước X. Viết một nguyên tắc nhắm vào <b>bên làm ra công cụ</b>.',
  qs:[{id:'lab',type:'sim',sim:'lab_kiemduyet'},{id:'nt',type:'text',q:'Nguyên tắc: "Bên làm ra công cụ AI phải … Vì nếu không có thì …"',ans:'Ví dụ: "Bên làm ra công cụ tạo giọng nói phải gắn nhãn cho biết nội dung do AI tạo và chỉ cho dùng giọng khi người đó đồng ý. Vì nếu không có thì kẻ gian giả giọng lừa tiền mà người nghe không phân biệt được."'},
   {id:'q3',type:'multi',q:'Quy định nào giúp ngăn công cụ AI có hại?',opts:['Cấm thiết kế công cụ chuyên để lừa đảo, giả mạo','Buộc cho người dùng biết đang tương tác với AI, gắn nhãn nội dung AI tạo','Quy định trách nhiệm của bên làm ra công cụ khi gây hại','Ai cũng được tự do làm mọi công cụ'],ok:[0,1,2]}],
  key:['Nhiều điều lớp mình đề xuất đã có trong luật; Việt Nam đã có <b>Luật Trí tuệ nhân tạo</b>, buộc cho người dùng biết đang tương tác với AI.']},
 {t:'Phiếu cuối giờ',hd:'Hoạt động 4 · Vận dụng',code:'7.A2.2',ic:'lock',
  story:'Tình huống mới (giả định): ứng dụng <b>"Ảnh ghép vui"</b> ở đất nước X cho ghép mặt bất kì ai vào ảnh, không cần người đó đồng ý.',
  qs:[{id:'hq',type:'text',q:'Nếu không có quy định: ai bị hại, bị hại gì, có lan rộng không?',ans:'Ví dụ: học sinh bị ghép mặt vào ảnh xấu, bị chế giễu, bắt nạt; ảnh lan nhanh trên mạng, khó gỡ; không biết ai chịu trách nhiệm.'},
   {id:'q4',type:'single',q:'Một quy định phù hợp cho tình huống này',opts:['Phải được người trong ảnh đồng ý và gắn nhãn "ảnh do AI tạo"','Không cần quy định vì ảnh chỉ để vui'],ok:0}],
  key:['Quy định pháp lý <b>bảo vệ con người</b> trước công cụ AI có hại.']}
];
const DECL=[];
const GHIBAI={so:'Bài 2:',ten:'QUY ĐỊNH PHÁP LÝ NGĂN CHẶN CÔNG CỤ AI CÓ HẠI',muc:[
 {step:2,h:'Chuỗi hậu quả khi không có quy định',it:[],flow:['Công cụ có hại','Bị dùng sai','Người bị hại','Hậu quả kéo dài']},
 {step:3,h:'Quy định cần có',it:['Cấm công cụ chuyên để lừa đảo, giả mạo.','Cho người dùng biết đang tương tác với AI; gắn nhãn nội dung AI.','Bên làm ra công cụ chịu trách nhiệm.']},
 {step:4,h:'Ghi nhớ',it:['Việt Nam đã có Luật Trí tuệ nhân tạo.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.A2.2',obs1:'7.A2.2',chuoi:'7.A2.2',nt:'7.A2.2',q3:'7.A2.2',hq:'7.A2.2',q4:'7.A2.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
