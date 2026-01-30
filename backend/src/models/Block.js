const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  blocked_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加复合索引
blockSchema.index({ user_id: 1, blocked_id: 1 }, { unique: true });

module.exports = mongoose.model('Block', blockSchema);
