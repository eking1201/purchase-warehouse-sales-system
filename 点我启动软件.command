#!/bin/bash
cd "$(dirname "$0")"

PORT=8876
URL="http://127.0.0.1:${PORT}"

echo "正在启动：企业采购仓库销售管理系统"
echo "浏览器地址：${URL}"
echo ""

python3 -m pip install -r requirements.txt

python3 app.py "${PORT}" &
SERVER_PID=$!

sleep 2
open "${URL}"

echo ""
echo "软件已启动。"
echo "请不要关闭这个窗口；关闭窗口后软件也会停止。"
echo "如果要停止软件，请在这个窗口按 Ctrl + C。"

wait "${SERVER_PID}"
