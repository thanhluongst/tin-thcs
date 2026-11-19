/* Giáo dục AI lớp 8 · Bài 7 (1 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:7,ten:'Xác định vấn đề thực tế có thể giải quyết bằng AI',yccd:'8.D1.1 · 8.D1.MR1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Việc gì cũng cần AI?',hd:'Hoạt động 1 · Khởi động',code:'8.D1.1',ic:'student',
  story:'Ba ý tưởng của lớp 8A (giả định): <b>A.</b> Dùng AI để bật tắt đèn lớp theo giờ. <b>B.</b> Dùng AI nhận dạng lá cây bị sâu bệnh trong vườn trường. <b>C.</b> Dùng AI viết hộ bài văn cho cả lớp.',
  qs:[{id:'pred',type:'single',q:'Ý tưởng nào phù hợp nhất để dùng AI?',opts:['A – bật tắt đèn theo giờ','B – nhận dạng lá bị sâu bệnh','C – viết hộ bài văn'],ok:1},
   {id:'why0',type:'text',q:'Vì sao hai ý còn lại không phù hợp?',short:1,ans:'A: hẹn giờ đơn giản là đủ, không cần AI. C: AI làm thay việc HS cần tự luyện, vi phạm trung thực.'}],
  key:['Để biết vấn đề có hợp với AI không, cần xem: <b>nhu cầu, dữ liệu, khả năng AI, giải pháp khác, rủi ro</b>.']},
 {t:'Bảy bước xem xét',hd:'Hoạt động 2 · Hình thành kiến thức',code:'8.D1.1',ic:'scale',
  story:'Dùng "máy soi vấn đề": chọn một vấn đề, trả lời các câu hỏi xem xét, máy cho biết vấn đề có <b>đáng dùng AI</b> không và vì sao.',
  qs:[{id:'sim1',type:'sim',sim:'fit'},
   {id:'obs1',type:'single',q:'Quan sát: vấn đề đáng xem xét dùng AI khi…',opts:['Nghe có vẻ hiện đại','AI làm được, có dữ liệu phù hợp, lợi ích rõ hơn giải pháp đơn giản, rủi ro kiểm soát được','Không cần dữ liệu'],ok:1},
   {id:'ord',type:'match',q:'Sắp xếp các bước xem xét',items:['1','2','3','4','5','6','7'],opts:['Xác định vấn đề','Xác định đối tượng và nhu cầu','Xem xét dữ liệu','Xác định khả năng AI','So sánh giải pháp khác','Đánh giá rủi ro','Con người quyết định và chịu trách nhiệm'],ok:[0,1,2,3,4,5,6]}],
  key:['Xác định vấn đề → đối tượng, nhu cầu → <b>dữ liệu</b> → <b>khả năng AI</b> → <b>giải pháp khác</b> → <b>rủi ro</b> → <b>con người quyết định</b>.']},
 {t:'Soi vấn đề của lớp',hd:'Hoạt động 3 · Luyện tập',code:'8.D1.1',ic:'paper',
  story:'Phân loại các vấn đề (giả định) ở trường em.',
  qs:[{id:'lab',type:'sim',sim:'lab_xuong'},{id:'cls',type:'sort',q:'Vấn đề này…',cols:{ai:'Đáng xem xét dùng AI',khong:'Giải pháp đơn giản là đủ',no:'Không nên dùng AI'},items:[
     {t:'Nhận dạng loài chim trong ảnh chụp ở vườn trường',a:'ai'},{t:'Nhắc giờ vào lớp',a:'khong'},
     {t:'Dịch biển chỉ dẫn tiếng Anh cho khách tham quan',a:'ai'},{t:'Chấm điểm hạnh kiểm học sinh qua camera',a:'no'},
     {t:'Đếm số sách mượn trong ngày',a:'khong'},{t:'Gợi ý bài luyện tập theo lỗi sai thường gặp của từng bạn (dữ liệu ẩn danh)',a:'ai'}]},
   {id:'q3',type:'single',q:'"Chấm hạnh kiểm qua camera" không nên dùng AI chủ yếu vì…',opts:['Camera đắt','Rủi ro dữ liệu cá nhân, đánh giá sai và cần con người chịu trách nhiệm','AI không chạy được'],ok:1}],
  key:['AI <b>đáng xem xét</b> khi mang lại lợi ích rõ hơn giải pháp đơn giản và rủi ro kiểm soát được.']},
 {t:'Kế hoạch sơ bộ',hd:'Hoạt động 4 · Vận dụng',code:'8.D1.MR1',ic:'pen',
  story:'Chọn một vấn đề "đáng xem xét dùng AI" ở trường hoặc địa phương em. Lập kế hoạch sơ bộ. <b>Không dùng dữ liệu thật của người khác.</b>',
  qs:[{id:'plan',type:'text',q:'Vấn đề – ai cần – dữ liệu cần (lấy ở đâu, an toàn chưa) – AI làm gì – giải pháp khác – rủi ro – ai quyết định',ans:'Ví dụ: Nhận dạng lá sâu bệnh – người chăm vườn trường – ảnh lá tự chụp, không có người – AI gợi ý lá nào có thể bệnh – so với: tự quan sát bằng mắt – rủi ro: nhận sai → thầy cô Sinh kiểm tra lại – nhóm và thầy cô quyết định cách xử lí.'}],
  key:['Kế hoạch có đủ: <b>vấn đề, đối tượng, dữ liệu, khả năng AI, giải pháp khác, rủi ro, người quyết định</b>.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.D1.1',ic:'scale',
  story:'Nhìn lại ba ý tưởng A, B, C.',
  qs:[{id:'after',type:'text',q:'Bây giờ em sẽ kiểm tra một ý tưởng dùng AI bằng những câu hỏi nào?',short:1,ans:'Có nhu cầu thật? Có dữ liệu phù hợp, an toàn? AI làm được? Có cách đơn giản hơn? Rủi ro gì? Ai quyết định, chịu trách nhiệm?'}],
  key:['Không phải việc gì cũng cần AI – <b>xem xét kĩ trước khi chọn</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 7:',ten:'XÁC ĐỊNH VẤN ĐỀ THỰC TẾ CÓ THỂ GIẢI QUYẾT BẰNG AI',muc:[
 {step:1,h:'Không phải việc gì cũng cần AI',it:['Xem: nhu cầu, dữ liệu, khả năng AI, giải pháp khác, rủi ro.']},
 {step:2,h:'Bảy bước xem xét',it:[],flow:['Vấn đề','Nhu cầu','Dữ liệu','Khả năng AI','Giải pháp khác','Rủi ro','Con người quyết định']},
 {step:3,h:'Khi nào đáng dùng AI?',it:['AI làm được + có dữ liệu phù hợp + <b>lợi ích rõ hơn</b> giải pháp đơn giản + rủi ro kiểm soát được.']},
 {step:5,h:'Ghi nhớ',it:['Con người <b>quyết định và chịu trách nhiệm</b>.']}]};
function renderGhiBai(){}
const QCODE={pred:'8.D1.1',why0:'8.D1.1',obs1:'8.D1.1',ord:'8.D1.1',cls:'8.D1.1',q3:'8.D1.1',after:'8.D1.1',plan:'8.D1.MR1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
