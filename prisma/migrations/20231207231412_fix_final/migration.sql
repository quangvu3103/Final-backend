-- DropIndex
DROP INDEX "OrderDetail_orderId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;
