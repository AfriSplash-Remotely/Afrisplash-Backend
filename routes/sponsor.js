const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    create,
    activeSponsor,
    delSponsor,
    history,
    editSponsor
} = require("../controllers/sponsor")

//TODO Protect Router 
router.get("/", activeSponsor);
router.post("/create/", create);
router.delete("/delete/:id", delSponsor);
router.put("/edit/:id", editSponsor);
router.get("/history", history);


module.exports = router;