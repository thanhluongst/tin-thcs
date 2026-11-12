"""Sinh tin-thcs/chung/nls-atm.js từ Phụ lục 6 (đã tách ra pl6.json) + Bảng 7.1, Bảng 4.2, Phụ lục 2
của "Tài liệu tập huấn phát triển NLS và giáo dục ATM toàn diện cho HS THCS – môn Tin học" (BGDĐT, 10/2026).
Tiết lấy theo PPCT 2026–2027 của trường THCS Nhơn Mỹ."""
import json, sys, re
pl6 = json.load(open(sys.argv[1], encoding="utf-8"))
OUT = sys.argv[2]

# Thư mục bài → (lớp, số bài trong PL6)
THU_MUC = {
 6: ["thong-tin-va-du-lieu","xu-li-thong-tin","thong-tin-trong-may-tinh","mang-may-tinh","internet","mang-thong-tin-toan-cau",
     "tim-kiem-thong-tin-tren-internet","thu-dien-tu","an-toan-thong-tin-tren-internet","so-do-tu-duy","dinh-dang-van-ban",
     "trinh-bay-bang","tim-kiem-va-thay-the","hoan-thien-so-luu-niem","thuat-toan","cac-cau-truc-dieu-khien","chuong-trinh-may-tinh"],
 7: ["thiet-bi-vao-ra","phan-mem-may-tinh","quan-li-du-lieu","mang-xa-hoi","ung-xu-tren-mang","phan-mem-bang-tinh",
     "tinh-toan-tu-dong","cong-cu-ho-tro-tinh-toan","trinh-bay-bang-tinh","hoan-thien-bang-tinh","tao-bai-trinh-chieu",
     "dinh-dang-trang-chieu","hoan-thien-bai-trinh-chieu","thuat-toan-tim-kiem-tuan-tu","thuat-toan-tim-kiem-nhi-phan","thuat-toan-sap-xep"],
 8: ["luoc-su-cong-cu-tinh-toan","thong-tin-trong-moi-truong-so","khai-thac-thong-tin-so","dao-duc-van-hoa-so",
     "bang-tinh-bai-toan-thuc-te","sap-xep-va-loc-du-lieu","bieu-do","danh-sach-hinh-anh","dau-trang-chan-trang",
     "trang-chieu-nang-cao","ban-mau-trinh-chieu","tu-thuat-toan-den-chuong-trinh","bieu-dien-du-lieu","cau-truc-dieu-khien","go-loi","tin-hoc-nghe-nghiep"],
 9: ["the-gioi-ki-thuat-so","thong-tin-giai-quyet-van-de","danh-gia-chat-luong-thong-tin","phap-li-dich-vu-internet",
     "tim-hieu-phan-mem-mo-phong","khai-thac-phan-mem-mo-phong","trao-doi-hop-tac","cong-cu-truc-quan","xac-thuc-du-lieu",
     "ham-countif","ham-sumif","ham-if","tai-chinh-gia-dinh","giai-quyet-van-de","bai-toan-tin-hoc","lap-chuong-trinh-may-tinh","the-gioi-nghe-nghiep"],
}
BAI = {
 6: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17"],
 7: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"],
 8: ["1","2","3","4","5","6","7","8a","9a","10a","11a","12","13","14","15","16"],
 9: ["1","2","3","4","5","6","7","8","9a","10a","11a","12a","13a","14","15","16","17"],
}
# Tiết theo PPCT của trường (2026–2027)
TIET = {
 6: ["1, 2","3, 4","5, 6","7, 8","10, 11","12, 13","14, 15","16","19","20, 21","22, 23","24","26","27","28, 29","30, 31","32, 35"],
 7: ["1, 2","3, 4","5, 6","7, 8","10, 11","12, 13","14, 15","16","19, 20","21, 22","23, 24","25","27","28, 29","30, 31","32, 35"],
 8: ["1, 2","3, 4","5, 6","7","9, 10","11, 12","13, 14","15, 16","19, 20","21, 22","23, 24","25","27, 28","29, 30","31, 32","35"],
 9: ["1, 2","3","4, 5","6, 7","9, 10","11, 12","13, 14","15, 16","19","20, 21","22, 23","24","25","27","28, 29","30, 31","32, 35"],
}

