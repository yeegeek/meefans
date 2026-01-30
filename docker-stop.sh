#!/bin/bash

# Docker Compose 停止脚本

echo "========================================="
echo "停止无忧陪伴平台"
echo "========================================="
echo ""

if docker-compose version &> /dev/null; then
    docker-compose down
else
    docker compose down
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ 服务已停止"
else
    echo ""
    echo "❌ 停止服务失败"
    exit 1
fi
