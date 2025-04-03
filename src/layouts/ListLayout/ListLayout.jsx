import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '../../components/List/List';
import Pagination from '../../components/Pagination/Pagination';
import './ListLayout.css';

const ListLayout = ({
  data = [], 
  type = "document",
  columns,
  actions,
  onActionClick,
  itemsPerPage = 10,
  theme = "default",
  title,
  description,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  const totalItems = data.length;

  useEffect(() => {
    if (data.length > 0 && currentPage > Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(1);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage, totalItems]);

  return (
    <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        {/* Sidebar content goes here */}
      </div>

      {/* Main Content */}
      <div className="data-layout">
        {(title || description) && (
          <div className="data-layout-header">
            {title && <h2 className="data-layout-title">{title}</h2>}
            {description && <p className="data-layout-description">{description}</p>}
          </div>
        )}

        {totalItems > 0 ? (
          <>
            <List 
              type={type} 
              data={displayData} 
              columns={columns} 
              actions={actions} 
              onActionClick={onActionClick} 
              theme={theme}
            />
            
            <Pagination 
              totalItems={totalItems} 
              itemsPerPage={itemsPerPage} 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
              theme={theme}
            />
          </>
        ) : (
          <div className="data-layout-empty">No items available</div>
        )}
      </div>
    </div>
  );
};

ListLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['document', 'request']),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.string,
      className: PropTypes.string
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      variant: PropTypes.oneOf(['default', 'primary', 'danger'])
    })
  ),
  onActionClick: PropTypes.func,
  itemsPerPage: PropTypes.number,
  theme: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ListLayout;
