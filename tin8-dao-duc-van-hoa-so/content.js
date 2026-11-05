/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"mcq", label:"Mở đầu – Chọn cách làm", q:"Khoa chia sẻ cho An bức ảnh ruộng bậc thang mà mình đã chụp. Theo em, An nên làm theo cách nào?",
    o:["Trường hợp 1: không hỏi ý kiến Khoa, tự chỉnh sửa ảnh, dùng làm nền cho ảnh của mình, đăng lên mạng xã hội với chú thích “Thật tuyệt khi được đến thăm nơi này”.","Trường hợp 2: xin phép Khoa, chỉnh sửa ảnh rồi đăng lên mạng xã hội với chú thích “Đất nước ta thật là đẹp (người chụp Lê Khoa)”."], a:1,
    k:"An nên làm theo <b>trường hợp 2</b>: An <b>xin phép</b> tác giả, <b>ghi rõ người chụp</b> và chú thích <b>trung thực</b>. Trường hợp 1 không tôn trọng quyền tác giả của Khoa và chú thích làm người xem hiểu nhầm là An đã đến nơi đó (không trung thực)."},
  kd2:{type:"open", label:"Mở đầu – Vì sao?", q:"Vì sao em chọn cách làm đó?",
    k:"Vì bức ảnh là sản phẩm của Khoa: dùng ảnh của người khác phải <b>xin phép</b> và <b>ghi nguồn</b>. Ngoài ra, chú thích phải <b>trung thực</b>, không làm người khác hiểu sai."},
  hd1:{type:"open", label:"HĐ1 – Biểu hiện nào là vi phạm?", q:"Từ hiểu biết của em, hãy thảo luận với các bạn về một vài biểu hiện vi phạm đạo đức và pháp luật hay biểu hiện thiếu văn hoá khi sử dụng công nghệ kĩ thuật số.",
    k:"Ví dụ: quay phim trong rạp chiếu phim; chụp ảnh ở nơi không cho phép; ghi âm trái phép cuộc nói chuyện; tải bài hát, phim có bản quyền mà chưa được phép; sao chép thông tin trên mạng rồi coi là của mình; dùng phần mềm bẻ khoá; livestream, chia sẻ cảnh bạo lực học đường; đưa thông tin cá nhân của người khác lên mạng khi chưa được phép; chia sẻ trang web cổ vũ bạo lực, đánh bạc; bình luận thô tục, xúc phạm người khác."},
  bh:{type:"sort", label:"Đọc hiểu – Có vi phạm không?",
    q:"Đọc mục 1 (SGK trang 18–19). Mỗi hành động dưới đây có vi phạm đạo đức, pháp luật hay thiếu văn hoá không?",
    cats:["Vi phạm","Không vi phạm"],
    items:[["Quay phim trong rạp chiếu phim",0],["Chụp ảnh ở nơi có biển cấm chụp ảnh (Hình 4.1)",0],["Cài phần mềm đã bị bẻ khoá",0],["Phát trực tiếp (livestream) một vụ bạo lực học đường",0],["Nghe nhạc trên ứng dụng có bản quyền",1],["Dùng ảnh của bạn khi đã xin phép và ghi tên tác giả",1]],
    k:"Bốn hành động đầu là vi phạm. Nghe nhạc trên ứng dụng có bản quyền, dùng ảnh khi đã xin phép và ghi tên tác giả là <b>đúng đắn</b>."},
  p19a:{type:"mcq", label:"Câu hỏi tr.19 – câu 1", q:"Hành động nào sau đây KHÔNG vi phạm đạo đức và pháp luật?",
    o:["Đăng tải thông tin sai sự thật lên mạng.","Cố ý nghe, ghi âm trái phép các cuộc nói chuyện.","Tặng đĩa nhạc có bản quyền em đã mua cho người khác.","Tải một bài trình chiếu của người khác từ Internet và sử dụng như là của mình tạo ra."], a:2,
    k:"Đĩa nhạc có bản quyền em đã mua là tài sản của em, <b>tặng cho người khác</b> là hợp pháp. Các hành động còn lại đều vi phạm."},
  p19b:{type:"open", label:"Câu hỏi tr.19 – câu 2", q:"Nêu một vài hành động chưa đúng của em khi sử dụng công nghệ kĩ thuật số mà em đã mắc phải. Nêu cách em sẽ phòng tránh hoặc từ bỏ vi phạm.",
    k:"Học sinh tự liên hệ. Ví dụ: tải phim lậu → chuyển sang xem trên ứng dụng có bản quyền; chép bài văn trên mạng nộp cho cô → tự viết, chỉ tham khảo và ghi nguồn; đăng ảnh bạn khi chưa hỏi → xin phép trước khi đăng; bình luận thiếu văn hoá → suy nghĩ trước khi viết."},
  sp:{type:"sort", label:"Đọc hiểu – Nên hay không nên?",
    q:"Đọc mục 2 (SGK trang 19–20). Khi tạo ra sản phẩm số, việc nào nên làm, việc nào không nên làm?",
    cats:["Nên làm","Không nên"],
    items:[["Dùng ảnh, video do chính mình quay, chụp",0],["Ghi rõ nguồn khi trích dẫn thông tin của người khác",0],["Dùng thông tin giả, không đáng tin cậy cho hấp dẫn",1],["Sao chép bài viết của người khác rồi coi là của mình",1],["Dùng hình ảnh giật gân, ngôn ngữ thiếu lịch sự",1],["Mua hoặc xin phép trước khi dùng tài liệu có bản quyền",0]],
    k:"Khi tạo sản phẩm số cần: <b>luôn trung thực</b> (không dùng tin giả, không sao chép, chỉnh sửa thông tin của người khác rồi coi là của mình); <b>dùng thông tin do mình tự tạo</b>, không dùng tài liệu có bản quyền nếu chưa mua hoặc chưa xin phép; <b>nội dung, hình thức</b> không vi phạm chuẩn mực đạo đức, văn hoá."},
  p20a:{type:"open", label:"Câu hỏi tr.20 – a", q:"Em có cảnh báo và lời khuyên gì với bạn trong tình huống: Bạn em quay video các bạn trong lớp có hành vi bạo lực và đăng lên mạng xã hội.",
    k:"<b>Cảnh báo:</b> đăng video bạo lực là vi phạm pháp luật, lan truyền hình ảnh xấu, làm tổn thương bạn bị đánh. <b>Lời khuyên:</b> gỡ video ngay; không quay, không chia sẻ cảnh bạo lực; khi thấy bạo lực hãy báo cho thầy cô, người lớn để can thiệp."},
  p20b:{type:"open", label:"Câu hỏi tr.20 – b", q:"Em có cảnh báo và lời khuyên gì với bạn trong tình huống: Một người bạn sử dụng ảnh em chụp để tham gia một cuộc thi ảnh nhưng chưa có sự đồng ý của em.",
    k:"<b>Cảnh báo:</b> dùng ảnh của người khác dự thi khi chưa được phép là <b>vi phạm quyền tác giả</b>, không trung thực, có thể bị loại khỏi cuộc thi. <b>Lời khuyên:</b> rút ảnh khỏi cuộc thi; muốn dùng thì phải xin phép và ghi đúng tên tác giả; tốt nhất là tự chụp ảnh để dự thi."},
  lt1:{type:"sort", label:"Luyện tập",
    q:"Em hãy xác định các hành động dưới đây có phạm hay không vi phạm đạo đức, pháp luật và văn hoá khi sử dụng công nghệ kĩ thuật số.",
    cats:["Vi phạm","Không vi phạm"],
    items:[["a) Chia sẻ thông tin mua bán động vật hoang dã quý hiếm.",0],["b) Tạo một trang cá nhân để chia sẻ những kinh nghiệm học tập của mình.",1],["c) Quay và lan truyền video bạo lực học đường.",0],["d) Sáng tác một bài thơ về lớp và gửi bạn bè cùng đọc.",1],["e) Tham gia cá cược bóng đá qua Internet.",0],["f) Chia sẻ địa chỉ một website có chứa các bộ phim không có bản quyền sử dụng.",0]],
    k:"Vi phạm: <b>a, c, e, f</b> (buôn bán động vật hoang dã, bạo lực, cờ bạc, vi phạm bản quyền). Không vi phạm: <b>b, d</b>."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy tạo một sản phẩm số theo cách sáng tạo để hướng dẫn các bạn hiểu đúng về việc sử dụng công nghệ kĩ thuật số, bảo đảm thể hiện được đạo đức, tính văn hoá và không vi phạm pháp luật. Ghi lại: loại sản phẩm, nội dung chính, nguồn hình ảnh, tư liệu em dùng.",
    k:"Ví dụ: <b>poster</b> “5 điều nên làm khi dùng mạng xã hội”, <b>video ngắn</b> tự quay, <b>truyện tranh</b> tự vẽ, bài trình chiếu. Nội dung: xin phép khi dùng ảnh của người khác, ghi nguồn, không chia sẻ tin giả, không bình luận thô tục, không dùng phần mềm lậu. Hình ảnh <b>tự chụp, tự vẽ</b> hoặc lấy từ nguồn cho phép sử dụng miễn phí và ghi nguồn."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Ba điều lưu ý để tránh các vi phạm khi sử dụng công nghệ kĩ thuật số:</p><ul><li>Tìm hiểu thông tin, trang bị cho mình những kiến thức cần thiết.</li><li>Chỉ sử dụng những sản phẩm số khi có sự cho phép của tác giả hoặc có bản quyền sử dụng.</li><li>Hầu hết thông tin trên Internet là có bản quyền.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Cần bảo đảm tính văn hoá, thể hiện được đạo đức và tuân thủ pháp luật khi tạo ra các sản phẩm số, giúp tránh được việc lan truyền thông tin sai trái, đồng thời góp phần tạo ra một xã hội số lành mạnh và hợp pháp.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Dùng ảnh của người khác: <b>xin phép</b>, <b>ghi tên tác giả</b>, chú thích <b>trung thực</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Biểu hiện vi phạm khi sử dụng công nghệ kĩ thuật số</p><ul>'
    + "<li>VD: quay phim trong rạp, chụp ảnh nơi cấm, ghi âm trái phép, dùng phần mềm <b>bẻ khoá</b>, tải phim nhạc <b>không bản quyền</b>, livestream bạo lực.</li>"
    + "<li>Phòng tránh: <b>tìm hiểu</b> luật; chỉ dùng sản phẩm <b>được phép, có bản quyền</b>.</li>"
    + "<li>Hầu hết thông tin trên Internet <b>có bản quyền</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Tạo sản phẩm số đúng quy định</p><ul>'
    + "<li>Luôn <b>trung thực</b>: không tin giả, không sao chép của người khác.</li>"
    + "<li>Dùng thông tin <b>tự tạo</b>; tài liệu có bản quyền phải <b>mua</b> hoặc <b>xin phép</b>.</li>"
    + "<li>Nội dung, hình thức <b>lịch sự, văn hoá</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Vi phạm: buôn bán động vật hoang dã, bạo lực, <b>cá cược</b>, phim <b>không bản quyền</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Sản phẩm số của em: ảnh <b>tự chụp, tự vẽ</b> hoặc được phép dùng, có <b>ghi nguồn</b>.</li>"
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
    return ["T8B4." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Chính xác! An nên xin phép và ghi tên người chụp."],
        fix:["Ảnh do ai chụp? Dùng ảnh của người khác cần làm gì trước?"]},
  kd2: {ok:["Em giải thích rõ: xin phép, ghi nguồn, chú thích trung thực."],
        fix:["Em giải thích thêm: chú thích ở trường hợp 1 có trung thực không?"]},
  hd1: {ok:["Em kể được nhiều biểu hiện vi phạm, rất cụ thể."],
        fix:["Em nghĩ thêm về: quay phim, chụp ảnh, tải phim nhạc, phần mềm bẻ khoá,…"]},
  bh:  {ok:["Nhóm phân biệt đúng hành động vi phạm và không vi phạm."],
        fix:["Em xét lại: hành động đó có được phép không, có xâm phạm quyền của ai không?"]},
  p19a:{ok:["Chính xác! Tặng đĩa nhạc có bản quyền đã mua là hợp pháp."],
        fix:["Đề hỏi hành động KHÔNG vi phạm. Đĩa nhạc em đã mua là của ai?"]},
  p19b:{ok:["Em thẳng thắn nhận ra lỗi và có cách khắc phục cụ thể. Rất đáng khen!"],
        fix:["Em nêu cụ thể cách em sẽ phòng tránh hoặc sửa lỗi đó."]},
  sp:  {ok:["Nhóm nắm chắc những điều cần chú ý khi tạo sản phẩm số."],
        fix:["Em đọc lại ba điều cần chú ý ở mục 2 (SGK trang 20)."]},
  p20a:{ok:["Cảnh báo và lời khuyên rõ ràng, đúng đắn."],
        fix:["Em nêu cả hai: cảnh báo (vi phạm gì) và lời khuyên (bạn nên làm gì)."]},
  p20b:{ok:["Cảnh báo đúng về quyền tác giả, lời khuyên hợp lí."],
        fix:["Bạn dùng ảnh của em khi chưa hỏi là vi phạm gì? Bạn nên làm gì?"]},
  lt1: {ok:["Nhóm xác định đúng tất cả các hành động."],
        fix:["Em xét lại: cá cược qua mạng, chia sẻ web phim lậu có vi phạm không?"]},
  vd1: {ok:["Sản phẩm sáng tạo, nội dung đúng, có ghi nguồn tư liệu."],
        fix:["Em ghi rõ nguồn hình ảnh, tư liệu em dùng.","Em bổ sung nội dung hướng dẫn cụ thể hơn."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  bh: "Em xét lại: hành động đó có được phép không, có xâm phạm quyền của ai không?",
  sp: "Em đọc lại ba điều cần chú ý ở mục 2.",
  lt1: "Em xét lại: hành động đó có vi phạm pháp luật (cờ bạc, bản quyền, động vật hoang dã) không?"
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
    {title:"An nên làm theo cách nào?", tasks:["kd1","kd2"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Biểu hiện vi phạm", acts:[
    {title:"Hoạt động 1: Biểu hiện nào là vi phạm?", tasks:["hd1"]},
    {title:"Đọc hiểu: Một số biểu hiện vi phạm", tasks:["bh"], concept:"c1"},
    {title:"Câu hỏi SGK trang 19", tasks:["p19a","p19b"]},
    {title:"Ghi bài: Biểu hiện vi phạm", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Tạo sản phẩm số đúng quy định", acts:[
    {title:"Đọc hiểu: Những điều cần chú ý", tasks:["sp"], concept:"c2"},
    {title:"Câu hỏi SGK trang 20", tasks:["p20a","p20b"]},
    {title:"Ghi bài: Tạo sản phẩm số", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Có vi phạm hay không?", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Sản phẩm số hướng dẫn các bạn", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai4", title: "Bài 4. Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng chia sẻ link phim lậu không vi phạm vì…",
  commentPh: "Ví dụ: Nhóm nêu đúng cảnh báo; cần bổ sung lời khuyên cụ thể cho bạn."};
})();
