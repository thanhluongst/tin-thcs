/* Giáo dục AI lớp 7 · Bài 1 (2 tiết) – soạn theo KHBD-AI-LOP 7. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:7,so:1,ten:'Con người giữ quyền quyết định và xác thực kết quả AI',yccd:'7.A1.1 · 7.A1.2 · 7.A2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Để AI quyết định được không?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'7.A1.1',ic:'scale',
  story:'Trường X (giả định) định để phần mềm AI <b>tự chọn</b> 10 bạn nhận học bổng dựa trên điểm số và số buổi đi học, không ai xem lại.',
  qs:[{id:'pred',type:'single',q:'Em có đồng ý để AI tự quyết định không?',opts:['Đồng ý – máy công bằng hơn người','Không – con người cần xem lại','Chưa chắc'],ans:'Dự đoán – sẽ kiểm tra lại ở Hoạt động 3.'},
   {id:'why0',type:'text',q:'Vì sao?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Câu hỏi lớn: <b>Vì sao con người phải giữ quyền quyết định và kiểm tra kết quả AI?</b>']},
 {t:'Ba lí do giữ quyền quyết định',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'7.A1.1',ic:'student',
  story:'Mô phỏng xét học bổng: AI sắp xếp nhanh nhưng <b>không biết hoàn cảnh</b> (bạn nghỉ học vì chăm mẹ ốm, bạn mới chuyển trường thiếu điểm học kì trước). Bật/tắt "con người kiểm tra" và so sánh.',
  qs:[{id:'sim1',type:'sim',sim:'scholar'},
   {id:'obs1',type:'single',q:'Khi không có con người kiểm tra, điều gì xảy ra?',opts:['Mọi bạn đều được xét công bằng','Bạn có hoàn cảnh đặc biệt bị loại oan, không ai giải thích','Danh sách tốt hơn'],ok:1},
   {id:'ly',type:'multi',q:'Lí do con người cần giữ quyền quyết định',opts:['Bảo đảm công bằng: xem xét hoàn cảnh, cảm xúc AI không hiểu','Bảo đảm an toàn: ngăn chặn sai sót kịp thời','Bảo vệ quyền lợi và chịu trách nhiệm với con người','Vì AI làm chậm'],ok:[0,1,2]}],
  key:['<b>AI gợi ý → Con người kiểm tra → Con người quyết định</b>: để bảo đảm <b>công bằng, an toàn, bảo vệ quyền lợi</b> con người.']},
 {t:'Xác thực kết quả AI',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'7.A1.2',ic:'chat',
  story:'Chatbot (giả lập) trả lời rất tự tin: <i>"Tổng số học sinh khối 7 là 4 lớp × 38 em = 142 em."</i> Bạn Hà định chép vào báo cáo của lớp.',
  qs:[{id:'q2',type:'single',q:'Câu trả lời đúng chưa?',opts:['Đúng, vì chatbot tự tin','Sai – 4 × 38 = 152; phải tính lại','Không cần kiểm tra'],ok:1},
   {id:'hq',type:'text',q:'Nêu một hậu quả nếu không xác thực kết quả AI trong thực tế.',ans:'Ví dụ: chép số liệu sai vào báo cáo; uống thuốc theo liều AI ghi sai; đi theo bản đồ vào đường cấm.'},
   {id:'cach',type:'multi',q:'Cách xác thực kết quả AI',opts:['Đối chiếu nguồn tin cậy','Hỏi người có trách nhiệm (thầy cô, bác sĩ…)','Tự tính lại','Hỏi lại chatbot cho chắc'],ok:[0,1,2]}],
  key:['Trả lời <b>trôi chảy, tự tin chưa chắc đúng</b>; xác thực bằng <b>nguồn tin cậy, người có trách nhiệm hoặc tính lại</b>, và ghi lại cách đã kiểm chứng.']},
 {t:'Nếu AI quyết định cuối cùng',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'7.A2.1',ic:'lock',
  story:'Phân tích tác hại khi để AI quyết định cuối cùng trong các tình huống (giả định).',
  qs:[{id:'th',type:'match',q:'Tình huống – tác hại có thể xảy ra',items:['AI tự khoá tài khoản vì "nghi gian lận"','AI chấm bài và tự ghi điểm vào sổ','AI tự chọn người được vay tiền'],opts:['Người bị thiệt không được giải thích, không biết khiếu nại ai','Sai không được sửa, lặp lại hàng loạt','Không rõ ai chịu trách nhiệm khi có thiệt hại'],ok:[0,1,2]},
   {id:'q3',type:'single',q:'Cách làm đúng là…',opts:['AI phát hiện, gợi ý – con người xem xét, quyết định','AI quyết định hết cho nhanh','Không dùng AI'],ok:0}],
  key:['Để AI quyết định cuối cùng: <b>sai không được sửa, người bị thiệt không được giải thích, không rõ ai chịu trách nhiệm, sai lặp lại hàng loạt</b>.']},
 {t:'Vận dụng: Điểm dừng của em',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'7.A1.1',ic:'pen',
  story:'Lần tới em dùng gợi ý của AI (bản đồ, chatbot, ứng dụng học), em sẽ dừng lại kiểm tra điều gì?',
  qs:[{id:'stop',type:'text',q:'"Điểm dừng" của em',ans:'Ví dụ: Trước khi nộp bài có số liệu AI đưa, em tính lại và xem SGK; ghi "đã kiểm chứng bằng SGK trang …".'},
   {id:'after',type:'text',q:'Quay lại câu hỏi đầu bài: bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: AI chỉ gợi ý; con người kiểm tra và quyết định để công bằng, an toàn.'}],
  key:['Mỗi lần dùng gợi ý của AI, cần một <b>"điểm dừng"</b> để kiểm tra trước khi quyết định.']}
];
const DECL=[];
const GHIBAI={so:'Bài 1:',ten:'CON NGƯỜI GIỮ QUYỀN QUYẾT ĐỊNH VÀ XÁC THỰC KẾT QUẢ AI',muc:[
 {step:2,h:'Ba lí do',it:['Công bằng – An toàn – Bảo vệ quyền lợi con người.'],flow:['AI gợi ý','Con người kiểm tra','Con người quyết định']},
 {step:3,h:'Xác thực',it:['Tự tin chưa chắc đúng.'],flow:['Nguồn tin cậy','Người có trách nhiệm','Tính lại','Ghi cách kiểm chứng']},
 {step:4,h:'Tác hại khi AI quyết định cuối cùng',it:['Sai không được sửa; không ai giải thích; không rõ trách nhiệm; sai hàng loạt.']},
 {step:5,h:'Ghi nhớ',it:['Luôn có <b>điểm dừng</b> kiểm tra.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.A1.1',why0:'7.A1.1',obs1:'7.A1.1',ly:'7.A1.1',stop:'7.A1.1',q2:'7.A1.2',hq:'7.A1.2',cach:'7.A1.2',th:'7.A2.1',q3:'7.A2.1',after:'7.A2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
