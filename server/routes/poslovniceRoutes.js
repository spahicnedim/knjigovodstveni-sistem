const express = require("express");
const router = express.Router();
const {
    createPoslovnice,
    updatePoslovnice,
} = require("../controllers/poslovniceController");

router.post("/", createPoslovnice);
router.put("/:id", updatePoslovnice);

module.exports = router;