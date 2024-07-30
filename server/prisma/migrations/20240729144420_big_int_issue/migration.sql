/*
  Warnings:

  - You are about to alter the column `fax` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `telefon` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `IDbroj` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `PDVbroj` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "fax" SET DATA TYPE INTEGER,
ALTER COLUMN "telefon" SET DATA TYPE INTEGER,
ALTER COLUMN "IDbroj" SET DATA TYPE INTEGER,
ALTER COLUMN "PDVbroj" SET DATA TYPE INTEGER;
