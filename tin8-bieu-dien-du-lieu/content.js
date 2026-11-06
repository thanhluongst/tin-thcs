/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Trong chương trình Tin học lớp 7, em đã được học về các kiểu dữ liệu trong phần mềm bảng tính. Em hãy cho biết đó là những kiểu dữ liệu nào.",
    k:"Kiểu <b>số</b> (số nguyên, số thập phân), kiểu <b>văn bản</b> (kí tự), kiểu <b>ngày tháng</b>. Ngoài ra kết quả so sánh trong bảng tính là giá trị <b>TRUE/FALSE</b> (lôgic)."},
  hd1a:{type:"match", label:"HĐ1 – Câu 1", q:"Ghép mỗi dòng ở cột Dữ liệu với một dòng phù hợp ở cột Kiểu dữ liệu trong Hình 13.1.",
    items:[["Tin học",1],["3.141592",2]], opts:["a) Văn bản","b) Số"],
    k:"<b>Tin học</b> – kiểu văn bản; <b>3.141592</b> – kiểu số."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Nhập dữ liệu và công thức như Hình 13.2 vào phần mềm bảng tính. Kết quả hiển thị ở các ô C1, C2, C3 lần lượt là:",
    o:["8; 35; TRUE","35; 8; TRUE","8; 8; FALSE","8; 35; FALSE"], a:0,
    k:"C1 = 3 + 5 = <b>8</b> (số); C2 ghép kí tự 3 và 5 → <b>35</b> (xâu kí tự); C3 kiểm tra 3 &lt; 5 → <b>TRUE</b> (lôgic)."},
  kieu:{type:"sort", label:"Đọc hiểu – Ba kiểu dữ liệu trong Scratch", q:"Mỗi giá trị dưới đây thuộc kiểu dữ liệu nào trong Scratch?",
    cats:["Số","Xâu kí tự","Lôgic"],
    items:[["15",0],["3.141592",0],["@",1],["Computer",1],["true",2],["false",2],["Kết quả ghép kí tự 3 với kí tự 5 (35 ở ô C2)",1],["Kết quả của phép so sánh 3 < 5",2]],
    k:"<b>Số</b>: số nguyên, số thập phân (15, 3.141592). <b>Xâu kí tự</b>: kí tự hoặc xâu kí tự (@, Computer, kết quả ghép). <b>Lôgic</b>: true hoặc false (kết quả so sánh)."},
  pt:{type:"match", label:"Đọc hiểu – Các phép toán (Bảng 13.2)", q:"Ghép mỗi phép toán với kết quả của nó (thử trên mô phỏng).",
    items:[["13 chia lấy dư 4",1],["kết hợp “táo” “chuối”",2],["70 > 50",3],["⟨70 > 50⟩ và ⟨80 < 50⟩",4],["⟨50 = 50⟩ hoặc ⟨30 > 50⟩",3],["không phải ⟨50 = 50⟩",4]],
    opts:["a) 1","b) táochuối","c) true","d) false"],
    k:"13 chia lấy dư 4 = 1; kết hợp → “táochuối”; 70 &gt; 50 → true; và chỉ đúng khi cả hai đều đúng → false; hoặc chỉ sai khi cả hai đều sai → true; không phải (true) → false."},
  p77:{type:"match", label:"Câu hỏi tr.77", q:"Ghép mỗi phép toán với một kiểu dữ liệu kết quả cho phù hợp.",
    items:[["kết hợp “Diện tích hình tròn là:” (s)",2],["⟨(n chia lấy dư 2) = 0⟩",3],["làm tròn (3.141592 × r × r)",1]],
    opts:["Số","Xâu kí tự","Lôgic"],
    k:"kết hợp → <b>xâu kí tự</b>; phép so sánh = → <b>lôgic</b>; làm tròn → <b>số</b>."},
  hd2:{type:"open", label:"HĐ2 – Hằng, biến, biểu thức", q:"Ở Bài 12, chương trình cho Bọ rùa di chuyển theo tam giác đều. Làm thế nào để tổng quát bài toán với đường đi của nhân vật là một hình đa giác đều có số cạnh bất kì được nhập vào từ bàn phím?",
    k:"Dùng một <b>biến</b> n lưu số cạnh, nhận giá trị nhập từ bàn phím (hỏi … và đợi, trả lời). Tính độ dài cạnh và góc quay bằng <b>biểu thức</b> (ví dụ 900 / n và 360 / n); lặp lại n lần."},
  hbt:{type:"sort", label:"Đọc hiểu – Hằng, biến, biểu thức", q:"Mỗi thành phần dưới đây là hằng, biến hay biểu thức?",
    cats:["Hằng","Biến","Biểu thức"],
    items:[["3.14",0],["“Xin chào!”",0],["true",0],["n (số cạnh nhập từ bàn phím)",1],["r (bán kính hình tròn)",1],["2 × 3.14 × r",2],["360 / n",2]],
    k:"<b>Hằng</b>: giá trị không đổi (3.14, “Xin chào!”, true). <b>Biến</b>: lưu giá trị có thể thay đổi, có tên (n, r). <b>Biểu thức</b>: kết hợp biến, hằng, phép toán (2 × 3.14 × r; 360 / n)."},
  p78:{type:"sort", label:"Câu hỏi tr.78", q:"Chỉ ra hằng, biến, biểu thức được sử dụng trong chương trình ở Hình 13.4.",
    cats:["Hằng","Biến","Biểu thức"],
    items:[["“Hãy nhập số cạnh:”",0],["900",0],["360",0],["n",1],["số bước",1],["góc quay",1],["900 / n",2],["360 / n",2],["kết hợp “Đường đi là hình có” (kết hợp n “cạnh bằng nhau”)",2]],
    k:"Hằng: “Hãy nhập số cạnh:”, “Đường đi là hình có”, “cạnh bằng nhau” (xâu kí tự); 900, 360, 1 (số). Biến: n, số bước, góc quay (kiểu số). Biểu thức: 900 / n, 360 / n (kiểu số); kết hợp … (kiểu xâu kí tự)."},
  nv1:{type:"mcq", label:"Thực hành – Thử chương trình", q:"Chạy chương trình DuongDi.sb3 và nhập 4. Nhân vật vẽ hình gì, mỗi cạnh dài bao nhiêu bước, quay bao nhiêu độ?",
    o:["Hình vuông, cạnh 225 bước, quay 90 độ.","Hình vuông, cạnh 900 bước, quay 360 độ.","Tam giác đều, cạnh 300 bước, quay 120 độ.","Hình vuông, cạnh 60 bước, quay 90 độ."], a:0,
    k:"n = 4: số bước = 900 / 4 = <b>225</b>, góc quay = 360 / 4 = <b>90</b> → hình vuông. Chu vi luôn là 900 bước."},
  nv2:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: em đã tạo những biến nào, mỗi biến lưu giá trị gì? Em đã thử nhập những số cạnh nào và nhân vật vẽ ra hình gì?",
    k:"Biến n (số cạnh nhập vào), số bước (900 / n), góc quay (360 / n). Ví dụ: 3 → tam giác đều, 4 → hình vuông, 6 → lục giác đều."},
  lt1:{type:"match", label:"Luyện tập – câu 1", q:"r là biến lưu giá trị của bán kính hình tròn. Cho r = 5, ghép mỗi biểu thức với giá trị trả lại và kiểu dữ liệu của nó.",
    items:[["a) ⟨r > 0⟩",1],["b) 2 × 3.14 × r",2],["c) kết hợp “Chu vi đường tròn là” (2 × 3.14 × r)",3]],
    opts:["true – kiểu lôgic","31.4 – kiểu số","Chu vi đường tròn là31.4 – kiểu xâu kí tự"],
    k:"a) <b>true</b> (lôgic); b) <b>31.4</b> (số); c) <b>“Chu vi đường tròn là31.4”</b> (xâu kí tự – phép kết hợp ghép liền, không tự thêm dấu cách)."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Viết chương trình tính chu vi đường tròn, diện tích hình tròn với giá trị của bán kính được nhập vào từ bàn phím, thông báo kết quả ra màn hình. Mô tả chương trình của em.",
    k:"hỏi “Nhập bán kính:” và đợi → đặt r thành trả lời → nói kết hợp “Chu vi là ” (2 × 3.14 × r) trong 2 giây → nói kết hợp “Diện tích là ” (3.14 × r × r)."},
  vd1:{type:"open", label:"Vận dụng", q:"Viết chương trình Scratch của riêng em để giải quyết một bài toán cụ thể trong một môn học như Khoa học tự nhiên, Toán,… trong đó có sử dụng hằng, biến và biểu thức. Mô tả bài toán và chương trình.",
    k:"Ví dụ: tính vận tốc v = s / t (KHTN); diện tích hình chữ nhật; đổi độ C sang độ F (F = C × 1.8 + 32); kiểm tra số chẵn (n chia lấy dư 2 = 0)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Mỗi <b>kiểu dữ liệu</b> là một tập hợp các giá trị mà một biến thuộc kiểu đó có thể nhận. Mỗi kiểu dữ liệu được trang bị một số phép toán.</li><li>Ba kiểu dữ liệu phổ biến trong ngôn ngữ lập trình trực quan là: <b>kiểu số, kiểu xâu kí tự, kiểu lôgic</b>.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Biến</b> được dùng để lưu trữ giá trị có thể thay đổi trong quá trình thực hiện chương trình. Biến được nhận biết qua tên của nó và thuộc một kiểu dữ liệu nhất định.</li><li><b>Hằng</b> là giá trị không đổi trong quá trình thực hiện chương trình. Mỗi hằng thuộc một kiểu dữ liệu nhất định (hằng kiểu số, hằng kiểu xâu kí tự, hằng kiểu lôgic,…).</li><li><b>Biểu thức</b> là sự kết hợp của biến, hằng, dấu ngoặc, phép toán và các hàm để trả lại giá trị thuộc một kiểu dữ liệu nhất định.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Tạo biến: nhóm <b>Các biến số</b> → Tạo một biến. Gán giá trị: <b>đặt … thành …</b>.</li><li>Nhập từ bàn phím: <b>hỏi … và đợi</b> (Cảm biến), giá trị nhập được lưu trong <b>trả lời</b>.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Bảng tính có các kiểu dữ liệu: <b>số</b>, <b>văn bản</b>, ngày tháng.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Kiểu dữ liệu</p><ul>'
    + "<li><b>Kiểu dữ liệu</b> = tập hợp giá trị + các phép toán trên giá trị đó.</li>"
    + "<li>Scratch: <b>số</b> (+ − × / chia lấy dư, làm tròn), <b>xâu kí tự</b> (kết hợp), <b>lôgic</b> true/false (so sánh = &lt; &gt;; và, hoặc, không phải).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Hằng, biến, biểu thức</p><ul>'
    + "<li><b>Biến</b>: có tên, lưu giá trị <b>thay đổi được</b>. <b>Hằng</b>: giá trị <b>không đổi</b>.</li>"
    + "<li><b>Biểu thức</b>: kết hợp biến, hằng, phép toán, hàm → trả lại một giá trị. VD: 2 × 3.14 × r.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li><b>hỏi … và đợi</b> → <b>đặt n thành trả lời</b>; số bước = 900 / n; góc quay = 360 / n; <b>lặp lại n</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>r = 5: r &gt; 0 → <b>true</b>; 2 × 3.14 × r → <b>31.4</b>; kết hợp → xâu kí tự.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Dùng biến, hằng, biểu thức để giải bài toán của môn học khác.</li>"
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
    return ["T8B13." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhớ đúng các kiểu dữ liệu."], fix:["Ô chứa số và ô chứa chữ trong bảng tính khác nhau thế nào?"]},
  hd1a:{ok:["Ghép đúng."], fix:["“Tin học” có tính toán được không?"]},
  hd1b:{ok:["Chính xác!"], fix:["Phép & ghép kí tự, phép &lt; so sánh."]},
  kieu:{ok:["Phân loại đúng."], fix:["Giá trị lôgic chỉ có true hoặc false."]},
  pt:  {ok:["Chính xác!"], fix:["Chạy thử từng phép toán trên mô phỏng."]},
  p77: {ok:["Chính xác!"], fix:["Kết quả của phép kết hợp luôn là xâu kí tự."]},
  hd2: {ok:["Ý tưởng đúng: dùng biến."], fix:["Số cạnh thay đổi theo người dùng nhập thì cần lưu ở đâu?"]},
  hbt: {ok:["Phân loại đúng."], fix:["Biến có tên; biểu thức có phép toán."]},
  p78: {ok:["Chỉ đúng hằng, biến, biểu thức."], fix:["900 / n là một giá trị cố định hay được tính ra?"]},
  nv1: {ok:["Chính xác!"], fix:["Tính 900 / 4 và 360 / 4."]},
  nv2: {ok:["Báo cáo đầy đủ."], fix:["Nêu giá trị của từng biến khi nhập số cạnh."]},
  lt1: {ok:["Chính xác!"], fix:["Phép so sánh cho kết quả kiểu gì?"]},
  lt2: {ok:["Chương trình đúng."], fix:["Diện tích hình tròn = 3.14 × r × r."]},
  vd1: {ok:["Bài toán hay, dùng đúng biến và biểu thức."], fix:["Chương trình đã có biến và biểu thức chưa?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kieu: "Lôgic chỉ có true/false; kết quả ghép kí tự là xâu kí tự.",
  hbt: "Biến có tên và thay đổi được; biểu thức có phép toán.",
  p78: "Biểu thức chứa phép toán; biến là các tên n, số bước, góc quay."
};
const MATCH_HINT = {pt: "Chạy thử các phép toán trên mô phỏng.", lt1: "Thay r = 5 vào từng biểu thức."};
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
    {title:"Kiểu dữ liệu trong bảng tính", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Kiểu dữ liệu", acts:[
    {title:"Hoạt động 1: Kiểu dữ liệu", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Kiểu dữ liệu và phép toán trong Scratch", tasks:["kieu","pt"], concept:"c1"},
    {title:"Câu hỏi SGK trang 77", tasks:["p77"]},
    {title:"Ghi bài: Kiểu dữ liệu", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Hằng, biến, biểu thức", acts:[
    {title:"Hoạt động 2: Hằng, biến, biểu thức", tasks:["hd2","hbt"], concept:"c2"},
    {title:"Câu hỏi SGK trang 78", tasks:["p78"]},
    {title:"Ghi bài: Hằng, biến, biểu thức", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Đường đi là đa giác đều có n cạnh", tasks:["nv1","nv2"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Đường tròn", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bài toán của môn học khác", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai13", title: "Bài 13. Biểu diễn dữ liệu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhầm 900 là biến vì…",
  commentPh: "Ví dụ: Nhóm phân biệt đúng hằng, biến; cần chỉ rõ kiểu dữ liệu của biểu thức."};
})();
