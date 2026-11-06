/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Máy tính thông dụng hiện nay chỉ làm việc với hai kí hiệu 0 và 1. Theo em, làm thế nào để máy tính “hiểu” được những con số, chữ cái, hình ảnh mà con người đưa vào?",
    k:"Mọi thông tin phải được <b>mã hoá</b> (chuyển đổi) thành những dãy chỉ gồm hai kí hiệu <b>0 và 1</b> thì máy tính mới xử lí được."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Theo cách mã hoá ở Hình 1.3, số 4 được mã hoá thành dãy nào?",
    o:["100","001","011","110"], a:0, k:"Phải → trái → trái → <b>100</b>."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Mã hoá số 3 và số 6 theo cách trên. Kết quả là gì? Hai dãy có giống nhau không?",
    o:["3 → 011; 6 → 110. Hai dãy khác nhau.","3 → 110; 6 → 011. Hai dãy khác nhau.","3 → 011; 6 → 011. Hai dãy giống nhau.","3 → 100; 6 → 110. Hai dãy khác nhau."], a:0,
    k:"Số 3: trái, phải, phải → <b>011</b>. Số 6: phải, phải, trái → <b>110</b>. Hai dãy <b>khác nhau</b> → mỗi số có một mã riêng."},
  vb:{type:"mcq", label:"Đọc hiểu – Biểu diễn văn bản", q:"Theo Bảng 1.2, dãy bit 01000010 01000001 01000100 biểu diễn từ nào?",
    o:["CAFE","BAD","DAB","FED"], a:1, k:"01000010 = B, 01000001 = A, 01000100 = D → <b>BAD</b>."},
  ha:{type:"mcq", label:"Đọc hiểu – Biểu diễn hình ảnh", q:"Trong cách biểu diễn hình ảnh đen trắng ở Hình 1.4, mỗi ô vuông (pixel) màu đen được kí hiệu là gì?",
    o:["0","1","2","A"], a:1, k:"Màu đen kí hiệu là <b>1</b>, màu trắng là <b>0</b>. Mỗi dòng 8 ô → một dãy 8 bit."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Vẽ hình trái tim vào lưới 8 × 8 ở trên. Viết dãy bit của từng dòng (từ trên xuống).",
    k:"Mỗi dòng 8 ô: ô tô màu → 1, ô trắng → 0. Ví dụ một dòng: 01100110."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Chuyển cả hình vẽ thành dãy bit bằng cách nối các dãy bit của các dòng lại với nhau (từ trên xuống dưới).",
    k:"Nối 8 dãy 8 bit → một dãy <b>64 bit</b>. Hình vẽ đã được biểu diễn hoàn toàn bằng 0 và 1."},
  p14a:{type:"mcq", label:"Câu hỏi tr.14 – Câu 1", q:"Dãy bit là gì?",
    o:["Là dãy những kí hiệu 0 và 1.","Là âm thanh phát ra từ máy tính.","Là một dãy chỉ gồm chữ số 2.","Là dãy những chữ số từ 0 đến 9."], a:0, k:"<b>A</b>. Dãy bit là dãy những kí hiệu 0 và 1."},
  p14b:{type:"mcq", label:"Câu hỏi tr.14 – Câu 2", q:"Máy tính sử dụng dãy bit để làm gì?",
    o:["Biểu diễn các số.","Biểu diễn văn bản.","Biểu diễn hình ảnh, âm thanh.","Biểu diễn số, văn bản, hình ảnh, âm thanh."], a:3, k:"<b>D</b>. Mọi dạng thông tin trong máy tính đều được biểu diễn bằng dãy bit."},
  dv:{type:"order", label:"Đọc hiểu – Đơn vị đo", q:"Sắp xếp các đơn vị đo dung lượng thông tin từ nhỏ đến lớn (dùng nút ↑ ↓).",
    items:{a:"Byte (B)",b:"Kilobyte (KB)",c:"Megabyte (MB)",d:"Gigabyte (GB)",e:"Terabyte (TB)"}, start:["d","a","e","c","b"], ans:["a","b","c","d","e"],
    k:"Byte → KB → MB → GB → TB. Mỗi đơn vị bằng <b>1024</b> lần đơn vị liền trước; 1 byte = 8 bit."},
  p15a:{type:"open", label:"Câu hỏi tr.15 – Câu 1", q:"Quan sát hình các ổ đĩa ở trên và cho biết thông tin về dung lượng của từng ổ đĩa.",
    k:"C: dung lượng 109 GB, còn trống 37,9 GB. E: 111 GB, trống 48,2 GB. F: 169 GB, trống 153 GB. G (DATA2): 186 GB, trống 27,2 GB."},
  p15b:{type:"mcq", label:"Câu hỏi tr.15 – Câu 2", q:"Quan sát danh sách tệp ảnh ở trên. Tệp nào có dung lượng lớn nhất?",
    o:["IMG_0013.jpg","IMG_0024.jpg","IMG_0039.jpg","IMG_0046.jpg"], a:2,
    k:"IMG_0039.jpg (1 108 KB ≈ 1,08 MB). Các tệp còn lại: 372 KB, 408 KB, 482 KB, 512 KB, 1 095 KB, 846 KB, 488 KB."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Một GB xấp xỉ bao nhiêu byte?",
    o:["Một nghìn byte.","Một triệu byte.","Một tỉ byte.","Một nghìn tỉ byte."], a:2, k:"<b>C</b>. 1 GB ≈ 1 tỉ byte."},
  lt2:{type:"mcq", label:"Luyện tập – Câu 2", q:"Một bức ảnh chụp bằng máy ảnh chuyên nghiệp có dung lượng khoảng 12 MB. Một thẻ nhớ 16 GB có thể chứa khoảng bao nhiêu bức ảnh như vậy?",
    o:["Khoảng 1 365 bức ảnh","Khoảng 136 bức ảnh","Khoảng 13 bức ảnh","Khoảng 13 650 bức ảnh"], a:0,
    k:"16 GB = 16 × 1024 MB = 16 384 MB. 16 384 : 12 ≈ <b>1 365</b> bức ảnh (ước lượng nhanh: 16 000 : 12 ≈ 1 333)."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy kiểm tra và ghi lại dung lượng các ổ đĩa của máy tính mà em đang sử dụng.",
    k:"Mở File Explorer → This PC: ghi tên ổ, dung lượng, dung lượng còn trống (ví dụ: C: 237 GB, trống 120 GB)."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Thực hiện tương tự Hoạt động 1 với dãy các số từ 0 đến 15, mã hoá các số từ 8 đến 15 và đưa ra nhận xét.",
    k:"8 → 1000, 9 → 1001, 10 → 1010, 11 → 1011, 12 → 1100, 13 → 1101, 14 → 1110, 15 → 1111. Nhận xét: cần <b>4 bit</b> (thu gọn 4 lần); các số 8–15 đều bắt đầu bằng 1 (nằm ở nửa phải)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Thông tin được biểu diễn trong máy tính bằng dãy các bit. Mỗi bit là một kí hiệu 0 hoặc 1, hay còn được gọi là chữ số nhị phân.</li><li>Bit là đơn vị đo nhỏ nhất trong lưu trữ thông tin.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Byte (B) là dãy 8 bit liên tục. 1 KB = 1024 B; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB.</li><li>Ổ đĩa cứng hiện nay có dung lượng từ vài trăm GB đến vài TB; thẻ nhớ có thể lưu trữ được hàng trăm GB hoặc cao hơn; đĩa CD khoảng 700 MB; đĩa DVD từ 4,7 GB đến 17 GB.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Máy tính chỉ làm việc với <b>hai kí hiệu 0 và 1</b>.</li></ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Biểu diễn thông tin trong máy tính</p><ul>'
    + "<li>Số, văn bản, hình ảnh, âm thanh → <b>dãy bit</b> (0 và 1).</li>"
    + "<li><b>Bit</b>: đơn vị <b>nhỏ nhất</b> lưu trữ thông tin.</li></ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Đơn vị đo thông tin</p><ul>'
    + "<li><b>1 byte = 8 bit</b>.</li>"
    + "<li>B → <b>KB → MB → GB → TB</b>: mỗi đơn vị = <b>1024</b> đơn vị liền trước.</li></ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>1 GB ≈ <b>1 tỉ byte</b>. Thẻ 16 GB ≈ <b>1 365</b> ảnh 12 MB.</li></ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Số từ 0 đến 15 cần <b>4 bit</b>. VD: 8 → 1000, 15 → 1111.</li></ul>"}
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
    return ["T6B3." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1:{ok:["Ý kiến hay."], fix:["Máy tính chỉ hiểu 0 và 1, vậy phải làm gì?"]},
  hd1a:{ok:["Chính xác!"], fix:["Làm lại từng lần thu gọn với công cụ."]},
  hd1b:{ok:["Chính xác!"], fix:["Số 3 ở nửa trái hay phải lần đầu?"]},
  vb:{ok:["Chính xác!"], fix:["Tra từng nhóm 8 bit trong Bảng 1.2."]},
  ha:{ok:["Chính xác!"], fix:["Xem lại Hình 1.4."]},
  hd2a:{ok:["Đúng từng dòng."], fix:["Ô tô màu là 1, ô trắng là 0."]},
  hd2b:{ok:["Nối đúng thứ tự."], fix:["Nối từ dòng trên xuống dòng dưới."]},
  p14a:{ok:["Chính xác!"], fix:["Bit chỉ gồm hai kí hiệu nào?"]},
  p14b:{ok:["Chính xác!"], fix:["Đọc lại phần ghi nhớ."]},
  dv:{ok:["Đúng thứ tự."], fix:["Xem lại Bảng 1.3."]},
  p15a:{ok:["Đọc đúng thông tin."], fix:["Nêu cả dung lượng và dung lượng trống."]},
  p15b:{ok:["Chính xác!"], fix:["So sánh các số ở cột Size."]},
  lt1:{ok:["Chính xác!"], fix:["Giga nghĩa là tỉ."]},
  lt2:{ok:["Tính đúng."], fix:["Đổi 16 GB ra MB rồi chia cho 12."]},
  vd1:{ok:["Ghi đầy đủ."], fix:["Mở This PC để xem dung lượng."]},
  vd2:{ok:["Mã hoá đúng, nhận xét hay."], fix:["Dùng công cụ mã hoá với dãy 0–15."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
const SORT_HINT = {};

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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Máy tính hiểu thông tin thế nào?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Biểu diễn thông tin trong máy tính", acts:[
    {title:"Hoạt động 1: Mã hoá", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Biểu diễn số, văn bản, hình ảnh, âm thanh", tasks:["vb","ha"]},
    {title:"Hoạt động 2: Viết dãy bit", tasks:["hd2a","hd2b"], concept:"c1"},
    {title:"Câu hỏi SGK trang 14", tasks:["p14a","p14b"]},
    {title:"Ghi bài: Biểu diễn thông tin", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Đơn vị đo thông tin", acts:[
    {title:"Đọc hiểu: Đơn vị đo dung lượng", tasks:["dv"], concept:"c2"},
    {title:"Câu hỏi SGK trang 15", tasks:["p15a","p15b"]},
    {title:"Ghi bài: Đơn vị đo thông tin", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Đổi đơn vị, ước lượng", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Ổ đĩa và mã hoá số 0–15", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin6-bai3", title: "Bài 3. Thông tin trong máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 mã hoá đúng số 3 và số 6, vẽ được hình trái tim…",
  commentPh: "Ví dụ: Nhóm đổi đơn vị đúng; cần nhớ 1 KB = 1024 byte."};
})();
