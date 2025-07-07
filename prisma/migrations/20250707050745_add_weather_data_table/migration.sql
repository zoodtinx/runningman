-- CreateTable
CREATE TABLE "RunCondition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "futureValue" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RunCondition_pkey" PRIMARY KEY ("id")
);
