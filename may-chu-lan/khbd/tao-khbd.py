# -*- coding: utf-8 -*-
"""Dựng kế hoạch bài dạy (CV 5512) Giáo dục AI 12 tiết cho 31 bài, mỗi bài một tệp .docx.
Nội dung tiến trình lấy từ bài dạy trên LAN (ai-12-tiet/lan); YCCĐ và mục tiêu lấy từ KHBD mẫu tập huấn.
Chạy:  python tao-khbd.py   (kết quả ở may-chu-lan/khbd/docx/, không đưa lên GitHub)"""
import json, os, re, subprocess, glob, html
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "docx")
MAU = os.path.join(HERE, "..", "..", "..", "TaiLieuTapHuan-NLS_ATMTD_AI", "TaiLieu-AI", "THCS")
AILOP = open(os.path.join(HERE, "..", "..", "ai-12-tiet", "assets", "ai-lop.js"), encoding="utf8").read()
ds = json.loads(subprocess.run(["node", os.path.join(HERE, "xuat-json.js")], capture_output=True, encoding="utf8", check=True).stdout)

def txt(s):
    s = re.sub(r"<br\s*/?>", "; ", str(s or "")); s = re.sub(r"<[^>]+>", "", s)
    return html.unescape(s).strip()

def lich(lop, so):
    if lop == 6:  # lớp 6 lấy từ data.js
        d = open(os.path.join(HERE, "..", "..", "ai-12-tiet", "assets", "data.js"), encoding="utf8").read()
        m = re.search(r"so:%d,[^\n]*?tiet:'([^']*)',tuan:'([^']*)'" % so, d)
    else:
        blk = re.search(r"\n%d:\[(.*)\]" % lop, AILOP).group(1)
        m = re.search(r"\[%d,'[^']*','([^']*)','([^']*)'\]" % so, blk)
    return (m.group(1), m.group(2)) if m else ("", "")

def mau(lop, so):
    f = glob.glob(os.path.join(MAU, "Lớp %d" % lop, "Lop%d.Bai%02d*.docx" % (lop, so)))
    if not f: return [], {}
    D = Document(f[0]); ps = [p.text.strip() for p in D.paragraphs if p.text.strip()]
    i = next((k for k, x in enumerate(ps) if x.startswith("Yêu cầu cần đạt")), 0)
    j = next((k for k, x in enumerate(ps) if x.startswith("II.")), i)
    phut = {}
    for x in ps:
        m = re.match(r"Hoạt động ([\d.]+)\.[^(]*\([^)]*?(\d+) phút", x)
        if m: phut.setdefault(m.group(1), int(m.group(2)))
    for t in D.tables:
        if t.rows and t.rows[0].cells[-1].text.strip().startswith("Thời"):
            for r in t.rows[1:]:
                a = re.match(r"\s*(\d+(?:\.\d+)?)", r.cells[0].text); b = re.search(r"(\d+)\s*phút", r.cells[-1].text)
                if a and b: phut.setdefault(a.group(1).rstrip("."), int(b.group(1)))
    return ps[i:j], phut

def dap_an(q):
    o = q.get("opts") or []
    t = q["type"]
    if t == "single" and q.get("ok") is not None: return o[q["ok"]]
    if t == "multi": return "; ".join(o[k] for k in q["ok"])
    if t == "tf": return "; ".join("%s (%s)" % (x["t"], "Đ" if x["a"] == "T" else "S") for x in q["items"])
    if t == "match": return "; ".join("%s → %s" % (x, o[q["ok"][k]]) for k, x in enumerate(q["items"]))
    if t == "sort": return "; ".join("%s → %s" % (x["t"], q["cols"][x["a"]]) for x in q["items"])
    return q.get("ans") or "HS trả lời theo hiểu biết; GV nhận xét."

