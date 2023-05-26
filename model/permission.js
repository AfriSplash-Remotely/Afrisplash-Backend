const mongoose = require('mongoose');
const permissionsArray = require('../config/permissions.string');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: permissionsArray
  }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
