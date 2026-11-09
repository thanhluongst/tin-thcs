# Chèn hoạt động "Khám phá bằng hình" (chung/khoidong.js) vào đầu phần Khởi động của mọi bài.
# Sửa cấu hình trong tệp này rồi chạy:  python cong-cu/khoi-dong.py .
# Mỗi bài: nen (troi/dem/cay/cam/tim/bien), canh (hình lớn trên sân khấu), trang (hình nhỏ trôi),
#          title, the = [(emoji, nhãn, lời giải thích)], doan = (câu hỏi, [lựa chọn], chỉ số đúng, giải thích), hoi.
import json, re, sys, os
ROOT = sys.argv[1] if len(sys.argv) > 1 else "."

def K(nen, canh, trang, title, the, doan=None, hoi=None):
    d = {"nen": nen, "canh": canh.split(), "trang": trang, "title": title, "the": [list(t) for t in the]}
    if doan: d["doan"] = {"q": doan[0], "o": doan[1], "d": doan[2], "g": doan[3]}
    if hoi: d["hoi"] = hoi
    return d

D = {
# ---------------- LỚP 6 ----------------
"tin6-thong-tin-va-du-lieu": K("troi", "👀 👂 🧠 💡", "🐦☁️🎵",
  "Giác quan thu nhận – bộ não xử lí", [
  ("👀", "Mắt nhìn", "Nhìn thấy <b>chữ, số, hình ảnh</b> trong sách, trên bảng."),
  ("👂", "Tai nghe", "Nghe <b>tiếng chim hót</b>, tiếng xe cộ, lời thầy cô."),
  ("🧠", "Não xử lí", "Bộ não <b>xử lí</b> những gì giác quan thu nhận."),
  ("💡", "Hiểu biết", "Kết quả: em có <b>hiểu biết</b> về thế giới xung quanh.")],
  ("Thấy trời có mây đen kéo đến, em sẽ…", ["Đi phơi quần áo", "Mang theo áo mưa", "Tắt đèn đi ngủ"], 1, "Từ thông tin “mây đen” em suy ra trời sắp mưa."),
  "Hằng ngày em thu nhận những <b>thông tin</b> gì? Chúng giúp em quyết định việc gì?"),
"tin6-xu-li-thong-tin": K("cay", "⚽ 🧍 🥅", "⭐👏",
  "Quả phạt đền quyết định", [
  ("👀", "Quan sát", "Cầu thủ <b>nhìn</b> thủ môn và khung thành – <b>thu nhận</b> thông tin."),
  ("🤔", "Suy đoán", "Đoán góc nào <b>sơ hở nhất</b> – <b>xử lí</b> thông tin."),
  ("🦵", "Sút bóng", "Sút mạnh vào góc cao – <b>hành động</b> theo kết quả xử lí."),
  ("🥅", "Vào lưới!", "Bàn thắng là kết quả của cả quá trình <b>xử lí thông tin</b>.")],
  ("Bộ phận nào giúp cầu thủ “xử lí” thông tin?", ["Đôi chân", "Bộ não", "Đôi giày"], 1, "Bộ não xử lí, đôi chân thực hiện."),
  "Máy tính cũng thu nhận – xử lí – xuất kết quả. Em đoán xem nó dùng bộ phận nào cho từng việc?"),
"tin6-thong-tin-trong-may-tinh": K("dem", "🧑 ➡️ 💻 ➡️ 0️⃣ 1️⃣", "✨0️⃣1️⃣",
  "Máy tính chỉ biết 0 và 1!", [
  ("🔤", "Chữ cái", "Con người dùng <b>chữ cái</b> A, B, C,… để viết."),
  ("🔢", "Chữ số", "Con người dùng <b>chữ số</b> 0 – 9 để tính toán."),
  ("💡", "Bật / tắt", "Máy tính giống bóng đèn: <b>bật = 1, tắt = 0</b>."),
  ("0️⃣", "Bit", "Mỗi kí hiệu 0 hoặc 1 gọi là một <b>bit</b>.")],
  ("Máy tính thông dụng làm việc với bao nhiêu kí hiệu?", ["2 kí hiệu", "10 kí hiệu", "26 kí hiệu"], 0, "Chỉ hai kí hiệu 0 và 1."),
  "Chỉ với 0 và 1, làm sao máy tính hiểu được chữ, hình ảnh, âm thanh? Cùng tìm hiểu nhé!"),
"tin6-mang-may-tinh": K("cay", "🏠 🛣️ 🏙️ ✈️ 🚢", "🌳☁️",
  "Con đường nối mọi nơi", [
  ("🛣️", "Con đường", "Đường nối nhà, làng, thành phố – <b>làm xa thành gần</b>."),
  ("🕸️", "Mạng lưới", "Nhiều đường nhỏ đan nhau thành <b>mạng lưới</b> lớn."),
  ("🚦", "Ngã tư", "Nơi giao nhau cần <b>đèn tín hiệu</b> điều khiển cho thông suốt."),
  ("💻", "Mạng máy tính", "Máy tính cũng được <b>nối với nhau</b> để trao đổi thông tin.")],
  ("Ở mạng máy tính, “con đường” là gì?", ["Dây cáp, sóng wifi", "Bàn phím", "Màn hình"], 0, "Dây cáp và sóng không dây là đường truyền."),
  "Máy tính trong phòng tin học trường em được nối với nhau như thế nào?"),
"tin6-internet": K("troi", "👩 📱 ➡️ 🌐 ➡️ ✈️", "☁️🎫",
  "Đặt vé máy bay không cần ra phòng vé", [
  ("🔎", "Tìm chuyến bay", "Hãng bay đăng <b>giờ bay, giá vé</b> trên Internet."),
  ("🎫", "Đặt vé", "Chọn chuyến và <b>đặt vé</b> ngay tại nhà."),
  ("💳", "Thanh toán", "Trả tiền <b>trực tuyến</b>, không cần đến tận nơi."),
  ("✈️", "Lên đường", "Mẹ An kịp đi công tác nhờ <b>Internet</b>.")],
  ("Mẹ An cần gì để đặt vé tại nhà?", ["Kết nối Internet", "Máy in", "Ô tô"], 0, "Có kết nối Internet là tìm, đặt và trả tiền được."),
  "Gia đình em đã làm việc gì nhờ Internet?"),
"tin6-mang-thong-tin-toan-cau": K("dem", "🌍 🕸️ 📄 🔗 📄", "✨⭐",
  "Mạng nhện khổng lồ bao quanh Trái Đất", [
  ("📖", "Câu chuyện", "Trang web đưa em đến những <b>câu chuyện</b> hấp dẫn."),
  ("🎵", "Bản nhạc", "Nghe những <b>bản nhạc</b> du dương."),
  ("🖼️", "Hình ảnh", "Ngắm những <b>hình ảnh</b> đẹp khắp thế giới."),
  ("🔗", "Liên kết", "Các trang <b>nối với nhau</b> như mạng nhện → <b>World Wide Web</b>.")],
  ("“Web” trong World Wide Web nghĩa là gì?", ["Mạng nhện", "Máy tính", "Con chuột"], 0, "WWW – mạng thông tin như mạng nhện toàn cầu."),
  "Em thường truy cập trang web nào? Trên đó có những gì?"),
"tin6-tim-kiem-thong-tin-tren-internet": K("tim", "🎤 🎶 🔍 ➡️ 📺", "🎵🎶",
  "Chỉ nhớ vài câu hát – tìm ra cả bài!", [
  ("🎶", "Vài câu hát", "Em chỉ nhớ <b>vài câu</b> trong bài hát."),
  ("⌨️", "Gõ từ khoá", "Gõ những câu đó vào <b>máy tìm kiếm</b>."),
  ("⚡", "Rất nhanh", "Chưa đến <b>1 giây</b> đã có kết quả."),
  ("📺", "Nhiều video", "Cả bài hát với video của <b>nhiều ca sĩ</b>.")],
  ("Công cụ giúp tìm thông tin trên WWW gọi là gì?", ["Máy tìm kiếm", "Máy in", "Máy chiếu"], 0, "Ví dụ: Google, Bing, Cốc Cốc."),
  "Em đã từng tìm gì trên Internet? Em gõ những từ nào?"),
"tin6-thu-dien-tu": K("troi", "🕊️ ✉️ 📮 ✉️ 💻", "☁️✉️",
  "Ba cách gửi thư qua các thời kì", [
  ("🕊️", "Bồ câu đưa thư", "Ngày xưa: <b>chim bồ câu</b> mang thư – mất nhiều ngày."),
  ("📮", "Bưu điện", "Bỏ thư vào hòm thư – chờ <b>vài ngày</b> mới tới."),
  ("💻", "Thư điện tử", "Gửi qua Internet – đến nơi <b>trong vài giây</b>."),
  ("📎", "Đính kèm", "Thư điện tử còn gửi kèm <b>ảnh, tệp</b> được.")],
  ("Cách nào gửi thư nhanh nhất?", ["Chim bồ câu", "Bưu điện", "Thư điện tử"], 2, "Thư điện tử đến gần như ngay lập tức."),
  "Ba hình ảnh đó cho em biết điều gì về cách con người gửi thư?"),
"tin6-an-toan-thong-tin-tren-internet": K("dem", "👦 💻 🎮 ⚠️ 🦠", "⚡❗",
  "Máy tính của Minh bị treo!", [
  ("🎮", "Tải trò chơi lạ", "Minh tải phần mềm trò chơi <b>không rõ nguồn gốc</b>."),
  ("⚠️", "Bỏ qua cảnh báo", "Phần mềm chống virus cảnh báo nhưng Minh <b>bỏ qua</b>."),
  ("🦠", "Nhiễm virus", "Máy khởi động lại rồi <b>bị treo</b> – có thể nhiễm mã độc."),
  ("🖼️", "Lo mất ảnh", "Ảnh dã ngoại trong máy có thể <b>bị mất</b>.")],
  ("Minh nên làm gì khi thấy cảnh báo?", ["Bỏ qua, cài tiếp", "Dừng lại, hỏi người lớn", "Tắt phần mềm chống virus"], 1, "Cảnh báo là để bảo vệ máy và dữ liệu."),
  "Em đã bao giờ gặp cảnh báo khi dùng máy tính chưa? Em đã làm gì?"),
"tin6-so-do-tu-duy": K("tim", "👧 👦 🧑 ⏳ 📔", "⭐📸",
  "Cỗ máy thời gian – 50 tuổi gặp lại", [
  ("⏳", "Tương lai", "An, Minh, Khoa gặp nhau khi đã <b>50 tuổi</b>."),
  ("🎉", "Kỉ niệm", "Lớp từng có rất nhiều <b>hoạt động, kỉ niệm</b>."),
  ("😢", "Tiếc nuối", "Tìm lại tư liệu nhưng <b>chẳng lưu được gì</b>."),
  ("📔", "Sổ lưu niệm", "Giá có <b>cuốn sổ lưu niệm</b> ghi lại hình ảnh, kỉ niệm!")],
  ("Muốn làm sổ lưu niệm, việc đầu tiên nên làm là gì?", ["In ngay", "Lên ý tưởng nội dung", "Mua bìa sổ"], 1, "Sơ đồ tư duy giúp ghi lại và sắp xếp ý tưởng."),
  "Nếu làm sổ lưu niệm của lớp, em muốn có những nội dung gì?"),
"tin6-dinh-dang-van-ban": K("cam", "👧 📔 🤔 💻", "✏️📸",
  "Làm sổ lưu niệm bằng gì?", [
  ("✏️", "Viết tay", "Mua sổ, viết và dán ảnh – <b>khó sửa</b> khi viết sai."),
  ("💻", "Máy tính", "Soạn trên máy tính – <b>sửa dễ</b>, trình bày đẹp."),
  ("📤", "Chia sẻ", "Gửi cho cả lớp, <b>in nhiều bản</b>."),
  ("💾", "Lưu lâu", "Lưu trữ <b>lâu dài</b>, không sợ rách, phai.")],
  ("Phần mềm nào dùng để soạn sổ lưu niệm?", ["Phần mềm soạn thảo văn bản", "Phần mềm chơi nhạc", "Trò chơi"], 0, "Ví dụ: Microsoft Word."),
  "Làm sổ lưu niệm trên máy tính có những thuận lợi gì so với viết tay?"),
"tin6-trinh-bay-bang": K("cam", "📄 📄 📄 ➡️ 📊", "👤✨",
  "Danh sách lớp: viết dài hay kẻ bảng?", [
  ("📄", "Nhiều trang", "An soạn danh sách trên <b>mấy trang</b> – khó theo dõi."),
  ("📊", "Kẻ bảng", "Đặt danh sách vào <b>bảng</b> – đầy đủ mà cô đọng."),
  ("🖼️", "Ảnh và tên", "Mỗi bạn một <b>hàng</b>: ảnh, tên, sở thích."),
  ("🔎", "Dễ tìm", "Nhìn bảng là <b>tìm thấy ngay</b> thông tin.")],
  ("Bảng gồm những thành phần nào?", ["Hàng và cột", "Trang và lề", "Chữ và số"], 0, "Giao của hàng và cột là ô."),
  "Em đã thấy thông tin trình bày bằng bảng ở đâu? (thời khoá biểu, bảng điểm,…)"),
"tin6-tim-kiem-va-thay-the": K("cam", "🍉 ➡️ 🥭 🍨", "✨🍦",
  "Đổi công thức kem dưa hấu → kem xoài", [
  ("🍉", "Dưa hấu", "Công thức gốc: kem sữa chua <b>dưa hấu</b>."),
  ("🥭", "Xoài", "Minh muốn đổi thành kem sữa chua <b>xoài</b>."),
  ("🔍", "Tìm", "Tìm mọi chỗ có chữ “dưa hấu” – <b>không bỏ sót</b>."),
  ("🔁", "Thay thế", "Thay hết bằng “xoài” <b>chỉ trong một lần bấm</b>.")],
  ("Công thức có 8 chữ “dưa hấu”. Cách nhanh nhất là…", ["Sửa từng chữ", "Dùng Tìm và Thay thế", "Gõ lại cả bài"], 1, "Replace All thay tất cả cùng lúc."),
  "Ngoài công thức món ăn, em còn có thể dùng Tìm và Thay thế để làm gì?"),
"tin6-hoan-thien-so-luu-niem": K("tim", "👧 👦 🧑 📔 🎉", "⭐📸",
  "Ghép mọi thứ thành cuốn sổ lưu niệm", [
  ("🧠", "Sơ đồ tư duy", "Ý tưởng nội dung từ <b>sơ đồ tư duy</b>."),
  ("✍️", "Bài viết", "Các bài cảm nghĩ đã <b>định dạng</b> đẹp."),
  ("📊", "Danh sách", "Danh sách lớp trình bày bằng <b>bảng</b>."),
  ("🤝", "Làm nhóm", "Nhóm 3 – 5 bạn <b>phân công</b> hoàn thiện.")],
  None, "Nhóm em đã có những tệp nào? Ai phụ trách phần nào?"),
"tin6-thuat-toan": K("cam", "📄 ➡️ 🔷 ➡️ 🎲", "✨📄",
  "Gấp trò chơi Đông – Tây – Nam – Bắc", [
  ("📄", "Tờ giấy vuông", "Bắt đầu từ <b>một tờ giấy hình vuông</b>."),
  ("🔀", "Bị xáo trộn", "Các bước hướng dẫn đã <b>bị xáo trộn</b>."),
  ("1️⃣", "Xếp đúng thứ tự", "Phải làm <b>đúng thứ tự</b> mới gấp được."),
  ("🎲", "Thành phẩm", "Làm đúng các bước → có <b>đồ chơi</b> hoàn chỉnh.")],
  ("Nếu làm sai thứ tự các bước thì sao?", ["Vẫn gấp được", "Không gấp được hình", "Gấp nhanh hơn"], 1, "Thứ tự các bước rất quan trọng."),
  "Một dãy các bước làm theo thứ tự để giải quyết một việc – người ta gọi là gì?"),
"tin6-cac-cau-truc-dieu-khien": K("cay", "👦 🗣️ 👧 ✅ ❌", "⭐⏱️",
  "Trò chơi Đúng hay Sai?", [
  ("🃏", "Đọc phiếu", "Bạn thứ nhất <b>đọc câu</b> ghi trong phiếu."),
  ("🙆", "Gật / lắc", "Bạn thứ hai <b>gật</b> (đúng) hoặc <b>lắc đầu</b> (sai)."),
  ("➕", "Cộng điểm", "<b>Nếu</b> trả lời đúng <b>thì</b> cộng 1 điểm."),
  ("⏱️", "Hết giờ", "<b>Lặp lại</b> đến khi hết 1 phút thì dừng.")],
  ("“Voi thuộc loài ăn thịt” – đúng hay sai?", ["Đúng", "Sai"], 1, "Voi ăn cỏ, lá cây."),
  "Trong trò chơi, việc nào phụ thuộc <b>điều kiện</b>? Việc nào được <b>lặp lại</b>?"),
"tin6-chuong-trinh-may-tinh": K("cam", "🧑 🗣️ ✏️ 👧 🖼️", "✏️⭐",
  "Trò chơi Làm theo chỉ dẫn", [
  ("🖼️", "Bức tranh bí mật", "Khoa có bức tranh, An <b>không được nhìn</b>."),
  ("🗣️", "Chỉ dẫn", "Khoa đưa ra <b>từng chỉ dẫn</b> rõ ràng."),
  ("✏️", "Vẽ theo", "An vẽ <b>đúng theo</b> chỉ dẫn."),
  ("🔍", "So sánh", "Hai tranh giống nhau? Chỉ dẫn có <b>rõ ràng</b> không?")],
  ("Máy tính làm việc giống ai trong trò chơi?", ["Khoa – người ra chỉ dẫn", "An – người làm theo chỉ dẫn"], 1, "Máy tính thực hiện đúng các lệnh con người đưa ra."),
  "Chỉ dẫn thế nào thì bạn vẽ đúng? Máy tính cần “chỉ dẫn” gì để làm việc?"),
# ---------------- LỚP 7 ----------------
"tin7-thiet-bi-vao-ra": K("troi", "⌨️ 🖱️ ➡️ 🖥️ ➡️ 🖨️ 🔊", "✨⚡",
  "Thông tin đi vào – đi ra máy tính", [
  ("⌨️", "Bàn phím", "Đưa <b>chữ, số</b> vào máy tính – thiết bị <b>vào</b>."),
  ("🖱️", "Chuột", "Chọn, nhấp, kéo thả – thiết bị <b>vào</b>."),
  ("🖥️", "Màn hình", "Hiển thị kết quả – thiết bị <b>ra</b>."),
  ("🔊", "Loa", "Phát âm thanh – thiết bị <b>ra</b>.")],
  ("Máy in là thiết bị gì?", ["Thiết bị vào", "Thiết bị ra"], 1, "Máy in đưa kết quả ra giấy."),
  "Em còn biết thiết bị vào – ra nào khác? (micro, máy quét, máy chiếu,…)"),
"tin7-phan-mem-may-tinh": K("dem", "🖥️ ⚙️ 🪟 📱 🎮", "✨⚙️",
  "Phần cứng đủ rồi – máy đã chạy được chưa?", [
  ("🔌", "Phần cứng", "Bàn phím, chuột, màn hình, thân máy… <b>cầm nắm được</b>."),
  ("🪟", "Hệ điều hành", "Windows, Android… <b>điều khiển</b> toàn bộ máy."),
  ("📝", "Phần mềm ứng dụng", "Word, trình duyệt, trò chơi… giúp <b>làm từng việc</b>."),
  ("🤝", "Phối hợp", "Phần cứng + phần mềm → máy tính <b>hoạt động</b>.")],
  ("Thiếu hệ điều hành, máy tính sẽ…", ["Vẫn chơi game được", "Không sử dụng được", "Chạy nhanh hơn"], 1, "Hệ điều hành là phần mềm quan trọng nhất."),
  "Máy tính cần gì nữa để hoạt động ngoài các thiết bị phần cứng?"),
"tin7-quan-li-du-lieu": K("bien", "🧳 📸 📁 🗂️", "🌴☀️",
  "Ảnh du lịch để đâu cho dễ tìm?", [
  ("📸", "Rất nhiều ảnh", "Chuyến du lịch có <b>hàng trăm ảnh</b> và ghi chép."),
  ("😵", "Để lẫn lộn", "Để chung một chỗ → <b>khó tìm</b>."),
  ("📁", "Thư mục", "Chia vào <b>thư mục</b> theo ngày, địa điểm."),
  ("🌳", "Cây thư mục", "Thư mục con trong thư mục mẹ – <b>cây thư mục</b>.")],
  ("Tên thư mục nào dễ tìm hơn?", ["New folder (2)", "DaNang_Ngay1", "abc"], 1, "Tên thư mục nên gợi nội dung bên trong."),
  "Em sẽ tạo những thư mục nào để chứa ảnh và ghi chép chuyến đi?"),
"tin7-mang-xa-hoi": K("troi", "🕊️ 📮 📠 ☎️ 📱", "💬❤️",
  "Hành trình trao đổi thông tin", [
  ("🕊️", "Bồ câu đưa thư", "Cách rất xưa – <b>chậm</b>, dễ thất lạc."),
  ("📮", "Bưu điện", "Thư qua bưu điện mất <b>nhiều ngày</b>."),
  ("☎️", "Điện báo, điện thoại", "Nghe được nhau <b>tức thì</b>."),
  ("📱", "Mạng xã hội", "Thế kỉ XX có Internet → <b>mạng xã hội</b>: chia sẻ ảnh, video, trò chuyện.")],
  ("Đâu là mạng xã hội?", ["Facebook, Zalo", "Microsoft Word", "Máy tính bỏ túi"], 0, "Mạng xã hội kết nối mọi người qua Internet."),
  "Gia đình em dùng mạng xã hội nào? Để làm gì?"),
"tin7-ung-xu-tren-mang": K("tim", "🌐 😊 ⚖️ 😟", "💬❤️",
  "Internet có hai mặt", [
  ("📚", "Học tập", "Tìm tài liệu, học trực tuyến – mặt <b>tích cực</b>."),
  ("🤝", "Kết nối", "Liên lạc bạn bè, người thân – mặt <b>tích cực</b>."),
  ("😠", "Bắt nạt trên mạng", "Bị chê bai, đe doạ – mặt <b>tiêu cực</b>."),
  ("🎮", "Nghiện trò chơi", "Chơi quá nhiều, bỏ học – mặt <b>tiêu cực</b>.")],
  ("Khi bị bắt nạt trên mạng, em nên…", ["Im lặng chịu đựng", "Đáp trả gay gắt", "Báo cho người lớn tin cậy"], 2, "Hãy chia sẻ với bố mẹ, thầy cô."),
  "Làm thế nào để dùng Internet <b>có văn hoá</b> và <b>an toàn</b>?"),
"tin7-phan-mem-bang-tinh": K("cay", "🏫 🌳 🌱 📊", "🍃🌼",
  "Dự án Trường học xanh", [
  ("📍", "Vị trí trồng cây", "Khảo sát: <b>chỗ nào</b> trong trường trồng thêm cây?"),
  ("🌳", "Loại cây", "Cây gì <b>phù hợp</b> từng vị trí?"),
  ("👥", "Học sinh tham gia", "Lớp nào trồng bao nhiêu cây?"),
  ("📊", "Rất nhiều số liệu", "Cần <b>bảng tính</b> để ghi và tính toán.")],
  ("Phần mềm nào giúp ghi và tính số liệu dự án?", ["Phần mềm bảng tính", "Phần mềm vẽ", "Trình duyệt web"], 0, "Ví dụ: Microsoft Excel."),
  "Trường em có thể trồng thêm cây ở đâu? Cần thu thập những số liệu gì?"),
"tin7-tinh-toan-tu-dong": K("cay", "🌱 ➕ 🌱 = ❓", "🔢🍃",
  "Bảng tính có tự tính được không?", [
  ("🔢", "Nhập số", "Em đã biết nhập <b>số, chữ, ngày giờ</b>."),
  ("🧮", "Tính tay", "Tính tay rất lâu, <b>dễ nhầm</b>."),
  ("✍️", "Công thức", "Nhập <b>=B2*C2</b> – máy tự tính!"),
  ("🔄", "Tự cập nhật", "Sửa số liệu → kết quả <b>tự thay đổi</b>.")],
  ("Công thức trong bảng tính bắt đầu bằng dấu gì?", ["Dấu =", "Dấu +", "Dấu #"], 0, "Gõ dấu = trước, rồi đến biểu thức."),
  "Dự án Trường học xanh cần tính những gì? (tổng số cây, kinh phí,…)"),
"tin7-cong-cu-ho-tro-tinh-toan": K("cay", "📋 ➡️ Σ ➡️ ✅", "🔢✨",
  "Hàm – công thức có sẵn", [
  ("Σ", "SUM", "Hàm tính <b>tổng</b>."),
  ("➗", "AVERAGE", "Hàm tính <b>trung bình cộng</b>."),
  ("🔼", "MAX / MIN", "Tìm giá trị <b>lớn nhất / nhỏ nhất</b>."),
  ("🔢", "COUNT", "<b>Đếm</b> số ô chứa số.")],
  ("Cộng 100 ô số liệu, cách nhanh nhất?", ["=A1+A2+…+A100", "=SUM(A1:A100)", "Tính bằng máy tính bỏ túi"], 1, "Hàm SUM tính tổng cả vùng ô."),
  "Trong dự án, em cần tính tổng, trung bình hay tìm giá trị lớn nhất ở đâu?"),
"tin7-trinh-bay-bang-tinh": K("cay", "📊 🤔 🎨 ✨", "🍃🌼",
  "Bảng tính này nhìn đã đẹp chưa?", [
  ("✂️", "Chữ bị che", "Cột hẹp, chữ <b>bị cắt</b>."),
  ("🔢", "Số khó đọc", "Số nhiều chữ số, <b>không phân cách</b>."),
  ("🎨", "Định dạng", "Kẻ khung, tô màu, căn lề → <b>rõ ràng</b>."),
  ("🔀", "Gộp ô", "Gộp ô tiêu đề cho <b>gọn đẹp</b>.")],
  None, "Quan sát Hình 9.1, em thấy cần sửa những gì?"),
"tin7-hoan-thien-bang-tinh": K("cay", "📊 🖨️ 👩‍🏫 👏", "🍃⭐",
  "Sẵn sàng trình bày trước lớp", [
  ("📑", "Nhiều trang tính", "Dữ liệu dự án ở <b>nhiều trang tính</b>."),
  ("🏷️", "Đặt tên trang", "Đổi tên trang tính cho <b>dễ hiểu</b>."),
  ("🖨️", "In bảng tính", "Chọn vùng in, căn chỉnh trang <b>trước khi in</b>."),
  ("👏", "Trình bày", "Bảng tính hoàn chỉnh → <b>báo cáo</b> trước lớp.")],
  None, "Để trình bày trước lớp, bảng tính của nhóm em còn thiếu gì?"),
"tin7-tao-bai-trinh-chieu": K("cay", "👧 👦 🧑 📽️ 🌳", "🍃✨",
  "Báo cáo dự án Trường học xanh", [
  ("📊", "Đã có số liệu", "Khảo sát, tính toán đã <b>xong</b>."),
  ("📽️", "Phần mềm trình chiếu", "Dùng PowerPoint để <b>báo cáo</b>."),
  ("🏷️", "Trang tiêu đề", "Trang đầu: <b>tên dự án</b>, tên nhóm."),
  ("📑", "Tiêu đề trang", "Mỗi trang có <b>tiêu đề</b> để người nghe dễ hiểu.")],
  ("Trang đầu tiên của bài trình chiếu thường là…", ["Trang tiêu đề", "Trang cảm ơn", "Trang trống"], 0, "Trang tiêu đề giới thiệu chủ đề và tác giả."),
  "Bài báo cáo của nhóm em sẽ có những trang nào?"),
"tin7-dinh-dang-trang-chieu": K("tim", "📽️ 🖼️ 🎨 ✨", "🌸⭐",
  "Bài trình chiếu thật ấn tượng", [
  ("📋", "Sao chép nội dung", "Lấy ý tưởng từ tệp <b>.docx</b>, số liệu từ <b>.xlsx</b>."),
  ("🖼️", "Hình ảnh", "Hình ảnh <b>trực quan</b>, thuyết phục."),
  ("🔤", "Phông chữ, màu", "Chữ dễ đọc, màu <b>hài hoà</b>."),
  ("✨", "Ấn tượng", "Hình thức đẹp giúp người nghe <b>nhớ lâu</b>.")],
  ("Một trang chiếu tốt nên…", ["Chữ thật nhiều, kín trang", "Ngắn gọn, có hình minh hoạ", "Dùng 10 màu chữ"], 1, "Ít chữ, có hình ảnh phù hợp."),
  "Em đã thấy bài trình chiếu nào đẹp? Vì sao em thích?"),
"tin7-hoan-thien-bai-trinh-chieu": K("tim", "📽️ ➡️ 💫 🎬", "✨⭐",
  "Thêm hiệu ứng – bài thuyết trình sống động", [
  ("📑", "Đủ nội dung", "Bài trình chiếu đã có <b>đầy đủ thông tin</b>."),
  ("🎨", "Đã định dạng", "Các đối tượng đã được <b>trình bày đẹp</b>."),
  ("💫", "Hiệu ứng động", "Thêm hiệu ứng cho <b>đối tượng</b> xuất hiện lần lượt."),
  ("🎬", "Chuyển trang", "Hiệu ứng <b>chuyển trang</b> mượt mà.")],
  ("Dùng quá nhiều hiệu ứng thì sao?", ["Bài hay hơn", "Người xem bị rối mắt", "Không ảnh hưởng"], 1, "Hiệu ứng vừa phải, phù hợp nội dung."),
  "Hiệu ứng nào giúp bài thuyết trình hấp dẫn mà không gây rối?"),
"tin7-thuat-toan-tim-kiem-tuan-tu": K("cay", "👩 📒 🔍 🌱 🛵", "🌱🍃",
  "Tìm địa chỉ khách mua cây giống", [
  ("📞", "Khách gọi điện", "Khách đặt mua cây và nhờ <b>chở đến nhà</b>."),
  ("📒", "Sổ khách hàng", "Sổ ghi <b>họ tên, địa chỉ, điện thoại</b>."),
  ("👆", "Lần lượt từng dòng", "Dò <b>từ đầu đến cuối</b> cho đến khi thấy tên."),
  ("🛵", "Giao hàng", "Tìm được địa chỉ → mẹ An <b>chở cây đến</b>.")],
  ("Tên khách ở dòng cuối sổ 50 dòng. Dò từ đầu phải xem bao nhiêu dòng?", ["1 dòng", "25 dòng", "50 dòng"], 2, "Tìm kiếm tuần tự có thể phải xét hết danh sách."),
  "Em sẽ tìm tên khách hàng trong sổ như thế nào?"),
"tin7-thuat-toan-tim-kiem-nhi-phan": K("cay", "📚 ✂️ 🔍 🎯", "🌱🔢",
  "Hàng trăm khách hàng – tìm sao cho nhanh?", [
  ("📜", "Danh sách dài", "Có <b>hàng trăm</b> khách – dò từng dòng rất lâu."),
  ("🔤", "Sắp xếp A–Z", "Sắp xếp tên theo <b>thứ tự chữ cái</b>."),
  ("✂️", "Chia đôi", "Mở <b>giữa</b> danh sách, bỏ đi một nửa."),
  ("🎯", "Tìm thấy nhanh", "Cứ chia đôi → <b>vài bước</b> là thấy.")],
  ("Tra từ điển, em thường…", ["Đọc từ trang đầu", "Mở khoảng giữa rồi lật tới/lui", "Đọc từ trang cuối"], 1, "Đó chính là ý tưởng tìm kiếm nhị phân."),
  "Em có gợi ý gì giúp An tìm tên khách hàng nhanh hơn?"),
"tin7-thuat-toan-sap-xep": K("bien", "🥤 🔵 ↔️ 🔴 🥤", "💧✨",
  "Đổi chỗ hai cốc nước màu", [
  ("🔵", "Cốc A: xanh", "Cốc A đựng chất lỏng <b>màu xanh</b>."),
  ("🔴", "Cốc B: đỏ", "Cốc B đựng chất lỏng <b>màu đỏ</b>."),
  ("🥛", "Cốc C rỗng", "Cần thêm <b>cốc thứ ba</b> làm trung gian."),
  ("🔁", "3 bước", "A→C, B→A, C→B: <b>hoán đổi</b> xong!")],
  ("Đổi chỗ hai cốc cần ít nhất mấy lần rót?", ["2 lần", "3 lần", "4 lần"], 1, "Rót A sang C, B sang A, C sang B."),
  "Việc hoán đổi này liên quan gì đến <b>sắp xếp</b> một dãy số?"),
# ---------------- LỚP 8 ----------------
"tin8-luoc-su-cong-cu-tinh-toan": K("cam", "🖐️ ➡️ 🧮 ➡️ ⚙️ ➡️ 💻", "🔢✨",
  "Từ ngón tay đến máy tính", [
  ("🖐️", "Ngón tay", "10 ngón tay – công cụ tính <b>đầu tiên</b>; “digit” nghĩa là ngón tay."),
  ("🧮", "Bàn tính", "Hơn <b>2000 năm TCN</b> đã có bàn tính."),
  ("⚙️", "Máy cơ học", "Máy tính bằng <b>bánh răng</b> (Pascal, Leibniz)."),
  ("💻", "Máy tính điện tử", "Ngày nay: máy tính <b>nhanh, nhỏ gọn</b>.")],
  ("Hệ đếm thập phân dùng mấy chữ số?", ["2", "10", "16"], 1, "Các chữ số từ 0 đến 9 – như 10 ngón tay."),
  "Em đoán công cụ tính toán trong tương lai sẽ như thế nào?"),
"tin8-thong-tin-trong-moi-truong-so": K("cay", "🖼️ 📱 📸 ✉️ 👧", "🌾☁️",
  "Ảnh in hoá thành ảnh số", [
  ("🖼️", "Ảnh in", "Bức ảnh ruộng bậc thang trong <b>tập ảnh cũ</b>."),
  ("📸", "Chụp lại", "Khoa dùng điện thoại <b>chụp lại</b> bức ảnh."),
  ("✉️", "Gửi thư điện tử", "Gửi cho An <b>không cần đến nhà</b>."),
  ("♾️", "Ảnh số", "Ảnh số dễ <b>sao chép, chia sẻ</b>, lưu trữ.")],
  ("Ảnh số khác ảnh in ở chỗ…", ["Không xem được", "Gửi đi xa trong vài giây", "Bị phai màu"], 1, "Thông tin số truyền qua mạng rất nhanh."),
  "Ở nhà em có những thông tin nào ở dạng số?"),
"tin8-khai-thac-thong-tin-so": K("troi", "☀️ 💨 🌊 ⚡ 🔍", "☁️🍃",
  "Năng lượng tái tạo", [
  ("⛽", "Hoá thạch", "Xăng, than – mất <b>hàng triệu năm</b> mới tạo ra."),
  ("⚠️", "Cạn kiệt", "Một ngày nào đó sẽ <b>hết</b>."),
  ("☀️", "Mặt Trời, gió", "Năng lượng <b>tái tạo</b> – dường như vô tận."),
  ("🔍", "Tìm thông tin", "Cần tìm thông tin <b>tin cậy</b> trên Internet.")],
  ("Đâu là năng lượng tái tạo?", ["Than đá", "Năng lượng gió", "Dầu mỏ"], 1, "Gió, Mặt Trời, nước là nguồn tái tạo."),
  "Em sẽ tìm thông tin về năng lượng tái tạo ở đâu? Làm sao biết nguồn đó đáng tin?"),
"tin8-dao-duc-van-hoa-so": K("cay", "👦 📷 🌾 ➡️ 👧 📱", "❤️👍",
  "Ảnh của Khoa – An nên làm thế nào?", [
  ("📷", "Ảnh của Khoa", "Khoa <b>tự chụp</b> ảnh ruộng bậc thang."),
  ("🚫", "Cách 1", "An <b>không xin phép</b>, sửa ảnh, đăng như ảnh mình."),
  ("🙏", "Cách 2", "An <b>xin phép</b>, sửa ảnh, ghi rõ <b>ảnh của Khoa</b>."),
  ("⚖️", "Bản quyền", "Sản phẩm của người khác cần được <b>tôn trọng</b>.")],
  ("An nên làm theo cách nào?", ["Cách 1", "Cách 2"], 1, "Xin phép và ghi nguồn là tôn trọng tác giả."),
  "Em đã bao giờ dùng ảnh của người khác? Em có xin phép không?"),
"tin8-sap-xep-va-loc-du-lieu": K("tim", "📋 🔀 🔽 👥", "💻⭐",
  "Phiếu khảo sát CLB Tin học", [
  ("📋", "Phiếu khảo sát", "Các bạn chọn <b>nội dung Tin học</b> muốn tìm hiểu."),
  ("📊", "Rất nhiều dữ liệu", "Cả lớp trả lời → <b>bảng dữ liệu dài</b>."),
  ("🔤", "Sắp xếp", "Sắp danh sách theo <b>tên, điểm</b>…"),
  ("🔽", "Lọc", "Lọc ra các bạn <b>cùng sở thích</b> lập nhóm.")],
  ("Muốn chỉ hiện các bạn thích “Lập trình”, em dùng…", ["Sắp xếp", "Lọc dữ liệu", "Xoá dòng"], 1, "Lọc chỉ hiển thị các dòng thoả điều kiện."),
  "Từ kết quả khảo sát, CLB cần biết những thông tin gì?"),
"tin8-bieu-do": K("tim", "📋 ↔️ 📊 📈", "⭐✨",
  "Bảng hay biểu đồ?", [
  ("📋", "Bảng", "Số liệu <b>chính xác</b>, nhưng phải đọc từng ô."),
  ("📊", "Biểu đồ cột", "<b>So sánh</b> các số liệu ngay bằng mắt."),
  ("🥧", "Biểu đồ tròn", "Thấy <b>tỉ lệ phần trăm</b> của từng phần."),
  ("📈", "Biểu đồ đường", "Thấy <b>xu hướng</b> tăng, giảm.")],
  ("Muốn thấy ngay nội dung nào được chọn nhiều nhất, nên xem…", ["Bảng", "Biểu đồ"], 1, "Biểu đồ trực quan, dễ so sánh."),
  "Quan sát Hình 7.1 và 7.2: cách nào giúp em nhận ra kết quả nhanh hơn?"),
"tin8-bieu-dien-du-lieu": K("cay", "🔢 🔤 📅 🧮", "✨🔢",
  "Nhớ lại các kiểu dữ liệu", [
  ("🔢", "Kiểu số", "Tuổi, điểm, giá tiền – <b>tính toán được</b>."),
  ("🔤", "Kiểu văn bản", "Họ tên, địa chỉ – <b>chữ</b>."),
  ("📅", "Ngày, giờ", "Ngày sinh, thời gian."),
  ("🧮", "Công thức", "Bắt đầu bằng dấu <b>=</b>, cho ra kết quả.")],
  ("“0907654137” nên để kiểu gì?", ["Kiểu số", "Kiểu văn bản"], 1, "Số điện thoại không dùng để tính và cần giữ số 0 đầu."),
  "Vì sao cần chọn đúng kiểu dữ liệu cho mỗi cột?"),
"tin8-bang-tinh-bai-toan-thuc-te": K("cam", "👨‍💼 💾 🛒 💰", "💵✨",
  "Doanh thu của các phần mềm", [
  ("💾", "Phần mềm", "Công ti bố Khoa sản xuất <b>phần mềm</b>."),
  ("🛒", "Chợ ứng dụng", "Đưa lên <b>chợ ứng dụng</b> trên mạng."),
  ("🆓", "Có phí / miễn phí", "Có phần mềm <b>trả phí</b>, có phần mềm <b>miễn phí</b>."),
  ("💰", "Doanh thu", "Khoa dùng bảng tính <b>tính doanh thu</b>.")],
  ("Doanh thu = ?", ["Số lượt tải × đơn giá", "Số lượt tải + đơn giá", "Đơn giá − số lượt tải"], 0, "Nhân số lượng với giá bán."),
  "Bảng tính trong Hình 5.1 cần những công thức nào?"),
"tin8-danh-sach-hinh-anh": K("tim", "📋 1️⃣ 2️⃣ 3️⃣ ✨", "⭐🔢",
  "Phiếu khảo sát của An", [
  ("📋", "Danh sách nội dung", "Phiếu có <b>danh sách</b> nội dung Tin học."),
  ("⌨️", "Gõ từng số?", "Gõ tay 1, 2, 3… – <b>tốn thời gian</b>."),
  ("❌", "Dễ nhầm", "Thêm, xoá mục → <b>sai thứ tự</b>."),
  ("🔢", "Đánh số tự động", "Phần mềm <b>tự đánh số</b> danh sách.")],
  ("Xoá mục 3 trong danh sách đánh số tự động thì…", ["Số thứ tự tự cập nhật", "Phải gõ lại hết"], 0, "Đó là lợi ích của danh sách liệt kê."),
  "Với danh sách hàng trăm mục, làm sao nhập nhanh mà không nhầm?"),
"tin8-dau-trang-chan-trang": K("cam", "📄 🔍 📄", "📖✨",
  "Tìm điểm khác nhau giữa hai trang", [
  ("⬆️", "Đầu trang", "Dòng chữ ở <b>trên cùng</b> mỗi trang."),
  ("⬇️", "Chân trang", "Dòng chữ ở <b>dưới cùng</b> mỗi trang."),
  ("🔢", "Số trang", "Giúp <b>tìm nhanh</b> nội dung."),
  ("📚", "Trong sách", "Sách, truyện em đọc <b>đều có</b> những phần này.")],
  ("Số trang thường nằm ở đâu?", ["Giữa trang", "Đầu trang hoặc chân trang"], 1, "Phần mềm tự đánh số trang ở đầu/chân trang."),
  "Đầu trang, chân trang trong sách em đọc có tác dụng gì?"),
"tin8-ban-mau-trinh-chieu": K("tim", "📽️ 🎨 ↔️ 📽️", "✨🌈",
  "Trang chiếu nào đẹp hơn?", [
  ("⬜", "Trang trơn", "Trang chiếu Bài 10a – <b>đơn giản</b>."),
  ("🎨", "Mẫu thiết kế", "Có <b>nền, màu, phông chữ</b> phối sẵn."),
  ("🔁", "Đồng bộ", "Mọi trang <b>cùng phong cách</b>."),
  ("⏱️", "Tiết kiệm thời gian", "Không cần định dạng <b>từng trang</b>.")],
  None, "So sánh hai trang chiếu ở Hình 11a.1 với trang chiếu em đã tạo. Em nhận xét gì?"),
"tin8-trang-chieu-nang-cao": K("tim", "🎉 📽️ 🎤 💻", "🎈✨",
  "Lễ ra mắt CLB Tin học", [
  ("🎯", "Ngắn gọn", "Mỗi trang <b>ít chữ</b>, đủ ý."),
  ("🖼️", "Ấn tượng", "Hình ảnh, <b>bố cục</b> đẹp."),
  ("💡", "Sáng tạo", "Ý tưởng <b>độc đáo</b>, mới lạ."),
  ("🎨", "Đồng bộ", "Màu sắc, phông chữ <b>thống nhất</b>.")],
  None, "Theo em, An cần chú ý những điều gì khi tạo bài trình chiếu?"),
"tin8-tu-thuat-toan-den-chuong-trinh": K("tim", "🐱 ➡️ 🔺 🟥", "⭐✨",
  "Điều khiển nhân vật vẽ hình", [
  ("🔺", "Tam giác đều", "Nhân vật đi <b>3 cạnh</b>, mỗi lần quay 120°."),
  ("🟥", "Hình vuông", "Đi <b>4 cạnh</b>, mỗi lần quay 90°."),
  ("📝", "Thuật toán", "Mô tả <b>các bước</b> trước."),
  ("🧩", "Chương trình", "Ghép <b>khối lệnh</b> Scratch theo thuật toán.")],
  ("Vẽ hình vuông, nhân vật lặp lại mấy lần “đi rồi quay”?", ["3 lần", "4 lần", "5 lần"], 1, "Hình vuông có 4 cạnh."),
  "Khoa cần làm những công việc gì để tạo chương trình?"),
"tin8-cau-truc-dieu-khien": K("tim", "🐱 ➡️ 🔀 🔁", "⭐🧩",
  "Cấu trúc điều khiển trong Scratch", [
  ("⬇️", "Tuần tự", "Lệnh thực hiện <b>lần lượt</b> từ trên xuống."),
  ("🔀", "Rẽ nhánh", "<b>Nếu… thì…</b> – chọn việc theo điều kiện."),
  ("🔁", "Lặp", "<b>Lặp lại</b> một việc nhiều lần."),
  ("🧩", "Khối lệnh", "Scratch có <b>khối lệnh</b> cho từng cấu trúc.")],
  ("“Nếu trời mưa thì mang ô” là cấu trúc gì?", ["Tuần tự", "Rẽ nhánh", "Lặp"], 1, "Có điều kiện “nếu… thì…”."),
  "Em tìm thêm ví dụ trong cuộc sống cho mỗi cấu trúc?"),
"tin8-go-loi": K("dem", "🐱 💻 🐞 🔍 ✅", "🐞✨",
  "Chương trình có “con bọ”!", [
  ("🐞", "Bug là gì?", "Lỗi trong chương trình gọi là <b>“bug” – con bọ</b>."),
  ("🔍", "Tìm lỗi", "Chạy thử, <b>quan sát</b> kết quả sai ở đâu."),
  ("🔧", "Sửa lỗi", "Sửa lệnh sai, <b>chạy lại</b>."),
  ("✅", "Chạy đúng", "Gỡ lỗi xong → chương trình <b>chạy đúng</b>.")],
  ("“Debug” nghĩa là gì?", ["Viết chương trình mới", "Tìm và sửa lỗi", "Xoá chương trình"], 1, "De-bug: bắt “con bọ”."),
  "Khi chương trình chạy sai, em sẽ làm gì đầu tiên?"),
"tin8-tin-hoc-nghe-nghiep": K("cam", "👩‍💼 👨‍🏫 👩‍⚕️ 👨‍💻", "💼✨",
  "Nghề nào dùng tin học hiệu quả nhất?", [
  ("📊", "Kế toán", "Theo dõi giao dịch, lập <b>báo cáo tài chính</b>."),
  ("👨‍🏫", "Giáo viên", "Soạn bài, trình chiếu, <b>dạy học trực tuyến</b>."),
  ("🩺", "Bác sĩ", "Hồ sơ bệnh án, <b>chẩn đoán hình ảnh</b>."),
  ("🏗️", "Kiến trúc sư", "Vẽ thiết kế bằng <b>phần mềm</b>.")],
  None, "Bố mẹ, người thân em làm nghề gì? Tin học giúp gì cho công việc đó?"),
# ---------------- LỚP 9 ----------------
"tin9-the-gioi-ki-thuat-so": K("dem", "🧠 💻 🤖 📱 ⌚ 🚗", "✨⚡",
  "Bộ xử lí ở khắp quanh ta", [
  ("💻", "Máy tính", "Bộ xử lí là <b>“bộ não”</b> của máy tính."),
  ("🤖", "Robot lau nhà", "Tự tìm đường, <b>tránh vật cản</b>."),
  ("⌚", "Đồng hồ thông minh", "Đếm bước chân, <b>đo nhịp tim</b>."),
  ("🚗", "Ô tô", "Điều khiển động cơ, <b>túi khí</b>, định vị.")],
  ("Thiết bị nào KHÔNG có bộ xử lí?", ["Điện thoại thông minh", "Cái kéo", "Máy giặt cửa ngang"], 1, "Cái kéo là dụng cụ cơ học đơn giản."),
  "Em hãy kể thêm thiết bị có gắn bộ xử lí trong nhà em."),
"tin9-thong-tin-giai-quyet-van-de": K("troi", "👦 🏫 ❓ 🏫 👧", "📚⭐",
  "Chọn trường nào sau THCS?", [
  ("🏛️", "Công lập", "Học phí thấp, <b>Nhà nước đầu tư</b> trang thiết bị."),
  ("🏢", "Dân lập", "Kế hoạch <b>linh hoạt</b>, nhiều hoạt động, doanh nghiệp."),
  ("🔍", "Cần thông tin", "Phải tìm hiểu <b>thông tin</b> để so sánh."),
  ("✅", "Quyết định", "Thông tin <b>đầy đủ, tin cậy</b> → chọn đúng.")],
  ("Để quyết định chọn trường, An cần nhất là…", ["Thông tin về các trường", "Hỏi ý kiến người lạ trên mạng", "Chọn ngẫu nhiên"], 0, "Thông tin tốt giúp giải quyết vấn đề."),
  "Em sẽ tìm thông tin về các trường ở đâu?"),
"tin9-danh-gia-chat-luong-thong-tin": K("troi", "🔍 📄 ⚖️ ✅", "📚⭐",
  "Thông tin nào đáng tin?", [
  ("🎯", "Phù hợp", "Thông tin có <b>đúng nhu cầu</b> của em không?"),
  ("📅", "Mới", "Thông tin có <b>cập nhật</b> không?"),
  ("🏛️", "Nguồn tin cậy", "Trang của <b>Sở GD, trường học</b>…"),
  ("✔️", "Chính xác", "So sánh <b>nhiều nguồn</b> để kiểm tra.")],
  ("Nguồn nào tin cậy hơn khi tìm điểm chuẩn vào lớp 10?", ["Bài đăng ẩn danh", "Trang web Sở GD&ĐT"], 1, "Nguồn chính thức đáng tin cậy hơn."),
  "Em muốn tìm hiểu thông tin gì cho việc học sau THCS và nghề nghiệp tương lai?"),
"tin9-phap-li-dich-vu-internet": K("dem", "📱 😊 ⚖️ 😟 🚫", "⚡❗",
  "Mặt trái của công nghệ", [
  ("👍", "Thuận tiện", "Học tập, làm việc, giải trí <b>dễ dàng</b> hơn."),
  ("🎣", "Lừa đảo", "Tin nhắn, đường link <b>lừa đảo</b> chiếm tài khoản."),
  ("📢", "Tin giả", "Tin sai lệch lan truyền <b>rất nhanh</b>."),
  ("⚖️", "Pháp luật", "Có <b>luật</b> quy định hành vi trên mạng.")],
  ("Nhận tin “trúng thưởng, bấm link nhận quà”. Em sẽ…", ["Bấm ngay", "Không bấm, báo người lớn", "Chia sẻ cho bạn bè"], 1, "Đó thường là lừa đảo."),
  "Em hoặc người thân đã gặp tác động tiêu cực nào của công nghệ?"),
"tin9-trao-doi-hop-tac": K("tim", "👧 👦 🧑 🏛️ 🎨", "⭐🎉",
  "Triển lãm tin học lớp 9A", [
  ("📔", "Sổ lưu niệm", "Một nhóm trưng bày <b>sổ lưu niệm</b>."),
  ("🖼️", "Bộ ảnh CLB", "Nhóm khác trưng bày <b>ảnh CLB Tin học</b>."),
  ("🎮", "Trò chơi", "Trò chơi bằng <b>lập trình trực quan</b>."),
  ("🧮", "Lược sử", "Nhóm An: <b>Lược sử công cụ tính toán</b>.")],
  None, "Để chuẩn bị triển lãm, các bạn trong nhóm cần trao đổi, hợp tác như thế nào?"),
"tin9-cong-cu-truc-quan": K("tim", "🧠 📽️ 📊 🎬", "⭐✨",
  "Nhớ lại Bài 7", [
  ("🧠", "Sơ đồ tư duy", "Sắp xếp ý tưởng, <b>đính kèm dữ liệu</b>."),
  ("📽️", "Trình chiếu", "Trình bày nội dung trước nhóm, lớp."),
  ("📊", "Biểu đồ", "Số liệu <b>trực quan</b>, dễ so sánh."),
  ("🎬", "Video", "Minh hoạ <b>sinh động</b>, đúng lúc.")],
  None, "Em đã dùng công cụ nào để trao đổi, hợp tác với bạn bè?"),
"tin9-khai-thac-phan-mem-mo-phong": K("dem", "🔬 💻 🧪 🪐", "✨⭐",
  "Thí nghiệm ảo", [
  ("🧪", "An toàn", "Làm thí nghiệm <b>không sợ nguy hiểm</b>."),
  ("💰", "Tiết kiệm", "Không tốn <b>hoá chất, dụng cụ</b>."),
  ("🔁", "Làm lại nhiều lần", "Thay đổi thông số, <b>thử lại</b> thoải mái."),
  ("🪐", "Điều không thấy được", "Quan sát <b>hành tinh, nguyên tử</b>…")],
  ("Phần mềm mô phỏng giúp em…", ["Thay thế hoàn toàn giáo viên", "Quan sát, khám phá hiện tượng", "Chơi game giải trí"], 1, "Mô phỏng giúp hiểu hiện tượng khoa học."),
  "Em muốn làm thí nghiệm ảo về hiện tượng nào?"),
"tin9-tim-hieu-phan-mem-mo-phong": K("tim", "🎨 🔴 ➕ ⚪ = 🌸", "🖌️✨",
  "Pha màu cánh sen thế nào?", [
  ("🎨", "Pha màu thật", "Pha <b>nhiều lần</b> mà chưa ưng ý."),
  ("🟤", "Màu xỉn đục", "Trộn quá nhiều → màu <b>không dùng được</b>."),
  ("💻", "Phần mềm mô phỏng", "Thử pha màu <b>trên máy</b> trước."),
  ("🌸", "Tiết kiệm", "Đỡ tốn <b>thời gian và màu vẽ</b>.")],
  ("Đỏ + trắng cho ra màu gì?", ["Hồng", "Xanh lá", "Đen"], 0, "Thêm trắng làm màu nhạt đi."),
  "Ngoài pha màu, em còn biết phần mềm mô phỏng nào?"),
"tin9-xac-thuc-du-lieu": K("cam", "🏠 💰 📊 ✅", "💵✨",
  "Dự án Quản lí tài chính gia đình", [
  ("💵", "Thu nhập", "Ghi các khoản <b>thu</b> của gia đình."),
  ("🛒", "Chi tiêu", "Ghi các khoản <b>chi</b>: ăn uống, học tập…"),
  ("⚠️", "Nhập sai", "Gõ nhầm tên khoản, số âm → <b>tính sai</b>."),
  ("✅", "Xác thực dữ liệu", "Bảng tính <b>chặn</b> dữ liệu không hợp lệ.")],
  ("Ô “Số tiền chi” nhập “-50000” là…", ["Hợp lệ", "Không hợp lệ"], 1, "Số tiền chi phải là số dương."),
  "Bảng tính quản lí tài chính gia đình cần những cột nào?"),
"tin9-ham-countif": K("cam", "📋 🔢 ❓ 💰", "💵✨",
  "Mỗi khoản đã chi bao nhiêu lần?", [
  ("🍚", "Ăn uống", "Chi <b>nhiều lần</b> trong tháng."),
  ("📚", "Học tập", "Mua sách vở, học phí."),
  ("🔢", "Đếm có điều kiện", "Đếm số lần chi <b>theo từng khoản</b>."),
  ("⚡", "COUNTIF", "Hàm <b>COUNTIF</b> đếm tự động.")],
  ("Đếm số lần chi cho “Ăn uống” dùng hàm…", ["SUM", "COUNTIF", "MAX"], 1, "COUNTIF đếm ô thoả điều kiện."),
  "Em muốn biết những thông tin gì từ bảng thu, chi của gia đình?"),
"tin9-ham-sumif": K("cam", "🍚 📚 🎮 ➡️ Σ", "💵✨",
  "Tổng tiền theo từng khoản", [
  ("🔢", "Đã đếm", "COUNTIF cho biết <b>số lần</b> chi."),
  ("💰", "Cần tổng tiền", "Mỗi khoản đã chi <b>bao nhiêu tiền</b>?"),
  ("Σ", "Cộng có điều kiện", "Chỉ cộng các ô <b>đúng khoản mục</b>."),
  ("⚡", "SUMIF", "Hàm <b>SUMIF</b> tính tự động.")],
  ("SUMIF khác SUM ở chỗ…", ["Cộng theo điều kiện", "Cộng nhanh hơn", "Đếm số ô"], 0, "Chỉ cộng các giá trị thoả điều kiện."),
  "Khoản chi nào của gia đình em có thể nhiều nhất?"),
"tin9-ham-if": K("cam", "💰 ➡️ 🏠 🎁 🐷", "💵✨",
  "Quy tắc 50 – 30 – 20", [
  ("🏠", "50% thiết yếu", "Ăn, ở, <b>sức khoẻ</b>."),
  ("🎁", "30% mong muốn", "Giải trí, <b>thời trang</b>."),
  ("🐷", "20% tiết kiệm", "Để dành, <b>đầu tư</b>."),
  ("🔀", "IF", "<b>Nếu</b> vượt mức <b>thì</b> cảnh báo – hàm IF.")],
  ("Thu nhập 10 triệu, tiết kiệm theo quy tắc là…", ["1 triệu", "2 triệu", "5 triệu"], 1, "20% của 10 triệu là 2 triệu."),
  "Chi tiêu của gia đình em đã hợp lí theo quy tắc 50-30-20 chưa?"),
"tin9-tai-chinh-gia-dinh": K("cam", "💵 ⚖️ 🛒", "💰✨",
  "Bảng tính cần bổ sung gì?", [
  ("💵", "Trang Thu nhập", "Đã có – ghi các khoản <b>thu</b>."),
  ("🛒", "Trang Chi tiêu", "Đã có – ghi các khoản <b>chi</b>."),
  ("⚖️", "Cân đối", "Thu – Chi = <b>còn lại</b> bao nhiêu?"),
  ("📊", "Tổng hợp", "Biểu đồ, <b>báo cáo</b> theo tháng.")],
  None, "Theo em, để kiểm soát chi tiêu hiệu quả, bảng tính cần bổ sung thông tin gì?"),
"tin9-giai-quyet-van-de": K("cay", "🧒 🌀 🚪 🏁", "🌳✨",
  "Thoát khỏi mê cung!", [
  ("🌀", "Mê cung", "Nhiều lối rẽ, <b>không có sơ đồ</b>."),
  ("✋", "Bám tường", "Mẹo: luôn <b>đặt tay lên một bên tường</b> mà đi."),
  ("🔙", "Ngõ cụt", "Gặp ngõ cụt thì <b>quay lại</b>."),
  ("🏁", "Lối ra", "Có <b>cách làm rõ ràng</b> → tìm được lối ra.")],
  ("Tìm đường ra mê cung là một…", ["Vấn đề cần giải quyết", "Bài hát", "Trò chơi may rủi"], 0, "Cần chiến lược – một thuật toán."),
  "Em có cách nào để chắc chắn thoát khỏi mê cung?"),
"tin9-bai-toan-tin-hoc": K("cam", "🏢 👩‍💼 💻 💵", "💰✨",
  "Máy tính tính lương", [
  ("📅", "Ngày công", "Mỗi nhân viên đi làm <b>bao nhiêu ngày</b>."),
  ("💵", "Lương cơ bản", "Mức lương theo <b>vị trí</b>."),
  ("➕", "Thưởng", "Làm tốt → <b>thưởng</b> thêm."),
  ("💻", "Máy tính tính", "Đưa dữ liệu vào → <b>máy tính</b> trả kết quả.")],
  ("Đầu vào của bài toán tính lương là…", ["Bảng lương đã tính", "Ngày công, mức lương", "Tiền trong ví"], 1, "Đầu vào là dữ liệu cần để tính."),
  "Việc nào khác trong cuộc sống có thể giao cho máy tính giải quyết?"),
"tin9-lap-chuong-trinh-may-tinh": K("dem", "⬇️ 🔀 🔁 ➡️ 💻", "✨🧩",
  "Ba cấu trúc điều khiển cơ bản", [
  ("⬇️", "Tuần tự", "Các bước <b>nối tiếp</b> nhau."),
  ("🔀", "Rẽ nhánh", "<b>Nếu… thì… nếu không thì…</b>"),
  ("🔁", "Lặp", "<b>Lặp lại</b> khi điều kiện còn đúng."),
  ("💻", "Chương trình", "Mọi thuật toán đều dựng từ <b>3 cấu trúc</b> này.")],
  ("Tính tổng 1 + 2 + … + 100 cần cấu trúc nào?", ["Rẽ nhánh", "Lặp"], 1, "Phép cộng được lặp lại 100 lần."),
  "Em hãy nêu ví dụ một công việc có cả rẽ nhánh và lặp."),
"tin9-the-gioi-nghe-nghiep": K("tim", "👦 🎮 👧 🎨 🧑 🌐", "⭐✨",
  "Sở trường và nghề nghiệp", [
  ("📝", "Khoa – kịch bản", "Viết <b>kịch bản</b>, lập trình trò chơi."),
  ("🎨", "An – đồ hoạ", "Vẽ <b>nhân vật, phong cảnh</b> trên máy tính."),
  ("🌐", "Minh – vận hành", "Đưa trò chơi lên Internet, <b>duy trì</b> hệ thống."),
  ("💼", "Nghề nghiệp", "Mỗi sở trường gắn với <b>một nghề</b> tin học.")],
  None, "Sở trường của em là gì? Em thấy mình hợp với nghề nào?"),
}

