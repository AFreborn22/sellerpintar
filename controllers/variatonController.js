const VariationService = require('../services/variatonService')

exports.addVariation = async (req, res) => {
  try {
    const variation = await VariationService.addVariation(req.body);
    res.status(201).json(variation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVariationsByProductId = async (req, res) => {
  try {
    const { product_id } = req.params; 
    const variations = await VariationService.getVariationsByProductId(product_id);
    res.status(200).json(variations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVariation = async (req, res) => {
  try {
    const { id } = req.params; 
    const variation = await VariationService.updateVariation(id, req.body);
    res.status(200).json(variation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};