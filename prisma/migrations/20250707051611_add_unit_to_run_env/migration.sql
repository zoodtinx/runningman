/*
  Warnings:

  - Added the required column `unit` to the `RunCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RunCondition" ADD COLUMN     "unit" TEXT NOT NULL;
