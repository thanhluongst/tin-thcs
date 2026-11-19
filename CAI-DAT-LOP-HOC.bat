@echo off
rem Tai ve va bam dup: cai dat (hoac cap nhat) may chu lop hoc Tin hoc vao C:\LopHocTin.
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/thanhluongst/tin-thcs/main/cai-dat-nhanh.ps1 | iex"
pause
