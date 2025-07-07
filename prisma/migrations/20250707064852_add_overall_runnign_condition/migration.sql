/*
  Warnings:

  - A unique constraint covering the columns `[overallConditionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentId` to the `RunCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunCondition" ADD COLUMN     "parentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "overallConditionId" TEXT;

-- CreateTable
CREATE TABLE "OverallCondition" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OverallCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OverallCondition_userId_key" ON "OverallCondition"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_overallConditionId_key" ON "User"("overallConditionId");

-- AddForeignKey
ALTER TABLE "OverallCondition" ADD CONSTRAINT "OverallCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunCondition" ADD CONSTRAINT "RunCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunCondition" ADD CONSTRAINT "RunCondition_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OverallCondition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
