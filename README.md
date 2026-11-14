# Tin học THCS: danh mục trang học tương tác

Đây là trang mục lục cho toàn bộ chương trình **Tin học 6–9, bộ Kết nối tri thức với cuộc sống**: 75 bài, kể cả các bài tự chọn a/b của lớp 8 và lớp 9. Mỗi bài có một trang học riêng, làm theo khung của Bài 1 Tin 7.

Từ tháng 11/2026, **mọi bài nằm chung trong kho này**, mỗi bài một thư mục con. Link: `https://thanhluongst.github.io/tin-thcs/<thư mục bài>/`.

```
tin-thcs/
├── index.html          trang mục lục + thống kê theo bài
├── danh-muc.js         danh sách 75 bài, trạng thái từng bài
├── chung/              mã dùng chung cho mọi bài: config.js (API_URL), api.js, hs.js, gv.js, outline.js, chieu.js, style.css
├── apps-script/Code.gs máy chủ Google Apps Script (một bản duy nhất)
└── tin9-the-gioi-ki-thuat-so/
    ├── index.html      trang học sinh
    ├── giaovien.html   trang giáo viên
    ├── content.js      nội dung riêng của bài
    └── hinh/           hình cắt từ SGK
```

- `index.html`: trang mục lục. Lọc theo lớp, theo trạng thái, có ô tìm bài, thanh tiến độ từng lớp. Bài đã đăng có link tới trang học sinh và trang giáo viên.
- **Thống kê theo bài** (đầu trang mục lục): nhập mã giáo viên → bảng mỗi bài: số câu, số buổi đã dạy, số lượt nộp (nhóm / học sinh), mức hoàn thành trung bình, số lượt nộp đủ câu, ngày nộp gần nhất. Bấm vào một bài để xem từng buổi. Nút **Tải CSV** xuất bảng theo buổi để làm báo cáo. Dữ liệu đọc trực tiếp từ Google Sheet dùng chung.
- **Tiến độ và xếp hạng học sinh** (ngay dưới, cùng mã giáo viên): gộp mọi lượt nộp của cùng một tên nhóm / học sinh trong cùng lớp qua mọi bài. Lớp lấy từ mã buổi học (vd `9A1-T1`) hoặc từ tên (vd `Nhóm 3 – 9A1`), không có thì xếp theo khối. Mỗi dòng: số bài, câu đã nộp, % hoàn thành, % đúng (câu tự chấm, đọc dấu ✓/✗ trong cột câu hỏi), số lời khen, **Điểm (thang 10)** và **Xếp loại**. Điểm = 10 × (tỉ trọng hoàn thành × % câu đã nộp + tỉ trọng đúng × % câu đúng) + điểm cộng mỗi lời khen (tối đa 10); mặc định 60% / 40%, cộng 0,5 mỗi lời khen, chỉnh trong mục “Cách tính điểm và xếp loại” (nhớ trên máy). % câu đã nộp tính trên mọi bài lớp đó đã học (bài chưa nộp tính 0). Xếp loại: Tốt ≥ 8,0 · Khá ≥ 6,5 · Đạt ≥ 5,0 · Chưa đạt < 5,0. Lọc theo lớp, tìm tên, bấm tiêu đề cột để sắp xếp, bấm dòng để xem từng bài, **Tải CSV**. Cần Code.gs có hành động `hocsinh`.
- **Hồ sơ của em** (`ho-so/`): trang cho học sinh. `chung/hs.js` ghi tóm tắt mỗi bài (số câu, câu đúng, lời khen) vào khoá chung `hoso-v1` trên trình duyệt; trang hồ sơ đọc khoá này cùng `danh-muc.js` và `chung/nls-atm.js` để hiện bài đã học, gợi ý học tiếp, huy hiệu theo 6 miền năng lực số (bài nộp ≥ 80% câu: 1 bài Đồng, 3 Bạc, 5 Vàng), huy hiệu rèn luyện và tự đánh giá từng bài (`hoso-tdg`). Dữ liệu chỉ nằm trên máy, không gửi đi.
- `danh-muc.js`: **tệp duy nhất cần sửa** khi làm xong một bài.
- Sửa giao diện hay chức năng: sửa một lần trong `chung/`, mọi bài đổi theo. Khi sửa tệp trong `chung/`, tăng số `?v=` trong các tệp HTML của bài để trình duyệt tải bản mới.

