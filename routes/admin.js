const express = require('express');
const router = express.Router();

const {
  inviteAdmin,
  login,
  getAllAdmins,
  sendEmail
} = require('../controllers/admin');

// TODO: protect route for only Super Admin user
router.post('/invite', inviteAdmin);

router.post('/login', login);

router.get('', getAllAdmins);

// TODO: protect with Admin Guard
router.post('/email', sendEmail);

module.exports = router;
