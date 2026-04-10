import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const onSearchRef = useRef(onSearch);
  const isFirstMount = useRef(true);

  // Keep the ref updated with the latest callback to avoid stale closures
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Debouncing
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearchRef.current(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder="Search for posts by title or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
