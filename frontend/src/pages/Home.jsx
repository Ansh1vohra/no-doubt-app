import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import PostList from '../components/PostList';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';

const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;
  
  const wsRef = useRef(null);

  // Initialize data and WebSockets
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch initial posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // WebSocket Setup
    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    wsRef.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.type === 'results') {
        setFilteredPosts(parsed.data);
        setLoading(false);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Handle Search Input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on new search
    
    if (query.trim() === '') {
      setFilteredPosts(posts);
      setLoading(false);
      return;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      setLoading(true);
      wsRef.current.send(JSON.stringify({
        type: 'search',
        query: query
      }));
    }
  };

  // Calculate current posts slice
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <Loader />
      ) : filteredPosts.length > 0 ? (
        <>
          <PostList posts={currentPosts} />
          <Pagination 
            totalItems={filteredPosts.length} 
            itemsPerPage={POSTS_PER_PAGE} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Home;
