import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} /> Prev
      </button>
      
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        className="pagination-btn" 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
