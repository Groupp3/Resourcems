import MentorDashboard from "../pages/MentorDashboard/MentorDashboard";
import MentoruserPage from "../pages/MentorUserPage/MentorUserPage";
import MentorProfilePage from "../pages/MentorProfilePage/MentorProfilePage";
import MentorResourcePage from "../pages/MentorResourcePage/MentorResourcePage";
import MentorCertificatePage from "../pages/MentorCertificatePage/MentorCertificatePage";
import VideoCardPage from "../pages/VideoCardPage/VideoCardPage";
const mentorRoutes = [
  { path: "/mentor", element: <MentorDashboard /> },
  { path: "/mentor/users", element: <MentoruserPage /> },
  { path: "/mentor/profile", element: <MentorProfilePage /> },
  { path: "/mentor/resource", element: <MentorResourcePage /> },
  { path: "/mentor/resource/certificates", element: <MentorCertificatePage />},
  { path: "/mentor/resource/videos", element: <VideoCardPage />},
];

export default mentorRoutes;
