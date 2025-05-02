const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.addVariation = async (data) => {
  const { color, size, product_id, sku, stock_count } = data;

  try {
    const variation = await prisma.variation.create({
      data: {
        color,
        size,
        sku,
        stock_count,
        product: {
          connect: { id: product_id },
        },
      },
    });

    return variation;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};

exports.getVariationsByProductId = async (product_id) => {
  try {
    if (!product_id || isNaN(product_id)) {
      throw new Error('Invalid product_id');
    }

    const variations = await prisma.variation.findMany({
      where: { product_id: parseInt(product_id, 10) },
    });

    if (!variations || variations.length === 0) {
      throw new Error('No variations found for this product');
    }

    return variations;
  } catch (error) {
    throw error;
  }
};

exports.updateVariation = async (id, data) => {
  const { color, size, stock_count } = data;

  try {
    const variationExists = await prisma.variation.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!variationExists) {
      throw new Error('Variation not found');
    }

    const variation = await prisma.variation.update({
      where: { id: parseInt(id, 10) },
      data: {
        color,
        size,
        stock_count,
      },
    });

    return variation;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};