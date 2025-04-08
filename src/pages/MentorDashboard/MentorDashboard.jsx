import React from "react";
import MentorLayout from "../../layouts/MentorLayout/MentorLayout";
import MentorPanelBodyLayout from "../../layouts/mentorpanelbodylayout/MentorPanelBodyLayout";
import styles from "./MentorDashboard.module.css";

const MentorDashboard = () => {
  return (
    <MentorLayout>
      <div className={styles.mentorLayout}>
        <MentorPanelBodyLayout />
      </div>
    </MentorLayout>
  );
};

export default MentorDashboard;
