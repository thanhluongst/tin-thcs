/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Trong bài học trước, em đã sử dụng hàm đếm theo điều kiện để biết được số lần thu, chi theo từng khoản mục. Theo em, để biết tổng số tiền đã chi cho từng khoản mục (ví dụ tổng tiền khoản Ở), em cần làm gì?",
    k:"Cần cộng các số tiền ở những dòng có khoản chi tương ứng – tính <b>tổng theo điều kiện</b>: dùng hàm <b>SUMIF</b>."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Hình 11a.1 là trang tính Chi tiêu đã được bổ sung thêm cột Tổng tiền. Con số 920 ở ô H2 mang ý nghĩa gì?",
    o:["Tổng số tiền đã chi cho khoản Ở (800 + 120).","Số lần chi của khoản Ở.","Tổng tất cả các khoản chi.","Số tiền chi lớn nhất."], a:0,
    k:"920 là <b>tổng số tiền đã chi cho khoản Ở</b>: tiền điện tháng 8 (800) + tiền nước tháng 8 (120)."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Công thức ở ô H2 liên quan đến những dữ liệu nào trong vùng dữ liệu A3:D10?",
    o:["Cột Khoản chi B3:B10 (để kiểm tra khoản Ở) và cột Số tiền D3:D10 (để cộng các số tiền tương ứng).","Chỉ cột Ngày A3:A10.","Chỉ cột Nội dung C3:C10.","Toàn bộ vùng A3:D10 đều được cộng."], a:0,
    k:"Kiểm tra khoản chi ở <b>B3:B10</b>, cộng các số tiền tương ứng ở <b>D3:D10</b> (hàng 3 và hàng 8)."},
  b111:{type:"match", label:"Đọc hiểu – Bảng 11a.1", q:"Ghép mỗi công thức với ý nghĩa của nó (thử trên bảng tính mô phỏng).",
    items:[['=SUMIF(A1:A5,">5")',1],['=SUMIF(A2:A5,"Khoa",B2:B5)',2]],
    opts:["a) Tính tổng các giá trị lớn hơn 5 trong vùng A1:A5","b) Tính tổng các giá trị trong vùng B2:B5 với các ô tương ứng trong vùng A2:A5 có giá trị là “Khoa” (tổng tiền Khoa đã chi)"],
    k:"Dạng 1 (không có sum_range): cộng chính các ô của range thoả mãn điều kiện. Dạng 2: kiểm tra range A2:A5, cộng các ô tương ứng ở sum_range B2:B5."},
  thamso:{type:"match", label:"Đọc hiểu – Tham số của SUMIF", q:"Trong công thức =SUMIF(range, criteria, [sum_range]), ghép mỗi tham số với ý nghĩa.",
    items:[["range",1],["criteria",2],["sum_range (tuỳ chọn)",3]],
    opts:["a) Phạm vi chứa các giá trị cần kiểm tra hoặc tính tổng các giá trị nếu không có tham số sum_range","b) Điều kiện kiểm tra","c) Phạm vi chứa các giá trị cần tính tổng; nếu bị bỏ qua thì tính tổng các ô trong range thoả mãn điều kiện"],
    k:"range – a; criteria – b; sum_range – c."},
  chon:{type:"sort", label:"Đọc hiểu – Chọn hàm phù hợp", q:"Mỗi câu hỏi dưới đây về trang tính Chi tiêu nên dùng hàm nào?",
    cats:["SUM","COUNTIF","SUMIF"],
    items:[["Tổng số tiền của tất cả các khoản chi",0],["Khoản Ở đã được chi bao nhiêu lần?",1],["Tổng số tiền đã chi cho khoản Ở",2],["Có bao nhiêu lần chi trên 1 000 nghìn đồng?",1],["Tổng các lần chi lớn hơn 1 000 nghìn đồng",2]],
    k:"Tổng cả vùng: <b>SUM</b>. Đếm theo điều kiện: <b>COUNTIF</b>. Tính tổng theo điều kiện: <b>SUMIF</b> (ví dụ =SUMIF(D3:D10,\">1000\"))."},
  h2:{type:"mcq", label:"Đọc hiểu – Công thức ở ô H2", q:"Công thức tại ô H2 (Hình 11a.2) để có thể sao chép đúng sang H3 đến H10 là:",
    o:["=SUMIF($B$3:$B$10,F2,$D$3:$D$10)","=SUMIF(B3:B10,\"Ở\",D3:D10)","=SUMIF(B3:B10,F2,D3:D10)","=SUM($D$3:$D$10)"], a:0,
    k:"Tên khoản chi Ở đã lưu ở ô <b>F2</b> nên điều kiện là F2 (thay đổi khi sao chép); hai vùng phải là <b>địa chỉ tuyệt đối</b>: =SUMIF($B$3:$B$10,F2,$D$3:$D$10)."},
  p47:{type:"mcq", label:"Câu hỏi tr.47", q:"Hình 11a.3 minh hoạ dữ liệu của trang tính Thu nhập. Công thức cần nhập vào ô H2 là gì, giá trị của ô H2 có ý nghĩa gì?",
    o:["=SUMIF($B$3:$B$8,F2,$D$3:$D$8); H2 = 10 000 là tổng tiền của khoản thu Lương.","=COUNTIF($B$3:$B$8,F2); H2 = 1 là số lần thu Lương.","=SUM($D$3:$D$8); H2 là tổng thu nhập.","=SUMIF($B$3:$B$8,F2); H2 là tổng tiền khoản Lương."], a:0,
    k:"<b>=SUMIF($B$3:$B$8,F2,$D$3:$D$8)</b>; H2 = 10 000 (nghìn đồng) là <b>tổng tiền thu của khoản Lương</b>. (Thiếu sum_range thì SUMIF cộng chính các ô chữ ở cột B nên kết quả là 0.)"},
  nv1:{type:"mcq", label:"Thực hành – Kết quả", q:"Sau khi sao chép công thức ở trang tính Thu nhập, tổng tiền của khoản Làm thêm (ô H4) là:",
    o:["3 500","1 500","2 000","2"], a:0,
    k:"Làm thêm có hai lần thu: 1 500 + 2 000 = <b>3 500</b> (nghìn đồng)."},
  nv2:{type:"open", label:"Thực hành – Báo cáo", q:"Ghi lại tổng tiền của từng khoản chi trong trang tính Chi tiêu. Khoản nào chi nhiều tiền nhất? Theo em, gia đình nên điều chỉnh chi tiêu thế nào?",
    k:"Với dữ liệu Hình 11a.1: Ăn 8 000, Học tập 2 200, Tiết kiệm 1 000, Ở 920, Sức khoẻ 620, Di chuyển 600, Quà tặng/Từ thiện 300. Khoản Ăn chi nhiều nhất; tránh chi quá nhiều cho những nhu cầu không thiết yếu."},
  lt1:{type:"open", label:"Luyện tập", q:"Bổ sung thêm một số dòng dữ liệu thu, chi vào cuối phần dữ liệu của cả hai trang tính Thu nhập và Chi tiêu. Em đã điều chỉnh công thức SUMIF ở cột H như thế nào để kết quả tổng tiền của mỗi khoản được chính xác?",
    k:"Mở rộng cả hai vùng range và sum_range cho đủ các dòng mới, ví dụ <b>=SUMIF($B$3:$B$20,F2,$D$3:$D$20)</b>, rồi sao chép lại cho cột H (và sửa COUNTIF ở cột G tương tự)."},
  vd1:{type:"open", label:"Vận dụng", q:"Mở bảng tính KinhPhiTrienLam.xlsx (Vận dụng Bài 10a) và sử dụng hàm SUMIF để tính tổng các khoản thu, chi của dự án Triển lãm tin học. Ghi lại các công thức em đã dùng.",
    k:"Ví dụ trang tính Các khoản chi: H2 =SUMIF($B$3:$B$20,F2,$D$3:$D$20), sao chép sang H3; trang tính Các khoản thu tương tự."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Hàm <b>SUMIF</b> tính tổng giá trị của những ô thoả mãn một điều kiện nào đó.</li><li>Công thức: <b>=SUMIF(range, criteria, [sum_range])</b> – range: phạm vi chứa các giá trị cần kiểm tra hoặc tính tổng các giá trị nếu không có tham số sum_range; criteria: điều kiện kiểm tra; sum_range (tuỳ chọn): phạm vi chứa các giá trị cần tính tổng, nếu sum_range bị bỏ qua thì tính tổng các ô trong tham số range thoả mãn điều kiện.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Tính tổng tiền theo từng khoản mục → <b>tính tổng theo điều kiện</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hàm SUMIF</p><ul>'
    + "<li><b>=SUMIF(range, criteria, [sum_range])</b>: tính tổng các ô thoả mãn điều kiện.</li>"
    + "<li>Có <b>sum_range</b>: kiểm tra ở range, cộng ở sum_range. Không có: cộng chính các ô của range.</li>"
    + "<li>VD: =SUMIF(A1:A5,\">5\"); =SUMIF($B$3:$B$10,F2,$D$3:$D$10).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Chi tiêu: H2 = <b>SUMIF($B$3:$B$10,F2,$D$3:$D$10)</b>; Thu nhập: H2 = <b>SUMIF($B$3:$B$8,F2,$D$3:$D$8)</b>; sao chép xuống.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thêm dữ liệu thì <b>mở rộng cả range và sum_range</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>SUMIF giúp tổng hợp tiền theo từng khoản trong mọi bảng thu, chi.</li>"
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
    return ["T9B11a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhận ra cần tính tổng theo điều kiện."], fix:["Hàm SUM có tính riêng cho khoản Ở không?"]},
  hd1a:{ok:["Chính xác!"], fix:["Cộng số tiền ở những dòng có khoản chi Ở."]},
  hd1b:{ok:["Chính xác!"], fix:["Cần kiểm tra cột nào, cộng cột nào?"]},
  b111:{ok:["Ghép đúng."], fix:["Thử hai công thức trên bảng tính mô phỏng."]},
  thamso:{ok:["Chính xác!"], fix:["Đọc lại hộp ghi nhớ trang 46."]},
  chon:{ok:["Chọn đúng hàm."], fix:["Câu hỏi hỏi “bao nhiêu lần” hay “tổng tiền”?"]},
  h2:  {ok:["Chính xác!"], fix:["Hai vùng có cần cố định khi sao chép không?"]},
  p47: {ok:["Chính xác!"], fix:["Cột nào chứa số tiền thu?"]},
  nv1: {ok:["Chính xác!"], fix:["Cộng các khoản Làm thêm trong Hình 11a.3."]},
  nv2: {ok:["Nhận xét hợp lí."], fix:["So sánh tổng tiền các khoản chi."]},
  lt1: {ok:["Điều chỉnh đúng."], fix:["Cả hai vùng range và sum_range đã chứa dòng mới chưa?"]},
  vd1: {ok:["Công thức đúng."], fix:["Kiểm tra sum_range là cột số tiền."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {chon: "“Bao nhiêu lần” → đếm; “tổng tiền” → tính tổng."};
const MATCH_HINT = {b111: "Thử hai công thức trên bảng tính mô phỏng."};
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
    {title:"Tổng tiền theo từng khoản", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hàm SUMIF", acts:[
    {title:"Hoạt động 1: Tổng hợp chi tiêu theo từng khoản", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Hàm SUMIF", tasks:["b111","thamso","chon","h2"], concept:"c1"},
    {title:"Câu hỏi SGK trang 47", tasks:["p47"]},
    {title:"Ghi bài: Hàm SUMIF", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Tổng số tiền của mỗi khoản", tasks:["nv1","nv2"]},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bổ sung dữ liệu thu, chi", tasks:["lt1"]},
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
window.LESSON = {STAGES, id: "tin9-bai11a", title: "Bài 11a. Sử dụng hàm SUMIF", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 quên tham số sum_range nên kết quả bằng 0 vì…",
  commentPh: "Ví dụ: Nhóm viết đúng SUMIF; cần cố định cả hai vùng bằng dấu $."};
})();
