/*
  Warnings:

  - A unique constraint covering the columns `[redniBroj]` on the table `Dokumenti` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Dokumenti_vrstaDokumentaId_redniBroj_key";

-- CreateIndex
CREATE UNIQUE INDEX "Dokumenti_redniBroj_key" ON "Dokumenti"("redniBroj");
