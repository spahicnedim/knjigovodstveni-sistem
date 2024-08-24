const express = require("express");
const router = express.Router();
const {
    createVrstaDokumenta,
    updateVrstaDokumenta,
    getAllVrstaDokumenata
} = require("../controllers/vrstaDokumentaController");

router.post("/", createVrstaDokumenta);
router.put("/:id", updateVrstaDokumenta);
router.get("/", getAllVrstaDokumenata)

module.exports = router;