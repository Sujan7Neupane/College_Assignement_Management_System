import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function TeacherRoute() {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (!userInfo || userInfo.role !== "TEACHER") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default TeacherRoute;
