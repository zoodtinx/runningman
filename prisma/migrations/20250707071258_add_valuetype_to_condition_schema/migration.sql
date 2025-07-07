/*
  Warnings:

  - Added the required column `valueType` to the `RunCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunCondition" ADD COLUMN     "valueType" TEXT NOT NULL;
