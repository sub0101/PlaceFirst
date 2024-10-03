-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Student',

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_user_id_key" ON "Auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Auth"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Auth"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
