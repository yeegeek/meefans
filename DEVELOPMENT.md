# 开发指南

本文档提供了详细的开发指南，帮助开发者快速上手项目开发。

## 开发环境设置

### 1. 安装必要工具

```bash
# Node.js (推荐使用 nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# pnpm
npm install -g pnpm

# MongoDB
# Ubuntu/Debian
sudo apt-get install -y mongodb-org

# macOS
brew tap mongodb/brew
brew install mongodb-community
```

### 2. 克隆项目

```bash
git clone https://github.com/yeegeek/meefans.git
cd meefans
```

### 3. 安装依赖

```bash
# 后端
cd backend
pnpm install

# 前端
cd ../frontend
pnpm install
```

### 4. 配置环境变量

参考 README.md 中的环境变量配置部分。

## 开发工作流

### 后端开发

#### 1. 启动开发服务器

```bash
cd backend
pnpm run dev
```

这会启动 nodemon，自动监听文件变化并重启服务器。

#### 2. 添加新的 API 端点

**步骤：**

1. 在 `models/` 中定义数据模型（如果需要）
2. 在 `controllers/` 中实现业务逻辑
3. 在 `routes/` 中定义路由
4. 在 `tests/` 中添加测试

**示例：添加通知功能**

```javascript
// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,
  content: String,
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Notification', notificationSchema);
```

```javascript
// controllers/notificationController.js
const Notification = require('../models/Notification');

const getNotifications = async (req, res, next) => {
  try {
    const userId = req.userId;
    const notifications = await Notification.find({ user_id: userId })
      .sort({ created_at: -1 });
    
    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications };
```

```javascript
// routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');

router.get('/', auth, notificationController.getNotifications);

module.exports = router;
```

#### 3. 数据库操作

```bash
# 连接到 MongoDB
mongosh

# 查看所有数据库
show dbs

# 使用 meefans 数据库
use meefans

# 查看所有集合
show collections

# 查询用户
db.users.find()

# 删除所有动态
db.feeds.deleteMany({})
```

#### 4. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test auth.test.js

# 监听模式
pnpm run test:watch

# 生成覆盖率报告
pnpm run test:coverage
```

### 前端开发

#### 1. 启动开发服务器

```bash
cd frontend
pnpm run dev
```

访问 http://localhost:5173

#### 2. 添加新页面

**步骤：**

1. 在 `pages/` 中创建页面组件
2. 在 `services/` 中添加 API 调用（如果需要）
3. 在 `App.jsx` 中添加路由

**示例：添加通知页面**

```jsx
// pages/Notifications.jsx
import { useState, useEffect } from 'react';
import { notificationService } from '../services/notification';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.notifications);
    } catch (error) {
      console.error('加载通知失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">通知</h1>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow">
              <p>{notification.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
```

```javascript
// services/notification.js
import api from './api';

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  }
};
```

```jsx
// App.jsx (添加路由)
<Route
  path="/notifications"
  element={
    <PrivateRoute>
      <Notifications />
    </PrivateRoute>
  }
/>
```

#### 3. 状态管理

使用 Zustand 管理全局状态：

```javascript
// store/useNotificationStore.js
import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  unreadCount: 0,
  
  setUnreadCount: (count) => set({ unreadCount: count }),
  
  incrementUnread: () => set((state) => ({ 
    unreadCount: state.unreadCount + 1 
  })),
  
  clearUnread: () => set({ unreadCount: 0 })
}));
```

#### 4. 样式开发

使用 Tailwind CSS：

```jsx
// 示例组件
function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 调试技巧

### 后端调试

#### 1. 使用 console.log

```javascript
console.log('用户ID:', userId);
console.log('请求数据:', req.body);
```

#### 2. 使用 VS Code 调试器

在 `.vscode/launch.json` 中配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/backend/src/app.js",
      "cwd": "${workspaceFolder}/backend",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

#### 3. 查看请求日志

在中间件中添加日志：

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### 前端调试

#### 1. React Developer Tools

安装 Chrome 扩展：React Developer Tools

#### 2. 网络请求调试

在浏览器开发者工具的 Network 标签中查看 API 请求。

#### 3. 状态调试

使用 Zustand DevTools：

```javascript
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
  devtools((set) => ({
    // ...
  }))
);
```

## 常用命令

### 后端

```bash
# 启动开发服务器
pnpm run dev

# 运行测试
pnpm test

# 生成测试覆盖率
pnpm run test:coverage

# 初始化数据库
pnpm run seed

# 运行 API 测试脚本
./test-api.sh
```

### 前端

```bash
# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产版本
pnpm run preview
```

## 代码规范

### JavaScript 风格

- 使用 ES6+ 语法
- 使用 `const` 和 `let`，避免使用 `var`
- 使用箭头函数
- 使用模板字符串
- 使用解构赋值

### 命名规范

- 变量和函数：camelCase
- 组件：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：与导出的主要内容保持一致

### 注释规范

```javascript
/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} 用户对象
 */
async function getUser(userId) {
  // 实现...
}
```

## Git 工作流

### 分支管理

- `main` - 主分支，保持稳定
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支

### 提交规范

使用语义化提交信息：

```
feat: 添加用户通知功能
fix: 修复登录失败的问题
docs: 更新 API 文档
style: 格式化代码
refactor: 重构用户服务
test: 添加动态测试
chore: 更新依赖包
```

### 工作流程

```bash
# 1. 创建功能分支
git checkout -b feature/notifications

# 2. 开发功能
# ...

# 3. 提交更改
git add .
git commit -m "feat: 添加用户通知功能"

# 4. 推送到远程
git push origin feature/notifications

# 5. 创建 Pull Request
# 在 GitHub 上创建 PR

# 6. 代码审查和合并
# 审查通过后合并到 develop 分支
```

## 性能优化

### 后端优化

1. **数据库查询优化**
   - 使用索引
   - 避免 N+1 查询
   - 使用 `lean()` 返回纯 JavaScript 对象

2. **缓存**
   - 使用 Redis 缓存热点数据
   - 实现 API 响应缓存

3. **分页**
   - 所有列表接口都应支持分页

### 前端优化

1. **代码分割**
   - 使用 React.lazy 和 Suspense
   - 路由级别的代码分割

2. **图片优化**
   - 使用适当的图片格式
   - 实现懒加载

3. **状态管理**
   - 避免不必要的重渲染
   - 使用 React.memo

## 安全注意事项

1. **输入验证**
   - 所有用户输入都要验证
   - 使用 express-validator

2. **认证和授权**
   - 保护敏感 API 端点
   - 验证用户权限

3. **密码安全**
   - 使用 bcrypt 加密
   - 设置密码强度要求

4. **防止注入攻击**
   - 使用参数化查询
   - 转义用户输入

5. **CORS 配置**
   - 正确配置跨域策略
   - 生产环境限制允许的域名

## 故障排查

### 常见问题

1. **MongoDB 连接失败**
   - 检查 MongoDB 是否运行
   - 检查连接字符串是否正确

2. **端口被占用**
   - 使用 `lsof -i :3000` 查找占用进程
   - 修改端口配置

3. **依赖安装失败**
   - 清除缓存：`pnpm store prune`
   - 删除 node_modules 重新安装

4. **API 请求失败**
   - 检查网络连接
   - 查看浏览器控制台错误
   - 检查后端日志

## 资源链接

- [Express 文档](https://expressjs.com/)
- [MongoDB 文档](https://docs.mongodb.com/)
- [React 文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Zustand 文档](https://github.com/pmndrs/zustand)

---

如有问题，请查阅文档或提交 Issue。