## Cập nhật trạng thái

Mở `danh-muc.js`, tìm dòng của bài rồi thêm `tt`:

```js
{so: "3", ten: "Quản lí dữ liệu trong máy tính", tt: "soan"},
```

| `tt` | Hiển thị | Nghĩa |
| --- | --- | --- |
| *(bỏ trống)* | Chưa làm | |
| `"soan"` | Đang soạn | Đang làm nội dung |
| `"xong"` | Chưa đăng | Đã chạy thử trên máy, chưa đưa lên GitHub |
| `"dang"` | Đã đăng | Đã có trên GitHub Pages; mục lục tự hiện link |

Có thể thêm `gc: "ghi chú"`, ví dụ `gc: "đã dạy 7A2, cần sửa câu 3"`.

## Quy ước đặt tên

Quy ước được sinh tự động từ `danh-muc.js` và hiện ngay dưới mỗi bài trên trang mục lục.

| Thứ | Quy ước | Ví dụ (Tin 7 – Bài 2) |
| --- | --- | --- |
| Thư mục của bài (trong kho `tin-thcs`) | `tin<lớp>-<slug>` | `tin7-phan-mem-may-tinh` |
| Link | `https://thanhluongst.github.io/tin-thcs/<thư mục>/` | `…/tin-thcs/tin7-phan-mem-may-tinh/` |
| `LESSON.id` trong `assets/content.js` | `tin<lớp>-bai<số>` | `tin7-bai2` |
| Trang tính trên Google Sheet | trùng `LESSON.id` | `tin7-bai2` |
| Tiền tố cột câu hỏi (hàm `summary`) | `T<lớp>B<số>.` | `T7B2.kd1 · Mở đầu` |
| Khoá lưu trên trình duyệt | tự sinh: `<id>-v1` (ghi đè bằng `key` trong `LESSON` nếu cần) | `tin7-bai2-v1` |

`slug` là tên bài viết không dấu. Tên quá dài thì tự đặt ngắn lại ngay trong `danh-muc.js`, ví dụ `slug: "mang-xa-hoi"`.

## Google Sheet dùng chung cho cả trường

Mọi bài dùng **chung một Google Sheet và một Apps Script**, tức là cùng `API_URL` trong `config.js`. Mã máy chủ nằm ở [`apps-script/Code.gs`](apps-script/Code.gs). Các kho bài học giữ bản sao giống hệt.

- **Mỗi bài một trang tính**, đặt tên theo `LESSON.id`, tự tạo khi có bài nộp đầu tiên. Mỗi trang chỉ có khoảng 25 cột, mỗi nhóm hoặc học sinh một dòng, lọc lớp theo cột **Buổi**.
- Hai trang `Chot` và `NhanXet` dùng chung cho mọi bài.
- Phần chốt và nhận xét được lưu đệm (CacheService), nên khi nhiều lớp học cùng lúc, học sinh hỏi liên tục cũng không phải đọc Sheet.
- **Ước tính cho 42 lớp, một năm học:**
  - học theo nhóm: khoảng 5.500 dòng, chừng 0,15 triệu ô;
  - học cá nhân: khoảng 28.000 dòng, chừng 0,7 triệu ô;
  - cả hai đều rất xa giới hạn 10 triệu ô của Google Sheets.
- **Mỗi năm học dùng một tệp mới:**
  1. tạo Google Sheet mới;
  2. dán `Code.gs`, đặt `MA_GIAO_VIEN`, triển khai;
  3. thay `API_URL` trong `chung/config.js` và đẩy kho `tin-thcs` lên lại.
