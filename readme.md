# Test Backend sellerpintar Node.js Express Prisma App

This project is a Node.js application built with Express.js and Prisma ORM, designed to manage user, merchant, and product data. It follows the MVC architecture and includes separate folders for controllers, services, and routes.

## Features

- User registration and authentication
- Merchant management
- Product management with variations
- Swagger documentation for API endpoints

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js installed on your machine
- PostgreSQL database set up and running

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nodejs-express-prisma-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root directory and add your database connection string:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
   ```

4. Run the Prisma migrations to set up the database schema:

   ```
   npx prisma migrate dev --name init
   ```

### Running the Application

To start the application, run:

```
npm start
```

The server will start on `http://localhost:3000`.
```

## Folder Structure

```
src
├── controllers          # Contains controller files for handling requests
├── routes               # Contains route files for defining API endpoints
├── services             # Contains service files for business logic
├── prisma               # Contains Prisma schema and migrations
├── swagger              # Contains Swagger documentation
├── app.js               # Entry point of the application
```