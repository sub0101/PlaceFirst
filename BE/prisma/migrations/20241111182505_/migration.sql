/*
  Warnings:

  - You are about to drop the column `status` on the `CompanyApplication` table. All the data in the column will be lost.
  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_companyApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_studentId_fkey";

-- AlterTable
ALTER TABLE "CompanyApplication" DROP COLUMN "status",
ADD COLUMN     "placementStatus" JSONB;

-- DropTable
DROP TABLE "Applicant";
