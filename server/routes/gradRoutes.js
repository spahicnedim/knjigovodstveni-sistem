const express = require("express");
const router = express.Router();
const { getCities } = require("../controllers/gradController");

// Route to get all cities
router.get("/", getCities);

module.exports = router;
