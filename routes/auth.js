const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    register,
    login,
    logout
} = require("../controllers/auth")


router.post("/register", register);
router.post("/login", login);
router.post("/google/redirect", login);
router.get("/logout", logout);
// router.post("/verify-otp", verifyOTP);  /google/redirect
// router.put("/reset-password", resetPassword);
// router.post("/forgot-password", forgotPassword);
// router.put("/update-password", protect, updatePassword);

module.exports = router;