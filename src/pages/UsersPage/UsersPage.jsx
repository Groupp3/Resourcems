import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout"; 
import UserLayout from "../../layouts/AdminLayout/AdminLayout"; 
import { getUsersByRole } from "../../services/AdminService"; 
import UserCard from "../../components/UserCard/UserCard";
import { FaList, FaTh } from "react-icons/fa";
import "./UsersPage.css";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsersByRole(); 
        setUsersData(allUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const tabs = ["All", "Admin", "Mentor", "Student"];

  const getAccentColor = () => {
    const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredUsers = usersData.filter(user => {
    const nameMatch = (user.firstName?.toLowerCase() + " " + user.lastName?.toLowerCase())
      .includes(searchQuery.toLowerCase());

    if (activeTab === "All") return nameMatch;
    return nameMatch && user.role.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="verlof-page">
        

        <div className="verlof-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`verlof-tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="verlof-search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="verlof-view-toggle">
            <button 
              className={`list-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
            <button 
              className={`grid-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>
          </div>
        </div>

        <div className={`users-${viewMode}-view`}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              name={`${user.firstName} ${user.lastName || ""}`}
              email={user.email || "example@email.com"}
              avatar={user.profileImageUrl || "https://via.placeholder.com/150"}
              accentColor={getAccentColor()}
              role={user.role}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;