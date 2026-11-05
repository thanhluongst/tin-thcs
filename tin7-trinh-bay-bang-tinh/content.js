/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Quan sát một phần bảng tính của dự án Trường học xanh trong Hình 9.1, em có nhận xét gì? Có cần chỉnh sửa, định dạng hay trình bày dữ liệu cho đẹp hơn không?",
    k:"Cột Trung bình có số chữ số thập phân không đều (11.66666667), khó đọc; cột Chi phí là số tiền nhưng không có dấu phân tách hàng nghìn; cột Loại cây chỉ ghi ở một ô. <b>Cần định dạng, trình bày</b> lại cho dễ đọc, dễ so sánh."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Cột dữ liệu Trung bình cần điều chỉnh gì để hiển thị dễ đọc, dễ so sánh hơn?",
    k:"Cho hiển thị <b>cùng một số chữ số thập phân</b> (ví dụ 1 hoặc 2 chữ số), ví dụ 11.67 thay cho 11.66666667."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Dữ liệu tại cột Chi phí nên trình bày lại như thế nào để phù hợp với dữ liệu là số tiền?",
    k:"Dùng <b>dấu phân tách hàng nghìn, hàng triệu</b> (ví dụ 1,400,000), không cần phần thập phân hoặc để 2 chữ số thập phân thống nhất."},
  so:{type:"mcq", label:"Đọc hiểu – Định dạng số", q:"Để ô hiển thị số 1400000 thành 1,400,000.00, em thực hiện:",
    o:["Gõ lại số có dấu phẩy vào ô.","Chọn ô, Home → mũi tên cạnh nhóm Number → Format Cells: Number, Decimal places = 2, chọn Use 1000 Separator → OK.","Chọn ô, nhấn Delete.","Home → Merge & Center."], a:1,
    k:"<b>B</b>. Mở cửa sổ <b>Format Cells</b> (mũi tên cạnh nhóm lệnh Number của thẻ Home), chọn <b>Number</b>, đặt số chữ số thập phân, đánh dấu <b>Use 1000 Separator (,)</b>."},
  pct:{type:"mcq", label:"Đọc hiểu – Phần trăm", q:"Ô E4 có giá trị 0.982142857 (= 55/56). Sau khi định dạng kiểu Percentage với 2 chữ số thập phân, ô E4 hiển thị:",
    o:["0.98","98.21%","0.98%","9821%"], a:1,
    k:"<b>98.21%</b>. Kiểu Percentage nhân giá trị với 100 và thêm dấu %; dữ liệu trong ô vẫn là 0.982142857."},
  ngay:{type:"mcq", label:"Đọc hiểu – Ngày tháng", q:"Phần mềm nhập ngày theo khuôn dạng mm/dd/yyyy. Nếu muốn nhập ngày 15 tháng 3 năm 2021 rồi hiển thị theo kiểu Việt Nam (dd/mm/yyyy), em:",
    o:["Gõ 15/3/2021 là xong.","Gõ 3/15/2021, rồi Format Cells → Date → Locale Vietnamese, chọn kiểu ngày/tháng/năm → OK.","Gõ 2021/15/3.","Gõ “ngày 15 tháng 3”."], a:1,
    k:"<b>B</b>. Việc nhập vẫn theo thứ tự mặc định của phần mềm (tháng/ngày/năm); Format Cells chỉ thay đổi <b>cách hiển thị</b>. Gõ 15/3/2021 sẽ bị coi là văn bản (căn trái)."},
  phep:{type:"mcq", label:"Đọc hiểu – Cộng, trừ ngày", q:"Ô A3 là ngày 15/3/2021, ô B3 là ngày 31/3/2021 (kiểu Việt Nam). Công thức =B3-A3 cho kết quả:",
    o:["16","31/3/2021","#VALUE!","46"], a:0,
    k:"<b>16</b> (ngày). Ngày tháng cộng được với số nguyên (mỗi số là một ngày): 3/1/2020 + 30 = 2/2/2020; hai ngày trừ nhau ra số ngày."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Theo em việc định dạng dữ liệu và trình bày bảng tính có khác nhau không?",
    k:"Khác nhau: <b>định dạng dữ liệu</b> là thay đổi cách hiển thị giá trị trong ô (số thập phân, phần trăm, ngày tháng, phông, màu); <b>trình bày bảng tính</b> là sắp xếp bố cục bảng: chèn, xoá, ẩn, hiện hàng cột, gộp ô,…"},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Các lệnh trình bày bảng tính hay định dạng dữ liệu có làm thay đổi dữ liệu trên bảng tính không?",
    k:"Định dạng <b>không</b> làm thay đổi dữ liệu, chỉ đổi cách hiển thị. Lệnh ẩn hàng, cột không xoá dữ liệu. Nhưng <b>xoá</b> hàng, cột làm mất dữ liệu; <b>gộp ô</b> chỉ giữ dữ liệu ô đầu tiên bên trái, dữ liệu các ô khác bị xoá."},
  lenh:{type:"sort", label:"Đọc hiểu – Lệnh trình bày", q:"Đọc mục 2 (SGK trang 48). Mỗi việc dưới đây dùng lệnh nào?",
    cats:["Insert","Delete","Hide","Unhide","Merge & Center"],
    items:[["Thêm một cột Đơn giá vào bên trái cột 7A",0],["Bỏ hẳn hàng chứa loại cây không trồng nữa",1],["Tạm che các cột 7A–7H cho bảng gọn khi trình chiếu",2],["Cho hiển thị lại các cột đã che",3],["Ghi chữ “Cây hoa” ở giữa vùng B4:B8",4]],
    k:"<b>Insert</b> chèn (hàng mới ở trên, cột mới bên trái); <b>Delete</b> xoá; <b>Hide</b> ẩn; <b>Unhide</b> hiện lại (chọn các hàng, cột xung quanh vị trí bị ẩn); <b>Merge &amp; Center</b> gộp ô và căn giữa (Home → Alignment)."},
  gop:{type:"mcq", label:"Đọc hiểu – Gộp ô", q:"Ô A2 chứa 120, ô B2, A3, B3 chứa dữ liệu khác. Sau khi gộp vùng A2:B3 thì:",
    o:["Ô gộp có địa chỉ B3, giữ dữ liệu của cả 4 ô.","Ô gộp có địa chỉ A2, chỉ giữ 120; dữ liệu các ô khác bị xoá.","Ô gộp không có địa chỉ.","Dữ liệu 4 ô được cộng lại."], a:1,
    k:"<b>B</b>. Ô kết quả có địa chỉ là <b>ô đầu tiên bên trái</b> của vùng (A2) và lưu kết quả của ô này; dữ liệu trong các ô khác bị xoá."},
  hd3:{type:"open", label:"HĐ3 – Tính chất của hàm", q:"Bảng Hình 9.12 có ô ghi số, “Không”, “Đang làm”, “???” hoặc để trống. Cột J tính Tổng số cây theo từng loại, hàng 9 đếm số loại cây đã trồng của mỗi lớp. Các kết quả của bảng dữ liệu này có luôn đúng hay không? Vì sao?",
    k:"<b>Luôn đúng</b>, vì các hàm SUM, AVERAGE, COUNT, MIN, MAX chỉ tính trên các ô chứa <b>dữ liệu số</b>, <b>bỏ qua</b> các ô chứa văn bản hoặc ô trống. Khi lớp nhập số liệu thật thay cho “???”, “Đang làm” thì kết quả tự cập nhật."},
  p49:{type:"sort", label:"Câu hỏi tr.49", q:"Trong bảng dữ liệu của Hình 9.12 các hàm sau sẽ cho kết quả bao nhiêu? (Nhập thử vào bảng mô phỏng.)",
    cats:["3","15","20","190"],
    items:[["a) =COUNT(C6:I6)",0],["b) =AVERAGE(C7:I7)",1],["c) =MAX(C4:I8)",2],["d) =SUM(C4:I8)",3]],
    k:"a) <b>3</b> (16, 12, 10); b) <b>15</b> = (20 + 12 + 13) : 3; c) <b>20</b>; d) <b>190</b> = 49 + 35 + 38 + 45 + 23."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành (dùng nút ↑ ↓).",
    items:{a:"Chèn cột D, đặt tiêu đề Đơn giá, sao chép đơn giá từ trang tính 3.",b:"Tạo trang tính 5. Tổng kết, sao chép dữ liệu trang tính 4, sửa tên bảng ở A2.",c:"Định dạng trang tính và lưu kết quả.",d:"Tạo cột Chi phí (N), nhập công thức Chi phí = Đơn giá × Tổng số cây, tính tổng chi phí."},
    start:["a","b","c","d"], ans:["b","a","d","c"],
    k:"Thứ tự: <b>b → a → d → c</b>."},
  nv2:{type:"mcq", label:"Thực hành – Công thức Chi phí", q:"Sau khi chèn cột D (Đơn giá), cột Tổng số cây chuyển sang cột L. Công thức tính Chi phí của Hoa Mười giờ tại ô N4 là:",
    o:["=D4*K4","=D4*L4","=D4+L4","=SUM(D4:L4)"], a:1,
    k:"<b>=D4*L4</b> (Đơn giá × Tổng số cây), rồi sao chép xuống các hàng cây khác."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: chi phí cây hoa, cây ăn quả, cây bóng mát và tổng chi phí toàn bộ dự án là bao nhiêu? Em đã định dạng cột Chi phí như thế nào?",
    k:"Cây hoa <b>9,371,000</b>; cây ăn quả <b>10,359,000</b>; cây bóng mát <b>10,962,200</b>; tổng <b>30,692,200</b> đồng. Cột Chi phí định dạng Number, có dấu phân tách hàng nghìn (có thể 0 hoặc 2 chữ số thập phân)."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Có thể sao chép công thức từ trang tính này sang trang tính khác được không?",
    k:"<b>Có.</b> Chọn ô chứa công thức, Ctrl+C, chuyển sang trang tính khác, chọn ô đích, Ctrl+V. Địa chỉ trong công thức được điều chỉnh tương đối và tham chiếu tới các ô trên trang tính mới."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Phần mềm bảng tính điện tử có thể gộp các ô trong một vùng không là hình chữ nhật không?",
    o:["Có.","Không, vùng được gộp luôn là hình chữ nhật."], a:1,
    k:"<b>Không.</b> Vùng dữ liệu luôn là hình chữ nhật nên ô gộp cũng là hình chữ nhật."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Quan sát Bảng 5. Dự kiến phân bổ cây dự án Trường học xanh ở Hình 9.13 và trả lời: a) Tổng số cây của toàn bộ khối 7 sẽ trồng là bao nhiêu? b) Trung bình mỗi lớp sẽ trồng bao nhiêu cây?",
    k:"a) <b>623</b> cây (ô L25 sau khi chèn cột). b) <b>89</b> cây (ô M25, hoặc =AVERAGE(E25:K25))."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Giả sử chỉ tiêu trồng mỗi loại cây hoa là 50. Dựa trên Bảng 5, hãy tính tỉ lệ phần trăm của từng loại cây hoa được phân bổ so với chỉ tiêu đã giao. Ghi công thức và kết quả.",
    k:"Tỉ lệ = Tổng số cây / 50, định dạng <b>Percentage</b>: Mười giờ 56/50 = <b>112%</b>; Dạ yến thảo 35/50 = <b>70%</b>; Dừa cạn 63/50 = <b>126%</b>; Cúc vàng 75/50 = <b>150%</b>; Hồng 58/50 = <b>116%</b>. Ví dụ ô O4: =L4/50."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Có thể định dạng dữ liệu số theo các kiểu khác nhau như xác định <b>số chữ số thập phân</b>, <b>phân tách hàng nghìn</b>, hàng triệu,…</li><li>Có thể định dạng số theo kiểu <b>phần trăm</b> và định dạng dữ liệu <b>ngày tháng của Việt Nam</b> (dd/mm/yyyy).</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Chèn: <b>Insert</b> (hàng mới ở trên, cột mới bên trái); xoá: <b>Delete</b>; ẩn: <b>Hide</b>; hiện lại: <b>Unhide</b>.</li><li>Gộp ô: <b>Home → Alignment → Merge &amp; Center</b>. Ô gộp có địa chỉ là ô đầu tiên bên trái; dữ liệu các ô khác bị xoá.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Các hàm SUM, AVERAGE, COUNT, MIN, MAX chỉ tính toán trên các ô chứa <b>dữ liệu số</b> và <b>bỏ qua</b> các ô chứa văn bản hoặc ô trống.</li></ul>"},
  c4:{t:"Ghi nhớ", b:"<ul><li>Chi phí = Đơn giá × Tổng số cây: <b>=D4*L4</b>, sao chép xuống.</li><li>Định dạng số tiền: Format Cells → <b>Number</b>, <b>Use 1000 Separator</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Định dạng, trình bày giúp bảng tính <b>dễ đọc, dễ so sánh</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Định dạng dữ liệu số</p><ul>'
    + "<li>Home → Number → <b>Format Cells</b>: số chữ số thập phân, <b>dấu phân tách hàng nghìn</b>.</li>"
    + "<li><b>Percentage</b>: hiện phần trăm. <b>Date</b> → Vietnamese: <b>dd/mm/yyyy</b>.</li>"
    + "<li>Định dạng chỉ đổi <b>cách hiển thị</b>, không đổi dữ liệu.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Trình bày bảng tính</p><ul>'
    + "<li>Nháy phải tên hàng/cột: <b>Insert, Delete, Hide, Unhide</b>.</li>"
    + "<li>Gộp ô: <b>Merge &amp; Center</b> → giữ dữ liệu <b>ô đầu tiên bên trái</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Tính chất của các hàm</p><ul>'
    + "<li>Hàm chỉ tính <b>ô có số</b>, <b>bỏ qua</b> ô văn bản, ô trống.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">4. Thực hành</p><ul>'
    + "<li>Chèn cột <b>Đơn giá</b>; Chi phí = <b>Đơn giá × Tổng số cây</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Sao chép được công thức sang trang tính khác; ô gộp luôn là <b>hình chữ nhật</b>.</li>"
    + "</ul>"},
  g7:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Tỉ lệ so với chỉ tiêu = <b>Thực tế / Chỉ tiêu</b>, định dạng <b>%</b>.</li>"
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
    return ["T7B9." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nhận xét đúng: cần định dạng lại."],
        fix:["Cột Trung bình, Chi phí đã dễ đọc chưa?"]},
  hd1a:{ok:["Đúng! Thống nhất số chữ số thập phân."],
        fix:["11.66666667 có quá nhiều chữ số thập phân không?"]},
  hd1b:{ok:["Đúng! Dùng dấu phân tách hàng nghìn."],
        fix:["Số tiền 3132000 đọc có dễ không? Thêm gì cho dễ đọc?"]},
  so:  {ok:["Chính xác!"],
        fix:["Định dạng số dùng cửa sổ Format Cells."]},
  pct: {ok:["Chính xác! 98.21%."],
        fix:["Kiểu phần trăm nhân giá trị với 100."]},
  ngay:{ok:["Chính xác!"],
        fix:["Phần mềm nhập ngày theo thứ tự tháng/ngày/năm."]},
  phep:{ok:["Chính xác! 16 ngày."],
        fix:["Hai ngày trừ nhau ra số ngày."]},
  hd2a:{ok:["Phân biệt rõ định dạng và trình bày."],
        fix:["Định dạng thay đổi gì? Trình bày thay đổi gì?"]},
  hd2b:{ok:["Đúng, và em nêu được cả trường hợp mất dữ liệu."],
        fix:["Khi gộp ô hoặc xoá hàng, dữ liệu có còn không?"]},
  lenh:{ok:["Chọn đúng lệnh cho từng việc."],
        fix:["Che tạm thời là Hide; bỏ hẳn là Delete."]},
  gop: {ok:["Chính xác!"],
        fix:["Xem lại Hình 9.10, 9.11."]},
  hd3: {ok:["Giải thích đúng tính chất của hàm."],
        fix:["Hàm có tính các ô chứa “Không”, “???” không?"]},
  p49: {ok:["Kết quả chính xác."],
        fix:["Nhập các hàm vào bảng mô phỏng để kiểm tra."]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải có cột Đơn giá trước rồi mới tính Chi phí."]},
  nv2: {ok:["Chính xác! =D4*L4."],
        fix:["Sau khi chèn cột D, Tổng số cây nằm ở cột nào?"]},
  nvkq:{ok:["Kết quả chính xác, định dạng đẹp."],
        fix:["Em kiểm tra lại tổng chi phí ở ô N25."]},
  lt1: {ok:["Đúng!"],
        fix:["Thử Ctrl+C ở trang này, Ctrl+V ở trang khác."]},
  lt2: {ok:["Chính xác! Không."],
        fix:["Vùng dữ liệu luôn có hình gì?"]},
  vd1: {ok:["Đọc đúng số liệu trong bảng."],
        fix:["Xem ô tổng ở hàng 25."]},
  vd2: {ok:["Công thức và định dạng phần trăm đúng."],
        fix:["Tỉ lệ = Tổng số cây chia 50, định dạng Percentage."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  lenh: "Đọc lại mục 2a, 2b.",
  p49: "Nhập các hàm vào bảng mô phỏng để kiểm tra."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Nhận xét bảng tính dự án", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Định dạng dữ liệu số", acts:[
    {title:"Hoạt động 1: Lệnh Format Cells", tasks:["hd1a","hd1b","so"]},
    {title:"Đọc hiểu: Phần trăm, ngày tháng", tasks:["pct","ngay","phep"], concept:"c1"},
    {title:"Ghi bài: Định dạng dữ liệu số", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Trình bày bảng tính", acts:[
    {title:"Hoạt động 2: Một số lệnh trình bày", tasks:["hd2a","hd2b","lenh","gop"], concept:"c2"},
    {title:"Ghi bài: Trình bày bảng tính", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Tính chất của hàm", acts:[
    {title:"Hoạt động 3: Tính chất một số hàm", tasks:["hd3","p49"], concept:"c3"},
    {title:"Ghi bài: Tính chất của hàm", tasks:[], concept:"g4", ghi:true}]},
  {id:"phan-4", code:"2.4", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Hoàn thiện dữ liệu dự án", tasks:["nv1","nv2","nvkq"], concept:"c4"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g5", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Đọc bảng và tính tỉ lệ phần trăm", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g7", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai9", title: "Bài 9. Trình bày bảng tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 gộp ô A2:B3 nên mất dữ liệu ở B2…",
  commentPh: "Ví dụ: Nhóm định dạng đúng; cần thêm dấu phân tách hàng nghìn cho cột Chi phí."};
})();
