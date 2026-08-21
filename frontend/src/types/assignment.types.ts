import type { Submission } from "./submission.types";

export interface Teacher {
  id: number;
  name: string;
  email: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  fileName: string;
  filePublicId: string;
  fileType: string;
  fileUrl: string;
  teacherId: number;
  teacher: Teacher;
  grade: number;
  feedback: string;

  submissions: Submission[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentResponse {
  assignments: Assignment[];
  message: string;
}

export interface IndvidualAssignment {
  message: string;
  assignment: Assignment;
}
