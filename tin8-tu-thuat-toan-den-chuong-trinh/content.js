/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Bằng ngôn ngữ lập trình trực quan, bạn Khoa muốn tạo chương trình điều khiển nhân vật di chuyển theo đường đi là các hình như: tam giác đều, vuông,… Theo em, bạn Khoa cần thực hiện những công việc gì?",
    k:"Xác định <b>đường đi</b> (độ dài cạnh, góc quay ở mỗi đỉnh); mô tả <b>thuật toán</b> (liệt kê các bước hoặc sơ đồ khối); viết <b>chương trình</b> bằng các lệnh Scratch tương ứng; chạy thử và sửa lỗi."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Nhân vật di chuyển theo đường đi là một tam giác đều. Khi đi hết một cạnh, nhân vật cần quay một góc bao nhiêu độ để đi tiếp cạnh sau?",
    o:["120 độ","60 độ","90 độ","180 độ"], a:0,
    k:"Góc trong của tam giác đều là 60°, nên nhân vật phải quay <b>180° − 60° = 120°</b> (Hình 12.2)."},
  hd1b:{type:"order", label:"HĐ1 – Câu 2", q:"Liệt kê lần lượt các bước của thuật toán điều khiển nhân vật đi theo tam giác đều (sắp xếp bằng nút ↑ ↓).",
    items:{a:"Gán Lần lặp ← 1.",b:"Nếu Lần lặp ≤ 3 thì làm tiếp bước sau, ngược lại thì kết thúc.",c:"Di chuyển 60 bước.",d:"Quay trái 120 độ.",e:"Tăng Lần lặp lên 1 đơn vị, quay lại bước kiểm tra Lần lặp ≤ 3."},
    start:["c","e","a","d","b"], ans:["a","b","c","d","e"],
    k:"Lần lặp ← 1 → kiểm tra Lần lặp ≤ 3 → di chuyển 60 bước → quay trái 120 độ → tăng Lần lặp, quay lại kiểm tra. Đây là <b>cấu trúc lặp</b> 3 lần."},
  map:{type:"match", label:"Đọc hiểu – Từ sơ đồ khối đến chương trình", q:"Ghép mỗi phần của sơ đồ khối (Hình 12.3a) với lệnh Scratch tương ứng (Hình 12.3b).",
    items:[["Bắt đầu",1],["Lần lặp ← 1; Lần lặp ≤ 3; Tăng Lần lặp lên 1 đơn vị",2],["Di chuyển 60 bước",3],["Quay trái 120 độ",4]],
    opts:["a) Khi bấm vào lá cờ xanh","b) lặp lại 3","c) di chuyển 60 bước","d) xoay ↺ 120 độ"],
    k:"Bắt đầu – a; ba khối điều khiển vòng lặp – b (lặp lại 3); Di chuyển 60 bước – c; Quay trái 120 độ – d (xoay ↺ 120 độ)."},
  ct:{type:"mcq", label:"Đọc hiểu – Chương trình", q:"Chương trình là:",
    o:["Dãy các lệnh điều khiển máy tính thực hiện một thuật toán.","Sơ đồ khối mô tả thuật toán.","Các bước liệt kê bằng ngôn ngữ tự nhiên.","Một hình vẽ trên sân khấu Scratch."], a:0,
    k:"<b>Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.</b>"},
  p74:{type:"mcq", label:"Câu hỏi tr.74", q:"Bạn An muốn bổ sung lệnh đợi 1 giây để điều khiển nhân vật dừng lại 1 giây sau khi đi hết mỗi cạnh của tam giác. Lệnh này đặt ở đâu?",
    o:["Trong sơ đồ khối: sau “Quay trái 120 độ”, trước “Tăng Lần lặp”. Trong Scratch: bên trong khối lặp lại 3, sau lệnh xoay ↺ 120 độ.","Trước khối lặp lại 3.","Sau khối lặp lại 3 (bên ngoài vòng lặp).","Trước lệnh Khi bấm vào lá cờ xanh."], a:0,
    k:"Lệnh đợi phải nằm <b>bên trong vòng lặp</b> để được thực hiện sau mỗi cạnh: sau “Quay trái 120 độ” (hoặc ngay sau “Di chuyển 60 bước”). Đặt ngoài vòng lặp thì chỉ dừng 1 lần."},
  nv1:{type:"mcq", label:"Nhiệm vụ 1", q:"Chạy chương trình ở Nhiệm vụ 1 (Hình 12.3b), em thấy gì trên sân khấu?",
    o:["Nhân vật đi hết 3 cạnh rất nhanh rồi trở về chỗ cũ, không để lại nét vẽ.","Nhân vật vẽ ra một hình tam giác.","Nhân vật đứng yên không làm gì.","Nhân vật vẽ ra hình vuông."], a:0,
    k:"Nhân vật đi theo tam giác đều và trở về vị trí ban đầu. Vì <b>chưa đặt bút</b> và chạy rất nhanh nên gần như không thấy gì: cần thêm các lệnh Bút vẽ và lệnh đợi (Nhiệm vụ 2)."},
  nv2:{type:"open", label:"Nhiệm vụ 2", q:"Báo cáo kết quả Nhiệm vụ 2: em đã thêm những lệnh nào để nhân vật vừa di chuyển vừa vẽ tam giác đều? Mỗi lệnh có tác dụng gì?",
    k:"<b>xoá tất cả</b> (xoá nét vẽ cũ), <b>đặt bút</b> (bắt đầu vẽ), <b>chọn bút màu</b>, <b>đợi 1 giây</b> trong vòng lặp (dừng sau mỗi cạnh để quan sát), <b>nhấc bút</b> ở cuối (thôi vẽ). Lưu tệp VeHinh.sb3."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Sơ đồ khối của thuật toán điều khiển nhân vật đi theo một hình vuông khác sơ đồ khối của tam giác đều ở những chỗ nào?",
    o:["Điều kiện lặp là Lần lặp ≤ 4 và quay trái 90 độ.","Điều kiện lặp là Lần lặp ≤ 3 và quay trái 90 độ.","Điều kiện lặp là Lần lặp ≤ 4 và quay trái 120 độ.","Không khác gì."], a:0,
    k:"Hình vuông có 4 cạnh và 4 góc vuông: <b>Lần lặp ≤ 4</b>, <b>Quay trái 90 độ</b>; các khối khác giữ nguyên."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Nâng cấp chương trình VeHinh.sb3: bổ sung một nhân vật mới và lập trình để khi nháy chuột vào nhân vật này thì chương trình thực hiện thuật toán vẽ hình vuông. Em đã dùng những khối lệnh nào?",
    k:"Thêm nhân vật → khối sự kiện <b>Khi bấm vào nhân vật này</b> → xoá tất cả, đặt bút, <b>lặp lại 4</b> {di chuyển 60 bước, xoay ↺ <b>90</b> độ, đợi 1 giây}, nhấc bút."},
  lt3a:{type:"match", label:"Luyện tập – câu 3a", q:"Hoàn thành sơ đồ khối Hình 12.6 (xe dừng lại khi cách hòn đá nhỏ hơn 120 bước): ghép mỗi lệnh với ô phù hợp.",
    items:[["Ô số 1 (hình thoi)",1],["Ô số 2 (hình chữ nhật)",2]],
    opts:["Cách hòn đá < 120 bước?","Di chuyển 5 bước"],
    k:"Ô 1 (điều kiện): <b>Cách hòn đá &lt; 120 bước?</b> Ô 2 (lệnh lặp lại khi điều kiện Sai): <b>Di chuyển 5 bước</b>."},
  lt3b:{type:"open", label:"Luyện tập – câu 3b", q:"Viết chương trình Scratch thực hiện thuật toán ở câu 3a. Em dùng khối lệnh điều khiển nào?",
    k:"Khi bấm vào lá cờ xanh → <b>lặp lại cho đến khi</b> ⟨khoảng cách đến Hòn đá &lt; 120⟩ { di chuyển 5 bước }."},
  vd1:{type:"match", label:"Vận dụng", q:"Đường đi của nhân vật có thể là hình vuông, lục giác đều,… Khi đó các con số nào trong chương trình ở Hình 12.3 cần phải thay đổi? Ghép mỗi hình với cặp số phù hợp.",
    items:[["Tam giác đều",1],["Hình vuông",2],["Ngũ giác đều",3],["Lục giác đều",4]],
    opts:["a) lặp lại 3, xoay 120 độ","b) lặp lại 4, xoay 90 độ","c) lặp lại 5, xoay 72 độ","d) lặp lại 6, xoay 60 độ"],
    k:"Cần thay <b>số lần lặp</b> (= số cạnh n) và <b>góc quay</b> (= 360 : n). Tam giác 3 – 120°; vuông 4 – 90°; ngũ giác 5 – 72°; lục giác 6 – 60°."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Chương trình</b> là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.</li><li>Mỗi bước của thuật toán (mô tả bằng sơ đồ khối) được thực hiện bằng lệnh tương ứng của ngôn ngữ lập trình.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Nhóm <b>Bút vẽ</b>: xoá tất cả, đặt bút, chọn bút màu, nhấc bút.</li><li>Lệnh <b>đợi … giây</b> (Điều khiển) đặt trong vòng lặp để dừng sau mỗi cạnh.</li></ul>"},

  /* ---- GHI BÀI ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Xác định đường đi → mô tả <b>thuật toán</b> → viết <b>chương trình</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Từ thuật toán đến chương trình</p><ul>'
    + "<li>Tam giác đều: <b>lặp 3 lần</b> {di chuyển 60 bước; quay trái <b>120 độ</b>}.</li>"
    + "<li><b>Chương trình</b> là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Vẽ hình: <b>xoá tất cả</b>, <b>đặt bút</b>, chọn bút màu, lặp {di chuyển, xoay, <b>đợi</b>}, <b>nhấc bút</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Hình vuông: lặp <b>4</b>, xoay <b>90</b> độ. Xe dừng: <b>lặp lại cho đến khi</b> khoảng cách &lt; 120.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Đa giác đều n cạnh: lặp <b>n</b> lần, xoay <b>360 : n</b> độ.</li>"
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
    return ["T8B12." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nêu đủ các công việc."], fix:["Trước khi viết chương trình cần mô tả điều gì?"]},
  hd1a:{ok:["Chính xác: 120 độ."], fix:["Quan sát Hình 12.2: góc quay là góc ngoài của tam giác."]},
  hd1b:{ok:["Đúng thứ tự."], fix:["Bước kiểm tra Lần lặp ≤ 3 đứng trước các lệnh di chuyển."]},
  map: {ok:["Ghép đúng."], fix:["Ba khối Lần lặp ← 1, Lần lặp ≤ 3, Tăng lần lặp ứng với một lệnh Scratch."]},
  ct:  {ok:["Chính xác!"], fix:["Đọc lại hộp ghi nhớ trang 74."]},
  p74: {ok:["Đặt đúng vị trí."], fix:["Lệnh đợi cần thực hiện mấy lần? Vậy phải nằm trong hay ngoài vòng lặp?"]},
  nv1: {ok:["Quan sát đúng."], fix:["Chạy chậm trên mô phỏng để thấy nhân vật đi."]},
  nv2: {ok:["Giải thích đúng các lệnh."], fix:["Lệnh nào giúp để lại nét vẽ?"]},
  lt1: {ok:["Chính xác!"], fix:["Hình vuông có mấy cạnh, mỗi góc bao nhiêu độ?"]},
  lt2: {ok:["Dùng đúng khối sự kiện."], fix:["Khối nào bắt đầu chương trình khi nháy vào nhân vật?"]},
  lt3a:{ok:["Ghép đúng."], fix:["Hình thoi chứa điều kiện, hình chữ nhật chứa lệnh."]},
  lt3b:{ok:["Chương trình đúng."], fix:["Khối lặp nào dừng khi điều kiện đúng?"]},
  vd1: {ok:["Tìm đúng quy luật."], fix:["Tổng các góc quay khi đi hết một vòng là 360 độ."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {};
const MATCH_HINT = {map: "Đối chiếu các mũi tên nét đứt trong Hình 12.3.", vd1: "Số lần lặp = số cạnh; góc quay = 360 : số cạnh."};
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
    {title:"Điều khiển nhân vật di chuyển", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Từ thuật toán đến chương trình", acts:[
    {title:"Hoạt động 1: Mô tả kịch bản dưới dạng thuật toán", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Từ sơ đồ khối đến chương trình", tasks:["map","ct"], concept:"c1"},
    {title:"Câu hỏi SGK trang 74", tasks:["p74"]},
    {title:"Ghi bài: Từ thuật toán đến chương trình", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ 1, 2: Chương trình vẽ tam giác đều", tasks:["nv1","nv2"], concept:"c2"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Hình vuông và chiếc xe", tasks:["lt1","lt2","lt3a","lt3b"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Đa giác đều", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai12", title: "Bài 12. Từ thuật toán đến chương trình", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 đặt lệnh đợi ngoài vòng lặp nên…",
  commentPh: "Ví dụ: Chương trình đúng; cần đặt lệnh đợi trong vòng lặp."};
})();
