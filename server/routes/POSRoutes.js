const express = require('express');
const { processPOS } = require('../controllers/POS');
const router = express.Router();

// Definiši POST rutu za slanje podataka ka POS kasi
router.post('/submit', processPOS);

module.exports = router;