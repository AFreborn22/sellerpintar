const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.addProduct = async (data) => {
  const { name, merchant_id, price, description, variations } = data;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        merchant: {
          connect: { id: merchant_id },
        },
        description,
        variations: variations
          ? {
              create: variations.map((variation) => ({
                color: variation.color,
                size: variation.size,
                sku: variation.sku,
                stock_count: variation.stock_count,
              })),
            }
          : undefined,
      },
    });
    return product;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};

exports.getAllProducts = async () => {
  try {
    return await prisma.product.findMany({
      include: {
        variations: true,
      },
    });
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

exports.getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        variations: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    throw error;
  }
};

exports.updateProduct = async (id, data) => {
  const { name, variations, price, description } = data;

  try {
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
        variations: variations
          ? {
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
            }
          : undefined,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};

exports.deleteProduct = async (id) => {
  const productId = parseInt(id, 10);

  try {
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
  } catch (error) {
    throw error;
  }
};