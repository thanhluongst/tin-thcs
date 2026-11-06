/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Qua các bài học trước, nhóm em đã có những tệp nội dung nào cho cuốn sổ lưu niệm? Hãy liệt kê và phân công các bạn trong nhóm (3–5 em).",
    k:"Ví dụ: CamNghiVeBan.docx (bài viết cảm nghĩ), danh sách thành viên (bảng), sơ đồ tư duy SoLuuNiem.emm, ảnh hoạt động,… Phân công: người tập hợp, người thu thập ảnh, người soạn thêm nội dung, người làm trang bìa."},
  b1:{type:"order", label:"Bước 1 – Tập hợp nội dung", q:"Sắp xếp các thao tác tập hợp nội dung từ các tệp đã có vào tệp Soluuniem.docx (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào thẻ Insert",b:"Trong nhóm lệnh Text, chọn Object",c:"Chọn Text from File… rồi chọn tệp cần đưa vào"}, start:["c","b","a"], ans:["a","b","c"],
    k:"Insert → Object (nhóm Text) → <b>Text from File…</b> → chọn tệp. Lặp lại cho từng tệp nội dung."},
  b2:{type:"sort", label:"Bước 2 – Bổ sung nội dung", q:"Khi soạn thảo, định dạng nội dung bổ sung, mỗi việc dưới đây dùng công cụ nào?",
    cats:["Home","Page Layout","Insert"], items:[["Định dạng chữ (màu sắc, cỡ chữ,…)",0],["Căn chỉnh lề đoạn văn bản",0],["Tìm kiếm và Thay thế để sửa lỗi",0],["Định dạng hướng trang, lề trang",1],["Bổ sung hình ảnh",2],["Chèn bảng",2]],
    k:"<b>Home</b>: phông chữ, đoạn, Find/Replace. <b>Page Layout</b>: hướng trang, lề trang. <b>Insert</b>: hình ảnh, bảng, trang bìa."},
  b2o:{type:"open", label:"Bước 2 – Nội dung bổ sung", q:"Xem lại sơ đồ tư duy nội dung sổ lưu niệm đã tạo ở Bài 10 để rà soát. Nhóm em đã bổ sung thêm những thông tin, hình ảnh gì (thầy cô, hoạt động thể thao, văn hoá, văn nghệ, tham quan,…)?",
    k:"Ví dụ: bài viết về thầy cô giáo, ảnh hội thao, tiết mục văn nghệ 20/11, chuyến tham quan bảo tàng,…"},
  b3:{type:"order", label:"Bước 3 – Tạo trang bìa", q:"Sắp xếp các bước tạo trang bìa cho cuốn sổ lưu niệm (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào thẻ Insert",b:"Trong nhóm lệnh Pages, chọn Cover Page",c:"Chọn một mẫu trang bìa",d:"Sửa lại nội dung và thay hình trang bìa"}, start:["d","b","c","a"], ans:["a","b","c","d"],
    k:"Insert → Pages → <b>Cover Page</b> → chọn mẫu → sửa nội dung (Sổ lưu niệm lớp 6A, năm học) và thay hình."},
  b4:{type:"open", label:"Bước 4 – Xem lại nội dung", q:"Hãy tưởng tượng các em đã là người lớn. Cả lớp gặp lại nhau trong một lần họp lớp ở tương lai khi đã 50 tuổi. Hãy cùng xem lại cuốn sổ lưu niệm và nghĩ về câu hỏi “Tại sao chúng ta lại đưa nội dung này vào sổ?”. Nhóm em giữ lại, bổ sung hay bỏ bớt nội dung nào?",
    k:"Học sinh nêu lí do giữ lại các nội dung có ý nghĩa (kỉ niệm, thông tin liên lạc, cảm nghĩ), bỏ bớt nội dung trùng lặp, bổ sung nội dung còn thiếu."},
  dg:{type:"open", label:"Chia sẻ và đánh giá", q:"Nhóm em chia sẻ sản phẩm với cả lớp. Em thích nhất sản phẩm của nhóm nào? Vì sao? Cuốn sổ chung của lớp nên lấy thêm nội dung gì từ các nhóm?",
    k:"Đánh giá theo bảng kiểm: đủ nội dung, có trang bìa, định dạng đẹp, bố cục hợp lí, không lỗi chính tả, có hình ảnh, bảng."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Để hoàn thiện một sản phẩm từ nhiều nội dung, em cần: tập hợp các nội dung đã có (Insert/Object/Text from File); bổ sung, định dạng nội dung (định dạng chữ, căn lề, hướng trang, lề trang, hình ảnh, bảng, tìm kiếm và thay thế); tạo trang bìa (Insert/Cover Page); xem lại nội dung, chia sẻ và trao đổi để hoàn thiện.</p>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ</p><ul><li>Nhóm <b>3–5 em</b> tập hợp, bổ sung nội dung → hoàn thiện <b>sổ lưu niệm</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Các bước hoàn thiện</p><ul><li>B1: <b>Insert → Object → Text from File</b> (tập hợp).</li><li>B2: bổ sung, <b>định dạng</b>; B3: <b>Insert → Cover Page</b> (trang bìa).</li><li>B4: <b>xem lại</b>, chia sẻ, góp ý.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Đánh giá</p><ul><li>Sản phẩm tốt: <b>đủ nội dung, đẹp, hợp lí, không lỗi</b>.</li></ul>'}
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
    return ["T6B14." + id + " · " + t.label, v];
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
  "title": "Nhiệm vụ",
  "acts": [
   {
    "title": "Nhiệm vụ: Hoàn thiện sổ lưu niệm",
    "tasks": [
     "kd1"
    ]
   },
   {
    "title": "Ghi bài: Nhiệm vụ",
    "tasks": [],
    "concept": "g1",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-1",
  "code": "2",
  "step": "Bước 2 · Thực hành",
  "title": "Hướng dẫn hoàn thiện sổ lưu niệm",
  "acts": [
   {
    "title": "Bước 1: Tập hợp các nội dung đã có",
    "tasks": [
     "b1"
    ]
   },
   {
    "title": "Bước 2: Bổ sung thêm nội dung",
    "tasks": [
     "b2",
     "b2o"
    ]
   },
   {
    "title": "Bước 3: Tạo trang bìa cho cuốn sổ",
    "tasks": [
     "b3"
    ]
   },
   {
    "title": "Bước 4: Xem lại nội dung",
    "tasks": [
     "b4"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Các bước hoàn thiện",
    "tasks": [],
    "concept": "g2",
    "ghi": true
   }
  ]
 },
 {
  "id": "phan-2",
  "code": "3",
  "step": "Bước 3",
  "title": "Chia sẻ, đánh giá",
  "acts": [
   {
    "title": "Đánh giá: Bảng kiểm sản phẩm",
    "tasks": [
     "dg"
    ]
   },
   {
    "title": "Ghi bài: Đánh giá",
    "tasks": [],
    "concept": "g3",
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
window.LESSON = {STAGES, id: "tin6-bai14", title: "Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 tập hợp đủ nội dung, có trang bìa, bố cục đẹp…",
  commentPh: "Ví dụ: Sổ lưu niệm đầy đủ; nên bổ sung ảnh hoạt động văn nghệ của lớp."};
})();
