@echo off
setlocal EnableDelayedExpansion

set csvfile=%~dp0\conf\env.csv
set macrofile=%~dp0\login.ttl

rem フィールド数の設定
REM set tokens=1,2,3,4
set tokens=1,2,3,4,5
 
rem CSVファイル内の行頭に#がある場合はコメントとみなされて無視される
for /F "usebackq eol=# tokens=%tokens% delims=," %%a in (%csvfile%) do (
if %1==%%a (
    "C:\Program Files (x86)\teraterm\ttpmacro.exe" %macrofile%  %%a %%b %%c %%d %%e
)
)

