const express = require("express");
const router = express.Router();
const {
    createKupacDobavljac,
    updateKupacDobavljac,
} = require("../controllers/kupacDobavljacController");

router.post("/", createKupacDobavljac);
router.put("/:id", updateKupacDobavljac);

module.exports = router;