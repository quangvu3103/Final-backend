/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetAccessories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateOrder` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetAccessories" DROP CONSTRAINT "PetAccessories_brandId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dateOrder" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "PetAccessories";
