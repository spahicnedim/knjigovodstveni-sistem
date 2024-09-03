const express = require("express");
const router = express.Router();
const {
    createValute,
    updateValuta,
    getAllValute
} = require("../controllers/valuteController");

router.post("/", createValute);
router.put("/:id", updateValuta);
router.get("/", getAllValute)

module.exports = router;