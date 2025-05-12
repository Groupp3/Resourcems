import StudentPanel from "../pages/StudentPanel/StudentPanel";
import StudentPage from "../pages/StudentPage/StudentPage";
import StudentProfilePage from "../pages/StudentProfilePage/StudentProfilePage";
import StudentResourcePage from "../pages/StudentResourcePage/StudentResourcePage";
import StudentCertificatePage from "../pages/StudentCertificatePage/StudentCertificatePage";
import StudentVideoPage from "../pages/StudentVideoPage/StudentVideoPage";
import StudentDocumentPage from "../pages/StudentDocumentPage/StudentDocumentPage";
import NotFoundPage from "../pages/NotFoundPage"

const studentRoutes = [
  { path: "/student", element: <StudentPanel />, title: "Dashboard" },
  { path: "/student/user", element: <StudentPage />, title: "User Page" },
  { path: "/student/profile", element: <StudentProfilePage />, title: "Profile Page" },
  { path: "/student/resource", element: <StudentResourcePage />, title: "Profile Page" },
  { path: "/student/resource/certificates", element: <StudentCertificatePage />},
  { path: "/student/resource/videos", element: <StudentVideoPage />},
  { path: "/student/resource/documents", element: <StudentDocumentPage />},
  { path: "/student/resource/others", element: <NotFoundPage />},
];

export default studentRoutes;