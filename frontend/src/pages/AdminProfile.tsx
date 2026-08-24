import { Mail, Shield, User } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-100 border border-base-300 shadow-md">
        <div className="card-body p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content w-24 h-24 rounded-full flex items-center justify-center">
                <span className="text-3xl font-semibold">
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{userInfo?.name}</h1>

              <p className="text-gray-500 mt-1">Administrator</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-base-200 p-3 rounded-lg">
                <User size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Name</p>

                <p className="font-medium">{userInfo?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-base-200 p-3 rounded-lg">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="font-medium break-all">{userInfo?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-base-200 p-3 rounded-lg">
                <Shield size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>

                <span className="badge badge-primary text-white mt-1">
                  Administrator
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-end">
            <Link
              to="/admin/profile/edit"
              className="btn btn-primary text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
