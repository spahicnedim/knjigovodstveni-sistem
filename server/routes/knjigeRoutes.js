const express = require('express');
const { getKnjigeWithDokumenti } = require('../controllers/knjigeController');
const router = express.Router();

// Ruta za dohvaćanje knjige sa svim dokumentima prema ID-u
router.get('/:knjigeId', getKnjigeWithDokumenti);

module.exports = router;