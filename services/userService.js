const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../generated/prisma');

exports.register = async (data) => {
  const { username, email, password, merchantName, merchantDescription } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      merchants: {
        create: {
          name: merchantName,
          description: merchantDescription,
        },
      },
    },
  });

  return user;
};

exports.login = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret');
  return token;
};