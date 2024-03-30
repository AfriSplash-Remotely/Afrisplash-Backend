const express = require('express');
const router = express.Router();
const { R_protect, C_protect } = require('../middleware/auth');
// const protect = R_protect; //Ony Recuiter can create Jobs Now
const advancedResults = require('../middleware/advancedResults');
const {
  create,
  ping,
  updateJob,
  delJob,
  getMyJobs,
  getMyJob,
  getJobs,
  getJob,
  closeJob,
  openJob,
  applyJob,
  getApplicants,
  updateStatus,
  jobsByCompany,
  jobsByType,
  jobsByLocation,
  jobsByDate,
  jobsBySalary
} = require('../controllers/jobs');

//Jobs --Jobs In Company --Jobs Created --Manage Jobs --Applicant --Public Access other stuff
router.get('/', getJobs);
// View Jobs Public
router.get('/v/:id', getJob);
// Create A New Job
router.post('/', R_protect, create);
// edit a Job
router.patch('/e/:id', R_protect, updateJob);
// View a Job Private Only companies Member
router.get('/p/:id', R_protect, getMyJob);

// View Jobs Private Only companies Member - pend draft close live and other
router.get('/p/', R_protect, getMyJobs);

// Apply For A job
router.post('/a/:id', C_protect, applyJob);

// Veiw all applicants
router.get('/applicants/:id', R_protect, getApplicants);
// Manage Applican State
router.get('/applicant/:Job_id/:applicant_id/accept', R_protect, ping);
router.get('/applicant/:Job_id/:applicant_id/reject', R_protect, ping);

// Close or reopen a Job
router.patch('/c/:id', R_protect, closeJob);
router.patch('/o/:id', R_protect, openJob);

// Delete a Job
router.delete('/:id', R_protect, delJob);
// Report a Job
router.post('/r/:id', ping);

// update job status
router.patch('/:id/status', R_protect, updateStatus);

// Search jobs in a particular company
router.get('/search/c/:company', jobsByCompany);

// Search jobs by Type
router.get('/search/t/:type', jobsByType);

// Search jobs by Location
router.get('/search/l/:location', jobsByLocation);

// Search jobs by Date
router.get('/search/d', jobsByDate);

// Search jobs by salary
router.get('/search/s/:salary', jobsBySalary);

module.exports = router;
