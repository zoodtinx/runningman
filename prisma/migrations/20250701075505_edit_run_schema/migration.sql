/*
  Warnings:

  - You are about to drop the column `time` on the `Run` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Run" DROP COLUMN "time",
ADD COLUMN     "dateTime" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL;
