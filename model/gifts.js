const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const giftSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, "Please Image Can't be Left Empty"]
  },
  theme: {
    type: String,
    required: [false, "Please Theme Colour Can't be Left Empty"]
  },
  message: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: [true, "Please Url Can't be Left Empty"]
  },
  disable:{
    type: Boolean,
    required: [true, "This Is Used To Show Active "],
    default: false
  },
  expire:{
    type: String,
    required: [true, "The Date This Gife Expire"],
  }
},{
  timestamps: true
});

module.exports = mongoose.model("gift", giftSchema)
