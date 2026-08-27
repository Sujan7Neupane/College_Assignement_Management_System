import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../redux/slices/authApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data).unwrap();
      // console.log(response);
      toast.success(response.message);
      reset();
      navigate("/login");
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.error || "Failed to register user");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          <div className="mb-2">
            <Link to="/" className="btn btn-ghost btn-sm gap-2 px-0">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          <div className="mb-5 flex flex-col text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-sm text-base-content/60 mt-1">
              Create your CourseDesk student account
            </p>
          </div>

          <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label mb-2 ml-2">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />

              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label mb-2 ml-2">
                <span className="label-text font-medium">Email</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label mb-2 ml-2">
                <span className="label-text font-medium">Password</span>
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
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
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider my-2"></div>

          <p className="text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