def build(B):
    bai = B["BAI"]; lop, so = bai["lop"], bai["so"]
    tiet, tuan = lich(lop, so)
    mt, phut = mau(lop, so)
    acts = [s for s in B["STEPS"] if s.get("k") != "wel" and (s.get("story") or s.get("qs") or s.get("key"))]
    so_tiet0 = None
    so_tiet = max([int(m) for s in acts for m in re.findall(r"Tiết (\d)", s.get("hd", ""))] or [1])

    if not phut:  # không có số phút trong bài mẫu: chia đều 45 phút mỗi tiết
        from collections import Counter
        tt = [(re.search(r"Tiết (\d)", s.get("hd", "")) or [0, "1"])[1] for s in acts]; c = Counter(tt)
        for s, t in zip(acts, tt):
            n = (re.match(r"Hoạt động ([\d.]+)", s.get("hd", "")) or [None, ""])[1]
            if n: phut[n] = 45 // c[t]
    d = Document()
    st = d.styles["Normal"]; st.font.name = "Times New Roman"; st.font.size = Pt(13)
    st.element.rPr.rFonts.set("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}eastAsia", "Times New Roman")
    for s in d.sections: s.top_margin = s.bottom_margin = Cm(2); s.left_margin = Cm(3); s.right_margin = Cm(1.5)
    def p(t="", b=False, i=False, al=None, sz=None, col=None):
        x = d.add_paragraph(); r = x.add_run(t); r.bold = b; r.italic = i
        if sz: r.font.size = Pt(sz)
        if col: r.font.color.rgb = RGBColor.from_string(col)
        if al: x.alignment = al
        x.paragraph_format.space_after = Pt(3); return x
    def kv(k, v):
        x = d.add_paragraph(); x.add_run(k).bold = True; x.add_run(v); x.paragraph_format.space_after = Pt(3)
    def bang(head, rows, w=None):
        t = d.add_table(rows=1, cols=len(head)); t.style = "Table Grid"
        for k, h in enumerate(head): c = t.rows[0].cells[k]; c.text = ""; c.paragraphs[0].add_run(h).bold = True
        for r in rows:
            cs = t.add_row().cells
            for k, v in enumerate(r): cs[k].text = str(v)
        if w:
            for r in t.rows:
                for k, c in enumerate(r.cells): c.width = Cm(w[k])
        d.add_paragraph()

    p("Trường: ……………………………  Tổ: Tin học – Công nghệ", sz=12)
    p("Họ và tên giáo viên: ……………………………", sz=12)
    p("KẾ HOẠCH BÀI DẠY", b=True, al=WD_ALIGN_PARAGRAPH.CENTER, sz=15)
    p("Bài %d. %s" % (so, bai["ten"]), b=True, al=WD_ALIGN_PARAGRAPH.CENTER, sz=14, col="1F3A8A")
    kv("Hoạt động giáo dục: ", "Giáo dục AI (chuyên đề 12 tiết, QĐ 2422/QĐ-BGDĐT, CV 5588); lớp %d" % lop)
    kv("Thời gian thực hiện: ", "%02d tiết (tiết AI %s, tuần %s – năm học 2026–2027)" % (so_tiet, tiet, tuan))
    kv("Hình thức: ", "Học sinh học trên máy chủ lớp học LAN (hoặc trang “Học theo 4 bước” trình chiếu): "
       "đọc tình huống & câu hỏi → làm thí nghiệm mô phỏng → trả lời, nhận định → giáo viên chốt kiến thức.")

    if mt:
        for x in mt:
            hd = re.match(r"^(Yêu cầu cần đạt|I\.|[123]\. |[ab]\. )", x)
            p(x, b=bool(hd))
    else:
        p("Yêu cầu cần đạt của bài học (theo Khung nội dung Giáo dục AI): " + bai.get("yccd", ""), b=True)
        p("I. MỤC TIÊU", b=True); p("1. Về kiến thức", b=True)
        for s in acts:
            for k in s.get("key") or []: p("- " + txt(k))
        p("2. Về năng lực", b=True)
        p("a. Năng lực đặc thù về AI: đạt các YCCĐ " + bai.get("yccd", "") + " qua mô phỏng, câu hỏi và sản phẩm của từng hoạt động.")
        p("b. Năng lực chung: giao tiếp và hợp tác (thảo luận cặp, nhóm); giải quyết vấn đề và sáng tạo (rút ra quy luật từ thí nghiệm).")
        p("3. Về phẩm chất", b=True)
        p("- Trách nhiệm, trung thực khi sử dụng AI; tôn trọng quyền riêng tư và lợi ích của người khác.")

    p("II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU", b=True)
    sims = []
    for s in acts:
        for q in s.get("qs") or []:
            if q["type"] == "sim" and q["title"] not in sims: sims.append(q["title"])
    p("1. Giáo viên: máy tính chạy máy chủ lớp học LAN (tin-thcs/may-chu-lan, mở trang /gv), máy chiếu; link bài: /lop/%s/<lớp+buổi>/." % B["dir"])
    p("2. Học sinh: phòng máy (1–2 HS/máy) vào link hoặc quét mã QR, đăng nhập bằng số căn cước; vở ghi bài.")
    p("3. Mô phỏng sử dụng (chạy trong trình duyệt, không cần Internet, không cần tài khoản AI):")
    for x in sims: p("   • " + x)
    p("Phương án thay thế: thiếu máy → GV chiếu trang “Học theo 4 bước” (ai-12-tiet/hoc.html?l=%d&b=%d), HS làm theo nhóm, trả lời vào vở/phiếu." % (lop, so), i=True)

    p("III. TIẾN TRÌNH DẠY HỌC", b=True)
    p("1. Bảng khái quát tiến trình", b=True)
    rows = []
    for s in acts:
        num = (re.match(r"Hoạt động ([\d.]+)", s.get("hd", "")) or [None, ""])[1]
        sm = ", ".join(q["title"].split(": ", 1)[-1] for q in s.get("qs") or [] if q["type"] == "sim") or "—"
        rows.append([txt(s.get("hd", "")).split("·")[0].strip() + ". " + txt(s["t"]), s.get("code", ""), sm, ("%d phút" % phut[num]) if num in phut else ""])
    bang(["Hoạt động", "YCCĐ", "Mô phỏng", "Thời lượng"], rows, [6.5, 2.2, 5.5, 2.3])

    p("2. Thiết kế chi tiết các hoạt động", b=True)
    cur = None
    for s in acts:
        tm = re.search(r"Tiết (\d)", s.get("hd", ""))
        if tm and tm.group(1) != cur:
            cur = tm.group(1); p("TIẾT %s" % cur, b=True, al=WD_ALIGN_PARAGRAPH.CENTER, col="7C3AED")
        num = (re.match(r"Hoạt động ([\d.]+)", s.get("hd", "")) or [None, ""])[1]
        ten = txt(s.get("hd", "")).split("·")
        p("%s. %s: %s%s" % (ten[0].strip(), ten[1].strip() if len(ten) > 1 else "", txt(s["t"]), (" (%d phút)" % phut[num]) if num in phut else ""), b=True, col="1F3A8A")
        qs = s.get("qs") or []; hoi = [q for q in qs if q["type"] != "sim"]; sm = [q for q in qs if q["type"] == "sim"]
        p("a) Mục tiêu", b=True)
        p("- HS đạt yêu cầu %s thông qua tình huống và mô phỏng của hoạt động." % (s.get("code") or bai.get("yccd", "")))
        for k in s.get("key") or []: p("- Rút ra được: " + txt(k))
        p("b) Nội dung", b=True)
        if s.get("story"): p("- Tình huống: " + txt(s["story"]))
        for q in sm: p("- " + q["title"])
        for k, q in enumerate(hoi): p("- Câu %d: %s" % (k + 1, txt(q.get("q", ""))))
        p("c) Sản phẩm", b=True)
        p("- Câu trả lời của HS nộp trên máy chủ LAN (GV xem bảng bài làm, tỉ lệ đúng theo YCCĐ). Đáp án / gợi ý:")
        for k, q in enumerate(hoi): p("   Câu %d: %s" % (k + 1, txt(dap_an(q))))
        p("d) Tổ chức thực hiện", b=True)
        kv("B1. Chuyển giao nhiệm vụ (Bước 1 – Đọc & suy nghĩ): ", "GV mở hoạt động trên bảng điều khiển, chiếu tình huống; HS đọc tình huống và các câu hỏi cần trả lời, xác định cần quan sát gì.")
        kv("B2. Thực hiện nhiệm vụ (Bước 2 – Thí nghiệm): ",
           ("HS làm mô phỏng theo cặp: thay đổi lựa chọn, bấm chạy, so sánh các lần chạy trong bảng kết quả. GV đi quan sát, gợi ý nhóm gặp khó." if sm
            else "HS thảo luận nhóm đôi theo tình huống, ghi ý kiến vào vở."))
        kv("B3. Báo cáo, thảo luận (Bước 3 – Trả lời, nhận định): ", "HS trả lời và bấm Nộp; GV mở “Bài làm”, chiếu tỉ lệ chọn từng phương án, mời 2–3 HS giải thích lựa chọn, các bạn khác nhận xét, bổ sung.")
        kv("B4. Kết luận, nhận định (Bước 4 – GV chốt): ", "GV bấm “Chốt đáp án & chiếu kết quả”, nhận xét, khen thưởng và chốt kiến thức:")
        for k in s.get("key") or []: p("   ► " + txt(k), b=True)

    g = B.get("GHIBAI") or {}
    if g.get("muc"):
        p("IV. NỘI DUNG GHI BÀI", b=True)
        p("%s %s" % (g.get("so", ""), g.get("ten", "")), b=True)
        for m in g["muc"]:
            p("• " + txt(m.get("h", "")), b=True)
            for x in m.get("it") or []: p("   – " + txt(x))
            if m.get("flow"): p("   " + " → ".join(txt(x) for x in m["flow"]))

    p("V. ĐÁNH GIÁ (CV 5588 – đánh giá vì sự tiến bộ, không chấm điểm)", b=True)
    codes = {}
    for s in acts:
        if s.get("code"): codes.setdefault(s["code"], []).append(txt(s["t"]))
    bang(["YCCĐ", "Hoạt động", "Minh chứng", "Mức"], [[c, "; ".join(v), "Câu trả lời đã nộp trên LAN, sản phẩm nhóm", "Đã đáp ứng / Cần hỗ trợ thêm"] for c, v in codes.items()], [2.3, 6, 5, 3.2])
    p("VI. ĐIỀU CHỈNH SAU TIẾT DẠY", b=True)
    for _ in range(3): p("……………………………………………………………………………………………")
    os.makedirs(OUT, exist_ok=True)
    f = os.path.join(OUT, "KHBD_AI%d_Bai%d.docx" % (lop, so)); d.save(f); return f

for B in ds: print(os.path.basename(build(B)))
