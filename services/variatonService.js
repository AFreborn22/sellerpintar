const prisma = require('../generated/prisma');

exports.addVariation = async (data) => {
  const { color, size, productId, stocks } = data;
  const variation = await prisma.variation.create({
    data: {
      color,
      size,
      productId,
      stock_count: {
        create: stocks.map((stock) => ({
          quantity: stock.quantity,
          sku: stock.sku,
        })),
      },
    },
  });

  return variation;
};

exports.getVariationsByProductId = async (productId) => {
  return await prisma.variation.findMany({
    where: { productId },
  });
};