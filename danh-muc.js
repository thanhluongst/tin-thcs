/* DANH MỤC BÀI HỌC TIN HỌC THCS – Kết nối tri thức với cuộc sống
   ---------------------------------------------------------------
   Làm xong một bài, chỉ cần sửa dòng của bài đó:
     tt: "chua"  = Chưa làm
         "soan"  = Đang soạn
         "xong"  = Soạn xong, chưa đăng lên mạng
         "dang"  = Đã đăng (có link GitHub Pages)
     repo: tên kho GitHub nếu khác mặc định (mặc định: tin<lớp>-<slug>)
     slug: tên thư mục không dấu nếu muốn tự đặt (mặc định tự sinh từ tên bài)
     gc:   ghi chú ngắn (ví dụ "đã dạy 7A2", "thiếu hình 3.4")
   Nhóm bài tự chọn (a/b): ghi nhom:"a" hoặc nhom:"b" ở chủ đề. */
window.GITHUB_USER = "thanhluongst";
window.CHUONG_TRINH = [
  {lop: 6, chuDe: [
    {so: "1", ten: "Máy tính và cộng đồng", bai: [
      {so: "1", ten: "Thông tin và dữ liệu"},
      {so: "2", ten: "Xử lí thông tin"},
      {so: "3", ten: "Thông tin trong máy tính"}]},
    {so: "2", ten: "Mạng máy tính và Internet", bai: [
      {so: "4", ten: "Mạng máy tính"},
      {so: "5", ten: "Internet"}]},
    {so: "3", ten: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", bai: [
      {so: "6", ten: "Mạng thông tin toàn cầu"},
      {so: "7", ten: "Tìm kiếm thông tin trên Internet"},
      {so: "8", ten: "Thư điện tử"}]},
    {so: "4", ten: "Đạo đức, pháp luật và văn hoá trong môi trường số", bai: [
      {so: "9", ten: "An toàn thông tin trên Internet"}]},
    {so: "5", ten: "Ứng dụng tin học", bai: [
      {so: "10", ten: "Sơ đồ tư duy"},
      {so: "11", ten: "Định dạng văn bản"},
      {so: "12", ten: "Trình bày thông tin ở dạng bảng", slug: "trinh-bay-bang"},
      {so: "13", ten: "Thực hành: Tìm kiếm và thay thế"},
      {so: "14", ten: "Thực hành tổng hợp: Hoàn thiện sổ lưu niệm"}]},
    {so: "6", ten: "Giải quyết vấn đề với sự trợ giúp của máy tính", bai: [
      {so: "15", ten: "Thuật toán"},
      {so: "16", ten: "Các cấu trúc điều khiển"},
      {so: "17", ten: "Chương trình máy tính"}]}
  ]},
  {lop: 7, chuDe: [
    {so: "1", ten: "Máy tính và cộng đồng", bai: [
      {so: "1", ten: "Thiết bị vào – ra", tt: "dang", gc: "Có Google Sheet, nhận xét, khen"},
      {so: "2", ten: "Phần mềm máy tính", tt: "dang"},
      {so: "3", ten: "Quản lí dữ liệu trong máy tính", slug: "quan-li-du-lieu"}]},
    {so: "2", ten: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", bai: [
      {so: "4", ten: "Mạng xã hội và một số kênh trao đổi thông tin thông dụng trên Internet", slug: "mang-xa-hoi"}]},
    {so: "3", ten: "Đạo đức, pháp luật và văn hoá trong môi trường số", bai: [
      {so: "5", ten: "Ứng xử trên mạng"}]},
    {so: "4", ten: "Ứng dụng tin học", bai: [
      {so: "6", ten: "Làm quen với phần mềm bảng tính", slug: "phan-mem-bang-tinh"},
      {so: "7", ten: "Tính toán tự động trên bảng tính", slug: "tinh-toan-tu-dong"},
      {so: "8", ten: "Công cụ hỗ trợ tính toán"},
      {so: "9", ten: "Trình bày bảng tính"},
      {so: "10", ten: "Hoàn thiện bảng tính"},
      {so: "11", ten: "Tạo bài trình chiếu"},
      {so: "12", ten: "Định dạng đối tượng trên trang chiếu", slug: "dinh-dang-trang-chieu"},
      {so: "13", ten: "Thực hành tổng hợp: Hoàn thiện bài trình chiếu"}]},
    {so: "5", ten: "Giải quyết vấn đề với sự trợ giúp của máy tính", bai: [
      {so: "14", ten: "Thuật toán tìm kiếm tuần tự"},
      {so: "15", ten: "Thuật toán tìm kiếm nhị phân"},
      {so: "16", ten: "Thuật toán sắp xếp"}]}
  ]},
  {lop: 8, chuDe: [
    {so: "1", ten: "Máy tính và cộng đồng", bai: [
      {so: "1", ten: "Lược sử công cụ tính toán"}]},
    {so: "2", ten: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", bai: [
      {so: "2", ten: "Thông tin trong môi trường số"},
      {so: "3", ten: "Thực hành: Khai thác thông tin số"}]},
    {so: "3", ten: "Đạo đức, pháp luật và văn hoá trong môi trường số", bai: [
      {so: "4", ten: "Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", slug: "dao-duc-van-hoa-so"}]},
    {so: "4", ten: "Ứng dụng tin học", bai: [
      {so: "5", ten: "Sử dụng bảng tính giải quyết bài toán thực tế", slug: "bang-tinh-bai-toan-thuc-te"},
      {so: "6", ten: "Sắp xếp và lọc dữ liệu"},
      {so: "7", ten: "Trình bày dữ liệu bằng biểu đồ", slug: "bieu-do"}]},
    {so: "4a", nhom: "a", ten: "Soạn thảo văn bản và trình chiếu nâng cao", bai: [
      {so: "8a", ten: "Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản", slug: "danh-sach-hinh-anh"},
      {so: "9a", ten: "Tạo đầu trang, chân trang cho văn bản", slug: "dau-trang-chan-trang"},
      {so: "10a", ten: "Định dạng nâng cao cho trang chiếu", slug: "trang-chieu-nang-cao"},
      {so: "11a", ten: "Sử dụng bản mẫu tạo bài trình chiếu", slug: "ban-mau-trinh-chieu"}]},
    {so: "4b", nhom: "b", ten: "Làm quen với phần mềm chỉnh sửa ảnh", bai: [
      {so: "8b", ten: "Phần mềm chỉnh sửa ảnh"},
      {so: "9b", ten: "Thay đổi khung hình, kích thước ảnh", slug: "khung-hinh-kich-thuoc-anh"},
      {so: "10b", ten: "Thêm văn bản, tạo hiệu ứng cho ảnh", slug: "hieu-ung-anh"},
      {so: "11b", ten: "Thực hành tổng hợp", slug: "thuc-hanh-chinh-sua-anh"}]},
    {so: "5", ten: "Giải quyết vấn đề với sự trợ giúp của máy tính", bai: [
      {so: "12", ten: "Từ thuật toán đến chương trình"},
      {so: "13", ten: "Biểu diễn dữ liệu"},
      {so: "14", ten: "Cấu trúc điều khiển"},
      {so: "15", ten: "Gỡ lỗi"}]},
    {so: "6", ten: "Hướng nghiệp với tin học", bai: [
      {so: "16", ten: "Tin học với nghề nghiệp", slug: "tin-hoc-nghe-nghiep"}]}
  ]},
  {lop: 9, chuDe: [
    {so: "1", ten: "Máy tính và cộng đồng", bai: [
      {so: "1", ten: "Thế giới kĩ thuật số", tt: "dang"}]},
    {so: "2", ten: "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", bai: [
      {so: "2", ten: "Thông tin trong giải quyết vấn đề", slug: "thong-tin-giai-quyet-van-de", tt: "dang"},
      {so: "3", ten: "Thực hành: Đánh giá chất lượng thông tin", tt: "dang"}]},
    {so: "3", ten: "Đạo đức, pháp luật và văn hoá trong môi trường số", bai: [
      {so: "4", ten: "Một số vấn đề pháp lí về sử dụng dịch vụ Internet", slug: "phap-li-dich-vu-internet", tt: "dang"}]},
    {so: "4", ten: "Ứng dụng tin học", bai: [
      {so: "5", ten: "Tìm hiểu phần mềm mô phỏng"},
      {so: "6", ten: "Thực hành: Khai thác phần mềm mô phỏng"},
      {so: "7", ten: "Trình bày thông tin trong trao đổi và hợp tác", slug: "trao-doi-hop-tac"},
      {so: "8", ten: "Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác", slug: "cong-cu-truc-quan"}]},
    {so: "4a", nhom: "a", ten: "Sử dụng bảng tính điện tử nâng cao", bai: [
      {so: "9a", ten: "Sử dụng công cụ xác thực dữ liệu", slug: "xac-thuc-du-lieu"},
      {so: "10a", ten: "Sử dụng hàm COUNTIF", slug: "ham-countif"},
      {so: "11a", ten: "Sử dụng hàm SUMIF", slug: "ham-sumif"},
      {so: "12a", ten: "Sử dụng hàm IF", slug: "ham-if"},
      {so: "13a", ten: "Hoàn thiện bảng tính quản lí tài chính gia đình", slug: "tai-chinh-gia-dinh"}]},
    {so: "4b", nhom: "b", ten: "Làm quen với phần mềm làm video", bai: [
      {so: "9b", ten: "Các chức năng chính của phần mềm làm video", slug: "phan-mem-lam-video"},
      {so: "10b", ten: "Chuẩn bị dữ liệu và dựng video", slug: "chuan-bi-dung-video"},
      {so: "11b", ten: "Thực hành: Dựng video theo kịch bản"},
      {so: "12b", ten: "Hoàn thành việc dựng video"},
      {so: "13b", ten: "Biên tập và xuất video"}]},
    {so: "5", ten: "Giải quyết vấn đề với sự trợ giúp của máy tính", bai: [
      {so: "14", ten: "Giải quyết vấn đề"},
      {so: "15", ten: "Bài toán tin học"},
      {so: "16", ten: "Thực hành: Lập chương trình máy tính"}]},
    {so: "6", ten: "Tin học và định hướng nghề nghiệp", bai: [
      {so: "17", ten: "Tin học và thế giới nghề nghiệp", slug: "the-gioi-nghe-nghiep"}]}
  ]}
];

/* ---- Quy ước đặt tên (không cần sửa) ---- */
(function(){
  const bo = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  /* slug: bỏ dấu, bỏ "Thực hành:", tối đa 6 từ. Ví dụ "Phần mềm máy tính" → "phan-mem-may-tinh" */
  function slug(ten){
    const w = bo(ten.replace(/^Thực hành( tổng hợp)?:\s*/i, "")).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ");
    return w.slice(0, 6).join("-");
  }
  window.CHUONG_TRINH.forEach(L => L.chuDe.forEach(cd => cd.bai.forEach(b => {
    b.lop = L.lop; b.chuDe = cd;
    b.tt = b.tt || "chua";
    b.slug = b.slug || slug(b.ten);
    b.repo = b.repo || "tin" + L.lop + "-" + b.slug;            /* thư mục của bài */
    b.id = "tin" + L.lop + "-bai" + b.so;                        /* LESSON.id trong content.js */
    b.cot = "T" + L.lop + "B" + b.so + ".";                       /* tiền tố cột trên Google Sheet */
    b.url = b.repo + "/";                                         /* thư mục của bài trong kho tin-thcs */
  })));
})();
