/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Công việc thu thập dữ liệu, tính toán dữ liệu cho dự án Trường học xanh đã hoàn thành. Theo em, để trình bày bảng tính trước lớp (trình chiếu hoặc in ra giấy) cần làm thêm những gì?",
    k:"Định dạng dữ liệu cho dễ đọc, gộp ô, tô màu, <b>kẻ đường viền, khung</b> cho bảng, sắp xếp, đặt tên các <b>trang tính</b>, xem trước rồi <b>in</b> hoặc sao chép sang phần mềm trình chiếu."},
  hd1:{type:"open", label:"HĐ1 – Vì sao không thấy đường kẻ?", q:"Bạn An in dữ liệu trong Bảng 2 (Hình 10.1a) ra giấy nhưng kết quả nhận được là bảng dữ liệu không có các đường kẻ (Hình 10.1b) giống như bạn nhìn thấy trên màn hình máy tính. Em có biết lí do tại sao không? (Thử bấm Xem trước khi in trên bảng mô phỏng.)",
    k:"Các đường lưới trên màn hình chỉ giúp nhìn rõ các ô; <b>mặc định khi in thì đường lưới không được in ra</b>. Muốn có đường kẻ trên giấy, phải <b>kẻ đường viền ô và khung</b> cho vùng dữ liệu (Format Cells → Border)."},
  trang:{type:"sort", label:"Đọc hiểu – Thao tác với trang tính", q:"Đọc mục 1a (SGK trang 51–52). Mỗi việc dưới đây làm bằng thao tác nào?",
    cats:["Nháy nút ⊕","Nháy phải → Delete","Nháy phải → Insert/Worksheet","Nháy đúp tên trang tính","Kéo thả tên trang tính","Nháy phải → Move or Copy"],
    items:[["Tạo trang tính mới ở cuối",0],["Xoá trang tính Sheet2",1],["Chèn trang tính mới trước trang tính A",2],["Đổi tên Sheet1 thành Dữ liệu 1",3],["Đưa trang tính 5. Tổng kết lên trước trang tính 4",4],["Tạo một bản sao của trang tính 5. Tổng kết",5]],
    k:"Tạo mới: <b>⊕</b>; xoá: <b>Delete</b>; chèn trước: <b>Insert/Worksheet</b>; đổi tên: <b>nháy đúp</b>; đổi thứ tự: <b>kéo thả</b>; sao chép: <b>Move or Copy</b>, đánh dấu <b>Create a copy</b>, chọn vị trí, OK."},
  bd:{type:"sort", label:"Đọc hiểu – Kẻ đường viền (Hình 10.4)", q:"Trong trang Border của cửa sổ Format Cells, mỗi nút dưới đây có tác dụng gì?",
    cats:["None","Outline","Inside"],
    items:[["Không kẻ khung",0],["Kẻ khung bên ngoài vùng dữ liệu",1],["Kẻ đường viền các ô bên trong",2]],
    k:"<b>None</b>: không kẻ khung; <b>Outline</b>: kẻ khung bên ngoài; <b>Inside</b>: kẻ đường viền ô bên trong. Có thể chọn kiểu, màu đường kẻ."},
  vien:{type:"mcq", label:"Đọc hiểu – Kẻ khung bảng", q:"Muốn bảng dữ liệu A3:D6 khi in ra có đủ khung và đường kẻ giữa các ô, em làm thế nào?",
    o:["Không cần làm gì, máy tự in đường lưới.","Chọn vùng A3:D6, mở Format Cells, trang Border, chọn Outline và Inside, nháy OK.","Chọn vùng, tô màu nền.","Chọn vùng, gộp ô."], a:1,
    k:"<b>B</b>. Nên kẻ khung các vùng dữ liệu trước khi tiến hành in hoặc trình bày dữ liệu."},
  hd2:{type:"order", label:"HĐ2 – Các bước in", q:"Quan sát Hình 10.5. Sắp xếp các bước in dữ liệu trong bảng tính (dùng nút ↑ ↓).",
    items:{a:"Nhập các thông số in (số bản, máy in, vùng in, hướng giấy, khổ giấy).",b:"Đánh dấu vùng dữ liệu muốn in.",c:"Nháy chuột lên nút lệnh Print.",d:"Thực hiện lệnh File/Print."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Có thể in trang tính hiện thời, toàn bộ bảng tính hoặc chỉ vùng dữ liệu đang chọn."},
  vungin:{type:"mcq", label:"HĐ2 – Vùng in", q:"Em chỉ muốn in vùng dữ liệu đang chọn. Trong hộp thoại Print, mục Settings em chọn:",
    o:["Print Active Sheets","Print Entire Workbook","Print Selection","Portrait Orientation"], a:2,
    k:"<b>Print Selection</b>: chỉ in vùng đang chọn. Print Active Sheets: in trang tính hiện thời; Print Entire Workbook: in toàn bộ bảng tính."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành (dùng nút ↑ ↓).",
    items:{a:"Kẻ đường viền, khung vùng A3:N25; căn chỉnh hàng, cột.",b:"Tạo trang tính 6. Hoàn thiện, sao chép nội dung trang tính 5, sửa tên bảng.",c:"Định dạng cột Trung bình, Chi phí; gộp ô cột Loại cây; tô màu nền.",d:"Lưu tệp."},
    start:["a","b","c","d"], ans:["b","c","a","d"],
    k:"Thứ tự: <b>b → c → a → d</b>."},
  nv2:{type:"mcq", label:"Thực hành – Cột Chi phí", q:"Cột Chi phí cần hiển thị như 1,400,000. Trong Format Cells em chọn:",
    o:["Number, Decimal places = 0, chọn Use 1000 Separator.","Number, Decimal places = 2, không chọn Use 1000 Separator.","Percentage, Decimal places = 0.","Date."], a:0,
    k:"<b>A</b>. Số chữ số thập phân bằng 0 và hiển thị phân tách hàng nghìn, hàng triệu. Cột Trung bình: Number, 2 chữ số thập phân."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: trang tính 6. Hoàn thiện của em đã được trình bày như thế nào (định dạng số, gộp ô, màu nền, đường viền)? Khi xem trước khi in, bảng có những đường kẻ nào?",
    k:"Trung bình 2 chữ số thập phân (14.00, 11.67,…); Chi phí dạng 1,400,000; cột Loại cây gộp ô, căn giữa theo cả hai chiều; mỗi nhóm cây một màu nền; vùng A3:N25 có khung và đường viền mọi ô nên khi in có đủ đường kẻ."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Quan sát lệnh in một trang tính và so sánh với lệnh in văn bản mà em đã học ở lớp 6, có điểm gì khác nhau giữa hai lệnh in này?",
    k:"Giống: cùng dùng <b>File/Print</b>, chọn máy in, số bản, trang in, hướng giấy, khổ giấy. Khác: bảng tính có thể chọn <b>vùng in</b> (vùng đang chọn, trang tính hiện thời, toàn bộ bảng tính); <b>đường lưới không được in</b> nên cần kẻ viền; có thể chỉnh để bảng vừa một trang (Scaling)."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Hãy thực hiện lệnh in bảng dữ liệu rút gọn bằng cách ẩn đi tất cả các cột ứng với các lớp cụ thể từ 7A đến 7H (làm trên bảng mô phỏng ở phần Thực hành). Bảng in ra còn những cột nào?",
    k:"Chọn các cột E đến K (7A–7H), nháy phải chuột → <b>Hide</b>, rồi File/Print. Bảng in còn: STT, Loại cây, Tên cây, Đơn giá, Tổng số cây, Trung bình, Chi phí. Cột ẩn không được in."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy giúp cô giáo tạo trang tính Điểm thi khảo sát có các cột Họ và tên, Toán, Ngữ văn, Tiếng Anh và Điểm trung bình. Dùng các hàm hay công thức để tính toán rồi trình bày trang tính. Em đã dùng công thức gì và trình bày thế nào?",
    k:"Ví dụ: F3 <b>=AVERAGE(C3:E3)</b> rồi sao chép xuống; định dạng Điểm TB 1 chữ số thập phân; hàng tiêu đề chữ đậm, tô nền; kẻ khung, đường viền cho bảng; có thể thêm điểm cao nhất =MAX(F3:F7), thấp nhất =MIN(F3:F7)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Người sử dụng có thể thực hiện các thao tác đa dạng trên trang tính của bảng tính: <b>đổi tên, tạo mới, chèn, sao chép, di chuyển hoặc xoá</b> một trang tính.</li><li>Nên <b>kẻ khung</b> các vùng dữ liệu trước khi tiến hành in hoặc trình bày dữ liệu.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>In: đánh dấu vùng → <b>File/Print</b> → nhập thông số (số bản, máy in, vùng in, trang, hướng giấy, khổ giấy) → <b>Print</b>.</li><li>Có thể in trang tính hiện thời, toàn bộ bảng tính hoặc chỉ vùng đang chọn (<b>Print Selection</b>).</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Trung bình: Number, 2 chữ số thập phân. Chi phí: Number, 0 chữ số thập phân, <b>Use 1000 Separator</b>.</li><li>Gộp ô Loại cây, căn giữa hai chiều; tô màu theo loại cây; kẻ viền vùng <b>A3:N25</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Hoàn thiện bảng tính để <b>in</b> hoặc <b>trình bày</b> trước lớp.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Các thao tác hoàn thiện bảng tính</p><ul>'
    + "<li>Trang tính: <b>⊕</b> tạo mới; nháy phải: <b>Delete, Insert, Move or Copy</b>; nháy đúp: đổi tên.</li>"
    + "<li>Khi in <b>không có đường lưới</b> → kẻ viền: Format Cells → <b>Border</b>.</li>"
    + "<li><b>Outline</b>: khung ngoài; <b>Inside</b>: viền trong; <b>None</b>: bỏ kẻ.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. In dữ liệu</p><ul>'
    + "<li>Chọn vùng → <b>File/Print</b> → nhập thông số → <b>Print</b>.</li>"
    + "<li>Chỉ in vùng chọn: <b>Print Selection</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Định dạng số, <b>gộp ô</b>, <b>màu nền</b>, <b>kẻ viền</b> rồi mới in.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>In bảng rút gọn: <b>ẩn cột</b> rồi in; cột ẩn <b>không được in</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Điểm TB: <b>=AVERAGE(C3:E3)</b>, sao chép xuống; trình bày rồi in.</li>"
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
    return ["T7B10." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nêu được các việc cần làm để trình bày."],
        fix:["Muốn in ra giấy cho đẹp cần làm gì với bảng?"]},
  hd1: {ok:["Đúng! Đường lưới không được in."],
        fix:["Thử bấm Xem trước khi in trên bảng mô phỏng: có đường kẻ không?"]},
  trang:{ok:["Nhớ đúng các thao tác với trang tính."],
        fix:["Đọc lại mục 1a, trang 51–52."]},
  bd:  {ok:["Chính xác!"],
        fix:["Outline là khung ngoài, Inside là viền bên trong."]},
  vien:{ok:["Chính xác!"],
        fix:["Đường kẻ khi in phải được kẻ bằng Border."]},
  hd2: {ok:["Đúng thứ tự các bước in."],
        fix:["Phải chọn vùng trước, rồi mới mở lệnh File/Print."]},
  vungin:{ok:["Chính xác! Print Selection."],
        fix:["Selection nghĩa là vùng đang chọn."]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải có trang tính 6 trước rồi mới định dạng."]},
  nv2: {ok:["Chính xác!"],
        fix:["Số tiền không cần phần thập phân, cần dấu phân tách hàng nghìn."]},
  nvkq:{ok:["Bảng trình bày đẹp, đủ yêu cầu."],
        fix:["Em kiểm tra đường viền vùng A3:N25 và định dạng cột Chi phí."]},
  lt1: {ok:["So sánh rõ giống và khác."],
        fix:["Bảng tính có in được riêng một vùng không? Đường lưới có in ra không?"]},
  lt2: {ok:["Đúng! Cột ẩn không được in."],
        fix:["Ẩn các cột E đến K rồi xem trước khi in."]},
  vd1: {ok:["Dùng đúng hàm, trình bày đẹp."],
        fix:["Điểm trung bình dùng hàm AVERAGE; nhớ kẻ khung bảng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  trang: "Đọc lại mục 1a.",
  bd: "Xem chú thích Hình 10.4."
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Trình bày dự án trước lớp", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hoàn thiện bảng tính", acts:[
    {title:"Hoạt động 1: Vì sao in ra không thấy đường kẻ?", tasks:["hd1"]},
    {title:"Đọc hiểu: Thao tác với trang tính", tasks:["trang"]},
    {title:"Đọc hiểu: Kẻ đường viền và khung", tasks:["bd","vien"], concept:"c1"},
    {title:"Ghi bài: Hoàn thiện bảng tính", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"In dữ liệu", acts:[
    {title:"Hoạt động 2: In dữ liệu", tasks:["hd2","vungin"], concept:"c2"},
    {title:"Ghi bài: In dữ liệu", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Trình bày hoàn chỉnh dữ liệu dự án", tasks:["nv1","nv2","nvkq"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Lệnh in", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Điểm thi khảo sát", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai10", title: "Bài 10. Hoàn thiện bảng tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 in ra không có đường kẻ vì chưa kẻ viền…",
  commentPh: "Ví dụ: Nhóm trình bày đẹp; cần kẻ khung cho cả vùng A3:N25."};
})();
