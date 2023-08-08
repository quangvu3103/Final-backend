-- CreateTable
CREATE TABLE "PetAccessories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "PetAccessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- AddForeignKey
ALTER TABLE "PetAccessories" ADD CONSTRAINT "PetAccessories_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
