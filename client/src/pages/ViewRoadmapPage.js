// client/src/pages/ViewRoadmapPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ViewRoadmapPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/form', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Your Personalized Roadmap</h2>
        {loading ? (
          <p>Loading...</p>
        ) : formData ? (
          <div style={styles.card}>
            <p><strong>Skill Level:</strong> {formData.skillLevel}</p>
            <p><strong>Preferred Tech:</strong> {formData.preferredTech}</p>
            <p><strong>Goals:</strong> {formData.learningGoal}</p>
            <p><strong>Learning Style:</strong> {formData.learningStyle}</p>
            <hr />
            <h4>📍 Suggested Starting Point</h4>
            <p>
              Based on your input, we recommend starting with <strong>{formData.preferredTech}</strong> tutorials on basics. Then dive into real-world projects and explore open-source.
            </p>
          </div>
        ) : (
          <p>No form data found. Please submit the form first.</p>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
};

export default ViewRoadmapPage;
