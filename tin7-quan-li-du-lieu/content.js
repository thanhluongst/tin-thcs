/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu – Đặt tên thư mục", q:"Chuyến du lịch cùng gia đình có nhiều ảnh và thông tin cần lưu trên máy tính. Em hãy vẽ sơ đồ cây thư mục để chứa các tệp dữ liệu đó và đặt tên cho các thư mục sao cho dễ tìm kiếm, truy cập. (Ghi sơ đồ dạng: DuLich → GiaDinh, DiemDen → …)",
    k:"Ví dụ: <b>DuLich</b> → <b>GiaDinh</b> (ảnh cả nhà), <b>DiemDen</b> → <b>BinhMinh</b>, <b>BanNgay</b>, <b>HoangHon</b>. Tên thư mục <b>ngắn, dễ nhớ, cho biết bên trong chứa gì</b>; tệp ảnh đặt tên có số thứ tự như PhaoHoa01.jpg, PhaoHoa02.jpg."},
  ten:{type:"sort", label:"Đọc hiểu – Tên đặt hợp lí?",
    q:"Đọc mục 1 (SGK trang 13–14). Tên nào dưới đây đặt hợp lí (dễ nhớ, cho biết bên trong chứa gì), tên nào chưa hợp lí?",
    cats:["Hợp lí","Chưa hợp lí"],
    items:[["Thư mục DuLich",0],["Thư mục New Folder (3)",1],["Tệp PhaoHoa01.jpg",0],["Tệp abc123.jpg",1],["Thư mục ToanLop7",0],["Thư mục Linh tinh",1]],
    k:"Tên hợp lí cho biết <b>nội dung bên trong</b> và <b>dễ nhớ</b>: DuLich, PhaoHoa01.jpg, ToanLop7. Những tên như New Folder (3), abc123, Linh tinh khiến em mất thời gian mở từng thư mục, từng tệp để tìm."},
  p14a:{type:"mcq", label:"Câu hỏi tr.14 – câu 1", q:"Để việc tìm kiếm dữ liệu trong máy tính được dễ dàng và nhanh chóng, khi đặt tên thư mục và tệp em nên:",
    o:["Đặt tên theo ý thích như tên người thân hay tên thú cưng.","Đặt tên sao cho dễ nhớ và để biết trong đó chứa gì.","Đặt tên giống như trong ví dụ của sách giáo khoa.","Đặt tên tuỳ ý, không cần theo quy tắc gì."], a:1,
    k:"<b>B</b>. Tên dễ nhớ và cho biết bên trong chứa gì giúp tìm kiếm nhanh, thuận lợi cho công việc."},
  p14b:{type:"mcq", label:"Câu hỏi tr.14 – câu 2", q:"Tệp có phần mở rộng .exe thuộc loại tệp gì?",
    o:["Không có loại tệp này.","Tệp chương trình máy tính.","Tệp dữ liệu của phần mềm Microsoft Word.","Tệp dữ liệu video."], a:1,
    k:"<b>B</b>. Chương trình máy tính cũng được lưu dưới dạng tệp. Trong Windows, tệp chương trình thường có phần mở rộng <b>.exe</b>, .com, .bat, .msi. Không nên xoá hay di chuyển các tệp này nếu không biết rõ chúng dùng để làm gì."},
  hd2:{type:"open", label:"HĐ2 – Bảo vệ dữ liệu", q:"Máy tính của em có nhiều dữ liệu quan trọng. Em muốn bảo vệ dữ liệu trong máy tính của mình thì: a) Em sẽ chọn cách bảo vệ dữ liệu nào? b) Tại sao em chọn cách đó?",
    k:"Có thể chọn: <b>sao lưu</b> dữ liệu (sang USB, ổ cứng ngoài, lưu trữ đám mây) để không mất khi máy hỏng; đặt <b>mật khẩu</b> để người khác không truy cập trái phép; cài <b>phần mềm diệt virus</b> để chống phần mềm độc hại. Mỗi cách chống lại một loại rủi ro khác nhau."},
  bang:{type:"sort", label:"Đọc hiểu – Thiết bị lưu trữ (Bảng 3.1)",
    q:"Đọc Bảng 3.1 (SGK trang 15). Mỗi đặc điểm dưới đây là của thiết bị lưu trữ nào?",
    cats:["Thẻ nhớ, USB","Đĩa quang","Ổ cứng ngoài","Lưu trữ đám mây"],
    items:[["Nhỏ gọn, tiện sử dụng nhưng dễ thất lạc",0],["Chi phí thấp nhưng dung lượng nhỏ, cần có đầu ghi",1],["Dung lượng lớn nhưng to và nặng, khó mang theo",2],["Truy cập ở bất kì máy nào có Internet, cần kết nối mạng",3],["Khó bị nhiễm virus nhưng dễ hỏng, khó cất giữ",1],["Dịch vụ có thể không đáng tin cậy, có thể bị tin tặc tấn công",3]],
    k:"<b>USB, thẻ nhớ</b>: nhỏ gọn, dễ thất lạc. <b>Đĩa quang</b>: rẻ, ít nhiễm virus nhưng dung lượng nhỏ, dễ hỏng. <b>Ổ cứng ngoài</b>: dung lượng lớn nhưng to, nặng. <b>Đám mây</b>: truy cập từ xa nhưng cần Internet, có thể bị tấn công."},
  saoluu:{type:"sort", label:"Đọc hiểu – Sao lưu cục bộ hay từ xa?",
    q:"Đọc mục a) Sao lưu dữ liệu. Mỗi cách làm dưới đây là sao lưu cục bộ hay sao lưu từ xa?",
    cats:["Sao lưu cục bộ","Sao lưu từ xa"],
    items:[["Sao chép thư mục DuLich sang USB",0],["Tải thư mục DuLich lên Google Drive",1],["Sao chép ảnh sang ổ cứng ngoài",0],["Lưu bản sao trên OneDrive",1],["Ghi dữ liệu ra đĩa DVD cất trong tủ",0]],
    k:"<b>Cục bộ</b>: bản sao đặt cùng nơi với máy tính (USB, ổ cứng ngoài, đĩa) → phục hồi nhanh nhưng có thể mất cùng máy khi cháy, trộm. <b>Từ xa</b>: bản sao ở nơi khác (Internet, đám mây) → máy hỏng vẫn còn."},
  mk:{type:"sort", label:"Đọc hiểu – Mật khẩu mạnh hay yếu?",
    q:"Đọc mục b) Tài khoản người sử dụng và mật khẩu. Thử các mật khẩu trong bảng kiểm tra ở trên, rồi xếp mỗi mật khẩu vào nhóm phù hợp.",
    cats:["Mạnh","Yếu"],
    items:[["12345678",1],["Lan@Ha#2010",0],["matkhau",1],["Ha Noi",1],["Meo3Mau!xanh",0],["15062012 (ngày sinh)",1]],
    k:"Mật khẩu <b>mạnh</b>: dài ít nhất 8 kí tự, gồm <b>chữ số, chữ hoa, chữ thường, kí hiệu</b> (@, #,…), không phải thông tin cá nhân: Lan@Ha#2010, Meo3Mau!xanh. Các mật khẩu còn lại là dãy số, từ thông dụng, tên địa danh, ngày sinh → dễ đoán."},
  virus:{type:"mcq", label:"Đọc hiểu – Phần mềm diệt virus", q:"Đọc mục c) Phần mềm diệt virus. Để phần mềm diệt virus bảo vệ máy tính hiệu quả, em cần:",
    o:["Cài một lần rồi không cần quan tâm nữa.","Cài phần mềm diệt virus và thường xuyên cập nhật, luôn bật chế độ bảo vệ.","Tắt phần mềm diệt virus khi chạy phần mềm tải trên mạng.","Chỉ cần đặt mật khẩu mạnh là đủ."], a:1,
    k:"<b>B</b>. Virus mới xuất hiện liên tục nên phần mềm diệt virus phải được <b>cập nhật thường xuyên</b> và <b>luôn bật</b>. Không dùng phần mềm không rõ nguồn gốc. Windows có sẵn <b>Windows Defender</b>."},
  p16a:{type:"mcq", label:"Câu hỏi tr.16 – câu 1", q:"Mật khẩu nào sau đây là mạnh nhất?",
    o:["12345678.","AnMinhKhoa.","matkhau.","2n#M1nhKh0a."], a:3,
    k:"<b>D</b>. 2n#M1nhKh0a. có chữ số, chữ hoa, chữ thường và kí hiệu đặc biệt, dài hơn 8 kí tự."},
  p16b:{type:"sort", label:"Câu hỏi tr.16 – câu 2", q:"Mỗi phát biểu dưới đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["A. Lưu trữ bằng công nghệ đám mây có thể tránh được rơi, mất, hỏng dữ liệu.",0],["B. Lưu trữ bằng đĩa CD cần phải có đầu ghi đĩa nhưng dung lượng rất lớn.",1],["C. Lưu trữ bằng ổ cứng ngoài vừa nhỏ gọn vừa có dung lượng lớn.",1],["D. Lưu trữ bằng thẻ nhớ, USB dễ bị rơi, mất dữ liệu nhưng thuận tiện.",0]],
    k:"Phát biểu <b>sai</b>: <b>B</b> (đĩa CD dung lượng <b>nhỏ</b>) và <b>C</b> (ổ cứng ngoài <b>to, nặng</b>, khó mang theo)."},
  nv1:{type:"order", label:"Thực hành – Tạo thư mục", q:"Sắp xếp các bước tạo thư mục DuLich trong File Explorer (dùng nút ↑ ↓).",
    items:{a:"Gõ tên mới DuLich.",b:"Nháy nút phải chuột trên vùng trống, chọn New/Folder.",c:"Nhấn phím Enter.",d:"Mở File Explorer, vào nơi muốn tạo thư mục."},
    start:["a","b","c","d"], ans:["d","b","a","c"],
    k:"Thứ tự: <b>d → b → a → c</b>. Thư mục mới có tên New Folder, em gõ tên mới rồi nhấn Enter."},
  lenh:{type:"sort", label:"Thực hành – Chọn lệnh", q:"Quan sát Hình 3.6. Để thực hiện mỗi thao tác dưới đây em dùng lệnh nào?",
    cats:["Rename","Cut rồi Paste","Copy rồi Paste","Delete"],
    items:[["Đổi tên thư mục HoangHon thành ChieuToi",0],["Di chuyển các tệp của BinhMinh sang BanNgay",1],["Tạo thêm một bản của ảnh PhaoHoa01.jpg ở thư mục GiaDinh",2],["Xoá thư mục BinhMinh",3]],
    k:"Đổi tên: <b>Rename</b>. Di chuyển: <b>Cut</b> rồi <b>Paste</b>. Sao chép: <b>Copy</b> rồi <b>Paste</b>. Xoá: <b>Delete</b>. Cut và Copy đều đưa đối tượng vào bộ nhớ; Paste dán ra chỗ mới."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả nhiệm vụ thực hành (làm trên máy tính hoặc trên bảng mô phỏng): sau khi thực hiện, thư mục DiemDen gồm những gì? Thư mục BanNgay gồm những gì?",
    k:"DiemDen gồm: <b>BanNgay</b>, <b>ChieuToi</b>, PhaoHoa01.jpg, PhaoHoa02.jpg (không còn BinhMinh và HoangHon). BanNgay chứa thêm các tệp và thư mục con chuyển từ BinhMinh sang."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Đâu là chương trình máy tính giúp em quản lí tệp và thư mục?",
    o:["Internet Explorer.","Help.","Microsoft Word.","File Explorer."], a:3,
    k:"<b>D</b>. <b>File Explorer</b> là ứng dụng quản lí tệp trong Windows 10 (Windows 7 trở về trước gọi là Windows Explorer)."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Đâu là phần mềm có thể bảo vệ máy tính tránh được virus?",
    o:["Windows Defender.","Mozilla Firefox.","Microsoft Windows.","Microsoft Word."], a:0,
    k:"<b>A</b>. <b>Windows Defender</b> là phần mềm diệt virus có sẵn trong Windows. Firefox là trình duyệt web, Windows là hệ điều hành, Word là phần mềm soạn thảo."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Em hãy lựa chọn một thiết bị lưu trữ để sao lưu thư mục “DuLich”. Giải thích tại sao em lựa chọn cách sao lưu đó.",
    k:"Ví dụ: ảnh du lịch nhiều, dung lượng lớn → chọn <b>ổ cứng ngoài</b> (dung lượng lớn, dùng lâu) hoặc <b>lưu trữ đám mây</b> (máy hỏng vẫn còn, xem được ở mọi nơi có Internet). Có thể kết hợp cả hai để an toàn hơn."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Sau khi học xong bài này và có thêm các kiến thức về sao lưu, bảo vệ dữ liệu, em có thay đổi cách bảo vệ dữ liệu mà em đã chọn trong Hoạt động 2 không? Tại sao?",
    k:"Học sinh tự trả lời. Câu trả lời tốt nêu được: kết hợp nhiều biện pháp (<b>sao lưu thường xuyên</b> + <b>mật khẩu mạnh</b> + <b>phần mềm diệt virus</b> luôn cập nhật), vì mỗi biện pháp chống một loại rủi ro."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Tên tệp và thư mục cần đặt sao cho <b>dễ nhớ</b>, cho biết trong đó <b>chứa gì</b>. Điều đó giúp công việc thuận lợi hơn.</li><li>Chương trình máy tính được lưu trữ trên thiết bị nhớ giống như một <b>tệp dữ liệu</b>. Tệp chương trình trong Windows thường có phần mở rộng <b>.exe, .com, .bat, .msi</b>.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Dữ liệu cần được <b>sao lưu thường xuyên</b> lên thiết bị lưu trữ ngoài máy tính chứa dữ liệu gốc để tránh bị mất hoặc hỏng dữ liệu.</li><li>Đặt <b>mật khẩu</b> cho tài khoản trên máy tính và trên Internet giúp dữ liệu khỏi bị truy cập trái phép.</li><li>Không dùng phần mềm không rõ nguồn gốc; luôn bật chế độ bảo vệ của <b>phần mềm diệt virus</b>.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Tạo thư mục: nháy phải chuột → <b>New/Folder</b> → gõ tên → Enter.</li><li>Đổi tên: <b>Rename</b>. Di chuyển: <b>Cut</b> + <b>Paste</b>. Sao chép: <b>Copy</b> + <b>Paste</b>. Xoá: <b>Delete</b>.</li><li>Làm tương tự với tệp.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Sắp xếp dữ liệu theo <b>cây thư mục</b> → dễ tìm, dễ truy cập.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tên tệp và thư mục</p><ul>'
    + "<li>Đặt tên <b>dễ nhớ</b>, cho biết <b>chứa gì</b>. VD: DuLich, PhaoHoa01.jpg.</li>"
    + "<li>Chương trình cũng là <b>tệp</b>: .exe, .com, .bat, .msi → không tự ý xoá, di chuyển.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Bảo vệ dữ liệu</p><ul>'
    + "<li><b>Sao lưu</b> thường xuyên: cục bộ (USB, ổ cứng ngoài) hoặc từ xa (đám mây).</li>"
    + "<li><b>Mật khẩu mạnh</b>: ≥ 8 kí tự, có số, chữ hoa, chữ thường, kí hiệu.</li>"
    + "<li><b>Phần mềm diệt virus</b>: luôn bật, thường xuyên cập nhật.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành (File Explorer)</p><ul>'
    + "<li>Tạo thư mục: nháy phải → <b>New/Folder</b>.</li>"
    + "<li>Đổi tên: <b>Rename</b>; di chuyển: <b>Cut → Paste</b>; sao chép: <b>Copy → Paste</b>; xoá: <b>Delete</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Quản lí tệp: <b>File Explorer</b>. Diệt virus: <b>Windows Defender</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Kết hợp <b>sao lưu + mật khẩu + diệt virus</b> để dữ liệu an toàn nhất.</li>"
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
    return ["T7B3." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Cây thư mục rõ ràng, tên dễ hiểu."],
        fix:["Tên thư mục đã cho biết bên trong chứa gì chưa?"]},
  ten: {ok:["Nhóm nhận ra đúng tên hợp lí."],
        fix:["Nhìn tên, em có đoán được bên trong chứa gì không?"]},
  p14a:{ok:["Chính xác! Tên dễ nhớ, biết chứa gì."],
        fix:["Đặt tên thế nào thì lần sau tìm nhanh nhất?"]},
  p14b:{ok:["Chính xác! .exe là tệp chương trình."],
        fix:["Em đọc lại đoạn về chương trình máy tính ở trang 13."]},
  hd2: {ok:["Em nêu được cách bảo vệ và lí do hợp lí."],
        fix:["Nếu máy hỏng, bị người lạ dùng, bị virus thì em làm gì?"]},
  bang:{ok:["Nhóm đọc Bảng 3.1 rất kĩ."],
        fix:["Em đối chiếu lại cột Ưu điểm, Nhược điểm của Bảng 3.1."]},
  saoluu:{ok:["Phân biệt đúng sao lưu cục bộ và từ xa."],
        fix:["Bản sao nằm gần máy tính hay ở nơi khác (qua Internet)?"]},
  mk:  {ok:["Nhận ra đúng mật khẩu mạnh."],
        fix:["Mật khẩu mạnh cần có đủ chữ số, chữ hoa, chữ thường, kí hiệu."]},
  virus:{ok:["Chính xác! Cập nhật thường xuyên, luôn bật."],
        fix:["Virus mới xuất hiện hằng ngày. Phần mềm cũ có nhận ra không?"]},
  p16a:{ok:["Chính xác! D là mật khẩu mạnh nhất."],
        fix:["Mật khẩu nào có đủ số, chữ hoa, chữ thường, kí hiệu?"]},
  p16b:{ok:["Chính xác! B và C sai."],
        fix:["Đĩa CD dung lượng lớn hay nhỏ? Ổ cứng ngoài có nhỏ gọn không?"]},
  nv1: {ok:["Đúng thứ tự các bước tạo thư mục."],
        fix:["Phải tạo thư mục (New/Folder) trước rồi mới gõ tên."]},
  lenh:{ok:["Chọn đúng lệnh cho từng thao tác."],
        fix:["Di chuyển thì bản cũ mất (Cut); sao chép thì bản cũ còn (Copy)."]},
  nvkq:{ok:["Kết quả đúng yêu cầu nhiệm vụ."],
        fix:["Em kiểm tra: BinhMinh đã xoá chưa? HoangHon đã đổi tên chưa?"]},
  lt1: {ok:["Chính xác! File Explorer."],
        fix:["Chương trình nào mở ra các thư mục, tệp trong máy?"]},
  lt2: {ok:["Chính xác! Windows Defender."],
        fix:["Trong các phần mềm, cái nào là phần mềm diệt virus?"]},
  vd1: {ok:["Lựa chọn hợp lí, giải thích rõ."],
        fix:["Em nêu ưu điểm của thiết bị em chọn (xem Bảng 3.1)."]},
  vd2: {ok:["Em biết kết hợp nhiều biện pháp."],
        fix:["Em so sánh với câu trả lời Hoạt động 2 nhé."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  ten: "Tên tốt cho biết bên trong chứa gì.",
  bang: "Em đọc lại Bảng 3.1.",
  saoluu: "Cục bộ = cùng chỗ với máy tính; từ xa = qua Internet.",
  mk: "Thử lại trong bảng kiểm tra mật khẩu.",
  p16b: "Em đọc lại Bảng 3.1.",
  lenh: "Xem lại Hình 3.6."
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
    {title:"Hoạt động 1: Đặt tên thư mục", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Tên tệp và thư mục", acts:[
    {title:"Đọc hiểu: Đặt tên tệp, thư mục", tasks:["ten"], concept:"c1"},
    {title:"Câu hỏi SGK trang 14", tasks:["p14a","p14b"]},
    {title:"Ghi bài: Tên tệp và thư mục", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Bảo vệ dữ liệu", acts:[
    {title:"Hoạt động 2: Bảo vệ dữ liệu", tasks:["hd2"]},
    {title:"Đọc hiểu: Sao lưu dữ liệu", tasks:["bang","saoluu"]},
    {title:"Đọc hiểu: Mật khẩu, phần mềm diệt virus", tasks:["mk","virus"], concept:"c2"},
    {title:"Câu hỏi SGK trang 16", tasks:["p16a","p16b"]},
    {title:"Ghi bài: Bảo vệ dữ liệu", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Thực hành trên cây thư mục", tasks:["nv1","lenh","nvkq"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Sao lưu thư mục DuLich", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai3", title: "Bài 3. Quản lí dữ liệu trong máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhầm Cut với Copy nên thư mục BinhMinh vẫn còn tệp…",
  commentPh: "Ví dụ: Nhóm đổi tên đúng; cần dùng Cut thay vì Copy khi di chuyển."};
})();
