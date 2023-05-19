const express = require('express');
const router = express.Router();

const { inviteAdmin } = require('../controllers/admin');

// TODO: protect route for only Super Admin user
router.post('/invite', inviteAdmin);

module.exports = router;
