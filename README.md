# Tin học THCS: danh mục trang học tương tác

Đây là trang mục lục cho toàn bộ chương trình **Tin học 6–9, bộ Kết nối tri thức với cuộc sống**: 75 bài, kể cả các bài tự chọn a/b của lớp 8 và lớp 9. Mỗi bài có một trang học riêng, làm theo khung của Bài 1 Tin 7.

- `index.html`: trang mục lục. Trang lọc được theo lớp và theo trạng thái, có ô tìm bài, thanh tiến độ của từng lớp. Bài đã đăng có link tới trang học sinh và trang giáo viên.
- `danh-muc.js`: **tệp duy nhất cần sửa** khi làm xong một bài.

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
| Thư mục và kho GitHub | `tin<lớp>-<slug>` | `tin7-phan-mem-may-tinh` |
| Link | `https://thanhluongst.github.io/<kho>/` | `…/tin7-phan-mem-may-tinh/` |
| `LESSON.id` trong `assets/content.js` | `tin<lớp>-bai<số>` | `tin7-bai2` |
| Trang tính trên Google Sheet | trùng `LESSON.id` | `tin7-bai2` |
| Tiền tố cột câu hỏi (hàm `summary`) | `T<lớp>B<số>.` | `T7B2.kd1 · Mở đầu` |
| Khoá lưu trên trình duyệt (`KEY` trong `hs.js`) | `<id>-v1` | `tin7-bai2-v1` |

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
  3. thay `API_URL` trong `config.js` của các bài và đẩy lên lại.
- **Nâng cấp từ bản cũ** (một trang `BaiLam` chung): xem mục *Nâng cấp Apps Script* trong README của từng bài. Tóm tắt: dán `Code.gs` mới, tạo phiên bản triển khai mới, chạy hàm `chuyenDuLieuCu` một lần.

## Quy trình làm một bài mới

1. Sao chép thư mục của bài làm gần nhất (hiện là `tin7-phan-mem-may-tinh`), **bỏ thư mục `.git`**, rồi đổi tên thư mục theo quy ước.
2. Viết lại `assets/content.js`: câu hỏi SGK (`TASKS`), phần chốt (`CONCEPTS`), nhận xét mẫu (`NX_MAU`), tiến trình 4 bước (`STAGES`), `id`, `title` và tiền tố cột.
3. Viết lại phần thân bài trong `index.html`, gồm tiêu đề (số bài trong ô `bai-badge`, tên bài trong `h1`), hộp **"Sau bài học này em sẽ"** (`.goals`, chép mục tiêu từ đầu bài trong SGK), mục lục và các `<section>`. Trang giáo viên tự đọc nội dung bài từ `index.html`. Trong `giaovien.html` chỉ cần đổi tên bài.
4. Trong `assets/hs.js`, đổi `KEY`. Nếu bài có hình thì cắt hình từ SGK, bỏ vào `hinh/`.
5. Chạy thử trên máy, rồi đổi `tt: "xong"` trong `danh-muc.js`.
6. Tạo kho GitHub cùng tên, đẩy lên, bật Pages, rồi đổi `tt: "dang"`.
7. Đẩy lại kho `tin-thcs` để mục lục trực tuyến được cập nhật.

## Nguồn mục lục

Tên chủ đề và tên bài lấy từ mục lục SGK và SBT Tin học 6, 8, 9 KNTT trên loigiaihay.com; mục lục Tin học 7 đối chiếu với sách. Một vài tên được ghi khác nhau giữa SGK và SBT. Ví dụ, Chủ đề 6 lớp 9 là "Tin học và định hướng nghề nghiệp" trong SGK nhưng "Hướng nghiệp với tin học" trong SBT. Khi soạn từng bài, hãy sửa lại theo đúng sách đang dùng.
