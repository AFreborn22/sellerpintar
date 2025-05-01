const VariationService = require('../services/variatonService')

exports.addVariation = async (req, res) => {
  try {
    const variation = await VariationService.addVariation(req.body);
    res.status(201).json(variation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVariations = async (req, res) => {
  try {
    const variations = await VariationService.getAllVariations();
    res.status(200).json(variations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};