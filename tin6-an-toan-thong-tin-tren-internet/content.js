/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const DS = ["Đúng","Sai"];
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Bạn Minh đã gặp rắc rối gì?",
    k:"Minh tải trò chơi trên mạng, bỏ qua cảnh báo khi cài đặt → máy tính bị nhiễm <b>virus hoặc mã độc</b>, bị treo, mất các tệp ảnh."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Thảo luận nhóm: Tác hại và nguy cơ khi dùng Internet.",
    k:"Lộ, mất thông tin cá nhân; máy nhiễm virus; bị lừa đảo, dụ dỗ, đe doạ, bắt nạt; tiếp nhận thông tin không chính xác; nghiện Internet, trò chơi trên mạng."},
  nc:{type:"match", label:"Đọc hiểu – Tác hại, nguy cơ", q:"Mỗi tình huống dưới đây thể hiện tác hại, nguy cơ nào khi dùng Internet?",
    items:[["Kẻ xấu lấy được mật khẩu, dùng tài khoản của em để nhắn tin vay tiền",1],["Cài phần mềm lạ, máy tính chạy chậm, mất dữ liệu",2],["Một người lạ nhắn tin doạ đăng ảnh của em lên mạng",3],["Đọc tin “uống nước chanh chữa khỏi mọi bệnh” trên mạng và tin ngay",4],["Chơi trò chơi trên mạng đến khuya, bỏ bê việc học",5]],
    opts:["Thông tin cá nhân bị lộ hoặc bị đánh cắp","Máy tính bị nhiễm virus hay mã độc","Bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng","Tiếp nhận thông tin không chính xác","Nghiện Internet, nghiện trò chơi trên mạng"], ph:"Chọn tác hại…",
    k:"Năm tác hại, nguy cơ: lộ thông tin cá nhân; nhiễm virus, mã độc; lừa đảo, đe doạ, bắt nạt; thông tin không chính xác; nghiện Internet, trò chơi."},
  p38a:{type:"mcq", label:"Câu hỏi tr.38 – Câu 1", q:"Em hãy tìm phương án sai. Khi dùng Internet có thể:",
    o:["Bị lôi kéo vào các hoạt động không lành mạnh.","Máy tính bị nhiễm virus hoặc mã độc.","Tin tưởng mọi nguồn thông tin trên mạng.","Bị lừa đảo hoặc lợi dụng."], a:2,
    k:"<b>C</b> sai. Thông tin trên mạng có nhiều nguồn, có thông tin không được kiểm duyệt nên không thể tin tưởng mọi nguồn."},
  p38b:{type:"mcq", label:"Câu hỏi tr.38 – Câu 2", q:"Việc làm nào được khuyến khích khi sử dụng các dịch vụ trên Internet?",
    o:["Mở thư điện tử do người lạ gửi.","Tải các phần mềm miễn phí trên Internet không có kiểm duyệt.","Liên tục vào các trang xã hội để cập nhật thông tin.","Vào trang web tìm kiếm để tìm tư liệu làm bài tập về nhà."], a:3,
    k:"<b>D</b>. Dùng Internet để học tập là việc làm được khuyến khích."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Em đã từng sử dụng Internet chưa? Em đã bao giờ gặp phải một trong những nguy cơ như trên chưa? Nếu gặp phải, em sẽ làm gì?",
    k:"Học sinh chia sẻ; khi gặp nguy cơ: không làm theo, không trả lời, báo ngay cho bố mẹ, thầy cô."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Thảo luận nhóm: Em cần làm gì để phòng tránh những nguy cơ và tác hại có thể gặp phải khi sử dụng Internet?",
    k:"Thực hiện 5 quy tắc: <b>giữ an toàn</b> thông tin, <b>không gặp gỡ</b> người quen qua mạng, <b>đừng chấp nhận</b> thư, tin nhắn lạ, <b>kiểm tra độ tin cậy</b> của thông tin, <b>hãy nói ra</b> với người tin cậy."},
  qt:{type:"match", label:"Đọc hiểu – Năm quy tắc", q:"Ghép mỗi việc làm với quy tắc an toàn phù hợp.",
    items:[["Không đăng số điện thoại, địa chỉ nhà lên mạng xã hội",1],["Từ chối lời mời đi chơi của một bạn chỉ quen trên mạng",2],["Không mở thư điện tử từ người lạ, từ chối lời mời vào nhóm lạ",3],["Chỉ tìm thông tin ở trang của cơ quan, tổ chức uy tín",4],["Bị đe doạ trên mạng thì kể ngay với bố mẹ, thầy cô",5]],
    opts:["Giữ an toàn","Không gặp gỡ","Đừng chấp nhận","Kiểm tra độ tin cậy","Hãy nói ra"], ph:"Chọn quy tắc…",
    k:"Thông tin phải giữ <b>an toàn</b>; chớ nên <b>gặp gỡ</b> bạn vừa mới quen; không <b>chấp nhận</b> chớ có quên; tăng độ <b>tin cậy</b> điều nên giữ gìn; <b>nói ra</b> với người bạn tin; nắm <b>quy tắc</b> đó nên in vào lòng."},
  p39a:{type:"open", label:"Câu hỏi tr.39 – Câu 1", q:"Em có thể đưa ra một số giải pháp để giữ bí mật thông tin cá nhân không?",
    k:"Đặt mật khẩu mạnh, giữ bí mật mật khẩu; đăng xuất sau khi dùng; không chia sẻ thông tin cá nhân lên mạng; không kết bạn với người lạ; dùng phần mềm diệt virus."},
  p39b:{type:"open", label:"Câu hỏi tr.39 – Câu 2", q:"Trong 5 quy tắc trên, em thấy quy tắc nào quan trọng nhất? Tại sao?",
    k:"Học sinh chọn và giải thích hợp lí; ví dụ: “Hãy nói ra” vì người lớn sẽ giúp em xử lí khi gặp nguy hiểm."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Sau giờ thực hành, bạn Minh quên đăng xuất tài khoản thư điện tử và một người đã dùng tài khoản đó để gửi nội dung không hay cho những người khác. Theo em, điều gì có thể xảy ra với Minh?",
    k:"Minh bị hiểu lầm, mất uy tín, có thể bị bạn bè xa lánh, bị kỉ luật; thông tin cá nhân trong hộp thư bị lộ."},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Nếu thấy đường liên kết hoặc thư điện tử có chủ đề gây tò mò được gửi từ một người không quen biết thì em sẽ làm gì?",
    k:"Không mở liên kết, không mở thư và tệp đính kèm; xoá thư hoặc báo cho bố mẹ, thầy cô."},
  hd3c:{type:"open", label:"HĐ3 – Câu 3", q:"Em hãy nêu một vài cách để bảo vệ tài khoản thư điện tử.",
    k:"Đặt mật khẩu mạnh (dài, có chữ hoa, chữ thường, chữ số, kí tự đặc biệt); không cho người khác biết mật khẩu; đăng xuất khi dùng xong; không dùng máy tính công cộng để đăng nhập."},
  hd4a:{type:"open", label:"HĐ4 – Câu 1", q:"Một bạn quen trên mạng xin số điện thoại và địa chỉ của em để gặp nhau nói chuyện. Em có nên cho không? Tại sao?",
    k:"<b>Không</b>. Không biết người đó thực chất là ai; có thể là kẻ xấu lợi dụng để lừa đảo, đe doạ. Cần báo bố mẹ, thầy cô."},
  hd4b:{type:"open", label:"HĐ4 – Câu 2", q:"Em được một bạn gửi qua mạng cho một số thông tin không tốt về một bạn khác cùng lớp. Em có nên đăng lên mạng để mọi người cùng biết không?",
    k:"<b>Không</b>. Thông tin chưa kiểm chứng, có thể là tin giả; lan truyền sẽ làm tổn thương bạn. Nên báo thầy cô."},
  p41:{type:"mcq", label:"Câu hỏi tr.41", q:"Lời khuyên nào sai khi em muốn bảo vệ máy tính của mình?",
    o:["Đừng bao giờ mở thư điện tử và mở tệp đính kèm thư từ những người không quen biết.","Luôn nhớ đăng xuất khi sử dụng xong máy tính, thư điện tử.","Chẳng cần làm gì vì máy tính đã được cài đặt sẵn các thiết bị bảo vệ từ nhà sản xuất.","Nên cài đặt phần mềm bảo vệ máy tính khỏi virus và thường xuyên cập nhật phần mềm bảo vệ."], a:2,
    k:"<b>C</b> sai. Cần chủ động bảo vệ: cài và cập nhật phần mềm diệt virus, đăng xuất, không mở thư lạ."},
  lt1:{type:"sort", label:"Luyện tập – Câu 1", q:"Khi sử dụng Internet, những việc làm nào sau đây có thể khiến em gặp nguy cơ bị hại?",
    cats:["Có nguy cơ","An toàn"], items:[["A. Tải phần mềm, tệp miễn phí trên Internet.",0],["B. Mở liên kết được cung cấp trong thư điện tử không biết rõ nguồn gốc.",0],["C. Định kì thay đổi mật khẩu của tài khoản cá nhân trên mạng xã hội và thư điện tử.",1],["D. Khi có kẻ đe doạ mình trên mạng không cho bố mẹ hoặc thầy cô giáo biết.",0],["E. Làm theo các lời khuyên và bài hướng dẫn sử dụng thuốc trên mạng.",0]],
    k:"<b>A, B, D, E</b> có nguy cơ. C là việc làm giúp bảo vệ tài khoản."},
  lt2:{type:"sort", label:"Luyện tập – Câu 2", q:"Theo em, những tình huống nào sau đây là rủi ro khi sử dụng Internet?",
    cats:["Là rủi ro","Không phải"], items:[["A. Máy tính bị hỏng do nhiễm virus hoặc mã độc.",0],["B. Thông tin cá nhân hoặc tập thể bị đánh cắp.",0],["C. Tài khoản ngân hàng bị mất tiền.",0],["D. Bị bạn quen trên mạng lừa đảo.",0],["E. Nghiện mạng xã hội, nghiện trò chơi trên mạng.",0],["F. Hoàn thành chương trình học ngoại ngữ trực tuyến.",1]],
    k:"<b>A, B, C, D, E</b> là rủi ro. F là lợi ích của Internet."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy đưa ra một số cách nhận diện những trò lừa đảo trên Internet.",
    k:"Tin nhắn, thư hứa trúng thưởng, quà miễn phí, kiếm tiền dễ; yêu cầu cung cấp mật khẩu, mã OTP, thông tin cá nhân; giục “nháy chuột nhanh”; người lạ xin kết bạn, mời vào nhóm; địa chỉ trang web lạ, sai chính tả."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em sẽ làm gì khi phát hiện bạn bè hoặc người thân có nguy cơ bị hại khi truy cập mạng?",
    k:"Nhắc nhở, khuyên bạn dừng lại; giải thích nguy cơ; báo ngay cho bố mẹ, thầy cô hoặc người lớn tin cậy để được giúp đỡ."},
  vd3:{type:"open", label:"Vận dụng – Câu 3", q:"Em nên làm gì để bảo vệ thông tin và tài khoản cá nhân?",
    k:"Cài và cập nhật phần mềm chống virus; đặt mật khẩu mạnh, giữ bí mật; đăng xuất khi dùng xong; tránh dùng mạng công cộng; không truy cập liên kết lạ; không chia sẻ thông tin cá nhân; không lan truyền tin giả."}
};
const CONCEPTS = {
  c1:{t:"Tác hại, nguy cơ khi dùng Internet", b:"<ul><li>Thông tin cá nhân bị lộ hoặc bị đánh cắp.</li><li>Máy tính bị nhiễm virus hay mã độc.</li><li>Bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng.</li><li>Tiếp nhận thông tin không chính xác.</li><li>Nghiện Internet, nghiện trò chơi trên mạng.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<p>Thông tin phải giữ AN TOÀN<br>Chớ nên GẶP GỠ bạn vừa mới quen.<br>Không CHẤP NHẬN chớ có quên.<br>Tăng độ TIN CẬY điều nên giữ gìn.<br>NÓI RA với người bạn tin.<br>Nắm quy tắc đó nên in vào lòng.</p>"},
  c3:{t:"Một số biện pháp bảo vệ thông tin, tài khoản cá nhân và chia sẻ thông tin an toàn", b:"<ul><li>Cài đặt và cập nhật phần mềm chống virus.</li><li>Đặt mật khẩu mạnh. Bảo vệ mật khẩu.</li><li>Đăng xuất các tài khoản khi đã dùng xong.</li><li>Tránh dùng mạng công cộng.</li><li>Không truy cập vào các liên kết lạ; không mở thư điện tử và tệp đính kèm gửi từ những người không quen biết; không kết bạn và nhắn tin cho người lạ.</li><li>Không chia sẻ thông tin cá nhân và những thông tin chưa được kiểm chứng trên Internet; không lan truyền tin giả làm tổn thương người khác.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Cài phần mềm lạ, bỏ qua cảnh báo → máy nhiễm <b>virus</b>, mất dữ liệu.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tác hại và nguy cơ khi dùng Internet</p><ul><li>Lộ <b>thông tin cá nhân</b>; nhiễm <b>virus</b>; bị <b>lừa đảo, bắt nạt</b>.</li><li>Tin <b>không chính xác</b>; <b>nghiện</b> Internet, trò chơi.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Năm quy tắc an toàn</p><ul><li><b>Giữ an toàn – Không gặp gỡ – Đừng chấp nhận – Kiểm tra độ tin cậy – Hãy nói ra</b>.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. An toàn thông tin</p><ul><li><b>Mật khẩu mạnh</b>, giữ bí mật; <b>đăng xuất</b> khi dùng xong; cài <b>phần mềm chống virus</b>.</li><li>Không mở liên kết, thư <b>lạ</b>; chỉ chia sẻ với người <b>biết rõ</b>; không lan truyền <b>tin giả</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Gặp nguy cơ → <b>không giấu</b>, báo bố mẹ, thầy cô.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Dấu hiệu lừa đảo: hứa <b>quà, tiền, trúng thưởng</b>; đòi <b>mật khẩu, mã OTP</b>.</li></ul>'}
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
    return ["T6B9." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {};

const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
const SORT_HINT = {};
TASK_IDS.forEach(id => { if (!NX_MAU[id]) NX_MAU[id] = {ok:["Đúng, rất tốt!"], fix:["Em xem lại phần chốt nhé."]}; });

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
 {
  "id": "mo-dau",
  "code": "1",
  "step": "Bước 1",
  "title": "Khởi động",
  "acts": [
   {
    "title": "Máy tính của Minh",
    "tasks": [
     "hd1a"
    ]
   },
   {
    "title": "Ghi bài",
    "tasks": [],
    "concept": "g1",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-1",
  "code": "2.1",
  "step": "Bước 2 · Hình thành kiến thức mới",
  "title": "Tác hại và nguy cơ khi sử dụng Internet",
  "acts": [
   {
    "title": "Hoạt động 1: Tác hại và nguy cơ",
    "tasks": [
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Năm tác hại, nguy cơ",
    "tasks": [
     "nc"
    ],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 38",
    "tasks": [
     "p38a",
     "p38b"
    ]
   },
   {
    "title": "Ghi bài: Tác hại và nguy cơ khi dùng Internet",
    "tasks": [],
    "concept": "g2",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-2",
  "code": "2.2",
  "step": "Bước 2 · Hình thành kiến thức mới",
  "title": "Một số quy tắc an toàn khi sử dụng Internet",
  "acts": [
   {
    "title": "Hoạt động 2: Quy tắc an toàn",
    "tasks": [
     "hd2a",
     "hd2b"
    ]
   },
   {
    "title": "Đọc hiểu: Năm quy tắc an toàn",
    "tasks": [
     "qt"
    ],
    "concept": "c2"
   },
   {
    "title": "Câu hỏi: SGK trang 39",
    "tasks": [
     "p39a",
     "p39b"
    ]
   },
   {
    "title": "Ghi bài: Một số quy tắc an toàn khi sử dụng Internet",
    "tasks": [],
    "concept": "g3",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-3",
  "code": "2.3",
  "step": "Bước 2 · Hình thành kiến thức mới",
  "title": "An toàn thông tin",
  "acts": [
   {
    "title": "Hoạt động 3: Bảo vệ thông tin cá nhân",
    "tasks": [
     "hd3a",
     "hd3b",
     "hd3c"
    ]
   },
   {
    "title": "Đọc hiểu: Bảo vệ thông tin và tài khoản",
    "tasks": []
   },
   {
    "title": "Hoạt động 4: Chia sẻ thông tin an toàn",
    "tasks": [
     "hd4a",
     "hd4b"
    ],
    "concept": "c3"
   },
   {
    "title": "Câu hỏi: SGK trang 41",
    "tasks": [
     "p41"
    ]
   },
   {
    "title": "Ghi bài: An toàn thông tin",
    "tasks": [],
    "concept": "g4",
    "ghi": true
   }
  ]
 },
 {
  "id": "luyen-tap",
  "code": "3",
  "step": "Bước 3",
  "title": "Luyện tập",
  "acts": [
   {
    "title": "Nhận diện nguy cơ",
    "tasks": [
     "lt1",
     "lt2"
    ]
   },
   {
    "title": "Ghi bài",
    "tasks": [],
    "concept": "g5",
    "ghi": true
   }
  ]
 },
 {
  "id": "van-dung",
  "code": "4",
  "step": "Bước 4",
  "title": "Vận dụng",
  "acts": [
   {
    "title": "Tự bảo vệ trên mạng",
    "tasks": [
     "vd1",
     "vd2",
     "vd3"
    ]
   },
   {
    "title": "Ghi bài",
    "tasks": [],
    "concept": "g6",
    "ghi": true
   }
  ]
 }
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin6-bai9", title: "Bài 9. An toàn thông tin trên Internet", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhận diện đúng 4 tình huống nguy cơ…",
  commentPh: "Ví dụ: Nhóm nêu đủ 5 quy tắc; cần nêu cách đặt mật khẩu mạnh."};
})();
