# Máy chủ lớp học qua mạng LAN

Chạy trên máy giáo viên, không cần Internet. Học sinh đăng nhập bằng **số căn cước**, xác minh đúng họ tên rồi mới vào lớp. Bài làm được lưu từng câu trên máy giáo viên, nên học sinh đăng xuất, đăng nhập lại hay đổi máy vẫn làm tiếp được.

## Chuẩn bị (một lần)
1. Cài Node.js (bản 18 trở lên).
2. Sửa `du-lieu/danh-sach.csv`. Mỗi dòng gồm: `lop,cccd,ho_ten` (số căn cước đủ 12 chữ số). File mẫu là `danh-sach-mau.csv`. Có thể xuất từ Excel ra **CSV UTF-8**.
3. Đổi mã giáo viên trong `du-lieu/cau-hinh.json` (mặc định `tin7`).

## Mỗi buổi học
1. Bấm đúp `chay-may-chu.bat`. Lần đầu Windows sẽ hỏi quyền mở cổng 8080 trên tường lửa, bấm **Yes**.
2. Cửa sổ hiện địa chỉ, ví dụ `http://192.168.1.10:8080/`. Học sinh mở địa chỉ đó rồi vào bài.
3. Học sinh nhập **mã buổi học** và **số căn cước** → kiểm tra họ tên → bấm **Đúng là em**. Nếu tên không đúng thì bấm **Không phải em**, nhập lại.
4. Giáo viên mở `giaovien.html` của bài như thường lệ. Bài nộp, chốt đáp án và nhận xét hiện gần như ngay.
5. Giữ cửa sổ máy chủ mở trong suốt giờ học. Bấm Ctrl+C để tắt.

## Dữ liệu và bảo mật
- Mọi thứ nằm trong `du-lieu/`, gồm bài làm (`lop-hoc.json`), bản sao lưu theo ngày và danh sách lớp. **Thư mục này không được đưa lên GitHub** (đã chặn bằng `.gitignore`) và trình duyệt cũng không tải được.
- Số căn cước chỉ dùng để tra tên. Bài làm được lưu theo một mã học sinh mã hoá (`hs-…`), không chứa số căn cước.
- Nhập sai số căn cước 8 lần thì máy đó bị khoá 5 phút.
- Mỗi lần đăng nhập đều được ghi lại (giờ vào, máy nào) để giáo viên theo dõi.
- Nên chép thư mục `du-lieu/` ra USB hoặc Drive sau mỗi tuần.

## Dự án STEM (4 bài, mỗi khối 1 bài)
- Trang chủ giáo viên có thêm 4 thẻ **🧪 STEM** (Tin 6 Robot tưới cây, Tin 7 Báo cáo vườn rau, Tin 8 Bình lọc nước, Tin 9 Triển lãm lược sử). Mã bài trên LAN: `stem-<thư mục trong stem/>`.
- Máy chủ lấy nội dung từ `stem/<dự án>/index.html` (`window.DU_AN`) và dựng thành 5 hoạt động theo quy trình STEM (CV 3089): **1 Xác định vấn đề → 2 Nghiên cứu kiến thức nền → 3 Đề xuất, chọn giải pháp → 4 Chế tạo, thử nghiệm (xưởng mô phỏng của dự án) → 5 Chia sẻ, đánh giá, điều chỉnh** (`lop/stemlan.js`).
- Tổ chức theo **nghiên cứu bài học**: mỗi bước có ô “👀 Thầy cô quan sát” (chỉ hiện trên trang GV, ẩn khi chiếu) gợi ý điều cần quan sát ở HS; kết quả trực tiếp, bình chọn và thống kê `/thong-ke` dùng làm minh chứng cho buổi họp chia sẻ. Dự án 2 tiết: dạy tiếp tiết sau bằng cùng mã buổi.
- Sửa nội dung dự án ở `stem/<dự án>/index.html` là trang LAN tự cập nhật.

