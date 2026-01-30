const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// 更新用户信息（需要认证）
router.put('/', auth, userController.updateUser);

// 获取用户信息（可选认证）
router.get('/:name', (req, res, next) => {
  if (req.headers.authorization) {
    return auth(req, res, next);
  }
  next();
}, userController.getUser);

// 获取用户动态（可选认证）
router.get('/:name/feeds', (req, res, next) => {
  if (req.headers.authorization) {
    return auth(req, res, next);
  }
  next();
}, userController.getUserFeeds);

module.exports = router;
