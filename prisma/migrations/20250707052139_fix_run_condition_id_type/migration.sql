/*
  Warnings:

  - The primary key for the `RunCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RunCondition" DROP CONSTRAINT "RunCondition_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RunCondition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RunCondition_id_seq";
