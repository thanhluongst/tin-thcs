/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Đọc đoạn mở đầu. Theo em, vì sao ứng xử trên mạng có văn hoá và sử dụng Internet hợp lí lại giúp chúng ta có cuộc sống văn minh, an toàn hơn? Em đã từng nghe về sự việc đáng tiếc nào liên quan đến việc sử dụng mạng chưa?",
    k:"Internet có <b>hai mặt</b>: rất có ích nhưng cũng có tác động tiêu cực. Nhiều sự việc đau lòng xảy ra do <b>bắt nạt trên mạng</b>, <b>nghiện Internet</b>, nghiện trò chơi trực tuyến,… Ứng xử văn hoá, đúng quy tắc giúp bảo vệ mình và người khác."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Em biết những phương thức giao tiếp qua mạng nào? Em đã từng sử dụng những phương thức nào?",
    k:"Gửi, nhận <b>thư điện tử</b>; <b>nhắn tin</b>, nói chuyện trực tuyến qua các ứng dụng (Zalo, Messenger,…); trao đổi trên <b>diễn đàn</b>, <b>mạng xã hội</b>,…"},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Theo em những đặc điểm khác nhau giữa giao tiếp gặp gỡ trực tiếp và giao tiếp qua mạng là gì?",
    k:"Qua mạng: <b>không nhìn thấy</b> nét mặt, cử chỉ; có thể <b>giấu tên</b>; giao tiếp với <b>rất nhiều người</b>, kể cả người lạ; thông tin lan nhanh, khó xoá. Trực tiếp: thấy nhau, biết rõ người đối diện, phản hồi ngay."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Tại sao có những bạn khi giao tiếp qua mạng lại thiếu văn minh hơn so với khi giao tiếp trực tiếp?",
    k:"Vì nghĩ rằng <b>không ai nhìn thấy, không ai biết mình là ai</b>, không thấy được cảm xúc của người kia; các mối quan hệ trên mạng rộng, đa dạng, <b>khó kiểm soát</b> hơn ngoài đời thực."},
  hd2:{type:"sort", label:"HĐ2 – Nên hay không nên?", q:"Thảo luận và sắp xếp mỗi việc dưới đây vào nhóm Nên hoặc Không nên khi giao tiếp qua mạng.",
    cats:["Nên","Không nên"],
    items:[["a) Tôn trọng mọi người khi giao tiếp qua mạng.",0],["b) Giấu bố mẹ, thầy cô vấn đề khiến em căng thẳng, sợ hãi khi sử dụng mạng.",1],["c) Sử dụng ngôn ngữ, hình ảnh, biểu tượng,… văn minh, lịch sự.",0],["d) Bảo vệ tài khoản cá nhân trên mạng (ví dụ thư điện tử) của mình.",0],["e) Nói bậy, nói xấu người khác, sử dụng tiếng lóng, hình ảnh không lành mạnh.",1],["f) Tìm sự hỗ trợ của bố mẹ, thầy cô, người tư vấn khi bị bắt nạt trên mạng.",0],["g) Đưa thông tin, hình ảnh cá nhân của người khác lên mạng khi chưa được họ cho phép.",1],["h) Dành quá nhiều thời gian truy cập mạng, ảnh hưởng tới học tập và sinh hoạt.",1],["i) Tự chủ bản thân để sử dụng mạng hợp lí.",0],["j) Đọc thông tin trong hộp thư điện tử của người khác.",1]],
    k:"<b>Nên</b>: a, c, d, f, i. <b>Không nên</b>: b, e, g, h, j. Luôn sử dụng <b>ngôn ngữ lịch sự</b> và ứng xử có văn hoá khi tham gia giao tiếp qua mạng."},
  p24a:{type:"mcq", label:"Câu hỏi tr.24 – câu 1", q:"Cách tốt nhất em nên làm khi bị ai đó bắt nạt trên mạng là gì?",
    o:["Nói lời xúc phạm người đó.","Cố gắng quên đi và tiếp tục chịu đựng.","Nhờ bố mẹ, thầy cô giáo giúp đỡ, tư vấn.","Đe doạ người bắt nạt mình."], a:2,
    k:"<b>C</b>. Nhờ <b>bố mẹ, thầy cô</b> giúp đỡ, tư vấn. Không đáp trả bằng lời xúc phạm, đe doạ; cũng không im lặng chịu đựng một mình."},
  p24b:{type:"open", label:"Câu hỏi tr.24 – câu 2", q:"Là một người ứng xử có văn hoá khi tham gia giao tiếp qua mạng, em sẽ có những hành động cụ thể nào? (Gợi ý: không nên có lời nói, cách ứng xử nào qua mạng mà em không thực hiện như vậy khi gặp trực tiếp!)",
    k:"Ví dụ: chào hỏi, xưng hô lịch sự; không nói bậy, không bình luận xúc phạm; không chia sẻ ảnh, thông tin của người khác khi chưa được phép; kiểm chứng trước khi chia sẻ; <b>không nói qua mạng điều mình không nói khi gặp trực tiếp</b>."},
  hd3:{type:"open", label:"HĐ3 – Xử lí tình huống", q:"Khi em đang truy cập mạng, máy tính thỉnh thoảng lại hiện lên những trang web có nội dung bạo lực, nội dung không phù hợp với lứa tuổi của em, em sẽ làm gì?",
    k:"<b>Đóng ngay</b> trang web đó; không nháy vào, không chia sẻ cho bạn; <b>báo cho bố mẹ, thầy cô</b> để được giúp đỡ, nhờ cài phần mềm chặn trang web xấu."},
  p25:{type:"sort", label:"Câu hỏi tr.25", q:"Những cách ứng xử nào sau đây là hợp lí khi truy cập một trang web có nội dung xấu?",
    cats:["Hợp lí","Không hợp lí"],
    items:[["A. Tiếp tục truy cập trang web đó.",1],["B. Đóng ngay trang web đó.",0],["C. Đề nghị bố mẹ, thầy cô hoặc người có trách nhiệm ngăn chặn truy cập trang web đó.",0],["D. Gửi trang web đó cho bạn bè xem.",1]],
    k:"Hợp lí: <b>B</b> và <b>C</b>. Tiếp tục truy cập hay gửi cho bạn bè xem đều làm thông tin xấu ảnh hưởng tới mình và lan rộng hơn."},
  hd4a:{type:"open", label:"HĐ4 – Câu 1, 2", q:"1. Trung bình một ngày em sử dụng máy tính bao nhiêu giờ? 2. Em có chơi trò chơi điện tử và sử dụng mạng xã hội không? Nếu có thì khoảng bao nhiêu giờ một tuần?",
    k:"Học sinh tự trả lời trung thực. Giáo viên tổng hợp để cả lớp tự so sánh, nhận ra ai đang dùng quá nhiều thời gian."},
  hd4b:{type:"open", label:"HĐ4 – Câu 3", q:"Theo em các biểu hiện và tác hại của bệnh nghiện Internet là gì?",
    k:"Biểu hiện: chơi trò chơi điện tử quá nhiều, dùng mạng xã hội liên tục, ảnh hưởng tới gia đình, bạn bè, học tập. Tác hại: <b>thiếu giao tiếp</b> với thế giới xung quanh, <b>khó tập trung</b> học tập, tăng nguy cơ <b>bắt nạt trên mạng</b>, bị <b>dẫn dắt</b> đến thông tin xấu, <b>nghiện trò chơi</b> trực tuyến."},
  tachai:{type:"sort", label:"Đọc hiểu – Tác hại của nghiện Internet", q:"Đọc mục 3 (SGK trang 25–26). Mỗi tình huống dưới đây thể hiện tác hại nào của nghiện Internet?",
    cats:["Thiếu giao tiếp","Khó tập trung học tập","Bắt nạt trên mạng","Dẫn dắt tới thông tin xấu","Nghiện trò chơi trực tuyến"],
    items:[["Nam chỉ muốn ở một mình trong phòng với máy tính, không muốn nói chuyện với ai.",0],["Cứ 10 phút Lan lại mở điện thoại xem tin nhắn nên làm bài mãi không xong.",1],["Một bạn gửi tin nhắn chê bạn khác là “béo, xấu xí”.",2],["Đang xem video học tập, Hùng nháy theo các đường liên kết rồi lạc vào trang có nội dung bạo lực.",3],["Minh thấy bồn chồn, cáu gắt mỗi khi không được chơi trò chơi trực tuyến.",4]],
    k:"Năm tác hại: <b>thiếu giao tiếp</b>, <b>khó tập trung</b>, tăng nguy cơ <b>bắt nạt trên mạng</b>, dễ bị <b>dẫn dắt</b> đến trang thông tin xấu, dễ bị <b>nghiện trò chơi</b>. Nghiện Internet ảnh hưởng xấu tới sức khoẻ thể chất, tinh thần, kết quả học tập và khả năng giao tiếp."},
  loikhuyen:{type:"sort", label:"Đọc hiểu – Lời khuyên phòng tránh", q:"Mỗi việc làm dưới đây ứng với lời khuyên nào: Chia sẻ, Rời xa, Giới hạn hay Theo đuổi?",
    cats:["Chia sẻ","Rời xa","Giới hạn","Theo đuổi"],
    items:[["Kể với mẹ khi em thấy mình dùng điện thoại quá nhiều.",0],["Đặt máy tính ở phòng khách thay vì trong phòng ngủ.",1],["Cài phần mềm giới hạn mỗi ngày chỉ dùng máy 1 giờ.",2],["Tham gia câu lạc bộ bóng đá, đọc sách mỗi tối.",3]],
    k:"<b>Chia sẻ</b> với người tin tưởng; <b>Rời xa</b>: đưa thiết bị ra nơi sinh hoạt chung; <b>Giới hạn</b> thời gian sử dụng; <b>Theo đuổi</b> sở thích, thói quen tốt (thể thao, đọc sách, từ thiện)."},
  hd5:{type:"open", label:"HĐ5 – Hồi sinh cây", q:"Cùng nhóm vẽ cây (hoặc dùng cây trong bảng mô phỏng), ghi lên lá, hoa những điều nên làm để phòng tránh bệnh nghiện Internet. Nhóm em đã ghi những điều gì?",
    k:"Ví dụ: đặt giới hạn thời gian dùng máy; để máy ở phòng chung; chơi thể thao, đọc sách; trò chuyện với gia đình; ngủ đủ giấc; tắt thông báo khi học; tham gia hoạt động tình nguyện,…"},
  lt1:{type:"sort", label:"Luyện tập – câu 1", q:"Khi giao tiếp qua mạng, những điều nào sau đây nên tránh?",
    cats:["Nên tránh","Không cần tránh (nên làm)"],
    items:[["A. Tôn trọng người đang giao tiếp với mình.",1],["B. Nói bất cứ điều gì xuất hiện trong đầu.",0],["C. Kết bạn với những người mình không quen biết.",0],["D. Bảo vệ thông tin cá nhân của mình.",1],["E. Truy cập bất cứ liên kết nào nhận được.",0]],
    k:"Nên tránh: <b>B, C, E</b>. A và D là những việc nên làm."},
  lt2:{type:"sort", label:"Luyện tập – câu 2", q:"Theo em, hai hoạt động trên mạng nào sau đây dễ gây bệnh nghiện Internet nhất?",
    cats:["Dễ gây nghiện nhất","Ít gây nghiện hơn"],
    items:[["A. Chơi trò chơi trực tuyến.",0],["B. Đọc tin tức.",1],["C. Sử dụng mạng xã hội.",0],["D. Học tập trực tuyến.",1],["E. Trao đổi thông tin qua thư điện tử.",1]],
    k:"<b>A</b> và <b>C</b>: trò chơi trực tuyến và mạng xã hội dễ cuốn người dùng vào liên tục, khó dừng lại."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Em hãy cùng một nhóm bạn tạo ra một sản phẩm (áp phích, đoạn kịch ngắn, sơ đồ tư duy, bài trình chiếu,…) về chủ đề “Ứng xử trên mạng” để trình bày với các bạn trong lớp. Mô tả ngắn sản phẩm của nhóm.",
    k:"Học sinh tự làm. Sản phẩm tốt nêu được: những điều nên và không nên khi giao tiếp qua mạng, cách xử lí khi gặp thông tin xấu, bị bắt nạt, cách phòng tránh nghiện Internet."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Nếu một trong những người bạn của em có biểu hiện nghiện trò chơi trực tuyến, em sẽ làm gì để giúp bạn?",
    k:"Trò chuyện, chia sẻ với bạn về tác hại; rủ bạn chơi thể thao, đọc sách, tham gia hoạt động chung; nhắc bạn đặt giới hạn thời gian; nếu cần, <b>báo với thầy cô, bố mẹ</b> của bạn để cùng giúp đỡ."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Luôn sử dụng <b>ngôn ngữ lịch sự</b> và ứng xử có văn hoá khi tham gia giao tiếp qua mạng.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Chỉ truy cập vào các trang web có thông tin <b>phù hợp với lứa tuổi</b>.</li><li>Nhờ người lớn cài phần mềm <b>chặn truy cập</b> các trang web xấu.</li><li>Hỏi ý kiến người lớn trong trường hợp cần thiết khi truy cập mạng.</li><li><b>Đóng ngay</b> các trang thông tin có nội dung xấu, không phù hợp lứa tuổi nếu vô tình truy cập vào.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Nghiện Internet gây ảnh hưởng xấu tới <b>sức khoẻ</b> thể chất, tinh thần, <b>kết quả học tập</b> và khả năng <b>giao tiếp</b> với mọi người xung quanh.</li><li>Dành thời gian với người thân và bạn bè, hạn chế để thiết bị kết nối Internet trong phòng riêng, <b>giới hạn thời gian</b> sử dụng, theo đuổi những sở thích không liên quan quá nhiều đến thiết bị điện tử là những cách thức tốt để phòng tránh nguy cơ nghiện Internet.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Ứng xử <b>có văn hoá</b>, dùng Internet <b>hợp lí</b> → cuộc sống văn minh, an toàn.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Giao tiếp có văn hoá qua mạng</p><ul>'
    + "<li>Dùng <b>ngôn ngữ lịch sự</b>, tôn trọng mọi người.</li>"
    + "<li>Không đăng thông tin người khác khi <b>chưa được phép</b>.</li>"
    + "<li>Bị bắt nạt → nhờ <b>bố mẹ, thầy cô</b> giúp đỡ.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Gặp thông tin xấu trên mạng</p><ul>'
    + "<li>Chỉ vào trang web <b>phù hợp lứa tuổi</b>.</li>"
    + "<li>Gặp trang xấu → <b>đóng ngay</b>, báo người lớn, nhờ <b>cài phần mềm chặn</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Bệnh nghiện Internet</p><ul>'
    + "<li>Tác hại: hại <b>sức khoẻ</b>, <b>học tập</b>, <b>giao tiếp</b>.</li>"
    + "<li>Phòng tránh: <b>Chia sẻ – Rời xa – Giới hạn – Theo đuổi</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tránh: nói bừa, kết bạn người lạ, mở <b>liên kết lạ</b>. Dễ nghiện: <b>trò chơi, mạng xã hội</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Bạn nghiện trò chơi → <b>trò chuyện</b>, rủ hoạt động khác, báo <b>người lớn</b>.</li>"
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
    return ["T7B5." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Em nêu được hai mặt của Internet."],
        fix:["Internet có tác động tiêu cực nào? Đọc lại đoạn mở đầu."]},
  hd1a:{ok:["Kể đủ các phương thức giao tiếp qua mạng."],
        fix:["Ngoài nhắn tin, còn thư điện tử, diễn đàn, mạng xã hội."]},
  hd1b:{ok:["So sánh rõ ràng."],
        fix:["Qua mạng em có nhìn thấy nét mặt người kia không?"]},
  hd1c:{ok:["Em hiểu đúng nguyên nhân."],
        fix:["Trên mạng, người ta có nghĩ là không ai biết mình không?"]},
  hd2: {ok:["Nhóm phân loại đúng Nên – Không nên."],
        fix:["Việc đó có tôn trọng người khác và bảo vệ bản thân không?"]},
  p24a:{ok:["Chính xác! Nhờ bố mẹ, thầy cô."],
        fix:["Đáp trả hay im lặng chịu đựng có giải quyết được không?"]},
  p24b:{ok:["Hành động cụ thể, văn minh."],
        fix:["Em nêu việc làm cụ thể: xưng hô, bình luận, chia sẻ ảnh…"]},
  hd3: {ok:["Cách xử lí đúng: đóng trang, báo người lớn."],
        fix:["Em có nên tiếp tục xem hay gửi cho bạn không?"]},
  p25: {ok:["Chính xác! B và C."],
        fix:["Gửi cho bạn xem có làm thông tin xấu lan rộng không?"]},
  hd4a:{ok:["Cảm ơn em đã trả lời trung thực."],
        fix:["Em ước lượng số giờ cụ thể nhé."]},
  hd4b:{ok:["Nêu được nhiều tác hại."],
        fix:["Nghiện Internet ảnh hưởng tới sức khoẻ, học tập thế nào?"]},
  tachai:{ok:["Nhận ra đúng từng tác hại."],
        fix:["Em đọc lại năm tác hại ở trang 25–26."]},
  loikhuyen:{ok:["Áp dụng đúng bốn lời khuyên."],
        fix:["Rời xa = đưa máy ra khỏi phòng riêng; Giới hạn = đặt thời gian."]},
  hd5: {ok:["Cây của nhóm xanh tươi với nhiều việc làm hay!"],
        fix:["Em bổ sung việc làm không liên quan đến thiết bị điện tử."]},
  lt1: {ok:["Chính xác! B, C, E nên tránh."],
        fix:["Tôn trọng người khác, bảo vệ thông tin có cần tránh không?"]},
  lt2: {ok:["Chính xác! Trò chơi và mạng xã hội."],
        fix:["Hoạt động nào khiến người ta khó dừng lại nhất?"]},
  vd1: {ok:["Sản phẩm sáng tạo, đúng chủ đề."],
        fix:["Em bổ sung cách xử lí khi gặp thông tin xấu, bị bắt nạt."]},
  vd2: {ok:["Cách giúp bạn chân thành, hợp lí."],
        fix:["Em có thể nhờ ai cùng giúp bạn?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  hd2: "Em tự hỏi: việc này có tôn trọng người khác và an toàn cho mình không?",
  p25: "Việc nào giúp thông tin xấu không lan rộng?",
  tachai: "Đọc lại năm tác hại ở trang 25–26.",
  loikhuyen: "Xem lại bảng bốn lời khuyên ở trang 27.",
  lt1: "Việc nào có thể gây nguy hiểm cho em?",
  lt2: "Hoạt động nào khó dừng lại nhất?"
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Internet có hai mặt", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Giao tiếp có văn hoá", acts:[
    {title:"Hoạt động 1: Ngôn ngữ giao tiếp qua mạng", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Hoạt động 2: Nên hay không nên?", tasks:["hd2"], concept:"c1"},
    {title:"Câu hỏi SGK trang 24", tasks:["p24a","p24b"]},
    {title:"Ghi bài: Giao tiếp có văn hoá", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Gặp thông tin xấu", acts:[
    {title:"Hoạt động 3: Xử lí tình huống", tasks:["hd3"], concept:"c2"},
    {title:"Câu hỏi SGK trang 25", tasks:["p25"]},
    {title:"Ghi bài: Gặp thông tin xấu", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Nghiện Internet", acts:[
    {title:"Hoạt động 4: Biểu hiện và tác hại", tasks:["hd4a","hd4b"]},
    {title:"Đọc hiểu: Tác hại, lời khuyên", tasks:["tachai","loikhuyen"], concept:"c3"},
    {title:"Hoạt động 5: Hồi sinh cây", tasks:["hd5"]},
    {title:"Ghi bài: Nghiện Internet", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Sản phẩm nhóm, giúp bạn", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai5", title: "Bài 5. Ứng xử trên mạng", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 xếp “giấu bố mẹ” vào nhóm Nên vì…",
  commentPh: "Ví dụ: Nhóm phân loại đúng; cần nêu cách xử lí khi bị bắt nạt."};
})();
