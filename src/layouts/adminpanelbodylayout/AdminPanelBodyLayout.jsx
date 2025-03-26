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
            color="#FDDFDF"  // Light red
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
            color="#FCF7DE"  // Light yellow
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Card 
            title="Students"
            description={studentCount}  
            size={cardSize}
            icon={<FaUsers />}
            showImage={false}
            color="#DEFDE0"  // Light green
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Card 
            title="Admins"
            description={adminCount}  
            size={cardSize}
            icon={<FaUserShield />}
            showImage={false}
            color="#DEF3FD"  // Light blue
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBodyLayout;
