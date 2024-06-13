/*
  Warnings:

  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
