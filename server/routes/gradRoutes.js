const express = require("express");
const router = express.Router();
const { getCities, createCity } = require("../controllers/gradController");

// Route to get all cities
router.get("/", getCities);
router.post("/", createCity);

module.exports = router;
