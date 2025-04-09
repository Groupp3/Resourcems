import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";
import RequestPage from "../pages/RequestPage/RequestPage";
import CertificatePage from "../pages/CertificatePage/CertificatePage";
import VideoCardPage from "../pages/VideoCardPage/VideoCardPage";
import DocumentPage from "../pages/DocumentPage/DocumentPage";
const adminRoutes = [
  { path: "/admin", element: <AdminPanel />, title: "Dashboard"},
  { path: "/admin/users", element: <UsersPage />,title: "User Management"},
  { path: "/admin/profile", element: <UserProfilePage />,title: "Profile" },
  { path: "/admin/resource", element: <ResourcePage /> ,title: "Resources"},
  { path: "/admin/request", element: <RequestPage />, title: "New Requests" },
  { path: "/admin/resource/certificates", element: <CertificatePage />},
  { path: "/admin/resource/videos", element: <VideoCardPage />},
  { path: "/admin/resource/documents", element: <DocumentPage />},
];

export default adminRoutes;
