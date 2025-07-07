/*
  Warnings:

  - Changed the type of `range` on the `OverallCondition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `range` on the `RunCondition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OverallCondition" DROP COLUMN "range",
ADD COLUMN     "range" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RunCondition" DROP COLUMN "range",
ADD COLUMN     "range" INTEGER NOT NULL;
