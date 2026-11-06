/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd:{type:"open", label:"Khởi động – Làm theo chỉ dẫn", q:"Chơi trò “Làm theo chỉ dẫn” theo cặp: một bạn nhìn bức tranh đơn giản và đưa ra từng chỉ dẫn, bạn kia vẽ lại mà không được nhìn tranh. So sánh hai bức tranh: các chỉ dẫn có rõ ràng không, bạn vẽ có làm đúng chỉ dẫn không?",
    k:"Bức tranh giống nhau khi chỉ dẫn <b>rõ ràng, đúng thứ tự</b> và người vẽ <b>hiểu, làm đúng</b> từng chỉ dẫn. Chỉ dẫn mơ hồ (“vẽ một bông hoa”) dễ cho kết quả khác."},
  hd1:{type:"open", label:"HĐ1 – Thực hiện thuật toán", q:"Nếu thuật toán được chuyển giao cho máy tính thực hiện thì theo em, làm thế nào để máy tính có thể hiểu và thực hiện được?",
    k:"Phải viết thuật toán bằng một <b>ngôn ngữ lập trình</b> mà máy tính hiểu được (ví dụ Scratch), tức là tạo ra một <b>chương trình</b>."},
  q1:{type:"match", label:"Câu hỏi – Thuật toán và chương trình", q:"Dựa vào chương trình tính tổng hai số bằng ngôn ngữ tự nhiên và chương trình Scratch ở Hình 6.13, ghép mỗi công việc với bước mô tả và các câu lệnh Scratch tương ứng.",
    items:[["Nhập dữ liệu đầu vào",1],["Xử lí",2],["Thông báo đầu ra",3]],
    opts:["a) Bước 1. Nhập hai số a và b – lệnh ③ ④ ⑤ ⑥","b) Bước 2. tong = a + b – lệnh ⑦","c) Bước 3. Thông báo giá trị của tong – lệnh ⑧"], ph:"Chọn bước và lệnh…",
    k:"Nhập đầu vào: bước 1 ↔ lệnh ③④⑤⑥ (hỏi và đặt a, b). Xử lí: bước 2 ↔ lệnh ⑦ (đặt tong là a + b). Đầu ra: bước 3 ↔ lệnh ⑧ (nói tong). Lệnh ①② là bắt đầu chương trình và lời chào."},
  th1:{type:"open", label:"Thực hành – Đầu vào, đầu ra", q:"Ba bạn An, Minh, Khoa làm thiệp chúc mừng để bán lấy tiền mua sách tặng các bạn vùng khó khăn. Gọi số tiền bán được là a, số tiền mua vật liệu là b. Em hãy xác định đầu vào, đầu ra của bài toán tính số tiền lãi thu được hoặc số tiền bị lỗ.",
    k:"Đầu vào: hai số <b>a, b</b>. Đầu ra: <b>số tiền lãi hoặc số tiền bị lỗ</b>. Nếu a ≥ b thì tiền lãi = a − b, còn không thì tiền bị lỗ = b − a."},
  th2:{type:"mcq", label:"Thực hành – Chạy thử chương trình", q:"Chạy chương trình tính tiền bán thiệp với số tiền bán được a = 150 000 đồng, số tiền mua vật liệu b = 200 000 đồng. Chương trình sẽ thông báo gì?",
    o:["Số tiền lãi là 50 000","Số tiền bị lỗ là 50 000","Số tiền lãi là 350 000","Số tiền bị lỗ là 0"], a:1,
    k:"<b>B</b>. a ≥ b sai (150 000 &lt; 200 000) nên đi theo nhánh Sai: tiền bị lỗ = b − a = 50 000."},
  th3:{type:"open", label:"Thực hành – Tạo chương trình", q:"Tạo chương trình Scratch tính tiền bán thiệp theo sơ đồ khối Hình 6.14 rồi chạy thử với hai bộ dữ liệu (một bộ có lãi, một bộ bị lỗ). Ghi lại dữ liệu em đã nhập và kết quả chương trình thông báo.",
    k:"Ví dụ: a = 300 000, b = 180 000 → “Số tiền lãi là 120 000”; a = 100 000, b = 120 000 → “Số tiền bị lỗ là 20 000”."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Tìm câu sai.",
    o:["Chương trình máy tính là một dãy các lệnh mà máy tính có thể hiểu và thực hiện được.","Chương trình máy tính được viết bằng ngôn ngữ lập trình.","Máy tính có thể thực hiện các lệnh trong chương trình theo trình tự tuỳ ý."], a:2,
    k:"<b>C</b> sai: máy tính thực hiện các lệnh <b>theo đúng trình tự</b> trong chương trình."},
  lt2:{type:"open", label:"Luyện tập – Câu 2a, b, d", q:"Cho chương trình Scratch như ở Hình 6.15. a) Chương trình đó thực hiện thuật toán nào? b) Xác định đầu vào, đầu ra của thuật toán đó. d) Trình bày thuật toán bằng sơ đồ khối.",
    k:"a) Tính <b>điểm trung bình</b> ba môn Toán, Văn, Tiếng Anh và thông báo khen nếu điểm trung bình lớn hơn 8.0. b) Đầu vào: ba điểm a, b, c; đầu ra: lời thông báo. d) Bắt đầu → [nhập a, b, c] → DTB ← (a + b + c) : 3 → ◇ DTB &gt; 8.0? Đúng: [“Bạn được thưởng ngôi sao”], Sai: [“Bạn cố gắng lên nhé”] → Kết thúc."},
  lt2c:{type:"mcq", label:"Luyện tập – Câu 2c", q:"Với chương trình ở Hình 6.15, nếu nhập điểm Toán 8, điểm Văn 8, điểm Tiếng Anh 8 thì chương trình nói gì?",
    o:["Bạn được thưởng ngôi sao","Bạn cố gắng lên nhé","Không nói gì","8.0"], a:1,
    k:"<b>B</b>. DTB = (8 + 8 + 8) : 3 = 8; điều kiện DTB &gt; 8.0 <b>sai</b> nên nói “Bạn cố gắng lên nhé”. Ví dụ khác: 9, 8, 10 → DTB = 9 → “Bạn được thưởng ngôi sao”."},
  lt3:{type:"open", label:"Luyện tập – Câu 3", q:"Cho chương trình Scratch như ở Hình 6.16. a) Chương trình đó thực hiện công việc gì? b) Các cấu trúc điều khiển tuần tự, rẽ nhánh và lặp có được sử dụng trong chương trình không? Hãy nêu các câu lệnh trong chương trình thể hiện cấu trúc đó.",
    k:"a) Nhân vật nói “Xin chào!” trong 2 giây, rồi 10 lần: đi 10 bước, chơi trống, nếu chạm biên thì bật lại. b) <b>Tuần tự</b>: các khối xếp nối tiếp; <b>lặp</b>: “lặp lại 10 lần”; <b>rẽ nhánh</b> nằm trong khối “nếu chạm biên, bật lại” (chạm biên mới bật lại)."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy vẽ sơ đồ khối mô tả thuật toán tìm số lớn hơn trong hai số a và b. Từ sơ đồ khối, hãy viết chương trình Scratch thực hiện thuật toán.",
    k:"Bắt đầu → [nhập a, b] → ◇ a &gt; b? Đúng: [thông báo a], Sai: [thông báo b] → Kết thúc. Scratch: hỏi, đặt a, b; <i>nếu a &gt; b thì nói a, còn không thì nói b</i>."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em hãy viết chương trình Scratch thực hiện thuật toán tính trung bình cộng của ba số.",
    k:"Hỏi và đặt a, b, c → đặt TBC là (a + b + c) / 3 → nói TBC. Ví dụ nhập 4, 5, 9 → nói 6."}
};
const CONCEPTS = {
  c1:{t:"Chương trình", b:"<ul><li>Máy tính thực hiện công việc theo chương trình.</li><li>Chương trình là mô tả thuật toán để máy tính “hiểu” và thực hiện được.</li><li>Chương trình dựa trên các dữ liệu đầu vào, tiến hành các bước xử lí để trả lại kết quả đầu ra.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Chỉ dẫn <b>rõ ràng</b> + làm <b>đúng</b> → kết quả đúng.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Chương trình máy tính</p><ul><li><b>Chương trình</b> = các lệnh viết bằng <b>ngôn ngữ lập trình</b>, mô tả thuật toán cho máy tính.</li><li>VD ngôn ngữ: Scratch, Python, C, Java.</li><li>Đầu vào → xử lí → đầu ra.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành: Tạo chương trình</p><ul><li>Tiền thiệp: <b>a ≥ b</b> → lãi = a − b; ngược lại → lỗ = b − a.</li><li>Rẽ nhánh đủ trong Scratch: <b>nếu… thì… còn không thì</b>.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Máy tính làm lệnh <b>đúng trình tự</b>, không tuỳ ý.</li><li>Hình 6.16: tuần tự + <b>lặp lại 10 lần</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li><b>Sơ đồ khối → chương trình Scratch</b>: mỗi hình ↔ một (vài) lệnh.</li></ul>'}
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
    return ["T6B17." + id + " · " + t.label, v];
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
const STAGES = [
 {
  "id": "mo-dau",
  "code": "1",
  "step": "Bước 1",
  "title": "Khởi động",
  "acts": [
   {
    "title": "Trò chơi: Làm theo chỉ dẫn",
    "tasks": [
     "kd"
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
  "title": "Chương trình máy tính",
  "acts": [
   {
    "title": "Hoạt động 1: Thực hiện thuật toán",
    "tasks": [
     "hd1"
    ]
   },
   {
    "title": "Đọc hiểu: Chương trình máy tính",
    "tasks": [
     "q1"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Chương trình máy tính",
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
  "title": "Thực hành: Tạo chương trình máy tính",
  "acts": [
   {
    "title": "Thực hành: Tính tiền bán thiệp",
    "tasks": [
     "th1",
     "th2",
     "th3"
    ]
   },
   {
    "title": "Ghi bài: Thực hành: Tạo chương trình máy tính",
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
    "title": "Đọc hiểu chương trình",
    "tasks": [
     "lt1",
     "lt2",
     "lt2c",
     "lt3"
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
    "title": "Từ sơ đồ khối đến chương trình",
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
window.LESSON = {STAGES, id: "tin6-bai17", title: "Bài 17. Chương trình máy tính", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 4 ghép đúng các lệnh với các bước; chạy thử với a = 300 000, b = 180 000…",
  commentPh: "Ví dụ: Chương trình chạy đúng; cần thử thêm trường hợp bị lỗ."};
})();
