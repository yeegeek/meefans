# API 文档分析总结

## 项目概述
**无忧陪伴平台** - 一个社交平台，支持用户注册、登录、发布动态、评论、点赞、私信等功能。

## 核心功能模块

### 1. 用户认证模块
- **POST /register** - 用户注册
- **POST /code** - 发送验证码
- **POST /authenticate** - 用户登录
- **GET/POST /logout** - 登出

### 2. 动态模块（Feeds）
- **GET /feeds** - 获取动态列表（支持搜索、分类、分页）
- **POST /feeds** - 发布动态
- **GET /comment/{id}** - 获取动态评论
- **POST /comment** - 发表评论
- **POST /like** - 点赞动态
- **POST /tip** - 打赏动态

### 3. 用户模块
- **GET /user/{name}** - 获取用户信息
- **PUT /user** - 更新用户信息
- **GET /user/{name}/feeds** - 获取用户动态
- **POST /friend** - 添加好友
- **DELETE /friend/{id}** - 删除好友
- **POST /block** - 拉黑用户
- **DELETE /block/{id}** - 取消拉黑

### 4. 消息模块
- **GET /messages** - 获取消息列表
- **GET /message/{channel}** - 获取对话消息
- **POST /message** - 发送消息
- **DELETE /message/{id}** - 删除消息

### 5. 文件上传模块
- **POST /upload** - 上传文件（图片、视频）

### 6. 其他模块
- **GET /page** - 获取页脚页面（关于、隐私政策、条款、帮助）
- **GET /notification** - 获取通知

## 数据模型

### User（用户）
```javascript
{
  id: Number,
  name: String,
  display_name: String,
  gender: Number,
  avatar: String,
  cover: String,
  location: String,
  vip: Number,
  friend: Number,
  block: Number,
  request: Number,
  x: Number, // 是否是partner
  content: String, // 自我介绍
  cost: Number,
  translate: Number,
  engine: Number,
  online: Number
}
```

### Feed（动态）
```javascript
{
  id: Number,
  user: User,
  type: String,
  created_at: String,
  files: [File],
  comment: Number,
  translate: Number,
  engine: Number,
  content: String,
  cost: Number,
  top: Number,
  counter: {
    liked: Number,
    commented: Number,
    tipped: Number,
    tipped_amount: Number
  }
}
```

### File（文件）
```javascript
{
  id: Number,
  type: String,
  charge: Number,
  paid: Number,
  price: Number,
  src: String,
  w: Number,
  h: Number,
  top: Number,
  thumb: String,
  duration: Number
}
```

### Message（消息）
```javascript
{
  id: Number,
  channel: String,
  from: User,
  to: User,
  type: String,
  content: String,
  translate: Number,
  engine: Number,
  cost: Number,
  file: File,
  created_at: String
}
```

### Comment（评论）
```javascript
{
  id: Number,
  post_id: Number,
  user: User,
  translate: Number,
  engine: Number,
  content: String,
  cost: Number,
  files: File,
  created_at: String
}
```

## 技术要求
- 后端：Express + MongoDB
- 前端：React + shadcn/ui
- 不使用 TypeScript
- 需要编写测试文件和测试脚本

## 认证方式
- HTTP Bearer Token 认证
- Header: `X-Client-ID`（客户端标识）
