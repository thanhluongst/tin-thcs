/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Bên cạnh những tác động tích cực, công nghệ kĩ thuật số cũng có những tác động tiêu cực đến con người. Em hãy thảo luận với bạn và kể ra một vài tác động tiêu cực đó.",
    k:"Ví dụ: nghiện trò chơi điện tử, nghiện mạng xã hội; ít giao tiếp, ít vận động, mất ngủ, cận thị; bị lộ thông tin cá nhân; bị lừa đảo trên mạng; bị bắt nạt qua mạng; tin giả lan truyền; rác thải điện tử gây ô nhiễm môi trường,…"},
  hd1a:{type:"sort", label:"HĐ1 – Câu 1",
    q:"Mỗi phương án dưới đây có nói về tác động tiêu cực của công nghệ kĩ thuật số tới đời sống con người và xã hội không?",
    cats:["Tiêu cực","Không phải"],
    items:[["A. Quyền riêng tư dễ bị ảnh hưởng.",0],["B. Dữ liệu tài khoản ngân hàng bị đánh cắp.",0],["C. Giao dịch trong thương mại tăng nhanh nhờ ứng dụng ngân hàng số.",1],["D. Ô nhiễm do rác thải từ những thiết bị công nghệ số lỗi thời.",0]],
    k:"Tác động tiêu cực: <b>A, B, D</b>. Phương án C là tác động <b>tích cực</b> của ngân hàng số."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em hãy kể thêm một vài tác động tiêu cực của công nghệ kĩ thuật số đối với xã hội.",
    k:"Ví dụ: lừa đảo trên mạng (giả danh, lừa đầu tư, đánh bạc trực tuyến); tự động hoá làm <b>một số người mất việc</b>; người già, người khuyết tật, người ở vùng khó khăn <b>càng tụt hậu</b>; tin giả, tin sai sự thật lan nhanh; rác thải điện tử gây ô nhiễm môi trường."},
  dt:{type:"sort", label:"Đọc hiểu – Tác động đến ai?",
    q:"Đọc mục 1 (SGK trang 15–16). Mỗi tác động tiêu cực dưới đây chủ yếu ảnh hưởng đến con người (cá nhân) hay đến xã hội?",
    cats:["Con người","Xã hội"],
    items:[["Nghiện Internet, ít giao tiếp, mất ngủ",0],["Thông tin cá nhân bị rò rỉ, dữ liệu bị đánh cắp",0],["Lừa đảo, tổ chức đánh bạc, tuyên truyền tệ nạn trên mạng",1],["Tự động hoá khiến nguy cơ thất nghiệp tăng",1],["Người già, người khuyết tật, người ở vùng khó khăn càng tụt hậu",1],["Học sinh nhờ trí tuệ nhân tạo làm bài tập về nhà",0]],
    k:"<ul><li><b>Đối với con người:</b> ảnh hưởng sức khoẻ thể chất và tinh thần (nghiện Internet, ít giao tiếp, mất ngủ,…); ảnh hưởng quyền riêng tư; quá lệ thuộc vào công nghệ (nhờ AI làm bài); nguy cơ mất an toàn khi trò chuyện với người lạ.</li><li><b>Đối với xã hội:</b> lừa đảo, đánh bạc, tuyên truyền tệ nạn; nguy cơ thất nghiệp; một bộ phận người dân càng tụt hậu; rác thải điện tử gây ô nhiễm môi trường.</li></ul>"},
  p16a:{type:"mcq", label:"Câu hỏi tr.16 – câu 1", q:"Phương án nào sau đây KHÔNG phải là tác động tiêu cực của công nghệ kĩ thuật số đến đời sống con người?",
    o:["Nhờ trí tuệ nhân tạo làm bài tập về nhà.","Truy cập mạng xã hội trong nhiều giờ.","Thường xuyên sử dụng phần mềm soạn thảo văn bản để làm báo cáo.","Vừa ăn vừa xem video trên trang YouTube."], a:2,
    k:"Dùng phần mềm soạn thảo văn bản để làm báo cáo là <b>ứng dụng tích cực</b>, giúp làm việc nhanh, đẹp. Ba phương án còn lại là lệ thuộc công nghệ, nghiện mạng, thói quen hại sức khoẻ."},
  p16b:{type:"sort", label:"Câu hỏi tr.16 – câu 2",
    q:"Những phương án nào sau đây là tác động tiêu cực của công nghệ kĩ thuật số đến xã hội?",
    cats:["Tiêu cực đến xã hội","Không phải"],
    items:[["A. Thông tin cá nhân của con người được số hoá.",1],["B. Sử dụng thiết bị số liên tục trong thời gian dài ảnh hưởng đến sức khoẻ thể chất và tinh thần của lớp trẻ.",0],["C. Gia tăng ô nhiễm môi trường.",0],["D. Làm gia tăng tỉ lệ thất nghiệp.",0]],
    k:"Đáp án: <b>B, C, D</b>. B ảnh hưởng đến cả một thế hệ (lớp trẻ); C, D ảnh hưởng đến môi trường và việc làm của xã hội. Việc thông tin cá nhân được số hoá (A) tự nó không phải tác động tiêu cực; chỉ khi thông tin bị rò rỉ, đánh cắp mới gây hại."},
  hd2a:{type:"sort", label:"HĐ2 – Câu 1",
    q:"Những hành vi nào sau đây vi phạm pháp luật, trái đạo đức, thiếu văn hoá?",
    cats:["Vi phạm","Không vi phạm"],
    items:[["A. Tải về một hình ảnh trên Internet khi chưa có sự cho phép của chủ sở hữu và sử dụng như là của mình.",0],["B. Sử dụng ngôn ngữ phản cảm khi giao tiếp trên mạng xã hội.",0],["C. Chúc mừng sinh nhật bạn trên mạng xã hội.",1],["D. Đăng hình ảnh, video bôi nhọ, xúc phạm tập thể hoặc cá nhân lên mạng.",0]],
    k:"Hành vi vi phạm: <b>A</b> (vi phạm bản quyền), <b>B</b> (thiếu văn hoá), <b>D</b> (bôi nhọ, xúc phạm người khác). Chúc mừng sinh nhật bạn (C) là hành vi bình thường, có văn hoá."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Em hãy kể thêm một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá của người sử dụng dịch vụ Internet.",
    k:"Ví dụ: đăng tin sai sự thật; bắt nạt, đe doạ bạn qua mạng; lập tài khoản giả mạo người khác; lừa đảo trúng thưởng, chiếm đoạt tài khoản; dùng phần mềm bẻ khoá, không bản quyền; phát tán virus; đăng thông tin cá nhân của người khác khi chưa được đồng ý; bình luận khiếm nhã, tục tĩu."},
  hv:{type:"match", label:"Đọc hiểu – Gọi tên hành vi", ph:"Chọn…",
    q:"Đọc mục a) và Hình 4.2. Mỗi tình huống dưới đây là hành vi nào?",
    opts:["a) Viết, đăng, chia sẻ nội dung sai sự thật","b) Làm lộ thông tin cá nhân, tổ chức gây ảnh hưởng xấu","c) Sử dụng phần mềm không có bản quyền","d) Bắt nạt qua mạng","e) Lừa đảo qua mạng","f) Ứng xử thiếu văn hoá"],
    items:[["1) Giả danh ngân hàng nhắn tin “trúng thưởng”, yêu cầu cung cấp mật khẩu",5],["2) Rủ cả lớp tẩy chay, chế ảnh chế giễu một bạn",4],["3) Chia sẻ tin “sắp động đất” chưa được kiểm chứng",1],["4) Cài phần mềm đã bị bẻ khoá",3],["5) Đăng số điện thoại, địa chỉ nhà của bạn khi bạn không đồng ý",2],["6) Tranh luận trên diễn đàn bằng từ ngữ tục tĩu",6]],
    k:"1 – e, 2 – d, 3 – a, 4 – c, 5 – b, 6 – f."},
  vb:{type:"match", label:"Đọc hiểu – Văn bản pháp luật", ph:"Chọn…",
    q:"Đọc mục b). Ghép mỗi văn bản pháp luật với nội dung chính của nó.",
    opts:["a) Quyền, trách nhiệm của tổ chức, cá nhân tham gia ứng dụng và phát triển công nghệ thông tin","b) Quản lí, cung cấp, sử dụng dịch vụ Internet, thông tin trên mạng, trò chơi điện tử trên mạng","c) Bảo vệ an ninh quốc gia, trật tự, an toàn xã hội trên không gian mạng"],
    items:[["1) Luật Công nghệ thông tin số 67/2006/QH11 (năm 2006)",1],["2) Nghị định số 72/2013/NĐ-CP (năm 2013)",2],["3) Luật An ninh mạng (năm 2018)",3]],
    k:"1 – a, 2 – b, 3 – c. Cả ba văn bản đều ghi rõ <b>các hành vi bị nghiêm cấm</b>."},
  nhom:{type:"match", label:"Đọc hiểu – Nhóm hành vi cần tránh", ph:"Chọn…",
    q:"Mỗi hành vi dưới đây thuộc nhóm hành vi vi phạm pháp luật nào?",
    opts:["a) An ninh quốc gia, trật tự, an toàn xã hội","b) Quyền nhân thân, uy tín của cá nhân, tổ chức","c) Sở hữu trí tuệ, sở hữu tài sản, đánh bạc","d) Bảo đảm an toàn thông tin trên không gian mạng","e) Quảng cáo sản phẩm, dịch vụ trái quy định"],
    items:[["1) Bình luận sai trái, chi tiết bịa đặt về một vụ việc chưa được kiểm chứng",1],["2) Đăng ảnh, biển số xe của người khác mà không được đồng ý",2],["3) Chia sẻ đoạn mã chương trình của người khác khi không được phép",3],["4) Phát tán virus qua liên kết lừa nhận thưởng",4],["5) Quảng cáo vũ khí, buôn bán động vật quý hiếm",5]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e. Ngoài ra còn nhóm hành vi <b>xuyên tạc lịch sử, phá hoại khối đại đoàn kết, xúc phạm, phân biệt đối xử</b>."},
  p19a:{type:"mcq", label:"Câu hỏi tr.19 – câu 1", q:"Hành vi nào sau đây khi hoạt động trong môi trường số KHÔNG vi phạm pháp luật, trái đạo đức, thiếu văn hoá?",
    o:["Đăng bài hoặc bình luận gây mâu thuẫn vùng miền.","Quảng cáo bán hàng hoá, dịch vụ bị cấm.","Sử dụng trái phép tài khoản mạng của tổ chức, cá nhân khác.","Chia sẻ thông tin về lớp học ngôn ngữ lập trình trực tuyến."], a:3,
    k:"Chia sẻ thông tin về một lớp học lập trình trực tuyến là hành vi <b>có ích</b>. A gây chia rẽ vùng miền, B quảng cáo trái quy định, C xâm phạm tài khoản người khác đều vi phạm."},
  p19b:{type:"open", label:"Câu hỏi tr.19 – câu 2", q:"Minh nhận được một liên kết lạ từ một bạn mới quen trên mạng yêu cầu chia sẻ liên kết này cho 5 bạn và truy cập liên kết để nhận được một phần quà là chiếc ba lô rất đẹp. Theo em, Minh có nên làm theo yêu cầu đó không? Tại sao?",
    k:"<b>Không nên.</b> Đây là dấu hiệu <b>lừa đảo</b>: người lạ, liên kết lạ, hứa tặng quà, yêu cầu chia sẻ tiếp. Liên kết có thể chứa <b>virus, mã độc</b>, trang giả mạo để <b>đánh cắp thông tin, tài khoản</b>; chia sẻ cho bạn bè là tiếp tay phát tán. Minh nên không bấm, không chia sẻ, báo cho bố mẹ, thầy cô."},
  lt1:{type:"sort", label:"Luyện tập – câu 1",
    q:"Những cách nào sau đây giúp em tránh được các tác động tiêu cực khi sử dụng công nghệ kĩ thuật số? (Câu E, F do thầy cô thêm.)",
    cats:["Giúp tránh","Không giúp"],
    items:[["A. Không sử dụng thiết bị số trong thời gian dài và liên tục.",0],["B. Không xem các video phản cảm.",0],["C. Giảm thời gian dùng điện thoại để nói chuyện với gia đình.",0],["D. Tham gia luyện tập thể dục thể thao.",0],["E. Thức khuya chơi trò chơi trực tuyến cho đỡ căng thẳng.",1],["F. Chia sẻ mật khẩu mạng xã hội cho bạn mới quen.",1]],
    k:"Cả bốn cách <b>A, B, C, D</b> trong SGK đều giúp tránh tác động tiêu cực. E, F là thói quen có hại."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy lấy ví dụ về một hành vi vi phạm pháp luật, một hành vi trái đạo đức khi hoạt động trong môi trường số.",
    k:"<ul><li><b>Vi phạm pháp luật:</b> phát tán virus; sử dụng trái phép tài khoản của người khác; đăng tin sai sự thật; lừa đảo chiếm đoạt tài sản; dùng phần mềm không bản quyền.</li><li><b>Trái đạo đức:</b> chế ảnh chế giễu bạn; bình luận khiếm nhã; tẩy chay, cô lập bạn trên nhóm lớp; nói dối, nói xấu người khác trên mạng.</li></ul>"},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy tìm hiểu các hành vi bị cấm trong Luật Công nghệ thông tin số 67/2006/QH11 và Nghị định số 72/2013/NĐ-CP. Các hành vi bị cấm trong hai văn bản này giống và khác nhau như thế nào?",
    k:"Gợi ý (Điều 12 Luật CNTT 2006 và Điều 5 Nghị định 72/2013):<ul><li><b>Giống nhau:</b> đều cấm lợi dụng mạng để chống phá Nhà nước, gây rối an ninh, trật tự; kích động bạo lực, chia rẽ dân tộc, tôn giáo; xuyên tạc, xúc phạm danh dự, uy tín người khác; cản trở, phá hoại hệ thống thông tin; phát tán virus, đánh cắp, sử dụng trái phép mật khẩu, thông tin của người khác.</li><li><b>Khác nhau:</b> Luật CNTT có phạm vi rộng cho mọi hoạt động ứng dụng, phát triển CNTT (ví dụ cấm vi phạm quyền sở hữu trí tuệ, giả mạo trang thông tin điện tử). Nghị định 72 quy định cụ thể hơn cho việc cung cấp, sử dụng <b>dịch vụ Internet, thông tin trên mạng, trò chơi điện tử trên mạng</b>.</li></ul>Học sinh cần ghi rõ nguồn tìm hiểu (ví dụ thuvienphapluat.vn, chinhphu.vn)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Ngoài các tác động tích cực, công nghệ kĩ thuật số còn có một số <b>tác động tiêu cực</b> lên đời sống con người và xã hội.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Khi hoạt động trong môi trường số, sử dụng các dịch vụ Internet, người sử dụng cần có <b>trách nhiệm</b>, ứng xử <b>lành mạnh, có văn hoá</b> và <b>không vi phạm pháp luật</b>.</li><li>Cần cẩn trọng, tránh vi phạm bản quyền khi sử dụng dữ liệu, phần mềm và cảnh giác với các giao tiếp trên mạng; khi giao tiếp luôn thể hiện là người có văn hoá, tôn trọng mọi người.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Công nghệ số có lợi nhưng cũng có <b>tác động tiêu cực</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tác động tiêu cực của công nghệ kĩ thuật số</p><ul>'
    + "<li><b>Con người</b>: nghiện mạng, mất ngủ, ít giao tiếp; lộ thông tin cá nhân; lệ thuộc AI.</li>"
    + "<li><b>Xã hội</b>: lừa đảo, đánh bạc trên mạng; thất nghiệp; rác thải điện tử.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Sử dụng dịch vụ Internet đúng luật</p><ul>'
    + "<li>Hành vi xấu: <b>tin sai sự thật, lộ thông tin, bắt nạt, lừa đảo, phần mềm lậu, thiếu văn hoá</b>.</li>"
    + "<li>Luật: <b>Luật CNTT 2006</b>, <b>Nghị định 72/2013</b>, <b>Luật An ninh mạng 2018</b>.</li>"
    + "<li>→ Dùng mạng <b>có trách nhiệm, có văn hoá, đúng luật</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tránh tác động xấu: không dùng máy lâu; không xem video xấu; dành thời gian cho gia đình, thể thao.</li>"
    + "<li>Liên kết lạ hứa tặng quà → <b>lừa đảo</b>: không bấm, không chia sẻ.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Luật CNTT và Nghị định 72 đều <b>cấm</b>: chống phá Nhà nước, xúc phạm người khác, phát tán virus, đánh cắp thông tin.</li>"
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
    return ["T9B4." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em kể được nhiều tác động tiêu cực, rất gần gũi."],
        fix:["Em nghĩ đến sức khoẻ, thông tin cá nhân, lừa đảo trên mạng nhé."]},
  hd1a:{ok:["Nhóm chọn đúng A, B, D. Rất tốt!"],
        fix:["Giao dịch tăng nhanh nhờ ngân hàng số là có lợi hay có hại?"]},
  hd1b:{ok:["Ví dụ hay, đúng là tác động đến xã hội."],
        fix:["Em nêu tác động đến cả xã hội: việc làm, môi trường, lừa đảo,…"]},
  dt:  {ok:["Nhóm phân biệt đúng tác động đến con người và xã hội."],
        fix:["Tác động đó ảnh hưởng đến một người hay đến cả cộng đồng?"]},
  p16a:{ok:["Chính xác! Dùng phần mềm soạn thảo làm báo cáo là ứng dụng có ích."],
        fix:["Đề hỏi phương án KHÔNG phải tác động tiêu cực. Việc nào là có ích?"]},
  p16b:{ok:["Nhóm chọn đúng B, C, D."],
        fix:["Thông tin được số hoá tự nó có gây hại không? Khi nào mới gây hại?"]},
  hd2a:{ok:["Nhóm chọn đúng A, B, D. Rất tốt!"],
        fix:["Dùng ảnh của người khác như của mình khi chưa xin phép có vi phạm không?"]},
  hd2b:{ok:["Em kể được nhiều hành vi, đúng và cụ thể."],
        fix:["Em kể thêm hành vi lừa đảo, bắt nạt, đăng tin sai sự thật,…"]},
  hv:  {ok:["Nhóm gọi tên đúng tất cả các hành vi."],
        fix:["Em đối chiếu lại với Hình 4.2 nhé."]},
  vb:  {ok:["Nhóm ghép đúng ba văn bản pháp luật."],
        fix:["Em đọc lại mục b): văn bản nào nói về an ninh mạng, văn bản nào nói về dịch vụ Internet?"]},
  nhom:{ok:["Nhóm xếp đúng các nhóm hành vi vi phạm."],
        fix:["Em đọc lại năm nhóm hành vi ở SGK trang 18–19 nhé."]},
  p19a:{ok:["Chính xác! Chia sẻ thông tin lớp học lập trình là hành vi có ích."],
        fix:["Đề hỏi hành vi KHÔNG vi phạm. Hành vi nào có ích cho mọi người?"]},
  p19b:{ok:["Đúng! Đây là dấu hiệu lừa đảo, Minh không nên làm theo."],
        fix:["Người lạ, liên kết lạ, hứa tặng quà… đó là dấu hiệu gì? Em giải thích thêm lí do."]},
  lt1: {ok:["Nhóm chọn đúng cả bốn cách trong SGK."],
        fix:["Em xét lại: thói quen đó có tốt cho sức khoẻ và an toàn của em không?"]},
  lt2: {ok:["Em nêu đúng cả hai ví dụ."],
        fix:["Em nêu đủ hai ví dụ: một hành vi vi phạm pháp luật, một hành vi trái đạo đức."]},
  vd1: {ok:["Em so sánh rõ điểm giống và khác, có ghi nguồn. Rất tốt!"],
        fix:["Em nêu cả điểm giống và điểm khác nhé.","Em ghi rõ nguồn tìm hiểu (trang web nào)."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  hd1a: "Em xét lại: điều đó có lợi hay có hại?",
  dt: "Em xét lại: ảnh hưởng đến một người hay cả cộng đồng?",
  p16b: "Em xét lại: điều đó gây hại cho xã hội không?",
  hd2a: "Em xét lại: hành vi đó có xúc phạm ai hay xâm phạm quyền của ai không?",
  lt1: "Em xét lại: thói quen đó tốt hay có hại?"
};
const MATCH_HINT = {
  hv: "Gợi ý: đối chiếu với Hình 4.2.",
  vb: "Gợi ý: đọc lại mục b) (SGK trang 18).",
  nhom: "Gợi ý: đọc lại các nhóm hành vi ở SGK trang 18–19."
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
    {title:"Mặt trái của công nghệ", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Tác động tiêu cực", acts:[
    {title:"Hoạt động 1: Mặt trái của công nghệ kĩ thuật số", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Tác động đến ai?", tasks:["dt"], concept:"c1"},
    {title:"Câu hỏi SGK trang 16", tasks:["p16a","p16b"]},
    {title:"Ghi bài: Tác động tiêu cực", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Dùng Internet đúng luật", acts:[
    {title:"Hoạt động 2: Sử dụng dịch vụ Internet đúng luật", tasks:["hd2a","hd2b"]},
    {title:"Đọc hiểu: Hành vi vi phạm", tasks:["hv"]},
    {title:"Đọc hiểu: Văn bản pháp luật", tasks:["vb","nhom"], concept:"c2"},
    {title:"Câu hỏi SGK trang 19", tasks:["p19a","p19b"]},
    {title:"Ghi bài: Dùng Internet đúng luật", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 19", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"So sánh hai văn bản pháp luật", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai4", title: "Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng tải ảnh trên mạng về dùng là không vi phạm vì…",
  commentPh: "Ví dụ: Nhóm nhận ra đúng dấu hiệu lừa đảo; cần nêu thêm cách xử lí."};
})();
