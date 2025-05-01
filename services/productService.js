const prisma = require('../generated/prisma');

exports.addProduct = async (data) => {
  const { name, id, variations } = data;
  const product = await prisma.product.create({
    data: {
      name,
      id,
      variations: {
        create: variations.map((variation) => ({
          color: variation.color,
          size: variation.size,
          stock: {
            create: variation.stocks.map((stock) => ({
              quantity: stock.quantity,
              sku: stock.sku,
            })),
          },
        })),
      },
    },
  });
  return product;
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      variations: {
        include: {
          stock: true,
        },
      },
    },
  });
};

exports.updateProduct = async (id, data) => {
  const { name, variations } = data;
  return await prisma.product.update({
    where: { id },
    data: {
      name,
      variations: {
        create: variations.map((variation) => ({
          color: variation.color,
          size: variation.size,
          stock: {
            create: variation.stocks.map((stock) => ({
              quantity: stock.quantity,
              sku: stock.sku,
            })),
          },
        })),
      },
    },
  });
};

exports.getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      variations: {
        include: {
          stock: true,
        },
      },
    },
  });
};

exports.deleteProduct = async (id) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: id },
  });

  if (!merchant) {
    throw new Error('Merchant not found');
  }

  await prisma.merchant.delete({
    where: { id: id },
  });
};