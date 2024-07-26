/*
  Warnings:

  - A unique constraint covering the columns `[PDV_broj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ID_broj]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ID_broj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PDV_broj` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresa` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drzava` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fax` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obveznik_pdv` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefon` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valuta` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `web` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "ID_broj" INTEGER NOT NULL,
ADD COLUMN     "PDV_broj" INTEGER NOT NULL,
ADD COLUMN     "adresa" TEXT NOT NULL,
ADD COLUMN     "drzava" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fax" INTEGER NOT NULL,
ADD COLUMN     "obveznik_pdv" BOOLEAN NOT NULL,
ADD COLUMN     "telefon" INTEGER NOT NULL,
ADD COLUMN     "valuta" TEXT NOT NULL,
ADD COLUMN     "web" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GradoviCompany" (
    "companyId" INTEGER NOT NULL,
    "gradId" INTEGER NOT NULL,

    CONSTRAINT "GradoviCompany_pkey" PRIMARY KEY ("companyId","gradId")
);

-- CreateTable
CREATE TABLE "Gradovi" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "postanski_broj" INTEGER NOT NULL,

    CONSTRAINT "Gradovi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racun" (
    "id" SERIAL NOT NULL,
    "naziv_banke" TEXT NOT NULL,
    "br_racuna" INTEGER NOT NULL,
    "devizni" BOOLEAN NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Racun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Djelatnost" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "sifra" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Djelatnost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Racun_companyId_key" ON "Racun"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Djelatnost_companyId_key" ON "Djelatnost"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_PDV_broj_key" ON "Company"("PDV_broj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ID_broj_key" ON "Company"("ID_broj");

-- AddForeignKey
ALTER TABLE "GradoviCompany" ADD CONSTRAINT "GradoviCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradoviCompany" ADD CONSTRAINT "GradoviCompany_gradId_fkey" FOREIGN KEY ("gradId") REFERENCES "Gradovi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Racun" ADD CONSTRAINT "Racun_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Djelatnost" ADD CONSTRAINT "Djelatnost_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
