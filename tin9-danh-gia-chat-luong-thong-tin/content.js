/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Theo em, làm thế nào để tìm kiếm được thông tin giúp giải quyết vấn đề chọn trường THPT và đánh giá được chất lượng thông tin mà em đã tìm được?",
    k:"<ul><li><b>Xác định rõ mục đích</b> và những <b>yêu cầu cụ thể</b> của thông tin cần tìm (điểm chuẩn, chỉ tiêu, khoảng cách,…).</li><li>Tìm kiếm bằng <b>máy tìm kiếm với từ khoá phù hợp</b>, công cụ hội thoại thông minh; ưu tiên <b>nguồn tin cậy</b>; lưu lại thông tin tìm được.</li><li><b>Đánh giá</b> thông tin theo bốn tiêu chí: mới, chính xác, đầy đủ, sử dụng được; rồi mới ra quyết định.</li></ul>"},
  md:{type:"open", label:"NV1 – Mục đích, yêu cầu", q:"Em hãy xác định mục đích tìm kiếm thông tin và nêu ít nhất ba yêu cầu cụ thể của thông tin cần tìm để chọn trường THPT.",
    k:"<b>Mục đích:</b> tìm thông tin về các trường THPT tại địa phương để quyết định lựa chọn nguyện vọng đăng kí.<br><b>Yêu cầu cụ thể</b> (ví dụ):<ul><li>Điểm chuẩn và chỉ tiêu tuyển sinh của trường trong ba năm gần nhất.</li><li>Tỉ lệ học sinh tốt nghiệp THPT và trúng tuyển vào các trường đại học có uy tín.</li><li>Những nhóm môn học mà trường có thế mạnh.</li><li>Các hoạt động ngoại khoá của trường.</li><li>Khoảng cách từ nhà đến trường.</li></ul>"},
  yc:{type:"sort", label:"NV1 – Thông tin cần tìm",
    q:"Để chọn trường THPT, thông tin nào dưới đây em cần tìm, thông tin nào không cần thiết?",
    cats:["Cần tìm","Không cần thiết"],
    items:[["Điểm chuẩn và chỉ tiêu tuyển sinh ba năm gần nhất",0],["Tỉ lệ tốt nghiệp THPT, đỗ vào các trường đại học uy tín",0],["Các nhóm môn học trường có thế mạnh",0],["Khoảng cách từ nhà đến trường",0],["Số lượt theo dõi trang mạng xã hội của trường",1],["Ca sĩ nổi tiếng từng đến trường biểu diễn",1]],
    k:"Cần tìm những thông tin <b>liên quan trực tiếp</b> đến việc chọn trường: điểm chuẩn, chỉ tiêu, tỉ lệ tốt nghiệp và đỗ đại học, môn thế mạnh, hoạt động ngoại khoá, khoảng cách. Số lượt theo dõi hay người nổi tiếng không giúp em chọn trường phù hợp."},
  tk:{type:"open", label:"NV1 – Tìm kiếm và lưu trữ", q:"Em hãy tìm kiếm thông tin về một trường THPT ở địa phương. Ghi lại: từ khoá (hoặc câu hỏi cho công cụ hội thoại thông minh) em đã dùng, tóm tắt thông tin tìm được và địa chỉ trang web.",
    k:"Ví dụ:<ul><li><b>Từ khoá:</b> “điểm chuẩn lớp 10 THPT Lê Xoay 2025”, “Olympic Tin học 2023 tỉnh Phú Thọ”.</li><li><b>Câu hỏi cho AI:</b> “Hãy cho biết tên các trường THPT gần Vĩnh Tường, Phú Thọ”.</li><li><b>Tóm tắt:</b> điểm chuẩn năm 2025 là …, chỉ tiêu … học sinh, có câu lạc bộ …</li><li><b>Địa chỉ:</b> phutho.edu.vn/…, trang web của trường, báo Giáo dục Việt Nam,…</li></ul>Lưu thông tin vào một tệp (văn bản, bảng tính) để dùng ở Nhiệm vụ 2."},
  ng:{type:"match", label:"NV1 – Tìm ở đâu?", ph:"Chọn…",
    q:"Mỗi loại thông tin dưới đây nên tìm ở nguồn nào để đảm bảo độ tin cậy?",
    opts:["a) Website Sở Giáo dục và Đào tạo","b) Website của nhà trường","c) Công cụ hội thoại thông minh (AI), rồi kiểm chứng lại","d) Máy tìm kiếm, ưu tiên báo chính thống"],
    items:[["1) Thông tin tuyển sinh vào lớp 10",1],["2) Các hoạt động giáo dục, ngoại khoá của trường",2],["3) Danh sách các trường THPT gần nhà",3],["4) Thành tích học sinh giỏi, Olympic của trường",4]],
    k:"1 – a, 2 – b, 3 – c, 4 – d. Với mỗi yêu cầu cụ thể, cần xem xét <b>nguồn có thẩm quyền</b>. Thông tin từ AI hay từ Internet nói chung cần được <b>đối chiếu, kiểm chứng</b> trước khi sử dụng."},
  dm:{type:"mcq", label:"NV1 – Tên miền", q:"Trang web của các Sở Giáo dục và Đào tạo thường có tên miền dạng nào?",
    o:[".com",".edu.vn",".net",".org"], a:1,
    k:"Trang web các Sở Giáo dục và Đào tạo thường có dạng <b>edu.vn</b>, ví dụ <b>phutho.edu.vn</b> (Hình 3.3)."},
  ai:{type:"mcq", label:"NV1 – Dùng AI", q:"Em hỏi công cụ hội thoại thông minh (AI) “Hãy cho biết tên các trường THPT gần Vĩnh Tường, Phú Thọ” và nhận được một bảng kết quả (Hình 3.2). Em nên làm gì?",
    o:["Dùng ngay vì AI luôn trả lời đúng.","Không dùng vì AI luôn trả lời sai.","Dùng để khoanh vùng tìm kiếm, rồi đối chiếu với website của Sở GD&ĐT và nhà trường.","Chỉ dùng nếu bảng có nhiều trường."], a:2,
    k:"Công cụ AI giúp <b>khoanh vùng phạm vi tìm kiếm</b> nhanh, nhưng câu trả lời có thể chưa chính xác hoặc đã cũ. Em cần <b>đối chiếu, kiểm chứng</b> với nguồn có thẩm quyền trước khi sử dụng."},
  tc:{type:"match", label:"NV2 – Cách kiểm tra", ph:"Chọn…",
    q:"Đọc phần Hướng dẫn a) của Nhiệm vụ 2. Mỗi cách kiểm tra dưới đây giúp em đánh giá tiêu chí nào?",
    opts:["a) Tính mới","b) Tính chính xác","c) Tính đầy đủ","d) Tính sử dụng được"],
    items:[["1) Xem ngày đăng bài hoặc ngày cuối cùng được đề cập trong bài viết",1],["2) Đối chiếu một lời đánh giá tiêu cực về trường với nhiều nguồn khác",2],["3) Xem đã có đủ điểm chuẩn, học phí, khoảng cách,… chưa",3],["4) Đọc tiêu đề và nội dung bài viết để xem có hợp với yêu cầu chọn trường không",4]],
    k:"1 – a, 2 – b, 3 – c, 4 – d. Tránh những thông tin <b>chỉ nhằm thu hút sự chú ý</b> mà không liên quan đến mục đích tìm kiếm."},
  dg:{type:"open", label:"NV2 – Đánh giá thông tin", q:"Đánh giá chất lượng thông tin em đã tìm được ở Nhiệm vụ 1 theo bốn tiêu chí: tính mới, tính chính xác, tính đầy đủ, tính sử dụng được.",
    k:"Ví dụ:<ul><li><b>Mới:</b> điểm chuẩn năm 2025 trên phutho.edu.vn, đăng tháng 7/2025 → đạt.</li><li><b>Chính xác:</b> đối chiếu với website của trường và báo chính thống → trùng khớp.</li><li><b>Đầy đủ:</b> đã có điểm chuẩn, chỉ tiêu, khoảng cách; còn thiếu học phí → cần tìm thêm.</li><li><b>Sử dụng được:</b> thông tin đúng về trường em định chọn → đạt.</li></ul>"},
  nv:{type:"open", label:"NV2 – Ba nguyện vọng", q:"Dựa trên thông tin đã đánh giá, em hãy đưa ra danh sách ba trường theo thứ tự ưu tiên phù hợp với năng lực và sở thích của mình. Nêu tiêu chí em dùng để sắp xếp.",
    k:"Học sinh tự lựa chọn. Cần:<ul><li>Chọn trường <b>phù hợp năng lực và sở thích</b>, chú ý <b>tính khả thi</b> (điểm chuẩn so với sức học của mình).</li><li>Sắp xếp theo <b>thứ tự ưu tiên</b> giữa các tiêu chí, ví dụ: điểm chuẩn phù hợp → gần nhà → có môn thế mạnh em thích → hoạt động ngoại khoá.</li><li>Nguyện vọng 2, 3 nên là trường có điểm chuẩn thấp hơn để đảm bảo an toàn.</li></ul>"},
  qt:{type:"order", label:"NV2 – Các bước", q:"Sắp xếp các bước tìm kiếm và sử dụng thông tin để chọn trường theo thứ tự hợp lí (dùng nút ↑ ↓).",
    items:{a:"Đánh giá chất lượng thông tin theo bốn tiêu chí.",b:"Xác định mục đích và các yêu cầu tìm kiếm cụ thể.",c:"Lựa chọn các trường phù hợp và sắp xếp thứ tự ưu tiên.",d:"Tìm kiếm thông tin từ nguồn tin cậy và lưu trữ lại."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Xác định mục đích, yêu cầu → tìm kiếm và lưu trữ → đánh giá chất lượng → lựa chọn, sắp xếp thứ tự."},
  lt1:{type:"open", label:"Luyện tập – Môn học THPT", q:"Em hãy tìm kiếm thông tin trên Internet để biết về các môn học được dạy ở cấp THPT. Ghi lại nguồn thông tin em đã dùng.",
    k:"Theo Chương trình GDPT 2018 (Thông tư 13/2022/TT-BGDĐT):<ul><li><b>Môn học bắt buộc:</b> Ngữ văn, Toán, Ngoại ngữ 1, Lịch sử, Giáo dục thể chất, Giáo dục quốc phòng và an ninh; cùng hoạt động trải nghiệm, hướng nghiệp và nội dung giáo dục của địa phương.</li><li><b>Môn lựa chọn</b> (chọn 4 môn): Địa lí, Giáo dục kinh tế và pháp luật, Vật lí, Hoá học, Sinh học, Công nghệ, Tin học, Âm nhạc, Mĩ thuật.</li><li>Ngoài ra có các chuyên đề học tập lựa chọn.</li></ul>Nguồn tin cậy: moet.gov.vn (Bộ GD&ĐT), website Sở GD&ĐT, website các trường THPT. Mỗi trường có thể chỉ tổ chức một số tổ hợp môn."},
  lt2:{type:"sort", label:"Luyện tập – Bắt buộc hay lựa chọn?",
    q:"Ở cấp THPT, mỗi môn dưới đây là môn bắt buộc hay môn lựa chọn?",
    cats:["Bắt buộc","Lựa chọn"],
    items:[["Toán",0],["Ngữ văn",0],["Lịch sử",0],["Tin học",1],["Vật lí",1],["Địa lí",1]],
    k:"Bắt buộc: <b>Toán, Ngữ văn, Lịch sử</b> (cùng Ngoại ngữ 1, Giáo dục thể chất, Giáo dục quốc phòng và an ninh). Lựa chọn: <b>Tin học, Vật lí, Địa lí</b> (cùng Hoá học, Sinh học, Công nghệ, GD kinh tế và pháp luật, Âm nhạc, Mĩ thuật)."},
  lt3:{type:"open", label:"Luyện tập – Dự kiến chọn môn", q:"Dựa vào thông tin tìm được, em dự kiến chọn những môn học nào em thích ở cấp THPT? Vì sao?",
    k:"Học sinh tự trả lời. Ví dụ: chọn <b>Vật lí, Hoá học, Tin học, Công nghệ</b> vì em thích khoa học, kĩ thuật và muốn theo ngành công nghệ thông tin. Cần nêu lí do gắn với <b>sở thích, năng lực và định hướng nghề nghiệp</b>."},
  vd1:{type:"open", label:"Vận dụng – Bài trình chiếu", q:"Em hãy lập dàn ý (các trang chiếu) cho bài trình chiếu chủ đề “Chọn môi trường học tập sau khi kết thúc cấp THCS”, kèm các nguồn thông tin em thu thập được.",
    k:"Gợi ý dàn ý:<ol><li>Trang tiêu đề: chủ đề, tên em, lớp.</li><li>Các lựa chọn sau THCS: THPT công lập, THPT ngoài công lập, giáo dục thường xuyên, trường nghề.</li><li>Tiêu chí lựa chọn: năng lực, sở thích, điểm chuẩn, khoảng cách, chi phí.</li><li>Thông tin về các trường em quan tâm (bảng so sánh).</li><li>Đánh giá chất lượng thông tin theo bốn tiêu chí.</li><li>Ba nguyện vọng của em và lí do.</li><li>Nguồn tham khảo: ghi rõ địa chỉ trang web.</li></ol>"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Cần <b>xác định rõ mục đích và yêu cầu cụ thể</b> trước khi tìm kiếm.</li><li>Độ tin cậy của thông tin trên Internet rất khác nhau: với mỗi yêu cầu cụ thể, cần xem xét <b>nguồn tin có thẩm quyền</b> (Sở GD&ĐT, nhà trường,…). Thông tin cần được <b>đối chiếu, kiểm chứng</b> trước khi sử dụng.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Đánh giá thông tin theo bốn tiêu chí: <b>tính mới, tính chính xác, tính đầy đủ, tính sử dụng được</b>.</li><li>Lựa chọn phù hợp năng lực, sở thích, chú ý <b>tính khả thi</b>; sắp xếp theo <b>thứ tự ưu tiên</b> giữa các tiêu chí.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Tìm thông tin <b>đúng mục đích</b> → <b>đánh giá</b> → mới <b>quyết định</b>.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 1. Tìm kiếm theo mục đích, yêu cầu</p><ul>'
    + "<li>Bước 1: xác định <b>mục đích</b> và <b>yêu cầu cụ thể</b> (điểm chuẩn, chỉ tiêu, khoảng cách,…).</li>"
    + "<li>Bước 2: tìm bằng <b>từ khoá</b>, AI; <b>lưu lại</b> tóm tắt và địa chỉ trang web.</li>"
    + "<li>Ưu tiên <b>nguồn tin cậy</b>: Sở GD&ĐT (đuôi <b>edu.vn</b>), web nhà trường. Tin từ AI phải <b>kiểm chứng</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 2. Quyết định dựa trên chất lượng thông tin</p><ul>'
    + "<li>Đánh giá: <b>mới</b> (xem ngày đăng), <b>chính xác</b> (so nhiều nguồn), <b>đầy đủ</b>, <b>sử dụng được</b>.</li>"
    + "<li>Chọn 3 trường <b>hợp năng lực, sở thích</b>, xếp theo <b>thứ tự ưu tiên</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>THPT: môn <b>bắt buộc</b> (Toán, Văn, Ngoại ngữ, Sử,…) + chọn <b>4 môn</b> (Lí, Hoá, Sinh, Tin, Địa,…).</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Bài trình chiếu phải <b>ghi rõ nguồn</b> thông tin đã dùng.</li>"
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
    return ["T9B3." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Rất tốt! Em nêu được các bước: xác định yêu cầu, tìm kiếm, đánh giá rồi mới quyết định."],
        fix:["Trước khi tìm, em cần xác định điều gì? Tìm xong, em làm gì với thông tin?"]},
  md:  {ok:["Mục đích rõ ràng, yêu cầu cụ thể. Rất tốt!"],
        fix:["Em nêu cụ thể hơn: cần biết điểm chuẩn, chỉ tiêu, khoảng cách,… của trường.","Em nêu đủ ít nhất ba yêu cầu nhé."]},
  yc:  {ok:["Nhóm chọn đúng những thông tin cần thiết."],
        fix:["Thông tin đó có giúp em quyết định chọn trường không?"]},
  tk:  {ok:["Em ghi đủ từ khoá, tóm tắt và địa chỉ trang web. Rất tốt!"],
        fix:["Em ghi thêm địa chỉ trang web để sau này kiểm tra lại.","Từ khoá nên cụ thể hơn: tên trường + năm + nội dung cần tìm."]},
  ng:  {ok:["Nhóm chọn đúng nguồn cho từng loại thông tin."],
        fix:["Nguồn nào có thẩm quyền về tuyển sinh? Về hoạt động của trường?"]},
  dm:  {ok:["Chính xác! Trang Sở GD&ĐT có đuôi edu.vn."],
        fix:["Em xem lại Hình 3.3: địa chỉ phutho.edu.vn có đuôi gì?"]},
  ai:  {ok:["Đúng! AI giúp khoanh vùng nhanh nhưng phải kiểm chứng."],
        fix:["AI có thể trả lời sai hoặc cũ. Em nên làm gì trước khi dùng?"]},
  tc:  {ok:["Nhóm ghép đúng cả bốn cách kiểm tra."],
        fix:["Em đọc lại Hướng dẫn a) Nhiệm vụ 2 và ghép lại nhé."]},
  dg:  {ok:["Em đánh giá đủ bốn tiêu chí, có chỉ ra chỗ còn thiếu. Rất tốt!"],
        fix:["Em đánh giá lần lượt từng tiêu chí: mới, chính xác, đầy đủ, sử dụng được.","Với tiêu chí chính xác, em đã đối chiếu với nguồn nào?"]},
  nv:  {ok:["Danh sách hợp lí, có tính đến điểm chuẩn và sở thích."],
        fix:["Em nêu tiêu chí dùng để sắp xếp thứ tự ưu tiên.","Em xem lại tính khả thi: điểm chuẩn có phù hợp sức học của em không?"]},
  qt:  {ok:["Chính xác! Xác định yêu cầu → tìm → đánh giá → chọn."],
        fix:["Phải biết cần tìm gì trước khi tìm, và phải đánh giá trước khi chọn."]},
  lt1: {ok:["Em tìm được đầy đủ các môn và ghi rõ nguồn."],
        fix:["Em ghi thêm nguồn thông tin (trang web nào).","Em phân biệt môn bắt buộc và môn lựa chọn nhé."]},
  lt2: {ok:["Nhóm phân loại đúng môn bắt buộc và môn lựa chọn."],
        fix:["Em xem lại thông tin đã tìm: môn nào mọi học sinh THPT đều phải học?"]},
  lt3: {ok:["Lựa chọn của em có lí do rõ ràng, gắn với sở thích và nghề nghiệp."],
        fix:["Em nêu lí do vì sao chọn các môn đó."]},
  vd1: {ok:["Dàn ý đầy đủ, có ghi nguồn. Rất tốt!"],
        fix:["Em bổ sung trang ghi nguồn tham khảo.","Em thêm trang đánh giá chất lượng thông tin nhé."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  yc: "Em xét lại: thông tin đó có giúp em chọn trường không?",
  lt2: "Em xem lại thông tin về chương trình THPT em đã tìm được."
};
const MATCH_HINT = {
  ng: "Gợi ý: nguồn nào có thẩm quyền với từng loại thông tin?",
  tc: "Gợi ý: đọc lại Hướng dẫn a) của Nhiệm vụ 2."
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
    {title:"Tìm và đánh giá thông tin thế nào?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Thực hành", title:"Nhiệm vụ 1: Tìm kiếm", acts:[
    {title:"Xác định mục đích, yêu cầu", tasks:["md","yc"]},
    {title:"Thực hiện tìm kiếm", tasks:["tk"]},
    {title:"Nguồn tin cậy", tasks:["ng","dm","ai"], concept:"c1"},
    {title:"Ghi bài: Nhiệm vụ 1", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Nhiệm vụ 2: Quyết định", acts:[
    {title:"Đánh giá thông tin", tasks:["tc","dg"]},
    {title:"Lựa chọn và sắp xếp thứ tự", tasks:["nv","qt"], concept:"c2"},
    {title:"Ghi bài: Nhiệm vụ 2", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Các môn học ở THPT", tasks:["lt1","lt2","lt3"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Chọn môi trường học tập", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai3", title: "Bài 3. Thực hành: Đánh giá chất lượng thông tin", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dùng ngay danh sách trường do AI đưa ra mà chưa kiểm chứng…",
  commentPh: "Ví dụ: Nhóm tìm đúng nguồn Sở GD&ĐT; cần bổ sung thông tin học phí, khoảng cách."};
})();
