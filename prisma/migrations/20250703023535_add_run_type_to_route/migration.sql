/*
  Warnings:

  - You are about to drop the column `time` on the `Route` table. All the data in the column will be lost.
  - Added the required column `runType` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "time",
ADD COLUMN     "runType" TEXT NOT NULL;
