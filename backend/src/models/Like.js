const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feed',
    required: true,
    index: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加复合索引，确保一个用户只能点赞一次
likeSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
