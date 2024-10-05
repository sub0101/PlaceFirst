/*
  Warnings:

  - Made the column `visitDate` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "visitDate" SET NOT NULL,
ALTER COLUMN "visitDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CompanyApplication" ALTER COLUMN "ctc" DROP NOT NULL;
