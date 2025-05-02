const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/add', productController.addProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;