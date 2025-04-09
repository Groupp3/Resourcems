import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  UserPlus, 
  Trash, 
  Lock, 
  Globe 
} from 'lucide-react';
import List from './List';

export default {
  title: 'Components/List',
  component: List,
};



// Document List Example
export const DocumentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const documentData = [
    { 
      id: 1, 
      name: 'Project Proposal.pdf', 
      type: 'PDF', 
      size: '2.5 MB', 
      uploadedBy: 'John Doe',
      access: 'public'
    },
    { 
      id: 2, 
      name: 'Financial Report.xlsx', 
      type: 'Excel', 
      size: '1.2 MB', 
      uploadedBy: 'Jane Smith',
      access: 'private'
    },
    { 
      id: 3, 
      name: 'Marketing Strategy.docx', 
      type: 'Word', 
      size: '3.7 MB', 
      uploadedBy: 'Mike Johnson',
      access: 'public'
    },
    { 
      id: 4, 
      name: 'Q2 Results.pdf', 
      type: 'PDF', 
      size: '5.1 MB', 
      uploadedBy: 'Sarah Williams',
      access: 'private'
    },
    { 
      id: 5, 
      name: 'Product Roadmap.pptx', 
      type: 'PowerPoint', 
      size: '8.3 MB', 
      uploadedBy: 'David Lee',
      access: 'public'
    }
  ];

  const documentColumns = [
    {
      key: 'document',
      title: 'Document',
      render: (item) => (
        <div className="document-info">
          <FileText className="document-icon" size={18} />
          <span className="document-name">{item.name}</span>
        </div>
      ),
      width: '40%'
    },
    {
      key: 'uploadedBy',
      title: 'Uploaded By',
      width: '30%'
    },
    {
      key: 'access',
      title: 'Access',
      render: (item) => (
        <div className="access-icon">
          {item.access === 'public' ? <Globe size={18} /> : <Lock size={18} />}
        </div>
      ),
      width: '20%'
    }
  ];

  const documentActions = [
    { 
      type: 'view', 
      icon: <Eye size={18} />,
      variant: 'default'
    },
    { 
      type: 'download', 
      icon: <Download size={18} />,
      variant: 'primary'
    },
    { 
      type: 'delete', 
      icon: <Trash2 size={18} />,
      variant: 'danger'
    }
  ];

  const handleActionClick = (actionType, item) => {
    if (actionType === 'bulkDelete') {
      console.log(`Bulk deleting items with IDs:`, item);
    } else {
      console.log(`${actionType} clicked for`, item);
    }
  };

  return (
    <List
      type="document"
      data={documentData}
      columns={documentColumns}
      actions={documentActions}
      onActionClick={handleActionClick}
      itemsPerPage={3}
      theme="purple"
    />
  );
};

// Request List Example
export const RequestList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const requestData = [
    { 
      id: 1, 
      number: '#001', 
      username: 'John Doe', 
      email: 'john@example.com', 
      role: 'Student' 
    },
    { 
      id: 2, 
      number: '#002', 
      username: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Mentor' 
    },
    { 
      id: 3, 
      number: '#003', 
      username: 'Anjana Sivakumar', 
      email: 'anjana@example.com', 
      role: 'Student' 
    },
    { 
      id: 4, 
      number: '#004', 
      username: 'Robert Chen', 
      email: 'robert@example.com', 
      role: 'Mentor' 
    },
    { 
      id: 5, 
      number: '#005', 
      username: 'Maria Garcia', 
      email: 'maria@example.com', 
      role: 'Admin' 
    },
    { 
      id: 6, 
      number: '#006', 
      username: 'David Kumar', 
      email: 'david@example.com', 
      role: 'Student' 
    }
  ];

  const requestColumns = [
    {
      key: 'number',
      title: 'Request #',
      width: '15%'
    },
    {
      key: 'username',
      title: 'Name',
      width: '25%'
    },
    {
      key: 'email',
      title: 'Email',
      width: '30%'
    },
    {
      key: 'role',
      title: 'Role',
      width: '20%'
    }
  ];

  const requestActions = [
    { 
      type: 'edit', 
      icon: <Edit size={18} />,
      variant: 'default'
    },
    { 
      type: 'add', 
      icon: <UserPlus size={18} />,
      variant: 'primary'
    },
    { 
      type: 'delete', 
      icon: <Trash size={18} />,
      variant: 'danger'
    }
  ];

  const handleActionClick = (actionType, item) => {
    if (actionType === 'bulkDelete') {
      console.log(`Bulk deleting items with IDs:`, item);
    } else {
      console.log(`${actionType} clicked for`, item);
    }
  };
  

  return (
    <List
      type="request"
      data={requestData}
      columns={requestColumns}
      actions={requestActions}
      onActionClick={handleActionClick}
      itemsPerPage={4}
      theme="green"
    />
  );
};


