const express = require("express");
const router = express.Router();
const {
  getDjelatnostByCompanyId,
  getDjelatnosti,
  createDjelatnost,
} = require("../controllers/djelatnostController");

router.post("/", createDjelatnost);
router.get("/company/:companyId", getDjelatnostByCompanyId);
router.get("/", getDjelatnosti);

module.exports = router;
