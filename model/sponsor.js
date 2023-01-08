const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({

  name: {
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
  description: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true,
    enum: ["Download", "Register", "Visit", "Apply"],
    default: "Visit",
  },
  url: {
    type: String,
    required: [true, "Please Url Can't be Left Empty"]
  },
  disable:{
    type: Boolean,
    required: [true, "This Is Used To Show Active "],
    default: false
  }
},{
  timestamps: true
});

module.exports = mongoose.model("sponsor", sponsorSchema)