# Chỉ báo NLS theo CV 3456 (Phụ lục 2) – chỉ những mã được dùng
CHI_BAO = {
 "1.1.TC1a": "Giải thích được nhu cầu thông tin.",
 "1.1.TC1b": "Thực hiện được rõ ràng và theo quy trình các tìm kiếm để tìm dữ liệu, thông tin và nội dung trong môi trường số.",
 "1.1.TC1c": "Giải thích được cách truy cập và điều hướng các kết quả tìm kiếm.",
 "1.3.TC1a": "Lựa chọn được dữ liệu, thông tin và nội dung để tổ chức, lưu trữ và truy xuất chúng một cách thường xuyên trong môi trường số.",
 "1.3.TC1b": "Sắp xếp dữ liệu, thông tin và nội dung một cách trật tự trong một môi trường có cấu trúc.",
 "2.1.TC1a": "Thực hiện được các tương tác được xác định rõ ràng và thường xuyên với các công nghệ số.",
 "2.5.TC1a": "Làm rõ được các chuẩn mực hành vi thường xuyên và được xác định rõ ràng cũng như bí quyết khi sử dụng công nghệ số và tương tác trong môi trường số.",
 "2.6.TC1b": "Giải thích được những cách được xác định rõ ràng và thường xuyên để bảo vệ danh tiếng trực tuyến của bản thân.",
 "3.1.TC1a": "Chỉ ra được cách tạo và chỉnh sửa nội dung có khái niệm cụ thể và mang tính phổ thông bằng những định dạng rõ ràng, phổ biến.",
 "3.1.TC1b": "Thể hiện được bản thân thông qua việc tạo ra các nội dung số thông thường và được xác định rõ ràng.",
 "3.4.TC1a": "Liệt kê được các hướng dẫn thông thường và được xác định rõ ràng cho một hệ thống máy tính để giải quyết các vấn đề thường ngày hoặc thực hiện các tác vụ thường ngày.",
 "4.1.TC1a": "Chỉ ra được những cách thức cơ bản và phổ biến để bảo vệ thiết bị và nội dung số.",
 "4.1.TC1b": "Phân biệt được những rủi ro và mối đe dọa cơ bản và phổ biến trong môi trường số.",
 "4.1.TC1c": "Chọn lựa được các biện pháp an toàn và bảo mật rõ ràng và thường xuyên.",
 "4.3.TC1a": "Giải thích được những cách thức cơ bản và phổ biến để tránh rủi ro và đe dọa đối với sức khỏe thể chất và tinh thần khi sử dụng công nghệ số.",
 "5.2.TC1a": "Chọn được các công cụ số thông thường và được xác định rõ ràng cũng như các giải pháp công nghệ có thể có để giải quyết những nhu cầu đó.",
 "5.2.TC1b": "Chọn được các công cụ số thông thường và được xác định rõ ràng cũng như các giải pháp công nghệ có thể có để giải quyết những nhu cầu đó.",
 "1.1.TC2b": "Tổ chức được tìm kiếm dữ liệu, thông tin và nội dung trong môi trường số.",
 "1.2.TC2a": "Thực hiện phân tích, so sánh và đánh giá được các nguồn dữ liệu, thông tin và nội dung số.",
 "1.2.TC2b": "Thực hiện phân tích, diễn giải và đánh giá được dữ liệu, thông tin và nội dung số.",
 "1.3.TC2b": "Tổ chức được thông tin, dữ liệu và nội dung trong một môi trường có cấu trúc.",
 "2.4.TC2a": "Lựa chọn được các công cụ và công nghệ số cho các quá trình hợp tác.",
 "2.5.TC2a": "Thảo luận về các chuẩn mực hành vi và cách sử dụng công nghệ số và tương tác trong môi trường số.",
 "3.1.TC2a": "Chỉ ra được cách tạo và chỉnh sửa nội dung ở các định dạng khác nhau.",
 "3.1.TC2b": "Thể hiện được bản thân thông qua việc tạo ra các nội dung số.",
 "3.3.TC2a": "Thảo luận các quy tắc về bản quyền và giấy phép áp dụng cho thông tin và nội dung số.",
 "3.4.TC2a": "Liệt kê được các hướng dẫn cho một hệ thống máy tính để giải quyết một vấn đề nhất định hoặc thực hiện một nhiệm vụ cụ thể.",
 "4.1.TC2b": "Phân biệt được rủi ro và mối đe dọa trong môi trường số.",
 "5.1.TC2b": "Chọn được giải pháp cho các vấn đề kỹ thuật khi vận hành thiết bị và sử dụng môi trường số.",
 "5.2.TC2a": "Giải thích nhu cầu cá nhân.",
 "5.2.TC2b": "Lựa chọn được các công cụ số và các giải pháp công nghệ có thể có để giải quyết những nhu cầu đó.",
 "5.3.TC2a": "Phân biệt được các công cụ và công nghệ số có thể được sử dụng để tạo ra kiến thức và đổi mới quy trình và sản phẩm.",
 "5.4.TC2c": "Chỉ ra được nơi để tìm kiếm cơ hội phát triển bản thân và cập nhật sự phát triển công nghệ số.",
 "6.3.TC2a": "Phân tích được hiệu quả của hệ thống AI trong việc giải quyết các vấn đề cụ thể.",
}
NHOM_ATM = {
 "ATM1": "Khai thác, đánh giá thông tin số và nhận diện rủi ro thông tin",
 "ATM2": "Giao tiếp, hợp tác, ứng xử và công dân số",
 "ATM3": "Quản lí danh tính số, dữ liệu cá nhân và quyền riêng tư",
 "ATM4": "An toàn thiết bị, tài khoản và ứng phó sự cố",
 "ATM5": "Sức khỏe số, an sinh số và cân bằng đời sống số",
 "ATM6": "Sáng tạo nội dung số, bản quyền và trách nhiệm số",
 "ATM7": "Sử dụng AI an toàn khi học tập và sinh hoạt",
 "ATM8": "Tìm kiếm hỗ trợ, phục hồi và đóng góp cộng đồng số",
}
# Địa chỉ ATM: yêu cầu (Phụ lục 6 / Bảng 7.1), hoạt động và minh chứng (Bảng 7.1, mục 5.3)
ATM = {
 (6, "6"): [{"muc": "B", "nhom": "ATM1", "ma": "1.1.TC1b",
   "yc": "Thực hiện được quy trình kiểm chứng độc lập với một bài viết bất kỳ được giao: (1) tra cứu tên miền/tổ chức đăng; (2) tìm ít nhất một nguồn thứ hai độc lập; (3) kiểm tra ngày đăng và tính thời sự; (4) viết nhận xét ngắn về độ tin cậy có lập luận.",
   "hd": "GV giao một bài báo mạng hoặc một liên kết tin tức; học sinh áp dụng 4 bước để xác minh tính xác thực của thông tin.",
   "mc": "Phiếu nhận xét và đánh giá độ tin cậy bài viết."}],
 (6, "7"): [{"muc": "B", "nhom": "ATM1", "ma": "1.1.TC1b",
   "yc": "Thực hiện tìm kiếm thông tin theo quy trình có cấu trúc; phân tích và đánh giá độ tin cậy của kết quả tìm kiếm trước khi khai thác sử dụng.",
   "hd": "Sau khi tìm kiếm, nhóm chọn 2 kết quả và đối chiếu theo 4 bước kiểm chứng (tên miền, nguồn thứ hai, ngày đăng, nhận xét).",
   "mc": "Phiếu ghi từ khoá, kết quả chọn dùng và lí do tin cậy."}],
 (6, "8"): [{"muc": "B", "nhom": "ATM4", "ma": "4.1.TC1b",
   "yc": "Nhận diện các thông điệp lừa đảo, thư rác qua email; không mở tệp đính kèm hoặc nhấp vào liên kết lạ trong thư điện tử.",
   "hd": "Học sinh xem một số thư mẫu (thư thật và thư giả mạo), chỉ ra dấu hiệu đáng ngờ: người gửi lạ, giục gấp, liên kết sai tên miền, tệp đính kèm lạ.",
   "mc": "Bảng nhận diện thư an toàn / thư lừa đảo kèm dấu hiệu."}],
 (6, "9"): [{"muc": "B", "nhom": "ATM4", "ma": "4.1.TC1b",
   "yc": "Nhận diện được ít nhất ba hình thức lừa đảo trực tuyến phổ biến ở lứa tuổi học sinh (giả danh người thân, link trúng thưởng, tài khoản game giả) qua tin nhắn/email và nêu được hành động ứng phó an toàn.",
   "hd": "Hoạt động “Cạm bẫy tin nhắn”: mỗi nhóm nhận 5 mẫu tin nhắn/email (3 lừa đảo, 2 an toàn), phân loại, khoanh dấu hiệu đáng ngờ; GV chốt nguyên tắc 3 Không: không tin ngay – không bấm link lạ – không vội chuyển tiền.",
   "mc": "Bảng phân loại các hình thức lừa đảo qua tin nhắn."}],
 (7, "4"): [{"muc": "B", "nhom": "ATM2", "ma": "2.5.TC1a; 2.6.TC1b",
   "yc": "Phân biệt được sự khác nhau giữa “mâu thuẫn thông thường” và “bắt nạt mạng” dựa trên ba tiêu chí: cố ý, lặp lại, tạo ra sự mất cân bằng quyền lực; thực hiện được cài đặt quyền riêng tư cơ bản trên mạng xã hội.",
   "hd": "Cung cấp các đoạn chat giả định; học sinh dùng 3 tiêu chí để phân loại đâu là tranh cãi bình thường, đâu là bắt nạt mạng.",
   "mc": "Phiếu bài tập phân tích tình huống giao tiếp mạng."}],
 (7, "5"): [{"muc": "B", "nhom": "ATM2", "ma": "2.5.TC1a",
   "yc": "Phân biệt được “mâu thuẫn thông thường” và “bắt nạt mạng” (cố ý, lặp lại, mất cân bằng quyền lực); thực hiện được quy trình xử lí khi bị bắt nạt mạng: lưu bằng chứng, chặn, báo cáo trên nền tảng, báo ngay người lớn tin cậy, không giữ bí mật.",
   "hd": "Đọc các đoạn chat giả định, phân loại theo 3 tiêu chí; đóng vai các bước Nhận biết – Suy xét – Hành động.",
   "mc": "Phiếu phân tích tình huống giao tiếp mạng."},
  {"muc": "B", "nhom": "ATM5", "ma": "4.3.TC1a",
   "yc": "Giải thích được cơ chế “vòng lặp phần thưởng” mà các ứng dụng mạng xã hội và game sử dụng để giữ người dùng ở lại màn hình lâu hơn.",
   "hd": "Xem video ngắn về cách mạng xã hội thiết kế nút “like” và thông báo; học sinh vẽ sơ đồ giải thích cơ chế gây nghiện.",
   "mc": "Sơ đồ tư duy giải thích vòng lặp phần thưởng."}],
 (8, "2"): [{"muc": "B", "nhom": "ATM1", "ma": "1.1.TC2b; 1.2.TC2a",
   "yc": "Tự lựa chọn một bài đăng đang lan truyền trên mạng xã hội, độc lập thực hiện kiểm chứng toàn bộ quy trình, so sánh ít nhất hai nguồn tin độc lập và viết được bài phân tích ngắn (có tiêu đề, lập luận, kết luận và khuyến nghị cho người đọc).",
   "hd": "Học sinh tự tìm một tin đang gây tranh cãi, dùng công cụ tìm kiếm đối chiếu với 2 nguồn báo chính thống và viết báo cáo kiểm chứng.",
   "mc": "Bài phân tích ngắn kiểm chứng tính xác thực của thông tin."}],
 (8, "3"): [{"muc": "B", "nhom": "ATM1", "ma": "1.2.TC2a",
   "yc": "Độc lập kiểm chứng độ tin cậy của các nguồn thông tin số, phân tích chiến lược thao túng cảm xúc trong bài đăng và viết nhận xét phân tích phản biện có lập luận.",
   "hd": "Phân tích một bài đăng mẫu: ngôn ngữ kích động ở đâu, số liệu bị dùng sai thế nào, hình ảnh gây hiểu nhầm ra sao.",
   "mc": "Bản nhận xét phản biện có lập luận."}],
 (8, "4"): [{"muc": "B", "nhom": "ATM6", "ma": "3.3.TC2a; 2.5.TC2a",
   "yc": "Tạo được một sản phẩm số có mục đích rõ ràng (bài thuyết trình, video ngắn, bài viết blog) sử dụng đúng nguồn tư liệu có phép, ghi rõ loại giấy phép của từng tư liệu; và xác định được ít nhất hai hậu quả pháp lí cụ thể nếu sản phẩm vi phạm bản quyền hoặc xúc phạm người khác.",
   "hd": "Học sinh làm bài trình chiếu/video số, bắt buộc dùng kho ảnh Creative Commons và trích nguồn ở trang cuối.",
   "mc": "Sản phẩm số có ghi chú bản quyền và loại giấy phép."}],
 (9, "3"): [{"muc": "KK", "nhom": "ATM7", "ma": "1.2.TC2b; 6.3.TC2a",
   "yc": "Sử dụng được ít nhất hai công cụ AI khác nhau cho cùng một nhiệm vụ học tập, so sánh được kết quả, xác định được điểm thiên lệch hoặc sai sót trong mỗi công cụ và lí giải vì sao hai công cụ cho kết quả khác nhau (dữ liệu huấn luyện, thời điểm cập nhật khác nhau…).",
   "hd": "Cùng một câu hỏi về kiến thức Tin học, đặt cho 2 chatbot AI (tài khoản do nhà trường quản lí hoặc GV thao tác trên máy chiếu), đối chiếu kết quả và giải thích sự khác biệt.",
   "mc": "Bảng so sánh và phân tích chéo kết quả từ các công cụ AI."}],
 (9, "4"): [{"muc": "B", "nhom": "ATM4", "ma": "4.1.TC2b",
   "yc": "Lập được kịch bản ứng phó cho ít nhất hai tình huống tấn công tài khoản khác nhau (bị chiếm tài khoản mạng xã hội; bị dùng tài khoản để nhắn tin lừa đảo bạn bè), xử lí được tình huống ít quen thuộc mà không cần hướng dẫn bước đầu.",
   "hd": "Thảo luận và vẽ sơ đồ luồng các bước cần làm khi phát hiện tài khoản Zalo/Facebook bị chiếm và đang nhắn tin mượn tiền người thân.",
   "mc": "Sơ đồ luồng kịch bản ứng phó sự cố tài khoản."}],
}

