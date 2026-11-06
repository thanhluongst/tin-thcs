/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Từ công thức làm kem sữa chua dưa hấu, muốn thành công thức làm kem sữa chua xoài em làm thế nào?",
    k:"Thay tất cả các từ “dưa hấu” trong công thức bằng từ “xoài”."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Trong phần mềm soạn thảo văn bản, em thực hiện những thao tác nào để giúp An chỉnh sửa tệp văn bản công thức làm kem?",
    k:"Tìm từng chỗ có từ “dưa hấu”, xoá đi rồi gõ “xoài” (làm thủ công) – hoặc dùng công cụ <b>Tìm kiếm và Thay thế</b>."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"Em có biết cách nào chỉnh sửa tệp văn bản nhanh hơn không?",
    k:"Dùng công cụ <b>Replace</b> (Thay thế) với nút <b>Replace All</b>: thay tất cả chỉ bằng một lần nháy chuột."},
  tl:{type:"mcq", label:"Đọc hiểu – Tại sao cần tìm kiếm và thay thế?", q:"Với văn bản dài hàng trăm trang, dùng công cụ Tìm kiếm và Thay thế có lợi gì?",
    o:["Văn bản đẹp hơn.","Tìm kiếm, thay thế nhanh chóng, chính xác, không bỏ sót.","Văn bản ngắn hơn.","Tự động sửa mọi lỗi chính tả."], a:1,
    k:"<b>B</b>. Công cụ Tìm kiếm và Thay thế giúp tìm, thay từ hoặc cụm từ <b>nhanh chóng và chính xác</b>, tiết kiệm thời gian và không bỏ sót."},
  th1:{type:"order", label:"Thực hành – Tìm kiếm", q:"Sắp xếp các bước tìm kiếm cụm từ “dưa hấu” trong văn bản (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào thẻ Home",b:"Trong nhóm lệnh Editing, chọn Find",c:"Gõ từ, cụm từ cần tìm vào ô Navigation rồi nhấn phím Enter"}, start:["c","a","b"], ans:["a","b","c"],
    k:"Home → Editing → <b>Find</b> → gõ cụm từ, Enter. Các từ tìm thấy được đánh dấu; nháy vào các kết quả trong ô Navigation để chuyển đến từng vị trí."},
  th2:{type:"mcq", label:"Thực hành – Thay thế", q:"Trong hộp thoại Find and Replace, nút nào thay thế tất cả các cụm từ tìm được trong toàn bộ văn bản?",
    o:["Find Next","Replace","Replace All","Cancel"], a:2,
    k:"<b>Replace All</b> thay tất cả. <b>Replace</b> thay lần lượt từng cụm từ tìm kiếm được; <b>Find Next</b> tìm vị trí tiếp theo."},
  th3:{type:"open", label:"Thực hành – Kem sữa chua xoài", q:"Nhập công thức làm kem sữa chua dưa hấu, lưu với tên kemsuachua-duahau.docx. Thay thế “dưa hấu” bằng “xoài” rồi lưu với tên kemsuachua-xoai.docx. Có bao nhiêu chỗ đã được thay thế?",
    k:"Ví dụ: thay được 4 chỗ (tên món, nguyên liệu, bước 1, bước 2). Lưu ý dùng File/Save As để lưu thành tệp mới."},
  lt1:{type:"open", label:"Luyện tập – Câu 1", q:"Tệp văn bản chứa các bài viết cảm nghĩ gồm nhiều trang. An muốn xem lại nội dung bài viết về nhóm bạn thân lớp 6A, nhưng không nhớ ở trang nào. Vì vậy, An thực hiện thao tác tìm kiếm cụm từ “nhóm bạn thân” trong tệp văn bản. An phải thực hiện thao tác gì để xem lần lượt các kết quả tìm thấy?",
    k:"Nháy chuột lần lượt vào các kết quả hiện trong ô <b>Navigation</b> (hoặc dùng mũi tên ▲▼ / Find Next) để chuyển tới từng vị trí tìm thấy."},
  lt2:{type:"order", label:"Luyện tập – Câu 2", q:"Em hãy sắp xếp lại các bước sau đây theo thứ tự đúng để thực hiện thao tác thay thế một từ hoặc cụm từ trong phần mềm soạn thảo văn bản (dùng nút ↑ ↓).",
    items:{a:"Gõ từ, cụm từ cần thay thế.",b:"Nháy chuột vào thẻ Home.",c:"Trong nhóm lệnh Editing, chọn Replace.",d:"Gõ từ, cụm từ cần tìm.",e:"Nháy chuột vào nút Replace để thay lần lượt từng từ hoặc cụm từ."}, start:["a","b","c","d","e"], ans:["b","c","d","a","e"],
    k:"b) Home → c) Replace → d) gõ cụm từ cần tìm → a) gõ cụm từ thay thế → e) Replace."},
  vd:{type:"open", label:"Vận dụng", q:"Trong bài học trước, em đã tạo ra một số tệp văn bản cho cuốn sổ lưu niệm. Em hãy xem lại các tệp văn bản này để rà soát lỗi chính tả. Em có thể sử dụng chức năng Tìm kiếm và Thay thế để chỉnh sửa các lỗi chính tả, thay thế các từ viết tắt,… để các tệp văn bản hoàn chỉnh hơn. Em đã sửa những gì?",
    k:"Ví dụ: thay “ko” → “không”, “hs” → “học sinh”, sửa “xinh nhật” → “sinh nhật”,…"}
};
const CONCEPTS = {
  c1:{t:"Tìm kiếm và thay thế", b:"<p>Công cụ Tìm kiếm và Thay thế giúp tìm kiếm, thay thế từ hoặc cụm từ theo yêu cầu một cách nhanh chóng và chính xác.</p>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Đổi “dưa hấu” → “xoài” ở mọi chỗ trong công thức.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Tại sao phải tìm kiếm và thay thế?</p><ul><li>Công cụ <b>Tìm kiếm</b>, <b>Thay thế</b>: <b>nhanh, chính xác</b>, không bỏ sót.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Sử dụng công cụ tìm kiếm và thay thế</p><ul><li>Tìm: Home → Editing → <b>Find</b> → gõ từ, Enter.</li><li>Thay: Home → Editing → <b>Replace</b> → gõ từ cần tìm, từ thay thế → <b>Replace</b> / <b>Replace All</b>.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Thứ tự thay thế: <b>b → c → d → a → e</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Dùng Replace để sửa <b>lỗi chính tả</b>, <b>từ viết tắt</b>.</li></ul>'}
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
    return ["T6B13." + id + " · " + t.label, v];
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
    "title": "Hoạt động 1: Đổi công thức làm kem",
    "tasks": [
     "hd1a",
     "hd1b",
     "hd1c"
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
  "title": "Tại sao phải tìm kiếm và thay thế văn bản?",
  "acts": [
   {
    "title": "Đọc hiểu: Tìm kiếm và thay thế",
    "tasks": [
     "tl"
    ],
    "concept": "c1"
   },
   {
    "title": "Ghi bài: Tại sao phải tìm kiếm và thay thế văn bản?",
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
  "title": "Sử dụng công cụ tìm kiếm và thay thế",
  "acts": [
   {
    "title": "Thực hành: Kem sữa chua xoài",
    "tasks": [
     "th1",
     "th2",
     "th3"
    ]
   },
   {
    "title": "Ghi bài: Sử dụng công cụ tìm kiếm và thay thế",
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
    "title": "Tìm kiếm và thay thế",
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
    "title": "Rà soát sổ lưu niệm",
    "tasks": [
     "vd"
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
window.LESSON = {STAGES, id: "tin6-bai13", title: "Bài 13. Thực hành: Tìm kiếm và thay thế", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 thay đúng 4 chỗ “dưa hấu” bằng “xoài”…",
  commentPh: "Ví dụ: Nhóm dùng Replace All đúng; cần kiểm tra lại văn bản sau khi thay."};
})();
