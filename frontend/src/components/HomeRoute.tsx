import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";

const HomeRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (!userInfo) {
    return <HomePage />;
  }

  if (userInfo.role === "TEACHER") {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  if (userInfo.role === "STUDENT") {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <HomePage />;
};

export default HomeRoute;
