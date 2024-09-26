const express = require("express");
const router = express.Router();
const {
  createDokumenti,
  updateDokumenta,
  getAllDokumenti,
  getDokumentById,
  deleteDokument,

} = require("../controllers/dokumentiController");
const upload = require("../utils/multerConfig");

router.post("/", upload.single("file"), createDokumenti);
router.put("/:dokumentId", upload.single("file"), updateDokumenta);
router.get("/", getAllDokumenti);
router.get("/:dokumentId", getDokumentById);
router.delete('/:dokumentId', deleteDokument);

module.exports = router;
