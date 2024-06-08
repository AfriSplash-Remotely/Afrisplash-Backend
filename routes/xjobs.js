const express = require('express');
const router = express.Router();

const { getXjobs } = require('../jobsfeed/xjob');

router.get('/', getXjobs);

module.exports = router;
