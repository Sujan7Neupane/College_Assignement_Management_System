import type { Assignment } from "./assignment.types";

type SubmissionStatus = "PENDING" | "GRADED";

interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Submission {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  status: SubmissionStatus;
  assignment: Assignment;
  assignmentId: string;
  student: Student;
  submittedAt: string;
  grade: number;
  feedback: string;
}

export interface GradeSubmission {
  id: number;
  grade: number;
  feedback: string;
}

export interface SubmissionResponse {
  submissions: Submission[];
  message: string;
}
