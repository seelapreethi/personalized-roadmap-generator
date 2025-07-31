import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please login again.');
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/protected/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
        setUser(res.data.user);
      } catch (err) {
        console.error('Unauthorized or error fetching data', err);
        setMessage('❌ Unauthorized. Please login again.');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>{message}</h2>
        {user && (
          <p>
            Logged in as: <strong>{user.name || 'N/A'}</strong> ({user.email || 'No email'})
          </p>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
};

export default DashboardPage;
