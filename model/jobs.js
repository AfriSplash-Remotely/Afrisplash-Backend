const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    _company: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: 'company',
      default: null
    },
    _author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: 'user',
      default: null
    },
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    industry: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    requirement: {
      type: String,
      required: true
    },
    benefit: {
      type: String,
      required: false
    },
    experience: {
      type: String,
      required: true,
      enum: ['Intermidate', 'Beginner', 'Senior', 'Junior', 'All'],
      default: 'All'
    },
    type: {
      type: String,
      enum: ['Remote', 'Physical', 'Hybrid'],
      require: true,
      default: null
    },
    location: {
      type: String,
      required: true
    },
    salary: {
      type: Object,
      required: true,
      default: {
        amount: null,
        currency: null,
        period: null
      }
    },
    redirect: {
      type: Boolean,
      default: false,
      required: true
    },
    redirect_url: {
      type: String,
      default: null
    },
    verify: {
      type: Boolean,
      required: true,
      default: false
    },
    private: {
      type: Boolean,
      required: true,
      default: false
    },
    promoted: {
      type: Boolean,
      required: true,
      default: false
    },
    publish: {
      type: Boolean,
      required: true,
      default: true
    },
    expire: {
      type: Date,
      default: null
    },
    external_data: {
      type: Object,
      required: false,
      default: {
        image: null,
        url: null,
        date: null
      }
    },
    applicants: [
      {
        user_id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: false,
          ref: 'user',
          default: null
        },
        date: String,
        rejected: Boolean,
        accpected: Boolean
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('job', jobSchema);
