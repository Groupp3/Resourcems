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
      
      <div className="row">
        <div className="col-12 col-md-9 ">  
        <Card 
          title="Welcome, Admin"
          description="Here's an overview of your admin dashboard"
          size="large"
          icon={<FaUserShield />}
          showImage={false}
          backgroundColor="#E3F5EE"
         
        />

        </div>
        <div className="col-12 col-md-3 ">  
          <MyCalendar style={calendarStyle} />
        </div>
      </div>

      
      <div className="row mt-2"> 
        <div className="col-12 col-md-3">
          <Card 
            title="Mentors"
            description={mentorCount}  
            size={cardSize}
            icon={<FaChalkboardTeacher />}
            showImage={false}
          />
        </div>
        <div className="col-12 col-md-3">
          <Card 
            title="Students"
            description={studentCount}  
            size={cardSize}
            icon={<FaUsers />}
            showImage={false}
          />
        </div>
        <div className="col-12 col-md-3">
          <Card 
            title="Admins"
            description={adminCount}  
            size={cardSize}
            icon={<FaUserShield />}
            showImage={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBodyLayout;
