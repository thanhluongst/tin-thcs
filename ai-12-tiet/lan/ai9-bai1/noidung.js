/* Giáo dục AI lớp 9 · Bài 1 (2 tiết) – soạn theo KHBD-AI-LOP 9. Hồ sơ, số liệu trong mô phỏng là giả định. */
const BAI={lop:9,so:1,ten:'Thách thức, tác động và thiên vị của AI đối với xã hội',yccd:'9.A1.1 · 9.A2.1 · 9.A2.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Ra mắt sớm hay an toàn trước?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'9.A1.1',ic:'bot',
  story:'Công ty X (giả định) có chatbot tư vấn sức khoẻ cho tuổi teen, <b>chưa kiểm thử xong</b>. Đối thủ sắp ra mắt sản phẩm tương tự. Ban giám đốc muốn <b>ra mắt ngay</b> để chiếm thị trường.',
  qs:[{id:'pred',type:'single',q:'Em chọn phương án nào?',opts:['Ra mắt ngay, lỗi sửa sau','Kiểm thử xong rồi mới ra mắt','Ra mắt cho một nhóm nhỏ có người lớn giám sát'],ans:'Ý kiến cá nhân – không có đáp án duy nhất; cần lí do gắn với an toàn người dùng.'},
   {id:'yk',type:'text',q:'Ý kiến của em về thách thức "ưu tiên phát triển nhanh hay an toàn người dùng"',ans:'Ví dụ: Em chọn kiểm thử xong vì lời khuyên sức khoẻ sai có thể gây hại thật cho tuổi teen, lỗi lặp lại với rất nhiều người; đổi mới không được đánh đổi bằng an toàn.'}],
  key:['Thách thức của kỉ nguyên AI: <b>không hi sinh an toàn người dùng</b> để ưu tiên đổi mới, phát triển nhanh.']},
 {t:'Vì sao tác động của AI lớn?',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'9.A2.1',ic:'paper',
  story:'Thẻ dẫn chứng: Hà Nội vận hành Trung tâm điều khiển giao thông thông minh, AI điều chỉnh đèn tín hiệu theo thời gian thực từ dữ liệu hàng nghìn camera.',
  qs:[{id:'dh',type:'multi',q:'Bốn dấu hiệu khiến tác động của AI lớn',opts:['Nhiều người chịu ảnh hưởng cùng lúc','Tự động, nhanh','Áp cùng một quy tắc cho mọi trường hợp','Khó nhận ra, khó sửa khi sai','Máy chạy bằng điện'],ok:[0,1,2,3]},
   {id:'dc',type:'single',q:'Câu nào là DẪN CHỨNG (không chỉ là ví dụ)?',opts:['"AI có thể điều khiển đèn giao thông"','"Theo báo ngày 13/12/2025, Hà Nội vận hành trung tâm điều khiển đèn tín hiệu theo thời gian thực"','"Em nghĩ AI rất mạnh"'],ok:1}],
  key:['Dẫn chứng: <b>việc đã xảy ra, có nguồn</b>. Tác động lớn vì <b>nhiều người – tự động, nhanh – cùng một quy tắc – khó nhận ra</b>.']},
 {t:'Thành kiến và thiên vị',hd:'Hoạt động 2.2–2.3 · Hình thành kiến thức · Tiết 2',code:'9.A2.2',ic:'scale',
  story:'Mô phỏng một công cụ chấm hồ sơ xin việc học từ <b>dữ liệu tuyển dụng cũ</b> (đa số người được nhận là nam). 12 hồ sơ có kinh nghiệm gần như nhau.',
  qs:[{id:'sim1',type:'sim',sim:'hire'},
   {id:'obs1',type:'single',q:'Vì sao hồ sơ có chữ "đội bóng nữ" bị điểm thấp hơn?',opts:['Vì người đó kém hơn','Vì AI học lại thành kiến từ dữ liệu cũ','Ngẫu nhiên'],ok:1},
   {id:'dn',type:'match',q:'Ghép khái niệm',items:['Thành kiến','Thiên vị của AI'],opts:['Cách nhìn định sẵn, không công bằng của con người về một nhóm người','AI cho kết quả lệch, bất lợi cho một nhóm người một cách có hệ thống'],ok:[0,1]}],
  key:['AI <b>học lại thành kiến</b> từ dữ liệu rồi <b>lặp lại hàng loạt</b>. "AI không có ác ý, nhưng có thể bất công với hàng nghìn người cùng lúc."']},
 {t:'Luyện tập – Vận dụng',hd:'Hoạt động 3–4 · Luyện tập, vận dụng · Tiết 2',code:'9.A2.2',ic:'pen',
  story:'Công cụ AI vẽ ảnh nghề nghiệp (mô phỏng): "kĩ sư", "bác sĩ" gần như toàn ảnh nam; "y tá", "giáo viên mầm non" gần như toàn ảnh nữ.',
  qs:[{id:'hq',type:'text',q:'Nếu rất nhiều người dùng những ảnh này thì sao? Đề xuất một cách giảm thiên vị.',ans:'Cách nhìn "nghề này của nam, nghề kia của nữ" bị củng cố, ảnh hưởng lựa chọn nghề của học sinh. Giảm: dữ liệu đa dạng, kiểm tra kết quả theo nhóm, người dùng phản hồi.'},
   {id:'after',type:'text',q:'Quay lại tình huống công ty X: ý kiến của em có thay đổi không?',short:1,ans:'Tự đánh giá.'}],
  key:['Phát hiện thiên vị: <b>xem kết quả theo từng nhóm</b>, hỏi "dữ liệu từ đâu?".']}
];
const DECL=[];
const GHIBAI={so:'Bài 1:',ten:'THÁCH THỨC, TÁC ĐỘNG VÀ THIÊN VỊ CỦA AI ĐỐI VỚI XÃ HỘI',muc:[
 {step:1,h:'Thách thức',it:['Không hi sinh an toàn người dùng để phát triển nhanh.']},
 {step:2,h:'Bốn dấu hiệu tác động lớn',it:[],flow:['Nhiều người','Tự động, nhanh','Cùng một quy tắc','Khó nhận ra']},
 {step:3,h:'Thành kiến – thiên vị',it:['Thành kiến: cách nhìn định sẵn, không công bằng.','AI học lại từ dữ liệu → bất công hàng loạt.']},
 {step:4,h:'Ghi nhớ',it:['Xem kết quả theo từng nhóm.']}]};
function renderGhiBai(){}
const QCODE={pred:'9.A1.1',yk:'9.A1.1',after:'9.A1.1',dh:'9.A2.1',dc:'9.A2.1',obs1:'9.A2.2',dn:'9.A2.2',hq:'9.A2.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
