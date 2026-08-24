import {
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  Mail,
  Calendar,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router";
import {
  useApproveUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
  useGetUsersByIdQuery,
  useUpdateUserRoleMutation,
} from "../redux/slices/authApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import type { Role } from "../types/user.types";
import toast from "react-hot-toast";

const AdminUserDetail = () => {
  const { id } = useParams<string>();

  const { data: user, isLoading, isError } = useGetUsersByIdQuery(id!);
  //   console.log(user);
  const [changeRole, setChangeRole] = useState(user?.user.role);
  // console.log(changeRole);

  // prefill garxa immediately after loading page
  useEffect(() => {
    if (user?.user.role) {
      setChangeRole(user.user.role);
    }
  }, [user]);

  const [updateUserRole, { isLoading: isUpdatingRole }] =
    useUpdateUserRoleMutation();

  const handleRoleUpdate = async () => {
    try {
      const response = await updateUserRole({
        id: user?.user.id,
        data: {
          role: changeRole,
        },
      }).unwrap();

      // console.log(response);

      toast.success(response.message);
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

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
        <Message message="Failed to load user." />
      ) : (
        <div className="space-y-6">
          <div>
            <Link to="/admin/users" className="btn btn-ghost btn-sm mb-4 -ml-2">
              <ArrowLeft size={18} />
              Back to Users
            </Link>

            <h1 className="text-3xl font-bold">User Details</h1>

            <p className="mt-1 text-gray-500">
              View and manage this user's account.
            </p>
          </div>

          <div className="card border border-base-300 bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-3 border-b border-base-300 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Account Information</h2>
                  <p className="text-sm text-gray-500">
                    Personal and account details
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-lg bg-base-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <UserRound size={16} />
                    Full Name
                  </div>

                  <p className="mt-2 font-medium">{user?.user.name}</p>
                </div>

                <div className="rounded-lg bg-base-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={16} />
                    Email
                  </div>

                  <p className="mt-2 break-all font-medium">
                    {user?.user.email}
                  </p>
                </div>

                <div className="rounded-lg bg-base-200 p-4">
                  <p className="text-sm text-gray-500">Role</p>

                  <span
                    className={`badge mt-2 ${
                      user?.user.role === "TEACHER"
                        ? "badge-info text-white"
                        : user?.user.role === "ADMIN"
                          ? "badge-primary text-white"
                          : "badge-info text-white"
                    }`}
                  >
                    {user?.user.role
                      ? user.user.role.charAt(0) +
                        user.user.role.slice(1).toLowerCase()
                      : "N/A"}
                  </span>
                </div>

                <div className="rounded-lg bg-base-200 p-4">
                  <p className="text-sm text-gray-500">Status</p>

                  <span
                    className={`badge mt-2 text-white ${
                      user?.user.status === "ACTIVE"
                        ? "badge-success text-white"
                        : user?.user.status === "PENDING"
                          ? "badge-warning text-white"
                          : "badge-error text-white"
                    }`}
                  >
                    {user?.user.status
                      ? user.user.status.charAt(0) +
                        user.user.status.slice(1).toLowerCase()
                      : "N/A"}
                  </span>
                </div>

                <div className="rounded-lg bg-base-200 p-4">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="mt-2 font-medium">{user?.user.id}</p>
                </div>

                <div className="rounded-lg bg-base-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    Registered On
                  </div>

                  <p className="mt-2 font-medium">
                    {user?.user.createdAt
                      ? new Date(user.user.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Management Card */}
          <div className="card border border-base-300 bg-base-100 shadow-md">
            <div className="card border border-base-300 bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex items-center gap-3 border-b border-base-300 pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-info/10 text-info">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Role Management</h2>
                    <p className="text-sm text-gray-500">
                      Change the role assigned to this user.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="w-full sm:max-w-xs">
                    <label className="label">
                      <span className="label-text font-medium ml-2 mb-1">
                        User Role
                      </span>
                    </label>

                    <select
                      className="select select-bordered w-full"
                      value={changeRole}
                      onChange={(e) => setChangeRole(e.target.value as Role)}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="TEACHER">Teacher</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary text-white"
                    onClick={handleRoleUpdate}
                    disabled={isUpdatingRole || changeRole === user?.user.role}
                  >
                    {isUpdatingRole ? "Updating..." : "Save Role"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-base-300 bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-3 border-b border-base-300 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-warning/10 text-warning">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Account Actions</h2>
                  <p className="text-sm text-gray-500">
                    Manage this user's account status
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {user?.user.status === "PENDING" && (
                  <button
                    onClick={() => handleApprove(user?.user.id)}
                    className="btn btn-success text-white "
                    disabled={user?.user.role === "ADMIN" && isApproveLoading}
                  >
                    <UserCheck size={18} />
                    Approve User
                  </button>
                )}

                {user?.user.status === "ACTIVE" && (
                  <button
                    onClick={() => handleDeactivate(user?.user.id)}
                    className="btn btn-warning text-white "
                    disabled={
                      user?.user.role === "ADMIN" && isDeactivateLoading
                    }
                  >
                    <UserX size={18} />
                    Disable User
                  </button>
                )}

                {user?.user.status === "DISABLED" && (
                  <button
                    onClick={() => handleApprove(user?.user.id)}
                    className="btn btn-success text-white "
                    disabled={user?.user.role === "ADMIN" && isApproveLoading}
                  >
                    <UserCheck size={18} />
                    Activate User
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user?.user.id!)}
                  className="btn btn-error text-white "
                  disabled={user?.user.role === "ADMIN" && isDeleteLoading}
                >
                  <Trash2 size={18} />
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserDetail;
