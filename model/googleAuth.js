const mongoose = require("mongoose");

const googleAuthSchema = new mongoose.Schema({
    google_id: {
        type: Number,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    photo_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
      },
})

module.exports = mongoose.model("googleAuth", googleAuthSchema)
