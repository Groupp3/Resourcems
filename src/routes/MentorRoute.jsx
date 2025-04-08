import MentorDashboard from "../pages/MentorDashboard/MentorDashboard";
import MentoruserPage from "../pages/MentorUserPage/MentorUserPage";
import MentorProfilePage from "../pages/MentorProfilePage/MentorProfilePage";

const mentorRoutes = [
  { path: "/mentor", element: <MentorDashboard />, title: "Dashboard" },
  { path: "/mentor/users", element: <MentoruserPage />, title: "Profile" },
  
  { path: "/mentor/profile", element: <MentorProfilePage />, title: "Resources" },
  
];

export default mentorRoutes;
