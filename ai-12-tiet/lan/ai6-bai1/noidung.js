/* Giáo dục AI lớp 6 · Bài 1 (2 tiết) – soạn theo KHBD-AI-LOP 6. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:6,so:1,ten:'AI do con người tạo ra và điều khiển',yccd:'6.A1.1 · 6.A1.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Robot có tự biết không?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'6.A1.1',ic:'bot',
  story:'Trường em có một <b>robot phân loại quả</b> (giả định). Robot vừa được bật lên lần đầu, <b>chưa ai cài quy tắc</b>. Em thử cho robot chạy xem nó làm được gì.',
  qs:[{id:'sim1',type:'sim',sim:'robot'},
   {id:'q1',type:'single',q:'Khi chưa có quy tắc, robot làm gì?',opts:['Tự xếp đúng hết','Không biết xếp, đứng yên','Tự lên mạng học'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ: AI tự sinh ra hay do ai làm ra?',short:1,ans:'Dự đoán, không chấm đúng sai.'}],
  key:['AI <b>không tự sinh ra</b>, không tự biết phải làm gì.']},
 {t:'Ai dạy robot?',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'6.A1.1',ic:'student',
  story:'Em là <b>người lập trình</b>: chọn quy tắc cho robot (theo màu hoặc hình dạng), chạy ít nhất 3 lần với quy tắc khác nhau và so sánh kết quả.',
  qs:[{id:'sim2',type:'sim',sim:'robot'},
   {id:'q2',type:'single',q:'Kết quả xếp của robot phụ thuộc vào điều gì?',opts:['May rủi','Quy tắc do con người đặt','Màu sơn của robot'],ok:1},
   {id:'tf2',type:'tf',q:'Đúng hay sai?',items:[{t:'Con người tạo ra, lập trình và điều khiển AI.',a:'T'},{t:'AI tự nghĩ ra việc để làm.',a:'F'},{t:'AI làm những nhiệm vụ cụ thể con người giao.',a:'T'}]}],
  key:['Con người <b>tạo ra – lập trình – điều khiển</b> AI để làm <b>nhiệm vụ cụ thể</b>.']},
 {t:'Ai quyết định cuối cùng?',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 2',code:'6.A1.2',ic:'scale',
  story:'Robot xếp nhầm <b>quả cà chua</b> vào rổ táo vì cà chua cũng đỏ và tròn. Cô bán hàng định mang rổ táo ra chợ bán.',
  qs:[{id:'q3',type:'single',q:'Ai cần kiểm tra và chịu trách nhiệm?',opts:['Robot','Cô bán hàng – người dùng robot','Không ai cả'],ok:1},
   {id:'q3b',type:'single',q:'Vai trò của AI là gì?',opts:['Thay con người quyết định mọi việc','Công cụ hỗ trợ con người','Người chịu trách nhiệm'],ok:1}],
  key:['AI chỉ là <b>công cụ hỗ trợ</b>; <b>con người quyết định cuối cùng</b> và <b>chịu trách nhiệm</b>.']},
 {t:'Luyện tập: Ai giao việc, ai kiểm tra?',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'6.A1.2',ic:'paper',
  story:'Xếp các việc vào đúng người.',
  qs:[{id:'lab',type:'sim',sim:'lab_robot'},{id:'sort4',type:'sort',q:'Việc này do ai làm?',cols:{nguoi:'Con người',ai:'Công cụ AI'},items:[
     {t:'Đặt quy tắc cho robot',a:'nguoi'},{t:'Xếp quả theo quy tắc rất nhanh',a:'ai'},{t:'Kiểm tra rổ quả trước khi bán',a:'nguoi'},
     {t:'Gợi ý đường đi trên bản đồ',a:'ai'},{t:'Chọn có đi theo gợi ý hay không',a:'nguoi'},{t:'Chịu trách nhiệm khi có sai sót',a:'nguoi'}]}],
  key:['Người <b>tạo</b> – người <b>dùng</b> – người <b>chịu trách nhiệm</b>.']},
 {t:'Vận dụng: AI ở nhà em',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'6.A1.2',ic:'pen',
  story:'Kể một công cụ có AI giúp gia đình em (bản đồ, trợ lí ảo, dịch…).',
  qs:[{id:'home',type:'text',q:'Công cụ đó làm gì? Ai giao việc cho nó? Ai kiểm tra kết quả?',ans:'Ví dụ: Bản đồ gợi ý đường – bố giao việc khi nhập địa chỉ – bố xem đường có hợp lí không rồi mới đi.'},
   {id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: AI do con người làm ra, chỉ hỗ trợ; con người quyết định.'}],
  key:['AI <b>do con người</b> tạo ra, chỉ <b>hỗ trợ</b>; người dùng <b>quyết định</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 1:',ten:'AI DO CON NGƯỜI TẠO RA VÀ ĐIỀU KHIỂN',muc:[
 {step:1,h:'AI không tự sinh ra',it:['Chưa có quy tắc, robot không biết làm gì.']},
 {step:2,h:'Con người làm ra AI',it:[],flow:['Tạo ra','Lập trình','Điều khiển','AI làm nhiệm vụ cụ thể']},
 {step:3,h:'AI là công cụ hỗ trợ',it:['<b>Con người quyết định</b> cuối cùng và <b>chịu trách nhiệm</b>.']},
 {step:5,h:'Ghi nhớ',it:['AI do con người tạo ra, chỉ hỗ trợ; người dùng quyết định.']}]};
function renderGhiBai(){}
const QCODE={q1:'6.A1.1',before:'6.A1.1',q2:'6.A1.1',tf2:'6.A1.1',q3:'6.A1.2',q3b:'6.A1.2',sort4:'6.A1.2',home:'6.A1.2',after:'6.A1.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
