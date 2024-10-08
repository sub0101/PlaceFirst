/*
  Warnings:

  - You are about to drop the column `durationOfInternship` on the `CompanyApplication` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfHiring` on the `CompanyApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyApplication" DROP COLUMN "durationOfInternship",
DROP COLUMN "typeOfHiring",
ADD COLUMN     "assessmentDate" TEXT,
ADD COLUMN     "internshipDuration" TEXT,
ADD COLUMN     "interviewDate" TEXT,
ADD COLUMN     "pptDate" TEXT;
