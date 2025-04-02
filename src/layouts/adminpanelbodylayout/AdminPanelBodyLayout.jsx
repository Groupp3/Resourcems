import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirect
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/Card/Card";
import { FaUsers, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import MyCalendar from "../../components/Calender/Calender";  
import AdminService from "../../service/AdminService";  
import './AdminPanelBodyLayout.css';
import { getUsersByRole } from "../../services/AdminService"; 

const AdminPanelBodyLayout = ({ calendarStyle, cardSize }) => {
  const [mentorCount, setMentorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const navigate = useNavigate(); // To redirect to login if token is missing

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("Token before request:", token ? "Token exists" : "No token found"); 

      if (!token) {
        console.error("No token found! Redirecting to login.");
        navigate("/portfolio/login"); // Redirect to login if no token
        return;
      }

      try {
        const allUsers = await getUsersByRole();  // Fetch all users

        // Counting the number of users based on their roles
        let mentorCount = 0;
        let studentCount = 0;
        let adminCount = 0;

        allUsers.forEach(user => {
          if (user.role === "MENTOR") mentorCount++;
          if (user.role === "STUDENT") studentCount++;
          if (user.role === "ADMIN") adminCount++;
        });

        // Update state
        setMentorCount(mentorCount);
        setStudentCount(studentCount);
        setAdminCount(adminCount);

      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchData();
  }, [navigate]);

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
