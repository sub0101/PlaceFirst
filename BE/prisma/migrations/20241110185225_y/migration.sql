/*
  Warnings:

  - The `tier` column on the `CompanyApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('DREAM', 'STANDARD', 'NORMAL');

-- AlterTable
ALTER TABLE "CompanyApplication" DROP COLUMN "tier",
ADD COLUMN     "tier" "Tier";
