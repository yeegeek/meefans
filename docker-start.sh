#!/bin/bash

# Docker Compose 启动脚本

echo "========================================="
echo "启动无忧陪伴平台 (Docker Compose)"
echo "========================================="
echo ""

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    echo "安装指南: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    echo "安装指南: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker 已安装"
echo "✓ Docker Compose 已安装"
echo ""

# 停止并删除旧容器
echo "清理旧容器..."
docker-compose down 2>/dev/null || docker compose down 2>/dev/null
echo ""

# 构建并启动服务
echo "构建并启动服务..."
echo "这可能需要几分钟时间，请耐心等待..."
echo ""

if docker-compose version &> /dev/null; then
    docker-compose up --build -d
else
    docker compose up --build -d
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✓ 服务启动成功！"
    echo "========================================="
    echo ""
    echo "服务地址："
    echo "  前端: http://localhost:5173"
    echo "  后端: http://localhost:3000"
    echo "  MongoDB: mongodb://localhost:27017"
    echo ""
    echo "测试账号："
    echo "  用户名: testuser1"
    echo "  密码: password123"
    echo ""
    echo "常用命令："
    echo "  查看日志: docker-compose logs -f"
    echo "  停止服务: docker-compose down"
    echo "  重启服务: docker-compose restart"
    echo "  查看状态: docker-compose ps"
    echo ""
    echo "初始化数据库（首次启动需要）："
    echo "  docker-compose exec backend pnpm run seed"
    echo ""
else
    echo ""
    echo "❌ 服务启动失败，请检查错误信息"
    exit 1
fi
