const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    default: 'post'
  },
  content: {
    type: String,
    default: ''
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
  comment: {
    type: Number,
    default: 1
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
  },
  top: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加索引
feedSchema.index({ created_at: -1 });
feedSchema.index({ user_id: 1, created_at: -1 });

module.exports = mongoose.model('Feed', feedSchema);
