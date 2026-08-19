import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEditProfileMutation } from "../redux/slices/authApiSlice";
import toast from "react-hot-toast";
import { setLoginCredentials } from "../redux/slices/authSlice";

type ProfileInputs = {
  name: string;
};

const EditTeacherProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: userInfo?.name || "",
    },
  });

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const handleUpdateProfile: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const response = await editProfile(data).unwrap();
      dispatch(setLoginCredentials(response.user));
      toast.success(response.message);
      navigate("/teacher/profile");
    } catch (error: any) {
      //   console.log(error);
      toast.error(error.message || "Failed to update profile.");
    }
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-2xl">
        <Link to="/teacher/profile" className="btn btn-ghost btn-sm mb-4">
          <ArrowLeft size={16} />
          Back to Profile
        </Link>

        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>

              <p className="mt-1 text-sm text-base-content/60">
                Update your profile information.
              </p>
            </div>

            <div className="divider" />

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-5"
            >
              <div>
                <label className="label">
                  <span className="label-text font-medium mb-1 ml-2">
                    Full Name
                  </span>
                </label>

                <input
                  {...register("name", {
                    required: "Name is required.",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters.",
                    },
                  })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your full name"
                />

                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium mb-1 ml-2">
                    Email Address
                  </span>
                </label>

                <input
                  type="email"
                  value={userInfo?.email || ""}
                  disabled
                  className="input input-bordered w-full"
                />

                <p className="text-xs text-base-content/60 mt-1 mx-2">
                  Email address cannot be changed.
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium mb-1 ml-2">Role</span>
                </label>

                <input
                  type="text"
                  value={userInfo?.role || ""}
                  disabled
                  className="input input-bordered w-full"
                />

                <p className="text-xs text-base-content/60 mt-1 mx-2">
                  Your account role is managed by the system.
                </p>
              </div>

              <div className="divider" />

              <div className="flex justify-end gap-2">
                <Link to="/teacher/profile" className="btn btn-ghost">
                  Cancel
                </Link>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherProfile;