# Đoạn trò chuyện gợi mở (tự soạn, không có trong SGK) cho các bài SGK không có hội thoại.
# Mỗi dòng: (tên, lời nói) — hoặc (lời dẫn,) cho câu dẫn chuyện. hoithoai.js tự đổi thành khung chat.
CHAT = {
# ---------------- LỚP 6 ----------------
"tin6-thong-tin-va-du-lieu": [
  ("Trên đường đến trường, Minh dừng lại ở ngã tư.",),
  ("Minh", "Đèn chuyển sang màu xanh rồi, xe cũng dừng hết. Mình qua đường thôi!"),
  ("An", "Sao bạn biết lúc nào qua đường được thế?"),
  ("Minh", "Thì mắt tớ <b>nhìn thấy</b> đèn xanh, tai <b>nghe</b> tiếng xe đã ngừng, rồi bộ não tớ nghĩ: an toàn!"),
  ("Khoa", "Vậy những gì mắt thấy, tai nghe ấy gọi là gì nhỉ? Hôm nay mình tìm hiểu nhé!")],
"tin6-xu-li-thong-tin": [
  ("Minh", "Tối qua tớ xem bóng đá, cầu thủ sút phạt đền đẹp lắm!"),
  ("Khoa", "Sút vào góc nào thế?"),
  ("Minh", "Anh ấy <b>quan sát</b> thủ môn rất kĩ, <b>đoán</b> góc sơ hở rồi mới sút vào góc cao."),
  ("An", "Vậy là anh ấy thu nhận thông tin, suy nghĩ rồi hành động. Máy tính có làm được như vậy không nhỉ?")],
"tin6-thong-tin-trong-may-tinh": [
  ("An", "Tớ gõ chữ “Xin chào” vào máy tính, máy hiện ra ngay. Máy tính hiểu tiếng Việt à?"),
  ("Khoa", "Không đâu! Máy tính chỉ làm việc với hai kí hiệu thôi: <b>0 và 1</b>."),
  ("Minh", "Chỉ hai kí hiệu mà lưu được cả chữ, ảnh, bài hát sao?"),
  ("Khoa", "Đúng thế! Bí mật nằm ở cách máy tính <b>mã hoá</b> thông tin. Cùng tìm hiểu nhé!")],
"tin6-mang-thong-tin-toan-cau": [
  ("An", "Tớ vào một trang web về khủng long, bấm vào một dòng chữ thì nhảy sang trang về hoá thạch."),
  ("Minh", "Rồi từ trang hoá thạch lại sang trang bảo tàng ở nước ngoài, đúng không?"),
  ("An", "Đúng! Cứ bấm mãi mà không hết."),
  ("Khoa", "Vì các trang được <b>liên kết</b> với nhau như một <b>mạng nhện</b> khổng lồ phủ khắp thế giới đấy!")],
"tin6-tim-kiem-thong-tin-tren-internet": [
  ("Minh", "Tớ chỉ nhớ mỗi câu “Em yêu trường em…” mà muốn nghe cả bài hát."),
  ("An", "Gõ câu đó vào <b>máy tìm kiếm</b> là ra ngay thôi!"),
  ("Minh", "Thật à? Trên Internet có hàng tỉ trang mà tìm nhanh thế được sao?"),
  ("Khoa", "Được chứ, chỉ cần chọn đúng <b>từ khoá</b>. Mình học cách tìm cho nhanh nhé!")],
"tin6-thu-dien-tu": [
  ("An", "Ngày xưa ông bà mình gửi thư phải chờ cả tuần mới đến."),
  ("Minh", "Còn xưa hơn nữa người ta nhờ <b>chim bồ câu</b> đưa thư cơ!"),
  ("Khoa", "Bây giờ tớ gửi thư cho anh họ ở nước ngoài, chỉ vài giây là anh ấy nhận được."),
  ("An", "Bạn gửi bằng cách nào thế? Chỉ cho tớ với!")],
"tin6-thuat-toan": [
  ("An", "Tớ có tờ hướng dẫn gấp trò chơi Đông – Tây – Nam – Bắc nhưng các bước bị xáo trộn hết rồi."),
  ("Minh", "Thử gấp theo thứ tự lung tung xem sao?"),
  ("An", "Không được đâu, gấp sai một bước là hỏng cả hình."),
  ("Khoa", "Vậy phải sắp các bước theo <b>đúng thứ tự</b>. Một dãy bước như thế gọi là gì nhỉ?")],
"tin6-cac-cau-truc-dieu-khien": [
  ("Minh", "Lớp mình chơi trò “Đúng hay Sai” vui ghê! Trả lời đúng là được cộng điểm."),
  ("An", "<b>Nếu</b> trả lời đúng <b>thì</b> cộng một điểm, còn sai thì không."),
  ("Khoa", "Và cứ đọc câu – trả lời – tính điểm, <b>lặp đi lặp lại</b> cho đến khi hết một phút."),
  ("Minh", "Trò chơi mà cũng có “nếu… thì…” với “lặp lại”, giống thuật toán quá!")],
"tin6-chuong-trinh-may-tinh": [
  ("Khoa", "An ơi, nhắm mắt lại nhé. Tớ đọc chỉ dẫn, bạn vẽ lại bức tranh của tớ."),
  ("An", "Được! Bạn nói rõ từng bước nhé."),
  ("Khoa", "Vẽ một hình vuông… rồi vẽ một hình tam giác ở trên."),
  ("An", "Tam giác to hay nhỏ, đặt ở đâu? Chỉ dẫn chưa rõ thì tớ vẽ sai mất!"),
  ("Minh", "Máy tính cũng thế: phải ra lệnh thật rõ ràng nó mới làm đúng.")],
"tin6-tim-kiem-va-thay-the": [
  ("Minh", "An ơi, cho tớ công thức kem sữa chua dưa hấu, tớ muốn làm kem <b>xoài</b>."),
  ("An", "Công thức dài lắm, chữ “dưa hấu” xuất hiện ở rất nhiều chỗ."),
  ("Minh", "Vậy phải sửa từng chữ một à? Lâu lắm!"),
  ("Khoa", "Phần mềm soạn thảo có công cụ <b>Tìm và Thay thế</b>, chỉ vài cú nhấp là xong!")],
"tin6-hoan-thien-so-luu-niem": [
  ("An", "Tớ có bài viết cảm nghĩ, Minh có danh sách lớp dạng bảng, còn Khoa có sơ đồ tư duy."),
  ("Minh", "Giờ ghép tất cả thành một cuốn <b>sổ lưu niệm</b> hoàn chỉnh thôi!"),
  ("Khoa", "Nhóm mình phân công nhé: ai trình bày bìa, ai thêm ảnh, ai kiểm tra lỗi chính tả?")],
# ---------------- LỚP 7 ----------------
"tin7-thiet-bi-vao-ra": [
  ("An", "Tớ gõ bàn phím, chữ hiện lên màn hình; bấm in, giấy chạy ra từ máy in."),
  ("Minh", "Bàn phím đưa thông tin <b>vào</b> máy tính, còn máy in đưa kết quả <b>ra</b>."),
  ("Khoa", "Thế còn micro, loa, máy quét… thì sao nhỉ? Mình cùng xếp loại nhé!")],
"tin7-phan-mem-may-tinh": [
  ("Minh", "Tớ đã cắm đủ bàn phím, chuột, màn hình vào thân máy rồi mà vẫn chưa dùng được."),
  ("Khoa", "Máy đã cài <b>hệ điều hành</b> chưa?"),
  ("Minh", "Hệ điều hành là gì? Phần cứng chưa đủ sao?"),
  ("An", "Chưa đủ đâu! Máy tính cần cả <b>phần mềm</b> mới hoạt động được.")],
"tin7-quan-li-du-lieu": [
  ("An", "Chuyến đi Đà Lạt tớ chụp hơn 300 ảnh, giờ tìm ảnh ở hồ Xuân Hương mãi không thấy."),
  ("Minh", "Bạn để tất cả ảnh chung một chỗ à?"),
  ("An", "Ừ, lẫn lộn hết cả."),
  ("Khoa", "Hãy chia ra các <b>thư mục</b> theo ngày, theo địa điểm, đặt tên dễ hiểu là tìm ngay!")],
"tin7-mang-xa-hoi": [
  ("Minh", "Ông tớ kể ngày xưa liên lạc với người ở xa phải gửi thư, chờ cả tháng."),
  ("An", "Bây giờ thì chỉ cần nhắn tin, gọi video là thấy nhau ngay."),
  ("Khoa", "Nhờ <b>mạng xã hội</b> đấy. Nhưng dùng thế nào cho đúng thì không phải ai cũng biết.")],
"tin7-ung-xu-tren-mang": [
  ("An", "Hôm qua có người lạ vào bình luận chê bai ảnh của tớ, tớ buồn lắm."),
  ("Minh", "Tớ cũng thấy có bạn chơi điện tử đến khuya, sáng ngủ gật trong lớp."),
  ("Khoa", "Internet có rất nhiều lợi ích, nhưng cũng có <b>mặt trái</b>. Mình cần biết <b>ứng xử</b> cho đúng.")],
"tin7-phan-mem-bang-tinh": [
  ("An", "Nhóm mình nhận dự án <b>Trường học xanh</b>: trồng thêm cây trong trường."),
  ("Minh", "Phải ghi lại vị trí, loại cây, số cây của mỗi lớp… nhiều số liệu quá!"),
  ("Khoa", "Ghi vào vở thì dễ nhầm. Thử dùng <b>phần mềm bảng tính</b> xem!")],
"tin7-tinh-toan-tu-dong": [
  ("Minh", "Tớ đã nhập xong số cây của từng lớp vào bảng tính rồi."),
  ("An", "Giờ tính tổng số cây, tớ lấy máy tính bỏ túi bấm nhé?"),
  ("Khoa", "Không cần đâu! Gõ <b>công thức</b> vào ô là bảng tính <b>tự tính</b>, sửa số là kết quả tự đổi.")],
"tin7-cong-cu-ho-tro-tinh-toan": [
  ("An", "Bảng có 40 lớp, gõ công thức =B2+B3+B4+… dài quá!"),
  ("Minh", "Lại còn phải tính trung bình, tìm lớp trồng nhiều cây nhất nữa."),
  ("Khoa", "Bảng tính có sẵn <b>hàm</b> như SUM, AVERAGE, MAX… chỉ một dòng ngắn là xong!")],
"tin7-trinh-bay-bang-tinh": [
  ("Minh", "Các bạn xem bảng tính dự án của tớ này."),
  ("An", "Chữ bị che mất một nửa, số thì dài khó đọc quá."),
  ("Khoa", "Mình <b>định dạng</b> lại cho đẹp: chỉnh độ rộng cột, căn lề, kẻ khung, tô màu tiêu đề.")],
"tin7-hoan-thien-bang-tinh": [
  ("An", "Thứ Hai này nhóm mình trình bày dự án trước lớp rồi!"),
  ("Minh", "Bảng tính có mấy trang tính tên là Sheet1, Sheet2… khó hiểu quá."),
  ("Khoa", "Đổi tên trang tính, kiểm tra lại dữ liệu rồi <b>in</b> ra cho cả lớp xem nhé!")],
"tin7-tao-bai-trinh-chieu": None,
"tin7-dinh-dang-trang-chieu": None,
"tin7-hoan-thien-bai-trinh-chieu": [
  ("Minh", "Bài trình chiếu đủ nội dung rồi, nhưng chiếu lên thấy hơi đơn điệu."),
  ("An", "Hay thêm hiệu ứng cho chữ và hình xuất hiện lần lượt?"),
  ("Khoa", "Ý hay! Nhưng đừng dùng quá nhiều hiệu ứng, kẻo người xem bị rối mắt.")],
"tin7-thuat-toan-tim-kiem-tuan-tu": [
  ("An", "Có khách gọi mua cây giống, mẹ nhờ tớ tìm địa chỉ trong sổ khách hàng."),
  ("Minh", "Sổ có nhiều khách không?"),
  ("An", "Mấy chục người, tên lại không xếp theo thứ tự gì cả."),
  ("Khoa", "Vậy thì dò <b>lần lượt từng dòng</b> từ đầu sổ cho đến khi thấy tên thôi!")],
"tin7-thuat-toan-tim-kiem-nhi-phan": [
  ("An", "Cửa hàng nhà tớ giờ có hàng trăm khách, dò từng dòng mỏi mắt luôn."),
  ("Minh", "Lúc tra từ điển, tớ có đọc từ trang đầu đâu, tớ mở khoảng giữa rồi lật tới lật lui."),
  ("Khoa", "Đúng rồi! Nếu danh sách đã <b>sắp xếp</b>, ta có thể <b>chia đôi</b> để tìm nhanh hơn nhiều.")],
"tin7-thuat-toan-sap-xep": [
  ("Minh", "Cốc A đựng nước xanh, cốc B đựng nước đỏ. Làm sao đổi chỗ hai thứ nước này?"),
  ("An", "Đổ thẳng sang nhau thì trộn lẫn mất!"),
  ("Khoa", "Dùng thêm một <b>cốc C rỗng</b> làm trung gian. Bạn nào thử nghĩ ra các bước xem?")],
# ---------------- LỚP 8 ----------------
"tin8-luoc-su-cong-cu-tinh-toan": [
  ("Minh", "Hồi nhỏ tớ toàn đếm bằng ngón tay. Đó là “máy tính” đầu tiên của tớ đấy!"),
  ("An", "Người xưa cũng vậy! Trong tiếng Anh, “digit” (chữ số) bắt nguồn từ chữ Latin nghĩa là <b>ngón tay</b>."),
  ("Khoa", "Ông tớ còn giữ một chiếc <b>bàn tính</b> gảy hạt, nghe nói có từ hơn 2000 năm trước Công nguyên."),
  ("Minh", "Từ ngón tay, bàn tính đến máy tính bây giờ, con người đã đi qua những bước nào nhỉ?")],
"tin8-thong-tin-trong-moi-truong-so": [
  ("Khoa", "Tớ tìm thấy bức ảnh ruộng bậc thang rất đẹp trong tập ảnh cũ của bố."),
  ("An", "Cho tớ xem với! Nhưng nhà bạn xa quá…"),
  ("Khoa", "Để tớ chụp lại bằng điện thoại rồi <b>gửi qua thư điện tử</b> cho bạn."),
  ("Minh", "Ảnh in thành <b>ảnh số</b> rồi! Ảnh số khác ảnh in ở điểm nào nhỉ?")],
"tin8-khai-thac-thong-tin-so": None,
"tin8-dao-duc-van-hoa-so": [
  ("Khoa", "An ơi, tớ gửi bạn bức ảnh ruộng bậc thang tớ tự chụp đấy."),
  ("An", "Đẹp quá! Tớ muốn chỉnh màu rồi đăng lên trang cá nhân."),
  ("Minh", "Ảnh của Khoa mà, bạn đã <b>xin phép</b> chưa? Có ghi tên người chụp không?"),
  ("An", "À… tớ chưa nghĩ đến chuyện đó.")],
"tin8-bang-tinh-bai-toan-thuc-te": [
  ("Khoa", "Bố tớ giao cho tớ tính doanh thu các phần mềm công ti bán trên chợ ứng dụng."),
  ("Minh", "Có phần mềm trả phí, có phần mềm miễn phí, tính sao đây?"),
  ("An", "Dùng bảng tính với công thức, nhưng nhớ chú ý <b>địa chỉ ô</b> khi sao chép công thức nhé!")],
"tin8-sap-xep-va-loc-du-lieu": [
  ("An", "Phiếu khảo sát CLB Tin học đã thu về đủ cả lớp rồi!"),
  ("Minh", "Danh sách dài quá, tớ muốn biết những bạn nào cùng thích lập trình."),
  ("Khoa", "Bảng tính có công cụ <b>sắp xếp</b> và <b>lọc dữ liệu</b>, vài cú nhấp là có ngay danh sách.")],
"tin8-bieu-do": [
  ("Minh", "Kết quả khảo sát là một bảng toàn số, nhìn hoa cả mắt."),
  ("An", "Nội dung nào được nhiều bạn chọn nhất nhỉ? Phải dò từng ô mới biết."),
  ("Khoa", "Vẽ thành <b>biểu đồ</b> đi, cột nào cao nhất là thấy ngay!")],
"tin8-danh-sach-hinh-anh": [
  ("An", "Tớ đang làm phiếu khảo sát, phải gõ số thứ tự 1, 2, 3… cho từng mục."),
  ("Minh", "Lỡ xoá một mục ở giữa thì phải sửa lại hết số à?"),
  ("Khoa", "Phần mềm soạn thảo có <b>danh sách liệt kê</b> tự đánh số, lại còn chèn được hình ảnh nữa.")],
"tin8-dau-trang-chan-trang": [
  ("Minh", "Sách giáo khoa trang nào cũng có số trang ở dưới, tên bài ở trên."),
  ("An", "Văn bản tớ soạn thì không có, in ra nhiều trang dễ bị lẫn."),
  ("Khoa", "Đó là <b>đầu trang</b> và <b>chân trang</b>. Tạo một lần là xuất hiện ở mọi trang!")],
"tin8-trang-chieu-nang-cao": [
  ("An", "Tớ được giao làm bài trình chiếu cho lễ ra mắt CLB Tin học!"),
  ("Minh", "Phải thật <b>ngắn gọn, ấn tượng</b> mới thu hút được các bạn."),
  ("Khoa", "Chọn màu, phông chữ, sắp xếp hình ảnh cho hợp lí. Mình cùng tìm cách nhé!")],
"tin8-ban-mau-trinh-chieu": [
  ("Minh", "Trang chiếu của tớ nền trắng trơn, nhìn hơi buồn."),
  ("An", "Trang của tớ thì mỗi trang một màu, không đồng bộ."),
  ("Khoa", "Thử dùng <b>bản mẫu</b> có sẵn: màu sắc, phông chữ đã được phối đẹp cho mọi trang.")],
"tin8-tu-thuat-toan-den-chuong-trinh": [
  ("Khoa", "Tớ muốn lập trình cho chú mèo trong Scratch đi thành hình tam giác đều."),
  ("Minh", "Kéo khối lệnh vào thử luôn đi!"),
  ("An", "Khoan đã! Phải nghĩ <b>thuật toán</b> trước: đi bao nhiêu bước, quay bao nhiêu độ?")],
"tin8-bieu-dien-du-lieu": [
  ("An", "Lớp 7 mình đã học các kiểu dữ liệu trong bảng tính: số, văn bản, ngày tháng…"),
  ("Minh", "Trong Scratch cũng cần lưu dữ liệu như điểm số, tên người chơi chứ?"),
  ("Khoa", "Đúng vậy, ngôn ngữ lập trình cũng có <b>kiểu dữ liệu</b>, <b>biến</b> và <b>hằng</b> đấy!")],
"tin8-cau-truc-dieu-khien": None,
"tin8-go-loi": None,
"tin8-tin-hoc-nghe-nghiep": None,
# ---------------- LỚP 9 ----------------
"tin9-the-gioi-ki-thuat-so": None,
"tin9-thong-tin-giai-quyet-van-de": None,
"tin9-danh-gia-chat-luong-thong-tin": [
  ("An", "Tớ tìm điểm chuẩn vào lớp 10, mỗi trang web ghi một kiểu."),
  ("Minh", "Có trang còn là thông tin từ mấy năm trước nữa."),
  ("Khoa", "Phải <b>đánh giá</b> thông tin: có mới không, đầy đủ không, nguồn có đáng tin không?")],
"tin9-phap-li-dich-vu-internet": [
  ("Minh", "Mẹ tớ vừa nhận tin nhắn “trúng thưởng”, bảo bấm vào đường link để nhận quà."),
  ("An", "Đừng bấm! Có thể là <b>lừa đảo</b> đấy."),
  ("Khoa", "Công nghệ giúp ích nhiều, nhưng cũng có mặt trái. Pháp luật có quy định gì về việc này nhỉ?")],
"tin9-trao-doi-hop-tac": [
  ("An", "Lớp mình sắp tổ chức <b>Triển lãm tin học</b>, nhóm mình làm chủ đề Lược sử công cụ tính toán."),
  ("Minh", "Nhưng mỗi bạn bận một giờ, khó gặp nhau để làm chung."),
  ("Khoa", "Mình có thể <b>trao đổi, hợp tác</b> qua mạng: chia sẻ tệp, cùng sửa một bài trình chiếu.")],
"tin9-cong-cu-truc-quan": [
  ("Minh", "Bài trình bày của nhóm mình toàn chữ, các bạn nghe dễ buồn ngủ."),
  ("An", "Thêm <b>sơ đồ tư duy</b>, biểu đồ, hình ảnh và một đoạn video ngắn đi!"),
  ("Khoa", "Nhưng dùng sao cho hợp lí, đúng chỗ thì mới hiệu quả.")],
"tin9-khai-thac-phan-mem-mo-phong": [
  ("Minh", "Tớ muốn xem các hành tinh quay quanh Mặt Trời mà không có kính thiên văn."),
  ("An", "Tớ thì muốn làm thí nghiệm điện nhưng sợ nguy hiểm."),
  ("Khoa", "Dùng <b>phần mềm mô phỏng</b> – phòng thí nghiệm ảo ngay trên máy tính!")],
"tin9-tim-hieu-phan-mem-mo-phong": None,
"tin9-giai-quyet-van-de": None,
"tin9-bai-toan-tin-hoc": [
  ("An", "Mẹ tớ làm kế toán, cuối tháng nào cũng tính lương cho hàng trăm nhân viên."),
  ("Minh", "Tính tay thì mệt lắm, lại dễ nhầm."),
  ("Khoa", "Có thể giao cho máy tính! Nhưng trước hết phải biến việc đó thành một <b>bài toán tin học</b>.")],
"tin9-lap-chuong-trinh-may-tinh": [
  ("Khoa", "Viết chương trình nào cũng chỉ cần ba cấu trúc: <b>tuần tự, rẽ nhánh, lặp</b>."),
  ("An", "Chỉ ba thôi sao? Kể cả trò chơi phức tạp?"),
  ("Minh", "Thử mô tả thuật toán bằng ba cấu trúc đó rồi chuyển thành chương trình xem!")],
"tin9-xac-thuc-du-lieu": [
  ("An", "Tớ giúp mẹ ghi chi tiêu vào bảng tính, nhưng hay gõ nhầm tên khoản chi."),
  ("Minh", "Có lần tớ còn gõ nhầm số tiền thành số âm."),
  ("Khoa", "Dùng công cụ <b>xác thực dữ liệu</b>, bảng tính sẽ chặn ngay những dữ liệu sai!")],
"tin9-ham-countif": [
  ("Minh", "Tháng này nhà tớ chi cho ăn uống bao nhiêu lần nhỉ?"),
  ("An", "Ngồi đếm từng dòng trong bảng thì lâu lắm."),
  ("Khoa", "Hàm <b>COUNTIF</b> đếm theo điều kiện, chỉ một công thức là ra!")],
"tin9-ham-sumif": [
  ("An", "Đếm được số lần chi rồi, giờ tớ muốn biết <b>tổng tiền</b> chi cho từng khoản."),
  ("Minh", "Lọc từng khoản rồi cộng lại à?"),
  ("Khoa", "Hàm <b>SUMIF</b> cộng theo điều kiện giúp mình ngay!")],
"tin9-ham-if": [
  ("Minh", "Mẹ tớ bảo nên chi tiêu theo <b>quy tắc 50 – 30 – 20</b>."),
  ("An", "Làm sao biết nhà mình đã chi đúng tỉ lệ chưa?"),
  ("Khoa", "Dùng hàm <b>IF</b>: nếu vượt mức thì bảng tính tự hiện cảnh báo!")],
"tin9-tai-chinh-gia-dinh": [
  ("An", "Bảng tính có trang Thu nhập và Chi tiêu rồi."),
  ("Minh", "Nhưng nhìn vào vẫn chưa biết tháng này nhà mình dư hay thiếu."),
  ("Khoa", "Cần thêm phần <b>tổng hợp, cân đối thu – chi</b>. Theo các bạn nên bổ sung gì?")],
}
CHAT = {k: v for k, v in CHAT.items() if v}

