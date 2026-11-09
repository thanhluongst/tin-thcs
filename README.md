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
