// src/components/AdminPanelBodyLayout.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/Card/Card";
import { FaUsers, FaChalkboardTeacher, FaUserShield } from "react-icons/fa"; // Icons for cards
import MyCalendar from "../../components/Calender/Calender";  // Import Calendar component
import './AdminPanelBodyLayout.css';

const AdminPanelBodyLayout = ({
  cardStyle,
  calendarStyle,
  cardSize,
  iconSize,
}) => {
  // Fixed numbers for Mentor, Student, and Admin counts
  const mentorCount = 50;  // Fixed number for mentors
  const studentCount = 200;  // Fixed number for students
  const adminCount = 5;  // Fixed number for admins

  return (
    <div className="container-fluid p-4 bg-white">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <Card 
            title="Welcome, Admin"
            description="Here's an overview of your admin dashboard"
            style={cardStyle}
            size="large"
            icon={<FaUserShield />}  // Default icon for welcome card
          />
        </div>
        <div className="col-12 col-md-6">
          <MyCalendar style={calendarStyle} />  {/* Add Calendar next to the welcome card */}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <Card 
            title={<><FaChalkboardTeacher /> Mentors</>}
            description={mentorCount}  // Display fixed number for mentors
            style={cardStyle}
            size={cardSize}
            icon={<FaChalkboardTeacher />}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <Card 
            title={<><FaUsers /> Students</>}
            description={studentCount}  // Display fixed number for students
            style={cardStyle}
            size={cardSize}
            icon={<FaUsers />}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <Card 
            title={<><FaUserShield /> Admins</>}
            description={adminCount}  // Display fixed number for admins
            style={cardStyle}
            size={cardSize}
            icon={<FaUserShield />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBodyLayout;





































































