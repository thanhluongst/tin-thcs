# CÀI ĐẶT TỰ ĐỘNG MÁY CHỦ LỚP HỌC (chạy 1 lần, chay-may-chu.bat tự gọi khi chưa cài).
# Việc làm: cài Node.js nếu thiếu -> tạo mã giáo viên riêng -> tạo lối tắt ngoài màn hình -> tạo KHBD (nếu có Python).
# Chạy lại để cài lại:  powershell -ExecutionPolicy Bypass -File cai-dat.ps1 -Lai
param([switch]$Lai)
$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Data = Join-Path $Here "du-lieu"
$Mark = Join-Path $Data ".da-cai-dat"
if ((Test-Path $Mark) -and -not $Lai) { exit 0 }
New-Item -ItemType Directory -Force $Data | Out-Null
function Buoc($t) { Write-Host ""; Write-Host "==> $t" -ForegroundColor Cyan }

# 1. Node.js
Buoc "Kiểm tra Node.js"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host "Đang cài Node.js LTS (cần Internet, khoảng 1–3 phút)..."
    winget install --id OpenJS.NodeJS.LTS -e --silent --accept-package-agreements --accept-source-agreements
    $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
  }
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Không tự cài được Node.js. Hãy tải bản LTS tại https://nodejs.org, cài xong mở lại." -ForegroundColor Yellow
    Start-Process "https://nodejs.org/vi/download"; exit 1
  }
}
Write-Host ("Node.js " + (node -v) + " - OK") -ForegroundColor Green

# 2. Mã giáo viên riêng cho máy này
Buoc "Tạo cấu hình"
$Cfg = Join-Path $Data "cau-hinh.json"
if (-not (Test-Path $Cfg)) {
  $pin = -join ((1..6) | ForEach-Object { Get-Random -Minimum 0 -Maximum 10 })
  $port = 8080
  if (Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue) { $port = 8090 }
  [IO.File]::WriteAllText($Cfg, "{ `"port`": $port, `"pin`": `"$pin`" }", (New-Object Text.UTF8Encoding $false))
  $Desk = [Environment]::GetFolderPath("Desktop")
  $txt = "MÃ GIÁO VIÊN máy chủ lớp học: $pin`r`nĐổi mã: sửa `"pin`" trong $Cfg rồi mở lại máy chủ.`r`nKhông đưa mã này cho học sinh."
  [IO.File]::WriteAllText((Join-Path $Desk "Ma giao vien - lop hoc.txt"), $txt, (New-Object Text.UTF8Encoding $true))
  Write-Host "Mã giáo viên của máy này: $pin  (đã lưu ra màn hình: 'Ma giao vien - lop hoc.txt')" -ForegroundColor Green
} else { Write-Host "Đã có cấu hình - giữ nguyên mã giáo viên cũ." }
$Csv = Join-Path $Data "danh-sach.csv"
if (-not (Test-Path $Csv)) { Copy-Item (Join-Path $Here "danh-sach-mau.csv") $Csv; Write-Host "Đã tạo danh sách lớp mẫu: du-lieu\danh-sach.csv (thay bằng danh sách thật ở trang /gv)." }

# 3. Lối tắt ngoài màn hình
Buoc "Tạo lối tắt 'Lop hoc Tin hoc' ngoài màn hình"
try {
  $s = (New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path ([Environment]::GetFolderPath("Desktop")) "Lop hoc Tin hoc.lnk"))
  $s.TargetPath = Join-Path $Here "chay-may-chu.bat"; $s.WorkingDirectory = $Here
  $s.IconLocation = "$env:SystemRoot\System32\imageres.dll,1"; $s.Save(); Write-Host "OK" -ForegroundColor Green
} catch { Write-Host "Không tạo được lối tắt (bỏ qua)." }

# 4. Kế hoạch bài dạy 12 tiết AI (không bắt buộc)
Buoc "Tạo kế hoạch bài dạy AI (nếu máy có Python)"
$py = Get-Command python -ErrorAction SilentlyContinue
if ($py -and $py.Source -notmatch "WindowsApps") {
  python -m pip install --user --quiet python-docx 2>$null
  python (Join-Path $Here "khbd\tao-khbd.py") | Out-Null
  $n = (Get-ChildItem (Join-Path $Here "khbd\docx") -Filter *.docx -ErrorAction SilentlyContinue).Count
  Write-Host "Đã tạo $n kế hoạch bài dạy." -ForegroundColor Green
} else { Write-Host "Chưa có Python - bỏ qua (máy chủ vẫn chạy bình thường, chỉ thiếu nút tải KHBD 12 tiết AI)." }

Set-Content $Mark (Get-Date -Format s)
Buoc "CÀI ĐẶT XONG. Lần sau chỉ cần bấm đúp lối tắt 'Lop hoc Tin hoc' ngoài màn hình."
