/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Em chỉ nhớ vài câu trong một bài hát. Làm thế nào để tìm được cả bài hát đó trên Internet?",
    k:"Dùng <b>máy tìm kiếm</b> (Google, Cốc Cốc, Bing,…), gõ vài câu đã nhớ làm <b>từ khoá</b> → nhận được danh sách liên kết tới lời bài hát, video trình diễn."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Em đã bao giờ tìm kiếm thông tin trên Internet chưa? Em đã tìm gì? Kết quả có như em mong muốn không?",
    k:"Học sinh kể trải nghiệm; nhận xét: kết quả có khi rất nhiều, có khi chưa đúng ý → cần chọn từ khoá phù hợp."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em biết gì về máy tìm kiếm? Sử dụng máy tìm kiếm để tìm kiếm thông tin em thấy có thuận lợi và khó khăn gì?",
    k:"Thuận lợi: nhanh, nhiều kết quả, nhiều dạng (văn bản, hình ảnh, video). Khó khăn: quá nhiều kết quả, có thông tin không chính xác, cần chọn lọc."},
  mt:{type:"sort", label:"Đọc hiểu – Máy tìm kiếm", q:"Mỗi địa chỉ dưới đây có phải là máy tìm kiếm không?",
    cats:["Máy tìm kiếm","Không phải"], items:[["www.google.com",0],["www.bing.com",0],["www.coccoc.com",0],["www.yahoo.com",0],["vi.wikipedia.org",1],["mail.google.com",1]],
    k:"Máy tìm kiếm: Google, Bing, Cốc Cốc, Yahoo. Wikipedia là website bách khoa; mail.google.com là dịch vụ thư điện tử."},
  tk:{type:"mcq", label:"Đọc hiểu – Từ khoá", q:"Tìm thông tin về vai trò của tầng ozon. Từ khoá nào cho danh sách kết quả ít hơn, sát nội dung hơn?",
    o:["vai trò của tầng ozon","“vai trò của tầng ozon”","tầng","ozon vai trò tầng của"], a:1,
    k:"<b>B</b>. Đặt từ khoá trong dấu ngoặc kép → chỉ tìm trang có đúng cụm từ đó → <b>thu hẹp phạm vi</b> (khoảng 1 510 kết quả thay vì 52 900)."},
  p29a:{type:"match", label:"Câu hỏi tr.29 – Câu 1", q:"Thay các số trong mỗi câu bằng một cụm từ thích hợp (từ khoá, liên kết, tìm kiếm thông tin): a) Máy tìm kiếm là công cụ hỗ trợ …(1)… trên Internet theo yêu cầu của người sử dụng. b) Kết quả tìm kiếm là danh sách các …(2)…. c) Cần chọn …(3)… phù hợp.",
    items:[["(1)",3],["(2)",2],["(3)",1]], opts:["từ khoá","liên kết","tìm kiếm thông tin"], ph:"Chọn cụm từ…",
    k:"(1) tìm kiếm thông tin; (2) liên kết; (3) từ khoá."},
  p29b:{type:"mcq", label:"Câu hỏi tr.29 – Câu 2", q:"Sử dụng máy tìm kiếm em sẽ nhận được kết quả là gì?",
    o:["Danh sách liên kết trỏ đến các trang web có chứa từ khoá.","Nội dung thông tin cần tìm trên một trang web.","Danh sách địa chỉ các trang web có chứa thông tin cần tìm.","Danh sách liên kết dạng văn bản."], a:0,
    k:"<b>A</b>. Kết quả tìm kiếm là danh sách liên kết trỏ đến các trang web có chứa từ khoá."},
  th1:{type:"open", label:"Thực hành – So sánh kết quả", q:"Tìm lần lượt với từ khoá vai trò của tầng ozon và “vai trò của tầng ozon”. Ghi lại số kết quả của mỗi lần và so sánh.",
    k:"Có dấu ngoặc kép cho <b>ít kết quả hơn</b>, sát nội dung hơn. Các trang liên quan nhất thường xuất hiện ở đầu danh sách."},
  th2:{type:"order", label:"Thực hành – Sao chép văn bản", q:"Sắp xếp các bước sao chép một đoạn thông tin dạng văn bản từ trang web về tệp văn bản trên máy tính (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào một liên kết để xem nội dung",b:"Chọn (bôi đen) nội dung cần sao chép",c:"Nhấn tổ hợp phím Ctrl + C",d:"Mở tệp văn bản, nhấn tổ hợp phím Ctrl + V"}, start:["c","d","a","b"], ans:["a","b","c","d"],
    k:"Mở liên kết → chọn nội dung → <b>Ctrl + C</b> → mở tệp văn bản → <b>Ctrl + V</b>."},
  th3:{type:"mcq", label:"Thực hành – Lưu hình ảnh", q:"Để lưu một hình ảnh trên trang web thành tệp trên máy tính, em làm thế nào?",
    o:["Nháy chuột trái vào hình ảnh.","Nháy nút phải chuột vào hình ảnh, chọn lệnh Lưu hình ảnh thành… (Save image as…).","Nhấn phím Enter.","Chụp màn hình bằng điện thoại."], a:1,
    k:"<b>B</b>. Nháy nút phải chuột vào hình ảnh → <b>Lưu hình ảnh thành…</b> → chọn thư mục, đặt tên → Lưu. Muốn chỉ xem ảnh: nháy mục <b>Hình ảnh</b> để lọc kết quả."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Khi tìm kiếm thông tin bằng máy tìm kiếm, kết quả là danh sách liên kết dưới dạng nào?",
    o:["Văn bản.","Hình ảnh.","Video.","Văn bản, hình ảnh, video."], a:3, k:"<b>D</b>. Các liên kết có thể là văn bản, hình ảnh hoặc video."},
  lt2:{type:"mcq", label:"Luyện tập – Câu 2", q:"Để tìm kiếm thông tin về lớp vỏ Trái Đất, em sử dụng từ khoá nào để thu hẹp phạm vi tìm kiếm?",
    o:["Trái Đất.","Lớp vỏ Trái Đất.","“lớp vỏ Trái Đất”.","“lớp vỏ” + “Trái Đất”."], a:2, k:"<b>C</b>. Đặt cả cụm từ trong dấu ngoặc kép."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy tìm thông tin về Văn Miếu – Quốc Tử Giám trên mạng Internet. Ghi lại từ khoá em dùng và 2–3 thông tin em tìm được.",
    k:"Ví dụ từ khoá: “Văn Miếu Quốc Tử Giám”. Thông tin: xây dựng năm 1070 thời Lý Thánh Tông; Quốc Tử Giám là trường đại học đầu tiên của Việt Nam; có 82 tấm bia tiến sĩ,…"},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Gia đình em có kế hoạch đi du lịch Hạ Long. Hãy dùng máy tìm kiếm để: a) tìm thông tin thời tiết ở Hạ Long trong tuần này; b) tìm những điểm tham quan đẹp ở Hạ Long; c) sao chép và lưu các thông tin, hình ảnh vào một tệp văn bản để giới thiệu với gia đình.",
    k:"a) Từ khoá: “thời tiết Hạ Long”. b) “điểm tham quan Hạ Long” (hang Sửng Sốt, đảo Ti Tốp, động Thiên Cung,…). c) Ctrl + C, Ctrl + V văn bản; nháy phải → Lưu hình ảnh thành…"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Máy tìm kiếm là một website đặc biệt, giúp người sử dụng tìm kiếm thông tin trên Internet một cách nhanh chóng, hiệu quả thông qua các từ khoá.</li><li>Kết quả tìm kiếm là danh sách các liên kết. Các liên kết có thể là văn bản, hình ảnh hoặc video.</li><li>Từ khoá tìm kiếm rất quan trọng. Lựa chọn từ khoá phù hợp sẽ giúp tìm kiếm thông tin nhanh và chính xác.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Nhớ vài câu → dùng <b>máy tìm kiếm</b> tìm cả bài.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tìm kiếm thông tin trên Internet</p><ul><li><b>Máy tìm kiếm</b>: website giúp tìm thông tin qua <b>từ khoá</b>. VD: Google, Cốc Cốc.</li><li>Kết quả: <b>danh sách liên kết</b> (văn bản, hình ảnh, video).</li><li>Từ khoá trong <b>“ ”</b> → thu hẹp phạm vi tìm kiếm.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul><li>Sao chép chữ: <b>Ctrl + C</b> → <b>Ctrl + V</b>.</li><li>Lưu ảnh: nháy phải → <b>Lưu hình ảnh thành…</b></li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Thu hẹp: <b>“lớp vỏ Trái Đất”</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Chọn từ khoá <b>ngắn, đúng nội dung</b> cần tìm.</li></ul>'}
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
    return ["T6B7." + id + " · " + t.label, v];
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
    "title": "Tìm cả bài hát từ vài câu",
    "tasks": [
     "kd1"
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
  "title": "Tìm kiếm thông tin trên Internet",
  "acts": [
   {
    "title": "Hoạt động 1: Tìm kiếm thông tin trên Internet",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Máy tìm kiếm",
    "tasks": [
     "mt"
    ]
   },
   {
    "title": "Đọc hiểu: Từ khoá",
    "tasks": [
     "tk"
    ],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 29",
    "tasks": [
     "p29a",
     "p29b"
    ]
   },
   {
    "title": "Ghi bài: Tìm kiếm thông tin trên Internet",
    "tasks": [],
    "concept": "g2",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-2",
  "code": "2.2",
  "step": "Bước 2 · Thực hành",
  "title": "Tìm kiếm và khai thác thông tin trên Internet",
  "acts": [
   {
    "title": "Thực hành: Vai trò của tầng ozon",
    "tasks": [
     "th1",
     "th2",
     "th3"
    ]
   },
   {
    "title": "Ghi bài: Thực hành",
    "tasks": [],
    "concept": "g3",
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
    "title": "Kết quả và từ khoá",
    "tasks": [
     "lt1",
     "lt2"
    ]
   },
   {
    "title": "Ghi bài",
    "tasks": [],
    "concept": "g4",
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
    "title": "Tìm thông tin cho gia đình",
    "tasks": [
     "vd1",
     "vd2"
    ]
   },
   {
    "title": "Ghi bài",
    "tasks": [],
    "concept": "g5",
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
window.LESSON = {STAGES, id: "tin6-bai7", title: "Bài 7. Tìm kiếm thông tin trên Internet", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 so sánh được số kết quả khi có và không có dấu ngoặc kép…",
  commentPh: "Ví dụ: Nhóm chọn từ khoá phù hợp; cần lọc kết quả hình ảnh."};
})();
