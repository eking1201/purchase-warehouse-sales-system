#!/bin/bash
cd "$(dirname "$0")"

PORT=8876
LOCAL_URL="http://127.0.0.1:${PORT}"

echo "=========================================="
echo "企业采购仓库销售管理系统 - 远程试用模式"
echo "=========================================="
echo ""
echo "用途：生成一个临时网址，发给别人在线试用。"
echo "注意：请不要关闭这个窗口；关闭后远程网址会失效。"
echo ""

if [ -x "./tools/cloudflared" ]; then
  CLOUDFLARED="./tools/cloudflared"
elif command -v cloudflared >/dev/null 2>&1; then
  CLOUDFLARED="cloudflared"
else
  echo "未检测到 cloudflared。"
  echo ""
  echo "请先让我下载本地 cloudflared，或在终端安装：brew install cloudflared"
  echo ""
  read -n 1 -s -r -p "按任意键退出..."
  echo ""
  exit 1
fi

echo "正在检查 Python 依赖..."
python3 -m pip install -r requirements.txt

SERVER_PID=""
if lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  echo ""
  echo "检测到本地软件已经在运行：${LOCAL_URL}"
else
  echo ""
  echo "正在启动本地软件：${LOCAL_URL}"
  python3 app.py "${PORT}" &
  SERVER_PID=$!
fi

cleanup() {
  echo ""
  echo "正在停止远程试用..."
  if [ -n "${SERVER_PID}" ]; then
    kill "${SERVER_PID}" >/dev/null 2>&1
  fi
}
trap cleanup EXIT

sleep 2
open "${LOCAL_URL}" >/dev/null 2>&1

echo ""
echo "正在生成远程试用网址..."
echo "稍等几秒，看到 https:// 开头的网址后，复制发给对方。"
echo ""
echo "默认账号："
echo "管理员：admin / admin123"
echo "普通用户：user / user123"
echo ""

"${CLOUDFLARED}" tunnel --url "${LOCAL_URL}"
