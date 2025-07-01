/*
  Warnings:

  - Made the column `runType` on table `Run` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateTime` on table `Run` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Run" ALTER COLUMN "runType" SET NOT NULL,
ALTER COLUMN "dateTime" SET NOT NULL;
