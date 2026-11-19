/* Giáo dục AI lớp 9 · Bài 8 (2 tiết) – soạn theo KHBD-AI-LOP 9. Mô hình, chatbot trong mô phỏng là giả lập. */
const BAI={lop:9,so:8,ten:'Kiểm tra và đánh giá sản phẩm AI',yccd:'9.D2.1 · 9.D2.MR1 · 9.D2.MR2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Sản phẩm của nhóm tốt chưa?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'9.D2.1',ic:'bot',
  story:'Nhóm bạn Hưng (giả định) có mô hình nhận dạng rác. Hưng nói: "Thử 5 ảnh trong bộ huấn luyện đều đúng, vậy là tốt rồi!"',
  qs:[{id:'pred',type:'single',q:'Cách kiểm tra của Hưng đã đủ tin cậy chưa?',opts:['Đủ rồi','Chưa – phải thử với dữ liệu mới chưa dùng khi huấn luyện, thử nhiều hơn và đếm đúng/sai'],ok:1}],
  key:['Câu hỏi lớn: <b>Kiểm tra thế nào để biết sản phẩm AI thật sự tốt?</b>']},
 {t:'Cách kiểm tra đơn giản',hd:'Hoạt động 2 · Hình thành kiến thức · Tiết 1',code:'9.D2.1',ic:'paper',
  story:'Dùng "phòng kiểm thử": chọn loại dữ liệu kiểm thử và số lần thử, chạy kiểm tra mô hình nhận dạng rác, ghi bảng đúng/sai.',
  qs:[{id:'sim1',type:'sim',sim:'test'},
   {id:'cach',type:'multi',q:'Cách kiểm tra đơn giản để đánh giá sản phẩm AI',opts:['Với mô hình nhận dạng: thử dữ liệu mới chưa dùng khi huấn luyện, đếm số đúng/sai','Với chatbot: đặt nhiều câu hỏi khác nhau, cả câu khó, câu ngoài phạm vi','Ghi kết quả vào bảng, tính tỉ lệ đúng','Chỉ thử lại ảnh đã dùng để huấn luyện'],ok:[0,1,2]},
   {id:'obs1',type:'single',q:'Vì sao thử bằng ảnh huấn luyện cho kết quả "đẹp" giả?',opts:['Vì mô hình đã học thuộc các ảnh đó','Vì máy tính nhanh','Không có lí do'],ok:0}],
  key:['Kiểm tra: <b>dữ liệu mới</b>, <b>đủ nhiều</b>, <b>đa dạng</b>, <b>ghi bảng đúng/sai</b>.']},
 {t:'Thiết kế bảng kiểm tra',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'9.D2.MR1',ic:'student',
  story:'Thiết kế và thực hiện kiểm tra cho chatbot "Hỏi đáp ngày hội đọc sách" (giả định).',
  qs:[{id:'lab',type:'sim',sim:'lab_xuong'},{id:'bang',type:'text',q:'Bảng kiểm tra: ít nhất 6 câu hỏi thử (thường gặp, khó, ngoài phạm vi), cột kết quả mong đợi, cột đúng/sai',ans:'Ví dụ: "Gian khối 7 ở đâu?" – mong đợi: Dãy B – Đúng/Sai; "Mấy giờ đố vui?" – 9h; "Cho mình số điện thoại thầy hiệu trưởng" – từ chối, nhắc không chia sẻ… Tính tỉ lệ đúng.'},
   {id:'q3',type:'single',q:'Câu hỏi ngoài phạm vi dùng để kiểm tra điều gì?',opts:['Chatbot có biết từ chối, chuyển cho người phụ trách không','Chatbot chạy nhanh không','Màu giao diện'],ok:0}],
  key:['Bảng kiểm tra tốt có <b>câu thường gặp, câu khó, câu ngoài phạm vi</b>, kết quả mong đợi và cột đúng/sai.']},
 {t:'Phân tích kết quả và cải tiến',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'9.D2.MR2',ic:'scale',
  story:'Kết quả kiểm thử mô hình rác (mô phỏng): nhựa đúng 18/20, giấy 17/20, <b>kim loại 6/20</b>.',
  qs:[{id:'pt',type:'single',q:'Phân tích đúng nhất',opts:['Mô hình tốt đều','Mô hình yếu với kim loại – có thể do thiếu ảnh kim loại khi huấn luyện','Do máy tính chậm'],ok:1},
   {id:'ct',type:'text',q:'Đề xuất 2 cách cải tiến và cách kiểm tra lại',ans:'Bổ sung ảnh kim loại đa dạng (lon, nắp, dây), gán nhãn lại ảnh sai; huấn luyện lại rồi thử 20 ảnh kim loại mới, so sánh tỉ lệ đúng trước – sau.'},
   {id:'after',type:'text',q:'Quay lại cách kiểm tra của Hưng: em góp ý gì?',short:1,ans:'Thử ảnh mới, nhiều hơn, đủ các loại, ghi bảng và tính tỉ lệ.'}],
  key:['<b>Kiểm tra → phân tích theo nhóm → cải tiến → kiểm tra lại</b>; con người dẫn dắt vòng cải tiến.']}
];
const DECL=[];
const GHIBAI={so:'Bài 8:',ten:'KIỂM TRA VÀ ĐÁNH GIÁ SẢN PHẨM AI',muc:[
 {step:2,h:'Cách kiểm tra',it:['Mô hình nhận dạng: dữ liệu mới, đếm đúng/sai.','Chatbot: nhiều câu hỏi khác nhau, cả câu khó, ngoài phạm vi.']},
 {step:3,h:'Bảng kiểm tra',it:[],tb:[['Câu thử','Mong đợi','Đúng/Sai'],['thường gặp','…','…'],['khó','…','…'],['ngoài phạm vi','từ chối, chuyển người','…']]},
 {step:4,h:'Vòng cải tiến',it:[],flow:['Kiểm tra','Phân tích','Cải tiến','Kiểm tra lại']}]};
function renderGhiBai(){}
const QCODE={pred:'9.D2.1',cach:'9.D2.1',obs1:'9.D2.1',bang:'9.D2.MR1',q3:'9.D2.MR1',pt:'9.D2.MR2',ct:'9.D2.MR2',after:'9.D2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
