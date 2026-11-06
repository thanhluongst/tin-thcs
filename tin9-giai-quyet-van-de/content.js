/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Minh từng vào mê cung trong một khu vui chơi và phải tìm đường thoát khỏi mê cung mà không được dùng sơ đồ. Theo em, có cách nào để tìm được đường thoát khỏi mê cung không?",
    k:"Ví dụ: luôn để một tay chạm vào bức tường (chẳng hạn tay phải) rồi đi theo bức tường đó cho đến khi gặp lối ra."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Quan sát Hình 14.1. Robot di chuyển trong mê cung theo cách nào?",
    o:["Robot di chuyển sao cho bức tường luôn ở bên phải nó.","Robot đi thẳng, gặp tường thì dừng lại.","Robot chọn hướng đi ngẫu nhiên ở mỗi ngã rẽ.","Robot đi theo sơ đồ mê cung đã được nạp sẵn."], a:0,
    k:"Robot di chuyển sao cho <b>bức tường luôn ở bên phải</b> nó."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Tại sao cách di chuyển đó dẫn robot tới Lối ra?",
    k:"Vì đi bám theo bức tường bên phải, robot sẽ được bức tường dẫn qua mọi vị trí của mê cung nối với bức tường đó, cho đến khi tìm thấy Lối ra (lối ra nằm trên tường bao của mê cung)."},
  b14:{type:"match", label:"Đọc hiểu – Các bước giải quyết vấn đề", q:"Trong Hoạt động 1, mỗi việc dưới đây thuộc bước nào của quá trình giải quyết vấn đề?",
    items:[["Xác định: cần tìm Lối ra, robot không có người để hỏi đường, không có sơ đồ.",1],["Chia việc chọn hướng đi thành ba trường hợp: rẽ phải, đi thẳng, rẽ trái.",2],["Chọn quy tắc ưu tiên từ phải sang trái để luôn giữ tường bên phải.",3],["Robot di chuyển theo cách đã chọn như thực hiện một thuật toán.",4],["Cho robot thử với nhiều mê cung có đặc điểm khác nhau để cải tiến.",5]],
    opts:["Tìm hiểu vấn đề","Phân tích vấn đề","Lựa chọn giải pháp","Thực hiện giải pháp","Đánh giá kết quả"],
    k:"1 – Tìm hiểu vấn đề; 2 – Phân tích vấn đề; 3 – Lựa chọn giải pháp; 4 – Thực hiện giải pháp; 5 – Đánh giá kết quả."},
  tt:{type:"match", label:"Đọc hiểu – Ba tình huống (Hình 14.2)", q:"Ghép mỗi tình huống với cách lựa chọn của robot trong thuật toán bám tường phải.",
    items:[["a) Phía phải không có tường",1],["b) Phía phải có tường, phía trước không có tường",2],["c) Cả phía phải và phía trước đều có tường",3]],
    opts:["Rẽ phải (quay phải rồi tiến một bước)","Đi thẳng (tiến một bước)","Quay sang trái để chọn lại hướng"],
    k:"a) rẽ phải; b) đi thẳng; c) quay sang trái để chọn lại hướng."},
  b5:{type:"order", label:"Đọc hiểu – Thứ tự các bước", q:"Sắp xếp các bước của quá trình giải quyết vấn đề theo đúng thứ tự.",
    items:{a:"Tìm hiểu vấn đề",b:"Phân tích vấn đề",c:"Lựa chọn giải pháp",d:"Thực hiện giải pháp",e:"Đánh giá kết quả"},
    start:["c","e","a","d","b"], ans:["a","b","c","d","e"],
    k:"Tìm hiểu vấn đề → Phân tích vấn đề → Lựa chọn giải pháp → Thực hiện giải pháp → Đánh giá kết quả."},
  p77:{type:"open", label:"Câu hỏi tr.77", q:"Em hãy mô tả các bước giải quyết vấn đề chọn trường để tiếp tục học tập sau khi tốt nghiệp THCS.",
    k:"1) Tìm hiểu: mục tiêu (học THPT, trung cấp nghề…), điểm số, sở thích, điều kiện gia đình. 2) Phân tích: các yếu tố khoảng cách, học phí, điểm chuẩn, ngành học… 3) Lựa chọn: so sánh, chọn trường phù hợp nhất (và nguyện vọng dự phòng). 4) Thực hiện: ôn thi, nộp hồ sơ. 5) Đánh giá: xem kết quả, điều chỉnh nguyện vọng nếu cần."},
  hd2:{type:"open", label:"HĐ2 – Thuật toán bám tường", q:"Em hãy mô tả thuật toán xác định hướng di chuyển của robot, biết robot chỉ thực hiện được: 1. phát hiện xung quanh (trái, phải, phía trước) có tường hay không; 2. quay trái hoặc quay phải một góc 90°; 3. tiến (đi thẳng) một bước về phía trước.",
    k:"Lặp lại cho đến khi tìm thấy lối ra: nếu bên phải không có tường thì quay phải 90° và tiến một bước; nếu không thì: nếu phía trước không có tường thì tiến một bước, nếu không thì quay trái 90°."},
  sd:{type:"mcq", label:"Đọc hiểu – Sơ đồ khối (Hình 14.3b)", q:"Trong sơ đồ khối thuật toán bám tường, khi câu hỏi “Có tường bên phải?” có kết quả là <b>sai</b> thì robot làm gì?",
    o:["Quay phải 90° rồi tiến một bước.","Tiến một bước.","Quay trái 90°.","Kết thúc."], a:0,
    k:"Bên phải không có tường → <b>quay phải 90°, tiến một bước</b>, rồi quay lại câu hỏi “Đến đích?”."},
  p78:{type:"open", label:"Câu hỏi tr.78", q:"Em hãy mô tả giải pháp chọn trường sau khi tốt nghiệp THCS dưới dạng liệt kê các bước hoặc sơ đồ khối.",
    k:"Ví dụ: Bước 1: liệt kê các trường có thể học. Bước 2: với mỗi trường, nếu điểm dự kiến ≥ điểm chuẩn và phù hợp sở thích, điều kiện thì đưa vào danh sách chọn. Bước 3: xếp danh sách theo mức ưu tiên. Bước 4: đăng kí nguyện vọng theo thứ tự đó."},
  lt1:{type:"open", label:"Luyện tập", q:"Em hãy mô tả thuật toán bám tường bên trái để tìm đường thoát khỏi mê cung (liệt kê các bước hoặc sơ đồ khối).",
    k:"Lặp lại cho đến khi tìm thấy lối ra: nếu bên trái không có tường thì quay trái 90°, tiến một bước; nếu không thì: nếu phía trước không có tường thì tiến một bước, nếu không thì quay phải 90°."},
  lt2:{type:"mcq", label:"Luyện tập – Đánh giá kết quả", q:"Chạy thử hai thuật toán trên “Mê cung 3 (robot ở giữa)”. Em rút ra nhận xét gì?",
    o:["Bám tường phải làm robot đi vòng mãi quanh khối tường giữa; bám tường trái thì thoát được – cần đánh giá với nhiều mê cung để cải tiến thuật toán.","Cả hai thuật toán đều luôn tìm được lối ra với mọi mê cung.","Robot đâm vào tường.","Bám tường trái luôn tốt hơn bám tường phải ở mọi mê cung."], a:0,
    k:"Khi robot xuất phát cạnh một khối tường đứng riêng, bám tường phải có thể đi vòng mãi. Đây là “tình huống đặc biệt” mà bước <b>Đánh giá kết quả</b> giúp phát hiện."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy lập chương trình trong ngôn ngữ Scratch mô phỏng thuật toán bám tường. Mô tả các khối lệnh em đã dùng.",
    k:"Ví dụ: khi bấm vào lá cờ xanh → lặp lại cho đến khi chạm màu đỏ (lối ra): nếu không chạm tường bên phải thì xoay phải 90 độ, di chuyển 1 ô; nếu không: nếu không chạm tường phía trước thì di chuyển 1 ô, nếu không thì xoay trái 90 độ. Trong Scratch, có thể dùng các cảm biến là những khối màu nhỏ gắn quanh nhân vật và khối “màu … chạm màu …?”."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Giải quyết vấn đề là quá trình, thường được thực hiện qua các bước: 1) Tìm hiểu vấn đề; 2) Phân tích vấn đề; 3) Lựa chọn giải pháp; 4) Thực hiện giải pháp; 5) Đánh giá kết quả.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Phương pháp giải quyết vấn đề (hay giải pháp) có thể được mô tả dưới dạng thuật toán bằng phương pháp liệt kê các bước hoặc bằng sơ đồ khối.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Thoát mê cung không có sơ đồ: đi <b>bám theo một bức tường</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Giải quyết vấn đề</p><ul>'
    + "<li>5 bước: <b>Tìm hiểu</b> vấn đề → <b>Phân tích</b> vấn đề → <b>Lựa chọn</b> giải pháp → <b>Thực hiện</b> giải pháp → <b>Đánh giá</b> kết quả.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Mô tả giải pháp dưới dạng thuật toán</p><ul>'
    + "<li>Giải pháp được mô tả bằng thuật toán: <b>liệt kê các bước</b> hoặc <b>sơ đồ khối</b>.</li>"
    + "<li>Bám tường phải: phải trống → <b>quay phải, tiến</b>; trước trống → <b>tiến</b>; còn lại → <b>quay trái</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Bám tường trái: đổi <b>phải ↔ trái</b> trong thuật toán.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Scratch: <b>lặp lại cho đến khi</b> + <b>nếu … thì … nếu không</b> + xoay, di chuyển.</li>"
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
    return ["T9B14." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Ý tưởng hay."], fix:["Nếu không có sơ đồ, em dựa vào cái gì trong mê cung?"]},
  hd1a:{ok:["Chính xác!"], fix:["Quan sát vị trí bức tường so với robot trên đường đi màu đỏ."]},
  hd1b:{ok:["Giải thích hợp lí."], fix:["Bức tường bên phải dẫn robot đi qua những đâu?"]},
  b14: {ok:["Ghép đúng."], fix:["Đọc lại mô tả từng bước trong SGK."]},
  tt:  {ok:["Ghép đúng."], fix:["Xem lại Hình 14.2."]},
  b5:  {ok:["Đúng thứ tự."], fix:["Phải hiểu và phân tích vấn đề trước khi chọn giải pháp."]},
  p77: {ok:["Mô tả đủ 5 bước."], fix:["Em đã có bước đánh giá kết quả chưa?"]},
  hd2: {ok:["Mô tả đúng thuật toán."], fix:["Robot chỉ có 3 động tác: phát hiện tường, quay 90°, tiến một bước."]},
  sd:  {ok:["Chính xác!"], fix:["Nhánh “sai” của câu hỏi “Có tường bên phải?” đi về đâu?"]},
  p78: {ok:["Mô tả rõ ràng."], fix:["Hãy đánh số các bước hoặc vẽ sơ đồ khối."]},
  lt1: {ok:["Thuật toán đúng."], fix:["Đổi vai trò bên phải và bên trái."]},
  lt2: {ok:["Nhận xét đúng."], fix:["Chạy thử lại cả hai thuật toán trên Mê cung 3."]},
  vd1: {ok:["Chương trình đúng."], fix:["Kiểm tra điều kiện dừng của vòng lặp."]}
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
    {title:"Tìm đường thoát khỏi mê cung", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Giải quyết vấn đề", acts:[
    {title:"Hoạt động 1: Tìm đường thoát khỏi mê cung", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Các bước giải quyết vấn đề", tasks:["b14","tt","b5"], concept:"c1"},
    {title:"Câu hỏi SGK trang 77", tasks:["p77"]},
    {title:"Ghi bài: Giải quyết vấn đề", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Mô tả giải pháp dưới dạng thuật toán", acts:[
    {title:"Hoạt động 2: Thuật toán bám tường", tasks:["hd2"]},
    {title:"Đọc hiểu: Liệt kê các bước và sơ đồ khối", tasks:["sd"], concept:"c2"},
    {title:"Câu hỏi SGK trang 78", tasks:["p78"]},
    {title:"Ghi bài: Mô tả giải pháp", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Thuật toán bám tường trái", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Mô phỏng thuật toán bám tường bằng Scratch", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai14", title: "Bài 14. Giải quyết vấn đề", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 3 chọn sai thứ tự ưu tiên nên robot đâm vào tường…",
  commentPh: "Ví dụ: Nhóm nêu đủ 5 bước giải quyết vấn đề; thuật toán bám tường trái chạy đúng."};
})();
