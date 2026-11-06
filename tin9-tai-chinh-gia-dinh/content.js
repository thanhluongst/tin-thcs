/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Dự án sử dụng bảng tính điện tử quản lí tài chính gia đình đã hoàn thành các trang tính Thu nhập và Chi tiêu. Theo em, để cân đối thu, chi, giúp kiểm soát chi tiêu gia đình hiệu quả, bảng tính cần bổ sung thông tin gì?",
    k:"Một trang tính <b>tổng hợp</b>: tổng thu nhập, tổng chi tiêu, phần chênh lệch (thu − chi) và biểu đồ so sánh trực quan."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Hãy chỉ ra mối liên hệ về dữ liệu của trang tính Tổng hợp ở Hình 13a.3 với hai trang tính Thu nhập và Chi tiêu ở Hình 13a.1 và Hình 13a.2.",
    k:"Tổng thu nhập (17 500) ở trang Tổng hợp chính là ô <b>H7</b> của trang Thu nhập; tổng chi tiêu (13 640) chính là ô <b>H11</b> của trang Chi tiêu; Giá trị NET = thu − chi."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Trong trang tính Tổng hợp, công thức để tính tổng thu nhập ở ô B14 và tổng số tiền chi tiêu ở ô B15 là:",
    o:["B14: ='Thu nhập'!H7; B15: ='Chi tiêu'!H11","B14: =H7; B15: =H11","B14: =SUM(H2:H6); B15: =SUM(H2:H10)","B14: ='Chi tiêu'!H7; B15: ='Thu nhập'!H11"], a:0,
    k:"Lấy giá trị từ trang tính khác: <b>='Thu nhập'!H7</b> và <b>='Chi tiêu'!H11</b>. Dữ liệu được cập nhật tự động khi hai trang tính kia thay đổi."},
  net:{type:"mcq", label:"Đọc hiểu – Giá trị NET", q:"Giá trị NET ở ô B16 được tính bằng =B14-B15. Với dữ liệu mẫu, Giá trị NET và ý nghĩa của nó là:",
    o:["3 860: thu nhiều hơn chi 3 860 nghìn đồng; nếu giá trị NET âm thì gia đình đang chi tiêu nhiều, cần báo động để mọi người tiết kiệm.","31 140: tổng thu và chi.","−3 860: gia đình đang thiếu tiền.","3 860: số lần chi tiêu."], a:0,
    k:"Giá trị NET là số tiền <b>chênh lệch giữa thu và chi</b>: 17 500 − 13 640 = 3 860. NET âm cho thấy chi tiêu nhiều hơn thu, cần báo động."},
  p53a:{type:"match", label:"Câu hỏi tr.53 – câu 1", q:"Hình 13a.4 là công thức ='Thu nhập'!H7 lấy tổng tiền thu nhập từ trang tính Thu nhập đưa vào trang Tổng hợp. Ghép mỗi cụm từ với vị trí (1), (2), (3) cho phù hợp.",
    items:[["(1) 'Thu nhập'",1],["(2) !",2],["(3) H7",3]], opts:["Tên trang tính","Dấu chấm than","Địa chỉ ô"],
    k:"(1) – Tên trang tính; (2) – Dấu chấm than; (3) – Địa chỉ ô."},
  p53b:{type:"mcq", label:"Câu hỏi tr.53 – câu 2", q:"Trong một bảng tính có chứa nhiều trang tính, nếu công thức tham chiếu đến địa chỉ ô ở một trang tính khác thì địa chỉ ô đó gồm những thành phần gì?",
    o:["Tên trang tính, dấu chấm than (!) và địa chỉ ô.","Chỉ có địa chỉ ô.","Tên tệp và địa chỉ ô.","Tên trang tính và dấu hai chấm (:)."], a:0,
    k:"<b>Tên trang tính</b> + <b>!</b> + <b>địa chỉ ô</b>, ví dụ ='Thu nhập'!H7. Tên trang tính có dấu cách được đặt trong cặp dấu nháy đơn."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hiện nhiệm vụ hoàn thiện bảng tính quản lí tài chính gia đình.",
    items:{a:"Trang Thu nhập: tại H7 nhập =SUM(H2:H6).",b:"Trang Chi tiêu: tại H11 nhập =SUM(H2:H10).",c:"Tạo trang tính mới, đặt tên Tổng hợp, A1: Cân đối thu chi.",d:"Tạo bảng A13:B16: B14 ='Thu nhập'!H7, B15 ='Chi tiêu'!H11, B16 =B14-B15.",e:"Chọn A13:B15, Insert → Charts → Clustered Column; đặt biểu đồ vào A2:B12."},
    start:["d","a","e","c","b"], ans:["a","b","c","d","e"],
    k:"Tính tổng ở hai trang tính → tạo trang Tổng hợp → bảng A13:B16 → biểu đồ cột."},
  nv2:{type:"mcq", label:"Thực hành – Biểu đồ", q:"Để vẽ biểu đồ cột hiển thị trực quan giá trị thu và chi (Hình 13a.3), em chọn vùng dữ liệu nào và dạng biểu đồ nào?",
    o:["Vùng A13:B15; Insert → Charts → Clustered Column.","Vùng A13:B16; biểu đồ hình tròn.","Vùng B14:B16; biểu đồ đường.","Toàn bộ trang tính Chi tiêu; biểu đồ cột."], a:0,
    k:"Chọn <b>A13:B15</b> (nội dung và số tiền của Thu nhập, Chi tiêu), dải lệnh <b>Insert</b> → nhóm <b>Charts</b> → <b>Clustered Column</b>."},
  lt1:{type:"open", label:"Luyện tập", q:"Bổ sung một số dòng dữ liệu thu, chi vào cả hai trang tính Thu nhập và Chi tiêu, sửa lại các công thức cho đúng vùng dữ liệu mới. Quan sát để thấy dữ liệu đã được cập nhật tự động vào trang tính Tổng hợp. Từ Giá trị NET, em hãy đánh giá tình hình tài chính hiện tại của gia đình và đề xuất những điều chỉnh chi tiêu sao cho phù hợp.",
    k:"Mở rộng vùng của COUNTIF, SUMIF, SUM. Trang Tổng hợp tự cập nhật. NET dương: thu đủ chi, có thể tăng tiết kiệm; NET âm hoặc nhỏ: cắt giảm khoản chi không thiết yếu (theo quy tắc 50-30-20)."},
  vd1:{type:"open", label:"Vận dụng", q:"Tạo trang tính Tổng hợp để cân đối kinh phí cho dự án Triển lãm tin học, trong đó tiền thu được lấy từ trang tính lưu các khoản thu, tiền chi được lấy từ trang tính lưu các khoản chi của triển lãm. Dựa trên dữ liệu của trang Tổng hợp, thảo luận với bạn để đánh giá tình hình kinh phí của dự án và điều chỉnh phù hợp.",
    k:"Ví dụ: B14 ='Các khoản thu'!H4; B15 ='Các khoản chi'!H4; B16 =B14-B15; vẽ biểu đồ cột A13:B15."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Khi sử dụng bảng tính điện tử quản lí tài chính gia đình, dữ liệu thu, chi được lưu trữ, cập nhật và hiển thị trực quan, sinh động, dễ so sánh,… giúp các gia đình kiểm soát chi tiêu hiệu quả.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Tham chiếu ô ở trang tính khác: <b>='Tên trang tính'!Địa chỉ ô</b>, ví dụ ='Thu nhập'!H7. Dữ liệu được cập nhật tự động.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Cần trang tính <b>Tổng hợp</b> để cân đối thu, chi.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Trang tính tổng hợp dữ liệu tài chính gia đình</p><ul>'
    + "<li>Lấy dữ liệu từ trang tính khác: <b>='Thu nhập'!H7</b>, <b>='Chi tiêu'!H11</b> (tên trang tính, dấu !, địa chỉ ô).</li>"
    + "<li><b>Giá trị NET</b> = thu − chi; NET âm → chi nhiều, cần tiết kiệm. Biểu đồ giúp so sánh trực quan.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>H7 =SUM(H2:H6), H11 =SUM(H2:H10); trang <b>Tổng hợp</b>: B14, B15, B16 =B14-B15; biểu đồ <b>Clustered Column</b> từ A13:B15.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thêm dữ liệu → sửa vùng công thức → trang Tổng hợp <b>tự cập nhật</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Trang Tổng hợp giúp đánh giá và điều chỉnh kinh phí dự án.</li>"
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
    return ["T9B13a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Ý tưởng hợp lí."], fix:["Làm sao biết thu có đủ chi không?"]},
  hd1a:{ok:["Chỉ đúng mối liên hệ."], fix:["So sánh 17 500 và 13 640 với các ô ở hai trang tính kia."]},
  hd1b:{ok:["Chính xác!"], fix:["Tổng thu nằm ở ô nào của trang Thu nhập?"]},
  net: {ok:["Chính xác!"], fix:["NET = thu − chi."]},
  p53a:{ok:["Ghép đúng."], fix:["Phần trong dấu nháy đơn là gì?"]},
  p53b:{ok:["Chính xác!"], fix:["Xem lại Hình 13a.4."]},
  nv1: {ok:["Đúng thứ tự."], fix:["Phải có tổng ở hai trang tính trước khi tham chiếu."]},
  nv2: {ok:["Chính xác!"], fix:["Biểu đồ so sánh Thu nhập và Chi tiêu, không gồm NET."]},
  lt1: {ok:["Đánh giá và đề xuất hợp lí."], fix:["Dựa vào Giá trị NET để nhận xét."]},
  vd1: {ok:["Trang Tổng hợp đúng."], fix:["Kiểm tra tên trang tính trong công thức."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {};
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
    {title:"Bảng tính cần bổ sung gì?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Trang tính Tổng hợp", acts:[
    {title:"Hoạt động 1: Tổng hợp dữ liệu tài chính gia đình", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Trang tính Tổng hợp", tasks:["net"], concept:"c1"},
    {title:"Câu hỏi SGK trang 53", tasks:["p53a","p53b"], concept:"c2"},
    {title:"Ghi bài: Trang tính Tổng hợp", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Hoàn thiện bảng tính quản lí tài chính gia đình", tasks:["nv1","nv2"]},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Cập nhật dữ liệu và đánh giá", tasks:["lt1"]},
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
window.LESSON = {STAGES, id: "tin9-bai13a", title: "Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 gõ thiếu dấu nháy đơn quanh tên trang tính nên…",
  commentPh: "Ví dụ: Nhóm tham chiếu đúng trang tính; cần chọn đúng vùng A13:B15 khi vẽ biểu đồ."};
})();
