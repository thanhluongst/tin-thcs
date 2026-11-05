/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"sort", label:"Mở đầu – Năng lượng tái tạo",
    q:"Mỗi nguồn năng lượng dưới đây là năng lượng tái tạo (không cạn kiệt) hay nhiên liệu hoá thạch (có thể cạn kiệt)?",
    cats:["Năng lượng tái tạo","Nhiên liệu hoá thạch"],
    items:[["Gió",0],["Ánh sáng mặt trời",0],["Nước (thuỷ điện)",0],["Rác thải, sinh khối",0],["Than đá",1],["Xăng, dầu mỏ",1],["Khí đốt",1]],
    k:"Năng lượng tái tạo: <b>gió, mặt trời, nước, sinh khối (cả rác thải)</b>,… không bao giờ cạn kiệt. Nhiên liệu hoá thạch: <b>than, dầu mỏ, khí đốt</b> phải mất hàng triệu năm để tạo ra và có thể cạn kiệt."},
  kd2:{type:"open", label:"Mở đầu – Vì sao?", q:"Theo em, vì sao chúng ta cần tìm hiểu về năng lượng tái tạo? Em có thể khai thác thông tin số như thế nào để làm bài trình chiếu về chủ đề này?",
    k:"Vì nhiên liệu hoá thạch có thể cạn kiệt và gây ô nhiễm; năng lượng tái tạo sạch, không cạn kiệt nhưng cũng có nhược điểm. Để làm bài trình chiếu, em cần: <b>xác định ý tưởng, cấu trúc</b> → <b>tìm kiếm, đánh giá thông tin</b> → <b>xử lí, trao đổi thông tin</b> (tạo, biên tập, chia sẻ bài trình chiếu)."},
  yt:{type:"open", label:"NV1 – Bước 1, 2", q:"Nêu một khía cạnh hay một vấn đề cụ thể về năng lượng tái tạo mà em định trình bày. Phát triển ý tưởng thành các câu hỏi để thuận lợi cho việc tìm tư liệu.",
    k:"Ví dụ: chủ đề “Điện mặt trời ở Ninh Thuận”. Các câu hỏi: (1) Năng lượng tái tạo là gì? (2) Nguồn năng lượng nào sản xuất ra điện ở nơi em sinh sống? Ưu, nhược điểm? (3) Chọn một nguồn năng lượng thay thế: ưu, nhược điểm? (4) Loại năng lượng nào sẽ thay thế xăng dầu cho ô tô, xe máy? (5) Nếu thiết kế một nhà máy điện, em chọn cách nào? Vì sao?"},
  ct:{type:"order", label:"NV1 – Cấu trúc bài trình chiếu", q:"Sắp xếp các trang của bài trình chiếu theo cấu trúc hợp lí (dùng nút ↑ ↓).",
    items:{a:"Trang kết luận",b:"Trang tiêu đề",c:"Trang tài liệu tham khảo",d:"Trang giới thiệu vấn đề",e:"Trang dàn ý",f:"Các trang nội dung"},
    start:["a","b","c","d","e","f"], ans:["b","e","d","f","a","c"],
    k:"Thứ tự: <b>tiêu đề → dàn ý → giới thiệu vấn đề → các trang nội dung → kết luận → tài liệu tham khảo</b>."},
  yc:{type:"sort", label:"NV1 – Bước 3: Yêu cầu",
    q:"Theo yêu cầu ở Bước 3 (mỗi trang không quá 6 mục, mỗi mục không quá 2 dòng, có ít nhất 2 hình ảnh minh hoạ), mỗi trang chiếu dưới đây đạt yêu cầu hay chưa?",
    cats:["Đạt yêu cầu","Chưa đạt"],
    items:[["Trang có 5 mục, mỗi mục 1 dòng",0],["Trang có 9 mục liệt kê",1],["Một mục dài 5 dòng",1],["Bài trình chiếu có 3 hình ảnh minh hoạ",0],["Bài trình chiếu không có hình ảnh nào",1],["Có trang tài liệu tham khảo ghi rõ địa chỉ web",0]],
    k:"Bài trình chiếu khoảng 10 trang; <b>mỗi trang không quá 6 mục; mỗi mục không quá 2 dòng</b>; có <b>ít nhất 2 hình ảnh</b> minh hoạ; có trang tài liệu tham khảo."},
  tk:{type:"open", label:"NV2 – Bước 1, 2: Tìm kiếm", q:"Dùng máy tìm kiếm với các từ khoá như “năng lượng tái tạo”, “năng lượng thay thế”, “ưu, nhược điểm của thuỷ điện”,… Ghi chép ít nhất hai kết quả tìm kiếm theo mẫu Bảng 3.1: nội dung, địa chỉ trang web, nguồn gốc, thời gian.",
    k:"Ví dụ: (1) Quy hoạch điện VIII: ưu tiên phát triển năng lượng tái tạo – moit.gov.vn – Bộ Công Thương – 2021; (2) Năng lượng tái tạo sẽ thống trị công suất điện toàn thế giới – evn.com.vn – Tập đoàn Điện lực Việt Nam – 2022. Ghi chép đủ <b>4 cột</b> giúp đánh giá và trích dẫn tài liệu tham khảo."},
  gov:{type:"mcq", label:"NV2 – Nguồn tin cậy", q:"Với nội dung quy hoạch cơ cấu nguồn điện của Việt Nam, nguồn thông tin nào đáng tin cậy nhất?",
    o:["Một diễn đàn trao đổi trên mạng.","Trang web của một doanh nghiệp bán pin mặt trời.","Trang web của Bộ Công Thương (đuôi .gov.vn).","Một bài đăng trên mạng xã hội."], a:2,
    k:"Trang web có địa chỉ <b>…gov.vn</b> là trang thông tin của <b>cơ quan chính phủ</b> (Hình 3.1). Với nội dung quy hoạch cơ cấu nguồn điện, thông tin từ cơ quan chính phủ đáng tin cậy hơn thông tin trên các diễn đàn hay trang web của doanh nghiệp."},
  b31:{type:"sort", label:"NV2 – Đánh giá Bảng 3.1",
    q:"Quan sát Bảng 3.1. Mỗi kết quả tìm kiếm dưới đây có độ tin cậy cao hay cần thận trọng khi dùng?",
    cats:["Tin cậy cao","Cần thận trọng"],
    items:[["Khái niệm chung về các nguồn năng lượng – diễn đàn hvacr.vn – năm 2008",1],["Năng lượng tái tạo sẽ thống trị công suất điện toàn thế giới – evn.com.vn – năm 2022",0],["Quy hoạch điện VIII – erea.gov.vn (Bộ Công Thương) – năm 2021",0]],
    k:"Kết quả 1 lấy từ <b>diễn đàn</b> và đã <b>cũ</b> (2008) nên cần thận trọng, đối chiếu thêm. Kết quả 2 từ Tập đoàn Điện lực Việt Nam, khá mới. Kết quả 3 từ <b>Bộ Công Thương</b> (cơ quan chính phủ) – đáng tin cậy nhất."},
  dg:{type:"open", label:"NV2 – Bước 3: Đánh giá", q:"Đánh giá lợi ích của thông tin em tìm được bằng cách trả lời: Thông tin có thực sự phù hợp với nội dung trình bày không? Nguồn tin có đáng tin cậy không?",
    k:"Ví dụ: thông tin “Quy hoạch điện VIII” <b>phù hợp</b> với câu hỏi về năng lượng tái tạo trong tương lai; nguồn là Bộ Công Thương nên <b>đáng tin cậy</b>. Còn kiến thức chung về các nguồn năng lượng thì không đáp ứng được yêu cầu dự báo phát triển, nên không dùng cho phần đó."},
  bd:{type:"mcq", label:"NV3 – Đọc trang nội dung", q:"Theo trang nội dung “Quy hoạch cơ cấu nguồn điện” (Hình 3.3), tỉ lệ điện gió và điện mặt trời cộng lại thay đổi thế nào từ năm 2030 đến năm 2045?",
    o:["Giảm từ 42% xuống 27%.","Tăng từ 27% lên 42%.","Không thay đổi.","Tăng từ 14% lên 22%."], a:1,
    k:"Năm 2030: 14% + 13% = <b>27%</b>; năm 2045: 22% + 20% = <b>42%</b>. Tỉ lệ điện gió và điện mặt trời tăng mạnh, trong khi nhiệt điện than giảm từ 28% xuống 18%."},
  bt:{type:"open", label:"NV3 – Bước 1, 2: Tạo và biên tập", q:"Tạo bài trình chiếu theo cấu trúc đã định và biên tập nội dung (mỗi trang không quá 6 mục, mỗi mục không quá 2 dòng; dùng phần mềm xử lí ảnh để tạo, sửa hình minh hoạ). Báo cáo: bài của em gồm những trang nào, dùng tư liệu nào?",
    k:"Ví dụ: (1) Tiêu đề; (2) Dàn ý; (3) Giới thiệu chủ đề; (4) Năng lượng tái tạo là gì?; (5) Nguồn năng lượng sản xuất điện tại tỉnh…; (6) Quy hoạch cơ cấu nguồn điện (bảng Hình 3.3); (7) Nhà máy điện tương lai; (8) Kết luận; (9) Tài liệu tham khảo (Hình 3.4). Có ảnh nhà máy điện gió, tấm pin mặt trời."},
  cs:{type:"open", label:"NV3 – Bước 3: Chia sẻ", q:"Em chọn phương tiện kĩ thuật số nào để chia sẻ bài trình chiếu (thư điện tử, mạng xã hội, không gian lưu trữ dùng chung,…)? Giải thích lựa chọn theo các tiêu chí: dễ sử dụng và an toàn dữ liệu.",
    k:"Ví dụ: chọn <b>không gian lưu trữ dùng chung</b> (Google Drive, OneDrive): dễ sử dụng (gửi một liên kết, mọi người cùng xem, cùng sửa), an toàn (chỉ chia sẻ cho người cần, đặt quyền xem/sửa, có bản sao lưu). Thư điện tử cũng an toàn nhưng tệp lớn khó gửi; mạng xã hội dễ dùng nhưng dễ lan truyền ngoài ý muốn."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Để tìm hiểu về cách sử dụng một chiếc máy ảnh mới, nguồn thông tin nào sau đây cần được tham khảo nhất?",
    o:["Hướng dẫn của một người đã từng chụp ảnh.","Hướng dẫn sử dụng của nhà sản xuất.","Hướng dẫn của một người giỏi Tin học.","Câu trả lời trên một số diễn đàn về chụp ảnh."], a:1,
    k:"<b>Hướng dẫn sử dụng của nhà sản xuất</b> là nguồn có thẩm quyền, chính xác và đầy đủ nhất về chiếc máy ảnh đó."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Để tìm hiểu về một đội bóng đá ở châu Phi, nguồn thông tin nào sau đây đáng tin cậy nhất?",
    o:["Nguồn tin từ câu lạc bộ người hâm mộ đội bóng đó.","Nguồn tin từ câu lạc bộ của đội bóng đối thủ.","Nguồn tin từ Liên đoàn bóng đá châu Phi.","Nguồn tin từ diễn đàn Bóng đá Việt Nam."], a:2,
    k:"<b>Liên đoàn bóng đá châu Phi</b> là tổ chức có thẩm quyền, khách quan. Người hâm mộ có thể thiên vị, đội đối thủ có thể hạ thấp, diễn đàn ở xa thiếu thông tin chính xác."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy tìm thông tin về một đội bóng, một cầu thủ hay một nghệ sĩ mà em hâm mộ. Hãy đánh giá những nguồn thông tin tìm được.",
    k:"Học sinh tự làm. Cần ghi theo mẫu Bảng 3.1 (nội dung, địa chỉ, nguồn gốc, thời gian) và đánh giá: nguồn có <b>thẩm quyền</b> không (trang chính thức, liên đoàn, báo uy tín); thông tin có <b>mới</b> không; có <b>phù hợp</b> với điều em cần tìm hiểu không."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Hình thành ý tưởng: chọn một khía cạnh cụ thể, phát triển thành các <b>câu hỏi</b> theo trình tự lôgic để thuận lợi cho việc tìm tư liệu.</li><li>Xác định cấu trúc, yêu cầu cụ thể của bài trình chiếu trước khi tìm kiếm.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Ghi chép kết quả tìm kiếm (nội dung, địa chỉ, nguồn gốc, thời gian) để thuận tiện đánh giá và tham khảo.</li><li>Trước khi dùng thông tin, cần đánh giá: thông tin có <b>phù hợp</b> không? Nguồn tin có <b>đáng tin cậy</b> không?</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Tạo bài trình chiếu theo cấu trúc đã định, biên tập nội dung ngắn gọn, có hình ảnh minh hoạ.</li><li>Chọn phương tiện chia sẻ <b>dễ sử dụng</b> và <b>an toàn dữ liệu</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Năng lượng tái tạo: <b>gió, mặt trời, nước, sinh khối</b> – không cạn kiệt.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 1. Ý tưởng và cấu trúc</p><ul>'
    + "<li>Chọn vấn đề cụ thể → đặt <b>câu hỏi</b> để tìm tư liệu.</li>"
    + "<li>Cấu trúc: tiêu đề → dàn ý → giới thiệu → nội dung → kết luận → tài liệu tham khảo.</li>"
    + "<li>Mỗi trang <b>≤ 6 mục</b>, mỗi mục <b>≤ 2 dòng</b>, có hình minh hoạ.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 2. Tìm kiếm và đánh giá thông tin</p><ul>'
    + "<li>Tìm bằng <b>từ khoá</b>, ghi chép: nội dung, địa chỉ, nguồn, thời gian.</li>"
    + "<li>Đánh giá: <b>phù hợp</b> không? <b>Tin cậy</b> không? (trang <b>.gov.vn</b> đáng tin hơn diễn đàn).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 3. Xử lí và trao đổi thông tin</p><ul>'
    + "<li><b>Tạo</b> → <b>biên tập</b> → <b>chia sẻ</b> bài trình chiếu.</li>"
    + "<li>Chia sẻ: chọn cách <b>dễ dùng, an toàn dữ liệu</b> (lưu trữ dùng chung, thư điện tử).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Ưu tiên nguồn <b>có thẩm quyền</b>: nhà sản xuất, liên đoàn, cơ quan nhà nước.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Tìm thông tin → ghi nguồn → đánh giá <b>thẩm quyền, độ mới, sự phù hợp</b>.</li>"
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
    return ["T8B3." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Nhóm phân biệt đúng năng lượng tái tạo và nhiên liệu hoá thạch."],
        fix:["Nguồn đó có bị dùng hết không? Có tự tạo lại được không?"]},
  kd2: {ok:["Em nêu được lí do và các bước khai thác thông tin."],
        fix:["Em nêu thêm: để làm bài trình chiếu, em cần làm những bước nào?"]},
  yt:  {ok:["Vấn đề cụ thể, câu hỏi rõ ràng, có trình tự."],
        fix:["Em chọn vấn đề cụ thể hơn và viết thành các câu hỏi để tìm tư liệu."]},
  ct:  {ok:["Chính xác cấu trúc bài trình chiếu."],
        fix:["Trang dàn ý nằm ngay sau trang tiêu đề; tài liệu tham khảo ở cuối cùng."]},
  yc:  {ok:["Nhóm nắm chắc yêu cầu của bài trình chiếu."],
        fix:["Em đọc lại Bước 3 của Nhiệm vụ 1: mỗi trang tối đa mấy mục, mỗi mục tối đa mấy dòng?"]},
  tk:  {ok:["Ghi chép đủ 4 cột, nguồn rõ ràng. Rất tốt!"],
        fix:["Em ghi đủ: nội dung, địa chỉ trang web, nguồn gốc, thời gian."]},
  gov: {ok:["Chính xác! Trang .gov.vn của cơ quan chính phủ đáng tin cậy nhất."],
        fix:["Em quan sát địa chỉ trang web ở Hình 3.1: đuôi .gov.vn là của ai?"]},
  b31: {ok:["Nhóm đánh giá đúng độ tin cậy của từng kết quả."],
        fix:["Em xét: nguồn là diễn đàn hay cơ quan nhà nước? Thông tin năm nào?"]},
  dg:  {ok:["Em đánh giá rõ cả sự phù hợp và độ tin cậy."],
        fix:["Em trả lời đủ hai câu: có phù hợp không? nguồn có tin cậy không?"]},
  bd:  {ok:["Chính xác! Tăng từ 27% lên 42%."],
        fix:["Em cộng tỉ lệ điện gió và điện mặt trời ở cột năm 2030 và cột năm 2045."]},
  bt:  {ok:["Bài trình chiếu đúng cấu trúc, có tư liệu tin cậy."],
        fix:["Em kiểm tra lại: mỗi trang có quá 6 mục không? Đã có trang tài liệu tham khảo chưa?"]},
  cs:  {ok:["Lựa chọn hợp lí, giải thích rõ theo hai tiêu chí."],
        fix:["Em giải thích theo hai tiêu chí: dễ sử dụng và an toàn dữ liệu."]},
  lt1: {ok:["Chính xác! Hướng dẫn của nhà sản xuất."],
        fix:["Ai hiểu rõ nhất về chiếc máy ảnh đó?"]},
  lt2: {ok:["Chính xác! Liên đoàn bóng đá châu Phi."],
        fix:["Nguồn nào có thẩm quyền và khách quan nhất?"]},
  vd1: {ok:["Em đánh giá nguồn tin rõ ràng, có căn cứ."],
        fix:["Em ghi rõ nguồn và đánh giá nguồn đó có thẩm quyền không, có mới không."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kd1: "Em xét lại: nguồn đó có thể cạn kiệt hay không?",
  yc: "Em đọc lại Bước 3 của Nhiệm vụ 1.",
  b31: "Em xét nguồn gốc (diễn đàn hay cơ quan nhà nước) và thời gian của thông tin."
};
const MATCH_HINT = {};
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
    {title:"Năng lượng tái tạo", tasks:["kd1","kd2"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Thực hành", title:"NV1: Ý tưởng, cấu trúc", acts:[
    {title:"Bước 1, 2: Ý tưởng", tasks:["yt"]},
    {title:"Bước 3: Cấu trúc và yêu cầu", tasks:["ct","yc"], concept:"c1"},
    {title:"Ghi bài: Nhiệm vụ 1", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"NV2: Tìm kiếm, đánh giá", acts:[
    {title:"Bước 1, 2: Tìm kiếm và ghi chép", tasks:["tk"]},
    {title:"Bước 3: Đánh giá thông tin", tasks:["gov","b31","dg"], concept:"c2"},
    {title:"Ghi bài: Nhiệm vụ 2", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"NV3: Xử lí, trao đổi", acts:[
    {title:"Bước 1, 2: Tạo và biên tập", tasks:["bd","bt"]},
    {title:"Bước 3: Chia sẻ", tasks:["cs"], concept:"c3"},
    {title:"Ghi bài: Nhiệm vụ 3", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Chọn nguồn thông tin", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Đánh giá nguồn thông tin", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai3", title: "Bài 3. Thực hành: Khai thác thông tin số", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 lấy thông tin từ diễn đàn năm 2008 mà chưa đối chiếu vì…",
  commentPh: "Ví dụ: Nhóm ghi chép đủ nguồn; cần rút gọn chữ trên trang chiếu (không quá 6 mục)."};
})();
