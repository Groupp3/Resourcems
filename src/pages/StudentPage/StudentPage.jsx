import React, { useState, useEffect } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout"; 
import { getUsersByRole } from "../../services/AdminService"; 
import UserCard from "../../components/UserCard/UserCard";
import { FaList, FaTh } from "react-icons/fa";
import "./StudentPage.css"; // You can keep the same styles
import StudentUserLayout from "../../layouts/StudentUserLayout/StudentUserLayout";
import StudentLayout from "../../layouts/Studentlayout/StudentLayout";
const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorUsers = await getUsersByRole("MENTOR"); // ✅ only mentors
        setMentors(mentorUsers);
      } catch (error) {
        console.error("Error fetching mentors: ", error);
      }
    };

    fetchMentors();
  }, []);

  const getAccentColor = () => {
    const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredMentors = mentors.filter((mentor) =>
    (mentor.firstName?.toLowerCase() + " " + mentor.lastName?.toLowerCase())
      .includes(searchQuery.toLowerCase())
  );

  return (
    <StudentUserLayout>
      <div className="verlof-page">
        <div className="verlof-header">
          <h1>MENTORS</h1>
        </div>

        <div className="verlof-search-container">
          <input
            type="text"
            placeholder="Search mentors..."
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
          {filteredMentors.map((mentor) => (
            <UserCard
              key={mentor.id}
              name={`${mentor.firstName} ${mentor.lastName || ""}`}
              email={mentor.email || "example@email.com"}
              avatar={mentor.profileImageUrl || "https://via.placeholder.com/150"}
              accentColor={getAccentColor()}
            />
          ))}
        </div>
      </div>
    </StudentUserLayout>
  );
};

export default StudentsPage;
