import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange, 
  theme = 'default' 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers with ellipses for large page counts
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page, ellipsis, current page and neighbors, ellipsis, last page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`pagination-container ${theme}`}>
      <button 
        className="pagination-button prev" 
        onClick={handlePrevClick} 
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      
      <div className="pagination-list">
        {pageNumbers.map((number, index) => (
          number === '...' ? 
          <li key={`ellipsis-${index}`} className="pagination-ellipsis">...</li> :
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? 'active' : ''}
            aria-label={`Page ${number}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
      </div>

      <button 
        className="pagination-button next" 
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
      
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  theme: PropTypes.string
};

export default Pagination;