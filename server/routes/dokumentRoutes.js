const express = require("express");
const router = express.Router();
const {
    createDokumenti,
    updateDokumenta
} = require("../controllers/dokumentiController");

router.post("/", createDokumenti);
router.put("/:id", updateDokumenta);

module.exports = router;