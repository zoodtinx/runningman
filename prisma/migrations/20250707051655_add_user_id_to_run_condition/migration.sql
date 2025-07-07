/*
  Warnings:

  - Added the required column `userId` to the `RunCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunCondition" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;
