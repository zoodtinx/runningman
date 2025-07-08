/*
  Warnings:

  - You are about to drop the column `parentId` on the `RunCondition` table. All the data in the column will be lost.
  - You are about to drop the `OutdoorStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OverallCondition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OutdoorStat" DROP CONSTRAINT "OutdoorStat_userId_fkey";

-- DropForeignKey
ALTER TABLE "OverallCondition" DROP CONSTRAINT "OverallCondition_userId_fkey";

-- DropForeignKey
ALTER TABLE "RunCondition" DROP CONSTRAINT "RunCondition_parentId_fkey";

-- AlterTable
ALTER TABLE "RunCondition" DROP COLUMN "parentId";

-- DropTable
DROP TABLE "OutdoorStat";

-- DropTable
DROP TABLE "OverallCondition";
