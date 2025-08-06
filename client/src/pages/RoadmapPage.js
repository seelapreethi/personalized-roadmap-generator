import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const roadmapRef = useRef(null);

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

    pdf.setFontSize(20);
    pdf.text('Personalized Learning Roadmap', 105, y, { align: 'center' });
    y += 10;

    const today = new Date().toLocaleDateString();
    pdf.setFontSize(11);
    pdf.text(`Downloaded on: ${today}`, 105, y, { align: 'center' });
    y += 10;

    pdf.setDrawColor(200);
    pdf.line(20, y, 190, y);
    y += 10;

    pdf.setFontSize(13);

    roadmap.forEach((item) => {
      const weekText = `Week ${item.week}: ${item.topic}`;
      const hoursText = `Estimated Hours: ${item.estimatedHours || 'N/A'}`;

      if (y + 20 > pageHeight - 20) {
        pdf.addPage();
        y = marginTop;
      }

      pdf.text(weekText, 20, y);
      y += 7;
      pdf.setFontSize(11);
      pdf.text(hoursText, 25, y);
      pdf.setFontSize(13);
      y += 12;
    });

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
      alert('✅ Roadmap saved to your profile!');
    } catch (err) {
      console.error('Error saving roadmap:', err);
      alert('❌ Failed to save roadmap.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 text-center font-sans bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Your Personalized Learning Roadmap</h2>

        {loading ? (
          <p className="text-lg text-gray-600">Loading roadmap...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : roadmap.length === 0 ? (
          <p className="text-gray-600">No roadmap available.</p>
        ) : (
          <>
            <div ref={roadmapRef}>
              <ul className="space-y-4 max-w-2xl mx-auto">
                {roadmap.map((item) => (
                  <li
                    key={item.week}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-left"
                  >
                    <strong>Week {item.week}:</strong> {item.topic}
                    <br />
                    <span className="text-sm text-gray-600">
                      Estimated Hours: {item.estimatedHours || 'N/A'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow"
              >
                📄 Download as PDF
              </button>

              <button
                onClick={handleSaveRoadmap}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow"
              >
                💾 Save to Profile
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RoadmapPage;
