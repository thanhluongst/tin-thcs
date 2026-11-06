/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Trong trò chơi ở phần khởi động, điều kiện để cặp chơi được cộng một điểm là gì?",
    k:"Bạn thứ hai <b>trả lời đúng</b>: gật đầu khi câu khẳng định đúng, lắc đầu khi câu khẳng định sai."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Việc đánh giá điểm gồm những bước nào? Em hãy viết các bước đó ra giấy.",
    k:"1. Bạn thứ nhất đọc câu ghi trong phiếu. 2. Bạn thứ hai gật hoặc lắc đầu. 3. Kiểm tra câu trả lời: <b>nếu đúng thì cộng 1 điểm</b>, sai thì không cộng."},
  q1:{type:"open", label:"Câu hỏi 1 – Cấu trúc tuần tự", q:"Em hãy kể hai công việc trong cuộc sống được thực hiện tuần tự theo các bước. Em mô tả một công việc đó bằng sơ đồ khối.",
    k:"Ví dụ: pha trà (đun nước → cho trà vào ấm → rót nước sôi → chờ 3 phút → rót ra cốc); đánh răng (lấy bàn chải → cho kem → chải răng → súc miệng). Sơ đồ khối: Bắt đầu → các hình chữ nhật nối nhau bằng mũi tên → Kết thúc."},
  q2:{type:"mcq", label:"Câu hỏi 2 – Nếu trời mưa…", q:"Câu “Nếu trời mưa thì em không đi đá bóng” có chứa cấu trúc nào?",
    o:["Cấu trúc tuần tự","Cấu trúc rẽ nhánh dạng thiếu","Cấu trúc rẽ nhánh dạng đủ","Cấu trúc lặp"], a:1,
    k:"<b>B</b>. Rẽ nhánh dạng thiếu: hình thoi “Trời mưa?” → Đúng: “Không đi đá bóng”; Sai: không làm gì, đi tiếp."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Trong trò chơi ở phần khởi động, hoạt động nào được lặp lại?",
    k:"Hoạt động <b>đọc phiếu và trả lời</b> (cùng việc chấm điểm) được lặp lại nhiều lần."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Điều kiện để dừng trò chơi là gì?",
    k:"<b>Hết thời gian</b> quy định (một phút) thì dừng."},
  q3:{type:"open", label:"Câu hỏi 3 – Công việc lặp lại", q:"Em hãy kể hai công việc trong cuộc sống mà việc thực hiện gồm các bước được lặp lại nhiều lần.",
    k:"Ví dụ: chạy 5 vòng sân trường; nhảy dây đến khi đủ 100 lần; tưới từng cây trong vườn đến khi hết cây; chép phạt một từ 10 lần."},
  q4a:{type:"mcq", label:"Câu hỏi 4a – Chú mèo dừng lại khi nào?", q:"Bạn Khoa muốn chú mèo trong Scratch di chuyển 10 bước một liên tục cho đến khi chạm biên thì dừng lại. Điều kiện để chú mèo dừng lại là gì?",
    o:["Đã di chuyển 10 bước.","Chú mèo chạm biên.","Hết thời gian.","Chú mèo chưa chạm biên."], a:1,
    k:"<b>B</b>. Chú mèo dừng lại khi <b>chạm biên</b>; còn “chưa chạm biên” thì tiếp tục di chuyển."},
  q4b:{type:"match", label:"Câu hỏi 4b – Hoàn thành Hình 6.10", q:"Điền các bước vào các vị trí của sơ đồ khối Hình 6.10 để mô tả thuật toán của bạn Khoa.",
    items:[["① Hình thoi",2],["② Nhãn mũi tên đi xuống",3],["③ Hình chữ nhật dưới hình thoi",1],["④ Nhãn mũi tên bên phải",4],["⑤ Hình chữ nhật cuối cùng",5]],
    opts:["1) Di chuyển 10 bước","2) Chưa chạm biên?","3) Đúng","4) Sai","5) Dừng lại"], ph:"Chọn bước…",
    k:"① Chưa chạm biên? · ② Đúng · ③ Di chuyển 10 bước (rồi quay lại hình thoi) · ④ Sai · ⑤ Dừng lại."},
  lt1:{type:"open", label:"Luyện tập – Câu 1", q:"Em hãy trình bày các câu sau đây dưới dạng sơ đồ khối cấu trúc rẽ nhánh: a) Nếu có kẻ trên mạng đe doạ thì em cần nói cho cha mẹ biết. b) Nếu nhận được thư điện tử có đính kèm tệp từ địa chỉ không quen biết thì em không nên mở tệp đính kèm. c) Nếu có tin nhắn từ người không quen biết yêu cầu gửi thông tin cá nhân thì em không nên gửi.",
    k:"Cả ba câu đều là <b>rẽ nhánh dạng thiếu</b>. a) “Có kẻ đe doạ?” → Đúng: “Nói cho cha mẹ biết”. b) “Thư từ địa chỉ lạ có tệp đính kèm?” → Đúng: “Không mở tệp”. c) “Người lạ xin thông tin cá nhân?” → Đúng: “Không gửi”. Nhánh Sai: đi tiếp."},
  lt2:{type:"sort", label:"Luyện tập – Câu 2", q:"Trong các câu sau đây, câu nào có thể biểu diễn bằng sơ đồ khối có cấu trúc lặp?",
    cats:["Cấu trúc lặp","Không phải lặp"], items:[["a) Nếu sáng mai trời mưa, em sẽ mang theo áo mưa.",1],["b) Nếu vẫn chưa làm hết bài tập, em phải làm bài tập đến khi nào hết.",0],["c) Nếu được nghỉ ba ngày vào dịp Tết Dương lịch thì gia đình em sẽ đi du lịch, còn không sẽ có kế hoạch khác.",1]],
    k:"Chỉ <b>b</b> là cấu trúc lặp: “Chưa hết bài tập?” → Đúng: “Làm một bài tập” rồi quay lại kiểm tra; Sai: dừng. (a: rẽ nhánh dạng thiếu; c: rẽ nhánh dạng đủ.)"},
  lt3:{type:"match", label:"Luyện tập – Câu 3", q:"Quan sát hai sơ đồ khối trong Hình 6.11a, Hình 6.11b và cho biết mỗi sơ đồ khối mô tả cấu trúc nào?",
    items:[["Hình 6.11a",4],["Hình 6.11b",2]],
    opts:["1) Cấu trúc tuần tự","2) Cấu trúc rẽ nhánh dạng thiếu","3) Cấu trúc rẽ nhánh dạng đủ","4) Cấu trúc lặp"], ph:"Chọn cấu trúc…",
    k:"Hình 6.11a: <b>lặp</b> (ném bóng xong quay lại kiểm tra, ném đến khi trúng). Hình 6.11b: <b>rẽ nhánh dạng thiếu</b> (chỉ ném một lần nếu chưa trúng)."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Bạn An cho rằng: “Sơ đồ khối ở Hình 6.12a thể hiện rằng nếu chưa hiểu bài thì việc đọc lại sách chỉ thực hiện một lần rồi làm bài tập. Còn sơ đồ khối ở Hình 6.12b thể hiện rằng nếu chưa hiểu bài thì việc đọc lại sách và làm bài tập sẽ thực hiện nhiều lần”. Em có đồng ý với ý kiến bạn An không? Nếu phải sửa nhận xét đó, em sẽ sửa như thế nào?",
    k:"Ý thứ nhất <b>đúng</b> (6.12a là rẽ nhánh dạng thiếu). Ý thứ hai cần sửa: ở 6.12b chỉ <b>đọc lại sách</b> được lặp lại đến khi hiểu bài; <b>làm bài tập chỉ thực hiện một lần</b> sau khi đã hiểu bài."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Trong trò chơi ở phần khởi động, việc tính điểm cho mỗi cặp chơi là một hoạt động lặp. Hãy chỉ rõ công việc được lặp lại và vẽ sơ đồ khối cấu trúc lặp của hoạt động này.",
    k:"Công việc lặp lại: đọc phiếu, trả lời và cộng điểm nếu đúng. Sơ đồ: “Còn thời gian?” → Đúng: “Đọc phiếu và trả lời” → “Trả lời đúng?” (Đúng: cộng 1 điểm) → quay lại; Sai: dừng, thông báo điểm."},
  vd3:{type:"open", label:"Vận dụng – Câu 3", q:"Cô giáo điểm danh bằng cách gọi tên từng bạn trong danh sách lớp. Nếu bạn nào trả lời có thì cô giáo gọi tên bạn tiếp theo, còn không thì cô giáo đánh dấu vắng mặt và gọi tên bạn tiếp theo. Việc điểm danh của cô giáo có thể mô tả bằng những cấu trúc nào? Em hãy vẽ sơ đồ khối mô tả các cấu trúc đó.",
    k:"<b>Lặp</b> (“Còn bạn chưa gọi?” → gọi tên bạn tiếp theo) kết hợp <b>rẽ nhánh dạng thiếu</b> bên trong (“Bạn trả lời có?” → Sai: đánh dấu vắng mặt). Hết danh sách thì dừng."}
};
const CONCEPTS = {
  c1:{t:"Cấu trúc tuần tự, rẽ nhánh", b:"<ul><li><b>Cấu trúc tuần tự</b>: thực hiện lần lượt các lệnh theo trình tự từ bắt đầu đến kết thúc.</li><li><b>Rẽ nhánh dạng thiếu</b>: nếu điều kiện đúng thì thực hiện lệnh.</li><li><b>Rẽ nhánh dạng đủ</b>: nếu điều kiện đúng thì thực hiện lệnh 1, nếu sai thì thực hiện lệnh 2.</li></ul>"},
  c2:{t:"Cấu trúc lặp", b:"<ul><li>Cấu trúc lặp dùng để mô tả các bước của thuật toán được thực hiện lặp lại nhiều lần.</li><li>Trong cấu trúc lặp, bao giờ cũng có khâu kiểm tra điều kiện kết thúc quá trình lặp.</li><li><b>Ba cấu trúc tuần tự, rẽ nhánh và lặp là đủ để mô tả mọi thuật toán.</b></li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Trò chơi: <b>trả lời đúng → cộng 1 điểm</b>; <b>hết giờ → dừng</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Cấu trúc tuần tự, rẽ nhánh</p><ul><li><b>Tuần tự</b>: làm lần lượt Lệnh 1 → Lệnh 2 → Lệnh 3.</li><li><b>Rẽ nhánh thiếu</b>: Nếu điều kiện đúng → làm Lệnh.</li><li><b>Rẽ nhánh đủ</b>: Đúng → Lệnh 1, Sai → Lệnh 2.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Cấu trúc lặp</p><ul><li><b>Lặp</b>: làm đi làm lại các bước; luôn có <b>điều kiện kết thúc</b>.</li><li><b>Tuần tự + rẽ nhánh + lặp</b> → mô tả được mọi thuật toán.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Câu có “<b>đến khi</b>” → lặp; câu “<b>nếu… thì</b>” → rẽ nhánh.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Điểm danh = <b>lặp</b> (từng bạn) + <b>rẽ nhánh</b> (có mặt / vắng).</li></ul>'}
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
    return ["T6B16." + id + " · " + t.label, v];
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
    "title": "Trò chơi: Đúng hay sai?",
    "tasks": []
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
  "title": "Cấu trúc tuần tự, cấu trúc rẽ nhánh",
  "acts": [
   {
    "title": "Hoạt động 1: Đánh giá kết quả chơi",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Tuần tự và rẽ nhánh",
    "tasks": [
     "q1",
     "q2"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Cấu trúc tuần tự, cấu trúc rẽ nhánh",
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
  "title": "Cấu trúc lặp",
  "acts": [
   {
    "title": "Hoạt động 2: Cấu trúc lặp",
    "tasks": [
     "hd2a",
     "hd2b"
    ]
   },
   {
    "title": "Đọc hiểu: Cấu trúc lặp",
    "tasks": [
     "q3",
     "q4a",
     "q4b"
    ],
    "concept": "c2"
   },
   {
    "title": "Ghi bài: Cấu trúc lặp",
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
    "title": "Nhận biết các cấu trúc",
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
    "title": "Cấu trúc điều khiển trong cuộc sống",
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
window.LESSON = {STAGES, id: "tin6-bai16", title: "Bài 16. Các cấu trúc điều khiển", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nêu đúng điều kiện cộng điểm; vẽ được sơ đồ rẽ nhánh dạng thiếu…",
  commentPh: "Ví dụ: Sơ đồ đúng cấu trúc lặp, cần ghi rõ nhãn Đúng/Sai trên mũi tên."};
})();