## Thống kê, chuyên cần, điểm cộng (`/thong-ke`)
- Mở `http://localhost:8080/thong-ke` (hoặc nút **📊 Thống kê** trên trang chủ giáo viên), đăng nhập bằng mã giáo viên.
- **Theo lớp**: các bài đã học, số tiết/ngày dạy, tới hoạt động nào, tỉ lệ nhóm nộp và tỉ lệ đúng. Lớp = mã buổi bỏ đuôi ngày (`7A1-1811` → `7A1`); `TUHOC-…` gộp vào "Tự học".
- **Theo học sinh**: mỗi em (tách từ nhóm máy) → số tiết có mặt (em đăng nhập vào phòng trong ngày dạy), câu đã nộp, câu đúng, sao được khen, phiếu bình chọn, điểm cộng gợi ý. Cả nhóm cùng máy được tính như nhau.
- **Theo bài**: tỉ lệ đúng từng câu (gộp mọi lớp) và 3 câu khó nhất.
- Điểm gợi ý = đúng × 1 + sao × 2 + bình chọn × 1 (đổi được hệ số). Ô **GV chỉnh** ghi đè điểm gợi ý. Lưu ở `du-lieu/diem-cong.json`.
- **⬇ Xuất Excel (CSV)** theo lớp (UTF-8 có BOM, mở thẳng bằng Excel) và **🖨 In báo cáo**. Trang chỉ hiện tên, lớp, mã `hs-…`, không có số căn cước.
- Chuyên cần chính xác theo ngày tính từ bản này trở đi; phòng cũ chưa ghi ngày vào lớp thì coi em có mặt ở tiết đầu.

## Dạy theo kiểu "giáo viên điều khiển" (giống bài Giáo dục AI)
Trang chủ `/gv` tạo link dạng `/lop/<bài>/<MÃ BUỔI>/` cho học sinh và `/lop/<bài>/<MÃ BUỔI>/gv` cho giáo viên.
- Mỗi hoạt động của bài là một bước: giáo viên chiếu bước nào, máy học sinh hiện bước đó (đoạn đọc, hình, câu hỏi lấy nguyên từ bài).
- Học sinh làm → Nộp → giáo viên thấy thống kê → Chốt đáp án (đúng/sai, gợi ý, điều cần nhớ, ghi vở) → chiếu câu trả lời hay, bình chọn, khen ⭐, xếp hạng.
- 1–4 bạn chung một máy: từng bạn nhập số căn cước và xác minh tên. Cả nhóm đăng nhập lại thì bài cũ vẫn còn.
- Khung giao diện ở `lop/` (lấy từ Web_LopHoc_AI); nội dung sinh tự động từ `content.js` + `index.html` của bài, không cần soạn lại.
- Kết quả từng buổi lưu ở `du-lieu/lop/<bài>__<buổi>.json`.

## Video khởi động
Đặt tệp `video/khoi-dong.mp4` (hoặc `.webm`) trong thư mục bài, ví dụ `tin7-phan-mem-may-tinh/video/khoi-dong.mp4`. Video tự hiện ở đầu phần tình huống của hoạt động đầu tiên (xem video → mô phỏng → câu hỏi). Nên dài 30–60 giây, 720p. Không đưa video lên GitHub.

## Đồng bộ sang USB / máy trường
Bấm đúp `dong-bo.bat`, nhập thư mục đích (ví dụ `E:\NghienCuuBaiHoc`). Chỉ chép tệp mới hoặc đã đổi; không chép `du-lieu/` (danh sách lớp, bài làm). Lần đầu ở máy đích sẽ tạo `du-lieu/` mẫu để sửa.

