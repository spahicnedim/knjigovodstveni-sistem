const express = require("express");
const router = express.Router();
const { getDrzava, createDrzava } = require("../controllers/drzavaController");

router.get("/", getDrzava);
router.post("/", createDrzava);

module.exports = router;
