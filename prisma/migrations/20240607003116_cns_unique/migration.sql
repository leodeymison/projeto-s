/*
  Warnings:

  - A unique constraint covering the columns `[cns]` on the table `peoples` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "peoples_cns_key" ON "peoples"("cns");
