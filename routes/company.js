const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    createCompany,
    getCompany
} = require("../controllers/company")

//TODO Protect Router 
router.get("/", getCompany);
router.post("/create/", createCompany);

module.exports = router;