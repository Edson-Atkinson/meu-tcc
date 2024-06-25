/*
  Warnings:

  - You are about to drop the column `email` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_restaurant_id_fkey";

-- DropIndex
DROP INDEX "Restaurant_email_key";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "email",
DROP COLUMN "isActive",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "restaurant_id";
