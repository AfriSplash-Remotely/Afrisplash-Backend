const express = require("express");
const router = express.Router();
const { R_protect }  = require("../middleware/auth");
const protect = R_protect;
const {
  onboarding,
  profile,
  updateUser, //Depercate
  getNotifications,
  addExperience,
  addEducation,
  addSkill,
  addLangauge,
  delLangauge,
  delExperience,
  delEducation,
  delSkill,
  getGifts,
  updateActivelyHiring,
  updateUserPI,
  updateUserBio,
  updateUserContact,
  getJobs,
  saveAJob,
  unSaveAJob,
  updateprivateMode,
} = require('../controllers/recruiter');


router.post("/onboarding", protect, onboarding);
router.get("/", protect, profile);
router.put("/activelyhiring", protect, updateActivelyHiring); // Not Require
router.put('/privatemode', protect, updateprivateMode); // Not Require
router.put("/edit/add/experience/", protect, addExperience); // Not Require
router.put("/edit/add/education/", protect, addEducation); // Not Require
router.put("/edit/add/skill/", protect, addSkill); // Not Require
router.put("/edit/add/langauge/", protect, addLangauge); // Not Require
router.delete("/edit/remove/experience/:id", protect, delExperience); // Not Require
router.delete("/edit/remove/education/:id", protect, delEducation); // Not Require
router.delete("/edit/remove/skill/:id", protect, delSkill); // Not Require
router.delete("/edit/remove/langauge/:id", protect, delLangauge); // Not Require
router.put("/edit/user/contact", protect, updateUserContact); // Not Require
router.put("/edit/user/bio", protect, updateUserBio); // Not Require
router.put("/edit/user/", protect, updateUserPI); // Not Require
router.get("/notifications", protect, getNotifications);
router.post("/gifts", protect, getGifts); 
router.get("/job/save/:id", protect, saveAJob);
router.get("/job/unsave/:id/", protect, unSaveAJob);
router.get('/jobs/', protect, getJobs);


module.exports = router;