import { Link } from "react-router";
import { useGetTeacherSubmissionsQuery } from "../redux/slices/submissionApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const TeacherSubmissionsPage = () => {
  const {
    data: submissions,
    isLoading,
    isError,
  } = useGetTeacherSubmissionsQuery();

  // console.log(submissions);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load submissions." />
      ) : submissions?.submissions.length === 0 ? (
        <Message message="No submissions found." />
      ) : (
        <div className="min-h-screen bg-base-200 px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold md:text-3xl">
                Student Submissions
              </h1>

              <p className="mt-2 text-base-content/60">
                Review student submissions and manage grades and feedback.
              </p>
            </div>

            <div className="hidden overflow-x-auto rounded-xl bg-base-100 shadow-sm md:block">
              <table className="table min-w-225">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Student</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {submissions?.submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td>
                        <div className="font-medium">
                          {submission.assignment.title}
                        </div>

                        <div className="text-sm text-base-content/50">
                          ID: {submission.assignmentId}
                        </div>
                      </td>

                      <td>
                        <div className="font-medium">
                          {submission.student.name}
                        </div>

                        <div className="text-sm text-base-content/50">
                          {submission.student.email}
                        </div>
                      </td>

                      <td>
                        {new Date(submission.submittedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            submission.status === "GRADED"
                              ? "badge-success text-white"
                              : "badge-warning text-white"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>

                      <td>
                        {submission.grade !== null
                          ? `${submission.grade}/100`
                          : "Not graded"}
                      </td>

                      <td>
                        <Link
                          to={`/teacher/assignments/${submission.assignmentId}/submissions`}
                          className="btn btn-sm btn-outline whitespace-nowrap "
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 md:hidden">
              {submissions?.submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-xl bg-base-100 p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium">
                        {submission.assignment.title}
                      </div>
                      <div className="text-sm text-base-content/50">
                        ID: {submission.assignmentId}
                      </div>
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

                  <div className="mb-1">
                    <div className="font-medium">{submission.student.name}</div>
                    <div className="text-sm text-base-content/50">
                      {submission.student.email}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-base-content/60">
                      {new Date(submission.submittedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>

                    <span>
                      {submission.grade !== null
                        ? `${submission.grade}/100`
                        : "Not graded"}
                    </span>
                  </div>

                  <Link
                    to={`/teacher/assignments/${submission.assignmentId}/submissions`}
                    className="btn btn-sm btn-outline whitespace-nowrap mt-3"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherSubmissionsPage;
