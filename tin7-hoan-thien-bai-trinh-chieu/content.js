/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Bài trình chiếu báo cáo dự án Trường học xanh đã có đầy đủ thông tin, các đối tượng đã được định dạng. Theo em, cần làm gì thêm để có một bài thuyết trình hoàn chỉnh, hấp dẫn?",
    k:"Bổ sung các <b>hiệu ứng động</b> (cho đối tượng và chuyển trang) một cách hợp lí; xem lại bố cục, nội dung, sắp xếp các trang thành một bài trình chiếu hoàn chỉnh."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1, 2", q:"Quan sát hai trang chiếu có cùng nội dung trên bảng mô phỏng (một trang không có hiệu ứng động, một trang có thêm hiệu ứng động). Em thích xem trang nào hơn? Vì sao? Em có muốn sử dụng các hiệu ứng động trong bài trình chiếu của mình không?",
    k:"Thường thích trang <b>có hiệu ứng động</b>: các đối tượng xuất hiện lần lượt giúp người xem <b>tập trung</b> vào từng ý, bài trình chiếu <b>sinh động, hấp dẫn</b> hơn."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Sử dụng hiệu ứng động cần lưu ý những điều gì? Tại sao?",
    k:"Chỉ dùng hiệu ứng <b>có chọn lọc, phù hợp</b>; không dùng quá nhiều, quá phức tạp, vì sẽ làm người xem <b>mất tập trung</b> vào nội dung chính (gây hiệu ứng ngược)."},
  loai:{type:"sort", label:"Đọc hiểu – Hai loại hiệu ứng", q:"Đọc mục 1 (SGK trang 68). Mỗi hiệu ứng dưới đây thuộc loại nào?",
    cats:["Hiệu ứng cho đối tượng","Hiệu ứng chuyển trang chiếu"],
    items:[["Dòng chữ “TRƯỜNG HỌC XANH” bay vào từ phía dưới",0],["Hình ảnh cây xanh hiện dần lên",0],["Trang mới đẩy trang cũ sang bên trái",1],["Khi chuyển sang trang 2, trang mở ra từ giữa sang hai bên",1],["Các dòng nội dung lần lượt xuất hiện sau mỗi lần nháy chuột",0]],
    k:"<b>Hiệu ứng cho đối tượng</b>: cách thức, thời điểm xuất hiện của văn bản, hình ảnh,… trên trang. <b>Hiệu ứng chuyển trang chiếu</b>: cách thức xuất hiện của cả trang chiếu khi chuyển trang."},
  p69:{type:"sort", label:"Câu hỏi tr.69 – Ghép nối", q:"Ghép mỗi nội dung ở cột A với một nội dung phù hợp ở cột B.",
    cats:["a) gọi là hiệu ứng chuyển trang chiếu","b) giúp cho việc trình chiếu trở nên sinh động và hấp dẫn hơn","c) khi được thêm các hiệu ứng động","d) là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang chiếu"],
    items:[["1) Sử dụng hiệu ứng động trong bài trình chiếu",1],["2) Hiệu ứng động trong bài trình chiếu",3],["3) Hiệu ứng cho các trang chiếu",0],["4) Nội dung trên trang chiếu sẽ thu hút sự chú ý của người xem và tạo hiệu quả tốt hơn trong việc truyền đạt thông tin",2]],
    k:"1 – b; 2 – d; 3 – a; 4 – c."},
  nv1:{type:"order", label:"Thực hành – Hiệu ứng cho đối tượng", q:"Sắp xếp các bước tạo hiệu ứng cho đối tượng theo Hình 13.1 (dùng nút ↑ ↓).",
    items:{a:"Chọn hiệu ứng.",b:"Chọn đối tượng.",c:"Xem trước (Preview).",d:"Chọn thẻ Animations.",e:"Chọn cách đối tượng xuất hiện, thời lượng; thay đổi thứ tự xuất hiện nếu cần."},
    start:["a","b","c","d","e"], ans:["b","d","a","e","c"],
    k:"Thứ tự: <b>b → d → a → e → c</b>: chọn đối tượng → Animations → chọn hiệu ứng → Start, Duration, Reorder → Preview."},
  nv2:{type:"order", label:"Thực hành – Hiệu ứng chuyển trang", q:"Sắp xếp các bước tạo hiệu ứng chuyển trang chiếu theo Hình 13.2 (dùng nút ↑ ↓).",
    items:{a:"Chọn thẻ Transitions.",b:"Xem trước (Preview).",c:"Chọn trang chiếu.",d:"Chọn hiệu ứng.",e:"Chọn âm thanh, thời lượng thực hiện hiệu ứng."},
    start:["a","b","c","d","e"], ans:["c","a","d","e","b"],
    k:"Thứ tự: <b>c → a → d → e → b</b>. Nên dùng <b>Apply To All</b> để hiệu ứng chuyển trang thống nhất cho tất cả các trang."},
  hopli:{type:"sort", label:"Thực hành – Sử dụng hiệu ứng hợp lí", q:"Đọc mục c) Sử dụng hiệu ứng hợp lí. Mỗi việc dưới đây nên hay không nên làm?",
    cats:["Nên","Không nên"],
    items:[["Dùng một kiểu chuyển trang thống nhất cho tất cả các trang",0],["Mỗi dòng chữ dùng một hiệu ứng khác nhau cho “vui mắt”",1],["Thêm âm thanh cho mọi hiệu ứng",1],["Chọn hiệu ứng giúp làm nổi bật ý chính của trang",0],["Trình bày đơn giản, rõ ràng",0],["Cho tiêu đề bay, xoay, phóng to liên tục",1]],
    k:"Trình bày càng <b>đơn giản, rõ ràng</b> càng thuyết phục; chuyển trang <b>thống nhất</b>; <b>chọn lọc</b> hiệu ứng (tự hỏi: hiệu ứng này có khiến bài thuyết trình hiệu quả hơn không?); chỉ dùng âm thanh khi thật cần thiết."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: em đã tạo những hiệu ứng nào cho các đối tượng, hiệu ứng chuyển trang nào? Em đã bổ sung, sắp xếp lại những gì để hoàn thiện bài trình chiếu?",
    k:"Ví dụ: trang tiêu đề: tiêu đề Fly In (On Click), phụ đề Fade (After Previous); trang nội dung: khung nội dung Wipe; chuyển trang Fade cho tất cả các trang; bổ sung trang Dự kiến kết quả, Kết luận; sắp xếp các trang theo thứ tự Ý tưởng → Kế hoạch → Kết quả → Kết luận."},
  lt1:{type:"open", label:"Luyện tập", q:"Em hãy tạo hiệu ứng cho các trang và đối tượng để hoàn thiện bài trình chiếu báo cáo dự án của nhóm em. Nhóm đã chọn hiệu ứng nào? Vì sao?",
    k:"Học sinh tự làm. Lí do tốt: hiệu ứng giúp các ý xuất hiện lần lượt theo lời thuyết trình, làm nổi bật số liệu quan trọng; chuyển trang nhẹ nhàng, thống nhất."},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy bổ sung hiệu ứng động cho bài trình chiếu ghi trong tệp Baitaptinhoc7.pptx. Xem lại nội dung, định dạng, hiệu ứng của từng trang để hoàn thiện bài trình chiếu. Mô tả ngắn bài của em.",
    k:"Học sinh tự làm. Bài hoàn chỉnh: trang tiêu đề, các trang nội dung có tiêu đề, phân cấp, hình ảnh hợp lí, mẫu định dạng thống nhất, hiệu ứng chọn lọc, chuyển trang thống nhất."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Hiệu ứng động</b> là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang khi trình chiếu.</li><li>Sử dụng hiệu ứng động giúp cho bài trình chiếu trở nên <b>sinh động và hấp dẫn</b> hơn, thu hút sự chú ý của người xem và tạo hiệu quả tốt trong việc truyền đạt thông tin.</li><li>Hiệu ứng động nên được sử dụng một cách <b>có chọn lọc</b> để giúp tăng tính hiệu quả cho nội dung và tạo ấn tượng với người xem.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Hiệu ứng cho đối tượng: chọn đối tượng → <b>Animations</b> → chọn hiệu ứng → Start, Duration, thứ tự → <b>Preview</b>.</li><li>Hiệu ứng chuyển trang: chọn trang → <b>Transitions</b> → chọn hiệu ứng → âm thanh, thời lượng → Preview.</li><li>Đơn giản, rõ ràng; chuyển trang thống nhất; chọn lọc hiệu ứng; chỉ dùng âm thanh khi cần.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Thêm <b>hiệu ứng động</b> để bài thuyết trình hoàn chỉnh, hấp dẫn.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hiệu ứng động</p><ul>'
    + "<li>= <b>cách thức, thời điểm xuất hiện</b> của trang chiếu và đối tượng.</li>"
    + "<li>Hai loại: hiệu ứng <b>cho đối tượng</b>, hiệu ứng <b>chuyển trang</b>.</li>"
    + "<li>Dùng <b>có chọn lọc</b>, không lạm dụng.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Đối tượng: <b>Animations</b>; chuyển trang: <b>Transitions</b>; xem trước: <b>Preview</b>.</li>"
    + "<li>Đơn giản, rõ ràng; chuyển trang <b>thống nhất</b> (Apply To All).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Hiệu ứng giúp các ý xuất hiện <b>lần lượt theo lời nói</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Xem lại <b>nội dung, định dạng, hiệu ứng</b> từng trang trước khi trình bày.</li>"
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
    return ["T7B13." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Đúng! Cần thêm hiệu ứng động hợp lí."],
        fix:["Bài trình chiếu đã có nội dung, định dạng. Còn thiếu gì để sinh động?"]},
  hd1a:{ok:["Em giải thích rõ lí do."],
        fix:["Em xem hai trang trên bảng mô phỏng: trang nào thu hút hơn?"]},
  hd1c:{ok:["Nêu đúng lưu ý khi dùng hiệu ứng."],
        fix:["Dùng quá nhiều hiệu ứng thì người xem có tập trung được không?"]},
  loai:{ok:["Phân biệt đúng hai loại hiệu ứng."],
        fix:["Hiệu ứng cho cả trang hay cho từng đối tượng trên trang?"]},
  p69: {ok:["Ghép đúng cả 4 ý."],
        fix:["Đọc lại phần Ghi nhớ mục 1."]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải chọn đối tượng trước rồi mới chọn hiệu ứng."]},
  nv2: {ok:["Đúng thứ tự."],
        fix:["Phải chọn trang chiếu trước, xem trước ở bước cuối."]},
  hopli:{ok:["Biết sử dụng hiệu ứng hợp lí."],
        fix:["Hiệu ứng đó có giúp bài thuyết trình hiệu quả hơn không?"]},
  nvkq:{ok:["Bài trình chiếu hoàn chỉnh, hiệu ứng chọn lọc."],
        fix:["Em kiểm tra: chuyển trang đã thống nhất chưa? Có trang nào quá nhiều hiệu ứng không?"]},
  lt1: {ok:["Lựa chọn hiệu ứng hợp lí."],
        fix:["Em nêu lí do chọn hiệu ứng đó."]},
  vd1: {ok:["Bài hoàn chỉnh."],
        fix:["Em xem lại từng trang: nội dung, định dạng, hiệu ứng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  loai: "Hiệu ứng cho cả trang hay cho từng đối tượng?",
  p69: "Đọc lại phần Ghi nhớ mục 1.",
  hopli: "Đọc lại mục c) Sử dụng hiệu ứng hợp lí."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Hoàn thiện bài thuyết trình", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hiệu ứng động", acts:[
    {title:"Hoạt động 1: Hiệu ứng động", tasks:["hd1a","hd1c"]},
    {title:"Đọc hiểu: Hai loại hiệu ứng", tasks:["loai"], concept:"c1"},
    {title:"Câu hỏi SGK trang 69", tasks:["p69"]},
    {title:"Ghi bài: Hiệu ứng động", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành tổng hợp", acts:[
    {title:"Hoàn thiện bài trình chiếu", tasks:["nv1","nv2","hopli","nvkq"], concept:"c2"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Hiệu ứng cho bài của nhóm", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Hoàn thiện Baitaptinhoc7.pptx", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai13", title: "Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dùng quá nhiều hiệu ứng khác nhau trên một trang nên…",
  commentPh: "Ví dụ: Hiệu ứng chọn lọc; cần dùng chuyển trang thống nhất cho tất cả các trang."};
})();
