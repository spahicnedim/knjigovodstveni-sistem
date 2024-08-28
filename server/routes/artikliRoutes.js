const express = require("express");
const router = express.Router();
const {
    createArtikl,
    getArtikli,
} = require("../controllers/ArtikliController");

router.post("/", createArtikl);
router.get("/", getArtikli);

module.exports = router;