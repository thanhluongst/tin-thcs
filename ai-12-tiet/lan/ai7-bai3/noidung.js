/* Giáo dục AI lớp 7 · Bài 3 (1 tiết) – soạn theo KHBD-AI-LOP 7. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:7,so:3,ten:'Quyền tự chủ của con người khi tương tác với AI',yccd:'7.A3.1 · 7.A3.2'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Hai thao tác tự động',hd:'Hoạt động 1 · Mở đầu',code:'7.A3.1',ic:'paper',
  story:'Khi soạn thảo, phần mềm <b>tự gạch đỏ và gợi ý sửa lỗi chính tả</b>. Một phần mềm dọn dẹp lại muốn <b>tự xoá các tệp "không cần thiết"</b> trong máy.',
  qs:[{id:'pred',type:'single',q:'Em có để cả hai việc tự động không?',opts:['Có, cả hai','Sửa chính tả thì được; xoá tệp thì em cần tự quyết định','Không việc nào'],ans:'Dự đoán – sẽ đối chiếu sau mô phỏng.'}],
  key:['Câu hỏi lớn: <b>Việc nào để AI tự động làm, việc nào con người cần tự quyết định?</b>']},
 {t:'Khi nào được tự động?',hd:'Hoạt động 2 · Hình thành kiến thức',code:'7.A3.1',ic:'bot',
  story:'Dùng "máy soi thao tác": chọn thao tác, trả lời 3 câu hỏi, xem có nên để AI tự động không.',
  qs:[{id:'sim1',type:'sim',sim:'auto'},
   {id:'obs1',type:'multi',q:'AI được phép tự động thực hiện khi…',opts:['Hậu quả nếu sai là nhỏ','Có thể hoàn tác (làm lại) được','Người dùng xem lại hoặc tắt được','Thao tác càng quan trọng càng nên tự động'],ok:[0,1,2]},
   {id:'sortauto',type:'sort',q:'Thao tác này…',cols:{td:'AI tự động được',ng:'Con người trực tiếp quyết định'},items:[
     {t:'Gạch chân lỗi chính tả',a:'td'},{t:'Xoá vĩnh viễn ảnh gia đình',a:'ng'},{t:'Chặn tệp nghi có virus vào khu cách li',a:'td'},
     {t:'Chuyển tiền từ tài khoản ngân hàng',a:'ng'},{t:'Gợi ý từ tiếp theo khi gõ',a:'td'},{t:'Chọn trường cấp 3 để nộp hồ sơ',a:'ng'}]}],
  key:['AI được tự động khi <b>hậu quả nhỏ, hoàn tác được, người dùng xem lại hoặc tắt được</b>.']},
 {t:'Bảo vệ quyền tự chủ',hd:'Hoạt động 3 · Luyện tập',code:'7.A3.2',ic:'scale',
  story:'Ứng dụng học tập (giả định) đề nghị: <i>"Để AI tự chọn môn em học thêm, tự đăng kí lớp và tự trừ tiền từ tài khoản của bố mẹ cho tiện."</i>',
  qs:[{id:'q3',type:'single',q:'Em xử lí thế nào?',opts:['Đồng ý cho tiện','Chỉ nhận gợi ý; em cùng bố mẹ xem xét và tự quyết định','Xoá ứng dụng ngay không cần suy nghĩ'],ok:1},
   {id:'why3',type:'text',q:'Vì sao cần bảo vệ quyền tự chủ khi quyết định việc quan trọng?',ans:'Vì quyết định ảnh hưởng lớn tới bản thân, gia đình; AI không hiểu hết mong muốn, hoàn cảnh; con người phải chịu trách nhiệm và có quyền lựa chọn.'}],
  key:['Quyết định <b>quan trọng</b> (tiền bạc, học tập, sức khoẻ, quan hệ) phải do <b>con người</b> quyết định; AI chỉ gợi ý.']},
 {t:'Vận dụng',hd:'Hoạt động 4 · Vận dụng',code:'7.A3.2',ic:'pen',
  story:'Kiểm tra một phần mềm em dùng: tính năng tự động nào đang bật?',
  qs:[{id:'van',type:'text',q:'Kể 1 tính năng nên để tự động và 1 tính năng em sẽ tắt / tự quyết. Giải thích.',ans:'Ví dụ: để tự động kiểm tra chính tả (hoàn tác được); tắt "tự động gửi ảnh lên mạng" vì ảnh là dữ liệu cá nhân, khó thu hồi.'},
   {id:'after',type:'text',q:'Đối chiếu với dự đoán ở Hoạt động 1',short:1,ans:'Tự đánh giá.'}],
  key:['Em là người <b>làm chủ</b> công cụ AI.']}
];
const DECL=[];
const GHIBAI={so:'Bài 3:',ten:'QUYỀN TỰ CHỦ CỦA CON NGƯỜI KHI TƯƠNG TÁC VỚI AI',muc:[
 {step:2,h:'AI tự động được khi',it:['Hậu quả nhỏ','Hoàn tác được','Người dùng xem lại, tắt được']},
 {step:3,h:'Con người quyết định',it:['Việc quan trọng: tiền bạc, học tập, sức khoẻ, quan hệ.']},
 {step:4,h:'Ghi nhớ',it:['AI gợi ý – em làm chủ.']}]};
function renderGhiBai(){}
const QCODE={pred:'7.A3.1',obs1:'7.A3.1',sortauto:'7.A3.1',q3:'7.A3.2',why3:'7.A3.2',van:'7.A3.2',after:'7.A3.2'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
