const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'Report can not be created without the reporter id'],
    ref: 'user'
  },
  reported_item: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['post', 'user', 'company', 'job', 'comment']
  },
  resolved: {
    type: Boolean,
    default: false,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
