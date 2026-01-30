const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  channel: {
    type: String,
    required: true,
    index: true
  },
  from_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  content: {
    type: String,
    default: ''
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
messageSchema.index({ channel: 1, created_at: -1 });
messageSchema.index({ from_id: 1, to_id: 1 });

module.exports = mongoose.model('Message', messageSchema);
