/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"sort", label:"Mở đầu – Xưa và nay", q:"Con người đã nghĩ ra nhiều cách trao đổi thông tin với nhau. Mỗi cách dưới đây là cách truyền thống hay là kênh trao đổi trên Internet?",
    cats:["Cách truyền thống","Kênh trên Internet"],
    items:[["Dùng chim bồ câu đưa thư",0],["Gửi thư qua bưu điện",0],["Điện báo",0],["Thư điện tử (email)",1],["Mạng xã hội",1],["Diễn đàn (Forum)",1]],
    k:"Cách truyền thống: chim bồ câu đưa thư, thư bưu điện, điện báo, điện thoại,… Internet tạo ra nhiều kênh <b>hữu ích, nhanh chóng</b>: thư điện tử, diễn đàn, <b>mạng xã hội</b>,…"},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Ở lớp 6 em đã biết sử dụng Internet để nhận và gửi thông tin. Đó là cách nào?",
    k:"Ví dụ: gửi, nhận <b>thư điện tử</b>; tìm kiếm, xem thông tin trên các <b>trang web</b>."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em có biết cách trao đổi thông tin nào trên Internet đang được sử dụng nhiều nhất không? Tại sao?",
    k:"Thường là <b>mạng xã hội</b> (Facebook, Zalo, YouTube,…) vì dễ dùng, miễn phí, trao đổi ngay lập tức, gửi được nhiều dạng thông tin (văn bản, hình ảnh, âm thanh, video) và kết nối được rất nhiều người."},
  kenh:{type:"sort", label:"Đọc hiểu – Kênh trao đổi thông tin", q:"Đọc mục a) (SGK trang 18). Mỗi thứ dưới đây có phải là kênh trao đổi thông tin trên Internet không?",
    cats:["Là kênh trao đổi trên Internet","Không phải"],
    items:[["Thư điện tử",0],["Diễn đàn (Forum)",0],["Mạng xã hội",0],["Phần mềm soạn thảo văn bản",1],["Máy in",1]],
    k:"Một số kênh trao đổi thông tin phổ biến trên Internet: <b>thư điện tử, diễn đàn, mạng xã hội</b>,… Thông tin trên đó tồn tại ở nhiều dạng: văn bản, hình ảnh, âm thanh, video, phần mềm,…"},
  mucdich:{type:"sort", label:"Đọc hiểu – Bảng 4.1", q:"Đọc mục b) và Bảng 4.1 (SGK trang 19). Mỗi mạng xã hội dưới đây chủ yếu dùng cho mục đích nào?",
    cats:["Giao lưu với bạn bè","Chia sẻ video","Chia sẻ ảnh","Diễn đàn học tập, thảo luận"],
    items:[["Facebook",0],["Zalo",0],["YouTube",1],["Instagram",2],["Cộng đồng Scratch",3]],
    k:"Facebook, Zalo: <b>giao lưu với bạn bè</b>. YouTube: <b>chia sẻ video</b>. Instagram: <b>chia sẻ ảnh</b>. Scratch: <b>diễn đàn học tập</b>, thảo luận. Mỗi mạng xã hội thường có một mục đích nhất định."},
  haimat:{type:"sort", label:"Đọc hiểu – Hai mặt của mạng xã hội", q:"Đọc đoạn cuối trang 19. Mỗi việc dưới đây là sử dụng mạng xã hội hữu ích hay sai trái?",
    cats:["Hữu ích","Sai trái"],
    items:[["Kết nối, hỏi thăm bạn bè",0],["Học thêm kĩ năng hay từ video",0],["Đăng thông tin chưa được kiểm chứng gây hoang mang",1],["Chụp ảnh đề thi đăng lên nhờ làm hộ",1],["Bình luận đe doạ, bắt nạt bạn",1],["Thảo luận bài tập với nhóm học tập",0]],
    k:"Mạng xã hội có <b>hai mặt</b>: giúp kết nối, học hỏi; nhưng dùng sai mục đích (tin giả, đe doạ, bắt nạt, gian lận thi cử) gây hậu quả cho người khác và chính mình, có thể bị kỉ luật, xử lí theo pháp luật."},
  p20a:{type:"mcq", label:"Câu hỏi tr.20 – câu 1", q:"Không nên dùng mạng xã hội cho mục đích nào sau đây?",
    o:["Giao lưu với bạn bè.","Học hỏi kiến thức.","Bình luận xấu về người khác.","Chia sẻ các hình ảnh phù hợp của mình."], a:2,
    k:"<b>C</b>. Bình luận xấu về người khác là sử dụng mạng xã hội sai trái, có thể làm tổn thương người khác."},
  p20b:{type:"mcq", label:"Câu hỏi tr.20 – câu 2", q:"“Đưa thông tin sai sự thật lên mạng, sử dụng thông tin vào mục đích sai trái là hành vi bị nghiêm cấm và có thể bị phạt theo quy định của pháp luật”. Theo em điều đó là:",
    o:["Đúng.","Sai."], a:0,
    k:"<b>A. Đúng.</b> Cần tuân thủ đúng các quy định khi sử dụng mạng xã hội và các kênh trao đổi thông tin trên Internet."},
  nv1:{type:"order", label:"Thực hành – Tạo tài khoản", q:"Sắp xếp các bước tạo tài khoản mạng xã hội (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào ô Tạo tài khoản mới.",b:"Truy cập trang web của mạng xã hội.",c:"Nháy chuột vào nút Đăng ký.",d:"Nhập đầy đủ thông tin vào các ô theo hướng dẫn.",e:"Chọn ngôn ngữ Tiếng Việt."},
    start:["a","b","c","d","e"], ans:["b","e","a","d","c"],
    k:"Thứ tự: <b>b → e → a → d → c</b>. Lưu ý: Facebook yêu cầu phải đủ <b>13 tuổi</b> mới được tạo tài khoản."},
  nv2:{type:"mcq", label:"Thực hành – Chia sẻ nội dung", q:"Để chia sẻ một nội dung lên trang cá nhân, em làm thế nào?",
    o:["Nhập vào ô Tìm kiếm rồi nhấn Enter.","Nháy chuột vào hộp trạng thái, nhập nội dung (có thể thêm Ảnh/Video), rồi nháy nút Đăng.","Nháy chuột vào nút Thêm bạn bè.","Nháy vào ảnh đại diện của bạn."], a:1,
    k:"<b>B</b>. Nháy vào <b>hộp trạng thái</b> để nhập nội dung; nháy <b>Ảnh/Video</b> để thêm ảnh, video; nháy <b>Đăng</b> để hoàn thành."},
  nv3:{type:"order", label:"Thực hành – Kết bạn", q:"Sắp xếp các bước kết nối với một bạn cùng lớp (dùng nút ↑ ↓).",
    items:{a:"Nháy chuột vào nút Thêm bạn bè.",b:"Nhập tên của bạn vào ô tìm kiếm.",c:"Nháy chuột vào ảnh đại diện để mở trang của bạn."},
    start:["a","b","c"], ans:["b","c","a"],
    k:"Thứ tự: <b>b → c → a</b>. Khi lời mời được chấp nhận, hai tài khoản trở thành “bạn bè”, tự động theo dõi nhau."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả thực hành (trên mạng xã hội thật nếu đủ tuổi, hoặc trên bảng mô phỏng): em đã chia sẻ nội dung gì? Em đã kết bạn với ai? Khi đăng bài em đã lưu ý những gì?",
    k:"Học sinh tự báo cáo. Lưu ý: chỉ chia sẻ nội dung <b>phù hợp, đúng sự thật</b>; không đăng thông tin cá nhân (số điện thoại, địa chỉ); chỉ kết bạn với người <b>mình quen biết</b>."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy nêu tên ba kênh trao đổi thông tin trên Internet.",
    k:"<b>Thư điện tử</b>, <b>diễn đàn</b>, <b>mạng xã hội</b>."},
  lt2:{type:"sort", label:"Luyện tập – câu 2", q:"Các phát biểu về mạng xã hội sau đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["a) Mạng xã hội giúp mọi người tương tác với nhau mà không cần gặp mặt.",0],["b) Tất cả các website đều là mạng xã hội.",1],["c) Người xấu có thể đưa tin giả lên mạng xã hội. Vì vậy, chỉ nên trò chuyện với người mình quen biết.",0],["d) Bất cứ tuổi nào cũng có thể tham gia mạng xã hội.",1]],
    k:"<b>a, c đúng</b>. <b>b sai</b>: chỉ một số website là mạng xã hội. <b>d sai</b>: nhiều mạng xã hội quy định độ tuổi tối thiểu, phổ biến là <b>13 tuổi</b>."},
  vd1:{type:"open", label:"Vận dụng – câu 1", q:"Em hãy tìm hiểu kĩ một mạng xã hội (ví dụ: Zalo, Lotus) mà em quan tâm và giới thiệu với các bạn hay người thân. Phần giới thiệu nên có: chức năng chính, đối tượng phù hợp để tham gia, cách thức tham gia, những lưu ý cần thiết khi tham gia,…",
    k:"Học sinh tự làm. Ví dụ Zalo: nhắn tin, gọi điện, chia sẻ ảnh, lập nhóm lớp; dành cho người đủ tuổi theo quy định; tham gia bằng số điện thoại; lưu ý giữ bí mật mật khẩu, không chia sẻ thông tin cá nhân, không kết bạn với người lạ."},
  vd2:{type:"open", label:"Vận dụng – câu 2", q:"Em hãy tìm hiểu thêm những ví dụ cụ thể về hậu quả của việc sử dụng thông tin vào mục đích sai trái. Hãy chia sẻ với người thân và bạn bè để cùng phòng tránh.",
    k:"Ví dụ: đăng tin giả về dịch bệnh bị xử phạt hành chính; bình luận bắt nạt khiến bạn bị tổn thương; chụp đề thi đăng lên mạng bị đình chỉ thi. Bài học: <b>kiểm chứng</b> trước khi chia sẻ, <b>tôn trọng</b> người khác, tuân thủ pháp luật."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Thư điện tử, diễn đàn, mạng xã hội,… là những <b>kênh trao đổi thông tin</b> thông dụng trên Internet.</li><li>Tham gia mạng xã hội là tham gia một <b>cộng đồng trực tuyến</b>, nơi mọi người tương tác với nhau theo nhiều cách.</li><li>Mạng xã hội thường được tổ chức dưới dạng các <b>website</b>. Mỗi mạng xã hội thường có mục đích nhất định như: thảo luận, chia sẻ ảnh, video,…</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Mạng xã hội giúp người sử dụng <b>kết nối, giao lưu, chia sẻ</b> và thảo luận các vấn đề mà họ quan tâm.</li><li>Cần <b>tuân thủ đúng các quy định</b> khi sử dụng mạng xã hội và các kênh trao đổi thông tin trên Internet.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Tạo tài khoản: truy cập trang → <b>Tạo tài khoản mới</b> → nhập thông tin → <b>Đăng ký</b> (đủ 13 tuổi).</li><li>Chia sẻ: hộp trạng thái → nhập nội dung, <b>Ảnh/Video</b> → <b>Đăng</b>.</li><li>Kết bạn: tìm tên → mở trang của bạn → <b>Thêm bạn bè</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Internet tạo ra nhiều kênh trao đổi thông tin <b>nhanh, hữu ích</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Mạng xã hội – kênh trao đổi thông tin</p><ul>'
    + "<li>Kênh thông dụng: <b>thư điện tử, diễn đàn, mạng xã hội</b>.</li>"
    + "<li>Mạng xã hội = <b>cộng đồng trực tuyến</b>, thường là website. VD: Facebook, YouTube.</li>"
    + "<li>Có <b>hai mặt</b> → dùng đúng mục đích, <b>tuân thủ quy định</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành</p><ul>'
    + "<li>Tạo tài khoản: <b>đủ 13 tuổi</b> → Tạo tài khoản mới → Đăng ký.</li>"
    + "<li>Chia sẻ: hộp trạng thái → <b>Đăng</b>. Kết bạn: tìm tên → <b>Thêm bạn bè</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Không phải website nào cũng là mạng xã hội; chỉ trò chuyện với <b>người quen</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li><b>Kiểm chứng</b> trước khi chia sẻ; dùng thông tin sai trái → bị <b>xử phạt</b>.</li>"
    + "</ul>"}
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
    return ["T7B4." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Phân biệt đúng cách truyền thống và kênh Internet."],
        fix:["Cách nào cần có Internet mới dùng được?"]},
  hd1a:{ok:["Đúng! Em nhớ kiến thức lớp 6."],
        fix:["Ở lớp 6 em đã gửi thư qua Internet bằng cách nào?"]},
  hd1b:{ok:["Em nêu rõ lí do."],
        fix:["Cách nào mọi người dùng hằng ngày trên điện thoại?"]},
  kenh:{ok:["Chính xác các kênh trao đổi thông tin."],
        fix:["Phần mềm soạn thảo, máy in có gửi thông tin qua Internet không?"]},
  mucdich:{ok:["Nhóm đọc Bảng 4.1 rất kĩ."],
        fix:["Em đối chiếu lại cột Mục đích trong Bảng 4.1."]},
  haimat:{ok:["Nhận ra đúng hai mặt của mạng xã hội."],
        fix:["Việc đó có làm hại người khác hay vi phạm quy định không?"]},
  p20a:{ok:["Chính xác! C."],
        fix:["Đề hỏi việc KHÔNG nên làm."]},
  p20b:{ok:["Chính xác! Đúng."],
        fix:["Đưa tin sai sự thật có bị pháp luật xử lí không?"]},
  nv1: {ok:["Đúng thứ tự các bước tạo tài khoản."],
        fix:["Phải truy cập trang web trước, nhập thông tin rồi mới Đăng ký."]},
  nv2: {ok:["Chính xác! Hộp trạng thái rồi Đăng."],
        fix:["Nội dung chia sẻ được nhập ở đâu? Xem Hình 4.3."]},
  nv3: {ok:["Đúng thứ tự các bước kết bạn."],
        fix:["Phải tìm và mở trang của bạn trước khi Thêm bạn bè."]},
  nvkq:{ok:["Em chia sẻ nội dung phù hợp, có lưu ý an toàn."],
        fix:["Em bổ sung: những gì không nên đăng lên mạng?"]},
  lt1: {ok:["Đủ ba kênh."],
        fix:["Gợi ý: thư…, diễn…, mạng…"]},
  lt2: {ok:["Chính xác! b và d sai."],
        fix:["Có phải website nào cũng là mạng xã hội? Có giới hạn độ tuổi không?"]},
  vd1: {ok:["Giới thiệu đủ ý, rõ ràng."],
        fix:["Em bổ sung đối tượng phù hợp và lưu ý khi tham gia."]},
  vd2: {ok:["Ví dụ cụ thể, có bài học rút ra."],
        fix:["Em nêu rõ hậu quả xảy ra với ai."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  kd1: "Cách nào cần Internet?",
  kenh: "Kênh trao đổi phải gửi, nhận được thông tin qua Internet.",
  mucdich: "Em đọc lại Bảng 4.1.",
  haimat: "Việc đó có làm hại ai không?",
  lt2: "Em đọc lại mục b) và đoạn cuối trang 19."
};
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
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Các cách trao đổi thông tin", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Mạng xã hội", acts:[
    {title:"Hoạt động 1: Trao đổi thông tin trên Internet", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Kênh trao đổi thông tin", tasks:["kenh"]},
    {title:"Đọc hiểu: Mạng xã hội", tasks:["mucdich","haimat"], concept:"c1"},
    {title:"Câu hỏi SGK trang 20", tasks:["p20a","p20b"], concept:"c2"},
    {title:"Ghi bài: Mạng xã hội", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Tạo tài khoản, chia sẻ, kết bạn", tasks:["nv1","nv2","nv3","nvkq"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Giới thiệu mạng xã hội, phòng tránh hậu quả", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai4", title: "Bài 4. Mạng xã hội và một số kênh trao đổi thông tin thông dụng trên Internet", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng website nào cũng là mạng xã hội vì…",
  commentPh: "Ví dụ: Nhóm nêu đúng ba kênh; cần nhớ giới hạn 13 tuổi."};
})();
