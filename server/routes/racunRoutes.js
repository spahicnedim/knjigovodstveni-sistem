const express = require("express");
const router = express.Router();
const {
  createRacun,
  getRacuniByCompanyId,
  deleteRacun,
} = require("../controllers/racunController");

router.post("/", createRacun);
router.get("/:companyId", getRacuniByCompanyId);
router.delete("/:id", deleteRacun);

module.exports = router;
