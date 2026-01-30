const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// 用户注册
router.post('/register', authController.register);

// 发送验证码
router.post('/code', authController.sendCode);

// 用户登录
router.post('/authenticate', authController.authenticate);

// 用户登出
router.get('/logout', auth, authController.logout);
router.post('/logout', auth, authController.logout);

module.exports = router;