- **Trưng bày bài nhóm (tháng 11/2026):** nút **Trưng bày bài nhóm** (cạnh "Chiếu ghi bài"), nút **Trưng bày** ở từng câu và ở từng nhóm trong bảng tiến độ. Màn hình lớn cho máy chiếu: **Theo câu** (bài của mọi nhóm xếp lưới, bấm một bài để phóng to, ← → sang bài khác) hoặc **Theo nhóm** (toàn bộ bài của một nhóm khi lên trình bày). Nút **Ẩn tên nhóm** để cả lớp nhận xét khách quan. Đúng/chưa đúng chỉ hiện ở câu đã chốt; có số tim bạn bè và dấu "Thầy cô khen". Nút **🎲 Gọi ngẫu nhiên** (phím G): tên các nhóm chạy như vòng quay rồi dừng ở một bài (ưu tiên bài đã nộp), bài đó phóng to để cả lớp sửa; không gọi lại bài đã gọi cho tới khi hết một vòng. Trên bài phóng to có ô **Nhận xét sửa bài** và nút **Khen**: trang giáo viên gửi thẳng cho nhóm, chế độ một máy lưu vào ô nhận xét của câu. Dùng được cả ở chế độ giáo viên một máy nhiều nhóm. Mã: `chung/trungbay.js`.
- **Gọi tên học sinh (tháng 11/2026):** nút **🎯 Gọi tên học sinh** (trang giáo viên, chế độ giáo viên một máy) và **🎯 Gọi tên** trên màn Trưng bày. Nhập danh sách lớp mỗi bạn một hàng: dán thẳng từ Excel (bôi đen cột họ tên hoặc cả bảng → Ctrl+C → Ctrl+V) hoặc tải tệp .xlsx/.xls/.csv; trang tự nhận cột họ tên (kể cả "Họ đệm" + "Tên" tách cột), bỏ STT, ngày sinh, dòng tiêu đề. Nhiều lớp, lưu trên trình duyệt của máy giáo viên (không gửi lên mạng), dùng chung cho mọi bài. Gọi ngẫu nhiên có vòng quay tên, không lặp lại trong một lượt; nút ★ Khen, "Vắng, gọi bạn khác", ↺ Lượt mới. Phím Space/G gọi tên. Mã: `chung/goiten.js`.
- **Nghe đọc từ tiếng Anh (tháng 11/2026):** các từ, cụm lệnh tiếng Anh trong bài (Insert, Header & Footer, COUNTIF, Internet, Scratch…) được gạch chân chấm chấm; học sinh bấm vào (hoặc Tab rồi Enter) để máy đọc bằng giọng tiếng Anh – Mỹ có sẵn trong trình duyệt, bấm lần nữa ngay sau đó thì đọc chậm. Mỗi từ chỉ gạch chân lần đầu trong một hoạt động; không gạch trong nút bấm, ô nhập và mô phỏng phần mềm. Từ điển chung ở đầu tệp; thêm từ riêng cho một bài bằng `window.TU_ANH_THEM = ["…"]` (hoặc `{"chữ": "cách đọc"}`) đặt trước thẻ nạp tệp, tắt bằng `window.TU_ANH_TAT = true`. Mã: `chung/doc-tieng-anh.js`.
- **Mô phỏng Word cho Tin 6 (tháng 11/2026):** `chung/soanthao.js` – hàm `SoanThao(box, {title, note, html, tools, name, check})`: trang văn bản sửa trực tiếp; nhóm lệnh chọn qua `tools`: `font` (phông, cỡ, B I U, màu), `para` (căn lề, giãn dòng, thụt lề), `find` (ngăn Navigation), `replace` (Find and Replace: Find Next, Replace, Replace All, Match case), `picture`, `cover` (Insert → Cover Page), `table` (Insert Table + Table Tools: chèn/xoá hàng cột, Merge Cells – kéo chuột chọn ô), `layout` (Orientation, Margins), `print` (xem trước), `save` (Save As). `check(x)` trả về danh sách yêu cầu tự đánh dấu ☑; xem các hàm `x.style(chữ)`, `x.paraOf(chữ)`, `x.tables`, `x.imgs`, `x.find(chữ)`, `x.ev` ở đầu tệp. Đang dùng ở 4 bài Word Tin 6.
- **Gắn nhãn lên hình (tháng 11/2026):** `chung/gannhan.js` – hàm `GanNhan(box, {title, note, svg, slots:[{x, y, a, w, px, py}], extra, done})`: học sinh kéo thả nhãn (chuột hoặc ngón tay) hoặc bấm nhãn rồi bấm ô, nút Kiểm tra tô xanh/đỏ. Toạ độ x, y, w, px, py tính theo % chiều rộng/cao hình. Đang dùng ở 13 bài lí thuyết (hoạt động “Gắn nhãn” đầu phần Luyện tập). Hình vẽ bằng SVG và vị trí ô được sinh bởi `cong-cu/gan-nhan-hinh.py` (sửa hình trong tệp này rồi chạy `python cong-cu/gan-nhan-hinh.py .` để chèn lại vào các bài).
- **Khám phá bằng hình ở Khởi động (tháng 11/2026):** `chung/khoidong.js` – hàm `KhoiDong(box, {nen, canh, trang, title, the:[[emoji, nhãn, lời giải thích]], doan:{q, o, d, g}, hoi})`: sân khấu hình động (bấm hình thì nhảy), thẻ lật khám phá có chấm tiến độ, lật hết thì hiện câu “Đoán nhanh” và câu hỏi gợi mở. Có ở đầu phần Khởi động của cả 66 bài. Nội dung từng bài nằm trong `cong-cu/khoi-dong.py` (sửa rồi chạy `python -X utf8 cong-cu/khoi-dong.py .` để chèn lại; chạy lại nhiều lần không bị trùng). Bài mới: thêm một mục vào từ điển `D` rồi chạy lệnh trên.
- **Hội thoại dạng chat (tháng 11/2026):** `chung/hoithoai.js` tự đổi mọi `<div class="reading">` gồm các dòng `<b>An:</b> …<br><b>Minh:</b> …` (ít nhất 2 lượt nói, tên An/Minh/Khoa – thêm nhân vật trong biến `NV`) thành khung trò chuyện: ảnh đại diện, bong bóng chat, hiệu ứng đang gõ, nút Tiếp / Hiện tất cả / Xem lại. Dòng không có tên là lời dẫn chuyện. Không cần sửa nội dung bài; tệp được nạp cùng khoidong.js qua `cong-cu/khoi-dong.py`. Tắt trên một trang: `window.HOI_THOAI_TAT = true`. Bài nào SGK không có hội thoại thì có “đoạn trò chuyện gợi mở” tự soạn (ghi rõ “không có trong SGK”), nội dung nằm trong từ điển `CHAT` của `cong-cu/khoi-dong.py` (49 bài).
- **Mở bằng trình duyệt (tháng 11/2026):** `chung/mo-trinh-duyet.js` (nạp ngay sau `config.js` ở trang danh mục, trang học sinh và trang giáo viên): khi trang mở bên trong Zalo, Facebook, Messenger, Instagram, TikTok… thì hiện thanh nhắc ở đầu trang với nút **Mở bằng trình duyệt** (Android mở Chrome, iPhone thử mở Safari), nút **Sao chép liên kết**, hướng dẫn bấm ⋮ → Mở bằng trình duyệt và ô liên kết để nhấn giữ sao chép. Trình duyệt thường không thấy thanh này. Thử trên máy tính: thêm `?mo=1` vào địa chỉ. Bài mới chép từ bài cũ nên đã có sẵn dòng nạp tệp.
- **Trình chiếu hoạt động (tháng 11/2026):** nút **Trình chiếu hoạt động** (trang học sinh, cạnh “Chiếu ghi bài”; trang giáo viên mở trang học sinh với `?chieu=1`). Mỗi hoạt động một màn hình chữ to cho máy chiếu; bấm **Tiếp →** (phím →, PageDown, bút trình chiếu) để hiện **từng bước**: đoạn đọc, từng hình, từng câu hỏi; hết bước thì sang hoạt động sau. ← / PageUp lùi lại, **A** hiện hết bước, + − cỡ chữ, F toàn màn hình, Esc đóng. Hoạt động trên màn chiếu chính là phần của trang học nên làm bài, chọn đáp án, nộp bài ngay trên đó; bút viết và đồng hồ đếm ngược vẫn dùng được. **Chia tiết:** chọn 1, 2 hoặc 3 tiết, trang tự gợi ý chỗ chia (theo số câu, ưu tiên đầu một bước), sửa được “Tiết 2 bắt đầu từ hoạt động…”; lưu trên máy theo từng bài. Mỗi tiết có trang mở đầu (danh sách hoạt động, bấm để nhảy tới) và trang kết thúc (“Tiết sau: …”). Mở thẳng một tiết: `index.html?chieu=1&tiet=2`. **Lớp trả lời trên màn chiếu (trang giáo viên):** khi đã vào buổi học ở trang giáo viên, nút Trình chiếu hoạt động chiếu ngay tại trang giáo viên; dưới mỗi câu hỏi có khung **Lớp trả lời**: số nhóm đã nộp (tự cập nhật 8 giây/lần, nút ↻ tải ngay), **📊 Xem kết quả lớp** (trắc nghiệm: số nhóm chọn từng phương án; phân loại / ghép nối / sắp xếp: số nhóm đúng 9/9, 7/9…; thẻ câu trả lời của từng nhóm; danh sách nhóm chưa nộp), **Ẩn tên nhóm**, **✓ Chốt đáp án** (tô xanh phương án đúng, đánh dấu đúng/chưa đúng). Bấm một thẻ để chọn bài đó: phóng to, chèn nhận xét mẫu, gõ nhận xét và **Gửi nhận xét** (nhóm thấy ngay trên máy), **★ Khen**. Cầu nối: `window.GV` trong `gv.js`. **Cập nhật gần như tức thì (tháng 11/2026):** học sinh bấm Nộp thì bài gửi ngay (0,3 giây); Code.gs giữ một “số phiên bản” của buổi học trong bộ nhớ đệm (hành động `ver`, đổi mỗi khi có bài nộp hoặc bạn bè bình chọn); trang giáo viên hỏi số này mỗi 2 giây khi đang mở trên màn hình (8 giây khi ở thẻ khác) và chỉ tải lại bài của lớp khi số đổi, 30 giây tải đầy đủ một lần. Trên màn chiếu, thẻ của nhóm vừa nộp sáng lên và đầu khung báo “✨ … vừa nộp”. Học sinh nhận chốt / nhận xét / lời khen sau 6–9 giây; khi thầy cô vừa khen, nhận xét, chốt hoặc đang mở Trình chiếu hoạt động, máy chủ bật cờ “hot” 3 phút (CacheService) và máy học sinh hỏi mỗi 2–3 giây, nên lời khen và hiệu ứng chúc mừng hiện sau khoảng 2 giây. Quay lại thẻ trang học thì hỏi ngay. Code.gs cũ chưa có `ver` thì trang tự quay về tải lại mỗi 8 giây. Không cần sửa nội dung bài: mỗi `<div class="act">` là một hoạt động, mỗi phần tử con (trừ `.act-tag`) là một bước. Mã: `chung/chieu-hd.js`.
- **Báo tin tức thì qua Firebase (tháng 11/2026, tuỳ chọn):** `chung/tuc-thi.js` dùng Firebase Realtime Database (gói miễn phí, qua REST + EventSource, không cần thư viện, không cần khoá) làm “đường báo tin”: thầy cô khen / nhận xét → `/tin/<bài>/<buổi>/hs/<mã máy>` = {t, nx}; chốt → `…/rev` = {t, rev}; học sinh vừa nộp → `…/nop` = thời điểm. Trang giáo viên đẩy tin **trước** rồi mới ghi Sheet, nên máy học sinh hiện lời khen / chốt dưới 1 giây; trang giáo viên tải bài của lớp ngay khi có tin “nop”. Không gửi họ tên hay bài làm lên Firebase; Google Sheets vẫn là dữ liệu chính (tin đẩy chỉ để hiện nhanh, lượt hỏi Apps Script sau đó xác nhận). Bật: điền `FIREBASE_URL` trong `chung/config.js`; để trống thì tắt, trang chạy như cũ. `"demo:"` = kênh giả giữa các thẻ của cùng trình duyệt (để thử trên máy, dùng cùng `API_URL: "demo:"`).
  **Tạo Firebase (một lần, khoảng 10 phút, không cần thẻ thanh toán):**
  1. Vào https://console.firebase.google.com bằng tài khoản Google → **Tạo dự án** (Create a project), đặt tên (vd `tin-thcs`), tắt Google Analytics → Tạo.
  2. Menu trái **Build (Xây dựng) → Realtime Database → Create Database**, vị trí **Singapore (asia-southeast1)**, chọn **Start in locked mode** → Enable.
  3. Tab **Rules (Quy tắc)**: xoá hết, dán nội dung tệp [`apps-script/firebase-rules.json`](apps-script/firebase-rules.json) → **Publish**.
  4. Tab **Data**: chép địa chỉ ở đầu (dạng `https://tin-thcs-xxxx-default-rtdb.asia-southeast1.firebasedatabase.app`) vào `FIREBASE_URL`.
  Đang dùng (11/2026): dự án Firebase gắn vào dự án Google Cloud “14141” (`gen-lang-client-0957457348`), cơ sở dữ liệu ở Singapore, gói Spark miễn phí. Tên khoá chứa `. $ # [ ] /` (vd `like.hd1a`) được mã hoá kiểu `%2E` khi gửi.
  Quy tắc chỉ cho đọc / ghi đúng ba loại tin trên (số và đối tượng nhỏ); không ai đọc được ngoài nhánh `tin`. Học sinh có thể tự ghi tin giả cho máy khác nhưng chỉ làm hiện tạm, điểm và lời khen thật vẫn lấy từ Sheet.
