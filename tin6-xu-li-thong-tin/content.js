/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const XL = ["Thu nhận","Lưu trữ","Xử lí","Truyền"];
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Theo em, để sút thắng thủ môn, cầu thủ đã phải quan sát, suy nghĩ và hành động như thế nào?",
    k:"Cầu thủ <b>quan sát</b> thủ môn, <b>đoán</b> góc sơ hở, rồi <b>điều khiển chân</b> sút bóng vào góc đó. Tất cả do bộ não thực hiện rất nhanh → bộ não đang <b>xử lí thông tin</b>."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Bộ não của cầu thủ nhận được thông tin từ những giác quan nào?",
    k:"Chủ yếu từ <b>mắt</b> (nhìn vị trí thủ môn, khung thành, quả bóng); ngoài ra còn tai (nghe tiếng còi)."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Thông tin nào được bộ não ghi nhớ và sử dụng khi đá phạt?",
    k:"Vị trí của thủ môn, khung thành; kết quả của hoạt động trước (ví dụ: góc nào sơ hở) để làm hoạt động sau."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Bộ não xử lí thông tin nhận được thành thông tin gì?",
    k:"Thành <b>ý định</b> của cầu thủ: sút bóng vào góc cao của khung thành."},
  hd1d:{type:"open", label:"HĐ1 – Câu 4", q:"Bộ não chuyển thông tin điều khiển thành thao tác nào của cầu thủ?",
    k:"Thao tác <b>chân sút bóng</b> (sải bước, tạo đà, sút mạnh vào góc cao)."},
  hd1e:{type:"order", label:"HĐ1 – Câu 5", q:"Quá trình xử lí thông tin của bộ não gồm những hoạt động nào? Sắp xếp theo thứ tự như Hình 1.1 (dùng nút ↑ ↓).",
    items:{a:"Thu nhận thông tin",b:"Lưu trữ thông tin",c:"Xử lí thông tin",d:"Truyền thông tin"}, start:["c","a","d","b"], ans:["a","b","c","d"],
    k:"Thu nhận → Lưu trữ → Xử lí → Truyền thông tin."},
  ct:{type:"sort", label:"Đọc hiểu – Bốn hoạt động", q:"Mỗi việc dưới đây thuộc hoạt động nào của quá trình xử lí thông tin?",
    cats:XL,
    items:[["Mắt nhìn vị trí thủ môn và khung thành",0],["Tai nghe tiếng còi của trọng tài",0],["Não ghi nhớ kết quả lần sút trước",1],["Ghi kết quả trận đấu vào sổ",1],["Não suy luận xem góc nào sơ hở nhất",2],["Não quyết định sút vào góc cao",2],["Não điều khiển chân sút bóng",3],["Kể cho bạn nghe về bàn thắng",3]],
    k:"<b>Thu nhận</b>: nhờ giác quan. <b>Lưu trữ</b>: ghi nhớ, ghi chép. <b>Xử lí</b>: so sánh, phân tích, suy luận, quyết định → thông tin mới. <b>Truyền</b>: chuyển thành hành vi hoặc chia sẻ cho người khác."},
  p9:{type:"sort", label:"Câu hỏi tr.9", q:"Mỗi việc dưới đây thuộc hoạt động nào trong quá trình xử lí thông tin?",
    cats:XL,
    items:[["a) Em đang nghe chương trình ca nhạc trên Đài tiếng nói Việt Nam.",0],["b) Bố em xem chương trình thời sự trên ti vi.",0],["c) Em chép bài trên bảng vào vở.",1],["d) Em thực hiện một phép tính nhẩm.",2]],
    k:"a, b – <b>thu nhận</b> (nghe, nhìn); c – <b>lưu trữ</b> (ghi chép vào vở); d – <b>xử lí</b> (tính toán ra kết quả mới)."},
  tb:{type:"sort", label:"Đọc hiểu – Thành phần của máy tính", q:"Mỗi thiết bị dưới đây thuộc thành phần nào của máy tính?",
    cats:["Thiết bị vào","Bộ xử lí","Bộ nhớ","Thiết bị ra"],
    items:[["Bàn phím",0],["Chuột",0],["Máy quét",0],["CPU",1],["Thẻ nhớ",2],["Đĩa quang",2],["Màn hình",3],["Máy in",3]],
    k:"<b>Thiết bị vào</b> – thu nhận; <b>bộ nhớ</b> – lưu trữ; <b>bộ xử lí</b> – xử lí; <b>thiết bị ra</b> – truyền, chia sẻ thông tin."},
  p10a:{type:"mcq", label:"Câu hỏi tr.10 – Câu 1", q:"Máy tính gồm mấy thành phần để có thể thực hiện được các hoạt động xử lí thông tin?",
    o:["3","4","5","6"], a:1, k:"<b>4</b> thành phần: thiết bị vào, bộ nhớ, bộ xử lí, thiết bị ra."},
  p10b:{type:"mcq", label:"Câu hỏi tr.10 – Câu 2", q:"Chức năng của bộ nhớ máy tính là gì?",
    o:["Thu nhận thông tin.","Hiển thị thông tin.","Lưu trữ thông tin.","Xử lí thông tin."], a:2, k:"Bộ nhớ dùng để <b>lưu trữ</b> thông tin."},
  hd2a:{type:"open", label:"HĐ2 – a) Thu nhận", q:"Nêu ví dụ máy tính giúp con người thu nhận thông tin. So sánh hiệu quả khi có và khi không dùng máy tính.",
    k:"Ví dụ: chụp ảnh, quét bài thơ bằng điện thoại trong vài giây – nhanh hơn chép tay rất nhiều; tìm thông tin trên mạng có đủ chữ, hình, âm thanh, phim."},
  hd2b:{type:"open", label:"HĐ2 – b) Lưu trữ", q:"Nêu ví dụ máy tính giúp con người lưu trữ thông tin. So sánh hiệu quả.",
    k:"Ví dụ: một thẻ nhớ nhỏ chứa nội dung hàng nghìn cuốn sách; ảnh lưu trên máy không bị phai, dễ tìm lại."},
  hd2c:{type:"open", label:"HĐ2 – c) Xử lí", q:"Nêu ví dụ máy tính giúp con người xử lí thông tin. So sánh hiệu quả.",
    k:"Ví dụ: máy tính thực hiện hàng trăm tỉ phép tính mỗi giây, chính xác; tính số Pi đến hàng nghìn tỉ chữ số – con người không thể làm được."},
  hd2d:{type:"open", label:"HĐ2 – d) Truyền", q:"Nêu ví dụ máy tính giúp con người truyền thông tin. So sánh hiệu quả.",
    k:"Ví dụ: gửi thư điện tử, gọi video cho người ở xa trong vài giây thay vì gửi thư qua bưu điện mất nhiều ngày."},
  p11:{type:"mcq", label:"Câu hỏi tr.11", q:"Máy tính giúp con người nâng cao hiệu quả trong những hoạt động nào của quá trình xử lí thông tin?",
    o:["Chỉ thu nhận thông tin.","Chỉ xử lí thông tin (tính toán).","Chỉ lưu trữ và truyền thông tin.","Cả bốn hoạt động: thu nhận, lưu trữ, xử lí và truyền thông tin."], a:3,
    k:"<b>D</b>. Máy tính hỗ trợ <b>cả bốn</b> hoạt động: thu nhận dễ dàng, đa dạng; lưu trữ lượng rất lớn; xử lí nhanh, chính xác; truyền đi khắp nơi."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Vật mang tin xuất hiện trong hoạt động nào của quá trình xử lí thông tin? Bộ nhớ có là vật mang tin không?",
    o:["Hoạt động lưu trữ thông tin; bộ nhớ là vật mang tin.","Hoạt động xử lí thông tin; bộ nhớ không phải vật mang tin.","Hoạt động thu nhận thông tin; bộ nhớ không phải vật mang tin.","Không xuất hiện trong hoạt động nào."], a:0,
    k:"<b>A</b>. Vật mang tin dùng khi <b>lưu trữ</b> thông tin; bộ nhớ máy tính chứa dữ liệu nên <b>là vật mang tin</b>."},
  lt2:{type:"sort", label:"Luyện tập – Câu 2", q:"Em hãy phân loại những công việc sau đây theo các hoạt động của quá trình xử lí thông tin.",
    cats:XL,
    items:[["a) Quan sát đường đi của một chiếc tàu biển.",0],["b) Ghi chép các sự kiện của một chuyến tham quan.",1],["c) Chuyển thể một bài văn xuôi thành văn vần.",2],["d) Thuyết trình chủ đề tình bạn trước lớp.",3]],
    k:"a – thu nhận; b – lưu trữ; c – xử lí; d – truyền thông tin."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Giả sử em được đi chơi xa nhà, hãy phân tích các hoạt động xử lí thông tin liên quan đến việc lên kế hoạch cho chuyến đi.",
    k:"<b>Thu nhận</b>: tìm thông tin về địa điểm, thời tiết, đường đi. <b>Lưu trữ</b>: ghi lại vào sổ, điện thoại. <b>Xử lí</b>: so sánh, chọn ngày đi, đồ cần mang, lịch trình. <b>Truyền</b>: báo kế hoạch cho bố mẹ, bạn bè."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Liệt kê những lợi ích của máy tính ở một trong các lĩnh vực: y tế, giáo dục, âm nhạc, hội hoạ, xây dựng, nông nghiệp, thương mại, du lịch.",
    k:"Ví dụ – y tế: lưu hồ sơ bệnh án, chụp chiếu, hỗ trợ chẩn đoán; giáo dục: bài giảng điện tử, học trực tuyến; nông nghiệp: theo dõi thời tiết, tưới tiêu tự động; thương mại: bán hàng trực tuyến…"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Các hoạt động xử lí thông tin bao gồm:</p><ul><li>Thu nhận thông tin.</li><li>Lưu trữ thông tin.</li><li>Xử lí thông tin.</li><li>Truyền thông tin.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Máy tính có đủ bốn thành phần thực hiện các hoạt động xử lí thông tin: thiết bị vào (thu nhận thông tin), bộ nhớ (lưu trữ thông tin), bộ xử lí (xử lí thông tin) và thiết bị ra (truyền, chia sẻ thông tin).</li><li>Máy tính là thiết bị hỗ trợ con người xử lí thông tin một cách hiệu quả do nó có thể thực hiện nhanh các lệnh, tính toán chính xác, xử lí nhiều dạng thông tin, lưu trữ thông tin với dung lượng lớn và hoạt động bền bỉ.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Bộ não <b>xử lí thông tin</b> → con người hành động.</li></ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Xử lí thông tin</p><ul>'
    + "<li>4 hoạt động: <b>thu nhận → lưu trữ → xử lí → truyền</b> thông tin.</li>"
    + "<li>Xử lí: biến thông tin ban đầu thành <b>thông tin mới</b>.</li></ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Xử lí thông tin trong máy tính</p><ul>'
    + "<li><b>Thiết bị vào</b> (thu nhận), <b>bộ nhớ</b> (lưu trữ), <b>bộ xử lí</b> (xử lí), <b>thiết bị ra</b> (truyền).</li>"
    + "<li>Máy tính: <b>nhanh, chính xác</b>, lưu trữ <b>lớn</b>, <b>bền bỉ</b>.</li></ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Vật mang tin dùng khi <b>lưu trữ</b>; bộ nhớ <b>là</b> vật mang tin.</li></ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Máy tính giúp xử lí thông tin hiệu quả trong <b>mọi lĩnh vực</b>.</li></ul>"}
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
    return ["T6B2." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1:{ok:["Phân tích tốt."], fix:["Cầu thủ nhìn gì, nghĩ gì, làm gì?"]},
  hd1a:{ok:["Đúng."], fix:["Cầu thủ dùng giác quan nào nhiều nhất?"]},
  hd1b:{ok:["Đúng."], fix:["Não cần nhớ gì về thủ môn?"]},
  hd1c:{ok:["Đúng."], fix:["Kết quả cuối cùng não nghĩ ra là gì?"]},
  hd1d:{ok:["Đúng."], fix:["Bộ phận nào của cơ thể thực hiện?"]},
  hd1e:{ok:["Đúng thứ tự."], fix:["Xem lại Hình 1.1."]},
  ct:{ok:["Phân loại đúng."], fix:["Việc đó là nhận vào, ghi nhớ, suy nghĩ hay làm/chia sẻ?"]},
  p9:{ok:["Phân loại đúng."], fix:["Chép bài là ghi lại thông tin."]},
  tb:{ok:["Phân loại đúng."], fix:["Thiết bị đó đưa thông tin vào hay ra?"]},
  p10a:{ok:["Chính xác!"], fix:["Đếm lại các thành phần trong Hình 1.2."]},
  p10b:{ok:["Chính xác!"], fix:["Bộ nhớ giống não ở việc ghi nhớ."]},
  hd2a:{ok:["Ví dụ hay, có so sánh."], fix:["So sánh có/không dùng máy tính."]},
  hd2b:{ok:["Ví dụ hay, có so sánh."], fix:["So sánh có/không dùng máy tính."]},
  hd2c:{ok:["Ví dụ hay, có so sánh."], fix:["So sánh có/không dùng máy tính."]},
  hd2d:{ok:["Ví dụ hay, có so sánh."], fix:["So sánh có/không dùng máy tính."]},
  p11:{ok:["Chính xác!"], fix:["Đọc lại phần ghi nhớ."]},
  lt1:{ok:["Chính xác!"], fix:["Bộ nhớ có chứa dữ liệu không?"]},
  lt2:{ok:["Phân loại đúng."], fix:["Thuyết trình là chia sẻ cho người khác."]},
  vd1:{ok:["Phân tích đủ 4 hoạt động."], fix:["Nêu đủ 4 hoạt động."]},
  vd2:{ok:["Lợi ích cụ thể."], fix:["Nêu ví dụ cụ thể trong lĩnh vực đó."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
const SORT_HINT = {ct:"Thu nhận: giác quan; Lưu trữ: ghi nhớ, ghi chép; Xử lí: suy nghĩ ra thông tin mới; Truyền: hành động, chia sẻ.", p9:"Nghe/xem: thu nhận; chép: lưu trữ; tính: xử lí.", lt2:"Quan sát: thu nhận; ghi chép: lưu trữ; chuyển thể: xử lí; thuyết trình: truyền.", tb:"Vào: đưa thông tin vào máy; Ra: đưa kết quả ra ngoài."};

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
    {title:"Quả phạt đền", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Xử lí thông tin", acts:[
    {title:"Hoạt động 1: Xử lí thông tin", tasks:["hd1a","hd1b","hd1c","hd1d","hd1e"]},
    {title:"Đọc hiểu: Bốn hoạt động xử lí thông tin", tasks:["ct"], concept:"c1"},
    {title:"Câu hỏi SGK trang 9", tasks:["p9"]},
    {title:"Ghi bài: Xử lí thông tin", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Xử lí thông tin trong máy tính", acts:[
    {title:"Đọc hiểu: Thành phần của máy tính", tasks:["tb"]},
    {title:"Câu hỏi SGK trang 10", tasks:["p10a","p10b"]},
    {title:"Hoạt động 2: Hiệu quả xử lí thông tin của máy tính", tasks:["hd2a","hd2b","hd2c","hd2d"], concept:"c2"},
    {title:"Câu hỏi SGK trang 11", tasks:["p11"]},
    {title:"Ghi bài: Xử lí thông tin trong máy tính", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Vật mang tin và phân loại công việc", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Xử lí thông tin quanh em", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin6-bai2", title: "Bài 2. Xử lí thông tin", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nêu đúng 4 hoạt động trong tình huống sút phạt đền…",
  commentPh: "Ví dụ: Nhóm phân loại đúng; cần nêu rõ hơn vai trò của bộ nhớ."};
})();
