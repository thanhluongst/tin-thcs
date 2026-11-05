/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Việc kinh doanh mở rộng, số lượng khách hàng của cửa hàng bán giống cây trồng nhà An lên đến hàng trăm người. Việc tìm kiếm tên khách hàng trong danh sách trở thật khó khăn. Em có gợi ý gì cho bạn An để việc tìm kiếm được dễ dàng hơn không?",
    k:"<b>Sắp xếp</b> danh sách khách hàng theo thứ tự chữ cái của tên (như danh bạ, từ điển). Khi đó không cần xem từ đầu: mở ở giữa, so sánh rồi chỉ tìm tiếp ở nửa trước hoặc nửa sau → tìm nhanh hơn nhiều."},
  hd1a:{type:"mcq", label:"HĐ1 – Câu 1", q:"Thuật toán tìm kiếm tuần tự phải thực hiện bao nhiêu bước lặp để tìm được khách hàng tên “Trúc” trong danh sách ở Hình 15.1? So sánh với số bước lặp của thuật toán tìm kiếm nhị phân.",
    o:["Tuần tự 3 bước, nhị phân 8 bước.","Tuần tự 8 bước, nhị phân 3 bước.","Cả hai đều 8 bước.","Cả hai đều 3 bước."], a:1,
    k:"“Trúc” ở vị trí 8 nên tìm kiếm tuần tự cần <b>8 bước lặp</b>; tìm kiếm nhị phân chỉ cần <b>3 bước lặp</b> (vị trí giữa lần lượt là 5 – Mai, 7 – Trang, 8 – Trúc)."},
  hd1b:{type:"mcq", label:"HĐ1 – Câu 2", q:"Trước khi thực hiện thuật toán tìm kiếm nhị phân, danh sách khách hàng cần thoả mãn điều kiện gì? Nếu không thoả mãn điều kiện đó thì sao?",
    o:["Không cần điều kiện gì.","Danh sách phải được sắp xếp (theo thứ tự chữ cái của tên); nếu chưa sắp xếp thì không thực hiện được thuật toán tìm kiếm nhị phân.","Danh sách phải có đúng 9 khách hàng.","Danh sách phải có số điện thoại."], a:1,
    k:"Danh sách phải <b>được sắp xếp</b>. Nếu chưa sắp xếp thì không thể biết giá trị cần tìm nằm ở nửa trước hay nửa sau, nên <b>không thực hiện được</b> tìm kiếm nhị phân."},
  vung:{type:"sort", label:"Đọc hiểu – Thu hẹp vùng tìm kiếm", q:"Đọc mô tả thuật toán bằng ngôn ngữ tự nhiên (SGK trang 76). Tìm “Trúc” trong danh sách Hình 15.1: sau mỗi lần so sánh, vùng tìm kiếm mới là nửa trước hay nửa sau?",
    cats:["Nửa trước","Nửa sau","Tìm thấy, kết thúc"],
    items:[["So sánh “Trúc” với “Mai” (vị trí 5)",1],["So sánh “Trúc” với “Trang” (vị trí 7)",1],["So sánh “Trúc” với “Trúc” (vị trí 8)",2]],
    k:"“T” đứng sau “M” → <b>nửa sau</b> (vị trí 6–9); “Tru” đứng sau “Tra” → <b>nửa sau</b> (vị trí 8–9); hai giá trị bằng nhau → <b>tìm thấy</b>, kết thúc."},
  nn:{type:"order", label:"Đọc hiểu – Các bước của thuật toán", q:"Sắp xếp các bước của thuật toán tìm kiếm nhị phân (dùng nút ↑ ↓).",
    items:{a:"Nếu giá trị cần tìm bằng giá trị ở vị trí giữa thì kết luận tìm thấy tại vị trí giữa và kết thúc.",b:"Nếu vùng tìm kiếm không có phần tử nào thì kết luận không tìm thấy và kết thúc.",c:"Nếu giá trị cần tìm nhỏ hơn giá trị ở vị trí giữa thì vùng tìm kiếm mới chỉ còn nửa trước, ngược lại chỉ còn nửa sau.",d:"Lặp lại các bước trên cho đến khi tìm thấy hoặc vùng tìm kiếm không còn phần tử nào.",e:"Xác định vị trí ở giữa của vùng tìm kiếm."},
    start:["a","b","c","d","e"], ans:["b","e","a","c","d"],
    k:"Bước 1 (b) → Bước 2 (e) → Bước 3 (a) → Bước 4 (c) → Bước 5 (d). Vị trí giữa = phần nguyên của (vị trí đầu + vị trí cuối)/2."},
  p76:{type:"mcq", label:"Câu hỏi tr.76", q:"Viết các bước lặp thực hiện thuật toán tìm kiếm nhị phân để tìm khách hàng tên “Hoà” trong danh sách ở Hình 15.1. Các vị trí giữa lần lượt được xét là:",
    o:["5 (Mai) → 2 (Bình) → 3 (Hoà): tìm thấy sau 3 bước lặp.","5 (Mai) → 7 (Trang) → 8 (Trúc): không tìm thấy.","1 → 2 → 3: tìm thấy sau 3 bước lặp.","5 (Mai) → 3 (Hoà): tìm thấy sau 2 bước lặp."], a:0,
    k:"Lặp 1: vùng 1–9, giữa 5 (Mai): Hoà đứng trước Mai → nửa trước 1–4. Lặp 2: giữa 2 (Bình): Hoà đứng sau Bình → nửa sau 3–4. Lặp 3: giữa 3 (Hoà): bằng nhau → <b>tìm thấy ở vị trí 3</b>."},
  khong:{type:"mcq", label:"Đọc hiểu – Sắp xếp và tìm kiếm", q:"Với danh sách 9 khách hàng ở Hình 15.1, nếu tìm một khách hàng không có tên trong danh sách thì:",
    o:["Tìm kiếm tuần tự cần 9 bước lặp, tìm kiếm nhị phân chỉ mất 4 bước lặp.","Cả hai cần 9 bước lặp.","Tìm kiếm nhị phân cần nhiều bước hơn.","Không thuật toán nào kết luận được."], a:0,
    k:"Tuần tự phải xét <b>hết 9</b> khách hàng; nhị phân mỗi bước loại đi một nửa nên chỉ mất <b>4 bước lặp</b>. Nhờ danh sách đã được sắp xếp, tìm kiếm nhị phân thu hẹp được phạm vi tìm kiếm chỉ còn một nửa sau mỗi bước."},
  hd2:{type:"open", label:"HĐ2 – Trò chơi tìm số", q:"Chơi trò chơi tìm số (trên bảng mô phỏng hoặc với bạn cùng bàn). Sau một số ván, em thấy cần nhiều nhất bao nhiêu lượt lật thẻ để tìm được một số trong 10 tấm thẻ? Vì sao?",
    k:"Nhiều nhất <b>4 lượt</b> (10 → 5 → 2 → 1 thẻ), vì mỗi lượt loại bỏ được khoảng một nửa số thẻ còn lại. Nếu tìm lần lượt từng thẻ thì có thể phải lật cả 10 thẻ."},
  p77:{type:"open", label:"Câu hỏi tr.77", q:"Em hãy nêu ví dụ trong thực tế cho thấy mối liên quan giữa sắp xếp và tìm kiếm.",
    k:"Ví dụ: <b>từ điển</b> sắp xếp theo thứ tự chữ cái nên tra từ nhanh; <b>danh bạ điện thoại</b>; danh sách học sinh theo tên; sách trong thư viện xếp theo mã; số nhà trên một con phố (chẵn, lẻ tăng dần)."},
  lt1a:{type:"order", label:"Luyện tập – câu 1a", q:"Sắp xếp danh sách tên các nước theo thứ tự trong bảng chữ cái (dùng nút ↑ ↓).",
    items:{a:"Bolivia",b:"Albania",c:"Scotland",d:"Canada",e:"Vietnam",f:"Iceland",g:"Portugal",h:"Greenland",i:"Germany"},
    start:["a","b","c","d","e","f","g","h","i"], ans:["b","a","d","i","h","f","g","c","e"],
    k:"Albania, Bolivia, Canada, Germany, Greenland, Iceland, Portugal, Scotland, Vietnam."},
  lt1b:{type:"mcq", label:"Luyện tập – câu 1b", q:"Liệt kê các bước lặp tìm kiếm tên nước “Iceland” trong danh sách đã sắp xếp theo thuật toán tìm kiếm nhị phân. Các vị trí giữa lần lượt là:",
    o:["5 (Greenland) → 7 (Portugal) → 6 (Iceland): tìm thấy sau 3 bước lặp.","5 (Greenland) → 6 (Iceland): tìm thấy sau 2 bước lặp.","1 → 2 → … → 6: tìm thấy sau 6 bước lặp.","5 (Greenland) → 2 (Bolivia): không tìm thấy."], a:0,
    k:"Lặp 1: vùng 1–9, giữa 5 (Greenland): Iceland đứng sau → 6–9. Lặp 2: giữa 7 (Portugal): Iceland đứng trước → 6–6. Lặp 3: giữa 6 (Iceland): <b>tìm thấy</b>, sau <b>3 bước lặp</b>."},
  lt1c:{type:"mcq", label:"Luyện tập – câu 1c", q:"So sánh số bước lặp thực hiện tìm kiếm ở phần b với số bước lặp thực hiện tìm kiếm ở phần Luyện tập của Bài 14.",
    o:["Nhị phân 3 bước, tuần tự 6 bước: nhị phân nhanh hơn.","Bằng nhau.","Tuần tự nhanh hơn.","Không so sánh được."], a:0,
    k:"Tìm kiếm nhị phân <b>3</b> bước lặp, tìm kiếm tuần tự (Bài 14) <b>6</b> bước lặp. Danh sách càng dài thì chênh lệch càng lớn."},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy chỉ ra một bài toán tìm kiếm trong thực tế mà có thể thực hiện bằng thuật toán tìm kiếm nhị phân. Hãy thực hiện thuật toán tìm kiếm nhị phân để giải quyết bài toán đó.",
    k:"Ví dụ: tìm số báo danh trong danh sách thi đã sắp xếp tăng dần; tìm trang sách có số trang cho trước; đoán số từ 1 đến 100 (mỗi lần hỏi lớn hơn hay bé hơn số ở giữa)."},
  vd1:{type:"open", label:"Vận dụng", q:"Em tìm một từ tiếng Anh trong quyển từ điển theo cách nào? Tại sao em lại dùng cách đó?",
    k:"Mở khoảng giữa từ điển, so sánh chữ cái đầu với từ cần tìm rồi lật về phía trước hoặc phía sau, cứ thế thu hẹp phạm vi — giống <b>tìm kiếm nhị phân</b>. Dùng được vì từ điển đã <b>sắp xếp theo thứ tự chữ cái</b>, giúp tìm nhanh hơn nhiều so với lật từng trang."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Thuật toán tìm kiếm nhị phân</b> thực hiện trên danh sách <b>đã được sắp xếp</b> theo thứ tự từ nhỏ đến lớn. Bắt đầu từ vị trí ở giữa danh sách.</li><li>Tại mỗi bước lặp, so sánh giá trị cần tìm với giá trị ở vị trí giữa: nếu bằng thì dừng lại; nếu nhỏ hơn thì tìm trong <b>nửa trước</b>, nếu lớn hơn thì tìm trong <b>nửa sau</b> của danh sách.</li><li>Chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Vị trí giữa của vùng tìm kiếm = <b>phần nguyên của (vị trí đầu + vị trí cuối)/2</b>.</li><li>Trong trường hợp so sánh kí tự thì đứng trước tương ứng là “nhỏ hơn”, kí tự đứng sau trong bảng chữ cái là “lớn hơn”.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li><b>Sắp xếp</b> giúp cho việc tìm kiếm được thực hiện <b>nhanh hơn</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Danh sách dài → <b>sắp xếp</b> trước để tìm nhanh hơn.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thuật toán tìm kiếm nhị phân</p><ul>'
    + "<li>Điều kiện: danh sách <b>đã sắp xếp</b>.</li>"
    + "<li>Xét <b>vị trí giữa</b> = phần nguyên (đầu + cuối)/2; bằng → <b>dừng</b>.</li>"
    + "<li>Nhỏ hơn → tìm <b>nửa trước</b>; lớn hơn → tìm <b>nửa sau</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Sắp xếp và tìm kiếm</p><ul>'
    + "<li>Sắp xếp giúp tìm kiếm <b>nhanh hơn</b>. VD: tìm “Trúc”: tuần tự <b>8</b> bước, nhị phân <b>3</b> bước.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tìm “Iceland”: nhị phân <b>3</b> bước, tuần tự <b>6</b> bước.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Tra từ điển: mở giữa, so sánh, thu hẹp → giống <b>tìm kiếm nhị phân</b>.</li>"
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
    return ["T7B15." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Gợi ý hay: sắp xếp danh sách."],
        fix:["Danh bạ, từ điển được sắp xếp thế nào để tìm nhanh?"]},
  hd1a:{ok:["Chính xác! 8 bước so với 3 bước."],
        fix:["“Trúc” ở vị trí thứ mấy trong danh sách?"]},
  hd1b:{ok:["Chính xác! Danh sách phải được sắp xếp."],
        fix:["Nếu danh sách lộn xộn, so với phần tử giữa có biết nên tìm nửa nào không?"]},
  vung:{ok:["Thu hẹp vùng tìm kiếm đúng."],
        fix:["So sánh chữ cái theo bảng chữ cái: T đứng trước hay sau M?"]},
  nn:  {ok:["Đúng thứ tự 5 bước."],
        fix:["Bước đầu tiên kiểm tra vùng tìm kiếm còn phần tử không."]},
  p76: {ok:["Chính xác! 3 bước lặp."],
        fix:["Chạy thử tìm “Hoà” trên bảng mô phỏng."]},
  khong:{ok:["Chính xác!"],
        fix:["Mỗi bước nhị phân loại bỏ khoảng một nửa danh sách."]},
  hd2: {ok:["Rút ra đúng nhận xét."],
        fix:["Mỗi lượt lật thẻ loại đi bao nhiêu thẻ?"]},
  p77: {ok:["Ví dụ thực tế phù hợp."],
        fix:["Gợi ý: từ điển, danh bạ, danh sách lớp."]},
  lt1a:{ok:["Sắp xếp đúng theo bảng chữ cái."],
        fix:["So sánh chữ cái đầu, nếu giống thì so chữ cái thứ hai."]},
  lt1b:{ok:["Chính xác! 3 bước lặp."],
        fix:["Chạy thử trên bảng mô phỏng sau khi sắp xếp."]},
  lt1c:{ok:["So sánh đúng."],
        fix:["Bài 14: Iceland ở vị trí thứ mấy trong danh sách chưa sắp xếp?"]},
  lt2: {ok:["Bài toán phù hợp, thực hiện đúng."],
        fix:["Danh sách của em đã được sắp xếp chưa?"]},
  vd1: {ok:["Liên hệ đúng với tìm kiếm nhị phân."],
        fix:["Em có lật từng trang từ đầu không? Vì sao?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  vung: "So sánh theo thứ tự bảng chữ cái."
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
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
/* Tiến trình bài học theo 4 bước của kế hoạch bài dạy (CV 5512) */
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Tìm kiếm trong danh sách dài", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Tìm kiếm nhị phân", acts:[
    {title:"Đọc hiểu: Tìm khách hàng “Trúc”", tasks:["vung"]},
    {title:"Hoạt động 1: Sắp xếp và tìm kiếm", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Mô tả bằng ngôn ngữ tự nhiên", tasks:["nn"], concept:"c1"},
    {title:"Câu hỏi SGK trang 76", tasks:["p76"], concept:"c2"},
    {title:"Ghi bài: Tìm kiếm nhị phân", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Sắp xếp và tìm kiếm", acts:[
    {title:"Đọc hiểu: Sắp xếp giúp tìm nhanh hơn", tasks:["khong"], concept:"c3"},
    {title:"Hoạt động 2: Trò chơi tìm số", tasks:["hd2"]},
    {title:"Câu hỏi SGK trang 77", tasks:["p77"]},
    {title:"Ghi bài: Sắp xếp và tìm kiếm", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tìm tên nước", tasks:["lt1a","lt1b","lt1c","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Tra từ điển", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai15", title: "Bài 15. Thuật toán tìm kiếm nhị phân", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 chọn sai vị trí giữa vì…",
  commentPh: "Ví dụ: Nhóm thu hẹp vùng tìm kiếm đúng; cần nhớ danh sách phải được sắp xếp."};
})();
