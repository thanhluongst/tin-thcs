/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Phiếu khảo sát của bạn An có một danh sách các nội dung Tin học được đánh số thứ tự. Theo em, An có cần gõ từng số thứ tự không? Nếu danh sách có hàng trăm mục thì làm thế nào để tiết kiệm thời gian và không bị nhầm thứ tự?",
    k:"Không cần gõ tay. Dùng chức năng <b>danh sách có thứ tự</b> (Numbering) của phần mềm soạn thảo: số thứ tự được <b>tự động tạo</b> và <b>tự động cập nhật</b> khi thêm, bớt mục, nên nhanh và không nhầm."},
  hd1:{type:"mcq", label:"HĐ1 – Hai cách trình bày", q:"Quan sát Hình 8a.2 và Hình 8a.3. Cách trình bày nào giúp người đọc dễ theo dõi các công việc của dự án hơn?",
    o:["Cách viết liền thành đoạn văn (Hình 8a.2).","Cách trình bày dạng danh sách liệt kê (Hình 8a.3).","Hai cách như nhau.","Không cách nào dễ đọc."], a:1,
    k:"Cách trình bày <b>dạng danh sách liệt kê</b> (Hình 8a.3) chia nhỏ nội dung thành từng mục, có số thứ tự và dấu đầu dòng, giúp văn bản <b>rõ ràng</b>, người đọc tìm thông tin <b>nhanh, dễ dàng</b>."},
  kieu:{type:"sort", label:"Đọc hiểu – Chọn kiểu danh sách",
    q:"Đọc mục 1 (SGK trang 36–37). Nội dung nào nên trình bày bằng danh sách có thứ tự, nội dung nào chỉ cần danh sách dấu đầu dòng?",
    cats:["Danh sách có thứ tự","Danh sách dấu đầu dòng"],
    items:[["Các bước tắt máy tính an toàn",0],["Các món ăn em yêu thích",1],["Các bước nấu cơm bằng nồi cơm điện",0],["Đồ dùng cần mang khi đi dã ngoại",1],["Thứ hạng ba đội đứng đầu giải bóng đá",0]],
    k:"Khi thứ tự <b>có ý nghĩa</b> (các bước, thứ hạng) dùng <b>danh sách có thứ tự</b> (mỗi mục bắt đầu bằng số hoặc chữ cái và dấu chấm hay dấu ngoặc đơn). Khi các mục <b>ngang hàng</b> dùng <b>danh sách dấu đầu dòng</b>."},
  p37a:{type:"sort", label:"Câu hỏi tr.37 – câu 1",
    q:"Mỗi phương án dưới đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["A. Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê.",0],["B. Danh sách dạng liệt kê không tự động cập nhật khi thêm hoặc bớt đoạn văn.",1],["C. Chỉ có thể sử dụng một kiểu danh sách dạng liệt kê cho một văn bản.",1],["D. Có thể sử dụng kết hợp danh sách dấu đầu dòng và danh sách có thứ tự.",0]],
    k:"Phương án <b>sai</b>: <b>B</b> (dấu đầu dòng và số thứ tự được <b>tự động</b> tạo và cập nhật) và <b>C</b> (có thể <b>kết hợp</b> cả hai kiểu trong một văn bản, như Hình 8a.3)."},
  p37b:{type:"mcq", label:"Câu hỏi tr.37 – câu 2", q:"Với danh sách có thứ tự gồm 4 mục (1. Ngôn ngữ lập trình; 2. Mạng máy tính; 3. Đồ hoạ máy tính; 4. Bảng tính điện tử), em đặt con trỏ soạn thảo ở cuối dòng thứ hai rồi nhấn phím Enter. Kết quả là:",
    o:["Danh sách không đổi, chỉ xuống dòng không có số.","Xuất hiện mục mới “3.” để trống; các mục sau tự đánh số lại thành 4 và 5.","Xuất hiện mục mới nhưng các mục sau vẫn giữ số 3 và 4.","Danh sách bị xoá số thứ tự."], a:1,
    k:"Nhấn Enter tạo một <b>mục mới</b> trong danh sách: mục mới mang số 3 (còn trống), Đồ hoạ máy tính thành 4, Bảng tính điện tử thành 5 – đúng như Hình 8a.4b. Thứ tự được <b>tự động cập nhật</b>."},
  hd2a:{type:"open", label:"HĐ2 – Câu a, b", q:"a) Tờ rơi ở Hình 8a.5 gồm những thông tin dạng nào? b) Tờ rơi ở Hình 8a.6 gồm những thông tin dạng nào?",
    k:"Tờ rơi Hình 8a.5 chỉ có thông tin dạng <b>văn bản</b> (chữ). Tờ rơi Hình 8a.6 có <b>văn bản</b>, <b>hình ảnh</b> (ảnh nền) và <b>hình đồ hoạ</b> (mũi tên, hình trang trí)."},
  hd2c:{type:"open", label:"HĐ2 – Câu c", q:"Em ấn tượng với tờ rơi nào hơn? Vì sao?",
    k:"Thường là tờ rơi <b>có hình minh hoạ</b> (Hình 8a.6): màu sắc bắt mắt, hình ảnh gợi chủ đề công nghệ, hình đồ hoạ làm nổi bật thông tin, thu hút người xem hơn."},
  hd2d:{type:"mcq", label:"HĐ2 – Câu d", q:"Dùng phần mềm soạn thảo văn bản có tạo ra được sản phẩm như tờ rơi có hình minh hoạ (Hình 8a.6) không?",
    o:["Không, phải dùng phần mềm vẽ chuyên dụng.","Có, phần mềm soạn thảo có công cụ xử lí hình ảnh và vẽ hình đồ hoạ.","Chỉ chèn được chữ.","Chỉ chèn được bảng."], a:1,
    k:"<b>Có.</b> Phần mềm soạn thảo cung cấp <b>công cụ xử lí hình ảnh</b> (chèn, xoá, thay đổi kích thước, vị trí, lớp của ảnh) và thư viện <b>mẫu hình đồ hoạ</b> để vẽ hình trong văn bản."},
  p39:{type:"mcq", label:"Câu hỏi tr.39", q:"Phương án nào sau đây là SAI?",
    o:["Có thể chèn hình ảnh vào văn bản để minh hoạ cho nội dung.","Có thể vẽ hình đồ hoạ trong phần mềm soạn thảo văn bản.","Có thể chèn thêm, xoá bỏ, thay đổi kích thước của hình ảnh và hình đồ hoạ trong văn bản.","Không thể vẽ hình đồ hoạ trong phần mềm soạn thảo văn bản."], a:3,
    k:"Phương án <b>D</b> sai, vì phần mềm soạn thảo có thư viện mẫu hình đồ hoạ (Insert → Shapes) để vẽ hình trong văn bản."},
  nv1:{type:"order", label:"Thực hành NV1 – Tạo danh sách có thứ tự", q:"Sắp xếp các bước tạo danh sách có thứ tự cho các nội dung trong Phiếu khảo sát (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào hình tam giác nhỏ bên cạnh lệnh Numbering.",b:"Chọn các đoạn văn bản muốn tạo danh sách có thứ tự.",c:"Chọn kiểu danh sách có thứ tự (ví dụ 1. 2. 3.).",d:"Chọn thẻ Home."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Sau đó lưu tệp với tên PhieuKhaoSat.docx (File → Save)."},
  ki:{type:"mcq", label:"Thực hành NV1 – Kí hiệu ô vuông", q:"Để nhập kí hiệu ô vuông ☐ ở cuối mỗi dòng của Phiếu khảo sát, em dùng lệnh nào?",
    o:["Insert/Symbol","Home/Numbering","Insert/Picture","File/Save"], a:0,
    k:"Chọn <b>Insert → Symbol</b> để nhập các kí hiệu đặc biệt như ☐."},
  nv2a:{type:"mcq", label:"Thực hành NV2 – Ảnh nền", q:"Ảnh nền vừa chèn che mất (hoặc đẩy xuống) nội dung tờ rơi. Để ảnh nằm ở lớp dưới, văn bản nằm ở lớp trên, em chọn ảnh, chọn Format, trong nhóm Arrange chọn Wrap Text rồi chọn:",
    o:["Square","In Front of Text","Behind Text","In Line with Text"], a:2,
    k:"Chọn <b>Behind Text</b> để ảnh nằm sau chữ. Sau đó kéo thả hình vuông nhỏ ở góc dưới bên phải ảnh để ảnh phủ kín tờ rơi. Với ảnh nhỏ ở góc trên bên phải, chọn <b>Square</b> để đặt đúng vị trí."},
  nv2b:{type:"mcq", label:"Thực hành NV2 – Hình đồ hoạ", q:"Để vẽ hình mũi tên cong trên tờ rơi rồi tô màu vàng cho hình, em dùng các lệnh nào?",
    o:["Insert → Shapes → nhóm Block Arrows; rồi Format → Shape Fill → chọn màu vàng.","Home → Numbering; rồi Font Color.","Insert → Picture; rồi Wrap Text.","Insert → Symbol; rồi Highlight."], a:0,
    k:"Vẽ hình: <b>Insert → Shapes → Block Arrows</b> (ví dụ Arrow: Curved Right), kéo thả chuột để vẽ. Đổi màu: chọn hình, <b>Format → Shape Styles → Shape Fill</b> → màu vàng. Muốn xoá hình: chọn hình rồi nhấn Delete."},
  nv2c:{type:"open", label:"Thực hành NV2 – Kết quả", q:"Báo cáo kết quả Nhiệm vụ 2: tờ rơi TuyenThanhVien.docx của em có những đối tượng nào (ảnh nền, văn bản, hình đồ hoạ, ảnh nhỏ)? Em đã chỉnh sửa vị trí, màu sắc những gì?",
    k:"Ví dụ: ảnh nền phủ kín tờ rơi (Behind Text); dòng chữ “TUYỂN THÀNH VIÊN” đổi màu vàng, đặt giữa hình cầu; hai hình mũi tên cong màu vàng; ảnh nhỏ ở góc trên bên phải (Square); thông tin thời gian, địa điểm ở dưới. Lưu với tên TuyenThanhVien.docx."},
  lt1:{type:"open", label:"Luyện tập", q:"Sử dụng phần mềm soạn thảo văn bản nhập dữ liệu cho dự án Thành lập CLB Tin học, tạo danh sách dạng liệt kê theo mẫu như Hình 8a.3 (kết hợp danh sách có thứ tự và danh sách dấu đầu dòng) và lưu tệp với tên CLBTinhoc.docx. Em đã dùng kiểu danh sách nào cho những dòng nào?",
    k:"Các nhóm công việc lớn (1) Khảo sát, (2) Xử lí dữ liệu, (3) Quảng cáo và tuyển thành viên, (4) Tổ chức buổi ra mắt dùng <b>danh sách có thứ tự</b>; các công việc nhỏ bên trong dùng <b>danh sách dấu đầu dòng</b> (thụt vào bằng Increase Indent hoặc phím Tab)."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Ngoài các mẫu có sẵn, em có thể tự tạo mẫu dấu đầu dòng, mẫu thứ tự theo ý thích. Em hãy tìm hiểu cách làm và tạo ba mẫu dấu đầu dòng, mẫu thứ tự mới. Ghi lại cách làm.",
    k:"Dấu đầu dòng mới: mũi tên cạnh lệnh <b>Bullets</b> → <b>Define New Bullet…</b> → Symbol (chọn kí hiệu) hoặc Picture (chọn ảnh) → OK. Thứ tự mới: mũi tên cạnh lệnh <b>Numbering</b> → <b>Define New Number Format…</b> → chọn kiểu số, định dạng (ví dụ “Bước 1.”, “Phần I –”) → OK."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Sử dụng phần mềm soạn thảo văn bản tạo một tờ rơi quảng cáo cho một CLB của trường (CLB Tiếng Anh, CLB Rubik, CLB bóng rổ,…), có sử dụng hình ảnh minh hoạ, hình đồ hoạ và mẫu dấu đầu dòng, mẫu thứ tự em đã tạo ở câu 1. Mô tả ngắn tờ rơi của em.",
    k:"Học sinh tự làm. Tờ rơi cần có: tên CLB nổi bật; ảnh minh hoạ (ghi nguồn hoặc tự chụp) đặt Behind Text hoặc Square; hình đồ hoạ (mũi tên, ngôi sao,…); danh sách lợi ích khi tham gia dùng dấu đầu dòng tự tạo; các bước đăng kí dùng danh sách có thứ tự; thời gian, địa điểm."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê: <b>danh sách dấu đầu dòng</b> và <b>danh sách có thứ tự</b>.</li><li>Dấu đầu dòng và thứ tự được <b>tự động tạo và cập nhật</b> khi thêm hoặc bớt đoạn văn bản.</li><li>Danh sách dạng liệt kê giúp trình bày văn bản <b>rõ ràng</b> và có tính thẩm mĩ.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Phần mềm soạn thảo văn bản cung cấp nhiều công cụ nâng cao để làm việc với <b>hình ảnh</b> và <b>hình đồ hoạ</b>.</li><li>Sử dụng các chức năng nâng cao, em có thể tạo được các sản phẩm có tính thẩm mĩ phục vụ nhu cầu thực tế.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Danh sách có thứ tự: Home → Numbering → chọn kiểu. Kí hiệu đặc biệt: Insert → Symbol.</li><li>Chèn ảnh: Insert → Picture; ảnh nằm dưới chữ: Format → Wrap Text → <b>Behind Text</b>.</li><li>Vẽ hình: Insert → Shapes; tô màu: Format → <b>Shape Fill</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Danh sách có thứ tự: số được <b>tự động đánh</b>, không cần gõ tay.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Danh sách dạng liệt kê</p><ul>'
    + "<li>Hai kiểu: <b>dấu đầu dòng</b> (Bullets) và <b>có thứ tự</b> (Numbering).</li>"
    + "<li>Tự động <b>tạo và cập nhật</b> khi thêm, bớt mục; có thể <b>kết hợp</b> hai kiểu.</li>"
    + "<li>Giúp văn bản <b>rõ ràng, đẹp</b>, dễ tìm thông tin.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Hình ảnh và hình đồ hoạ</p><ul>'
    + "<li>Hình ảnh: <b>chèn, xoá, đổi kích thước, vị trí</b>.</li>"
    + "<li>Hình đồ hoạ: vẽ bằng <b>Insert → Shapes</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Ảnh nền nằm dưới chữ: Wrap Text → <b>Behind Text</b>.</li>"
    + "<li>Tô màu hình: <b>Shape Fill</b>. Kí hiệu ☐: <b>Insert → Symbol</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Mục lớn: danh sách <b>có thứ tự</b>; việc nhỏ bên trong: <b>dấu đầu dòng</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Mẫu mới: <b>Define New Bullet</b> / <b>Define New Number Format</b>.</li>"
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
    return ["T8B8a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Đúng! Dùng danh sách có thứ tự để số tự động đánh."],
        fix:["Phần mềm soạn thảo có chức năng nào tự đánh số thứ tự không?"]},
  hd1: {ok:["Chính xác! Dạng danh sách rõ ràng, dễ theo dõi."],
        fix:["Nhìn cách nào em tìm được một công việc nhanh hơn?"]},
  kieu:{ok:["Nhóm chọn đúng kiểu danh sách cho từng nội dung."],
        fix:["Thứ tự các mục có quan trọng không? Nếu có thì dùng danh sách có thứ tự."]},
  p37a:{ok:["Chính xác! B và C sai."],
        fix:["Danh sách có tự cập nhật khi thêm mục không? Có kết hợp được hai kiểu không?"]},
  p37b:{ok:["Chính xác! Mục mới số 3, các mục sau tự đánh lại số."],
        fix:["Nhấn Enter trong danh sách là thêm một mục mới. Số thứ tự các mục sau sẽ thế nào?"]},
  hd2a:{ok:["Em nhận ra đúng các dạng thông tin trên hai tờ rơi."],
        fix:["Ngoài chữ, tờ rơi thứ hai còn có những gì?"]},
  hd2c:{ok:["Em giải thích rõ vì sao tờ rơi đó ấn tượng."],
        fix:["Em nêu lí do: màu sắc, hình ảnh, cách trình bày."]},
  hd2d:{ok:["Đúng! Phần mềm soạn thảo làm được."],
        fix:["Phần mềm soạn thảo có công cụ chèn ảnh, vẽ hình không?"]},
  p39: {ok:["Chính xác! D sai."],
        fix:["Đề hỏi phương án SAI. Phần mềm soạn thảo có vẽ được hình không?"]},
  nv1: {ok:["Đúng thứ tự các bước tạo danh sách có thứ tự."],
        fix:["Phải chọn các đoạn văn bản trước, rồi mới chọn lệnh Numbering."]},
  ki:  {ok:["Chính xác! Insert/Symbol."],
        fix:["Kí hiệu đặc biệt nằm trong thẻ Insert, lệnh nào?"]},
  nv2a:{ok:["Chính xác! Behind Text."],
        fix:["Muốn ảnh nằm phía sau chữ thì chọn kiểu nào trong Wrap Text?"]},
  nv2b:{ok:["Chính xác! Shapes để vẽ, Shape Fill để tô màu."],
        fix:["Hình đồ hoạ nằm trong lệnh Shapes của thẻ Insert."]},
  nv2c:{ok:["Tờ rơi đủ các đối tượng, trình bày đẹp."],
        fix:["Em kiểm tra: ảnh nền đã nằm dưới chữ chưa? Hình đồ hoạ đã tô màu chưa?"]},
  lt1: {ok:["Kết hợp đúng hai kiểu danh sách."],
        fix:["Em dùng danh sách có thứ tự cho mục lớn, dấu đầu dòng cho việc nhỏ."]},
  vd1: {ok:["Em tạo được mẫu mới và ghi rõ cách làm."],
        fix:["Gợi ý: Define New Bullet, Define New Number Format."]},
  vd2: {ok:["Tờ rơi sáng tạo, dùng đủ hình ảnh, hình đồ hoạ, danh sách."],
        fix:["Em bổ sung hình đồ hoạ hoặc danh sách liệt kê cho tờ rơi."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kieu: "Em xét lại: thứ tự các mục có quan trọng không?",
  p37a: "Em đọc lại phần Ghi nhớ mục 1."
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
    {title:"Phiếu khảo sát của An", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Danh sách dạng liệt kê", acts:[
    {title:"Hoạt động 1: Tác dụng của danh sách dạng liệt kê", tasks:["hd1"]},
    {title:"Đọc hiểu: Hai kiểu danh sách", tasks:["kieu"], concept:"c1"},
    {title:"Câu hỏi SGK trang 37", tasks:["p37a","p37b"]},
    {title:"Ghi bài: Danh sách dạng liệt kê", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Hình ảnh, hình đồ hoạ", acts:[
    {title:"Hoạt động 2: Hiệu quả của hình ảnh minh hoạ", tasks:["hd2a","hd2c","hd2d"], concept:"c2"},
    {title:"Câu hỏi SGK trang 39", tasks:["p39"]},
    {title:"Ghi bài: Hình ảnh, hình đồ hoạ", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ 1: Phiếu khảo sát", tasks:["nv1","ki"]},
    {title:"Nhiệm vụ 2: Tờ rơi tuyển thành viên", tasks:["nv2a","nv2b","nv2c"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Văn bản dự án CLB Tin học", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Mẫu danh sách mới và tờ rơi CLB", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai8a", title: "Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 gõ tay số thứ tự nên khi thêm mục bị sai số vì…",
  commentPh: "Ví dụ: Nhóm tạo đúng danh sách có thứ tự; cần đặt ảnh nền Behind Text."};
})();
