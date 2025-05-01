const express = require('express');
const variationController = require('../controllers/variatonController');
const router = express.Router();

router.post('/add', variationController.addVariation);
router.get('/data', variationController.getVariations);

module.exports = router;