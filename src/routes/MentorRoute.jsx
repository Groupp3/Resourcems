import MentorDashboard from "../pages/MentorDashboard/MentorDashboard";
import MentoruserPage from "../pages/MentorUserPage/MentorUserPage";
/*import MentorResourcePage from "../pages/MentorResourcePage/MentorResourcePage"; // Example of a resource management page for mentors
import MentorRequestPage from "../pages/MentorRequestPage/MentorRequestPage"; */

const mentorRoutes = [
  { path: "/mentor", element: <MentorDashboard />, title: "Dashboard" },
  { path: "/mentor/users", element: <MentoruserPage />, title: "Profile" },
  /*{ path: "/mentor/resources", element: <MentorResourcePage />, title: "Resources" },*/
  
];

export default mentorRoutes;
