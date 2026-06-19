@echo off
cd /d "%~dp0"

echo 准备打包 Windows 免安装版...
echo 如果提示缺少 PyInstaller，请先执行：py -m pip install pyinstaller

py -m PyInstaller ^
  --noconfirm ^
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

echo 打包完成后，请查看 dist\企业采购仓库销售管理系统.exe
pause
