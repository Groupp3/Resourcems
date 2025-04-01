import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { Edit, Trash2 } from "lucide-react";
import styles from  "./RequestPage.module.css";

const requestList = [
  { id: 1, number: "#001", username: "John Doe", email: "john@example.com", role: "Student" },
  { id: 2, number: "#002", username: "Jane Smith", email: "jane@example.com", role: "Mentor" },
  { id: 3, number: "#003", username: "Anjana Sivakumar", email: "anjana@example.com", role: "Student" },
  { id: 4, number: "#004", username: "Robert Chen", email: "robert@example.com", role: "Mentor" },
  { id: 5, number: "#005", username: "Maria Garcia", email: "maria@example.com", role: "Admin" },
  { id: 6, number: "#006", username: "David Kumar", email: "david@example.com", role: "Student" },
];

const columns = [
  { key: "number", title: "Request #", width: "15%" },
  { key: "username", title: "Name", width: "25%" },
  { key: "email", title: "Email", width: "30%" },
  { key: "role", title: "Role", width: "20%" },
];

const actions = [
  { type: "edit", icon: <Edit size={18} />, variant: "default" },
  { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
];

const RequestPage = () => {
  const [data, setData] = useState(requestList);

  const handleActionClick = (actionType, item) => {
    if (actionType === "delete") {
      setData((prevData) => prevData.filter((req) => req.id !== item.id));
    } else {
      console.log(`${actionType} clicked for`, item);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.adminlayout}>
        <ListLayout
          type="request"
          data={data}
          columns={columns}
          actions={actions}
          onActionClick={handleActionClick}
          itemsPerPage={4}
          theme="green"
          title="Access Requests"
        />
      </div>
    </AdminLayout>
  );
};

export default RequestPage;