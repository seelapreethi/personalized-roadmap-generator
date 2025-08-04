import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const roadmapRef = useRef(null); // reference to roadmap content

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

  const handleDownloadPDF = async () => {
  const input = roadmapRef.current;
  if (!input || roadmap.length === 0) return;

  const pdf = new jsPDF();
  const pageHeight = pdf.internal.pageSize.height;
  const marginTop = 20;
  let y = marginTop;

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(40, 40, 40);
  pdf.text('Personalized Learning Roadmap', 105, y, { align: 'center' });
  y += 10;

  // Date of download
  const today = new Date().toLocaleDateString();
  pdf.setFontSize(11);
  pdf.setTextColor(100);
  pdf.text(`Downloaded on: ${today}`, 105, y, { align: 'center' });
  y += 10;

  // Line separator
  pdf.setDrawColor(200);
  pdf.line(20, y, 190, y);
  y += 10;

  // Loop through roadmap
  pdf.setFontSize(13);
  pdf.setTextColor(50);

  roadmap.forEach((item, index) => {
    const weekText = `Week ${item.week}: ${item.topic}`;
    const hoursText = `Estimated Hours: ${item.estimatedHours || 'N/A'}`;

    // Check if enough space on page
    if (y + 20 > pageHeight - 20) {
      pdf.addPage();
      y = marginTop;
    }

    pdf.text(weekText, 20, y);
    y += 7;
    pdf.setFontSize(11);
    pdf.setTextColor(80);
    pdf.text(hoursText, 25, y);
    pdf.setFontSize(13);
    pdf.setTextColor(50);
    y += 12;
  });

  // Save
  pdf.save('Personalized_Learning_Roadmap.pdf');
};
const handleSaveRoadmap = async () => {
  const token = localStorage.getItem('token');

  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/roadmap/save`,
      { roadmap },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('✅ Roadmap saved to your account!');
  } catch (err) {
    console.error('Error saving roadmap:', err);
    alert('❌ Failed to save roadmap.');
  }
};


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
          <>
            <div ref={roadmapRef}>
              <ul style={styles.list}>
                {roadmap.map((item) => (
                  <li key={item.week} style={styles.listItem}>
                    <strong>Week {item.week}:</strong> {item.topic}<br />
                    <em>Estimated Hours:</em> {item.estimatedHours || 'N/A'}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={handleDownloadPDF} style={styles.downloadBtn}>
              📄 Download as PDF
            </button>
            <button onClick={handleSaveRoadmap} style={styles.saveBtn}>
  💾 Save Roadmap to Profile
</button>
          </>
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
    padding: '0.7rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  downloadBtn: {
  marginTop: '1rem',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease',
},
saveBtn: {
  marginTop: '1rem',
  marginLeft: '1rem',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease',
},


};

export default RoadmapPage;
