/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Mẹ An ghi thông tin khách hàng (họ tên, địa chỉ, số điện thoại) trong cuốn sổ. Một khách hàng gọi điện đặt mua cây giống. Em sẽ giúp An tìm địa chỉ của khách hàng đó trong sổ như thế nào?",
    k:"Xem <b>lần lượt</b> từng khách hàng <b>từ đầu đến cuối</b> danh sách: nếu đúng họ tên cần tìm thì ghi ra địa chỉ và dừng; nếu đã hết danh sách mà không thấy thì báo không tìm thấy."},
  bt:{type:"sort", label:"Đọc hiểu – Bài toán tìm kiếm", q:"Đọc phần đầu mục Thuật toán tìm kiếm tuần tự. Với bài toán của An, mỗi thông tin dưới đây là đầu vào hay đầu ra?",
    cats:["Đầu vào","Đầu ra"],
    items:[["Danh sách khách hàng",0],["Họ tên khách hàng cần tìm",0],["Địa chỉ của khách hàng cần tìm",1]],
    k:"<b>Đầu vào</b>: danh sách khách hàng; họ tên khách hàng cần tìm. <b>Đầu ra</b>: địa chỉ của khách hàng cần tìm."},
  dk:{type:"sort", label:"Đọc hiểu – Hai điều kiện của vòng lặp", q:"Thuật toán tìm kiếm tuần tự dùng cấu trúc lặp. Mỗi câu hỏi dưới đây là điều kiện thứ nhất hay điều kiện thứ hai cần kiểm tra?",
    cats:["Điều kiện thứ nhất","Điều kiện thứ hai"],
    items:[["Họ tên khách hàng có đúng là họ tên cần tìm không?",0],["Đã hết danh sách chưa?",1]],
    k:"Điều kiện thứ nhất: kiểm tra họ tên khách hàng có <b>đúng là họ tên cần tìm</b> không. Điều kiện thứ hai: kiểm tra <b>đã hết danh sách</b> chưa. Chừng nào chưa tìm thấy và chưa hết danh sách thì còn tìm tiếp."},
  hd1:{type:"sort", label:"HĐ1 – Bảng 14.2: tìm “Thanh Trúc”", q:"Thực hiện thuật toán tìm kiếm tuần tự để tìm địa chỉ của khách hàng “Thanh Trúc” trong Bảng 14.1. Ở mỗi lần lặp, câu trả lời cho các câu hỏi dưới đây là Đúng hay Sai? (Kiểm tra lại bằng bảng mô phỏng.)",
    cats:["Đúng","Sai"],
    items:[["Lần lặp 1 – Nguyễn An: có đúng khách hàng cần tìm không?",1],["Lần lặp 1: có đúng là đã hết danh sách không?",1],["Lần lặp 2 – Trần Bình: có đúng khách hàng cần tìm không?",1],["Lần lặp 2: có đúng là đã hết danh sách không?",1],["Lần lặp 3 – Hoàng Mai: có đúng khách hàng cần tìm không?",1],["Lần lặp 3: có đúng là đã hết danh sách không?",1],["Lần lặp 4 – Thanh Trúc: có đúng khách hàng cần tìm không?",0]],
    k:"Lần lặp 1, 2, 3: cả hai câu đều <b>Sai</b> nên xem khách hàng tiếp theo. Lần lặp 4: Thanh Trúc là khách hàng cần tìm (<b>Đúng</b>) → ghi ra địa chỉ <b>Xóm 2, Lục Xuân</b>; kết thúc (không cần kiểm tra điều kiện thứ hai)."},
  hd1b:{type:"mcq", label:"HĐ1 – Kết quả", q:"Thuật toán tìm được địa chỉ của khách hàng “Thanh Trúc” sau bao nhiêu lần lặp, địa chỉ là gì?",
    o:["Sau 1 lần lặp; Số 48 đường Trưng Vương.","Sau 4 lần lặp; Xóm 2, Lục Xuân.","Sau 5 lần lặp; Số 69 đường Ngô Quyền.","Không tìm thấy."], a:1,
    k:"<b>4 lần lặp</b>, địa chỉ <b>Xóm 2, Lục Xuân</b> (Thanh Trúc ở vị trí 4 của danh sách)."},
  nn:{type:"order", label:"Đọc hiểu – Mô tả bằng ngôn ngữ tự nhiên", q:"Sắp xếp các bước của thuật toán tìm kiếm tuần tự mô tả bằng ngôn ngữ tự nhiên (dùng nút ↑ ↓).",
    items:{a:"Nếu giá trị ở vị trí đang xét bằng giá trị cần tìm thì chuyển sang bước trả lời “Tìm thấy”, nếu không thì chuyển đến vị trí tiếp theo.",b:"Xét vị trí đầu tiên của danh sách.",c:"Trả lời “Không tìm thấy”; Kết thúc.",d:"Kiểm tra đã hết danh sách chưa. Nếu đã hết thì chuyển sang bước trả lời “Không tìm thấy”, nếu chưa thì lặp lại bước so sánh.",e:"Trả lời “Tìm thấy” và chỉ ra vị trí phần tử tìm được; Kết thúc."},
    start:["a","b","c","d","e"], ans:["b","a","d","e","c"],
    k:"Bước 1 (b) → Bước 2 (a) → Bước 3 (d) → Bước 4 (e) → Bước 5 (c)."},
  p73a:{type:"mcq", label:"Câu hỏi tr.73 – câu 1", q:"Thuật toán tìm kiếm tuần tự thực hiện công việc gì?",
    o:["Lưu trữ dữ liệu.","Sắp xếp dữ liệu theo chiều tăng dần.","Xử lí dữ liệu.","Tìm kiếm một dữ liệu cho trước trong một danh sách đã cho."], a:3,
    k:"<b>D</b>. Tìm kiếm một dữ liệu cho trước trong một danh sách đã cho."},
  p73b:{type:"mcq", label:"Câu hỏi tr.73 – câu 2", q:"Thuật toán tìm kiếm tuần tự thực hiện công việc như thế nào?",
    o:["Sắp xếp lại dữ liệu theo thứ tự của bảng chữ cái.","Xem xét mục dữ liệu đầu tiên, sau đó xem xét lần lượt từng mục dữ liệu tiếp theo cho đến khi tìm thấy mục dữ liệu được yêu cầu hoặc đến khi hết danh sách.","Chia nhỏ dữ liệu thành từng phần để tìm kiếm.","Bắt đầu tìm từ vị trí bất kì của danh sách."], a:1,
    k:"<b>B</b>. Thuật toán tìm kiếm tuần tự thực hiện tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa hết danh sách thì còn tìm tiếp."},
  lt1:{type:"mcq", label:"Luyện tập – Bảng 14.3: tìm “Iceland”", q:"Danh sách: Bolivia, Albania, Scotland, Canada, Vietnam, Iceland, Portugal, Greenland, Germany. Thực hiện thuật toán tìm kiếm tuần tự để tìm “Iceland”. Đầu ra và số lần lặp là:",
    o:["Tìm thấy ở vị trí 1, sau 1 lần lặp.","Tìm thấy ở vị trí 6, sau 6 lần lặp.","Tìm thấy ở vị trí 6, sau 9 lần lặp.","Không tìm thấy, sau 9 lần lặp."], a:1,
    k:"Lần lặp 1–5 (Bolivia, Albania, Scotland, Canada, Vietnam): Sai, Sai. Lần lặp 6: <b>Iceland</b> – Đúng → đầu ra “<b>Tìm thấy</b>” ở <b>vị trí 6</b>."},
  lt2:{type:"mcq", label:"Luyện tập – Không có trong danh sách", q:"Với cùng danh sách trên, nếu tìm “Japan” thì thuật toán dừng lại khi nào và đầu ra là gì?",
    o:["Dừng ở lần lặp 1, Không tìm thấy.","Dừng sau khi xét hết 9 nước (9 lần lặp), Không tìm thấy.","Dừng ở lần lặp 5, Tìm thấy.","Không bao giờ dừng."], a:1,
    k:"Phải xét <b>hết cả 9 nước</b>; ở lần lặp 9 (Germany) câu “đã hết danh sách?” là Đúng → đầu ra “<b>Không tìm thấy</b>”."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy lập danh sách những cuốn sách mà em có. Sau đó sử dụng thuật toán tìm kiếm tuần tự để tìm một cuốn sách trong danh sách đó (thử trên bảng mô phỏng ở phần Vận dụng). Em tìm cuốn sách nào, sau mấy lần lặp thì tìm thấy?",
    k:"Học sinh tự làm. Ví dụ danh sách 6 cuốn, tìm cuốn ở vị trí 4 thì sau 4 lần lặp tìm thấy; tìm cuốn không có trong danh sách thì phải xét hết 6 cuốn mới biết là không tìm thấy."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Thuật toán tìm kiếm tuần tự</b> thực hiện tìm <b>lần lượt từ đầu đến cuối</b> danh sách, chừng nào <b>chưa tìm thấy</b> và <b>chưa hết danh sách</b> thì còn tìm tiếp.</li><li>Hai điều kiện cần kiểm tra để dừng vòng lặp: đúng giá trị cần tìm chưa; đã hết danh sách chưa.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Bước 1. Xét vị trí đầu tiên. Bước 2. Nếu bằng giá trị cần tìm → Bước 4; nếu không → vị trí tiếp theo. Bước 3. Hết danh sách → Bước 5; chưa hết → lặp lại Bước 2. Bước 4. “Tìm thấy”, chỉ ra vị trí; kết thúc. Bước 5. “Không tìm thấy”; kết thúc.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Tìm địa chỉ khách hàng: xem <b>lần lượt từng người</b> trong danh sách.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Thuật toán tìm kiếm tuần tự</p><ul>'
    + "<li>Tìm <b>lần lượt từ đầu đến cuối</b> danh sách.</li>"
    + "<li>Dừng khi: <b>tìm thấy</b> hoặc <b>hết danh sách</b> (không tìm thấy).</li>"
    + "<li>Đầu vào: <b>danh sách, giá trị cần tìm</b>. Đầu ra: <b>vị trí</b> hoặc “không tìm thấy”.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tìm “Iceland” → <b>tìm thấy ở vị trí 6</b>, sau 6 lần lặp.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Không có trong danh sách → phải xét <b>hết danh sách</b> mới kết luận.</li>"
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
    return ["T7B14." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Đúng ý tưởng tìm kiếm tuần tự."],
        fix:["Em sẽ xem từng khách hàng theo thứ tự nào? Khi nào thì dừng?"]},
  bt:  {ok:["Xác định đúng đầu vào, đầu ra."],
        fix:["Đầu ra là thông tin cần tìm được."]},
  dk:  {ok:["Chính xác hai điều kiện."],
        fix:["Đọc lại đoạn cuối trang 71."]},
  hd1: {ok:["Thực hiện đúng từng lần lặp."],
        fix:["Chạy thử trên bảng mô phỏng, quan sát cột “Có đúng cần tìm không?”."]},
  hd1b:{ok:["Chính xác! 4 lần lặp."],
        fix:["Thanh Trúc ở vị trí thứ mấy trong danh sách?"]},
  nn:  {ok:["Đúng thứ tự 5 bước."],
        fix:["Bước đầu tiên luôn là xét vị trí đầu tiên."]},
  p73a:{ok:["Chính xác! D."],
        fix:["Tên thuật toán là tìm kiếm…"]},
  p73b:{ok:["Chính xác! B."],
        fix:["Tuần tự nghĩa là lần lượt theo thứ tự."]},
  lt1: {ok:["Chính xác! Vị trí 6."],
        fix:["Đếm Iceland là nước thứ mấy trong danh sách."]},
  lt2: {ok:["Chính xác!"],
        fix:["Japan không có trong danh sách: thuật toán phải xét đến đâu?"]},
  vd1: {ok:["Vận dụng đúng thuật toán."],
        fix:["Em ghi rõ cuốn sách tìm được ở vị trí nào, sau mấy lần lặp."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  bt: "Đầu ra là kết quả cần tìm.",
  dk: "Đọc lại đoạn cuối trang 71.",
  hd1: "Chạy từng bước trên bảng mô phỏng để kiểm tra."
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Tìm địa chỉ khách hàng", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2", step:"Bước 2 · Hình thành kiến thức mới", title:"Thuật toán tìm kiếm tuần tự", acts:[
    {title:"Đọc hiểu: Bài toán tìm kiếm", tasks:["bt","dk"], concept:"c1"},
    {title:"Hoạt động 1: Tìm địa chỉ", tasks:["hd1","hd1b"]},
    {title:"Đọc hiểu: Mô tả bằng ngôn ngữ tự nhiên", tasks:["nn"], concept:"c2"},
    {title:"Câu hỏi SGK trang 73", tasks:["p73a","p73b"]},
    {title:"Ghi bài: Thuật toán tìm kiếm tuần tự", tasks:[], concept:"g2", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tìm tên nước trong danh sách", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g3", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Tìm một cuốn sách", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai14", title: "Bài 14. Thuật toán tìm kiếm tuần tự", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dừng ở lần lặp 3 vì quên kiểm tra…",
  commentPh: "Ví dụ: Nhóm điền đúng Bảng 14.2; cần ghi rõ đầu ra ở lần lặp cuối."};
})();
