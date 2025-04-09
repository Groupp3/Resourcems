import React from "react";
import StudentLayout from "../../layouts/Studentlayout/StudentLayout";
import StudentPanelBodyLayout from "../../layouts/studentpanelbodylayout/StudentPanelBodyLayout";
import styles from "./Studentpanel.module.css";

const StudentPanel = () => {
  return (
    <StudentLayout>
      <div className={styles.studentlayout}>
        <StudentPanelBodyLayout />
      </div>
    </StudentLayout>
  );
};

export default StudentPanel;
