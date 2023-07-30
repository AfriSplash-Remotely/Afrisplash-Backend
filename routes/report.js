const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { createReport, getReports } = require('../controllers/report');

router.post('/', protect, createReport);

router.get('/', protect, getReports);

module.exports = router;
