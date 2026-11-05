/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  hd1:{type:"open", label:"HĐ1 – Phiếu khảo sát", q:"Phiếu khảo sát (Hình 6.1) được phát cho các bạn trong lớp. Câu trả lời của các bạn cần được lưu trữ trong bảng tính. Theo em, bảng tính gồm các cột nào? Mỗi hàng của bảng lưu trữ dữ liệu gì?",
    k:"Bảng tính gồm các cột: <b>TT</b>, <b>Họ đệm</b>, <b>Tên</b> (tách họ và tên để dễ sắp xếp, tìm kiếm), <b>Tổ</b>, <b>Nội dung</b>. Mỗi hàng lưu <b>kết quả một phiếu khảo sát</b> (của một học sinh)."},
  cn:{type:"sort", label:"Đọc hiểu – Sắp xếp hay lọc?",
    q:"Đọc mục 1 (SGK trang 27–28). Mỗi yêu cầu xử lí dữ liệu dưới đây nên dùng chức năng sắp xếp hay lọc dữ liệu?",
    cats:["Sắp xếp","Lọc"],
    items:[["Sắp xếp họ tên học sinh theo thứ tự bảng chữ cái để dễ tìm kiếm",0],["Lấy danh sách học sinh muốn tìm hiểu Ngôn ngữ lập trình",1],["Lấy danh sách học sinh Tổ 1 muốn tìm hiểu Đồ hoạ máy tính",1],["Xếp các lớp theo số học sinh không dùng thiết bị số từ nhiều đến ít",0],["Chỉ hiện các lớp không có học sinh dùng thiết bị số từ 5 giờ trở lên",1]],
    k:"<b>Sắp xếp</b>: đổi thứ tự các hàng theo một hay nhiều tiêu chí. <b>Lọc</b>: chỉ hiển thị các hàng thoả mãn điều kiện, các hàng khác bị ẩn đi."},
  p28:{type:"mcq", label:"Câu hỏi tr.28", q:"Em hãy nêu tiêu chí sắp xếp danh sách học sinh theo thứ tự của bảng chữ cái trong bảng kết quả ở Hình 6.2.",
    o:["Sắp xếp theo cột TT, từ nhỏ đến lớn.","Sắp xếp theo cột Tên, theo thứ tự bảng chữ cái (A đến Z).","Sắp xếp theo cột Tổ.","Sắp xếp theo cột Nội dung."], a:1,
    k:"Tiêu chí: cột <b>Tên</b>, thứ tự <b>A to Z</b>. Nếu trùng tên thì thêm tiêu chí thứ hai là cột <b>Họ đệm</b>. Lưu ý: việc sắp xếp theo bảng mã Unicode sẽ không hoàn toàn đúng với thứ tự trong tiếng Việt."},
  nd:{type:"mcq", label:"Đọc hiểu – Nhiều nhất", q:"Theo bảng kết quả khảo sát lớp 8A (Hình 6.2), nội dung Tin học nào có nhiều học sinh lựa chọn nhất?",
    o:["Mạng máy tính","Đồ hoạ máy tính","Ngôn ngữ lập trình","Bảng tính điện tử"], a:2,
    k:"<b>Ngôn ngữ lập trình</b> có 4 học sinh chọn: Vũ Thị Minh An, Trần Minh Châu, Đặng Mai Trang, Phùng Khánh Toàn. Có thể dùng chức năng lọc theo cột Nội dung để lấy danh sách này."},
  sx1:{type:"order", label:"Thực hành 2a – Các bước", q:"Sắp xếp các bước sắp xếp cột Tên của Bảng kết quả khảo sát lớp 8A theo thứ tự bảng chữ cái (dùng nút ↑ ↓).",
    items:{a:"Trong hộp thoại Sort: chọn My data has headers, chọn cột Tên, chọn A to Z.",b:"Chọn vùng dữ liệu cần sắp xếp A2:E12.",c:"Chọn OK.",d:"Trong thẻ Data, nhóm Sort & Filter, chọn lệnh Sort."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Chọn vùng A2:E12 → Data/Sort → thiết lập trong hộp thoại Sort → OK."},
  hd:{type:"mcq", label:"Thực hành 2a – My data has headers", q:"Vì sao cần chọn “My data has headers” trong hộp thoại Sort?",
    o:["Để sắp xếp cả dòng tiêu đề.","Để không sắp xếp dòng tiêu đề (hàng 2 là tiêu đề của bảng).","Để sắp xếp theo màu.","Để xoá dòng tiêu đề."], a:1,
    k:"Vùng A2:E12 có hàng 2 là <b>tiêu đề</b>. Chọn My data has headers để dòng tiêu đề <b>không bị sắp xếp</b> lẫn vào dữ liệu."},
  sx2:{type:"mcq", label:"Thực hành 2b – Hai tiêu chí", q:"Có hai học sinh cùng tên là Trang. Sau khi sắp xếp theo tiêu chí thứ nhất là Tên, tiêu chí thứ hai (Add Level) là Họ đệm, bạn nào đứng trước?",
    o:["Ngô Hà Trang","Đặng Mai Trang","Hai bạn giữ nguyên thứ tự cũ","Không xác định được"], a:1,
    k:"Khi cùng tên Trang, bảng tính sắp xếp theo cột Họ đệm: <b>Đặng Mai</b> (chữ Đ) đứng trước <b>Ngô Hà</b> (chữ N), như Hình 6.6."},
  p30:{type:"mcq", label:"Câu hỏi tr.30", q:"Sắp xếp bảng kết quả khảo sát lớp 8A theo Tổ; nếu cùng tổ thì theo Tên; nếu cùng tên thì theo Họ đệm. Học sinh nào đứng đầu danh sách?",
    o:["Vũ Thị Minh An (Tổ 3)","Trần Minh Châu (Tổ 2)","Phạm Hoàng Bảo An (Tổ 1)","Đặng Mai Trang (Tổ 1)"], a:2,
    k:"Có thể sắp xếp được, dùng <b>ba tiêu chí</b>: Tổ → Tên → Họ đệm (Add Level hai lần). Tổ 1 gồm An, Toàn, Trang, Trang; đứng đầu là <b>Phạm Hoàng Bảo An</b>. Em thử ngay trên bảng mô phỏng."},
  loc1:{type:"order", label:"Thực hành 3 – Các bước lọc", q:"Sắp xếp các bước lọc danh sách học sinh muốn tìm hiểu Ngôn ngữ lập trình (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào nút mũi tên ở ô tiêu đề cột Nội dung.",b:"Chọn vùng dữ liệu cần lọc A2:E12.",c:"Bỏ chọn tất cả (Select All), chọn Ngôn ngữ lập trình, chọn OK.",d:"Trong thẻ Data, nhóm Sort & Filter, chọn lệnh Filter."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Để bỏ lọc, chọn lại <b>Select All</b>."},
  loc2:{type:"mcq", label:"Thực hành 3 – Nhiệm vụ 2", q:"Lọc danh sách học sinh của Tổ 1 muốn tìm hiểu nội dung Đồ hoạ máy tính (lọc theo hai cột Nội dung và Tổ). Kết quả là:",
    o:["Ngô Hà Trang","Ngô Hà Trang và Phạm Ngọc Linh","Phạm Ngọc Linh","Đặng Mai Trang"], a:0,
    k:"Có hai bạn chọn Đồ hoạ máy tính: Ngô Hà Trang (Tổ 1) và Phạm Ngọc Linh (Tổ 3). Lọc thêm Tổ = 1 chỉ còn <b>Ngô Hà Trang</b>."},
  an:{type:"mcq", label:"Thực hành 3 – Lưu ý", q:"Khi lọc dữ liệu, các hàng không đúng với điều kiện lọc sẽ:",
    o:["Bị xoá vĩnh viễn.","Bị ẩn đi, chọn Select All để hiện lại.","Bị chuyển xuống cuối bảng.","Được tô màu đỏ."], a:1,
    k:"Dữ liệu không đúng với điều kiện lọc sẽ <b>bị ẩn đi</b>, không bị xoá. Bỏ lọc bằng cách chọn <b>Select All</b>."},
  ltb:{type:"mcq", label:"Luyện tập – b, c", q:"Sắp xếp bảng dữ liệu Hình 6.9 với hai tiêu chí: giá trị giảm dần của cột Không sử dụng, nếu bằng nhau thì giá trị giảm dần của cột Dưới 1 giờ. Ba lớp đứng đầu danh sách là:",
    o:["8A1, 8A4, 8A5","8A8, 8A1, 8A4","8A8, 8A5, 8A4","8A7, 8A10, 8A3"], a:1,
    k:"Không sử dụng lớn nhất: 8A8 (9). Ba lớp cùng 8: so cột Dưới 1 giờ: 8A1 (12) &gt; 8A4 (11) &gt; 8A5 (10). Ba lớp đầu: <b>8A8, 8A1, 8A4</b>. Thứ tự đầy đủ: 8A8, 8A1, 8A4, 8A5, 8A6, 8A2, 8A3, 8A9, 8A7, 8A10."},
  ltd:{type:"sort", label:"Luyện tập – d",
    q:"Lọc danh sách các lớp không có học sinh sử dụng thiết bị số từ 5 giờ trở lên (ô cột “Từ 5 giờ trở lên” để trống). Mỗi lớp dưới đây có nằm trong kết quả lọc không?",
    cats:["Có trong kết quả","Không có"],
    items:[["8A1",1],["8A2",0],["8A3",1],["8A5",0],["8A6",0],["8A7",0],["8A8",0],["8A10",1]],
    k:"Kết quả lọc: <b>8A2, 8A5, 8A6, 8A7, 8A8</b> (ô trống). Trong Excel, ở cột “Từ 5 giờ trở lên” chỉ chọn <b>(Blanks)</b>."},
  vd1:{type:"mcq", label:"Vận dụng – Number Filters", q:"Dùng Number Filters để lọc danh sách các lớp có số học sinh sử dụng thiết bị số từ 3 đến 4 giờ lớn hơn hoặc bằng 10 học sinh. Kết quả là:",
    o:["8A4 và 8A5","8A5","8A7 và 8A4","Không có lớp nào"], a:1,
    k:"Cột 3–4 giờ: chỉ <b>8A5</b> có 11 học sinh (≥ 10); các lớp khác đều dưới 10. Cách làm: nháy mũi tên cột 3–4 giờ → <b>Number Filters</b> → <b>Greater Than Or Equal To…</b> → nhập 10 → OK."},
  vd2:{type:"open", label:"Vận dụng – Thử thêm", q:"Em hãy dùng Number Filters để đặt thêm một điều kiện lọc khác trên tệp TGSDThietbiso.xlsx (ví dụ: lớp có từ 15 học sinh dùng thiết bị 1–2 giờ trở lên). Ghi lại điều kiện và kết quả.",
    k:"Ví dụ: cột 1–2 giờ, Greater Than Or Equal To 15 → 8A1, 8A2, 8A3, 8A7, 8A8, 8A9, 8A10. Học sinh tự đặt điều kiện khác và kiểm tra kết quả."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Chức năng <b>sắp xếp</b> và <b>lọc</b> dữ liệu của phần mềm bảng tính giúp giải quyết nhiều bài toán thực tế: sắp xếp danh sách, tìm nhóm dữ liệu thoả mãn điều kiện,…</li><li>Sắp xếp theo bảng mã Unicode không hoàn toàn đúng với thứ tự trong tiếng Việt.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Sắp xếp: chọn vùng dữ liệu → <b>Data/Sort</b> → chọn cột, thứ tự (A to Z, Z to A) → OK.</li><li>Sắp xếp nhiều tiêu chí: <b>Add Level</b> để thêm tiêu chí; <b>Delete Level</b> để xoá tiêu chí.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Lọc: chọn vùng dữ liệu → <b>Data/Filter</b> → nháy mũi tên ở cột cần lọc → chọn giá trị → OK.</li><li>Dữ liệu không đúng điều kiện lọc bị <b>ẩn đi</b>; chọn <b>Select All</b> để bỏ lọc.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Bảng khảo sát: cột <b>TT, Họ đệm, Tên, Tổ, Nội dung</b>; mỗi hàng = một phiếu.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Bảng tính giải quyết bài toán thực tế</p><ul>'
    + "<li><b>Sắp xếp</b>: đổi thứ tự hàng theo tiêu chí (VD: tên A → Z).</li>"
    + "<li><b>Lọc</b>: chỉ hiện hàng thoả điều kiện (VD: chọn Ngôn ngữ lập trình).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Sắp xếp dữ liệu</p><ul>'
    + "<li>Chọn vùng → <b>Data/Sort</b> → chọn cột, <b>A to Z</b> / <b>Z to A</b> → OK.</li>"
    + "<li>Nhiều tiêu chí: <b>Add Level</b> (VD: Tên, rồi Họ đệm).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Lọc dữ liệu</p><ul>'
    + "<li>Chọn vùng → <b>Data/Filter</b> → nháy mũi tên cột → chọn giá trị → OK.</li>"
    + "<li>Hàng không thoả điều kiện bị <b>ẩn</b>; bỏ lọc: <b>Select All</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Giảm dần: <b>Z to A</b> (hoặc Largest to Smallest). Lọc ô trống: chọn <b>(Blanks)</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Lọc theo điều kiện số: <b>Number Filters</b> (VD: ≥ 10 → Greater Than Or Equal To).</li>"
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
    return ["T8B6." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  hd1: {ok:["Em nêu đủ các cột và hiểu mỗi hàng là một phiếu khảo sát."],
        fix:["Phiếu khảo sát có những thông tin gì? Mỗi thông tin là một cột."]},
  cn:  {ok:["Nhóm phân biệt đúng khi nào dùng sắp xếp, khi nào dùng lọc."],
        fix:["Em tự hỏi: cần đổi thứ tự các hàng hay chỉ cần hiện một số hàng?"]},
  p28: {ok:["Chính xác! Sắp xếp theo cột Tên, A to Z."],
        fix:["Muốn tên theo bảng chữ cái thì sắp xếp theo cột nào?"]},
  nd:  {ok:["Chính xác! Ngôn ngữ lập trình có 4 học sinh chọn."],
        fix:["Em đếm số học sinh chọn mỗi nội dung trong Hình 6.2."]},
  sx1: {ok:["Đúng thứ tự các bước sắp xếp."],
        fix:["Phải chọn vùng dữ liệu trước, rồi mới chọn lệnh Sort."]},
  hd:  {ok:["Chính xác! Để dòng tiêu đề không bị sắp xếp."],
        fix:["Hàng 2 chứa gì? Nếu sắp xếp cả hàng đó thì sao?"]},
  sx2: {ok:["Đúng! Đặng Mai đứng trước Ngô Hà."],
        fix:["Hai bạn cùng tên Trang thì so sánh tiếp cột nào?"]},
  p30: {ok:["Chính xác! Dùng ba tiêu chí, Phạm Hoàng Bảo An đứng đầu."],
        fix:["Em thử trên bảng mô phỏng: tiêu chí 1 Tổ, tiêu chí 2 Tên."]},
  loc1:{ok:["Đúng thứ tự các bước lọc."],
        fix:["Phải bật Filter trước thì mới có nút mũi tên ở ô tiêu đề."]},
  loc2:{ok:["Chính xác! Chỉ có Ngô Hà Trang."],
        fix:["Phạm Ngọc Linh thuộc tổ nào? Em lọc thêm cột Tổ."]},
  an:  {ok:["Đúng! Dữ liệu chỉ bị ẩn đi."],
        fix:["Lọc dữ liệu có làm mất dữ liệu không? Em thử bỏ lọc bằng Select All."]},
  ltb: {ok:["Chính xác! 8A8, 8A1, 8A4."],
        fix:["Ba lớp cùng 8 học sinh không sử dụng: so sánh tiếp cột Dưới 1 giờ."]},
  ltd: {ok:["Nhóm xác định đúng các lớp trong kết quả lọc."],
        fix:["Em xem cột “Từ 5 giờ trở lên”: lớp nào để trống?"]},
  vd1: {ok:["Chính xác! Chỉ lớp 8A5."],
        fix:["Em xem cột 3–4 giờ: lớp nào có từ 10 học sinh trở lên?"]},
  vd2: {ok:["Điều kiện lọc hợp lí, kết quả chính xác."],
        fix:["Em ghi rõ điều kiện lọc và kiểm tra lại kết quả."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  cn: "Em xét lại: cần đổi thứ tự hàng hay chỉ hiện một số hàng?",
  ltd: "Em xem lại cột “Từ 5 giờ trở lên” trong bảng Hình 6.9."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Hoạt động 1: Phiếu khảo sát", tasks:["hd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Bài toán thực tế", acts:[
    {title:"Đọc hiểu: Sắp xếp hay lọc?", tasks:["cn","nd"], concept:"c1"},
    {title:"Câu hỏi SGK trang 28", tasks:["p28"]},
    {title:"Ghi bài: Bài toán thực tế", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Sắp xếp dữ liệu", acts:[
    {title:"a) Sắp xếp theo một tiêu chí", tasks:["sx1","hd"]},
    {title:"b) Sắp xếp theo nhiều tiêu chí", tasks:["sx2","p30"], concept:"c2"},
    {title:"Ghi bài: Sắp xếp dữ liệu", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Lọc dữ liệu", acts:[
    {title:"Nhiệm vụ 1, 2: Lọc dữ liệu", tasks:["loc1","loc2","an"], concept:"c3"},
    {title:"Ghi bài: Lọc dữ liệu", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Thời gian sử dụng thiết bị số", tasks:["ltb","ltd"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Lọc theo điều kiện số", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai6", title: "Bài 6. Sắp xếp và lọc dữ liệu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 quên chọn My data has headers nên dòng tiêu đề bị sắp xếp vì…",
  commentPh: "Ví dụ: Nhóm sắp xếp đúng hai tiêu chí; cần bỏ lọc (Select All) trước khi lọc tiếp."};
})();
