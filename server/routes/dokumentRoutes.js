const express = require("express");
const router = express.Router();
const {
    createDokumenti,
    updateDokumenta,
    getAllDokumenti
} = require("../controllers/dokumentiController");

router.post("/", createDokumenti);
router.put("/:id", updateDokumenta);
router.get('/', getAllDokumenti);

module.exports = router;