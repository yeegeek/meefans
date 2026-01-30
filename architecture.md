# 项目架构设计

## 整体架构

```
meefans/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── models/         # MongoDB 数据模型
│   │   ├── routes/         # API 路由
│   │   ├── controllers/    # 业务逻辑控制器
│   │   ├── middlewares/    # 中间件（认证、错误处理等）
│   │   ├── utils/          # 工具函数
│   │   └── app.js          # Express 应用入口
│   ├── tests/              # 后端测试
│   ├── uploads/            # 文件上传目录
│   ├── package.json
│   └── .env.example
│
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── components/     # React 组件
│   │   │   ├── ui/        # shadcn/ui 组件
│   │   │   ├── auth/      # 认证相关组件
│   │   │   ├── feed/      # 动态相关组件
│   │   │   ├── user/      # 用户相关组件
│   │   │   └── message/   # 消息相关组件
│   │   ├── pages/         # 页面组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── services/      # API 服务
│   │   ├── utils/         # 工具函数
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/                   # 文档
└── README.md
```

## 后端技术栈

### 核心框架和库
- **Express.js** - Web 框架
- **MongoDB** - 数据库
- **Mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT 认证
- **bcrypt** - 密码加密
- **multer** - 文件上传
- **express-validator** - 请求验证
- **cors** - 跨域支持
- **dotenv** - 环境变量管理

### 测试工具
- **Jest** - 测试框架
- **Supertest** - HTTP 测试
- **mongodb-memory-server** - 内存数据库测试

## 前端技术栈

### 核心框架和库
- **React 18** - UI 框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **shadcn/ui** - UI 组件库
- **Tailwind CSS** - CSS 框架
- **Axios** - HTTP 客户端
- **React Query** - 数据获取和缓存
- **Zustand** - 状态管理

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 数据库设计

### Collections

#### users
```javascript
{
  _id: ObjectId,
  name: String (unique, indexed),
  email: String (unique, indexed),
  display_name: String,
  password: String (hashed),
  gender: Number,
  avatar: String,
  cover: String,
  location: String,
  vip: Number,
  x: Number,
  content: String,
  online: Boolean,
  created_at: Date,
  updated_at: Date
}
```

#### feeds
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  type: String,
  content: String,
  files: [ObjectId] (ref: files),
  comment: Number,
  translate: Number,
  engine: Number,
  cost: Number,
  top: Number,
  created_at: Date,
  updated_at: Date
}
```

#### files
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  type: String,
  charge: Number,
  paid: Number,
  price: Number,
  src: String,
  thumb: String,
  w: Number,
  h: Number,
  duration: Number,
  top: Number,
  created_at: Date
}
```

#### comments
```javascript
{
  _id: ObjectId,
  post_id: ObjectId (ref: feeds),
  user_id: ObjectId (ref: users),
  content: String,
  file_id: ObjectId (ref: files),
  translate: Number,
  engine: Number,
  cost: Number,
  created_at: Date
}
```

#### likes
```javascript
{
  _id: ObjectId,
  post_id: ObjectId (ref: feeds),
  user_id: ObjectId (ref: users),
  created_at: Date
}
```

#### tips
```javascript
{
  _id: ObjectId,
  post_id: ObjectId (ref: feeds),
  user_id: ObjectId (ref: users),
  amount: Number,
  created_at: Date
}
```

#### messages
```javascript
{
  _id: ObjectId,
  channel: String (indexed),
  from_id: ObjectId (ref: users),
  to_id: ObjectId (ref: users),
  type: String,
  content: String,
  file_id: ObjectId (ref: files),
  translate: Number,
  engine: Number,
  cost: Number,
  created_at: Date
}
```

#### friends
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  friend_id: ObjectId (ref: users),
  status: String, // pending, accepted
  created_at: Date
}
```

#### blocks
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  blocked_id: ObjectId (ref: users),
  created_at: Date
}
```

#### pages
```javascript
{
  _id: ObjectId,
  type: String, // about, policy, terms, help
  content: String,
  updated_at: Date
}
```

#### notifications
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  type: String,
  content: String,
  related_id: ObjectId,
  read: Boolean,
  created_at: Date
}
```

## API 路由设计

### 认证路由 (/api/auth)
- POST /register
- POST /code
- POST /authenticate
- GET /logout
- POST /logout

### 动态路由 (/api/feeds)
- GET / - 获取动态列表
- POST / - 发布动态
- GET /:id - 获取单个动态
- DELETE /:id - 删除动态

### 评论路由 (/api/comments)
- GET /feed/:id - 获取动态评论
- POST / - 发表评论
- DELETE /:id - 删除评论

### 点赞路由 (/api/likes)
- POST / - 点赞
- DELETE /:id - 取消点赞

### 打赏路由 (/api/tips)
- POST / - 打赏

### 用户路由 (/api/users)
- GET /:name - 获取用户信息
- PUT / - 更新用户信息
- GET /:name/feeds - 获取用户动态

### 好友路由 (/api/friends)
- POST / - 添加好友
- DELETE /:id - 删除好友
- GET / - 获取好友列表

### 拉黑路由 (/api/blocks)
- POST / - 拉黑用户
- DELETE /:id - 取消拉黑
- GET / - 获取拉黑列表

### 消息路由 (/api/messages)
- GET / - 获取消息列表
- GET /:channel - 获取对话消息
- POST / - 发送消息
- DELETE /:id - 删除消息

### 文件路由 (/api/upload)
- POST / - 上传文件

### 页面路由 (/api/pages)
- GET / - 获取页脚页面

### 通知路由 (/api/notifications)
- GET / - 获取通知列表
- PUT /:id/read - 标记为已读

## 中间件设计

### 认证中间件 (auth.js)
- 验证 JWT Token
- 解析用户信息
- 检查用户权限

### 错误处理中间件 (errorHandler.js)
- 统一错误响应格式
- 日志记录

### 验证中间件 (validator.js)
- 请求参数验证
- 数据格式验证

### 文件上传中间件 (upload.js)
- 文件类型验证
- 文件大小限制
- 文件存储处理

## 前端页面设计

### 公开页面
- /login - 登录页
- /register - 注册页
- /about - 关于页面
- /terms - 服务条款
- /policy - 隐私政策
- /help - 帮助中心

### 认证页面
- / - 首页（动态列表）
- /feed/:id - 动态详情
- /user/:name - 用户主页
- /messages - 消息列表
- /message/:channel - 对话页面
- /profile - 个人设置
- /notifications - 通知中心

## 测试策略

### 后端测试
1. **单元测试** - 测试各个控制器和工具函数
2. **集成测试** - 测试 API 端点
3. **数据库测试** - 使用内存数据库测试模型

### 前端测试
1. **组件测试** - 测试 UI 组件
2. **集成测试** - 测试页面交互
3. **E2E 测试** - 测试完整用户流程

### 测试脚本
- `npm test` - 运行所有测试
- `npm run test:watch` - 监听模式
- `npm run test:coverage` - 生成覆盖率报告

## 部署方案

### 开发环境
- 后端：http://localhost:3000
- 前端：http://localhost:5173
- MongoDB：mongodb://localhost:27017/meefans

### 生产环境
- 使用环境变量配置
- MongoDB Atlas 或自建 MongoDB
- 文件存储：本地或云存储（S3、OSS）
