/*
  Warnings:

  - A unique constraint covering the columns `[skladisteId,artikliId]` on the table `SkladisteArtikli` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SkladisteArtikli_skladisteId_artikliId_key" ON "SkladisteArtikli"("skladisteId", "artikliId");
