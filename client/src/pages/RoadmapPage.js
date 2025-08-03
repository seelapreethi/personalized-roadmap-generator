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
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 10;
    if (imgHeight > pageHeight) {
      // Split into pages if content too long
      pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, y, imgWidth, imgHeight);
    }

    pdf.save('My_Roadmap.pdf');
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
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RoadmapPage;
