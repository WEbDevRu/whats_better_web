/*
  Warnings:

  - You are about to drop the column `desctiption` on the `ComparisionCategory` table. All the data in the column will be lost.
  - Added the required column `description` to the `ComparisionCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComparisionCategory" DROP COLUMN "desctiption",
ADD COLUMN     "description" TEXT NOT NULL;
