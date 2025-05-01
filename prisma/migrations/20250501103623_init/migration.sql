/*
  Warnings:

  - You are about to drop the column `userId` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variation` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Variation` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Variation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_count` to the `Variation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_productId_fkey";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "merchantId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "merchant_id" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Variation" DROP COLUMN "productId",
DROP COLUMN "stock",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "stock_count" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
