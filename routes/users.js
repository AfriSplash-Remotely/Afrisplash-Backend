var express = require('express');
var router = express.Router();
const multer = require('multer');

const {
  getAllCandidates,
  getUser,
  getUserByEmail,
  uploadImage
} = require('../controllers/users');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

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

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
