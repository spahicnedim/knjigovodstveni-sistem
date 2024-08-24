const express = require("express");
const router = express.Router();
const {
    createSkladiste,
    updateSkladiste,
    getAllSkladista
} = require("../controllers/skladisteController");

router.post("/", createSkladiste);
router.put("/:id", updateSkladiste);
router.get("/", getAllSkladista)

module.exports = router;