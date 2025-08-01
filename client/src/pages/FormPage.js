// client/src/pages/FormPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [formData, setFormData] = useState({
    skillLevel: '',
    learningGoal: '',
    preferredTech: '',
    duration: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/forms/submit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Form submitted successfully');
      navigate('/dashboard'); // Redirect to dashboard after submission
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Personalized Learning Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="skillLevel"
          placeholder="Skill Level"
          value={formData.skillLevel}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="learningGoal"
          placeholder="Learning Goal"
          value={formData.learningGoal}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="preferredTech"
          placeholder="Preferred Technology"
          value={formData.preferredTech}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 1 month)"
          value={formData.duration}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default FormPage;
