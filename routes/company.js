const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    create,
    getCompanies,
    getVCompanies,
} = require("../controllers/company")

//TODO Protect Router 
router.get("/", getCompanies);
router.get('/verified', getVCompanies);
router.post("/create", create);

module.exports = router;