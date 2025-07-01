/*
  Warnings:

  - You are about to drop the column `title` on the `OutdoorStat` table. All the data in the column will be lost.
  - Added the required column `label` to the `OutdoorStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `range` to the `OutdoorStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueType` to the `OutdoorStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OutdoorStat" DROP COLUMN "title",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "range" TEXT NOT NULL,
ADD COLUMN     "valueType" TEXT NOT NULL;
