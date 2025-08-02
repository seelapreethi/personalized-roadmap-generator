import React, { useState } from 'react';
import axios from 'axios';

const LearningFormPage = () => {
  const [formData, setFormData] = useState({
    goal: '',
    skillLevel: '',
    weeklyTime: '',
    topics: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5000/api/learning-form', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Form submitted successfully!');
      console.log('Saved form:', res.data);

      // Optional: Reset form
      setFormData({
        goal: '',
        skillLevel: '',
        weeklyTime: '',
        topics: '',
      });
    } catch (err) {
      console.error('Form submission failed:', err.response?.data || err.message);
      setMessage('❌ Submission failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>📄 Personalized Learning Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Learning Goal</label>
          <input
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Current Skill Level</label>
          <input
            type="text"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Weekly Available Time (hrs)</label>
          <input
            type="text"
            name="weeklyTime"
            value={formData.weeklyTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Topics of Interest (comma-separated)</label>
          <input
            type="text"
            name="topics"
            value={formData.topics}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LearningFormPage;
