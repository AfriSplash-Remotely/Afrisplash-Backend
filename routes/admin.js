const express = require('express');
const router = express.Router();

const {
  inviteAdmin,
  login,
  getAllAdmins,
  sendEmail,
  logout,
  updatePassword
} = require('../controllers/admin');
const { Admin_protect } = require('../middleware/auth');

// TODO: protect route for only Super Admin user
router.post('/invite', inviteAdmin);

router.post('/login', login);

router.get('', getAllAdmins);

router.get('/logout', logout);

router.patch('/update-password', Admin_protect, updatePassword);

// TODO: protect with Admin Guard
router.post('/email', sendEmail);

router.get('/test', Admin_protect, (req, res) => {
  return res.status(200).send('Hello Admin');
});

module.exports = router;
