/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Để việc chi tiêu của gia đình được kiểm soát thường xuyên, dữ liệu thu và chi cần được tổng hợp để trả lời các câu hỏi: Mỗi khoản chi đã được chi bao nhiêu lần? Mỗi khoản thu đã được thu bao nhiêu lần? Tổng số tiền đã chi tiêu của từng khoản chi là bao nhiêu? Tổng số tiền thu nhập của từng khoản thu là bao nhiêu? Thu nhập và chi tiêu của gia đình đã cân đối chưa? Theo em, có thể dùng những hàm nào em đã biết để trả lời các câu hỏi trên? Câu hỏi nào em chưa trả lời được?",
    k:"Hàm SUM, COUNT tính tổng, đếm cho <b>cả vùng</b>; nhưng để đếm, tính tổng <b>theo từng khoản</b> (theo điều kiện) cần các hàm mới: <b>COUNTIF</b> (bài này), SUMIF, IF (các bài sau)."},
  hd1:{type:"open", label:"HĐ1 – Các khoản chi được tổng hợp như thế nào?", q:"Giả sử dữ liệu chi tiêu đã được cập nhật trong vùng A3:D10 (Hình 10a.1). Theo em, công thức tại các ô G2, G3,…, G10 là gì để em có thể biết số lần chi tiêu của mỗi khoản?",
    k:"Cần đếm số ô trong vùng B3:B10 có giá trị bằng tên khoản chi ở cột F: dùng hàm đếm theo điều kiện <b>=COUNTIF($B$3:$B$10,F2)</b> tại G2 rồi sao chép xuống G10."},
  vd:{type:"match", label:"Đọc hiểu – Bảng 10a.1", q:"Ghép mỗi yêu cầu tính toán với công thức tương ứng (thử trên bảng tính mô phỏng).",
    items:[["Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100",1],["Đếm số ô trong vùng A1:A4 chứa từ Yes",2],["Đếm số ô trong vùng A1:A4 chứa xâu kí tự bắt đầu bằng chữ cái Y",3],["Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2",4]],
    opts:['a) =COUNTIF(A1:A4,">100")','b) =COUNTIF(A1:A4,"Yes")','c) =COUNTIF(A1:A4,"Y*")','d) =COUNTIF(A1:A4,D2)'],
    k:"1 – a; 2 – b; 3 – c (dấu * thay cho dãy kí tự bất kì); 4 – d (điều kiện là giá trị của ô D2)."},
  thamso:{type:"match", label:"Đọc hiểu – Tham số của COUNTIF", q:"Trong công thức =COUNTIF(range, criteria), ghép mỗi tham số với ý nghĩa của nó.",
    items:[["range",1],["criteria",2]], opts:["a) Phạm vi chứa các ô tính cần kiểm tra để đếm","b) Điều kiện kiểm tra các ô tính trong phạm vi range"],
    k:"<b>range</b>: phạm vi chứa các ô tính cần kiểm tra để đếm; <b>criteria</b>: điều kiện kiểm tra các ô tính trong phạm vi range."},
  g2:{type:"mcq", label:"Đọc hiểu – Công thức ở ô G2", q:"Vì sao công thức =COUNTIF($B$3:$B$10,\"Ở\") ở ô G2 được sửa lại thành =COUNTIF($B$3:$B$10,F2)?",
    o:["Vì tên khoản chi Ở đã được lưu ở ô F2; khi sao chép công thức xuống G3 đến G10, F2 tự đổi thành F3,…, F10 nên tính được số lần chi của các khoản còn lại.","Vì hàm COUNTIF không nhận điều kiện là chữ.","Vì công thức cũ cho kết quả sai.","Vì để công thức ngắn hơn."], a:0,
    k:"Dùng địa chỉ ô <b>F2</b> (địa chỉ tương đối) làm điều kiện để <b>sao chép</b> được công thức cho các khoản chi khác; vùng <b>$B$3:$B$10</b> (địa chỉ tuyệt đối) giữ nguyên."},
  p43a:{type:"mcq", label:"Câu hỏi tr.43 – a", q:"Trong Hình 10a.2, công thức ở ô G2 là =COUNTIF($B$3:$B$10,F2). Khi sao chép công thức sang các ô G3,…, G10, công thức sẽ thay đổi như thế nào?",
    o:["Vùng $B$3:$B$10 giữ nguyên, chỉ F2 đổi thành F3,…, F10. Ví dụ G3: =COUNTIF($B$3:$B$10,F3).","Cả hai tham số đều thay đổi.","Công thức không thay đổi.","Vùng thay đổi thành $B$4:$B$11."], a:0,
    k:"Địa chỉ tuyệt đối <b>$B$3:$B$10</b> giữ nguyên; địa chỉ tương đối <b>F2</b> đổi thành F3, F4,…, F10."},
  p43b:{type:"mcq", label:"Câu hỏi tr.43 – b", q:"Nếu bỏ các dấu $ thì công thức ở ô G2 sẽ là =COUNTIF(B3:B10,F2). Sau khi sao chép công thức này sang các ô từ G3 đến G10, kết quả trả về tại các ô đó có đúng không? Tại sao?",
    o:["Không đúng: vùng đếm bị dịch xuống (G3: B4:B11, G4: B5:B12,…) nên bỏ sót dữ liệu ở các hàng đầu.","Đúng, vì vùng không thay đổi.","Đúng, vì COUNTIF tự sửa vùng.","Không đúng vì COUNTIF không sao chép được."], a:0,
    k:"Không đúng. Khi sao chép, <b>B3:B10</b> là địa chỉ tương đối nên đổi thành B4:B11, B5:B12,… → đếm thiếu các hàng phía trên. Cần giữ cố định vùng bằng dấu <b>$</b>."},
  nv1:{type:"mcq", label:"Thực hành – Trang tính Thu nhập", q:"Với dữ liệu trang tính Thu nhập (Hình 10a.3), công thức tại G2 và kết quả của khoản Làm thêm (ô G4) là:",
    o:["=COUNTIF($B$3:$B$8,F2); Làm thêm: 2","=COUNTIF(B3:B8,F2); Làm thêm: 1","=COUNT($B$3:$B$8); Làm thêm: 6","=COUNTIF($B$3:$B$8,\"Lương\"); Làm thêm: 2"], a:0,
    k:"G2: <b>=COUNTIF($B$3:$B$8,F2)</b>, sao chép xuống G6. Làm thêm có 2 lần thu (15/8 và 30/8)."},
  nv2:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: số lần chi của từng khoản chi và số lần thu của từng khoản thu trong bảng tính TaiChinhGiaDinh.xlsx của em. Khoản nào được chi nhiều lần nhất?",
    k:"Ví dụ với dữ liệu Hình 10a.1: Ở 2 lần; Ăn, Di chuyển, Học tập, Sức khoẻ, Quà tặng/Từ thiện, Tiết kiệm 1 lần; Giải trí, Khác 0 lần."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Bổ sung thêm một số dòng dữ liệu thu, chi vào cả hai trang tính Thu nhập và Chi tiêu. Em đã điều chỉnh công thức COUNTIF ở cột G như thế nào để kết quả tổng hợp số lần thu, chi của mỗi khoản được chính xác?",
    k:"Mở rộng vùng đếm cho đủ các dòng mới, ví dụ $B$3:$B$10 → <b>$B$3:$B$20</b> (ở G2), rồi sao chép lại xuống các ô còn lại của cột G."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Với dữ liệu khảo sát ở Hình 10a.6, công thức tại E5 và kết quả thống kê A, B, C, D lần lượt là:",
    o:["=COUNTIF($B$4:$B$13,D5); A: 3, B: 2, C: 3, D: 2","=COUNTIF(B4:B13,D5); A: 3, B: 3, C: 2, D: 2","=COUNT($B$4:$B$13); 10, 10, 10, 10","=COUNTIF($B$4:$B$13,\"A\"); 3, 3, 3, 3"], a:0,
    k:"E5: <b>=COUNTIF($B$4:$B$13,D5)</b>, sao chép xuống E8. Kết quả: A 3, B 2, C 3, D 2 (tổng 10 học sinh)."},
  vd1:{type:"open", label:"Vận dụng", q:"Mở bảng tính KinhPhiTrienLam.xlsx (Vận dụng Bài 9a), sử dụng hàm COUNTIF để tính số lần thu của mỗi khoản thu, số lần chi của mỗi khoản chi của dự án Triển lãm tin học. Ghi lại các công thức em đã dùng.",
    k:"Ví dụ trang tính Các khoản thu: G2 =COUNTIF($B$3:$B$20,F2), sao chép sang G3; trang tính Các khoản chi tương tự."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Hàm <b>COUNTIF</b> đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).</li><li>Công thức: <b>=COUNTIF(range, criteria)</b> – range: phạm vi chứa các ô tính cần kiểm tra để đếm; criteria: điều kiện kiểm tra các ô tính trong phạm vi range.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Vùng đếm dùng <b>địa chỉ tuyệt đối</b> ($B$3:$B$10), điều kiện dùng <b>địa chỉ ô tương đối</b> (F2) để sao chép công thức cho các khoản khác.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Cần <b>đếm</b>, <b>tính tổng</b> theo từng khoản thu, chi → dùng hàm có điều kiện.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hàm COUNTIF</p><ul>'
    + "<li><b>=COUNTIF(range, criteria)</b>: đếm số ô trong <b>range</b> thoả mãn điều kiện <b>criteria</b>.</li>"
    + "<li>VD: =COUNTIF(A1:A4,\">100\"); =COUNTIF(A1:A4,\"Y*\"); =COUNTIF($B$3:$B$10,F2).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Chi tiêu: G2 = <b>COUNTIF($B$3:$B$10,F2)</b>; Thu nhập: G2 = <b>COUNTIF($B$3:$B$8,F2)</b>; sao chép xuống.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thêm dữ liệu thì <b>mở rộng vùng</b> đếm; khảo sát: =COUNTIF($B$4:$B$13,D5).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Dùng COUNTIF để thống kê số lần theo từng loại trong mọi bảng dữ liệu.</li>"
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
    return ["T9B10a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhận ra cần hàm có điều kiện."], fix:["Hàm SUM, COUNT có tính riêng cho từng khoản không?"]},
  hd1: {ok:["Công thức hợp lí."], fix:["Cần đếm những ô nào trong cột B?"]},
  vd:  {ok:["Ghép đúng."], fix:["Thử từng công thức trên bảng tính mô phỏng."]},
  thamso:{ok:["Chính xác!"], fix:["Đọc lại hộp ghi nhớ trang 42."]},
  g2:  {ok:["Hiểu đúng lí do."], fix:["Điều gì xảy ra với F2 khi sao chép xuống?"]},
  p43a:{ok:["Chính xác!"], fix:["Địa chỉ có dấu $ có thay đổi khi sao chép không?"]},
  p43b:{ok:["Giải thích đúng."], fix:["Thử bỏ dấu $ rồi sao chép trên bảng tính mô phỏng."]},
  nv1: {ok:["Chính xác!"], fix:["Đếm số dòng có khoản Làm thêm trong Hình 10a.3."]},
  nv2: {ok:["Báo cáo đầy đủ."], fix:["Ghi số lần của từng khoản."]},
  lt1: {ok:["Điều chỉnh vùng đúng."], fix:["Vùng đếm đã chứa các dòng mới chưa?"]},
  lt2: {ok:["Chính xác!"], fix:["Đếm lại số học sinh chọn mỗi trường."]},
  vd1: {ok:["Công thức đúng."], fix:["Kiểm tra vùng đếm và ô điều kiện."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {};
const MATCH_HINT = {vd: "Thử từng công thức trên bảng tính mô phỏng."};
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
    {title:"Tổng hợp thu, chi của gia đình", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hàm COUNTIF", acts:[
    {title:"Hoạt động 1: Các khoản chi được tổng hợp như thế nào?", tasks:["hd1"]},
    {title:"Đọc hiểu: Hàm COUNTIF", tasks:["vd","thamso","g2"], concept:"c1"},
    {title:"Câu hỏi SGK trang 43", tasks:["p43a","p43b"], concept:"c2"},
    {title:"Ghi bài: Hàm COUNTIF", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Tổng hợp chi tiêu theo mỗi khoản", tasks:["nv1","nv2"]},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bổ sung dữ liệu và khảo sát chọn trường", tasks:["lt1","lt2"]},
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
window.LESSON = {STAGES, id: "tin9-bai10a", title: "Bài 10a. Sử dụng hàm COUNTIF", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 bỏ dấu $ nên kết quả ở các ô dưới bị sai vì…",
  commentPh: "Ví dụ: Nhóm viết đúng COUNTIF; cần cố định vùng đếm bằng dấu $."};
})();
