const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    }
  ],
  account_verify: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Hook function to encrypt the password
adminSchema.pre('save', async function (next) {
  try {
    // check if the password field is modified
    if (!this.isModified('password')) return next();

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // set the hashed password to the model
    this.password = hashedPassword;

    // proceed to save the model
    next();
  } catch (error) {
    next(error);
  }
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
