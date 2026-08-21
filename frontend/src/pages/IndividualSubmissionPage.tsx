import { CalendarDays, Download, FileText } from "lucide-react";
import { Link, useParams } from "react-router";
import { useGetTeacherIndividualSubmissionsQuery } from "../redux/slices/submissionApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import type { Submission } from "../types/submission.types";
import GradeSubmissionForm from "../components/GradeSubmissionForm";

const IndividualSubmissionPage = () => {
  const { id } = useParams<{ id: string }>();
  //   console.log(id);

  const {
    data: submissions,
    isLoading,
    isError,
  } = useGetTeacherIndividualSubmissionsQuery(id || "");
  // console.log(submissions);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load submissions." />
      ) : submissions?.submissions.length === 0 ? (
        <Message message="No submissions found for this assignment." />
      ) : (
        <div className="min-h-screen bg-base-200 px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/teacher/submissions"
              className="mb-6 inline-block text-sm font-medium hover:underline"
            >
              ← Back to Submissions
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl font-bold md:text-3xl">
                Assignment Submissions
              </h1>

              <p className="mt-2 text-base-content/60">
                Review submissions from students for this assignment.
              </p>

              <p className="mt-2 text-sm text-base-content/50">
                Assignment ID: {id}
              </p>
            </div>

            <div className="space-y-6">
              {submissions?.submissions.map((submission: Submission) => (
                <div
                  key={submission.id}
                  className="rounded-xl bg-base-100 p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {submission.student.name}
                      </h2>

                      <p className="mt-1 text-sm text-base-content/50">
                        {submission.student.email}
                      </p>
                    </div>

                    <span
                      className={`badge ${
                        submission.status === "GRADED"
                          ? "badge-success text-white"
                          : "badge-warning text-white"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-base-content/50">
                        Submitted Date
                      </p>

                      <div className="mt-1 flex items-center gap-2 font-medium">
                        <CalendarDays size={16} />

                        {new Date(submission.submittedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/50">
                        Assignment ID
                      </p>

                      <p className="mt-1 font-medium">
                        {submission.assignmentId}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-base-300 pt-6">
                    <h3 className="mb-3 font-semibold">Submitted File</h3>

                    <div className="flex flex-col gap-4 rounded-lg border border-base-300 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <FileText size={20} />
                        </div>

                        <div>
                          <p className="font-medium">{submission.fileName}</p>

                          <p className="text-sm text-base-content/50">
                            {submission.fileType}
                          </p>
                        </div>
                      </div>

                      <a
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline"
                      >
                        <Download size={16} />
                        View File
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-base-300 pt-6">
                    {submission.status === "GRADED" ? (
                      <div>
                        <h3 className="font-semibold">Grade & Feedback</h3>

                        <div className="mt-4 rounded-lg bg-base-200 p-4">
                          <p className="font-semibold">
                            Grade: {submission.grade} / 100
                          </p>

                          <p className="mt-2 text-sm text-base-content/70">
                            {submission.feedback || "No feedback provided."}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <GradeSubmissionForm submissionId={submission.id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualSubmissionPage;
