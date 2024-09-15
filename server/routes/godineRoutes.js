const express = require('express');
const router = express.Router();
const {getActiveGodina, getGodine} = require('../controllers/godineController');

router.get('/', getActiveGodina);
router.get('/all', getGodine);


module.exports = router;