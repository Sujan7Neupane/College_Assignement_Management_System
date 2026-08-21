import { CalendarDays, Clock, FileText } from "lucide-react";
import { useGetAllAssignmentsQuery } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link } from "react-router";

const StudentAssignment = () => {
  const { data: assignments, isLoading, isError } = useGetAllAssignmentsQuery();
  // console.log(assignments);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to Load Student Assignments" />
      ) : (
        <div className="min-h-screen bg-base-200 px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Assignments</h1>
              <p className="mt-2 text-base-content/60">
                View your assignments and submit your work before the deadline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments?.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`card border bg-base-100 shadow-sm transition ${
                    new Date(assignment.dueDate) < new Date()
                      ? "border-gray-300 bg-gray-100 text-gray-500"
                      : "border-base-300 hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          new Date(assignment.dueDate) < new Date()
                            ? "bg-gray-200"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <FileText size={20} />
                      </div>
                      <span
                        className={`badge ${
                          assignment.submissions.length === 0
                            ? "badge-error text-white"
                            : assignment.submissions[0].status === "GRADED"
                              ? "badge-success text-white"
                              : "badge-warning text-white"
                        }`}
                      >
                        {assignment.submissions.length === 0
                          ? "NOT SUBMITTED"
                          : assignment.submissions[0].status}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">
                      {assignment.title}
                    </h2>

                    <p className="line-clamp-3 text-sm text-base-content/60">
                      {assignment.description}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>
                          Teacher:{" "}
                          <span className="font-medium">
                            {assignment.teacher?.name}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>
                          Due:{" "}
                          <span className="font-medium">
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                        </span>
                      </div>

                      {new Date(assignment.dueDate) < new Date() && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span>Submission deadline has passed</span>
                        </div>
                      )}
                    </div>

                    <div className="card-actions mt-5">
                      <Link
                        to={`/student/assignments/${assignment.id}`}
                        className={`btn w-full ${
                          new Date(assignment.dueDate) < new Date()
                            ? "btn-disabled pointer-events-none"
                            : "btn-primary"
                        }`}
                      >
                        {new Date(assignment.dueDate) < new Date()
                          ? "Assignment Expired"
                          : "View Assignment"}
                      </Link>
                    </div>
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

export default StudentAssignment;
