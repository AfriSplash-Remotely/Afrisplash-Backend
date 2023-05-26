const express = require('express');
const router = express.Router();

const { inviteAdmin, login, getAllAdmins } = require('../controllers/admin');

// TODO: protect route for only Super Admin user
router.post('/invite', inviteAdmin);

router.post('/login', login);

router.get('', getAllAdmins);

module.exports = router;
