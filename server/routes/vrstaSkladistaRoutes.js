const express = require("express");
const router = express.Router();
const {
    createVrstaSkladista,
    getAllVrsteSkladista
} = require("../controllers/vrstaSkladistaController");

router.post("/", createVrstaSkladista);
router.get("/", getAllVrsteSkladista)

module.exports = router;