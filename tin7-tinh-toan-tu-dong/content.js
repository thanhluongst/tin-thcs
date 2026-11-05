/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Bài trước em đã biết nhập dữ liệu dạng số, văn bản và thời gian vào bảng tính. Có thể nhập dữ liệu là công thức tính toán được không? Khi thực hiện dự án Trường học xanh, em cần tính toán những gì?",
    k:"<b>Có.</b> Phần mềm bảng tính cho phép nhập <b>công thức</b> (bắt đầu bằng dấu =) để tính toán. Dự án cần tính: số lượng cây mỗi loại, tổng số cây, chi phí mua cây,…"},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Quan sát các ô dữ liệu, vùng nhập dữ liệu (có hình ngôi sao) trong Hình 7.1, Hình 7.2. Bảng tính điện tử nhận biết được các kiểu dữ liệu nào?",
    k:"<b>Văn bản</b> (Nguyễn Văn Hùng, Hải Phòng), <b>số</b> (8.5, 9), <b>ngày tháng</b> (3/5/2010) và <b>công thức</b> (= 2 + 1.5 + 2.5)."},
  kieu:{type:"sort", label:"HĐ1 – Câu 2: Kiểu dữ liệu", q:"Các kiểu dữ liệu được thể hiện thế nào trên bảng tính? Xếp mỗi dữ liệu nhập vào ô dưới đây theo kiểu của nó (có thể nhập thử vào bảng mô phỏng).",
    cats:["Văn bản","Số","Ngày tháng","Công thức"],
    items:[["Nguyễn Văn Hùng",0],["8.5",1],["3/5/2010",2],["= 2 + 1.5 + 2.5",3],["Hải Phòng",0],["9",1],["=C4*D4",3]],
    k:"Văn bản căn trái; số, ngày tháng căn phải. <b>Công thức luôn bắt đầu bằng dấu “=”</b>, sau đó là biểu thức; ô hiện <b>kết quả</b>, vùng nhập dữ liệu hiện <b>công thức</b>."},
  kihieu:{type:"mcq", label:"Đọc hiểu – Bảng 7.1", q:"Biểu thức toán học 5³ × 2 : 4 được viết trong phần mềm bảng tính là:",
    o:["=5³×2:4","=5^3*2/4","5^3*2/4","=5*3*2:4"], a:1,
    k:"<b>=5^3*2/4</b>. Trong bảng tính: nhân <b>*</b>, chia <b>/</b>, luỹ thừa <b>^</b>; công thức bắt đầu bằng <b>=</b>."},
  p35:{type:"sort", label:"Câu hỏi tr.35", q:"Trong phần mềm bảng tính, những công thức tính nào dưới đây sai? Vì sao? (Thử nhập vào bảng mô phỏng.)",
    cats:["Đúng","Sai"],
    items:[["A. = 5^2 + 6*101",0],["B. = 6*(3 + 2))",1],["C. = 2(3 + 4)",1],["D. = 1^2 + 2^2",0]],
    k:"<b>B sai</b>: thừa một dấu ngoặc đóng. <b>C sai</b>: thiếu dấu nhân, phải viết = 2*(3 + 4). A, D đúng."},
  hd2:{type:"open", label:"HĐ2 – Nhập công thức", q:"Nếu nhập công thức vào một ô tính và tính toán với giá trị nằm ở các ô khác thì phải làm thế nào?",
    k:"Trong công thức, ghi <b>địa chỉ của các ô</b> chứa dữ liệu thay cho giá trị. Ví dụ ô E4 nhập <b>=C4*D4</b> thay vì =25*10."},
  cach:{type:"mcq", label:"Đọc hiểu – Hai cách nhập", q:"Ô E4 có công thức =25*10 (cách 1), ô E5 có công thức =C5*D5 (cách 2). Nếu sửa số lượng cây ở ô D4 và D5 thì:",
    o:["Cả E4 và E5 đều tự động cập nhật.","Chỉ E5 tự động cập nhật; E4 vẫn giữ kết quả cũ.","Chỉ E4 tự động cập nhật.","Không ô nào cập nhật."], a:1,
    k:"<b>Chỉ E5</b> (cách 2, dùng địa chỉ ô) được <b>tính toán tự động</b> khi dữ liệu thay đổi. Cách 1 dùng giá trị cố định nên không cập nhật."},
  p36a:{type:"mcq", label:"Câu hỏi tr.36 – Hình 7.5", q:"Hình 7.5: độ dài AB, BC, CA ở các ô C3, C4, C5. Công thức cần nhập tại ô C6 để tính nửa chu vi tam giác ABC là:",
    o:["=C3+C4+C5/2","=(C3+C4+C5)/2","(C3+C4+C5)/2","=(15+10+12)/2"], a:1,
    k:"<b>=(C3+C4+C5)/2</b>. A sai vì chỉ chia C5 cho 2; C thiếu dấu =; D tính đúng nhưng không tự động cập nhật khi đổi số liệu."},
  p36b:{type:"open", label:"Câu hỏi tr.36 – Hình 7.6", q:"Hình 7.6: bán kính R ở ô C3, số PI ở ô C4. Em nhập công thức gì vào ô C5 (chu vi) và ô C6 (diện tích) hình tròn?",
    k:"C5: <b>=2*C4*C3</b> (chu vi = 2πR). C6: <b>=C4*C3^2</b> (diện tích = πR²)."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Khi sao chép ô tính chứa công thức hoặc vùng có chứa công thức thì các công thức này sẽ được sao chép như thế nào?",
    k:"Các <b>địa chỉ</b> trong công thức <b>được điều chỉnh</b> để giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức. Ví dụ =C4*D4 ở E4 sao chép xuống E6 thành <b>=C6*D6</b>."},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Chức năng tính toán tự động của công thức có được bảo toàn hay không khi sao chép dữ liệu? Nếu có thì được thể hiện như thế nào?",
    k:"<b>Có.</b> Công thức sau khi sao chép vẫn tham chiếu tới các ô tương ứng, nên khi dữ liệu ở các ô đó thay đổi thì kết quả tự động cập nhật."},
  p37a:{type:"mcq", label:"Câu hỏi tr.37 – câu 1", q:"Nếu sao chép công thức =C4*D4 từ ô E4 sang ô E10 thì công thức tại ô E10 là gì?",
    o:["=C4*D4","=C10*D10","=C6*D6","=E10*E10"], a:1,
    k:"<b>=C10*D10</b>: dịch xuống 6 hàng nên các địa chỉ cũng tăng 6 hàng."},
  p37b:{type:"mcq", label:"Câu hỏi tr.37 – câu 2", q:"Giả sử tại ô G10 có công thức =H10 + 2*K10. Nếu sao chép công thức này đến ô G12 thì công thức sẽ thay đổi như thế nào?",
    o:["=H10 + 2*K10","=H12 + 2*K12","=J10 + 2*M10","=H12 + 4*K12"], a:1,
    k:"<b>=H12 + 2*K12</b>: cùng cột, xuống 2 hàng → địa chỉ tăng 2 hàng; số 2 trong công thức giữ nguyên."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành (dùng nút ↑ ↓).",
    items:{a:"Nhập =C4*D4 vào E4, sao chép xuống E5, E6.",b:"Mở tệp THXanh.xlsx, tạo trang tính mới tên 2. Dự kiến số lượng cây, nhập dữ liệu.",c:"Lưu lại kết quả.",d:"Nhập =E4+E5+E6 vào E7.",e:"Định dạng A2 và hàng 3 chữ đậm, nền vàng; căn giữa cột STT; chỉnh độ rộng cột."},
    start:["a","b","c","d","e"], ans:["b","a","d","e","c"],
    k:"Thứ tự: <b>b → a → d → e → c</b>."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: các ô E4, E5, E6, E7 có công thức gì và kết quả bao nhiêu? Nếu đổi số lượng cây hoa ở D4 thành 12 thì những ô nào tự động thay đổi?",
    k:"E4 =C4*D4 → 250; E5 =C5*D5 → 100; E6 =C6*D6 → 150; E7 =E4+E5+E6 → 500. Đổi D4 = 12 thì <b>E4</b> (300) và <b>E7</b> (550) tự động cập nhật."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Tạo trang tính mới tên 3. Tìm hiểu giống cây, nhập danh sách các loại cây cụ thể và đơn giá như Hình 7.10, định dạng và lưu kết quả. Em đã định dạng những gì?",
    k:"Ví dụ: tiêu đề A2 chữ đậm; hàng 3 chữ đậm, nền vàng; cột STT căn giữa; chỉnh độ rộng cột cho đủ dữ liệu."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Nhập công thức =D4*E4 vào F4, sao chép F4 xuống các ô từ F5 đến F19. Công thức tại ô F19 là:",
    o:["=D4*E4","=D19*E19","=D19*E4","=F19*F19"], a:1,
    k:"<b>=D19*E19</b>: Thành tiền = Đơn giá × Số lượng của cùng hàng."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Phần mềm bảng tính mặc định căn phải dữ liệu là số và ngày tháng, căn trái dữ liệu là văn bản. Em có thể thay đổi lại cách căn lề của dữ liệu số, ngày tháng và văn bản được không? Nếu có thì bằng lệnh nào?",
    k:"<b>Có.</b> Chọn ô hoặc vùng, dùng các lệnh căn lề trong nhóm <b>Alignment</b> của thẻ <b>Home</b> (căn trái, căn giữa, căn phải)."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Tạo bảng tính mới như Hình 7.11, nhập công thức tính tổng diện tích rừng của tỉnh Tuyên Quang và sao chép công thức để tính cho các tỉnh còn lại. Lưu tệp với tên Dientichrung.xlsx. Em đã nhập công thức gì, ở ô nào?",
    k:"Nếu Tuyên Quang ở hàng 4, rừng tự nhiên cột B, rừng trồng cột C: nhập <b>=B4+C4</b> vào D4 (Tổng diện tích = 424.689), rồi sao chép D4 xuống D5:D8."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Dữ liệu trong ô tính có thể thuộc kiểu <b>văn bản, số, ngày tháng</b> và <b>công thức</b>.</li><li>Công thức luôn bắt đầu bằng dấu <b>“=”</b>, sau đó là biểu thức toán học.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Khi nhập công thức vào ô tính, nếu tính toán với giá trị từ các ô dữ liệu khác thì trong công thức cần ghi <b>địa chỉ của ô dữ liệu</b> tương ứng. Phần mềm bảng tính sẽ <b>tự động tính toán</b> và cập nhật kết quả nếu có thay đổi.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Khi sao chép một ô có công thức chứa địa chỉ, các địa chỉ được <b>điều chỉnh</b> để giữ nguyên <b>vị trí tương đối</b> giữa ô chứa công thức và ô có địa chỉ trong công thức.</li><li>Chức năng tính toán tự động của phần mềm bảng tính còn được thể hiện khi sao chép công thức.</li></ul>"},
  c4:{t:"Ghi nhớ", b:"<ul><li>Tạo trang tính mới: nháy nút <b>⊕</b> cạnh tên trang tính.</li><li>Sao chép công thức: chọn ô → <b>Ctrl+C</b> → chọn vùng đích → <b>Ctrl+V</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Bảng tính có thể nhập <b>công thức</b> để tính toán.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Kiểu dữ liệu</p><ul>'
    + "<li>4 kiểu: <b>văn bản, số, ngày tháng, công thức</b>.</li>"
    + "<li>Công thức bắt đầu bằng <b>=</b>. Phép toán: <b>+ – * / ^</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Công thức trong bảng tính</p><ul>'
    + "<li>Dùng <b>địa chỉ ô</b> trong công thức. VD: <b>=C4*D4</b>.</li>"
    + "<li>Dữ liệu đổi → kết quả <b>tự động cập nhật</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Sao chép công thức</p><ul>'
    + "<li><b>Ctrl+C</b> → chọn ô đích → <b>Ctrl+V</b>.</li>"
    + "<li>Địa chỉ <b>tự điều chỉnh</b>: =C4*D4 ở E4 → E6 thành <b>=C6*D6</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">4. Thực hành</p><ul>'
    + "<li>E4: <b>=C4*D4</b>, sao chép xuống E5, E6; E7: <b>=E4+E5+E6</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thành tiền = <b>Đơn giá × Số lượng</b>: F4 =D4*E4 → sao chép xuống.</li>"
    + "</ul>"},
  g7:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Đổi căn lề: <b>Home → Alignment</b>.</li>"
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
    return ["T7B7." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Đúng! Bảng tính nhập được công thức."],
        fix:["Bảng tính có tính toán được không? Công thức bắt đầu bằng dấu gì?"]},
  hd1a:{ok:["Nêu đủ các kiểu dữ liệu."],
        fix:["Ngoài văn bản, số, ngày tháng còn kiểu nào (Hình 7.2)?"]},
  kieu:{ok:["Phân loại đúng kiểu dữ liệu."],
        fix:["Dữ liệu bắt đầu bằng = là kiểu gì?"]},
  kihieu:{ok:["Chính xác! =5^3*2/4."],
        fix:["Xem Bảng 7.1: nhân, chia, luỹ thừa viết bằng kí hiệu nào?"]},
  p35: {ok:["Chính xác! B và C sai."],
        fix:["Đếm số dấu ngoặc mở và đóng; giữa 2 và ( có phép toán không?"]},
  hd2: {ok:["Đúng! Dùng địa chỉ ô trong công thức."],
        fix:["Thay số bằng gì để kết quả tự cập nhật?"]},
  cach:{ok:["Chính xác! Chỉ cách dùng địa chỉ ô mới tự cập nhật."],
        fix:["Công thức =25*10 có liên quan đến ô D4 không?"]},
  p36a:{ok:["Chính xác!"],
        fix:["Cần ngoặc để cộng trước rồi mới chia 2; đừng quên dấu =."]},
  p36b:{ok:["Công thức đúng."],
        fix:["Chu vi = 2 × PI × R; diện tích = PI × R². Ghi bằng địa chỉ ô."]},
  hd3a:{ok:["Hiểu đúng: địa chỉ được điều chỉnh."],
        fix:["Thử sao chép E4 xuống E6 trên bảng mô phỏng, xem công thức E6."]},
  hd3b:{ok:["Đúng! Vẫn tự động tính."],
        fix:["Sau khi sao chép, đổi dữ liệu ở C6 thì E6 có đổi không?"]},
  p37a:{ok:["Chính xác! =C10*D10."],
        fix:["Từ E4 xuống E10 là dịch mấy hàng?"]},
  p37b:{ok:["Chính xác! =H12 + 2*K12."],
        fix:["Chỉ địa chỉ ô thay đổi, số 2 không đổi."]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải nhập dữ liệu trước rồi mới nhập công thức."]},
  nvkq:{ok:["Kết quả chính xác."],
        fix:["Em kiểm tra lại E7 = E4 + E5 + E6."]},
  lt1: {ok:["Trang tính đẹp, đủ dữ liệu."],
        fix:["Em định dạng thêm hàng tiêu đề và cột STT."]},
  lt2: {ok:["Chính xác! =D19*E19."],
        fix:["Sao chép xuống thì số hàng trong địa chỉ thay đổi thế nào?"]},
  vd1: {ok:["Đúng! Dùng nhóm lệnh Alignment."],
        fix:["Em xem lại Hình 6.6 bài trước."]},
  vd2: {ok:["Công thức đúng, sao chép hợp lí."],
        fix:["Tổng diện tích = rừng tự nhiên + rừng trồng của cùng hàng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kieu: "Thử nhập vào bảng mô phỏng và xem thông báo kiểu dữ liệu.",
  p35: "Nhập thử từng công thức vào bảng mô phỏng."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Nhập công thức được không?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Kiểu dữ liệu", acts:[
    {title:"Hoạt động 1: Nhận biết kiểu dữ liệu", tasks:["hd1a","kieu"]},
    {title:"Đọc hiểu: Kí hiệu phép toán", tasks:["kihieu","p35"], concept:"c1"},
    {title:"Ghi bài: Kiểu dữ liệu", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Công thức", acts:[
    {title:"Hoạt động 2: Nhập công thức vào bảng tính", tasks:["hd2","cach"], concept:"c2"},
    {title:"Câu hỏi SGK trang 36", tasks:["p36a","p36b"]},
    {title:"Ghi bài: Công thức", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Sao chép công thức", acts:[
    {title:"Hoạt động 3: Sao chép ô tính chứa công thức", tasks:["hd3a","hd3b"], concept:"c3"},
    {title:"Câu hỏi SGK trang 37", tasks:["p37a","p37b"]},
    {title:"Ghi bài: Sao chép công thức", tasks:[], concept:"g4", ghi:true}]},
  {id:"phan-4", code:"2.4", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Dự kiến số lượng cây cần trồng", tasks:["nv1","nvkq"], concept:"c4"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g5", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tìm hiểu giống cây", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Căn lề, diện tích rừng", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g7", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai7", title: "Bài 7. Tính toán tự động trên bảng tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhập =25*10 nên khi sửa D4 kết quả không đổi…",
  commentPh: "Ví dụ: Nhóm sao chép công thức đúng; cần giải thích vì sao địa chỉ thay đổi."};
})();
