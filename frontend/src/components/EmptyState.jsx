import { SearchX } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <SearchX size={64} />
      <h2>No results found</h2>
      <p>Try adjusting your search criteria</p>
    </div>
  );
};

export default EmptyState;
