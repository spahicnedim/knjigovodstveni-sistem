/*
  Warnings:

  - You are about to drop the column `drzava` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "drzava",
ADD COLUMN     "drzavaId" INTEGER;

-- CreateTable
CREATE TABLE "Drzave" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "Drzave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_drzavaId_fkey" FOREIGN KEY ("drzavaId") REFERENCES "Drzave"("id") ON DELETE SET NULL ON UPDATE CASCADE;
