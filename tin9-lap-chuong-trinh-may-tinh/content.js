/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"mcq", label:"Khởi động", q:"Các ngôn ngữ lập trình đều được trang bị những cấu trúc điều khiển cơ bản nào?",
    o:["Tuần tự, rẽ nhánh và lặp.","Nhập, xuất và tính toán.","Biến, hằng và biểu thức.","Hỏi, trả lời và nói."], a:0,
    k:"Ba cấu trúc điều khiển cơ bản: <b>tuần tự, rẽ nhánh và lặp</b>. Mô tả thuật toán chỉ bằng ba cấu trúc này giúp dễ dàng tạo ra chương trình máy tính."},
  bien:{type:"sort", label:"NV1 – Bước 1. Tạo các biến nhớ", q:"Xếp mỗi biến của chương trình tính lương vào nhóm phù hợp.",
    cats:["Biến đầu vào","Biến đầu ra","Biến trung gian"],
    items:[["muc_luong",0],["tgian_laodong",0],["tien_luong",1],["tgian_dmuc",2],["tgian_vuot",2],["luong_dmuc",2],["luong_vuot",2]],
    k:"Đầu vào: muc_luong, tgian_laodong. Đầu ra: tien_luong. Trung gian: tgian_dmuc, tgian_vuot, luong_dmuc, luong_vuot."},
  lap:{type:"mcq", label:"NV1 – Bước 2. Mô tả lại thuật toán", q:"Vì sao bước nhập tgian_laodong dùng vòng lặp với điều kiện sau (Hình 16.1a) cần chuyển thành vòng lặp với điều kiện trước (Hình 16.1b)?",
    o:["Để phù hợp với cấu trúc lặp có sẵn trong Scratch: “lặp lại cho đến khi ⟨⟩” kiểm tra điều kiện trước khi thực hiện thân lặp.","Vì vòng lặp với điều kiện sau luôn chạy sai.","Để chương trình chạy nhanh hơn.","Vì Scratch không có khối hỏi và đợi."], a:0,
    k:"Chương trình là bản mô tả thuật toán theo quy tắc của ngôn ngữ lập trình: phải hiệu chỉnh cách mô tả để cài đặt được bằng <b>công cụ có sẵn</b> của ngôn ngữ (Hình 16.1c)."},
  hs:{type:"mcq", label:"NV1 – Bước 3. Lưu ý", q:"Trong chương trình Scratch, hệ số 1,5 của thuật toán tính lương phải được viết thế nào?",
    o:["1.5","1,5","15/10,0","1 5"], a:0,
    k:"Viết <b>1.5</b>: dùng dấu chấm thay cho dấu phẩy để ngăn cách phần nguyên và phần thập phân."},
  ghep1:{type:"order", label:"NV1 – Lắp ghép chương trình", q:"Sắp xếp các nhóm khối lệnh (Hình 16.2) theo đúng thứ tự để được chương trình tính lương.",
    items:{a:"Khi bấm vào lá cờ; hỏi “Mức lương của nhân viên (theo giờ)?” và đợi; đặt muc_luong thành trả lời",b:"Hỏi số giờ làm việc; lặp lại cho đến khi không phải ⟨trả lời < 1 hoặc trả lời > 60⟩: hỏi lại; đặt tgian_laodong thành trả lời",c:"Nếu tgian_laodong > 40 thì … nếu không thì … (tính tgian_dmuc, tgian_vuot)",d:"Đặt luong_dmuc, luong_vuot, tien_luong",e:"Nói kết hợp “Tiền lương theo tuần = ” và tien_luong trong 5 giây; dừng lại tất cả"},
    start:["c","e","a","d","b"], ans:["a","b","c","d","e"],
    k:"Nhập muc_luong → nhập tgian_laodong (có kiểm tra) → rẽ nhánh tính giờ định mức, giờ vượt → tính lương → xuất kết quả."},
  gl1:{type:"open", label:"NV1 – Gỡ lỗi", q:"Kiểm thử chương trình tính lương với 6 tình huống của Bảng 16.1. Tình huống nào chương trình chạy chưa đúng? Em đã sửa chương trình như thế nào?",
    k:"Tình huống 6 (muc_luong = −100) chưa đúng: chương trình vẫn tính lương. Sửa: sau khi hỏi mức lương, thêm vòng lặp “lặp lại cho đến khi trả lời > 0: hỏi lại mức lương” rồi mới đặt muc_luong thành trả lời."},
  ghep2:{type:"order", label:"NV2 – Lắp ghép chương trình", q:"Sắp xếp các nhóm khối lệnh (Hình 16.3) theo đúng thứ tự để được chương trình tìm giá trị lớn nhất.",
    items:{a:"Khi bấm vào lá cờ; đặt max thành 0",b:"Hỏi “Nhập một số nguyên dương” và đợi; đặt x thành trả lời",c:"Lặp lại cho đến khi x = 0: nếu x > max thì đặt max thành x; hỏi “Nhập số nguyên dương tiếp theo” và đợi; đặt x thành trả lời",d:"Nếu max = 0 thì nói “Không có dữ liệu!” nếu không thì nói kết hợp “Số lớn nhất là ” và max",e:"Dừng lại tất cả"},
    start:["d","b","e","c","a"], ans:["a","b","c","d","e"],
    k:"Khởi tạo max → nhập x lần đầu → vòng lặp (so sánh, nhập tiếp) → xuất kết quả → dừng."},
  t8:{type:"mcq", label:"NV2 – Gỡ lỗi", q:"Chạy kiểm thử chương trình Hình 16.3 với tình huống 8 của Bảng 16.2 (7 data 12 0). Chương trình cho kết quả gì?",
    o:["Số lớn nhất là data","Số lớn nhất là 12","Không có dữ liệu!","Số lớn nhất là 7"], a:0,
    k:"Scratch không phân biệt số và chữ: khi so sánh “data” &gt; 7, Scratch so sánh như hai xâu kí tự nên “data” được coi là lớn hơn → kết quả <b>sai</b>."},
  lt1:{type:"open", label:"Luyện tập", q:"Bộ giá trị ở tình huống 6 (Bảng 16.2) cho thấy có những giá trị đầu vào chưa hợp lí. Em hãy chỉnh sửa chương trình để có một chương trình hoạt động tốt. Mô tả cách sửa của em.",
    k:"Ví dụ: chỉ xử lí x khi x &gt; 0; nếu x &lt; 0 thì nói “Số không hợp lệ” rồi hỏi lại (hoặc bỏ qua số đó)."},
  vd1:{type:"open", label:"Vận dụng", q:"Chương trình lập trong Nhiệm vụ 2 cho kết quả sai với bộ dữ liệu ở tình huống 8 (Bảng 16.2). Em hãy sửa chương trình để có thể xác thực dữ liệu và bỏ qua dữ liệu dạng chữ trong bộ dữ liệu đầu vào. Mô tả cách sửa.",
    k:"Ví dụ: trong Scratch, một chữ khi cộng với 0 cho kết quả 0. Chỉ so sánh x với max khi ⟨(x + 0) = x⟩ (x là số); nếu không thì bỏ qua."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Chương trình là bản mô tả thuật toán bằng ngôn ngữ mà máy tính có thể “hiểu” và thực hiện.</li><li>Mô tả thuật toán chỉ bằng các cấu trúc tuần tự, rẽ nhánh, lặp giúp dễ dàng cài đặt thành chương trình.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Gỡ lỗi: lập các bộ dữ liệu kiểm thử, mỗi bộ đại diện cho một tình huống; chương trình chạy không đúng yêu cầu thì cần phải sửa.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Ngôn ngữ lập trình có 3 cấu trúc cơ bản: <b>tuần tự, rẽ nhánh, lặp</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 1. Tính lương</p><ul>'
    + "<li>Cài đặt: <b>tạo biến</b> → <b>mô tả lại thuật toán</b> theo ngôn ngữ lập trình → <b>tạo chương trình</b>.</li>"
    + "<li><b>Gỡ lỗi</b> bằng các bộ dữ liệu kiểm thử (Bảng 16.1).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 2. Tìm giá trị lớn nhất</p><ul>'
    + "<li><b>max ← 0</b>; lặp <b>cho đến khi x = 0</b>: nếu x &gt; max thì max ← x; nhập x.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Chỉ xử lí x khi <b>x &gt; 0</b> (bỏ qua số âm).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li><b>Xác thực dữ liệu</b>: bỏ qua dữ liệu dạng chữ trước khi so sánh.</li>"
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
    return ["T9B16." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1:  {ok:["Chính xác!"], fix:["Nhớ lại Bài 15."]},
  bien: {ok:["Phân loại đúng."], fix:["Biến trung gian lưu giá trị trong quá trình tính toán."]},
  lap:  {ok:["Chính xác!"], fix:["Khối lặp của Scratch kiểm tra điều kiện lúc nào?"]},
  hs:   {ok:["Chính xác!"], fix:["Ngôn ngữ lập trình dùng dấu gì cho phần thập phân?"]},
  ghep1:{ok:["Đúng thứ tự."], fix:["Phải nhập dữ liệu trước khi tính."]},
  gl1:  {ok:["Phát hiện và sửa lỗi đúng."], fix:["Chạy 🧪 Kiểm thử để xem tình huống nào lỗi."]},
  ghep2:{ok:["Đúng thứ tự."], fix:["max phải được gán giá trị trước vòng lặp."]},
  t8:   {ok:["Chính xác!"], fix:["Chạy kiểm thử tình huống 8."]},
  lt1:  {ok:["Cách sửa hợp lí."], fix:["Thêm điều kiện x > 0."]},
  vd1:  {ok:["Cách sửa hợp lí."], fix:["Làm sao biết x là số hay chữ?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {bien:"Biến trung gian lưu các giá trị trong quá trình tính toán."};
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
    {title:"Cấu trúc điều khiển cơ bản", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Thực hành", title:"Nhiệm vụ 1. Tính lương", acts:[
    {title:"Cài đặt thuật toán", tasks:["bien","lap","hs","ghep1"], concept:"c1"},
    {title:"Gỡ lỗi", tasks:["gl1"], concept:"c2"},
    {title:"Ghi bài: Nhiệm vụ 1", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Nhiệm vụ 2. Tìm giá trị lớn nhất", acts:[
    {title:"Cài đặt thuật toán", tasks:["ghep2"]},
    {title:"Gỡ lỗi", tasks:["t8"]},
    {title:"Ghi bài: Nhiệm vụ 2", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Loại bỏ số âm", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bỏ qua dữ liệu dạng chữ", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai16", title: "Bài 16. Thực hành: Lập chương trình máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 4 quên đổi 1,5 thành 1.5 nên…",
  commentPh: "Ví dụ: Nhóm kiểm thử đủ 6 tình huống, đã sửa được lỗi nhập mức lương âm."};
})();
