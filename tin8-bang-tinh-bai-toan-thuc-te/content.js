/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Theo em, bảng tính bạn Khoa tạo ra ở Hình 5.1 có cần bổ sung thông tin gì không?",
    k:"Cần bổ sung dữ liệu cho cột <b>Doanh thu</b> (đang trống) – tính bằng công thức Đơn giá × Số lượt mua; có thể thêm <b>tỉ lệ doanh thu của công ti</b> và cột <b>Doanh thu của công ti</b>, dòng <b>tổng doanh thu</b>."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Công thức để tính Doanh thu của phần mềm Quản lí thời gian (ô E4) dựa trên Đơn giá và Số lượt mua là:",
    o:["=C4+D4","=C4*D4","=B4*C4","=C4/D4"], a:1,
    k:"Doanh thu = Đơn giá × Số lượt mua, nên tại ô E4 nhập <b>=C4*D4</b> (kết quả 1 999 950 000)."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Thao tác nào giúp em tính doanh thu cho các phần mềm còn lại mà không cần gõ công thức vào từng ô? Khi thực hiện thao tác đó, địa chỉ ô trong công thức sẽ thay đổi như thế nào?",
    k:"<b>Sao chép công thức</b>: chọn ô E4, kéo thả <b>nút điền</b> (góc dưới bên phải ô) xuống E9, hoặc Copy rồi Paste. Khi sao chép xuống một hàng, các địa chỉ trong công thức <b>tăng một hàng</b>: E5 có =C5*D5, E6 có =C6*D6,…"},
  p22:{type:"match", label:"Câu hỏi tr.22", ph:"Chọn…",
    q:"Nếu sao chép công thức từ ô E4 (=C4*D4) đến các ô E6, E7, E8 và E9 thì công thức trong các ô đó là gì?",
    opts:["a) =C6*D6","b) =C7*D7","c) =C8*D8","d) =C9*D9","e) =C4*D4"],
    items:[["1) Ô E6",1],["2) Ô E7",2],["3) Ô E8",3],["4) Ô E9",4]],
    k:"E6: =C6*D6; E7: =C7*D7; E8: =C8*D8; E9: =C9*D9. Địa chỉ tương đối thay đổi theo vị trí ô chứa công thức."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Em hãy nhập công thức để tính Doanh thu của công ti cho phần mềm Quản lí thời gian và Trò chơi sáng tạo vào ô F4 và F5, biết rằng Doanh thu của công ti = Doanh thu × Tỉ lệ (được lưu tại ô F2).",
    k:"F4: <b>=E4*F2</b>; F5: <b>=E5*F2</b>. Ô F2 (tỉ lệ 70%) dùng chung cho mọi phần mềm."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Nếu sao chép công thức =E4*F2 từ ô F4 vào ô F5 thì công thức nhận được tại ô F5 có đúng yêu cầu không? Vì sao?",
    k:"<b>Không đúng.</b> Sao chép xuống một hàng, F5 nhận công thức <b>=E5*F3</b>: địa chỉ F2 cũng bị đổi thành F3 (ô chứa tiêu đề, không phải tỉ lệ). Cần giữ cố định ô F2 bằng <b>địa chỉ tuyệt đối $F$2</b>: F4 nhập =E4*$F$2."},
  p24a:{type:"mcq", label:"Câu hỏi tr.24 – câu 1", q:"Trong Hình 5.3, công thức tại ô F5 là =E5*$F$2. Sao chép công thức này đến ô F6, kết quả sao chép là:",
    o:["=E6*F3","=E6*$F$2","=$E$6*F3","=$E$6*$F$2"], a:1,
    k:"E5 là địa chỉ tương đối → đổi thành <b>E6</b>; $F$2 là địa chỉ tuyệt đối → <b>giữ nguyên</b>. Kết quả: <b>=E6*$F$2</b>."},
  p24b:{type:"mcq", label:"Câu hỏi tr.24 – câu 2", q:"Cách nhập kí hiệu $ cho địa chỉ tuyệt đối là:",
    o:["Gõ kí hiệu $ từ bàn phím khi nhập địa chỉ ô.","Sau khi nhập địa chỉ tương đối, nhấn phím F4 để chuyển thành địa chỉ tuyệt đối.","Sau khi nhập địa chỉ tương đối, nhấn phím F2 để chuyển thành địa chỉ tuyệt đối.","Thực hiện được theo cả hai cách A và B."], a:3,
    k:"Có thể <b>gõ $ từ bàn phím</b> hoặc nhập địa chỉ rồi <b>nhấn phím F4</b>. Phím F2 dùng để sửa nội dung ô, không chuyển địa chỉ."},
  th1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành tính Doanh thu và Doanh thu của công ti theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Tại ô F4 nhập =E4*$F$2 rồi sao chép đến F5:F9.",b:"Nhập dữ liệu, định dạng bảng tính như Hình 5.1.",c:"Tại ô E4 nhập =C4*D4 rồi sao chép đến E5:E9.",d:"Tại ô D2 nhập “Tỉ lệ doanh thu của công ti”, tại ô F2 nhập 70%; ô F3 nhập tiêu đề.",e:"Lưu tệp."},
    start:["a","b","c","d","e"], ans:["b","c","d","a","e"],
    k:"Thứ tự: <b>b → c → d → a → e</b>."},
  th2:{type:"mcq", label:"Thực hành – Kết quả", q:"Với Doanh thu của phần mềm Quản lí thời gian là 1 999 950 000 đồng và tỉ lệ 70%, ô F4 hiển thị kết quả nào?",
    o:["1 399 965 000","599 985 000","1 999 950 000","2 857 071 429"], a:0,
    k:"1 999 950 000 × 70% = <b>1 399 965 000</b> (đồng)."},
  cp:{type:"order", label:"Thực hành – Sao chép từ văn bản", q:"Sắp xếp các bước sao chép bảng số liệu (Bảng 5.1) từ phần mềm soạn thảo văn bản sang phần mềm bảng tính (dùng nút ↑ ↓).",
    items:{a:"Trong bảng tính mới, chọn ô ở góc trên cùng bên trái của vùng muốn dán, chọn lệnh Paste.",b:"Trong phần mềm soạn thảo, chọn các hàng, cột của bảng.",c:"Lưu tệp bảng tính với tên Khaosat.xlsx.",d:"Chọn lệnh Copy (hoặc nhấn Ctrl + C).",e:"Đóng tệp văn bản."},
    start:["a","b","c","d","e"], ans:["b","d","a","e","c"],
    k:"Thứ tự: <b>b → d → a → e → c</b>. Chọn bảng → Copy → chọn ô góc trên trái, Paste → đóng tệp văn bản → lưu Khaosat.xlsx."},
  ks:{type:"mcq", label:"Thực hành – Đọc số liệu", q:"Sau khi sao chép Bảng 5.1 sang bảng tính, em dùng hàm SUM để tính tổng số học sinh đã chọn. Kết quả là bao nhiêu?",
    o:["181","191","201","78"], a:1,
    k:"46 + 25 + 78 + 42 = <b>191</b> học sinh. Công thức ví dụ: =SUM(D2:D5)."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Công thức tại ô C1 (Hình 5.6) là =A1*B1. Sao chép công thức trong ô C1 vào ô E2 thì công thức tại ô E2 sau khi sao chép là:",
    o:["=C1*D2","=C2*D1","=C2*D2","=B2*C2"], a:2,
    k:"Từ C1 đến E2: <b>sang phải 2 cột, xuống 1 hàng</b>. A1 → C2, B1 → D2. Kết quả: <b>=C2*D2</b>."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2c", q:"Trong Hình 5.7, cột C là Đơn giá, ô D2 lưu tỉ lệ giảm giá 20%. Công thức nhập tại ô D5 để tính đơn giá đã giảm, sao cho sao chép được xuống D10, là:",
    o:["=C5*D2","=C5*(1-D2)","=C5*(1-$D$2)","=C5-$D$2"], a:2,
    k:"Đơn giá đã giảm = Đơn giá × (1 − tỉ lệ giảm). Ô D2 phải cố định nên dùng <b>=C5*(1-$D$2)</b>. Cũng có thể viết =C5-C5*$D$2."},
  lt3:{type:"open", label:"Luyện tập – câu 2d, e, f", q:"Bổ sung cột Số lượng (E) và Tổng tiền (F). Viết công thức tại ô F5 để tính Tổng tiền = Số lượng × Đơn giá đã giảm, và công thức tại ô F11 tính tổng tiền phải trả cho tất cả các mặt hàng.",
    k:"F5: <b>=E5*D5</b> (sao chép xuống F10). F11: <b>=SUM(F5:F10)</b>. Ở đây không cần địa chỉ tuyệt đối vì mỗi hàng dùng số lượng, đơn giá của chính hàng đó."},
  vd1:{type:"open", label:"Vận dụng", q:"Truy cập một số chợ ứng dụng để tìm thông tin về năm phần mềm ứng dụng mà em quan tâm (đơn giá, số lượt mua,…), tạo bảng tính theo mẫu Hình 5.5. Ghi lại công thức em dùng để tính Doanh thu và Doanh thu của công ti (giả sử công ti nhận được 75% Doanh thu).",
    k:"Ví dụ: nhập 75% vào ô F2; E4: <b>=C4*D4</b> sao chép đến E8; F4: <b>=E4*$F$2</b> sao chép đến F8. Nguồn: Google Play, App Store (ghi rõ ngày tra cứu)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Địa chỉ tương đối</b> tự động thay đổi khi sao chép công thức nhưng vẫn giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Địa chỉ tuyệt đối</b> không thay đổi khi sao chép công thức.</li><li>Địa chỉ tuyệt đối có kí hiệu <b>$</b> trước tên cột và trước tên hàng, ví dụ $F$2.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Dùng địa chỉ tương đối cho dữ liệu thay đổi theo từng hàng; dùng địa chỉ tuyệt đối cho giá trị dùng chung (tỉ lệ, đơn giá chung,…).</li><li>Có thể sao chép bảng dữ liệu từ văn bản, trang trình chiếu sang bảng tính bằng <b>Copy</b> và <b>Paste</b> để tính toán nhanh, hiệu quả.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Bảng tính cần <b>công thức</b> để tính Doanh thu = Đơn giá × Số lượt mua.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Địa chỉ tương đối</p><ul>'
    + "<li>VD: <b>C4</b>, <b>D4</b>. Sao chép công thức → địa chỉ <b>tự thay đổi</b> theo vị trí.</li>"
    + "<li>E4: =C4*D4 → chép xuống E5: =C5*D5.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Địa chỉ tuyệt đối</p><ul>'
    + "<li>VD: <b>$F$2</b> – có <b>$</b> trước tên cột và tên hàng → sao chép <b>không đổi</b>.</li>"
    + "<li>Nhập $: gõ từ bàn phím hoặc nhấn <b>F4</b>.</li>"
    + "<li>F4: =E4*$F$2 → chép xuống F5: =E5*$F$2.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3, 4. Thực hành</p><ul>'
    + "<li>Giá trị dùng chung (tỉ lệ) → <b>địa chỉ tuyệt đối</b>.</li>"
    + "<li>Chép bảng từ Word, PowerPoint: chọn bảng → <b>Copy</b> → chọn ô → <b>Paste</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>C1: =A1*B1 chép sang E2 → <b>=C2*D2</b> (sang 2 cột, xuống 1 hàng).</li>"
    + "<li>Đơn giá đã giảm: <b>=C5*(1-$D$2)</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Doanh thu công ti: <b>=E4*$F$2</b> (F2 = 75%).</li>"
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
    return ["T8B5." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em nhận ra cột Doanh thu còn trống và cần công thức."],
        fix:["Em quan sát cột E: còn thiếu gì?"]},
  hd1a:{ok:["Chính xác! =C4*D4."],
        fix:["Doanh thu = Đơn giá × Số lượt mua. Đơn giá ở cột nào, Số lượt mua ở cột nào?"]},
  hd1b:{ok:["Đúng! Sao chép công thức, địa chỉ thay đổi theo hàng."],
        fix:["Em thử kéo nút điền ở ô E4 xuống và xem công thức ở E5."]},
  p22: {ok:["Nhóm ghép đúng công thức ở các ô."],
        fix:["Chép từ E4 xuống E6 là xuống mấy hàng? Địa chỉ trong công thức tăng mấy hàng?"]},
  hd2a:{ok:["Công thức đúng cho F4 và F5."],
        fix:["Doanh thu của công ti = Doanh thu (cột E) × Tỉ lệ (ô F2)."]},
  hd2b:{ok:["Chính xác! F2 bị đổi thành F3, cần dùng $F$2."],
        fix:["Em thử sao chép rồi xem công thức ở F5: ô F2 có còn đúng không?"]},
  p24a:{ok:["Chính xác! =E6*$F$2."],
        fix:["Địa chỉ nào thay đổi, địa chỉ nào giữ nguyên khi sao chép?"]},
  p24b:{ok:["Chính xác! Cả hai cách A và B."],
        fix:["Phím F2 dùng để làm gì trong bảng tính? Phím F4 thì sao?"]},
  th1: {ok:["Đúng thứ tự các bước thực hành."],
        fix:["Phải có tỉ lệ ở ô F2 trước khi nhập công thức Doanh thu của công ti."]},
  th2: {ok:["Chính xác! 1 399 965 000 đồng."],
        fix:["Em tính 1 999 950 000 × 70%."]},
  cp:  {ok:["Đúng thứ tự các bước sao chép bảng."],
        fix:["Phải chọn bảng và Copy trước, rồi mới sang bảng tính để Paste."]},
  ks:  {ok:["Chính xác! 191 học sinh."],
        fix:["Em cộng lại cột Số lượng HS: 46 + 25 + 78 + 42."]},
  lt1: {ok:["Chính xác! =C2*D2."],
        fix:["Từ C1 sang E2: sang phải mấy cột, xuống mấy hàng? Áp dụng cho A1 và B1."]},
  lt2: {ok:["Chính xác! =C5*(1-$D$2)."],
        fix:["Tỉ lệ giảm ở ô D2 dùng chung cho mọi hàng, cần địa chỉ gì?"]},
  lt3: {ok:["Công thức F5 và F11 đều đúng."],
        fix:["Tổng tiền = Số lượng × Đơn giá đã giảm; tổng cả cột dùng hàm SUM."]},
  vd1: {ok:["Bảng tính đúng, dùng địa chỉ tuyệt đối cho ô tỉ lệ 75%."],
        fix:["Em kiểm tra: công thức Doanh thu của công ti đã dùng $F$2 chưa?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {};
const MATCH_HINT = {
  p22: "Gợi ý: thử trên bảng mô phỏng sao chép công thức ở trên."
};
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
    {title:"Danh sách phần mềm ứng dụng", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Địa chỉ tương đối", acts:[
    {title:"Hoạt động 1: Tính doanh thu phần mềm", tasks:["hd1a","hd1b"], concept:"c1"},
    {title:"Câu hỏi SGK trang 22", tasks:["p22"]},
    {title:"Ghi bài: Địa chỉ tương đối", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Địa chỉ tuyệt đối", acts:[
    {title:"Hoạt động 2: Địa chỉ tuyệt đối", tasks:["hd2a","hd2b"], concept:"c2"},
    {title:"Câu hỏi SGK trang 24", tasks:["p24a","p24b"]},
    {title:"Ghi bài: Địa chỉ tuyệt đối", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Bảng tính giải quyết bài toán thực tế", tasks:["th1","th2"]},
    {title:"Sao chép dữ liệu từ văn bản, trình chiếu", tasks:["cp","ks"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 26", tasks:["lt1","lt2","lt3"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Doanh thu phần mềm trên chợ ứng dụng", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai5", title: "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhập =E4*F2 rồi sao chép xuống, kết quả F5 sai vì…",
  commentPh: "Ví dụ: Nhóm dùng đúng địa chỉ tuyệt đối ; cần kiểm tra lại định dạng số."};
})();
