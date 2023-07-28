const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { createReport } = require('../controllers/report');

router.post('/', protect, createReport);

module.exports = router;
