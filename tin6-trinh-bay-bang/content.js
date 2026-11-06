/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Hình 5.11 cho thấy hai cách trình bày danh sách học sinh trong cuốn sổ lưu niệm: trang bên trái sử dụng bảng, trang bên phải liệt kê lần lượt danh sách các thành viên. Em hãy nhận xét về hai cách trình bày.",
    k:"Trình bày bằng <b>bảng</b>: gọn, ngay ngắn, dễ nhìn, dễ tìm, chứa được cả ảnh và chữ. Liệt kê: dài, tốn chỗ, khó tìm."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em sẽ lựa chọn cách nào để trình bày danh sách học sinh trong cuốn sổ lưu niệm của lớp em? Tại sao?",
    k:"Chọn trình bày dạng bảng vì cô đọng, đầy đủ, dễ so sánh, tìm kiếm."},
  hd2a:{type:"mcq", label:"HĐ2 – Câu 1", q:"Bảng thống kê kết quả khảo sát gồm mấy cột, mấy hàng?",
    o:["4 cột, 5 hàng","5 cột, 4 hàng","4 cột, 4 hàng","3 cột, 5 hàng"], a:0, k:"<b>4 cột</b> (STT, Tên trò chơi, Số bạn nam thích, Số bạn nữ thích), <b>5 hàng</b> (1 hàng tiêu đề + 4 trò chơi)."},
  hd2b:{type:"mcq", label:"HĐ2 – Câu 2", q:"Trò chơi nào được nhiều bạn nam yêu thích nhất? Trò chơi nào được nhiều bạn nữ yêu thích nhất? Trò chơi nào được học sinh cả lớp yêu thích nhất?",
    o:["Nam: Kéo co; nữ: Lò cò tiếp sức; cả lớp: Kéo co","Nam: Lò cò tiếp sức; nữ: Kéo co; cả lớp: Lò cò tiếp sức","Nam: Kéo co; nữ: Kéo co; cả lớp: Kéo co","Nam: Ném bóng trúng đích; nữ: Trốn tìm; cả lớp: Trốn tìm"], a:0,
    k:"Nam: <b>Kéo co</b> (19). Nữ: <b>Lò cò tiếp sức</b> (18). Cả lớp: Kéo co 35, Ném bóng 27, Lò cò 34, Trốn tìm 18 → <b>Kéo co</b>."},
  hd2c:{type:"open", label:"HĐ2 – Câu 3", q:"Nếu không dùng bảng biểu diễn thì việc so sánh và tìm kiếm có dễ không?",
    k:"<b>Không</b>. Phải đọc từng phiếu, đếm lại, rất mất thời gian và dễ nhầm. Bảng giúp dễ dàng tìm kiếm, so sánh, tổng hợp thông tin."},
  p55a:{type:"order", label:"Câu hỏi tr.55 – Câu 1", q:"Em hãy sắp xếp lại thứ tự các bước để được thao tác tạo bảng đúng (dùng nút ↑ ↓).",
    items:{a:"Chọn mũi tên nhỏ bên dưới Table.",b:"Di chuyển chuột để chọn số hàng, số cột.",c:"Chọn Insert."}, start:["a","b","c"], ans:["c","a","b"],
    k:"c) Chọn <b>Insert</b> → a) chọn mũi tên dưới <b>Table</b> → b) kéo chuột chọn số hàng, số cột."},
  p55b:{type:"mcq", label:"Câu hỏi tr.55 – Câu 2", q:"Bạn An đã nhập số hàng, số cột như Hình 5.15 (Number of columns: 4; Number of rows: 35) để tạo bảng. Bảng được tạo sẽ có:",
    o:["4 cột, 35 hàng.","35 cột, 35 hàng.","35 cột, 4 hàng.","4 cột, 4 hàng."], a:0, k:"<b>A</b>. 4 cột, 35 hàng (columns = cột, rows = hàng)."},
  cs:{type:"match", label:"Đọc hiểu – Chỉnh sửa bảng", q:"Ghép mỗi nhóm lệnh trong thẻ Layout (Table Tools) với chức năng của nó.",
    items:[["Delete",1],["Insert Above / Below / Left / Right",2],["Merge Cells / Split Cells / Split Table",3],["Height / Width (Cell Size)",4],["Alignment",5]],
    opts:["Xoá bảng, xoá hàng, cột","Chèn thêm hàng, cột","Gộp, tách ô, tách bảng","Điều chỉnh kích thước ô","Căn chỉnh lề, hướng của văn bản trong ô"], ph:"Chọn chức năng…",
    k:"Delete – xoá; Insert – chèn hàng, cột; Merge/Split – gộp, tách; Cell Size – kích thước ô; Alignment – căn lề trong ô."},
  p55c:{type:"mcq", label:"Câu hỏi tr.55 – Câu 3", q:"Muốn xoá một số hàng trong bảng, sau khi chọn các hàng cần xoá, em thực hiện lệnh nào sau đây?",
    o:["Delete Cells.","Delete Columns.","Delete Rows.","Delete Table."], a:2, k:"<b>C</b>. Delete Rows (Rows = hàng)."},
  th1:{type:"order", label:"Thực hành – Gộp ô", q:"Sắp xếp các bước gộp bốn ô nhỏ thành một ô to cho phần giáo viên chủ nhiệm (dùng nút ↑ ↓).",
    items:{a:"Kéo thả chuột để chọn bốn ô của bảng",b:"Trong nhóm thẻ Table Tools, chọn thẻ Layout",c:"Trong nhóm lệnh Merge, chọn Merge Cells"}, start:["c","a","b"], ans:["a","b","c"],
    k:"Chọn các ô → <b>Layout</b> → <b>Merge Cells</b>. Thay đổi độ rộng cột/độ cao hàng: kéo thả đường biên khi con trỏ thành mũi tên hai chiều."},
  th2:{type:"open", label:"Thực hành – Danh sách lớp", q:"Tạo bảng danh sách thành viên của lớp như Hình 5.11: ảnh, họ tên, ngày sinh của giáo viên chủ nhiệm và từng thành viên trong lớp; chỉnh sửa, định dạng bảng. Bảng của em có mấy hàng, mấy cột? Em đã gộp những ô nào?",
    k:"Ví dụ: bảng 4 cột × 4 hàng, gộp 4 ô góc trên bên trái cho giáo viên chủ nhiệm; có thể chèn thêm hàng, cột cho đủ thành viên; bổ sung địa chỉ, sở thích,…"},
  lt1:{type:"open", label:"Luyện tập – Câu 1", q:"Soạn bảng kết quả khảo sát trò chơi tập thể ở Mục 1. Nếu cần bổ sung cột Tổng số (số học sinh cả lớp thích trò chơi tương ứng) thì em sẽ chèn cột này vào vị trí nào của bảng? Hãy chèn và điền số liệu cho cột Tổng số.",
    k:"Chèn cột <b>bên phải</b> cột “Số bạn nữ thích” (Insert Right). Tổng số: Kéo co 35, Ném bóng trúng đích 27, Lò cò tiếp sức 34, Trốn tìm 18."},
  lt2:{type:"open", label:"Luyện tập – Câu 2", q:"Bản tin “Phong trào đọc sách”: năm 2017 có 230 em (52% tổng số học sinh khối 6) yêu thích đọc sách; năm 2018 và 2019 lần lượt là 256 em (64%) và 345 em (78%). a) Tạo một bảng để trình bày cô đọng nội dung bản tin. b) Bổ sung thông tin: năm 2016 có 175 em yêu thích đọc sách, chiếm 45%. Bảng của em gồm những cột, hàng nào?",
    k:"Bảng 3 cột: Năm | Số học sinh thích đọc sách | Tỉ lệ (%). Các hàng: 2016 – 175 – 45%; 2017 – 230 – 52%; 2018 – 256 – 64%; 2019 – 345 – 78% (chèn hàng 2016 phía trên hàng 2017)."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy trình bày dưới dạng bảng: a) Thời khoá biểu của lớp. b) Thời gian biểu hoạt động các ngày trong tuần của em. Bảng của em có mấy cột, mấy hàng?",
    k:"Thời khoá biểu: cột Tiết + các cột Thứ Hai → Thứ Bảy; hàng là các tiết. Thời gian biểu: cột Giờ + các ngày trong tuần."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em hãy xem lại nội dung cuốn sổ lưu niệm và cân nhắc xem phần nội dung nào nên được trình bày ở dạng bảng thì hợp lí hơn. Hãy trình bày lại nội dung đó.",
    k:"Ví dụ: danh sách thành viên, lịch các hoạt động của lớp, bảng thành tích, sinh nhật các bạn theo tháng,…"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Chúng ta có thể sử dụng bảng để trình bày thông tin một cách cô đọng. Bảng cũng thường được sử dụng để ghi lại dữ liệu của công việc thống kê, điều tra, khảo sát,… Từ bảng dữ liệu, em có thể dễ dàng tìm kiếm, so sánh, tổng hợp được thông tin.</p>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Danh sách lớp trình bày bằng <b>bảng</b>: gọn, đầy đủ, dễ tìm.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Trình bày thông tin ở dạng bảng</p><ul><li>Bảng: trình bày thông tin <b>cô đọng</b>.</li><li>Dễ <b>tìm kiếm, so sánh, tổng hợp</b> thông tin.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Tạo bảng</p><ul><li><b>Insert → Table</b> → kéo chuột chọn số hàng, cột (tối đa 10 cột, 8 hàng).</li><li>Bảng lớn: <b>Insert/Table/Insert Table</b> → nhập số cột, số hàng.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Định dạng bảng</p><ul><li>Thẻ <b>Layout</b>: Delete (xoá), Insert (chèn), <b>Merge Cells</b> (gộp ô), Split (tách).</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Thêm cột bên phải: <b>Insert Right</b>; thêm hàng trên: <b>Insert Above</b>.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Thời khoá biểu, thời gian biểu → trình bày bằng <b>bảng</b>.</li></ul>'}
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
    return ["T6B12." + id + " · " + t.label, v];
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
    "title": "Hoạt động 1: Danh sách học sinh",
    "tasks": [
     "hd1a",
     "hd1b"
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
  "title": "Trình bày thông tin ở dạng bảng",
  "acts": [
   {
    "title": "Hoạt động 2: Bảng",
    "tasks": [
     "hd2a",
     "hd2b",
     "hd2c"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Trình bày thông tin ở dạng bảng",
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
  "title": "Tạo bảng",
  "acts": [
   {
    "title": "Đọc hiểu: Tạo bảng",
    "tasks": []
   },
   {
    "title": "Câu hỏi: SGK trang 55",
    "tasks": [
     "p55a",
     "p55b"
    ]
   },
   {
    "title": "Ghi bài: Tạo bảng",
    "tasks": [],
    "concept": "g3",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-3",
  "code": "2.3",
  "step": "Bước 2 · Hình thành kiến thức mới",
  "title": "Định dạng bảng",
  "acts": [
   {
    "title": "Đọc hiểu: Chỉnh sửa bảng",
    "tasks": [
     "cs"
    ]
   },
   {
    "title": "Câu hỏi: SGK trang 55",
    "tasks": [
     "p55c"
    ]
   },
   {
    "title": "Ghi bài: Định dạng bảng",
    "tasks": [],
    "concept": "g4",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-4",
  "code": "2.4",
  "step": "Bước 2 · Thực hành",
  "title": "Tạo bảng",
  "acts": [
   {
    "title": "Thực hành: Danh sách thành viên của lớp",
    "tasks": [
     "th1",
     "th2"
    ]
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
    "title": "Bảng khảo sát, bảng đọc sách",
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
    "title": "Thời khoá biểu, sổ lưu niệm",
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
window.LESSON = {STAGES, id: "tin6-bai12", title: "Bài 12. Trình bày thông tin ở dạng bảng", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 tạo đúng bảng 4 cột, gộp ô cho phần giáo viên…",
  commentPh: "Ví dụ: Bảng gọn, rõ; cần chèn thêm cột Tổng số đúng vị trí."};
})();
