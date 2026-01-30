const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  friend_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加复合索引
friendSchema.index({ user_id: 1, friend_id: 1 }, { unique: true });

module.exports = mongoose.model('Friend', friendSchema);
