const express = require("express");
const router = express.Router();
const { getBanke } = require("../controllers/bankeController");

router.get("/", getBanke);

module.exports = router;
