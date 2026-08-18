import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          {/* Back Button */}
          <div className="mb-2">
            <Link to="/" className="btn btn-ghost btn-sm gap-2 px-0">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-5 flex flex-col text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>

            <p className="text-sm text-base-content/60 mt-1">
              Create your CourseDesk student account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label htmlFor="name" className="label mb-2 ml-2">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="label mb-2 ml-2">
                <span className="label-text font-medium">Email</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label htmlFor="password" className="label mb-2 ml-2">
                <span className="label-text font-medium">Password</span>
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Register */}
            <button type="submit" className="btn btn-primary w-full mt-2">
              Create Account
            </button>
          </form>

          {/* Login */}
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
