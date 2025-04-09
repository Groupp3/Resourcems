import StudentPanel from "../pages/StudentPanel/StudentPanel";
import StudentPage from "../pages/StudentPage/StudentPage";
import StudentProfilePage from "../pages/StudentProfilePage/StudentProfilePage";
import StudentResourcePage from "../pages/StudentResourcePage/StudentResourcePage";
import StudentCertificatePage from "../pages/StudentCertificatePage/StudentCertificatePage";
import MentorVideoCardPage from "../pages/MentorVideoPage/MentorVideoPage";
import StudentDocumentPage from "../pages/StudentDocumentPage/StudentDocumentPage";


const studentRoutes = [
  { path: "/student", element: <StudentPanel />, title: "Dashboard" },
  { path: "/student/user", element: <StudentPage />, title: "User Page" },
  { path: "/student/profile", element: <StudentProfilePage />, title: "Profile Page" },
  { path: "/student/resource", element: <StudentResourcePage />, title: "Profile Page" },
  { path: "/student/resource/certificates", element: <StudentCertificatePage />},
  { path: "/student/resource/videos", element: <MentorVideoCardPage />},
  { path: "/student/resource/documents", element: <StudentDocumentPage />},
];

export default studentRoutes;