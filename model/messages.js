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
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid Email address'
    ]
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
