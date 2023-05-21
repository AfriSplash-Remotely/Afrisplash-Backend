const express = require('express');
const router = express.Router();

const { inviteAdmin, login } = require('../controllers/admin');

// TODO: protect route for only Super Admin user
router.post('/invite', inviteAdmin);

router.post('/login', login);

module.exports = router;
