const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _company: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: 'company',
    default: null
  },
  _author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: 'user',
    default: null
  },
  location: {
    type: String,
    required: true,
    enum: ['Download', 'Register', 'Visit', 'Apply'],
    default: 'Visit'
  },
  level: {
    type: String,
    required: true,
    enum: ['Intermidate', 'Beginner', 'Senior', 'Junior', 'All'],
    default: 'All'
  },
  type: {
    type: String,
    require: true,
    default: null
  },
  salary: {
    type: Object,
    required: true,
    default: {
      amount: null,
      currency: null,
      period: null
    }
  },
  market: {
    type: Array,
    default: []
  },
  about: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    required: true,
    default: false
  },
  private: {
    type: Boolean,
    required: true,
    default: true
  },
  publish: {
    type: Boolean,
    required: true,
    default: false
  },
  expire: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('job', jobSchema);
