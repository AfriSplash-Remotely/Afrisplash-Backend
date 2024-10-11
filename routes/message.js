const express = require('express');
const router = express.Router();

const { contactUs } = require('../controllers/message');

router.post('/', contactUs);

module.exports = router;
