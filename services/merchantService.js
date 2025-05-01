const prisma = require('../generated/prisma');

exports.registerMerchant = async (data) => {
  const { name, userId } = data;
  const merchant = await prisma.merchant.create({
    data: {
      name,
      userId,
    },
  });
  return merchant;
};

exports.getMerchantProducts = async (id) => {
  const products = await prisma.product.findMany({
    where: { id },
  });
  return products;
};

exports.updateMerchant = async (id, data) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: id },
  });

  if (!merchant) {
    throw new Error('Merchant not found');
  }

  const updatedMerchant = await prisma.merchant.update({
    where: { id: id },
    data,
  });

  return updatedMerchant;
};

exports.deleteMerchant = async (id) => {
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

