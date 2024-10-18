const express = require("express");
const router = express.Router();
const {
    createArtikl,
    getArtikli,
    getArtikliIzSkladista
} = require("../controllers/ArtikliController");

router.post("/", createArtikl);
router.get("/", getArtikli);
router.get("/artikli-skladiste", getArtikliIzSkladista)

module.exports = router;