import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { useGetAllAssignmentsQuery } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const { data: assignments, isLoading, isError } = useGetAllAssignmentsQuery();
  // console.log(assignments);

  const { userInfo } = useSelector((state: any) => state.auth);

  const submittedAssignment = assignments?.assignments.filter(
    (assignment) => assignment.submissions[0]?.status == "PENDING",
  );

  const gradedAssignment = assignments?.assignments.filter(
    (assignment) => assignment.submissions[0]?.status == "GRADED",
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load dashbord data" />
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {userInfo.name}
            </h1>
            <p className="text-gray-500 mt-1">
              Here's an overview of your assignments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Total Assignments</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {assignments?.assignments.length}
                    </h2>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-xl">
                    <BookOpen className="text-primary" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {submittedAssignment?.length}
                    </h2>
                  </div>

                  <div className="bg-success/10 p-3 rounded-full">
                    <CheckCircle className="text-success" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Graded</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {gradedAssignment?.length}
                    </h2>
                  </div>

                  <div className="bg-info/10 p-3 rounded-full">
                    <GraduationCap className="text-info" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-md">
            <div className="card-body p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="card-title">Recent Assignments</h2>

                <Link
                  to="/student/assignments"
                  className="btn btn-sm btn-ghost self-start sm:self-auto"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-sm sm:table-md">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Assignment</th>
                      <th className="hidden sm:table-cell">Teacher</th>
                      <th className="hidden md:table-cell">Due Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignments?.assignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td className="font-medium max-w-40 sm:max-w-none">
                          <div className="truncate">{assignment.title}</div>
                        </td>

                        <td className="hidden sm:table-cell">
                          {assignment.teacher?.name}
                        </td>

                        <td className="hidden sm:table-cell">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </td>

                        <td>
                          <span className="badge badge-success badge-sm text-white whitespace-nowrap">
                            {assignment.submissions[0]?.status === "GRADED"
                              ? "GRADED"
                              : assignment.submissions.length === 0
                                ? "NOT SUBMITTED"
                                : "SUBMITTED"}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={`/student/assignments/${assignment.id}`}
                            className="btn btn-xs sm:btn-sm btn-primary"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
