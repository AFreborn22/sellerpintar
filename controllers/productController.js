const ProductService = require('../services/productService');

exports.addProduct = async (req, res) => {
  try {
    const product = await ProductService.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.message.includes('Unique constraint failed')) {
      res.status(409).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const products = await ProductService.getProductById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message.includes('Unique constraint failed')) {
      res.status(409).json({ message: error.message }); 
    } else if (error.message === 'Product not found') {
      res.status(404).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.message === 'Product not found') {
      res.status(404).json({ message: error.message }); 
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};