PRE = "<!--KD-->"; POST = "<!--/KD-->"
JS = ('<script src="../chung/khoidong.js?v=2"></script>'
      '<script src="../chung/hoithoai.js?v=2"></script>')
n = 0; miss = []
for d in sorted(os.listdir(ROOT)):
    f = os.path.join(ROOT, d, "index.html")
    if not d.startswith("tin") or not os.path.isfile(f): continue
    if d not in D: miss.append(d); continue
    s = open(f, encoding="utf-8", newline="").read()
    s = re.sub(r"(\r?\n)?[ \t]*" + re.escape(PRE) + r".*?" + re.escape(POST), "", s, flags=re.S)
    m = re.search(r'(<section class="part" id="mo-dau">\s*<div class="part-head">[^\n]*?</h2></div>)', s, re.S)
    if not m: miss.append(d + " (không thấy mo-dau)"); continue
    block = (f'\n      {PRE}<div class="act act-kd">\n        <div class="act-tag"><b>Khám phá</b> Hình ảnh khởi động</div>\n'
             f'        <div data-kd></div>\n      </div>')
    if d in CHAT:
        lines = []
        for x in CHAT[d]:
            lines.append(f"<b>{x[0]}:</b> {x[1]}" if len(x) == 2 else x[0])
        block += ('\n      <div class="act act-chat">\n        <div class="act-tag"><b>Trò chuyện</b> Cùng An, Minh và Khoa</div>\n'
                  '        <div class="ht-note">Đoạn trò chuyện gợi mở (không có trong SGK)</div>\n'
                  f'        <div class="reading">{"<br>".join(lines)}</div>\n      </div>')
    block += POST
    cfg = json.dumps(D[d], ensure_ascii=False)
    sc = (f'{PRE}{JS}\n<script>(function(){{ var B = document.querySelector("[data-kd]"); if (B) KhoiDong(B, {cfg}); }})();</script>{POST}\n')
    NL = "\r\n" if "\r\n" in s else "\n"
    block = block.replace("\n", NL); sc = sc.replace("\n", NL)
    s = s[:m.end()] + block + s[m.end():]
    i = s.find('<script src="../chung/config.js')
    s = s[:i] + sc + s[i:]
    open(f, "w", encoding="utf-8", newline="").write(s)
    n += 1
print("Đã chèn", n, "bài. Thiếu:", miss)
