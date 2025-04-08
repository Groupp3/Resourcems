import React, { useState, useEffect } from "react";
import { getUsersByRole } from "../../services/AdminService"; 
import UserMSCard from "../../components/UserMSCard/UserMSCard";
import { FaList, FaTh } from "react-icons/fa";
import "./MentorUserPage.css";
import StudentUserLayout from "../../layouts/StudentUserLayout/StudentUserLayout";

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUsersByRole("STUDENT"); // still using the same function
        const onlyMentors = usersData.filter(user => user.role === "STUDENT");
        setMentors(onlyMentors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching mentors: ", error);
        setError("Failed to load mentors. Please try again later.");
        setIsLoading(false);
      }
    };
  
    fetchMentors();
  }, []);
  

  const getAccentColor = () => {
    const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredMentors = mentors.filter((mentor) =>
    `${mentor.firstName?.toLowerCase() || ""} ${mentor.lastName?.toLowerCase() || ""}`.includes(
      searchQuery.toLowerCase()
    )
  );

  return (
    <StudentUserLayout>
      <div className="verlof-page">
        <div className="verlof-header">
          <h1>STUDENTS</h1>
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

        {isLoading ? (
          <div className="loading-state">Loading mentors...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : filteredMentors.length === 0 ? (
          <div className="empty-state">No mentors found matching your search.</div>
        ) : (
          <div className={`users-${viewMode}-view`}>
            {filteredMentors.map((mentor) => (
              <UserMSCard
                key={mentor.id}
                name={`${mentor.firstName || ""} ${mentor.lastName || ""}`}
                role={mentor.role}
                email={mentor.email || "No email provided"}
                avatar={mentor.profileImageUrl || "https://via.placeholder.com/150"}
                accentColor={getAccentColor()}
              />
            ))}
          </div>
        )}
      </div>
    </StudentUserLayout>
  );
};

export default StudentsPage;