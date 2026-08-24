import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import TeacherDashboard from "./pages/TeacherDashboard.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import store from "./redux/store.ts";
import TeacherAssignments from "./pages/TeacherAssignments.tsx";
import ViewAssignment from "./pages/ViewAssignment.tsx";
import HomeRoute from "./components/HomeRoute.tsx";
import TeacherRoute from "./components/TeacherRoute.tsx";
import AddAssignment from "./pages/AddAssignment.tsx";
import TeacherProfile from "./pages/TeacherProfile.tsx";
import EditTeacherProfile from "./pages/EditTeacherProfile.tsx";
import StudentRoute from "./components/StudentRoute.tsx";
import StudentAssignment from "./pages/StudentAssignment.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import StudentIndividualAssigment from "./pages/StudentIndividualAssigment.tsx";
import StudentSubmissionsPage from "./pages/StudentSubmissionsPage.tsx";
import TeacherSubmissionsPage from "./pages/TeacherSubmissionsPage.tsx";
import IndividualSubmissionPage from "./pages/IndividualSubmissionPage.tsx";
import StudentProfile from "./pages/StudentProfile.tsx";
import StudentProfileEdit from "./pages/StudentProfileEdit.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminManageUser from "./pages/AdminManageUser.tsx";
import AdminUserDetail from "./pages/AdminUserDetails.tsx";
import AdminAddUser from "./pages/AdminAddUser.tsx";
import AdminProfile from "./pages/AdminProfile.tsx";
import EditAdminProfile from "./pages/EditAdminProfile.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes for teacher */}
          <Route element={<TeacherRoute />}>
            <Route path="teacher/dashboard" element={<TeacherDashboard />} />
            <Route
              path="teacher/assignments"
              element={<TeacherAssignments />}
            />
            <Route
              path="teacher/assignments/:id"
              element={<ViewAssignment />}
            />
            <Route path="teacher/assignments/add" element={<AddAssignment />} />
            <Route path="teacher/profile" element={<TeacherProfile />} />
            <Route
              path="teacher/profile/edit"
              element={<EditTeacherProfile />}
            />
            <Route
              path="teacher/submissions"
              element={<TeacherSubmissionsPage />}
            />
            <Route
              path="teacher/assignments/:id/submissions"
              element={<IndividualSubmissionPage />}
            />
          </Route>

          {/* Private Routes for Students */}
          <Route element={<StudentRoute />}>
            <Route
              path="/student/assignments"
              element={<StudentAssignment />}
            />
            <Route
              path="/student/assignments/:id"
              element={<StudentIndividualAssigment />}
            />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route
              path="/student/submissions"
              element={<StudentSubmissionsPage />}
            />
            <Route path="/student/profile" element={<StudentProfile />} />

            <Route
              path="student/profile/edit"
              element={<StudentProfileEdit />}
            />
          </Route>

          {/* Private Routes for admin user */}
          <Route element={<AdminRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/users" element={<AdminManageUser />} />
            <Route path="admin/users/:id" element={<AdminUserDetail />} />
            <Route path="admin/users/add" element={<AdminAddUser />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/profile/edit" element={<EditAdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
