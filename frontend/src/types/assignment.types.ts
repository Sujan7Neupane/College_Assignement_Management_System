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
