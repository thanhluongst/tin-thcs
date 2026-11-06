/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Quan sát Hình 9a.1 và Hình 9a.2, tìm những phần khác nhau trong hai trang văn bản. Trong các cuốn sách, truyện em đã đọc có các thành phần văn bản đó không? Tác dụng của chúng là gì?",
    k:"Hình 9a.2 có thêm dòng <b>“Tài liệu dự án”</b> ở trên cùng bên phải, <b>số trang “1”</b> và dòng <b>“CLB Tin học”</b> ở dưới cùng. Sách, truyện thường có số trang, tên sách, tên chương ở trên/dưới mỗi trang: giúp người đọc biết đang đọc tài liệu nào, trang nào, dễ tìm và dễ theo dõi."},
  hd1:{type:"mcq", label:"HĐ1 – Đầu trang và chân trang cho em biết gì?", q:"Trong trang văn bản ở Hình 9a.2, phần văn bản màu cam có nội dung “Tài liệu dự án” và “CLB Tin học” cho em biết điều gì?",
    o:["Văn bản là một tài liệu dự án, thuộc về CLB Tin học.","Tên tác giả của văn bản.","Số trang của văn bản.","Ngày tạo văn bản."], a:0,
    k:"Cho biết tên văn bản là <b>“Tài liệu dự án”</b> và văn bản thuộc về <b>“CLB Tin học”</b>. Thông tin này xuất hiện ở <b>tất cả các trang</b>."},
  vitri:{type:"sort", label:"Đọc hiểu – Thông tin đặt ở đâu?", q:"Mỗi thông tin dưới đây thường đặt ở đầu trang, chân trang hay ở phần nội dung văn bản?",
    cats:["Đầu trang, chân trang","Nội dung văn bản"],
    items:[["Số trang",0],["Tên văn bản, tên tác giả",0],["Danh sách các công việc cần làm của dự án",1],["Tên tổ chức (CLB Tin học), logo",0],["Câu hỏi của Phiếu khảo sát",1],["Chú thích ngắn",0]],
    k:"Đầu trang, chân trang chứa <b>thông tin ngắn gọn</b> lặp lại ở mọi trang: số trang, tên văn bản, tên tác giả, chú thích, logo. Nội dung chính nằm ở phần <b>nội dung văn bản</b>."},
  p43:{type:"sort", label:"Câu hỏi tr.43", q:"Mỗi phương án dưới đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["A. Đầu trang và chân trang là đoạn văn bản đầu tiên và cuối cùng trong một trang.",1],["B. Thông tin ở phần đầu trang và chân trang thường ngắn gọn và được tự động thêm vào tất cả các trang trong văn bản sau khi tạo.",0],["C. Đầu trang và chân trang là văn bản hoặc hình ảnh được chèn vào lề trên và lề dưới.",0],["D. Không thể đưa hình ảnh vào đầu trang và chân trang.",1]],
    k:"Phương án <b>đúng: B, C</b>. A sai vì đầu trang, chân trang là <b>phần riêng biệt</b> với văn bản chính (nằm ở lề trên, lề dưới). D sai vì đầu trang, chân trang <b>có thể chứa hình ảnh</b>, hình đồ hoạ."},
  hd2:{type:"open", label:"HĐ2 – Số trang trong văn bản", q:"Trong các cuốn sách giáo khoa, sách văn học, truyện mà em đọc, em có nhìn thấy số trang của sách không? Số trang sách thường nằm ở đâu?",
    k:"Có. Số trang thường nằm ở <b>chân trang</b> (giữa hoặc góc ngoài) hoặc ở <b>đầu trang</b>. Ví dụ SGK Tin học 8 đặt số trang ở chân trang, góc ngoài."},
  p44:{type:"mcq", label:"Câu hỏi tr.44", q:"Em hãy chọn phương án SAI trong các phương án sau:",
    o:["Đánh số trang giúp người đọc biết độ dài của văn bản (nhìn số trang cuối).","Đánh số trang, cùng với mục lục, giúp người đọc dễ dàng tìm thấy các phần cụ thể của văn bản.","Đánh số trang cho phép trích dẫn một trang cụ thể của văn bản.","Phần mềm soạn thảo văn bản không có chức năng đánh số trang tự động."], a:3,
    k:"<b>D</b> sai: phần mềm soạn thảo có chức năng <b>đánh số trang tự động</b> (Insert → Page Number)."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hiện nhiệm vụ (văn bản như Hình 9a.5) theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Mở tệp CLBTinhoc.docx, bổ sung nội dung.",b:"Insert → Page Number → Bottom of Page → Plain Number 2.",c:"Insert → Header → Blank, nhập “Tài liệu dự án”, căn phải, chữ nghiêng, màu cam.",d:"Insert → Footer → Blank, nhập “CLB Tin học”, căn phải, chữ nghiêng, màu cam.",e:"Chọn Close Header and Footer.",f:"Lưu văn bản."},
    start:["c","a","f","b","e","d"], ans:["a","b","c","d","e","f"],
    k:"Mở tệp → đánh số trang (Bottom of Page / Plain Number 2) → Header → Footer → <b>Close Header and Footer</b> → lưu văn bản."},
  nv2:{type:"mcq", label:"Thực hành – Vị trí số trang", q:"Chọn Page Number → Bottom of Page → Plain Number 2 thì số trang được đặt ở đâu?",
    o:["Ở giữa, bên dưới trang văn bản (chân trang).","Ở giữa, bên trên trang văn bản (đầu trang).","Bên trái chân trang.","Bên phải đầu trang."], a:0,
    k:"<b>Bottom of Page</b> = chân trang; <b>Plain Number 2</b> = ở <b>giữa</b>. (Plain Number 1: bên trái, Plain Number 3: bên phải.)"},
  nv3:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: văn bản CLBTinhoc.docx của em có số trang ở đâu? Đầu trang, chân trang có nội dung gì, định dạng thế nào? Khi thêm trang mới, đầu trang và chân trang có tự xuất hiện không?",
    k:"Số trang ở <b>giữa chân trang</b>; đầu trang “Tài liệu dự án”, chân trang “CLB Tin học” đều căn phải, chữ nghiêng, màu cam. Trang mới <b>tự động</b> có đầu trang, chân trang và số trang tăng dần."},
  lt1:{type:"open", label:"Luyện tập", q:"Mở tệp CLBTinhoc.docx và: a) Bổ sung thêm tên người hoặc tên nhóm thực hiện dự án vào đầu trang. b) Đặt lại số trang vào vị trí bên trái của chân trang. Em đã làm thế nào?",
    k:"a) Nháy đúp vào đầu trang (hoặc Header → Edit Header), nhập tên nhóm ở bên trái (có thể dùng mẫu <b>Blank (Three Columns)</b> hoặc phím Tab). b) Insert → Page Number → <b>Bottom of Page → Plain Number 1</b>."},
  vd1:{type:"open", label:"Vận dụng", q:"Tìm hiểu cách thêm hình ảnh, hình đồ hoạ vào đầu trang và chân trang rồi bổ sung vào đầu trang và chân trang trong tệp CLBTinhoc.docx một đường thẳng theo mẫu như Hình 9a.7. Em đã làm thế nào?",
    k:"Nháy đúp vào đầu trang (chân trang) để sửa, rồi dùng <b>Insert → Pictures</b> (chèn ảnh) hoặc <b>Insert → Shapes → Line</b> (vẽ đường thẳng, giữ Shift để thẳng), đổi màu bằng Shape Outline; cuối cùng chọn Close Header and Footer."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Đầu trang và chân trang</b> là phần riêng biệt với văn bản chính; thường chứa thông tin ngắn gọn; thường được <b>tự động thêm vào tất cả các trang</b> trong văn bản sau khi tạo.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Số trang</b> trong văn bản được <b>đánh tự động</b> và được đặt ở đầu trang hoặc chân trang.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Insert → nhóm <b>Header &amp; Footer</b>: <b>Header</b> (đầu trang), <b>Footer</b> (chân trang), <b>Page Number</b> (số trang).</li><li>Có thể đổi vị trí, căn lề, phông chữ, cỡ chữ, màu sắc… cho đầu trang, chân trang giống như với phần nội dung.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Trên/dưới mỗi trang có thêm thông tin ngắn: <b>tên tài liệu, số trang</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Đầu trang và chân trang</p><ul>'
    + "<li><b>Đầu trang</b> (Header): lề trên; <b>chân trang</b> (Footer): lề dưới.</li>"
    + "<li>Chứa thông tin <b>ngắn gọn</b> (số trang, tên văn bản, tác giả, hình ảnh), <b>tự động</b> có ở mọi trang.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Đánh số trang</p><ul>'
    + "<li>Số trang được <b>đánh tự động</b>, đặt ở đầu trang hoặc chân trang (trái, giữa, phải).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Insert → <b>Header</b> / <b>Footer</b> / <b>Page Number</b>; xong chọn <b>Close Header and Footer</b>.</li>"
    + "<li>Bottom of Page → Plain Number <b>1</b>: trái, <b>2</b>: giữa, <b>3</b>: phải.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li><b>Nháy đúp</b> vào đầu trang/chân trang để sửa; số trang bên trái: <b>Plain Number 1</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Trong đầu trang/chân trang dùng được <b>Pictures</b>, <b>Shapes</b> (đường thẳng) như ở nội dung.</li>"
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
    return ["T8B9a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Tìm đúng các phần khác nhau."],
        fix:["Quan sát kĩ góc trên bên phải và phía dưới Hình 9a.2."]},
  hd1: {ok:["Chính xác!"],
        fix:["Hai dòng màu cam là tên gì và của ai?"]},
  vitri:{ok:["Phân loại đúng."],
        fix:["Thông tin nào ngắn gọn và cần lặp lại ở mọi trang?"]},
  p43: {ok:["Chính xác: B, C."],
        fix:["Đầu trang có phải là đoạn văn bản đầu tiên của nội dung không?"]},
  hd2: {ok:["Quan sát tốt."],
        fix:["Mở SGK Tin học 8, số trang nằm ở đâu?"]},
  p44: {ok:["Chính xác!"],
        fix:["Lệnh Page Number dùng để làm gì?"]},
  nv1: {ok:["Đúng thứ tự các bước."],
        fix:["Sau khi tạo đầu trang, chân trang cần đóng chế độ sửa rồi mới lưu."]},
  nv2: {ok:["Chính xác!"],
        fix:["Bottom là trên hay dưới? Số 2 là trái, giữa hay phải?"]},
  nv3: {ok:["Thực hành đúng mẫu."],
        fix:["Đối chiếu lại với Hình 9a.5: căn phải, chữ nghiêng, màu cam."]},
  lt1: {ok:["Làm đúng yêu cầu."],
        fix:["Số trang bên trái chân trang: Bottom of Page → Plain Number 1."]},
  vd1: {ok:["Thêm đường thẳng đúng mẫu."],
        fix:["Nháy đúp vào đầu trang trước, rồi mới Insert → Shapes → Line."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  vitri: "Đầu trang, chân trang chỉ chứa thông tin ngắn, lặp lại ở mọi trang.",
  p43: "Đầu trang, chân trang là phần riêng, nằm ở lề trên, lề dưới."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"So sánh hai trang văn bản", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Đầu trang, chân trang", acts:[
    {title:"Hoạt động 1: Đầu trang và chân trang cho em biết gì?", tasks:["hd1"]},
    {title:"Đọc hiểu: Đầu trang và chân trang", tasks:["vitri"], concept:"c1"},
    {title:"Câu hỏi SGK trang 43", tasks:["p43"]},
    {title:"Ghi bài: Đầu trang, chân trang", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Đánh số trang", acts:[
    {title:"Hoạt động 2: Số trang trong văn bản", tasks:["hd2"], concept:"c2"},
    {title:"Câu hỏi SGK trang 44", tasks:["p44"]},
    {title:"Ghi bài: Đánh số trang", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Đánh số trang, thêm đầu trang và chân trang", tasks:["nv1","nv2","nv3"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tên nhóm và số trang bên trái", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Đường thẳng ở đầu trang, chân trang", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai9a", title: "Bài 9a. Tạo đầu trang, chân trang cho văn bản", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 gõ số trang bằng tay nên trang 2 không có số vì…",
  commentPh: "Ví dụ: Nhóm đặt đúng số trang; đầu trang cần căn phải, chữ nghiêng."};
})();
