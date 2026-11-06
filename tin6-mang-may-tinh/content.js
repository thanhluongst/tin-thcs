/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const DS = ["Đúng","Sai"];
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Theo em, vì sao những nơi có đường đi qua thường trù phú hơn những nơi khác? Đường giao thông có vai trò gì?",
    k:"Đường <b>kết nối</b> mọi người, mọi nơi với nhau, giúp đi lại, trao đổi hàng hoá → nơi có đường thường phát triển hơn. Nhiều con đường nối với nhau tạo thành <b>mạng lưới</b>."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Em hãy kể ra một số mạng lưới, giống như mạng giao thông đường bộ.",
    k:"Mạng đường sắt, mạng đường thuỷ, mạng ống nước, mạng tải điện, mạng điện thoại, mạng máy tính,…"},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Những gì được vận chuyển trên mạng lưới đó?",
    k:"Đường bộ, đường sắt, đường thuỷ: người, hàng hoá. Ống nước: nước. Tải điện: điện. Điện thoại: tiếng nói. Mạng máy tính: dữ liệu, thông tin."},
  hd1c:{type:"sort", label:"HĐ1 – Câu 3", q:"Điểm chung của những mạng lưới đó là gì? Chọn Đúng hoặc Sai cho từng phương án.",
    cats:DS, items:[["A. Có nhiều thành viên.",0],["B. Chia sẻ tài nguyên.",0],["C. Kết nối các thành viên.",0],["D. Có nhiều đường cắt nhau.",1]],
    k:"<b>A, B, C</b>. Mạng lưới có nhiều thành viên, <b>kết nối</b> các thành viên và <b>chia sẻ</b> tài nguyên cho nhiều người. “Nhiều đường cắt nhau” không phải đặc điểm chung."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Mạng máy tính chia sẻ những gì?",
    k:"Chia sẻ <b>dữ liệu</b> (tệp ảnh, văn bản, video,…) và <b>thiết bị</b> (máy in, máy quét,…)."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Em hãy nêu một số ví dụ về lợi ích của mạng máy tính.",
    k:"Ví dụ: gửi tệp ảnh từ máy Minh sang máy An; cả phòng máy dùng chung một máy in; học trực tuyến, nhắn tin, gọi video với người ở xa."},
  ln:{type:"sort", label:"Đọc hiểu – Lợi ích của mạng máy tính", q:"Mỗi ví dụ dưới đây thể hiện lợi ích nào của mạng máy tính?",
    cats:["Trao đổi dữ liệu","Dùng chung thiết bị"],
    items:[["Minh gửi tệp ảnh từ máy của mình sang máy của An",0],["Cô giáo gửi bài tập cho cả lớp qua mạng",0],["Cả phòng máy in tài liệu bằng một máy in",1],["Nhiều máy tính dùng chung một máy quét",1]],
    k:"Mạng máy tính giúp người dùng <b>trao đổi dữ liệu</b> và <b>dùng chung thiết bị</b> trên mạng."},
  p17:{type:"open", label:"Câu hỏi tr.17", q:"Em hãy thảo luận với bạn về lợi ích của mạng máy tính.",
    k:"Liên lạc với nhau để trao đổi thông tin; chia sẻ dữ liệu; dùng chung các thiết bị (máy in, máy quét,…) → tiết kiệm, nhanh chóng."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Quan sát Hình 2.1 và cho biết những thiết bị nào đang được nối vào mạng?",
    k:"Hai máy tính để bàn, máy quét, máy tính xách tay, máy chủ, máy in, điện thoại di động, bộ chuyển mạch, bộ định tuyến không dây."},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Các thiết bị đó được nối với nhau như thế nào? Qua các thiết bị trung gian nào?",
    k:"Máy tính để bàn, máy chủ, máy in, máy quét nối bằng <b>dây</b> vào <b>bộ chuyển mạch</b>; máy tính xách tay, điện thoại nối <b>không dây</b> qua <b>bộ định tuyến không dây</b>."},
  tp:{type:"sort", label:"Đọc hiểu – Thành phần của mạng", q:"Xếp mỗi mục dưới đây vào thành phần phù hợp của mạng máy tính.",
    cats:["Thiết bị đầu cuối","Thiết bị kết nối","Phần mềm mạng"],
    items:[["Máy tính để bàn",0],["Điện thoại thông minh",0],["Máy in",0],["Máy ảnh",0],["Bộ chuyển mạch (Switch)",1],["Bộ định tuyến (Router)",1],["Dây cáp mạng",1],["Điểm truy cập không dây (Access Point)",1],["Ứng dụng truyền thông trên thiết bị đầu cuối",2],["Phần mềm điều khiển quá trình truyền dữ liệu",2]],
    k:"<b>Thiết bị đầu cuối</b>: điểm xuất phát, đích đến (máy tính, điện thoại, máy in,…). <b>Thiết bị kết nối</b>: đường truyền, bộ chia, bộ chuyển mạch, bộ định tuyến,… <b>Phần mềm mạng</b>: như luật giao thông, giúp dữ liệu đi đến đúng nơi."},
  p19a:{type:"sort", label:"Câu hỏi tr.19 – Câu 1", q:"Quan sát Hình 2.1, xếp mỗi thiết bị vào nhóm thiết bị đầu cuối hoặc thiết bị kết nối.",
    cats:["Thiết bị đầu cuối","Thiết bị kết nối"],
    items:[["Máy tính để bàn",0],["Máy quét",0],["Máy tính xách tay",0],["Máy chủ",0],["Máy in",0],["Điện thoại di động",0],["Bộ chuyển mạch",1],["Bộ định tuyến không dây",1]],
    k:"a) Đầu cuối: máy tính để bàn, máy quét, máy tính xách tay, máy chủ, máy in, điện thoại di động. b) Kết nối: bộ chuyển mạch, bộ định tuyến không dây."},
  p19b:{type:"open", label:"Câu hỏi tr.19 – Câu 2", q:"Em hãy kể tên một số cách kết nối không dây mà em biết.",
    k:"Wi-Fi, Bluetooth, mạng di động 3G/4G/5G, hồng ngoại, NFC,…"},
  p19c:{type:"open", label:"Câu hỏi tr.19 – Câu 3", q:"Em hãy nêu ví dụ cho thấy kết nối không dây thuận tiện hơn kết nối có dây.",
    k:"Ví dụ: hành khách trên xe khách dùng điện thoại truy cập Internet; mang máy tính xách tay đi khắp nhà vẫn vào mạng; ở sân bay, nhà ga, trường học dùng Wi-Fi miễn phí; không phải khoan đục tường, đi dây."},
  lt1:{type:"sort", label:"Luyện tập – Câu 1", q:"Máy tính kết nối với nhau để làm gì? Chọn Đúng hoặc Sai cho từng phương án.",
    cats:DS, items:[["A. Chia sẻ các thiết bị.",0],["B. Tiết kiệm điện.",1],["C. Trao đổi dữ liệu.",0],["D. Thuận lợi cho việc sửa chữa.",1]],
    k:"<b>A, C</b>. Kết nối mạng để chia sẻ thiết bị và trao đổi dữ liệu."},
  lt2:{type:"sort", label:"Luyện tập – Câu 2", q:"Thiết bị có kết nối không dây ở Hình 2.2 là gì? Chọn Đúng hoặc Sai.",
    cats:DS, items:[["A. Máy tính để bàn.",1],["B. Máy tính xách tay.",0],["C. Điện thoại di động.",0],["D. Bộ định tuyến.",1]],
    k:"<b>B, C</b>. Máy tính xách tay và điện thoại di động kết nối không dây với bộ định tuyến không dây; máy tính để bàn và bộ định tuyến nối bằng dây."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Phòng thư viện của trường có 5 máy tính cần kết nối thành một mạng. Em hãy vẽ (hoặc mô tả) hai cách khác để kết nối chúng thành một mạng.",
    k:"Ví dụ: cách 1 – cả 5 máy nối vào <b>một bộ chuyển mạch</b> (hình sao); cách 2 – nối các máy thành <b>một vòng</b>; cách 3 – dùng <b>bộ định tuyến không dây</b>. Miễn là từ mỗi máy đều đi được tới mọi máy khác."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Nhà bạn An có điện thoại di động của bố, của mẹ và một máy tính xách tay đang cùng truy cập mạng Internet. Các thiết bị đó có đang được kết nối thành một mạng máy tính không? Nếu có, hãy chỉ ra các thiết bị đầu cuối và thiết bị kết nối.",
    k:"<b>Có</b>. Thiết bị đầu cuối: hai điện thoại, máy tính xách tay. Thiết bị kết nối: bộ định tuyến không dây (modem Wi-Fi), đường truyền."}
};
const CONCEPTS = {
  c1:{t:"Mạng máy tính", b:"<ul><li>Hai hay nhiều máy tính và các thiết bị được kết nối để truyền thông tin cho nhau tạo thành một mạng máy tính.</li><li>Lợi ích của mạng máy tính: người sử dụng có thể liên lạc với nhau để trao đổi thông tin, chia sẻ dữ liệu và dùng chung các thiết bị trên mạng.</li></ul>"},
  c2:{t:"Các thành phần chính của mạng máy tính", b:"<p>Mạng máy tính gồm:</p><ul><li>Các thiết bị đầu cuối (máy tính, điện thoại, máy in, máy ảnh,…).</li><li>Các thiết bị kết nối (đường truyền dữ liệu, bộ chia, bộ chuyển mạch, bộ định tuyến,…).</li><li>Phần mềm mạng (ứng dụng truyền thông và phần mềm điều khiển quá trình truyền dữ liệu).</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Mạng lưới: <b>kết nối</b> và <b>chia sẻ</b>.</li></ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Mạng máy tính là gì?</p><ul>'
    + "<li><b>Mạng máy tính</b>: hai hay nhiều máy tính, thiết bị <b>kết nối</b> để truyền thông tin.</li>"
    + "<li>Lợi ích: <b>trao đổi</b> thông tin, <b>chia sẻ</b> dữ liệu, <b>dùng chung</b> thiết bị.</li></ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Các thành phần của mạng máy tính</p><ul>'
    + "<li><b>Thiết bị đầu cuối</b>: máy tính, điện thoại, máy in,…</li>"
    + "<li><b>Thiết bị kết nối</b>: dây, bộ chuyển mạch, bộ định tuyến,…</li>"
    + "<li><b>Phần mềm mạng</b>. Không dây: Wi-Fi, Bluetooth → <b>tiện</b>, dễ di chuyển.</li></ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Kết nối mạng để <b>chia sẻ thiết bị</b>, <b>trao đổi dữ liệu</b>.</li></ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Nhiều cách kết nối; điện thoại + laptop + Wi-Fi ở nhà = <b>một mạng</b>.</li></ul>"}
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
    return ["T6B4." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1:{ok:["Ý kiến hay."], fix:["Đường giúp mọi người làm gì?"]},
  hd1a:{ok:["Kể được nhiều mạng lưới."], fix:["Kể thêm mạng điện, nước, điện thoại."]},
  hd1b:{ok:["Đúng."], fix:["Mỗi mạng lưới chở gì?"]},
  hd1c:{ok:["Chọn đúng."], fix:["Mạng lưới làm gì cho các thành viên?"]},
  hd2a:{ok:["Đúng."], fix:["Nêu cả dữ liệu và thiết bị."]},
  hd2b:{ok:["Ví dụ phù hợp."], fix:["Nêu ví dụ cụ thể ở trường, ở nhà."]},
  ln:{ok:["Phân loại đúng."], fix:["Gửi tệp là trao đổi dữ liệu."]},
  p17:{ok:["Thảo luận tốt."], fix:["Nêu đủ ba lợi ích."]},
  hd3a:{ok:["Kể đủ thiết bị."], fix:["Quan sát kĩ Hình 2.1."]},
  hd3b:{ok:["Đúng."], fix:["Thiết bị nào ở giữa nối các máy?"]},
  tp:{ok:["Phân loại đúng."], fix:["Thiết bị đó là điểm đến hay là đường nối?"]},
  p19a:{ok:["Phân loại đúng."], fix:["Thiết bị kết nối nằm ở giữa."]},
  p19b:{ok:["Đúng."], fix:["Điện thoại em kết nối không dây bằng cách nào?"]},
  p19c:{ok:["Ví dụ thuyết phục."], fix:["Khi đang di chuyển thì sao?"]},
  lt1:{ok:["Chọn đúng."], fix:["Mạng có giúp tiết kiệm điện không?"]},
  lt2:{ok:["Chọn đúng."], fix:["Thiết bị nào có sóng nối tới bộ định tuyến không dây?"]},
  vd1:{ok:["Hai cách hợp lí."], fix:["Mỗi máy phải đi được tới mọi máy khác."]},
  vd2:{ok:["Chỉ đúng các thiết bị."], fix:["Thiết bị nào giúp các máy vào mạng?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
const SORT_HINT = {tp:"Đầu cuối: nơi dữ liệu xuất phát/đến; Kết nối: đường đi và thiết bị nối; Phần mềm: điều khiển việc truyền.", p19a:"Thiết bị kết nối nằm ở giữa để nối các thiết bị đầu cuối."};

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
    {title:"Con đường và mạng lưới", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Mạng máy tính là gì?", acts:[
    {title:"Hoạt động 1: Mạng lưới", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Hoạt động 2: Mạng máy tính", tasks:["hd2a","hd2b"]},
    {title:"Đọc hiểu: Lợi ích của mạng máy tính", tasks:["ln"], concept:"c1"},
    {title:"Câu hỏi SGK trang 17", tasks:["p17"]},
    {title:"Ghi bài: Mạng máy tính là gì?", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Các thành phần của mạng máy tính", acts:[
    {title:"Hoạt động 3: Thành phần mạng", tasks:["hd3a","hd3b"]},
    {title:"Đọc hiểu: Thành phần chính, mạng không dây", tasks:["tp"], concept:"c2"},
    {title:"Câu hỏi SGK trang 19", tasks:["p19a","p19b","p19c"]},
    {title:"Ghi bài: Các thành phần của mạng", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Lợi ích và kết nối không dây", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Kết nối mạng ở trường, ở nhà", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin6-bai4", title: "Bài 4. Mạng máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 kể được 4 mạng lưới và nêu đúng đặc điểm chung…",
  commentPh: "Ví dụ: Nhóm phân biệt đúng thiết bị đầu cuối và thiết bị kết nối."};
})();
