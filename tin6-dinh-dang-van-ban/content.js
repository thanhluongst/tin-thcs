/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Theo bạn Khoa, làm cuốn sổ lưu niệm trên máy tính có những thuận lợi gì so với viết tay?",
    k:"Gửi cho thầy cô, các bạn xem trước để góp ý; dễ sửa lại; in ra cho mỗi bạn; lưu tệp trong máy để phòng khi cuốn sổ in bị hỏng hoặc thất lạc."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Dựa vào sơ đồ tư duy trình bày nội dung cuốn sổ lưu niệm ở Bài 10, em hãy lựa chọn các phần mềm cần sử dụng để tạo nội dung cho cuốn sổ trên máy tính.",
    k:"Phần mềm <b>soạn thảo văn bản</b> (Word, Google Docs,…) cho bài viết cảm nghĩ, danh sách thành viên; phần mềm xử lí ảnh; phần mềm sơ đồ tư duy;…"},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Các phần mềm đó cần có chức năng gì để giúp em hoàn thành công việc?",
    k:"Tạo và định dạng văn bản, chèn hình ảnh, chỉnh sửa nội dung, lưu và in văn bản."},
  cn:{type:"sort", label:"Đọc hiểu – Chức năng phần mềm soạn thảo", q:"Mỗi chức năng dưới đây là chức năng cơ bản hay chức năng nâng cao của phần mềm soạn thảo văn bản?",
    cats:["Cơ bản","Nâng cao"], items:[["Tạo và định dạng văn bản",0],["Biên tập, chỉnh sửa nội dung",0],["Lưu trữ văn bản",0],["In văn bản",0],["Xem lại và theo dõi sự thay đổi của tài liệu",1],["Lưu trữ tài liệu nhờ công nghệ đám mây",1],["Làm việc cộng tác với người khác trên cùng một tài liệu",1]],
    k:"<b>Cơ bản</b>: tạo và định dạng, biên tập, lưu trữ, in. <b>Nâng cao</b>: theo dõi thay đổi, lưu trữ đám mây, làm việc cộng tác."},
  p48:{type:"open", label:"Câu hỏi tr.48", q:"Em sẽ sử dụng những chức năng nào của phần mềm soạn thảo văn bản để tạo nội dung cho cuốn sổ lưu niệm?",
    k:"Gõ và định dạng văn bản (phông chữ, căn lề), chèn hình ảnh, định dạng trang, lưu và in; có thể làm việc cộng tác với các bạn qua đám mây."},
  dt:{type:"sort", label:"Đọc hiểu – Định dạng đoạn, định dạng trang", q:"Mỗi thao tác dưới đây thuộc định dạng đoạn văn bản hay định dạng trang văn bản?",
    cats:["Định dạng đoạn","Định dạng trang"], items:[["Căn thẳng hai lề",0],["Tăng mức thụt lề trái",0],["Khoảng cách giữa các dòng trong đoạn",0],["Khoảng cách giữa các đoạn",0],["Chọn hướng trang đứng (Portrait)",1],["Đặt lề trên, lề dưới, lề trái, lề phải (Margins)",1],["Chọn khổ giấy A4 (Size)",1]],
    k:"<b>Đoạn</b>: thẻ Home, nhóm Paragraph (căn lề, thụt lề, khoảng cách dòng, khoảng cách đoạn). <b>Trang</b>: thẻ Page Layout, nhóm Page Setup (hướng trang, lề trang, khổ giấy)."},
  vt:{type:"match", label:"Đọc hiểu – Vị trí các lệnh", q:"Mỗi nhóm lệnh dưới đây nằm ở đâu trong Microsoft Word?",
    items:[["Các lệnh định dạng đoạn văn bản",1],["Các lệnh định dạng trang văn bản",2],["Lệnh in văn bản",3]],
    opts:["Thẻ Home, nhóm lệnh Paragraph","Thẻ Page Layout, nhóm lệnh Page Setup","Thẻ File, lệnh Print"], ph:"Chọn vị trí…",
    k:"Đoạn: Home/Paragraph. Trang: Page Layout/Page Setup. In: File/Print (chọn máy in, nhập trang cần in, xem trước khi in)."},
  th1:{type:"order", label:"Thực hành – Căn giữa", q:"Sắp xếp các bước căn giữa tiêu đề, hình ảnh và dòng “Tớ là An” (dùng nút ↑ ↓).",
    items:{a:"Chọn dòng tiêu đề, hình ảnh và dòng Tớ là An",b:"Nháy chuột vào thẻ Home",c:"Chọn nút căn giữa trong nhóm Paragraph"}, start:["c","b","a"], ans:["a","b","c"],
    k:"<b>Chọn</b> phần văn bản → thẻ <b>Home</b> → nút <b>căn giữa</b>. Thực hiện tương tự để căn thẳng hai lề cho các đoạn văn."},
  th2:{type:"order", label:"Thực hành – Hướng trang", q:"Sắp xếp các bước chọn hướng trang đứng (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột chọn thẻ Page Layout",b:"Tìm nhóm lệnh Page Setup",c:"Nháy chuột chọn Orientation và chọn Portrait"}, start:["c","a","b"], ans:["a","b","c"],
    k:"Page Layout → Page Setup → Orientation → <b>Portrait</b>. Chọn lề trang: Page Layout → Page Setup → Margins → <b>Normal</b>."},
  th3:{type:"open", label:"Thực hành – Bài viết cảm nghĩ", q:"Tham khảo bài viết của bạn An (Hình 5.8), soạn một bài viết cảm nghĩ của em trên phần mềm soạn thảo văn bản: nhập nội dung, chèn hình ảnh, căn lề, chọn hướng trang, lề trang, xem trang in và lưu tệp với tên CamNghiVeBan.docx. Ghi lại các định dạng em đã dùng.",
    k:"Tiêu đề, ảnh căn giữa; các đoạn căn thẳng hai lề; hướng trang đứng; lề Normal; lưu bằng File/Save với tên CamNghiVeBan.docx."},
  lt1:{type:"sort", label:"Luyện tập – Câu 1", q:"Em hãy chọn hướng trang phù hợp cho các văn bản sau.",
    cats:["Trang đứng","Trang ngang"], items:[["a) Đơn xin nghỉ học.",0],["b) Báo cáo tổng kết năm học của lớp.",0],["d) Sách ảnh chứa ảnh phong cảnh.",1]],
    k:"Đơn, báo cáo: <b>trang đứng</b>. Sách ảnh phong cảnh (ảnh rộng): <b>trang ngang</b>. c) Sổ lưu niệm của lớp: có thể chọn trang đứng hoặc ngang tuỳ cách trình bày."},
  lt2:{type:"mcq", label:"Luyện tập – Câu 2", q:"Em chọn loại căn lề nào khi trình bày nội dung bài thơ lục bát trên phần mềm soạn thảo văn bản? Tại sao?",
    o:["Căn thẳng lề trái.","Căn giữa.","Căn thẳng lề phải.","Căn thẳng hai lề."], a:1,
    k:"<b>Căn giữa</b>: câu 6 chữ và câu 8 chữ cân đối hai bên, bài thơ đẹp, dễ đọc (cũng có thể căn trái và thụt lề câu 6 chữ)."},
  lt3:{type:"open", label:"Luyện tập – Câu 3", q:"Em hãy soạn thảo Đơn xin nghỉ học và thực hiện các thao tác định dạng hợp lí. Ghi lại các định dạng em đã dùng.",
    k:"Quốc hiệu, tiêu ngữ, tên đơn căn giữa; nội dung căn thẳng hai lề hoặc lề trái; chữ kí căn phải; trang đứng, khổ A4, lề Normal."},
  vd:{type:"open", label:"Vận dụng", q:"Với nội dung cuốn sổ lưu niệm của lớp, em hãy: a) soạn thảo thêm nội dung (bài viết cảm nghĩ, bài viết giới thiệu hoạt động, sự kiện,…); b) chèn thêm hình ảnh minh hoạ; c) căn lề và định dạng trang để có được bố cục hợp lí và đẹp; d) lưu lại tệp để dùng cho việc tạo cuốn sổ lưu niệm của lớp. Ghi lại tên tệp và nội dung em đã soạn.",
    k:"Học sinh nêu tên tệp, nội dung, hình ảnh đã chèn và các định dạng đã dùng."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Phần mềm soạn thảo văn bản có các chức năng cơ bản: tạo và định dạng văn bản; biên tập, chỉnh sửa nội dung; lưu trữ văn bản; in văn bản. Chức năng nâng cao: xem lại và theo dõi sự thay đổi của tài liệu; lưu trữ nhờ công nghệ đám mây; làm việc cộng tác với người khác.</p>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Định dạng đoạn văn bản: căn lề, thụt lề, khoảng cách giữa các dòng, giữa các đoạn (thẻ Home, nhóm Paragraph).</li><li>Định dạng trang văn bản: hướng trang, lề trang, khổ giấy (thẻ Page Layout, nhóm Page Setup).</li><li>In văn bản: thẻ File, lệnh Print.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Soạn trên máy tính: <b>dễ sửa, dễ chia sẻ, in nhiều bản, lưu lâu</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Phần mềm soạn thảo văn bản</p><ul><li>Chức năng: <b>tạo và định dạng, chỉnh sửa, lưu trữ, in</b> văn bản.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Định dạng văn bản và in</p><ul><li><b>Đoạn</b> (Home/Paragraph): căn lề, thụt lề, khoảng cách dòng.</li><li><b>Trang</b> (Page Layout/Page Setup): hướng trang, lề, khổ giấy.</li><li><b>In</b>: File → Print.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul><li>Chọn văn bản → <b>Home</b> → nút căn lề.</li><li>Page Layout → <b>Orientation</b> / <b>Margins</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Đơn, báo cáo: <b>trang đứng</b>; sách ảnh phong cảnh: <b>trang ngang</b>.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Định dạng hợp lí → văn bản <b>đẹp, dễ đọc</b>.</li></ul>'}
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
    return ["T6B11." + id + " · " + t.label, v];
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
    "title": "Làm sổ lưu niệm trên máy tính",
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
  "title": "Phần mềm soạn thảo văn bản",
  "acts": [
   {
    "title": "Hoạt động 1: Phần mềm soạn thảo văn bản",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Chức năng của phần mềm soạn thảo văn bản",
    "tasks": [
     "cn"
    ],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 48",
    "tasks": [
     "p48"
    ]
   },
   {
    "title": "Ghi bài: Phần mềm soạn thảo văn bản",
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
  "title": "Định dạng văn bản và in",
  "acts": [
   {
    "title": "Đọc hiểu: Định dạng đoạn, định dạng trang, in",
    "tasks": [
     "dt",
     "vt"
    ],
    "concept": "c2"
   },
   {
    "title": "Ghi bài: Định dạng văn bản và in",
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
  "title": "Định dạng văn bản",
  "acts": [
   {
    "title": "Thực hành: Bài viết cảm nghĩ",
    "tasks": [
     "th1",
     "th2",
     "th3"
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
    "title": "Hướng trang và căn lề",
    "tasks": [
     "lt1",
     "lt2",
     "lt3"
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
    "title": "Nội dung cuốn sổ lưu niệm",
    "tasks": [
     "vd"
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
window.LESSON = {STAGES, id: "tin6-bai11", title: "Bài 11. Định dạng văn bản", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 căn lề đúng, chọn hướng trang đứng, lề Normal…",
  commentPh: "Ví dụ: Bài viết trình bày đẹp; nên căn thẳng hai lề cho các đoạn văn."};
})();
