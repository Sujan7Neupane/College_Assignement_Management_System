import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const TeacherRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.role !== "TEACHER") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default TeacherRoute;
