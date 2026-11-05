/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Hình 7.1 và Hình 7.2 mô tả hai cách trình bày kết quả khảo sát những nội dung Tin học mà các bạn học sinh lớp 8A muốn tìm hiểu thêm. Em hãy nhận xét về hai cách trình bày này.",
    k:"<b>Bảng</b> (Hình 7.1) cho biết chính xác từng con số nhưng khó so sánh nhanh. <b>Biểu đồ cột</b> (Hình 7.2) trực quan, nhìn là thấy ngay nội dung nào nhiều, ít học sinh quan tâm (Đồ hoạ máy tính cao nhất, Soạn thảo văn bản thấp nhất)."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Trong hai cách trình bày dữ liệu ở Hình 7.1 và Hình 7.2, cách nào hiệu quả hơn để so sánh trực quan số học sinh quan tâm các nội dung Tin học?",
    o:["Trình bày bằng bảng (Hình 7.1).","Trình bày bằng biểu đồ (Hình 7.2).","Hai cách như nhau.","Không cách nào so sánh được."], a:1,
    k:"<b>Biểu đồ</b> giúp so sánh trực quan: chiều cao các cột cho thấy ngay nội dung nào được quan tâm nhiều nhất, ít nhất."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Nếu cần so sánh tỉ lệ phần trăm số học sinh của mỗi nội dung Tin học trên tổng số học sinh được khảo sát, em sẽ dùng cách nào để thể hiện dữ liệu?",
    o:["Biểu đồ cột.","Biểu đồ đoạn thẳng.","Biểu đồ hình quạt tròn.","Bảng dữ liệu không có tổng."], a:2,
    k:"<b>Biểu đồ hình quạt tròn</b> rất hữu ích khi cần so sánh các phần với tổng thể (Hình 7.4)."},
  loai:{type:"match", label:"Đọc hiểu – Chọn loại biểu đồ", ph:"Chọn…",
    q:"Đọc mục 1 (SGK trang 32–33). Mỗi tình huống dưới đây nên dùng loại biểu đồ nào?",
    opts:["a) Biểu đồ cột","b) Biểu đồ đoạn thẳng","c) Biểu đồ hình quạt tròn"],
    items:[["1) So sánh số học sinh quan tâm mỗi nội dung Tin học",1],["2) Quan sát xu hướng số ứng dụng được tải về từ năm 2017 đến 2020",2],["3) Tỉ lệ phần trăm học sinh mỗi nội dung trên tổng số học sinh khảo sát",3],["4) Nhiệt độ trung bình của một thành phố qua 12 tháng",2],["5) So sánh điểm trung bình môn Tin học của 5 lớp",1]],
    k:"1 – a, 2 – b, 3 – c, 4 – b, 5 – a. <b>Cột</b>: so sánh dữ liệu; <b>đoạn thẳng</b>: xu hướng tăng giảm theo thời gian; <b>hình quạt tròn</b>: so sánh các phần với tổng thể."},
  it:{type:"mcq", label:"Đọc hiểu – Đọc biểu đồ", q:"Theo biểu đồ cột ở Hình 7.2, nội dung Tin học nào ít học sinh quan tâm nhất?",
    o:["Bảng tính điện tử","Soạn thảo văn bản","Phần mềm trình chiếu","Mạng máy tính"], a:1,
    k:"Cột thấp nhất là <b>Soạn thảo văn bản</b> (2 học sinh). Cột cao nhất là Đồ hoạ máy tính (15), sau đó là Ngôn ngữ lập trình (8)."},
  p33:{type:"open", label:"Câu hỏi tr.33", q:"Em hãy nêu một số tình huống thực tế cần tạo biểu đồ.",
    k:"Ví dụ: biểu đồ cột so sánh điểm trung bình các môn học của em; biểu đồ đoạn thẳng theo dõi chiều cao, cân nặng của em qua các năm, nhiệt độ trong tuần; biểu đồ hình quạt tròn thể hiện tỉ lệ chi tiêu của gia đình, tỉ lệ học sinh giỏi, khá, trung bình của lớp."},
  bc:{type:"order", label:"Thực hành a – Biểu đồ cột", q:"Sắp xếp các bước tạo biểu đồ cột so sánh số học sinh quan tâm các nội dung Tin học (dùng nút ↑ ↓).",
    items:{a:"Trong nhóm 2-D Column, chọn kiểu Clustered Column.",b:"Khởi động phần mềm bảng tính và nhập dữ liệu như Hình 7.1.",c:"Chọn biểu đồ, nháy nút Chart Elements để bổ sung thông tin.",d:"Trong thẻ Insert, nhóm Charts, chọn lệnh Insert Column or Bar Chart.",e:"Chọn vùng dữ liệu B2:C8."},
    start:["a","b","c","d","e"], ans:["b","e","d","a","c"],
    k:"Thứ tự: <b>b → e → d → a → c</b>. Nhập dữ liệu → chọn B2:C8 → Insert/Insert Column or Bar Chart → Clustered Column → Chart Elements."},
  ce:{type:"mcq", label:"Thực hành a – Chart Elements", q:"Nút lệnh Chart Elements ở góc trên bên phải biểu đồ dùng để làm gì?",
    o:["Xoá biểu đồ.","Bổ sung thông tin cho biểu đồ: tiêu đề, nhãn dữ liệu, chú giải, lưới,…","Đổi tên trang tính.","Sắp xếp dữ liệu."], a:1,
    k:"Chart Elements dùng để <b>bổ sung thông tin</b> cho biểu đồ: Axes (trục), Chart Title (tiêu đề), Data Labels (nhãn dữ liệu), Gridlines (lưới), Legend (chú giải),…"},
  pt:{type:"mcq", label:"Thực hành b – Nhãn phần trăm", q:"Khi tạo biểu đồ hình quạt tròn, để hiển thị nhãn dữ liệu là tỉ lệ phần trăm, em làm thế nào?",
    o:["Chart Elements → Data Labels → More Options… → đánh dấu chọn Percentage.","Chọn lệnh Sort.","Chọn lệnh Filter.","Nhập dấu % vào các ô dữ liệu."], a:0,
    k:"Chọn <b>Chart Elements → Data Labels → More Options…</b>, trong khung Label Options đánh dấu chọn <b>Percentage</b>."},
  pt2:{type:"mcq", label:"Thực hành b – Đọc kết quả", q:"Tổng số học sinh khảo sát là 41, trong đó 15 học sinh quan tâm Đồ hoạ máy tính. Trên biểu đồ hình quạt tròn, phần Đồ hoạ máy tính chiếm khoảng bao nhiêu phần trăm?",
    o:["15%","27%","37%","50%"], a:2,
    k:"15 : 41 × 100% ≈ <b>37%</b> (Hình 7.4). Phần mềm bảng tính tự tính tỉ lệ phần trăm khi chọn Percentage."},
  lt1a:{type:"mcq", label:"Luyện tập 1a", q:"Từ bảng tổng số học sinh sử dụng thiết bị số trong mỗi khoảng thời gian (Hình 7.8), em vẽ biểu đồ cột. Khoảng thời gian nào có nhiều học sinh nhất?",
    o:["Không sử dụng","Dưới 1 giờ","1–2 giờ","3–4 giờ"], a:2,
    k:"Cột cao nhất là <b>1–2 giờ</b> (146 học sinh), tiếp theo là Dưới 1 giờ (131). Nhận xét: phần lớn học sinh khối 8 dùng thiết bị số dưới 2 giờ mỗi ngày; vẫn có 72 học sinh dùng 3–4 giờ và 12 học sinh từ 5 giờ trở lên – cần chú ý."},
  lt1b:{type:"mcq", label:"Luyện tập 1b", q:"Tổng số học sinh khảo sát là 429. Trên biểu đồ hình quạt tròn, phần “Từ 5 giờ trở lên” (12 học sinh) chiếm khoảng bao nhiêu phần trăm?",
    o:["Khoảng 3%","Khoảng 12%","Khoảng 17%","Khoảng 34%"], a:0,
    k:"12 : 429 × 100% ≈ <b>2,8%</b> (khoảng 3%). Các phần khác: Không sử dụng ≈ 16%, Dưới 1 giờ ≈ 31%, 1–2 giờ ≈ 34%, 3–4 giờ ≈ 17%."},
  lt2a:{type:"mcq", label:"Luyện tập 2a", q:"Từ biểu đồ Hình 7.9, em có nhận xét gì về doanh thu công nghiệp phần mềm giai đoạn 2016 – 2020?",
    o:["Giảm dần qua các năm.","Tăng liên tục qua các năm, từ 3 038 lên 5 439 triệu USD.","Không thay đổi.","Tăng rồi giảm."], a:1,
    k:"Doanh thu <b>tăng liên tục</b> qua các năm: 3 038 → 3 779 → 4 447 → 4 932 → 5 439 triệu USD; năm 2020 gần gấp 1,8 lần năm 2016."},
  lt2bc:{type:"open", label:"Luyện tập 2b, c", q:"Tạo bảng dữ liệu trong phần mềm bảng tính từ biểu đồ Hình 7.9, rồi tạo biểu đồ cột từ bảng dữ liệu đó. Ghi lại vùng dữ liệu em đã chọn và kiểu biểu đồ.",
    k:"Bảng hai cột: <b>Năm</b> (2016–2020) và <b>Doanh thu (triệu USD)</b> (3038, 3779, 4447, 4932, 5439). Chọn vùng dữ liệu (ví dụ A1:B6) → Insert → Insert Column or Bar Chart → Clustered Column. Lưu ý: nhập năm dạng văn bản hoặc chỉ chọn cột Doanh thu rồi đặt nhãn trục để năm không bị vẽ thành một cột số liệu."},
  vd1:{type:"open", label:"Vận dụng", q:"Từ bảng dữ liệu doanh thu công nghiệp phần mềm giai đoạn 2016 – 2020 đã tạo ở Luyện tập câu 2, em hãy tạo biểu đồ đoạn thẳng, từ đó nhận xét xu hướng thay đổi của dữ liệu.",
    k:"Chọn vùng dữ liệu → Insert → <b>Insert Line or Area Chart</b> → Line. Đường biểu diễn <b>đi lên liên tục</b>: doanh thu có xu hướng tăng đều; mức tăng mạnh nhất là 2016–2017 (+741) và 2017–2018 (+668) triệu USD."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Biểu đồ là cách minh hoạ dữ liệu trực quan. Nhờ biểu đồ, em dễ dàng so sánh, nhận định xu hướng thay đổi của dữ liệu.</li><li>Cần sử dụng loại biểu đồ phù hợp với mục đích của việc biểu diễn và thể hiện dữ liệu.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Tạo biểu đồ: chọn vùng dữ liệu → thẻ <b>Insert</b>, nhóm <b>Charts</b> → chọn loại, kiểu biểu đồ.</li><li>Bổ sung thông tin: chọn biểu đồ → <b>Chart Elements</b> (tiêu đề, nhãn dữ liệu, chú giải,…).</li><li>Biểu đồ hình quạt tròn: Data Labels → More Options… → <b>Percentage</b> để hiện tỉ lệ phần trăm.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Bảng: số liệu <b>chính xác</b>. Biểu đồ: <b>trực quan</b>, dễ so sánh.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Trình bày dữ liệu bằng biểu đồ</p><ul>'
    + "<li><b>Biểu đồ cột</b>: so sánh dữ liệu.</li>"
    + "<li><b>Biểu đồ đoạn thẳng</b>: xu hướng tăng, giảm theo thời gian.</li>"
    + "<li><b>Biểu đồ hình quạt tròn</b>: so sánh các phần với tổng thể (tỉ lệ %).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thực hành: tạo biểu đồ</p><ul>'
    + "<li>Chọn vùng dữ liệu → <b>Insert/Charts</b> → chọn loại biểu đồ.</li>"
    + "<li><b>Chart Elements</b>: thêm tiêu đề, nhãn dữ liệu, chú giải.</li>"
    + "<li>Quạt tròn hiện %: Data Labels → More Options… → <b>Percentage</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Nhiều học sinh nhất dùng thiết bị số <b>1–2 giờ</b>/ngày; doanh thu phần mềm <b>tăng liên tục</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Xem xu hướng theo năm → dùng <b>biểu đồ đoạn thẳng</b> (Insert Line Chart).</li>"
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
    return ["T8B7." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em nhận xét đúng ưu điểm của cả bảng và biểu đồ."],
        fix:["Nhìn cách nào em biết ngay nội dung nào được quan tâm nhiều nhất?"]},
  hd1a:{ok:["Chính xác! Biểu đồ giúp so sánh trực quan."],
        fix:["Với bảng, em phải đọc và so từng số. Với biểu đồ thì sao?"]},
  hd1b:{ok:["Chính xác! Biểu đồ hình quạt tròn."],
        fix:["Loại biểu đồ nào thể hiện các phần của một tổng thể?"]},
  loai:{ok:["Nhóm chọn đúng loại biểu đồ cho mọi tình huống."],
        fix:["Em tự hỏi: so sánh, xem xu hướng theo thời gian, hay tỉ lệ so với tổng?"]},
  it:  {ok:["Chính xác! Soạn thảo văn bản ít nhất."],
        fix:["Em tìm cột thấp nhất trên biểu đồ Hình 7.2."]},
  p33: {ok:["Tình huống thực tế, chọn loại biểu đồ phù hợp."],
        fix:["Em nêu tình huống cụ thể trong học tập, gia đình, lớp học."]},
  bc:  {ok:["Đúng thứ tự các bước tạo biểu đồ cột."],
        fix:["Phải chọn vùng dữ liệu trước khi chọn lệnh tạo biểu đồ."]},
  ce:  {ok:["Chính xác! Chart Elements bổ sung thông tin cho biểu đồ."],
        fix:["Em quan sát Hình 7.6: danh sách Chart Elements gồm những mục gì?"]},
  pt:  {ok:["Chính xác! Chọn Percentage."],
        fix:["Em đọc lại Bước 4 phần b) Tạo biểu đồ hình quạt tròn."]},
  pt2: {ok:["Chính xác! Khoảng 37%."],
        fix:["Em tính 15 : 41 × 100%."]},
  lt1a:{ok:["Chính xác! Khoảng 1–2 giờ có nhiều học sinh nhất."],
        fix:["Em so sánh các số trong Hình 7.8: số nào lớn nhất?"]},
  lt1b:{ok:["Chính xác! Khoảng 3%."],
        fix:["Em tính 12 : 429 × 100%."]},
  lt2a:{ok:["Đúng! Doanh thu tăng liên tục."],
        fix:["Em so sánh chiều cao các cột từ năm 2016 đến 2020."]},
  lt2bc:{ok:["Bảng dữ liệu và biểu đồ cột đúng."],
        fix:["Em kiểm tra: năm có bị vẽ thành một cột số liệu không?"]},
  vd1: {ok:["Biểu đồ đoạn thẳng đúng, nhận xét xu hướng rõ ràng."],
        fix:["Đường biểu diễn đi lên hay đi xuống? Năm nào tăng mạnh nhất?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {};
const MATCH_HINT = {
  loai: "Gợi ý: so sánh → cột; xu hướng theo thời gian → đoạn thẳng; tỉ lệ so với tổng → quạt tròn."
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
    {title:"Bảng hay biểu đồ?", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Trình bày bằng biểu đồ", acts:[
    {title:"Hoạt động 1: Trình bày dữ liệu bằng biểu đồ", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Các loại biểu đồ", tasks:["loai","it"], concept:"c1"},
    {title:"Câu hỏi SGK trang 33", tasks:["p33"]},
    {title:"Ghi bài: Các loại biểu đồ", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"Tạo biểu đồ", acts:[
    {title:"a) Tạo biểu đồ cột", tasks:["bc","ce"]},
    {title:"b) Tạo biểu đồ hình quạt tròn", tasks:["pt","pt2"], concept:"c2"},
    {title:"Ghi bài: Tạo biểu đồ", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Thời gian sử dụng thiết bị số", tasks:["lt1a","lt1b"]},
    {title:"Doanh thu công nghiệp phần mềm", tasks:["lt2a","lt2bc"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Biểu đồ đoạn thẳng", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai7", title: "Bài 7. Trình bày dữ liệu bằng biểu đồ", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 dùng biểu đồ cột để thể hiện tỉ lệ phần trăm vì…",
  commentPh: "Ví dụ: Nhóm chọn đúng loại biểu đồ; cần thêm tiêu đề và nhãn dữ liệu."};
})();
