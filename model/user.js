const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  auth_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'a User cant be created without an authication handler'],
    ref: 'auth'
  },
  user_type: {
    type: String,
    required: true,
    enum: ['recuiter', 'candidate'],
    default: 'candidate'
  },
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
    required: [true, 'Please enter your Email address'],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid Email address'
    ]
  },

  bio: {
    type: String,
    default: null
  },

  profile_image: {
    type: String,
    required: false
  },

  thumbnail: {
    type: String,
    required: false
  },

  cover_letter: {
    type: String,
    required: false
  },

  cv: {
    type: String,
    required: false
  },

  langauge: [
    {
      name: String,
      level: String
    }
  ],

  account_setup_completed: {
    type: Boolean,
    required: true,
    default: false
  },

  location: {
    type: String,
    required: false
  },

  role: {
    type: String,
    required: [true, 'Please enter user role'],
    default: 'Product Design'
  },

  avaliability: {
    type: Array,
    required: [
      true,
      'Please enter Time Avaliable (Time OnJob), Type of Work Location'
    ],
    default: ['Full-time Remote']
  },

  badge: {
    type: Number,
    required: [true],
    max: 5,
    min: 0,
    default: 0
  },

  phone_number: {
    type: String,
    required: [false, 'Please enter your Phone Number'],
    trim: true
  },

  skills: {
    type: Array,
    default: []
  },

  experience: [
    {
      company_name: String,
      position_held: String,
      location: String,
      job_type: String,
      date_start: String,
      date_end: String,
      description: String
    }
  ],

  education: [
    {
      institution_name: String,
      degree: String,
      field_of_study: String,
      date_start: String,
      date_end: String,
      description: String
    }
  ],

  jobs: {
    type: Array
  },

  settings: {
    type: Object //FIXME
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

  activelyHiring: {
    type: Boolean,
    required: true,
    default: false
  },

  privateMode: {
    type: Boolean,
    required: true,
    default: false
  },
  friends: {
    type: Array,
    default: []
  },

  _company: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: 'company',
    default: null
  },

  company_role: {
    type: String
  },

  work_history: {
    type: Array,
    default: []
  },

  extra_email: {
    type: Array,
    default: []
  },

  notifications: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Notification'
    }
  ],

  gifts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gifts'
    }
  ],

  created_at: {
    type: Date,
    default: Date.now
  }
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