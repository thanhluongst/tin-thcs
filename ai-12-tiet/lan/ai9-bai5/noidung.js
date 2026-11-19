/* Giáo dục AI lớp 9 · Bài 5 (1 tiết) – soạn theo KHBD-AI-LOP 9. Tình huống giả định; mô phỏng chỉ để minh hoạ. */
const BAI={lop:9,so:5,ten:'Ý tưởng sáng tạo giải quyết vấn đề bằng AI',yccd:'9.C2.1'};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Vấn đề của ngày hội',hd:'Hoạt động 1 · Mở đầu',code:'9.C2.1',ic:'student',
  story:'Ngày hội đọc sách của trường (giả định): khách đến hay hỏi đi hỏi lại "Gian sách khối 7 ở đâu? Mấy giờ có hoạt động đố vui?"; các bạn trực gian quá tải.',
  qs:[{id:'pred',type:'text',q:'Người dùng (khách, các bạn trực gian) hiện đang làm thế nào? Khó khăn ở đâu?',ans:'Khách hỏi trực tiếp, chờ lâu; các bạn trực trả lời lặp lại; bảng thông tin nhỏ, khó tìm.'}],
  key:['Ý tưởng <b>"mới"</b> là mới <b>so với cách người dùng đang làm</b>.']},
 {t:'Nhiều phương án – chọn phương án tốt',hd:'Hoạt động 2 · Hình thành kiến thức',code:'9.C2.1',ic:'bot',
  story:'Dùng "máy lọc ý tưởng": mỗi phương án phải qua 4 câu hỏi. Đổi phương án, xem phương án nào qua được.',
  qs:[{id:'sim1',type:'sim',sim:'idea'},
   {id:'q2',type:'multi',q:'Phương án tốt là phương án…',opts:['Mới so với cách đang làm','AI làm đúng một việc hợp với dữ liệu có sẵn','Có người quyết định và cách xử lí rủi ro','Dùng thật nhiều AI cho hiện đại'],ok:[0,1,2]}],
  key:['Ý tưởng tốt: <b>mới</b>, <b>chọn từ nhiều phương án</b>, AI làm <b>đúng một việc</b> hợp với dữ liệu, <b>có người quyết định</b>, có cách xử lí rủi ro.']},
 {t:'Góp ý phải kiểm',hd:'Hoạt động 3 · Luyện tập',code:'9.C2.1',ic:'scale',
  story:'Các nhóm nhận góp ý cho ý tưởng (từ bạn, người lớn, công cụ AI).',
  qs:[{id:'lab',type:'sim',sim:'lab_xuong'},{id:'gy',type:'single',q:'Một công cụ AI khen: "Ý tưởng tuyệt vời, chắc chắn thành công!". Nhóm nên…',opts:['Giữ nguyên vì đã được khen','Coi lời khen không phải bằng chứng; kiểm điều kiểm được, ghi "chưa chắc" điều chưa kiểm được','Bỏ ý tưởng'],ok:1},
   {id:'yt',type:'text',q:'Ý tưởng của nhóm: vấn đề – người dùng – AI làm một việc gì – dữ liệu – người quyết định – rủi ro và cách xử lí',ans:'Ví dụ: Chatbot ngày hội đọc sách trả lời vị trí gian, giờ hoạt động dựa trên sơ đồ, lịch do ban tổ chức cung cấp; bạn trực gian xử lí câu khó; rủi ro trả lời sai giờ → ban tổ chức kiểm 20 câu trước ngày hội.'}],
  key:['Góp ý từ bất kì nguồn nào cũng <b>phải kiểm</b> rồi mới giữ hay bỏ; <b>lời khen không phải bằng chứng</b>.']}
];
const DECL=[];
const GHIBAI={so:'Bài 5:',ten:'Ý TƯỞNG SÁNG TẠO GIẢI QUYẾT VẤN ĐỀ BẰNG AI',muc:[
 {step:1,h:'Ý tưởng mới',it:['Mới so với cách người dùng đang làm.']},
 {step:2,h:'Ý tưởng tốt',it:[],flow:['Mới','AI làm đúng một việc','Hợp với dữ liệu','Có người quyết định','Xử lí rủi ro']},
 {step:3,h:'Góp ý',it:['Phải kiểm; lời khen không phải bằng chứng.']}]};
function renderGhiBai(){}
const QCODE={pred:'9.C2.1',q2:'9.C2.1',gy:'9.C2.1',yt:'9.C2.1'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){}
