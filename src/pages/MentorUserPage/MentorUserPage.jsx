import React, { useState, useEffect } from "react";
import { getUsersByRole } from "../../services/AdminService";  // Assuming this function fetches users by role
import MentorLayout from "../../layouts/MentorLayout/MentorLayout";
import "./MentorUserPage.css";

const MentorUserPage = () => {
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      setIsLoading(true);
      try {
        const usersData = await getUsersByRole("MENTOR"); // Fetch all mentors
        // Filter the mentor data to find the logged-in mentor by matching the user ID (or any other unique property)
        const loggedInMentor = usersData.find(user => user.id === "loggedInMentorId"); // Replace with actual logic for logged-in mentor ID
        setMentor(loggedInMentor);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load mentor details.");
        setIsLoading(false);
      }
    };

    fetchMentorDetails();
  }, []);

  return (
    <MentorLayout>
      <div className="mentor-user-page">
        <div className="mentor-user-header">
          <h1>Welcome, {mentor ? mentor.firstName : "Mentor"}!</h1>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading your details...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : mentor ? (
          <div className="mentor-details">
            <div className="mentor-info">
              <img
                src={mentor.profileImageUrl || "https://via.placeholder.com/150"}
                alt={`${mentor.firstName} ${mentor.lastName}`}
                className="mentor-avatar"
              />
              <div className="mentor-basic-info">
                <h2>{mentor.firstName} {mentor.lastName}</h2>
                <p>Email: {mentor.email}</p>
                <p>Role: {mentor.role}</p>
              </div>
            </div>
            
            <div className="mentor-tasks">
              <h3>Your Assigned Tasks</h3>
              <ul>
                {mentor.tasks && mentor.tasks.length > 0 ? (
                  mentor.tasks.map((task, index) => (
                    <li key={index} className="mentor-task-item">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </li>
                  ))
                ) : (
                  <p>No tasks assigned yet.</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="empty-state">Mentor details not found.</div>
        )}
      </div>
    </MentorLayout>
  );
};

export default MentorUserPage;
