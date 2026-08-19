import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/slices/authApiSlice";
import toast from "react-hot-toast";
import { setLoginCredentials } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [login, { isLoading, isError }] = useLoginMutation();
  const { userInfo } = useSelector((state: any) => state.auth);
  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.role === "TEACHER") {
      navigate("/teacher/dashboard");
    }
  }, [userInfo, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);
    try {
      const response = await login(data).unwrap();
      dispatch(setLoginCredentials(response.user));
      toast.success(response.message);
      //   console.log(response.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          <div className="mb-2">
            <Link to="/" className="btn btn-ghost btn-sm gap-2 px-0">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          <div className="mb-5 flex flex-col text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>

            <p className="text-sm text-base-content/60 mt-1">
              Login to your CourseDesk account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label htmlFor="email" className="label ml-2 mb-2">
                <span className="label-text font-medium">Email</span>
              </label>

              <input
                {...register("email", {
                  required: "Email field is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                  minLength: {
                    value: 2,
                    message: "Email must be of atleast 2 characters.",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label ml-2 mb-2">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>/`~])[A-Za-z\d@$!%*?&^#()[\]{}\-_=+\\|;:'",.<>/`~]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isError && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                Invalid email or password.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mt-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}
          <div className="divider my-2"></div>

          <p className="text-center text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
