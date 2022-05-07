/*
  Warnings:

  - You are about to drop the column `link` on the `ComparisonEntityCategory` table. All the data in the column will be lost.
  - Added the required column `link` to the `ComparisonEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComparisonEntity" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ComparisonEntityCategory" DROP COLUMN "link";
