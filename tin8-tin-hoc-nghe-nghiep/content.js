/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"An, Minh, Khoa sôi nổi trò chuyện về chủ đề: Những nghề nghiệp mà ứng dụng tin học giúp tăng hiệu quả công việc rõ ràng nhất. An nói về nghề kế toán, Khoa nói về nghề giáo viên, Minh nói về nghề hoạ sĩ. Còn ý kiến của em thì sao?",
    k:"Gợi ý: hầu hết các nghề đều được tin học hỗ trợ: bác sĩ (hồ sơ sức khoẻ điện tử, khám bệnh từ xa), kiến trúc sư (vẽ thiết kế, in 3D), nhà báo (báo điện tử), lái xe (bản đồ, đặt xe),… Em nêu nghề và ví dụ cụ thể."},
  hd1:{type:"open", label:"HĐ1 – Ứng dụng tin học trong nghề nghiệp", q:"Cùng các bạn lựa chọn một vài nghề nghiệp mà em biết để thảo luận và chỉ ra những ví dụ mà tin học được ứng dụng trong các nghề nghiệp đó.",
    k:"Ví dụ: <b>bác sĩ</b> – hồ sơ sức khoẻ điện tử, khám bệnh từ xa; <b>giáo viên</b> – bài giảng điện tử, lớp học trực tuyến; <b>nông dân</b> – tưới nước tự động, IoT; <b>người bán hàng</b> – bán hàng online, phần mềm quản lí."},
  li:{type:"sort", label:"Đọc hiểu – Tin học giúp nâng cao hiệu quả công việc", q:"Mỗi ví dụ dưới đây thể hiện lợi ích nào của việc ứng dụng tin học?",
    cats:["Tăng tốc độ xử lí, tiết kiệm thời gian","Liên lạc, trao đổi thông tin dễ dàng","Làm việc nhóm, mở rộng phạm vi làm việc","Nâng cao tay nghề, hỗ trợ thông tin"],
    items:[["Kế toán tính toán bằng phần mềm chỉ trong vài phút; thanh toán, chuyển tiền gần như lập tức",0],["Tài liệu, tin nhắn công việc được gửi ngay tới đồng nghiệp, khách hàng trên toàn thế giới",1],["Lập trình viên làm việc xuyên biên giới, cùng một tài liệu chia sẻ trên công nghệ đám mây",2],["Lái xe taxi dùng ứng dụng đặt xe, bản đồ, thông báo tình trạng giao thông để tìm đường",3]],
    k:"Bốn lợi ích: tăng <b>tốc độ</b> xử lí; <b>liên lạc</b>, trao đổi thông tin dễ dàng; hỗ trợ <b>làm việc nhóm</b>, mở rộng phạm vi làm việc; nâng cao <b>tay nghề</b>, bổ sung kiến thức, hỗ trợ thông tin."},
  nghe:{type:"sort", label:"Đọc hiểu – Nghề tin học và nghề liên quan", q:"Mỗi nghề dưới đây thuộc lĩnh vực tin học hay là nghề liên quan đến ứng dụng tin học?",
    cats:["Nghề thuộc lĩnh vực tin học","Nghề liên quan đến ứng dụng tin học"],
    items:[["Phát triển phần mềm",0],["Lập trình ứng dụng điện thoại",0],["Quản trị mạng",0],["Phát triển và thiết kế website",0],["Bán hàng online",1],["Streamer (phát sóng trực tiếp trên nền tảng online)",1],["Vlogger (tạo dựng nội dung video, đăng trên mạng xã hội)",1]],
    k:"Lĩnh vực tin học: phát triển phần mềm, lập trình ứng dụng điện thoại, quản trị mạng, phát triển và thiết kế website. Liên quan đến ứng dụng tin học: bán hàng online, streamer, vlogger."},
  h161:{type:"match", label:"Đọc hiểu – Hình 16.1", q:"Ghép mỗi ứng dụng tin học với nghề nghiệp tương ứng trong Hình 16.1.",
    items:[["Hồ sơ sức khoẻ điện tử; khám bệnh từ xa",1],["Đăng bài nhanh chóng trên báo điện tử",2],["Đặt chỗ khách sạn trên website",3],["Phần mềm soạn thảo văn bản, lưu trữ hồ sơ",4],["Phần mềm thiết kế bản vẽ; in 3D tạo mẫu",5],["Tự động điều tiết nước tưới; Internet vạn vật (IoT)",6]],
    opts:["a) Bác sĩ","b) Nhà báo","c) Quản lí du lịch","d) Nhân viên văn phòng","e) Kiến trúc sư","f) Kĩ sư nông nghiệp"],
    k:"Bác sĩ – hồ sơ sức khoẻ, khám từ xa; Nhà báo – báo điện tử; Quản lí du lịch – website đặt chỗ; Nhân viên văn phòng – soạn thảo, lưu trữ; Kiến trúc sư – thiết kế, in 3D; Kĩ sư nông nghiệp – tưới tự động, IoT."},
  p92a:{type:"match", label:"Câu hỏi tr.92 – câu 1", q:"Ghép mỗi ứng dụng ở cột B với một nghề phù hợp nhất ở cột A để chứng minh cho việc ứng dụng của tin học có thể tăng hiệu quả công việc.",
    items:[["1) Bác sĩ",4],["2) Giáo viên",5],["3) Kiến trúc sư",1],["4) Kế toán",3],["5) Nhà báo",2]],
    opts:["a) Tạo bản vẽ 3D để khách hàng có thể hình dung rõ về căn nhà định xây dựng","b) Nhận hình ảnh tin tức thời sự được chụp bởi đồng nghiệp khác để biên tập thành bài báo","c) Tạo một báo cáo tài chính bằng phần mềm bảng tính","d) Theo dõi sức khoẻ, quá trình điều trị của bệnh nhân qua hồ sơ sức khoẻ điện tử","e) Tạo khoá học trực tuyến để học sinh có thể học bất cứ lúc nào, ở bất cứ đâu"],
    k:"1 – d; 2 – e; 3 – a; 4 – c; 5 – b."},
  p92b:{type:"open", label:"Câu hỏi tr.92 – câu 2", q:"Kể ra những ứng dụng tin học mà các thầy cô giáo đã sử dụng để giúp các em nâng cao hiệu quả của việc học tập.",
    k:"Ví dụ: bài giảng trình chiếu, phần mềm mô phỏng, trang học tương tác, lớp học trực tuyến, phần mềm quản lí điểm, kho học liệu số, bài kiểm tra trực tuyến."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Nếu có bạn nào đó nói với em rằng “Nghề nghiệp trong lĩnh vực tin học chỉ nên dành cho nam giới”, em sẽ trả lời bạn như thế nào? Tại sao?",
    k:"Không đúng. Nghề nghiệp trong lĩnh vực tin học, cũng như cơ hội ứng dụng tin học, là <b>bình đẳng cho tất cả mọi người</b>. Môi trường, điều kiện công việc vẫn phù hợp cho phụ nữ phát huy khả năng; ví dụ lập trình viên đầu tiên là một phụ nữ – bà Ada Lovelace."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Em biết những ngành nghề nào thuộc lĩnh vực tin học đang có nhiều phụ nữ làm việc?",
    k:"Ví dụ: kiểm thử phần mềm, phân tích dữ liệu, thiết kế website và giao diện, quản trị cơ sở dữ liệu, lập trình viên, giảng dạy tin học,…"},
  bdg:{type:"sort", label:"Đọc hiểu – Bình đẳng giới", q:"Mỗi ý dưới đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["Tỉ lệ nữ giới làm việc trong các ngành nghề tin học so với nam giới còn khá thấp",0],["Môi trường, điều kiện công việc tin học không phù hợp cho phụ nữ",1],["Ngày Quốc tế trẻ em gái với công nghệ thông tin được tổ chức hằng năm bởi Liên minh Viễn thông Quốc tế (ITU)",0],["DigiGirlz là chiến dịch do Microsoft khởi xướng nhằm truyền cảm hứng cho học sinh nữ theo đuổi ngành khoa học – công nghệ",0],["Lập trình viên đầu tiên trên thế giới là một nam giới",1]],
    k:"Sai: môi trường tin học <b>vẫn phù hợp</b> cho phụ nữ; lập trình viên đầu tiên là một <b>phụ nữ</b> – bà Ada Lovelace (người Anh, sinh năm 1815). Các ý còn lại đúng."},
  p94:{type:"mcq", label:"Câu hỏi tr.94", q:"Phương án nào dưới đây KHÔNG đúng khi nói về việc sử dụng máy tính và ứng dụng tin học?",
    o:["Giúp việc thông tin liên lạc giữa mọi người hiệu quả hơn.","Mọi người được tham gia vào môi trường học tập tốt hơn.","Phụ nữ và trẻ em gái không cần đến máy tính vì không giúp ích nhiều cho họ.","Mọi người đều có cơ hội học hỏi kiến thức để giúp nâng cao chất lượng cuộc sống và chăm sóc sức khoẻ tốt hơn."], a:2,
    k:"<b>C</b> không đúng: máy tính và ứng dụng tin học giúp ích cho <b>tất cả mọi người</b>, kể cả phụ nữ và trẻ em gái."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Phỏng vấn một vài người (bố mẹ, người quen của bố mẹ, thầy cô,…) để tìm hiểu về những ứng dụng tin học giúp họ nâng cao hiệu quả công việc. Ghi lại: người được phỏng vấn, nghề nghiệp, ứng dụng tin học, lợi ích.",
    k:"Ghi đủ: nghề nghiệp, ứng dụng tin học cụ thể (phần mềm, thiết bị, dịch vụ), lợi ích (nhanh hơn, chính xác hơn, liên lạc dễ hơn,…)."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Bất bình đẳng giới trong sử dụng máy tính và ứng dụng tin học có thể dẫn tới hậu quả gì?",
    o:["Phụ nữ và trẻ em gái không có cơ hội phát triển nghề nghiệp trong lĩnh vực công nghệ.","Phụ nữ và trẻ em gái không có cơ hội sử dụng công nghệ để nâng cao hiệu quả công việc và chất lượng cuộc sống.","Phụ nữ và trẻ em gái không theo kịp sự phát triển của xã hội.","Cả ba hậu quả trên."], a:3,
    k:"<b>D</b>. Cả ba hậu quả trên."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Đề xuất với thầy cô giáo và các bạn tổ chức một cuộc thi thuyết trình về ứng dụng tin học trong các nghề nghiệp tại Việt Nam. Tìm hiểu và tạo ra bài thuyết trình của mình, chia sẻ với bạn bè. Ghi lại dàn ý bài thuyết trình.",
    k:"Dàn ý gợi ý: chọn một nghề ở Việt Nam → các ứng dụng tin học cụ thể → lợi ích (số liệu, ví dụ) → nghề tin học liên quan → kết luận. Có thể dùng bản mẫu trình chiếu (Bài 11a)."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Trong vai trò một học sinh lớp 8, em có thể làm gì để thúc đẩy bình đẳng giới ở lứa tuổi của em, ở khía cạnh sử dụng máy tính và ứng dụng tin học trong học tập?",
    k:"Ví dụ: khuyến khích các bạn nữ tham gia CLB Tin học, cuộc thi lập trình; chia sẻ máy tính, thiết bị công bằng khi học nhóm; giới thiệu tấm gương phụ nữ trong công nghệ; không dùng định kiến “con gái không giỏi máy tính”."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Ứng dụng tin học phù hợp trong các ngành nghề sẽ giúp <b>tăng hiệu quả công việc</b>.</li><li>Một số nghề thuộc lĩnh vực tin học và liên quan đến ứng dụng tin học ra đời và phát triển để đáp ứng yêu cầu cuộc sống và công việc.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Nghề nghiệp trong lĩnh vực tin học, cũng như cơ hội ứng dụng tin học để nâng cao hiệu quả công việc của các nghề nghiệp khác, là <b>bình đẳng cho tất cả mọi người</b>.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Rất nhiều nghề được <b>tin học</b> giúp tăng hiệu quả công việc.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tin học giúp nâng cao hiệu quả công việc</p><ul>'
    + "<li>Lợi ích: <b>nhanh</b>, tiết kiệm thời gian; <b>liên lạc</b> dễ; <b>làm việc nhóm</b>, từ xa; nâng cao <b>tay nghề</b>.</li>"
    + "<li>Nghề <b>thuộc lĩnh vực tin học</b>: phát triển phần mềm, lập trình ứng dụng, quản trị mạng, thiết kế website.</li>"
    + "<li>Nghề <b>liên quan</b> đến ứng dụng tin học: bán hàng online, streamer, vlogger.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Bình đẳng giới trong sử dụng máy tính và ứng dụng tin học</p><ul>'
    + "<li>Nghề tin học và cơ hội ứng dụng tin học <b>bình đẳng cho mọi người</b>.</li>"
    + "<li>VD: Ngày Quốc tế trẻ em gái với CNTT (ITU), DigiGirlz; lập trình viên đầu tiên: <b>Ada Lovelace</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Bất bình đẳng giới → phụ nữ, trẻ em gái mất cơ hội nghề nghiệp, nâng cao cuộc sống, theo kịp xã hội.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Thuyết trình về tin học trong nghề nghiệp; cùng các bạn thúc đẩy <b>bình đẳng giới</b> khi học tin học.</li>"
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
    return ["T8B16." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nêu được nghề và ví dụ cụ thể."], fix:["Nêu một nghề và một ứng dụng tin học cụ thể."]},
  hd1: {ok:["Ví dụ phong phú."], fix:["Mỗi nghề nêu ít nhất một phần mềm hoặc thiết bị."]},
  li:  {ok:["Phân loại đúng."], fix:["Đọc lại bốn ý trong SGK trang 92."]},
  nghe:{ok:["Phân loại đúng."], fix:["Nghề nào tạo ra sản phẩm tin học, nghề nào chỉ sử dụng tin học?"]},
  h161:{ok:["Ghép đúng."], fix:["Xem lại sơ đồ Hình 16.1."]},
  p92a:{ok:["Ghép đúng."], fix:["Hồ sơ sức khoẻ điện tử dành cho nghề nào?"]},
  p92b:{ok:["Kể được nhiều ứng dụng."], fix:["Nhớ lại các tiết học có dùng máy chiếu, phần mềm."]},
  hd2a:{ok:["Lập luận thuyết phục."], fix:["Lập trình viên đầu tiên trên thế giới là ai?"]},
  hd2b:{ok:["Nêu được ví dụ."], fix:["Tìm hiểu thêm trên Internet về phụ nữ trong ngành công nghệ."]},
  bdg: {ok:["Chính xác!"], fix:["Đọc lại thông tin về Ada Lovelace."]},
  p94: {ok:["Chính xác!"], fix:["Máy tính có giúp ích cho phụ nữ và trẻ em gái không?"]},
  lt1: {ok:["Phỏng vấn đầy đủ thông tin."], fix:["Ghi rõ ứng dụng cụ thể và lợi ích."]},
  lt2: {ok:["Chính xác!"], fix:["Mỗi phương án A, B, C có phải là hậu quả không?"]},
  vd1: {ok:["Dàn ý rõ ràng."], fix:["Bổ sung ví dụ cụ thể tại Việt Nam."]},
  vd2: {ok:["Việc làm thiết thực."], fix:["Nêu việc cụ thể em có thể làm ở lớp."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {li: "Đọc lại bốn lợi ích ở SGK trang 92.", nghe: "Nghề thuộc lĩnh vực tin học tạo ra phần mềm, mạng, website.", bdg: "Lập trình viên đầu tiên là bà Ada Lovelace."};
const MATCH_HINT = {h161: "Xem lại sơ đồ Hình 16.1.", p92a: "Đọc kĩ từng ứng dụng ở cột B."};
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
    {title:"Nghề nghiệp nào ứng dụng tin học rõ nhất?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Tin học và hiệu quả công việc", acts:[
    {title:"Hoạt động 1: Ứng dụng tin học trong nghề nghiệp", tasks:["hd1"]},
    {title:"Đọc hiểu: Tin học giúp nâng cao hiệu quả công việc", tasks:["li","nghe","h161"], concept:"c1"},
    {title:"Câu hỏi SGK trang 92", tasks:["p92a","p92b"]},
    {title:"Ghi bài: Tin học giúp nâng cao hiệu quả công việc", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Bình đẳng giới", acts:[
    {title:"Hoạt động 2: Bình đẳng giới trong lĩnh vực tin học", tasks:["hd2a","hd2b"]},
    {title:"Đọc hiểu: Bình đẳng giới trong sử dụng máy tính", tasks:["bdg"], concept:"c2"},
    {title:"Câu hỏi SGK trang 94", tasks:["p94"]},
    {title:"Ghi bài: Bình đẳng giới", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Phỏng vấn và hậu quả của bất bình đẳng giới", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Thuyết trình và thúc đẩy bình đẳng giới", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai16", title: "Bài 16. Tin học với nghề nghiệp", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng streamer là nghề thuộc lĩnh vực tin học vì…",
  commentPh: "Ví dụ: Nhóm nêu ví dụ cụ thể; cần phân biệt nghề tin học và nghề ứng dụng tin học."};
})();
