const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    create,
    getCompanies,
    getVCompanies,
    deleteCompany,
} = require("../controllers/company");
const { editComment } = require("../controllers/blog");

//TODO Protect Router 
router.get("/", getCompanies);
router.get('/verified', getVCompanies);
router.post("/create", create);
router.put("/verify", create);
router.put("/edit/:company", editComment);
router.delete("/delete/:company", deleteCompany);

module.exports = router;