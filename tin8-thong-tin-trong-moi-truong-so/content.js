/* Nội dung bài học: câu hỏi SGK, đáp án chốt và cách chấm. Dùng chung cho trang học sinh và trang giáo viên. */
(function(){
"use strict";
const TASKS = {
  hd1a:{type:"open", label:"HĐ1 – Câu 1", q:"An có thể nhận được ảnh bằng cách nào?",
    k:"An nhận ảnh qua <b>thư điện tử</b> (hoặc qua mạng xã hội, ứng dụng nhắn tin) bằng máy tính hay điện thoại có kết nối <b>Internet</b>, không cần đến nhà Khoa."},
  hd1b:{type:"open", label:"HĐ1 – Câu 2", q:"Sau khi An nhận được ảnh, Khoa có bị mất bức ảnh gốc không?",
    k:"<b>Không.</b> Khoa vẫn còn bức ảnh in và ảnh chụp trong điện thoại. Gửi ảnh số là gửi một <b>bản sao</b>, người gửi không bị mất ảnh."},
  hd1c:{type:"open", label:"HĐ1 – Câu 3", q:"An có thể lưu trữ ảnh vào những thiết bị nào?",
    k:"Điện thoại thông minh, máy tính, máy tính bảng, thẻ nhớ, USB, ổ cứng; hoặc lưu trực tuyến trên <b>dịch vụ lưu trữ đám mây</b> (Google Drive, OneDrive,…)."},
  dd:{type:"sort", label:"Đọc hiểu – Đặc điểm thông tin số",
    q:"Đọc mục a) Thông tin số (SGK trang 10–11). Mỗi nhận định dưới đây đúng hay sai?",
    cats:["Đúng","Sai"],
    items:[["Thông tin số dễ dàng được nhân bản và lan truyền",0],["Thông tin số đã đưa lên mạng thì xoá được hoàn toàn dễ dàng",1],["Thông tin số có thể được truy cập từ xa nếu người quản lí cho phép",0],["Gửi ảnh số cho bạn thì người gửi sẽ mất ảnh gốc",1],["Thông tin số là thông tin được mã hoá thành dãy bit",0]],
    k:"Thông tin số được mã hoá thành <b>dãy bit</b>; <b>dễ nhân bản, lan truyền nhưng khó bị xoá bỏ hoàn toàn</b>; có thể được <b>truy cập từ xa</b> nếu người quản lí cho phép. Gửi đi là gửi bản sao, không mất bản gốc."},
  hd2a:{type:"open", label:"HĐ2 – Câu 1", q:"Máy chủ của dịch vụ thư điện tử có lưu trữ bức ảnh Khoa gửi không?",
    k:"<b>Có.</b> Bức ảnh được lưu trên máy chủ của nhà cung cấp dịch vụ thư điện tử (trong hộp thư của Khoa và của An)."},
  hd2b:{type:"open", label:"HĐ2 – Câu 2", q:"Những ai có thể xem được bức ảnh An đưa lên mạng xã hội?",
    k:"Tuỳ chế độ chia sẻ An chọn: <b>công khai</b> (mọi người), <b>bạn bè</b>, hoặc một nhóm người được phép; ngoài ra còn nhà cung cấp mạng xã hội. Người đã xem có thể tải về, chia sẻ tiếp."},
  hd2c:{type:"open", label:"HĐ2 – Câu 3", q:"An có thể gửi ảnh sau khi chỉnh sửa cho Khoa hoặc các bạn khác được không?",
    k:"<b>Được.</b> Ảnh số dễ dàng được chỉnh sửa, nhân bản và tiếp tục chia sẻ cho người khác. Tuy nhiên ảnh là của Khoa chụp, An nên <b>xin phép</b> Khoa trước khi chia sẻ (tôn trọng quyền tác giả)."},
  p12:{type:"mcq", label:"Câu hỏi tr.12", q:"Thông tin số được nhiều tổ chức và cá nhân lưu trữ với dung lượng rất lớn,",
    o:["được truy cập tự do và có độ tin cậy khác nhau.","được bảo hộ quyền tác giả và không đáng tin cậy.","được bảo hộ quyền tác giả và có độ tin cậy khác nhau.","được bảo hộ quyền tác giả và rất đáng tin cậy."], a:2,
    k:"Thông tin số <b>được bảo hộ quyền tác giả</b> và <b>có độ tin cậy khác nhau</b>, phụ thuộc vào nguồn gốc và mục tiêu thông tin. Không phải được truy cập tự do, cũng không phải tất cả đều đáng tin hay không đáng tin."},
  hd3a:{type:"open", label:"HĐ3 – Câu 1", q:"Em hãy kể lại một nội dung trên mạng mà em biết đó là tin giả.",
    k:"Ví dụ: tin “uống nước chanh muối chữa khỏi bệnh”; tin “ngày mai học sinh được nghỉ học” do tài khoản lạ đăng; ảnh ghép một người nổi tiếng nói điều họ không nói; tin “nhận quà miễn phí, chỉ cần bấm vào liên kết”,…"},
  hd3b:{type:"open", label:"HĐ3 – Câu 2", q:"Tin giả đó gây ra tác hại gì nếu người đọc tin vào điều đó?",
    k:"Người đọc có thể làm theo sai (ảnh hưởng sức khoẻ), mất tiền, lộ thông tin cá nhân, hoang mang lo lắng, hiểu sai về người khác, gây mất trật tự xã hội."},
  hd3c:{type:"open", label:"HĐ3 – Câu 3", q:"Làm thế nào để em biết đó là tin giả?",
    k:"Kiểm tra <b>nguồn tin</b> (ai đăng, có uy tín không); đối chiếu với báo chính thống, cơ quan có thẩm quyền; xem có <b>chứng cứ</b> không; xem <b>thời điểm</b> đăng; phân biệt <b>ý kiến</b> với <b>sự kiện</b>; hỏi thầy cô, bố mẹ."},
  cach:{type:"match", label:"Đọc hiểu – Cách xác định", ph:"Chọn…",
    q:"Đọc mục 2 (SGK trang 12–13). Mỗi việc làm dưới đây ứng với cách xác định thông tin đáng tin cậy nào?",
    opts:["a) Xác định nguồn thông tin","b) Phân biệt ý kiến và sự kiện","c) Kiểm tra chứng cứ của kết luận","d) Đánh giá tính thời sự của thông tin"],
    items:[["1) Xem tin được đăng trên báo chính thống hay trên một blog cá nhân",1],["2) Nhận ra câu “Tôi nghĩ đây là phim hay nhất” chỉ là quan điểm cá nhân",2],["3) Tìm xem kết luận trong bài có số liệu, dẫn chứng hay không",3],["4) Xem trang web được cập nhật lần cuối khi nào",4]],
    k:"1 – a, 2 – b, 3 – c, 4 – d."},
  ys:{type:"sort", label:"Đọc hiểu – Ý kiến hay sự kiện?",
    q:"Mỗi câu dưới đây là ý kiến (quan điểm cá nhân) hay sự kiện (đã xảy ra, kiểm chứng được)?",
    cats:["Ý kiến","Sự kiện"],
    items:[["“Tôi tin rằng việc đó đã xảy ra!”",0],["“Tôi nghĩ đây là bộ phim hoạt hình hay nhất mọi thời đại.”",0],["Năm 1642, Blaise Pascal chế tạo máy tính cơ học Pascaline.",1],["“Món ăn này chắc chắn ngon nhất thành phố.”",0],["Đội tuyển Việt Nam thắng 2–0 trong trận đấu tối qua.",1]],
    k:"Ý kiến là quan điểm, không phải sự kiện; ý kiến thường mang nhiều cảm xúc, định kiến cá nhân nên có <b>độ tin cậy thấp hơn</b> sự kiện. Sự kiện là điều đã xảy ra, <b>kiểm chứng được</b>."},
  lt1:{type:"open", label:"Luyện tập – câu 1", q:"Em hãy kể tên ba ứng dụng thu thập nhiều thông tin từ người sử dụng và trả lời: a) Tổ chức, cá nhân nào sở hữu các ứng dụng đó? b) Mỗi ứng dụng thu thập dạng thông tin nào?",
    k:"Ví dụ:<ul><li><b>Facebook</b> – công ty Meta: thông tin cá nhân, ảnh, video, bài đăng, bạn bè, vị trí.</li><li><b>Zalo</b> – công ty VNG: số điện thoại, danh bạ, tin nhắn, ảnh.</li><li><b>Google Maps</b> – Google: vị trí, lịch sử di chuyển, đánh giá địa điểm.</li><li>Khác: TikTok (ByteDance), YouTube (Google), Shopee (Sea Group),…</li></ul>"},
  lt2:{type:"open", label:"Luyện tập – câu 2", q:"Em hãy đánh giá độ tin cậy của thông tin được cung cấp từ ba ứng dụng ở Câu 1.",
    k:"Độ tin cậy <b>khác nhau</b> tuỳ nguồn: thông tin bản đồ của Google Maps khá tin cậy nhưng đánh giá địa điểm có thể không khách quan; bài đăng trên Facebook, TikTok do mọi người tự đăng nên độ tin cậy thấp, cần kiểm chứng; tin từ trang chính thức của cơ quan, báo chí trên các ứng dụng đó đáng tin hơn."},
  vd1:{type:"open", label:"Vận dụng – câu 1, 2", q:"Em hãy tìm kiếm trên Internet thông tin về một đội bóng, một cầu thủ hoặc một nhân vật mà em yêu thích. Phân tích mức độ tin cậy của nguồn tin tìm được và trình bày một bài giới thiệu ngắn.",
    k:"Học sinh tự làm. Cần: ghi rõ <b>nguồn</b> (trang chính thức của câu lạc bộ, liên đoàn bóng đá, báo thể thao uy tín đáng tin hơn trang người hâm mộ); phân biệt sự kiện (số bàn thắng, danh hiệu) với ý kiến (“cầu thủ hay nhất”); kiểm tra thời điểm cập nhật."},
  vd3:{type:"open", label:"Vận dụng – câu 3", q:"Em hãy kể một ví dụ về tin đồn (trong cuộc sống hoặc trên mạng) và trả lời: a) Tin đồn đó xuất hiện từ sự việc nào? b) Tác hại của tin đồn đó là gì?",
    k:"Ví dụ: tin đồn “sắp hết muối, phải mua tích trữ” xuất hiện sau tin về sự cố hạt nhân ở nước ngoài → người dân đổ xô mua, giá tăng vọt, gây hoang mang, mất trật tự. Tin đồn thường <b>thiếu căn cứ</b>, dẫn đến kết luận và quyết định sai."}
};
const CONCEPTS = {
  c1:{t:"Ghi nhớ", b:"<p>Thông tin số có những đặc điểm chính sau:</p><ul><li>Thông tin số <b>dễ dàng được nhân bản và lan truyền</b> nhưng <b>khó bị xoá bỏ hoàn toàn</b>.</li><li>Thông tin số có thể được <b>truy cập từ xa</b> nếu người quản lí thông tin đó cho phép.</li></ul>"},
  c2:{t:"Ghi nhớ", b:"<ul><li>Thông tin số <b>đa dạng</b>, được thu thập nhanh, được lưu trữ với dung lượng rất lớn bởi nhiều tổ chức và cá nhân.</li><li>Có nhiều công cụ hỗ trợ tìm kiếm, truy cập, lưu trữ, xử lí và chia sẻ thông tin số.</li><li><b>Quyền tác giả</b> của thông tin số được pháp luật bảo hộ.</li><li>Thông tin số có <b>mức độ tin cậy khác nhau</b>.</li><li>Thông tin số cần được quản lí, khai thác an toàn và có trách nhiệm.</li></ul>"},
  c3:{t:"Ghi nhớ", b:"<ul><li>Thông tin đáng tin cậy giúp em đưa ra kết luận đúng, quyết định hành động đúng và giải quyết được các vấn đề đặt ra.</li><li>Một số cách xác định thông tin có đáng tin cậy hay không: <b>kiểm tra nguồn thông tin</b>; <b>phân biệt ý kiến với sự kiện</b>; <b>kiểm tra chứng cứ của kết luận</b>; <b>đánh giá tính thời sự</b> của thông tin.</li></ul>"},

  /* ---- GHI BÀI: ngắn gọn, dễ hiểu – mỗi phần 1–3 ý, mỗi ý một dòng, từ khoá in đậm ---- */
  g1:{ghi:true, t:"Ghi bài", b:'<p class="gh">Khởi động</p><ul>'
    + "<li>Gửi ảnh số qua mạng: người nhận có <b>bản sao</b>, người gửi <b>không mất</b> ảnh gốc.</li>"
    + "</ul>"},
  g2:{ghi:true, t:"Ghi bài", b:'<p class="gh">1. Thông tin trong môi trường số</p><ul>'
    + "<li><b>Thông tin số</b>: thông tin mã hoá thành <b>dãy bit</b>, lưu và truyền bằng thiết bị số.</li>"
    + "<li>Dễ <b>nhân bản, lan truyền</b>, khó <b>xoá hoàn toàn</b>; truy cập từ xa nếu được phép.</li>"
    + "<li><b>Đa dạng</b>, lưu trữ lớn; có <b>quyền tác giả</b>; độ tin cậy <b>khác nhau</b>.</li>"
    + "</ul>"},
  g3:{ghi:true, t:"Ghi bài", b:'<p class="gh">2. Thông tin đáng tin cậy</p><ul>'
    + "<li>Tin đáng tin cậy → <b>quyết định đúng</b>.</li>"
    + "<li>4 cách kiểm tra: <b>nguồn tin</b>; <b>ý kiến hay sự kiện</b>; <b>chứng cứ</b>; <b>thời điểm</b>.</li>"
    + "</ul>"},
  g4:{ghi:true, t:"Ghi bài", b:'<p class="gh">Luyện tập</p><ul>'
    + "<li>Ứng dụng (Facebook, Zalo, Google Maps,…) thu thập nhiều thông tin; độ tin cậy <b>khác nhau</b>.</li>"
    + "</ul>"},
  g5:{ghi:true, t:"Ghi bài", b:'<p class="gh">Vận dụng</p><ul>'
    + "<li>Tin đồn <b>thiếu căn cứ</b> → hoang mang, quyết định sai. Cần <b>kiểm chứng</b> trước khi tin, chia sẻ.</li>"
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
    return ["T8B2." + id + " · " + t.label, v];
  });
}
/* Nhận xét mẫu cho giáo viên: ok = khi trả lời đúng/tốt, fix = khi cần sửa.
   Bám theo dự kiến khó khăn của học sinh trong kế hoạch bài dạy. */
const NX_MAU = {
  hd1a:{ok:["Đúng! An nhận ảnh qua thư điện tử, mạng Internet."],
        fix:["Khoa không đến nhà An, vậy ảnh được gửi bằng cách nào?"]},
  hd1b:{ok:["Chính xác! Gửi đi chỉ là bản sao, Khoa vẫn còn ảnh."],
        fix:["Khi gửi ảnh số, ảnh trong máy Khoa có bị mất đi không?"]},
  hd1c:{ok:["Em kể được nhiều thiết bị lưu trữ, cả lưu trữ đám mây."],
        fix:["Em kể thêm thiết bị lưu trữ khác ngoài điện thoại."]},
  dd:  {ok:["Nhóm nhận định đúng các đặc điểm của thông tin số."],
        fix:["Em đọc lại phần Ghi nhớ: thông tin số có dễ xoá hoàn toàn không?"]},
  hd2a:{ok:["Đúng! Máy chủ thư điện tử lưu bức ảnh."],
        fix:["Thư điện tử được lưu ở đâu để An mở ra xem được?"]},
  hd2b:{ok:["Em nêu rõ ai xem được tuỳ theo chế độ chia sẻ."],
        fix:["Tuỳ An chọn chia sẻ công khai hay chỉ bạn bè, ai sẽ xem được?"]},
  hd2c:{ok:["Đúng, và em còn nhớ phải xin phép Khoa. Rất tốt!"],
        fix:["Em nêu thêm: ảnh do Khoa chụp, An cần làm gì trước khi chia sẻ?"]},
  p12: {ok:["Chính xác! Được bảo hộ quyền tác giả và có độ tin cậy khác nhau."],
        fix:["Em đọc lại phần Ghi nhớ mục 1: quyền tác giả và độ tin cậy của thông tin số thế nào?"]},
  hd3a:{ok:["Ví dụ tin giả rất cụ thể."],
        fix:["Em kể một tin cụ thể em đã gặp và biết là không đúng sự thật."]},
  hd3b:{ok:["Em nêu rõ tác hại của tin giả."],
        fix:["Nếu tin và làm theo, người đọc có thể bị thiệt hại gì?"]},
  hd3c:{ok:["Em biết nhiều cách kiểm tra tin giả. Rất tốt!"],
        fix:["Em nghĩ thêm: kiểm tra ai đăng tin, có chứng cứ không, đăng khi nào?"]},
  cach:{ok:["Nhóm ghép đúng bốn cách xác định."],
        fix:["Em đọc lại bốn đoạn in nghiêng đậm ở SGK trang 12–13."]},
  ys:  {ok:["Nhóm phân biệt đúng ý kiến và sự kiện."],
        fix:["Câu đó có kiểm chứng được không, hay chỉ là cảm nhận của một người?"]},
  lt1: {ok:["Em kể đủ ba ứng dụng, chủ sở hữu và dạng thông tin."],
        fix:["Em nêu rõ ứng dụng đó thuộc công ty nào và thu thập thông tin gì."]},
  lt2: {ok:["Em đánh giá độ tin cậy hợp lí, có lí do."],
        fix:["Thông tin trên ứng dụng đó do ai cung cấp? Có cần kiểm chứng không?"]},
  vd1: {ok:["Bài giới thiệu có nguồn tin cậy, phân biệt được sự kiện và ý kiến."],
        fix:["Em ghi rõ nguồn và đánh giá nguồn đó có đáng tin không."]},
  vd3: {ok:["Ví dụ tin đồn rõ ràng, nêu đúng tác hại."],
        fix:["Em nêu rõ tin đồn bắt nguồn từ sự việc nào và gây hại gì."]}
};
const NX_CHUNG = ["Cảm ơn nhóm đã trình bày rõ ràng!","Em giải thích thêm lí do nhé.","Ý đúng nhưng còn thiếu, em bổ sung thêm."];

const SORT_HINT = {
  dd: "Em đọc lại phần Ghi nhớ về đặc điểm của thông tin số.",
  ys: "Em xét lại: câu đó kiểm chứng được hay chỉ là cảm nhận của một người?"
};
const MATCH_HINT = {
  cach: "Gợi ý: đọc lại bốn cách xác định ở SGK trang 12–13."
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
    {title:"Hoạt động 1: Ảnh in và ảnh số", tasks:["hd1a","hd1b","hd1c"]},
    {title:"Ghi bài", tasks:[], concept:"g1", ghi:true}]},
  {id:"phan-1", code:"2.1", step:"Bước 2 · Hình thành kiến thức mới", title:"Thông tin số", acts:[
    {title:"Đọc hiểu: Thông tin số", tasks:["dd"], concept:"c1"},
    {title:"Hoạt động 2: Thông tin số", tasks:["hd2a","hd2b","hd2c"]},
    {title:"Đọc hiểu: Thông tin số trong xã hội", tasks:["p12"], concept:"c2"},
    {title:"Ghi bài: Thông tin số", tasks:[], concept:"g2", ghi:true}]},
  {id:"phan-2", code:"2.2", step:"Bước 2 · Hình thành kiến thức mới", title:"Thông tin đáng tin cậy", acts:[
    {title:"Hoạt động 3: Tin giả", tasks:["hd3a","hd3b","hd3c"]},
    {title:"Đọc hiểu: Xác định thông tin đáng tin cậy", tasks:["cach","ys"], concept:"c3"},
    {title:"Ghi bài: Thông tin đáng tin cậy", tasks:[], concept:"g3", ghi:true}]},
  {id:"luyen-tap", code:"3", step:"Bước 3", title:"Luyện tập", acts:[
    {title:"Ứng dụng thu thập thông tin", tasks:["lt1","lt2"]},
    {title:"Ghi bài", tasks:[], concept:"g4", ghi:true}]},
  {id:"van-dung", code:"4", step:"Bước 4", title:"Vận dụng", acts:[
    {title:"Tìm thông tin và tin đồn", tasks:["vd1","vd3"]},
    {title:"Ghi bài", tasks:[], concept:"g5", ghi:true}]}
];
/* Mục "Ghi bài" (ghi:true) ở cuối mỗi bước không làm đổi số thứ tự các hoạt động */
STAGES.forEach(st => { const real = st.acts.filter(a => !a.ghi);
  st.acts.forEach(a => {
    if (a.ghi) { a.code = "✎"; a.id = "ghi-" + st.id; return; }
    const i = real.indexOf(a);
    a.code = real.length > 1 ? st.code + "." + (i + 1) : st.code; a.id = "hd-" + a.code.replace(/\./g, "-"); }); });
window.LESSON = {STAGES, id: "tin8-bai2", title: "Bài 2. Thông tin trong môi trường số", TASKS, CONCEPTS, TASK_IDS, L, grade, countSub, summary, esc, NX_MAU, NX_CHUNG, autoComment,
  notePh: "Ví dụ: Nhóm 2 cho rằng gửi ảnh qua mạng thì người gửi mất ảnh vì…",
  commentPh: "Ví dụ: Nhóm nêu đúng cách kiểm tra nguồn tin; cần bổ sung kiểm tra thời điểm đăng."};
})();
