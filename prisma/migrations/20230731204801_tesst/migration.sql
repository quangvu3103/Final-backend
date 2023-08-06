/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_email_key" ON "RefreshToken"("email");
