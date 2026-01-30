# Docker 部署指南

本文档详细说明如何使用 Docker 和 Docker Compose 部署无忧陪伴平台。

## 目录

- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [常用命令](#常用命令)
- [生产环境部署](#生产环境部署)
- [故障排查](#故障排查)
- [性能优化](#性能优化)

## 环境要求

### 必需软件

- **Docker**: >= 20.10
- **Docker Compose**: >= 2.0

### 系统要求

- **CPU**: 2 核心或以上
- **内存**: 4GB 或以上
- **磁盘**: 10GB 可用空间

### 安装 Docker

#### Ubuntu/Debian

```bash
# 更新包索引
sudo apt-get update

# 安装依赖
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 设置稳定版仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 验证安装
docker --version
docker compose version
```

#### macOS

```bash
# 使用 Homebrew 安装
brew install --cask docker

# 或下载 Docker Desktop
# https://www.docker.com/products/docker-desktop
```

#### Windows

下载并安装 Docker Desktop:
https://www.docker.com/products/docker-desktop

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yeegeek/meefans.git
cd meefans
```

### 2. 启动服务

```bash
# 使用启动脚本
./docker-start.sh

# 或直接使用 docker-compose
docker-compose up -d
```

### 3. 初始化数据库

```bash
docker-compose exec backend pnpm run seed
```

### 4. 访问应用

- 前端: http://localhost:5173
- 后端: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## 配置说明

### docker-compose.yml 结构

```yaml
version: '3.8'

services:
  # MongoDB 数据库
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    
  # 后端服务
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/meefans
    depends_on:
      - mongodb
    
  # 前端服务
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### 环境变量配置

#### 后端环境变量

在 `docker-compose.yml` 中配置：

```yaml
backend:
  environment:
    - NODE_ENV=development
    - PORT=3000
    - MONGODB_URI=mongodb://mongodb:27017/meefans
    - JWT_SECRET=your-secret-key
    - JWT_EXPIRES_IN=7d
```

#### 前端环境变量

```yaml
frontend:
  environment:
    - VITE_API_BASE_URL=http://localhost:3000
```

### 端口配置

修改端口映射：

```yaml
services:
  backend:
    ports:
      - "3001:3000"  # 主机端口:容器端口
  
  frontend:
    ports:
      - "5174:5173"
  
  mongodb:
    ports:
      - "27018:27017"
```

### 数据持久化

Docker volumes 用于数据持久化：

```yaml
volumes:
  mongodb_data:        # MongoDB 数据
  backend_node_modules: # 后端依赖
  frontend_node_modules: # 前端依赖
```

文件上传目录映射：

```yaml
backend:
  volumes:
    - ./backend/uploads:/app/uploads
```

## 常用命令

### 服务管理

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启所有服务
docker-compose restart

# 重启特定服务
docker-compose restart backend

# 停止特定服务
docker-compose stop frontend

# 启动特定服务
docker-compose start frontend
```

### 查看状态

```bash
# 查看服务状态
docker-compose ps

# 查看所有日志
docker-compose logs

# 查看特定服务日志
docker-compose logs backend

# 实时查看日志
docker-compose logs -f

# 查看最近 100 行日志
docker-compose logs --tail=100
```

### 进入容器

```bash
# 进入后端容器
docker-compose exec backend sh

# 进入前端容器
docker-compose exec frontend sh

# 进入 MongoDB 容器
docker-compose exec mongodb mongosh
```

### 执行命令

```bash
# 在后端容器中执行命令
docker-compose exec backend pnpm test

# 初始化数据库
docker-compose exec backend pnpm run seed

# 查看 MongoDB 数据
docker-compose exec mongodb mongosh meefans --eval "db.users.find()"
```

### 构建和更新

```bash
# 重新构建镜像
docker-compose build

# 重新构建特定服务
docker-compose build backend

# 重新构建并启动
docker-compose up --build -d

# 拉取最新镜像
docker-compose pull
```

### 清理

```bash
# 停止并删除容器
docker-compose down

# 停止并删除容器、网络、数据卷
docker-compose down -v

# 删除未使用的镜像
docker image prune

# 删除所有未使用的资源
docker system prune -a
```

## 生产环境部署

### 1. 创建生产环境配置

创建 `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    networks:
      - meefans-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MONGODB_URI=mongodb://admin:${MONGO_PASSWORD}@mongodb:27017/meefans?authSource=admin
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=7d
    depends_on:
      - mongodb
    networks:
      - meefans-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    restart: always
    environment:
      - VITE_API_BASE_URL=${API_URL}
    depends_on:
      - backend
    networks:
      - meefans-network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - meefans-network

networks:
  meefans-network:
    driver: bridge

volumes:
  mongodb_data:
```

### 2. 创建生产环境 Dockerfile

**backend/Dockerfile.prod**:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .

FROM node:18-alpine

WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/app.js"]
```

**frontend/Dockerfile.prod**:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3. 配置 Nginx

创建 `nginx.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 文件上传
    location /uploads {
        proxy_pass http://backend:3000/uploads;
    }
}
```

### 4. 配置环境变量

创建 `.env.prod`:

```env
MONGO_PASSWORD=your_secure_password
JWT_SECRET=your_production_secret_key
API_URL=https://your-domain.com/api
```

### 5. 启动生产环境

```bash
# 加载环境变量
export $(cat .env.prod | xargs)

# 启动服务
docker-compose -f docker-compose.prod.yml up -d

# 初始化数据库
docker-compose -f docker-compose.prod.yml exec backend pnpm run seed
```

### 6. 配置 SSL

使用 Let's Encrypt:

```bash
# 安装 certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 故障排查

### 容器无法启动

```bash
# 查看详细日志
docker-compose logs

# 查看特定服务日志
docker-compose logs backend

# 检查容器状态
docker-compose ps
```

### MongoDB 连接失败

```bash
# 检查 MongoDB 是否运行
docker-compose ps mongodb

# 查看 MongoDB 日志
docker-compose logs mongodb

# 测试连接
docker-compose exec backend sh -c "ping mongodb"

# 进入 MongoDB 容器
docker-compose exec mongodb mongosh
```

### 端口冲突

```bash
# 查看端口占用
sudo lsof -i :3000
sudo lsof -i :5173

# 修改 docker-compose.yml 中的端口映射
```

### 磁盘空间不足

```bash
# 查看 Docker 磁盘使用
docker system df

# 清理未使用的资源
docker system prune -a

# 清理数据卷
docker volume prune
```

### 热重载不工作

确保正确映射了源代码目录：

```yaml
backend:
  volumes:
    - ./backend/src:/app/src
    - backend_node_modules:/app/node_modules
```

## 性能优化

### 1. 使用多阶段构建

减小镜像大小：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "src/app.js"]
```

### 2. 优化镜像层

```dockerfile
# 先复制依赖文件
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 再复制源代码
COPY . .
```

### 3. 使用 .dockerignore

排除不必要的文件：

```
node_modules
.git
.env
*.log
```

### 4. 限制资源使用

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### 5. 启用健康检查

```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
    interval: 30s
    timeout: 10s
    retries: 3
```

## 监控和日志

### 日志管理

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 使用 Docker Stats

```bash
# 查看资源使用情况
docker stats

# 查看特定容器
docker stats meefans-backend
```

## 备份和恢复

### 备份 MongoDB 数据

```bash
# 备份数据库
docker-compose exec mongodb mongodump --out /data/backup

# 导出备份
docker cp meefans-mongodb:/data/backup ./mongodb-backup
```

### 恢复数据

```bash
# 复制备份到容器
docker cp ./mongodb-backup meefans-mongodb:/data/backup

# 恢复数据
docker-compose exec mongodb mongorestore /data/backup
```

## 安全建议

1. **使用强密码**: 为 MongoDB 和 JWT 设置强密码
2. **限制端口暴露**: 只暴露必要的端口
3. **使用 HTTPS**: 在生产环境中启用 SSL
4. **定期更新**: 保持 Docker 镜像和依赖更新
5. **使用私有镜像仓库**: 存储自定义镜像
6. **限制容器权限**: 不要使用 root 用户运行容器

## 参考资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [MongoDB Docker 镜像](https://hub.docker.com/_/mongo)
- [Node.js Docker 最佳实践](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

如有问题，请查阅文档或提交 Issue。
