import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Loader from '../components/Loader';

const API_URL = import.meta.env.VITE_API_URL;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Post not found');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loader />;
  
  if (!post) return (
    <div className="post-detail">
      <h2>Post not found.</h2>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
  );

  return (
    <div className="post-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Go Back
      </button>
      
      <div className="detail-header">
        <h1 className="detail-title">{post.title}</h1>
        <div className="detail-meta">
          <span>Post ID: {post.id}</span>
          <span>User ID: {post.userId}</span>
        </div>
      </div>
      
      <div className="detail-body">
        {post.body}
      </div>
    </div>
  );
};

export default PostDetail;
