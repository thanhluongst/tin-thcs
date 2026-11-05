/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Mở đầu", q:"Em đã từng dùng phần mềm mô phỏng (thí nghiệm ảo) nào trong học tập? Phần mềm đó giúp em khám phá được điều gì?",
    k:"Ví dụ: <b>PhET</b> mô phỏng mạch điện, chuyển hoá năng lượng; <b>GeoGebra</b> vẽ và đo hình; phần mềm mô phỏng hệ Mặt Trời,… Phần mềm mô phỏng trình bày hiện tượng bằng hình ảnh động, cho em <b>tương tác, khám phá</b>, bổ sung kiến thức về khoa học, toán học và học cách giải quyết vấn đề."},
  nl1:{type:"open", label:"NV1 – Dạng năng lượng", q:"Mở mô phỏng “Năng lượng: các dạng và sự chuyển hoá” trên PhET. Em quan sát được những dạng năng lượng nào?",
    k:"Các dạng năng lượng (biểu tượng trong phần mềm): <b>cơ năng</b>, <b>điện năng</b>, <b>nhiệt năng</b>, <b>quang năng</b> (năng lượng ánh sáng), <b>hoá năng</b>."},
  nl2:{type:"match", label:"NV1 – Chuyển hoá năng lượng", ph:"Chọn…",
    q:"Tương tác với phần mềm (đổi nguồn năng lượng, thiết bị chuyển hoá, thiết bị tiêu thụ). Ghép mỗi tình huống với sự chuyển hoá năng lượng chính.",
    opts:["a) Hoá năng → cơ năng","b) Quang năng → điện năng","c) Cơ năng → điện năng","d) Điện năng → quang năng và nhiệt năng","e) Điện năng → nhiệt năng","f) Điện năng → cơ năng"],
    items:[["1) Người đạp xe làm quay bánh xe",1],["2) Ánh sáng mặt trời chiếu vào pin mặt trời",2],["3) Vòi nước chảy làm quay máy phát điện",3],["4) Bóng đèn sợi đốt sáng",4],["5) Bếp điện đun nóng nước",5],["6) Quạt điện quay",6]],
    k:"1 – a, 2 – b, 3 – c, 4 – d, 5 – e, 6 – f. Năng lượng không tự mất đi mà <b>chuyển hoá</b> từ dạng này sang dạng khác."},
  nl3:{type:"open", label:"NV1 – Một tình huống", q:"Nêu một tình huống năng lượng được chuyển hoá từ dạng này sang dạng khác mà em đã tạo ra trong phần mềm.",
    k:"Ví dụ: người đạp xe (<b>hoá năng → cơ năng</b>) làm quay máy phát điện (<b>cơ năng → điện năng</b>), điện chạy tới bóng đèn sợi đốt (<b>điện năng → quang năng + nhiệt năng</b>)."},
  am1:{type:"mcq", label:"NV2 – Thiết bị đo", q:"Em cần dùng thiết bị nào để đo cường độ dòng điện trên mạch điện?",
    o:["Vôn kế.","Ampe kế.","Công tắc.","Điện trở."], a:1,
    k:"Dùng <b>ampe kế</b> để đo cường độ dòng điện (đơn vị ampe, A). Vôn kế dùng để đo điện áp (hiệu điện thế)."},
  am2:{type:"mcq", label:"NV2 – Cách mắc", q:"Ampe kế được nối song song hay nối tiếp với đoạn mạch điện cần đo?",
    o:["Nối song song.","Nối tiếp.","Nối thế nào cũng được.","Nối trực tiếp vào hai cực của nguồn điện."], a:1,
    k:"Ampe kế mắc <b>nối tiếp</b> với đoạn mạch cần đo, để dòng điện chạy qua đoạn mạch cũng chạy qua ampe kế (Hình 6.5a)."},
  am3:{type:"mcq", label:"NV2 – Sự cố", q:"Ở Hình 6.5b, ampe kế được mắc trực tiếp vào hai cực của nguồn điện. Điều gì xảy ra?",
    o:["Đèn sáng hơn.","Không có gì xảy ra.","Dòng điện rất lớn (đoản mạch), gây cháy, hỏng thiết bị.","Ampe kế chỉ số 0."], a:2,
    k:"Ampe kế có điện trở rất nhỏ. Mắc trực tiếp vào hai cực nguồn là <b>đoản mạch</b>: dòng điện rất lớn (ampe kế chỉ hàng chục nghìn ampe), gây <b>cháy</b>. Trong phần mềm mô phỏng, em thấy được sự cố này mà <b>không nguy hiểm</b>."},
  am4:{type:"open", label:"NV2 – Trình bày giải pháp", q:"Trình bày giải pháp đo cường độ dòng điện đi qua một bóng đèn bằng phần mềm thí nghiệm ảo lắp ráp mạch điện một chiều.",
    k:"<ol><li>Mở PhET → Các mô phỏng → Vật lý → <b>Bộ lắp ráp mạch điện: DC – Phòng thí nghiệm ảo</b>.</li><li>Kéo pin, đèn tròn, ampe kế, công tắc, dây nối vào vùng hiển thị.</li><li>Nối pin, công tắc, bóng đèn và <b>ampe kế thành một mạch nối tiếp</b>; không nối ampe kế trực tiếp vào hai cực pin.</li><li>Đóng công tắc, đọc số chỉ trên ampe kế (ví dụ 0,90 A).</li></ol>"},
  tv1:{type:"open", label:"NV3 – Đo độ dài", q:"Đo độ dài các đoạn thẳng AB, BC, AC, AD trên ngôi sao năm cánh (dùng Geometer's Sketchpad, GeoGebra hoặc ngôi sao mô phỏng ở trên). Ghi lại kết quả.",
    k:"Ví dụ (Hình 6.6): AB = 2,52 cm; BC = 1,56 cm; AC = 4,07 cm; AD = 6,59 cm. Kết quả của em có thể khác tuỳ kích thước ngôi sao."},
  tv2:{type:"mcq", label:"NV3 – Tỉ lệ", q:"Với số đo ở Hình 6.6, các tỉ lệ AB/BC, AC/AB, AD/AC xấp xỉ bằng bao nhiêu?",
    o:["1,41","1,62","2","3,14"], a:1,
    k:"AB/BC = 2,52 : 1,56 ≈ 1,62; AC/AB = 4,07 : 2,52 ≈ 1,62; AD/AC = 6,59 : 4,07 ≈ 1,62. Các tỉ lệ này <b>bằng nhau</b> và xấp xỉ <b>1,62</b>."},
  tv3:{type:"mcq", label:"NV3 – Khám phá", q:"Khi thay đổi kích thước ngôi sao (kéo điểm P hoặc Q), điều gì xảy ra với các tỉ lệ AB/BC, AC/AB, AD/AC?",
    o:["Các tỉ lệ tăng lên khi ngôi sao to ra.","Các tỉ lệ giảm đi khi ngôi sao to ra.","Độ dài thay đổi nhưng các tỉ lệ không đổi, luôn bằng (1 + √5)/2 ≈ 1,618034.","Các tỉ lệ thay đổi ngẫu nhiên."], a:2,
    k:"Độ dài các đoạn thẳng thay đổi nhưng các tỉ lệ <b>không thay đổi</b>, luôn bằng nhau: (1 + √5)/2 ≈ <b>1,618034</b>. Tỉ lệ này gọi là <b>tỉ lệ vàng</b>."},
  tv4:{type:"open", label:"NV3 – Hình chữ nhật vàng", q:"Thế nào là hình chữ nhật tỉ lệ vàng? Kể một ví dụ em biết về tỉ lệ vàng trong thực tế.",
    k:"Hình chữ nhật có tỉ lệ hai cạnh là tỉ lệ vàng: cắt bỏ một hình vuông thì phần còn lại vẫn là hình chữ nhật có tỉ lệ hai cạnh là tỉ lệ vàng (Hình 6.8b). Ví dụ trong thực tế: kiến trúc (đền Parthenon), hội hoạ, thiết kế logo, cách sắp xếp hạt hoa hướng dương, vỏ ốc anh vũ,…"},
  lt1:{type:"mcq", label:"Luyện tập – Vôn kế", q:"Để đo điện áp giữa hai đầu một điện trở, em dùng vôn kế và mắc như thế nào?",
    o:["Mắc vôn kế nối tiếp với điện trở.","Mắc vôn kế song song với điện trở (hai đầu vôn kế nối vào hai đầu điện trở).","Mắc vôn kế vào hai cực của ampe kế.","Không cần mắc, chỉ cần đặt cạnh điện trở."], a:1,
    k:"Vôn kế mắc <b>song song</b> với đoạn mạch cần đo: hai đầu vôn kế nối vào hai đầu điện trở."},
  lt2:{type:"open", label:"Luyện tập – Giải pháp", q:"Em hãy nêu giải pháp đo điện áp giữa hai đầu một điện trở bằng cách sử dụng phần mềm mô phỏng.",
    k:"<ol><li>Mở PhET → Vật lý → Bộ lắp ráp mạch điện: DC – Phòng thí nghiệm ảo.</li><li>Lắp mạch: pin, công tắc, điện trở, dây nối.</li><li>Kéo <b>vôn kế</b> vào, đặt <b>hai đầu đo của vôn kế vào hai đầu điện trở</b> (mắc song song).</li><li>Đóng công tắc, đọc số chỉ của vôn kế (đơn vị vôn, V).</li></ol>"},
  vd1:{type:"sort", label:"Vận dụng – Thử nghiệm",
    q:"Lắp mạch gồm nguồn điện, công tắc, điện trở, ampe kế, vôn kế. Thay đổi trị số các linh kiện và quan sát: cường độ dòng điện I tăng hay giảm?",
    cats:["I tăng","I giảm"],
    items:[["Giữ nguyên điện trở, tăng điện áp nguồn",0],["Giữ nguyên điện áp, tăng điện trở",1],["Giữ nguyên điện trở, giảm điện áp nguồn",1],["Giữ nguyên điện áp, giảm điện trở",0]],
    k:"Cường độ dòng điện <b>tăng khi điện áp tăng</b>, <b>giảm khi điện trở tăng</b>."},
  vd2:{type:"open", label:"Vận dụng – Quy luật", q:"Từ các thử nghiệm, em hãy phát biểu quy luật phụ thuộc lẫn nhau giữa điện trở, cường độ dòng điện qua nó và điện áp giữa hai đầu điện trở đó.",
    k:"Cường độ dòng điện chạy qua điện trở <b>tỉ lệ thuận</b> với điện áp giữa hai đầu điện trở và <b>tỉ lệ nghịch</b> với điện trở: <b>I = U / R</b> (định luật Ohm). Ví dụ: U = 9 V, R = 10 Ω thì I = 0,9 A."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Phần mềm mô phỏng cho em <b>quan sát</b> sự chuyển hoá giữa các dạng năng lượng và <b>tương tác</b>: thay đổi nguồn năng lượng, thiết bị chuyển hoá, thiết bị tiêu thụ.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Ampe kế đo cường độ dòng điện, mắc <b>nối tiếp</b> với đoạn mạch cần đo, không mắc trực tiếp vào hai cực của nguồn điện.</li><li>Thí nghiệm ảo giúp thấy được cả những sự cố nguy hiểm mà <b>không gây nguy hiểm</b> thật.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Trong ngôi sao năm cánh đều: AB/BC = AC/AB = AD/AC = (1 + √5)/2 ≈ 1,618034, gọi là <b>tỉ lệ vàng</b>.</li><li>Nhờ máy tính, phần mềm mô phỏng giúp con người <b>khám phá tri thức</b> và giải quyết vấn đề.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Mở đầu</p><ul>'
    + "<li>Thí nghiệm ảo giúp <b>quan sát, tương tác, khám phá</b> kiến thức mới.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 1. Chuyển hoá năng lượng</p><ul>'
    + "<li>Các dạng năng lượng: <b>cơ, điện, nhiệt, quang, hoá năng</b>.</li>"
    + "<li>VD: đạp xe → máy phát điện → bóng đèn: hoá năng → cơ năng → điện năng → quang năng, nhiệt năng.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 2. Đo cường độ dòng điện</p><ul>'
    + "<li>Dùng <b>ampe kế</b>, mắc <b>nối tiếp</b> với đoạn mạch cần đo.</li>"
    + "<li>Không mắc ampe kế thẳng vào hai cực nguồn → <b>đoản mạch, cháy</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Nhiệm vụ 3. Tỉ lệ vàng</p><ul>'
    + "<li>Ngôi sao năm cánh: AB/BC = AC/AB = AD/AC ≈ <b>1,618</b> = <b>tỉ lệ vàng</b>.</li>"
    + "<li>Ngôi sao to hay nhỏ, tỉ lệ <b>không đổi</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Đo điện áp: dùng <b>vôn kế</b>, mắc <b>song song</b> với điện trở.</li>"
    + "</ul>"},
  g6:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li><b>I = U / R</b>: U tăng → I tăng; R tăng → I giảm.</li>"
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
    return ["T9B6." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  kd1: {ok:["Em kể được phần mềm cụ thể và điều khám phá được."],
        fix:["Em nêu tên phần mềm và nó giúp em hiểu điều gì."]},
  nl1: {ok:["Em nêu đủ các dạng năng lượng."],
        fix:["Em xem lại biểu tượng năng lượng trong phần mềm: còn dạng nào em chưa kể?"]},
  nl2: {ok:["Nhóm ghép đúng tất cả sự chuyển hoá."],
        fix:["Em tự hỏi: năng lượng vào thiết bị là dạng gì, đi ra là dạng gì?"]},
  nl3: {ok:["Tình huống rõ ràng, nêu đúng các bước chuyển hoá."],
        fix:["Em ghi rõ: dạng năng lượng nào → dạng năng lượng nào."]},
  am1: {ok:["Chính xác! Ampe kế đo cường độ dòng điện."],
        fix:["Vôn kế đo điện áp. Thiết bị nào đo cường độ dòng điện?"]},
  am2: {ok:["Đúng! Ampe kế mắc nối tiếp."],
        fix:["Muốn đo dòng điện chạy qua bóng đèn, dòng điện đó phải đi qua ampe kế. Vậy mắc thế nào?"]},
  am3: {ok:["Chính xác! Đó là đoản mạch, rất nguy hiểm."],
        fix:["Em quan sát lại Hình 6.5b: ngọn lửa cho biết điều gì?"]},
  am4: {ok:["Giải pháp đầy đủ các bước, mắc đúng ampe kế nối tiếp."],
        fix:["Em nêu rõ cách mắc ampe kế trong mạch.","Em bổ sung các bước mở phần mềm và lắp mạch."]},
  tv1: {ok:["Em đo và ghi đủ bốn đoạn thẳng."],
        fix:["Em ghi đủ độ dài AB, BC, AC, AD nhé."]},
  tv2: {ok:["Chính xác! Các tỉ lệ đều xấp xỉ 1,62."],
        fix:["Em dùng máy tính chia: 2,52 : 1,56 = ?"]},
  tv3: {ok:["Đúng! Tỉ lệ không đổi, đó là tỉ lệ vàng."],
        fix:["Em kéo thay đổi kích thước ngôi sao rồi quan sát lại các tỉ lệ."]},
  tv4: {ok:["Em giải thích đúng và có ví dụ hay."],
        fix:["Em đọc lại SGK trang 26 về hình chữ nhật tỉ lệ vàng và nêu thêm ví dụ."]},
  lt1: {ok:["Chính xác! Vôn kế mắc song song."],
        fix:["Vôn kế đo điện áp giữa hai đầu điện trở, vậy hai đầu vôn kế phải nối vào đâu?"]},
  lt2: {ok:["Giải pháp đầy đủ, đúng cách mắc vôn kế."],
        fix:["Em nêu rõ cách mắc vôn kế và cách đọc kết quả."]},
  vd1: {ok:["Nhóm quan sát đúng sự thay đổi của dòng điện."],
        fix:["Em thử lại trong phần mềm: giữ một đại lượng, thay đổi đại lượng kia rồi quan sát ampe kế."]},
  vd2: {ok:["Em phát biểu đúng quy luật I = U/R."],
        fix:["Khi U tăng thì I thế nào? Khi R tăng thì I thế nào? Em viết thành quy luật."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  vd1: "Em thử lại trên phần mềm và quan sát số chỉ của ampe kế."
};
const MATCH_HINT = {
  nl2: "Gợi ý: năng lượng đi vào thiết bị là dạng gì, đi ra là dạng gì?"
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
    {title:"Thí nghiệm ảo", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Thực hành", title:"NV1: Chuyển hoá năng lượng", acts:[
    {title:"Quan sát các dạng năng lượng", tasks:["nl1"]},
    {title:"Tương tác với phần mềm", tasks:["nl2","nl3"], concept:"c1"},
    {title:"Ghi bài: Nhiệm vụ 1", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Thực hành", title:"NV2: Đo cường độ dòng điện", acts:[
    {title:"Vẽ mạch điện", tasks:["am1","am2","am3"]},
    {title:"Trình bày giải pháp", tasks:["am4"], concept:"c2"},
    {title:"Ghi bài: Nhiệm vụ 2", tasks:[], concept:"g3", ghi:true}]},
  {id:"phan-3", code:"2.3", step:"Bước 2 · Thực hành", title:"NV3: Tỉ lệ vàng", acts:[
    {title:"Đo độ dài và tính tỉ lệ", tasks:["tv1","tv2"]},
    {title:"Khám phá tri thức", tasks:["tv3","tv4"], concept:"c3"},
    {title:"Ghi bài: Nhiệm vụ 3", tasks:[], concept:"g4", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Đo điện áp", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Điện trở, cường độ dòng điện, điện áp", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g6", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai6", title: "Bài 6. Thực hành: Khai thác phần mềm mô phỏng", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 mắc ampe kế song song với bóng đèn vì…",
  commentPh: "Ví dụ: Nhóm lắp đúng mạch nối tiếp; cần ghi rõ số chỉ ampe kế."};
})();
