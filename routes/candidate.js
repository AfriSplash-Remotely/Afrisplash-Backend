const express = require("express");
const router = express.Router();
const { C_protect }  = require("../middleware/auth");
const protect = C_protect;
const {
    onboarding, 
    profile,
    updateUser,
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
} = require("../controllers/candidate")


router.post("/onboarding", protect, onboarding);
router.get("/", protect, profile);
router.put("/edit/add/experience/", protect, addExperience);
router.put("/edit/add/education/", protect, addEducation);
router.put("/edit/add/skill/", protect, addSkill);
router.put("/edit/add/langauge/", protect, addLangauge);
router.delete("/edit/remove/experience/:id", protect, delExperience);
router.delete("/edit/remove/education/:id", protect, delEducation);
router.delete("/edit/remove/skill/:id", protect, delSkill);
router.delete("/edit/remove/langauge/:id", protect, delLangauge);
router.put("/edit/user", protect, updateUser);
router.get("/notifications", protect, getNotifications);
router.post("/gifts", protect, getGifts);
// router.get("/jobs", protect, onboarding);
// router.get("/job/save/:id", protect, onboarding);
// router.get("/job/unsave/:id", protect, onboarding);


module.exports = router;