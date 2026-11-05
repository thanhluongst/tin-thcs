/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Sau khi kết nối bàn phím, màn hình, chuột,… vào thân máy chứa bộ xử lí, máy tính đã hoạt động được chưa? Máy tính còn cần thêm gì để hoạt động và giúp em soạn văn bản, xem video, chơi trò chơi?",
    k:"Máy tính <b>vẫn chưa hoạt động được</b>. Máy tính còn cần có <b>phần mềm</b>:<ul><li>phần mềm quản lí và điều khiển máy tính là <b>hệ điều hành</b> (Operating System);</li><li>các phần mềm giúp em xử lí những loại dữ liệu cụ thể như văn bản, âm thanh, hình ảnh,… gọi chung là <b>phần mềm ứng dụng</b> (Application Software).</li></ul>"},
  hd1:{type:"sort", label:"HĐ1 – Chọn việc điều hành",
    q:"Trong dự án Sổ lưu niệm, bạn An đóng vai trò trưởng nhóm. Với mỗi công việc dưới đây, em chọn “Điều hành” nếu đó là việc thể hiện chức năng điều hành nhóm của bạn An (có đúng ba việc như vậy).",
    cats:["Điều hành","Không phải"],
    items:[["a) Mô tả nội dung sổ lưu niệm bằng phần mềm sơ đồ tư duy",1],["b) Quản lí công việc của cả nhóm, theo dõi thời gian thực hiện",0],["c) Định dạng và sắp xếp các đoạn văn bản trong sổ lưu niệm",1],["d) Phân công nhiệm vụ và kết nối các hoạt động của các thành viên",0],["e) Thiết kế bài giới thiệu sản phẩm bằng phần mềm trình chiếu",1],["f) Thay mặt cả nhóm, trao đổi thông tin với cô giáo và các nhóm khác",0]],
    k:"Ba việc điều hành là <b>b, d, f</b>. Bạn An không trực tiếp làm một phần việc cụ thể (a, c, e) mà <b>điều phối</b> công việc, <b>kết nối</b> các thành viên với nhau và kết nối nhóm với bên ngoài."},
  hd1b:{type:"open", label:"HĐ1 – So sánh", q:"Hệ điều hành trong máy tính giống với vai trò của bạn An trong nhóm ở điểm nào? Nếu máy tính không có hệ điều hành thì sẽ ra sao?",
    k:"Giống bạn An, hệ điều hành là phần mềm <b>đóng vai trò kết nối</b> giữa người sử dụng với khả năng xử lí của máy tính. Không có hệ điều hành, máy tính <b>chỉ là một khối kim loại và dây dẫn</b>, chẳng hoạt động gì."},
  hd1c:{type:"open", label:"Đọc hiểu – Chức năng", q:"Đọc SGK trang 10–11, em hãy nêu những chức năng cơ bản của hệ điều hành.",
    k:"<ul><li><b>Quản lí các thiết bị và dữ liệu</b> của máy tính, điều khiển chúng phối hợp hoạt động nhịp nhàng với nhau.</li><li>Cung cấp và quản lí <b>môi trường trao đổi thông tin (giao diện)</b> giữa người sử dụng và máy tính.</li><li>Cung cấp, quản lí <b>môi trường cho phép người sử dụng chạy các phần mềm ứng dụng</b> trên máy tính.</li></ul>"},
  p11a:{type:"mcq", label:"Câu hỏi tr.11 – câu 1", q:"Phần mềm nào sau đây KHÔNG phải là một hệ điều hành?", o:["Windows 7.","Windows 10.","Windows Explorer.","Windows Phone."], a:2,
    k:"<b>Windows Explorer</b> là phần mềm quản lí tệp và thư mục chạy trên Windows, không phải hệ điều hành. Windows 7, Windows 10 (máy tính) và Windows Phone (điện thoại) đều là hệ điều hành."},
  p11b:{type:"mcq", label:"Câu hỏi tr.11 – câu 2", q:"Chức năng nào sau đây KHÔNG phải của hệ điều hành?", o:["Quản lí các tệp dữ liệu trên đĩa.","Tạo và chỉnh sửa nội dung một tệp hình ảnh.","Điều khiển các thiết bị vào – ra.","Quản lí giao diện giữa người sử dụng và máy tính."], a:1,
    k:"<b>Tạo và chỉnh sửa tệp hình ảnh</b> là công việc cụ thể, do phần mềm ứng dụng (như Paint, Photoshop) thực hiện. Ba chức năng còn lại là của hệ điều hành."},
  hd2:{type:"match", label:"HĐ2 – Ghép loại tệp", ph:"Chọn…",
    q:"Em hãy ghép mỗi loại tệp với một phần mở rộng tệp phù hợp.",
    opts:["a) .jpg, .png, .bmp","b) .exe, .com, .bat, .msi","c) .sb, .sb2, .sb3","d) .ppt, .pptx","e) .htm, .html","f) .doc, .docx"],
    items:[["1) Tài liệu Word",6],["2) Chương trình viết bằng Scratch",3],["3) Hình ảnh",1],["4) Ứng dụng",2],["5) Trang web",5],["6) Bài trình bày PowerPoint",4]],
    k:"1 – f, 2 – c, 3 – a, 4 – b, 5 – e, 6 – d."},
  hd2b:{type:"open", label:"Đọc hiểu – Phần mở rộng", q:"Một tệp có tên đầy đủ là TapLamVan.doc. Phần mở rộng của tệp là gì? Phần mở rộng đó giúp hệ điều hành biết điều gì?",
    k:"Phần mở rộng là <b>.doc</b> (các kí tự sau dấu chấm cuối cùng trong tên tệp). Nhờ đó hệ điều hành biết đây là <b>tệp văn bản</b>, mở và chỉnh sửa được bằng <b>phần mềm soạn thảo văn bản Microsoft Word</b>."},
  p12a:{type:"sort", label:"Câu hỏi tr.12 – câu 1",
    q:"Em hãy chỉ ra những phần mềm ứng dụng trong các phương án sau: chọn “Ứng dụng” hoặc “Hệ điều hành” cho từng phần mềm.",
    cats:["Ứng dụng","Hệ điều hành"],
    items:[["A. Linux",1],["B. Gmail",0],["C. UnikeyNT",0],["D. Windows 8",1],["E. Zalo",0],["F. Windows Media Player",0]],
    k:"Phần mềm ứng dụng: <b>B. Gmail, C. UnikeyNT, E. Zalo, F. Windows Media Player</b>. Linux và Windows 8 là hệ điều hành."},
  p12b:{type:"sort", label:"Câu hỏi tr.12 – câu 2",
    q:"Loại tệp nào dưới đây có thể sử dụng được với Windows Media Player?",
    cats:["Dùng được","Không dùng được"],
    items:[["A. .mp3",0],["B. .jpg",1],["C. .avi",0],["D. .mp4",0],["E. .txt",1]],
    k:"Windows Media Player là phần mềm chơi nhạc, xem video nên dùng được với tệp âm thanh <b>.mp3</b> và tệp video <b>.avi, .mp4</b> (A, C, D). Tệp .jpg là hình ảnh, tệp .txt là văn bản."},
  sortCmp:{type:"sort", label:"Phân biệt HĐH và PMƯD",
    q:"Mỗi đặc điểm dưới đây là của hệ điều hành hay của phần mềm ứng dụng?",
    cats:["Hệ điều hành","Phần mềm ứng dụng"],
    items:[["Trực tiếp quản lí và vận hành phần cứng như bàn phím, chuột, màn hình, máy in,…",0],["Tương tác với phần cứng thông qua hệ điều hành",1],["Phải cài đặt đầu tiên để máy tính có thể hoạt động được",0],["Có thể cài đặt hoặc không, tuỳ theo yêu cầu của người sử dụng",1],["Tạo môi trường để cài đặt và chạy phần mềm khác",0],["Chạy trong môi trường hệ điều hành, phải chọn phiên bản phù hợp",1],["Windows, Linux, macOS, Android, iOS",0],["MS Word, Writer, MindMaple, MS Paint, Photoshop",1]],
    k:"Hệ điều hành <b>quản lí các thành phần của máy tính và điều khiển máy tính hoạt động</b>; phần mềm ứng dụng <b>thực hiện yêu cầu xử lí thông tin cụ thể</b> của người sử dụng và phải chạy trên hệ điều hành. Đối chiếu Bảng 2.1 (SGK trang 12)."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy nêu các chức năng của hệ điều hành.",
    k:"<ul><li>Quản lí các thiết bị và dữ liệu của máy tính, điều khiển chúng phối hợp hoạt động nhịp nhàng.</li><li>Cung cấp và quản lí môi trường trao đổi thông tin (giao diện) giữa người sử dụng và máy tính.</li><li>Cung cấp, quản lí môi trường cho phép người sử dụng chạy các phần mềm ứng dụng.</li></ul>"},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Phát biểu nào sau đây là SAI?", o:["Người sử dụng xử lí những yêu cầu cụ thể bằng phần mềm ứng dụng.","Để phần mềm ứng dụng chạy được trên máy tính phải có hệ điều hành.","Để máy tính hoạt động được phải có phần mềm ứng dụng.","Để máy tính hoạt động được phải có hệ điều hành."], a:2,
    k:"Phát biểu <b>C</b> sai. Máy tính chỉ cần có <b>hệ điều hành</b> là hoạt động được; phần mềm ứng dụng có thể cài hoặc không tuỳ theo yêu cầu của người sử dụng."},
  vd1:{type:"open", label:"Vận dụng", q:"Khi tải Scratch để cài đặt lên máy tính, tại sao cần phải chọn phiên bản phù hợp với hệ điều hành trên máy tính của em?",
    k:"Scratch là <b>phần mềm ứng dụng</b>, chỉ chạy được trong môi trường của hệ điều hành và tương tác với phần cứng <b>thông qua hệ điều hành</b>. Mỗi hệ điều hành (Windows, macOS, Linux,…) quản lí phần cứng và chạy phần mềm theo cách khác nhau, nên phải chọn bản Scratch viết cho đúng hệ điều hành (và đúng phiên bản, ví dụ Windows 10 hay Windows 7) thì mới cài đặt và chạy được."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Hệ điều hành</b> là phần mềm hệ thống quản lí và điều khiển hoạt động chung của máy tính, quản lí dữ liệu, cung cấp cho con người môi trường tương tác với máy tính và chạy các phần mềm ứng dụng.</li><li>Có những hệ điều hành dành cho máy tính như Windows, Mac OS, Linux,… và những hệ điều hành dành cho điện thoại thông minh và máy tính bảng như iOS, Android,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Phần mềm ứng dụng</b> là các chương trình máy tính cho phép người sử dụng thực hiện những công việc cụ thể và thường xử lí những loại dữ liệu cụ thể.</li><li>Loại tệp được nhận biết nhờ <b>phần mở rộng</b>, gồm những kí tự sau dấu chấm cuối cùng trong tên tệp. Loại tệp cũng cho biết phần mềm ứng dụng nào có thể được dùng với nó.</li><li>Phần mở rộng thường có tối đa ba kí tự, nhưng một số phần mềm ứng dụng cho phép phần mở rộng nhiều hơn, ví dụ .docx, .html.</li></ul>"},
  c3:{t:"Bảng 2.1", b:'<p><b>Phân biệt hệ điều hành và phần mềm ứng dụng</b></p><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Tiêu chí</th><th>Hệ điều hành</th><th>Phần mềm ứng dụng</th></tr></thead><tbody>'
    + "<tr><th>Tương tác với phần cứng</th><td>Trực tiếp quản lí và vận hành phần cứng như bàn phím, chuột, màn hình, máy in,…</td><td>Tương tác với phần cứng thông qua hệ điều hành.</td></tr>"
    + "<tr><th>Sự cần thiết</th><td>Phải cài đặt đầu tiên để máy tính có thể hoạt động được.</td><td>Có thể cài đặt hoặc không tuỳ theo yêu cầu của người sử dụng.</td></tr>"
    + "<tr><th>Phụ thuộc</th><td>Tạo môi trường để cài đặt và chạy phần mềm ứng dụng.</td><td>Chạy trong môi trường hệ điều hành. Được lựa chọn phù hợp với hệ điều hành.</td></tr>"
    + "<tr><th>Ví dụ</th><td>Windows, Linux, macOS,… (cho máy tính). Android, iOS,… (cho điện thoại thông minh hoặc máy tính bảng).</td><td>MindMaple, MindManager,… (sơ đồ tư duy); MS Word, Writer,… (soạn thảo văn bản); MS Paint, Draw, Photoshop (xử lí ảnh),…</td></tr>"
    + "</tbody></table></div>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Máy tính = <b>phần cứng</b> + <b>phần mềm</b>. Thiếu phần mềm, máy không hoạt động.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hệ điều hành</p><ul>'
    + "<li><b>Hệ điều hành</b>: phần mềm quản lí, điều khiển toàn bộ máy tính.</li>"
    + "<li>Chức năng: quản lí <b>thiết bị, dữ liệu</b>; tạo <b>giao diện</b>; cho <b>chạy phần mềm ứng dụng</b>.</li>"
    + "<li>VD: Windows, macOS, Linux (máy tính); Android, iOS (điện thoại).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Phần mềm ứng dụng</p><ul>'
    + "<li><b>Phần mềm ứng dụng</b>: giúp làm một việc cụ thể. VD: Word, Paint, Scratch, Zalo.</li>"
    + "<li><b>Phần mở rộng</b>: chữ sau dấu chấm cuối tên tệp → cho biết loại tệp.</li>"
    + "<li>VD: .docx (văn bản), .jpg (ảnh), .mp3 (nhạc), .mp4 (video), .sb3 (Scratch).</li>"
    + "<li>Hệ điều hành cài <b>trước</b>; phần mềm ứng dụng chạy <b>trên</b> hệ điều hành.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Máy tính chỉ cần <b>hệ điều hành</b> là chạy được (câu 2: đáp án C sai).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Tải phần mềm (Scratch) phải chọn bản <b>hợp với hệ điều hành</b> của máy.</li>"
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
    return ["T7B2." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Chính xác! Máy tính còn cần phần mềm, trước hết là hệ điều hành.","Tốt! Em đã phân biệt được hệ điều hành và phần mềm ứng dụng."],
        fix:["Chỉ có phần cứng thì máy tính đã hoạt động được chưa? Em nghĩ xem máy còn thiếu gì.","Em nêu thêm: phần mềm nào giúp em soạn văn bản, xem video?"]},
  hd1: {ok:["Nhóm chọn đúng ba việc điều hành: b, d, f. Rất tốt!"],
        fix:["Việc điều hành là việc điều phối, kết nối mọi người, không phải trực tiếp làm một phần sản phẩm. Em xem lại nhé."]},
  hd1b:{ok:["Đúng! Hệ điều hành kết nối người dùng với khả năng xử lí của máy tính, giống trưởng nhóm kết nối các thành viên.","Rất hay: không có hệ điều hành, máy tính chỉ là khối kim loại và dây dẫn."],
        fix:["Bạn An kết nối các thành viên với nhau và với bên ngoài. Trong máy tính, phần mềm nào làm việc kết nối như vậy?","Em trả lời thêm: nếu không có hệ điều hành thì máy tính ra sao?"]},
  hd1c:{ok:["Em nêu đủ ba chức năng của hệ điều hành. Rất tốt!"],
        fix:["Em còn thiếu chức năng. Gợi ý: quản lí thiết bị và dữ liệu; giao diện; môi trường chạy phần mềm ứng dụng.","Em diễn đạt lại theo ba ý: hệ điều hành quản lí gì, cung cấp gì cho người dùng, cho phần mềm khác?"]},
  p11a:{ok:["Chính xác! Windows Explorer là phần mềm quản lí tệp, không phải hệ điều hành."],
        fix:["Tên có chữ \"Windows\" chưa chắc đã là hệ điều hành. Phần mềm nào chỉ dùng để quản lí tệp và thư mục?"]},
  p11b:{ok:["Chính xác! Chỉnh sửa tệp hình ảnh là việc của phần mềm ứng dụng."],
        fix:["Việc nào là công việc cụ thể, xử lí một loại dữ liệu cụ thể? Việc đó do phần mềm ứng dụng làm."]},
  hd2: {ok:["Nhóm ghép đúng tất cả loại tệp. Rất tốt!"],
        fix:["Em nhớ lại tên tệp em đã gặp: bài Word thường là .docx, bài Scratch là .sb3, ảnh chụp là .jpg."]},
  hd2b:{ok:["Đúng! Phần mở rộng .doc cho biết đây là tệp văn bản, mở bằng Microsoft Word."],
        fix:["Phần mở rộng là những kí tự đứng sau dấu chấm cuối cùng trong tên tệp. Nó cho hệ điều hành biết điều gì?"]},
  p12a:{ok:["Nhóm phân biệt đúng hệ điều hành và phần mềm ứng dụng. Rất tốt!"],
        fix:["Linux và Windows 8 dùng để làm gì? Gmail, Zalo, Unikey giúp em làm việc cụ thể nào? Em xếp lại nhé."]},
  p12b:{ok:["Chính xác! Windows Media Player dùng với tệp âm thanh, video: .mp3, .avi, .mp4."],
        fix:["Windows Media Player là phần mềm nghe nhạc, xem video. Tệp nào là âm thanh, tệp nào là video?"]},
  sortCmp:{ok:["Nhóm phân biệt đúng các đặc điểm của hệ điều hành và phần mềm ứng dụng. Rất tốt!"],
        fix:["Em tự hỏi: đặc điểm này nói về phần mềm quản lí cả máy tính hay phần mềm làm một việc cụ thể?"]},
  lt1: {ok:["Em nêu đầy đủ, chính xác các chức năng của hệ điều hành."],
        fix:["Em còn thiếu chức năng. Nhớ ba ý: quản lí thiết bị và dữ liệu; giao diện; môi trường chạy phần mềm ứng dụng."]},
  lt2: {ok:["Chính xác! Máy tính chỉ cần hệ điều hành là hoạt động được, phần mềm ứng dụng cài hay không tuỳ người dùng."],
        fix:["Đề hỏi phát biểu SAI. Máy tính bắt buộc phải có hệ điều hành hay phần mềm ứng dụng mới hoạt động được?"]},
  vd1: {ok:["Lập luận rất tốt: Scratch là phần mềm ứng dụng, phải chạy trên hệ điều hành nên phải chọn bản phù hợp."],
        fix:["Scratch là hệ điều hành hay phần mềm ứng dụng? Nó chạy được nhờ phần mềm nào? Em giải thích thêm nhé."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  hd1: "Em xét lại: việc đó là trực tiếp làm một phần sản phẩm hay là điều phối, kết nối mọi người?",
  p12a: "Em xét lại: phần mềm đó quản lí cả máy tính hay giúp em làm một việc cụ thể?",
  p12b: "Em xét lại: tệp đó chứa âm thanh, video, hình ảnh hay văn bản?",
  sortCmp: "Em đối chiếu lại Bảng 2.1 (SGK trang 12)."
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
    return "Nhóm cần xem lại: " + wrong.map(x => x.name + (x.v ? " (nhóm chọn " + optShort(t, Number(x.v)) + ")" : " (chưa chọn)")).join("; ") + ". Gợi ý: nhớ lại tên các tệp em đã lưu khi soạn văn bản, lập trình Scratch, làm bài trình chiếu.";
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
    {title:"Máy tính cần gì để hoạt động?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hệ điều hành", acts:[
    {title:"Hoạt động 1: Điều hành", tasks:["hd1","hd1b"]},
    {title:"Đọc hiểu: Chức năng của hệ điều hành", tasks:["hd1c"], concept:"c1"},
    {title:"Câu hỏi SGK trang 11", tasks:["p11a","p11b"]},
    {title:"Ghi bài: Hệ điều hành", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Phần mềm ứng dụng", acts:[
    {title:"Hoạt động 2: Loại tệp và phần mở rộng", tasks:["hd2"]},
    {title:"Đọc hiểu: Phần mở rộng của tệp", tasks:["hd2b"], concept:"c2"},
    {title:"Câu hỏi SGK trang 12", tasks:["p12a","p12b"]},
    {title:"Thảo luận: Phân biệt HĐH và PMƯD", tasks:["sortCmp"], concept:"c3"},
    {title:"Ghi bài: Phần mềm ứng dụng", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 12", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Cài đặt Scratch", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai2", title: "Bài 2. Phần mềm máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhầm Windows Explorer là hệ điều hành vì…",
  commentPh: "Ví dụ: Nhóm đã nêu đúng chức năng quản lí thiết bị; cần bổ sung chức năng giao diện."};
})();
