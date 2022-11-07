const express = require("express");
const router = express.Router();
const { C_protect }  = require("../middleware/auth");
const protect = C_protect;
const {
    onboarding, 
    profile,
    updateUser,
    getNotifications,
} = require("../controllers/candidate")


router.post("/onboarding", protect, onboarding);
router.get("/", protect, profile);
router.put("/edit", protect, updateUser);
router.get("/notifications", protect, getNotifications);
// router.post("/gift", protect, onboarding);
// router.get("/jobs", protect, onboarding);
// router.get("/job/save/:id", protect, onboarding);
// router.get("/job/unsave/:id", protect, onboarding);


module.exports = router;