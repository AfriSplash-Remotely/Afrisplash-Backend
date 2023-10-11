const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  auth_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [
      true,
      'an Admin user can not be created without an authentication handler'
    ],
    ref: 'auth'
  },
  admin_type: {
    type: String,
    required: true,
    enum: ['admin', 'super-admin']
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
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    }
  ]
});

// sign jwt
adminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_SECRET
  );
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
