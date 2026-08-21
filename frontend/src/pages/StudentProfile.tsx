import { Mail, User, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const StudentProfile = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500 mt-1">View your profile information</p>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar placeholder">
              <div className="flex justify-center items-center bg-primary text-primary-content w-16 rounded-full">
                <span className="text-2xl">
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{userInfo?.name}</h2>
              <p className="text-gray-500">Student</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <User size={22} />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{userInfo?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail size={22} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userInfo?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck size={22} />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">Student</p>
              </div>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <Link to="/student/profile/edit" className="btn btn-primary">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
