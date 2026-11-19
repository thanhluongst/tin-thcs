/* Giáo dục AI lớp 8 · Bài 2 (1 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống, nhân vật giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:2,ten:'Nhận diện nguy cơ AI theo dõi và thao túng người dùng',yccd:'8.A2.1 · 8.A2.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Đoán xem chị K đang thế nào?',hd:'Hoạt động 1 · Mở đầu',code:'8.A2.1',ic:'img',
  story:'Bốn dấu vết dùng ứng dụng của chị K (giả định): ① tuần này mở ứng dụng lúc <b>1 giờ sáng</b> nhiều lần; ② tìm kiếm <b>“đề thi vào lớp 10”</b>; ③ nghe liên tục <b>nhạc buồn</b>; ④ đặt <b>trà sữa lúc 23 giờ</b>.',
  qs:[{id:'pred',type:'text',q:'Em đoán chị K đang thế nào?',short:1,ph:'Em đoán chị K …',ans:'Ý đoán chấp nhận được: chị K sắp thi vào lớp 10, đang áp lực, thường thức khuya. Chỉ từ vài dấu vết đã đoán được khá nhiều!'},
   {id:'q1',type:'single',q:'Nếu em đoán được từ 4 dấu vết, hệ thống AI có hàng nghìn dấu vết thì sao?',opts:['Không đoán được gì','Đoán được nhiều hơn và có thể dùng để tác động tới chị K','Chỉ đoán được tên chị K'],ok:1}],
  key:['Câu hỏi lớn: <b>AI dùng dữ liệu của em để làm gì, và làm sao em nhận ra mình đang bị theo dõi, thao túng?</b>']},
 {t:'Hai người dùng, một hệ thống',hd:'Hoạt động 2.1 · Hình thành kiến thức',code:'8.A2.2',ic:'video',
  story:'Hai bạn cùng dùng một ứng dụng video. <b>Bạn A</b> bấm theo gợi ý; <b>bạn B</b> tự tìm nhiều chủ đề. Mô phỏng: sau mỗi lượt, AI chọn 6 video tiếp theo dựa trên những gì em đã xem.',
  qs:[{id:'sim1',type:'sim',sim:'feed'},
   {id:'obs1',type:'single',q:'Quan sát: người chỉ bấm theo gợi ý thì sau nhiều lượt…',opts:['Được xem nhiều chủ đề hơn','Số chủ đề giảm dần, bị đề xuất một chiều và dễ xem lâu hơn dự định','Không thay đổi gì'],ok:1},
   {id:'q21',type:'single',q:'Thông báo “Còn 3 video hay nữa!” đúng lúc em định tắt máy là dấu hiệu của…',opts:['Thu thập dữ liệu minh bạch','Bị thao túng hành động','Bị mất mật khẩu'],ok:1}],
  key:['AI học thói quen để <b>chọn nội dung</b> và <b>chọn thời điểm</b> giữ chân người dùng.','Dấu hiệu: số chủ đề <b>thu hẹp</b>; thông báo đến <b>đúng lúc em định dừng</b>.']},
 {t:'Dấu vết dữ liệu của Khang',hd:'Hoạt động 2.2 · Hình thành kiến thức',code:'8.A2.1',ic:'lock',
  story:'Bạn Khang (giả định) cấp nhiều quyền cho ứng dụng. Bật/tắt từng quyền và số ngày dùng để xem hệ thống <b>thu thập – phân tích – sử dụng</b> dữ liệu và <b>tác động</b> gì tới Khang.',
  qs:[{id:'sim2',type:'sim',sim:'trace'},
   {id:'chain',type:'match',q:'Xếp chuỗi dữ liệu vị trí của Khang',items:['Thu thập','Phân tích','Sử dụng','Tác động'],opts:['Ứng dụng ghi vị trí mỗi ngày','AI đoán nhà, trường, giờ Khang ra khỏi nhà','Gửi quảng cáo quán ăn gần trường lúc tan học','Khang tiêu tiền theo gợi ý, lộ nơi ở nếu dữ liệu bị bán'],ok:[0,1,2,3]},
   {id:'obs2',type:'single',q:'Quan sát mô phỏng: điều gì làm hệ thống "biết" về Khang nhiều nhất?',opts:['Cấp nhiều quyền và dùng nhiều ngày','Màu điện thoại','Tên ứng dụng'],ok:0}],
  key:['Chuỗi: <b>Thu thập → Phân tích → Sử dụng → Tác động</b>.','Càng nhiều quyền, càng nhiều ngày → AI đoán càng nhiều về em.']},
 {t:'Thám tử dấu hiệu',hd:'Hoạt động 3 · Luyện tập',code:'8.A2.2',ic:'student',
  story:'Bốn hiện tượng: <b>1.</b> Bị theo dõi mà không biết; <b>2.</b> Bị đề xuất một chiều; <b>3.</b> Bị thao túng suy nghĩ hoặc hành động; <b>4.</b> Mất quyền kiểm soát dữ liệu cá nhân. Gọi tên hiện tượng trong từng tình huống (giả định).',
  qs:[{id:'lab',type:'sim',sim:'lab_canhsat'},{id:'det',type:'match',q:'Tình huống nào là hiện tượng nào?',items:['Ứng dụng đèn pin đòi quyền vị trí, danh bạ và không nói để làm gì.','Mạng xã hội chỉ hiện bài cùng một quan điểm với em đã thích.','Trò chơi báo “Chỉ còn 5 phút ưu đãi!” mỗi tối khi em định đi ngủ.','Em muốn xoá ảnh đã gửi lên ứng dụng chỉnh mặt nhưng không có cách nào xoá.'],opts:['1. Bị theo dõi mà không biết','2. Đề xuất một chiều','3. Thao túng hành động','4. Mất quyền kiểm soát dữ liệu'],ok:[0,1,2,3]},
   {id:'tf',type:'tf',q:'Thu thập minh bạch hay hiện tượng kiểm soát? (Đúng = minh bạch, chấp nhận được)',items:[
     {t:'Ứng dụng bản đồ xin quyền vị trí, nói rõ để chỉ đường, cho tắt bất cứ lúc nào.',a:'T'},
     {t:'Ứng dụng học tiếng Anh âm thầm bật micro khi không dùng.',a:'F'},
     {t:'Ứng dụng cho xem và tải về dữ liệu đã lưu về em.',a:'T'}]}],
  key:['Gọi đúng <b>tên hiện tượng</b> + chỉ ra <b>dấu hiệu nhìn thấy được</b>.','Minh bạch = nói rõ thu gì, để làm gì, cho phép tắt, xoá.']},
 {t:'Tình huống của Linh',hd:'Hoạt động 4 · Vận dụng',code:'8.A2.2',ic:'bot',
  story:'Linh (giả định) dùng một ứng dụng học tập. Ứng dụng hiện: <b>“Bạn thường ở nhà sau 21 giờ”</b>; mục <b>“Gợi ý cho bạn”</b> chỉ còn khoá học trả phí của chính ứng dụng; tối nào cũng <b>đúng 22 giờ</b> gửi thông báo doạ <b>mất chuỗi</b> ngày học; muốn xoá tài khoản thì <b>không tìm thấy nút xoá</b>.',
  qs:[{id:'linh',type:'multi',q:'Tình huống của Linh có những hiện tượng nào?',opts:['1. Bị theo dõi mà không biết','2. Đề xuất một chiều','3. Thao túng hành động','4. Mất quyền kiểm soát dữ liệu'],ok:[0,1,2,3]},
   {id:'act',type:'text',q:'Em chọn một hành động giữ quyền tự chủ và viết một câu sẽ nói với Linh.',ans:'Ví dụ: Tắt quyền vị trí và thông báo của ứng dụng; nói với Linh: “Thông báo 22 giờ là để giữ chân cậu, cứ học theo kế hoạch của mình thôi.” Báo bố mẹ, thầy cô khi không xoá được tài khoản.'},
   {id:'pledge',type:'single',q:'Việc em cam kết làm khi thấy dấu hiệu bị theo dõi, thao túng?',opts:['Bỏ qua cho nhanh','Kiểm tra, tắt quyền không cần thiết, hỏi người lớn tin cậy','Đăng dữ liệu của bạn để thử'],ok:1}],
  key:['Giữ quyền tự chủ: <b>tắt quyền không cần</b>, <b>chủ động chọn nội dung</b>, <b>đặt giờ dùng</b>, <b>hỏi người lớn</b>.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.A2.1 – 8.A2.2',ic:'scale',
  story:'Quay lại ý đoán về chị K ở Hoạt động 1.',
  qs:[{id:'after',type:'text',q:'Bây giờ em nghĩ: ứng dụng có thể dùng 4 dấu vết của chị K để làm gì?',short:1,ans:'Ví dụ: gửi quảng cáo khoá luyện thi lúc 1 giờ sáng, gợi ý thêm nhạc buồn để giữ chân – đó là thao túng.'}],
  key:['AI có thể <b>thu thập – phân tích – sử dụng</b> dữ liệu cá nhân để tác động tới em.','Nhận ra <b>4 hiện tượng</b> và giữ <b>quyền tự chủ</b>.']}
];
const DECL=[];
/* ---- Ghi bài ---- */
const GHIBAI={so:'Bài 2:',ten:'NHẬN DIỆN NGUY CƠ AI THEO DÕI VÀ THAO TÚNG NGƯỜI DÙNG',muc:[
 {step:1,h:'Dấu vết dữ liệu',it:['Từ vài dấu vết đã đoán được nhiều điều về một người.']},
 {step:2,h:'Đề xuất một chiều, thao túng',it:['AI chọn <b>nội dung</b> và <b>thời điểm</b> để giữ chân người dùng.']},
 {step:3,h:'Chuỗi dữ liệu',it:[],flow:['Thu thập','Phân tích','Sử dụng','Tác động']},
 {step:4,h:'Bốn hiện tượng AI kiểm soát người dùng',it:[],tb:[['Hiện tượng','Dấu hiệu'],['1. Bị theo dõi mà không biết','xin quyền không cần, không nói rõ'],['2. Đề xuất một chiều','nội dung ngày càng giống nhau'],['3. Thao túng','thông báo đúng lúc em định dừng'],['4. Mất kiểm soát dữ liệu','không xem, không xoá được']]},
 {step:6,h:'Ghi nhớ',it:['Nhận ra dấu hiệu → <b>tắt quyền, chủ động chọn, hỏi người lớn</b>.']}]};
function renderGhiBai(){}
/* ---- Mã YCCĐ của từng câu ---- */
const QCODE={pred:'8.A2.1',q1:'8.A2.1',chain:'8.A2.1',obs2:'8.A2.1',after:'8.A2.1',
  obs1:'8.A2.2',q21:'8.A2.2',det:'8.A2.2',tf:'8.A2.2',linh:'8.A2.2',act:'8.A2.2',pledge:'8.A2.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
