const express = require("express");
const router = express.Router();
const {
  createDokumenti,
  updateDokumenta,
  getAllDokumenti,
  getDokumentById,
} = require("../controllers/dokumentiController");
const upload = require("../utils/multerConfig");

router.post("/", upload.single("file"), createDokumenti);
router.put("/:id", updateDokumenta);
router.get("/", getAllDokumenti);
router.get("/:dokumentId", getDokumentById);

module.exports = router;
