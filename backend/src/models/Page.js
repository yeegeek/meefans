const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['about', 'policy', 'terms', 'help'],
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Page', pageSchema);
