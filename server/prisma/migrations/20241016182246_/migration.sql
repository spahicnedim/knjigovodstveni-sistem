/*
  Warnings:

  - A unique constraint covering the columns `[artikliId,skladisteId]` on the table `SkladisteArtikli` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SkladisteArtikli_artikliId_skladisteId_key" ON "SkladisteArtikli"("artikliId", "skladisteId");
