@echo off
chcp 65001 >nul
title May chu lop hoc (LAN)
cd /d "%~dp0"
rem --- Lan dau: tu cai dat (Node.js, ma giao vien, loi tat, KHBD) ---
if not exist "du-lieu\.da-cai-dat" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0cai-dat.ps1" || (pause & exit /b)
)
where node >nul 2>nul || set "PATH=%PATH%;%ProgramFiles%\nodejs"
where node >nul 2>nul || (echo Can cai Node.js: https://nodejs.org & pause & exit /b)

rem --- Cong may chu (doc tu du-lieu\cau-hinh.json, mac dinh 8080) ---
set PORT=8080
for /f %%p in ('powershell -NoProfile -Command "try{(Get-Content 'du-lieu\cau-hinh.json' -Raw | ConvertFrom-Json).port}catch{8080}"') do set PORT=%%p

rem --- Neu may chu cu dang chay tren cong nay thi tat di ---
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; if ($p -and $p.ProcessName -ne 'node') { Write-Host ('Cong %PORT% dang bi ' + $p.ProcessName + ' dung - doi port trong du-lieu\cau-hinh.json'); exit 1 }; if ($p) { Write-Host ('Tat may chu cu (' + $p.ProcessName + ', PID ' + $p.Id + ')...'); Stop-Process -Id $p.Id -Force } }"

rem --- Mo cong tren tuong lua (chi lam 1 lan, can quyen quan tri) ---
netsh advfirewall firewall show rule name="May chu lop hoc %PORT%" >nul 2>nul || (
  echo Mo cong %PORT% tren tuong lua - bam Yes khi Windows hoi...
  powershell -Command "Start-Process netsh -Verb RunAs -ArgumentList 'advfirewall firewall add rule name=\"May chu lop hoc %PORT%\" dir=in action=allow protocol=TCP localport=%PORT% profile=private,domain'"
)

rem --- Mo trang chu giao vien sau 2 giay ---
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep 2; Start-Process 'http://localhost:%PORT%/gv'"

set PORT=
node server.js
pause
