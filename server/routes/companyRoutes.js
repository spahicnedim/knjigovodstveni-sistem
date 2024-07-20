const express = require("express");
const router = express.Router();
const {
  createCompany,
  getOneCompany,
  getCompanyById,
} = require("../controllers/companyController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/", createCompany);
router.get("/:serviceId/:id", getOneCompany);
router.get("/:serviceId", getCompanyById);
module.exports = router;
