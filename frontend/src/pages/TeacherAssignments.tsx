import { Eye, Plus } from "lucide-react";
import { Link } from "react-router";
import { useGetTeachersAssignmentQuery } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const TeacherAssignments = () => {
  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetTeachersAssignmentQuery();
  //   console.log(data);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load assignments." />
      ) : (
        <div className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">All Assignments</h1>

              <p className="text-base-content/60 mt-1">
                Manage assignments you have created.
              </p>
            </div>

            <Link to="/teacher/assignments/add" className="btn btn-primary">
              <Plus size={18} />
              Add new Assignment
            </Link>
          </div>

          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead className="bg-gray-300">
                <tr>
                  <th>Assignment</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {assignments?.assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>
                      <div className="font-semibold">{assignment.title}</div>
                    </td>

                    <td>
                      <span className="text-base-content/70">
                        {assignment.description}
                      </span>
                    </td>

                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>

                    <td>
                      <div className="flex justify-end">
                        <Link
                          to={`/teacher/assignments/${assignment.id}`}
                          className="btn btn-sm btn-outline"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherAssignments;
