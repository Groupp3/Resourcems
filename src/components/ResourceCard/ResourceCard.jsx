import React from "react";
import styles from "./ResourceCard.module.css";
import { BookIcon } from "lucide-react";
 
const ResourceCard = ({ title = "Documents", noFiles = 0, color = "#ff9900" }) => {
  return (
    <div className={styles.resourceCard}>
      <div className={styles.iconSection}>
        <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
          <BookIcon size={20} />
        </div>
        <h3>{title}</h3>
      </div>
      <p className={styles.storageText}>{noFiles} files</p>
    </div>
  );
};
 
export default ResourceCard;
 