// Chuyên đề Giáo dục AI 12 tiết – các bài theo lớp: [số, tên, tiết AI, tuần]
const AI_LOP={
6:LESSONS.map(l=>[l.so,l.ten,l.tiet,l.tuan]),
7:[[1,'Con người giữ quyền quyết định và xác thực kết quả AI','1–2','12–13'],[2,'Quy định pháp lý ngăn chặn công cụ AI có hại','3','14'],[3,'Quyền tự chủ của con người khi tương tác với AI','4','15'],[4,'Đánh giá ứng dụng và xây dựng môi trường AI có đạo đức','5–6','16–17'],[5,'Sử dụng AI có trách nhiệm và khai báo trung thực','7','20'],[6,'Dữ liệu huấn luyện và các cách AI học','8–9','21–22'],[7,'Phát hiện ý tưởng dự án AI từ thực tiễn','10','23'],[8,'Lập kế hoạch dự án sáng tạo có sử dụng AI','11–12','24–25']],
8:[[1,'AI không thay thế con người và rủi ro khi lạm dụng AI tạo sinh','1–2','12–13'],[2,'Nhận diện nguy cơ AI theo dõi và thao túng người dùng','3','14'],[3,'Vai trò và trách nhiệm của các bên trong hệ sinh thái AI','4–5','15–16'],[4,'Nhận diện, phòng tránh rủi ro và phát triển AI có đạo đức','6–7','17–18'],[5,'AI “đọc”, “nghe” và “nhìn” như thế nào?','8','20'],[6,'AI nhận diện cảm xúc dựa trên những dấu hiệu nào?','9','21'],[7,'Xác định vấn đề thực tế có thể giải quyết bằng AI','10','22'],[8,'Thiết kế kịch bản hội thoại có ứng dụng AI','11–12','23–24']],
9:[[1,'Thách thức, tác động và thiên vị của AI đối với xã hội','1–2','12–13'],[2,'Học tập, thể hiện bản thân và định hướng nghề nghiệp trong thế giới AI','3–4','14–15'],[3,'Người dùng có trách nhiệm và ứng phó nội dung giả mạo do AI','5–6','16–17'],[4,'Kiến tạo AI công bằng bằng dữ liệu đa dạng','7','20'],[5,'Ý tưởng sáng tạo giải quyết vấn đề bằng AI','8','21'],[6,'Cải thiện dữ liệu để nâng cao chất lượng sản phẩm AI','9','22'],[7,'Con người đồng sáng tạo và dẫn dắt AI','10','23'],[8,'Kiểm tra và đánh giá sản phẩm AI','11–12','24–25']]};
// Kiểm tra theo PPCT (tiết = tuần)
const KT={6:{9:'Kiểm tra giữa kì I',17:'Ôn tập',18:'Kiểm tra cuối kì I',25:'Kiểm tra giữa kì II',33:'Ôn tập',34:'Kiểm tra cuối kì II'},
7:{9:'Kiểm tra giữa kì I',17:'Ôn tập',18:'Kiểm tra cuối kì I',26:'Kiểm tra giữa kì II',33:'Ôn tập',34:'Kiểm tra cuối kì II'}};
KT[8]=KT[9]=Object.assign({},KT[7],{8:'Kiểm tra giữa kì I'});delete KT[8][9];
const LAN=['ai8-bai1','ai8-bai2','ai8-bai3','ai8-bai4','ai8-bai5','ai8-bai6','ai8-bai7','ai8-bai8'];   // bài AI đã cài vào máy chủ LAN (ai-12-tiet/lan/)
const STEM={6:[28,29],7:[19,20],8:[23,24],9:[15,16]};
