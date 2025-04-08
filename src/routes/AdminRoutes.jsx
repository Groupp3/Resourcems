import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";
import RequestPage from "../pages/RequestPage/RequestPage";

const adminRoutes = [
  { path: "/admin", element: <AdminPanel /> },
  { path: "/admin/users", element: <UsersPage />},
  { path: "/admin/profile", element: <UserProfilePage /> },
  { path: "/admin/resource", element: <ResourcePage /> },
  { path: "/admin/request", element: <RequestPage /> },
];

export default adminRoutes;
