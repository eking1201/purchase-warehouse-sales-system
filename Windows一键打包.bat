@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo 企业采购仓库销售管理系统 - Windows免安装打包
echo ==========================================
echo.
echo 说明：
echo 1. 这个脚本需要在 Windows 电脑上运行。
echo 2. 只需要打包人员这台电脑安装 Python。
echo 3. 最终用户电脑不需要安装 Python。
echo.

where py >nul 2>nul
if errorlevel 1 (
  echo 未检测到 Python 启动器 py。
  echo 请先在这台打包电脑安装 Python 3，再重新双击本脚本。
  pause
  exit /b 1
)

echo 正在安装/检查打包工具 PyInstaller...
py -m pip install --upgrade pyinstaller
if errorlevel 1 (
  echo PyInstaller 安装失败，请检查网络或 Python/pip 是否正常。
  pause
  exit /b 1
)

echo.
echo 正在清理旧打包结果...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist Windows免安装交付包 rmdir /s /q Windows免安装交付包

echo.
echo 正在生成 exe，这一步可能需要几分钟...
py -m PyInstaller ^
  --noconfirm ^
  --clean ^
  --onefile ^
  --name "企业采购仓库销售管理系统" ^
  --add-data "templates;templates" ^
  --add-data "static;static" ^
  --add-data "导入示例Excel;导入示例Excel" ^
  --add-data "管理系统.xlsx;." ^
  --add-data "管理系统_五行示例数据.xlsx;." ^
  --exclude-module IPython ^
  --exclude-module matplotlib ^
  --exclude-module numpy ^
  --exclude-module pandas ^
  --exclude-module PyQt5 ^
  --exclude-module pytest ^
  --exclude-module sphinx ^
  --exclude-module tkinter ^
  run_desktop.py

if errorlevel 1 (
  echo 打包失败，请把上面的错误截图发给我。
  pause
  exit /b 1
)

echo.
echo 正在整理交付文件夹...
mkdir Windows免安装交付包
copy "dist\企业采购仓库销售管理系统.exe" "Windows免安装交付包\企业采购仓库销售管理系统.exe" >nul
copy "Windows用户使用说明.md" "Windows免安装交付包\使用说明.md" >nul
copy "管理系统.xlsx" "Windows免安装交付包\管理系统.xlsx" >nul
copy "管理系统_五行示例数据.xlsx" "Windows免安装交付包\管理系统_五行示例数据.xlsx" >nul
xcopy "导入示例Excel" "Windows免安装交付包\导入示例Excel" /E /I /Y >nul

if exist data (
  xcopy "data" "Windows免安装交付包\企业采购仓库销售管理系统数据\data" /E /I /Y >nul
) else (
  mkdir "Windows免安装交付包\企业采购仓库销售管理系统数据\data"
)

if exist uploads (
  xcopy "uploads" "Windows免安装交付包\企业采购仓库销售管理系统数据\uploads" /E /I /Y >nul
) else (
  mkdir "Windows免安装交付包\企业采购仓库销售管理系统数据\uploads"
)

mkdir "Windows免安装交付包\企业采购仓库销售管理系统数据\backups" >nul 2>nul

echo.
echo 打包完成！
echo.
echo 请把这个文件夹压缩发给别人：
echo %cd%\Windows免安装交付包
echo.
echo 对方解压后，双击 企业采购仓库销售管理系统.exe 即可使用。
echo.
pause
