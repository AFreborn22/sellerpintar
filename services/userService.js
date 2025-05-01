const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../generated/prisma');
require('dotenv').config();

exports.register = async (data) => {
  const { username, email, password} = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
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

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRETKEY, { expiresIn: '30m' });
  return token;
};