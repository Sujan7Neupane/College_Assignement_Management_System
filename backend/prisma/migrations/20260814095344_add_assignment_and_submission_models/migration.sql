-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('SUBMITTED', 'GRADED');

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT,
    "fileName" TEXT,
    "fileType" TEXT,
    "teacherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grade" DOUBLE PRECISION,
    "feedback" TEXT,
    "studentId" INTEGER NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "assignmentId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
