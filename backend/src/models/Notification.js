const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  related_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// 添加索引
notificationSchema.index({ user_id: 1, created_at: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
