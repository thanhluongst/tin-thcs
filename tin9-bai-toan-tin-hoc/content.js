/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Tính lương là một phần của những vấn đề mà doanh nghiệp cần phải giải quyết. Theo em, máy tính có thể giúp doanh nghiệp những việc gì trong việc trả lương cho nhân viên?",
    k:"Ví dụ: tính số tiền lương của từng người theo số giờ làm, lập phiếu chi lương, lưu trữ hồ sơ lương… nhanh, chính xác."},
  hd1:{type:"mcq", label:"HĐ1 – Nhiệm vụ của máy tính", q:"Hình 15.1 mô tả một quy trình thanh toán tiền lương. Bước nào trong quy trình đó thường được giao cho máy tính thực hiện?",
    o:["Tính toán tiền lương.","Bắt đầu.","Thanh toán tiền lương (trao tiền tận tay).","Kết thúc."], a:0,
    k:"Bước <b>Tính toán tiền lương</b> thường được giao cho máy tính. Quy trình giải quyết vấn đề có những bước (vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện."},
  hd2:{type:"open", label:"HĐ2 – Bài toán tính lương", q:"Hằng tuần, một công ti phải tính lương cho các nhân viên. Tiền lương của một nhân viên theo tuần phụ thuộc vào mức lương theo giờ và số giờ làm việc mỗi tuần (tối thiểu 1 giờ, tối đa 60 giờ). Định mức là 40 giờ/tuần; mỗi giờ vượt định mức được trả gấp 1,5 lần mức lương của họ. Hãy trình bày các bước giải quyết vấn đề tính lương của công ti.",
    k:"Tìm hiểu: biết mức lương theo giờ, số giờ làm (1–60), cần tính tiền lương tuần. Phân tích: chia thành giờ trong định mức (≤ 40) và giờ vượt định mức. Lựa chọn giải pháp: lương = giờ định mức × mức lương + giờ vượt × mức lương × 1,5. Thực hiện: tính cho từng nhân viên. Đánh giá: kiểm tra với vài trường hợp (dưới 40 giờ, trên 40 giờ)."},
  dv:{type:"sort", label:"Đọc hiểu – Đầu vào, đầu ra", q:"Xếp mỗi thông tin dưới đây vào nhóm Đầu vào hoặc Đầu ra của bài toán tương ứng.",
    cats:["Đầu vào","Đầu ra"],
    items:[["Mức lương và số giờ làm việc trong tuần (bài toán tính lương)",0],["Tiền lương theo tuần của nhân viên",1],["Các hệ số a, b, c (giải phương trình ax² + bx + c = 0)",0],["Nghiệm của phương trình hoặc thông báo “phương trình vô nghiệm”",1],["Hai số nguyên a và b (tính ước số chung lớn nhất)",0],["Ước số chung lớn nhất của a và b",1],["Văn bản (câu) tiếng Việt (dịch sang tiếng Anh)",0],["Câu tiếng Anh dưới dạng văn bản hoặc âm thanh",1]],
    k:"<b>Đầu vào</b> là những giá trị cho trước; <b>đầu ra</b> là giá trị phải tìm hoặc kết quả của hành động."},
  p80:{type:"open", label:"Câu hỏi tr.80", q:"Hãy mô tả đầu vào và đầu ra của bài toán xác định một số nguyên dương có phải số nguyên tố hay không.",
    k:"Đầu vào: một số nguyên dương n. Đầu ra: thông báo “n là số nguyên tố” hoặc “n không phải số nguyên tố”."},
  hd3:{type:"open", label:"HĐ3 – Tính lương bằng máy tính", q:"Em hãy nêu các bước để chuyển bài toán tính lương (trong Hoạt động 2) cho máy tính thực hiện bằng cách lập chương trình.",
    k:"1) Xác định bài toán: đầu vào muc_luong, tgian_laodong; đầu ra tien_luong. 2) Xây dựng thuật toán (Hình 15.3). 3) Cài đặt thuật toán thành chương trình. 4) Gỡ lỗi và hiệu chỉnh chương trình."},
  q4:{type:"order", label:"Đọc hiểu – Quy trình giải bài toán tin học", q:"Sắp xếp các bước giải một bài toán tin học theo đúng thứ tự.",
    items:{a:"Xác định bài toán",b:"Xây dựng thuật toán",c:"Cài đặt thuật toán",d:"Gỡ lỗi và hiệu chỉnh chương trình"},
    start:["c","a","d","b"], ans:["a","b","c","d"],
    k:"Xác định bài toán → Xây dựng thuật toán → Cài đặt thuật toán → Gỡ lỗi và hiệu chỉnh chương trình."},
  q4m:{type:"match", label:"Đọc hiểu – Các bước với bài toán tính lương", q:"Mỗi việc dưới đây thuộc bước nào trong quy trình giải bài toán tính lương bằng máy tính?",
    items:[["Đầu vào là muc_luong, tgian_laodong; đầu ra là tien_luong.",1],["Chia thành: nhập dữ liệu, xử lí để tính tiền lương, xuất kết quả; mô tả bằng sơ đồ khối Hình 15.3.",2],["Viết chương trình thực hiện thuật toán, dùng thêm các biến luong_dmuc, luong_vuot.",3],["Chạy chương trình với nhiều dữ liệu khác nhau, sửa lỗi để chương trình chạy đúng.",4]],
    opts:["Xác định bài toán","Xây dựng thuật toán","Cài đặt thuật toán","Gỡ lỗi và hiệu chỉnh chương trình"],
    k:"1 – Xác định bài toán; 2 – Xây dựng thuật toán; 3 – Cài đặt thuật toán; 4 – Gỡ lỗi và hiệu chỉnh."},
  luong:{type:"mcq", label:"Thử thuật toán tính lương", q:"Chạy thuật toán tính lương với mức lương 50 (nghìn đồng/giờ) và số giờ làm việc 45. Tiền lương tuần của nhân viên là bao nhiêu?",
    o:["2 375 nghìn đồng","2 250 nghìn đồng","3 375 nghìn đồng","2 000 nghìn đồng"], a:0,
    k:"tgian_dmuc = 40, tgian_vuot = 5; luong_dmuc = 40 × 50 = 2 000; luong_vuot = 5 × 50 × 1,5 = 375; tien_luong = <b>2 375</b>."},
  mx:{type:"mcq", label:"Thử thuật toán tìm số lớn nhất", q:"Với đầu vào 7, 3, 12, 5, 0, biến max lần lượt nhận những giá trị nào?",
    o:["0, 7, 12","0, 7, 3, 12, 5","7, 12, 0","0, 12"], a:0,
    k:"max ← 0; nhập 7 > 0 → max = 7; 3 không lớn hơn 7; 12 > 7 → max = 12; 5 không lớn hơn; nhập 0 → dừng, xuất 12."},
  mx0:{type:"mcq", label:"Thử thuật toán tìm số lớn nhất", q:"Nếu ngay lần nhập đầu tiên đã nhập số 0 thì thuật toán Hình 15.4 cho đầu ra là gì?",
    o:["“Không có dữ liệu”","0","Thuật toán lặp mãi không dừng","Báo lỗi"], a:0,
    k:"Vòng lặp không thực hiện lần nào, max = 0 nên xuất <b>“Không có dữ liệu”</b>."},
  p82:{type:"mcq", label:"Câu hỏi tr.82", q:"Bài toán tin học được xem như một vấn đề cần giải quyết. Khi đó, bước nào trong quy trình giải bài toán tin học tương ứng với bước thực hiện giải pháp trong giải quyết vấn đề?",
    o:["Xác định bài toán.","Xây dựng thuật toán.","Cài đặt thuật toán.","Gỡ lỗi và hiệu chỉnh chương trình."], a:2,
    k:"<b>C. Cài đặt thuật toán</b>: triển khai giải pháp (thuật toán) thành chương trình máy tính."},
  lt1:{type:"open", label:"Luyện tập", q:"Vẽ sơ đồ của thuật toán giải bài toán xác định một số có phải số nguyên tố hay không bằng cách chỉ sử dụng những cấu trúc điều khiển cơ bản.",
    k:"Bắt đầu → Nhập n → n < 2? đúng: xuất “không phải số nguyên tố”. Sai: i ← 2 → lặp khi i × i ≤ n: nếu n chia hết cho i thì xuất “không phải số nguyên tố”, kết thúc; i ← i + 1. Ra khỏi vòng lặp: xuất “là số nguyên tố” → Kết thúc."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Hãy mô tả đầu vào, đầu ra của bài toán sắp xếp một dãy số theo thứ tự tăng dần.",
    k:"Đầu vào: một dãy số (ví dụ 5, 2, 8, 1). Đầu ra: dãy số đó được sắp xếp theo thứ tự tăng dần (1, 2, 5, 8)."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Vẽ sơ đồ khối của giải thuật sắp xếp nổi bọt để sắp xếp một dãy số theo thứ tự tăng dần.",
    k:"Lặp: duyệt các cặp phần tử liền kề; nếu phần tử trước lớn hơn phần tử sau thì đổi chỗ; lặp lại cho đến khi một lượt duyệt không còn đổi chỗ nào."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Bài toán tin học là một nhiệm vụ có thể giao cho máy tính thực hiện. Bài toán đó được xác định bởi dữ liệu đã biết (đầu vào), dữ liệu cần tìm (đầu ra).</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Quy trình giải một bài toán tin học gồm các bước: 1) Xác định bài toán; 2) Xây dựng thuật toán; 3) Cài đặt thuật toán; 4) Gỡ lỗi và hiệu chỉnh chương trình.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Nhiều nhiệm vụ thực tế (như tính lương) có thể <b>giao cho máy tính</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Bài toán tin học</p><ul>'
    + "<li><b>Bài toán tin học</b>: nhiệm vụ có thể giao cho máy tính; xác định bởi <b>đầu vào</b> (dữ liệu đã biết) và <b>đầu ra</b> (dữ liệu cần tìm).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Giải bài toán tin học</p><ul>'
    + "<li>4 bước: <b>Xác định bài toán</b> → <b>Xây dựng thuật toán</b> → <b>Cài đặt thuật toán</b> → <b>Gỡ lỗi và hiệu chỉnh</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Số nguyên tố: thử chia n cho <b>i = 2, 3, …</b> (khi i × i ≤ n); chia hết → không phải số nguyên tố.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Sắp xếp: đầu vào là <b>dãy số</b>, đầu ra là <b>dãy đã sắp xếp tăng dần</b>.</li>"
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
    return ["T9B15." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Ví dụ phù hợp."], fix:["Việc nào lặp lại nhiều lần, cần tính toán chính xác?"]},
  hd1: {ok:["Chính xác!"], fix:["Bước nào cần tính toán nhiều?"]},
  hd2: {ok:["Trình bày đủ các bước."], fix:["Nhớ tách giờ trong định mức và giờ vượt định mức."]},
  dv:  {ok:["Phân loại đúng."], fix:["Đầu vào là cái đã cho, đầu ra là cái cần tìm."]},
  p80: {ok:["Chính xác!"], fix:["Đầu ra là một thông báo."]},
  hd3: {ok:["Nêu đủ các bước."], fix:["Xem lại quy trình 4 bước."]},
  q4:  {ok:["Đúng thứ tự."], fix:["Phải có thuật toán trước khi cài đặt."]},
  q4m: {ok:["Ghép đúng."], fix:["Đọc lại mục 2 SGK."]},
  luong:{ok:["Chính xác!"], fix:["Chạy thử trên mô phỏng với đầu vào 50, 45."]},
  mx:  {ok:["Chính xác!"], fix:["max chỉ thay đổi khi x > max."]},
  mx0: {ok:["Chính xác!"], fix:["Chạy thử với đầu vào chỉ có số 0."]},
  p82: {ok:["Chính xác!"], fix:["Thực hiện giải pháp là triển khai thuật toán thành…?"]},
  lt1: {ok:["Sơ đồ đúng."], fix:["Chỉ dùng tuần tự, rẽ nhánh và lặp."]},
  vd1: {ok:["Chính xác!"], fix:["Đầu ra là dãy số như thế nào?"]},
  vd2: {ok:["Sơ đồ đúng."], fix:["Khi nào thì dừng lặp?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {dv:"Đầu vào là dữ liệu đã biết, đầu ra là dữ liệu cần tìm."};
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
    {title:"Máy tính và việc tính lương", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Bài toán tin học", acts:[
    {title:"Hoạt động 1: Nhiệm vụ của máy tính", tasks:["hd1"]},
    {title:"Hoạt động 2: Bài toán tính lương", tasks:["hd2"]},
    {title:"Đọc hiểu: Đầu vào và đầu ra", tasks:["dv"], concept:"c1"},
    {title:"Câu hỏi SGK trang 80", tasks:["p80"]},
    {title:"Ghi bài: Bài toán tin học", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Giải bài toán tin học", acts:[
    {title:"Hoạt động 3: Tính lương bằng máy tính", tasks:["hd3"]},
    {title:"Đọc hiểu: Quy trình giải bài toán tin học", tasks:["q4","q4m"]},
    {title:"Chạy thử thuật toán tính lương", tasks:["luong"]},
    {title:"Ví dụ: Tìm số lớn nhất", tasks:["mx","mx0"], concept:"c2"},
    {title:"Câu hỏi SGK trang 82", tasks:["p82"]},
    {title:"Ghi bài: Giải bài toán tin học", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Thuật toán kiểm tra số nguyên tố", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bài toán sắp xếp", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai15", title: "Bài 15. Bài toán tin học", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 1 nhầm đầu vào và đầu ra của bài toán sắp xếp…",
  commentPh: "Ví dụ: Nhóm nêu đúng 4 bước giải bài toán tin học; sơ đồ số nguyên tố còn thiếu điều kiện dừng."};
})();
