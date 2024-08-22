const express = require("express");
const router = express.Router();
const {
    createVrstaDokumenta,
    updateVrstaDokumenta
} = require("../controllers/vrstaDokumentaController");

router.post("/", createVrstaDokumenta);
router.put("/:id", updateVrstaDokumenta);

module.exports = router;