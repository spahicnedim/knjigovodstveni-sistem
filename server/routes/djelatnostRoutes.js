const express = require("express");
const router = express.Router();
const {
  createOrUpdateDjelatnost,
  getDjelatnostByCompanyId,
  getDjelatnosti,
} = require("../controllers/djelatnostController");

router.post("/", createOrUpdateDjelatnost);
router.get("/company/:companyId", getDjelatnostByCompanyId);
router.get("/", getDjelatnosti);

module.exports = router;
