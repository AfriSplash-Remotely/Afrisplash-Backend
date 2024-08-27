const express = require('express');
const router = express.Router();

const { getXjobs, searchJobs } = require('../jobsfeed/xjob');

router.get('/', getXjobs);

router.get('/search', searchJobs);

module.exports = router;
