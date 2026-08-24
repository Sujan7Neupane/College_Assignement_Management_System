import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useAdminProfileUpdateMutation } from "../redux/slices/authApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setLoginCredentials } from "../redux/slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ProfileInputs {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditAdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   togglers
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { userInfo } = useSelector((state: any) => state.auth);
  //   console.log(userInfo);

  const [updateProfile, { isLoading }] = useAdminProfileUpdateMutation();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleProfile = async (data: ProfileInputs) => {
    try {
      const response = await updateProfile({
        name: data.name,
        email: data.email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      //   console.log(response);

      dispatch(setLoginCredentials(response.user));

      toast.success(response.message);

      reset({
        name: response.user.name,
        email: response.user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 border border-base-300 shadow-md">
        <div className="card-body p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>

            <p className="text-gray-500 mt-1">
              Update your profile information.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleProfile)}
            className="space-y-5 max-w-xl mx-auto w-full"
          >
            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">Name</span>
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </label>

              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">Email</span>
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  className="grow"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </label>

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="divider">Change Password</div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">
                  Current Password
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Enter current password"
                  {...register("currentPassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </label>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">
                  New Password
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showNewPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Enter new password"
                  {...register("newPassword", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              {errors.newPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium ml-2 mb-1">
                  Confirm New Password
                </span>
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    // compare and match the old and new password
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </label>

              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/profile")}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary text-white"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfile;
