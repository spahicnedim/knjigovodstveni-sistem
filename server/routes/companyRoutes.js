const express = require("express");
const router = express.Router();
const {
  createCompany,
  getOneCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/companyController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/", createCompany);
router.put("/:companyId", updateCompany);
router.get("/:serviceId/:companyId", getOneCompany);
router.get("/:serviceId", getCompanyById);
module.exports = router;
