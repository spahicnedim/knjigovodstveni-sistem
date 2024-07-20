const express = require("express");
const router = express.Router();
const { getRoles } = require("../controllers/roleController");
// const authenticate = require("../middlewares/authMiddleware");
// const authorize = require("../middlewares/roleMiddleware");

// Route for getting all roles
router.get("/", getRoles);

module.exports = router;
