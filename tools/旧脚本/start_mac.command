#!/bin/bash
cd "$(dirname "$0")"

echo "正在启动 企业采购仓库销售管理系统..."
echo "如果第一次运行失败，请先安装 Python 3。"

python3 -m pip install -r requirements.txt
python3 app.py 8876
