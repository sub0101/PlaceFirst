/*
  Warnings:

  - You are about to drop the column `teir` on the `CompanyApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyApplication" DROP COLUMN "teir",
ADD COLUMN     "tier" TEXT;
