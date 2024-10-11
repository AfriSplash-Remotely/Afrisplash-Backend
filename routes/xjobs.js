const express = require('express');
const router = express.Router();

const { getXjobs, searchJobs, runJobs } = require('../jobsfeed/xjob');

router.get('/', getXjobs);

router.get('/search', searchJobs);

router.get('/run', runJobs);

module.exports = router;
