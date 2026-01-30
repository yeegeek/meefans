#!/bin/bash

# 项目启动脚本

echo "========================================="
echo "启动无忧陪伴平台"
echo "========================================="
echo ""

# 检查 MongoDB 是否运行
if ! pgrep -x "mongod" > /dev/null; then
  echo "MongoDB 未运行，请先启动 MongoDB"
  echo "运行命令: sudo systemctl start mongod"
  echo "或者: mongod --dbpath /path/to/data"
  exit 1
fi

echo "✓ MongoDB 已运行"
echo ""

# 启动后端
echo "启动后端服务..."
cd backend
pnpm run dev &
BACKEND_PID=$!
echo "✓ 后端服务已启动 (PID: $BACKEND_PID)"
echo ""

# 等待后端启动
sleep 3

# 启动前端
echo "启动前端服务..."
cd ../frontend
pnpm run dev &
FRONTEND_PID=$!
echo "✓ 前端服务已启动 (PID: $FRONTEND_PID)"
echo ""

echo "========================================="
echo "服务已启动！"
echo "========================================="
echo ""
echo "后端地址: http://localhost:3000"
echo "前端地址: http://localhost:5173"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 等待用户中断
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
