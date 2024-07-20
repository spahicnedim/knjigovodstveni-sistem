const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServisById,
} = require("../controllers/serviceController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/", authenticate, createService); // ovdje bude greska zbog JWT tokena
router.get("/", getAllServices);
router.get("/:id", getServisById);

module.exports = router;
