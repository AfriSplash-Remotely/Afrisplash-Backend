const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _post:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    body:{
        type: String,
        required: true
    },
    replies:[{
        comment: String,
        time: {
            type: Date,
            default: Date.now()
        },
        name: String
    }],
    likes:{
        type: Number
    },
    name: String,
    email: {
        type: String,
        required: [true, "Please enter your Email address"],
        trim: true,
        lowercase:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid Email address",
        ],
        },
    profile_pic: String,
},{
    timestamps:true
})

module.exports = mongoose.model('comment', commentSchema)