/*
  Warnings:

  - You are about to drop the column `cgpa` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `precentage` on the `Education` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "status" SET DEFAULT 'applied';

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "cgpa",
DROP COLUMN "precentage",
ADD COLUMN     "grade" DOUBLE PRECISION;
