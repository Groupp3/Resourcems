import React, { useState, useEffect } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout"; 
import UserCard from "../../components/UserCard/UserCard";
import { getUsersByRole } from "../../services/AdminService"; 
import "./UsersPage.css";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("Admins");
  const [usersData, setUsersData] = useState({
    Admins: [],
    Mentors: [],
    Students: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsersByRole(); // Fetch users from API

        // Categorize users based on role
        const categorizedUsers = {
          Admins: allUsers.filter(user => user.role === "ADMIN"),
          Mentors: allUsers.filter(user => user.role === "MENTOR"),
          Students: allUsers.filter(user => user.role === "STUDENT"),
        };

        setUsersData(categorizedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserLayout> 
      <div className="users-page">
        <div className="tabs">
          {Object.keys(usersData).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} ({usersData[tab].length}) {/* Display count */}
            </button>
          ))}
        </div>
        <div className="users-list">
          {usersData[activeTab].map((user) => (
            <UserCard 
              key={user.id} 
              name={user.firstName} 
              email={user.email} 
              avatar={user.profileImageUrl || "https://reqres.in/img/faces/1-image.jpg"} 
              role={user.role.replace("ROLE_", "")} // Removing "ROLE_" prefix
              accentColor="#ddd6fe"
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default UsersPage;