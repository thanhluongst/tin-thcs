/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Sáng nay trên đường đến trường, em đã nhìn thấy, nghe thấy những gì? Những điều đó giúp em biết được điều gì?",
    k:"Ví dụ: nghe tiếng chim hót → biết trời đã sáng; thấy mây đen → biết trời sắp mưa; thấy đèn đỏ → biết phải dừng lại. Các giác quan thu nhận, não xử lí → em có <b>hiểu biết</b> về thế giới xung quanh."},
  hd1:{type:"open", label:"HĐ1 – Thấy gì? Biết gì?", q:"Bạn Minh đã thấy những gì và biết được điều gì để quyết định nhanh chóng qua đường?",
    k:"Minh <b>thấy</b> đèn giao thông phía mình chuyển sang màu xanh, các xe bên chiều đèn đỏ dừng lại. Minh <b>biết</b> mình có thể qua đường an toàn."},
  pl:{type:"sort", label:"Đọc hiểu – Dữ liệu, thông tin, vật mang tin", q:"Xếp mỗi mục dưới đây (lấy từ các ví dụ trong SGK) vào nhóm phù hợp.",
    cats:["Dữ liệu","Thông tin","Vật mang tin"],
    items:[["Đèn xanh bật sáng, các xe bên kia dừng lại",0],["Các con số, văn bản, hình ảnh, âm thanh trong mục dự báo thời tiết",0],["Dòng chữ “Đảo Cò, xuồng máy, 40 000đ, 35 phút”",0],
      ["Minh biết có thể qua đường an toàn",1],["An biết hôm nay trời nắng",1],["Khách biết giá vé đi Đảo Cò là 40 000 đồng",1],
      ["Đèn giao thông",2],["Tấm bảng gỗ ở bến xuồng",2],["Giấy viết, đĩa CD, thẻ nhớ",2]],
    k:"<b>Dữ liệu</b>: số, chữ, hình ảnh, âm thanh ghi trên vật mang tin. <b>Thông tin</b>: hiểu biết mà con người có được. <b>Vật mang tin</b>: thứ dùng để lưu trữ, truyền dữ liệu."},
  qh:{type:"mcq", label:"Đọc hiểu – Mối quan hệ", q:"Cùng xem bản tin dự báo thời tiết, An biết “hôm nay trời nắng” nhưng em bé 5 tuổi thì không hiểu gì. Vì sao?",
    o:["Bản tin dự báo thời tiết không có dữ liệu.","Sự hiểu biết mà thông tin đem lại phụ thuộc vào người tiếp nhận; với em bé, dữ liệu đó không đem lại thông tin.","Ti vi là vật mang tin bị hỏng.","Thông tin và dữ liệu là hai thứ hoàn toàn giống nhau."], a:1,
    k:"<b>B</b>. Dữ liệu chỉ đem lại thông tin khi người nhận hiểu được nó. Sự hiểu biết mà thông tin đem lại <b>phụ thuộc vào người tiếp nhận</b>."},
  c1m:{type:"match", label:"Câu hỏi 1 – Ghép cột", q:"Em hãy ghép mỗi mục ở cột A với một mục phù hợp ở cột B.",
    items:[["1) Thông tin",2],["2) Dữ liệu",1],["3) Vật mang tin",3]],
    opts:["a) Các số, văn bản, hình ảnh, âm thanh,…","b) Những gì đem lại hiểu biết cho con người về thế giới xung quanh và chính bản thân mình.","c) Vật chứa dữ liệu."],
    k:"1 – b; 2 – a; 3 – c."},
  c2:{type:"sort", label:"Câu hỏi 2 – Thông tin hay dữ liệu?", q:"Mỗi dòng sau đây là thông tin hay dữ liệu?",
    cats:["Dữ liệu","Thông tin"],
    items:[["16:00",0],["0123456789",0],["Hãy gọi cho tôi lúc 16 giờ theo số điện thoại 0123456789!",1]],
    k:"“16:00” và “0123456789” đứng riêng chỉ là <b>dữ liệu</b> (chưa biết dùng để làm gì). Câu “Hãy gọi cho tôi lúc 16 giờ…” cho ta biết phải làm gì → là <b>thông tin</b>."},
  hd2:{type:"open", label:"HĐ2 – Hỏi để có thông tin", q:"Lớp em sắp tổ chức một buổi dã ngoại. Nhóm em hãy đưa ra các câu hỏi giúp tìm thông tin để chuẩn bị cho buổi dã ngoại đó (ít nhất 3 câu).",
    k:"Ví dụ: Hôm đó thời tiết thế nào? (chọn trang phục) · Ở đó có những trò chơi gì? · Có di tích lịch sử nào để tham quan? · Nên mang theo món ăn nhẹ gì? · Phong cảnh chỗ nào đẹp để chụp ảnh? Mỗi câu trả lời là một thông tin giúp lớp chuẩn bị tốt hơn."},
  tq1:{type:"mcq", label:"Đọc hiểu – Thông tin đem lại hiểu biết", q:"Nhờ học bài lịch sử về Chiến dịch Điện Biên Phủ, em biết được điều gì?",
    o:["Không biết thêm điều gì.","Tinh thần dũng cảm của quân và dân ta, truyền thống chống giặc ngoại xâm của dân tộc.","Thời tiết ngày mai.","Giá vé đi Đảo Cò."], a:1,
    k:"<b>B</b>. Thông tin về địa điểm, thời gian, diễn biến trận đánh,… giúp em hiểu biết thêm → <b>thông tin đem lại hiểu biết</b> cho con người."},
  tq2:{type:"mcq", label:"Đọc hiểu – Thông tin thay đổi hành động", q:"Chuẩn bị đi sang nhà bạn Minh, An nghe mẹ nói: “Trời sắp mưa đấy nhé”. An quay vào nhà cầm theo chiếc ô. Ví dụ này cho thấy điều gì?",
    o:["Thông tin không ảnh hưởng gì đến con người.","Thông tin có khả năng làm thay đổi hành động của con người.","Chỉ có dữ liệu mới làm thay đổi hành động.","Chiếc ô là thông tin."], a:1,
    k:"<b>B</b>. Thông tin “trời sắp mưa” làm An thay đổi hành động (mang ô) → thông tin đúng giúp con người <b>lựa chọn tốt</b>, hoạt động <b>hiệu quả</b>."},
  lta:{type:"mcq", label:"Luyện tập – Câu a", q:"Các con số trong Bảng 1.1 là thông tin hay dữ liệu?",
    o:["Thông tin","Dữ liệu"], a:1,
    k:"<b>Dữ liệu</b> – các con số ghi lượng mưa, được lưu trên bảng (vật mang tin)."},
  ltb:{type:"mcq", label:"Luyện tập – Câu b", q:"Phát biểu “Tháng 6, Đà Nẵng ít mưa nhất so với các thành phố Hà Nội, Huế” là thông tin hay dữ liệu?",
    o:["Thông tin","Dữ liệu"], a:0,
    k:"<b>Thông tin</b> – có được nhờ so sánh các số ở cột tháng 6 (Hà Nội 200,7; Huế 134,2; Đà Nẵng 92,2)."},
  ltc:{type:"mcq", label:"Luyện tập – Câu c", q:"Huế ít mưa nhất vào tháng nào trong năm? (Câu trả lời này là thông tin hay dữ liệu?)",
    o:["Tháng 3","Tháng 8","Tháng 2","Tháng 11"], a:0,
    k:"<b>Tháng 3</b> (34,1 mm). Câu trả lời là <b>thông tin</b>."},
  ltd:{type:"open", label:"Luyện tập – Câu d", q:"Câu trả lời cho câu hỏi c) có ảnh hưởng đến việc lựa chọn thời gian và địa điểm du lịch không? Vì sao?",
    k:"<b>Có</b>. Ví dụ: muốn đi Huế nên chọn tháng 3 (ít mưa); tránh tháng 10–12 vì mưa rất nhiều. Thông tin giúp ta chọn thời gian, địa điểm phù hợp."},
  vd1a:{type:"open", label:"Vận dụng – Câu 1a", q:"Nêu ví dụ cho thấy thông tin giúp em có những lựa chọn trang phục phù hợp hơn.",
    k:"Ví dụ: nghe dự báo ngày mai trời rét → mặc áo ấm; biết thứ Hai chào cờ → mặc đồng phục; biết trời mưa → mang áo mưa."},
  vd1b:{type:"open", label:"Vận dụng – Câu 1b", q:"Nêu ví dụ cho thấy thông tin giúp em đảm bảo an toàn khi tham gia giao thông.",
    k:"Ví dụ: thấy đèn đỏ → dừng lại; thấy biển báo trường học → đi chậm; biết đoạn đường đang sửa → chọn đường khác."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Nêu ví dụ về vật mang tin giúp ích cho việc học tập của em.",
    k:"Ví dụ: sách giáo khoa, vở ghi, bảng lớp, bản đồ, thẻ nhớ/USB lưu bài, máy tính, điện thoại xem bài giảng…"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Thông tin</b> là những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình.</li><li>Thông tin được ghi lên vật mang tin trở thành <b>dữ liệu</b>. Dữ liệu được thể hiện dưới dạng những con số, văn bản, hình ảnh và âm thanh.</li><li><b>Vật mang tin</b> là phương tiện được dùng để lưu trữ và truyền tải thông tin, ví dụ như giấy viết, đĩa CD, thẻ nhớ,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Thông tin đem lại hiểu biết cho con người. Hầu hết hoạt động của con người đều cần đến thông tin.</li><li>Thông tin đúng giúp con người đưa ra những lựa chọn tốt, giúp cho hoạt động của con người đạt hiệu quả.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Giác quan <b>thu nhận</b> → não <b>xử lí</b> → em có <b>hiểu biết</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thông tin và dữ liệu</p><ul>'
    + "<li><b>Thông tin</b>: những gì đem lại <b>hiểu biết</b> cho con người.</li>"
    + "<li><b>Dữ liệu</b>: số, văn bản, hình ảnh, âm thanh ghi trên vật mang tin.</li>"
    + "<li><b>Vật mang tin</b>: để lưu trữ, truyền thông tin. VD: giấy, đĩa CD, thẻ nhớ.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Tầm quan trọng của thông tin</p><ul>'
    + "<li>Thông tin → đem lại <b>hiểu biết</b>.</li>"
    + "<li>Thông tin đúng → <b>lựa chọn tốt</b>, hoạt động <b>hiệu quả</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Các số trong bảng = <b>dữ liệu</b>; kết luận rút ra từ bảng = <b>thông tin</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>VD vật mang tin giúp học tập: <b>SGK, vở, bảng, USB</b>.</li>"
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
    return ["T6B1." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Quan sát tốt."], fix:["Điều em thấy giúp em biết gì?"]},
  hd1: {ok:["Nêu đủ cả thấy và biết."], fix:["Tách rõ: Minh thấy gì? Minh biết gì?"]},
  pl:  {ok:["Phân loại đúng."], fix:["Cái gì là vật chứa? Cái gì là hiểu biết?"]},
  qh:  {ok:["Chính xác!"], fix:["Em bé có hiểu các kí hiệu trên bản tin không?"]},
  c1m: {ok:["Ghép đúng."], fix:["Đọc lại phần ghi nhớ."]},
  c2:  {ok:["Phân loại đúng."], fix:["Dòng nào cho em biết phải làm gì?"]},
  hd2: {ok:["Câu hỏi thiết thực."], fix:["Thêm câu hỏi về thời tiết, đồ ăn, trò chơi."]},
  tq1: {ok:["Chính xác!"], fix:["Bài lịch sử giúp em hiểu thêm điều gì?"]},
  tq2: {ok:["Chính xác!"], fix:["Nghe tin xong, An đã làm gì?"]},
  lta: {ok:["Đúng."], fix:["Các con số đứng riêng là gì?"]},
  ltb: {ok:["Đúng."], fix:["Câu này là hiểu biết rút ra từ bảng."]},
  ltc: {ok:["Đúng."], fix:["Tìm số nhỏ nhất ở hàng Huế."]},
  ltd: {ok:["Giải thích hợp lí."], fix:["Nên đi Huế vào tháng nào? Vì sao?"]},
  vd1a:{ok:["Ví dụ phù hợp."], fix:["Thông tin nào giúp em chọn quần áo?"]},
  vd1b:{ok:["Ví dụ phù hợp."], fix:["Thông tin nào giúp em đi đường an toàn?"]},
  vd2: {ok:["Ví dụ phù hợp."], fix:["Vật nào giúp em lưu bài học?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
const SORT_HINT = {pl:"Dữ liệu: số, chữ, hình, âm thanh; Thông tin: điều con người hiểu biết; Vật mang tin: vật chứa dữ liệu.", c2:"Dữ liệu đứng riêng chưa cho biết điều gì; thông tin cho ta hiểu biết."};

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
    {title:"Em nhìn thấy, nghe thấy gì?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Thông tin và dữ liệu", acts:[
    {title:"Hoạt động 1: Thấy gì? Biết gì?", tasks:["hd1"]},
    {title:"Đọc hiểu: Dữ liệu, thông tin, vật mang tin", tasks:["pl","qh"], concept:"c1"},
    {title:"Câu hỏi SGK trang 6", tasks:["c1m","c2"]},
    {title:"Ghi bài: Thông tin và dữ liệu", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Tầm quan trọng của thông tin", acts:[
    {title:"Hoạt động 2: Hỏi để có thông tin", tasks:["hd2"]},
    {title:"Đọc hiểu: Thông tin quan trọng thế nào?", tasks:["tq1","tq2"], concept:"c2"},
    {title:"Ghi bài: Tầm quan trọng của thông tin", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bảng lượng mưa trung bình", tasks:["lta","ltb","ltc","ltd"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Thông tin và vật mang tin quanh em", tasks:["vd1a","vd1b","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin6-bai1", title: "Bài 1. Thông tin và dữ liệu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 đặt được 5 câu hỏi cho buổi dã ngoại…",
  commentPh: "Ví dụ: Nhóm phân biệt đúng thông tin và dữ liệu; cần nêu thêm ví dụ vật mang tin."};
})();
