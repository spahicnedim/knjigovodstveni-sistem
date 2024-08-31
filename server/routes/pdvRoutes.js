const express = require("express");
const router = express.Router();
const {
    getPDV
} = require("../controllers/pdvController");


router.get("/", getPDV);


module.exports = router;
