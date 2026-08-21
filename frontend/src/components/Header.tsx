import {
  BookOpen,
  ChevronDown,
  LogOut,
  User,
  Menu,
  LayoutDashboard,
  ClipboardList,
  FileText,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import { removeCredentials } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  // console.log(userInfo);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log("ERROR:", error);
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  // dynamic urls
  const dynamicPath =
    userInfo?.role === "STUDENT"
      ? "/student"
      : userInfo?.role === "TEACHER"
        ? "/teacher"
        : "/admin";

  return (
    <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8">
      {/* Mobile Menu */}
      {userInfo && (
        <div className="flex-none md:hidden">
          <div className="drawer">
            <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
              <label htmlFor="mobile-menu" className="btn btn-ghost btn-square">
                <Menu size={24} />
              </label>
            </div>

            <div className="drawer-side z-50">
              <label
                htmlFor="mobile-menu"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu bg-base-100 min-h-full w-72 p-4">
                <li className="mb-4">
                  {/* Logo */}
                  <div className="flex-1">
                    <Link
                      to={`${dynamicPath}/dashboard`}
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <BookOpen className="text-primary" size={26} />
                      <span>CourseDesk</span>
                    </Link>
                  </div>
                </li>

                <li>
                  <Link to={`${dynamicPath}/dashboard`}>
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to={`${dynamicPath}/assignments`}>
                    <ClipboardList size={18} />
                    Assignments
                  </Link>
                </li>

                <li>
                  <Link to={`${dynamicPath}/submissions`}>
                    <FileText size={18} />
                    Submissions
                  </Link>
                </li>

                <li>
                  <Link to={`${dynamicPath}/profile`}>
                    <User size={18} />
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <Link
          to={userInfo ? `${dynamicPath}/dashboard` : "/"}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <BookOpen className="text-primary" size={26} />
          <span>CourseDesk</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      {userInfo && (
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal gap-1">
            <li>
              <Link to={`${dynamicPath}/dashboard`}>Dashboard</Link>
            </li>

            <li>
              <Link to={`${dynamicPath}/assignments`}>Assignments</Link>
            </li>

            <li>
              <Link to={`${dynamicPath}/submissions`}>Submissions</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Right Side */}
      <div className="flex-none ml-2">
        {userInfo ? (
          /* Profile */
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content w-9 h-9 rounded-full flex items-center justify-center">
                  <span>{userInfo?.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              <div className="hidden sm:block text-left">
                <p className="font-medium">{userInfo.name}</p>
                <p className="text-xs text-base-content/60">{userInfo.role}</p>
              </div>

              <ChevronDown size={16} />
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <Link to={`${dynamicPath}/profile`}>
                  <User size={16} />
                  Profile
                </Link>
              </li>

              <li>
                <button disabled={isLoading} onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* Login */
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
