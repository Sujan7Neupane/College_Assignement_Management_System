import { Eye, Trash2, UserCheck, UserX } from "lucide-react";
import { Link } from "react-router";
import {
  useApproveUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../redux/slices/authApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  // console.log(users);

  const [approveUser, { isLoading: isApproveLoading }] =
    useApproveUserMutation();

  const [deactivateUser, { isLoading: isDeactivateLoading }] =
    useDeactivateUserMutation();

  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

  const handleApprove = async (id: number): Promise<void> => {
    // console.log(id);

    try {
      const response = await approveUser(id).unwrap();
      // console.log(response);
      toast.success(response.message);
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeactivate = async (id: number): Promise<void> => {
    try {
      const response = await deactivateUser(id).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const response = await deleteUser(id).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load users." />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Users</h1>

              <p className="text-gray-500 mt-1">
                Manage students, teachers, and user accounts.
              </p>
            </div>

            <Link
              to="/admin/users/add"
              className="btn btn-info text-white w-full sm:w-auto"
            >
              Add User
            </Link>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-md">
            <div className="card-body p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="table table-sm sm:table-md text-center">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Name</th>
                      <th className="hidden sm:table-cell">Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users?.users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="font-medium">{user.name}</div>

                          <div className="text-xs text-gray-500 sm:hidden">
                            {user.email}
                          </div>
                        </td>

                        <td className="hidden sm:table-cell">{user.email}</td>

                        <td>
                          <span
                            className={`badge badge-sm ${
                              user.role === "TEACHER"
                                ? "badge-ghost"
                                : user.role === "ADMIN"
                                  ? "badge-neutral"
                                  : "badge-primary"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1).toLowerCase()}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge badge-sm text-white ${
                              user.status === "ACTIVE"
                                ? "badge-success"
                                : user.status === "PENDING"
                                  ? "badge-warning"
                                  : "badge-error"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1).toLowerCase()}
                          </span>
                        </td>

                        <td>
                          <div className="flex flex-nowrap items-center gap-1 sm:gap-2 whitespace-nowrap">
                            <Link
                              to={`/admin/users/${user.id}`}
                              className="btn btn-xs sm:btn-sm btn-primary text-white shrink-0"
                              title="View Details"
                            >
                              <Eye size={15} />
                              <span className="hidden md:inline">View</span>
                            </Link>

                            {user.status === "PENDING" && (
                              <div
                                className={
                                  user.role === "ADMIN"
                                    ? "cursor-not-allowed"
                                    : ""
                                }
                              >
                                <button
                                  onClick={() => handleApprove(user.id)}
                                  className="btn btn-xs sm:btn-sm btn-success text-white shrink-0 disabled:opacity-50 disabled:pointer-events-none"
                                  title="Approve User"
                                  disabled={
                                    isApproveLoading && user.role === "ADMIN"
                                  }
                                >
                                  <UserCheck size={15} />
                                  <span className="hidden md:inline">
                                    Approve
                                  </span>
                                </button>
                              </div>
                            )}

                            {user.status === "ACTIVE" && (
                              <div
                                className={
                                  user.role === "ADMIN"
                                    ? "cursor-not-allowed"
                                    : ""
                                }
                              >
                                <button
                                  onClick={() => handleDeactivate(user.id)}
                                  className="btn btn-xs sm:btn-sm btn-warning text-white shrink-0 disabled:opacity-50 disabled:pointer-events-none"
                                  title="Disable User"
                                  disabled={
                                    user.role === "ADMIN" && isDeactivateLoading
                                  }
                                >
                                  <UserX size={15} />
                                  <span className="hidden md:inline">
                                    Disable
                                  </span>
                                </button>
                              </div>
                            )}

                            {user.status === "DISABLED" && (
                              <div
                                className={
                                  user.role === "ADMIN"
                                    ? "cursor-not-allowed"
                                    : ""
                                }
                              >
                                <button
                                  onClick={() => handleApprove(user.id)}
                                  className="btn btn-xs sm:btn-sm btn-success text-white shrink-0 disabled:opacity-50 disabled:pointer-events-none"
                                  title="Activate User"
                                  disabled={
                                    user.role === "ADMIN" && isApproveLoading
                                  }
                                >
                                  <UserCheck size={15} />
                                  <span className="hidden md:inline">
                                    Activate
                                  </span>
                                </button>
                              </div>
                            )}

                            <div
                              className={
                                user.role === "ADMIN"
                                  ? "cursor-not-allowed"
                                  : ""
                              }
                            >
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-xs sm:btn-sm btn-error text-white shrink-0 disabled:opacity-50 disabled:pointer-events-none"
                                title="Delete User"
                                disabled={
                                  user.role === "ADMIN" && isDeleteLoading
                                }
                              >
                                <Trash2 size={15} />
                                <span className="hidden md:inline">Delete</span>
                              </button>
                            </div>
                          </div>
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

export default AdminUsers;
