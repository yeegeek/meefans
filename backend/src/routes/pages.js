const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const auth = require('../middlewares/auth');

// 获取页脚页面
router.get('/', pageController.getPages);

// 获取通知列表
router.get('/notification', auth, pageController.getNotifications);

// 标记通知为已读
router.put('/notification/:id/read', auth, pageController.markNotificationAsRead);

module.exports = router;
