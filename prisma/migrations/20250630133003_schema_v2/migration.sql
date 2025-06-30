/*
  Warnings:

  - Added the required column `userId` to the `OutdoorStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ScheduleItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OutdoorStat" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Run" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScheduleItem" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'speed';

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutdoorStat" ADD CONSTRAINT "OutdoorStat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleItem" ADD CONSTRAINT "ScheduleItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
