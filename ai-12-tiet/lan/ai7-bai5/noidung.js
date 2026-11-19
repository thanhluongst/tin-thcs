/* Giáo dục AI lớp 7 · Bài 5 (1 tiết) – soạn theo KHBD-AI-LOP 7. Tình huống giả định; không dùng công cụ AI thật. */
const BAI={lop:7,so:5,ten:'Sử dụng AI có trách nhiệm và khai báo trung thực',yccd:'7.B3.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Có nên nói ra?',hd:'Hoạt động 1 · Mở đầu',code:'7.B3.1',ic:'chat',
  story:'Bạn Vy (giả định) dùng AI gợi ý dàn ý bài thuyết trình, tự viết nội dung. Cô hỏi: "Bài này em có dùng AI không?"',
  qs:[{id:'q1',type:'single',q:'Vy nên trả lời thế nào?',opts:['"Không ạ" cho khỏi bị trừ điểm','Nói thật: dùng AI gợi ý dàn ý, phần còn lại tự viết','Im lặng'],ok:1}],
  key:['<b>Nói ra việc dùng AI là một phần của trung thực</b>.']},
 {t:'Khai báo đủ 5 ý',hd:'Hoạt động 2 · Hình thành kiến thức',code:'7.B3.1',ic:'paper',
  story:'Dùng "máy kiểm tra khai báo": viết khai báo cho sản phẩm của Vy, máy cho biết còn thiếu ý nào.',
  qs:[{id:'sim1',type:'sim',sim:'declare'},
   {id:'nam',type:'multi',q:'Khai báo trung thực gồm',opts:['Công cụ AI đã dùng','Dùng để làm gì (mục đích)','Phần được AI hỗ trợ','Đã kiểm chứng bằng cách nào','Phần em tự làm','Tên người bán điện thoại'],ok:[0,1,2,3,4]}],
  key:['Khai báo đủ 5 ý: <b>công cụ – mục đích – phần được hỗ trợ – cách kiểm chứng – phần tự làm</b>.']},
 {t:'Hợp lí hay gian lận?',hd:'Hoạt động 3 · Luyện tập',code:'7.B3.1',ic:'scale',
  story:'Xếp các tình huống (giả định).',
  qs:[{id:'lab',type:'sim',sim:'lab_gaccong'},{id:'gl',type:'sort',q:'Tình huống này…',cols:{ok:'Dùng có trách nhiệm',no:'Không phù hợp'},items:[
     {t:'Được phép dùng AI gợi ý ý tưởng, Vy dùng và khai báo đủ',a:'ok'},{t:'Bài kiểm tra không cho dùng AI, Nam vẫn dùng rồi khai báo',a:'no'},
     {t:'Nhờ AI viết toàn bộ bài, ghi "em tự làm"',a:'no'},{t:'Dùng AI kiểm tra chính tả, tự sửa, ghi rõ',a:'ok'},
     {t:'Nhập ảnh, họ tên bạn vào AI để làm bài',a:'no'},{t:'Kiểm chứng số liệu AI đưa bằng SGK trước khi dùng',a:'ok'}]},
   {id:'q3',type:'single',q:'Nhiệm vụ không cho phép dùng AI, em đã dùng và khai báo. Như vậy…',opts:['Hợp lệ vì đã khai báo','Vẫn không hợp lệ – khai báo không làm việc đó thành được phép'],ok:1}],
  key:['Dùng AI gợi ý <b>không mặc nhiên là gian lận</b> nếu <b>được phép và khai báo</b>; nhiệm vụ không cho dùng AI thì khai báo không làm thành hợp lệ.']},
 {t:'Cam kết của em',hd:'Hoạt động 4 · Vận dụng',code:'7.B3.1',ic:'pen',
  story:'Viết một đoạn ngắn (3–4 câu) thể hiện cam kết sử dụng AI có trách nhiệm.',
  qs:[{id:'cam',type:'text',q:'Cam kết của em',ans:'Ví dụ: Em chỉ dùng AI khi được phép, không nhập thông tin cá nhân, tự làm phần cần rèn luyện, kiểm chứng kết quả và khai báo đủ 5 ý.'}],
  key:['<b>AI gợi ý – em kiểm chứng – em khai báo – em chịu trách nhiệm</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 5:',ten:'SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ KHAI BÁO TRUNG THỰC',muc:[
 {step:2,h:'Khai báo 5 ý',it:[],flow:['Công cụ','Mục đích','Phần được hỗ trợ','Cách kiểm chứng','Phần tự làm']},
 {step:3,h:'Dùng có trách nhiệm',it:['Được phép mới dùng; giữ thông tin cá nhân; kiểm chứng; tự làm phần cần rèn luyện.']},
 {step:4,h:'Ghi nhớ',it:['AI gợi ý – em kiểm chứng – em khai báo – em chịu trách nhiệm.']}]};
function renderGhiBai(){}
const QCODE={q1:'7.B3.1',nam:'7.B3.1',gl:'7.B3.1',q3:'7.B3.1',cam:'7.B3.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
