const MerchantService = require('../services/merchantService');

exports.createMerchant = async (req, res) => {
  try {
    const merchant = await MerchantService.registerMerchant(req.body);
    res.status(201).json(merchant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMerchantProducts = async (req, res) => {
  try {
    const products = await MerchantService.getMerchantProducts(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMerchant = async (req, res) => {
    try {
      const updatedMerchant = await MerchantService.updateMerchant(req.params.id, req.body);
      res.status(200).json(updatedMerchant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
  exports.deleteMerchant = async (req, res) => {
    try {
      await MerchantService.deleteMerchant(req.params.id);
      res.status(204).send(); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};