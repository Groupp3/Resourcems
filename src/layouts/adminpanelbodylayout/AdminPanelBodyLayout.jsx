import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/Card/Card";
import { FaUsers, FaChalkboardTeacher, FaUserShield } from "react-icons/fa"; 
import MyCalendar from "../../components/Calender/Calender";  
import './AdminPanelBodyLayout.css';

const AdminPanelBodyLayout = ({ calendarStyle, cardSize }) => {
  const mentorCount = 50;  
  const studentCount = 200;  
  const adminCount = 5;  

  return (
    <div className="container-fluid p-3 bg-white">
      {/* Welcome Card & Calendar in the same row */}
      <div className="row welcome-calendar-container">
        <div className="col-12 col-md-9 welcome-card">
          <Card 
            title="Welcome, Admin"
            description="Here's an overview of your admin dashboard"
            size="large"
            icon={<FaUserShield />}
            showImage={false}
            color="#d9f99d"  // Light Red (More Saturated)
            
          />
        </div>
        <div className="col-12 col-md-3 calendar-wrapper">
          <MyCalendar style={calendarStyle} />
        </div>
      </div>

      {/* Row for Admin, Mentor, and Student Cards */}
      <div className="row card-container mt-2"> 
        <div className="col-12 col-sm-6 col-md-3">
          <Card 
            title="Mentors"
            description={mentorCount}  
            size={cardSize}
            icon={<FaChalkboardTeacher />}
            showImage={false}
            color="#fef08a"  // Light Yellow (More Saturated)
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Card 
            title="Students"
            description={studentCount}  
            size={cardSize}
            icon={<FaUsers />}
            showImage={false}
            color="#a7f3d0"  // Light Green (More Saturated)
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
        <Card 
            title="Admins"
            description={adminCount}  
            size={cardSize}
            icon={<FaUserShield />}
            showImage={false}
            color="rgba(233, 213, 255, 0.5)"
            className="glass-card"  // Add the glass effect class
            />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBodyLayout;
