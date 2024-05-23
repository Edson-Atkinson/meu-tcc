/*
  Warnings:

  - You are about to drop the column `orderId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "orderId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_addressId_key" ON "Order"("addressId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
