const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middlewares/auth');

// 获取消息列表
router.get('/', auth, messageController.getMessages);

// 获取对话消息
router.get('/:channel', auth, messageController.getMessagesByChannel);

// 发送消息
router.post('/', auth, messageController.createMessage);

// 删除消息
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;
