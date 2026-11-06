/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Ở lớp 6, chúng ta đã biết cách biểu diễn thuật toán bằng cách sử dụng các cấu trúc điều khiển cơ bản. Đó là những cấu trúc nào? Theo em, trong ngôn ngữ lập trình Scratch có cách nào để biểu diễn các cấu trúc đó không?",
    k:"Ba cấu trúc điều khiển cơ bản: <b>tuần tự</b>, <b>rẽ nhánh</b>, <b>lặp</b>. Scratch có các khối lệnh tương ứng: lắp ghép các khối từ trên xuống (tuần tự), khối <b>nếu … thì</b> (rẽ nhánh), khối <b>lặp lại</b> (lặp)."},
  hd1:{type:"open", label:"HĐ1 – Trò chơi Đoán số", q:"Máy tính lấy ngẫu nhiên một số bí mật trong khoảng từ 1 đến 100. Em được đoán nhiều lần cho đến khi đoán đúng; mỗi lần đoán sai, máy tính cho biết số em đoán là nhỏ hơn hay lớn hơn số bí mật. Hãy mô tả kịch bản của trò chơi dưới dạng một thuật toán.",
    k:"1) Máy lấy ngẫu nhiên số bí mật (1–100). 2) Hỏi, nhận số người chơi đoán (trả lời). 3) Lặp cho đến khi trả lời = số bí mật: nếu trả lời &lt; số bí mật thì báo “Quá thấp”, ngược lại báo “Quá cao”; hỏi lại. 4) Thông báo “HOAN HÔ!”, kết thúc."},
  tt:{type:"order", label:"Đọc hiểu – Cấu trúc tuần tự", q:"Sắp xếp các bước của thuật toán đọc và hiển thị dữ liệu (Hình 14.1a) theo đúng thứ tự.",
    items:{a:"Bắt đầu.",b:"Gán cho số bí mật một giá trị ngẫu nhiên trong khoảng từ 1 đến 100.",c:"Hỏi và nhận giá trị từ bàn phím, lưu vào biến trả lời.",d:"Hiển thị số bí mật trong 2 giây.",e:"Hiển thị trả lời trong 2 giây.",f:"Kết thúc."},
    start:["d","a","f","c","b","e"], ans:["a","b","c","d","e","f"],
    k:"Các bước thực hiện lần lượt từ trên xuống dưới: Bắt đầu → gán số bí mật → hỏi, nhận trả lời → hiển thị số bí mật → hiển thị trả lời → Kết thúc. Đó là <b>cấu trúc tuần tự</b>."},
  rn:{type:"mcq", label:"Đọc hiểu – Cấu trúc rẽ nhánh", q:"Số bí mật là 45, người chơi nhập 30. Thuật toán ở Hình 14.2 thông báo gì?",
    o:["“Quá thấp”","“Quá cao”","“HOAN HÔ!”","Không thông báo gì"], a:0,
    k:"30 ≠ 45 nên kiểm tra tiếp; 30 &lt; 45 đúng → <b>“Quá thấp”</b>. Không cần kiểm tra trường hợp “lớn hơn” vì ba trường hợp loại trừ lẫn nhau."},
  ct:{type:"sort", label:"Đọc hiểu – Ba cấu trúc điều khiển", q:"Mỗi khối lệnh hoặc cách viết dưới đây thể hiện cấu trúc điều khiển nào?",
    cats:["Tuần tự","Rẽ nhánh","Lặp"],
    items:[["Lắp ghép các khối lệnh theo trình tự từ trên xuống dưới",0],["nếu ⟨ ⟩ thì",1],["nếu ⟨ ⟩ thì … nếu không thì …",1],["lặp lại 10",2],["liên tục",2],["lặp lại cho đến khi ⟨ ⟩",2]],
    k:"Tuần tự: lắp ghép các khối theo trình tự. Rẽ nhánh: <b>nếu … thì</b> (dạng khuyết), <b>nếu … thì … nếu không thì</b> (dạng đầy đủ). Lặp: <b>lặp lại n</b>, <b>liên tục</b>, <b>lặp lại cho đến khi</b>."},
  lap:{type:"match", label:"Đọc hiểu – Ba dạng lặp", q:"Ghép mỗi khối lệnh lặp trong Scratch với dạng lặp tương ứng (Hình 14.4).",
    items:[["lặp lại 10",1],["liên tục",2],["lặp lại cho đến khi ⟨trả lời = số bí mật⟩",3]],
    opts:["a) Lặp với số lần định trước","b) Lặp vô hạn","c) Lặp có điều kiện kết thúc"],
    k:"lặp lại 10 – a; liên tục – b; lặp lại cho đến khi – c (dừng khi điều kiện đúng)."},
  p82:{type:"mcq", label:"Câu hỏi tr.82", q:"Cấu trúc lặp nào sau đây KHÔNG được cho trước trong các nhóm lệnh của Scratch?",
    o:["Lặp một khối lệnh với số lần định trước.","Lặp một khối lệnh vô hạn lần.","Lặp với điều kiện được kiểm tra trước khi thực hiện khối lệnh.","Lặp với điều kiện được kiểm tra sau khi thực hiện khối lệnh."], a:3,
    k:"<b>D</b>. Scratch có lặp lại n lần, liên tục và <b>lặp lại cho đến khi</b> (kiểm tra điều kiện <b>trước</b> mỗi lần thực hiện); không có sẵn khối kiểm tra điều kiện sau khi thực hiện."},
  nv1:{type:"mcq", label:"Thực hành – Điều kiện lặp", q:"Trong chương trình Hình 14.7, vòng lặp “lặp lại cho đến khi ⟨trả lời = số bí mật⟩” kết thúc khi nào?",
    o:["Khi người chơi đoán đúng số bí mật.","Sau 10 lần đoán.","Khi người chơi đoán sai.","Không bao giờ kết thúc."], a:0,
    k:"Vòng lặp chỉ thực hiện khi người chơi đoán sai; <b>đoán đúng</b> là điều kiện kết thúc vòng lặp, sau đó máy nói “HOAN HÔ!”."},
  nv2:{type:"open", label:"Thực hành – Kết quả", q:"Chơi trò chơi Đoán số vài lần. Em cần nhiều nhất bao nhiêu lần đoán để tìm được số bí mật? Em đã đoán theo chiến thuật nào?",
    k:"Đoán số ở giữa khoảng còn lại (50, rồi 25 hoặc 75,…) – giống <b>tìm kiếm nhị phân</b> (Tin 7, Bài 15): mỗi lần loại một nửa, nhiều nhất <b>7</b> lần với 100 số."},
  lt1:{type:"match", label:"Luyện tập", q:"Ghép mỗi đoạn lệnh ở Bảng 14.1 với kết quả tương ứng mà đoạn lệnh đó vẽ.",
    items:[["a) lặp lại 4: di chuyển 100, xoay 90",2],["b) lặp lại 5: di chuyển 100, xoay 72",3],["c) lặp lại 6: di chuyển 100, xoay 60",4],["d) lặp lại 3: di chuyển 100, xoay 120",1]],
    opts:["1) Hình ba cạnh","2) Hình bốn cạnh","3) Hình năm cạnh","4) Hình sáu cạnh"],
    k:"a – 2 (bốn cạnh); b – 3 (năm cạnh); c – 4 (sáu cạnh); d – 1 (ba cạnh). Số lần lặp = số cạnh, góc quay = 360 : số cạnh."},
  vd1:{type:"match", label:"Vận dụng – câu 1", q:"Ghép các khối lệnh a, b, c, d (Hình 14.8) vào các vị trí 1, 2, 3, 4 để được chương trình giải phương trình ax + b = 0 với a, b nhập từ bàn phím.",
    items:[["Vị trí 1",2],["Vị trí 2",4],["Vị trí 3",3],["Vị trí 4",1]],
    opts:["a) nói nghiệm của phương trình là −b/a","b) hỏi và đặt hệ số a, b","c) nếu b = 0 thì vô số nghiệm, nếu không thì vô nghiệm","d) nếu a = 0 thì [3] nếu không thì [4]"],
    k:"1 – b (nhập a, b); 2 – d (kiểm tra a = 0); 3 – c (a = 0: vô số nghiệm hoặc vô nghiệm); 4 – a (a ≠ 0: nghiệm −b/a)."},
  vd2:{type:"order", label:"Vận dụng – câu 2", q:"Sắp xếp các khối lệnh của Hình 14.10 (theo số thứ tự) thành chương trình tính ước chung lớn nhất của hai số nguyên không âm, theo sơ đồ khối Hình 14.9.",
    items:{k7:"7) Khi bấm vào lá cờ xanh",k5:"5) hỏi a và đợi; đặt a thành trả lời",k6:"6) hỏi b và đợi; đặt b thành trả lời",k3:"3) lặp lại cho đến khi ⟨a × b = 0⟩",k9:"9) nếu ⟨a > b⟩ thì … nếu không thì …",k1:"1) đặt a thành (a chia lấy dư b) – trong nhánh “thì”",k2:"2) đặt b thành (b chia lấy dư a) – trong nhánh “nếu không thì”",k4:"4) nói (a + b) trong 5 giây",k8:"8) dừng lại tất cả"},
    start:["k1","k2","k3","k4","k5","k6","k7","k8","k9"], ans:["k7","k5","k6","k3","k9","k1","k2","k4","k8"],
    k:"7 → 5 → 6 → 3 { 9 { 1 } nếu không thì { 2 } } → 4 → 8. Khi a × b = 0 thì một số bằng 0, số còn lại (= a + b) là ước chung lớn nhất."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Cấu trúc tuần tự</b> được thể hiện bằng cách lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới.</li><li><b>Cấu trúc rẽ nhánh</b> có hai dạng: dạng khuyết và dạng đầy đủ.</li><li><b>Cấu trúc lặp</b> có ba dạng: lặp với số lần định trước, lặp vô hạn và lặp có điều kiện kết thúc.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Số bí mật: <b>đặt số bí mật thành lấy ngẫu nhiên từ 1 đến 100</b>.</li><li>Lặp đến khi đoán đúng: <b>lặp lại cho đến khi ⟨trả lời = số bí mật⟩</b>, bên trong là <b>nếu ⟨trả lời &lt; số bí mật⟩ thì … nếu không thì …</b>.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Ba cấu trúc điều khiển: <b>tuần tự</b>, <b>rẽ nhánh</b>, <b>lặp</b>; Scratch có khối lệnh tương ứng.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Cấu trúc điều khiển cơ bản</p><ul>'
    + "<li><b>Tuần tự</b>: lắp ghép các khối lệnh từ trên xuống dưới.</li>"
    + "<li><b>Rẽ nhánh</b>: dạng khuyết <b>nếu … thì</b>; dạng đầy đủ <b>nếu … thì … nếu không thì</b>.</li>"
    + "<li><b>Lặp</b>: lặp lại n lần; <b>liên tục</b> (vô hạn); <b>lặp lại cho đến khi</b> (có điều kiện kết thúc).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành: trò chơi Đoán số</p><ul>'
    + "<li>Số bí mật ← <b>lấy ngẫu nhiên từ 1 đến 100</b>; lặp lại cho đến khi <b>trả lời = số bí mật</b>.</li>"
    + "<li>Trong vòng lặp: nếu trả lời &lt; số bí mật thì “Quá thấp!”, nếu không thì “Quá cao!”.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Lặp n lần, xoay 360 : n độ → hình <b>n cạnh</b> đều.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>ax + b = 0: nếu a = 0 thì (b = 0: vô số nghiệm; b ≠ 0: vô nghiệm), nếu không thì nghiệm −b/a.</li>"
    + "<li>ƯCLN: lặp đến khi a × b = 0, thay số lớn bằng phần dư; kết quả a + b.</li>"
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
    return ["T8B14." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhớ đúng ba cấu trúc."], fix:["Ôn lại Tin học 6: tuần tự, rẽ nhánh, lặp."]},
  hd1: {ok:["Kịch bản đầy đủ."], fix:["Trò chơi kết thúc khi nào? Mỗi lần đoán sai máy làm gì?"]},
  tt:  {ok:["Đúng thứ tự."], fix:["Phải có số bí mật và trả lời trước khi hiển thị chúng."]},
  rn:  {ok:["Chính xác!"], fix:["So sánh 30 với 45."]},
  ct:  {ok:["Phân loại đúng."], fix:["Khối có chữ “nếu” là rẽ nhánh; khối có chữ “lặp”/“liên tục” là lặp."]},
  lap: {ok:["Ghép đúng."], fix:["Khối nào không bao giờ tự dừng?"]},
  p82: {ok:["Chính xác!"], fix:["Khối lặp lại cho đến khi kiểm tra điều kiện trước hay sau?"]},
  nv1: {ok:["Chính xác!"], fix:["Đọc điều kiện trong khối lặp."]},
  nv2: {ok:["Chiến thuật tốt: đoán số ở giữa."], fix:["Thử đoán 50 trước. Nếu quá thấp thì đoán tiếp số nào?"]},
  lt1: {ok:["Ghép đúng."], fix:["Số lần lặp chính là số cạnh."]},
  vd1: {ok:["Ghép đúng."], fix:["Phải nhập a, b trước; khối kiểm tra a = 0 có hai chỗ trống 3 và 4."]},
  vd2: {ok:["Chương trình đúng."], fix:["Khối nhập a, b đứng ngay sau khối bắt đầu; khối 1, 2 nằm trong khối 9."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {ct: "Khối có chữ “nếu” là rẽ nhánh; khối có chữ “lặp”, “liên tục” là lặp."};
const MATCH_HINT = {lt1: "Số lần lặp = số cạnh.", vd1: "Đọc lại Hình 14.8: vị trí 3, 4 nằm trong khối d."};
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
    {title:"Cấu trúc điều khiển trong Scratch", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Cấu trúc điều khiển cơ bản", acts:[
    {title:"Hoạt động 1: Trò chơi Đoán số", tasks:["hd1"]},
    {title:"Đọc hiểu: Cấu trúc tuần tự", tasks:["tt"]},
    {title:"Đọc hiểu: Cấu trúc rẽ nhánh", tasks:["rn"]},
    {title:"Đọc hiểu: Cấu trúc lặp", tasks:["ct","lap"], concept:"c1"},
    {title:"Câu hỏi SGK trang 82", tasks:["p82"]},
    {title:"Ghi bài: Cấu trúc điều khiển cơ bản", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Xây dựng trò chơi Đoán số", tasks:["nv1","nv2"], concept:"c2"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Đoạn lệnh và hình vẽ", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Phương trình bậc nhất và ước chung lớn nhất", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai14", title: "Bài 14. Cấu trúc điều khiển", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dùng lặp lại 10 nên trò chơi dừng dù chưa đoán đúng vì…",
  commentPh: "Ví dụ: Nhóm dùng đúng lặp lại cho đến khi; cần đặt khối nếu … thì vào trong vòng lặp."};
})();
