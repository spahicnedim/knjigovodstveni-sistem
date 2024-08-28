const express = require("express");
const router = express.Router();
const {
    createKupacDobavljac,
    updateKupacDobavljac,
    getKupciDobavljaci
} = require("../controllers/kupacDobavljacController");

router.post("/", createKupacDobavljac);
router.put("/:id", updateKupacDobavljac);
router.get("/", getKupciDobavljaci)

module.exports = router;