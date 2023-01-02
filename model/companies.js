const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your Company Name'],
      trim: true
    },
    logo: {
      type: String,
      required: [true, "Please Logo Can't be Left Empty"]
    },
    thumbnail: {
      type: String,
      required: [true, 'Please Add a Thumbnail']
    },
    website: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    map: {
      type: Object,
      required: false
    },
    market: {
      type: Array,
      default: []
    },
    staff: {
      type: Number
    },
    //TODO Test ASAP
    members: [
      {
        id: mongoose.SchemaTypes.ObjectId,
        link: String
      }
    ],
    one_Line_Pitch: {
      type: String,
      required: [true, 'Please Add a One Line Pitch']
    },
    description: {
      type: String,
      required: false
    },
    company_email: {
      type: String,
      required: [true, 'Please enter your Email address'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ]
    },
    company_phone: {
      type: String,
      required: [false, 'Please enter your Phone Number'],
      trim: true
    },
    socials: [
      {
        platform: String,
        handle: String,
        link: String
      }
    ],
    verified: {
      type: Boolean,
      required: [true, 'State of Verification '],
      default: false
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [
        true,
        'Company cant be created without an authication handler'
      ],
      ref: 'auth'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('company', companySchema);
