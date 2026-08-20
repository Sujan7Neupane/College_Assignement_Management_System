import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const StudentRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.role !== "STUDENT") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default StudentRoute;
