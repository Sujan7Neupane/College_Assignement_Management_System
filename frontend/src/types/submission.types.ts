type SubmissionStatus = "PENDING" | "GRADED";

export interface Submission {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  status: SubmissionStatus;
}
