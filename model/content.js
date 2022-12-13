const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  _post: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "a  Content can't be created without a post ID"],
    ref: "post",
    unique:true
  },
  message: {
    type: String,
    required: false,
  }
},
 {
  timestamps: true
});

module.exports = mongoose.model("content", contentSchema);