import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe } from "lucide-react";
import styles from  "./ResourcePage.module.css";

const documentData = [
  { id: 1, name: "Project Proposal.pdf", type: "PDF", size: "2.5 MB", uploadedBy: "John Doe", access: "public" },
  { id: 2, name: "Financial Report.xlsx", type: "Excel", size: "1.2 MB", uploadedBy: "Jane Smith", access: "private" },
  { id: 3, name: "Marketing Strategy.docx", type: "Word", size: "3.7 MB", uploadedBy: "Mike Johnson", access: "public" },
  { id: 4, name: "Q2 Results.pdf", type: "PDF", size: "5.1 MB", uploadedBy: "Sarah Williams", access: "private" },
  { id: 5, name: "Product Roadmap.pptx", type: "PowerPoint", size: "8.3 MB", uploadedBy: "David Lee", access: "public" }
];

const documentColumns = [
  {
    key: "document",
    title: "Document",
    render: (item) => (
      <div className="document-info">
        <FileText className="document-icon" size={18} />
        <span className="document-name">{item.name}</span>
      </div>
    ),
    width: "40%",
  },
  {
    key: "uploadedBy",
    title: "Uploaded By",
    width: "30%",
  },
  {
    key: "access",
    title: "Access",
    render: (item) => (
      <div className="access-icon">
        {item.access === "public" ? <Globe size={18} /> : <Lock size={18} />}
      </div>
    ),
    width: "20%",
  },
];

const documentActions = [
  { type: "view", icon: <Eye size={18} />, variant: "default" },
  { type: "download", icon: <Download size={18} />, variant: "primary" },
  { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
];

const handleActionClick = (actionType, item) => {
  console.log(`${actionType} clicked for`, item);
};

const ResourcePage = () => {
  return (
    <AdminLayout>
      <div className={styles.adminlayout}>
        <ListLayout
          type="document"
          data={documentData}
          columns={documentColumns}
          actions={documentActions}
          onActionClick={handleActionClick}
          itemsPerPage={3}
          title="Document Resources"
          theme="purple"
        />
      </div>
    </AdminLayout>
  );
};

export default ResourcePage;
