@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
set count=1

echo 依自然順序重新命名所有 JPG 檔...

REM 使用 PowerShell 排序檔案名稱
for /f "delims=" %%f in ('powershell -Command "Get-ChildItem -File *.jpg | Sort-Object Name | ForEach-Object { $_.Name }"') do (
    ren "%%f" "!count!.jpg"
    echo 重新命名: %%f → !count!.jpg
    set /a count+=1
)

echo 完成！
pause
