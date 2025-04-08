import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import MyCalendar from "../../components/Calender/Calender";
import './MentorPanelBodyLayout.css';
import { getUsersByRole } from "../../services/AdminService";

const MentorPanelBodyLayout = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found! Redirecting to login.");
        navigate("/auth/login");
        return;
      }

      try {
        const allUsers = await getUsersByRole();

        // Count users by role
        let students = 0;
        let mentors = 0;

        allUsers.forEach(user => {
          if (user.role === "MENTOR") mentors++;
          if (user.role === "STUDENT") students++;
        });

        // Update state
        setMentorCount(mentors);
        setStudentCount(students);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching users: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Format numbers with comma separators
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container-fluid">
      {/* Welcome section with calendar */}
      <div className="row">
        <div className="col-12 col-lg-9 mb-4 mb-lg-0">
          <div className="card mentor-welcome-panel h-100">
            <div className="pattern-overlay"></div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="mb-3 d-flex align-items-center">
                    <FaGraduationCap className="me-3" style={{ color: "#4ecaff", fontSize: "1.8rem" }} />
                    Welcome to EduVault Mentor
                  </h2>
                  <p className="mb-0">Manage your mentoring tasks and monitor your students.</p>
                </div>
                <div className="d-none d-lg-block position-relative">
                  <div className="position-relative" style={{ width: "120px", height: "120px" }}>
                    <div style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "rgba(78, 202, 255, 0.2)",
                      transform: "scale(1.2)",
                      zIndex: 0
                    }}></div>
                    <div style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1
                    }}>
                      <FaGraduationCap style={{ color: "#4ecaff", fontSize: "3rem" }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-end">
                <span className="badge bg-info text-dark py-2 px-3 rounded-pill">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-3">
          <div className="calendar-wrapper h-100">
            <MyCalendar />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        {/* Mentors Card */}
        <div className="col-12 col-sm-6 col-lg-4 mb-4">
          <div className={`card card-mentors ${isLoading ? 'is-loading' : ''}`}>
            <div className="card-body">
              <div className="card-icon">
                <FaChalkboardTeacher size={24} />
              </div>
              <h6>TOTAL MENTORS</h6>
              <h2 className="card-description">{formatNumber(mentorCount)}</h2>
              <div className="mt-auto pt-3">
              </div>
            </div>
          </div>
        </div>
        
        {/* Students Card */}
        <div className="col-12 col-sm-6 col-lg-4 mb-4">
          <div className={`card card-students ${isLoading ? 'is-loading' : ''}`}>
            <div className="card-body">
              <div className="card-icon">
                <FaUsers size={24} />
              </div>
              <h6>TOTAL STUDENTS</h6>
              <h2 className="card-description">{formatNumber(studentCount)}</h2>
              <div className="mt-auto pt-3">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPanelBodyLayout;
