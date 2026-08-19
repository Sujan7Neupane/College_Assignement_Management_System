import { ArrowLeft, Mail, Shield, User } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <div className="py-6">
      <div className="mx-auto max-w-2xl">
        <Link to="/teacher/dashboard" className="btn btn-ghost btn-sm mb-4">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col items-center text-center">
              <div className="avatar placeholder">
                <div className=" flex justify-center items-center bg-primary text-primary-content w-24 rounded-full">
                  <span className="text-3xl">
                    {userInfo?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <h1 className="mt-4 text-2xl font-bold">{userInfo?.name}</h1>

              <p className="text-sm text-base-content/60">{userInfo?.role}</p>
            </div>

            <div className="divider" />

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border border-base-300 p-4">
                  <div className="rounded-lg bg-base-200 p-3">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">Full Name</p>

                    <p className="font-medium">{userInfo?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-base-300 p-4">
                  <div className="rounded-lg bg-base-200 p-3">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">
                      Email Address
                    </p>

                    <p className="font-medium">{userInfo?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-base-300 p-4">
                  <div className="rounded-lg bg-base-200 p-3">
                    <Shield size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-base-content/60">Account Role</p>

                    <div className="mt-1">
                      <span className="badge badge-primary">
                        {userInfo?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="flex justify-end">
              <Link to="/teacher/profile/edit" className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
