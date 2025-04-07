import StudentPanel from "../pages/StudentPanel/StudentPanel";
import StudentPage from "../pages/StudentPage/StudentPage";
import StudentProfilePage from "../pages/StudentProfilePage/StudentProfilePage";

const studentRoutes = [
  { path: "/student", element: <StudentPanel />, title: "Dashboard" },
  { path: "/student/user", element: <StudentPage />, title: "User Page" },
  { path: "/student/profile", element: <StudentProfilePage />, title: "Profile Page" },
];

export default studentRoutes;
