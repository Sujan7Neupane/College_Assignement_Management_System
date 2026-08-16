/*
  Warnings:

  - A unique constraint covering the columns `[studentId,assignmentId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Submission_studentId_assignmentId_key" ON "Submission"("studentId", "assignmentId");
