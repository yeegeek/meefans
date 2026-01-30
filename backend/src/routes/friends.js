const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require('../middlewares/auth');

// 好友相关
router.post('/', auth, friendController.createFriend);
router.delete('/:id', auth, friendController.deleteFriend);
router.get('/', auth, friendController.getFriends);

// 拉黑相关
router.post('/block', auth, friendController.createBlock);
router.delete('/block/:id', auth, friendController.deleteBlock);
router.get('/block', auth, friendController.getBlocks);

module.exports = router;