def thuong(s):
    s = re.sub(r"\. (\w)", lambda m: "; " + m.group(1).lower(), s.strip().rstrip("."))
    return s[:1].lower() + s[1:] if s else s

data = {}
for L in (6, 7, 8, 9):
    theo_bai = {b["bai"]: b for b in pl6[str(L)]}
    for i, tm in enumerate(THU_MUC[L]):
        bai = BAI[L][i]
        b = theo_bai[bai]
        ma = b["ma"]
        for m in ma:
            assert m in CHI_BAO, m
        yccd = [y.replace("->", "→").replace(" →", " →") for y in b["yccd"]]
        atm = ATM.get((L, bai), [])
        A = "; ".join(thuong(y) for y in yccd)
        B = "; ".join(thuong(CHI_BAO[m]) for m in ma)
        mt = "Học sinh " + A + " (A); thông qua việc " + B + " (B)"
        if atm:
            mt += "; cụ thể là " + "; ".join(thuong(a["yc"]) for a in atm) + " (C)"
        mt += "."
        data["tin%d-%s" % (L, tm)] = {"lop": L, "bai": bai, "ten": b["ten"].replace("Thiết bị vào - ra", "Thiết bị vào – ra"),
                                      "tiet": TIET[L][i], "yccd": yccd, "nls": ma, "atm": atm, "mt": mt}

js = open(sys.argv[3], encoding="utf-8").read()
js = js.replace("/*DU_LIEU*/", json.dumps({"chiBao": CHI_BAO, "nhomAtm": NHOM_ATM, "bai": data}, ensure_ascii=False, indent=0).replace("\n", ""))
open(OUT, "w", encoding="utf-8").write(js)
print(len(data), "bài;", sum(1 for v in data.values() if v["atm"]), "bài có địa chỉ ATM")
print(data["tin6-an-toan-thong-tin-tren-internet"]["mt"])
print(data["tin7-thuat-toan-sap-xep"]["mt"])
