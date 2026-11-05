/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Đọc đoạn hội thoại của An, Minh và Khoa. Để bài báo cáo dự án Trường học xanh thật ấn tượng, các bạn định làm những gì?",
    k:"<b>Sao chép</b> dữ liệu có sẵn từ tệp văn bản Truonghocxanh.docx và kết quả tính toán từ bảng tính THXanh.xlsx; minh hoạ bằng <b>hình ảnh</b> (trực quan, thuyết phục); sử dụng <b>định dạng văn bản và ảnh minh hoạ</b> một cách hợp lí."},
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"Theo em có nên sử dụng hình ảnh để minh hoạ cho bài trình chiếu không? Vì sao?",
    k:"<b>Nên</b>, vì hình ảnh là dạng thông tin trực quan, dễ gây ấn tượng; giúp bài trình chiếu <b>hấp dẫn, sinh động</b>, thu hút sự chú ý của người nghe."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Em sẽ chọn hình ảnh gì để thêm vào bài trình chiếu báo cáo dự án?",
    k:"Hình ảnh <b>phù hợp với nội dung</b>, có <b>tính thẩm mĩ</b>: cây xanh, vườn hoa, sân trường, các bạn học sinh trồng cây,… Ưu tiên ảnh tự chụp hoặc ảnh được phép sử dụng."},
  p62:{type:"sort", label:"Câu hỏi tr.62", q:"Phát biểu nào đúng, phát biểu nào sai?",
    cats:["Đúng","Sai"],
    items:[["a) Hình ảnh minh hoạ làm cho bài trình chiếu ấn tượng hơn.",0],["b) Nên chọn hình ảnh phù hợp với chủ đề của bài trình chiếu.",0],["c) Màu sắc, hoạ tiết trên hình ảnh không cần trùng khớp với chủ đề.",1],["d) Hình ảnh minh hoạ cần có tính thẩm mĩ.",0]],
    k:"a, b, d <b>đúng</b>; c <b>sai</b>: hình ảnh (cả màu sắc, hoạ tiết) cần phù hợp với nội dung, chủ đề của bài trình chiếu."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Sau khi tạo văn bản cho một bài trình chiếu, em thường định dạng văn bản như thế nào? Cần làm gì để nhấn mạnh nội dung trên một trang?",
    k:"Chọn phông, cỡ, kiểu, màu chữ, căn lề,… giống trong phần mềm soạn thảo. Để nhấn mạnh: dùng <b>chữ đậm, màu</b> nổi bật cho thông điệp chính, cỡ chữ tiêu đề lớn hơn nội dung."},
  hd2b:{type:"mcq", label:"HĐ2 – Câu 2", q:"Có nên viết nhiều chữ, dùng nhiều màu trên một trang không?",
    o:["Nên, để trang chiếu đầy đủ thông tin và nhiều màu sắc.","Không nên: mỗi trang chỉ nên có khoảng 5 đến 7 dòng, tập trung vào một ý chính; màu chữ tương phản với màu nền, không dùng quá nhiều màu.","Nên viết thật nhiều chữ nhưng chỉ một màu.","Chỉ nên dùng hình, không dùng chữ."], a:1,
    k:"<b>Không nên.</b> Màu nền và định dạng văn bản cần thống nhất. Không nên dùng nhiều màu, nhiều phông chữ trên một trang; nội dung cô đọng, khoảng 5–7 dòng mỗi trang."},
  quytac:{type:"sort", label:"Đọc hiểu – Định dạng văn bản", q:"Đọc mục 2 (SGK trang 62). Mỗi lời khuyên dưới đây nói về yếu tố nào?",
    cats:["Phông chữ","Cỡ chữ","Kiểu chữ","Màu chữ","Số lượng chữ"],
    items:[["Chọn phông đơn giản, dễ đọc (Arial, Calibri, Tahoma,…)",0],["Tiêu đề từ 40 đến 50, văn bản từ 18 trở lên",1],["Tiêu đề chọn chữ đậm, nội dung chữ thường",2],["Tương phản với màu nền, không dùng quá nhiều màu",3],["Mỗi trang chỉ khoảng 5 đến 7 dòng",4]],
    k:"<b>Phông</b> đơn giản, dễ đọc; <b>cỡ</b> tiêu đề 40–50, nội dung ≥ 18; <b>kiểu</b> tiêu đề đậm; <b>màu</b> tương phản nền; <b>số lượng chữ</b> 5–7 dòng mỗi trang."},
  p63:{type:"sort", label:"Câu hỏi tr.63 – Ghép nối", q:"Ghép mỗi nội dung ở cột A với một nội dung phù hợp ở cột B.",
    cats:["a) nội dung chính của trang chiếu","b) cô đọng","c) cho văn bản trên một trang chiếu","d) tương tự như định dạng trong soạn thảo văn bản"],
    items:[["1) Định dạng văn bản trong trang chiếu",3],["2) Định dạng làm nổi bật",0],["3) Nội dung trên mỗi trang chiếu",1],["4) Không nên dùng quá nhiều phông chữ",2]],
    k:"1 – d; 2 – a; 3 – b; 4 – c."},
  nv1:{type:"order", label:"Thực hành – Sao chép từ tệp văn bản", q:"Sắp xếp các bước sao chép dữ liệu từ tệp văn bản sang tệp trình chiếu (dùng nút ↑ ↓).",
    items:{a:"Mở tệp trình chiếu Truonghocxanh.pptx.",b:"Mở tệp văn bản Truonghocxanh.docx.",c:"Đặt con trỏ tại vị trí cần sao chép đến, chọn Home/Paste (Ctrl+V).",d:"Chọn phần dữ liệu cần sao chép, chọn Home/Copy (Ctrl+C)."},
    start:["a","b","c","d"], ans:["b","d","a","c"],
    k:"Thứ tự: <b>b → d → a → c</b>. Thông tin về dự án sẽ thống nhất, chính xác và tiết kiệm thời gian soạn thảo."},
  nv2:{type:"mcq", label:"Thực hành – Mẫu định dạng", q:"Muốn áp dụng một mẫu định dạng (theme) chỉ cho trang 3 và trang 4, em làm thế nào?",
    o:["Nháy vào mẫu trong nhóm Themes mà không chọn trang nào.","Nhấn giữ Ctrl để chọn đồng thời trang 3 và 4, chọn thẻ Design rồi nháy vào mẫu muốn áp dụng.","Chọn thẻ Insert/Pictures.","Nhấn Ctrl+Z."], a:1,
    k:"<b>B</b>. Nếu không chọn trang thì mẫu được áp dụng cho tất cả các trang. Nút <b>More</b> để xem thêm mẫu; <b>Variants</b> để đổi màu sắc, phông, hiệu ứng, nền; <b>Undo (Ctrl+Z)</b> để khôi phục mẫu trước đó."},
  nv3:{type:"mcq", label:"Thực hành – Lớp của hình ảnh", q:"Hình ảnh vừa chèn che mất dòng chữ “TRƯỜNG HỌC XANH” (Hình 12.7). Để hình ảnh nằm bên dưới văn bản, em chọn hình rồi chọn:",
    o:["Format/Arrange/Bring Forward","Format/Arrange/Send Backward","Format/Picture Border","Design/Themes"], a:1,
    k:"<b>Send Backward</b> đưa hình xuống dưới (không che văn bản); <b>Bring Forward</b> đưa hình lên lại lớp trên."},
  nv4:{type:"mcq", label:"Thực hành – Kích thước hình", q:"Muốn thay đổi kích thước hình ảnh mà vẫn giữ nguyên tỉ lệ, em kéo thả:",
    o:["Nút ở giữa cạnh trên hoặc cạnh dưới.","Nút ở giữa cạnh trái hoặc cạnh phải.","Nút ở góc hình theo đường chéo.","Kéo thả ở giữa hình."], a:2,
    k:"Kéo <b>nút ở góc theo đường chéo</b> để giữ nguyên tỉ lệ. Nút cạnh trên/dưới đổi chiều dọc; nút cạnh trái/phải đổi chiều ngang; kéo thả hình để đổi vị trí."},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: em đã sao chép nội dung gì sang trang chiếu, biên tập lại ra sao? Em đã chọn mẫu định dạng, hình ảnh, màu nền như thế nào?",
    k:"Ví dụ: sao chép phần “1. Ý TƯỞNG” từ tệp văn bản, biên tập thành 3–4 ý ngắn có kí hiệu đầu dòng; chọn mẫu Lá xanh; trang tiêu đề chèn ảnh đồng cỏ, đưa xuống dưới văn bản, thêm viền trắng, nền trang màu xanh lá (Hình 12.10)."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy bổ sung thêm một hình ảnh vào trang trình bày ý tưởng (Hình 12.5) rồi định dạng hình ảnh đó sao cho hợp lí. Em đã chọn hình gì, đặt ở đâu?",
    k:"Ví dụ: chèn hình cây xanh, thu nhỏ, đặt ở góc phải dưới, không che chữ; thêm viền mảnh cùng màu với mẫu định dạng."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy bổ sung kết quả tính toán của dự án Trường học xanh đã làm trong phần mềm bảng tính vào bài trình chiếu (có thể ở trang Dự kiến kết quả). Em đưa vào những số liệu nào?",
    k:"Ví dụ: tổng số cây dự kiến 623 cây; trung bình mỗi lớp 89 cây; tổng chi phí 30.692.200 đồng. Sao chép từ bảng tính (Ctrl+C) rồi dán vào trang chiếu (Ctrl+V)."},
  lt3:{type:"open", label:"Luyện tập – câu 3", q:"Em hãy định dạng văn bản, biên tập nội dung cho các trang chiếu của tệp Truonghocxanh.pptx và chọn mẫu định dạng phù hợp. Em đã chọn mẫu nào? Vì sao?",
    k:"Ví dụ: mẫu màu xanh lá phù hợp chủ đề cây xanh; phông chữ đơn giản, tiêu đề cỡ 40–44 đậm, nội dung cỡ 24; mỗi trang tối đa 5–7 dòng."},
  vd1:{type:"open", label:"Vận dụng", q:"Mở tệp Baitaptinhoc7.pptx đã tạo ở Bài 11, bổ sung thông tin vào các trang chiếu (sao chép từ tệp văn bản hoặc nhập mới từ bàn phím). Tạo cấu trúc phân cấp, chèn hình ảnh, chọn mẫu định dạng và định dạng văn bản, hình ảnh. Mô tả ngắn bài của em.",
    k:"Học sinh tự làm. Bài tốt có: nội dung ngắn gọn, phân cấp; mẫu định dạng thống nhất; hình ảnh phù hợp, không che chữ, kích thước và vị trí hợp lí; màu chữ tương phản với nền."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Hình ảnh thường được dùng để minh hoạ cho nội dung bài trình chiếu, nhờ đó bài trình chiếu trở nên <b>trực quan, ấn tượng và hấp dẫn</b> hơn.</li><li>Nên lựa chọn hình ảnh <b>phù hợp với nội dung</b> bài trình chiếu và có <b>tính thẩm mĩ</b>.</li><li>Kích thước hình ảnh và vị trí đặt trên trang chiếu cần hợp lí.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Định dạng văn bản trong phần mềm trình chiếu <b>tương tự</b> trong phần mềm soạn thảo.</li><li>Nên chọn phông chữ, cỡ chữ, kiểu chữ, màu chữ, nền,… <b>thống nhất và phù hợp</b>, để làm nổi bật thông điệp chính của trang.</li><li>Nội dung trình bày nên <b>cô đọng</b>. Mỗi trang chiếu chỉ nên tập trung vào <b>một ý chính</b>.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Sao chép: <b>Copy (Ctrl+C)</b> ở tệp văn bản → <b>Paste (Ctrl+V)</b> ở trang chiếu.</li><li>Mẫu định dạng: <b>Design → Themes</b> (giữ Ctrl để chọn nhiều trang).</li><li>Hình ảnh: <b>Insert/Pictures</b>; lớp: <b>Send Backward / Bring Forward</b>; viền: <b>Picture Border</b>; kéo nút góc để giữ tỉ lệ.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Báo cáo ấn tượng: <b>sao chép dữ liệu</b>, thêm <b>hình ảnh</b>, <b>định dạng</b> hợp lí.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Ảnh minh hoạ</p><ul>'
    + "<li>Hình ảnh giúp bài trình chiếu <b>trực quan, hấp dẫn</b>.</li>"
    + "<li>Chọn hình <b>phù hợp nội dung</b>, có <b>thẩm mĩ</b>; kích thước, vị trí hợp lí.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Định dạng văn bản</p><ul>'
    + "<li>Giống soạn thảo văn bản: phông, cỡ, kiểu, màu chữ, căn lề.</li>"
    + "<li>Tiêu đề cỡ <b>40–50</b>, nội dung <b>≥ 18</b>; ít phông, ít màu.</li>"
    + "<li>Mỗi trang <b>một ý chính</b>, khoảng <b>5–7 dòng</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Sao chép: <b>Ctrl+C → Ctrl+V</b>. Mẫu: <b>Design → Themes</b>.</li>"
    + "<li>Hình: <b>Insert/Pictures</b>; dưới chữ: <b>Send Backward</b>; viền: <b>Picture Border</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Thêm <b>hình</b>, <b>số liệu từ bảng tính</b>; chọn <b>mẫu</b> phù hợp.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Hoàn thiện bài: <b>phân cấp + hình ảnh + mẫu định dạng</b>.</li>"
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
    return ["T7B12." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Tóm tắt đúng ý các bạn."],
        fix:["An, Minh, Khoa mỗi bạn đề xuất điều gì?"]},
  hd1a:{ok:["Đúng! Hình ảnh trực quan, ấn tượng."],
        fix:["Hình ảnh giúp người nghe thế nào?"]},
  hd1b:{ok:["Lựa chọn phù hợp nội dung."],
        fix:["Hình em chọn có liên quan đến dự án không?"]},
  p62: {ok:["Chính xác! Chỉ c sai."],
        fix:["Màu sắc, hoạ tiết có cần phù hợp chủ đề không?"]},
  hd2a:{ok:["Nêu được cách định dạng, nhấn mạnh."],
        fix:["Muốn nhấn mạnh thì dùng kiểu chữ, màu chữ thế nào?"]},
  hd2b:{ok:["Chính xác!"],
        fix:["Trang chiếu nhiều chữ, nhiều màu có dễ đọc không?"]},
  quytac:{ok:["Nhớ đúng các lời khuyên định dạng."],
        fix:["Đọc lại mục 2, trang 62."]},
  p63: {ok:["Ghép đúng cả 4 ý."],
        fix:["Đọc lại phần Ghi nhớ mục 2."]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải Copy ở tệp văn bản trước, rồi mới Paste ở trang chiếu."]},
  nv2: {ok:["Chính xác!"],
        fix:["Không chọn trang thì mẫu áp dụng cho tất cả. Muốn chọn nhiều trang giữ phím gì?"]},
  nv3: {ok:["Chính xác! Send Backward."],
        fix:["Lệnh nào đưa hình xuống lớp dưới?"]},
  nv4: {ok:["Chính xác!"],
        fix:["Nút nào thay đổi cả chiều ngang và chiều dọc cùng lúc?"]},
  nvkq:{ok:["Bài trình chiếu đẹp, hợp lí."],
        fix:["Em kiểm tra: hình có che chữ không? Trang ý tưởng đã ngắn gọn chưa?"]},
  lt1: {ok:["Hình phù hợp, đặt hợp lí."],
        fix:["Hình có che chữ không? Kích thước có vừa không?"]},
  lt2: {ok:["Đưa đúng số liệu dự án."],
        fix:["Xem lại kết quả ở trang tính 5. Tổng kết."]},
  lt3: {ok:["Chọn mẫu phù hợp, có lí do."],
        fix:["Mẫu em chọn có hợp với chủ đề cây xanh không?"]},
  vd1: {ok:["Bài trình chiếu hoàn chỉnh."],
        fix:["Em bổ sung hình ảnh hoặc mẫu định dạng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  p62: "Hình ảnh cần phù hợp với chủ đề.",
  quytac: "Đọc lại mục 2, trang 62.",
  p63: "Đọc lại phần Ghi nhớ mục 2."
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Trình bày báo cáo thật ấn tượng", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Ảnh minh hoạ", acts:[
    {title:"Hoạt động 1: Ảnh minh hoạ", tasks:["hd1a","hd1b"], concept:"c1"},
    {title:"Câu hỏi SGK trang 62", tasks:["p62"]},
    {title:"Ghi bài: Ảnh minh hoạ", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Định dạng văn bản", acts:[
    {title:"Hoạt động 2: Định dạng văn bản", tasks:["hd2a","hd2b","quytac"], concept:"c2"},
    {title:"Câu hỏi SGK trang 63", tasks:["p63"]},
    {title:"Ghi bài: Định dạng văn bản", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Sao chép, chèn hình, định dạng", tasks:["nv1","nv2","nv3","nv4","nvkq"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Hoàn thiện Truonghocxanh.pptx", tasks:["lt1","lt2","lt3"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Hoàn thiện Baitaptinhoc7.pptx", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai12", title: "Bài 12. Định dạng đối tượng trên trang chiếu", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 để hình ảnh che mất tiêu đề vì chưa dùng Send Backward…",
  commentPh: "Ví dụ: Trang ý tưởng còn quá nhiều chữ; cần biên tập lại 3–4 ý ngắn."};
})();
