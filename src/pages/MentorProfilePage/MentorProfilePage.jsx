import React from "react";
import MentorLayout from "../../layouts/MentorLayout/MentorLayout";
import ProfileLayout from "../../layouts/profilelayout/ProfileLayout";
import "./MentorProfilePage.css"

const StudentProfilePage = () => {
  return (
    <MentorLayout>
      <div className="user-profile-page">
        <ProfileLayout />
      </div>
    </MentorLayout>
  );
};

export default StudentProfilePage;
