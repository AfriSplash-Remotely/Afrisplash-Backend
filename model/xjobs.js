const mongoose = require('mongoose');

const xjobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  companyName: {
    type: String,
    required: false
  },
  companyLogo: {
    type: String,
    required: false
  },
  minSalary: {
    type: Number,
    required: false
  },
  maxSalary: {
    type: Number,
    required: false
  },
  seniority: {
    type: Array,
    required: false
  },
  categories: {
    type: Array,
    required: false
  },
  publishedDate: {
    type: String,
    required: false
  },
  expiryDate: {
    type: String,
    required: false
  },
  applicationLink: {
    type: String,
    required: false
  },
  jobType: {
    type: String,
    required: false
  },
  workModel: {
    type: String,
    required: false
  }
});

const Xjob = mongoose.model('Xjob', xjobSchema);

module.exports = Xjob;
