/* Giáo dục AI lớp 8 · Bài 5 (1 tiết) – soạn theo KHBD-AI-LOP 8. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:8,so:5,ten:'AI “đọc”, “nghe” và “nhìn” như thế nào?',yccd:'8.C1.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Máy có tai, có mắt không?',hd:'Hoạt động 1 · Mở đầu',code:'8.C1.1',ic:'bot',
  story:'Em nói “Mở bài hát Quê hương” – điện thoại mở đúng bài. Em chụp một bông hoa – ứng dụng báo “Hoa sen”. <b>Máy có tai, có mắt như người không?</b>',
  qs:[{id:'pred',type:'single',q:'Theo em, máy "nghe", "nhìn" bằng gì?',opts:['Máy có tai, mắt như người','Micro, camera thu tín hiệu, máy tính toán','Có người ngồi nghe hộ'],ok:1},
   {id:'before',type:'text',q:'Lúc đầu em nghĩ máy "hiểu" lời nói như thế nào?',short:1,ans:'Dự đoán, không chấm. Đối chiếu cuối bài.'}],
  key:['Máy <b>không có tai, mắt</b>: micro, camera <b>thu tín hiệu</b>, máy tính <b>tính toán</b>.']},
 {t:'Máy "nhìn": đổi hình thành số',hd:'Hoạt động 2.1 · Hình thành kiến thức',code:'8.C1.1',ic:'img',
  story:'Vẽ một hình lên lưới 8×8 ô. Máy đổi mỗi ô thành số (tô = 1, trống = 0), rồi <b>so với các mẫu đã học</b> để đoán.',
  qs:[{id:'sim1',type:'sim',sim:'see'},
   {id:'obs1',type:'single',q:'Quan sát: máy đoán hình bằng cách nào?',opts:['Hiểu ý nghĩa bức vẽ như người','So khớp dãy số của hình với các mẫu đã học, chọn mẫu giống nhất','Đoán ngẫu nhiên'],ok:1},
   {id:'obs1b',type:'single',q:'Vẽ một hình máy chưa từng học (ví dụ ngôi sao), máy sẽ…',opts:['Báo "không biết" rồi tự học','Vẫn chọn mẫu giống nhất trong các mẫu đã học – có thể sai','Vẽ lại cho đẹp'],ok:1}],
  key:['Quy trình: <b>Đầu vào</b> (ảnh) → <b>Xử lí</b> (đổi thành số, so với dữ liệu đã học) → <b>Đầu ra</b> (kết quả).']},
 {t:'Máy "nghe" sai ở bước nào?',hd:'Hoạt động 2.2 · Hình thành kiến thức',code:'8.C1.1',ic:'chat',
  story:'Trợ lí ảo “nghe” theo các bước: thu âm → chuyển giọng nói thành chữ → “đọc” chữ để hiểu lệnh → thực hiện. Thay đổi tiếng ồn, tốc độ nói và quan sát lỗi đi qua các bước.',
  qs:[{id:'sim2',type:'sim',sim:'hear'},
   {id:'obs2',type:'single',q:'Khi bước chuyển giọng nói thành chữ bị sai, các bước sau…',opts:['Tự sửa được lỗi','Làm theo chữ sai nên kết quả cũng sai','Không bị ảnh hưởng'],ok:1},
   {id:'ord',type:'match',q:'Sắp xếp các bước "nghe" của trợ lí ảo',items:['Bước 1','Bước 2','Bước 3','Bước 4'],opts:['Micro thu âm thanh','Chuyển giọng nói thành chữ','"Đọc" chữ, tìm ý lệnh','Thực hiện lệnh, trả lời'],ok:[0,1,2,3]}],
  key:['"Nghe" = <b>chuyển giọng nói thành chữ</b> rồi <b>"đọc"</b>.','Lỗi bước đầu <b>truyền sang</b> bước sau → chữ máy nghe ra <b>cần đọc lại</b>.']},
 {t:'Ba sơ đồ Đầu vào – Xử lí – Đầu ra',hd:'Hoạt động 3 · Luyện tập',code:'8.C1.1',ic:'paper',
  story:'Xếp các thẻ vào đúng cột cho ba chức năng: máy “đọc” (dịch văn bản), máy “nghe” (trợ lí ảo), máy “nhìn” (nhận dạng biển số xe).',
  qs:[{id:'lab',type:'sim',sim:'lab_camxuc'},{id:'ipo',type:'sort',q:'Thẻ này thuộc phần nào?',cols:{in:'Đầu vào',xl:'Xử lí',out:'Đầu ra'},items:[
     {t:'Đoạn văn tiếng Anh gõ vào',a:'in'},{t:'Tách từ, đổi thành số, so với dữ liệu đã học',a:'xl'},{t:'Đoạn văn tiếng Việt',a:'out'},
     {t:'Âm thanh từ micro',a:'in'},{t:'Câu trả lời của trợ lí ảo',a:'out'},
     {t:'Ảnh xe từ camera',a:'in'},{t:'So các điểm ảnh với mẫu chữ số đã học',a:'xl'},{t:'Biển số "65A-123.45"',a:'out'}]},
   {id:'q3',type:'single',q:'Vì sao AI "đọc, nghe, nhìn" vẫn có thể sai?',opts:['Vì AI so khớp số với dữ liệu đã học, không hiểu như người','Vì máy hết pin','Vì AI cố tình trả lời sai'],ok:0}],
  key:['AI <b>so khớp con số</b> với dữ liệu đã học, <b>không hiểu như người</b> nên có thể sai.']},
 {t:'Giải thích một ứng dụng quen thuộc',hd:'Hoạt động 4 · Vận dụng',code:'8.C1.1',ic:'pen',
  story:'Chọn một ứng dụng em biết (dịch bằng camera, mở khoá khuôn mặt, gõ bằng giọng nói…). Vẽ sơ đồ 3 bước và nêu một lần nó có thể sai.',
  qs:[{id:'app',type:'text',q:'Ứng dụng – Đầu vào → Xử lí → Đầu ra – có thể sai khi nào?',ans:'Ví dụ: Gõ bằng giọng nói – Đầu vào: giọng em qua micro → Xử lí: đổi âm thanh thành số, so với dữ liệu giọng nói đã học, ra chữ → Đầu ra: dòng chữ. Có thể sai khi ồn, nói nhanh, nói giọng địa phương; cần đọc lại trước khi gửi.'}],
  key:['Mọi kết quả AI "đọc, nghe, nhìn" đều <b>cần người kiểm tra</b> trước khi dùng.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.C1.1',ic:'scale',
  story:'Nhìn lại dự đoán lúc đầu.',
  qs:[{id:'after',type:'text',q:'Bây giờ em nghĩ…',short:1,ans:'Tự đánh giá: máy không hiểu như người, chỉ đổi tín hiệu thành số và so với dữ liệu đã học.'}],
  key:['<b>Đầu vào → Xử lí (đổi thành số, so với dữ liệu đã học) → Đầu ra</b>; có thể sai, cần kiểm tra.']}
];
const DECL=[];
/* ---- Ghi bài ---- */
const GHIBAI={so:'Bài 5:',ten:'AI “ĐỌC”, “NGHE” VÀ “NHÌN” NHƯ THẾ NÀO?',muc:[
 {step:1,h:'Máy không có tai, mắt',it:['Micro, camera <b>thu tín hiệu</b>; máy tính <b>tính toán</b>.']},
 {step:2,h:'Máy "nhìn"',it:['Ảnh → các ô → <b>số</b> → so với mẫu đã học → kết quả.'],flow:['Đầu vào','Xử lí','Đầu ra']},
 {step:3,h:'Máy "nghe"',it:['Lỗi bước đầu truyền sang bước sau.'],flow:['Thu âm','Giọng nói → chữ','"Đọc" chữ','Thực hiện']},
 {step:4,h:'Ba sơ đồ',it:[],tb:[['Chức năng','Đầu vào','Đầu ra'],['"Đọc"','văn bản','bản dịch'],['"Nghe"','âm thanh','câu trả lời'],['"Nhìn"','ảnh','tên vật, biển số']]},
 {step:6,h:'Ghi nhớ',it:['AI so khớp số, <b>không hiểu như người</b> → có thể sai, cần kiểm tra.']}]};
function renderGhiBai(){}
/* ---- Mã YCCĐ của từng câu ---- */
const QCODE={pred:'8.C1.1',before:'8.C1.1',obs1:'8.C1.1',obs1b:'8.C1.1',obs2:'8.C1.1',ord:'8.C1.1',ipo:'8.C1.1',q3:'8.C1.1',app:'8.C1.1',after:'8.C1.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
