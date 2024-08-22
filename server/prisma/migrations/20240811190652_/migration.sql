/*
  Warnings:

  - Added the required column `status` to the `Godine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Godine" ADD COLUMN     "status" BOOLEAN NOT NULL;
