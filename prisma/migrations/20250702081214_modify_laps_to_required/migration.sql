/*
  Warnings:

  - Made the column `laps` on table `Run` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Run" ALTER COLUMN "laps" SET NOT NULL;
