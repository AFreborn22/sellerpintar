const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.registerMerchant = async (userId, data) => {
  const { name } = data;

  try {
    const merchant = await prisma.merchant.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
      },
    });
    return merchant;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};

exports.getMerchantProducts = async (id) => {
  try {
    const products = await prisma.product.findMany({
      where: { merchant_id: parseInt(id, 10) }, 
    });

    if (!products || products.length === 0) {
      throw new Error('No products found for this merchant');
    }

    return products;
  } catch (error) {
    throw error;
  }
};

exports.updateMerchant = async (id, data) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!merchant) {
      throw new Error('Merchant not found');
    }

    const updatedMerchant = await prisma.merchant.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: data.name,
      },
    });

    return updatedMerchant;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Unique constraint failed on field: ${error.meta.target}`);
    }
    throw error;
  }
};

exports.deleteMerchant = async (id) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!merchant) {
      throw new Error('Merchant not found');
    }

    await prisma.merchant.delete({
      where: { id: parseInt(id, 10) },
    });
  } catch (error) {
    throw error;
  }
};

