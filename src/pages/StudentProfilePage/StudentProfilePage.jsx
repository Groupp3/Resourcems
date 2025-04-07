import React from "react";
import StudentLayout from "../../layouts/Studentlayout/StudentLayout";
import ProfileLayout from "../../layouts/profilelayout/ProfileLayout";
import "./StudentProfilePage.css"

const StudentProfilePage = () => {
  return (
    <StudentLayout>
      <div className="user-profile-page">
        <ProfileLayout />
      </div>
    </StudentLayout>
  );
};

export default StudentProfilePage;
