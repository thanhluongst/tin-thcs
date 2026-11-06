/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"An nghĩ đã tạo xong chương trình trò chơi Đoán số ở Bài 14. Khoa nói: “Chưa xong đâu, chúng ta cần phải thực hiện một việc nữa, đó là gỡ lỗi.” Theo em, gỡ lỗi là làm những gì?",
    k:"Gỡ lỗi là <b>chạy thử</b> chương trình để <b>phát hiện</b> lỗi, <b>tìm</b> lệnh gây ra lỗi và <b>sửa</b> lỗi, để chương trình chạy đúng kịch bản."},
  hd1:{type:"open", label:"HĐ1 – Đếm số lần đoán", q:"Chương trình Hình 15.1 được bổ sung biến số lần đoán để đếm và thông báo số lần người chơi đoán khi đoán đúng. Hãy kiểm tra trò chơi (chạy thử hoặc bấm Kiểm thử trên mô phỏng) và mô tả tình huống chương trình chạy không đúng kịch bản (nếu có).",
    k:"Khi chạy thử, số lần đoán mà máy tính hiển thị <b>luôn kém số lần thực tế một đơn vị</b>. Ví dụ đoán đúng ngay lần đầu thì máy báo “Số lần đoán: 0”."},
  hd2:{type:"mcq", label:"HĐ2 – Không làm việc hay làm việc sai?", q:"Chương trình đã cho trong Hình 15.1 không hoạt động được hay nó có hoạt động nhưng đã thực hiện không đúng kịch bản?",
    o:["Có hoạt động (vẫn hỏi, trả lời, thông báo) nhưng thực hiện không đúng kịch bản: số lần đoán sai.","Không hoạt động được.","Hoạt động hoàn toàn đúng.","Chỉ hoạt động khi đoán đúng ngay lần đầu."], a:0,
    k:"Máy tính vẫn hỏi và trả lời theo các khối lệnh, nhưng <b>số lần đoán</b> hiển thị không đúng với số lần thực tế → chương trình <b>làm việc sai</b>."},
  loai:{type:"sort", label:"Đọc hiểu – Hai loại lỗi", q:"Mỗi lỗi dưới đây là lỗi cú pháp hay lỗi lôgic?",
    cats:["Lỗi cú pháp","Lỗi lôgic"],
    items:[["Câu lệnh viết sai quy tắc của ngôn ngữ lập trình, chương trình không hoạt động",0],["Gõ sai tên lệnh (viết prnt thay cho print) trong ngôn ngữ lập trình dạng văn bản",0],["Số lần đoán hiển thị kém số lần thực tế 1 đơn vị",1],["Dùng phép “+” thay cho “kết hợp” khi ghép chữ với số",1],["Trò chơi cho đoán quá 7 lần dù kịch bản chỉ cho 7 lần",1]],
    k:"<b>Lỗi cú pháp</b>: viết sai quy tắc, chương trình không hoạt động. <b>Lỗi lôgic</b> (lỗi ngữ nghĩa): viết đúng cú pháp nhưng thực hiện sai so với kịch bản."},
  p87:{type:"mcq", label:"Câu hỏi tr.87", q:"Chọn phát biểu đúng nhất về hoạt động gỡ lỗi.",
    o:["Gỡ lỗi là phát hiện và loại bỏ lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.","Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.","Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Gỡ lỗi là một phần quan trọng của lập trình.","Gỡ lỗi là phát hiện và loại bỏ lỗi. Gỡ lỗi là một phần quan trọng của lập trình."], a:3,
    k:"<b>D</b>. Gỡ lỗi gồm cả phát hiện <b>và loại bỏ</b> lỗi, là một phần quan trọng của lập trình."},
  hd3a:{type:"mcq", label:"HĐ3 – Câu 1", q:"Theo kịch bản, biến số lần đoán sẽ thay đổi trong tình huống nào?",
    o:["Mỗi khi người chơi nhập một số đoán (kể cả lần đầu tiên).","Chỉ khi người chơi đoán đúng.","Chỉ khi người chơi đoán sai.","Không bao giờ thay đổi."], a:0,
    k:"Số lần đoán phải <b>tăng 1</b> mỗi khi người chơi nhập một giá trị số đoán – ở các lệnh (4), (7) và (8)."},
  hd3b:{type:"mcq", label:"HĐ3 – Câu 2", q:"Những khối lệnh nào làm thay đổi biến số lần đoán trong chương trình Hình 15.1?",
    o:["Lệnh (2) khởi tạo giá trị và lệnh (9) tăng giá trị; lệnh (11) chỉ hiển thị.","Chỉ lệnh (11).","Lệnh (4) và (5).","Lệnh (3) và (10)."], a:0,
    k:"Các khối liên quan đến biến số lần đoán: <b>(2)</b> khởi tạo, <b>(9)</b> thay đổi giá trị, <b>(11)</b> hiển thị."},
  hd3c:{type:"mcq", label:"HĐ3 – Câu 3", q:"Có điều gì khác nhau giữa kịch bản và những khối lệnh tương ứng?",
    o:["Lệnh (9) tăng số lần đoán sau (7) hoặc (8), nhưng không có lệnh nào tăng số lần đoán sau lần nhập đầu tiên ở lệnh (4).","Lệnh (2) phải đặt số lần đoán thành 100.","Lệnh (11) phải dùng phép “+”.","Không có gì khác nhau."], a:0,
    k:"Kịch bản: tăng 1 sau mỗi lần nhập ở (4), (7), (8). Chương trình: chỉ tăng sau (7) hoặc (8) → <b>thiếu lần nhập đầu tiên ở lệnh (4)</b>."},
  sua:{type:"mcq", label:"Đọc hiểu – Sửa lỗi", q:"Cách sửa lỗi được nêu trong SGK là:",
    o:["Bổ sung lệnh (4a) “thay đổi số lần đoán một lượng 1” giống lệnh (9) vào ngay sau lệnh (4).","Xoá lệnh (9).","Đổi lệnh (2) thành đặt số lần đoán thành 100.","Đổi “trả lời = số bí mật” thành “trả lời < số bí mật”."], a:0,
    k:"Tăng giá trị số lần đoán lên 1 sau lần đoán đầu tiên: thêm lệnh <b>(4a) thay đổi số lần đoán một lượng 1</b> vào sau lệnh (4)."},
  p89:{type:"open", label:"Câu hỏi tr.89", q:"Gỡ lỗi đoạn chương trình xác định một số n nhập từ bàn phím là số chẵn hay số lẻ (Hình 15.3). Em phát hiện những lỗi nào, sửa thế nào?",
    k:"Lỗi 1: chưa gán giá trị nhập vào cho n (n luôn là 0) → thêm <b>đặt n thành trả lời</b> sau lệnh hỏi (hoặc dùng trả lời thay n). Lỗi 2: hai thông báo bị đổi chỗ: n chia lấy dư 2 = 0 là số <b>CHẴN</b>, ngược lại là số <b>LẺ</b>."},
  nv1:{type:"mcq", label:"Thực hành – Lỗi ở lệnh hiển thị", q:"Tình huống đoán đúng: thông báo hiển thị số lần đoán không xuất hiện cụm từ “Số lần đoán:”. Lỗi ở đâu?",
    o:["Lệnh (14): phép toán ghép nối các chữ là “kết hợp” chứ không phải dấu “+”.","Lệnh (2).","Lệnh (6).","Lệnh (13)."], a:0,
    k:"“Số lần đoán:” + số lần đoán là phép cộng số (chữ được coi là 0) → chỉ hiện con số. Sửa thành <b>kết hợp “Số lần đoán:” (số lần đoán)</b>."},
  nv2:{type:"mcq", label:"Thực hành – Lỗi ở điều kiện lặp", q:"Tình huống đoán sai 7 lần: chương trình không kết thúc mà cho đoán thêm một lần nữa. Điều kiện ở lệnh (6) cần đổi thành:",
    o:["⟨trả lời = số bí mật⟩ hoặc ⟨số lần đoán > 6⟩ (hoặc ⟨số lần đoán = 7⟩)","⟨trả lời = số bí mật⟩ và ⟨số lần đoán > 7⟩","⟨số lần đoán > 7⟩","⟨trả lời < số bí mật⟩"], a:0,
    k:"Mỗi người không đoán quá 7 lần nên vòng lặp phải kết thúc khi số lần đoán bằng 7: dùng <b>số lần đoán &gt; 6</b> hoặc <b>số lần đoán = 7</b>."},
  nv3:{type:"mcq", label:"Thực hành – Lỗi ở điều kiện rẽ nhánh", q:"Sau 7 lần đoán vẫn có thể đoán đúng hoặc đoán sai, nên số lần đoán không cho biết kết quả. Điều kiện rẽ nhánh ở lệnh (11) cần sửa thành:",
    o:["⟨trả lời = số bí mật⟩ (thì: HOAN HÔ và số lần đoán; nếu không thì: Bạn đã thua!)","⟨số lần đoán > 6⟩","⟨số lần đoán = 7⟩","⟨trả lời > số bí mật⟩"], a:0,
    k:"Kết quả thắng/thua phụ thuộc vào <b>trả lời = số bí mật</b>, không phụ thuộc số lần đoán. Đổi chỗ hai nhánh như Hình 15.5."},
  lt1:{type:"open", label:"Luyện tập", q:"Chọn một cách khác với cách đã nêu trong phần b) Sửa lỗi của mục 2 để sửa lỗi của chương trình Hình 15.1. Mô tả cách của em.",
    k:"Ví dụ: đặt <b>số lần đoán thành 1</b> ở lệnh (2) (đã tính lần đoán đầu tiên); hoặc hiển thị kết hợp “Số lần đoán” với (số lần đoán + 1) ở lệnh (11)."},
  vd1:{type:"open", label:"Vận dụng", q:"Đổi vai trò máy tính và người chơi trong trò chơi Đoán số: em chọn một số nguyên từ 1 đến 120; máy tính hiển thị một số, em trả lời “d”, “c” hoặc “t” (đúng, cao hơn, thấp hơn số em chọn). Viết chương trình để sau một số bước, càng ít càng tốt, máy tính tìm ra số em đã chọn. Chạy thử, phát hiện và sửa lỗi. Mô tả chương trình và các lỗi em đã sửa.",
    k:"Dùng tìm kiếm nhị phân: đầu ← 1, cuối ← 120; lặp: đoán ← làm tròn((đầu + cuối) / 2); hỏi; nếu “c” thì cuối ← đoán − 1; nếu “t” thì đầu ← đoán + 1; cho đến khi trả lời “d”. Nhiều nhất <b>7</b> lần (2⁷ = 128 ≥ 120)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Cần phải <b>chạy thử</b> chương trình để phát hiện và loại bỏ lỗi.</li><li>Có hai loại lỗi: <b>lỗi cú pháp</b> và <b>lỗi lôgic</b>.</li><li>Lỗi cú pháp là lỗi viết câu lệnh sai quy tắc, làm cho chương trình không hoạt động.</li><li>Lỗi lôgic là lỗi câu lệnh, tuy được viết đúng quy tắc nhưng thực hiện sai so với kịch bản.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Hai phương pháp phổ biến để phát hiện lỗi lôgic: <b>tập trung vào những khối lệnh</b> trực tiếp gây ra lỗi và những khối lệnh liên quan lôgic đến nó theo các cấu trúc điều khiển; <b>chạy chương trình từng bước</b>, kết hợp theo dõi sự thay đổi của các biến, các giá trị đầu ra và so sánh với các giá trị tính được theo cách thủ công.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li><b>Gỡ lỗi</b>: chạy thử, phát hiện, tìm và sửa lỗi của chương trình.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Kiểm thử và phân loại lỗi</p><ul>'
    + "<li><b>Kiểm thử</b>: chạy thử chương trình để phát hiện lỗi.</li>"
    + "<li><b>Lỗi cú pháp</b>: sai quy tắc → chương trình không hoạt động. <b>Lỗi lôgic</b>: đúng quy tắc nhưng làm sai kịch bản.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Phát hiện lỗi và sửa lỗi lôgic</p><ul>'
    + "<li>Cách 1: <b>phân tích lôgic</b> các khối lệnh liên quan đến lỗi, so với kịch bản.</li>"
    + "<li>Cách 2: <b>chạy với dữ liệu mẫu</b>, hiện giá trị biến, chạy từng bước, so với kết quả tính tay.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Ghép chữ dùng <b>kết hợp</b>, không dùng “+”; tối đa 7 lần: điều kiện <b>số lần đoán &gt; 6</b>; thắng/thua: <b>trả lời = số bí mật</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Một lỗi có thể sửa bằng nhiều cách; luôn <b>kiểm thử lại</b> sau khi sửa.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Máy đoán số 1–120 bằng cách chia đôi: nhiều nhất <b>7</b> lần.</li>"
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
    return ["T8B15." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Hiểu đúng gỡ lỗi."], fix:["Gỡ lỗi gồm những bước nào?"]},
  hd1: {ok:["Phát hiện đúng lỗi."], fix:["Đếm số lần em đã đoán rồi so với số máy báo."]},
  hd2: {ok:["Chính xác!"], fix:["Máy tính có hỏi và trả lời không?"]},
  loai:{ok:["Phân loại đúng."], fix:["Chương trình còn chạy được thì không phải lỗi cú pháp."]},
  p87: {ok:["Chính xác!"], fix:["Gỡ lỗi chỉ phát hiện hay còn loại bỏ lỗi?"]},
  hd3a:{ok:["Chính xác!"], fix:["Mỗi lần nhập một số là một lần đoán."]},
  hd3b:{ok:["Chính xác!"], fix:["Tìm các lệnh có tên biến số lần đoán."]},
  hd3c:{ok:["Tìm đúng chỗ khác biệt."], fix:["Lệnh (9) nằm trong vòng lặp: vòng lặp chạy khi nào?"]},
  sua: {ok:["Chính xác!"], fix:["Lần đoán đầu tiên ở lệnh nào chưa được đếm?"]},
  p89: {ok:["Tìm đủ hai lỗi."], fix:["Biến n đã được gán giá trị nhập vào chưa? Số chia hết cho 2 là chẵn hay lẻ?"]},
  nv1: {ok:["Chính xác!"], fix:["Phép “+” làm gì với chữ?"]},
  nv2: {ok:["Chính xác!"], fix:["Đếm: sau lần đoán thứ 7, số lần đoán bằng bao nhiêu?"]},
  nv3: {ok:["Chính xác!"], fix:["Thắng hay thua phụ thuộc vào điều gì?"]},
  lt1: {ok:["Cách sửa khác hợp lí."], fix:["Thử đặt giá trị ban đầu của số lần đoán khác đi."]},
  vd1: {ok:["Chương trình tìm được số nhanh."], fix:["Đoán số ở giữa khoảng còn lại."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {loai: "Lỗi cú pháp làm chương trình không chạy; lỗi lôgic làm chương trình chạy sai."};
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
    {title:"Gỡ lỗi là làm những gì?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Kiểm thử và phân loại lỗi", acts:[
    {title:"Hoạt động 1, 2: Đếm số lần đoán", tasks:["hd1","hd2"]},
    {title:"Đọc hiểu: Kiểm thử, phân loại lỗi", tasks:["loai"], concept:"c1"},
    {title:"Câu hỏi SGK trang 87", tasks:["p87"]},
    {title:"Ghi bài: Kiểm thử và phân loại lỗi", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Phát hiện lỗi và sửa lỗi lôgic", acts:[
    {title:"Hoạt động 3: Gỡ lỗi", tasks:["hd3a","hd3b","hd3c"]},
    {title:"Đọc hiểu: Phát hiện và sửa lỗi lôgic", tasks:["sua"], concept:"c2"},
    {title:"Câu hỏi SGK trang 89", tasks:["p89"]},
    {title:"Ghi bài: Phát hiện lỗi và sửa lỗi lôgic", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Gỡ lỗi trò chơi Đoán số tối đa 7 lần", tasks:["nv1","nv2","nv3"]},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Một cách sửa lỗi khác", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Máy tính đoán số", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai15", title: "Bài 15. Gỡ lỗi", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 sửa điều kiện (6) nhưng quên sửa lệnh (11) nên…",
  commentPh: "Ví dụ: Nhóm tìm đúng lệnh gây lỗi; cần kiểm thử lại sau khi sửa."};
})();
