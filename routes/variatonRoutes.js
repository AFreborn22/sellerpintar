const express = require('express');
const variationController = require('../controllers/variatonController');
const router = express.Router();

router.post('/add', variationController.addVariation);
router.get('/:product_id', variationController.getVariationsByProductId);
router.put('/update/:id', variationController.updateVariation);

module.exports = router;