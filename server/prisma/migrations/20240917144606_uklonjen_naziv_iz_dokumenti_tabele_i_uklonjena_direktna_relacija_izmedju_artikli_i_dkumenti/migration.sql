/*
  Warnings:

  - You are about to drop the column `naziv` on the `Dokumenti` table. All the data in the column will be lost.
  - You are about to drop the `_ArtikliDokumenti` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtikliDokumenti" DROP CONSTRAINT "_ArtikliDokumenti_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtikliDokumenti" DROP CONSTRAINT "_ArtikliDokumenti_B_fkey";

-- AlterTable
ALTER TABLE "Dokumenti" DROP COLUMN "naziv";

-- DropTable
DROP TABLE "_ArtikliDokumenti";
