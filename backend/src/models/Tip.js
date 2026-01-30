const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
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
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加索引
tipSchema.index({ post_id: 1, created_at: -1 });

module.exports = mongoose.model('Tip', tipSchema);
