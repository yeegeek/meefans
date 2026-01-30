const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const auth = require('../middlewares/auth');

// 点赞
router.post('/', auth, likeController.createLike);

// 取消点赞
router.delete('/:id', auth, likeController.deleteLike);

// 打赏
router.post('/tip', auth, likeController.createTip);

module.exports = router;
