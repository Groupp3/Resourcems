import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import "./StudentResourceLayout.css";

const StudentResourceLayout = ({
  children,
  pageTitle = "Resource",
  onBreadcrumbClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleBreadcrumbClick = (item) => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick(item);
    } else if (item.url) {
      navigate(item.url);
    }
  };

  const generateBreadcrumbItems = useMemo(() => {
    const pathnames = location.pathname.split("/").filter(Boolean);

    const labelMap = {
      student: "Dashboard",
      resource: "Resources",
      video: "Video",
      document: "Document",
    };

    const items = pathnames.map((value, index) => {
      const url = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        label: labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1),
        url: index !== pathnames.length - 1 ? url : null,
      };
    });

    return items;
  }, [location.pathname]);

  return (
    <div className="resource-layout-container">
      <Header
        backgroundColor="#FFFFFF"
        textColor="#000000"
        borderColor="#DDDDDD"
        profileSrc="https://via.placeholder.com/100"
        profileName="Student"
        onLogout={handleLogout}
      />

      <Sidebar userRole="STUDENT" defaultOpen={true} logoText="EduVault" />

      <div className="content-area">
        <div className="breadcrumb-header">
          <div className="breadcrumb-wrapper">
            <Breadcrumb
              items={generateBreadcrumbItems}
              onClick={handleBreadcrumbClick}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default StudentResourceLayout;