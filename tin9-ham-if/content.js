/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Quy tắc 50-30-20 khuyên chúng ta nên dành 50% số tiền của mình cho nhu cầu thiết yếu (ăn, ở, sức khoẻ,…), 30% cho mong muốn cá nhân (giải trí, thời trang,…) và 20% cho tiết kiệm. Theo em, chi tiêu của gia đình đã cân đối, hợp lí hay chưa được nhận xét dựa vào đâu?",
    k:"So sánh <b>tỉ lệ</b> tiền chi cho mỗi mục (thiết yếu, mong muốn cá nhân, tiết kiệm) với tổng chi, đối chiếu với quy tắc 50% – 30% – 20%; tuỳ tình hình thực tế mà điều chỉnh."},
  muc:{type:"sort", label:"Đọc hiểu – Quy tắc 50-30-20", q:"Xếp mỗi khoản chi vào mục chi phù hợp theo quy tắc 50-30-20 (Hình 12a.2).",
    cats:["A – Nhu cầu thiết yếu (50%)","B – Mong muốn cá nhân (30%)","C – Tiết kiệm (20%)"],
    items:[["Ở",0],["Ăn",0],["Di chuyển",0],["Học tập",0],["Sức khoẻ",0],["Giải trí",1],["Quà tặng/Từ thiện",1],["Khác",1],["Tiết kiệm",2]],
    k:"A: ở, ăn, di chuyển, học tập, sức khoẻ. B: giải trí, quà tặng/từ thiện, khác. C: tiết kiệm."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Công thức ở ô M3 (tổng tiền mục A) và ô N3 (tỉ lệ mục A) trong Hình 12a.3 là:",
    o:["M3: =SUMIF($I$2:$I$10,K3,$H$2:$H$10); N3: =M3/$H$11*100%","M3: =SUM(H2:H10); N3: =M3/H11","M3: =COUNTIF($I$2:$I$10,K3); N3: =M3*100","M3: =SUMIF(I2:I10,\"A\"); N3: =H11/M3"], a:0,
    k:"Tổng tiền mỗi mục: <b>SUMIF</b> kiểm tra cột Mục chi I, cộng cột Tổng tiền H. Tỉ lệ: tổng tiền mục chia tổng tất cả các khoản ở <b>$H$11</b>."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Viết quy tắc để đưa ra nhận xét tình trạng chi tiêu như minh hoạ ở cột O trong Hình 12a.3 dựa trên quy tắc quản lí tài chính 50-30-20.",
    k:"Nhu cầu thiết yếu: nếu tỉ lệ chi lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn”. Tương tự với Mong muốn cá nhân (30%) và Tiết kiệm (20%)."},
  ts:{type:"match", label:"Đọc hiểu – Tham số của hàm IF", q:"Trong công thức =IF(logical_test,[value_if_true],[value_if_false]), ghép mỗi tham số với ý nghĩa.",
    items:[["logical_test",1],["value_if_true",2],["value_if_false",3]],
    opts:["a) Điều kiện kiểm tra","b) Giá trị trả về nếu điều kiện là đúng","c) Giá trị trả về nếu điều kiện là sai"],
    k:"logical_test – a; value_if_true – b; value_if_false – c."},
  o3:{type:"mcq", label:"Đọc hiểu – Công thức ở ô O3", q:"Ô N3 có giá trị 90.5%. Công thức =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") ở ô O3 cho kết quả:",
    o:["Nhiều hơn","Ít hơn","TRUE","90.5%"], a:0,
    k:"90.5% &gt; 50% đúng → trả về value_if_true: <b>“Nhiều hơn”</b>."},
  long:{type:"mcq", label:"Đọc hiểu – Hàm IF lồng nhau", q:"Với công thức =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")), nếu N3 = 60% thì kết quả là:",
    o:["Nhiều hơn","Nhiều quá","Ít hơn","Báo lỗi"], a:0,
    k:"60% &gt; 80% sai → xét IF thứ hai: 60% &gt; 50% đúng → <b>“Nhiều hơn”</b>. Nếu N3 = 90.5% thì “Nhiều quá”; N3 = 40% thì “Ít hơn”."},
  p49:{type:"mcq", label:"Câu hỏi tr.49", q:"Công thức trong các ô O4 và O5 ở Hình 12a.3 để nhận xét về tình trạng của mục Mong muốn cá nhân và Tiết kiệm dựa trên quy tắc 50-30-20 là:",
    o:["O4: =IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\"); O5: =IF(N5>20%,\"Nhiều hơn\",\"Ít hơn\")","O4: =IF(N4>50%,\"Nhiều hơn\",\"Ít hơn\"); O5: =IF(N5>50%,\"Nhiều hơn\",\"Ít hơn\")","O4: =IF(N4<30%,\"Nhiều hơn\",\"Ít hơn\"); O5: =IF(N5<20%,\"Nhiều hơn\",\"Ít hơn\")","O4: =SUMIF(N4,30%); O5: =SUMIF(N5,20%)"], a:0,
    k:"Mong muốn cá nhân so với <b>30%</b>, Tiết kiệm so với <b>20%</b>: O4 =IF(N4&gt;30%,…), O5 =IF(N5&gt;20%,…). Với dữ liệu mẫu đều “Ít hơn”."},
  nv1:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả bảng Tổng hợp mục chi: tổng chi, tỉ lệ và trạng thái của mỗi mục. Gia đình chi tiêu đã cân đối theo quy tắc 50-30-20 chưa?",
    k:"Dữ liệu mẫu: A 12 340 (90.5%) – Nhiều hơn; B 300 (2.2%) – Ít hơn; C 1 000 (7.3%) – Ít hơn. Chưa cân đối: chi thiết yếu quá nhiều, tiết kiệm ít."},
  lta:{type:"mcq", label:"Luyện tập – câu a, b", q:"Hình 12a.7: nếu doanh thu đạt trên 10 triệu thì tỉ lệ thưởng là 5%, còn không thì 0%. Công thức ở ô C2 và các đại lí được thưởng là:",
    o:["=IF(B2>10000,5%,0%); đại lí C và D","=IF(B2>=10000,5%,0%); đại lí B, C, D","=IF(B2>10,5%,0%); cả bốn đại lí","=IF(B2<10000,5%,0%); đại lí A"], a:0,
    k:"Doanh thu tính theo nghìn đồng nên 10 triệu = 10 000: <b>=IF(B2&gt;10000,5%,0%)</b>; B đúng 10 000 không “trên 10 triệu” → chỉ C, D được 5%. Tiền thưởng D2 = <b>B2*C2</b>: C 600, D 900."},
  ltc:{type:"mcq", label:"Luyện tập – câu c", q:"Cách tính mới: trên 20 triệu thưởng 6%; trên 15 triệu thưởng 4%; trên 10 triệu thưởng 2%; còn lại 0%. Công thức ở ô C2 là:",
    o:["=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))","=IF(B2>10000,2%,IF(B2>15000,4%,IF(B2>20000,6%,0%)))","=IF(B2>20000,6%,4%,2%,0%)","=IF(B2>20000,6%)+IF(B2>15000,4%)"], a:0,
    k:"Hàm IF lồng nhau, kiểm tra <b>từ mức cao xuống mức thấp</b>. Kết quả: A 0%, B 0%, C 2%, D 4%. (Nếu kiểm tra &gt;10000 trước thì D chỉ được 2% – sai.)"},
  vd1:{type:"mcq", label:"Vận dụng – câu 1", q:"Công thức tại ô O3 nhận xét theo ba mức: tỉ lệ chi lớn hơn 80% thì “Nhiều quá”, lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn” là:",
    o:["=IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"))","=IF(N3>50%,\"Nhiều hơn\",IF(N3>80%,\"Nhiều quá\",\"Ít hơn\"))","=IF(N3>80%,\"Nhiều quá\",\"Nhiều hơn\",\"Ít hơn\")","=IF(N3>50%,\"Nhiều quá\")"], a:0,
    k:"Kiểm tra mức 80% trước: <b>=IF(N3&gt;80%,\"Nhiều quá\",IF(N3&gt;50%,\"Nhiều hơn\",\"Ít hơn\"))</b> (Hình 12a.4)."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Sử dụng hàm IF lồng nhau tại ô O4 và O5 để nhận xét chi tiết hơn tình trạng chi của mục Mong muốn cá nhân và Tiết kiệm. Dựa trên quy tắc 50-30-20, em hãy điều chỉnh sao cho các mục chi được cân đối và tài chính gia đình được kiểm soát hiệu quả. Mô tả công thức và cách em điều chỉnh.",
    k:"Ví dụ O4: =IF(N4&gt;40%,\"Nhiều quá\",IF(N4&gt;30%,\"Nhiều hơn\",\"Ít hơn\")); O5: =IF(N5&gt;20%,\"Tốt\",IF(N5&gt;10%,\"Cần tăng\",\"Quá ít\")). Điều chỉnh: giảm chi thiết yếu chưa cần thiết, tăng tiết kiệm."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Hàm <b>IF</b> kiểm tra điều kiện và trả về một giá trị khi điều kiện đó đúng và một giá trị khác nếu điều kiện đó sai.</li><li>Công thức: <b>=IF(logical_test,[value_if_true],[value_if_false])</b> – logical_test: điều kiện kiểm tra; value_if_true: giá trị trả về nếu điều kiện là đúng; value_if_false: giá trị trả về nếu điều kiện là sai.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Khi cần kiểm tra nhiều mức, dùng các hàm <b>IF lồng nhau</b>: IF thứ hai đặt ở vị trí value_if_false của IF thứ nhất; kiểm tra từ mức cao xuống mức thấp.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Quy tắc <b>50-30-20</b>: 50% nhu cầu thiết yếu, 30% mong muốn cá nhân, 20% tiết kiệm.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hàm IF</p><ul>'
    + "<li><b>=IF(logical_test, value_if_true, value_if_false)</b>: điều kiện đúng → giá trị thứ nhất, sai → giá trị thứ hai.</li>"
    + "<li>VD: =IF(N3&gt;50%,\"Nhiều hơn\",\"Ít hơn\"). Nhiều mức: <b>IF lồng nhau</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Tổng chi mục: <b>SUMIF($I$2:$I$10,K3,$H$2:$H$10)</b>; tỉ lệ: <b>M3/$H$11*100%</b>; trạng thái: <b>IF</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thưởng theo nhiều mức: =IF(B2&gt;20000,6%,IF(B2&gt;15000,4%,IF(B2&gt;10000,2%,0%))).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Dùng IF lồng nhau để nhận xét chi tiết, điều chỉnh chi tiêu cho cân đối.</li>"
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
    return ["T9B12a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhận xét dựa trên tỉ lệ là hợp lí."], fix:["So sánh tỉ lệ mỗi mục chi với 50%, 30%, 20%."]},
  muc: {ok:["Phân loại đúng."], fix:["Khoản nào là nhu cầu bắt buộc phải chi?"]},
  hd1a:{ok:["Chính xác!"], fix:["Tổng tiền mục A gồm những khoản chi nào?"]},
  hd1b:{ok:["Quy tắc hợp lí."], fix:["Nêu rõ: nếu … thì …, còn không thì …"]},
  ts:  {ok:["Chính xác!"], fix:["Đọc lại hộp ghi nhớ trang 49."]},
  o3:  {ok:["Chính xác!"], fix:["So sánh 90.5% với 50%."]},
  long:{ok:["Chính xác!"], fix:["Xét lần lượt từng điều kiện từ trái sang phải."]},
  p49: {ok:["Chính xác!"], fix:["Mục Mong muốn cá nhân so với bao nhiêu phần trăm?"]},
  nv1: {ok:["Nhận xét đúng."], fix:["So sánh tỉ lệ từng mục với quy tắc."]},
  lta: {ok:["Chính xác!"], fix:["10 triệu bằng bao nhiêu nghìn đồng? “Trên” có gồm bằng không?"]},
  ltc: {ok:["Chính xác!"], fix:["Kiểm tra mức cao nhất trước."]},
  vd1: {ok:["Chính xác!"], fix:["Mức 80% phải được kiểm tra trước mức 50%."]},
  vd2: {ok:["Công thức và điều chỉnh hợp lí."], fix:["Thêm một mức nhận xét bằng IF lồng nhau."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {muc: "Nhu cầu thiết yếu là những khoản bắt buộc phải chi."};
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
    {title:"Quy tắc 50-30-20", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hàm IF", acts:[
    {title:"Hoạt động 1: Tổng hợp các khoản chi theo quy tắc 50-30-20", tasks:["muc","hd1a","hd1b"]},
    {title:"Đọc hiểu: Hàm IF", tasks:["ts","o3"], concept:"c1"},
    {title:"Đọc hiểu: Hàm IF lồng nhau", tasks:["long"], concept:"c2"},
    {title:"Câu hỏi SGK trang 49", tasks:["p49"]},
    {title:"Ghi bài: Hàm IF", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Bảng tổng hợp các mục chi", tasks:["nv1"]},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tiền thưởng của các đại lí", tasks:["lta","ltc"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Nhận xét chi tiết hơn", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai12a", title: "Bài 12a. Sử dụng hàm IF", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 kiểm tra mức 50% trước mức 80% nên…",
  commentPh: "Ví dụ: Nhóm viết đúng hàm IF; với nhiều mức cần IF lồng nhau từ mức cao xuống."};
})();
