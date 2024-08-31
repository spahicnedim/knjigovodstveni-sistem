/*
  Warnings:

  - You are about to drop the column `Akrivan` on the `PDV` table. All the data in the column will be lost.
  - Added the required column `Aktivan` to the `PDV` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PDV" DROP COLUMN "Akrivan",
ADD COLUMN     "Aktivan" BOOLEAN NOT NULL;
