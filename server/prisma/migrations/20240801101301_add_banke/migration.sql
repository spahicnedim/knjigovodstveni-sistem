/*
  Warnings:

  - You are about to drop the column `naziv_banke` on the `Racun` table. All the data in the column will be lost.
  - Added the required column `nazivId` to the `Racun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Racun" DROP COLUMN "naziv_banke",
ADD COLUMN     "nazivId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Banke" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "Banke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Racun" ADD CONSTRAINT "Racun_nazivId_fkey" FOREIGN KEY ("nazivId") REFERENCES "Banke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
