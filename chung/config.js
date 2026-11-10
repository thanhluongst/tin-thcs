/* CẤU HÌNH — sửa dòng API_URL (bắt buộc) và FIREBASE_URL (tuỳ chọn, để báo tin tức thì).
   Dán đường link Web app của Google Apps Script vào giữa hai dấu nháy, ví dụ:
   API_URL: "https://script.google.com/macros/s/AKfycb.../exec"
   Để trống thì trang chạy chế độ thử (dữ liệu chỉ nằm trong trình duyệt của máy đang dùng). */
window.APP_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbypJ4iGC7Hs1_FG5NMgwgXykR9lca5Ee7q19JRPy9ndgeRuCxfIG79FHSzWKELYqsK9/exec",
  /* Địa chỉ Firebase Realtime Database, ví dụ "https://tin-thcs-1234-default-rtdb.asia-southeast1.firebasedatabase.app".
     Có thì lời khen, nhận xét, chốt đáp án và bài vừa nộp hiện gần như ngay (dưới 1 giây). Để trống thì tắt. */
  FIREBASE_URL: "https://gen-lang-client-0957457348-default-rtdb.asia-southeast1.firebasedatabase.app"
};
