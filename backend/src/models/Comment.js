const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  translate: {
    type: Number,
    default: 0
  },
  engine: {
    type: Number,
    default: 0
  },
  cost: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加索引
commentSchema.index({ post_id: 1, created_at: -1 });

module.exports = mongoose.model('Comment', commentSchema);
