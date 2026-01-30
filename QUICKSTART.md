# 快速开始指南

本指南将帮助你在 5 分钟内启动并运行无忧陪伴平台。

## 方式一：使用 Docker Compose（推荐）

### 前置条件

- Docker >= 20.10
- Docker Compose >= 2.0

### 快速启动步骤

#### 1. 克隆项目

```bash
git clone https://github.com/yeegeek/meefans.git
cd meefans
```

#### 2. 启动所有服务

```bash
./docker-start.sh
```

这个脚本会自动：
- 构建 Docker 镜像
- 启动 MongoDB 数据库
- 启动后端服务
- 启动前端服务

#### 3. 初始化数据库

```bash
docker-compose exec backend pnpm run seed
```

#### 4. 访问应用

打开浏览器访问：

- **前端**: http://localhost:5173
- **后端**: http://localhost:3000

### Docker 常用命令

```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
./docker-stop.sh
# 或
docker-compose down

# 重启服务
docker-compose restart

# 重新构建
docker-compose up --build -d
```

### 测试账号

数据库初始化后，可以使用以下测试账号登录：

- 用户名: `testuser1`
- 密码: `password123`

或

- 用户名: `testuser2`
- 密码: `password123`

---

## 方式二：本地开发

### 前置条件

- Node.js >= 18
- MongoDB >= 5.0
- pnpm (推荐) 或 npm

### 快速启动步骤

#### 1. 克隆项目

```bash
git clone https://github.com/yeegeek/meefans.git
cd meefans
```

#### 2. 安装依赖

```bash
# 后端
cd backend
pnpm install

# 前端
cd ../frontend
pnpm install
```

#### 3. 启动 MongoDB

```bash
# Linux (systemd)
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# 或直接启动
mongod --dbpath /path/to/data
```

#### 4. 初始化数据库

```bash
cd backend
pnpm run seed
```

#### 5. 启动项目

**终端 1 - 启动后端：**

```bash
cd backend
pnpm run dev
```

**终端 2 - 启动前端：**

```bash
cd frontend
pnpm run dev
```

#### 6. 访问应用

打开浏览器访问：

- 前端: http://localhost:5173
- 后端: http://localhost:3000

---

## 基本功能测试

### 1. 注册新用户

1. 访问 http://localhost:5173
2. 点击"注册新账号"
3. 填写注册信息
4. 提交注册

### 2. 登录

1. 使用注册的账号登录
2. 或使用测试账号登录

### 3. 发布动态

1. 登录后在首页
2. 在输入框中输入内容
3. 可选：上传图片或视频
4. 点击"发布"按钮

### 4. 浏览动态

- 点击"浏览"查看所有动态
- 点击"关注"查看关注用户的动态
- 点击"热门"查看热门动态
- 使用搜索框搜索动态

### 5. 互动

- 点击❤️图标点赞
- 点击💬图标查看评论
- 点击💰图标打赏

---

## 运行测试

### 使用 Docker

```bash
# 运行后端单元测试
docker-compose exec backend pnpm test

# 运行 API 测试脚本
docker-compose exec backend ./test-api.sh
```

### 本地开发

```bash
# 后端单元测试
cd backend
pnpm test

# API 测试脚本
cd backend
./test-api.sh
```

---

## 停止服务

### Docker

```bash
./docker-stop.sh
# 或
docker-compose down
```

### 本地开发

在每个终端中按 `Ctrl+C`

---

## 常见问题

### Docker 相关

#### 问题：Docker 未安装

**解决**:
```bash
# 安装 Docker
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# macOS
brew install --cask docker
```

#### 问题：端口被占用

**解决**:

修改 `docker-compose.yml` 中的端口：

```yaml
services:
  backend:
    ports:
      - "3001:3000"  # 改为 3001
  frontend:
    ports:
      - "5174:5173"  # 改为 5174
```

#### 问题：容器无法启动

**解决**:
```bash
# 查看日志
docker-compose logs

# 清理并重新构建
docker-compose down -v
docker-compose up --build
```

### 本地开发相关

#### 问题：MongoDB 连接失败

**错误**: `MongoNetworkError: failed to connect to server`

**解决**:
```bash
# 检查 MongoDB 是否运行
ps aux | grep mongod

# 启动 MongoDB
sudo systemctl start mongod
```

#### 问题：端口被占用

**错误**: `Error: listen EADDRINUSE: address already in use :::3000`

**解决**:
```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或修改 .env 中的端口
PORT=3001
```

#### 问题：依赖安装失败

**解决**:
```bash
# 清除 pnpm 缓存
pnpm store prune

# 删除 node_modules 重新安装
rm -rf node_modules
pnpm install
```

#### 问题：前端无法连接后端

**解决**:
1. 确保后端已启动
2. 检查 `frontend/.env` 中的 `VITE_API_BASE_URL`
3. 检查浏览器控制台的网络请求

---

## 下一步

- 阅读 [README.md](./README.md) 了解完整功能
- 阅读 [DEVELOPMENT.md](./DEVELOPMENT.md) 学习如何开发
- 查看 [api.md](./api.md) 了解 API 文档
- 查看 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) 了解项目总结

---

## Docker 架构说明

使用 Docker Compose 启动后，系统包含以下服务：

### 服务列表

1. **mongodb** - MongoDB 数据库
   - 端口: 27017
   - 数据持久化: Docker volume

2. **backend** - Express 后端服务
   - 端口: 3000
   - 依赖: mongodb
   - 热重载: 支持

3. **frontend** - React 前端服务
   - 端口: 5173
   - 依赖: backend
   - 热重载: 支持

### 网络架构

```
┌─────────────────────────────────────────┐
│           Docker Network                │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Frontend │─→│ Backend  │─→│MongoDB ││
│  │  :5173   │  │  :3000   │  │ :27017 ││
│  └──────────┘  └──────────┘  └────────┘│
│                                         │
└─────────────────────────────────────────┘
         ↓           ↓           ↓
    localhost:  localhost:  localhost:
      5173        3000        27017
```

### 数据持久化

- MongoDB 数据存储在 Docker volume 中
- 后端上传的文件存储在 `./backend/uploads` 目录
- 删除容器不会丢失数据

---

## 获取帮助

如有问题：

1. 查看文档
2. 查看常见问题
3. 提交 Issue

---

祝你使用愉快！🎉
