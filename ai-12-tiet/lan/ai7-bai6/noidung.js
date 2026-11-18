/* Giáo dục AI lớp 7 · Bài 6 (2 tiết) – soạn theo KHBD-AI-LOP 7. Dữ liệu ảnh mô phỏng bằng biểu tượng; chỉ để minh hoạ. */
const BAI={lop:7,so:6,ten:'Dữ liệu huấn luyện và các cách AI học',yccd:'7.C5.1 · 7.C5.2 · 7.C4.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Dạy máy phân biệt chó, mèo',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'7.C5.1',ic:'img',
  story:'Nhóm bạn Tú (giả định) muốn làm một chương trình AI phân biệt ảnh <b>chó</b> và <b>mèo</b>.',
  qs:[{id:'pred',type:'text',q:'Theo em, cần làm những bước nào để "dạy" máy?',short:1,ans:'Dự đoán, không chấm.'}],
  key:['Câu hỏi lớn: <b>Máy học từ dữ liệu như thế nào? Dữ liệu có thể gây ra vấn đề gì?</b>']},
 {t:'Bốn bước huấn luyện',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'7.C5.1',ic:'bot',
  story:'Làm lần lượt 4 bước trong "xưởng huấn luyện": <b>thu thập và gán nhãn</b> → <b>cho máy học</b> → <b>kiểm tra trên ảnh mới</b> → <b>điều chỉnh</b>. Thử với bộ dữ liệu thiếu đa dạng rồi bổ sung.',
  qs:[{id:'sim1',type:'sim',sim:'train7'},
   {id:'buoc',type:'match',q:'Sắp xếp các bước huấn luyện AI',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Thu thập và gán nhãn dữ liệu ảnh chó, mèo','Cho máy học từ dữ liệu','Kiểm tra khả năng phân biệt trên ảnh mới','Điều chỉnh (thêm dữ liệu, sửa nhãn) nếu chưa tốt'],ok:[0,1,2,3]},
   {id:'obs1',type:'single',q:'Khi chỉ dạy bằng ảnh mèo lông trắng, máy kiểm tra trên mèo đen thì…',opts:['Nhận đúng hết','Hay nhận nhầm – vì dữ liệu thiếu đa dạng','Không chạy'],ok:1}],
  key:['Huấn luyện: <b>thu thập, gán nhãn → học → kiểm tra trên dữ liệu mới → điều chỉnh</b>.']},
 {t:'Các cách AI học',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 2',code:'7.C5.2',ic:'student',
  story:'Nối ví dụ với cách học của AI.',
  qs:[{id:'cach',type:'match',q:'Ví dụ – cách học',items:['Máy học từ hàng nghìn ảnh đã ghi sẵn "chó" hoặc "mèo"','Máy tự chia khách hàng thành các nhóm có thói quen mua giống nhau','Robot tập đi: ngã thì đổi cách, đi được thì giữ cách đó'],opts:['Học từ dữ liệu đã được con người gán nhãn','Tự tìm ra quy luật từ dữ liệu','Học qua thử nghiệm và rút kinh nghiệm từ kết quả'],ok:[0,1,2]}],
  key:['Ba cách học: <b>từ dữ liệu có nhãn</b>; <b>tự tìm quy luật</b>; <b>thử – sai – rút kinh nghiệm</b>.']},
 {t:'Vấn đề đạo đức từ dữ liệu',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'7.C4.1',ic:'lock',
  story:'Các tình huống (giả định) về dữ liệu huấn luyện.',
  qs:[{id:'dd',type:'match',q:'Tình huống – vấn đề đạo đức',items:['Máy nhận diện khuôn mặt chỉ học ảnh người da sáng','Công ty lấy ảnh trên mạng xã hội của học sinh để huấn luyện mà không hỏi','Dữ liệu tuyển dụng cũ chủ yếu là nam giới'],opts:['Thiếu đa dạng → nhận sai, đối xử không công bằng','Xâm phạm quyền riêng tư','Thiên vị, phân biệt đối xử theo giới'],ok:[0,1,2]},
   {id:'q3',type:'text',q:'Đề xuất một cách giảm vấn đề cho một tình huống trên.',short:1,ans:'Ví dụ: thu thập ảnh đa dạng (màu da, tuổi, ánh sáng); chỉ dùng ảnh khi được đồng ý; kiểm tra kết quả với từng nhóm người.'}],
  key:['Dữ liệu <b>thiếu đa dạng</b> → phân biệt đối xử; dữ liệu <b>lấy không được phép</b> → xâm phạm riêng tư.']},
 {t:'Vận dụng',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'7.C5.1',ic:'pen',
  story:'Nhóm em muốn làm AI nhận biết lá cây bị sâu trong vườn trường.',
  qs:[{id:'van',type:'text',q:'Mô tả 4 bước huấn luyện và 1 lưu ý đạo đức về dữ liệu.',ans:'Ví dụ: chụp nhiều ảnh lá khoẻ, lá sâu (nhiều loại cây, ánh sáng), gán nhãn → cho máy học → thử với ảnh mới → thêm ảnh khi sai. Lưu ý: không chụp người, chỉ chụp lá.'},
   {id:'after',type:'text',q:'Đối chiếu với dự đoán đầu bài',short:1,ans:'Tự đánh giá.'}],
  key:['Dữ liệu <b>đủ, đa dạng, hợp pháp</b> là nền móng của AI tốt.']}
];
const DECL=[];
const GHIBAI={so:'Bài 6:',ten:'DỮ LIỆU HUẤN LUYỆN VÀ CÁC CÁCH AI HỌC',muc:[
 {step:2,h:'Bốn bước huấn luyện',it:[],flow:['Thu thập, gán nhãn','Cho máy học','Kiểm tra trên dữ liệu mới','Điều chỉnh']},
 {step:3,h:'Ba cách học',it:['Từ dữ liệu có nhãn','Tự tìm quy luật','Thử – sai – rút kinh nghiệm']},
 {step:4,h:'Vấn đề đạo đức',it:['Thiếu đa dạng → phân biệt đối xử.','Lấy không được phép → xâm phạm riêng tư.']},
 {step:5,h:'Ghi nhớ',it:['Dữ liệu đủ, đa dạng, hợp pháp.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.C5.1',buoc:'7.C5.1',obs1:'7.C4.1',van:'7.C5.1',after:'7.C5.1',cach:'7.C5.2',dd:'7.C4.1',q3:'7.C4.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
