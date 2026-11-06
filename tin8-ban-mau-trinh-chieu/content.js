/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Quan sát hai trang chiếu trong Hình 11a.1, so sánh hai trang chiếu này với trang chiếu số 1 em đã tạo ở phần thực hành Bài 10a và đưa ra nhận xét.",
    k:"Hai trang chiếu ở Hình 11a.1 có cùng nội dung nhưng <b>đẹp, chuyên nghiệp hơn</b>: có hình nền, hình minh hoạ, bố cục và màu sắc phối hợp hài hoà. Trang chiếu ở Bài 10a đơn giản hơn (chủ yếu là chữ trên nền một mẫu định dạng)."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Sử dụng phần mềm trình chiếu có tạo được các trang chiếu như Hình 11a.1 không?",
    o:["Có.","Không, phải dùng phần mềm đồ hoạ chuyên nghiệp.","Chỉ tạo được trang chiếu chỉ có chữ.","Chỉ tạo được nếu có kết nối Internet."], a:0,
    k:"<b>Có.</b> Phần mềm trình chiếu tạo được các trang chiếu như vậy."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Để tạo được các trang chiếu đó có cần nhiều thời gian không?",
    o:["Không cần nhiều thời gian nếu sử dụng bản mẫu có sẵn.","Luôn cần rất nhiều thời gian.","Không thể tạo được.","Chỉ mất thời gian nhập chữ."], a:0,
    k:"Nếu tự thiết kế từng trang thì mất nhiều thời gian; dùng <b>bản mẫu (Template)</b> có sẵn thì nhanh, chỉ cần chỉnh sửa nội dung."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Làm thế nào để tạo được các trang chiếu đó?",
    k:"Sử dụng <b>bản mẫu</b> có sẵn trong phần mềm trình chiếu (File → New, chọn bản mẫu theo chủ đề) hoặc bản mẫu được chia sẻ trên mạng, rồi thay nội dung, hình ảnh cho phù hợp."},
  bm:{type:"sort", label:"Đọc hiểu – Bản mẫu và mẫu định dạng", q:"Mỗi thành phần dưới đây có ở cả mẫu định dạng (Themes) và bản mẫu (Template), hay chỉ bản mẫu mới có?",
    cats:["Cả hai đều có","Chỉ bản mẫu có"],
    items:[["Màu sắc",0],["Phông chữ",0],["Hiệu ứng hình ảnh",0],["Bố cục các trang chiếu",1],["Gợi ý các nội dung cần có cho bài trình chiếu",1],["Hướng dẫn cách nhập nội dung, cách trình bày",1]],
    k:"Mẫu định dạng (Themes) là tập hợp <b>màu sắc, phông chữ, hiệu ứng hình ảnh</b>. Bản mẫu (Template) chứa thêm <b>bố cục, kiểu nền và cả nội dung</b> gợi ý cho một chủ đề."},
  ext:{type:"mcq", label:"Đọc hiểu – Tệp bản mẫu", q:"Bản mẫu được lưu dưới dạng một tệp có phần mở rộng là:",
    o:[".potx",".pptx",".docx",".xlsx"], a:0,
    k:"Bản mẫu được lưu dưới dạng tệp <b>.potx</b> (bài trình chiếu thường là .pptx)."},
  p52:{type:"open", label:"Câu hỏi tr.52", q:"Em hãy cho biết bản mẫu khác với mẫu định dạng thế nào.",
    k:"<b>Mẫu định dạng</b> chỉ quy định giao diện (màu sắc, phông chữ, hiệu ứng hình ảnh). <b>Bản mẫu</b> có thêm bố cục, kiểu nền, các trang chiếu và <b>gợi ý nội dung</b> cho một mục đích, chủ đề cụ thể; được lưu thành tệp .potx để tái sử dụng, chia sẻ."},
  nv:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hiện nhiệm vụ “An toàn trong phòng thực hành” theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Chọn File/New → Education → chọn bản mẫu Lab Safety.",b:"Nhập nội dung theo các gợi ý trong bản mẫu.",c:"Thay đổi phông chữ, cỡ chữ, màu nền, thêm hoặc bớt trang cho phù hợp.",d:"Chọn hình ảnh ở trang tiêu đề → Insert/Links/Link → chọn tệp video.",e:"Chọn File/Save, lưu tệp AnToanPhongThucHanh.pptx."},
    start:["c","e","a","d","b"], ans:["a","b","c","d","e"],
    k:"Chọn bản mẫu → nhập nội dung → chỉnh sửa bản mẫu → đưa đường dẫn video vào trang tiêu đề → lưu tệp."},
  link:{type:"mcq", label:"Thực hành – Đường dẫn đến video", q:"Để đưa vào trang tiêu đề đường dẫn đến tệp video NhungSuCoPhongThucHanh.mp4, em làm thế nào?",
    o:["Chọn hình ảnh minh hoạ, chọn Insert/Links/Link, chọn tệp video trong cửa sổ Insert Hyperlink rồi OK.","Chọn Design/Themes, chọn tệp video.","Chọn File/New, chọn tệp video.","Kéo tệp video vào khung tiêu đề."], a:0,
    k:"Chọn đối tượng (hình ảnh) → <b>Insert/Links/Link</b> → trong cửa sổ <b>Insert Hyperlink</b> chọn đường dẫn đến tệp → <b>OK</b>. Khi trình chiếu, nháy vào hình để mở video."},
  nv3:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: bài trình chiếu AnToanPhongThucHanh.pptx của em có bao nhiêu trang? Em đã chỉnh sửa bản mẫu những gì? Đường dẫn đến video được gắn vào đối tượng nào?",
    k:"Ví dụ: 8 trang theo bản mẫu; thay các dòng gợi ý bằng nội dung an toàn phòng thực hành; đổi cỡ chữ, màu tiêu đề; gắn liên kết vào hình chiếc bình ở trang tiêu đề."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Phương án nào sau đây mô tả các bước sử dụng bản mẫu?",
    o:["Nháy chuột chọn Design/Themes, chọn bản mẫu.","Nháy chuột chọn Design/Variants, chọn bản mẫu.","Nháy chuột chọn Insert/Text, chọn bản mẫu.","Nháy chuột chọn File/New, chọn bản mẫu."], a:3,
    k:"<b>D</b>. File/New hiện ra các bản mẫu có sẵn theo chủ đề. (Design/Themes là chọn mẫu định dạng.)"},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Thêm vào trang chiếu tiêu đề của tệp AnToanPhongThucHanh.pptx đường dẫn đến tệp văn bản lưu trữ các kí hiệu cảnh báo trong phòng thực hành để có thể mở ra giới thiệu cho người nghe trong khi trình chiếu. Em đã gắn đường dẫn vào đối tượng nào?",
    k:"Chọn một đối tượng khác trên trang tiêu đề (ví dụ tiêu đề hoặc hình kính hiển vi) → Insert/Links/Link → chọn tệp văn bản (ví dụ KiHieuCanhBao.docx) → OK. Mỗi đối tượng gắn một liên kết."},
  vd1:{type:"open", label:"Vận dụng", q:"Tìm một bản mẫu (có sẵn trong phần mềm trình chiếu hoặc được chia sẻ trên mạng) và sử dụng để tạo lại bài trình chiếu trong tệp LeRaMatCLBTinhoc.pptx. Thực hiện thay đổi các định dạng cần thiết để tạo một bản mẫu phù hợp với bài trình chiếu, ghi lại tệp dưới dạng bản mẫu (.potx). Mô tả ngắn bài của em.",
    k:"File/New → chọn bản mẫu → chép nội dung 4 trang của Bài 10a → chỉnh màu, phông, hình → File/Save As, chọn <b>PowerPoint Template (*.potx)</b> để tái sử dụng và chia sẻ."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Bản mẫu chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền,… và cả nội dung.</li><li>Bản mẫu giúp bài trình chiếu có giao diện <b>thống nhất, chuyên nghiệp</b> mà không tốn thời gian.</li><li>Bản mẫu giúp <b>gợi ý các nội dung</b> cần có cho bài trình chiếu.</li><li>Có thể <b>chỉnh sửa, chia sẻ, tái sử dụng</b> bản mẫu.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Dùng bản mẫu: <b>File/New</b> → chọn chủ đề → chọn bản mẫu.</li><li>Đưa đường dẫn đến video, tài liệu: chọn đối tượng → <b>Insert/Links/Link</b> → chọn tệp → OK.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Trang chiếu đẹp, chuyên nghiệp có thể tạo nhanh nhờ <b>bản mẫu</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Bản mẫu trong phần mềm trình chiếu</p><ul>'
    + "<li><b>Mẫu định dạng</b> (Themes): màu sắc, phông chữ, hiệu ứng hình ảnh.</li>"
    + "<li><b>Bản mẫu</b> (Template, tệp <b>.potx</b>): thêm bố cục, kiểu nền và <b>gợi ý nội dung</b> cho một chủ đề.</li>"
    + "<li>Bản mẫu giúp bài trình chiếu <b>thống nhất, chuyên nghiệp</b>, nhanh; có thể sửa, chia sẻ, tái sử dụng.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Dùng bản mẫu: <b>File/New</b> → chủ đề → bản mẫu.</li>"
    + "<li>Đường dẫn đến video, tài liệu: chọn đối tượng → <b>Insert/Links/Link</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Các bước sử dụng bản mẫu: <b>File/New</b>, chọn bản mẫu.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Lưu thành bản mẫu: File/Save As → <b>PowerPoint Template (*.potx)</b>.</li>"
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
    return ["T8B11a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhận xét đúng."], fix:["So sánh hình nền, hình minh hoạ, bố cục của hai trang."]},
  hd1a:{ok:["Chính xác!"], fix:["Phần mềm trình chiếu có chèn được hình nền, hình ảnh không?"]},
  hd1b:{ok:["Chính xác!"], fix:["Nếu có sẵn bản mẫu thì có nhanh hơn không?"]},
  hd1c:{ok:["Đúng: dùng bản mẫu."], fix:["Đọc mục 1 trang 51–52."]},
  bm:  {ok:["Phân biệt đúng."], fix:["Mẫu định dạng có gợi ý nội dung không?"]},
  ext: {ok:["Chính xác!"], fix:["Tệp bản mẫu có chữ t (template) ở cuối phần mở rộng."]},
  p52: {ok:["Nêu đúng điểm khác nhau."], fix:["Bản mẫu có thêm những gì so với mẫu định dạng?"]},
  nv:  {ok:["Đúng thứ tự."], fix:["Phải tạo bài trình chiếu từ bản mẫu trước rồi mới nhập nội dung."]},
  link:{ok:["Chính xác!"], fix:["Lệnh Link nằm trong thẻ nào?"]},
  nv3: {ok:["Hoàn thành nhiệm vụ."], fix:["Kiểm tra liên kết bằng cách trình chiếu và nháy vào hình."]},
  lt1: {ok:["Chính xác!"], fix:["Design/Themes là mẫu định dạng, không phải bản mẫu."]},
  lt2: {ok:["Gắn liên kết đúng."], fix:["Chọn một đối tượng chưa có liên kết rồi Insert/Links/Link."]},
  vd1: {ok:["Tạo và lưu bản mẫu đúng."], fix:["Khi lưu, chọn kiểu tệp PowerPoint Template (*.potx)."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  bm: "Mẫu định dạng chỉ có giao diện; bản mẫu có thêm bố cục và gợi ý nội dung."
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
    {title:"So sánh các trang chiếu", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Bản mẫu", acts:[
    {title:"Hoạt động 1: Làm thế nào để có thể tạo được bài trình chiếu đẹp, chuyên nghiệp?", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Đọc hiểu: Bản mẫu trong phần mềm trình chiếu", tasks:["bm","ext"], concept:"c1"},
    {title:"Câu hỏi SGK trang 52", tasks:["p52"]},
    {title:"Ghi bài: Bản mẫu", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: An toàn trong phòng thực hành", tasks:["nv","link","nv3"], concept:"c2"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bản mẫu và liên kết", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bản mẫu cho bài trình chiếu lễ ra mắt CLB", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai11a", title: "Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 chọn Design/Themes nên không có gợi ý nội dung vì…",
  commentPh: "Ví dụ: Nhóm dùng đúng bản mẫu; cần thay hết các dòng gợi ý bằng nội dung."};
})();
