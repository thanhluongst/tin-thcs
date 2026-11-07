# Sinh hoạt động "Gắn nhãn" (SVG tự vẽ) cho 13 bài lí thuyết và chèn vào index.html
import json, re, sys, os
ROOT = sys.argv[1]

def T(x, y, s, size=20, anchor="middle", w=400, fill="#1d2433", extra=""):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" font-weight="{w}" fill="{fill}" font-family="Be Vietnam Pro,Arial,sans-serif" {extra}>{s}</text>'
def R(x, y, w, h, fill="#fff", stroke="#3d4b5c", rx=10, sw=2, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def C(x, y, r, fill="#fff", stroke="#3d4b5c", sw=2):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def Lz(x1, y1, x2, y2, stroke="#3d4b5c", sw=2, extra=""):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def P(d, fill="none", stroke="#3d4b5c", sw=2, extra=""):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def svg(W, H, body, label):
    return f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="{label}" xmlns="http://www.w3.org/2000/svg"><rect width="{W}" height="{H}" rx="14" fill="#f7fafc"/>{body}</svg>'
def slots(W, H, lst):
    out = []
    for s in lst:
        d = {"x": round(s[0] / W * 100, 2), "y": round(s[1] / H * 100, 2), "a": s[2]}
        if len(s) > 3 and s[3]: d["w"] = round(s[3] / W * 100, 2)
        if len(s) > 5: d["px"] = round(s[4] / W * 100, 2); d["py"] = round(s[5] / H * 100, 2)
        out.append(d)
    return out

# ---------- hình nhỏ dùng lại ----------
def pc(x, y, s=1.0):  # màn hình máy tính nhỏ, góc trên trái (x,y)
    w, h = 70 * s, 48 * s
    return R(x, y, w, h, "#dbeafe", rx=5) + R(x + w * .42, y + h, w * .16, 10 * s, "#cbd5e1", rx=1, sw=1.5) + R(x + w * .25, y + h + 10 * s, w * .5, 6 * s, "#cbd5e1", rx=2, sw=1.5)
def phone(x, y, s=1.0):
    return R(x, y, 26 * s, 46 * s, "#e0f2fe", rx=5) + C(x + 13 * s, y + 40 * s, 2.5 * s, "#94a3b8", "#94a3b8", 1)
def house(x, y):
    return P(f"M{x} {y+60} L{x+90} {y} L{x+180} {y+60} Z", "#fca5a5") + R(x + 15, y + 60, 150, 100, "#fff7ed", rx=4)

D = {}

# 1. Internet
W, H = 1000, 600
b = ""
cx, cy = 500, 300
b += P("M380 330 q-60 0 -60 -45 q0 -45 60 -45 q10 -55 80 -55 q55 -40 110 0 q80 -10 90 55 q55 5 55 45 q0 45 -60 45 Z", "#e0f2fe", "#2f6fb3", 3)
for (x, y) in [(180, 150), (180, 450), (820, 150), (820, 450), (500, 520)]:
    b += Lz(x, y, cx, cy, "#2f6fb3", 3, 'stroke-dasharray="8 6"')
b += house(90, 30) + pc(120, 105, .8) + phone(205, 110, .8)
b += R(70, 370, 220, 140, "#fef9c3", rx=6) + P("M70 370 L180 330 L290 370", "#fde68a") + pc(90, 420, .7) + pc(160, 420, .7) + pc(225, 420, .55)
b += R(740, 60, 160, 150, "#ede9fe", rx=6) + Lz(820, 60, 820, 20, "#3d4b5c", 3) + C(820, 18, 8, "#f472b6") + P("M800 25 q20 -20 40 0 M790 15 q30 -30 60 0", "none", "#7c3aed", 2)
for i in range(3): b += R(765, 85 + i * 38, 110, 26, "#c4b5fd", rx=3, sw=1.5)
b += R(770, 360, 100, 170, "#334155", rx=8)
for i in range(4): b += R(782, 375 + i * 38, 76, 26, "#475569", "#94a3b8", 3, 1.5) + C(846, 388 + i * 38, 4, "#22c55e", "#22c55e", 1)
b += phone(487, 495, 1.1) + P("M470 480 q30 -25 60 0 M478 488 q22 -16 44 0", "none", "#2f6fb3", 2)
D["tin6-internet"] = dict(title="Gắn nhãn: Internet kết nối các mạng máy tính", svg=svg(W, H, b, "Sơ đồ Internet kết nối mạng gia đình, mạng trường học, nhà cung cấp dịch vụ, máy chủ và điện thoại"),
  slots=slots(W, H, [(500, 285, "Internet", 200), (190, 240, "Mạng máy tính gia đình", 250), (190, 560, "Mạng máy tính trường học", 250),
                     (820, 250, "Nhà cung cấp dịch vụ Internet (ISP)", 260), (640, 560, "Thiết bị di động (4G/5G)", 230), (820, 345, "Máy chủ lưu trang web", 240)]),
  extra=["Máy in", "Ổ đĩa USB"], done="Internet là mạng liên kết các mạng máy tính trên khắp thế giới.")

# 2. Phần mềm máy tính: các tầng
W, H = 1000, 560
b = ""
lay = [("#fde68a", "👤"), ("#bbf7d0", ""), ("#bfdbfe", ""), ("#e2e8f0", "")]
for i, (col, _) in enumerate(lay):
    y = 40 + i * 125
    b += R(140, y, 480, 105, col, rx=14)
# tầng 1: người dùng
b += C(330, 72, 18, "#fff7ed") + P("M300 132 q30 -45 60 0", "#fff7ed") + C(420, 72, 18, "#fff7ed") + P("M390 132 q30 -45 60 0", "#fff7ed")
# tầng 2: biểu tượng ứng dụng
for j, (lbl, c) in enumerate([("W", "#2b579a"), ("X", "#217346"), ("P", "#c43e1c"), ("🌐", "#0ea5e9"), ("♪", "#9333ea")]):
    b += R(200 + j * 80, 185, 56, 56, c, c, 10) + T(228 + j * 80, 222, lbl, 26, w=700, fill="#fff")
# tầng 3: hệ điều hành (cửa sổ + bánh răng)
b += R(220, 300, 130, 85, "#fff", rx=6) + R(220, 300, 130, 18, "#60a5fa", rx=6) + R(400, 300, 130, 85, "#fff", rx=6) + R(400, 300, 130, 18, "#60a5fa", rx=6)
b += C(575, 342, 22, "#93c5fd") + C(575, 342, 8, "#fff")
# tầng 4: phần cứng
b += R(200, 425, 70, 90, "#94a3b8", rx=6) + R(300, 440, 110, 60, "#cbd5e1", rx=4) + R(330, 455, 50, 30, "#475569", rx=3)
for k in range(6): b += Lz(330 + k * 10, 450, 330 + k * 10, 440, "#475569", 2) + Lz(330 + k * 10, 490, 330 + k * 10, 500, "#475569", 2)
b += R(440, 445, 140, 50, "#e2e8f0", rx=6) + T(510, 477, "RAM", 18, w=700)
for i in range(3):
    b += P(f"M660 {140 + i*125} l0 -30 l-10 12 m10 -12 l10 12", "none", "#64748b", 3)
b += T(60, 300, "Giao tiếp", 18, extra='transform="rotate(-90 60 300)"', fill="#64748b")
D["tin7-phan-mem-may-tinh"] = dict(title="Gắn nhãn: các tầng từ người sử dụng đến phần cứng", svg=svg(W, H, b, "Sơ đồ bốn tầng: người sử dụng, phần mềm ứng dụng, hệ điều hành, phần cứng"),
  slots=slots(W, H, [(820, 92, "Người sử dụng", 260, 620, 92), (820, 217, "Phần mềm ứng dụng", 260, 620, 217), (820, 342, "Hệ điều hành", 260, 620, 342), (820, 467, "Phần cứng", 260, 620, 467)]),
  extra=["Tệp dữ liệu", "Trình duyệt web"], done="Hệ điều hành là cầu nối giữa phần cứng, phần mềm ứng dụng và người sử dụng.")

# 3. Thiết bị vào – ra
W, H = 1000, 620
b = R(60, 430, 880, 22, "#d6b48a", "#a47148", 4)  # mặt bàn
b += R(370, 150, 260, 170, "#1e293b", rx=10) + R(385, 165, 230, 140, "#bfdbfe", rx=4) + R(485, 320, 30, 40, "#64748b", rx=2) + R(440, 360, 120, 14, "#64748b", rx=4)  # màn hình
b += R(490, 130, 22, 16, "#111", rx=5) + C(501, 138, 4, "#60a5fa", "#60a5fa", 1)  # webcam
b += R(360, 385, 280, 40, "#e2e8f0", rx=6)
for r in range(3):
    for c in range(12): b += R(372 + c * 22, 391 + r * 11, 18, 8, "#94a3b8", "#94a3b8", 1, 1)
b += P("M700 395 q0 -22 20 -22 q20 0 20 22 l0 14 q0 16 -20 16 q-20 0 -20 -16 Z", "#e2e8f0") + Lz(720, 373, 720, 392, "#3d4b5c", 2)  # chuột
b += R(120, 220, 110, 210, "#334155", rx=8) + C(175, 260, 9, "#22c55e") + R(140, 300, 70, 8, "#64748b", "#64748b", 2, 1)  # thân máy
b += R(300, 270, 50, 160, "#475569", rx=8) + C(325, 320, 15, "#94a3b8") + C(325, 380, 20, "#94a3b8") + R(650, 270, 50, 160, "#475569", rx=8) + C(675, 320, 15, "#94a3b8") + C(675, 380, 20, "#94a3b8")  # loa
b += R(770, 330, 160, 100, "#e5e7eb", rx=8) + R(790, 300, 120, 34, "#fff", rx=2) + R(800, 380, 120, 20, "#cbd5e1", rx=3)  # máy in
b += Lz(255, 430, 255, 330, "#3d4b5c", 3) + R(245, 300, 20, 38, "#111", rx=9)  # micro
D["tin7-thiet-bi-vao-ra"] = dict(title="Gắn nhãn: các thiết bị vào – ra của máy tính", svg=svg(W, H, b, "Góc học tập có màn hình, webcam, bàn phím, chuột, thân máy, loa, máy in, micro"),
  slots=slots(W, H, [(500, 60, "Webcam", 170, 501, 132), (500, 515, "Bàn phím", 170, 500, 405), (790, 520, "Chuột", 150, 722, 405), (130, 120, "Thân máy", 190, 175, 222),
                     (680, 100, "Màn hình", 170, 600, 180), (880, 250, "Máy in", 150, 850, 318), (330, 580, "Loa", 120, 325, 410), (110, 520, "Micro", 130, 252, 320)]),
  extra=["Ổ cứng"], done="Thiết bị vào: bàn phím, chuột, micro, webcam. Thiết bị ra: màn hình, loa, máy in.")

# 4. Lược sử công cụ tính toán: dòng thời gian
W, H = 1000, 560
b = Lz(60, 330, 950, 330, "#3d4b5c", 5) + P("M950 318 L975 330 L950 342 Z", "#3d4b5c")
xs = [120, 310, 500, 690, 880]
for x in xs: b += C(x, 330, 12, "#d0186e", "#fff", 3)
# bàn tính
b += R(65, 150, 110, 130, "#fef3c7", "#92400e", 6, 3)
for i in range(5): b += Lz(70, 175 + i * 22, 170, 175 + i * 22, "#92400e", 2) + "".join(C(85 + k * 16, 175 + i * 22, 6, "#b45309", "#78350f", 1) for k in range(3))
# Pascaline: hộp gỗ có bánh xe số
b += R(245, 190, 130, 80, "#d6a76b", "#7c4a1e", 6, 3) + "".join(C(268 + k * 28, 225, 11, "#fff7ed", "#7c4a1e", 2) for k in range(4))
# máy Babbage: bánh răng chồng
for j in range(3): b += R(450 + j * 35, 160, 14, 120, "#cbd5e1", "#475569", 3, 2) + "".join(C(457 + j * 35, 175 + k * 25, 10, "#e2e8f0", "#475569", 2) for k in range(5))
# ENIAC: tủ lớn
for j in range(3): b += R(625 + j * 45, 160, 40, 120, "#475569", "#1e293b", 3, 2) + "".join(C(637 + j * 45 + (k % 2) * 16, 180 + (k // 2) * 22, 4, "#fbbf24", "#fbbf24", 1) for k in range(8))
# máy tính cá nhân
b += pc(840, 195, 1.15)
for x, yr in zip(xs, ["Hàng nghìn năm trước", "Năm 1642", "Thế kỉ XIX", "Năm 1945", "Thập niên 1970–1980"]): b += T(x, 375, yr, 18, w=600, fill="#475569")
D["tin8-luoc-su-cong-cu-tinh-toan"] = dict(title="Gắn nhãn: dòng thời gian các công cụ tính toán", svg=svg(W, H, b, "Dòng thời gian năm công cụ tính toán"),
  slots=slots(W, H, [(120, 450, "Bàn tính", 175), (310, 450, "Máy tính cơ học Pascaline", 175), (500, 450, "Máy của Charles Babbage", 175), (690, 450, "Máy tính điện tử ENIAC", 175), (880, 450, "Máy tính cá nhân", 175)]),
  extra=["Điện thoại thông minh"], done="Từ công cụ tính toán thủ công đến máy tính điện tử, máy tính ngày càng nhỏ gọn và mạnh hơn.")

# 5. Thông tin trong môi trường số: dấu hiệu tin giả
W, H = 1000, 640
b = R(330, 20, 340, 600, "#111827", rx=34) + R(345, 60, 310, 520, "#fff", rx=8)
b += C(380, 95, 18, "#fca5a5") + T(408, 92, "Tin Nóng 24h", 18, "start", 700) + T(408, 113, "Công khai · ???", 14, "start", fill="#94a3b8")
b += T(500, 160, "KHẨN CẤP!!! SỐC!!!", 22, w=800, fill="#dc2626") + T(500, 186, "Ngày mai tất cả", 16) + T(500, 206, "học sinh được nghỉ học", 16)
b += R(365, 225, 270, 160, "#bae6fd", rx=4) + P("M365 385 l70 -70 l50 40 l40 -30 l110 60 Z", "#86efac") + C(590, 260, 18, "#fde047") + P("M440 240 l25 25 m0 -25 l-25 25 M520 300 l30 0", "none", "#ef4444", 3)
b += T(500, 420, "👉 CHIA SẺ NGAY trước khi bị xoá!!!", 16, w=700, fill="#b91c1c")
b += R(370, 445, 260, 1, "#e5e7eb", "#e5e7eb", 0, 1) + T(380, 480, "👍 12K", 16, "start") + T(620, 480, "↗ 9,8K lượt chia sẻ", 16, "end")
D["tin8-thong-tin-trong-moi-truong-so"] = dict(title="Gắn nhãn: những dấu hiệu của một tin giả", svg=svg(W, H, b, "Bài đăng mạng xã hội có dấu hiệu tin giả"),
  note="Bài đăng trên điện thoại có nhiều dấu hiệu đáng ngờ. Kéo mỗi nhãn vào ô chỉ đúng dấu hiệu đó (hoặc bấm nhãn rồi bấm ô).",
  slots=slots(W, H, [(170, 95, "Nguồn tin không rõ ràng", 280, 375, 95), (830, 113, "Không rõ thời gian đăng", 280, 470, 113), (830, 175, "Tiêu đề giật gân, gây sốc", 280, 600, 160),
                     (170, 300, "Ảnh có thể đã bị chỉnh sửa", 280, 440, 260), (830, 420, "Kêu gọi chia sẻ gấp", 280, 630, 420)]),
  extra=["Có trích dẫn nguồn chính thức"], done="Trước khi tin và chia sẻ, hãy kiểm tra nguồn tin, thời gian và đối chiếu với các trang chính thống.")

# 6. Khai thác thông tin số: trang kết quả tìm kiếm
W, H = 1000, 620
b = R(40, 30, 920, 560, "#fff", rx=12)
b += T(80, 85, "Tìm kiếm", 24, "start", 800, "#2563eb") + R(220, 55, 560, 44, "#fff", "#94a3b8", 22) + T(245, 84, "năng lượng tái tạo ở Việt Nam", 18, "start") + C(745, 77, 10, "none", "#2563eb", 3)
b += T(80, 145, "Được tài trợ", 15, "start", 700) + T(80, 170, "pin-mat-troi-gia-re.shop", 15, "start", fill="#475569") + T(80, 198, "Lắp pin mặt trời giá rẻ nhất – Giảm 50% hôm nay", 20, "start", 600, "#1d4ed8")
b += T(80, 255, "moit.gov.vn › tin-tuc › nang-luong", 15, "start", fill="#475569") + R(78, 240, 92, 22, "none", "#d0186e", 4, 2.5)
b += T(80, 285, "Phát triển năng lượng tái tạo – Bộ Công Thương", 21, "start", 600, "#1d4ed8")
b += T(80, 313, "Việt Nam có tiềm năng lớn về điện gió, điện mặt trời. Bài viết", 16, "start", fill="#334155") + T(80, 335, "tổng hợp số liệu và định hướng phát triển đến năm 2030…", 16, "start", fill="#334155")
b += T(80, 395, "vi.wikipedia.org › wiki › Năng_lượng_tái_tạo", 15, "start", fill="#475569") + T(80, 425, "Năng lượng tái tạo – Wikipedia tiếng Việt", 21, "start", 600, "#1d4ed8")
D["tin8-khai-thac-thong-tin-so"] = dict(title="Gắn nhãn: các phần của trang kết quả tìm kiếm", svg=svg(W, H, b, "Trang kết quả tìm kiếm về năng lượng tái tạo"),
  slots=slots(W, H, [(860, 140, "Ô nhập từ khoá", 210, 760, 80), (860, 200, "Quảng cáo (được tài trợ)", 210, 680, 190), (300, 480, "Tên miền của cơ quan nhà nước (.gov.vn)", 330, 124, 262),
                     (860, 285, "Tiêu đề trang web", 210, 650, 280), (650, 480, "Đoạn mô tả nội dung", 260, 500, 336), (860, 395, "Địa chỉ trang web", 210, 470, 392)]),
  extra=["Tên tác giả"], done="Ưu tiên trang của cơ quan nhà nước, tổ chức uy tín; cẩn thận với kết quả quảng cáo.")

# 7. Đạo đức, văn hoá số: sản phẩm số đúng quy định
W, H = 1000, 600
b = R(230, 40, 540, 400, "#fff", rx=8) + R(230, 40, 540, 70, "#0f766e", rx=8) + R(230, 90, 540, 20, "#0f766e", rx=0, sw=0)
b += T(500, 85, "NĂNG LƯỢNG MẶT TRỜI", 26, w=800, fill="#fff")
b += R(260, 130, 230, 150, "#bae6fd", rx=4) + C(440, 165, 22, "#fde047") + P("M270 270 l40 -40 l35 25 l45 -35 l90 50 Z", "#86efac") + R(300, 215, 80, 45, "#1e3a8a", rx=2)
b += T(260, 302, "Ảnh: Nguyễn Văn Hùng (CC BY)", 14, "start", fill="#64748b", extra='font-style="italic"')
b += T(515, 160, "• Nguồn năng lượng sạch", 17, "start") + T(515, 190, "• Không cạn kiệt", 17, "start") + T(515, 220, "• Giảm ô nhiễm", 17, "start")
b += T(260, 352, "Tài liệu tham khảo: SGK Khoa học tự nhiên 8; evn.com.vn", 14, "start", fill="#334155")
b += T(740, 420, "Thực hiện: Nhóm 2 – Lớp 8A", 15, "end", 700, "#0f766e") + T(270, 420, "♫ Nhạc nền: bản quyền tự do", 14, "start", fill="#7c3aed")
D["tin8-dao-duc-van-hoa-so"] = dict(title="Gắn nhãn: sản phẩm số tuân thủ quy định", svg=svg(W, H, b, "Trang chiếu sản phẩm số có ghi nguồn ảnh, tài liệu, nhạc và tên tác giả"),
  note="Trang chiếu dưới đây được làm đúng quy định. Kéo mỗi nhãn vào ô chỉ đúng phần thể hiện điều đó.",
  slots=slots(W, H, [(120, 300, "Ghi nguồn, tác giả hình ảnh", 200, 247, 297), (500, 520, "Ghi tài liệu tham khảo", 230, 247, 347), (880, 420, "Ghi tên người tạo sản phẩm", 200, 742, 415),
                     (120, 470, "Dùng nhạc được phép sử dụng", 200, 257, 415), (880, 190, "Nội dung tự viết lại, ngắn gọn", 200, 690, 190)]),
  extra=["Ảnh tải trên mạng không ghi nguồn"], done="Tôn trọng bản quyền: ghi nguồn, xin phép khi dùng sản phẩm của người khác và ghi tên người tạo sản phẩm.")

# 8. Thế giới kĩ thuật số: nhà thông minh
W, H = 1000, 600
b = P("M80 200 L500 40 L920 200", "#fecaca", "#b91c1c", 3) + R(110, 200, 780, 360, "#fff7ed", "#92400e", 4, 3) + Lz(500, 200, 500, 560, "#92400e", 3)
b += R(160, 260, 200, 120, "#111827", rx=6) + R(170, 270, 180, 100, "#38bdf8", rx=3) + R(250, 380, 20, 20, "#475569", rx=2)  # TV
b += R(380, 330, 50, 70, "#334155", rx=22) + C(405, 350, 10, "#94a3b8") + R(395, 385, 20, 4, "#22d3ee", rx=2, sw=0)  # loa thông minh
b += R(560, 230, 200, 55, "#f8fafc", rx=10) + Lz(575, 270, 745, 270, "#94a3b8", 2)  # điều hoà
b += R(830, 235, 30, 22, "#111827", rx=6) + C(838, 246, 5, "#ef4444", "#ef4444", 1) + Lz(860, 246, 885, 230, "#111827", 3)  # camera
b += C(640, 520, 35, "#334155") + C(640, 520, 10, "#22d3ee")  # robot hút bụi
b += R(470, 420, 26, 60, "#1e293b", rx=4) + R(475, 430, 16, 20, "#a5b4fc", rx=2)  # khoá cửa vân tay (trên vách)
b += C(230, 490, 22, "#fde68a") + R(212, 512, 36, 48, "#60a5fa", rx=8) + R(245, 520, 14, 12, "#111827", rx=3)  # người đeo đồng hồ
D["tin9-the-gioi-ki-thuat-so"] = dict(title="Gắn nhãn: thiết bị có bộ xử lí trong ngôi nhà thông minh", svg=svg(W, H, b, "Ngôi nhà có ti vi, loa thông minh, điều hoà, camera, robot hút bụi, khoá vân tay, đồng hồ thông minh"),
  slots=slots(W, H, [(260, 160, "Ti vi thông minh", 200, 260, 262), (250, 440, "Loa thông minh", 170, 405, 365), (660, 165, "Điều hoà tự điều chỉnh", 220, 660, 232),
                     (900, 300, "Camera an ninh", 170, 845, 258), (790, 520, "Robot hút bụi", 180, 676, 520), (360, 540, "Đồng hồ thông minh", 190, 252, 526), (640, 400, "Khoá cửa vân tay", 190, 496, 445)]),
  extra=["Cái chổi"], done="Các thiết bị này đều có bộ xử lí, có thể kết nối mạng và được điều khiển tự động.")

# 9. Pháp lí: thư lừa đảo
W, H = 1000, 620
b = R(170, 30, 660, 470, "#1f2937", rx=16) + R(190, 50, 620, 430, "#fff", rx=4) + P("M120 500 L880 500 L940 560 L60 560 Z", "#9ca3af", "#4b5563", 3)
b += R(190, 50, 620, 40, "#e5e7eb", rx=4) + T(210, 77, "✉ Hộp thư đến", 16, "start", 700)
b += T(210, 120, "Từ: Ngân hàng ABC &lt;hotro@abc-bank-xacminh.top&gt;", 15, "start")
b += T(210, 150, "Tiêu đề: TÀI KHOẢN SẼ BỊ KHOÁ TRONG 24 GIỜ!!!", 16, "start", 800, "#b91c1c")
b += T(210, 195, "Kính gửi quý khách,", 15, "start") + T(210, 220, "Để tránh bị khoá, vui lòng nhập mật khẩu và mã OTP", 15, "start") + T(210, 243, "tại đường dẫn dưới đây:", 15, "start")
b += T(210, 280, "http://abc-bank.xac-minh-ngay.top/login", 15, "start", 600, "#2563eb", 'text-decoration="underline"')
b += R(210, 320, 190, 36, "#f3f4f6", "#9ca3af", 6) + T(225, 344, "📎 hoadon.exe", 15, "start")
D["tin9-phap-li-dich-vu-internet"] = dict(title="Gắn nhãn: dấu hiệu của thư điện tử lừa đảo", svg=svg(W, H, b, "Thư điện tử lừa đảo trên màn hình máy tính xách tay"),
  note="Thư điện tử dưới đây là thư lừa đảo nhằm đánh cắp thông tin. Kéo mỗi nhãn vào ô chỉ đúng dấu hiệu.",
  slots=slots(W, H, [(100, 60, "Địa chỉ gửi giả mạo", 180, 200, 114), (900, 150, "Đe doạ, ép làm gấp", 180, 790, 146), (900, 230, "Đòi mật khẩu, mã OTP", 180, 660, 216),
                     (900, 290, "Đường link lạ", 180, 600, 276), (110, 340, "Tệp đính kèm có thể chứa mã độc", 190, 212, 338)]),
  extra=["Chữ kí của giáo viên chủ nhiệm"], done="Không bấm link, không mở tệp lạ, không cung cấp mật khẩu, mã OTP; báo cho người lớn hoặc ngân hàng.")

# 10. Thông tin trong giải quyết vấn đề: 4 tiêu chí
W, H = 1000, 600
b = R(250, 30, 500, 520, "#fff", rx=12) + R(250, 30, 500, 60, "#1d4ed8", rx=12) + R(250, 70, 500, 20, "#1d4ed8", sw=0, rx=0)
b += T(500, 70, "TUYỂN SINH LỚP 10 – THPT NHƠN MỸ", 20, w=800, fill="#fff")
b += T(280, 125, "🕒 Cập nhật: 10/6/2026 (năm học 2026 – 2027)", 15, "start", fill="#475569")
b += T(280, 165, "Nguồn: Sở Giáo dục và Đào tạo thành phố", 15, "start", 700, "#0f766e") + T(280, 187, "Cần Thơ (cantho.edu.vn)", 15, "start", 700, "#0f766e")
for i, t in enumerate(["✔ Chỉ tiêu: 450 học sinh", "✔ Điểm chuẩn 3 năm gần nhất", "✔ Học phí, học bổng", "✔ Địa chỉ, tuyến xe buýt", "✔ Câu lạc bộ, ngoại khoá"]):
    b += T(280, 240 + i * 32, t, 16, "start")
b += R(270, 420, 460, 100, "#ecfdf5", "#10b981", 8) + T(500, 455, "Đúng trường em định đăng kí,", 16, w=600, fill="#065f46") + T(500, 480, "đúng năm tuyển sinh em cần", 16, w=600, fill="#065f46")
D["tin9-thong-tin-giai-quyet-van-de"] = dict(title="Gắn nhãn: các tiêu chí chất lượng thông tin", svg=svg(W, H, b, "Trang thông tin tuyển sinh lớp 10 thể hiện bốn tiêu chí chất lượng thông tin"),
  note="Mỗi phần của trang thông tin tuyển sinh thể hiện một tiêu chí chất lượng thông tin. Kéo tên tiêu chí vào đúng ô.",
  slots=slots(W, H, [(125, 120, "Tính mới", 170, 266, 120), (875, 175, "Tính chính xác", 170, 720, 175), (125, 300, "Tính đầy đủ", 170, 266, 300), (875, 470, "Tính sử dụng được", 170, 730, 470)]),
  extra=["Tính giải trí"], done="Thông tin có chất lượng: mới, chính xác, đầy đủ và sử dụng được.")

# 11. Đánh giá chất lượng thông tin: các loại nguồn
W, H = 1000, 640
b = R(30, 20, 940, 600, "#fff", rx=12) + R(60, 40, 520, 40, "#fff", "#94a3b8", 20) + T(80, 67, "điểm chuẩn lớp 10 Cần Thơ 2026", 16, "start")
rows = [("cantho.edu.vn › tin-tuc", "Công bố điểm chuẩn lớp 10 năm học 2026 – 2027"), ("thptnhonmy.edu.vn", "Thông báo tuyển sinh – Trường THPT Nhơn Mỹ"),
        ("baogiaoducvn.vn › tuyen-sinh", "Cần Thơ công bố điểm chuẩn vào lớp 10"), ("facebook.com › hoi-phu-huynh", "Nghe nói năm nay điểm chuẩn tăng 3 điểm???"), ("Trợ lí AI", "“Điểm chuẩn năm 2026 khoảng 35 điểm…”")]
for i, (u, t) in enumerate(rows):
    y = 120 + i * 98
    b += T(70, y, u, 14, "start", fill="#475569") + T(70, y + 28, t, 18, "start", 600, "#1d4ed8" if i < 4 else "#7c3aed")
D["tin9-danh-gia-chat-luong-thong-tin"] = dict(title="Gắn nhãn: nguồn của từng kết quả tìm kiếm", svg=svg(W, H, b, "Năm kết quả tìm kiếm về điểm chuẩn lớp 10 từ các nguồn khác nhau"),
  slots=slots(W, H, [(830, 128, "Cơ quan quản lí giáo dục", 230, 560, 140), (830, 226, "Trang web của nhà trường", 230, 520, 238), (830, 324, "Báo chính thống", 230, 480, 336),
                     (830, 422, "Mạng xã hội – cần kiểm chứng", 230, 560, 434), (830, 520, "Công cụ AI – cần đối chiếu", 230, 470, 532)]),
  extra=["Trang quảng cáo"], done="Ưu tiên nguồn có thẩm quyền; thông tin từ mạng xã hội, AI cần đối chiếu trước khi dùng.")

# 12. Công cụ trực quan: cấu trúc sơ đồ tư duy có đính kèm
W, H = 1000, 600
b = ""
for (x, y) in [(250, 140), (250, 460), (750, 140), (750, 460)]: b += P(f"M500 300 Q{(500+x)/2} {y} {x} {y}", "none", "#0f766e", 5)
b += P("M250 140 Q170 90 110 90", "none", "#0f766e", 3) + P("M250 140 Q170 190 110 200", "none", "#0f766e", 3)
b += R(380, 265, 240, 70, "#0f766e", "#0f766e", 35) + T(500, 308, "Lược sử công cụ tính toán", 17, w=700, fill="#fff")
for (x, y, t) in [(250, 140, "Máy tính cơ học"), (250, 460, "Máy tính điện tử"), (750, 140, "Chi phí triển lãm"), (750, 460, "Tư liệu")]:
    b += R(x - 95, y - 24, 190, 48, "#ccfbf1", "#0f766e", 24) + T(x, y + 6, t, 16, w=600)
b += T(104, 95, "Bàn tính", 15, "end") + T(104, 205, "Pascaline", 15, "end")
b += R(840, 120, 34, 40, "#217346", "#14532d", 4) + T(857, 147, "X", 18, w=800, fill="#fff") + T(857, 177, "📎", 16)
b += T(855, 460, "🔗", 26) + R(150, 540, 200, 40, "#fef9c3", "#ca8a04", 4) + T(250, 566, "📝 Nhớ ghi nguồn ảnh", 14) + Lz(250, 484, 250, 540, "#ca8a04", 2, 'stroke-dasharray="5 4"')
D["tin9-cong-cu-truc-quan"] = dict(title="Gắn nhãn: các thành phần của sơ đồ tư duy", svg=svg(W, H, b, "Sơ đồ tư duy Lược sử công cụ tính toán có tệp đính kèm, liên kết và ghi chú"),
  slots=slots(W, H, [(500, 400, "Chủ đề trung tâm", 210, 500, 335), (500, 160, "Nhánh chính", 170, 345, 140), (110, 300, "Nhánh phụ (ý chi tiết)", 200, 110, 205),
                     (900, 260, "Tệp đính kèm (bảng tính)", 190, 857, 165), (900, 540, "Siêu liên kết", 170, 870, 470), (450, 560, "Ghi chú", 150, 350, 560)]),
  extra=["Thanh công cụ"], done="Sơ đồ tư duy có thể đính kèm tệp, liên kết, ghi chú để trình bày ý tưởng đầy đủ, trực quan.")

# 13. Trao đổi, hợp tác: các loại tệp đính kèm
W, H = 1000, 600
b = ""
nodes = [(200, 120, "Nội quy triển lãm"), (200, 300, "Ảnh sản phẩm"), (200, 480, "Video giới thiệu"), (800, 160, "Bảng kinh phí"), (800, 440, "Trang web tham khảo")]
for (x, y, t) in nodes: b += P(f"M500 300 Q{(500+x)/2} {y} {x} {y}", "none", "#1d4ed8", 4)
b += R(390, 265, 220, 70, "#1d4ed8", "#1d4ed8", 35) + T(500, 308, "Triển lãm tin học", 19, w=700, fill="#fff")
icons = ['<rect x="{x}" y="{y}" width="30" height="38" rx="3" fill="#2b579a"/><text x="{cx}" y="{ty}" font-size="18" font-weight="800" text-anchor="middle" fill="#fff">W</text>',
         '<rect x="{x}" y="{y}" width="38" height="30" rx="3" fill="#fde68a" stroke="#92400e" stroke-width="2"/><circle cx="{c1}" cy="{c2}" r="5" fill="#f59e0b"/><path d="M{px} {py} l10 -12 l8 7 l8 -9 l10 14 Z" fill="#16a34a"/>',
         '<rect x="{x}" y="{y}" width="38" height="30" rx="5" fill="#dc2626"/><path d="M{px2} {py2} l12 7 l-12 7 Z" fill="#fff"/>',
         '<rect x="{x}" y="{y}" width="30" height="38" rx="3" fill="#217346"/><text x="{cx}" y="{ty}" font-size="18" font-weight="800" text-anchor="middle" fill="#fff">X</text>',
         '<text x="{cx}" y="{ty2}" font-size="30" text-anchor="middle">🔗</text>']
for i, (x, y, t) in enumerate(nodes):
    b += R(x - 105, y - 24, 210, 48, "#dbeafe", "#1d4ed8", 24) + T(x, y + 6, t, 15, w=600)
    ix = x - 145 if x < 500 else x + 115
    b += icons[i].format(x=ix, y=y - 19, cx=ix + 15, ty=y + 7, c1=ix + 10, c2=y - 11, px=ix + 3, py=y + 10, px2=ix + 14, py2=y - 11, ty2=y + 10)
D["tin9-trao-doi-hop-tac"] = dict(title="Gắn nhãn: các loại tệp đính kèm vào sơ đồ tư duy", svg=svg(W, H, b, "Sơ đồ tư duy Triển lãm tin học, mỗi nhánh đính kèm một loại tệp"),
  note="Mỗi nhánh của sơ đồ tư duy có đính kèm một tệp (biểu tượng cạnh nhánh). Kéo tên loại tệp vào ô gần biểu tượng tương ứng.",
  slots=slots(W, H, [(80, 45, "Tệp văn bản", 150, 70, 97), (80, 370, "Tệp ảnh", 150, 74, 316), (80, 550, "Tệp video", 150, 74, 497), (920, 75, "Trang tính", 150, 930, 137), (920, 530, "Liên kết trang web", 150, 930, 460)]),
  extra=["Tệp nén"], done="Sơ đồ tư duy có thể đính kèm văn bản, ảnh, video, trang tính và liên kết để cả nhóm cùng trao đổi.")

# ---------- chèn vào bài ----------
for name, cfg in D.items():
    p = os.path.join(ROOT, name, "index.html")
    s = open(p, encoding="utf-8").read()
    if "data-gn1" in s:
        s = re.sub(r'\n      <div class="act act-gn">.*?</div>\n      </div>\n', "\n", s, count=1, flags=re.S)
        s = re.sub(r'<script src="\.\./chung/gannhan\.js[^"]*"></script>\n<script>\n\(function\(\)\{ var B = document\.querySelector\("\[data-gn1\]"\).*?</script>\n', "", s, count=1, flags=re.S)
    m = re.search(r'(<section class="part" id="luyen-tap">\s*<div class="part-head">.*?</h2></div>)', s, re.S)
    assert m, name
    act = '\n      <div class="act act-gn">\n        <div class="act-tag"><b>Gắn nhãn</b> Ôn lại kiến thức bằng hình</div>\n        <div data-gn1></div>\n      </div>\n'
    s = s[:m.end()] + act + s[m.end():]
    js = '<script src="../chung/gannhan.js?v=1"></script>\n<script>\n(function(){ var B = document.querySelector("[data-gn1]"); if (!B) return;\n  GanNhan(B, ' + json.dumps(cfg, ensure_ascii=False) + ');\n})();\n</script>\n'
    mk = '<script src="../chung/config.js'
    assert mk in s
    s = s.replace(mk, js + mk, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("ok", name, len(cfg["slots"]))
