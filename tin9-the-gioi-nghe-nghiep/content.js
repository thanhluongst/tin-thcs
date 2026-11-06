/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  kd1:{type:"open", label:"Khởi động", q:"An, Minh và Khoa cùng làm một trò chơi trên máy tính: Khoa phác thảo kịch bản và chuyển thành phần mềm; An tạo hình ảnh nhân vật, trang phục, phong cảnh; Minh đưa trò chơi lên Internet, duy trì hoạt động và thu thập ý kiến phản hồi. Theo em, sở trường của mỗi bạn có thể phát triển để trở thành một nghề trong tương lai không?",
    k:"Có. Ví dụ: Khoa – lập trình, phát triển phần mềm; An – thiết kế đồ hoạ; Minh – quản trị hệ thống, mạng máy tính."},
  hd1a:{type:"match", label:"HĐ1 – Câu 1", q:"Ba người bạn, sau này có thể làm những nghề nghiệp gì trong lĩnh vực tin học? Ghép mỗi bạn với một nhóm nghề phù hợp.",
    items:[["Khoa (viết kịch bản, chuyển thành phần mềm trò chơi)",1],["An (tạo hình ảnh nhân vật, phong cảnh bằng phần mềm đồ hoạ)",2],["Minh (đưa trò chơi lên Internet, theo dõi, quản trị)",3]],
    opts:["Nhà chuyên môn về phân tích và phát triển phần mềm","Nhà thiết kế đồ hoạ và truyền thông đa phương tiện","Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính (nhà quản trị hệ thống)"],
    k:"Khoa – phân tích và phát triển phần mềm; An – thiết kế đồ hoạ; Minh – quản trị hệ thống (cơ sở dữ liệu và mạng máy tính)."},
  hd1b:{type:"match", label:"HĐ1 – Câu 2", q:"Đặc thù công việc và sản phẩm chính của những nghề nghiệp đó là gì? Ghép mỗi nhóm nghề với công việc đặc thù.",
    items:[["Nhà chuyên môn về phân tích và phát triển phần mềm",1],["Nhà thiết kế đồ hoạ và truyền thông đa phương tiện",2],["Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính",3]],
    opts:["Nghiên cứu, phân tích các thành phần của hệ thống thông tin; thiết kế, phát triển, thử nghiệm, bảo trì phần mềm","Thiết kế nội dung để truyền đạt thông tin dưới dạng hình ảnh, âm thanh, hoạt hình, video cho trò chơi, phim ảnh, quảng cáo","Thiết kế, xây dựng, tích hợp các hệ thống cơ sở dữ liệu; kế hoạch bảo mật; xây dựng, quản trị mạng máy tính"],
    k:"Sản phẩm chính lần lượt: phần mềm; sản phẩm đồ hoạ, đa phương tiện; hệ thống cơ sở dữ liệu, mạng máy tính."},
  hg:{type:"sort", label:"Đọc hiểu – Hai hướng nghề", q:"Theo Hình 17.1, xếp mỗi nghề dưới đây vào hướng nghề phù hợp.",
    cats:["Khoa học máy tính","Tin học ứng dụng"],
    items:[["Nhà lập trình các ứng dụng",0],["Nhà phân tích và thiết kế hệ thống",0],["Nhà khoa học dữ liệu",0],["Nhà bảo mật (máy tính)",0],["Nhà quản trị cơ sở dữ liệu",0],["Nhà thiết kế trò chơi máy tính",1],["Nghệ sĩ kĩ thuật số",1],["Nhà thiết kế trang web",1],["Nhà thiết kế đa phương tiện",1]],
    k:"<b>Khoa học máy tính</b>: phân tích và phát triển phần mềm; cơ sở dữ liệu và mạng máy tính. <b>Tin học ứng dụng</b>: thiết kế đồ hoạ và truyền thông đa phương tiện."},
  dt:{type:"mcq", label:"Đọc hiểu – Đặc trưng hai hướng nghề", q:"Đặc trưng cơ bản của nhóm nghề thuộc hướng Tin học ứng dụng là gì?",
    o:["Không đòi hỏi nghiên cứu chuyên sâu về lí thuyết khoa học máy tính mà chủ yếu sử dụng phương tiện và công cụ công nghệ thông tin để giải quyết các vấn đề thực tế trong các lĩnh vực khác.","Nghiên cứu lí thuyết về thông tin và thuật toán, tạo ra cách mới để biểu diễn, xử lí, trao đổi thông tin.","Chỉ làm việc trong các doanh nghiệp công nghệ thông tin.","Chỉ dành cho người giỏi toán."], a:0,
    k:"<b>Khoa học máy tính</b>: nghiên cứu lí thuyết về thông tin và thuật toán. <b>Tin học ứng dụng</b>: sử dụng phương tiện, công cụ CNTT để giải quyết vấn đề thực tế."},
  p89:{type:"open", label:"Câu hỏi tr.89", q:"Sau khi tìm hiểu về nghề nghiệp trong lĩnh vực Tin học, em nhận thấy sở thích và khả năng của mình phù hợp với nhóm nghề nào? Tại sao?",
    k:"Học sinh nêu nhóm nghề và lí do dựa trên sở thích, khả năng của bản thân (có thể dùng phần “Em hợp với nhóm nghề nào?” để tham khảo)."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Dùng máy tìm kiếm, hội thoại thông minh, website của tổ chức, doanh nghiệp,… Nêu tên một doanh nghiệp hoạt động trong lĩnh vực tin học. Những công việc tin học nào phù hợp nhất với doanh nghiệp đó?",
    k:"Ví dụ: một công ti phần mềm – phân tích, thiết kế hệ thống, lập trình, kiểm thử phần mềm, phát triển ứng dụng trí tuệ nhân tạo, an ninh mạng…"},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Nêu tên một doanh nghiệp sử dụng lao động tin học nhưng hoạt động trong lĩnh vực khác. Những công việc tin học được sử dụng trong doanh nghiệp đó là gì?",
    k:"Ví dụ: ngân hàng, bệnh viện, siêu thị, đài truyền hình – quản lí thông tin và giao dịch khách hàng, thương mại điện tử, quản trị mạng, thiết kế đồ hoạ quảng cáo…"},
  dn:{type:"sort", label:"Đọc hiểu – Tin học trong doanh nghiệp", q:"Mỗi công việc dưới đây tập trung nhiều hơn theo hướng nào?",
    cats:["Khoa học máy tính","Tin học ứng dụng"],
    items:[["Phân tích, thiết kế hệ thống thông tin",0],["Xây dựng giải pháp kĩ thuật và công nghệ xử lí thông tin",0],["Phát triển các ứng dụng trí tuệ nhân tạo",0],["Nghiên cứu an ninh mạng và bảo mật thông tin",0],["Quản lí thông tin và giao dịch khách hàng",1],["Thương mại điện tử",1],["Cung cấp dịch vụ phát thanh, truyền hình và báo điện tử",1],["Cung ứng dịch vụ đa phương tiện phục vụ quảng cáo, giải trí, truyền thông",1]],
    k:"Hướng <b>Khoa học máy tính</b> tập trung ở các doanh nghiệp hoạt động trong lĩnh vực tin học; hướng <b>Tin học ứng dụng</b> có ở hầu hết các cơ quan, doanh nghiệp."},
  hd3:{type:"open", label:"HĐ3 – Nữ giới và tin học", q:"Bạn An đặt câu hỏi: “Những nghề liên quan đến tin học có phù hợp với nữ giới không?”. Em hãy giúp bạn An trả lời câu hỏi đó.",
    k:"Có. Nữ giới có nhiều ưu thế như ghi nhớ tốt, cẩn thận, chu đáo, giao tiếp tốt, chịu được áp lực; ở Việt Nam nữ giới làm tin học có cơ hội phát triển, thu nhập cao. Mọi người, không phân biệt giới tính, đều có cơ hội tiếp cận các nghề tin học theo sở thích, năng lực."},
  p90:{type:"mcq", label:"Câu hỏi tr.90", q:"Em hãy chọn phát biểu đúng.",
    o:["Nam giới làm những nghề như lập trình ứng dụng hay phân tích thiết kế hệ thống tốt hơn nữ giới do họ có tư duy lôgic tốt hơn.","Nữ giới làm những nghề như quản trị hệ thống hay quản trị cơ sở dữ liệu tốt hơn nam giới do họ cẩn thận hơn.","Lựa chọn nghề nghiệp trong lĩnh vực tin học phù hợp với giới tính sẽ đem lại hiệu quả lao động cao hơn.","Cả nam và nữ đều có thể chọn nghề trong lĩnh vực tin học phù hợp với năng lực và nhu cầu của mình."], a:3,
    k:"<b>D</b>. Nghề nghiệp phù hợp phụ thuộc vào năng lực, sở thích, nhu cầu, không phụ thuộc giới tính."},
  lt1:{type:"open", label:"Luyện tập – Câu 1", q:"Hãy kể tên hai công việc liên quan đến nghề nghiệp tin học trong lĩnh vực khác như y tế, giáo dục, nông nghiệp, xây dựng, giao thông,…",
    k:"Ví dụ: y tế – quản trị hệ thống hồ sơ bệnh án điện tử; giáo dục – thiết kế bài giảng đa phương tiện, quản trị hệ thống học trực tuyến; giao thông – lập trình hệ thống điều khiển đèn tín hiệu…"},
  lt2:{type:"open", label:"Luyện tập – Câu 2", q:"Em hãy nêu ví dụ về một nghề tin học mà theo em, lao động nữ có ưu thế. Giải thích cho câu trả lời của mình.",
    k:"Ví dụ: kiểm thử phần mềm (cần cẩn thận, chi tiết), thiết kế đồ hoạ, quản trị web, phân tích dữ liệu…"},
  vd1:{type:"open", label:"Vận dụng – Câu 1", q:"Hãy kể về một nghề tin học mà em quan tâm. Nghề nghiệp đó theo định hướng Khoa học máy tính hay Tin học ứng dụng?",
    k:"Học sinh nêu tên nghề, công việc, sản phẩm chính và xác định đúng định hướng."},
  vd2:{type:"open", label:"Vận dụng – Câu 2", q:"Em cần bổ sung những kiến thức hay kĩ năng nào để có thể trở thành người lao động trong nghề nghiệp mà em quan tâm ở Câu 1?",
    k:"Ví dụ: học tốt Toán, Tin học, tiếng Anh; học lập trình, thiết kế đồ hoạ; kĩ năng làm việc nhóm, tự học, giải quyết vấn đề…"}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<ul><li>Những nhóm nghề thuộc hướng <b>Khoa học máy tính</b> có đặc điểm chung là nghiên cứu lí thuyết về thông tin và thuật toán, tạo ra những cách mới để biểu diễn, xử lí và trao đổi thông tin trong môi trường số.</li><li>Những nhóm nghề thuộc hướng <b>Tin học ứng dụng</b> không đòi hỏi nghiên cứu chuyên sâu về lí thuyết khoa học máy tính mà chủ yếu là sử dụng phương tiện và công cụ công nghệ thông tin để giải quyết các vấn đề thực tế trong các lĩnh vực khác.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Không chỉ những doanh nghiệp tin học mà nhiều doanh nghiệp khác cũng cần lao động tin học, theo cả hai hướng Khoa học máy tính và Tin học ứng dụng.</li><li>Mọi người, không phân biệt giới tính đều có cơ hội tiếp cận các nghề nghiệp trong lĩnh vực tin học theo sở thích, năng lực và nhu cầu của mình.</li></ul>"},
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Sở thích, khả năng có thể phát triển thành <b>nghề nghiệp</b> trong tương lai.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Nghề nghiệp trong tin học</p><ul>'
    + "<li>3 nhóm nghề: <b>phân tích, phát triển phần mềm</b>; <b>cơ sở dữ liệu, mạng máy tính</b>; <b>thiết kế đồ hoạ, đa phương tiện</b>.</li>"
    + "<li>2 hướng: <b>Khoa học máy tính</b> (nghiên cứu lí thuyết, thuật toán) và <b>Tin học ứng dụng</b> (dùng công cụ CNTT giải quyết vấn đề thực tế).</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Tin học và thế giới nghề nghiệp</p><ul>'
    + "<li>Nhiều doanh nghiệp (cả ngoài lĩnh vực tin học) cần <b>lao động tin học</b>.</li>"
    + "<li>Cả <b>nam và nữ</b> đều có cơ hội làm nghề tin học theo sở thích, năng lực.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Tin học có mặt trong <b>y tế, giáo dục, nông nghiệp, giao thông,…</b></li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Chọn nghề quan tâm → xác định <b>hướng nghề</b> → bổ sung <b>kiến thức, kĩ năng</b>.</li>"
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
    return ["T9B17." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa. */
const NX_MAU = {
  kd1: {ok:["Ý kiến hợp lí."], fix:["Mỗi bạn giỏi việc gì?"]},
  hd1a:{ok:["Ghép đúng."], fix:["Đọc lại công việc của mỗi bạn."]},
  hd1b:{ok:["Ghép đúng."], fix:["Sản phẩm chính của mỗi nhóm nghề là gì?"]},
  hg:  {ok:["Phân loại đúng."], fix:["Xem lại Hình 17.1."]},
  dt:  {ok:["Chính xác!"], fix:["Đọc lại phần ghi nhớ."]},
  p89: {ok:["Có lí do rõ ràng."], fix:["Nêu thêm lí do vì sao em phù hợp."]},
  hd2a:{ok:["Tìm hiểu tốt."], fix:["Nêu cụ thể công việc tin học của doanh nghiệp."]},
  hd2b:{ok:["Ví dụ phù hợp."], fix:["Doanh nghiệp đó dùng tin học vào việc gì?"]},
  dn:  {ok:["Phân loại đúng."], fix:["Việc nào cần nghiên cứu sâu về thuật toán, hệ thống?"]},
  hd3: {ok:["Trả lời thuyết phục."], fix:["Nêu ưu thế của nữ giới khi làm tin học."]},
  p90: {ok:["Chính xác!"], fix:["Nghề nghiệp có phụ thuộc giới tính không?"]},
  lt1: {ok:["Ví dụ phù hợp."], fix:["Nêu đủ hai công việc."]},
  lt2: {ok:["Giải thích hợp lí."], fix:["Ưu thế đó là gì?"]},
  vd1: {ok:["Xác định đúng hướng nghề."], fix:["Nghề đó nghiên cứu lí thuyết hay ứng dụng công cụ?"]},
  vd2: {ok:["Kế hoạch cụ thể."], fix:["Nêu cả kiến thức và kĩ năng."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {hg:"Khoa học máy tính: nghiên cứu lí thuyết, thuật toán; Tin học ứng dụng: dùng công cụ CNTT.", dn:"Khoa học máy tính: nghiên cứu lí thuyết, thuật toán; Tin học ứng dụng: dùng công cụ CNTT."};
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
    {title:"Sở trường và nghề nghiệp", tasks:["kd1"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Nghề nghiệp trong tin học", acts:[
    {title:"Hoạt động 1: Công việc đặc thù của người làm tin học", tasks:["hd1a","hd1b"]},
    {title:"Đọc hiểu: Nhóm nghề và hướng nghề", tasks:["hg","dt"], concept:"c1"},
    {title:"Câu hỏi SGK trang 89", tasks:["p89"]},
    {title:"Ghi bài: Nghề nghiệp trong tin học", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Tin học và thế giới nghề nghiệp", acts:[
    {title:"Hoạt động 2: Tìm việc", tasks:["hd2a","hd2b"]},
    {title:"Đọc hiểu: Tin học trong các doanh nghiệp", tasks:["dn"]},
    {title:"Hoạt động 3: Nữ giới và tin học", tasks:["hd3"], concept:"c2"},
    {title:"Câu hỏi SGK trang 90", tasks:["p90"]},
    {title:"Ghi bài: Tin học và thế giới nghề nghiệp", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Tin học trong các lĩnh vực", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Nghề tin học em quan tâm", tasks:["vd1","vd2"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin9-bai17", title: "Bài 17. Tin học và thế giới nghề nghiệp", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 tìm hiểu một ngân hàng, liệt kê được 3 công việc tin học…",
  commentPh: "Ví dụ: Nhóm phân biệt đúng hai hướng nghề; nên tìm thêm doanh nghiệp ở địa phương."};
})();
