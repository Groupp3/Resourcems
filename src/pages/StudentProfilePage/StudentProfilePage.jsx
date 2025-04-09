import React from "react";
import StudentUserLayout from "../../layouts/StudentUserLayout/StudentUserLayout";
import ProfileLayout from "../../layouts/profilelayout/ProfileLayout";
import "./StudentProfilePage.css"

const StudentProfilePage = () => {
  return (
    <StudentUserLayout>
      <div className="user-profile-page">
        <ProfileLayout />
      </div>
    </StudentUserLayout>
  );
};

export default StudentProfilePage;