- **Giao diện sáng mặc định (tháng 11/2026):** mỗi trang có đoạn mã nhỏ ngay sau `<meta charset>` đặt `data-theme="light"` (và `<meta name="color-scheme" content="only light">` để trình duyệt không tự làm tối), nên trang luôn sáng kể cả khi điện thoại bật chế độ tối. `chung/giao-dien.js` (nạp sau `mo-trinh-duyet.js`) thêm nút 🌙 Giao diện tối / ☀️ Giao diện sáng ở chân trang; lựa chọn lưu trong máy (`localStorage` "giao-dien").
- **Bạn bè bình chọn (tháng 11/2026):** trên trang giáo viên, mỗi câu có nút **Mở cho HS xem bài nhau, thả tim, nhận xét**. Khi mở, học sinh (đang học trực tuyến) thấy bài các nhóm đã nộp câu đó, thả ❤ một lần và viết một nhận xét (sửa được) cho mỗi nhóm khác. Mỗi nhóm thấy số tim và nhận xét các bạn gửi cho mình. Giáo viên thấy số tim, đọc mọi nhận xét và bấm **Ẩn** nhận xét không phù hợp. Dữ liệu nằm ở trang tính `BanBe`. Cần dán `Code.gs` mới (cách làm như mục dưới); chưa dán thì trang báo “Cần dán Code.gs mới…”.
- **Bật thống kê theo bài (cần làm một lần, tháng 11/2026):** mở Apps Script → dán toàn bộ `apps-script/Code.gs` mới → **Triển khai → Quản lý các bản triển khai → biểu tượng bút chì → Phiên bản: Phiên bản mới → Triển khai**. Giữ nguyên bản triển khai cũ để link `/exec` không đổi. Chưa làm bước này thì bảng thống kê báo “Cần dán Code.gs mới…”.
- **Nâng cấp từ bản cũ** (một trang `BaiLam` chung): xem mục *Nâng cấp Apps Script* trong README của từng bài. Tóm tắt: dán `Code.gs` mới, tạo phiên bản triển khai mới, chạy hàm `chuyenDuLieuCu` một lần.

