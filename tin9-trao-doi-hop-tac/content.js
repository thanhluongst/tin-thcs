/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Nhóm An, Minh, Khoa chuẩn bị bài trình bày về “Lược sử công cụ tính toán” cho Triển lãm tin học. Theo em, nhóm có thể dùng những công cụ nào để cùng nhau trao đổi, hợp tác chuẩn bị sản phẩm?",
    k:"Có thể dùng <b>sơ đồ tư duy</b> (MindMaple, XMind, Canva,…) để lên ý tưởng, phân công; <b>bài trình chiếu</b> (PowerPoint, Google Trang trình bày,…) để trình bày; các công cụ trực tuyến cho phép <b>chia sẻ, cùng chỉnh sửa</b>; kênh hội thoại (Zalo, Messenger, Google Meet) để trao đổi. Quan trọng là biết <b>cách làm việc hợp tác</b> để công cụ hỗ trợ hiệu quả."},
  hd1:{type:"open", label:"HĐ1 – Sơ đồ tư duy, bài trình chiếu", q:"Em hãy cho biết có thể sử dụng sơ đồ tư duy và bài trình chiếu như thế nào cho việc trình bày nội dung “Lược sử công cụ tính toán” trong Triển lãm tin học.",
    k:"<ul><li>Dùng <b>sơ đồ tư duy</b> để lên ý tưởng: các nhánh máy tính cơ học, máy tính điện tử,…; phân công mỗi bạn phụ trách một nhánh; đính kèm ảnh, video, tài liệu.</li><li>Dùng <b>bài trình chiếu</b> để trình bày tại triển lãm: mỗi trang chiếu một mốc lịch sử, có hình ảnh, sơ đồ dòng thời gian.</li><li>Chia sẻ trực tuyến để cả nhóm cùng xem, cùng chỉnh sửa; trình bày trực tiếp trước khách tham quan.</li></ul>"},
  cach:{type:"match", label:"Đọc hiểu – Cách sử dụng", ph:"Chọn…",
    q:"Đọc mục 1 (SGK trang 27–28). Mỗi tình huống dưới đây là cách sử dụng sơ đồ tư duy hoặc bài trình chiếu nào?",
    opts:["a) Trình bày trực tiếp","b) Chia sẻ để các thành viên khác xem","c) Chia sẻ để các thành viên chủ động cập nhật","d) Chia sẻ để cộng tác theo thời gian thực"],
    items:[["1) Nhóm trưởng thuyết trình sơ đồ trước lớp và trả lời ngay câu hỏi của các bạn",1],["2) Gửi tệp sơ đồ (có đính kèm ảnh, video) để thầy cô xem khi có thời gian",2],["3) Mỗi bạn tự vào bài trình chiếu trực tuyến, cập nhật phần của mình vào lúc thuận tiện",3],["4) Cả nhóm cùng mở bài trình chiếu trực tuyến, vừa chỉnh sửa vừa trao đổi qua kênh hội thoại",4]],
    k:"1 – a, 2 – b, 3 – c, 4 – d. Trình bày trực tiếp giúp diễn giải toàn cảnh và trả lời câu hỏi ngay; chia sẻ giúp mọi người xem, cập nhật, cộng tác dù không gặp nhau."},
  tq:{type:"sort", label:"Đọc hiểu – Công cụ trực quan",
    q:"Khi dùng hình ảnh, biểu đồ, video trong sơ đồ tư duy hay bài trình chiếu, việc nào dưới đây nên làm, việc nào không nên làm?",
    cats:["Nên làm","Không nên"],
    items:[["Trình bày tiến trình lịch sử bằng sơ đồ dòng thời gian",0],["Chọn hình ảnh sắc nét, bố cục hợp lí, nhìn từ xa vẫn rõ",0],["Dùng màu sắc để tăng sự chú ý của người xem",0],["Chèn thật nhiều hình ảnh, hiệu ứng dù không liên quan đến nội dung",1],["Dùng chữ rất nhỏ, ảnh mờ, vỡ nét",1],["Chọn loại minh hoạ phức tạp nhất có thể",1]],
    k:"Cần <b>sử dụng đúng công cụ trực quan</b> (đơn giản, rõ ràng, chọn loại minh hoạ truyền tải tốt nhất thông điệp) và <b>đảm bảo chất lượng dữ liệu</b> (xem được từ xa, sắc nét, bố cục hợp lí, màu sắc tăng sự chú ý)."},
  p28:{type:"open", label:"Câu hỏi tr.28", q:"Em hãy chỉ ra những kiến thức về tạo sơ đồ tư duy và bài trình chiếu mà em cần được bổ sung để việc trao đổi, hợp tác được hiệu quả.",
    k:"Ví dụ: cách <b>chèn hình ảnh, video, liên kết</b>; cách <b>đính kèm tệp</b> vào sơ đồ tư duy; cách <b>chia sẻ</b> tệp, cấp quyền xem hoặc chỉnh sửa; cách <b>cùng chỉnh sửa trực tuyến</b> (Google Trang trình bày, Canva); cách vẽ sơ đồ dòng thời gian, biểu đồ; cách chọn màu sắc, bố cục hợp lí."},
  dk:{type:"match", label:"Câu hỏi tr.29 – Dữ liệu đính kèm", ph:"Chọn…",
    q:"Quan sát Hình 7.1. Em hãy chỉ ra loại dữ liệu được đính kèm vào mỗi nhánh của sơ đồ tư duy.",
    opts:["a) Hình ảnh","b) Video (liên kết đến video)","c) Văn bản","d) Bảng tính"],
    items:[["1) Nhánh Pascal – máy tính cơ học Pascaline",1],["2) Nhánh Babbage – giới thiệu dự án Analytical Engine",2],["3) Nhánh Babbage – tiểu sử của Babbage",3],["4) Nhánh Dự kiến thu chi",4]],
    k:"Hình 7.1 có đính kèm: <b>ảnh</b> máy Pascaline; <b>liên kết đến video</b> giới thiệu dự án; <b>văn bản</b> tiểu sử của Babbage; <b>bảng tính</b> dự kiến thu chi."},
  dk2:{type:"mcq", label:"Đọc hiểu – Khả năng đính kèm", q:"Khi tạo sơ đồ tư duy bằng phần mềm, em có thể đính kèm những loại tệp nào vào sơ đồ?",
    o:["Chỉ văn bản.","Chỉ hình ảnh.","Văn bản, ảnh, video và trang tính.","Không đính kèm được tệp nào."], a:2,
    k:"Phần mềm sơ đồ tư duy cho phép đính kèm <b>tệp văn bản, ảnh, video và trang tính</b> để minh hoạ chi tiết cho nội dung cần trình bày. Cách đính kèm được hướng dẫn cụ thể trong Bài 8."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy nhận xét về tính hợp lí và lợi ích của những dữ liệu đính kèm trong sơ đồ tư duy ở Hình 7.1 khi trình bày thông tin trong trao đổi và hợp tác.",
    k:"<ul><li><b>Hợp lí:</b> mỗi tệp đính kèm đúng nhánh nội dung (ảnh Pascaline ở nhánh Pascal, tiểu sử ở nhánh Babbage, bảng tính ở nhánh thu chi); sơ đồ vẫn gọn trên một trang.</li><li><b>Lợi ích:</b> người xem có thông tin chi tiết khi cần mà không phải tìm thêm; các thành viên dễ bổ sung, cập nhật; dữ liệu đa dạng (ảnh, video, văn bản, bảng tính) giúp trình bày đầy đủ, hấp dẫn.</li></ul>"},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy nêu những cách mà nhóm các bạn An, Minh và Khoa sử dụng sơ đồ tư duy ở Hình 7.1 trong trao đổi và hợp tác để hoàn thành công việc chuẩn bị nội dung “Lược sử công cụ tính toán” cho Triển lãm tin học.",
    k:"<ul><li><b>Chia sẻ để các thành viên chủ động cập nhật:</b> mỗi bạn phụ trách một nhánh (Pascal, Babbage, máy tính điện tử, dự kiến thu chi), tự đính kèm tài liệu.</li><li><b>Cộng tác theo thời gian thực</b> khi cần thống nhất nội dung, kèm kênh hội thoại.</li><li><b>Chia sẻ để thầy cô, các nhóm khác xem</b> và góp ý.</li><li><b>Trình bày trực tiếp</b> tại Triển lãm tin học.</li></ul>"},
  vd1:{type:"open", label:"Vận dụng", q:"Em hãy tạo sơ đồ tư duy trình bày nội dung mà em muốn trưng bày trong Triển lãm tin học. Ghi lại: các nhánh chính, những tệp (văn bản, ảnh, video, trang tính) em đính kèm vào nhánh nào, và cách em chia sẻ sơ đồ với các bạn trong nhóm.",
    k:"Ví dụ chủ đề “Sổ lưu niệm lớp 9A”:<ul><li><b>Nhánh chính:</b> Kỉ niệm lớp 6, 7, 8, 9; Thầy cô; Hoạt động ngoại khoá; Dự kiến chi phí in.</li><li><b>Đính kèm:</b> ảnh tập thể (nhánh Kỉ niệm), video văn nghệ (nhánh Hoạt động), văn bản lời cảm ơn (nhánh Thầy cô), bảng tính chi phí (nhánh Dự kiến chi phí).</li><li><b>Chia sẻ:</b> gửi liên kết cho cả nhóm cùng cập nhật; trình bày trực tiếp tại triển lãm.</li></ul>"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Em có thể sử dụng bài trình chiếu và sơ đồ tư duy trong trao đổi thông tin và hợp tác theo các cách: <b>trình bày trực tiếp</b>; chia sẻ để các thành viên khác <b>xem độc lập</b>; chia sẻ để các thành viên <b>cập nhật độc lập</b>; chia sẻ để <b>cộng tác theo thời gian thực</b>.</li><li>Để sử dụng hình ảnh, biểu đồ và video hợp lí, em cần chú ý: <b>sử dụng đúng công cụ trực quan</b>; <b>đảm bảo chất lượng dữ liệu</b>.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Có thể <b>đính kèm tệp văn bản, hình ảnh, video, trang tính</b> vào sơ đồ tư duy giúp trình bày thông tin đầy đủ và hiệu quả.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Làm việc nhóm cần <b>công cụ</b> (sơ đồ tư duy, bài trình chiếu) và <b>cách hợp tác</b> tốt.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Trình bày thông tin trong trao đổi và hợp tác</p><ul>'
    + "<li>4 cách dùng: <b>trình bày trực tiếp</b>; chia sẻ để <b>xem</b>; chia sẻ để <b>cập nhật</b>; <b>cộng tác cùng lúc</b>.</li>"
    + "<li>Hình ảnh, video: <b>đúng công cụ</b>, đơn giản, rõ ràng.</li>"
    + "<li>Dữ liệu <b>chất lượng</b>: sắc nét, nhìn xa vẫn rõ, bố cục hợp lí.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Đính kèm tệp vào sơ đồ tư duy</p><ul>'
    + "<li>Đính kèm được: <b>văn bản, ảnh, video, trang tính</b>.</li>"
    + "<li>→ Trình bày <b>đầy đủ</b>, sơ đồ vẫn <b>gọn</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tệp đính kèm đặt <b>đúng nhánh</b> → người xem có thông tin chi tiết khi cần.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Sơ đồ tư duy cho triển lãm: nhánh chính → đính kèm tệp → <b>chia sẻ</b> cho nhóm.</li>"
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
    return ["T9B7." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em nêu được cả công cụ và cách hợp tác. Rất tốt!"],
        fix:["Em kể tên công cụ cụ thể: sơ đồ tư duy, bài trình chiếu, phần mềm nào?"]},
  hd1: {ok:["Em nêu rõ cách dùng sơ đồ tư duy và bài trình chiếu cho dự án."],
        fix:["Em nêu riêng: sơ đồ tư duy dùng để làm gì, bài trình chiếu dùng để làm gì?"]},
  cach:{ok:["Nhóm ghép đúng cả bốn cách sử dụng."],
        fix:["Em tự hỏi: mọi người có gặp nhau không? Có cùng chỉnh sửa không? Cùng lúc hay mỗi người một lúc?"]},
  tq:  {ok:["Nhóm phân biệt đúng việc nên và không nên làm."],
        fix:["Em nhớ hai nguyên tắc: đúng công cụ trực quan, đảm bảo chất lượng dữ liệu."]},
  p28: {ok:["Em xác định rõ những kĩ năng cần bổ sung."],
        fix:["Em nêu cụ thể: em chưa biết làm thao tác nào với sơ đồ tư duy, bài trình chiếu?"]},
  dk:  {ok:["Nhóm nhận ra đúng bốn loại dữ liệu đính kèm."],
        fix:["Em quan sát biểu tượng và dòng chữ cạnh mỗi nhánh trong Hình 7.1."]},
  dk2: {ok:["Chính xác! Đính kèm được văn bản, ảnh, video, trang tính."],
        fix:["Em đọc lại mục 2 (SGK trang 28)."]},
  lt1: {ok:["Nhận xét đủ cả tính hợp lí và lợi ích."],
        fix:["Em nêu thêm: tệp đính kèm có đặt đúng nhánh không? Nó giúp gì cho người xem?"]},
  lt2: {ok:["Em nêu được nhiều cách sử dụng hợp lí."],
        fix:["Em đối chiếu với bốn cách ở phần Ghi nhớ mục 1."]},
  vd1: {ok:["Sơ đồ rõ ràng, đính kèm đúng nhánh, có cách chia sẻ phù hợp."],
        fix:["Em ghi rõ tệp nào đính kèm vào nhánh nào.","Em nêu cách chia sẻ sơ đồ với nhóm."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  tq: "Em xét lại: việc đó giúp người xem hiểu nhanh, nhìn rõ hay làm rối mắt?"
};
const MATCH_HINT = {
  cach: "Gợi ý: có gặp trực tiếp không, có cùng sửa không, cùng lúc hay không?",
  dk: "Gợi ý: quan sát biểu tượng cạnh mỗi nhánh trong Hình 7.1."
};
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
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Dự án Triển lãm tin học", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Trao đổi và hợp tác", acts:[
    {title:"Hoạt động 1: Sơ đồ tư duy, bài trình chiếu", tasks:["hd1"]},
    {title:"Đọc hiểu: Các cách sử dụng", tasks:["cach","tq"], concept:"c1"},
    {title:"Câu hỏi SGK trang 28", tasks:["p28"]},
    {title:"Ghi bài: Trao đổi và hợp tác", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Đính kèm tệp", acts:[
    {title:"Đọc hiểu: Đính kèm tệp vào sơ đồ tư duy", tasks:["dk2"]},
    {title:"Câu hỏi SGK trang 29", tasks:["dk"], concept:"c2"},
    {title:"Ghi bài: Đính kèm tệp", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Bài tập SGK trang 29", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Sơ đồ tư duy cho Triển lãm tin học", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai7", title: "Bài 7. Trình bày thông tin trong trao đổi và hợp tác", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhầm cách chia sẻ để cập nhật độc lập với cộng tác thời gian thực vì…",
  commentPh: "Ví dụ: Nhóm đính kèm đúng ảnh và văn bản; cần bổ sung cách chia sẻ sơ đồ."};
})();
