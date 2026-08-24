import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { Link } from "react-router";
import { useGetAllUsersQuery } from "../redux/slices/authApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const AdminDashboard = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  const activeUsers = users?.users?.filter((user) => user.status === "ACTIVE");
  const pendingUsers = users?.users?.filter(
    (user) => user.status === "PENDING",
  );
  const disabledUsers = users?.users?.filter(
    (user) => user.status === "DISABLED",
  );

  // console.log(users);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load dashboard." />
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
            <p className="text-gray-500 mt-1">
              Here's an overview of the users in your system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Total Users</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {users?.users?.length}
                    </h2>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Users className="text-primary" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Active Users</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {activeUsers?.length}
                    </h2>
                  </div>

                  <div className="bg-success/10 p-3 rounded-xl">
                    <UserCheck className="text-success" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Pending Users</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {pendingUsers?.length}
                    </h2>
                  </div>

                  <div className="bg-warning/10 p-3 rounded-xl">
                    <Clock className="text-warning" size={28} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-md">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Disabled Users</p>
                    <h2 className="text-3xl font-bold mt-2">
                      {disabledUsers?.length}
                    </h2>
                  </div>

                  <div className="bg-error/10 p-3 rounded-xl">
                    <UserX className="text-error" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-md">
            <div className="card-body p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="card-title">Pending Users</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Users waiting for approval
                  </p>
                </div>

                <Link
                  to="/admin/users"
                  className="btn btn-sm btn-ghost self-start sm:self-auto underline"
                >
                  Manage Users
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-sm sm:table-md">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Name</th>
                      <th className="hidden sm:table-cell">Email</th>
                      <th>Role</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {pendingUsers && pendingUsers.length > 0 ? (
                      pendingUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="font-medium">{user.name}</td>

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
                            <Link
                              to={`/admin/users/${user.id}`}
                              className="btn btn-xs sm:btn-sm btn-primary text-white"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className="flex items-center justify-center py-8">
                            <p className="text-center text-sm text-gray-500">
                              No pending users.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
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

export default AdminDashboard;
