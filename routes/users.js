var express = require('express');
var router = express.Router();

const { getAllCandidates } = require('../controllers/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Get all candidates
router.get('/candidates', getAllCandidates);

module.exports = router;
