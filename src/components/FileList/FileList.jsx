import React from 'react';
import styles from './FileList.module.css';
import {
  Folder,
  FileText,
  FileSpreadsheet,
  VideoIcon,
  BadgeCheckIcon,
} from 'lucide-react';

const FileList = ({ files }) => {
  const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return '';
    return sizeInBytes < 1024
      ? `${sizeInBytes} B`
      : sizeInBytes < 1024 * 1024
      ? `${Math.round(sizeInBytes / 1024)} KB`
      : `${Math.round(sizeInBytes / (1024 * 1024))} MB`;
  };

  const getFileIcon = (file) => {
    if (file.type === "Folder") return <Folder size={20} />;
    if (file.name.endsWith('.pdf')) return <FileText size={20} />;
    if (file.name.endsWith('.xlsx')) return <FileSpreadsheet size={20} />;
    if (file.name.endsWith('.mp4')) return <VideoIcon size={20} />;
    if (file.name.endsWith('.png')) return <BadgeCheckIcon size={20} />;
    if (file.name.endsWith('.jpeg')) return <BadgeCheckIcon size={20} />;
    if (file.name.endsWith('.svg')) return <BadgeCheckIcon size={20} />;
    return <FileText size={20} />;
  };

  const getIconBgClass = (file) => {
    if (file.type === "Folder") return styles.folderIconBg;
    if (file.name.endsWith('.pdf')) return styles.documentIconBg;
    if (file.name.endsWith('.xlsx')) return styles.spreadsheetIconBg;
    return styles.documentIconBg;
  };

  const getAccessBadgeClass = (access) =>
    access.toLowerCase() === "public" ? styles.publicBadge : styles.privateBadge;

  const getUploadedDate = (modifiedAt) => {
    if (!modifiedAt) return '';
    const date = new Date(modifiedAt);
    const now = new Date();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return `a few seconds ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (weeks < 5) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;

    return `${date.toLocaleDateString()}`;
  };

  return (
    <div className={styles.fileListContainer}>
      <div className={styles.fileListHeader}>
        <div></div> 
        <div>Name</div>
        <div>Type</div>
        <div>File size</div>
        <div>Access</div>
        <div>Date</div>
      </div>

      <div className={styles.fileItems}>
        {files.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <div className={`${styles.fileIconContainer} ${getIconBgClass(file)}`}>
              {getFileIcon(file)}
            </div>
            <div className={styles.fileName}>{file.name}</div>
            <div className={styles.fileType}>{file.type}</div>
            <div className={styles.fileSize}>{formatFileSize(file.fileSize)}</div>
            <div className={styles.fileAccess}>
              <span className={`${styles.visibilityBadge} ${getAccessBadgeClass(file.access)}`}>
                {file.access}
              </span>
            </div>
            <div className={styles.fileDate}>{getUploadedDate(file.modifiedAt)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
