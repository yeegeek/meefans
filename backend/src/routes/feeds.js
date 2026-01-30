const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const auth = require('../middlewares/auth');

// 获取动态列表（可选认证）
router.get('/', (req, res, next) => {
  if (req.headers.authorization) {
    return auth(req, res, next);
  }
  next();
}, feedController.getFeeds);

// 发布动态（需要认证）
router.post('/', auth, feedController.createFeed);

// 删除动态（需要认证）
router.delete('/:id', auth, feedController.deleteFeed);

module.exports = router;
