/*
  Warnings:

  - You are about to drop the column `defaultRouteId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultRouteId",
ADD COLUMN     "location" TEXT;
