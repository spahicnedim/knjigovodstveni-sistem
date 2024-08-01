const express = require("express");
const router = express.Router();
const { getDrzava } = require("../controllers/drzavaController");

// Route to get all cities
router.get("/", getDrzava);

module.exports = router;
