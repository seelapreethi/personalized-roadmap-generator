import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('❌ No token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/roadmap`,
          {
            goal: 'Web Development',
            skillLevel: 'Beginner',
            weeklyTime: '5',
            topics: 'HTML,CSS,JavaScript',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoadmap(res.data.roadmap);
      } catch (err) {
        console.error('Error fetching roadmap:', err);
        setError('❌ Error fetching roadmap.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Personalized Learning Roadmap</h2>

        {loading ? (
          <p style={styles.message}>Loading roadmap...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: 'red' }}>{error}</p>
        ) : roadmap.length === 0 ? (
          <p style={styles.message}>No roadmap available.</p>
        ) : (
          <ul style={styles.list}>
            {roadmap.map((item) => (
              <li key={item.week} style={styles.listItem}>
                <strong>Week {item.week}:</strong> {item.topic}
                <br />
                <span style={styles.hours}>Estimated Hours: {item.estimatedHours}</span>
              </li>
            ))}
          </ul>
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
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  message: {
    fontSize: '1rem',
    color: '#666',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  listItem: {
    padding: '1rem',
    margin: '0.5rem auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    textAlign: 'left',
  },
  hours: {
    fontSize: '0.9rem',
    color: '#555',
  },
};

export default RoadmapPage;
