/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu – Dự án Trường học xanh", q:"Để thực hiện dự án Trường học xanh, cần thu thập và tính toán rất nhiều dữ liệu (vị trí trồng cây, loại cây, công việc,…). Nên sử dụng phần mềm nào trên máy tính để thực hiện những công việc đó? Vì sao?",
    k:"Nên dùng <b>phần mềm bảng tính</b> (Microsoft Excel, Google Sheets, LibreOffice Calc,…): trình bày dữ liệu dạng <b>bảng</b> gọn, dễ so sánh; <b>tính toán</b> tự động; vẽ <b>biểu đồ</b> minh hoạ."},
  hd1:{type:"open", label:"HĐ1 – Giao diện bảng tính", q:"Quan sát giao diện làm việc của một phần mềm bảng tính mà em biết. Nêu tên các vùng chính và chức năng của chúng.",
    k:"Thẻ và nhóm lệnh; <b>hộp địa chỉ</b> (hiện địa chỉ ô hiện thời); <b>vùng nhập dữ liệu</b>; <b>khu vực chính</b> gồm các trang tính (hàng, cột, ô) để lưu trữ và hiển thị dữ liệu; tên các trang tính (Sheet1, Sheet2) ở phía dưới."},
  vung:{type:"sort", label:"Đọc hiểu – Các thành phần giao diện", q:"Đọc mục 1 (SGK trang 28–29) và quan sát Hình 6.1. Mỗi mô tả dưới đây là thành phần nào?",
    cats:["Hộp địa chỉ","Vùng nhập dữ liệu","Ô hiện thời","Trang tính"],
    items:[["Nơi thực hiện trực tiếp việc nhập dữ liệu vào bảng tính.",1],["Hiển thị địa chỉ của ô hiện thời, nằm bên trái vùng nhập dữ liệu.",0],["Ô đang được quan sát, nhập dữ liệu, luôn được đóng khung.",2],["Lưới ô gồm các hàng và cột; tên nằm ở phía dưới cửa sổ (Sheet1, Sheet2).",3]],
    k:"<b>Vùng nhập dữ liệu</b>: nhập dữ liệu. <b>Hộp địa chỉ</b>: hiện địa chỉ ô hiện thời. <b>Ô hiện thời</b>: ô đang làm việc, được đóng khung. <b>Trang tính</b>: lưới ô gồm hàng (1, 2, 3,…) và cột (A, B, C,…)."},
  p29a:{type:"mcq", label:"Câu hỏi tr.29 – câu 1", q:"Vị trí giao của một hàng và một cột được gọi là gì?",
    o:["Ô.","Trang tính.","Hộp địa chỉ.","Bảng tính."], a:0,
    k:"<b>A. Ô</b> (gọi tắt của ô tính)."},
  p29b:{type:"mcq", label:"Câu hỏi tr.29 – câu 2", q:"Phát biểu nào dưới đây đúng?",
    o:["Các hàng của trang tính được đặt tên theo các chữ cái: A, B, C,…","Các hàng của trang tính được đặt tên theo các số: 1, 2, 3,…","Các cột của trang tính được đặt tên theo các số: 1, 2, 3,…","Các hàng và cột trong trang tính không có tên."], a:1,
    k:"<b>B</b>. Hàng đặt tên bằng <b>số</b> 1, 2, 3,… (từ trên xuống); cột đặt tên bằng <b>chữ cái</b> A, B, C,… (từ trái sang phải)."},
  hd2:{type:"mcq", label:"HĐ2 – Địa chỉ ô", q:"Trong Hình 6.2, ô ghi tên học sinh “Bùi Lê Đình Anh” có địa chỉ là gì?",
    o:["6B","B6","B:6","Hàng 6"], a:1,
    k:"<b>B6</b>: tên cột (B) ghép với tên hàng (6). &lt;địa chỉ ô&gt; = &lt;tên cột&gt;&lt;tên hàng&gt;."},
  diachi:{type:"mcq", label:"Đọc hiểu – Địa chỉ vùng", q:"Vùng dữ liệu có ô góc trên bên trái là C5 và ô góc dưới bên phải là E10 có địa chỉ là:",
    o:["C5-E10","C5:E10","E10:C5","C5;E10"], a:1,
    k:"<b>C5:E10</b>. &lt;địa chỉ vùng&gt; = &lt;ô góc trên bên trái&gt; <b>:</b> &lt;ô góc dưới bên phải&gt;."},
  p30a:{type:"mcq", label:"Câu hỏi tr.30 – câu 1", q:"Một ô có thể coi là một vùng được không?",
    o:["Có, vì ô là vùng có góc trên bên trái và góc dưới bên phải trùng nhau (ví dụ B6:B6).","Không, vùng phải có ít nhất hai ô."], a:0,
    k:"<b>Có</b>. Một ô là vùng đặc biệt chỉ gồm 1 ô."},
  p30b:{type:"mcq", label:"Câu hỏi tr.30 – câu 2", q:"Vùng A5:B10 có bao nhiêu ô?",
    o:["2 ô","6 ô","10 ô","12 ô"], a:3,
    k:"<b>12 ô</b>: 2 cột (A, B) × 6 hàng (5, 6, 7, 8, 9, 10). Thử chọn vùng A5:B10 trên bảng mô phỏng để đếm."},
  p30c:{type:"mcq", label:"Câu hỏi tr.30 – câu 3", q:"Có thể chọn một vùng hình tam giác được không?",
    o:["Có.","Không, vùng luôn là hình chữ nhật."], a:1,
    k:"<b>Không</b>. Vùng là nhiều ô liền kề tạo thành <b>hình chữ nhật</b>."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Có thể nhập dữ liệu vào trang tính theo bao nhiêu cách? Hãy nêu cách đó.",
    k:"<b>Hai cách</b>: nháy chuột vào ô rồi gõ trực tiếp từ bàn phím; hoặc nháy chuột vào ô, nháy vào <b>vùng nhập dữ liệu</b> rồi gõ. Nhập xong nhấn <b>Enter</b>."},
  canle:{type:"sort", label:"HĐ3 – Câu 2: Tự động căn chỉnh", q:"Quan sát Hình 6.5 (hoặc thử trên bảng mô phỏng). Khi nhập vào ô, dữ liệu nào tự động căn trái, dữ liệu nào tự động căn phải?",
    cats:["Căn trái","Căn phải"],
    items:[["Nguyễn Việt Hương",0],["9/23/2010",1],["8.5",1],["Hoàn Kiếm",0],["7",1],["Ngày sinh",0]],
    k:"Dữ liệu <b>văn bản</b> tự động <b>căn trái</b>. Dữ liệu <b>số, ngày tháng</b> tự động <b>căn phải</b>. Phần mềm tự nhận biết, phân loại kiểu dữ liệu."},
  font:{type:"sort", label:"Đọc hiểu – Định dạng dữ liệu", q:"Quan sát Hình 6.6. Mỗi lệnh định dạng dưới đây nằm trong nhóm lệnh nào của thẻ Home?",
    cats:["Nhóm Font","Nhóm Alignment"],
    items:[["Phông chữ, cỡ chữ",0],["Chữ đậm, nghiêng, gạch chân",0],["Màu nền ô, màu chữ",0],["Căn trái, giữa, phải",1],["Căn trên, giữa, dưới",1]],
    k:"Nhóm <b>Font</b>: phông, cỡ, kiểu chữ, màu nền ô, màu chữ. Nhóm <b>Alignment</b>: căn dữ liệu theo chiều ngang và chiều dọc."},
  p32:{type:"mcq", label:"Câu hỏi tr.32", q:"Nếu em chọn một vùng rồi nhập dữ liệu thì dữ liệu sẽ được nhập vào ô nào?",
    o:["Tất cả các ô trong vùng.","Ô hiện thời (ô chọn đầu tiên, thường là ô góc trên bên trái).","Ô góc dưới bên phải.","Không nhập được."], a:1,
    k:"<b>Ô hiện thời</b>: khi chọn vùng, ô chọn đầu tiên là ô hiện thời, dữ liệu được nhập vào ô đó."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành nhập thông tin khảo sát dự án Trường học xanh (dùng nút ↑ ↓).",
    items:{a:"Nhập dữ liệu: A1, A2, các cột STT, Địa điểm, Loại cây.",b:"Lưu bảng tính với tên THXanh.xlsx (File/Save hoặc Ctrl+S).",c:"Mở Excel, chọn Blank workbook.",d:"Nháy đúp tên trang tính Sheet1, đổi thành 1. Khảo sát.",e:"Chỉnh độ rộng cột, định dạng tiêu đề, căn giữa cột STT, tô nền hàng 3."},
    start:["a","b","c","d","e"], ans:["c","a","e","d","b"],
    k:"Thứ tự: <b>c → a → e → d → b</b>."},
  nv2:{type:"mcq", label:"Thực hành – Độ rộng cột", q:"Muốn thay đổi độ rộng cột B để nhìn thấy toàn bộ dữ liệu, em làm thế nào?",
    o:["Nháy đúp vào ô B1.","Đưa con trỏ chuột vào vạch giữa tên cột B và C, khi xuất hiện biểu tượng ↔ thì kéo thả chuột.","Chọn lệnh File/Save.","Nhấn phím Delete."], a:1,
    k:"Kéo thả <b>vạch giữa các tên cột</b> (tại hàng ghi tên cột). Đổi chiều cao hàng: kéo vạch giữa các tên hàng."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả thực hành: em đã nhập và định dạng bảng khảo sát như thế nào (tiêu đề, cột STT, hàng 3, tên trang tính)? Em gặp khó khăn gì?",
    k:"Tiêu đề A1: chữ <b>đậm</b>, màu <b>xanh lá</b>, cỡ chữ lớn. Hàng 3: nền <b>vàng</b>, căn giữa. Cột STT: <b>căn giữa</b>. Trang tính đổi tên <b>1. Khảo sát</b>. Lưu tệp <b>THXanh.xlsx</b>."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Muốn xoá nhanh dữ liệu trong một vùng thì em làm thế nào?",
    k:"<b>Chọn vùng</b> đó rồi nhấn phím <b>Delete</b>."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Có bao nhiêu cách nhập dữ liệu vào trang tính? Em hãy mô tả các cách đó.",
    k:"<b>Hai cách</b>: (1) nháy vào ô, gõ trực tiếp; (2) nháy vào ô, nháy vào vùng nhập dữ liệu rồi gõ. Nhập xong nhấn Enter."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Vì sao khi nhập 12/15/2020 thì phần mềm tự động căn phải, nhưng nếu nhập 15/12/2020 thì phần mềm tự động căn trái? (Thử trên bảng mô phỏng.)",
    k:"Phần mềm đang dùng định dạng ngày kiểu Mĩ <b>tháng/ngày/năm</b>. 12/15/2020 là ngày hợp lệ (tháng 12, ngày 15) → kiểu <b>ngày tháng</b> → căn phải. 15/12/2020 có “tháng 15” không hợp lệ → phần mềm coi là <b>văn bản</b> → căn trái."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Tìm một số loại cây có thể mua và trồng cho dự án Trường học xanh. Tạo bảng tính và đặt tên là Danh sách các loại cây, gồm ba cột STT, Loại cây (Cây hoa, Cây ăn quả, Cây bóng mát) và Tên cây. Nhập dữ liệu, chỉnh sửa và định dạng. Mô tả bảng của em.",
    k:"Ví dụ: 1 – Cây hoa – Hoa giấy; 2 – Cây bóng mát – Bàng; 3 – Cây ăn quả – Ổi;… Tiêu đề đậm, hàng tiêu đề cột tô nền, cột STT căn giữa, độ rộng cột vừa dữ liệu."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Phần mềm bảng tính giúp <b>lưu lại và trình bày</b> thông tin dưới dạng bảng, thực hiện các <b>tính toán</b> (từ đơn giản đến phức tạp) cũng như xây dựng các <b>biểu đồ</b> biểu diễn một cách trực quan các số liệu trong bảng.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>&lt;địa chỉ ô&gt; = &lt;tên cột&gt;&lt;tên hàng&gt;. Ví dụ: <b>B6</b>.</li><li>Nhiều ô liền kề tạo thành hình chữ nhật trên trang tính gọi là <b>vùng</b>.</li><li>&lt;địa chỉ vùng&gt; = &lt;địa chỉ ô góc trên bên trái&gt; <b>:</b> &lt;địa chỉ ô góc dưới bên phải&gt;. Ví dụ: <b>B4:E11</b>.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Nhập dữ liệu: nháy vào ô (hoặc vùng nhập dữ liệu), gõ, nhấn <b>Enter</b>. Sửa: nháy đúp vào ô, hoặc sửa ở vùng nhập dữ liệu.</li><li>Văn bản tự động <b>căn trái</b>; số, ngày tháng tự động <b>căn phải</b>.</li><li>Định dạng: chọn vùng → nhóm lệnh <b>Font</b>, <b>Alignment</b> của thẻ Home.</li></ul>"},
  c4:{t:"Ghi nhớ", b:"<ul><li>Đổi độ rộng cột: kéo <b>vạch giữa các tên cột</b>. Đổi tên trang tính: <b>nháy đúp</b> vào tên trang tính.</li><li>Lưu: <b>File/Save</b> hoặc <b>Ctrl+S</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Thu thập, tính toán nhiều dữ liệu → dùng <b>phần mềm bảng tính</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Giao diện phần mềm bảng tính</p><ul>'
    + "<li>Bảng tính: <b>trình bày bảng, tính toán, vẽ biểu đồ</b>. VD: Excel, Google Sheets.</li>"
    + "<li>Hàng: <b>1, 2, 3…</b>; cột: <b>A, B, C…</b>; giao hàng và cột = <b>ô</b>.</li>"
    + "<li><b>Hộp địa chỉ</b> hiện địa chỉ ô hiện thời; nhập ở <b>vùng nhập dữ liệu</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Ô và vùng</p><ul>'
    + "<li>Địa chỉ ô = <b>tên cột + tên hàng</b>. VD: B6.</li>"
    + "<li>Vùng = ô <b>góc trên trái : góc dưới phải</b>. VD: B4:E11.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Nhập, sửa, định dạng dữ liệu</p><ul>'
    + "<li>Nhập: chọn ô → gõ → <b>Enter</b>. Sửa: <b>nháy đúp</b> vào ô.</li>"
    + "<li>Văn bản <b>căn trái</b>; số, ngày tháng <b>căn phải</b>.</li>"
    + "<li>Định dạng: chọn vùng → <b>Font</b>, <b>Alignment</b> (thẻ Home).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Độ rộng cột: kéo <b>vạch giữa tên cột</b>. Đổi tên trang: <b>nháy đúp</b>.</li>"
    + "<li>Lưu: <b>Ctrl+S</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Xoá nhanh: <b>chọn vùng → Delete</b>.</li>"
    + "</ul>"},
  g7:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Ngày kiểu <b>tháng/ngày/năm</b>: 15/12/2020 sai → thành <b>văn bản</b>, căn trái.</li>"
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
    return ["T7B6." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Chính xác! Phần mềm bảng tính."],
        fix:["Phần mềm nào trình bày dữ liệu dạng bảng và tính toán được?"]},
  hd1: {ok:["Nêu đủ các vùng chính và chức năng."],
        fix:["Em quan sát lại Hình 6.1: hộp địa chỉ, vùng nhập dữ liệu, trang tính."]},
  vung:{ok:["Nhận ra đúng các thành phần giao diện."],
        fix:["Đối chiếu từng chú thích trong Hình 6.1."]},
  p29a:{ok:["Chính xác! Ô."],
        fix:["Giao của hàng và cột tạo ra cái gì?"]},
  p29b:{ok:["Chính xác! Hàng đặt tên bằng số."],
        fix:["Nhìn Hình 6.1: bên trái ghi 1, 2, 3 là tên hàng hay cột?"]},
  hd2: {ok:["Chính xác! B6."],
        fix:["Địa chỉ ô: tên cột viết trước, tên hàng viết sau."]},
  diachi:{ok:["Chính xác! Dùng dấu hai chấm."],
        fix:["Địa chỉ vùng dùng dấu gì để ngăn cách?"]},
  p30a:{ok:["Đúng! Một ô cũng là một vùng."],
        fix:["Góc trên trái và góc dưới phải có thể trùng nhau không?"]},
  p30b:{ok:["Chính xác! 2 × 6 = 12 ô."],
        fix:["Đếm số cột (A, B) và số hàng (5 đến 10) rồi nhân lên."]},
  p30c:{ok:["Đúng! Vùng luôn là hình chữ nhật."],
        fix:["Vùng là các ô liền kề tạo thành hình gì?"]},
  hd3a:{ok:["Đủ hai cách nhập."],
        fix:["Ngoài gõ trực tiếp vào ô, còn nhập ở đâu?"]},
  canle:{ok:["Nhận ra đúng quy tắc căn chỉnh."],
        fix:["Văn bản căn bên nào? Số, ngày tháng căn bên nào?"]},
  font:{ok:["Phân loại đúng hai nhóm lệnh."],
        fix:["Các lệnh căn chỉnh thuộc nhóm Alignment."]},
  p32: {ok:["Chính xác! Ô hiện thời."],
        fix:["Khi chọn vùng, ô nào được đóng khung trắng?"]},
  nv1: {ok:["Đúng thứ tự các bước."],
        fix:["Phải nhập dữ liệu trước rồi mới định dạng, cuối cùng là lưu."]},
  nv2: {ok:["Chính xác!"],
        fix:["Độ rộng cột chỉnh ở hàng ghi tên cột."]},
  nvkq:{ok:["Bảng đúng mẫu Hình 6.8."],
        fix:["Em kiểm tra: tiêu đề đã đậm, xanh lá chưa? Hàng 3 đã tô vàng chưa?"]},
  lt1: {ok:["Chính xác! Chọn vùng, nhấn Delete."],
        fix:["Phím nào dùng để xoá?"]},
  lt2: {ok:["Mô tả đủ hai cách."],
        fix:["Nhắc lại hai cách nhập ở mục 2a."]},
  vd1: {ok:["Giải thích đúng: tháng/ngày/năm."],
        fix:["Có tháng 15 không? Phần mềm sẽ hiểu đó là kiểu dữ liệu gì?"]},
  vd2: {ok:["Bảng đẹp, đúng yêu cầu."],
        fix:["Em bổ sung định dạng cho hàng tiêu đề và cột STT."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  vung: "Đối chiếu chú thích Hình 6.1.",
  canle: "Thử nhập vào bảng mô phỏng để xem căn bên nào.",
  font: "Xem lại Hình 6.6."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Dự án Trường học xanh", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Giao diện bảng tính", acts:[
    {title:"Hoạt động 1: Làm quen với giao diện", tasks:["hd1"]},
    {title:"Đọc hiểu: Các thành phần giao diện", tasks:["vung"], concept:"c1"},
    {title:"Câu hỏi SGK trang 29", tasks:["p29a","p29b"]},
    {title:"Ghi bài: Giao diện", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Ô và vùng", acts:[
    {title:"Hoạt động 2: Ô và vùng trên trang tính", tasks:["hd2","diachi"], concept:"c2"},
    {title:"Câu hỏi SGK trang 30", tasks:["p30a","p30b","p30c"]},
    {title:"Ghi bài: Ô và vùng", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Nhập, sửa, định dạng", acts:[
    {title:"Hoạt động 3: Nhập, chỉnh sửa dữ liệu", tasks:["hd3a","canle"]},
    {title:"Đọc hiểu: Định dạng dữ liệu", tasks:["font","p32"], concept:"c3"},
    {title:"Ghi bài: Nhập, sửa, định dạng", tasks:[], concept:"g4", ghi:true}]},
  {id:"phan-4", code:"2.4", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhập thông tin khảo sát Trường học xanh", tasks:["nv1","nv2","nvkq"], concept:"c4"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g5", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Ngày tháng và bảng danh sách cây", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g7", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai6", title: "Bài 6. Làm quen với phần mềm bảng tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 viết địa chỉ ô là 6B vì…",
  commentPh: "Ví dụ: Nhóm nhập đúng dữ liệu; cần căn giữa cột STT."};
})();

/* Hình vẽ lại (nét hơn ảnh chụp SGK) — chung/hinh-ve.js */
window.HINH_VE = {
  h61: {loai:"bang", cols:8, rows:11, widths:{B:150,C:40,D:80,E:80,F:60,G:60,H:40}, cell:"B6", tabs:["Sheet1","Sheet2"],
  alt:"Giao diện Excel: ô hiện thời B6, hộp địa chỉ, vùng nhập dữ liệu, hàng tên cột, cột tên hàng, các trang tính, khu vực hiển thị dữ liệu",
  data:{D2:"BẢNG ĐIỂM LỚP 7A", D3:"NĂM HỌC: 2020-2021", B5:"Họ tên học sinh", D5:"Ngữ văn", E5:"Ngoại ngữ", F5:"Toán",
    B6:"Bùi Lê Đình Anh", D6:7, E6:9, F6:9, B7:"Nguyễn Thị Bình", D7:8, E7:7, F7:9, B8:"Nguyễn Đức Hà", D8:6, E8:7, F8:8,
    B9:"Trần Thế Hải", D9:9, E9:8, F9:7, B10:"Nguyễn Thị Hiền", D10:8, E10:6, F10:8},
  fmt:{D2:{b:1}, D3:{b:1}},
  marks:[{n:1,at:"B6",t:"<b>Ô hiện thời</b> (ô đang chọn)"},{n:2,at:"namebox",t:"<b>Hộp địa chỉ</b>: tên ô hiện thời"},
    {n:3,at:"fx",t:"<b>Vùng nhập dữ liệu</b> (thanh công thức)"},{n:4,at:"cols",t:"<b>Hàng ghi tên các cột</b>: A, B, C,…"},
    {n:5,at:"rows",t:"<b>Cột ghi tên các hàng</b>: 1, 2, 3,…"},{n:6,at:"tabs",t:"<b>Các trang tính</b> có tên Sheet1, Sheet2"},
    {n:7,at:"grid",t:"<b>Khu vực hiển thị dữ liệu</b>"}]}
};
