import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1>
            <Compass size={28} color="#3b82f6" />
            Post Explorer
          </h1>
        </Link>
      </nav>
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;
