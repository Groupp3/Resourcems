import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/Card/Card";
import { FaUsers, FaChalkboardTeacher, FaUserShield } from "react-icons/fa"; 
import MyCalendar from "../../components/Calender/Calender";  
import AdminService from "../../service/AdminService";  
import './AdminPanelBodyLayout.css';

const AdminPanelBodyLayout = ({ calendarStyle, cardSize }) => {
  const [counts, setCounts] = useState({ mentors: 0, students: 0, admins: 0 });

  useEffect(() => {
    const fetchUserCounts = async () => {
      const userCounts = await AdminService.getAllUserCounts();
      setCounts(userCounts);
    };

    fetchUserCounts();
  }, []);

  return (
    <div className="container-fluid p-3 bg-white">
      <div className="row">
        <div className="col-12 col-md-9">  
          <Card 
            title="Welcome, Admin"
            description="Here's an overview of your admin dashboard"
            size="large"
            icon={<FaUserShield />}
            showImage={false}
            backgroundColor="#E3F5EE"
          />
        </div>
        <div className="col-12 col-md-3">  
          <MyCalendar style={calendarStyle} />
        </div>
      </div>

      <div className="row mt-2"> 
        <div className="col-12 col-md-3">
          <Card 
            title="Mentors"
            description={counts.mentors}  
            size={cardSize}
            icon={<FaChalkboardTeacher />}
            showImage={false}
          />
        </div>
        <div className="col-12 col-md-3">
          <Card 
            title="Students"
            description={counts.students}  
            size={cardSize}
            icon={<FaUsers />}
            showImage={false}
          />
        </div>
        <div className="col-12 col-md-3">
          <Card 
            title="Admins"
            description={counts.admins}  
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
