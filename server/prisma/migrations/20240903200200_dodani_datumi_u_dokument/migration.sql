/*
  Warnings:

  - You are about to drop the column `datum` on the `Dokumenti` table. All the data in the column will be lost.
  - Added the required column `datumIzdavanjaDokumenta` to the `Dokumenti` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datumKreiranjaKalkulacije` to the `Dokumenti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dokumenti" DROP COLUMN "datum",
ADD COLUMN     "datumIzdavanjaDokumenta" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "datumKreiranjaKalkulacije" TIMESTAMP(3) NOT NULL;
