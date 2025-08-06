import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check token whenever route changes
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>RouteCrafter</h2>
      <div style={styles.links}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/learning-form" style={styles.link}>Learning Form</Link>
            <Link to="/view-roadmap" style={styles.link}>View Roadmap</Link>
            
  <Link to="/roadmap" style={styles.link}>Roadmap</Link>
<Link to="/my-roadmaps" className="hover:text-blue-400">My Roadmaps</Link>


            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '1rem 2rem',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    padding: '0.5rem 1rem',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default Navbar;
