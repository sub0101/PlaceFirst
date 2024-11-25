/*
  Warnings:

  - You are about to drop the column `placementStatus` on the `CompanyApplication` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyApplication" DROP COLUMN "placementStatus",
ADD COLUMN     "status" BOOLEAN;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "status",
ADD COLUMN     "placementStatus" JSONB;
