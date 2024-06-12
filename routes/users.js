var express = require('express');
var router = express.Router();

const {
  getAllCandidates,
  getUser,
  getUserByEmail
} = require('../controllers/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Get all candidates
router.get('/candidates', getAllCandidates);

// GEt a user by email
router.get('/email/:email', getUserByEmail);

/**
 * Add Admin Protect
 */
router.get('/:id', getUser);

module.exports = router;
