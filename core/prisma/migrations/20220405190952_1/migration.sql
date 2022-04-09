-- CreateTable
CREATE TABLE "ComparisionCategory" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "desctiption" TEXT NOT NULL,

    CONSTRAINT "ComparisionCategory_pkey" PRIMARY KEY ("id")
);
