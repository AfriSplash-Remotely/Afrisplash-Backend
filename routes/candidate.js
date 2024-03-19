const express = require('express');
const router = express.Router();
const { C_protect } = require('../middleware/auth');
const protect = C_protect;
const {
  onboarding,
  profile,
  updateUser, //Depercate
  getNotifications,
  addExperience,
  addEducation,
  addSkill,
  addLanguage,
  delLanguage,
  delExperience,
  delEducation,
  delSkill,
  getGifts,
  updateReadyToInterview,
  updateUserPI,
  updateUserBio,
  updateUserContact,
  getJobs,
  getMyJobs,
  saveAJob,
  unSaveAJob
} = require('../controllers/candidate');

router.post('/onboarding', protect, onboarding);
router.get('/', protect, profile);

router.put('/readytointerview', protect, updateReadyToInterview);
router.put('/edit/add/experience/', protect, addExperience);
router.put('/edit/add/education/', protect, addEducation);
router.put('/edit/add/skill/', protect, addSkill);
router.put('/edit/add/language/', protect, addLanguage);
router.delete('/edit/remove/experience/:id', protect, delExperience);
router.delete('/edit/remove/education/:id', protect, delEducation);
router.delete('/edit/remove/skill/:id', protect, delSkill); //not used
router.delete('/edit/remove/language/:id', protect, delLanguage);
router.put('/edit/user/contact', protect, updateUserContact);
router.put('/edit/user/bio', protect, updateUserBio);
router.put('/edit/user/', protect, updateUserPI);
router.get('/notifications', protect, getNotifications);
router.post('/gifts', protect, getGifts);
router.get('/jobs/', protect, getJobs);
router.get('/jobs/save-apply', protect, getMyJobs);
router.patch('/job/save/:id', protect, saveAJob);
router.delete('/job/unsave/:id/', protect, unSaveAJob);

module.exports = router;
