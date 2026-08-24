import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import type { User } from "../types/user.types";
import toast from "react-hot-toast";
import { useAddUserMutation } from "../redux/slices/authApiSlice";
import { useDispatch } from "react-redux";

const AdminAddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleUserData = async (data: User) => {
    // console.log(data);
    try {
      const response = await addUser(data).unwrap();
      //   console.log(response);

      toast.success(response.message);

      reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/users"
          className="btn btn-circle btn-ghost"
          title="Back to Users"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Add User</h1>
          <p className="mt-1 text-gray-500">
            Create a new student, teacher, or admin account.
          </p>
        </div>
      </div>

      <div className="card mx-auto w-full max-w-3xl border border-base-300 bg-base-100 shadow-md">
        <div className="card-body">
          <div className="mb-2 flex items-center gap-3 border-b border-base-300 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserPlus size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">User Information</h2>
              <p className="text-sm text-gray-500">
                Enter the details for the new user.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleUserData)} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter email address"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">Role</span>
              </label>

              <select
                className="select select-bordered w-full"
                {...register("role")}
              >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Admin</option>
              </select>

              <p className="mt-1 text-sm text-gray-500 ml-2 mb-1">
                Select the role for this account.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-base-300 pt-5 sm:flex-row sm:justify-end">
              <Link
                to="/admin/users"
                className="btn btn-ghost w-full sm:w-auto"
              >
                Cancel
              </Link>

              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary w-full text-white sm:w-auto"
              >
                <UserPlus size={18} />
                {isLoading ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUser;
