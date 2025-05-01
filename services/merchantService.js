const prisma = require('../generated/prisma');

exports.registerMerchant = async (data) => {
  const { name } = data;
  const merchant = await prisma.merchant.create({
    data: {
      name,
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
    data : {
      name : data.name,
    },
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

