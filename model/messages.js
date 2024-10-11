const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please enter your First name'],
    trim: true
  },

  last_name: {
    type: String,
    required: [true, 'Please enter your Last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter Email address'],
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  additional_details: {
    type: String,
    required: false
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
