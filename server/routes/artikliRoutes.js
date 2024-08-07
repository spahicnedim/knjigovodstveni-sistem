const express = require("express");
const router = express.Router();
const {
    createArtikli,
    updateArtikala,
} = require("../controllers/ArtikliController");

router.post("/", createArtikli);
router.put("/:id", updateArtikala);

module.exports = router;