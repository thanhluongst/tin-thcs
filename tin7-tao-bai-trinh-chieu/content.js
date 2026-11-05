/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Đọc đoạn hội thoại của An, Minh và Khoa. Để báo cáo kết quả dự án Trường học xanh, nhóm sẽ dùng phần mềm nào? Theo các bạn, bài trình chiếu báo cáo cần có những gì?",
    k:"Dùng <b>phần mềm trình chiếu</b>. Bài trình chiếu cần có <b>trang tiêu đề</b>, mỗi trang nội dung có <b>tiêu đề trang</b>, nội dung trình bày theo <b>cấu trúc phân cấp</b> để mạch lạc, rõ ràng."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Em đã biết gì về phần mềm trình chiếu?",
    k:"Ví dụ: Microsoft PowerPoint, Google Slides; dùng để tạo các trang chiếu có chữ, hình ảnh, âm thanh, video; trình chiếu lên màn hình hoặc máy chiếu; có hiệu ứng động."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Khi tạo một bài trình bày với nội dung gồm văn bản, hình ảnh và nhiều đối tượng khác, em chọn phần mềm nào?",
    o:["Phần mềm soạn thảo văn bản, vì có nhiều công cụ xử lí văn bản.","Phần mềm trình chiếu, vì trình bày thông tin dưới dạng các trang chiếu cô đọng, hấp dẫn, có hiệu ứng và trình chiếu được lên màn hình.","Phần mềm bảng tính.","Không cần phần mềm."], a:1,
    k:"<b>Phần mềm trình chiếu</b>: thông tin được trình bày ngắn gọn trên từng trang chiếu, kết hợp văn bản, hình ảnh, âm thanh, video, hiệu ứng động và chiếu lên màn hình rộng cho nhiều người xem."},
  p56:{type:"sort", label:"Câu hỏi tr.56", q:"Trong các phát biểu sau, phát biểu nào đúng, phát biểu nào sai?",
    cats:["Đúng","Sai"],
    items:[["a) Phần mềm trình chiếu thường được sử dụng để tạo bài trình chiếu phục vụ hội nghị, dạy học, quảng cáo,…",0],["b) Phần mềm trình chiếu có chức năng tạo bài trình chiếu và lưu dưới dạng tệp.",0],["c) Có thể nhập và xử lí văn bản, hình ảnh trên các trang chiếu.",0],["d) Chức năng chính của phần mềm trình chiếu là tính toán tự động.",1]],
    k:"a, b, c <b>đúng</b>. d <b>sai</b>: tính toán tự động là chức năng của phần mềm bảng tính. Hai chức năng cơ bản của phần mềm trình chiếu là <b>tạo bài trình chiếu</b> và <b>trình chiếu</b>."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Khi tạo bài trình chiếu, em thường trình bày các trang như thế nào?",
    k:"Trang đầu là <b>trang tiêu đề</b> (tên bài, tên tác giả, ngày, địa điểm); các trang sau là <b>trang nội dung</b>, mỗi trang có tiêu đề trang và nội dung; các trang thống nhất theo cùng một mẫu."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Theo em, tiêu đề của bài trình chiếu nên đặt ở trang nào? Muốn làm nổi bật nội dung của mỗi trang thì cần làm như thế nào?",
    k:"Tiêu đề bài trình chiếu đặt ở <b>trang đầu tiên</b> (trang tiêu đề). Mỗi trang nội dung có <b>tiêu đề trang</b> đặt ở trên đầu, viết dưới dạng văn bản, giúp làm nổi bật nội dung cần trình bày."},
  layout:{type:"sort", label:"Đọc hiểu – Trang và mẫu bố trí", q:"Đọc mục 2 (SGK trang 56). Mỗi mô tả dưới đây nói về thành phần nào?",
    cats:["Trang tiêu đề","Tiêu đề trang","Mẫu bố trí (layout)"],
    items:[["Trang đầu tiên, cho biết chủ đề của bài trình chiếu",0],["Có thể thêm tên tác giả, ngày, địa điểm trình bày",0],["Viết dưới dạng văn bản ở trên đầu mỗi trang nội dung",1],["Các cách bố trí nội dung có sẵn trong phần mềm, có thể thay đổi hoặc tự tạo",2]],
    k:"<b>Trang tiêu đề</b> (Title Slide): trang đầu, cho biết chủ đề, thu hút người nghe. <b>Tiêu đề trang</b>: ở trên đầu mỗi trang, làm nổi bật nội dung. <b>Mẫu bố trí</b> (layout): ví dụ Title and Content."},
  p57a:{type:"mcq", label:"Câu hỏi tr.57 – Tiêu đề", q:"Phát biểu nào sau đây không đúng?",
    o:["Trang tiêu đề là trang đầu tiên và cho biết chủ đề của bài trình chiếu.","Các trang nội dung của bài trình chiếu thường có tiêu đề trang.","Tiêu đề trang giúp làm nổi bật nội dung cần trình bày của trang.","Các phần mềm trình chiếu không có sẵn các mẫu bố trí."], a:3,
    k:"<b>D</b> không đúng: các phần mềm trình chiếu <b>có sẵn</b> các mẫu bố trí nội dung trang chiếu để thuận tiện cho người sử dụng."},
  hd3:{type:"mcq", label:"HĐ3 – Cấu trúc phân cấp", q:"Quan sát hai cách trình bày dự án Trường học xanh. Cách trình bày nào dễ hiểu hơn?",
    o:["Cách 1, vì các dòng đều ngang cấp nhau.","Cách 2, vì nội dung được chia thành các mục lớn, mục nhỏ lùi vào trong, thấy rõ cái nào thuộc cái nào.","Hai cách như nhau.","Không cách nào dễ hiểu."], a:1,
    k:"<b>Cách 2</b> là hình thức trình bày theo <b>cấu trúc phân cấp</b>: truyền tải thông tin mạch lạc, dễ hiểu, dễ quản lí; người xem dễ hiểu được bố cục nội dung."},
  p57b:{type:"mcq", label:"Câu hỏi tr.57 – Phân cấp", q:"Câu nào sau đây sai khi nói về cấu trúc phân cấp?",
    o:["Là cấu trúc gồm danh sách nhiều cấp.","Giúp làm cho nội dung cần trình bày có bố cục mạch lạc, dễ hiểu.","Cấu trúc này gồm một chuỗi các đầu dòng ngang cấp nhau.","Cấu trúc này được sử dụng nhiều trong soạn thảo văn bản, tạo bài trình chiếu."], a:2,
    k:"<b>C</b> sai: các đầu dòng ngang cấp nhau là Cách 1, không phải cấu trúc phân cấp."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước tạo bài trình chiếu Trường học xanh (dùng nút ↑ ↓).",
    items:{a:"Nháy New Slide, chọn Layout, nhập tiêu đề trang và nội dung.",b:"Khởi động phần mềm trình chiếu, nhập tiêu đề và phụ đề ở trang tiêu đề.",c:"Lưu bài với tên Truonghocxanh.pptx.",d:"Tạo cấu trúc phân cấp (Tab / Shift+Tab), đổi kí hiệu đầu dòng."},
    start:["a","b","c","d"], ans:["b","a","d","c"],
    k:"Thứ tự: <b>b → a → d → c</b>."},
  nv2:{type:"mcq", label:"Thực hành – Tăng, giảm cấp", q:"Để đưa dòng “Vai trò của cây xanh” thành mục con của “Ý tưởng”, em đặt con trỏ vào đầu dòng đó rồi:",
    o:["Nhấn Enter.","Chọn Increase List Level hoặc nhấn phím Tab.","Nhấn Shift+Tab.","Nhấn Delete."], a:1,
    k:"<b>Increase List Level</b> (phím <b>Tab</b>) tăng bậc phân cấp: dòng dịch sang phải, cỡ chữ giảm. <b>Decrease List Level</b> (<b>Shift+Tab</b>) giảm bậc phân cấp."},
  nv3:{type:"mcq", label:"Thực hành – Kí hiệu đầu dòng", q:"Muốn đổi kí hiệu đầu dòng chấm tròn thành mũi tên ➢ màu đỏ, em:",
    o:["Home → mũi tên bên phải lệnh Bullets → Bullets and Numbering… → chọn kí hiệu ở Bulleted, chọn Color → OK.","Insert → Picture.","Design → Themes.","Nhấn phím Tab."], a:0,
    k:"Mở hộp thoại <b>Bullets and Numbering</b>: <b>Bulleted</b> để đổi kí hiệu, <b>Numbered</b> để đánh số thứ tự, <b>Color</b> để đổi màu."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: bài trình chiếu của nhóm có mấy trang? Trang nội dung có mấy cấp? Em đã dùng những kí hiệu đầu dòng nào cho mỗi cấp?",
    k:"Ví dụ: 2 trang (trang tiêu đề “DỰ ÁN TRƯỜNG HỌC XANH”, trang “Nội dung trình bày”); 3 cấp: Ý tưởng, Kế hoạch, Kết luận (cấp 1); Vai trò của cây xanh, Đề xuất dự án, Khảo sát, Thực hiện, Kết quả dự kiến (cấp 2); Phân công, Thời gian (cấp 3); cấp 1 ■ đỏ, cấp 2 ➢, cấp 3 ✓."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Ưu điểm của việc sử dụng cấu trúc phân cấp trong bài trình chiếu là gì?",
    k:"Nội dung có <b>bố cục mạch lạc, dễ hiểu</b>; người xem thấy rõ mục lớn, mục nhỏ; giúp <b>truyền tải thông tin</b> và <b>quản lí nội dung</b> tốt hơn."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy tạo trang chiếu ghi các công việc cần làm trong ngày và sử dụng cấu trúc phân cấp để trình bày nội dung (làm trên bảng mô phỏng ở phần Vận dụng hoặc trên máy). Ghi lại các mục cấp 1 em đã dùng.",
    k:"Ví dụ: Buổi sáng (cấp 1) → Đi học, Học Tin học (cấp 2); Buổi chiều → Làm bài tập, Chơi thể thao; Buổi tối → Giúp mẹ việc nhà, Đọc sách."},
  vd1:{type:"open", label:"Vận dụng", q:"Đề xuất một dự án thiết thực (ví dụ: Làm sạch đẹp cảnh quan ngôi nhà của em; Trang trí thư viện của trường; Tái chế rác thải;…). Tạo bài trình chiếu trình bày dự án đó (mục tiêu, cách làm, tác dụng, hiệu ứng,…) có trang tiêu đề, các trang nội dung có tiêu đề trang và dùng cấu trúc phân cấp. Lưu với tên Baitaptinhoc7.pptx. Mô tả ngắn bài của em.",
    k:"Học sinh tự làm. Bài tốt có: trang tiêu đề (tên dự án, người thực hiện); 2–4 trang nội dung có tiêu đề trang (Mục tiêu, Cách làm, Tác dụng,…); nội dung phân cấp rõ ràng, kí hiệu đầu dòng phù hợp."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Phần mềm trình chiếu có hai chức năng cơ bản là <b>tạo bài trình chiếu</b> và <b>trình chiếu</b> nó.</li><li>Phần mềm trình chiếu có các <b>hiệu ứng</b> làm cho nội dung trình bày thêm sinh động và hấp dẫn.</li><li>Phần mềm trình chiếu thường được sử dụng để tạo bài trình chiếu phục vụ hội thảo, hội nghị, dạy học, quảng cáo,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Bài trình chiếu thường có trang đầu tiên là <b>trang tiêu đề</b> cho biết chủ đề của bài trình bày, tiếp theo là các <b>trang nội dung</b>.</li><li><b>Tiêu đề trang</b> làm nổi bật nội dung cần trình bày trong trang và được đặt trên đầu các trang nội dung.</li><li>Các phần mềm trình chiếu có sẵn các <b>mẫu bố trí</b> nội dung trang chiếu để thuận tiện cho người sử dụng.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li><b>Cấu trúc phân cấp</b> (hay danh sách kí hiệu đầu dòng nhiều cấp) thường được dùng trong soạn thảo văn bản, tạo bài trình chiếu,… Đây là một công cụ giúp làm cho nội dung trình bày có bố cục mạch lạc, dễ hiểu, giúp truyền tải thông tin và quản lí nội dung tốt hơn.</li></ul>"},
  c4:{t:"Ghi nhớ", b:"<ul><li>Trang mới: <b>New Slide</b>; mẫu bố trí: <b>Layout</b>.</li><li>Tăng cấp: <b>Increase List Level</b> (Tab); giảm cấp: <b>Decrease List Level</b> (Shift+Tab).</li><li>Đổi kí hiệu, màu: <b>Bullets and Numbering</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Báo cáo dự án → dùng <b>phần mềm trình chiếu</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Chức năng của phần mềm trình chiếu</p><ul>'
    + "<li>Hai chức năng cơ bản: <b>tạo bài trình chiếu</b> và <b>trình chiếu</b>.</li>"
    + "<li>Có <b>hiệu ứng</b>; dùng cho hội thảo, dạy học, quảng cáo,…</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Tiêu đề của bài trình chiếu</p><ul>'
    + "<li>Trang đầu: <b>trang tiêu đề</b>; sau đó là các <b>trang nội dung</b>.</li>"
    + "<li><b>Tiêu đề trang</b> ở trên đầu trang, làm nổi bật nội dung.</li>"
    + "<li>Có sẵn <b>mẫu bố trí</b> (layout).</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Cấu trúc phân cấp</p><ul>'
    + "<li>= danh sách đầu dòng <b>nhiều cấp</b> → <b>mạch lạc, dễ hiểu</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">4. Thực hành</p><ul>'
    + "<li>Trang mới: <b>New Slide</b>; bố trí: <b>Layout</b>.</li>"
    + "<li>Tăng cấp: <b>Tab</b>; giảm cấp: <b>Shift+Tab</b>.</li>"
    + "<li>Đổi kí hiệu, màu: <b>Bullets and Numbering</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Phân cấp giúp nội dung <b>mạch lạc</b>, dễ <b>quản lí</b>.</li>"
    + "</ul>"},
  g7:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Bài trình chiếu: <b>trang tiêu đề</b> + <b>trang nội dung có tiêu đề</b> + <b>phân cấp</b>.</li>"
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
    return ["T7B11." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Đúng! Phần mềm trình chiếu."],
        fix:["Đọc lại lời của Minh và Khoa trong đoạn hội thoại."]},
  hd1a:{ok:["Em nhớ tốt kiến thức lớp 3, lớp 4."],
        fix:["Em đã dùng phần mềm nào để trình chiếu chưa?"]},
  hd1b:{ok:["Chính xác!"],
        fix:["Phần mềm nào chiếu được lên màn hình, có hiệu ứng?"]},
  p56: {ok:["Chính xác! Chỉ d sai."],
        fix:["Tính toán tự động là chức năng của phần mềm nào?"]},
  hd2a:{ok:["Trình bày rõ trang tiêu đề và trang nội dung."],
        fix:["Trang đầu tiên thường là trang gì?"]},
  hd2b:{ok:["Đúng!"],
        fix:["Tiêu đề trang đặt ở vị trí nào của trang?"]},
  layout:{ok:["Phân biệt đúng các thành phần."],
        fix:["Đọc lại mục 2, trang 56."]},
  p57a:{ok:["Chính xác! D không đúng."],
        fix:["Phần mềm trình chiếu có sẵn mẫu bố trí không?"]},
  hd3: {ok:["Chính xác! Cách 2 phân cấp rõ ràng."],
        fix:["Ở cách nào em thấy rõ mục nào thuộc mục nào?"]},
  p57b:{ok:["Chính xác! C sai."],
        fix:["Các đầu dòng ngang cấp nhau có phải là phân cấp không?"]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải nhập nội dung trước rồi mới tạo phân cấp."]},
  nv2: {ok:["Chính xác! Tab."],
        fix:["Lệnh nào làm dòng dịch sang phải?"]},
  nv3: {ok:["Chính xác!"],
        fix:["Kí hiệu đầu dòng đổi trong hộp thoại Bullets and Numbering."]},
  nvkq:{ok:["Bài trình chiếu đúng mẫu, phân cấp rõ."],
        fix:["Em kiểm tra các dòng Phân công, Thời gian đã ở cấp 3 chưa."]},
  lt1: {ok:["Nêu đúng ưu điểm."],
        fix:["So sánh Cách 1 và Cách 2 ở Hoạt động 3."]},
  lt2: {ok:["Trang chiếu phân cấp hợp lí."],
        fix:["Em chia công việc theo buổi rồi đưa việc nhỏ vào cấp 2."]},
  vd1: {ok:["Dự án thiết thực, trình bày rõ ràng."],
        fix:["Em bổ sung trang tiêu đề hoặc tiêu đề cho các trang nội dung."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  p56: "Chức năng chính của phần mềm trình chiếu là gì?",
  layout: "Đọc lại mục 2, trang 56."
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Báo cáo dự án Trường học xanh", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Chức năng phần mềm trình chiếu", acts:[
    {title:"Hoạt động 1: Chức năng cơ bản", tasks:["hd1a","hd1b"], concept:"c1"},
    {title:"Câu hỏi SGK trang 56", tasks:["p56"]},
    {title:"Ghi bài: Chức năng", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Tiêu đề bài trình chiếu", acts:[
    {title:"Hoạt động 2: Tạo tiêu đề", tasks:["hd2a","hd2b","layout"], concept:"c2"},
    {title:"Câu hỏi SGK trang 57", tasks:["p57a"]},
    {title:"Ghi bài: Tiêu đề", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Cấu trúc phân cấp", acts:[
    {title:"Hoạt động 3: Cấu trúc phân cấp", tasks:["hd3"], concept:"c3"},
    {title:"Câu hỏi SGK trang 57", tasks:["p57b"]},
    {title:"Ghi bài: Cấu trúc phân cấp", tasks:[], concept:"g4", ghi:true}]},
  {id:"phan-4", code:"2.4", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Bài trình chiếu Trường học xanh", tasks:["nv1","nv2","nv3","nvkq"], concept:"c4"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g5", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bài trình chiếu dự án của em", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g7", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai11", title: "Bài 11. Tạo bài trình chiếu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 để các dòng ngang cấp nên khó thấy mục nào thuộc mục nào…",
  commentPh: "Ví dụ: Bài có trang tiêu đề rõ ràng; cần đưa Phân công, Thời gian xuống cấp 3."};
})();
