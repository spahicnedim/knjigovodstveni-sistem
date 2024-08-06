/*
  Warnings:

  - Added the required column `kupacDobavljacID` to the `Racun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Racun" ADD COLUMN     "kupacDobavljacID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "KupacDobavljac" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "adresa" TEXT,
    "sjedisteId" INTEGER,
    "drzavaId" INTEGER,
    "PDVbroj" TEXT,
    "IDbroj" TEXT,
    "valuta" TEXT,
    "djelatnostId" INTEGER,
    "obveznikPDV" BOOLEAN,
    "telefon" TEXT,
    "fax" TEXT,
    "email" TEXT,
    "web" TEXT,
    "kupac" BOOLEAN,
    "dobavljac" BOOLEAN,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "KupacDobavljac_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KupacDobavljac" ADD CONSTRAINT "KupacDobavljac_sjedisteId_fkey" FOREIGN KEY ("sjedisteId") REFERENCES "Gradovi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KupacDobavljac" ADD CONSTRAINT "KupacDobavljac_drzavaId_fkey" FOREIGN KEY ("drzavaId") REFERENCES "Drzave"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KupacDobavljac" ADD CONSTRAINT "KupacDobavljac_djelatnostId_fkey" FOREIGN KEY ("djelatnostId") REFERENCES "Djelatnost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KupacDobavljac" ADD CONSTRAINT "KupacDobavljac_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Racun" ADD CONSTRAINT "Racun_kupacDobavljacID_fkey" FOREIGN KEY ("kupacDobavljacID") REFERENCES "KupacDobavljac"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
