/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"Có hai cốc A (đựng chất lỏng màu xanh) và B (đựng chất lỏng màu đỏ). Cần đổi chỗ hai chất lỏng để cốc A đựng màu đỏ, cốc B đựng màu xanh. Em hãy mô tả cách thực hiện. Vì sao cần dùng thêm cốc C?",
    k:"Ba bước: <b>rót A sang C</b> → <b>rót B sang A</b> → <b>rót C sang B</b>. Cốc C dùng để <b>giữ tạm</b> một chất lỏng; nếu rót thẳng thì hai chất lỏng bị trộn lẫn. Đây chính là cách <b>hoán đổi</b> giá trị hai phần tử."},
  nb1:{type:"order", label:"Đọc hiểu – Các bước nổi bọt", q:"Sắp xếp các bước của thuật toán sắp xếp nổi bọt (dãy tăng dần) theo đúng thứ tự (dùng nút ↑ ↓).",
    items:{a:"Nếu phần tử đứng sau nhỏ hơn phần tử đứng trước thì đổi chỗ chúng cho nhau.",b:"Với vị trí đầu tiên: so sánh hai phần tử đứng cạnh nhau theo thứ tự từ cuối dãy lên vị trí đầu tiên.",c:"Kết thúc, em sẽ nhận được dãy số đã được sắp xếp theo thứ tự từ nhỏ đến lớn.",d:"Cuối vòng lặp, phần tử nhỏ nhất nổi lên vị trí đầu tiên.",e:"Tương tự với vị trí thứ hai, thứ ba, … đến vị trí trước vị trí cuối cùng."},
    start:["a","b","c","d","e"], ans:["b","a","d","e","c"],
    k:"(b) So sánh hai phần tử cạnh nhau từ cuối dãy lên → (a) phần tử sau nhỏ hơn thì đổi chỗ → (d) phần tử nhỏ nhất nổi lên vị trí đầu tiên → (e) lặp lại với các vị trí tiếp theo → (c) kết thúc."},
  hd1a:{type:"mcq", label:"HĐ1 – Vòng lặp thứ nhất", q:"Sắp xếp nổi bọt dãy 3, 5, 4, 1, 2 theo thứ tự tăng dần. Kết quả sau vòng lặp thứ nhất là:",
    o:["1, 3, 5, 4, 2","1, 2, 3, 4, 5","3, 5, 4, 1, 2","3, 1, 5, 4, 2"], a:0,
    k:"Từ cuối dãy lên: 2 &lt; 1? Không. 1 &lt; 4 → hoán đổi (3 5 1 4 2); 1 &lt; 5 → hoán đổi (3 1 5 4 2); 1 &lt; 3 → hoán đổi. Kết quả: <b>1, 3, 5, 4, 2</b> — số 1 nhỏ nhất đã “nổi” lên vị trí đầu."},
  hd1b:{type:"mcq", label:"HĐ1 – Các vòng lặp tiếp theo", q:"Tiếp tục sắp xếp dãy trên. Kết quả sau vòng lặp thứ hai, thứ ba lần lượt là:",
    o:["1, 2, 3, 5, 4 và 1, 2, 3, 4, 5","1, 3, 2, 5, 4 và 1, 2, 3, 5, 4","1, 2, 3, 4, 5 và 1, 2, 3, 4, 5","1, 3, 5, 2, 4 và 1, 2, 3, 4, 5"], a:0,
    k:"Vòng 2: <b>1, 2, 3, 5, 4</b> (3 lần hoán đổi). Vòng 3: <b>1, 2, 3, 4, 5</b> (hoán đổi 4 và 5). Vòng 4 không còn hoán đổi nào. Tổng cộng 7 lần hoán đổi."},
  nb2:{type:"mcq", label:"Câu hỏi tr.80", q:"Thuật toán sắp xếp nổi bọt sắp xếp danh sách bằng cách:",
    o:["Chọn phần tử có giá trị bé nhất đặt vào đầu danh sách.","Chọn phần tử có giá trị lớn nhất đặt vào đầu danh sách.","Hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự.","Chèn phần tử vào vị trí thích hợp để đảm bảo danh sách sắp xếp theo đúng thứ tự."], a:2,
    k:"<b>C</b>. Nổi bọt so sánh và <b>hoán đổi các phần tử liền kề</b> nếu chúng không đúng thứ tự."},
  ch1:{type:"sort", label:"Câu hỏi tr.82 – Vòng lặp 2, 3, 4 (Hình 16.5)", q:"Sắp xếp chọn dãy 3, 4, 1, 5, 2 (Hình 16.5). Sau vòng lặp thứ nhất được 1, 4, 3, 5, 2. Ở các vòng lặp thứ 2, 3, 4, mỗi lần so sánh dưới đây có hoán đổi hay không?",
    cats:["Hoán đổi","Không hoán đổi"],
    items:[["Vòng 2: so sánh 3 (vị trí 3) với 4 (vị trí 2)",0],["Vòng 2: so sánh 5 (vị trí 4) với 3 (vị trí 2)",1],["Vòng 2: so sánh 2 (vị trí 5) với 3 (vị trí 2)",0],["Vòng 3: so sánh 5 (vị trí 4) với 4 (vị trí 3)",1],["Vòng 3: so sánh 3 (vị trí 5) với 4 (vị trí 3)",0],["Vòng 4: so sánh 4 (vị trí 5) với 5 (vị trí 4)",0]],
    k:"Vòng 2: 3 &lt; 4 hoán đổi → 1 3 4 5 2; 5 không; 2 &lt; 3 hoán đổi → <b>1 2 4 5 3</b>. Vòng 3: 5 không; 3 &lt; 4 hoán đổi → <b>1 2 3 5 4</b>. Vòng 4: 4 &lt; 5 hoán đổi → <b>1 2 3 4 5</b>."},
  hd2a:{type:"mcq", label:"HĐ2 – Vòng lặp thứ nhất", q:"Năm bạn cầm các số 41, 15, 17, 32, 18. Bạn thứ sáu sắp xếp chọn theo thứ tự tăng dần. Kết quả sau vòng lặp thứ nhất là:",
    o:["15, 41, 17, 32, 18","15, 17, 18, 32, 41","41, 15, 17, 32, 18","15, 17, 41, 32, 18"], a:0,
    k:"Xét vị trí đầu (41): 15 &lt; 41 → hoán đổi (15 41 17 32 18); 17, 32, 18 đều không nhỏ hơn 15. Kết quả: <b>15, 41, 17, 32, 18</b>."},
  hd2:{type:"open", label:"HĐ2 – Sắp xếp chọn", q:"Ghi kết quả sau mỗi vòng lặp khi sắp xếp chọn dãy 41, 15, 17, 32, 18 theo thứ tự tăng dần. Có tất cả bao nhiêu lần hoán đổi?",
    k:"Vòng 1: 15 41 17 32 18. Vòng 2: 15 17 41 32 18. Vòng 3: 15 17 18 41 32. Vòng 4: <b>15 17 18 32 41</b>. Có <b>5</b> lần hoán đổi."},
  ss:{type:"sort", label:"Đọc hiểu – So sánh hai thuật toán", q:"Mỗi ý dưới đây đúng với thuật toán nào?",
    cats:["Nổi bọt","Chọn","Cả hai"],
    items:[["So sánh hai phần tử đứng cạnh nhau (liền kề)",0],["So sánh phần tử ở vị trí đang xét với từng phần tử phía sau nó",1],["Thực hiện nhiều lần một việc đơn giản: hoán đổi giá trị hai phần tử",2],["Sau vòng lặp thứ k, phần tử nhỏ thứ k ở đúng vị trí k",2],["Các cặp được so sánh theo thứ tự từ cuối dãy lên",0]],
    k:"Nổi bọt: so sánh <b>cặp liền kề</b>, từ cuối dãy lên. Chọn: so sánh <b>vị trí đang xét</b> với từng phần tử phía sau. Cả hai đều lặp lại việc <b>hoán đổi</b> và sau vòng k thì phần tử nhỏ thứ k về đúng chỗ."},
  chia:{type:"mcq", label:"Câu hỏi tr.82 – Chia bài toán", q:"Tại sao chúng ta chia bài toán thành những bài toán nhỏ hơn?",
    o:["Để thay đổi đầu vào của bài toán.","Để thay đổi yêu cầu đầu ra của bài toán.","Để bài toán dễ giải quyết hơn.","Để bài toán khó giải quyết hơn."], a:2,
    k:"<b>C</b>. Chia bài toán thành những bài toán nhỏ hơn giúp thuật toán <b>dễ hiểu</b> và <b>dễ thực hiện</b> hơn."},
  lt1:{type:"mcq", label:"Luyện tập – câu 1", q:"Sắp xếp nổi bọt dãy 3, 2, 4, 1, 5 theo thứ tự tăng dần. Kết quả sau vòng lặp thứ nhất và thứ hai lần lượt là:",
    o:["1, 3, 2, 4, 5 và 1, 2, 3, 4, 5","2, 3, 1, 4, 5 và 2, 1, 3, 4, 5","1, 2, 3, 4, 5 và 1, 2, 3, 4, 5","3, 2, 1, 4, 5 và 1, 2, 3, 4, 5"], a:0,
    k:"Vòng 1: 5 &lt; 1? Không; 1 &lt; 4 đổi; 1 &lt; 2 đổi; 1 &lt; 3 đổi → <b>1 3 2 4 5</b>. Vòng 2: 2 &lt; 3 đổi → <b>1 2 3 4 5</b>. Vòng 3, 4 không hoán đổi. Tổng 4 lần hoán đổi."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Sắp xếp chọn dãy 3, 2, 4, 1, 5 theo thứ tự tăng dần. Kết quả sau vòng lặp thứ nhất và thứ hai lần lượt là:",
    o:["1, 3, 4, 2, 5 và 1, 2, 4, 3, 5","1, 2, 4, 3, 5 và 1, 2, 3, 4, 5","2, 3, 4, 1, 5 và 1, 3, 4, 2, 5","1, 3, 2, 4, 5 và 1, 2, 3, 4, 5"], a:0,
    k:"Vòng 1 (vị trí 1 = 3): 2 &lt; 3 đổi → 2 3 4 1 5; 1 &lt; 2 đổi → <b>1 3 4 2 5</b>. Vòng 2 (vị trí 2 = 3): 2 &lt; 3 đổi → <b>1 2 4 3 5</b>. Vòng 3: 3 &lt; 4 đổi → 1 2 3 4 5. Vòng 4 không đổi."},
  vd1:{type:"open", label:"Vận dụng", q:"Ghi lại điểm học tập môn Tin học của các bạn trong tổ. Thực hiện sắp xếp chọn hoặc sắp xếp nổi bọt để sắp xếp điểm theo thứ tự giảm dần, rồi cho biết danh sách tên các bạn tương ứng.",
    k:"Sắp xếp <b>giảm dần</b> thì đổi điều kiện: hoán đổi khi phần tử được xét <b>lớn hơn</b>. Khi hoán đổi điểm phải đổi chỗ <b>cả tên</b> đi kèm, để mỗi điểm vẫn đúng với bạn của mình."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li><b>Sắp xếp nổi bọt</b> là thuật toán sắp xếp được thực hiện bằng cách <b>hoán đổi nhiều lần các phần tử liền kề</b> nếu giá trị của chúng không đúng thứ tự.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>Sắp xếp chọn</b> xét từng vị trí từ đầu đến cuối dãy, so sánh trực tiếp phần tử ở vị trí được xét với những phần tử ở phía sau nó và <b>hoán đổi</b> nếu chúng chưa đúng thứ tự.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li><b>Chia một bài toán thành những bài toán nhỏ hơn</b> giúp thuật toán dễ hiểu và dễ thực hiện hơn.</li><li>Ví dụ: sắp xếp = nhiều lần hoán đổi hai phần tử; tìm kiếm nhị phân = tìm trong nửa dãy.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li><b>Hoán đổi</b> hai giá trị cần một chỗ <b>giữ tạm</b> (cốc C): A → C, B → A, C → B.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Sắp xếp nổi bọt</p><ul>'
    + "<li>So sánh <b>hai phần tử cạnh nhau</b>, từ cuối dãy lên; sai thứ tự → <b>hoán đổi</b>.</li>"
    + "<li>Sau mỗi vòng lặp, phần tử nhỏ nhất còn lại <b>“nổi” lên</b> vị trí đang xét.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Sắp xếp chọn</p><ul>'
    + "<li>Xét từng vị trí; so sánh phần tử ở đó với <b>từng phần tử phía sau</b>; nhỏ hơn → <b>hoán đổi</b>.</li>"
    + "<li>Sau mỗi vòng lặp, phần tử nhỏ nhất còn lại được <b>đưa về</b> vị trí đang xét.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Chia bài toán thành những bài toán nhỏ hơn</p><ul>'
    + "<li>Chia nhỏ bài toán giúp thuật toán <b>dễ hiểu</b>, <b>dễ thực hiện</b> hơn.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Dãy 3, 2, 4, 1, 5: nổi bọt <b>1 3 2 4 5</b> → 1 2 3 4 5; chọn <b>1 3 4 2 5</b> → 1 2 4 3 5 → 1 2 3 4 5.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Giảm dần: hoán đổi khi phần tử sau <b>lớn hơn</b>; đổi chỗ <b>cả tên</b> đi kèm điểm.</li>"
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
    return ["T7B16." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Đúng ba bước, dùng cốc C giữ tạm."],
        fix:["Nếu rót thẳng A sang B thì chuyện gì xảy ra?"]},
  nb1: {ok:["Đúng thứ tự các bước."],
        fix:["Vòng lặp bắt đầu bằng việc so sánh hai phần tử cạnh nhau từ cuối dãy."]},
  hd1a:{ok:["Chính xác! Số 1 đã nổi lên đầu."],
        fix:["Chạy thử bằng chế độ “Em tự quyết định hoán đổi” trên bảng mô phỏng."]},
  hd1b:{ok:["Chính xác!"],
        fix:["Sau vòng 1, vị trí đầu đã đúng; vòng 2 chỉ xét từ vị trí 2."]},
  nb2: {ok:["Chính xác!"],
        fix:["Nổi bọt so sánh những phần tử nào với nhau?"]},
  ch1: {ok:["Xác định đúng các lần hoán đổi."],
        fix:["Sắp xếp chọn so sánh với phần tử ở vị trí đang xét, không phải phần tử liền kề."]},
  hd2a:{ok:["Chính xác!"],
        fix:["So sánh lần lượt 15, 17, 32, 18 với phần tử ở vị trí đầu."]},
  hd2: {ok:["Ghi đúng kết quả từng vòng lặp."],
        fix:["Kiểm tra lại bằng bảng mô phỏng sắp xếp chọn."]},
  ss:  {ok:["Phân biệt đúng hai thuật toán."],
        fix:["Nổi bọt: cặp liền kề. Chọn: vị trí đang xét với phần tử phía sau."]},
  chia:{ok:["Chính xác!"],
        fix:["Bài toán nhỏ hơn thì dễ hay khó giải quyết hơn?"]},
  lt1: {ok:["Chính xác!"],
        fix:["Nổi bọt so sánh từ cuối dãy lên đầu dãy."]},
  lt2: {ok:["Chính xác!"],
        fix:["Vòng 1 so sánh từng phần tử với phần tử ở vị trí 1 (số 3)."]},
  vd1: {ok:["Sắp xếp đúng, tên đi kèm điểm chính xác."],
        fix:["Khi đổi chỗ điểm, em có đổi chỗ tên của bạn không?"]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  ch1: "Sắp xếp chọn: so sánh với phần tử ở vị trí đang xét.",
  ss: "Nổi bọt so sánh cặp liền kề; chọn so sánh với vị trí đang xét."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Hoán đổi hai chất lỏng", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Sắp xếp nổi bọt", acts:[
    {title:"Đọc hiểu: Sắp xếp dãy 4, 2, 3, 1", tasks:["nb1"]},
    {title:"Hoạt động 1: Mô phỏng sắp xếp nổi bọt", tasks:["hd1a","hd1b"], concept:"c1"},
    {title:"Câu hỏi SGK trang 80", tasks:["nb2"]},
    {title:"Ghi bài: Sắp xếp nổi bọt", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Sắp xếp chọn", acts:[
    {title:"Đọc hiểu: Sắp xếp dãy 3, 4, 1, 5, 2", tasks:["ch1"], concept:"c2"},
    {title:"Hoạt động 2: Sắp xếp chọn", tasks:["hd2a","hd2"]},
    {title:"Ghi bài: Sắp xếp chọn", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Hình thành kiến thức mới", title:"Chia bài toán", acts:[
    {title:"Đọc hiểu: So sánh hai thuật toán", tasks:["ss"]},
    {title:"Câu hỏi SGK trang 82", tasks:["chia"], concept:"c3"},
    {title:"Ghi bài: Chia bài toán", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Sắp xếp dãy 3, 2, 4, 1, 5", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Sắp xếp điểm của tổ", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai16", title: "Bài 16. Thuật toán sắp xếp", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 hoán đổi sai ở vòng lặp thứ hai vì…",
  commentPh: "Ví dụ: Nhóm mô phỏng đúng; cần nhớ nổi bọt so sánh cặp liền kề từ cuối dãy."};
})();
