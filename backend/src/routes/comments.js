const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

// 获取动态评论（可选认证）
router.get('/:id', (req, res, next) => {
  if (req.headers.authorization) {
    return auth(req, res, next);
  }
  next();
}, commentController.getComments);

// 发表评论（需要认证）
router.post('/', auth, commentController.createComment);

// 删除评论（需要认证）
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
