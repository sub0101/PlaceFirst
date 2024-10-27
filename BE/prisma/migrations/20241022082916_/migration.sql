-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "status" SET DEFAULT 'Not Placed';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "debarred" BOOLEAN DEFAULT false;
