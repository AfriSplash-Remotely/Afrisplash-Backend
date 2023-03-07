const express = require('express');
const router = express.Router();
const { R_protect } = require('../middleware/auth');
const protect = R_protect; //Ony Recuiter can create Jobs Now
const advancedResults = require('../middleware/advancedResults');
const { create, ping } = require('../controllers/jobs');

//Jobs --Jobs In Company --Jobs Created --Manage Jobs --Applicant --Public Access other stuff
router.get('/', ping);
// View Jobs Public
router.get('/v/:id', ping);
// Create A New Job
router.post('/', protect, create);
// edit a Job
router.put('/e/:id', protect, ping);
// View a Job Private Only companies Member
router.get('/p/:id', protect, ping);

// View Jobs Private Only companies Member - pend draft close live and other
router.get('/p/', protect, ping);

// Apply For A job
router.post('/a/:id', ping);

// Veiw all applicants
router.get('/applicants/:id', protect, ping);
// Manage Applican State
router.get('/applicant/:Job_id/:applicant_id/accept', protect, ping);
router.get('/applicant/:Job_id/:applicant_id/reject', protect, ping);

// Close or reopen a Job
router.get('/c/:id', protect, ping);
router.get('/o/:id', protect, ping);

// Delete a Job
router.delete('/d/:id', protect, ping);
// Report a Job
router.post('/r/:id', ping);

module.exports = router;
