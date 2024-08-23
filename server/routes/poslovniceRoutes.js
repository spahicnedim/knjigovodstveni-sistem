const express = require("express");
const router = express.Router();
const {
    createPoslovnice,
    updatePoslovnice,
    getAllPoslovnice
} = require("../controllers/poslovniceController");

router.post("/", createPoslovnice);
router.put("/:id", updatePoslovnice);
router.get("/", getAllPoslovnice)

module.exports = router;