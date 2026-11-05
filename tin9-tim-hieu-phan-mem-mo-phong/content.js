/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Theo em, phần mềm mô phỏng có thể giúp Minh tập pha màu như thế nào để tiết kiệm được thời gian và màu vẽ?",
    k:"Phần mềm mô phỏng cho Minh <b>thử pha màu trên máy tính</b>: chọn màu, thay đổi tỉ lệ, xem ngay màu kết quả; làm lại bao nhiêu lần cũng được mà <b>không tốn màu vẽ</b>, không làm hỏng hỗn hợp màu. Khi đã biết công thức pha, Minh mới pha màu thật."},
  hd1:{type:"open", label:"HĐ1 – Pha màu", q:"Phần mềm mô phỏng pha màu (Hình 5.1) cho phép em chọn màu, tăng giảm tỉ lệ các màu và giúp em nhìn thấy màu kết quả trên màn hình. Em hãy cho biết việc sử dụng phần mềm mô phỏng pha màu để tập pha màu và tìm hiểu về màu sắc có những lợi ích gì?",
    k:"<ul><li><b>Tiết kiệm</b> màu vẽ, giấy, thời gian; không lo hỗn hợp màu bị xỉn đục, phải bỏ đi.</li><li>Thấy <b>ngay</b> màu kết quả, dễ dàng thay đổi tỉ lệ, làm lại nhiều lần.</li><li>Tìm hiểu được các <b>hệ màu</b> khác nhau; tạo ra nhiều màu mới; tăng hứng thú học tập.</li></ul>"},
  pm:{type:"match", label:"Đọc hiểu – Phần mềm mô phỏng gì?", ph:"Chọn…",
    q:"Đọc mục 1 (SGK trang 20–21). Ghép mỗi phần mềm (trang web) với đối tượng mà nó mô phỏng.",
    opts:["a) Thí nghiệm vật lí","b) Thí nghiệm hoá học","c) Vẽ hình hình học, giải toán","d) Chạy thử thuật toán dạng sơ đồ khối","e) Chuyển động, tương tác giữa các phân tử","f) Giao thông trong thành phố"],
    items:[["1) Crocodile Physics, phet.colorado.edu",1],["2) Crocodile Chemistry, ChemLab",2],["3) GeoGebra, Cabri, Geometer's Sketchpad",3],["4) Flowgorithm",4],["5) physics.weber.edu/schroeder/md",5],["6) traffic-simulation.de",6]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e, 6 – f. Phần mềm mô phỏng được dùng trong học tập và cả trong nghiên cứu, giao thông,…"},
  p21:{type:"open", label:"Câu hỏi tr.21", q:"Em hãy kể tên một phần mềm mô phỏng mà em biết. Phần mềm đó mô phỏng hoạt động của đối tượng nào?",
    k:"Ví dụ:<ul><li><b>PhET</b> (phet.colorado.edu): mô phỏng mạch điện, lực, chuyển động, ánh sáng,…</li><li><b>GeoGebra</b>: mô phỏng hình học, đồ thị hàm số.</li><li><b>Flowgorithm</b>: mô phỏng thuật toán dạng sơ đồ khối.</li><li>Phần mềm mô phỏng hệ Mặt Trời, mô phỏng lái xe, Google Earth,…</li></ul>"},
  hd2:{type:"open", label:"HĐ2 – Lợi ích", q:"Phần mềm mô phỏng pha màu có những lợi ích gì trong việc tìm hiểu và tập pha trộn màu theo cách thông thường?",
    k:"Giúp em học cách tạo ra màu mới từ những màu đã cho mà vẫn <b>tiết kiệm thời gian và vật liệu</b>. Bằng cách thay đổi các lựa chọn của phần mềm, em có thể tìm hiểu được những <b>hệ màu cơ bản</b> khác nhau như RGB (đỏ, lục, lam), CMYK (xanh lơ, hồng sẫm, vàng, đen) hay RYB (đỏ, vàng, lam)."},
  li:{type:"sort", label:"Đọc hiểu – Lợi ích",
    q:"Đọc mục 2 (SGK trang 21–22). Ý nào dưới đây là lợi ích của phần mềm mô phỏng?",
    cats:["Đúng là lợi ích","Không đúng"],
    items:[["Làm quen, tìm hiểu, nghiên cứu một đối tượng với chi phí thấp",0],["Nghiên cứu lí thuyết một cách trực quan, sinh động bằng cách tương tác",0],["Tạo ra nhiều tình huống để luyện tập, nghiên cứu đầy đủ hơn",0],["Hạn chế những tình huống làm hỏng thiết bị hoặc gây nguy hiểm",0],["Thay thế hoàn toàn mọi giờ thực hành thật",1],["Mọi phần mềm mô phỏng đều chính xác như nhau",1]],
    k:"Bốn ý đầu là lợi ích của phần mềm mô phỏng. Phần mềm mô phỏng <b>hỗ trợ</b>, không thay thế hoàn toàn thực hành thật; các phần mềm có <b>chất lượng khác nhau</b>, cần chọn phần mềm có chất lượng cao."},
  bq:{type:"mcq", label:"Đọc hiểu – Lưu ý", q:"Khi sử dụng phần mềm mô phỏng, em cần lưu ý điều gì?",
    o:["Dùng phần mềm nào cũng được vì kết quả đều giống nhau.","Sử dụng các phần mềm có chất lượng cao và không vi phạm bản quyền.","Chỉ dùng phần mềm mô phỏng, không cần làm thí nghiệm thật.","Tải bản bẻ khoá cho đỡ tốn tiền."], a:1,
    k:"Các phần mềm mô phỏng có chất lượng khác nhau. Em cần lưu ý sử dụng các phần mềm có <b>chất lượng cao</b> và <b>không vi phạm bản quyền</b>."},
  p22:{type:"open", label:"Câu hỏi tr.22", q:"Em hãy cho biết lợi ích của phần mềm mô phỏng mà em đã kể tên ở phần Câu hỏi của Mục 1.",
    k:"Ví dụ với PhET mô phỏng mạch điện: lắp được nhiều mạch khác nhau mà <b>không tốn linh kiện</b>; <b>không nguy hiểm</b> (không bị điện giật, không cháy bóng đèn); thấy rõ dòng điện chạy trong mạch (<b>trực quan</b>); thay đổi điện trở, hiệu điện thế để thử <b>nhiều tình huống</b>."},
  lta:{type:"open", label:"Luyện tập – a", q:"Em hãy tìm một phần mềm mô phỏng hỗ trợ học tập. Phần mềm đó mô phỏng hoạt động nào?",
    k:"Học sinh tự tìm. Ví dụ: <b>PhET – Circuit Construction Kit</b> mô phỏng hoạt động của mạch điện; <b>GeoGebra</b> mô phỏng hình học; <b>Stellarium</b> mô phỏng bầu trời sao."},
  ltb:{type:"open", label:"Luyện tập – b", q:"Phần mềm đó giúp em làm gì?",
    k:"Ví dụ với PhET mạch điện: giúp em <b>lắp ráp mạch điện ảo</b>, đo cường độ dòng điện, hiệu điện thế, quan sát bóng đèn sáng mạnh, yếu khi thay đổi linh kiện."},
  ltc:{type:"open", label:"Luyện tập – c", q:"Phần mềm đó có những lợi ích gì?",
    k:"Ví dụ: tiết kiệm chi phí (không cần mua linh kiện); an toàn; trực quan, sinh động; thử được nhiều tình huống; học mọi lúc, mọi nơi."},
  cmy:{type:"match", label:"Vận dụng – Pha màu CMYK", ph:"Chọn…",
    q:"Dùng phần mềm mô phỏng pha màu (hoặc bảng pha màu ở trên) để trả lời: mỗi cặp màu cơ bản trong hệ CMYK pha với nhau tạo ra màu nào?",
    opts:["1) Đỏ (Red)","2) Lục (Green)","3) Lam (Blue)"],
    items:[["a) Cyan + Yellow = ? (Hình 5.3)",2],["b) Cyan + Magenta = ?",3],["c) Magenta + Yellow = ?",1]],
    k:"a) Xanh lơ + Vàng = <b>Lục</b> (Green); b) Xanh lơ + Hồng sẫm = <b>Lam</b> (Blue); c) Hồng sẫm + Vàng = <b>Đỏ</b> (Red)."},
  vd2:{type:"open", label:"Vận dụng – Phần mềm em dùng", q:"Ghi lại tên (hoặc địa chỉ trang web) của phần mềm mô phỏng pha màu em đã tìm được và cách em dùng nó để kiểm tra kết quả.",
    k:"Ví dụ: trycolors.com hoặc tìm với từ khoá “mixing colors simulator”, “CMYK color mixer”. Chọn màu Cyan và Yellow với tỉ lệ bằng nhau, quan sát màu kết quả là màu lục; làm tương tự với các cặp màu còn lại."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Phần mềm mô phỏng</b> thể hiện trực quan sự vận động của một đối tượng, cho phép người dùng tương tác và tìm hiểu cách thức hoạt động của đối tượng đó.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Lợi ích của phần mềm mô phỏng là hỗ trợ nghiên cứu đối tượng một cách <b>toàn diện, sinh động và an toàn</b> với <b>chi phí thấp hơn</b> nghiên cứu trực tiếp trong thực tế.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Tập pha màu trên <b>phần mềm mô phỏng</b> → tiết kiệm màu và thời gian.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Phần mềm mô phỏng</p><ul>'
    + "<li><b>Phần mềm mô phỏng</b>: thể hiện trực quan hoạt động của một đối tượng, cho người dùng <b>tương tác</b>.</li>"
    + "<li>VD: PhET (vật lí), ChemLab (hoá học), GeoGebra (hình học), Flowgorithm (thuật toán).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Lợi ích của phần mềm mô phỏng</p><ul>'
    + "<li><b>Chi phí thấp</b>, <b>an toàn</b>, <b>trực quan, sinh động</b>.</li>"
    + "<li>Thử được <b>nhiều tình huống</b>, làm lại nhiều lần.</li>"
    + "<li>Lưu ý: dùng phần mềm <b>chất lượng cao, có bản quyền</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Ghi: tên phần mềm → mô phỏng gì → giúp em làm gì → lợi ích.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Hệ màu CMYK: <b>C + Y = Lục</b>; <b>C + M = Lam</b>; <b>M + Y = Đỏ</b>.</li>"
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
    return ["T9B5." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Đúng! Thử trên máy trước giúp tiết kiệm màu và thời gian."],
        fix:["Nếu pha thử trên máy tính thì Minh có tốn màu vẽ không?"]},
  hd1: {ok:["Em nêu được nhiều lợi ích, rất cụ thể."],
        fix:["Em nghĩ thêm: tiết kiệm gì, thấy kết quả lúc nào, làm lại được không?"]},
  pm:  {ok:["Nhóm ghép đúng tất cả phần mềm."],
        fix:["Em đọc lại các phần mềm ở SGK trang 21 nhé."]},
  p21: {ok:["Em kể đúng tên phần mềm và đối tượng mô phỏng."],
        fix:["Em nêu rõ phần mềm đó mô phỏng hoạt động của đối tượng nào."]},
  hd2: {ok:["Đúng! Tiết kiệm thời gian, vật liệu và tìm hiểu được các hệ màu."],
        fix:["Em nêu thêm: phần mềm giúp em tìm hiểu những hệ màu nào?"]},
  li:  {ok:["Nhóm chọn đúng bốn lợi ích."],
        fix:["Phần mềm mô phỏng có thay thế hoàn toàn thực hành thật không? Có phải phần mềm nào cũng tốt như nhau?"]},
  bq:  {ok:["Chính xác! Chọn phần mềm chất lượng cao, không vi phạm bản quyền."],
        fix:["Dùng bản bẻ khoá có vi phạm pháp luật không? Em xem lại cuối mục 2."]},
  p22: {ok:["Em nêu được lợi ích cụ thể của phần mềm đã chọn."],
        fix:["Em gắn lợi ích với phần mềm cụ thể: chi phí, an toàn, trực quan, nhiều tình huống."]},
  lta: {ok:["Em tìm được phần mềm phù hợp với việc học."],
        fix:["Em ghi rõ tên phần mềm và hoạt động nó mô phỏng."]},
  ltb: {ok:["Em mô tả rõ phần mềm giúp em làm gì."],
        fix:["Em nêu cụ thể: em dùng phần mềm để làm việc gì?"]},
  ltc: {ok:["Em nêu đủ lợi ích. Rất tốt!"],
        fix:["Em nêu thêm lợi ích về chi phí, an toàn, tính trực quan."]},
  cmy: {ok:["Chính xác cả ba cặp màu!"],
        fix:["Em thử lại trên bảng pha màu: kéo C và Y lên, quan sát màu kết quả."]},
  vd2: {ok:["Em ghi rõ phần mềm và cách kiểm tra. Rất tốt!"],
        fix:["Em ghi tên hoặc địa chỉ trang web của phần mềm em đã dùng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  li: "Em đọc lại các lợi ích ở SGK trang 22."
};
const MATCH_HINT = {
  pm: "Gợi ý: đọc lại danh sách phần mềm ở SGK trang 21.",
  cmy: "Gợi ý: thử trên bảng pha màu CMY ở phần Vận dụng."
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
    {title:"Tập pha màu", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Phần mềm mô phỏng", acts:[
    {title:"Hoạt động 1: Pha màu", tasks:["hd1"]},
    {title:"Đọc hiểu: Một số phần mềm mô phỏng", tasks:["pm"], concept:"c1"},
    {title:"Câu hỏi SGK trang 21", tasks:["p21"]},
    {title:"Ghi bài: Phần mềm mô phỏng", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Lợi ích", acts:[
    {title:"Hoạt động 2: Lợi ích của phần mềm mô phỏng", tasks:["hd2"]},
    {title:"Đọc hiểu: Lợi ích và lưu ý", tasks:["li","bq"], concept:"c2"},
    {title:"Câu hỏi SGK trang 22", tasks:["p22"]},
    {title:"Ghi bài: Lợi ích", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tìm phần mềm mô phỏng hỗ trợ học tập", tasks:["lta","ltb","ltc"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Pha màu hệ CMYK", tasks:["cmy","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai5", title: "Bài 5. Tìm hiểu phần mềm mô phỏng", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng phần mềm mô phỏng thay thế được hoàn toàn thí nghiệm thật vì…",
  commentPh: "Ví dụ: Nhóm nêu đúng lợi ích tiết kiệm chi phí; cần bổ sung tính an toàn."};
})();