## Giáo dục AI 12 tiết (lớp 6–9)
- Trang chủ `/gv` chia 3 mục: **📘 Chương trình Tin học** (lớp 6–9), **🤖 Giáo dục AI** (12 tiết/lớp), **🧪 Giáo dục STEM**.
- Mỗi bài AI là một thư mục `tin-thcs/ai-12-tiet/lan/ai<lớp>-bai<số>/` chứa `noidung.js` + `mophong.js` chép nguyên từ `Web_LopHoc_AI\BaiN_LopX` (không sửa). Máy chủ tự lấy BAI, STEPS, GHIBAI, QCODE và mô phỏng, dạy bằng khung `lop/` (đăng nhập căn cước, chốt đáp án, thống kê).
- Thêm bài mới: tạo thư mục đúng tên (ví dụ `ai7-bai1`), chép 2 tệp vào, khởi động lại máy chủ. `dong-bo.bat` chép luôn sang máy trường.
- Đã có: `ai8-bai1` (AI không thay thế con người…, mô phỏng: giao việc cho AI, 10 tuần An–Bình, quy trình 5 bước), `ai8-bai2` (AI theo dõi, thao túng – mô phỏng: bảng tin gợi ý, dấu vết dữ liệu), `ai8-bai3`, `ai8-bai4` (rủi ro, đạo đức – mô phỏng: máy điểm danh thiên vị, tin nhắn xin tiền gấp, Hội đồng thẩm định), `ai8-bai5` (AI đọc, nghe, nhìn – mô phỏng: lưới 8×8, máy nghe lệnh), `ai8-bai6` (nhận diện cảm xúc – máy đoán cảm xúc), `ai8-bai7` (vấn đề giải quyết bằng AI – máy soi vấn đề), `ai8-bai8` (kịch bản hội thoại – thử kịch bản chatbot, phản hồi 👍/👎). Lớp 8 đủ 8 bài, 12 tiết.
- Đã đủ cả 4 khối: lớp 6 (7 bài: ai6-bai1…7), lớp 7 (8 bài), lớp 8 (8 bài), lớp 9 (8 bài) – mỗi khối 12 tiết; mọi câu hỏi có mã YCCĐ để thống kê.
- Lưu ý khi soạn `mophong.js`: máy chủ chỉ lấy từ dòng `const SIMS={` trở xuống, nên hàm phụ phải đặt TRONG SIMS (ví dụ `_m(...)`, gọi bằng `SIMS_BAI._m`).

## Phòng học: dạy tiếp và xoá phòng
- Mã buổi mặc định = tên lớp (ví dụ `8A1`): cùng lớp + cùng bài = cùng một phòng. Mỗi ngày mở phòng được ghi là một tiết.
- Trang chủ `/gv` → chọn bài → gõ lớp: hiện các phòng đã có ("đã học N tiết, dừng ở HĐ …") với nút **▶ Dạy tiếp tiết N+1**, **Bắt đầu lại từ đầu** (tạo phòng mới có đuôi ngày), **🗑 Xoá phòng**.
- **Xoá phòng** (cần mã GV, có hỏi lại): phòng biến mất khỏi trang chủ và `/thong-ke`; tệp được chuyển vào `du-lieu/lop/da-xoa/` (không mất hẳn). Muốn khôi phục: tắt máy chủ, chép tệp về `du-lieu/lop/` và bỏ đuôi `__xoa-<ngày giờ>` trong tên, rồi chạy lại máy chủ.

## Báo cáo Giáo dục AI 12 tiết (`/thong-ke` → 🤖 Giáo dục AI (YCCĐ))
- Mỗi câu hỏi trong bài AI gắn một mã YCCĐ. Máy tự đánh giá từng em theo từng YCCĐ, cộng dồn mọi bài và mọi tiết: **Đạt** khi đúng ≥ 50% câu chấm được của YCCĐ đó; YCCĐ chỉ có câu tự luận thì đã làm là Đạt; chưa học thì để "–". Nhóm ngồi chung máy được tính như nhau.
- Chọn **Khối** và **Lớp**: thẻ số liệu (sĩ số, HS đã tham gia, tiết đã dạy /12, bài đã dạy, số em Hoàn thành tốt · Hoàn thành · Chưa hoàn thành); bảng **tiến độ từng bài** (ngày dạy, số HS tham gia); bảng **tỉ lệ Đạt theo YCCĐ**; bảng **từng học sinh × YCCĐ**.
- GV bấm vào ô để sửa: tự động → Đạt → Chưa đạt → tự động (ô viền tím là đã sửa). Ô **Nhận xét** để trống thì dùng nhận xét gợi ý. Lưu ở `du-lieu/danh-gia-ai.json`.
- Mức hoàn thành: Hoàn thành tốt = đạt tất cả YCCĐ đã học; Hoàn thành = đạt từ một nửa; Chưa hoàn thành = dưới một nửa. Không dùng điểm số (CV 5588).
- Nút: **⬇ Excel lớp** (từng em × YCCĐ, mức, nhận xét), **⬇ Excel tổng hợp khối** (mỗi lớp một dòng), **📄 Báo cáo khối** (mở trang A4 có quốc hiệu, 5 mục: số liệu chung, % Đạt theo YCCĐ từng lớp, mức hoàn thành, YCCĐ cần củng cố < 70%, đánh giá – kiến nghị; in hoặc chọn "Lưu dưới dạng PDF").
