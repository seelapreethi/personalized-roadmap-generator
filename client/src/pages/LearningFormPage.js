import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const LearningFormPage = () => {
  const [formData, setFormData] = useState({
    topics: [],
    skillLevel: '',
    weeklyTime: '',
    goal: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        topics: checked
          ? [...prev.topics, value]
          : prev.topics.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/learning-form', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error. Try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Customize Your Learning Path</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Topics of Interest:</label>
          <div>
            {['Web Development', 'DSA', 'AI', 'Machine Learning', 'Backend'].map((topic) => (
              <label key={topic}>
                <input
                  type="checkbox"
                  name="topics"
                  value={topic}
                  onChange={handleChange}
                />
                {topic}
              </label>
            ))}
          </div>

          <label>Skill Level:</label>
          <select name="skillLevel" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label>Weekly Time Available (hours):</label>
          <input
            type="number"
            name="weeklyTime"
            onChange={handleChange}
            required
          />

          <label>Your Career Goal:</label>
          <input
            type="text"
            name="goal"
            onChange={handleChange}
            required
          />

          <button type="submit" style={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
  },
  submitBtn: {
    padding: '0.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LearningFormPage;
