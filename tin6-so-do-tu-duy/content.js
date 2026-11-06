/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const DS = ["Đúng","Sai"];
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Hãy tưởng tượng khi 50 tuổi, em tìm thấy cuốn sổ lưu niệm đã cũ của lớp mình. Hãy viết ra ba điều mà cuốn sổ lưu niệm làm em thích thú, một điều làm em hạnh phúc và một điều gợi lại cho em kỉ niệm buồn.",
    k:"Học sinh tự viết, ví dụ: thích ảnh cả lớp đi dã ngoại, bài thơ bạn tặng, danh sách sở thích; hạnh phúc vì được cô khen; buồn vì một bạn chuyển trường."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Theo em sổ lưu niệm sẽ gồm những thông tin gì?",
    k:"Giới thiệu thành viên (họ tên, ngày sinh, ảnh, sở thích, địa chỉ liên lạc); giáo viên; các bài viết cảm nghĩ; hoạt động, sự kiện của lớp;…"},
  hd2a:{type:"mcq", label:"HĐ2 – Câu 1", q:"Quan sát sơ đồ tư duy ở Hình 5.2. Cách biểu diễn nào dễ hiểu, dễ nhớ và thú vị hơn?",
    o:["Văn bản (Hình 5.1)","Sơ đồ tư duy (Hình 5.2)"], a:1, k:"<b>Sơ đồ tư duy</b>: trực quan, thấy được bức tranh tổng thể, dễ nhớ."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Sử dụng sơ đồ tư duy có lợi ích gì?",
    k:"Nhìn thấy bức tranh tổng thể, dễ dàng ghi nhớ, thúc đẩy tư duy, tăng khả năng sáng tạo, đơn giản dễ hiểu, tiết kiệm thời gian."},
  hd2c:{type:"sort", label:"HĐ2 – Câu 3", q:"Trong Hình 5.2, mỗi mục dưới đây là chủ đề chính hay chủ đề nhánh?",
    cats:["Chủ đề chính","Chủ đề nhánh"], items:[["Sơ đồ tư duy",0],["Người sáng tạo",1],["Lợi ích",1],["Làm gì?",1],["Thành phần",1]],
    k:"Chủ đề chính: <b>Sơ đồ tư duy</b>. Chủ đề nhánh: <b>Người sáng tạo, Lợi ích, Làm gì?, Thành phần</b>."},
  hd2d:{type:"mcq", label:"HĐ2 – Câu 4", q:"Các ý chi tiết của chủ đề nhánh “Thành phần” là gì?",
    o:["Từ khoá, hình ảnh, đường nối.","Tony Buzan, quốc tịch Anh, sinh năm 1942.","Ghi nhớ thông tin, tổ chức thông tin.","Dễ ghi nhớ, tiết kiệm thời gian."], a:0, k:"<b>A</b>. Từ khoá, hình ảnh, đường nối."},
  p43a:{type:"sort", label:"Câu hỏi tr.43 – Câu 1", q:"Sơ đồ tư duy giúp chúng ta (chọn các phương án đúng):",
    cats:DS, items:[["A. Ghi nhớ tốt hơn.",0],["B. Giải các bài toán.",1],["C. Sáng tạo hơn.",0],["D. Nhìn thấy bức tranh tổng thể.",0]], k:"<b>A, C, D</b>."},
  p43b:{type:"sort", label:"Câu hỏi tr.43 – Câu 2", q:"Sơ đồ tư duy là (chọn các phương án đúng):",
    cats:DS, items:[["A. Một công cụ tổ chức thông tin phù hợp với quá trình tư duy.",0],["B. Một phương pháp chuyển tải thông tin.",0],["C. Một cách ghi chép sáng tạo.",0],["D. Một công cụ soạn thảo văn bản.",1]], k:"<b>A, B, C</b>."},
  cb:{type:"order", label:"Đọc hiểu – Các bước tạo sơ đồ tư duy", q:"Sắp xếp các bước tạo sơ đồ tư duy (dùng nút ↑ ↓).",
    items:{a:"Viết chủ đề chính ở giữa tờ giấy, dùng một hình bao quanh",b:"Từ chủ đề chính, vẽ các chủ đề nhánh",c:"Phát triển thông tin chi tiết cho mỗi chủ đề nhánh (từ khoá, hình ảnh)",d:"Tạo thêm nhánh con khi bổ sung thông tin để mở rộng sơ đồ"}, start:["c","a","d","b"], ans:["a","b","c","d"],
    k:"Chủ đề chính ở giữa → các chủ đề nhánh → chi tiết từng nhánh → nhánh con. Nên dùng màu sắc vì màu sắc có tác dụng kích thích não bộ."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Em và các bạn thảo luận nhóm để bàn về nội dung cuốn sổ lưu niệm của lớp, sau đó tạo sơ đồ tư duy trên giấy (hoặc bằng công cụ ở trên) để ghi lại kết quả thảo luận theo gợi ý trong Hình 5.3. Ghi lại các nhánh chính của nhóm em.",
    k:"Ví dụ: Giới thiệu thành viên (họ tên, ngày sinh, địa chỉ liên lạc, ảnh, sở thích); Giáo viên (giáo viên chủ nhiệm,…); Các bài viết cảm nghĩ (về bạn, về trường lớp); Hoạt động, sự kiện."},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Theo em sơ đồ tư duy thủ công trên giấy có hạn chế gì?",
    k:"Khó sửa chữa, thay đổi bố cục; khó thêm, bớt nội dung khi hết chỗ; khó chia sẻ cho nhiều người ở xa; mất thời gian vẽ lại."},
  p44:{type:"mcq", label:"Câu hỏi tr.44", q:"Ưu điểm của việc tạo sơ đồ tư duy thủ công trên giấy là gì?",
    o:["Dễ sắp xếp, bố trí, thay đổi, thêm bớt nội dung.","Sản phẩm tạo ra dễ dàng sử dụng cho các mục đích khác nhau như đưa vào bài trình chiếu, gửi cho bạn qua thư điện tử,…","Sản phẩm tạo ra nhanh chóng, dễ dàng chia sẻ cho nhiều người ở các địa điểm khác nhau.","Có thể thực hiện ở bất cứ đâu, chỉ cần giấy và bút. Thể hiện được phong cách riêng của người tạo."], a:3,
    k:"<b>D</b>. A, B, C là ưu điểm của phần mềm sơ đồ tư duy."},
  pm:{type:"order", label:"Thực hành – Tạo sơ đồ bằng phần mềm", q:"Sắp xếp các thao tác tạo sơ đồ tư duy bằng phần mềm MindMaple Lite (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào File, chọn New",b:"Chọn một mẫu, nháy Create",c:"Nháy vào khung Central Topic, nhập tên chủ đề chính",d:"Chọn chủ đề chính, chọn Insert/Subtopic để tạo chủ đề nhánh",e:"Chọn File/Save, lưu tệp với tên SoLuuNiem.emm"}, start:["d","e","b","a","c"], ans:["a","b","c","d","e"],
    k:"File/New → chọn mẫu, Create → nhập chủ đề chính → Insert/Subtopic → File/Save. <i>Chú ý: tạo chủ đề nhánh cho chủ đề nào thì nháy chuột chọn chủ đề đó trước khi tạo.</i>"},
  th:{type:"open", label:"Thực hành – Sổ lưu niệm", q:"Sử dụng phần mềm sơ đồ tư duy (hoặc công cụ trên trang này) để tạo sơ đồ tư duy ghi lại các nội dung có trong cuốn sổ lưu niệm của lớp em. Ghi lại tên tệp và các nhánh em đã tạo.",
    k:"Tệp SoLuuNiem.emm gồm chủ đề chính SỔ LƯU NIỆM LỚP 6A và các nhánh: Giới thiệu thành viên, Giáo viên, Các bài viết cảm nghĩ, Hoạt động sự kiện,…"},
  lt:{type:"open", label:"Luyện tập", q:"Thực hiện cho sơ đồ tư duy sổ lưu niệm: a) bổ sung các nhánh nội dung (nếu cần); b) chỉnh sửa màu sắc và kiểu đường nối, bổ sung hình ảnh, biểu tượng,… để tăng hiệu quả trình bày; c) chia sẻ sơ đồ cho thầy cô và các bạn để cả lớp trao đổi, thống nhất nội dung. Em đã thay đổi những gì?",
    k:"Học sinh nêu các nhánh bổ sung, màu sắc, biểu tượng đã thêm và ý kiến góp ý của các bạn."},
  vd:{type:"open", label:"Vận dụng", q:"Em hãy dùng sơ đồ tư duy (vẽ trên giấy hoặc tạo bằng phần mềm) trình bày tóm tắt nội dung Bài 9. An toàn thông tin trên Internet. Ghi lại các nhánh chính em đã vẽ.",
    k:"Chủ đề chính: An toàn thông tin trên Internet. Nhánh: Tác hại, nguy cơ (5 ý); Quy tắc an toàn (Giữ an toàn, Không gặp gỡ, Đừng chấp nhận, Kiểm tra độ tin cậy, Hãy nói ra); Biện pháp bảo vệ (mật khẩu mạnh, đăng xuất, phần mềm chống virus,…)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Sơ đồ tư duy là phương pháp trình bày thông tin một cách trực quan bằng cách sử dụng văn bản, hình ảnh và các đường nối.</li><li>Sơ đồ tư duy tận dụng tối đa khả năng ghi nhận hình ảnh của bộ não, giúp chúng ta dễ dàng ghi nhớ chi tiết, tổng hợp hay phân tích vấn đề.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<p>Phần mềm máy tính giúp em tạo sơ đồ tư duy dễ dàng, nhanh chóng; dễ sửa chữa và điều chỉnh; nhanh chóng chia sẻ và trao đổi. Em có thể dùng sơ đồ tư duy để ghi lại nội dung kiến thức các môn học, kế hoạch hoạt động ngoại khoá, kế hoạch đi du lịch,…</p>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Sổ lưu niệm: <b>thành viên, giáo viên, bài viết, hoạt động</b> của lớp.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Sơ đồ tư duy</p><ul><li><b>Sơ đồ tư duy</b>: trình bày thông tin <b>trực quan</b> bằng văn bản, hình ảnh, đường nối.</li><li>Lợi ích: <b>dễ nhớ</b>, thấy <b>tổng thể</b>, sáng tạo, tiết kiệm thời gian.</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Cách tạo sơ đồ tư duy</p><ul><li><b>Chủ đề chính</b> ở giữa → <b>chủ đề nhánh</b> → <b>chi tiết</b> (từ khoá, hình ảnh).</li><li>Dùng <b>màu sắc</b> để kích thích não bộ.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul><li>Phần mềm: <b>dễ sửa, nhanh, dễ chia sẻ</b>. VD: MindMaple Lite.</li><li>File/New → chủ đề chính → <b>Insert/Subtopic</b> → File/Save.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Bổ sung nhánh, đổi <b>màu</b>, thêm <b>hình ảnh</b>, chia sẻ.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Dùng sơ đồ tư duy để <b>tóm tắt bài học</b>.</li></ul>'}
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
    return ["T6B10." + id + " · " + t.label, v];
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
    "title": "Hoạt động 1: Sổ lưu niệm của lớp",
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
  "title": "Sơ đồ tư duy",
  "acts": [
   {
    "title": "Đọc hiểu: Giới thiệu sơ đồ tư duy",
    "tasks": []
   },
   {
    "title": "Hoạt động 2: Sơ đồ tư duy",
    "tasks": [
     "hd2a",
     "hd2b",
     "hd2c",
     "hd2d"
    ],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 43",
    "tasks": [
     "p43a",
     "p43b"
    ]
   },
   {
    "title": "Ghi bài: Sơ đồ tư duy",
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
  "title": "Cách tạo sơ đồ tư duy",
  "acts": [
   {
    "title": "Đọc hiểu: Các bước tạo sơ đồ tư duy",
    "tasks": [
     "cb"
    ]
   },
   {
    "title": "Hoạt động 3: Nội dung cuốn sổ lưu niệm",
    "tasks": [
     "hd3a",
     "hd3b"
    ]
   },
   {
    "title": "Câu hỏi: SGK trang 45",
    "tasks": [
     "p44"
    ]
   },
   {
    "title": "Ghi bài: Cách tạo sơ đồ tư duy",
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
  "title": "Tạo sơ đồ tư duy bằng phần mềm máy tính",
  "acts": [
   {
    "title": "Thực hành: Phần mềm sơ đồ tư duy",
    "tasks": [
     "pm",
     "th"
    ],
    "concept": "c2"
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
    "title": "Hoàn thiện sơ đồ sổ lưu niệm",
    "tasks": [
     "lt"
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
    "title": "Tóm tắt Bài 9 bằng sơ đồ tư duy",
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
window.LESSON = {STAGES, id: "tin6-bai10", title: "Bài 10. Sơ đồ tư duy", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 vẽ được sơ đồ sổ lưu niệm có 4 nhánh…",
  commentPh: "Ví dụ: Sơ đồ rõ ràng, dùng từ khoá ngắn; nên thêm màu sắc và hình ảnh."};
})();
