/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Trong chủ đề này, em sẽ hoàn thành dự án nhỏ Quản lí tài chính gia đình bằng phần mềm bảng tính: xây dựng cấu trúc bảng tính và sử dụng một số công cụ cơ bản, nâng cao. Theo em, một bảng tính quản lí tài chính gia đình cần lưu những thông tin gì?",
    k:"Các khoản <b>thu</b> và khoản <b>chi</b>: ngày, khoản mục, nội dung, số tiền; từ đó tính tổng thu, tổng chi, số dư, theo dõi từng khoản mục."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Dựa trên hiểu biết về những khoản chi tiêu của gia đình, em hãy cho biết: chi tiêu gia đình gồm những khoản mục gì?",
    k:"Ví dụ: ở (điện, nước, nhà), ăn, di chuyển, học tập, sức khoẻ, giải trí, quà tặng/từ thiện, tiết kiệm, khác."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Nêu cấu trúc một bảng tính điện tử quản lí tài chính mà em thấy phù hợp với gia đình em.",
    k:"Hai trang tính <b>Thu nhập</b> và <b>Chi tiêu</b>, mỗi trang có các cột: Ngày, Khoản thu/Khoản chi, Nội dung, Số tiền; một cột riêng (ví dụ cột F) liệt kê danh sách các khoản mục."},
  thuchi:{type:"sort", label:"Đọc hiểu – Khoản thu, khoản chi", q:"Xếp mỗi khoản mục vào nhóm Khoản thu hoặc Khoản chi của gia đình (Hình 9a.1).",
    cats:["Khoản thu","Khoản chi"],
    items:[["Lương",0],["Thưởng",0],["Làm thêm",0],["Được cho/tặng",0],["Ở",1],["Ăn",1],["Di chuyển",1],["Học tập",1],["Sức khoẻ",1],["Giải trí",1],["Quà tặng/Từ thiện",1],["Tiết kiệm",1]],
    k:"Khoản thu: lương, thưởng, làm thêm, được cho/tặng, khác. Khoản chi: ở, ăn, di chuyển, học tập, sức khoẻ, giải trí, quà tặng/từ thiện, tiết kiệm, khác."},
  allow:{type:"match", label:"Đọc hiểu – Bảng 9a.1", q:"Ghép mỗi lựa chọn ở ô Allow với ý nghĩa của nó.",
    items:[["Any value",1],["Whole number",2],["Decimal",3],["List",4],["Date",5],["Text length",6]],
    opts:["a) Bất kì giá trị nào","b) Số nguyên – ô tính chỉ chấp nhận các số nguyên","c) Số thập phân – ô tính chỉ chấp nhận các số thập phân","d) Danh sách – chọn dữ liệu từ danh sách thả xuống","e) Ngày tháng – ô tính chỉ chấp nhận dữ liệu ngày tháng","f) Độ dài văn bản – hạn chế độ dài của văn bản nhập vào ô tính"],
    k:"Any value – a; Whole number – b; Decimal – c; List – d; Date – e; Text length – f. (Time: thời gian; Custom: tuỳ chỉnh bằng công thức.)"},
  dv:{type:"mcq", label:"Đọc hiểu – Công cụ xác thực dữ liệu", q:"Công cụ xác thực dữ liệu (Data Validation) dùng để:",
    o:["Hạn chế kiểu dữ liệu hoặc giá trị dữ liệu nhập vào ô tính, giúp nhập dữ liệu chính xác và thoả mãn yêu cầu bài toán.","Tính tổng các khoản chi.","Sắp xếp dữ liệu theo thứ tự tăng dần.","Định dạng màu nền cho ô tính."], a:0,
    k:"Công cụ xác thực dữ liệu <b>hạn chế kiểu dữ liệu hoặc giá trị dữ liệu</b> nhập vào ô tính, giúp việc nhập dữ liệu được chính xác và thoả mãn những yêu cầu bài toán đặt ra."},
  p36:{type:"mcq", label:"Câu hỏi tr.36", q:"Trang tính Thu nhập (Hình 9a.6) lưu các khoản thu của gia đình. Dữ liệu ở cột B cần được thiết lập để thoả mãn điều kiện xác thực nào?",
    o:["Allow: List, Source: =$F$2:$F$6 (chọn khoản thu từ danh sách ở cột F).","Allow: Whole number, greater than 0.","Allow: Date.","Allow: Any value."], a:0,
    k:"Mỗi ô ở cột B (Khoản thu) phải là một mục trong danh sách các khoản thu ở cột F: <b>List</b>, Source <b>=$F$2:$F$6</b>."},
  nv1:{type:"order", label:"Thực hành – Nhiệm vụ 1", q:"Sắp xếp các bước sử dụng công cụ xác thực dữ liệu thuộc danh sách cho trước cho cột Khoản chi.",
    items:{a:"Chọn các ô của cột B để nhập dữ liệu, ví dụ các ô từ B3 đến B10.",b:"Trong nhóm lệnh Data Tools của dải lệnh Data, chọn Data Validation.",c:"Trong thẻ Settings, ở ô Allow chọn List.",d:"Ở ô Source, chọn vùng chứa danh sách các khoản chi F2:F10.",e:"Chọn OK; nhập dữ liệu cột B bằng danh sách thả xuống."},
    start:["c","e","a","d","b"], ans:["a","b","c","d","e"],
    k:"Chọn B3:B10 → Data/Data Tools/Data Validation → Settings: Allow = List → Source = $F$2:$F$10 → OK."},
  nv2:{type:"mcq", label:"Thực hành – Nhiệm vụ 2", q:"Để cột Số tiền (nghìn đồng) chỉ chấp nhận kiểu số lớn hơn 0, trong thẻ Settings em chọn:",
    o:["Allow: Whole number; Data: greater than; Minimum: 0","Allow: List; Source: 0","Allow: Text length; Data: greater than; Minimum: 0","Allow: Any value"], a:0,
    k:"Allow: <b>Whole number</b>, Data: <b>greater than</b>, Minimum: <b>0</b> (Hình 9a.9). Thẻ Input Message: thông báo khi nhập; thẻ Error Alert: thông báo lỗi."},
  nv3:{type:"mcq", label:"Thực hành – Thông báo lỗi", q:"Đã đặt Error Alert kiểu Stop cho cột Số tiền. Nếu nhập −500 vào ô D4 thì điều gì xảy ra?",
    o:["Xuất hiện thông báo lỗi (Hình 9a.12); chọn Retry để nhập lại hoặc Cancel để huỷ, ô không nhận giá trị −500.","Ô nhận giá trị −500 bình thường.","Ô tự đổi thành 500.","Bảng tính bị đóng."], a:0,
    k:"Kiểu <b>Stop</b> không cho nhập dữ liệu sai: xuất hiện hộp thông báo “Dữ liệu nhập sai”, chọn <b>Retry</b> nhập lại hoặc <b>Cancel</b> huỷ. (Warning, Information vẫn cho phép giữ giá trị nếu người dùng đồng ý.)"},
  lt1:{type:"open", label:"Luyện tập – câu 1, 2", q:"Mở tệp TaiChinhGiaDinh.xlsx: tạo thêm trang tính Thu nhập; nhập danh sách khoản thu (cột F), dùng công cụ xác thực dữ liệu để khoản thu ở cột B được lấy từ danh sách ở cột F; hạn chế kiểu dữ liệu và giá trị cho cột Số tiền như trang tính Chi tiêu; nhập ít nhất ba hàng dữ liệu. Em đã đặt những điều kiện xác thực nào?",
    k:"Cột B: List, Source =$F$2:$F$6. Cột D: Whole number, greater than 0, kèm Input Message và Error Alert. Nhập ít nhất ba khoản thu."},
  vd1:{type:"open", label:"Vận dụng", q:"Tạo bảng tính quản lí tài chính cho dự án Triển lãm tin học: trang tính Các khoản thu (Quỹ, Tài trợ) và trang tính Các khoản chi (Văn phòng phẩm, In tài liệu). Sử dụng công cụ xác thực dữ liệu để việc nhập dữ liệu các khoản thu, chi được chính xác. Lưu tệp KinhPhiTrienLam.xlsx. Mô tả các điều kiện xác thực em đã đặt.",
    k:"Ở mỗi trang tính: cột khoản thu/chi dùng List lấy từ cột F; cột Số tiền dùng Whole number (hoặc Decimal) greater than 0; có thể thêm Date cho cột Ngày."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Công cụ xác thực dữ liệu (<b>Data Validation</b>) hạn chế kiểu dữ liệu hoặc giá trị dữ liệu nhập vào ô tính, giúp cho việc nhập dữ liệu được chính xác và thoả mãn những yêu cầu bài toán đặt ra.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Data → Data Tools → Data Validation</b>: thẻ <b>Settings</b> (điều kiện), <b>Input Message</b> (thông báo khi chọn ô), <b>Error Alert</b> (thông báo khi nhập sai).</li><li>Danh sách thả xuống: Allow <b>List</b>, Source là vùng chứa danh sách (ví dụ <b>=$F$2:$F$10</b>).</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Dự án <b>Quản lí tài chính gia đình</b>: lưu các khoản <b>thu</b>, <b>chi</b> trên bảng tính.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Công cụ xác thực dữ liệu</p><ul>'
    + "<li>Bảng tính quản lí tài chính: hai loại thông tin <b>Thu</b> và <b>Chi</b>; mỗi loại có ngày, khoản mục, nội dung, số tiền.</li>"
    + "<li><b>Data Validation</b> hạn chế <b>kiểu</b> hoặc <b>giá trị</b> dữ liệu nhập vào ô: Any value, Whole number, Decimal, <b>List</b>, Date, Time, Text length, Custom.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Cột khoản mục: <b>List</b>, Source <b>=$F$2:$F$10</b> → danh sách thả xuống.</li>"
    + "<li>Cột số tiền: <b>Whole number</b>, greater than <b>0</b>; Input Message, Error Alert (Stop).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Trang tính Thu nhập: cột B List từ <b>F2:F6</b>; cột D số lớn hơn 0.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Dùng xác thực dữ liệu cho mọi bảng tính cần nhập dữ liệu chính xác.</li>"
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
    return ["T9B9a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nêu đủ thông tin cần lưu."], fix:["Bảng tính cần lưu tiền vào và tiền ra như thế nào?"]},
  hd1a:{ok:["Nêu được nhiều khoản chi."], fix:["Nghĩ về tiền điện, tiền ăn, học phí,…"]},
  hd1b:{ok:["Cấu trúc hợp lí."], fix:["Mỗi khoản chi cần ghi những thông tin gì?"]},
  thuchi:{ok:["Phân loại đúng."], fix:["Khoản thu là tiền gia đình nhận được."]},
  allow:{ok:["Ghép đúng."], fix:["Đối chiếu Bảng 9a.1."]},
  dv:  {ok:["Chính xác!"], fix:["Đọc hộp ghi nhớ trang 36."]},
  p36: {ok:["Chính xác!"], fix:["Danh sách khoản thu nằm ở vùng nào của cột F?"]},
  nv1: {ok:["Đúng thứ tự."], fix:["Phải chọn vùng ô trước khi mở hộp thoại Data Validation."]},
  nv2: {ok:["Chính xác!"], fix:["Số tiền là số nguyên lớn hơn 0."]},
  nv3: {ok:["Chính xác!"], fix:["Thử nhập số âm trên mô phỏng."]},
  lt1: {ok:["Đặt đúng điều kiện xác thực."], fix:["Kiểm tra lại Source của cột B."]},
  vd1: {ok:["Bảng tính hợp lí, có xác thực dữ liệu."], fix:["Cột số tiền đã hạn chế giá trị lớn hơn 0 chưa?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {thuchi: "Khoản thu là tiền gia đình nhận được; khoản chi là tiền gia đình tiêu."};
const MATCH_HINT = {allow: "Đối chiếu Bảng 9a.1."};
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
    {title:"Dự án Quản lí tài chính gia đình", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Công cụ xác thực dữ liệu", acts:[
    {title:"Hoạt động 1: Xây dựng cấu trúc bảng tính", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Sử dụng bảng tính để quản lí tài chính gia đình", tasks:["thuchi"]},
    {title:"Đọc hiểu: Công cụ xác thực dữ liệu", tasks:["dv","allow"], concept:"c1"},
    {title:"Câu hỏi SGK trang 36", tasks:["p36"]},
    {title:"Ghi bài: Công cụ xác thực dữ liệu", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ 1, 2: Bảng tính quản lí tài chính gia đình", tasks:["nv1","nv2","nv3"], concept:"c2"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Trang tính Thu nhập", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Kinh phí Triển lãm tin học", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai9a", title: "Bài 9a. Sử dụng công cụ xác thực dữ liệu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 chọn Source sai vùng nên danh sách thiếu khoản Khác vì…",
  commentPh: "Ví dụ: Nhóm đặt đúng danh sách thả xuống; cần thêm Error Alert cho cột Số tiền."};
})();
