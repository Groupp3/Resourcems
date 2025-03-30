import React, { useState } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout"; // Changed from AdminLayout to UserLayout
import UserCard from "../../components/UserCard/UserCard";
import "./UsersPage.css";

const usersData = {
  Admins: [
    { id: 1, name: "John Doe", email: "john.doe@gmail.com", avatar: "https://reqres.in/img/faces/1-image.jpg", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@gmail.com", avatar: "https://reqres.in/img/faces/2-image.jpg", role: "Admin" },
  ],
  Mentors: [
    { id: 3, name: "Alice Brown", email: "alice.brown@gmail.com", avatar: "https://reqres.in/img/faces/3-image.jpg", role: "Mentor" },
    { id: 4, name: "Bob Johnson", email: "bob.johnson@gmail.com", avatar: "https://reqres.in/img/faces/4-image.jpg", role: "Mentor" },
  ],
  Students: [
    { id: 5, name: "Charlie Davis", email: "charlie.davis@gmail.com", avatar: "https://reqres.in/img/faces/5-image.jpg", role: "Student" },
    { id: 6, name: "Daisy Lewis", email: "daisy.lewis@gmail.com", avatar: "https://reqres.in/img/faces/6-image.jpg", role: "Student" },
  ],
};

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("Admins");

  return (
    <UserLayout> {/* Using UserLayout instead of AdminLayout */}
      <div className="users-page">
        <h2>Manage Users</h2>
        <div className="tabs">
          {Object.keys(usersData).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="users-list">
          {usersData[activeTab].map((user) => (
            <UserCard key={user.id} {...user} accentColor="#ddd6fe" />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default UsersPage;
