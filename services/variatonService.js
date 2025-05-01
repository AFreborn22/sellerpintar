const prisma = require('../generated/prisma');

exports.addVariation = async (data) => {
  const { color, size, id, stocks } = data;
  const variation = await prisma.variation.create({
    data: {
      color,
      size,
      id,
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

exports.getVariationsByProductId = async (id) => {
  return await prisma.variation.findMany({
    where: { id },
  });
};