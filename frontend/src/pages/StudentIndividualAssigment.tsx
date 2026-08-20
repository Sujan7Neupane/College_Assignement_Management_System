import { CalendarDays, Download, FileText } from "lucide-react";
import { Link, useParams } from "react-router";
import { useGetAssignmentByIdQuery } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useSubmitAssignmentMutation } from "../redux/slices/submissionApiSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const StudentIndividualAssigment = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentByIdQuery(id || "");

  //   console.log(assignment);

  const [submitAssignment, { isLoading: isSubmissionLoading }] =
    useSubmitAssignmentMutation();

  // to catch formData
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitAssignment = async () => {
    if (!file || !id) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await submitAssignment({
        id,
        formData,
      }).unwrap();
      //   console.log(response);

      toast.success(response.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Failed to Upload Assignmnt");
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load assignment." />
      ) : assignment?.assignment ? (
        <div className="min-h-screen bg-base-200 px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/student/assignments"
              className="mb-6 inline-block text-sm font-medium hover:underline"
            >
              ← Back to Assignments
            </Link>

            <div className="rounded-xl bg-base-100 p-6 shadow-sm md:p-8">
              <div className="border-b border-base-300 pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold md:text-3xl">
                      {assignment.assignment.title}
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                      Assignment ID: {assignment.assignment.id}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`badge ${
                        assignment.assignment.submissions.length > 0
                          ? "badge-success text-white"
                          : "badge-warning text-white"
                      }`}
                    >
                      {assignment.assignment.submissions.length > 0
                        ? "Submitted"
                        : "Not Submitted"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:gap-8">
                  <div>
                    <p className="font-medium">Teacher</p>

                    <p className="text-base-content/50">
                      {assignment.assignment.teacher.name}
                    </p>

                    <p className="text-sm text-base-content/50">
                      {assignment.assignment.teacher.email}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Due Date</p>

                    <div className="flex items-center gap-2 text-base-content/50">
                      <CalendarDays size={16} />

                      {new Date(
                        assignment.assignment.dueDate,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <h2 className="mb-3 text-lg font-semibold">Description</h2>

                <p className="leading-7 text-base-content/70">
                  {assignment.assignment.description}
                </p>
              </div>

              <div className="border-t border-base-300 pt-6">
                <h2 className="mb-3 text-lg font-semibold">Assignment File</h2>

                <div className="flex flex-col gap-4 rounded-lg border border-base-300 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <FileText size={20} />
                    </div>

                    <div>
                      <p className="font-medium">
                        {assignment.assignment.fileName}
                      </p>

                      <p className="text-sm text-base-content/50">
                        {assignment.assignment.fileType}
                      </p>
                    </div>
                  </div>

                  <a
                    href={assignment.assignment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    <Download size={16} />
                    View File
                  </a>
                </div>
              </div>

              {assignment.assignment.submissions.length > 0 && (
                <div className="mt-8 border-t border-base-300 pt-6">
                  <h2 className="text-lg font-semibold">Your Submission</h2>

                  <div className="mt-4 rounded-lg border border-base-300 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-success/10 p-2 text-success">
                          <FileText size={20} />
                        </div>

                        <div>
                          <p className="font-medium">
                            {assignment.assignment.submissions[0].fileName}
                          </p>

                          <p className="text-sm text-base-content/50">
                            Submitted on{" "}
                            {new Date(
                              assignment.assignment.submissions[0].createdAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <a
                        href={assignment.assignment.submissions[0].fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline"
                      >
                        <Download size={16} />
                        View Submission
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {assignment.assignment.submissions.length === 0 && (
                <div className="mt-8 border-t border-base-300 pt-6">
                  <h2 className="text-lg font-semibold">Submit Assignment</h2>

                  <p className="mt-1 text-sm text-base-content/60">
                    Upload your completed assignment before the deadline.
                  </p>

                  <div className="mt-4">
                    <input
                      type="file"
                      className="file-input w-full"
                      onChange={(e) => {
                        setFile(e.target.files?.[0] || null);
                      }}
                    />
                  </div>

                  <button
                    disabled={isSubmissionLoading || !file}
                    onClick={handleSubmitAssignment}
                    className="btn btn-primary mt-4 w-full sm:w-auto"
                  >
                    {isSubmissionLoading
                      ? "Submitting..."
                      : "Submit Assignment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Message message="Assignment not found." />
      )}
    </>
  );
};

export default StudentIndividualAssigment;
