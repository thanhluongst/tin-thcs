/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd:{type:"order", label:"Khởi động – Gấp hình trò chơi", q:"Sắp xếp các bước gấp hình trò chơi Đông-Tây-Nam-Bắc theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Gấp hai đường chéo của tờ giấy hình vuông để tạo nếp gấp, mở tờ giấy ra.",b:"Gấp bốn góc của tờ giấy vào tâm.",c:"Lật mặt bên kia.",d:"Tiếp tục gấp bốn góc vào tâm.",e:"Đặt tờ giấy đã gấp nằm ngang, luồn ngón cái và ngón trỏ của hai tay vào bốn góc ở mặt dưới.",f:"Chỉnh sửa các nếp gấp."},
    start:["c","a","e","b","f","d"], ans:["a","b","c","d","e","f"],
    k:"a → b → c → d → e → f: đúng sáu bước theo hướng dẫn (Hình 6.1)."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Nếu đảo thứ tự của bước 3 và bước 4 trong hướng dẫn trên thì em có gấp được hình trò chơi Đông-Tây-Nam-Bắc không? Tại sao?",
    k:"<b>Không</b>. Nếu chưa lật mặt mà gấp tiếp bốn góc vào tâm thì các góc chồng lên cùng một mặt, không tạo được bốn túi để luồn ngón tay. Thay đổi thứ tự các bước thì <b>kết quả sẽ khác</b>."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Trước khi thực hiện theo hướng dẫn trên, em cần có gì? Sau khi thực hiện lần lượt sáu bước theo hướng dẫn, em nhận được kết quả là gì?",
    k:"Cần có <b>một tờ giấy hình vuông</b> (đầu vào). Kết quả là <b>hình trò chơi Đông-Tây-Nam-Bắc</b> (đầu ra)."},
  q1:{type:"mcq", label:"Câu hỏi 1 – Thuật toán là gì?", q:"Thuật toán là gì?",
    o:["Một dãy các cách giải quyết một nhiệm vụ.","Một dãy các kết quả nhận được khi giải quyết một nhiệm vụ.","Một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho.","Một dãy các dữ liệu đầu vào để giải quyết một nhiệm vụ."], a:2,
    k:"<b>C</b>. Thuật toán là một dãy các <b>chỉ dẫn rõ ràng, có trình tự</b> để giải quyết vấn đề hoặc nhiệm vụ đã cho."},
  q2:{type:"mcq", label:"Câu hỏi 2 – Đầu vào, đầu ra", q:"Em hãy chọn câu đúng.",
    o:["Thuật toán có đầu ra là kết quả nhận được sau khi thực hiện các bước của thuật toán.","Thuật toán có đầu vào là các dữ liệu ban đầu.","Thuật toán có đầu vào là kết quả nhận được sau khi thực hiện các bước của thuật toán.","Thuật toán có đầu ra là các dữ liệu ban đầu."], a:0,
    k:"<b>A</b>. Đầu ra (Output) là <b>kết quả</b> nhận được sau khi thực hiện các bước. (B cũng đúng: đầu vào (Input) là dữ liệu ban đầu; C và D sai.)"},
  hd2:{type:"open", label:"HĐ2 – Mô tả thuật toán", q:"Ngoài cách trình bày thuật toán bằng ngôn ngữ tự nhiên, em còn biết cách nào khác không? Cách đó có hiệu quả không? Vì sao?",
    k:"Có thể dùng <b>sơ đồ khối</b> (hình vẽ và mũi tên). Cách này trực quan, dễ theo dõi thứ tự các bước, nhất là khi thuật toán có nhiều bước."},
  q3:{type:"mcq", label:"Câu hỏi 3 – Mũi tên trong sơ đồ khối", q:"Câu nào sau đây SAI khi nói về vai trò của mũi tên trong sơ đồ khối của thuật toán?",
    o:["Hướng mũi tên cho thấy hướng đi trong sơ đồ khối.","Mũi tên được sử dụng để chỉ hướng thực hiện tiếp theo.","Mũi tên được sử dụng chỉ để kết nối các hình khối trong sơ đồ khối."], a:2,
    k:"<b>C</b> sai. Mũi tên không chỉ để nối các hình mà còn <b>chỉ hướng thực hiện tiếp theo</b>."},
  q4:{type:"match", label:"Câu hỏi 4 – Các hình trong sơ đồ khối", q:"Ghép mỗi hình ở cột trái với một ý nghĩa phù hợp ở cột phải khi nói về sơ đồ khối của thuật toán.",
    items:[["1) Hình elip (màu hồng)",1],["2) Hình bình hành (màu xanh)",3],["3) Hình chữ nhật (màu vàng)",4],["4) Mũi tên ↓",2]],
    opts:["a) Bắt đầu hoặc Kết thúc","b) Chỉ hướng thực hiện tiếp theo","c) Đầu vào hoặc Đầu ra","d) Bước xử lí"], ph:"Chọn ý nghĩa…",
    k:"1–a, 2–c, 3–d, 4–b."},
  lt1:{type:"open", label:"Luyện tập – Câu 1", q:"Em hãy tìm đầu vào, đầu ra của các thuật toán sau đây: a) Thuật toán tính trung bình cộng của hai số a, b. b) Thuật toán tìm ước chung lớn nhất của hai số tự nhiên a và b.",
    k:"a) Đầu vào: hai số a, b; đầu ra: trung bình cộng của a và b. b) Đầu vào: hai số tự nhiên a, b; đầu ra: ước chung lớn nhất của a và b."},
  lt2:{type:"open", label:"Luyện tập – Câu 2", q:"Quan sát sơ đồ khối ở Hình 6.3 và cho biết sơ đồ khối mô tả thuật toán gì? Xác định đầu vào và đầu ra của thuật toán. Mô tả lại thuật toán dưới dạng liệt kê.",
    k:"Thuật toán <b>tính tổng hai số a, b</b>. Đầu vào: a, b; đầu ra: tổng. Liệt kê: 1. Nhập a, b. 2. Tổng ← a + b. 3. Đưa ra giá trị tổng."},
  lt3:{type:"order", label:"Luyện tập – Câu 3", q:"Sắp xếp các phần được đánh số trong Hình 6.4 để được thuật toán tính trung bình cộng của hai số a và b (dùng nút ↑ ↓).",
    items:{"1":"Bắt đầu","2":"Tổng ← a + b","3":"Giá trị a, giá trị b","4":"Trung bình cộng ← Tổng : 2","5":"Kết thúc","6":"Giá trị trung bình cộng của a và b"},
    start:["1","2","3","4","5","6"], ans:["1","3","2","4","6","5"],
    k:"<b>1 → 3 → 2 → 4 → 6 → 5</b>: Bắt đầu → nhập a, b → Tổng ← a + b → Trung bình cộng ← Tổng : 2 → đưa ra trung bình cộng → Kết thúc."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Phần hướng dẫn làm kem sữa chua xoài gồm 7 bước là một thuật toán. a) Xác định đầu vào và đầu ra của thuật toán làm kem sữa chua xoài. b) Dùng sơ đồ khối để thể hiện thuật toán đó.",
    k:"a) Đầu vào: xoài 250 g, sữa chua 100 g, mật ong 1 thìa cà phê (cùng 1 tô to, 4 khuôn làm kem); đầu ra: kem sữa chua xoài. b) Bắt đầu → [nguyên liệu, dụng cụ] → 7 hình chữ nhật cho 7 bước → [kem sữa chua xoài] → Kết thúc."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em hãy mô tả thuật toán tính điểm trung bình ba môn Toán, Ngữ văn, Ngoại ngữ theo hai cách: liệt kê các bước và sơ đồ khối.",
    k:"Liệt kê: 1. Nhập điểm Toán, Ngữ văn, Ngoại ngữ. 2. Tổng ← Toán + Văn + Ngoại ngữ. 3. Điểm TB ← Tổng : 3. 4. Đưa ra điểm TB. Sơ đồ khối: Bắt đầu → [nhập 3 điểm] → Tổng ← … → Điểm TB ← Tổng : 3 → [điểm TB] → Kết thúc."},
  vd3:{type:"open", label:"Vận dụng – Câu 3", q:"Em hãy nêu ví dụ về thuật toán giải quyết một nhiệm vụ trong thực tế. Hãy xác định đầu vào, đầu ra và các bước thực hiện thuật toán để giải quyết nhiệm vụ đó.",
    k:"Ví dụ pha nước chanh. Đầu vào: chanh, đường, nước, đá. Đầu ra: cốc nước chanh. Các bước: vắt chanh vào cốc → cho đường → đổ nước, khuấy tan → cho đá."}
};
const CONCEPTS = {
  c1:{t:"Thuật toán", b:"<p><b>Thuật toán</b> là một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho.</p><p>Thuật toán có <b>đầu vào</b> (Input) là dữ liệu ban đầu và <b>đầu ra</b> (Output) là kết quả.</p>"},
  c2:{t:"Mô tả thuật toán", b:"<ul><li>Liệt kê các bước bằng ngôn ngữ tự nhiên và sử dụng sơ đồ khối là những cách mô tả thuật toán.</li><li>Sơ đồ khối của thuật toán là một sơ đồ gồm các hình mô tả các bước và đường có mũi tên để chỉ hướng thực hiện.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Gấp hình trò chơi: làm <b>đúng 6 bước, đúng thứ tự</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thuật toán</p><ul><li><b>Thuật toán</b> = dãy chỉ dẫn <b>rõ ràng, có trình tự</b> để giải quyết nhiệm vụ.</li><li><b>Đầu vào</b> (Input): dữ liệu ban đầu → <b>Đầu ra</b> (Output): kết quả.</li><li>VD: tờ giấy vuông → hình trò chơi Đông-Tây-Nam-Bắc.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Mô tả thuật toán</p><ul><li>Hai cách: <b>liệt kê</b> các bước hoặc <b>sơ đồ khối</b>.</li><li>Elip: Bắt đầu/Kết thúc · Bình hành: Vào/Ra · Chữ nhật: Xử lí · Mũi tên: hướng đi.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Trung bình cộng: <b>1 → 3 → 2 → 4 → 6 → 5</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Mọi công việc có <b>đầu vào, các bước, đầu ra</b> đều là thuật toán.</li></ul>'}
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
    return ["T6B15." + id + " · " + t.label, v];
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
    "title": "Gấp hình trò chơi Đông-Tây-Nam-Bắc",
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
  "title": "Thuật toán",
  "acts": [
   {
    "title": "Hoạt động 1: Khái niệm thuật toán",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Thuật toán",
    "tasks": [
     "q1",
     "q2"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Thuật toán",
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
  "title": "Mô tả thuật toán",
  "acts": [
   {
    "title": "Hoạt động 2: Mô tả thuật toán",
    "tasks": [
     "hd2"
    ]
   },
   {
    "title": "Đọc hiểu: Sơ đồ khối",
    "tasks": [
     "q3",
     "q4"
    ],
    "concept": "c2"
   },
   {
    "title": "Ghi bài: Mô tả thuật toán",
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
    "title": "Đầu vào, đầu ra, sơ đồ khối",
    "tasks": [
     "lt1",
     "lt2",
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
    "title": "Thuật toán trong cuộc sống",
    "tasks": [
     "vd1",
     "vd2",
     "vd3"
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
window.LESSON = {STAGES, id: "tin6-bai15", title: "Bài 15. Thuật toán", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 1 xếp đúng 6 bước gấp; nêu được đầu vào là tờ giấy hình vuông…",
  commentPh: "Ví dụ: Nhóm xác định đúng đầu vào, đầu ra; sơ đồ khối cần thêm mũi tên."};
})();
