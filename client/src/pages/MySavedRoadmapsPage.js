// frontend/src/pages/MySavedRoadmapsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

const MySavedRoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/roadmaps/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoadmaps(response.data.reverse());
      } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/roadmaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmaps((prev) => prev.filter((roadmap) => roadmap._id !== id));
    } catch (error) {
      console.error("Failed to delete roadmap:", error);
    }
  };

  const handleDownload = (roadmap) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🎓 Personalized Learning Roadmap", 10, 20);
    doc.setFontSize(12);
    doc.text(`Domain: ${roadmap.domain}`, 10, 30);
    doc.text(`Skill Level: ${roadmap.level}`, 10, 40);
    doc.text(`Time Availability: ${roadmap.timeAvailability}`, 10, 50);
    doc.text("---------------------------", 10, 60);

    let y = 70;
    roadmap.roadmap.split("\n").forEach((line) => {
      if (y >= 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save(`${roadmap.domain}_roadmap.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black p-8 text-white">
      <motion.h2
        className="text-4xl font-bold mb-6 text-center text-pink-400 soft-neon"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        📚 My Saved Roadmaps
      </motion.h2>

      {roadmaps.length === 0 ? (
        <p className="text-center text-gray-400">
          No saved roadmaps found. Create one to see it here!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {roadmaps.map((roadmap) => (
            <motion.div
              key={roadmap._id}
              className="bg-gray-800 border border-pink-500 rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px #FF00FF" }}
            >
              <h3 className="text-2xl font-semibold text-teal-300 mb-2">
                {roadmap.domain} ({roadmap.level})
              </h3>
              <p className="text-gray-300 mb-4">
                ⏳ Time: {roadmap.timeAvailability}
              </p>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => alert(roadmap.roadmap)}
                  className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-all"
                >
                  View
                </button>
                <button
                  onClick={() => handleDownload(roadmap)}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleDelete(roadmap._id)}
                  className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style>{`
        .soft-neon {
          text-shadow: 0 0 3px #FF00FF, 0 0 6px #FF00FF;
        }
      `}</style>
    </div>
  );
};

export default MySavedRoadmapsPage;
