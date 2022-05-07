/*
  Warnings:

  - You are about to drop the `ComparisionCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ComparisonEntityType" AS ENUM ('INTAGRATED_VIDEO', 'IMAGE', 'TEXT');

-- DropTable
DROP TABLE "ComparisionCategory";

-- CreateTable
CREATE TABLE "ComparisonCategory" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ComparisonCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonEntity" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "type" "ComparisonEntityType" NOT NULL,

    CONSTRAINT "ComparisonEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonEntity_ComparisonEntityCategory" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comparison_entity-constraint" UUID NOT NULL,
    "comparis_entity_category-constraint" UUID NOT NULL,

    CONSTRAINT "ComparisonEntity_ComparisonEntityCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonEntityCategory" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "link" TEXT NOT NULL,

    CONSTRAINT "ComparisonEntityCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComparisonEntity_ComparisonEntityCategory" ADD CONSTRAINT "ComparisonEntity_ComparisonEntityCategory_comparison_entit_fkey" FOREIGN KEY ("comparison_entity-constraint") REFERENCES "ComparisonEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonEntity_ComparisonEntityCategory" ADD CONSTRAINT "ComparisonEntity_ComparisonEntityCategory_comparis_entity__fkey" FOREIGN KEY ("comparis_entity_category-constraint") REFERENCES "ComparisonEntityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
