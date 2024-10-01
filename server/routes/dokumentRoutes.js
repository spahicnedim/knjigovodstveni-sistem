const express = require("express");
const router = express.Router();
const {
  createKalkulacije,
  updateDokumenta,
  getAllDokumenti,
  getDokumentById,
  deleteDokument,
} = require("../controllers/dokumentiController");
const {createFakture, updateFakture} = require("../controllers/izlaznaFakturaController");
const upload = require("../utils/multerConfig");

router.post("/kalkulacije", upload.single("file"), createKalkulacije);
router.post("/fakture", upload.none(), createFakture);
router.put("/kalkulacije/:dokumentId", upload.single("file"), updateDokumenta);
router.put("/fakture/:dokumentId", upload.none(), updateFakture);
router.get("/", getAllDokumenti);
router.get("/:dokumentId", getDokumentById);
router.delete('/:dokumentId', deleteDokument);

module.exports = router;
