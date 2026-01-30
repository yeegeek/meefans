const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  charge: {
    type: Number,
    default: 0
  },
  paid: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  src: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    default: ''
  },
  w: {
    type: Number,
    default: 0
  },
  h: {
    type: Number,
    default: 0
  },
  duration: {
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

module.exports = mongoose.model('File', fileSchema);
