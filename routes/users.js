var express = require('express');
var router = express.Router();

const { getAllCandidates, getUser } = require('../controllers/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// ******TODO: Add ADMIN Protect************
// Get all candidates
router.get('/candidates', getAllCandidates);

/**
 * Add Admin Protect
 */
router.get('/:id', getUser);

module.exports = router;
