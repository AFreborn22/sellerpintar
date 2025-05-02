const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.addProduct = async (data) => {
  const { name, merchant_id, price, description, variations } = data;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      merchant: {
        connect: { id: merchant_id }, 
      },
      description,
      variations: {
        create: variations.map((variation) => ({
          color: variation.color,
          size: variation.size,
          sku: variation.sku,
          stock_count: variation.stock_count, 
        })),
      },
    },
  });
  return product;
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      variations: true
    },
  });
};

exports.updateProduct = async (id, data) => {
  const { name, variations, price, description } = data;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return await prisma.product.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      price,
      description,
      variations: {
        upsert: variations.map((variation) => ({
          where: { sku: variation.sku }, 
          update: {
            color: variation.color,
            size: variation.size,
            stock_count: variation.stock_count,
          },
          create: {
            color: variation.color,
            size: variation.size,
            sku: variation.sku,
            stock_count: variation.stock_count, 
          },
        })),
      },
    },
  });
};

exports.getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      variations: true
    },
  });
};

exports.deleteProduct = async (id) => {
  const productId = parseInt(id, 10);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  await prisma.variation.deleteMany({
    where: { product_id: productId },
  });

  await prisma.product.delete({
    where: { id: productId },
  });
};