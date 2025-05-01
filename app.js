const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const productRoutes = require('./routes/productRoutes');
const variationRoutes = require('./routes/variatonRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRoutes);
app.use('/merchants', merchantRoutes);  
app.use('/products', productRoutes);
app.use('/variations', variationRoutes);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();