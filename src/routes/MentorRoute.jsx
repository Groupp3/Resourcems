import MentorDashboard from "../pages/MentorDashboard/MentorDashboard";
import MentoruserPage from "../pages/MentorUserPage/MentorUserPage";
import MentorProfilePage from "../pages/MentorProfilePage/MentorProfilePage";

const mentorRoutes = [
  { path: "/mentor", element: <MentorDashboard /> },
  { path: "/mentor/users", element: <MentoruserPage /> },
  { path: "/mentor/profile", element: <MentorProfilePage /> },
  
];

export default mentorRoutes;
