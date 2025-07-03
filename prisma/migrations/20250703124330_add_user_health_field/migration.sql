/*
  Warnings:

  - You are about to drop the column `distance` on the `ScheduleItem` table. All the data in the column will be lost.
  - You are about to drop the column `runType` on the `ScheduleItem` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ScheduleItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScheduleItem" DROP COLUMN "distance",
DROP COLUMN "runType",
DROP COLUMN "time";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;
