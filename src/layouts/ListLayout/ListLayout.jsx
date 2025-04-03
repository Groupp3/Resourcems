// ListLayout.js - Updated to use your Pagination component
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

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    
    if (data.length > 0 && currentPage > Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(1);
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage, totalItems]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`data-layout layout-theme-${theme}`}>
      {(title || description) && (
        <div className="data-layout-header">
          {title && <h2 className="data-layout-title">{title}</h2>}
          {description && <p className="data-layout-description">{description}</p>}
        </div>
      )}

      {totalItems > 0 ? (
        <>
          <div className="data-layout-content">
            <List 
              type={type} 
              data={displayData} 
              columns={columns} 
              actions={actions} 
              onActionClick={onActionClick} 
              theme={theme}
            />
          </div>
          
          {totalPages > 1 && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              theme={theme}
            />
          )}
        </>
      ) : (
        <div className="data-layout-empty">No items available</div>
      )}
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