# CAI DAT / CAP NHAT MAY CHU LOP HOC TIN HOC - MOT BUOC
# Dan vao PowerShell:  irm https://raw.githubusercontent.com/thanhluongst/tin-thcs/main/cai-dat-nhanh.ps1 | iex
# Lan dau: tai toan bo he thong ve C:\LopHocTin, cai Node.js, tao ma giao vien, loi tat, roi mo lop hoc.
# Chay lai = CAP NHAT ban moi nhat; GIU NGUYEN du lieu (danh sach lop, bai lam, ma giao vien).
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$Repo = "https://github.com/thanhluongst/tin-thcs/archive/refs/heads/main.zip"
$Dir = Join-Path $env:SystemDrive "LopHocTin"
try { New-Item -ItemType Directory -Force $Dir | Out-Null } catch { $Dir = Join-Path $env:USERPROFILE "LopHocTin"; New-Item -ItemType Directory -Force $Dir | Out-Null }
$Moi = -not (Test-Path (Join-Path $Dir "may-chu-lan\server.js"))
Write-Host ""; Write-Host ("==> " + ($(if ($Moi) { "CAI DAT" } else { "CAP NHAT" })) + " he thong lop hoc vao $Dir") -ForegroundColor Cyan

# Tat may chu dang chay (neu co) de cap nhat tep
Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -match "server\.js" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

$Tmp = Join-Path $env:TEMP ("lophoc-" + [guid]::NewGuid().ToString("N").Substring(0, 8))
New-Item -ItemType Directory $Tmp | Out-Null
Write-Host "Dang tai ban moi nhat (khoang 20 MB)..."
Invoke-WebRequest $Repo -OutFile (Join-Path $Tmp "a.zip") -UseBasicParsing
Write-Host "Dang giai nen..."
Expand-Archive (Join-Path $Tmp "a.zip") -DestinationPath $Tmp -Force
$Src = Get-ChildItem $Tmp -Directory | Select-Object -First 1
# Sao chep, giu nguyen du lieu rieng cua may (du-lieu, KHBD da tao)
robocopy $Src.FullName $Dir /MIR /NFL /NDL /NJH /NJS /NP /XD du-lieu docx .git | Out-Null
Remove-Item $Tmp -Recurse -Force -ErrorAction SilentlyContinue

# Cai dat (Node.js, ma giao vien, loi tat, KHBD)
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $Dir "may-chu-lan\cai-dat.ps1") -Lai
if ($LASTEXITCODE -ne 0) { Write-Host "Cai dat chua xong - xem thong bao o tren." -ForegroundColor Yellow; return }

# Loi tat cap nhat ngoai man hinh
try {
  $s = (New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path ([Environment]::GetFolderPath("Desktop")) "Cap nhat lop hoc Tin.lnk"))
  $s.TargetPath = "powershell.exe"
  $s.Arguments = '-NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/thanhluongst/tin-thcs/main/cai-dat-nhanh.ps1 | iex; pause"'
  $s.IconLocation = "$env:SystemRoot\System32\imageres.dll,228"; $s.Save()
} catch {}

Write-Host ""; Write-Host "==> XONG. Dang mo lop hoc... (lan sau bam loi tat 'Lop hoc Tin hoc' ngoai man hinh)" -ForegroundColor Green
Start-Process (Join-Path $Dir "may-chu-lan\chay-may-chu.bat") -WorkingDirectory (Join-Path $Dir "may-chu-lan")
