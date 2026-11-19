/* Giáo dục AI lớp 9 · Bài 7 (1 tiết) – soạn theo KHBD-AI-LOP 9. Đầu ra AI trong mô phỏng là giả lập. */
const BAI={lop:9,so:7,ten:'Con người đồng sáng tạo và dẫn dắt AI',yccd:'9.D1.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ai là tác giả?',hd:'Hoạt động 1 · Mở đầu',code:'9.D1.1',ic:'student',
  story:'Nhóm bạn Mai (giả định) dùng AI tạo sinh để làm trang giới thiệu câu lạc bộ đọc sách. Bạn Tuấn nói: "AI làm hết, nhóm mình chỉ bấm nút."',
  qs:[{id:'pred',type:'single',q:'Em đồng ý với Tuấn không?',opts:['Đồng ý','Không – nhóm đưa ý tưởng, ra yêu cầu, kiểm tra và quyết định','Chưa chắc'],ans:'Dự đoán – đối chiếu sau mô phỏng.'}],
  key:['Câu hỏi lớn: <b>Con người làm gì khi cùng AI tạo ra sản phẩm?</b>']},
 {t:'Yêu cầu rõ – kiểm chứng kĩ',hd:'Hoạt động 2 · Hình thành kiến thức',code:'9.D1.1',ic:'bot',
  story:'Dùng "xưởng đồng sáng tạo": chọn mức độ rõ của yêu cầu và việc kiểm tra, xem sản phẩm AI tạo (giả lập) thay đổi thế nào; em quyết định giữ hay sửa.',
  qs:[{id:'sim1',type:'sim',sim:'cocreate'},
   {id:'obs1',type:'single',q:'Sản phẩm tốt nhất khi…',opts:['Yêu cầu chung chung, nhận ngay','Yêu cầu rõ (mục tiêu, người đọc, nội dung chính) và con người kiểm chứng, sửa','Để AI tự chọn mọi thứ'],ok:1},
   {id:'gd',type:'sort',q:'Việc này của con người hay AI?',cols:{ng:'Con người',ai:'AI'},items:[
     {t:'Đưa ý tưởng gắn với thực tế câu lạc bộ',a:'ng'},{t:'Tạo nhanh nhiều bản nháp',a:'ai'},{t:'Kiểm tra thông tin, sửa chỗ sai',a:'ng'},
     {t:'Gợi ý bố cục, màu sắc',a:'ai'},{t:'Quyết định chấp nhận hay sửa, chịu trách nhiệm',a:'ng'},{t:'Đặt mục tiêu, tiêu chí cho sản phẩm',a:'ng'}]}],
  key:['Con người <b>đồng sáng tạo</b> (ý tưởng, yêu cầu rõ) và <b>dẫn dắt</b> (kiểm chứng, quyết định chấp nhận hay sửa) ở cả <b>thiết kế – vận hành – phát triển</b>.']},
 {t:'Vận dụng',hd:'Hoạt động 3–4 · Luyện tập, vận dụng',code:'9.D1.1',ic:'pen',
  story:'Chọn một hệ thống AI (bản đồ, gợi ý video, chatbot của trường…).',
  qs:[{id:'lab',type:'sim',sim:'lab_gaccong'},{id:'van',type:'text',q:'Ở giai đoạn thiết kế, vận hành, phát triển, con người làm gì để dẫn dắt hệ thống đó?',ans:'Ví dụ: Chatbot trường – thiết kế: thầy cô đặt mục tiêu, chọn dữ liệu; vận hành: người quản trị theo dõi, xử lí câu khó; phát triển: đọc phản hồi, sửa dữ liệu sai.'},
   {id:'after',type:'text',q:'Quay lại ý kiến của Tuấn: bây giờ em nghĩ…',short:1,ans:'Tự đánh giá.'}],
  key:['Sản phẩm tốt là kết quả của <b>yêu cầu rõ</b> và <b>kiểm chứng kĩ</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 7:',ten:'CON NGƯỜI ĐỒNG SÁNG TẠO VÀ DẪN DẮT AI',muc:[
 {step:2,h:'Vai trò con người',it:['Đồng sáng tạo: ý tưởng, yêu cầu rõ.','Dẫn dắt: kiểm chứng, quyết định giữ hay sửa.'],flow:['Thiết kế','Vận hành','Phát triển']},
 {step:3,h:'Ghi nhớ',it:['Yêu cầu rõ + kiểm chứng kĩ = sản phẩm tốt.']}]};
function renderGhiBai(){}
const QCODE={pred:'9.D1.1',obs1:'9.D1.1',gd:'9.D1.1',van:'9.D1.1',after:'9.D1.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
