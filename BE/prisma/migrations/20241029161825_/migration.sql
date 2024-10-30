/*
  Warnings:

  - You are about to drop the column `status` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "CompanyApplication" ADD COLUMN     "applicationDeadline" TEXT,
ADD COLUMN     "status" BOOLEAN;
