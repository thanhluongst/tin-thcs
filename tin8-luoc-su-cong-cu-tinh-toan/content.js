/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Từ xa xưa đến nay, con người đã dùng những công cụ nào để tính toán? Em hãy kể tên những công cụ tính toán mà em biết.",
    k:"Ngón tay; que tính, hòn sỏi; <b>bàn tính</b> (hơn 2000 năm trước Công nguyên); thước tính; máy tính cơ học (Pascaline); máy tính bỏ túi; máy tính điện tử, điện thoại thông minh,… Cách ghi số phổ biến nhất là <b>hệ thập phân</b> (dùng 10 chữ số từ 0 đến 9), bắt nguồn từ việc đếm bằng 10 ngón tay."},
  kd2:{type:"mcq", label:"Mở đầu – Bàn tính", q:"Bàn tính trong Hình 1.1 đang hiển thị số nào?",
    o:["8 045 172 036","6 302 715 408","6 302 715","630 271 540"], a:1,
    k:"Bàn tính hiển thị số <b>6 302 715 408</b>. Bàn tính là một trong những công cụ tính toán sớm nhất của con người."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Tên của một trong những chiếc máy tính đầu tiên là gì?",
    k:"Máy tính cơ học <b>Pascaline</b> do nhà bác học người Pháp <b>Blaise Pascal</b> sáng chế năm <b>1642</b> (Hình 1.2)."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Chiếc máy đó có thể làm được những gì?",
    k:"Máy Pascaline thực hiện được phép tính <b>cộng và trừ</b> nhờ hệ thống <b>bánh răng</b>. Sau đó, Leibniz cải tiến, thêm phép <b>nhân, chia</b>."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Ý tưởng nào đã thúc đẩy sự phát minh ra máy tính?",
    k:"Ý tưởng <b>cơ giới hoá việc tính toán</b> (dùng máy móc để tính thay con người), giúp tính nhanh, tránh sai sót. Pascal làm máy để giúp cha trong việc tính thuế."},
  p6:{type:"mcq", label:"Câu hỏi tr.6", q:"Máy tính trong dự án của Babbage có những đặc điểm gì?",
    o:["Máy tính cơ học, thực hiện tự động.","Máy tính có những ứng dụng ngoài tính toán thuần tuý.","Có thiết kế giống với máy tính ngày nay.","Cả ba đặc điểm trên."], a:3,
    k:"Máy tính của Babbage là <b>máy tính cơ học</b>, <b>đa năng</b>, thực hiện tính toán <b>tự động</b>, có ứng dụng ngoài tính toán thuần tuý và có nguyên lí thiết kế <b>giống máy tính ngày nay</b>. Ông được coi là <b>cha của máy tính</b>."},
  nguoi:{type:"match", label:"Đọc hiểu – Ai làm gì?", ph:"Chọn…",
    q:"Đọc mục 1 và đầu mục 2 (SGK trang 5–7). Ghép mỗi nhà khoa học với đóng góp của họ.",
    opts:["a) Năm 1642 chế tạo máy tính cơ học Pascaline (cộng, trừ)","b) Cải tiến máy của Pascal, thêm phép nhân, chia","c) Năm 1833 thiết kế máy tính đa năng, tự động; được coi là cha của máy tính","d) Chỉ ra có thể dùng các rơ le để thực hiện các thao tác tính toán trên dãy bit","e) Năm 1944 chế tạo máy tính điện – cơ Harvard Mark I","f) Năm 1945 trình bày nguyên lí “chương trình được lưu trữ”"],
    items:[["1) Blaise Pascal",1],["2) Gottfried Leibniz",2],["3) Charles Babbage",3],["4) Claude Shannon",4],["5) Howard Aiken",5],["6) John Von Neumann",6]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e, 6 – f."},
  vn:{type:"mcq", label:"Đọc hiểu – Kiến trúc Von Neumann", q:"Theo nguyên lí “chương trình được lưu trữ” của Von Neumann, điều nào sau đây là đúng?",
    o:["Chương trình được viết trên giấy, máy đọc từng dòng.","Các lệnh của chương trình được lưu trữ trong bộ nhớ giống như dữ liệu; bộ xử lí lấy từng lệnh ra thực hiện tuần tự.","Mỗi phép tính phải nối dây lại bằng tay.","Máy tính không cần bộ nhớ."], a:1,
    k:"Nguyên lí Von Neumann: (1) các lệnh của chương trình được <b>lưu trữ trong bộ nhớ giống như dữ liệu</b>; (2) để thực hiện nhiệm vụ nào, chỉ cần tải chương trình tương ứng vào bộ nhớ; (3) chương trình được nạp từ bộ nhớ vào bộ xử lí <b>từng lệnh một</b>, thực hiện <b>tuần tự</b>. Máy tính gồm bộ xử lí, bộ nhớ, thiết bị vào – ra (Hình 1.3)."},
  the:{type:"match", label:"Đọc hiểu – Năm thế hệ", ph:"Chọn…",
    q:"Đọc mục 2 (SGK trang 7–8). Ghép mỗi thế hệ máy tính điện tử với thành phần điện tử chính của nó.",
    opts:["a) Đèn điện tử chân không","b) Bóng bán dẫn","c) Mạch tích hợp (IC)","d) Mạch tích hợp cỡ rất lớn (VLSI) và bộ vi xử lí","e) Mạch tích hợp cỡ siêu lớn (ULSI)"],
    items:[["1) Thế hệ thứ nhất (1945 – 1955)",1],["2) Thế hệ thứ hai (1955 – 1965)",2],["3) Thế hệ thứ ba (1965 – 1974)",3],["4) Thế hệ thứ tư (1974 – 1990)",4],["5) Thế hệ thứ năm (1990 – ngày nay)",5]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e. Mỗi thế hệ được đánh dấu bởi tiến bộ công nghệ nhằm <b>thu nhỏ linh kiện điện tử</b>, tích hợp vào thiết bị nhỏ hơn, nhanh hơn, tiết kiệm năng lượng hơn."},
  vd:{type:"match", label:"Đọc hiểu – Máy nào thế hệ nào?", ph:"Chọn…",
    q:"Mỗi máy tính dưới đây thuộc thế hệ thứ mấy?",
    opts:["a) Thế hệ thứ nhất","b) Thế hệ thứ hai","c) Thế hệ thứ ba","d) Thế hệ thứ tư","e) Thế hệ thứ năm"],
    items:[["1) ENIAC (Hình 1.4)",1],["2) IBM 7090, Minsk-22 (Hình 1.5)",2],["3) IBM System/360 (Hình 1.6)",3],["4) Micral, IBM PC, Apple II",4],["5) Điện thoại thông minh, loa thông minh",5]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e."},
  bm:{type:"sort", label:"Đọc hiểu – Bộ nhớ",
    q:"Bộ nhớ dưới đây được dùng chủ yếu ở máy tính thế hệ cũ (thứ nhất, thứ hai) hay thế hệ mới (thứ tư trở đi)?",
    cats:["Thế hệ cũ","Thế hệ mới"],
    items:[["Trống từ",0],["Lõi từ, băng từ",0],["CD, RAM, ROM",1],["USB, SSD",1]],
    k:"Thế hệ thứ nhất: <b>trống từ</b>; thế hệ thứ hai: <b>lõi từ, băng từ</b>; thế hệ thứ tư: <b>CD, RAM, ROM, USB, SSD</b>,…"},
  p8:{type:"mcq", label:"Câu hỏi tr.8", q:"Bộ vi xử lí là linh kiện máy tính dựa trên công nghệ nào?",
    o:["Đèn điện tử chân không.","Linh kiện bán dẫn đơn giản.","Mạch tích hợp hàng chục, hàng trăm linh kiện bán dẫn.","Mạch tích hợp cỡ lớn, gồm hàng chục nghìn đến hàng triệu linh kiện bán dẫn."], a:3,
    k:"Bộ vi xử lí dựa trên công nghệ <b>mạch tích hợp cỡ rất lớn (VLSI)</b>, chứa hàng chục nghìn đến hàng triệu linh kiện bán dẫn trên một khối, xuất hiện từ thế hệ thứ tư."},
  hd2:{type:"open", label:"HĐ2 – Sự thay đổi", q:"Em hãy lấy ba ví dụ cho thấy máy tính làm thay đổi sâu sắc cuộc sống của con người.",
    k:"Ví dụ: <b>học trực tuyến</b>, tra cứu tài liệu trên Internet; <b>đồng hồ thông minh</b> theo dõi sức khoẻ, báo động khi bất thường; <b>mua bán, thanh toán</b> qua điện thoại; gọi video với người thân ở xa; <b>camera an ninh</b> phát hiện vi phạm; máy bay không người lái quan sát vùng trời, vùng biển."},
  lv:{type:"match", label:"Đọc hiểu – Lĩnh vực", ph:"Chọn…",
    q:"Đọc mục 3 (SGK trang 9). Ghép mỗi ví dụ với lĩnh vực mà máy tính đã làm thay đổi.",
    opts:["a) Y tế","b) Giáo dục","c) Kinh tế","d) Quốc phòng","e) An toàn xã hội"],
    items:[["1) Đồng hồ thông minh đo sức khoẻ, tự động báo cho người thân, cơ sở y tế",1],["2) Học sinh học mọi nơi, mọi lúc; học từ xa với giáo viên, chuyên gia",2],["3) Giao dịch, mua bán trong môi trường kĩ thuật số",3],["4) Thiết bị bay thông minh quan sát vùng trời, vùng biển, lãnh thổ",4],["5) Camera an ninh phát hiện hiện tượng vi phạm pháp luật",5]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy nêu một ví dụ cho thấy sự khác nhau rõ ràng trong hoạt động học tập khi chưa có và khi có các thiết bị công nghệ số hiện nay.",
    k:"Ví dụ tra cứu kiến thức: <b>trước đây</b> phải đến thư viện, tìm sách, mất nhiều thời gian; <b>ngày nay</b> tìm trên Internet trong vài giây, xem video bài giảng, hỏi thầy cô qua tin nhắn, làm bài kiểm tra trực tuyến."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy nêu ví dụ về một ứng dụng mà em cho là thông minh của những máy tính thế hệ mới.",
    k:"Ví dụ: trợ lí ảo nhận giọng nói (Google Assistant, Siri); ứng dụng dịch hình ảnh trực tiếp; mở khoá điện thoại bằng khuôn mặt; bản đồ chỉ đường tránh tắc; chatbot trí tuệ nhân tạo trả lời câu hỏi. Đó là khả năng <b>cảm nhận, suy luận, tương tác</b> giống con người."},
  vd1:{type:"mcq", label:"Vận dụng – câu 1", q:"Vào thời điểm đất nước ta hoàn toàn thống nhất, năm 1975, những thế hệ máy tính điện tử nào đã xuất hiện ở nước ta?",
    o:["Chỉ thế hệ thứ nhất.","Thế hệ thứ hai và thế hệ thứ ba.","Thế hệ thứ tư và thế hệ thứ năm.","Chưa có máy tính điện tử nào."], a:1,
    k:"Theo SGK: chiếc máy tính thế hệ thứ hai <b>Minsk-22</b> được đưa vào nước ta năm <b>1968</b>; máy tính thế hệ thứ ba thuộc họ <b>IBM System/360</b> được đưa vào nước ta năm <b>1967</b>. Vậy năm 1975 nước ta đã có máy tính <b>thế hệ thứ hai và thứ ba</b>."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Em hãy đưa ra một dự báo về ứng dụng của máy tính trong tương lai. Hãy giải thích cơ sở của dự báo đó.",
    k:"Ví dụ: ô tô tự lái phổ biến; robot chăm sóc người già; bác sĩ AI chẩn đoán bệnh; lớp học thực tế ảo. <b>Cơ sở:</b> máy tính ngày càng nhỏ, nhanh, rẻ; trí tuệ nhân tạo phát triển mạnh; kết nối Internet tốc độ cao ở khắp nơi; hiện đã có các sản phẩm thử nghiệm."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Ý tưởng <b>cơ giới hoá việc tính toán</b> đóng vai trò quan trọng trong lịch sử phát triển của máy tính. Năm 1642, nhà bác học Blaise Pascal đã sáng chế ra chiếc máy tính cơ học Pascaline.</li><li>Năm 1833, nhà Toán học Charles Babbage đã thiết kế máy tính đa năng, tính toán tự động tương tự như máy tính ngày nay.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Máy tính điện tử ra đời vào những năm 1940. Năm thế hệ của máy tính điện tử được đánh dấu bởi những tiến bộ công nghệ nhằm thu nhỏ các linh kiện điện tử, tích hợp chúng vào những thiết bị nhỏ, có tốc độ xử lí lớn, độ tin cậy cao, có khả năng kết nối toàn cầu, tiêu thụ ít năng lượng và được trang bị nhiều ứng dụng thân thiện với con người.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Thế giới đang biến đổi nhanh chóng và sâu sắc nhờ sự phát triển của công nghệ máy tính.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Công cụ tính toán đầu tiên: <b>ngón tay</b>, rồi <b>bàn tính</b> (hơn 2000 năm TCN).</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Máy tính cơ học</p><ul>'
    + "<li><b>1642</b>: Pascal chế tạo máy <b>Pascaline</b> (cộng, trừ bằng bánh răng).</li>"
    + "<li>Leibniz thêm phép <b>nhân, chia</b>.</li>"
    + "<li><b>1833</b>: Babbage thiết kế máy <b>đa năng, tự động</b> → cha của máy tính.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Máy tính điện tử</p><ul>'
    + "<li><b>Von Neumann</b> (1945): chương trình lưu trong bộ nhớ; máy gồm bộ xử lí, bộ nhớ, vào – ra.</li>"
    + "<li>5 thế hệ: <b>đèn chân không → bóng bán dẫn → IC → bộ vi xử lí (VLSI) → ULSI, trí tuệ nhân tạo</b>.</li>"
    + "<li>Máy ngày càng <b>nhỏ, nhanh, tiết kiệm điện</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Máy tính thay đổi thế giới</p><ul>'
    + "<li>Thay đổi: <b>y tế, giáo dục, kinh tế, quốc phòng, an toàn xã hội</b>,…</li>"
    + "<li>→ Con người cần <b>thay đổi để thích nghi</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Có công nghệ số: tra cứu nhanh, học trực tuyến, trợ lí ảo thông minh.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Năm 1975, nước ta đã có máy tính <b>thế hệ thứ hai</b> (Minsk-22) và <b>thứ ba</b> (IBM System/360).</li>"
    + "</ul>"}
};
const TASK_IDS = Object.keys(TASKS);
const L = ["A","B","C","D"];
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
/* Nhãn ngắn của lựa chọn ghép nối thứ p (bắt đầu từ 1): "a", "b",… hoặc số cổng */
function optShort(t, p){ if (!p) return "?"; const o = t.opts && t.opts[p - 1]; return o ? o.split(")")[0] : String(p); }
function grade(id, d){
  const t = TASKS[id];
  if (t.type === "mcq") { const v = d.mcq && d.mcq[id]; if (v == null) return null; return {ok: v === t.a, right: v === t.a ? 1 : 0, total: 1, text: "Chọn " + L[v]}; }
  if (t.type === "sort") { const m = (d.sort && d.sort[id]) || {}; let r = 0, n = 0, wrong = [];
    t.items.forEach(([name, c], i) => { const v = m[i]; if (v != null && v !== -1) n++; if (v === c) r++; else wrong.push(name + (v == null || v === -1 ? " → ?" : " → " + t.cats[v])); });
    if (!n) return null; return {ok: r === t.items.length, right: r, total: t.items.length, text: "Đúng " + r + "/" + t.items.length + (wrong.length ? ". Chưa đúng: " + wrong.join("; ") : "")}; }
  if (t.type === "match") { const m = (d.match && d.match[id]) || {}; let r = 0, n = 0, parts = [];
    t.items.forEach(([name, p], i) => { const v = m[i]; if (v) n++; if (Number(v) === p) r++; parts.push(name.split(")")[0] + "–" + optShort(t, Number(v))); });
    if (!n) return null; return {ok: r === t.items.length, right: r, total: t.items.length, text: "Đúng " + r + "/" + t.items.length + " (" + parts.join(", ") + ")"}; }
  if (t.type === "order") { const a = d.order && d.order[id]; if (!Array.isArray(a)) return null; let r = 0; a.forEach((k, i) => { if (k === t.ans[i]) r++; });
    return {ok: r === a.length, right: r, total: a.length, text: a.join(" → ")}; }
  return null;
}

function countSub(d){ return TASK_IDS.filter(id => d && d.sub && d.sub[id]).length; }
/* Các cột dễ đọc gửi lên Google Sheet: mỗi câu một cột */
function summary(d){
  return TASK_IDS.map(id => {
    const t = TASKS[id], sub = !!(d.sub && d.sub[id]);
    let v = "";
    if (t.type === "open") v = (d.ans && d.ans[id]) || "";
    else { const g = grade(id, d); if (g) v = g.text + (sub ? (g.ok ? " ✓" : " ✗") : ""); }
    if (v && !sub) v = "(nháp) " + v;
    return ["T8B1." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em kể được nhiều công cụ tính toán từ xưa đến nay."],
        fix:["Em nghĩ thêm: ông bà ta xưa tính bằng gì? Ngày nay em tính bằng gì?"]},
  kd2: {ok:["Chính xác! Bàn tính hiển thị 6 302 715 408."],
        fix:["Em đọc dãy chữ số in bên dưới Hình 1.1."]},
  hd1a:{ok:["Đúng! Máy Pascaline của Blaise Pascal, năm 1642."],
        fix:["Em đọc đoạn “Những chiếc bánh răng” (SGK trang 5)."]},
  hd1b:{ok:["Đúng! Máy làm được phép cộng, trừ."],
        fix:["Máy Pascaline giúp cha Pascal tính thuế bằng những phép tính nào?"]},
  hd1c:{ok:["Chính xác! Ý tưởng cơ giới hoá việc tính toán."],
        fix:["Em tìm cụm từ “ý tưởng cơ giới hoá” trong SGK trang 5."]},
  p6:  {ok:["Chính xác! Cả ba đặc điểm đều đúng."],
        fix:["Em đọc lại đoạn “Dự án máy tính của Babbage”: các đặc điểm A, B, C có đúng không?"]},
  nguoi:{ok:["Nhóm ghép đúng đóng góp của tất cả các nhà khoa học."],
        fix:["Em đọc lại SGK trang 5–7, chú ý mốc năm đi kèm mỗi người."]},
  vn:  {ok:["Đúng! Chương trình được lưu trong bộ nhớ như dữ liệu."],
        fix:["Em đọc lại ba ý trong nguyên lí của Von Neumann (SGK trang 6)."]},
  the: {ok:["Nhóm ghép đúng thành phần điện tử của từng thế hệ."],
        fix:["Em đọc dòng “Thành phần điện tử chính” của từng thế hệ."]},
  vd:  {ok:["Nhóm xếp đúng các máy vào thế hệ."],
        fix:["Em tìm dòng “Ví dụ” của từng thế hệ trong SGK."]},
  bm:  {ok:["Nhóm phân biệt đúng bộ nhớ của các thế hệ."],
        fix:["Em đọc dòng “Bộ nhớ” của thế hệ thứ nhất, thứ hai và thứ tư."]},
  p8:  {ok:["Chính xác! Bộ vi xử lí dùng mạch tích hợp cỡ rất lớn."],
        fix:["Bộ vi xử lí xuất hiện ở thế hệ thứ mấy? Thế hệ đó dùng công nghệ gì?"]},
  hd2: {ok:["Ba ví dụ rất cụ thể, gần gũi."],
        fix:["Em kể đủ ba ví dụ ở các lĩnh vực khác nhau."]},
  lv:  {ok:["Nhóm ghép đúng các lĩnh vực."],
        fix:["Em đọc lại mục 3 (SGK trang 9)."]},
  lt1: {ok:["Ví dụ so sánh rõ trước và sau khi có công nghệ số."],
        fix:["Em nêu rõ: trước đây làm thế nào, bây giờ làm thế nào?"]},
  lt2: {ok:["Ứng dụng em nêu thể hiện rõ sự thông minh của máy tính."],
        fix:["Ứng dụng đó có nhận biết giọng nói, hình ảnh hay tự suy luận không?"]},
  vd1: {ok:["Chính xác! Thế hệ thứ hai và thứ ba."],
        fix:["Em tìm năm máy Minsk-22 và IBM System/360 được đưa vào nước ta."]},
  vd2: {ok:["Dự báo hợp lí, có cơ sở rõ ràng."],
        fix:["Em giải thích thêm: dựa vào đâu em dự báo như vậy?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  bm: "Em đọc lại dòng “Bộ nhớ” của từng thế hệ."
};
const MATCH_HINT = {
  nguoi: "Gợi ý: chú ý mốc năm đi kèm mỗi nhà khoa học.",
  the: "Gợi ý: đọc dòng “Thành phần điện tử chính” của từng thế hệ.",
  vd: "Gợi ý: đọc dòng “Ví dụ” của từng thế hệ.",
  lv: "Gợi ý: đọc lại mục 3 (SGK trang 9)."
};
/* Nhận xét tự sinh, nêu đúng chỗ sai (dùng cho xếp nhóm, ghép nối, sắp thứ tự) */
function autoComment(id, d){
  const t = TASKS[id];
  if (t.type === "sort") {
    const m = (d.sort && d.sort[id]) || {};
    const wrong = t.items.map(([name, c], i) => ({name, c, v: m[i]})).filter(x => x.v !== x.c && x.v != null && x.v !== -1);
    const unsure = t.items.filter((x, i) => m[i] == null || m[i] === -1).map(x => x[0]);
    if (!wrong.length && !unsure.length) return "";
    let s = "";
    if (wrong.length) s += "Nhóm xếp chưa đúng: " + wrong.map(x => x.name + " (nhóm chọn " + t.cats[x.v] + ")").join("; ") + ". ";
    if (unsure.length) s += "Chưa xếp: " + unsure.join(", ") + ". ";
    return s + (SORT_HINT[id] || "");
  }
  if (t.type === "match") {
    const m = (d.match && d.match[id]) || {};
    const wrong = t.items.map(([name, p], i) => ({name, p, v: m[i]})).filter(x => Number(x.v) !== x.p);
    if (!wrong.length) return "";
    return "Nhóm cần xem lại: " + wrong.map(x => x.name + (x.v ? " (nhóm chọn " + optShort(t, Number(x.v)) + ")" : " (chưa chọn)")).join("; ") + ". " + (MATCH_HINT[id] || "");
  }
  if (t.type === "order") {
    const a = d.order && d.order[id];
    if (!Array.isArray(a) || a.join() === t.ans.join()) return "";
    return "Nhóm sắp xếp: " + a.join(" → ") + ". Em xem lại thứ tự nhé.";
  }
  return "";
}
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Công cụ tính toán đầu tiên", tasks:["kd1","kd2"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Máy tính cơ học", acts:[
    {title:"Hoạt động 1: Sự ra đời của máy tính", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Đọc hiểu: Pascal và Babbage", tasks:["p6"], concept:"c1"},
    {title:"Ghi bài: Máy tính cơ học", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Máy tính điện tử", acts:[
    {title:"Đọc hiểu: Máy tính điện – cơ, Von Neumann", tasks:["nguoi","vn"]},
    {title:"Đọc hiểu: Năm thế hệ máy tính", tasks:["the","vd","bm"], concept:"c2"},
    {title:"Câu hỏi SGK trang 8", tasks:["p8"]},
    {title:"Ghi bài: Máy tính điện tử", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Máy tính thay đổi thế giới", acts:[
    {title:"Hoạt động 2: Sự thay đổi", tasks:["hd2"]},
    {title:"Đọc hiểu: Các lĩnh vực", tasks:["lv"], concept:"c3"},
    {title:"Ghi bài: Máy tính thay đổi thế giới", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 9", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Máy tính ở Việt Nam và tương lai", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai1", title: "Bài 1. Lược sử công cụ tính toán", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng máy Pascaline là máy tính điện tử vì…",
  commentPh: "Ví dụ: Nhóm ghép đúng các thế hệ; cần nêu thêm ví dụ máy tính của từng thế hệ."};
})();
