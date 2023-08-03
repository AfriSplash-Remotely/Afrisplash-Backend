const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  createReport,
  getReports,
  getReport
} = require('../controllers/report');

router.post('/', protect, createReport);

router.get('/', protect, getReports);

router.get('/:id', protect, getReport);

module.exports = router;
