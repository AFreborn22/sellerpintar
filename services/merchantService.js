const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.registerMerchant = async (userId, data) => {
  const { name } = data;
  const merchant = await prisma.merchant.create({
    data: {
      name,
      user: {
        connect: { id: userId }, 
      },
    },
  });
  return merchant;
};

exports.getMerchantProducts = async (id) => {
  const products = await prisma.product.findMany({
    where: { 
      id: parseInt(id, 10),
     },
  });
  return products;
};

exports.updateMerchant = async (id, data) => {
  const merchant = await prisma.merchant.findUnique({
    where: { 
      id: parseInt(id, 10),
     },
  });

  if (!merchant) {
    throw new Error('Merchant not found');
  }

  const updatedMerchant = await prisma.merchant.update({
    where: { id: parseInt(id, 10), },
    data : {
      name : data.name,
    },
  });

  return updatedMerchant;
};

exports.deleteMerchant = async (id) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: parseInt(id, 10), },
  });

  if (!merchant) {
    throw new Error('Merchant not found');
  }

  await prisma.merchant.delete({
    where: { id: parseInt(id, 10), },
  });
};

