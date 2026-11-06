/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Bạn An được giao nhiệm vụ tạo bài trình chiếu để trình chiếu trong lễ ra mắt CLB Tin học. Với mục tiêu ngắn gọn, ấn tượng, sáng tạo,… theo em bạn An cần chú ý đến những điều gì khi tạo bài trình chiếu?",
    k:"Văn bản <b>ngắn gọn</b>, chỉ nêu ý chính; <b>màu sắc hài hoà</b>, hợp với chủ đề; chữ <b>đủ lớn</b>, tương phản với nền; có <b>số trang</b>, chân trang (tên CLB, ngày trình bày); có thể dùng hình ảnh, mẫu định dạng."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Văn bản ở hình nào chi tiết, đầy đủ hơn? Văn bản ở hình nào ngắn gọn hơn?",
    o:["Hình 10a.1 chi tiết, đầy đủ hơn; Hình 10a.2 ngắn gọn hơn.","Hình 10a.2 chi tiết, đầy đủ hơn; Hình 10a.1 ngắn gọn hơn.","Hai hình chi tiết như nhau.","Hai hình ngắn gọn như nhau."], a:0,
    k:"Hình 10a.1 (văn bản trong tệp văn bản) viết thành câu <b>đầy đủ, chi tiết</b>; Hình 10a.2 (trên trang chiếu) chỉ ghi <b>ý chính, ngắn gọn</b>."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Văn bản trên trang chiếu có cần viết đầy đủ các thành phần của câu không?",
    o:["Không cần: chỉ nêu ý chính, ngắn gọn, súc tích.","Cần viết đầy đủ chủ ngữ, vị ngữ như văn bản thường.","Cần viết càng dài càng tốt.","Chỉ cần ghi tiêu đề, không cần nội dung."], a:0,
    k:"<b>Không cần.</b> Văn bản trên trang chiếu ngắn gọn, chỉ nêu ý chính; người trình bày sẽ nói thêm chi tiết."},
  mau:{type:"sort", label:"Đọc hiểu – Nhóm màu", q:"Xếp mỗi màu vào đúng nhóm.",
    cats:["Màu nóng","Màu lạnh","Màu trung tính"],
    items:[["Đỏ",0],["Cam",0],["Vàng",0],["Xanh lam",1],["Tím",1],["Xanh lục",1],["Trắng",2],["Đen",2],["Be",2]],
    k:"<b>Nóng</b> (ấm áp, phấn chấn, năng nổ): đỏ, cam, vàng. <b>Lạnh</b> (bình tĩnh, hiền hoà, lắng dịu): xanh, tím. <b>Trung tính</b> (lịch sự, nhẹ nhàng): trắng, đen, be."},
  gam:{type:"sort", label:"Đọc hiểu – Gam màu theo chủ đề", q:"Với mỗi bài trình chiếu dưới đây, nên dùng gam màu nào?",
    cats:["Gam màu nóng","Gam màu trung tính","Gam màu lạnh"],
    items:[["Chủ đề giải trí, lễ hội",0],["Chủ đề giáo dục, học tập",1],["Chủ đề nghệ thuật, muốn mang lại ấn tượng mạnh",2],["Sự kiện tri ân",2]],
    k:"Giải trí, lễ hội → <b>gam nóng</b>. Giáo dục, học tập → <b>gam trung tính</b>. Nghệ thuật, muốn ấn tượng mạnh, sự kiện tri ân → <b>gam lạnh</b>."},
  nt:{type:"sort", label:"Đọc hiểu – Lưu ý khi chọn màu", q:"Mỗi ý dưới đây là nên hay không nên?",
    cats:["Nên","Không nên"],
    items:[["Kết hợp các màu cùng nhóm với nhau (đỏ, cam, vàng với màu nâu)",0],["Dùng thật nhiều màu trên một trang chiếu cho nổi bật",1],["Chọn màu chữ có độ tương phản cao với màu nền",0],["Chữ màu vàng trên nền vàng nhạt",1],["Chọn màu sắc chủ đạo hài hoà với nội dung",0]],
    k:"Nên: kết hợp màu cùng nhóm; chữ <b>tương phản cao</b> với nền; màu chủ đạo hài hoà với nội dung. Không nên: dùng <b>quá nhiều màu</b>; chữ và nền cùng tông (khó đọc)."},
  p47:{type:"mcq", label:"Câu hỏi tr.47", q:"Em hãy chọn phương án đúng:",
    o:["Văn bản trên trang chiếu cần ngắn gọn, súc tích.","Văn bản trên trang chiếu càng chi tiết, đầy đủ càng tốt.","Sử dụng càng nhiều màu sắc cho văn bản trên trang chiếu càng giúp người nghe tập trung.","Sử dụng nhiều loại phông chữ cho văn bản trên trang chiếu sẽ thu hút được sự chú ý của người nghe."], a:0,
    k:"<b>A</b>. Văn bản trên trang chiếu cần <b>ngắn gọn, súc tích</b>; dùng quá nhiều màu, nhiều phông làm rối mắt."},
  hd2:{type:"open", label:"HĐ2 – Các thông tin cần thiết", q:"Theo em, các trang chiếu có cần đánh số không? Có cần thêm các thông tin vào đầu trang và chân trang không? Vì sao?",
    k:"Có. <b>Số trang</b> giúp người trình bày và người nghe dễ theo dõi, dễ hỏi lại (“trang 3”). <b>Chân trang</b> ghi tên người trình bày, tên CLB/công ti, tiêu đề, thời gian trình chiếu → bài chuyên nghiệp, thông tin xuyên suốt."},
  hf:{type:"match", label:"Thực hành – Hộp thoại Header and Footer", q:"Ghép mỗi mục trong hộp thoại Header and Footer (Hình 10a.5) với tác dụng của nó.",
    items:[["Date and time",1],["Update automatically",2],["Slide number",3],["Footer",4],["Don't show on title slide",5],["Apply to All",6]],
    opts:["a) Thêm thông tin về ngày trình bày","b) Tự động cập nhật ngày trình bày","c) Chèn số trang","d) Thêm thông tin vào chân trang","e) Không thêm chân trang vào trang tiêu đề","f) Áp dụng cho tất cả các trang"],
    k:"Date and time – a; Update automatically – b; Slide number – c; Footer – d; Don't show on title slide – e; Apply to All – f."},
  hf2:{type:"mcq", label:"Thực hành – Đầu trang trong PowerPoint", q:"Trong phần mềm PowerPoint, muốn thêm đầu trang (Header) em làm thế nào?",
    o:["Chọn thẻ Notes and Handouts trong hộp thoại Header and Footer (đầu trang cho bản in phát cho người nghe).","Chọn thẻ Slide, đánh dấu Header.","Chọn Insert → Header như trong Word.","PowerPoint không có đầu trang."], a:0,
    k:"Ở chế độ <b>Slide</b> không thêm được đầu trang. Chỉ ở thẻ <b>Notes and Handouts</b> (in bài trình chiếu ra giấy) mới có chức năng thêm đầu trang."},
  nv1:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: bài trình chiếu LeRaMatCLBTinhoc.pptx của em được định dạng thế nào (phông, cỡ, màu, căn lề)? Chân trang có những thông tin gì? Trang tiêu đề có chân trang không? Vì sao?",
    k:"Trang 1: tiêu đề Arial 60, vàng, đậm, căn giữa. Trang 2–4: tiêu đề Arial 54, xanh lá, đậm, căn giữa; nội dung Arial 32, đen, căn trái, dấu đầu dòng. Chân trang: ngày (tự cập nhật), “CLB Tin học – Trường THCS…”, số trang; trang tiêu đề <b>không có</b> chân trang vì chọn Don't show on title slide."},
  lt1:{type:"mcq", label:"Luyện tập", q:"Em hãy chọn phương án SAI trong các phương án sau:",
    o:["Đầu trang và chân trang có thể được định dạng phông chữ, cỡ chữ, màu chữ khác nhau.","Có thể bỏ phần đầu trang và chân trang khỏi trang chiếu tiêu đề.","Có thể tự động cập nhật thông tin thời gian ở đầu trang và chân trang.","Những thông tin lựa chọn và nhập vào cửa sổ Header & Footer được tự động áp dụng cho tất cả các trang chiếu trong bài trình chiếu."], a:3,
    k:"<b>D</b> sai: bấm <b>Apply</b> chỉ áp dụng cho trang đang chọn; phải bấm <b>Apply to All</b> mới áp dụng cho tất cả các trang."},
  vd1:{type:"open", label:"Vận dụng", q:"Tạo bài trình chiếu giới thiệu một nội dung Tin học em chọn (ví dụ: giới thiệu một ngôn ngữ lập trình, giới thiệu về bảng tính điện tử,…) để trình chiếu trong buổi sinh hoạt CLB Tin học của trường: chọn màu sắc, định dạng văn bản hài hoà, hợp lí với nội dung; đánh số trang, thêm đầu trang, chân trang. Mô tả ngắn bài của em.",
    k:"Ví dụ: chủ đề học tập → gam màu trung tính (nền trắng/be, chữ đen), điểm nhấn một màu; tiêu đề 40–54 pt, nội dung 24–32 pt; tối đa 2 phông; mỗi dòng một ý ngắn; chân trang có tên, ngày, số trang (Apply to All, không hiện ở trang tiêu đề)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Văn bản trên trang chiếu cần được định dạng sao cho <b>màu sắc, cỡ chữ hài hoà, hợp lí</b> với nội dung.</li><li>Văn bản được định dạng phù hợp giúp đem lại hiệu quả cao trong việc truyền đạt nội dung trình chiếu.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Có thể <b>đánh số trang, thêm đầu trang, chân trang</b> vào các trang chiếu.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Insert → nhóm <b>Text</b> → <b>Header &amp; Footer</b> (hoặc Slide Number) mở hộp thoại Header and Footer.</li><li>Thẻ <b>Slide</b>: Date and time, Slide number, Footer, Don't show on title slide; <b>Apply</b> (trang đang chọn) hoặc <b>Apply to All</b> (mọi trang).</li><li>Đầu trang chỉ có ở thẻ <b>Notes and Handouts</b> (bản in cho người nghe).</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Bài trình chiếu cần <b>ngắn gọn</b>, <b>màu sắc hài hoà</b>, chữ <b>dễ đọc</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Văn bản và màu sắc trên trang chiếu</p><ul>'
    + "<li>Văn bản trên trang chiếu <b>ngắn gọn</b>, chỉ nêu <b>ý chính</b>.</li>"
    + "<li>Màu <b>nóng</b> (đỏ, cam, vàng): ấm áp, sôi nổi; màu <b>lạnh</b> (xanh, tím): bình tĩnh; <b>trung tính</b> (trắng, đen, be): lịch sự.</li>"
    + "<li>Ít màu, cùng nhóm; chữ <b>tương phản cao</b> với nền.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Số trang, đầu trang và chân trang</p><ul>'
    + "<li>Có thể <b>đánh số trang</b>, thêm <b>đầu trang, chân trang</b> (tên người trình bày, tiêu đề, ngày…) vào các trang chiếu.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Insert → <b>Header &amp; Footer</b>: Date and time, Slide number, Footer, Don't show on title slide → <b>Apply to All</b>.</li>"
    + "<li>Đầu trang: chỉ ở thẻ <b>Notes and Handouts</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li><b>Apply</b>: trang đang chọn; <b>Apply to All</b>: tất cả các trang.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Chọn gam màu theo chủ đề, chữ ≥ 24 pt, tối đa 2 phông, có số trang và chân trang.</li>"
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
    return ["T8B10a." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Nêu đủ các điểm cần chú ý."], fix:["Nghĩ về chữ, màu sắc và thông tin trên mỗi trang."]},
  hd1a:{ok:["Chính xác!"], fix:["Hình nào viết thành câu dài?"]},
  hd1b:{ok:["Chính xác!"], fix:["Người nghe có kịp đọc câu dài trên màn chiếu không?"]},
  mau: {ok:["Phân nhóm màu đúng."], fix:["Màu nào gợi cảm giác ấm, màu nào gợi cảm giác mát?"]},
  gam: {ok:["Chọn gam màu phù hợp."], fix:["Đọc lại ví dụ về màu sắc chủ đạo trong SGK trang 47."]},
  nt:  {ok:["Đúng các lưu ý."], fix:["Chữ vàng trên nền vàng nhạt có dễ đọc không?"]},
  p47: {ok:["Chính xác!"], fix:["Nhiều màu, nhiều phông có làm rối mắt không?"]},
  hd2: {ok:["Giải thích hợp lí."], fix:["Người nghe muốn hỏi lại một trang thì làm sao chỉ ra?"]},
  hf:  {ok:["Ghép đúng các mục."], fix:["Đối chiếu với các chú thích trong Hình 10a.5."]},
  hf2: {ok:["Chính xác!"], fix:["Thẻ nào trong hộp thoại có ô Header?"]},
  nv1: {ok:["Thực hành đúng yêu cầu."], fix:["Kiểm tra lại phông, cỡ, màu theo hướng dẫn b)."]},
  lt1: {ok:["Chính xác!"], fix:["Apply và Apply to All khác nhau thế nào?"]},
  vd1: {ok:["Bài trình chiếu hài hoà, đủ thông tin."], fix:["Kiểm tra độ tương phản và cỡ chữ bằng bảng Gợi ý của máy."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  mau: "Nóng: đỏ, cam, vàng. Lạnh: xanh, tím. Trung tính: trắng, đen, be.",
  gam: "Lễ hội, giải trí: nóng; giáo dục, học tập: trung tính; nghệ thuật, tri ân: lạnh.",
  nt: "Chữ cần tương phản với nền; không dùng quá nhiều màu."
};
const MATCH_HINT = {hf: "Xem các chú thích trong Hình 10a.5."};
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
    {title:"Bài trình chiếu cho lễ ra mắt CLB", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Văn bản và màu sắc", acts:[
    {title:"Hoạt động 1: Đặc điểm của văn bản trên trang chiếu", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Màu sắc trên trang chiếu", tasks:["mau","gam","nt"], concept:"c1"},
    {title:"Câu hỏi SGK trang 47", tasks:["p47"]},
    {title:"Ghi bài: Văn bản và màu sắc", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Số trang, đầu trang, chân trang", acts:[
    {title:"Hoạt động 2: Các thông tin cần thiết của bài trình chiếu", tasks:["hd2"], concept:"c2"},
    {title:"Ghi bài: Số trang, đầu trang, chân trang", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Nhiệm vụ: Bài trình chiếu cho lễ ra mắt CLB Tin học", tasks:["hf","hf2","nv1"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Header & Footer", tasks:["lt1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Bài trình chiếu giới thiệu một nội dung Tin học", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai10a", title: "Bài 10a. Định dạng nâng cao cho trang chiếu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 chọn Apply nên chỉ trang 2 có số trang vì…",
  commentPh: "Ví dụ: Nhóm chọn màu hài hoà; chữ nội dung cần to hơn, tương phản hơn với nền."};
})();
