const express = require("express");
const router = express.Router();
const {
    createNacinPlacanja,
    updateNacinPlacanja,
    getAllNacinPlacanja
} = require("../controllers/nacinPlacanjaController");

router.post("/", createNacinPlacanja);
router.put("/:id", updateNacinPlacanja);
router.get("/", getAllNacinPlacanja)

module.exports = router;