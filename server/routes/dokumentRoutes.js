const express = require("express");
const router = express.Router();
const {
    createDokumenti,
    updateDokumenta,
    getAllDokumenti
} = require("../controllers/dokumentiController");
const upload = require('../utils/multerConfig');

router.post("/", upload.single('file'), createDokumenti);
router.put("/:id", updateDokumenta);
router.get('/', getAllDokumenti);

module.exports = router;