import React from "react";
import styles from "./ResourceCard.module.css";
import {
  BookIcon,
  VideoIcon,
  BadgeCheckIcon,
  FileTextIcon,
  } from "lucide-react";
const iconMap = {
  documents: <FileTextIcon size={24} />,
  books: <BookIcon size={24} />,
  videos: <VideoIcon size={24} />,
  certificate: <BadgeCheckIcon size={24} />,
};

const getIconByTitle = (title) => {
  const key = title.toLowerCase();
  if (key.includes("document")) return iconMap.documents;
  if (key.includes("book")) return iconMap.books;
  if (key.includes("videos")) return iconMap.videos;
  if (key.includes("certificates") || key.includes("excel")) return iconMap.certificate;
  return iconMap.books; 
};

const ResourceCard = ({ title = "Documents", noFiles = 0, color = "#ff9900" }) => {
  return (
    <div className={styles.resourceCard}>
      <div className={styles.iconSection}>
        <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
          {getIconByTitle(title)}
        </div>
        <h3>{title}</h3>
      </div>
      <p className={styles.storageText}>{noFiles} files</p>
    </div>
  );
};

export default ResourceCard;
