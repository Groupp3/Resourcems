import React, { useState, useEffect } from "react";
import StudentResourceLayout from "../../layouts/StudentResourceLayout/StudentResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe } from "lucide-react";

import { getAccessibleResources, uploadResource } from "../../services/ResourceService";
import styles from "./StudentCertificatePage.module.css";

const StudentCertificatePage = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetCertificates = async () => {
    try {
      const publicResources = await getAccessibleResources("image/");
      const privateResources = await getAccessibleResources();

      // Merge resources and avoid duplicates (based on id)
      const mergedResources = [
        ...privateResources,
        ...publicResources.filter(
          (pubItem) =>
            !privateResources.some((privItem) => privItem.id === pubItem.id)
        ),
      ];

      setCertificateData(mergedResources);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAndSetCertificates();
      setLoading(false);
    };

    fetchData();
  }, []);

  const certificateColumns = [
    {
      key: "certificate",
      title: "Certificate",
      render: (item) => (
        <div className="document-info">
          <FileText className="document-icon" size={18} />
          <span className="document-name">{item.filename || item.title}</span>
        </div>
      ),
      width: "40%",
    },
 {
         key: "tags",
         title: "Tags",
         render: (item) => (
           <div className={styles.tagList}>
             {Array.isArray(item.tagNames) && item.tagNames.length > 0 ? (
               item.tagNames.map((tag, id) => (
                 <span key={id} className={styles.tag}>
                   {tag}
                 </span>
               ))
             ) : (
               <span>No tags</span>
             )}
           </div>
         ),
         width: "30%",
       },
       
    {
      key: "access",
      title: "Access",
      render: (item) => (
        <div className="access-icon">
          {item.isPublic === true ? <Globe size={18} /> : <Lock size={18} />}
        </div>
      ),
      width: "20%",
    },
  ];

  const certificateActions = [
    { type: "view", icon: <Eye size={18} />, variant: "default" },
    { type: "download", icon: <Download size={18} />, variant: "primary" },
    { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
  ];

  const certificateBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Certificates" },
  ];

  const handleActionClick = async (actionType, item) => {
    console.log(`${actionType} clicked for`, item);
    // Add logic for view, download, or delete
  };

  const handleUploadSave = async ({ file, isPublic, tags }) => {
    try {
      console.log("Uploading certificate with:", { file, isPublic, tags });
      await uploadResource(file, isPublic, tags);
      await fetchAndSetCertificates();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <StudentResourceLayout
      onUploadSave={handleUploadSave}
      breadcrumbItems={certificateBreadcrumbs}
      pageTitle="Certificates"
    >
      <div className={styles.resourceContent}>
        {loading ? (
          <div>Loading certificates...</div>
        ) : (
          <ListLayout
            type="certificate"
            data={certificateData}
            columns={certificateColumns}
            actions={certificateActions}
            onActionClick={handleActionClick}
            itemsPerPage={5}
            theme="purple"
          />
        )}
      </div>
    </StudentResourceLayout>
  );
};

export default StudentCertificatePage;
