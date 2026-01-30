const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// 导入路由
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feeds');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');
const userRoutes = require('./routes/users');
const friendRoutes = require('./routes/friends');
const messageRoutes = require('./routes/messages');
const uploadRoutes = require('./routes/upload');
const pageRoutes = require('./routes/pages');

const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 路由
app.use('/register', authRoutes);
app.use('/code', authRoutes);
app.use('/authenticate', authRoutes);
app.use('/logout', authRoutes);
app.use('/feeds', feedRoutes);
app.use('/comment', commentRoutes);
app.use('/like', likeRoutes);
app.use('/tip', likeRoutes);
app.use('/user', userRoutes);
app.use('/friend', friendRoutes);
app.use('/block', friendRoutes);
app.use('/messages', messageRoutes);
app.use('/message', messageRoutes);
app.use('/upload', uploadRoutes);
app.use('/page', pageRoutes);
app.use('/notification', pageRoutes);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    field: 'url'
  });
});

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`环境: ${config.env}`);
});

module.exports = app;
