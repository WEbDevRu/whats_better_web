-- CreateTable
CREATE TABLE "Comparision" (
    "id" UUID NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Comparision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComparisionToComparisonEntity" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ComparisionToComparisonEntity_AB_unique" ON "_ComparisionToComparisonEntity"("A", "B");

-- CreateIndex
CREATE INDEX "_ComparisionToComparisonEntity_B_index" ON "_ComparisionToComparisonEntity"("B");

-- AddForeignKey
ALTER TABLE "Comparision" ADD CONSTRAINT "Comparision_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ComparisonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComparisionToComparisonEntity" ADD CONSTRAINT "_ComparisionToComparisonEntity_A_fkey" FOREIGN KEY ("A") REFERENCES "Comparision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComparisionToComparisonEntity" ADD CONSTRAINT "_ComparisionToComparisonEntity_B_fkey" FOREIGN KEY ("B") REFERENCES "ComparisonEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
