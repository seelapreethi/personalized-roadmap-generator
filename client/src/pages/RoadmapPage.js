import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(null);
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

  const handleDownloadPDF = () => {
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
      <motion.div
        className="p-6 font-sans min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-300 drop-shadow-lg">
          Your Personalized Learning Roadmap
        </h2>

        {loading ? (
          <p className="text-lg text-gray-300 text-center">Loading roadmap...</p>
        ) : error ? (
          <p className="text-red-400 text-lg text-center">{error}</p>
        ) : roadmap.length === 0 ? (
          <p className="text-gray-300 text-center">No roadmap available.</p>
        ) : (
          <>
            <div ref={roadmapRef} className="max-w-3xl mx-auto">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.week}
                  className="mb-4 p-5 rounded-lg border border-[#39FF14] bg-gray-800/80 shadow-lg shadow-[#39FF14]/30 cursor-pointer"
                  whileHover={{ scale: 1.02, boxShadow: '0px 0px 15px #39FF14' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    setExpandedWeek(expandedWeek === item.week ? null : item.week)
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-pink-400">
                      Week {item.week}: {item.topic}
                    </h3>
                    <span className="text-sm text-teal-300">
                      {item.estimatedHours || 'N/A'} hrs
                    </span>
                  </div>

                  {expandedWeek === item.week && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-gray-300"
                    >
                      <p>
                        <strong>Details:</strong> This week focuses on{' '}
                        {item.topic}. Stay consistent and dedicate{' '}
                        {item.estimatedHours || 'a set number of'} hours.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <motion.button
                onClick={handleDownloadPDF}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70"
                whileHover={{ scale: 1.05 }}
              >
                📄 Download as PDF
              </motion.button>

              <motion.button
                onClick={handleSaveRoadmap}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70"
                whileHover={{ scale: 1.05 }}
              >
                💾 Save to Profile
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default RoadmapPage;
