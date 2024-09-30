const express = require("express");
const router = express.Router();
const {
  createKalkulacije,
  updateDokumenta,
  getAllDokumenti,
  getDokumentById,
  deleteDokument,
} = require("../controllers/dokumentiController");
const {createFakture} = require("../controllers/izlaznaFakturaController");
const upload = require("../utils/multerConfig");

router.post("/kalkulacije", upload.single("file"), createKalkulacije);
router.post("/fakture", upload.none(), createFakture);
router.put("/:dokumentId", upload.single("file"), updateDokumenta);
router.get("/", getAllDokumenti);
router.get("/:dokumentId", getDokumentById);
router.delete('/:dokumentId', deleteDokument);

module.exports = router;
