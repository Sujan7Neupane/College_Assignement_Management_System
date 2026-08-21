import { CalendarDays, Download, FileText } from "lucide-react";
import { useGetStudentSubmissionsQuery } from "../redux/slices/submissionApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const StudentSubmissionsPage = () => {
  const {
    data: submissions,
    isLoading,
    isError,
  } = useGetStudentSubmissionsQuery();

  // console.log(submissions);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load submissions." />
      ) : (
        <div className="min-h-screen bg-base-200 px-4 py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold md:text-3xl">My Submissions</h1>

              <p className="mt-2 text-base-content/60">
                View your submitted assignments and their status.
              </p>
            </div>

            {(submissions?.submissions?.length ?? 0) > 0 ? (
              <div className="space-y-6">
                {submissions?.submissions?.map((submission) => (
                  <div
                    key={submission.id}
                    className="rounded-xl bg-base-100 p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 border-b border-base-300 pb-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {submission.assignment.title}
                        </h2>

                        <p className="mt-1 text-sm text-base-content/50">
                          Assignment ID: {submission.assignment.id}
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

                    <div className="mt-6">
                      <p className="text-sm text-base-content/50">
                        Assignment Description
                      </p>

                      <p className="mt-1 leading-6 text-base-content/70">
                        {submission.assignment.description}
                      </p>
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
                        <p className="text-sm text-base-content/50">Due Date</p>

                        <div className="mt-1 flex items-center gap-2 font-medium">
                          <CalendarDays size={16} />

                          {new Date(
                            submission.assignment.dueDate,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
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
                      <h3 className="font-semibold">Grade & Feedback</h3>

                      {submission.status === "GRADED" ? (
                        <div className="mt-4 space-y-3">
                          <div>
                            <p className="text-sm text-base-content/50">
                              Grade
                            </p>

                            <p className="mt-1 text-xl font-bold">
                              {submission.grade}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-base-content/50">
                              Feedback
                            </p>

                            <p className="mt-1 leading-6 text-base-content/70">
                              {submission.feedback || "No feedback provided."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-lg bg-base-200 p-4">
                          <p className="text-sm text-base-content/60">
                            Your submission has not been graded yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Message message="You haven't submitted any assignments yet." />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSubmissionsPage;
