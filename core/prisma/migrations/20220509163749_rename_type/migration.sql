/*
  Warnings:

  - The values [INTAGRATED_VIDEO] on the enum `ComparisonEntityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComparisonEntityType_new" AS ENUM ('INTEGRATED_VIDEO', 'IMAGE', 'TEXT');
ALTER TABLE "ComparisonEntity" ALTER COLUMN "type" TYPE "ComparisonEntityType_new" USING ("type"::text::"ComparisonEntityType_new");
ALTER TYPE "ComparisonEntityType" RENAME TO "ComparisonEntityType_old";
ALTER TYPE "ComparisonEntityType_new" RENAME TO "ComparisonEntityType";
DROP TYPE "ComparisonEntityType_old";
COMMIT;
