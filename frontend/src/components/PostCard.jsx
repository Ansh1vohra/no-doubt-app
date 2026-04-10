import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="view-details">
        Read more <ArrowRight size={16} />
      </div>
    </Link>
  );
};

export default PostCard;