## Quy trình làm một bài mới

1. Trong kho `tin-thcs`, sao chép thư mục của bài làm gần nhất, đổi tên theo quy ước. Xoá ảnh cũ trong `hinh/`.
2. Viết lại `content.js`: câu hỏi SGK (`TASKS`), phần chốt (`CONCEPTS`), nhận xét mẫu (`NX_MAU`), tiến trình 4 bước (`STAGES`), `id`, `title` và tiền tố cột. Cuối mỗi bước có một mục **Ghi bài**: khung chốt `ghi:true` (`g1`, `g2`,…) chứa nội dung để học sinh chép vào vở — **thật ngắn gọn, dễ hiểu**: mỗi phần 1–3 ý, mỗi ý một dòng (khoảng 15 chữ), từ khoá in đậm, dùng "→", "VD:" thay cho câu dài, không chép nguyên đoạn SGK; kèm một dòng `{title:"Ghi bài", tasks:[], concept:"gN", ghi:true}` trong `STAGES` và một khối `<div class="act act-ghi">` cuối mỗi `<section>` trong `index.html`.
3. Viết lại phần thân bài trong `index.html`, gồm tiêu đề (số bài trong ô `bai-badge`, tên bài trong `h1`), hộp **"Sau bài học này em sẽ"** (`.goals`, chép mục tiêu từ đầu bài trong SGK), mục lục và các `<section>`. Trang giáo viên tự đọc nội dung bài, tên bài và hộp "Sau bài học này em sẽ" từ `index.html`. Trong `giaovien.html` chỉ cần đổi tên bài. Nếu bài có hình thì cắt hình từ SGK, bỏ vào `hinh/`.
4. Chạy thử trên máy (mở thư mục `tin-thcs` bằng máy chủ web, ví dụ `python -m http.server`), rồi đổi `tt: "xong"` trong `danh-muc.js`.
5. Đẩy kho `tin-thcs` lên GitHub và đổi `tt: "dang"`. Không cần tạo kho mới cho từng bài nữa.

