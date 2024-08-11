/*
  Warnings:

  - A unique constraint covering the columns `[vrstaDokumentaId,redniBroj]` on the table `Dokumenti` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `redniBroj` to the `Dokumenti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dokumenti" ADD COLUMN     "knjigeId" INTEGER,
ADD COLUMN     "redniBroj" INTEGER NOT NULL,
ADD COLUMN     "vrstaDokumentaId" INTEGER;

-- CreateTable
CREATE TABLE "VrstaDokumenta" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "VrstaDokumenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VrstaDokumenta_naziv_key" ON "VrstaDokumenta"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "Dokumenti_vrstaDokumentaId_redniBroj_key" ON "Dokumenti"("vrstaDokumentaId", "redniBroj");

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_vrstaDokumentaId_fkey" FOREIGN KEY ("vrstaDokumentaId") REFERENCES "VrstaDokumenta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumenti" ADD CONSTRAINT "Dokumenti_knjigeId_fkey" FOREIGN KEY ("knjigeId") REFERENCES "Knjige"("id") ON DELETE SET NULL ON UPDATE CASCADE;
