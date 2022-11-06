const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
    default:null 
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
 seen: {
    type: Boolean,
    default:false,
    required: true
  },
  action: {
    type: String,
    required: true,
    default: null
  },
},
{
    timestamps: true
});
module.exports = mongoose.model("Notification", notificationSchema);