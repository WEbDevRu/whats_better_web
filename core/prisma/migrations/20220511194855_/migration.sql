/*
  Warnings:

  - You are about to drop the `ComparisonEntity_ComparisonEntityCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComparisonEntity_ComparisonEntityCategory" DROP CONSTRAINT "ComparisonEntity_ComparisonEntityCategory_comparis_entity__fkey";

-- DropForeignKey
ALTER TABLE "ComparisonEntity_ComparisonEntityCategory" DROP CONSTRAINT "ComparisonEntity_ComparisonEntityCategory_comparison_entit_fkey";

-- DropTable
DROP TABLE "ComparisonEntity_ComparisonEntityCategory";

-- CreateTable
CREATE TABLE "_ComparisonEntityToComparisonEntityCategory" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ComparisonEntityToComparisonEntityCategory_AB_unique" ON "_ComparisonEntityToComparisonEntityCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ComparisonEntityToComparisonEntityCategory_B_index" ON "_ComparisonEntityToComparisonEntityCategory"("B");

-- AddForeignKey
ALTER TABLE "_ComparisonEntityToComparisonEntityCategory" ADD CONSTRAINT "_ComparisonEntityToComparisonEntityCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "ComparisonEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComparisonEntityToComparisonEntityCategory" ADD CONSTRAINT "_ComparisonEntityToComparisonEntityCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ComparisonEntityCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