## Nguồn mục lục

Tên chủ đề và tên bài lấy từ mục lục SGK và SBT Tin học 6, 8, 9 KNTT trên loigiaihay.com; mục lục Tin học 7 đối chiếu với sách. Một vài tên được ghi khác nhau giữa SGK và SBT. Ví dụ, Chủ đề 6 lớp 9 là "Tin học và định hướng nghề nghiệp" trong SGK nhưng "Hướng nghiệp với tin học" trong SBT. Khi soạn từng bài, hãy sửa lại theo đúng sách đang dùng.
- **Trải nghiệm huấn luyện AI (tháng 11/2026):** `ai-cay-trong/` (AI Bác Sĩ Cây Trồng – Tin 8 Bài 1) và `ai-canh-sat-mang/` (AI Cảnh Sát Mạng – Tin 6 Bài 9, Tin 7 Bài 5). Mỗi hoạt động là một tệp HTML độc lập, 4 bước: huấn luyện → bộ não AI (trọng số Naive Bayes) → kiểm thử băng chuyền → sửa lỗi & dạy lại, có nút nạp dữ liệu chuẩn và bẫy thiên kiến. Hai tệp dùng chung phần máy; muốn làm chủ đề mới thì chép một tệp và chỉ sửa khối `CANH` (giữa hai dòng `KỊCH BẢN` / `HẾT KỊCH BẢN`): nhãn, đặc trưng, mẫu dạy, mẫu kiểm thử, bộ chuẩn, bộ bẫy, hàm vẽ mẫu `ve(s, cao)`.
- **Bài dạy STEM (tháng 11/2026):** `stem/` có mục lục `stem/index.html` và 4 dự án 2 tiết: `tin6-robot-tuoi-cay/` (Tin 6 Bài 15), `tin7-bang-vuon-rau/` (Tin 7 Bài 9), `tin8-trinh-chieu-binh-loc/` (Tin 8 Bài 11a), `tin9-trien-lam-luoc-su/` (Tin 9 Bài 8). Khung chung `stem/khung.js` + `khung.css` dựng quy trình 5 bước (CV 3089), bảng tiêu chí, rubric, báo cáo in PDF, kế hoạch 2 tiết cho GV; mỗi trang dự án chỉ khai báo `window.DU_AN = {...}` và hàm `xuong(hop, api)` cho phần sản phẩm ở Bước 4 (`api.dat(k, true)` đánh dấu tiêu chí đạt). Bài làm lưu trong localStorage của máy (khoá `stem-<id>-v1`).

## Song ngữ: một hoạt động dạy bằng tiếng Anh (TT 94/2026)
Mỗi bài có **một** hoạt động gắn công tắc **Tiếng Việt | English** (chỉ hiện một ngôn ngữ) và thanh **🔊 Listen** khi ở English.
- Bản dịch: `cong-cu/song-ngu/en/_tin6.json` … `_tin9.json` (`task` = id câu hỏi đầu tiên của hoạt động, `tag`, `reading`, `tasks`), đoạn đọc phụ ở `_more.json`.
- Gắn / gắn lại sau khi sửa bản dịch: `node cong-cu/song-ngu/gan.js` (hoặc `node cong-cu/song-ngu/gan.js <thư-mục-bài>`).
- Mã dùng chung: `chung/song-ngu.js` (`SongNgu.hoatDong`). Hình SGK và mô phỏng giữ tiếng Việt.
