const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const userRoutes = require('./userRoutes');
const merchantRoutes = require('./merchantRoutes');
const productRoutes = require('./productRoutes');
const variationRoutes = require('./variatonRoutes');

router.use('/users', userRoutes);
router.use('/merchants', authenticateToken, merchantRoutes);  
router.use('/products', authenticateToken, productRoutes);
router.use('/variations', authenticateToken, variationRoutes);

module.exports = router;