/*
  Warnings:

  - Added the required column `fileId` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Made the column `fileUrl` on table `Resume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "fileId" TEXT NOT NULL,
ALTER COLUMN "fileUrl" SET NOT NULL;
