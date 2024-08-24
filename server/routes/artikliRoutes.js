const express = require("express");
const router = express.Router();
const {
    createArtikl,
    updateArtikala,
} = require("../controllers/ArtikliController");

router.post("/", createArtikl);
router.put("/:id", updateArtikala);

module.exports = router;