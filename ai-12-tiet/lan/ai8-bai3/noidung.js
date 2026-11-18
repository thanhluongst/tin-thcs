/* Nội dung Bài 3 – Lớp 8 – Chuyên đề Giáo dục AI (dùng chung cho trang học sinh và giáo viên) */
const BAI={lop:8,so:3,ten:'Vai trò và trách nhiệm của các bên trong hệ sinh thái AI',yccd:'8.A3.1 · 8.A3.2 · 8.A3.3'};
const IC={
 student:`<svg width="88" height="88" viewBox="0 0 92 92"><circle cx="46" cy="30" r="15" fill="#f2c9a0"/><path d="M31 27c2-10 9-14 15-14s13 4 15 14c-5-4-10-5-15-5s-10 1-15 5z" fill="#2b2b2b"/><path d="M18 84c3-17 14-26 28-26s25 9 28 26z" fill="#2f6fb5"/><rect x="34" y="62" width="24" height="18" rx="2" fill="#fff" stroke="#c9d3e2"/><path d="M38 68h16M38 73h12" stroke="#9aa8bc" stroke-width="2"/></svg>`,
 bot:`<svg width="88" height="88" viewBox="0 0 92 92"><rect x="16" y="24" width="60" height="46" rx="14" fill="#1d4e89"/><circle cx="35" cy="45" r="7" fill="#fff"/><circle cx="57" cy="45" r="7" fill="#fff"/><circle cx="35" cy="45" r="3" fill="#16233a"/><circle cx="57" cy="45" r="3" fill="#16233a"/><rect x="34" y="57" width="24" height="5" rx="2.5" fill="#e2932b"/><path d="M46 24V12" stroke="#1d4e89" stroke-width="4"/><circle cx="46" cy="10" r="5" fill="#e2932b"/><rect x="8" y="40" width="8" height="14" rx="3" fill="#2f6fb5"/><rect x="76" y="40" width="8" height="14" rx="3" fill="#2f6fb5"/></svg>`,
 scale:`<svg width="120" height="120" viewBox="0 0 80 80"><path d="M40 12v56M22 68h36" stroke="#1d4e89" stroke-width="4" stroke-linecap="round"/><path d="M14 24h52" stroke="#1d4e89" stroke-width="4" stroke-linecap="round"/><path d="M14 24L6 44h16zM66 24l-8 20h16z" fill="#e2932b" opacity=".9"/><path d="M6 44a8 5 0 0016 0M58 44a8 5 0 0016 0" fill="#e2932b"/><circle cx="40" cy="12" r="5" fill="#e2932b"/></svg>`,
 img:`<svg width="64" height="64" viewBox="0 0 70 70"><rect x="6" y="10" width="58" height="46" rx="6" fill="#fbe9e8" stroke="#c2413b" stroke-width="2"/><circle cx="26" cy="28" r="7" fill="#c2413b"/><path d="M10 52l16-14 10 8 10-10 14 16z" fill="#c2413b" opacity=".6"/><path d="M48 14l10 10M58 14L48 24" stroke="#c2413b" stroke-width="3"/></svg>`,
 chat:`<svg width="64" height="64" viewBox="0 0 70 70"><path d="M8 14h46a6 6 0 016 6v22a6 6 0 01-6 6H28l-12 10v-10H8a6 6 0 01-6-6V20a6 6 0 016-6z" fill="#fdf2e3" stroke="#e2932b" stroke-width="2"/><path d="M14 26h34M14 34h22" stroke="#e2932b" stroke-width="3" stroke-linecap="round"/><circle cx="56" cy="50" r="10" fill="#c2413b"/><path d="M56 44v7M56 54v1" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,
 lock:`<svg width="64" height="64" viewBox="0 0 70 70"><rect x="14" y="30" width="42" height="30" rx="6" fill="#efeafb" stroke="#6a4bc4" stroke-width="2"/><path d="M22 30V22a13 13 0 0126 0" fill="none" stroke="#6a4bc4" stroke-width="4"/><path d="M48 22l8-6" stroke="#c2413b" stroke-width="4" stroke-linecap="round"/><circle cx="35" cy="44" r="4" fill="#6a4bc4"/><path d="M35 48v5" stroke="#6a4bc4" stroke-width="3"/></svg>`,
 video:`<svg width="64" height="64" viewBox="0 0 56 56"><rect x="6" y="12" width="34" height="30" rx="5" fill="#c2413b"/><path d="M40 22l12-7v26l-12-7z" fill="#c2413b"/><path d="M18 21v12l10-6z" fill="#fff"/></svg>`,
 paper:`<svg width="64" height="64" viewBox="0 0 60 60"><rect x="12" y="6" width="36" height="48" rx="4" fill="#fffdf8" stroke="#c9b88f" stroke-width="2"/><path d="M19 18h22M19 25h22M19 32h16" stroke="#c9b88f" stroke-width="2.5"/><rect x="17" y="39" width="26" height="9" rx="2" fill="#eef6ff" stroke="#9cc0ea"/></svg>`,
 pen:`<svg width="64" height="64" viewBox="0 0 60 60"><rect x="8" y="10" width="34" height="42" rx="4" fill="#fff" stroke="#1d4e89" stroke-width="2"/><path d="M14 20h22M14 27h22M14 34h14" stroke="#9aa8bc" stroke-width="2.5"/><path d="M44 18l8 8-18 18-9 2 2-9z" fill="#e2932b"/></svg>`
};
const STEPS=[
 {t:'Chào mừng',k:'wel'},
 {t:'Lỗi này của ai?',hd:'Hoạt động 1 · Mở đầu · Tiết 1',code:'8.A3.1',ic:'student',
  story:'<b>Tình huống:</b> Bạn Tuấn nhờ một chatbot viết đoạn giới thiệu về một di tích ở địa phương rồi nộp nguyên văn cho cô giáo. Đoạn văn ghi <b>sai năm xây dựng</b> di tích.',
  qs:[{id:'pred',type:'single',q:'Theo em, lỗi này của ai?',opts:['Của chatbot','Của công ty làm ra chatbot','Của bạn Tuấn','Của nhiều bên'],ans:'Dự đoán – chưa công bố đáp án ở hoạt động này.'},
      {id:'predWhy',type:'text',q:'Vì sao em nghĩ vậy?',ph:'Em nghĩ vậy vì…',ans:'Đây là dự đoán, chưa chấm đúng sai. Đối chiếu ở Hoạt động 2.2: bạn Tuấn phải chịu trách nhiệm vì đã quyết định nộp nguyên văn mà không kiểm tra.'},
      {id:'sim1',type:'sim',sim:'chain'},
      {id:'obs1',type:'single',q:'Quan sát mô phỏng (chạy ít nhất 3 lần với các lựa chọn khác nhau): cách nào làm số bài sai đến tay cô giáo ít nhất?',opts:['Chỉ cần công ty dùng dữ liệu tốt hơn','Tuấn kiểm tra lại trước khi nộp (kết hợp dữ liệu tốt)','Hỏi chatbot thêm vài lần cho chắc','Không có cách nào vì AI luôn đúng'],ok:1}],
  key:['Dữ liệu tốt giúp chatbot ít sai hơn nhưng không bao giờ hết sai; người dùng kiểm tra trước khi dùng là “lá chắn” cuối cùng.','Dự đoán “lỗi của ai” sẽ được đối chiếu ở Hoạt động 2.2.']},
 {t:'Hai vai trò',hd:'Hoạt động 2.1 · Hình thành kiến thức · Tiết 1',code:'8.A3.1',ic:'bot',
  story:'<b>Chatbot thư viện:</b> Công ty X thiết kế, huấn luyện chatbot trả lời câu hỏi về sách. Nhà trường cài chatbot trên máy tính thư viện. Bạn Lan hỏi chatbot để chọn sách cho bài thuyết trình. <b>Mỗi việc dưới đây do ai quyết định?</b>',
  qs:[{id:'sim2',type:'sim',sim:'panel'},{id:'sort',type:'sort',q:'Bấm chọn "Người phát triển" hoặc "Người dùng" cho từng việc',cols:{dev:'Người phát triển',user:'Người dùng'},items:[
    {t:'Chọn dữ liệu về sách để huấn luyện chatbot.',a:'dev'},{t:'Viết câu hỏi gửi chatbot.',a:'user'},
    {t:'Đối chiếu câu trả lời với danh mục sách của thư viện trước khi dùng.',a:'user'},{t:'Sửa lỗi khi chatbot gợi ý sách không có trong thư viện.',a:'dev'},
    {t:'Quyết định có đưa tên sách chatbot gợi ý vào bài thuyết trình hay không.',a:'user'},{t:'Công khai chatbot thu thập dữ liệu gì của người hỏi.',a:'dev'},
    {t:'Báo lỗi cho thư viện khi thấy câu trả lời sai.',a:'user'},{t:'Đặt giới hạn để chatbot không trả lời nội dung không phù hợp lứa tuổi.',a:'dev'}]},
   {id:'dev1',type:'text',q:'Một việc chỉ người phát triển quyết định:',short:1,ans:'Ví dụ: chọn dữ liệu huấn luyện; đặt giới hạn an toàn; sửa lỗi của chatbot; công khai việc thu thập dữ liệu.'},
   {id:'user1',type:'text',q:'Một việc chỉ người dùng quyết định:',short:1,ans:'Ví dụ: hỏi chatbot điều gì; kiểm tra câu trả lời; quyết định có dùng kết quả hay không; báo lỗi.'}],
  key:['<b>Người phát triển</b> quyết định công cụ được làm thế nào: dữ liệu, giới hạn an toàn, sửa lỗi, công khai việc thu thập dữ liệu.','<b>Người dùng</b> quyết định hỏi gì và <b>có dùng kết quả hay không</b>.','Quyết định dùng kết quả của AI và trách nhiệm với kết quả đó thuộc về <b>con người</b>.']},
 {t:'Ai chịu trách nhiệm?',hd:'Hoạt động 2.2 · Hình thành kiến thức · Tiết 1',code:'8.A3.1 · 8.A3.2',ic:'scale',
  story:'Với mỗi thẻ tình huống: chọn <b>bên có thể phải chịu trách nhiệm</b> và <b>hành vi, thiếu sót cụ thể</b> của bên đó.',
  qs:[
   {id:'sim3',type:'sim',sim:'scale'},
   {id:'obs3',type:'single',q:'Quan sát mô phỏng: khi em thay đổi bất kì hành vi nào ở cả 3 thẻ, cột của “Công cụ AI” luôn ở mức nào?',opts:['Luôn bằng 0: công cụ AI không chịu trách nhiệm, trách nhiệm thuộc về con người, tổ chức','Tăng lên khi AI làm sai','Luôn bằng cột của người dùng','Cao nhất trong các bên'],ok:0},
   {id:'aW',type:'multi',ic:'img',head:'Thẻ A – Ảnh giả mạo',ctx:'Bạn K dùng một ứng dụng AI ghép khuôn mặt của bạn cùng lớp vào ảnh chế rồi đăng lên nhóm lớp. Bạn bị ghép ảnh rất buồn và bị trêu chọc.',q:'(1) Bên nào có thể phải chịu trách nhiệm?',opts:['Người sử dụng','Nhà cung cấp','Người phát triển','Chính công cụ AI'],ok:[0]},
   {id:'aA',type:'single',q:'(2) Hành vi hoặc thiếu sót cụ thể:',opts:['Tạo và đăng ảnh giả mạo người khác khi chưa được đồng ý.','Ứng dụng AI ghép ảnh quá đẹp nên ai cũng tin.','Nhóm lớp có quá nhiều thành viên.'],ok:0},
   {id:'bW',type:'multi',ic:'chat',head:'Thẻ B – Chatbot đưa tin sai',ctx:'Một nhà cung cấp đưa chatbot hỏi đáp sức khoẻ lên mạng. Chatbot khẳng định một loại lá cây "chữa khỏi" sốt xuất huyết. Nhà cung cấp nhận nhiều phản ánh nhưng không sửa.',q:'(1) Bên nào có thể phải chịu trách nhiệm?',opts:['Người sử dụng','Nhà cung cấp','Người phát triển','Chính công cụ AI'],ok:[1]},
   {id:'bA',type:'single',q:'(2) Hành vi hoặc thiếu sót cụ thể:',opts:['Người hỏi đặt câu hỏi chưa hay.','Đưa thông tin sai về sức khoẻ và không sửa khi đã được phản ánh.','Chatbot trả lời quá nhanh.'],ok:1},
   {id:'cW',type:'multi',ic:'lock',head:'Thẻ C – Ứng dụng làm lộ dữ liệu',ctx:'Một công ty làm ứng dụng luyện đề có AI chấm bài. Ứng dụng lưu ảnh khuôn mặt, họ tên học sinh mà không thông báo. Dữ liệu sau đó bị lộ ra ngoài.',q:'(1) Bên nào có thể phải chịu trách nhiệm?',opts:['Người sử dụng','Nhà cung cấp','Người phát triển','Chính công cụ AI'],ok:[1,2]},
   {id:'cA',type:'single',q:'(2) Hành vi hoặc thiếu sót cụ thể:',opts:['Học sinh dùng ứng dụng quá nhiều.','AI tự quyết định lưu dữ liệu.','Thu thập, lưu dữ liệu cá nhân không thông báo và không bảo vệ dữ liệu.'],ok:2},
   {id:'q3',type:'text',q:'(3) Câu hỏi cá nhân: Có thể nói "tại AI" được không? Vì sao?',ph:'Theo em…',ans:'Không thể. AI là công cụ do con người làm ra và sử dụng; người quyết định tạo, đăng tải, cung cấp phải chịu trách nhiệm theo quy định của pháp luật, có thể nhiều bên cùng chịu.'}],
  key:['Không thể nói "tại AI": AI là công cụ do con người làm ra và sử dụng.','Tuỳ hành vi mà <b>người sử dụng</b>, <b>nhà cung cấp</b> hay <b>người phát triển</b> phải chịu trách nhiệm theo quy định của pháp luật; có thể nhiều bên cùng chịu.','Bạn Tuấn quyết định nộp nguyên văn mà không kiểm tra, nên bạn phải chịu trách nhiệm về bài nộp của mình.','Khi bị làm ảnh giả, tin nhắn giả: báo ngay thầy cô, cha mẹ.']},
 {t:'Trách nhiệm giải trình',hd:'Hoạt động 2.3 · Hình thành kiến thức · Tiết 2',code:'8.A3.3',ic:'paper',
  story:'Hai bạn cùng nộp bài giới thiệu một di tích, cả hai đều nhờ chatbot gợi ý.<div class="two" style="margin-top:10px"><div class="paper"><span class="tag">Bản 1</span>Di tích được xây dựng từ thế kỉ XIX, là nơi sinh hoạt văn hoá của người dân trong vùng…<p style="color:#999;margin:6px 0 0">(Không có dòng nào về việc dùng AI.)</p></div><div class="paper"><span class="tag">Bản 2</span>Di tích được xây dựng từ thế kỉ XIX, là nơi sinh hoạt văn hoá của người dân trong vùng…<div class="decl"><b>Khai báo:</b> Em dùng chatbot để gợi ý dàn ý. Nội dung và số liệu em tự viết, đã đối chiếu với sách lịch sử địa phương.</div></div></div>',
  qs:[{id:'sim4',type:'sim',sim:'trans'},{id:'paper',type:'single',q:'Bản nào thể hiện trách nhiệm giải trình?',opts:['Bản 1','Bản 2'],ok:1},
   {id:'acc',type:'multi',q:'Chọn 4 việc thể hiện trách nhiệm giải trình khi dùng AI:',opts:['Cho biết sản phẩm có sử dụng AI và sử dụng ở phần nào.','Nói rõ công cụ AI đã dùng khi được hỏi.','Không ghi gì về AI để bài trông như tự làm hoàn toàn.','Tự kiểm tra tính chính xác của nội dung AI tạo ra, ghi nguồn đối chiếu.','Chép nguyên văn vì AI đã kiểm tra giúp rồi.','Chịu trách nhiệm với sản phẩm cuối cùng, sửa khi phát hiện sai.'],ok:[0,1,3,5]}],
  key:['Cho biết sản phẩm có sử dụng AI và sử dụng ở phần nào.','Nói rõ công cụ AI đã dùng khi được hỏi.','Tự kiểm tra tính chính xác của nội dung AI tạo ra trước khi dùng, ghi nguồn đối chiếu.','Chịu trách nhiệm với sản phẩm cuối cùng, sửa khi phát hiện sai.']},
 {t:'Luyện tập',hd:'Hoạt động 3 · Luyện tập · Tiết 2',code:'8.A3.1 – 8.A3.3',ic:'video',
  story:'<b>Phần A:</b> đúng hay sai? <b>Phần B – bản tin giả định:</b> Một trang mạng đăng video <b>giả giọng hiệu trưởng</b> một trường, thông báo cho học sinh nghỉ học. Video được tạo bằng công cụ AI và được nhiều người chia sẻ.',
  qs:[{id:'sim5',type:'sim',sim:'spread'},
   {id:'obs5',type:'single',q:'Quan sát mô phỏng: trường hợp nào video giả lan đến ít người nhất?',opts:['Nhiều người kiểm chứng trước khi chia sẻ, trang mạng gỡ sớm và có nhãn “nội dung AI”','Không ai kiểm chứng, không gỡ video','Chỉ cần nhiều người xem video','Ai cũng chia sẻ thật nhanh để mọi người cùng biết'],ok:0},
   {id:'tf',type:'tf',q:'Phần A. Đúng (Đ) hay sai (S)?',items:[
    {t:'Kết quả AI tạo ra sai thì AI phải chịu trách nhiệm.',a:'F'},{t:'Người dùng quyết định có dùng kết quả của AI hay không.',a:'T'},
    {t:'Người phát triển quyết định dữ liệu dùng để huấn luyện công cụ AI.',a:'T'},{t:'Chỉ người phát triển mới phải chịu trách nhiệm pháp lí khi công cụ AI gây hậu quả.',a:'F'},
    {t:'Dùng AI tạo ảnh giả mạo người khác rồi đăng lên mạng có thể vi phạm pháp luật.',a:'T'},{t:'Đã khai báo có dùng AI thì không cần kiểm tra lại nội dung.',a:'F'},
    {t:'Khi được hỏi, em cần nói rõ đã dùng công cụ AI nào và ở phần nào.',a:'T'}]},
   {id:'act',type:'match',q:'Phần B. Mỗi bên có hành vi hoặc thiếu sót gì?',items:['Người tạo video','Trang mạng đăng tải','Người chia sẻ lại','Nhà cung cấp công cụ'],
    opts:['Tạo nội dung giả mạo giọng nói của người khác','Không kiểm tra nguồn, chậm gỡ nội dung giả','Lan truyền tin khi chưa kiểm chứng','Cần có biện pháp ngăn lạm dụng công cụ','Không có trách nhiệm gì'],ok:[0,1,2,3]}],
  key:['Không đổ hết cho AI: mỗi bên chịu trách nhiệm về hành vi của mình.','Người chia sẻ lại cũng có trách nhiệm: <b>kiểm chứng trước khi chia sẻ</b>.']},
 {t:'Khai báo & cam kết',hd:'Hoạt động 4 · Vận dụng · Tiết 2',code:'8.A3.3',ic:'pen',
  story:'Em chọn một sản phẩm học tập em đã làm (hoặc sắp làm) và viết khai báo việc sử dụng AI. Nếu chưa từng dùng AI, em ghi "Không".',
  qs:[{id:'decl',type:'decl',q:'Phiếu khai báo và cam kết',ans:'Bản khai báo đạt khi có đủ: có/không dùng AI; công cụ đã dùng; dùng ở phần nào; nguồn đã kiểm tra; phần tự làm; ít nhất 3 cam kết.'}],
  key:['Từ nay, mỗi sản phẩm học tập có dùng AI đều nộp kèm khai báo: công cụ, phần đã dùng, nguồn đã kiểm tra, phần tự làm.']},
 {t:'Tổng kết',hd:'Tổng kết bài học',code:'8.A3.1 – 8.A3.3',ic:'scale',
  story:'Nhìn lại dự đoán lúc đầu của em ở Hoạt động 1.',
  qs:[{id:'before',type:'text',q:'Lúc đầu em nghĩ…',short:1,ans:'Tự đánh giá, không chấm đúng sai.'},{id:'after',type:'text',q:'Bây giờ em nghĩ… Điều gì làm em thay đổi (hoặc giữ) ý kiến?',ans:'Mong đợi: nêu được trách nhiệm thuộc về con người, không đổ cho AI, có lí do từ hoạt động đã học.'}],
  key:['Người phát triển quyết định công cụ được làm thế nào; người dùng quyết định hỏi gì và có dùng kết quả hay không.','Khi AI gây hậu quả, trách nhiệm thuộc về con người, tổ chức – tuỳ hành vi của mỗi bên. Không đổ cho AI.','Dùng AI trong học tập: khai báo trung thực, nêu công cụ, kiểm tra trước khi dùng, chịu trách nhiệm với sản phẩm.']}
];
const DECL=[['sp','Sản phẩm học tập','Ví dụ: Bài thuyết trình về di tích ở quê em'],['co','Có sử dụng AI không? (Có/Không)','Có hoặc Không'],['cc','Công cụ AI đã dùng','Ví dụ: chatbot do thầy cô hướng dẫn'],['phan','Dùng ở phần nào, để làm gì?','Ví dụ: gợi ý dàn ý'],['nguon','Đã kiểm tra bằng nguồn nào?','Ví dụ: sách lịch sử địa phương'],['tu','Phần em tự làm','Ví dụ: viết nội dung, trình bày'],['cam','Em cam kết (ít nhất 3 việc)','1. … 2. … 3. …']];

const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ox=(t,sel,cls,attrs)=>`<button type="button" class="opt ${cls||''} ${sel?'sel':''}" ${attrs||''}><span class="dot"></span><span>${t}</span></button>`;

/* Vẽ một hoạt động. ans: câu trả lời của học sinh; ro: chỉ xem */
function renderQs(step,ans,ro){
  ans=ans||{};
  return step.qs.map(q=>{
    if(q.type==='sim') return `<div class="qblock"><div class="simslot" data-sim="${q.sim}"></div></div>`;
    const v=ans[q.id]; let h='';
    if(q.head) h+=`<div class="story" style="margin-top:4px">${IC[q.ic]||''}<div><h3>${q.head}</h3><p style="margin:0">${q.ctx}</p></div></div>`;
    h+=`<p class="q" style="margin:12px 0 6px">${q.q}</p>`;
    if(q.type==='single'||q.type==='multi'){
      const m=q.type==='multi';
      h+=`<div class="opts" ${q.opts.some(o=>o.length>40)?'style="grid-template-columns:1fr"':''} data-q="${q.id}" data-t="${q.type}">${q.opts.map((o,k)=>ox(o,m?(v||[]).includes(k):v===k,m?'multi':'',`data-k="${k}"`)).join('')}</div>`;
    } else if(q.type==='text'){
      h+=q.short?`<input type="text" data-q="${q.id}" data-t="text" value="${esc(v)}" placeholder="${esc(q.ph||'')}">`:`<textarea data-q="${q.id}" data-t="text" placeholder="${esc(q.ph||'')}">${esc(v)}</textarea>`;
    } else if(q.type==='sort'){
      h+=`<div data-q="${q.id}" data-t="sort">${q.items.map((it,k)=>`<div class="sortrow"><span><b>${k+1}.</b> ${it.t}</span><span class="seg">${Object.entries(q.cols).map(([c,l])=>`<button type="button" class="${c} ${(v||{})[k]===c?'sel':''}" data-k="${k}" data-c="${c}">${l}</button>`).join('')}</span></div>`).join('')}</div>`;
    } else if(q.type==='tf'){
      h+=`<div data-q="${q.id}" data-t="tf">${q.items.map((it,k)=>`<div class="sortrow"><span><b>${k+1}.</b> ${it.t}</span><span class="seg">${['T','F'].map(c=>`<button type="button" class="${c} ${(v||{})[k]===c?'sel':''}" data-k="${k}" data-c="${c}">${c==='T'?'Đ':'S'}</button>`).join('')}</span></div>`).join('')}</div>`;
    } else if(q.type==='match'){
      h+=`<div class="chain" data-q="${q.id}" data-t="match">${q.items.map((it,k)=>`<div class="actor"><b>${it}</b><select data-k="${k}"><option value="">– Chọn –</option>${q.opts.map((o,j)=>`<option value="${j}" ${(v||{})[k]==j&&(v||{})[k]!==''&&(v||{})[k]!==undefined?'selected':''}>${o}</option>`).join('')}</select></div>`).join('')}</div>`;
    } else if(q.type==='decl'){
      h+=`<div data-q="${q.id}" data-t="decl" class="two"><div>${DECL.map(([k,l,ph])=>`<label class="f">${l}</label><input type="text" data-k="${k}" value="${esc((v||{})[k])}" placeholder="${esc(ph)}">`).join('')}</div></div>`;
    }
    return `<div class="qblock">${h}</div>`;
  }).join('');
}
/* Gắn tương tác chọn */
function wireQs(root){
  root.querySelectorAll('.opts').forEach(g=>{
    g.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ if(g.closest('.ro')) return;
      if(g.dataset.t==='multi') b.classList.toggle('sel'); else {g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel')); b.classList.add('sel');}
      if(window.FX) FX.play('tick'); root.dispatchEvent(new Event('change'));});
  });
  root.querySelectorAll('[data-t="sort"],[data-t="tf"]').forEach(g=>{
    g.querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(g.closest('.ro')) return;
      g.querySelectorAll(`button[data-k="${b.dataset.k}"]`).forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); if(window.FX) FX.play('tick'); root.dispatchEvent(new Event('change'));});
  });
}
/* Đọc câu trả lời từ giao diện */
function collect(root,step){
  const a={};
  step.qs.forEach(q=>{
    const el=root.querySelector(`[data-q="${q.id}"]`); if(!el) return;
    if(q.type==='single'){const s=el.querySelector('.opt.sel'); if(s) a[q.id]=+s.dataset.k;}
    else if(q.type==='multi'){const s=[...el.querySelectorAll('.opt.sel')].map(x=>+x.dataset.k); if(s.length) a[q.id]=s;}
    else if(q.type==='text'){const t=el.value.trim(); if(t) a[q.id]=t;}
    else if(q.type==='sort'||q.type==='tf'){const o={}; el.querySelectorAll('button.sel').forEach(b=>o[b.dataset.k]=b.dataset.c); if(Object.keys(o).length) a[q.id]=o;}
    else if(q.type==='match'){const o={}; el.querySelectorAll('select').forEach(s=>{if(s.value!=='') o[s.dataset.k]=+s.value;}); if(Object.keys(o).length) a[q.id]=o;}
    else if(q.type==='decl'){const o={}; el.querySelectorAll('input').forEach(i=>{if(i.value.trim()) o[i.dataset.k]=i.value.trim();}); if(Object.keys(o).length) a[q.id]=o;}
  });
  return a;
}
function missing(step,a){
  return step.qs.filter(q=>q.type!=='sim').filter(q=>{const v=a[q.id]; if(v===undefined) return true;
    if(q.type==='sort'||q.type==='tf'||q.type==='match') return Object.keys(v).length<q.items.length;
    if(q.type==='decl') return !v.sp||!v.co; return false;}).length;
}
/* ---- Chấm và thống kê ---- */
function isCorrect(q,v){
  if(v===undefined) return null;
  if(q.type==='single') return q.ok===undefined?null:v===q.ok;
  if(q.type==='multi') return q.ok?JSON.stringify([].concat(v).sort())===JSON.stringify(q.ok.slice().sort()):null;
  if(q.type==='sort'||q.type==='tf') return q.items.every((it,k)=>v[k]===it.a);
  if(q.type==='match') return q.items.every((it,k)=>v[k]===q.ok[k]);
  return null;
}
function itemOk(q,v,k){return q.type==='match'?v[k]===q.ok[k]:v[k]===q.items[k].a;}
function wOf(st){return Math.max(1,((st&&st.members)||[]).length||1);}
/* Tổng hợp kết quả cả lớp. all: {id:{bước:{câu:giá trị}}}, students: {id:{members,may,…}} */
function buildBoard(stepIdx,all,featured,students){
  students=students||{}; const step=STEPS[stepIdx]; const ids=Object.keys(students);
  const tot={m:ids.length,s:ids.reduce((t,id)=>t+wOf(students[id]),0)};
  const res={};
  step.qs.filter(q=>q.type!=='sim').forEach(q=>{
    const r={m:0,s:0,okM:0,okS:0,badM:0,badS:0,key:(q.type==='single'&&q.ok!==undefined)||(q.type==='multi'&&!!q.ok)||['sort','tf','match'].includes(q.type)};
    if(q.type==='single'||q.type==='multi') r.c=q.opts.map(()=>0);
    if(q.type==='sort'||q.type==='tf'||q.type==='match') r.c=q.items.map(()=>0);
    ids.forEach(id=>{
      const v=((all[id]||{})[stepIdx]||{})[q.id]; if(v===undefined) return;
      const w=wOf(students[id]); r.m++; r.s+=w;
      if(q.type==='single'||q.type==='multi') [].concat(v).forEach(k=>r.c[k]+=w);
      if(r.c&&(q.type==='sort'||q.type==='tf'||q.type==='match')) q.items.forEach((it,k)=>{if(itemOk(q,v,k)) r.c[k]+=w;});
      const ok=isCorrect(q,v);
      if(ok===true){r.okM++;r.okS+=w;} else if(ok===false){r.badM++;r.badS+=w;}
    });
    res[q.id]=r;
  });
  return {step:stepIdx,res,tot,featured:featured||[]};
}
function pct(a,b){return b?Math.round(a*100/b):0;}
function bars(rows){return `<div class="bars">${rows.map(([l,v,n,ok])=>`<div class="bar ${ok?'ok':''}"><span>${ok?'✓ ':''}${l}</span><span class="tr"><i style="width:${pct(v,n)}%"></i></span><b>${pct(v,n)}%</b></div>`).join('')}</div>`;}
/* Dòng thống kê đúng / chưa đúng / chưa nộp */
function statBox(q,r,tot,compact){
  if(!r) return '';
  const miss=Math.max(0,tot.s-r.s), missM=Math.max(0,tot.m-r.m);
  let h='';
  if(r.key){
    h+=`<div class="stack"><i class="g" style="width:${pct(r.okS,tot.s)}%"></i><i class="r" style="width:${pct(r.badS,tot.s)}%"></i><i class="n" style="width:${pct(miss,tot.s)}%"></i></div>
    <div class="stats"><span class="g">✅ Đúng: <b>${r.okS}</b> bạn (${r.okM} máy) – <b>${pct(r.okS,tot.s)}%</b></span>
    <span class="r">❌ Chưa đúng: <b>${r.badS}</b> bạn (${r.badM} máy) – <b>${pct(r.badS,tot.s)}%</b></span>
    <span class="n">⏳ Chưa nộp: <b>${miss}</b> bạn (${missM} máy) – <b>${pct(miss,tot.s)}%</b></span></div>`;
  } else {
    h+=`<div class="stats"><span class="b">📝 Đã trả lời: <b>${r.s}</b> bạn (${r.m} máy) – <b>${pct(r.s,tot.s)}%</b></span><span class="n">⏳ Chưa nộp: <b>${miss}</b> bạn (${missM} máy)</span></div>`;
  }
  if(r.c&&!compact){
    if(q.type==='single'||q.type==='multi') h+=`<div class="hint" style="margin-top:6px">Tỉ lệ chọn từng phương án (theo số bạn đã trả lời):</div>`+bars(q.opts.map((o,k)=>[o,r.c[k],r.s,q.ok!==undefined&&[].concat(q.ok).includes(k)]));
    else h+=`<div class="hint" style="margin-top:6px">Tỉ lệ làm đúng từng ý:</div>`+bars(q.items.map((it,k)=>[(k+1)+'. '+(typeof it==='string'?it:it.t).slice(0,70),r.c[k],r.s,false]));
  }
  return `<div class="statbox">${h}</div>`;
}
/* Bảng tổng hợp gọn (cột phải màn hình giáo viên) */
function renderBoard(board,mine,showKey){
  if(!board) return ''; const step=STEPS[board.step]; let h=`<p class="hint">Lớp có <b>${board.tot.s}</b> học sinh trên <b>${board.tot.m}</b> máy.</p>`;
  step.qs.forEach(q=>{const r=board.res[q.id]; if(!r) return; h+=`<div class="res"><h4>${q.head?q.head+' – ':''}${q.q}</h4>${statBox(q,r,board.tot,true)}</div>`;});
  return h;
}
/* Đánh dấu đáp án đúng ngay trên câu hỏi + thống kê từng câu (khi chiếu kết quả) */
function markReveal(root,step,mine,board){
  step.qs.forEach(q=>{
    const el=root.querySelector(`[data-q="${q.id}"]`); if(!el) return; const v=mine?mine[q.id]:undefined;
    if(q.type==='single'||q.type==='multi'){
      const ok=q.ok===undefined?[]:[].concat(q.ok);
      el.querySelectorAll('.opt').forEach(b=>{const k=+b.dataset.k; if(ok.includes(k)) b.classList.add('right'); else if(b.classList.contains('sel')) b.classList.add('wrong'); b.classList.remove('sel');
        if(mine&&ok.includes(k)&&!(v!==undefined&&[].concat(v).includes(k))&&q.type==='multi') b.classList.add('missed');});
    } else if(q.type==='sort'||q.type==='tf'){
      el.querySelectorAll('button').forEach(b=>{const k=+b.dataset.k, c=b.dataset.c, right=q.items[k].a===c, chosen=b.classList.contains('sel');
        b.classList.remove('sel'); if(right) b.classList.add('right'); else if(chosen) b.classList.add('wrong');});
    } else if(q.type==='match'){
      el.querySelectorAll('select').forEach(s=>{const k=+s.dataset.k, box=s.closest('.actor'); const good=mine?(v&&v[k]===q.ok[k]):true;
        box.classList.add(good?'right':'wrong'); const d=document.createElement('div'); d.className='corr'; d.textContent='✓ '+q.opts[q.ok[k]]; box.appendChild(d);});
    }
    if(q.ans&&(q.type==='text'||q.type==='decl'||(q.type==='single'&&q.ok===undefined))){
      const d=document.createElement('div'); d.className='sugg'; d.innerHTML='<b>💡 Gợi ý đáp án:</b> '+q.ans; el.insertAdjacentElement('afterend',d);
    }
    if(mine&&isCorrect(q,v)!==null){const ok=isCorrect(q,v); const t=document.createElement('span'); t.className='badge '+(ok?'g':'r');
      let txt=ok?'Em làm đúng':'Em chưa đúng'; if(!ok&&v&&(q.type==='sort'||q.type==='tf'||q.type==='match')) txt+=` (${q.items.filter((it,k)=>itemOk(q,v,k)).length}/${q.items.length} ý)`;
      t.textContent=txt; el.closest('.qblock').querySelector('.q').appendChild(document.createTextNode(' ')); el.closest('.qblock').querySelector('.q').appendChild(t);}
    if(board&&board.res[q.id]){const d=document.createElement('div'); d.innerHTML=statBox(q,board.res[q.id],board.tot,false); el.closest('.qblock').appendChild(d.firstElementChild);}
  });
}
function revealExtras(board,step){
  let h='';
  if(board&&board.featured&&board.featured.length) h+=`<h3 style="margin-top:16px">Câu trả lời được thầy cô chọn chiếu</h3>`+board.featured.map(f=>`<div class="feat"><b>${esc(f.name)}</b>: ${esc(f.text)}</div>`).join('');
  if(step.key) h+=`<div class="key"><h3>Điều cần nhớ</h3><ul>${step.key.map(k=>`<li>${k}</li>`).join('')}</ul></div>`;
  return h;
}
function textOf(q,v){
  if(v===undefined) return '';
  if(q.type==='decl') return DECL.filter(([k])=>v[k]).map(([k,l])=>l.split(' (')[0]+': '+v[k]).join(' | ');
  if(q.type==='single') return q.opts[v]; if(q.type==='multi') return v.map(k=>q.opts[k]).join('; ');
  if(q.type==='text') return v; return JSON.stringify(v);
}
function stepHead(i){const s=STEPS[i]; return `<div class="eyebrow">${s.hd}</div><h2>${s.t}</h2><div class="meta"><span class="chip code">YCCĐ ${s.code}</span></div>`;}
function stepStory(i){const s=STEPS[i]; return `<div class="story" style="margin-top:12px">${IC[s.ic]||''}<div style="flex:1">${s.story}</div></div>`;}

/* Đáp án dùng cho giao diện giáo viên */
function correctOf(step){const a={}; step.qs.forEach(q=>{
  if(q.type==='single'&&q.ok!==undefined) a[q.id]=q.ok;
  else if(q.type==='multi'&&q.ok) a[q.id]=q.ok.slice();
  else if(q.type==='sort'||q.type==='tf'){const o={}; q.items.forEach((it,k)=>o[k]=it.a); a[q.id]=o;}
  else if(q.type==='match'){const o={}; q.ok.forEach((v,k)=>o[k]=v); a[q.id]=o;}
}); return a;}
function renderKey(i){const step=STEPS[i]; let h='<div class="key" style="background:var(--ok-soft);border-color:#bfe3cf;border-left-color:var(--ok)"><h3 style="color:var(--ok)">Đáp án</h3><ol style="margin:6px 0 0 18px;padding:0">';
  step.qs.filter(q=>q.type!=='sim').forEach(q=>{let t='';
    if(q.type==='single') t=q.ok!==undefined?q.opts[q.ok]:(q.ans||'');
    else if(q.type==='multi') t=q.ok.map(k=>q.opts[k]).join('; ');
    else if(q.type==='sort') t=q.items.map((it,k)=>(k+1)+' → '+q.cols[it.a]).join('; ');
    else if(q.type==='tf') t=q.items.map((it,k)=>(k+1)+': '+(it.a==='T'?'Đ':'S')).join('; ');
    else if(q.type==='match') t=q.items.map((it,k)=>it+' → '+q.opts[q.ok[k]]).join('; ');
    else t=q.ans||'';
    h+=`<li style="margin:4px 0"><b>${q.head?q.head+' – ':''}${q.q}</b><br>${t}</li>`;});
  h+='</ol></div>';
  if(step.key) h+=`<div class="key"><h3>Điều cần nhớ</h3><ul>${step.key.map(k=>`<li>${k}</li>`).join('')}</ul></div>`;
  return h;}

/* ---- Bảng thống kê theo nhóm (máy), vinh danh, xếp hạng ---- */
function labelOf(st){return st?((st.may?'Máy '+st.may+': ':'')+st.name):'';}
function keyedQs(step){return (step.qs||[]).filter(q=>(q.type==='single'&&q.ok!==undefined)||(q.type==='multi'&&q.ok)||['sort','tf','match'].includes(q.type));}
function groupTable(stepIdx,all,students){
  const step=STEPS[stepIdx], kq=keyedQs(step);
  const rows=Object.keys(students||{}).map(id=>{const a=step.qs?((all[id]||{})[stepIdx]):undefined; const marks=kq.map(q=>a?isCorrect(q,a[q.id]):null);
    return {id,label:labelOf(students[id]),n:wOf(students[id]),sub:!!a,marks,ok:marks.filter(m=>m===true).length};});
  rows.sort((x,y)=>(y.sub-x.sub)||(y.ok-x.ok)||x.label.localeCompare(y.label,'vi'));
  const honor=kq.length?rows.filter(r=>r.sub&&r.ok===kq.length).map(r=>({id:r.id,label:r.label})):[];
  return {cols:kq.map((q,k)=>'C'+(k+1)),qnames:kq.map(q=>(q.head?q.head.split(' –')[0]+' ':'')+q.q.replace(/<[^>]+>/g,'')),rows,honor,max:kq.length};
}
function renderTable(t,myId){
  if(!t||!t.rows.length) return '';
  let h=`<h3 style="margin-top:18px">📋 Bảng thống kê theo nhóm</h3>`;
  if(t.max) h+=`<p class="hint">${t.qnames.map((n,k)=>`<b>${t.cols[k]}</b>: ${esc(n.slice(0,60))}`).join(' · ')}</p>`;
  h+=`<div style="overflow-x:auto"><table class="tbl gt"><tr><th>Nhóm (máy)</th><th>Số bạn</th>${t.cols.map(c=>`<th>${c}</th>`).join('')}<th>${t.max?'Đúng':'Trạng thái'}</th></tr>`+
    t.rows.map(r=>`<tr class="${r.id===myId?'me':''}"><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td><td style="text-align:center">${r.n}</td>${r.marks.map(m=>`<td class="mk">${m===true?'<span class="g">✓</span>':m===false?'<span class="r">✗</span>':'–'}</td>`).join('')}<td style="text-align:center"><b>${r.sub?(t.max?r.ok+'/'+t.max:'Đã nộp'):'Chưa nộp'}</b></td></tr>`).join('')+'</table></div>';
  if(t.honor&&t.honor.length) h+=`<div class="honor"><h3>🏆 Vinh danh – trả lời đúng tất cả</h3>${t.honor.map(x=>`<span>${esc(x.label)}</span>`).join('')}</div>`;
  return h;
}
function renderPraise(list,myId){
  if(!list||!list.length) return '';
  return `<div class="praise"><h3>⭐ Lời khen, nhận xét của thầy cô</h3>${list.map(p=>`<div class="pr ${p.id===myId?'me':''}"><b>${esc(p.label)}</b> ${'⭐'.repeat(Math.min(5,p.stars||0))}${p.cmt?` – ${esc(p.cmt)}`:''}</div>`).join('')}</div>`;
}
/* Điểm: mỗi câu đúng 1 điểm, mỗi sao 2 điểm, mỗi phiếu bình chọn 1 điểm */
function rankRows(all,students,praise,votes){
  const rows=Object.keys(students||{}).map(id=>{let ok=0;
    STEPS.forEach((s,i)=>{if(!s.qs) return; const a=(all[id]||{})[i]; if(!a) return; keyedQs(s).forEach(q=>{if(isCorrect(q,a[q.id])===true) ok++;});});
    const stars=(praise||[]).filter(p=>p.id===id).reduce((t,p)=>t+(p.stars||0),0);
    const vt=Object.values(votes||{}).reduce((t,m)=>t+Object.values(m).filter(x=>x===id).length,0);
    return {id,label:labelOf(students[id]),n:wOf(students[id]),ok,stars,votes:vt,pts:ok+2*stars+vt};});
  rows.sort((a,b)=>b.pts-a.pts||b.ok-a.ok||a.label.localeCompare(b.label,'vi'));
  return rows;
}
function renderRank(rows,myId){
  const md=['🥇','🥈','🥉'];
  return `<h2>🏆 Bảng xếp hạng các nhóm</h2><p class="hint">Điểm = số câu đúng + 2 × số sao thầy cô khen + số phiếu bình chọn của các bạn.</p>
  <div style="overflow-x:auto"><table class="tbl gt"><tr><th>#</th><th>Nhóm (máy)</th><th>Câu đúng</th><th>Sao ⭐</th><th>Bình chọn 🗳</th><th>Điểm</th></tr>
  ${rows.map((r,k)=>`<tr class="${r.id===myId?'me':''} ${k<3&&r.pts>0?'top':''}"><td style="text-align:center;font-size:20px">${k<3&&r.pts>0?md[k]:k+1}</td><td>${esc(r.label)}${r.id===myId?' <span class="badge b">Nhóm em</span>':''}</td><td style="text-align:center">${r.ok}</td><td style="text-align:center">${r.stars}</td><td style="text-align:center">${r.votes}</td><td style="text-align:center"><b>${r.pts}</b></td></tr>`).join('')}</table></div>`;
}

/* ---- Nội dung ghi bài: mỗi hoạt động một mục, chiếu khi kết thúc hoạt động ---- */
const GHIBAI={so:'Bài 3:',ten:'VAI TRÒ VÀ TRÁCH NHIỆM CỦA CÁC BÊN TRONG HỆ SINH THÁI AI',muc:[
 {step:1,h:'Kiểm tra trước khi dùng',it:['Dữ liệu tốt giúp AI ít sai hơn nhưng AI <b>không bao giờ hết sai</b>.','Người dùng kiểm tra lại là “lá chắn” cuối cùng trước khi dùng kết quả của AI.'],
  flow:['Dữ liệu','AI tạo kết quả','Người dùng kiểm tra','Sử dụng']},
 {step:2,h:'Người phát triển và người dùng',it:['Quyết định dùng kết quả của AI và trách nhiệm với kết quả đó thuộc về <span class="red">con người</span>.'],
  tb:[['Vai trò','Quyết định việc gì?'],['Người phát triển','dữ liệu, giới hạn an toàn, sửa lỗi'],['Người dùng','hỏi gì, kiểm tra, có dùng kết quả không']]},
 {step:3,h:'Ai chịu trách nhiệm khi AI gây hậu quả?',it:['Tuỳ hành vi, thiếu sót mà người sáng tạo, nhà cung cấp hay người sử dụng phải chịu trách nhiệm; có thể nhiều bên cùng chịu.','<span class="red">Không đổ lỗi cho AI</span>: AI là công cụ do con người làm ra và sử dụng.'],
  tb:[['Bên','Ví dụ hành vi'],['Người sử dụng','tạo ảnh giả mạo người khác'],['Nhà cung cấp','đưa tin sai, không sửa'],['Người phát triển','làm lộ dữ liệu cá nhân']]},
 {step:4,h:'Trách nhiệm giải trình khi dùng AI',it:['Cho biết bài có dùng AI và dùng ở phần nào.','Nói rõ công cụ AI đã dùng khi được hỏi.','Tự kiểm tra nội dung AI tạo ra, ghi nguồn đối chiếu.','Chịu trách nhiệm với sản phẩm cuối cùng.'],
  flow:['Dùng AI','Tự kiểm tra','Khai báo','Chịu trách nhiệm']},
 {step:5,h:'Ứng phó nội dung giả mạo do AI tạo',it:['<b>Kiểm chứng trước khi chia sẻ</b>; mỗi người chia sẻ lại đều có trách nhiệm.','Gặp ảnh, video, tin nhắn giả mạo: không chia sẻ, báo ngay thầy cô, cha mẹ.'],
  flow:['Thấy tin lạ','Dừng lại','Kiểm chứng','Báo người lớn']},
 {step:6,h:'Mẫu khai báo dùng AI',it:['Mỗi bài có dùng AI đều ghi khai báo theo mẫu:'],
  tb:[['Mục','Ví dụ'],['Công cụ AI','chatbot thầy cô hướng dẫn'],['Dùng ở phần','gợi ý dàn ý'],['Nguồn đã kiểm tra','sách lịch sử địa phương'],['Phần em tự làm','nội dung, trình bày']]},
 {step:7,h:'Ghi nhớ',it:['AI là công cụ; con người quyết định và chịu trách nhiệm.','Kiểm tra trước khi dùng – kiểm chứng trước khi chia sẻ – khai báo trung thực.']}]};
function renderGhiBai(upto,only){
  const ms=GHIBAI.muc.map((m,k)=>Object.assign({n:k+1},m)).filter(m=>only?m.step===only:m.step<=upto);
  if(!ms.length) return '<p class="hint">Chưa có nội dung ghi bài cho phần này.</p>';
  const last=ms[ms.length-1].step;
  return `<div class="vo"><div class="vo-title"><span class="b">${GHIBAI.so}</span> <span class="r">${GHIBAI.ten}</span></div>`+ms.map(m=>`<div class="vo-m ${!only&&m.step===last&&ms.length>1?'vo-new':''}"><div class="vo-mh">${m.n}. <span>${m.h}</span></div>
   ${m.it?`<ul>${m.it.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
   ${m.flow?`<div class="vo-flow">${m.flow.map(x=>`<div>${x}</div>`).join('<i>→</i>')}</div>`:''}
   ${m.tb?`<table class="vo-tb"><tr>${m.tb[0].map(x=>`<th>${x}</th>`).join('')}</tr>${m.tb.slice(1).map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`:''}</div>`).join('')+`<div class="vo-f">✍️ Các em chép phần trên vào vở.</div></div>`;
}

/* ---- Mã YCCĐ của từng câu (dùng cho tổng hợp 12 tiết) ---- */
const QCODE={obs1:'8.A3.1',sort:'8.A3.1',dev1:'8.A3.1',user1:'8.A3.1',q3:'8.A3.1',tf:'8.A3.1',
  obs3:'8.A3.2',aW:'8.A3.2',aA:'8.A3.2',bW:'8.A3.2',bA:'8.A3.2',cW:'8.A3.2',cA:'8.A3.2',obs5:'8.A3.2',act:'8.A3.2',
  paper:'8.A3.3',acc:'8.A3.3',decl:'8.A3.3'};
STEPS.forEach(s=>(s.qs||[]).forEach(q=>{if(!q.code&&QCODE[q.id]) q.code=QCODE[q.id];}));
function lessonMeta(){
  const qs=[]; STEPS.forEach((s,i)=>(s.qs||[]).forEach(q=>{ if(q.type==='sim'||!q.code) return;
    const m={step:i,id:q.id,code:q.code,type:q.type,t:(q.head?q.head.split(' –')[0]+' ':'')+q.q.replace(/<[^>]+>/g,'').slice(0,80)};
    if(q.ok!==undefined) m.ok=q.ok; if(q.type==='sort'||q.type==='tf') m.ia=q.items.map(it=>it.a); if(q.type==='match') m.ok=q.ok; qs.push(m);}));
  return {bai:{lop:BAI.lop,so:BAI.so,ten:BAI.ten,tiet:STEPS.filter(s=>s.hd&&/Tiết 2/.test(s.hd)).length?2:1},yccd:BAI.yccd.split('·').map(x=>x.trim()),qs};
}
