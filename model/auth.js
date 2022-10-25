const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your Email address"],
    trim: true,
    unique: true,
    lowercase:true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid Email address",
    ],
  },
  password: {
    type: String,
  },
  user_type: {
    type: String,
    required: true,
    enum: ["recuiter", "candidate"],
    default: "candidate",
  },
  account_verify: {
    type: Boolean,
    required: true,
    default: false
  },
  account_setup_completed: {
    type: Boolean,
    required: true,
    default: false
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "user",
    default: null,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
authSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("auth", authSchema)
