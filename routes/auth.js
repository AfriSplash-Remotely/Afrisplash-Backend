const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
} = require("../controllers/auth")


router.post("/register", register);
router.post("/login", login);
router.post("/google/redirect", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;