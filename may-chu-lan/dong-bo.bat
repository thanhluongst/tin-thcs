@echo off
chcp 65001 >nul
title Dong bo bai giang sang USB / may truong
rem Chep bai giang (tin-thcs, TomTatNDSGK, video) sang o dich. Chi chep tep MOI hoac DA THAY DOI.
rem KHONG chep may-chu-lan\du-lieu (danh sach lop co so can cuoc, bai lam) va .git.
cd /d "%~dp0..\.."
set "NGUON=%CD%"
echo Thu muc nguon: %NGUON%
echo.
set "DICH=%~1"
if "%DICH%"=="" set /p "DICH=Nhap thu muc dich (vi du E:\NghienCuuBaiHoc): "
if "%DICH%"=="" (echo Chua nhap thu muc dich. & pause & exit /b)
if /i "%DICH%"=="%NGUON%" (echo Thu muc dich trung thu muc nguon. & pause & exit /b)

echo.
echo Dang chep tin-thcs ...
robocopy "%NGUON%\tin-thcs" "%DICH%\tin-thcs" /E /XO /R:1 /W:1 /NFL /NDL /NP /XD .git node_modules du-lieu .claude /XF *.tmp
echo Dang chep TomTatNDSGK ...
robocopy "%NGUON%\TomTatNDSGK" "%DICH%\TomTatNDSGK" /E /XO /R:1 /W:1 /NFL /NDL /NP

rem Lan dau: tao san du-lieu voi cau hinh + danh sach mau (khong de len du lieu that o may dich)
if not exist "%DICH%\tin-thcs\may-chu-lan\du-lieu" (
  mkdir "%DICH%\tin-thcs\may-chu-lan\du-lieu"
  copy /y "%NGUON%\tin-thcs\may-chu-lan\danh-sach-mau.csv" "%DICH%\tin-thcs\may-chu-lan\du-lieu\danh-sach.csv" >nul
  echo {"port": 8080, "pin": "tin7"}> "%DICH%\tin-thcs\may-chu-lan\du-lieu\cau-hinh.json"
  echo Da tao du-lieu mau o may dich: nho sua danh-sach.csv va ma giao vien.
)
echo.
echo XONG. O may truong: cai Node.js (1 lan), roi bam dup
echo   %DICH%\tin-thcs\may-chu-lan\chay-may-chu.bat
pause
