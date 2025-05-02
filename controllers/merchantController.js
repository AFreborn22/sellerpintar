const MerchantService = require('../services/merchantService');

exports.createMerchant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const merchant = await MerchantService.registerMerchant(userId, { name });

    res.status(201).json(merchant);
  } catch (error) {
    if (error.message.includes('Unique constraint failed')) {
      res.status(409).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.getMerchantProducts = async (req, res) => {
  try {
    const products = await MerchantService.getMerchantProducts(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    if (error.message === 'No products found for this merchant') {
      res.status(404).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    const updatedMerchant = await MerchantService.updateMerchant(req.params.id, req.body);
    res.status(200).json(updatedMerchant);
  } catch (error) {
    if (error.message.includes('Unique constraint failed')) {
      res.status(409).json({ message: error.message }); 
    } else if (error.message === 'Merchant not found') {
      res.status(404).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
  
exports.deleteMerchant = async (req, res) => {
  try {
    await MerchantService.deleteMerchant(req.params.id);
    res.status(200).json({ message: 'Merchant deleted successfully' });
  } catch (error) {
    if (error.message === 'Merchant not found') {
      res.status(404).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};