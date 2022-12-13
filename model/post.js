const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },

  _content: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "contents",
  },

  title: {
    type: String,
    required: true
  },

  url: {
    type: String,
    default:"hello",
    unique : [true, "Server Error Please try Again"]
  },

  categories: {
    type: String,
    required: true
  },

  tags: {
    type: Array,
    default: []
  },

  summary: {
    type: String,
    required: true
  },

  read_time: {
    type: Number,
    required: true
  },

  cover_image: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String,
    required: true
  },

  views: {
    type: Number,
    required: true,
    default:0
  },

  disable_comments: {
    type: Boolean,
    required: true,
    default: false
  },
},
{
  timestamps: true
}
);

postSchema.pre('save', async(next)=>{

})

module.exports = mongoose.model("post", postSchema);