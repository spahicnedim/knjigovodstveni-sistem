const express = require("express");
const router = express.Router();
const {
    createSkladiste,
    updateSkladiste,
} = require("../controllers/skladisteController");

router.post("/", createSkladiste);
router.put("/:id", updateSkladiste);

module.exports = router;