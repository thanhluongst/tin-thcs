/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Ba hình ảnh (chim bồ câu đưa thư, gửi thư qua hòm thư bưu điện, gửi thư bằng máy tính) cho em biết điều gì?",
    k:"Cách gửi thư của con người thay đổi theo thời gian: dùng chim bồ câu → qua bưu điện → bằng máy tính qua Internet (<b>thư điện tử</b>), ngày càng nhanh và tiện lợi."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Để soạn và gửi một bức thư qua đường bưu điện đến tay người nhận thì cần những gì và thực hiện như thế nào?",
    k:"Cần giấy, bút, phong bì, tem, địa chỉ người nhận. Viết thư → cho vào phong bì, ghi địa chỉ, dán tem → bỏ vào hòm thư → bưu điện chuyển đến người nhận (mất nhiều ngày)."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em biết gì về thư điện tử? Tài khoản thư điện tử?",
    k:"Thư điện tử là thư gửi và nhận bằng phương tiện điện tử qua Internet. Muốn dùng cần có tài khoản thư điện tử (tên đăng nhập, mật khẩu)."},
  p33a:{type:"open", label:"Câu hỏi tr.33 – Câu 1", q:"Dịch vụ thư điện tử là gì?",
    k:"Là dịch vụ cung cấp các chức năng <b>soạn thảo, gửi, nhận, chuyển tiếp, lưu trữ và quản lí</b> thư điện tử cho người sử dụng."},
  p33b:{type:"sort", label:"Câu hỏi tr.33 – Câu 2", q:"Địa chỉ thư điện tử nào sau đây không đúng? Tại sao?",
    cats:["Đúng dạng","Không đúng"], items:[["A. khoa123@gmail.com",0],["B. minhtuan.gmail.com",1],["C. nmha@hnmu.edu.vn",0],["D. thuyk39@yahoo.com",0]],
    k:"<b>B</b> sai vì thiếu kí tự bắt buộc <b>@</b>. Địa chỉ đúng có dạng &lt;tên đăng nhập&gt;@&lt;địa chỉ máy chủ thư điện tử&gt;."},
  hd2:{type:"open", label:"HĐ2 – Ưu, nhược điểm", q:"Theo em dịch vụ thư điện tử có những ưu điểm và nhược điểm gì so với các phương thức liên lạc khác?",
    k:"Ưu: nhanh, gửi cho nhiều người, đính kèm tệp, lưu trữ dễ, chi phí thấp. Nhược: cần kết nối mạng, có thể nhiễm virus, thư rác, thư lừa đảo."},
  un:{type:"sort", label:"Đọc hiểu – Ưu điểm, nhược điểm", q:"Mỗi ý dưới đây là ưu điểm hay nhược điểm của dịch vụ thư điện tử?",
    cats:["Ưu điểm","Nhược điểm"], items:[["Thời gian gửi và nhận nhanh, kịp thời",0],["Có thể gửi thư cùng lúc cho nhiều người",0],["Có thể gửi kèm tệp văn bản, âm thanh, hình ảnh",0],["Lưu trữ và tìm kiếm thư dễ dàng",0],["Chi phí thấp, nhiều dịch vụ miễn phí",0],["Phải kết nối mạng mới sử dụng được",1],["Có thể bị nhiễm virus",1],["Có thể bị làm phiền với các thư rác",1],["Có thể bị lừa đảo bởi các thư giả mạo",1]],
    k:"<b>Ưu điểm</b>: chi phí thấp, tiết kiệm thời gian, thuận tiện. <b>Nhược điểm</b>: cần phương tiện điện tử kết nối mạng, có thể gặp nguy cơ, phiền toái."},
  p34:{type:"open", label:"Câu hỏi tr.34", q:"Em hãy nêu các ưu điểm và hạn chế của dịch vụ thư truyền thống. Các điểm đó đã thay đổi thế nào khi ta sử dụng dịch vụ thư điện tử?",
    k:"Thư truyền thống: không cần mạng, gửi được đồ vật; nhưng chậm, tốn tem, dễ thất lạc, mỗi lần gửi một người. Thư điện tử: nhanh, gửi nhiều người, rẻ, lưu trữ dễ; nhưng cần mạng, có thư rác, virus."},
  tk:{type:"order", label:"Thực hành – Tạo tài khoản", q:"Sắp xếp các bước tạo tài khoản thư điện tử trên mail.google.com (dùng nút ↑ ↓).",
    items:{a:"Truy cập trang mail.google.com",b:"Nháy chuột vào nút Tạo tài khoản",c:"Nhập đầy đủ thông tin theo hướng dẫn",d:"Nháy chuột vào nút Tiếp theo",e:"Xác nhận số điện thoại (nếu có), làm theo hướng dẫn",f:"Xuất hiện thông báo Chào mừng bạn!"}, start:["c","f","a","d","b","e"], ans:["a","b","c","d","e","f"],
    k:"a → b → c → d → e → f. Trẻ vị thành niên cần sự đồng ý, trợ giúp và quản lí của phụ huynh. Em cần ghi nhớ <b>tên đăng nhập</b> và <b>mật khẩu</b>."},
  dn:{type:"mcq", label:"Thực hành – Đăng xuất", q:"Vì sao cần nháy nút Đăng xuất khi không dùng hộp thư điện tử nữa?",
    o:["Để thư được gửi nhanh hơn.","Để tránh bị người khác sử dụng hộp thư của em.","Để xoá hết thư trong hộp thư.","Để đổi mật khẩu."], a:1,
    k:"<b>B</b>. Đăng xuất để tránh bị người khác sử dụng hộp thư của mình."},
  gt:{type:"open", label:"Thực hành – Soạn và gửi thư", q:"Đăng nhập hộp thư, soạn một thư mới gửi cho bạn (Người nhận, Chủ đề, Nội dung) rồi nháy Gửi. Ghi lại địa chỉ người nhận, chủ đề thư em đã gửi.",
    k:"Nháy <b>Soạn thư</b> → nhập địa chỉ người nhận → nhập tiêu đề (chủ đề) → nhập nội dung → (đính kèm tệp nếu có) → nháy <b>Gửi</b>."},
  lt1:{type:"mcq", label:"Luyện tập – Câu 1", q:"Thư điện tử có hạn chế nào dưới đây so với các hình thức gửi thư khác?",
    o:["Không đồng thời gửi được cho nhiều người.","Thời gian gửi thư lâu.","Phải phòng tránh virus, thư rác.","Chi phí thấp."], a:2, k:"<b>C</b>. Phải phòng tránh virus, thư rác."},
  lt2:{type:"mcq", label:"Luyện tập – Câu 2", q:"Một người có thể mở được nhiều tài khoản thư điện tử không?",
    o:["Có","Không"], a:0, k:"<b>Có</b>. Mỗi tài khoản có một địa chỉ thư riêng, duy nhất trên toàn cầu."},
  lt3:{type:"mcq", label:"Luyện tập – Câu 3", q:"Khi tạo tài khoản thư điện tử em không cần khai báo gì?",
    o:["Họ và tên.","Ngày sinh.","Địa chỉ nhà.","Hộp thư của phụ huynh."], a:2, k:"<b>C</b>. Không cần khai báo địa chỉ nhà."},
  vd1:{type:"sort", label:"Vận dụng – Câu 1", q:"Em hãy xác định xem thư nào có thể là thư rác trong các thư điện tử có tiêu đề sau.",
    cats:["Có thể là thư rác","Thư bình thường"], items:[["A. Cơ hội đầu tư kiếm được nhiều tiền hơn.",0],["B. Danh sách học sinh tham gia thi học sinh giỏi môn Tin học.",1],["C. Quà tặng miễn phí, hãy nháy chuột nhanh.",0],["D. Bạn đã trúng một chuyến đi miễn phí đến Mĩ.",0],["E. Ảnh tập thể lớp 6A ngày khai trường.",1],["F. Khuyến mãi, ưu đãi giá rẻ cho bạn.",0]],
    k:"<b>A, C, D, F</b> có thể là thư rác (quảng cáo, dụ dỗ, lừa đảo). Không mở thư, tệp đính kèm, liên kết từ người lạ."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em hãy soạn một thư điện tử có gửi kèm ảnh (hoặc tệp văn bản, thiệp chúc mừng,…) cho bạn hoặc người thân của em. Ghi lại chủ đề thư và tên tệp đính kèm.",
    k:"Khi soạn thư, nháy nút 📎 (Đính kèm) → chọn tệp → nháy Gửi."},
  oc:{type:"mcq", label:"Trò chơi – Giải ô chữ", q:"Giải ô chữ ở trên. Từ khoá ở cột màu xanh là gì?",
    o:["TAI KHOAN","THU DIEN TU","MAT KHAU","DANG NHAP"], a:1,
    k:"1 TAIKHOAN, 2 MATKHAU, 3 NGUOINHAN, 4 DANGNHAP, 5 DIACHI, 6 TEP, 7 DANGXUAT, 8 HOPTHU, 9 GUI → từ khoá <b>THUDIENTU</b> (thư điện tử)."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Thư điện tử là thư được gửi và nhận bằng phương tiện điện tử.</li><li>Khi đăng kí tài khoản thư điện tử, người sử dụng có một hộp thư điện tử cùng địa chỉ thư và mật khẩu.</li><li>Địa chỉ thư điện tử có dạng: &lt;tên đăng nhập&gt;@&lt;địa chỉ máy chủ thư điện tử&gt;.</li><li>Dịch vụ thư điện tử cung cấp các chức năng để soạn, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử cho người sử dụng.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Ưu điểm của dịch vụ thư điện tử: chi phí thấp, tiết kiệm thời gian, thuận tiện,…</li><li>Nhược điểm của dịch vụ thư điện tử: phải sử dụng phương tiện điện tử kết nối mạng, có thể gặp một số nguy cơ, phiền toái.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul><li>Gửi thư: bồ câu → bưu điện → <b>thư điện tử</b> (nhanh, tiện).</li></ul>'},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thư điện tử. Tài khoản thư điện tử</p><ul><li><b>Thư điện tử</b>: gửi, nhận bằng phương tiện điện tử.</li><li>Tài khoản → <b>hộp thư</b> + địa chỉ + mật khẩu.</li><li>Địa chỉ: <b>tên đăng nhập@địa chỉ máy chủ</b>. VD: an123@gmail.com</li></ul>'},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Ưu và nhược điểm</p><ul><li>Ưu: <b>rẻ, nhanh, tiện</b>, gửi nhiều người, đính kèm tệp.</li><li>Nhược: cần <b>mạng</b>; có <b>virus, thư rác, lừa đảo</b>.</li></ul>'},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul><li>Đăng nhập → <b>Soạn thư</b> (người nhận, chủ đề, nội dung) → <b>Gửi</b> → <b>Đăng xuất</b>.</li></ul>'},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul><li>Một người có thể có <b>nhiều</b> tài khoản thư.</li></ul>'},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul><li>Thư hứa <b>tiền, quà, trúng thưởng</b> → có thể là thư rác: <b>không mở</b>.</li></ul>'}
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
    return ["T6B8." + id + " · " + t.label, v];
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
    "title": "Ba cách gửi thư",
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
  "title": "Thư điện tử. Tài khoản thư điện tử",
  "acts": [
   {
    "title": "Hoạt động 1: Thư điện tử",
    "tasks": [
     "hd1a",
     "hd1b"
    ]
   },
   {
    "title": "Đọc hiểu: Thư điện tử, tài khoản, địa chỉ",
    "tasks": [],
    "concept": "c1"
   },
   {
    "title": "Câu hỏi: SGK trang 33",
    "tasks": [
     "p33a",
     "p33b"
    ]
   },
   {
    "title": "Ghi bài: Thư điện tử. Tài khoản thư điện tử",
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
  "title": "Ưu điểm và nhược điểm của dịch vụ thư điện tử",
  "acts": [
   {
    "title": "Hoạt động 2: Ưu điểm và nhược điểm của dịch vụ thư điện tử",
    "tasks": [
     "hd2"
    ]
   },
   {
    "title": "Đọc hiểu: Ưu điểm, nhược điểm",
    "tasks": [
     "un"
    ],
    "concept": "c2"
   },
   {
    "title": "Câu hỏi: SGK trang 34",
    "tasks": [
     "p34"
    ]
   },
   {
    "title": "Ghi bài: Ưu điểm và nhược điểm",
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
  "title": "Đăng kí tài khoản, đăng nhập, đăng xuất và gửi thư điện tử",
  "acts": [
   {
    "title": "Thực hành: Hộp thư điện tử",
    "tasks": [
     "tk",
     "dn",
     "gt"
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
    "title": "Thư điện tử",
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
    "title": "Thư rác và thư gửi bạn",
    "tasks": [
     "vd1",
     "vd2"
    ]
   },
   {
    "title": "Trò chơi: Giải ô chữ",
    "tasks": [
     "oc"
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
window.LESSON = {STAGES, id: "tin6-bai8", title: "Bài 8. Thư điện tử", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhận ra đúng địa chỉ thư sai dạng và các thư rác…",
  commentPh: "Ví dụ: Nhóm nêu đủ ưu, nhược điểm; nhớ đăng xuất sau khi dùng."};
})();
