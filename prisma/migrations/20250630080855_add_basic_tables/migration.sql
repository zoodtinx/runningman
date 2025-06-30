/*
  Warnings:

  - Added the required column `notificationEnabled` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredUnits` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultRouteId" TEXT,
ADD COLUMN     "notificationEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "preferredUnits" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,
    "laps" INTEGER,
    "location" TEXT,
    "runType" TEXT,
    "mood" TEXT,
    "gear" TEXT,
    "note" TEXT,
    "routeId" TEXT,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutdoorStat" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "detail" TEXT,

    CONSTRAINT "OutdoorStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "distance" DOUBLE PRECISION,
    "time" INTEGER,
    "laps" INTEGER,
    "location" TEXT,
    "note" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleItem" (
    "id" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION,
    "time" INTEGER,
    "routeId" TEXT,
    "runType" TEXT,

    CONSTRAINT "ScheduleItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleItem" ADD CONSTRAINT "ScheduleItem_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
