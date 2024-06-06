const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Settings',
    required: false
  },
  himalayas_api_update: {
    type: String,
    required: false
  }
});

const Settings = mongoose.model('Settings', settingSchema);

module.exports = Settings;
