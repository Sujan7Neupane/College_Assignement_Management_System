/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,title]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignment_teacherId_title_key" ON "Assignment"("teacherId", "title");
