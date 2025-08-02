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
        <h2>Your Personalized Learning Roadmap</h2>

        {loading ? (
          <p>Loading roadmap...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : roadmap.length === 0 ? (
          <p>No roadmap available.</p>
        ) : (
          <ul style={styles.list}>
            {roadmap.map((item) => (
              <li key={item.week} style={styles.listItem}>
                <strong>Week {item.week}:</strong> {item.topic}
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
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  listItem: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #ccc',
  },
};

export default RoadmapPage;
