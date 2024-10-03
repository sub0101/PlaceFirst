-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "branch" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "department" TEXT,
ALTER COLUMN "contact" DROP NOT NULL;
