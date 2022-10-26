const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  auth_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "a User cant be created without an authication handler"],
    ref: "auth",
  },

  first_name: {
    type: String,
    required: [true, "Please enter your First name"],
    trim: true,
  },

  last_name: {
    type: String,
    required: [true, "Please enter your Last name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your Email address"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid Email address",
    ],
  },

  bio: {
    type: String,
    default: null,
  },

  profile_image: {
    type: String,
    required: false,
  },

  cover_letter: {
    type: String,
    required: false,
  },

  cv: {
    type: String,
    required: false,
  },
  
  langauge: {
    type: Object, //FIXME
  },

  location : {
    type: String,
    required: false,
  },

  role: {
    type: String,
    required: [true, "Please enter user role"],
    default: "Product Design",
  },

  avaliability: {
    type: Array,
    required: [true, "Please enter Time Avaliable (Time OnJob), Type of Work Location"],
    default: ["Full-time Remote"],
  },

  badge : {
    type: Number,
    required: [true],
    max:5,
    min:0,
    default: 0 //FIXME
  },

  role: {
    type: Object, //FIXME
  },

  phone_number: {
    type: String,
    required: [false, "Please enter your Phone Number"],
    trim: true,
  },

  skills: {
    type: Array,
    default: [],
  },

  experience: {
    type: Array,
    default: [],
  },

  education: {
    type: Array,
    default: [],
  },

  settings: {
    type: Object, //FIXME
  },

  hide_detail: {
    type: Boolean,
    required: true,
    default: false
  },

  ready_to_interview: {
    type: Boolean,
    required: true,
    default: false
  },

  friends: {
    type: Array,
    default: [],
  },

  company_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "company",
    default: null,
  },

  company_role: {
    type: Array,
    default: [],
  },

  work_history: {
    type: Array,
    default: [],
  },

  extra_email : {
    type: Array,
    default: [],
  },

  notifications: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Notification", //TODO
    },
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id,
    },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model("user", userSchema);