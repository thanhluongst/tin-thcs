/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const DS = ["Đúng","Sai"];
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Nhờ đâu mẹ An có thể đặt vé máy bay mà không cần đến phòng vé? Em hãy kể một việc mà gia đình em đã làm nhờ Internet.",
    k:"Nhờ <b>Internet</b>: các hãng hàng không đăng thông tin chuyến bay, giờ bay, giá vé trên Internet; người dùng tìm thông tin, đặt vé và thanh toán trực tuyến."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Em hiểu Internet là gì?",
    k:"Internet là <b>mạng liên kết các mạng máy tính</b> trên khắp thế giới."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Người sử dụng có thể làm được những gì khi truy cập Internet?",
    k:"Tìm kiếm, chia sẻ, lưu trữ và trao đổi thông tin; xem tin tức, học trực tuyến, gửi thư điện tử, mua bán, giải trí,…"},
  p21:{type:"match", label:"Câu hỏi tr.21", q:"Thay các số (1)…(5) bằng một từ hoặc cụm từ thích hợp: a) Internet là mạng …(1)… các …(2)… máy tính trên khắp thế giới. b) Người sử dụng truy cập Internet để tìm kiếm, …(3)…, lưu trữ và trao đổi …(4)…. c) Có nhiều …(5)… thông tin khác nhau trên Internet.",
    items:[["(1)",2],["(2)",5],["(3)",1],["(4)",3],["(5)",4]], opts:["chia sẻ","liên kết","thông tin","dịch vụ","mạng"], ph:"Chọn từ…",
    k:"(1) liên kết; (2) mạng; (3) chia sẻ; (4) thông tin; (5) dịch vụ."},
  hd2:{type:"open", label:"HĐ2 – Đặc điểm của Internet", q:"Theo em Internet có những đặc điểm gì?",
    k:"Toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu; ngoài ra còn cập nhật, lưu trữ, đa dạng, ẩn danh."},
  dd:{type:"match", label:"Đọc hiểu – Bốn đặc điểm chính", q:"Ghép mỗi mô tả với đặc điểm chính phù hợp của Internet.",
    items:[["Năm 2020 khoảng hơn một phần ba dân số thế giới ở hầu hết các quốc gia đang sử dụng Internet.",1],["Người dùng có thể tức thời nhận và gửi thông tin, khác với truyền thông một chiều của sách báo, truyền hình.",2],["Người dùng tìm kiếm, lưu trữ, trao đổi thông tin thuận lợi, nhanh chóng ở mọi lúc, mọi nơi.",3],["Internet không thuộc sở hữu hay do bất kì tổ chức hoặc cá nhân nào điều hành.",4]],
    opts:["Tính toàn cầu","Tính tương tác","Tính dễ tiếp cận","Tính không chủ sở hữu"], ph:"Chọn đặc điểm…",
    k:"Lần lượt: <b>toàn cầu</b>, <b>tương tác</b>, <b>dễ tiếp cận</b>, <b>không chủ sở hữu</b>."},
  p21a:{type:"sort", label:"Câu hỏi tr.21 – Câu 1", q:"Internet có những đặc điểm chính nào dưới đây? Chọn Đúng (là đặc điểm chính) hoặc Sai.",
    cats:DS, items:[["A. Tính toàn cầu.",0],["B. Tính tương tác.",0],["C. Tính lưu trữ.",1],["D. Tính dễ tiếp cận.",0],["E. Tính đa dạng.",1],["F. Tính không chủ sở hữu.",0]],
    k:"<b>A, B, D, F</b>. Tính lưu trữ và tính đa dạng là đặc điểm <b>khác</b>, không phải đặc điểm chính."},
  p21b:{type:"open", label:"Câu hỏi tr.21 – Câu 2", q:"Trong các đặc điểm của Internet, em thích đặc điểm nào nhất? Vì sao?",
    k:"Học sinh nêu đặc điểm và lí do, ví dụ: thích tính dễ tiếp cận vì em có thể học, tìm tài liệu ở mọi lúc, mọi nơi."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Em thường truy cập Internet để làm những việc gì?",
    k:"Ví dụ: học trực tuyến, tìm tư liệu làm bài tập, xem phim, nghe nhạc, chơi trò chơi, gửi thư cho bạn bè, giúp bố mẹ bán hàng trực tuyến,…"},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Internet có những lợi ích gì?",
    k:"Trao đổi thông tin nhanh chóng, hiệu quả; học tập và làm việc trực tuyến; nguồn tài liệu phong phú; tiện ích phục vụ đời sống; vui chơi, giải trí."},
  p22:{type:"sort", label:"Câu hỏi tr.22", q:"Em hãy chọn những việc mà em có thể làm với Internet.",
    cats:["Làm được với Internet","Không"], items:[["a) Học ngoại ngữ trực tuyến với người nước ngoài.",0],["b) Nghe nhạc, xem phim trực tuyến.",0],["c) Chơi đá bóng để nâng cao sức khoẻ.",1],["d) Tìm kiếm tài liệu học tập.",0],["e) Gửi thư điện tử.",0]],
    k:"<b>a, b, d, e</b>. Chơi đá bóng là hoạt động ngoài đời thực."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Internet là mạng:",
    o:["Kết nối hai máy tính với nhau.","Kết nối các máy tính trong một nước.","Kết nối nhiều mạng máy tính trên phạm vi toàn cầu.","Kết nối các máy tính trong một thành phố."], a:2,
    k:"<b>C</b>. Internet kết nối nhiều mạng máy tính trên phạm vi toàn cầu."},
  lt2:{type:"open", label:"Luyện tập – Câu 2", q:"Để máy tính kết nối được Internet ta cần làm gì?",
    k:"Đăng kí với một <b>nhà cung cấp dịch vụ Internet (ISP)</b> để được hỗ trợ cài đặt và cấp quyền truy cập; máy tính được kết nối qua ISP."},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Em hãy lấy ví dụ cho thấy Internet mang lại lợi ích cho việc học tập và giải trí.",
    k:"Học tập: học trực tuyến, xem bài giảng, tra từ điển, tìm tư liệu. Giải trí: nghe nhạc, xem phim, đọc truyện, chơi trò chơi trí tuệ."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em hãy giải thích tại sao Internet lại được sử dụng rộng rãi và ngày càng phát triển.",
    k:"Vì Internet có nhiều lợi ích (trao đổi nhanh, nguồn tài liệu phong phú, học tập, làm việc, giải trí,…) và các đặc điểm toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu → ai cũng có thể dùng ở mọi lúc, mọi nơi."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Internet là mạng liên kết các mạng máy tính trên khắp thế giới.</li><li>Máy tính có thể được kết nối với Internet thông qua một nhà cung cấp dịch vụ Internet.</li><li>Người sử dụng truy cập Internet để tìm kiếm, chia sẻ, lưu trữ và trao đổi thông tin.</li><li>Có nhiều dịch vụ thông tin khác nhau trên Internet: WWW, tìm kiếm, thư điện tử,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<p>Đặc điểm chính của Internet: tính toàn cầu, tính tương tác, tính dễ tiếp cận, tính không chủ sở hữu.</p>"},
  c3:{t:"Lợi ích của Internet", b:"<ul><li>Trao đổi thông tin nhanh chóng, hiệu quả.</li><li>Học tập và làm việc trực tuyến.</li><li>Cung cấp nguồn tài liệu phong phú.</li><li>Cung cấp các tiện ích phục vụ đời sống.</li><li>Là phương tiện vui chơi, giải trí.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Internet giúp tìm thông tin, đặt vé, thanh toán <b>không cần đến tận nơi</b>.</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Internet</p><ul><li><b>Internet</b>: mạng <b>liên kết các mạng máy tính</b> trên khắp thế giới.</li><li>Kết nối qua <b>nhà cung cấp dịch vụ Internet</b> (ISP).</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Đặc điểm của Internet</p><ul><li><b>Toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu</b>.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Lợi ích của Internet</p><ul><li>Trao đổi <b>nhanh</b>; học, làm việc <b>trực tuyến</b>; tài liệu <b>phong phú</b>; tiện ích; <b>giải trí</b>.</li><li>Không nên truy cập Internet <b>liên tục trong nhiều giờ</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Internet kết nối nhiều mạng máy tính trên <b>phạm vi toàn cầu</b>.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Internet phát triển vì có <b>nhiều lợi ích</b> và <b>dễ tiếp cận</b>.</li></ul>'}
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
    return ["T6B5." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {};
const SORT_HINT = {p21a:"Bốn đặc điểm chính: toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu."};

const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];
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
    "title": "Đặt vé máy bay",
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
  "title": "Internet",
  "acts": [
   {
    "title": "Hoạt động 1: Internet",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Internet là gì?",
    "tasks": [],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 21",
    "tasks": [
     "p21"
    ]
   },
   {
    "title": "Ghi bài: Internet",
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
  "title": "Đặc điểm của Internet",
  "acts": [
   {
    "title": "Hoạt động 2: Đặc điểm của Internet",
    "tasks": [
     "hd2"
    ]
   },
   {
    "title": "Đọc hiểu: Các đặc điểm của Internet",
    "tasks": [
     "dd"
    ],
    "concept": "c2"
   },
   {
    "title": "Câu hỏi: SGK trang 21",
    "tasks": [
     "p21a",
     "p21b"
    ]
   },
   {
    "title": "Ghi bài: Đặc điểm của Internet",
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
  "title": "Một số lợi ích của Internet",
  "acts": [
   {
    "title": "Hoạt động 3: Lợi ích của Internet",
    "tasks": [
     "hd3a",
     "hd3b"
    ]
   },
   {
    "title": "Đọc hiểu: Internet trong cuộc sống",
    "tasks": [],
    "concept": "c3"
   },
   {
    "title": "Câu hỏi: SGK trang 22",
    "tasks": [
     "p22"
    ]
   },
   {
    "title": "Ghi bài: Lợi ích của Internet",
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
    "title": "Internet là gì?",
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
    "title": "Internet quanh em",
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
window.LESSON = {STAGES, id: "tin6-bai5", title: "Bài 5. Internet", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nêu được 4 đặc điểm chính của Internet…",
  commentPh: "Ví dụ: Nhóm hiểu Internet là mạng toàn cầu; cần nêu thêm lợi ích trong học tập."};
})();
