/* Giáo dục AI lớp 9 · Bài 6 (1 tiết) – soạn theo KHBD-AI-LOP 9. Bộ dữ liệu mô phỏng, giả định. */
const BAI={lop:9,so:6,ten:'Cải thiện dữ liệu để nâng cao chất lượng sản phẩm AI',yccd:'9.C4.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Mô hình nhận dạng rác kém chính xác',hd:'Hoạt động 1 · Mở đầu',code:'9.C4.1',ic:'bot',
  story:'Nhóm bạn Long (giả định) làm mô hình phân loại rác <b>nhựa / giấy / kim loại</b> từ ảnh. Kiểm thử chỉ đúng khoảng 60%. Bạn Long định "thêm thật nhiều ảnh bất kì".',
  qs:[{id:'pred',type:'text',q:'Theo em, nên xem lại điều gì trước khi thêm ảnh?',short:1,ans:'Dự đoán: xem bộ dữ liệu có thiếu loại nào, có ảnh trùng, có ảnh gán nhãn sai không.'}],
  key:['Câu hỏi lớn: <b>Bộ dữ liệu có vấn đề gì và sửa thế nào để sản phẩm tốt hơn?</b>']},
 {t:'Bốn cách cải thiện dữ liệu',hd:'Hoạt động 2 · Hình thành kiến thức',code:'9.C4.1',ic:'paper',
  story:'Dùng "bàn làm sạch dữ liệu": xem thống kê bộ dữ liệu, chọn cách cải thiện, huấn luyện lại và so sánh độ chính xác.',
  qs:[{id:'sim1',type:'sim',sim:'clean'},
   {id:'cach',type:'match',q:'Vấn đề – cách cải thiện',items:['Ảnh kim loại quá ít','Một ảnh chai nhựa bị chép 40 lần','Ảnh lon nhôm bị ghi nhãn "nhựa"','Ảnh mờ, không thấy vật'],opts:['Bổ sung dữ liệu còn thiếu','Loại bỏ dữ liệu trùng lặp','Gán nhãn lại cho đúng','Sửa hoặc loại dữ liệu sai, kém chất lượng'],ok:[0,1,2,3]},
   {id:'obs1',type:'single',q:'Quan sát: cách nào làm độ chính xác tăng nhiều nhất trong mô phỏng?',opts:['Thêm thật nhiều ảnh bất kì','Kết hợp cả bốn cách cải thiện','Không làm gì'],ok:1}],
  key:['Bốn cách: <b>bổ sung dữ liệu thiếu – loại trùng lặp – sửa dữ liệu sai – gán nhãn lại</b>; sau đó <b>kiểm thử lại</b>.']},
 {t:'Vận dụng',hd:'Hoạt động 3–4 · Luyện tập, vận dụng',code:'9.C4.1',ic:'pen',
  story:'Chatbot hỏi đáp của lớp (giả định) hay trả lời sai lịch kiểm tra vì bộ câu hỏi – trả lời cũ còn lịch năm trước và thiếu câu về môn Tin.',
  qs:[{id:'lab',type:'sim',sim:'lab_caytrong'},{id:'van',type:'text',q:'Nêu 2 cách cải thiện bộ dữ liệu của chatbot và cách kiểm tra lại.',ans:'Ví dụ: xoá/sửa lịch năm trước (dữ liệu sai), bổ sung câu hỏi môn Tin (dữ liệu thiếu), loại câu trùng; kiểm tra lại bằng 10 câu hỏi mới, đếm số câu đúng.'}],
  key:['Chất lượng sản phẩm AI <b>phụ thuộc chất lượng dữ liệu</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 6:',ten:'CẢI THIỆN DỮ LIỆU ĐỂ NÂNG CAO CHẤT LƯỢNG SẢN PHẨM AI',muc:[
 {step:2,h:'Bốn cách cải thiện',it:[],flow:['Bổ sung thiếu','Loại trùng','Sửa sai','Gán nhãn lại','Kiểm thử lại']},
 {step:3,h:'Ghi nhớ',it:['Dữ liệu tốt → sản phẩm AI tốt.']}]};
function renderGhiBai(){}
const QCODE={pred:'9.C4.1',cach:'9.C4.1',obs1:'9.C4.1',van:'9.C4.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
