/*
  Warnings:

  - You are about to drop the column `userId` on the `RunCondition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RunCondition" DROP CONSTRAINT "RunCondition_userId_fkey";

-- AlterTable
ALTER TABLE "RunCondition" DROP COLUMN "userId";
