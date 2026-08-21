import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEditProfileMutation } from "../redux/slices/authApiSlice";
import { setLoginCredentials } from "../redux/slices/authSlice";

interface ProfileInputs {
  name: string;
}

const EditStudentProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateProfile, { isLoading }] = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: userInfo?.name || "",
    },
  });

  const handleUpdateProfile = async (data: ProfileInputs) => {
    try {
      const response = await updateProfile(data).unwrap();

      dispatch(setLoginCredentials(response.user));
      toast.success("Profile updated successfully");
      //   console.log(response);

      navigate("/student/profile");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="text-gray-500 mt-1">Update your profile information</p>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="form-control mb-5">
              <label className="label ml-2 mb-1">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <label className="label ml-2">
                  <span className="label-text-alt text-error">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control mb-5">
              <label className="label ml-2 my-1">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                value={userInfo?.email || ""}
                disabled
                className="input input-bordered w-full"
              />

              <label className="label ml-2 my-1">
                <span className="label-text-alt">Email cannot be changed</span>
              </label>
            </div>

            <div className="form-control mb-6">
              <label className="label ml-2 mb-1">
                <span className="label-text">Role</span>
              </label>

              <input
                type="text"
                value="Student"
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/student/profile" className="btn btn-ghost">
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentProfile;
