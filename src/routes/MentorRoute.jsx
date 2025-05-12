import MentorDashboard from "../pages/MentorDashboard/MentorDashboard";
import MentoruserPage from "../pages/MentorUserPage/MentorUserPage";
import MentorProfilePage from "../pages/MentorProfilePage/MentorProfilePage";
import MentorResourcePage from "../pages/MentorResourcePage/MentorResourcePage";
import MentorCertificatePage from "../pages/MentorCertificatePage/MentorCertificatePage";
import MentorVideoCardPage from "../pages/MentorVideoPage/MentorVideoPage";
import MentorDocumentPage from "../pages/MentorDocumentPage/MentorDocumentPage";


const mentorRoutes = [
  { path: "/mentor", element: <MentorDashboard /> },
  { path: "/mentor/users", element: <MentoruserPage /> },
  { path: "/mentor/profile", element: <MentorProfilePage /> },
  { path: "/mentor/resource", element: <MentorResourcePage /> },
  { path: "/mentor/resource/certificates", element: <MentorCertificatePage />},
  { path: "/mentor/resource/videos", element: <MentorVideoCardPage />},
  { path: "/mentor/resource/documents", element: <MentorDocumentPage />},
  
];

export default mentorRoutes;