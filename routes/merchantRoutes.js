const express = require('express');
const merchantController = require('../controllers/merchantController');
const router = express.Router();

router.post('/create', merchantController.createMerchant);
router.get('/:id/products', merchantController.getMerchantProducts);  
router.put('/:id', merchantController.updateMerchant);
router.delete('/:id', merchantController.deleteMerchant);

module.exports = router;
