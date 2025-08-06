// frontend/src/pages/MySavedRoadmapsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const MySavedRoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/roadmaps/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoadmaps(response.data.reverse());
      } catch (error) {
        console.error('Failed to fetch roadmaps:', error);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/roadmaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmaps((prev) => prev.filter((roadmap) => roadmap._id !== id));
    } catch (error) {
      console.error('Failed to delete roadmap:', error);
    }
  };

  const handleDownload = (roadmap) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🎓 Personalized Learning Roadmap', 10, 20);
    doc.setFontSize(12);
    doc.text(`Domain: ${roadmap.domain}`, 10, 30);
    doc.text(`Skill Level: ${roadmap.level}`, 10, 40);
    doc.text(`Time Availability: ${roadmap.timeAvailability}`, 10, 50);
    doc.text('---------------------------', 10, 60);

    let y = 70;
    roadmap.roadmap.split('\n').forEach((line) => {
      if (y >= 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save(`${roadmap.domain}_roadmap.pdf`);
  };

  const handleView = (roadmap) => {
    alert(`Roadmap:\n\n${roadmap.roadmap}`);
    // You can replace this alert with a modal later.
  };

  return (
    <div className="container mx-auto mt-8 p-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 My Saved Roadmaps</h2>
      {roadmaps.length === 0 ? (
        <p className="text-center text-gray-500">No saved roadmaps found.</p>
      ) : (
        <div className="space-y-6">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                {roadmap.domain} Roadmap ({roadmap.level})
              </h3>
              <p className="mb-2 text-gray-600">
                Time Availability: <strong>{roadmap.timeAvailability}</strong>
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => handleView(roadmap)}
                >
                  View
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDownload(roadmap)}
                >
                  Download PDF
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(roadmap._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySavedRoadmapsPage;
