# 无忧陪伴平台 (MeeFans)

一个基于 Express + MongoDB + React 的社交平台，支持用户注册、登录、发布动态、评论、点赞、私信等功能。

## 项目特点

- **后端**: Express.js + MongoDB + Mongoose
- **前端**: React + Vite + Tailwind CSS + Zustand
- **认证**: JWT Token
- **测试**: Jest + Supertest
- **部署**: Docker + Docker Compose
- **代码风格**: JavaScript (不使用 TypeScript)

## 项目结构

```
meefans/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── models/         # MongoDB 数据模型
│   │   ├── routes/         # API 路由
│   │   ├── controllers/    # 业务逻辑控制器
│   │   ├── middlewares/    # 中间件
│   │   ├── utils/          # 工具函数
│   │   └── app.js          # Express 应用入口
│   ├── tests/              # 后端测试
│   ├── uploads/            # 文件上传目录
│   ├── Dockerfile          # 后端 Docker 配置
│   └── package.json
│
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API 服务
│   │   ├── store/         # Zustand 状态管理
│   │   └── App.jsx
│   ├── Dockerfile          # 前端 Docker 配置
│   └── package.json
│
├── docker-compose.yml      # Docker Compose 配置
├── docker-start.sh         # Docker 启动脚本
├── docker-stop.sh          # Docker 停止脚本
├── docs/                   # 文档
├── api.md                  # API 文档
├── architecture.md         # 架构设计文档
└── README.md
```

## 功能模块

### 已实现功能

#### 用户认证
- ✅ 用户注册
- ✅ 用户登录
- ✅ 用户登出
- ✅ JWT Token 认证

#### 动态管理
- ✅ 发布动态
- ✅ 获取动态列表（支持搜索、分类、分页）
- ✅ 删除动态
- ✅ 点赞动态
- ✅ 评论动态
- ✅ 打赏动态

#### 用户管理
- ✅ 获取用户信息
- ✅ 更新用户信息
- ✅ 获取用户动态
- ✅ 添加好友
- ✅ 删除好友
- ✅ 拉黑用户

#### 消息系统
- ✅ 获取消息列表
- ✅ 获取对话消息
- ✅ 发送消息
- ✅ 删除消息

#### 文件上传
- ✅ 图片上传
- ✅ 视频上传

## 快速开始

### 方式一：使用 Docker Compose（推荐）

#### 环境要求

- Docker >= 20.10
- Docker Compose >= 2.0

#### 启动步骤

```bash
# 1. 克隆项目
git clone https://github.com/yeegeek/meefans.git
cd meefans

# 2. 启动所有服务（包括 MongoDB、后端、前端）
./docker-start.sh

# 3. 初始化数据库（首次启动需要）
docker-compose exec backend pnpm run seed
```

#### 访问应用

- 前端: http://localhost:5173
- 后端: http://localhost:3000
- API 健康检查: http://localhost:3000/health

#### 常用命令

```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 停止服务
./docker-stop.sh
# 或
docker-compose down

# 重启服务
docker-compose restart

# 重新构建并启动
docker-compose up --build -d

# 进入容器
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec mongodb mongosh
```

### 方式二：本地开发

#### 环境要求

- Node.js >= 18
- MongoDB >= 5.0
- pnpm (推荐) 或 npm

#### 安装依赖

```bash
# 安装后端依赖
cd backend
pnpm install

# 安装前端依赖
cd ../frontend
pnpm install
```

#### 配置环境变量

**后端配置** (`backend/.env`):

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/meefans
JWT_SECRET=meefans-secret-key-2024
JWT_EXPIRES_IN=7d
```

**前端配置** (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:3000
```

#### 启动 MongoDB

```bash
# 使用 systemd (Linux)
sudo systemctl start mongod

# 或直接启动
mongod --dbpath /path/to/data
```

#### 初始化数据库

```bash
cd backend
pnpm run seed
```

#### 启动项目

```bash
# 启动后端（终端1）
cd backend
pnpm run dev

# 启动前端（终端2）
cd frontend
pnpm run dev
```

## 测试

### 运行单元测试

```bash
cd backend
pnpm test
```

### 运行 API 测试脚本

```bash
cd backend
./test-api.sh
```

### 使用 Docker 运行测试

```bash
# 运行后端测试
docker-compose exec backend pnpm test

# 运行 API 测试
docker-compose exec backend ./test-api.sh
```

## API 文档

详细的 API 文档请查看 [api.md](./api.md)

### 主要 API 端点

#### 认证相关
- `POST /register` - 用户注册
- `POST /authenticate` - 用户登录
- `POST /logout` - 用户登出
- `POST /code` - 发送验证码

#### 动态相关
- `GET /feeds` - 获取动态列表
- `POST /feeds` - 发布动态
- `DELETE /feeds/:id` - 删除动态
- `GET /comment/:id` - 获取动态评论
- `POST /comment` - 发表评论

#### 用户相关
- `GET /user/:name` - 获取用户信息
- `PUT /user` - 更新用户信息
- `GET /user/:name/feeds` - 获取用户动态

#### 消息相关
- `GET /messages` - 获取消息列表
- `GET /message/:channel` - 获取对话消息
- `POST /message` - 发送消息

## Docker 部署

### 生产环境部署

1. **修改环境变量**

创建 `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your_password
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:your_password@mongodb:27017/meefans?authSource=admin
      - JWT_SECRET=your_production_secret
    depends_on:
      - mongodb

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    environment:
      - VITE_API_BASE_URL=https://your-domain.com/api
    depends_on:
      - backend
```

2. **启动生产环境**

```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **配置 Nginx 反向代理**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

## 常见问题

### Docker 相关

#### 端口被占用

修改 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "3001:3000"  # 后端
  - "5174:5173"  # 前端
```

#### 容器无法启动

```bash
# 查看日志
docker-compose logs

# 清理并重新构建
docker-compose down -v
docker-compose up --build
```

#### 数据持久化

数据存储在 Docker volumes 中，删除容器不会丢失数据。

清理所有数据：

```bash
docker-compose down -v
```

### 本地开发相关

#### MongoDB 连接失败

确保 MongoDB 已启动并且连接字符串正确：

```bash
# 检查 MongoDB 状态
sudo systemctl status mongod

# 或
ps aux | grep mongod
```

#### 文件上传失败

确保 `backend/uploads` 目录存在且有写入权限：

```bash
mkdir -p backend/uploads
chmod 755 backend/uploads
```

## 开发指南

详细的开发指南请查看 [DEVELOPMENT.md](./DEVELOPMENT.md)

### 添加新功能

1. **后端**
   - 在 `models/` 中定义数据模型
   - 在 `controllers/` 中实现业务逻辑
   - 在 `routes/` 中定义路由
   - 在 `tests/` 中添加测试

2. **前端**
   - 在 `services/` 中添加 API 调用
   - 在 `components/` 中创建组件
   - 在 `pages/` 中创建页面
   - 在 `App.jsx` 中添加路由

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发团队。

---

**注意**: 本项目为学习和演示目的，生产环境使用前请进行充分的安全审查和性能优化。
