/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Ở Bài 7, em đã biết những cách nào để sử dụng sơ đồ tư duy và bài trình chiếu trong trao đổi, hợp tác? Hôm nay nhóm em sẽ tạo sản phẩm gì cho Triển lãm tin học?",
    k:"Bốn cách: <b>trình bày trực tiếp</b>; chia sẻ để <b>xem</b>; chia sẻ để <b>cập nhật</b>; chia sẻ để <b>cộng tác theo thời gian thực</b>. Hôm nay nhóm tạo <b>sơ đồ tư duy có đính kèm dữ liệu</b> (LuocSu.emm) và <b>bài trình chiếu</b> có hình ảnh, sơ đồ, video (LuocSuMayTinh) về Lược sử công cụ tính toán."},
  kp:{type:"mcq", label:"NV1 – Bảng tính kinh phí", q:"Quan sát bảng tính KinhPhi.xlsx (Hình 8.1). Tổng chi phí cho phần nội dung “Lược sử công cụ tính toán” là bao nhiêu?",
    o:["64 000 đồng.","72 000 đồng.","114 000 đồng.","122 000 đồng."], a:3,
    k:"In ảnh màu: 8 × 8 000 = 64 000; in nội dung chú thích: 8 × 1 000 = 8 000; văn phòng phẩm: 50 000. Tổng: 64 000 + 8 000 + 50 000 = <b>122 000 đồng</b>. Thành tiền nên tính bằng công thức (ví dụ =C3*D3, =SUM(E3:E5))."},
  lenh:{type:"sort", label:"NV1 – Lệnh đính kèm",
    q:"Với mỗi dữ liệu dưới đây, em dùng lệnh nào của MindMaple Lite để đưa vào sơ đồ tư duy?",
    cats:["Insert/Attachment","Insert/Hyperlink"],
    items:[["Tệp bảng tính KinhPhi.xlsx",0],["Tệp hình ảnh Pascaline.png",0],["Tệp văn bản CharlesBabbage.docx",0],["Đường liên kết đến video về Charles Babbage trên Internet",1]],
    k:"Các <b>tệp</b> trên máy (bảng tính, hình ảnh, văn bản) dùng <b>Insert/Attachment/Attachment</b>. <b>Đường liên kết</b> đến video trên Internet dùng <b>Insert/Hyperlink</b>, dán địa chỉ vào ô <b>Link to</b>."},
  dk:{type:"order", label:"NV1 – Các bước đính kèm tệp", q:"Sắp xếp các bước đính kèm một tệp vào nhánh của sơ đồ tư duy theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Chọn tệp cần chèn trong hộp thoại Open, nháy chuột chọn Open.",b:"Chọn nhánh của sơ đồ tư duy cần đính kèm tệp.",c:"Biểu tượng tệp đính kèm xuất hiện ở nhánh của sơ đồ.",d:"Chọn Insert/Attachment/Attachment."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Chọn nhánh → Insert/Attachment/Attachment → chọn tệp, nháy Open → biểu tượng tệp đính kèm xuất hiện ở nhánh."},
  nv1:{type:"open", label:"NV1 – Kết quả", q:"Báo cáo kết quả Nhiệm vụ 1: em đã tạo sơ đồ tư duy (lưu với tên LuocSu.emm) với những nhánh nào và đã đính kèm những dữ liệu gì vào nhánh nào?",
    k:"Ví dụ: chủ đề chính Triển lãm tin học; các nhánh Sản phẩm công nghệ số, Lược sử công cụ tính toán (Máy tính cơ học, Máy tính điện tử), Dự kiến thu chi. Đính kèm: <b>Pascaline.png</b> vào nhánh Blaise Pascal; <b>CharlesBabbage.docx</b> và <b>liên kết video</b> vào nhánh Charles Babbage; <b>KinhPhi.xlsx</b> vào nhánh Dự kiến thu chi."},
  tb:{type:"mcq", label:"NV2 – Cách trình bày", q:"Nhóm trưởng trình bày sơ đồ tư duy trước nhóm để các thành viên trao đổi, bổ sung nội dung ngay tại chỗ. Đó là cách sử dụng nào?",
    o:["Trình bày trực tiếp.","Chia sẻ để các thành viên khác xem.","Chia sẻ để các thành viên chủ động cập nhật.","Chia sẻ để cộng tác theo thời gian thực."], a:0,
    k:"Đó là <b>trình bày trực tiếp</b>: diễn giải được bức tranh toàn cảnh, làm rõ chi tiết và trả lời ngay câu hỏi của các thành viên."},
  pc:{type:"open", label:"NV2 – Bổ sung và phân công", q:"Sau khi trao đổi, thảo luận, nhóm em cần bổ sung thêm nội dung gì? Ghi lại bảng phân công công việc để các thành viên tiếp tục hoàn thành.",
    k:"Ví dụ:<ul><li><b>Bổ sung:</b> các thế hệ máy tính điện tử (ENIAC, IBM 7090, IBM System/360, Micral, iPhone); ảnh minh hoạ; video về ENIAC.</li><li><b>Phân công:</b> An – trang Blaise Pascal; Minh – trang Charles Babbage và video; Khoa – sơ đồ dòng thời gian, các thế hệ máy tính; nhóm trưởng – tổng hợp, kiểm tra.</li></ul>"},
  tg:{type:"match", label:"NV3 – Dòng thời gian", ph:"Chọn…",
    q:"Quan sát sơ đồ dòng thời gian (Hình 8.6). Ghép mỗi mốc năm với máy tính tương ứng.",
    opts:["a) Máy tính cơ học đầu tiên (Blaise Pascal)","b) Máy tính đa năng (Charles Babbage)","c) ENIAC – thế hệ thứ nhất","d) IBM 7090 – thế hệ thứ hai","e) IBM System/360 – thế hệ thứ ba","f) Máy vi tính Micral – thế hệ thứ tư","g) iPhone – thế hệ thứ năm"],
    items:[["1642",1],["1833",2],["1945",3],["1959",4],["1964",5],["1973",6],["2007",7]],
    k:"1642 – a, 1833 – b, 1945 – c, 1959 – d, 1964 – e, 1973 – f, 2007 – g. Sơ đồ dòng thời gian giúp trình bày <b>tiến trình lịch sử</b> rõ ràng, dễ nhớ."},
  cc:{type:"match", label:"NV3 – Chọn công cụ trực quan", ph:"Chọn…",
    q:"Mỗi nội dung dưới đây nên trình bày bằng công cụ trực quan nào cho hợp lí?",
    opts:["a) Sơ đồ dòng thời gian","b) Hình ảnh","c) Video","d) Biểu đồ"],
    items:[["1) Các mốc lịch sử của công cụ tính toán",1],["2) Hình dáng máy tính cơ học Pascaline",2],["3) Cách máy tính của Charles Babbage hoạt động",3],["4) So sánh chi phí các khoản trong bảng kinh phí",4]],
    k:"1 – a, 2 – b, 3 – c, 4 – d. Chọn loại minh hoạ <b>truyền tải tốt nhất thông điệp</b>, đơn giản và rõ ràng."},
  dv:{type:"order", label:"NV3 – Các bước tạo bài trình chiếu", q:"Sắp xếp các bước tạo bài trình chiếu “Lược sử công cụ tính toán” theo thứ tự trong SGK (dùng nút ↑ ↓).",
    items:{a:"Tạo trang dàn ý (Hình 8.5).",b:"Khởi động phần mềm trình chiếu, tạo trang tiêu đề.",c:"Thêm trang về Charles Babbage, chèn video bằng Insert/Video/Insert Video from This Device.",d:"Dùng mẫu có sẵn tạo sơ đồ dòng thời gian (Hình 8.6).",e:"Lưu bài trình chiếu với tên LuocSuMayTinh.",f:"Thêm trang về Blaise Pascal, chèn hình ảnh máy tính Pascaline."},
    start:["a","b","c","d","e","f"], ans:["b","a","d","f","c","e"],
    k:"Thứ tự: <b>b → a → d → f → c → e</b>. Trang tiêu đề → dàn ý → sơ đồ dòng thời gian → Blaise Pascal (ảnh) → Charles Babbage (video) → lưu tệp."},
  nv3:{type:"open", label:"NV3 – Kết quả", q:"Báo cáo kết quả Nhiệm vụ 3: bài trình chiếu LuocSuMayTinh của em gồm những trang nào? Em đã dùng hình ảnh, sơ đồ, video ở trang nào?",
    k:"Ví dụ: (1) Trang tiêu đề; (2) Dàn ý; (3) Sơ đồ dòng thời gian (dùng mẫu SmartArt hoặc mẫu trên Internet); (4) Blaise Pascal – ảnh Pascaline; (5) Charles Babbage – video; (6) Các thế hệ máy tính điện tử. Hình ảnh rõ nét, chữ đủ lớn, mỗi trang một ý chính."},
  lta:{type:"open", label:"Luyện tập – a", q:"Lựa chọn một trong các cách sử dụng bài trình chiếu trình bày thông tin ở Bài 7 để một thành viên đóng vai trò trưởng nhóm trình bày bài trình chiếu LuocSuMayTinh trước tập thể. Nhóm em chọn cách nào? Vì sao?",
    k:"Thường chọn <b>trình bày trực tiếp</b> trước tập thể: người trình bày diễn giải toàn cảnh, làm rõ chi tiết, trả lời câu hỏi ngay. Có thể kết hợp chia sẻ tệp để mọi người xem lại sau."},
  ltb:{type:"open", label:"Luyện tập – b", q:"Các thành viên trao đổi, thảo luận để rà soát nội dung bài trình chiếu theo các yêu cầu được nêu trong Nhiệm vụ 3. Ghi lại những điểm cần chỉnh sửa.",
    k:"Rà soát: đủ các trang theo dàn ý chưa; sơ đồ dòng thời gian đúng mốc chưa; hình ảnh có <b>sắc nét, đúng nội dung</b>; video chạy được; chữ có đọc được từ xa; màu sắc, bố cục hợp lí; có ghi nguồn tư liệu."},
  ltc:{type:"open", label:"Luyện tập – c", q:"Chỉnh sửa bài trình chiếu theo kết quả thảo luận ở câu b. Em đã chỉnh sửa những gì?",
    k:"Ví dụ: tăng cỡ chữ; thay ảnh mờ bằng ảnh rõ nét; sửa mốc năm sai; rút gọn chữ trên trang chiếu; thêm trang nguồn tham khảo; thống nhất màu sắc, phông chữ."},
  th:{type:"match", label:"Vận dụng – Các thế hệ máy tính", ph:"Chọn…",
    q:"Tìm hiểu đặc điểm của máy tính từng thế hệ. Ghép mỗi thế hệ với linh kiện điện tử chính được sử dụng.",
    opts:["a) Đèn điện tử chân không","b) Bóng bán dẫn (transistor)","c) Mạch tích hợp (IC)","d) Bộ vi xử lí, mạch tích hợp cỡ rất lớn","e) Thiết bị thông minh, trí tuệ nhân tạo, kết nối mạng"],
    items:[["1) Thế hệ thứ nhất (1945 – 1955)",1],["2) Thế hệ thứ hai (1955 – 1965)",2],["3) Thế hệ thứ ba (1965 – 1974)",3],["4) Thế hệ thứ tư (1974 – 1990)",4],["5) Thế hệ thứ năm (1990 – nay)",5]],
    k:"Thế hệ 1 – <b>đèn điện tử chân không</b> (to, nặng, tốn điện); thế hệ 2 – <b>transistor</b>; thế hệ 3 – <b>mạch tích hợp IC</b>; thế hệ 4 – <b>bộ vi xử lí</b>, máy vi tính cá nhân; thế hệ 5 – máy tính nhỏ gọn, thông minh, <b>trí tuệ nhân tạo</b>, kết nối Internet (điện thoại thông minh)."},
  vd1:{type:"open", label:"Vận dụng – Bổ sung và chia sẻ", q:"Em hãy bổ sung vào bài trình chiếu LuocSuMayTinh nội dung về đặc điểm của máy tính từng thế hệ, sử dụng công cụ trực quan hợp lí. Nhóm em phân công ai chia sẻ bài trình chiếu, chia sẻ theo cách nào để cùng hoàn chỉnh sản phẩm?",
    k:"Ví dụ: thêm 5 trang (mỗi thế hệ một trang) hoặc một <b>bảng so sánh</b> các thế hệ, kèm ảnh linh kiện (đèn chân không, transistor, IC, bộ vi xử lí). Bạn Khoa đưa bài lên Google Trang trình bày và <b>chia sẻ quyền chỉnh sửa</b> để các bạn cùng cập nhật; dùng nhóm Zalo để trao đổi."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Đính kèm <b>tệp</b> (văn bản, hình ảnh, bảng tính): chọn nhánh → <b>Insert/Attachment/Attachment</b> → chọn tệp → Open.</li><li>Đính kèm <b>đường liên kết</b> (video trên Internet): chọn nhánh → <b>Insert/Hyperlink</b> → dán địa chỉ vào ô Link to → OK.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Trình bày sơ đồ tư duy trước nhóm giúp các thành viên <b>trao đổi, bổ sung</b> nội dung và <b>phân công</b> công việc tiếp theo.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Bài trình chiếu nên có: trang tiêu đề, trang dàn ý, nội dung minh hoạ bằng <b>hình ảnh, sơ đồ, video</b> hợp lí.</li><li>Chèn video từ máy: <b>Insert/Video/Insert Video from This Device</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Sản phẩm hôm nay: <b>sơ đồ tư duy có đính kèm</b> + <b>bài trình chiếu</b> có hình ảnh, video.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 1. Sơ đồ tư duy có đính kèm dữ liệu</p><ul>'
    + "<li>Đính kèm tệp: chọn nhánh → <b>Insert/Attachment/Attachment</b> → chọn tệp → Open.</li>"
    + "<li>Đính kèm liên kết: chọn nhánh → <b>Insert/Hyperlink</b> → dán địa chỉ → OK.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 2. Trình bày sơ đồ tư duy</p><ul>'
    + "<li>Trưởng nhóm <b>trình bày</b> → nhóm <b>bổ sung</b> → <b>phân công</b> việc tiếp theo.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 3. Bài trình chiếu</p><ul>'
    + "<li>Tiêu đề → dàn ý → <b>sơ đồ dòng thời gian</b> → trang có <b>ảnh</b>, <b>video</b>.</li>"
    + "<li>Chèn video: <b>Insert/Video/Insert Video from This Device</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Trình bày → <b>rà soát</b> (ảnh rõ, chữ to, đúng mốc) → <b>chỉnh sửa</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>5 thế hệ máy tính: <b>đèn chân không → transistor → IC → vi xử lí → AI, thiết bị thông minh</b>.</li>"
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
    return ["T9B8." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em nhớ đủ bốn cách và nêu đúng sản phẩm hôm nay."],
        fix:["Em xem lại phần Ghi nhớ mục 1 Bài 7."]},
  kp:  {ok:["Chính xác! Tổng là 122 000 đồng."],
        fix:["Em tính lại từng dòng: số lượng × đơn giá, rồi cộng các thành tiền."]},
  lenh:{ok:["Nhóm chọn đúng lệnh cho từng loại dữ liệu."],
        fix:["Tệp có sẵn trên máy dùng lệnh nào? Đường liên kết trên Internet dùng lệnh nào?"]},
  dk:  {ok:["Chính xác thứ tự các bước đính kèm tệp."],
        fix:["Phải chọn nhánh trước, rồi mới chọn lệnh Attachment."]},
  nv1: {ok:["Sơ đồ đầy đủ nhánh, đính kèm đúng chỗ. Rất tốt!"],
        fix:["Em ghi rõ tệp nào đính kèm vào nhánh nào."]},
  tb:  {ok:["Đúng! Đó là trình bày trực tiếp."],
        fix:["Các bạn có ngồi cùng nhau, nghe và hỏi ngay không? Đó là cách nào?"]},
  pc:  {ok:["Nội dung bổ sung hợp lí, phân công rõ ràng."],
        fix:["Em ghi rõ: ai làm phần nào?"]},
  tg:  {ok:["Nhóm ghép đúng tất cả mốc thời gian."],
        fix:["Em quan sát lại Hình 8.6: mỗi mốc năm có tên máy ở trên hoặc dưới."]},
  cc:  {ok:["Nhóm chọn công cụ trực quan rất hợp lí."],
        fix:["Em tự hỏi: nội dung đó là tiến trình, hình dáng, hoạt động hay số liệu?"]},
  dv:  {ok:["Chính xác thứ tự các bước tạo bài trình chiếu."],
        fix:["Em đọc lại Hướng dẫn Nhiệm vụ 3 (SGK trang 32–33)."]},
  nv3: {ok:["Bài trình chiếu đủ trang, dùng hình ảnh, sơ đồ, video hợp lí."],
        fix:["Em ghi rõ trang nào dùng ảnh, trang nào dùng video."]},
  lta: {ok:["Cách chọn hợp lí, có giải thích."],
        fix:["Em giải thích vì sao chọn cách đó."]},
  ltb: {ok:["Rà soát kĩ, chỉ ra được điểm cần sửa cụ thể."],
        fix:["Em kiểm tra: ảnh có rõ không, chữ có đọc được từ xa không, mốc năm có đúng không?"]},
  ltc: {ok:["Em đã chỉnh sửa theo đúng góp ý."],
        fix:["Em ghi cụ thể đã sửa gì ở trang nào."]},
  th:  {ok:["Nhóm ghép đúng linh kiện của từng thế hệ."],
        fix:["Em tìm hiểu thêm trên Internet: thế hệ nào dùng đèn chân không, thế hệ nào dùng transistor?"]},
  vd1: {ok:["Nội dung bổ sung hợp lí, cách chia sẻ phù hợp."],
        fix:["Em nêu rõ công cụ trực quan em dùng và cách chia sẻ cho nhóm."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  lenh: "Em xét lại: đó là tệp có sẵn trên máy hay đường liên kết trên Internet?"
};
const MATCH_HINT = {
  tg: "Gợi ý: quan sát lại Hình 8.6.",
  cc: "Gợi ý: nội dung là tiến trình, hình dáng, cách hoạt động hay số liệu?",
  th: "Gợi ý: tìm hiểu trên Internet với từ khoá “các thế hệ máy tính điện tử”."
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
    {title:"Nhớ lại Bài 7", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Thực hành", title:"NV1: Sơ đồ tư duy", acts:[
    {title:"Chuẩn bị dữ liệu", tasks:["kp"]},
    {title:"Đính kèm tệp và liên kết", tasks:["lenh","dk"], concept:"c1"},
    {title:"Kết quả Nhiệm vụ 1", tasks:["nv1"]},
    {title:"Ghi bài: Nhiệm vụ 1", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"NV2: Trình bày", acts:[
    {title:"Trình bày sơ đồ tư duy", tasks:["tb","pc"], concept:"c2"},
    {title:"Ghi bài: Nhiệm vụ 2", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"NV3: Bài trình chiếu", acts:[
    {title:"Sơ đồ dòng thời gian", tasks:["tg","cc"]},
    {title:"Tạo bài trình chiếu", tasks:["dv","nv3"], concept:"c3"},
    {title:"Ghi bài: Nhiệm vụ 3", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Trình bày và chỉnh sửa", tasks:["lta","ltb","ltc"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Các thế hệ máy tính", tasks:["th","vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai8", title: "Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dùng Insert/Attachment cho đường liên kết video vì…",
  commentPh: "Ví dụ: Nhóm đính kèm đúng tệp; cần chèn thêm video vào trang Charles Babbage."};
})();
