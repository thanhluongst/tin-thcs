/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Bộ xử lí là “bộ não” của máy tính. Ngoài máy tính để bàn và máy tính xách tay, em còn biết những thiết bị nào khác cũng có gắn bộ xử lí?",
    k:"Bộ xử lí không chỉ có trong máy tính. Rất nhiều thiết bị điện tử khác cũng được gắn bộ xử lí để hoạt động như <b>máy tính</b>: điện thoại thông minh, ti vi kĩ thuật số, robot lau nhà, máy giặt, tủ lạnh, điều hoà, đồng hồ thông minh, máy ATM, máy chấm công nhận khuôn mặt,…"},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Ti vi kĩ thuật số (Hình 1.1) tiếp nhận thông tin đầu vào nào từ bộ điều khiển?",
    k:"Khi em nhấn nút trên bộ điều khiển từ xa (chuyển kênh, tăng âm lượng,…), ti vi nhận được <b>tín hiệu từ nút bấm</b>, tức là <b>yêu cầu của người dùng</b> (ví dụ: chuyển sang kênh số 5)."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Ti vi thể hiện sự thay đổi ở đầu ra như thế nào?",
    k:"Ti vi <b>chuyển sang kênh mới</b>: màn hình hiển thị hình ảnh, loa phát âm thanh của kênh em yêu cầu (hoặc thay đổi âm lượng, hiện menu,…)."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Ti vi có thực hiện thao tác xử lí thông tin không? Vì sao?",
    k:"<b>Có.</b> Ti vi phải xử lí thông tin nhận được từ bộ điều khiển để chuyển sang kênh em yêu cầu. Để làm được việc đó, ti vi phải được <b>gắn một bộ xử lí</b> thông tin."},
  p6a:{type:"match", label:"Câu hỏi tr.6 – câu 1", ph:"Chọn…",
    q:"Em hãy ghép mỗi cụm từ với một thiết bị có gắn bộ xử lí trong Hình 1.2.",
    opts:["1) Ô tô lái tự động","2) Máy chụp cắt lớp","3) Bảng điện tử","4) Robot lắp ráp"],
    items:[["a) Hình 1.2a",3],["b) Hình 1.2b",2],["c) Hình 1.2c",4],["d) Hình 1.2d",1]],
    k:"a – bảng điện tử; b – máy chụp cắt lớp; c – robot lắp ráp; d – ô tô lái tự động."},
  p6b:{type:"match", label:"Câu hỏi tr.6 – câu 2", ph:"Chọn…",
    q:"Những thiết bị trong Hình 1.2 thường xuất hiện ở nơi nào trong thực tế?",
    opts:["1) Bệnh viện","2) Đường phố, giao thông","3) Sân bay, nhà ga","4) Nhà máy, xí nghiệp sản xuất"],
    items:[["a) Bảng điện tử",3],["b) Máy chụp cắt lớp",1],["c) Robot lắp ráp",4],["d) Ô tô lái tự động",2]],
    k:"Bảng điện tử – sân bay, nhà ga (thông tin chuyến bay, chuyến tàu); máy chụp cắt lớp – bệnh viện; robot lắp ráp – nhà máy sản xuất (lắp ráp ô tô); ô tô lái tự động – đường phố."},
  hd2:{type:"open", label:"HĐ2 – Máy tính thật là cần thiết", q:"Em hãy nêu một số khả năng của máy tính mà nhờ đó máy tính có thể hỗ trợ con người một cách đắc lực trong cuộc sống.",
    k:"<ul><li><b>Tính toán nhanh, chính xác</b>: hàng tỉ phép tính mỗi giây.</li><li><b>Làm việc bền bỉ</b>, không mệt mỏi.</li><li><b>Lưu trữ dung lượng lớn</b> nhiều loại dữ liệu: văn bản, hình ảnh, âm thanh, video,… và truy xuất nhanh.</li><li><b>Kết nối toàn cầu với tốc độ cao</b> qua mạng Internet.</li></ul>"},
  kn:{type:"sort", label:"Đọc hiểu – Khả năng của máy tính",
    q:"Đọc mục a) Khả năng của máy tính (SGK trang 6–7). Mỗi ý dưới đây có phải là khả năng của máy tính được nêu trong sách không?",
    cats:["Đúng là khả năng","Không phải"],
    items:[["Thực hiện hàng tỉ phép tính trong một giây, chính xác",0],["Làm việc bền bỉ, không biết mệt mỏi",0],["Lưu trữ và xử lí nhiều loại dữ liệu: văn bản, hình ảnh, âm thanh, video",0],["Kết nối với nhau thành mạng toàn cầu Internet",0],["Tự suy nghĩ và tự quyết định thay con người mà không cần chương trình",1],["Hoạt động được khi không có nguồn điện",1]],
    k:"Bốn ý đầu là khả năng của máy tính: <b>tính toán nhanh, bền bỉ, chính xác; lưu trữ dữ liệu với dung lượng lớn; kết nối toàn cầu với tốc độ cao</b>. Máy tính chỉ làm việc theo chương trình do con người tạo ra và cần nguồn điện để hoạt động."},
  ud:{type:"match", label:"Đọc hiểu – Ứng dụng của máy tính", ph:"Chọn…",
    q:"Đọc mục b) Ứng dụng của máy tính trong khoa học kĩ thuật và đời sống (SGK trang 7). Ghép mỗi ví dụ với lĩnh vực phù hợp.",
    opts:["a) Khoa học kĩ thuật","b) Y tế","c) Nghiên cứu, học tập","d) Giao thông","e) Đời sống hằng ngày"],
    items:[["1) Mô phỏng dòng chảy chất lỏng, chất khí; dự báo thời tiết",1],["2) Hiểu cơ thể người, chẩn đoán bệnh; quản lí dữ liệu người bệnh",2],["3) Tham khảo tài liệu từ kho dữ liệu số hoá trên Internet",3],["4) Điều khiển xe tự động lái, điều khiển hệ thống đèn tín hiệu",4],["5) Gửi tin nhắn, mua sắm, đọc báo, giải trí chỉ bằng vài cú nhấp chuột",5]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e. Máy tính được ứng dụng hiệu quả trong <b>hầu hết các lĩnh vực</b> của khoa học kĩ thuật và đời sống."},
  hd3:{type:"open", label:"HĐ3 – Tác động của CNTT", q:"Em hãy kể một số ví dụ cho thấy tác động của công nghệ thông tin lên giáo dục và xã hội.",
    k:"<ul><li><b>Giáo dục:</b> học trực tuyến, thư viện điện tử, bài giảng video, phần mềm học tập, tra cứu tài liệu trên Internet mọi lúc, mọi nơi; nhiều dữ liệu học tập miễn phí.</li><li><b>Xã hội:</b> gọi điện, nhắn tin, mạng xã hội giúp liên lạc dễ dàng dù ở xa; dịch vụ công trực tuyến, mua bán, thanh toán qua mạng; chuyển giao và tiếp cận thông tin nhanh chóng.</li><li><b>Tác động tiêu cực</b> nếu dùng không đúng cách: nghiện game, mạng xã hội; ảnh hưởng sức khoẻ thể chất và tinh thần; tin giả,…</li></ul>"},
  td:{type:"sort", label:"Đọc hiểu – Tích cực hay tiêu cực?",
    q:"Đọc mục 3 (SGK trang 8). Mỗi ví dụ dưới đây là tác động tích cực hay tiêu cực của công nghệ thông tin?",
    cats:["Tích cực","Tiêu cực"],
    items:[["Học sinh tự học thêm qua bài giảng video và thư viện điện tử",0],["Người thân ở xa vẫn trò chuyện, nhìn thấy nhau qua cuộc gọi video",0],["Thức khuya chơi trò chơi trực tuyến, ảnh hưởng sức khoẻ và việc học",1],["Mọi người chia sẻ kiến thức, kĩ năng trên Internet, nhiều tài liệu miễn phí",0],["Dành quá nhiều thời gian lướt mạng xã hội, ít giao tiếp với gia đình",1],["Tin đồn sai sự thật lan truyền nhanh trên mạng",1]],
    k:"Công nghệ thông tin tạo ra <b>nhiều tác động tích cực</b> đến con người và xã hội, nhưng nếu <b>sử dụng không đúng cách và thiếu trách nhiệm</b> thì có thể gây tác động tiêu cực. Cách chúng ta sử dụng sẽ quyết định tác động có lợi hay có hại."},
  p8a:{type:"open", label:"Câu hỏi tr.8 – a", q:"Kể về một ứng dụng của công nghệ thông tin mà em thường xuyên sử dụng.",
    k:"Học sinh tự kể. Ví dụ: <b>Zalo</b> (nhắn tin, gọi video với bạn bè, nhóm lớp), <b>YouTube</b> (xem bài giảng), <b>Google Maps</b> (tìm đường), phần mềm học tiếng Anh, <b>Google</b> (tra cứu thông tin),…"},
  p8b:{type:"open", label:"Câu hỏi tr.8 – b", q:"Nêu những tác động tích cực của ứng dụng đó và cách em sử dụng nó hằng ngày.",
    k:"Học sinh tự trả lời theo ứng dụng đã chọn. Ví dụ với Zalo: <b>tích cực</b> – liên lạc nhanh, miễn phí, trao đổi bài với bạn, nhận thông báo của lớp. <b>Cách dùng</b>: chỉ dùng khi cần trao đổi việc học, liên lạc gia đình; giới hạn thời gian; không chia sẻ thông tin cá nhân, không lan truyền tin chưa kiểm chứng."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Hãy tưởng tượng, các hoạt động xung quanh em sẽ thay đổi như thế nào khi một ngày các bộ xử lí biến mất, các thiết bị được gắn bộ xử lí không hoạt động nữa.",
    k:"Gợi ý: điện thoại, máy tính, ti vi không dùng được nên không liên lạc, học trực tuyến, xem tin tức được; đèn giao thông, bảng điện tử ở sân bay, nhà ga ngừng hoạt động gây ùn tắc; ATM, thanh toán điện tử dừng; máy móc trong bệnh viện, nhà máy dừng lại; máy giặt, điều hoà, tủ lạnh thông minh không chạy,… Cuộc sống sẽ <b>bị đảo lộn</b>, vì bộ xử lí đã có mặt ở hầu hết các lĩnh vực."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy kể một ví dụ về kiến thức, kĩ năng hoặc nội dung thú vị, có nhiều ý nghĩa mà em học được từ nguồn thông tin trên Internet.",
    k:"Học sinh tự kể. Ví dụ: học cách sơ cứu khi bị bỏng qua video hướng dẫn; học lập trình Scratch, Python trên các trang học trực tuyến; tìm hiểu về Hệ Mặt Trời qua trang web khoa học; học nấu một món ăn,… Cần nêu rõ <b>nguồn</b> và <b>ý nghĩa</b> của điều đã học."},
  vd1:{type:"open", label:"Vận dụng – a", q:"Đồng hồ thông minh có những chức năng nào khác với đồng hồ thông thường?",
    k:"Ngoài xem giờ, đồng hồ thông minh có thể: <b>đo nhịp tim, đếm bước chân, theo dõi giấc ngủ</b>; nhận cuộc gọi, tin nhắn, thông báo từ điện thoại; <b>định vị GPS</b>; nghe nhạc; thanh toán; gọi khẩn cấp; cài thêm ứng dụng,…"},
  vd2:{type:"open", label:"Vận dụng – b", q:"Tại sao đồng hồ thông minh cần có bộ xử lí?",
    k:"Vì đồng hồ thông minh phải <b>tiếp nhận và xử lí thông tin</b>: dữ liệu từ cảm biến (nhịp tim, chuyển động, vị trí), tín hiệu từ điện thoại, thao tác chạm của người dùng, rồi tính toán và hiển thị kết quả. Mọi việc xử lí thông tin đó đều cần <b>bộ xử lí</b>."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Thiết bị được gắn bộ xử lí hiện diện xung quanh ta. Chúng giúp con người <b>tự động hoá</b> một phần hoạt động xử lí thông tin và xuất hiện trong hầu hết các lĩnh vực kinh tế, xã hội và đời sống,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Máy tính có khả năng <b>tính toán nhanh, bền bỉ, chính xác; lưu trữ dữ liệu với dung lượng lớn; kết nối toàn cầu với tốc độ cao</b>.</li><li>Máy tính được ứng dụng hiệu quả trong nhiều lĩnh vực của khoa học kĩ thuật và đời sống.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Công nghệ thông tin có tác động mạnh mẽ, đem lại những thay đổi tích cực trong xã hội, trong đó có giáo dục.</li><li>Cần sử dụng công nghệ thông tin đúng cách để tránh những tác động tiêu cực đến cuộc sống.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li><b>Bộ xử lí</b> là “bộ não” của máy tính và của nhiều thiết bị khác.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thế giới kĩ thuật số</p><ul>'
    + "<li>Thiết bị có <b>bộ xử lí</b> thì xử lí được thông tin. VD: ti vi nhận lệnh chuyển kênh.</li>"
    + "<li>Chúng có <b>khắp nơi</b>: điện thoại, máy giặt, ATM, robot, ô tô tự lái,…</li>"
    + "<li>Giúp con người <b>tự động hoá</b> công việc → tạo nên <b>thế giới kĩ thuật số</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Ứng dụng của máy tính</p><ul>'
    + "<li>Khả năng: <b>tính nhanh, chính xác, bền bỉ</b>; <b>lưu trữ lớn</b>; <b>kết nối toàn cầu</b>.</li>"
    + "<li>Ứng dụng: khoa học, y tế, giao thông, học tập, đời sống.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Tác động của công nghệ thông tin</p><ul>'
    + "<li><b>Tích cực</b>: học mọi lúc mọi nơi; liên lạc nhanh; tìm thông tin dễ.</li>"
    + "<li><b>Tiêu cực</b> nếu dùng sai: hại sức khoẻ, nghiện mạng, tin giả.</li>"
    + "<li>→ Dùng công nghệ <b>đúng cách, có trách nhiệm</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Không có bộ xử lí: liên lạc, học tập, giao thông, ngân hàng,… đều ngừng.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Đồng hồ thông minh cần <b>bộ xử lí</b> để xử lí dữ liệu: nhịp tim, bước chân, tin nhắn.</li>"
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
    return ["T9B1." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Rất tốt! Em kể được nhiều thiết bị có gắn bộ xử lí.","Chính xác! Bộ xử lí có mặt trong rất nhiều thiết bị quanh ta."],
        fix:["Em nghĩ đến các thiết bị trong nhà: thiết bị nào tự hoạt động theo yêu cầu của em?","Em kể thêm thiết bị ở trường, ở siêu thị, ở bệnh viện nhé."]},
  hd1a:{ok:["Đúng! Đầu vào là tín hiệu (yêu cầu) từ nút bấm trên bộ điều khiển."],
        fix:["Khi em bấm nút trên bộ điều khiển, ti vi nhận được gì?"]},
  hd1b:{ok:["Chính xác! Ti vi chuyển kênh, màn hình và loa thay đổi."],
        fix:["Sau khi em bấm nút, em thấy gì thay đổi trên màn hình, loa?"]},
  hd1c:{ok:["Đúng! Ti vi xử lí thông tin nên phải có bộ xử lí."],
        fix:["Muốn biết phải chuyển sang kênh nào, ti vi có cần xử lí thông tin không? Nhờ bộ phận nào?"]},
  p6a: {ok:["Nhóm ghép đúng tất cả. Rất tốt!"],
        fix:["Em quan sát kĩ: hình nào có các dòng chữ chuyến bay? Hình nào ở bệnh viện, nhà máy, trong xe ô tô?"]},
  p6b: {ok:["Chính xác! Các thiết bị có bộ xử lí xuất hiện ở khắp các lĩnh vực."],
        fix:["Em nghĩ xem: em đã thấy thiết bị đó ở sân bay, bệnh viện, nhà máy hay ngoài đường?"]},
  hd2: {ok:["Em nêu đủ các khả năng: tính toán nhanh, bền bỉ, chính xác; lưu trữ lớn; kết nối toàn cầu.","Rất tốt, ví dụ của em rất cụ thể."],
        fix:["Em còn thiếu khả năng. Gợi ý: tính toán, lưu trữ, kết nối.","Em nêu thêm ví dụ máy tính giúp con người việc gì."]},
  kn:  {ok:["Nhóm nhận ra đúng các khả năng của máy tính. Rất tốt!"],
        fix:["Máy tính có tự suy nghĩ mà không cần chương trình không? Em đọc lại SGK trang 6–7."]},
  ud:  {ok:["Nhóm ghép đúng các lĩnh vực ứng dụng. Rất tốt!"],
        fix:["Em đọc lại các ví dụ ở mục b (SGK trang 7) và ghép lại nhé."]},
  hd3: {ok:["Em nêu được ví dụ cả về giáo dục và xã hội. Rất tốt!","Hay! Em còn nhắc đến cả tác động tiêu cực."],
        fix:["Em nêu thêm ví dụ trong học tập (giáo dục) nhé.","Em nêu thêm ví dụ trong giao tiếp, đời sống xã hội nhé."]},
  td:  {ok:["Nhóm phân biệt đúng tác động tích cực và tiêu cực."],
        fix:["Em tự hỏi: việc đó giúp ích hay gây hại cho người dùng?"]},
  p8a: {ok:["Ứng dụng em kể rất gần gũi, cụ thể."],
        fix:["Em nêu tên ứng dụng cụ thể và em dùng nó để làm gì nhé."]},
  p8b: {ok:["Em biết dùng ứng dụng một cách hợp lí. Rất tốt!"],
        fix:["Em nêu thêm cách em sử dụng: dùng khi nào, bao lâu, để làm gì?","Em nêu thêm tác động tích cực của ứng dụng đó."]},
  lt1: {ok:["Em tưởng tượng rất phong phú, cho thấy bộ xử lí có mặt ở mọi nơi."],
        fix:["Em nghĩ thêm về giao thông, ngân hàng, bệnh viện khi không còn bộ xử lí nhé."]},
  lt2: {ok:["Ví dụ hay và ý nghĩa!"],
        fix:["Em nêu rõ học được từ trang web/kênh nào và điều đó có ích gì cho em."]},
  vd1: {ok:["Em nêu được nhiều chức năng của đồng hồ thông minh. Rất tốt!"],
        fix:["Ngoài xem giờ, đồng hồ thông minh còn đo được gì, kết nối với gì?"]},
  vd2: {ok:["Lập luận đúng: đồng hồ thông minh phải xử lí thông tin nên cần bộ xử lí."],
        fix:["Đồng hồ thông minh nhận thông tin từ đâu, rồi làm gì với thông tin đó? Việc đó cần bộ phận nào?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kn: "Em đọc lại mục a) Khả năng của máy tính (SGK trang 6–7).",
  td: "Em xét lại: việc đó giúp ích hay gây hại cho con người?"
};
const MATCH_HINT = {
  p6a: "Gợi ý: quan sát kĩ từng hình trong Hình 1.2.",
  p6b: "Gợi ý: em đã nhìn thấy thiết bị đó ở đâu?",
  ud: "Gợi ý: đọc lại mục b) Ứng dụng của máy tính (SGK trang 7)."
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
    {title:"Bộ xử lí có ở đâu?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Thế giới kĩ thuật số", acts:[
    {title:"Hoạt động 1: Ti vi kĩ thuật số", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Câu hỏi SGK trang 6", tasks:["p6a","p6b"], concept:"c1"},
    {title:"Ghi bài: Thế giới kĩ thuật số", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Ứng dụng thực tế của máy tính", acts:[
    {title:"Hoạt động 2: Máy tính thật là cần thiết", tasks:["hd2"]},
    {title:"Đọc hiểu: Khả năng của máy tính", tasks:["kn"]},
    {title:"Đọc hiểu: Ứng dụng của máy tính", tasks:["ud"], concept:"c2"},
    {title:"Ghi bài: Ứng dụng của máy tính", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Tác động của CNTT", acts:[
    {title:"Hoạt động 3: Tác động của CNTT", tasks:["hd3"]},
    {title:"Đọc hiểu: Tích cực hay tiêu cực?", tasks:["td"], concept:"c3"},
    {title:"Câu hỏi SGK trang 8", tasks:["p8a","p8b"]},
    {title:"Ghi bài: Tác động của CNTT", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 8", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Đồng hồ thông minh", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai1", title: "Bài 1. Thế giới kĩ thuật số", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng máy tính tự suy nghĩ được vì…",
  commentPh: "Ví dụ: Nhóm nêu đúng khả năng tính toán, lưu trữ; cần bổ sung khả năng kết nối."};
})();
