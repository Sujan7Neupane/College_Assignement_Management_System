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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
