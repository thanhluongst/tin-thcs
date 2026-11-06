/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Khi truy cập Internet, em thường xem những thông tin gì? Các trang thông tin đó được nối với nhau như thế nào?",
    k:"Ví dụ: tin tức, truyện, bài hát, hình ảnh, video,… Các trang thông tin được <b>nối với nhau bằng liên kết</b> tạo thành một mạng giống mạng nhện bao trùm thế giới → World Wide Web."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Thông tin trong một cuốn sách được tổ chức như thế nào?",
    k:"Theo <b>trình tự</b>: chương, bài, mục, trang; có mục lục để tìm. Người đọc thường đọc lần lượt từng trang."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em đã xem thông tin trên Internet chưa? Trên Internet có những dạng thông tin gì?",
    k:"Văn bản, hình ảnh, âm thanh, video,… thường được kết hợp trên cùng một trang và có <b>liên kết</b> tới trang khác."},
  kn:{type:"match", label:"Đọc hiểu – Các khái niệm", q:"Ghép mỗi khái niệm với mô tả phù hợp.",
    items:[["Trang siêu văn bản",1],["Trang web",2],["Website",3],["Trang chủ",4],["World Wide Web",5]],
    opts:["Trang văn bản đặc biệt, tích hợp nhiều dạng dữ liệu và chứa các liên kết","Trang siêu văn bản được gán một địa chỉ truy cập trên Internet","Tập hợp các trang web liên quan, truy cập qua một địa chỉ","Trang được mở ra đầu tiên khi truy cập một website","Hệ thống các website trên Internet (mạng thông tin toàn cầu)"], ph:"Chọn mô tả…",
    k:"Trang siêu văn bản → trang web (có địa chỉ) → website (tập hợp trang web, địa chỉ trang chủ) → WWW (hệ thống các website)."},
  p24a:{type:"mcq", label:"Câu hỏi tr.24 – Câu 1", q:"Trang siêu văn bản là:",
    o:["Trang văn bản thông thường không chứa liên kết.","Trang văn bản đặc biệt tích hợp nhiều dạng dữ liệu khác nhau và chứa các liên kết.","Trang văn bản đặc biệt tích hợp nhiều dạng dữ liệu khác nhau không chứa liên kết."], a:1,
    k:"<b>B</b>. Trang siêu văn bản tích hợp nhiều dạng dữ liệu và chứa các liên kết."},
  p24b:{type:"open", label:"Câu hỏi tr.24 – Câu 2", q:"Hãy nêu địa chỉ một số website có nội dung phục vụ việc học tập.",
    k:"Ví dụ: https://vi.wikipedia.org, https://hoc10.vn, https://vtv7.vtv.vn, https://olm.vn, https://hoctot.nam.name.vn, website của trường em,…"},
  p25a:{type:"open", label:"Câu hỏi tr.25 – Câu 1", q:"Em hãy kể tên một số trình duyệt mà em biết.",
    k:"Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Cốc Cốc, Opera,…"},
  p25b:{type:"order", label:"Câu hỏi tr.25 – Câu 2", q:"Để truy cập một trang web ta cần làm thế nào? Sắp xếp các bước (dùng nút ↑ ↓).",
    items:{a:"Nháy đúp chuột vào biểu tượng trình duyệt",b:"Nhập địa chỉ trang web vào ô địa chỉ",c:"Nhấn phím Enter"}, start:["c","a","b"], ans:["a","b","c"],
    k:"Mở trình duyệt → nhập địa chỉ trang web vào <b>thanh địa chỉ</b> → nhấn <b>Enter</b>."},
  th1:{type:"open", label:"Thực hành – Tra cứu Wikipedia", q:"Truy cập https://vi.wikipedia.org, gõ một từ hoặc cụm từ (ví dụ: Internet) vào ô tìm kiếm. Ghi lại tên bài viết và hai thông tin em thấy hay.",
    k:"Học sinh ghi tên bài viết và 2 thông tin chính. Nêu được các phần chính của trang: tên và biểu tượng trang, ô tìm kiếm, các mục chính, bài viết chọn lọc, bạn có biết…"},
  th2:{type:"open", label:"Thực hành – Thời tiết, thời sự", q:"Truy cập https://nchmf.gov.vn (thời tiết) hoặc https://vtvgo.vn (thời sự). Ghi lại thông tin thời tiết hôm nay ở nơi em sống (hoặc một bản tin thời sự) và lưu địa chỉ trang vào thanh đánh dấu.",
    k:"Ghi được nhiệt độ thấp nhất, cao nhất, tình hình mưa nắng; nháy nút ☆ (Bookmark) để lưu địa chỉ trang lên thanh đánh dấu."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Thông tin trên Internet được tổ chức như thế nào?",
    o:["Tương tự như thông tin trong cuốn sách.","Thành từng văn bản rời rạc.","Thành các trang siêu văn bản kết nối với nhau bởi các liên kết.","Một cách tuỳ ý."], a:2,
    k:"<b>C</b>. Các trang siêu văn bản kết nối với nhau bởi các liên kết."},
  lt2:{type:"match", label:"Luyện tập – Câu 2", q:"Ghép mỗi nội dung ở cột A với một nội dung phù hợp ở cột B.",
    items:[["1) Website là tập hợp",3],["2) Khi duyệt web, muốn chuyển đến một nội dung khác hoặc một trang web khác thì ta nháy chuột vào",4],["3) Để truy cập các trang web ta cần",1],["4) WWW là hệ thống các",2]],
    opts:["a) sử dụng trình duyệt web.","b) website trên Internet.","c) các trang web liên quan được truy cập thông qua một địa chỉ.","d) liên kết trỏ đến đó."],
    k:"1 – c; 2 – d; 3 – a; 4 – b."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Có điểm gì khác nhau giữa cách tổ chức thông tin trong cuốn sách với cách tổ chức thông tin trên Internet?",
    k:"Sách: thông tin sắp xếp <b>theo trình tự</b> trang, chương; chủ yếu chữ và hình. Internet: các trang siêu văn bản <b>nối với nhau bằng liên kết</b>, có nhiều dạng (âm thanh, video), nhảy tới trang khác chỉ bằng một cú nháy chuột, thường xuyên được cập nhật."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Truy cập https://hoahoctro.tienphong.vn và https://vtv7.vtv.vn, xem thông tin trên trang (tên, biểu tượng, các mục chính,…), theo các liên kết đến các trang khác và lưu địa chỉ trang em thích vào thanh đánh dấu. Ghi lại kết quả.",
    k:"Học sinh nêu tên website, biểu tượng, các mục chính, một trang đã mở qua liên kết và trang đã lưu đánh dấu."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Thông tin trên Internet được tạo nên từ nhiều trang web kết nối với nhau bởi các liên kết. Mỗi trang web có địa chỉ truy cập riêng.</li><li>Website là một tập hợp các trang web liên quan được truy cập thông qua một địa chỉ. Địa chỉ của trang chủ là địa chỉ của website.</li><li>World Wide Web là mạng thông tin toàn cầu, liên kết các website trên Internet.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Trình duyệt là phần mềm giúp người sử dụng truy cập các trang web trên Internet.</li><li>Người sử dụng có thể theo các liên kết để khai thác thông tin từ các trang web.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Các trang thông tin trên Internet <b>nối với nhau</b> như mạng nhện → <b>mạng thông tin toàn cầu</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tổ chức thông tin trên Internet</p><ul><li><b>Trang web</b>: trang siêu văn bản (nhiều dạng dữ liệu + <b>liên kết</b>), có địa chỉ.</li><li><b>Website</b>: tập hợp trang web liên quan; địa chỉ = địa chỉ <b>trang chủ</b>.</li><li><b>WWW</b>: hệ thống các website trên Internet.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Trình duyệt</p><ul><li><b>Trình duyệt</b>: phần mềm truy cập trang web. VD: Chrome, Edge, Cốc Cốc.</li><li>Nhập địa chỉ vào <b>thanh địa chỉ</b> → Enter; nháy <b>liên kết</b> để duyệt web.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul><li>Nút ← → ⟳ ⌂; nút <b>☆</b> lưu trang lên <b>thanh đánh dấu</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Thông tin trên Internet: các trang siêu văn bản nối bằng <b>liên kết</b>.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Sách: đọc <b>theo trình tự</b>; Internet: nhảy trang bằng <b>liên kết</b>.</li></ul>'}
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
    return ["T6B6." + id + " · " + t.label, v];
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
    "title": "Thế giới thông tin rộng lớn",
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
  "title": "Tổ chức thông tin trên Internet",
  "acts": [
   {
    "title": "Hoạt động 1: Tìm hiểu cách tổ chức thông tin",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Trang web, website, WWW",
    "tasks": [
     "kn"
    ],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 24",
    "tasks": [
     "p24a",
     "p24b"
    ]
   },
   {
    "title": "Ghi bài: Tổ chức thông tin trên Internet",
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
  "title": "Trình duyệt",
  "acts": [
   {
    "title": "Đọc hiểu: Trình duyệt web",
    "tasks": [],
    "concept": "c2"
   },
   {
    "title": "Câu hỏi: SGK trang 25",
    "tasks": [
     "p25a",
     "p25b"
    ]
   },
   {
    "title": "Ghi bài: Trình duyệt",
    "tasks": [],
    "concept": "g3",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-3",
  "code": "2.3",
  "step": "Bước 2 · Thực hành",
  "title": "Khai thác thông tin trên trang web",
  "acts": [
   {
    "title": "Thực hành: Duyệt web",
    "tasks": [
     "th1",
     "th2"
    ]
   },
   {
    "title": "Ghi bài: Thực hành",
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
    "title": "Tổ chức thông tin, khái niệm",
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
    "title": "Sách và Internet",
    "tasks": [
     "vd1",
     "vd2"
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
window.LESSON = {STAGES, id: "tin6-bai6", title: "Bài 6. Mạng thông tin toàn cầu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 truy cập đúng trang, ghi lại được 3 thông tin chính…",
  commentPh: "Ví dụ: Nhóm phân biệt được trang web và website; cần nhớ cách lưu đánh dấu."};
})();
