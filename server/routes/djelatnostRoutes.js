const express = require("express");
const router = express.Router();
const {
  createOrUpdateDjelatnost,
  getDjelatnostByCompanyId,
} = require("../controllers/djelatnostController");

router.post("/", createOrUpdateDjelatnost);
router.get("/company/:companyId", getDjelatnostByCompanyId);

module.exports = router;
