const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // 从 header 中获取 token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: '未提供认证令牌',
        field: 'authorization'
      });
    }

    const token = authHeader.substring(7);

    // 验证 token
    const decoded = jwt.verify(token, config.jwt.secret);

    // 查找用户
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: '用户不存在',
        field: 'token'
      });
    }

    // 将用户信息添加到请求对象
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '无效的认证令牌',
        field: 'token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        message: '认证令牌已过期',
        field: 'token'
      });
    }

    return res.status(500).json({
      code: 500,
      message: '服务器错误',
      field: 'server'
    });
  }
};

module.exports = auth;
