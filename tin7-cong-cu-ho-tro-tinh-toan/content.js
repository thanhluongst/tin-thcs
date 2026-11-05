/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Phần mềm bảng tính có rất nhiều hàm có sẵn hỗ trợ tính toán, ví dụ hàm tính tổng, hàm đếm, hàm tính giá trị trung bình,… Trong dự án Trường học xanh có cần dùng các hàm này để tính toán không? Em dự đoán sẽ cần tính những gì?",
    k:"<b>Có.</b> Ví dụ: tính <b>tổng</b> số cây mỗi lớp trồng, số cây <b>trung bình</b>, lớp trồng <b>nhiều nhất, ít nhất</b>, <b>đếm</b> số lớp trồng một loại cây,…"},
  hd1:{type:"open", label:"HĐ1 – Hàm trong bảng tính", q:"Quan sát công thức là hàm trong Hình 8.1 và Hình 8.2 (chú ý vùng nhập dữ liệu) và trả lời: 1. Tên của hàm là gì? 2. Ý nghĩa của hàm là gì? 3. Hàm có bao nhiêu tham số, các tham số của hàm là gì?",
    k:"Hình 8.1: hàm <b>SUM</b>, tính <b>tổng</b>; 1 tham số là vùng <b>B5:D7</b> → 24. Hình 8.2: hàm <b>AVERAGE</b>, tính <b>trung bình cộng</b>; 1 tham số là vùng <b>B5:C7</b> → 5."},
  cuphap:{type:"mcq", label:"Đọc hiểu – Cách sử dụng hàm", q:"Cách viết nào dưới đây đúng cú pháp nhập hàm tính tổng vùng B5:D7?",
    o:["SUM(B5:D7)","=SUM B5:D7","=SUM(B5:D7)","=(B5:D7)SUM"], a:2,
    k:"<b>=SUM(B5:D7)</b>. Cú pháp: <b>= &lt;tên hàm&gt;(&lt;các tham số&gt;)</b>. Các tham số cách nhau bởi dấu “,” hoặc “;”."},
  hd2:{type:"open", label:"HĐ2 – Nhập hàm", q:"Theo em, nhập hàm vào bảng tính có giống như nhập dữ liệu thông thường không? Hãy nêu các bước nhập hàm tính tổng số cây hoa của lớp 7A vào ô C9.",
    k:"Nhập hàm <b>giống nhập công thức</b>: Bước 1. Nháy chuột vào ô C9 (hoặc vùng nhập dữ liệu). Bước 2. Gõ <b>=SUM(</b>, dùng chuột đánh dấu vùng <b>C4:C8</b>, gõ “)”, nhấn <b>Enter</b>."},
  saochep:{type:"mcq", label:"HĐ2 – Sao chép hàm", q:"Sao chép công thức =SUM(C4:C8) từ ô C9 sang các ô từ D9 đến I9. Công thức tại ô I9 là:",
    o:["=SUM(C4:C8)","=SUM(I4:I8)","=SUM(C9:I9)","=SUM(I9:I13)"], a:1,
    k:"<b>=SUM(I4:I8)</b>: sao chép sang phải 6 cột nên địa chỉ cột trong tham số cũng dịch 6 cột."},
  p41a:{type:"open", label:"Câu hỏi tr.41 – câu 1", q:"Hàm được nhập như thế nào?",
    k:"Giống nhập công thức: <b>= &lt;tên hàm&gt;(&lt;các tham số&gt;)</b>, nhấn Enter. Cần nhập chính xác tên hàm và tham số; tên hàm viết hoa hoặc thường đều được; có thể dùng chuột chọn ô, vùng làm tham số."},
  p41b:{type:"mcq", label:"Câu hỏi tr.41 – câu 2", q:"Các tham số của hàm có thể là địa chỉ ô hoặc vùng dữ liệu không?",
    o:["Có. Tham số có thể là số, địa chỉ ô, địa chỉ vùng dữ liệu.","Không. Tham số chỉ có thể là số."], a:0,
    k:"<b>Có.</b> Ví dụ =SUM(D4:H4,15,K10): tham số là vùng D4:H4, số 15 và ô K10."},
  hd3:{type:"open", label:"HĐ3 – Một số hàm đơn giản", q:"Em hãy xem lại dữ liệu của dự án Trường học xanh và cho biết em cần tính toán những gì? Các yêu cầu tính toán đó có thể diễn tả bằng các hàm như thế nào?",
    k:"Ví dụ: tổng số cây mỗi lớp → <b>SUM</b>; trung bình mỗi lớp trồng bao nhiêu cây → <b>AVERAGE</b>; lớp trồng nhiều nhất, ít nhất → <b>MAX, MIN</b>; bao nhiêu lớp trồng một loại cây → <b>COUNT</b>."},
  yn:{type:"sort", label:"Đọc hiểu – Ý nghĩa các hàm (Bảng 8.2)", q:"Đọc Bảng 8.2. Mỗi ý nghĩa dưới đây là của hàm nào?",
    cats:["SUM","AVERAGE","MIN","MAX","COUNT"],
    items:[["Tính tổng các giá trị số",0],["Tính trung bình cộng các giá trị số",1],["Tìm giá trị nhỏ nhất",2],["Tìm giá trị lớn nhất",3],["Đếm số các giá trị là số",4]],
    k:"<b>SUM</b> tổng, <b>AVERAGE</b> trung bình cộng, <b>MIN</b> nhỏ nhất, <b>MAX</b> lớn nhất, <b>COUNT</b> đếm số các giá trị là số. Các hàm chỉ xử lí dữ liệu số, <b>bỏ qua</b> ô chứa văn bản hoặc ô trống."},
  b81:{type:"sort", label:"HĐ3 – Bảng 8.1: Kết quả", q:"Nhập các công thức của Bảng 8.1 vào K4:K8 trên bảng mô phỏng. Mỗi yêu cầu tính toán dưới đây có kết quả bao nhiêu?",
    cats:["13.6667","16","10","4","3"],
    items:[["Trung bình mỗi lớp sẽ trồng bao nhiêu cây? =AVERAGE(C4:I8)",0],["Số cây hoa Dừa cạn lớn nhất một lớp sẽ trồng? =MAX(C6:I6)",1],["Số cây hoa Mười giờ ít nhất một lớp sẽ trồng? =MIN(C4:I4)",2],["Bao nhiêu lớp sẽ trồng hoa Hồng? =COUNT(C8:I8)",3],["Lớp 7B sẽ trồng bao nhiêu loại hoa? =COUNT(D4:D8)",4]],
    k:"=AVERAGE(C4:I8) = <b>13.6667</b> (287 cây : 21 ô có số); =MAX(C6:I6) = <b>16</b>; =MIN(C4:I4) = <b>10</b>; =COUNT(C8:I8) = <b>4</b>; =COUNT(D4:D8) = <b>3</b>."},
  p42:{type:"open", label:"Câu hỏi tr.42", q:"Mỗi hàm sau cho kết quả như thế nào? a) SUM(1,3,“Hà Nội”,“Zero”,5); b) MIN(3,5,“One”,1); c) COUNT(1,3,5,7). (Có thể nhập thử vào bảng mô phỏng.)",
    k:"Theo lưu ý của SGK (hàm chỉ xử lí giá trị số, bỏ qua văn bản): a) <b>9</b>; b) <b>1</b>; c) <b>4</b>. Lưu ý: trong Excel, Google Sheets, nếu gõ <b>trực tiếp văn bản</b> làm tham số của SUM, MIN thì máy báo lỗi <b>#VALUE!</b> (bảng mô phỏng cũng vậy); còn văn bản nằm <b>trong ô</b> của vùng tham số thì được bỏ qua. COUNT luôn bỏ qua văn bản."},
  nv1:{type:"order", label:"Thực hành – Các bước", q:"Sắp xếp các bước thực hành (dùng nút ↑ ↓).",
    items:{a:"Chèn hai hàng trống trên hàng 9 và trên hàng có STT 12.",b:"Tạo trang tính 4. Dự kiến kết quả, nhập và sao chép dữ liệu.",c:"Định dạng và lưu kết quả.",d:"Tính tổng số cây các loại mỗi lớp (hàng 25), cột Tổng số cây, Trung bình.",e:"Tính tổng số cây mỗi loại mỗi lớp (D9, D17, D24 và sao chép sang phải)."},
    start:["a","b","c","d","e"], ans:["b","a","e","d","c"],
    k:"Thứ tự: <b>b → a → e → d → c</b>."},
  nv2:{type:"mcq", label:"Thực hành – Tổng theo lớp", q:"Tại ô D25, công thức tính tổng số cây đã trồng của lớp 7A là:",
    o:["=SUM(D4:D24)","=D9+D17+D24","=D9+D17","=SUM(D9:J9)"], a:1,
    k:"<b>=D9+D17+D24</b>: cộng ba tổng cây hoa, cây ăn quả, cây bóng mát. (=SUM(D4:D24) sẽ cộng cả các hàng tổng nên bị gấp đôi.)"},
  nvkq:{type:"open", label:"Thực hành – Kết quả", q:"Báo cáo kết quả: tổng số cây dự kiến của cả khối là bao nhiêu? Lớp nào trồng nhiều cây nhất? Trung bình mỗi lớp trồng bao nhiêu cây?",
    k:"Tổng cả khối <b>623</b> cây (K25). Lớp <b>7C</b> nhiều nhất: <b>104</b> cây. Trung bình mỗi lớp <b>89</b> cây (L25)."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Tại các ô K9, K17, K24 trong trang tính 4. Dự kiến kết quả có thể dùng công thức khác được không? Nếu có thì dùng công thức gì? Từ đó em rút ra điều gì?",
    k:"<b>Có.</b> K9 có thể dùng <b>=SUM(D9:J9)</b> (cộng hàng tổng) hoặc <b>=SUM(K4:K8)</b> (cộng cột tổng) — đều bằng 287. Tương tự K17, K24. Rút ra: tổng theo hàng của các tổng cột bằng tổng theo cột của các tổng hàng; có nhiều cách viết công thức cho cùng một kết quả."},
  lt2:{type:"mcq", label:"Luyện tập – câu 2", q:"Các công thức sau có cho kết quả giống nhau không? a) =SUM(C3:K3); b) =C3 + SUM(D3:J3) + K3; c) =SUM(C3:G3) + SUM(H3:K3)",
    o:["Giống nhau: đều là tổng các ô từ C3 đến K3.","Khác nhau hoàn toàn.","Chỉ a và b giống nhau.","Chỉ a và c giống nhau."], a:0,
    k:"<b>Giống nhau</b>: cả ba đều cộng các ô C3, D3,…, K3, chỉ chia vùng theo cách khác nhau."},
  lt3:{type:"open", label:"Luyện tập – câu 3", q:"Dựa trên dữ liệu của Bảng 4. Dự kiến phân bổ cây cho các lớp, em hãy: a) Tìm số cây lớn nhất sẽ được trồng của các lớp. b) Tính số cây trung bình sẽ được trồng của các lớp. Ghi công thức và kết quả.",
    k:"a) <b>=MAX(D25:J25)</b> → 104 (lớp 7C). b) <b>=AVERAGE(D25:J25)</b> → 89."},
  vd1:{type:"open", label:"Vận dụng", q:"Tạo bảng tính ghi lại các khoản chi tiêu của gia đình em trong một tháng. Sử dụng các hàm để trả lời: a) Tổng số tiền chi tiêu một tháng? b) Khoản chi nhiều nhất, ít nhất? c) Có bao nhiêu khoản đã chi? d) Trung bình mỗi ngày chi bao nhiêu tiền? Ghi các công thức em đã dùng.",
    k:"Nếu số tiền ở B2:B11: a) <b>=SUM(B2:B11)</b>; b) <b>=MAX(B2:B11)</b>, <b>=MIN(B2:B11)</b>; c) <b>=COUNT(B2:B11)</b>; d) <b>=SUM(B2:B11)/30</b> (tháng 30 ngày). Chia sẻ với bố mẹ để cân đối chi tiêu hợp lí."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Cách nhập hàm tương tự như cách nhập công thức. Cú pháp nhập hàm: <b>= &lt;tên hàm&gt;(&lt;các tham số&gt;)</b>.</li><li>Cần nhập chính xác tên của hàm và các tham số của hàm. Khi nhập thông tin vùng dữ liệu trong tham số của hàm có thể dùng chuột chọn các ô hoặc vùng này. Tên hàm có thể dùng chữ in hoa hoặc in thường.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li><b>SUM</b>: tổng; <b>AVERAGE</b>: trung bình cộng; <b>MIN</b>: nhỏ nhất; <b>MAX</b>: lớn nhất; <b>COUNT</b>: đếm số các giá trị là số.</li><li>Các hàm chỉ xử lí các ô có dữ liệu số, <b>bỏ qua</b> các ô chứa văn bản hoặc ô trống.</li><li>Bảng tính thường dùng dấu chấm “.” ngăn cách phần nguyên và phần thập phân, dấu phẩy “,” ngăn cách hàng nghìn, hàng triệu.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Chèn hàng: chọn hàng, nháy nút phải chuột, chọn <b>Insert</b>.</li><li>Tổng mỗi loại: <b>=SUM(D4:D8)</b> rồi sao chép sang phải; tổng cả hàng: <b>=SUM(D4:J4)</b>; trung bình: <b>=AVERAGE(D4:J4)</b>.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li><b>Hàm</b> = công thức có sẵn giúp tính toán nhanh.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Hàm trong bảng tính</p><ul>'
    + "<li>Cú pháp: <b>= tên hàm(các tham số)</b>. VD: =SUM(B5:D7).</li>"
    + "<li>Tham số: <b>số, địa chỉ ô, vùng</b>; cách nhau bởi dấu <b>,</b> hoặc <b>;</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Một số hàm đơn giản</p><ul>'
    + "<li><b>SUM</b> tổng, <b>AVERAGE</b> trung bình, <b>MIN</b> nhỏ nhất, <b>MAX</b> lớn nhất, <b>COUNT</b> đếm số.</li>"
    + "<li>Hàm <b>bỏ qua</b> ô chứa văn bản, ô trống.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">3. Thực hành</p><ul>'
    + "<li>Chèn hàng: nháy phải → <b>Insert</b>.</li>"
    + "<li>Tổng hàng: <b>=SUM(D4:J4)</b>; trung bình: <b>=AVERAGE(D4:J4)</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Nhiều công thức khác nhau có thể cho <b>cùng kết quả</b>.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Dùng hàm tính <b>tổng, lớn nhất, nhỏ nhất, đếm, trung bình</b> chi tiêu.</li>"
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
    return ["T7B8." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Dự đoán hợp lí."],
        fix:["Dự án cần tính tổng, trung bình… những gì?"]},
  hd1: {ok:["Nêu đúng tên, ý nghĩa, tham số."],
        fix:["Nhìn vùng nhập dữ liệu: chữ trước dấu ( là tên hàm, trong ngoặc là tham số."]},
  cuphap:{ok:["Chính xác!"],
        fix:["Hàm bắt đầu bằng dấu gì? Tham số đặt trong dấu gì?"]},
  hd2: {ok:["Nêu đúng các bước nhập hàm."],
        fix:["Nhập hàm giống nhập công thức: bắt đầu bằng dấu =."]},
  saochep:{ok:["Chính xác! =SUM(I4:I8)."],
        fix:["Sao chép sang phải thì chữ cái tên cột thay đổi thế nào?"]},
  p41a:{ok:["Đúng cú pháp."],
        fix:["Em nhắc lại cú pháp: = tên hàm(các tham số)."]},
  p41b:{ok:["Chính xác!"],
        fix:["Nhìn Hình 8.1: tham số B5:D7 là gì?"]},
  hd3: {ok:["Nêu được yêu cầu và hàm phù hợp."],
        fix:["Lớn nhất, nhỏ nhất, đếm… dùng hàm nào?"]},
  yn:  {ok:["Nhớ đúng ý nghĩa các hàm."],
        fix:["Xem lại cột Ý nghĩa của Bảng 8.2."]},
  b81: {ok:["Kết quả chính xác."],
        fix:["Nhập từng công thức vào bảng mô phỏng để kiểm tra."]},
  p42: {ok:["Em hiểu cách hàm xử lí văn bản."],
        fix:["Hàm có tính các giá trị là văn bản không?"]},
  nv1: {ok:["Đúng thứ tự."],
        fix:["Phải nhập dữ liệu trước, chèn hàng rồi mới tính tổng."]},
  nv2: {ok:["Chính xác!"],
        fix:["SUM(D4:D24) có cộng cả hàng 9, 17 không?"]},
  nvkq:{ok:["Kết quả chính xác."],
        fix:["Em kiểm tra lại hàng 25 và cột K, L."]},
  lt1: {ok:["Đúng! Có nhiều cách viết."],
        fix:["K9 có thể cộng theo hàng 9 hoặc cộng cột K từ K4 đến K8."]},
  lt2: {ok:["Chính xác! Giống nhau."],
        fix:["Các công thức cùng cộng những ô nào?"]},
  lt3: {ok:["Dùng đúng hàm MAX, AVERAGE."],
        fix:["Số cây của các lớp nằm ở hàng 25."]},
  vd1: {ok:["Bảng chi tiêu rõ ràng, dùng đúng hàm."],
        fix:["Em ghi rõ công thức cho từng câu hỏi a, b, c, d."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  yn: "Xem lại Bảng 8.2.",
  b81: "Nhập công thức vào bảng mô phỏng để kiểm tra."
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
const STAGES = [
  {id:"mo-dau", code:"1", step:"Bước 1", title:"Khởi động", acts:[
    {title:"Hàm hỗ trợ tính toán", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Hàm trong bảng tính", acts:[
    {title:"Hoạt động 1: Hàm trong bảng tính", tasks:["hd1","cuphap"]},
    {title:"Hoạt động 2: Nhập hàm", tasks:["hd2","saochep"], concept:"c1"},
    {title:"Câu hỏi SGK trang 41", tasks:["p41a","p41b"]},
    {title:"Ghi bài: Hàm trong bảng tính", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Một số hàm đơn giản", acts:[
    {title:"Hoạt động 3: Làm quen với một số hàm", tasks:["hd3","b81"]},
    {title:"Đọc hiểu: Cú pháp một số hàm", tasks:["yn","p42"], concept:"c2"},
    {title:"Ghi bài: Một số hàm đơn giản", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"Thực hành", acts:[
    {title:"Tính toán trên dữ liệu trồng cây", tasks:["nv1","nv2","nvkq"], concept:"c3"},
    {title:"Ghi bài: Thực hành", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Câu hỏi luyện tập", tasks:["lt1","lt2","lt3"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Chi tiêu của gia đình", tasks:["vd1"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin7-bai8", title: "Bài 8. Công cụ hỗ trợ tính toán", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 nhập =SUM(D4:D24) ở D25 nên kết quả bị gấp đôi…",
  commentPh: "Ví dụ: Nhóm dùng đúng hàm; cần nhớ hàm bỏ qua ô văn bản."};
})();
