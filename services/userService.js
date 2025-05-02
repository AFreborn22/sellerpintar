const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
require('dotenv').config();

exports.register = async (data) => {
  const { name, email, password } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error(`Email already in use`);
    }
    throw error;
  }
};

exports.login = async (data) => {
  const { email, password } = data;

  try {
    const user = await prisma.User.findUnique({
      where: { email },
    });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRETKEY,
      { expiresIn: '30m' }
    );

    return { user, token };
  } catch (error) {
    throw error;
  }
};