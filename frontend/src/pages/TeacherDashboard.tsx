import { BookOpen, CheckCircle, Clock, FileCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useGetTeachersAssignmentQuery } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const TeacherDashboard = () => {
  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetTeachersAssignmentQuery();

  // console.log(assignments);

  const totalSubmissions = assignments?.assignments.filter(
    (assignment) =>
      assignment.submissions[0]?.status == "PENDING" &&
      assignment.submissions?.length > 0,
  );

  // console.log(totalSubmissions);
  const gradedSubmissions = assignments?.assignments.filter(
    (assignment) => assignment.submissions[0]?.status == "GRADED",
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load teacher dashbord." />
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {userInfo.name}
            </h1>
            <p className="text-gray-500 mt-1">
              Here's an overview of your assignments and submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-100 border border-base-300 shadow-md">
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

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Active Assignments</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {assignments?.assignments.length}
                    </h2>
                  </div>

                  <div className="bg-info/10 p-3 rounded-xl">
                    <Clock className="text-info" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Total Submissions</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {totalSubmissions?.length}
                    </h2>
                  </div>

                  <div className="bg-warning/10 p-3 rounded-xl">
                    <FileCheck className="text-warning" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Graded Submissions</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {gradedSubmissions?.length}
                    </h2>
                  </div>

                  <div className="bg-success/10 p-3 rounded-xl">
                    <CheckCircle className="text-success" size={28} />
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
                  to="/teacher/assignments"
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
                      <th className="hidden sm:table-cell">Due Date</th>
                      <th className="hidden md:table-cell">Submissions</th>
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
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </td>

                        <td className="hidden md:table-cell">
                          {totalSubmissions?.length}
                        </td>

                        <td>
                          <span className="badge badge-success badge-sm text-white">
                            {assignment.submissions.length === 0
                              ? "NO SUBMISSIONS"
                              : assignment.submissions.some(
                                    (submission) =>
                                      submission.status === "PENDING",
                                  )
                                ? "PENDING"
                                : "GRADED"}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={
                              assignment.submissions.length > 0
                                ? `/teacher/assignments/${assignment.id}/submissions`
                                : "#"
                            }
                            //disable btn when no submission
                            className={`btn btn-xs sm:btn-sm btn-primary ${
                              assignment.submissions.length === 0
                                ? "btn-disabled"
                                : ""
                            }`}
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

export default TeacherDashboard;
