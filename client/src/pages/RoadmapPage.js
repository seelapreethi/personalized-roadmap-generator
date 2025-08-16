// frontend/src/pages/RoadmapPage.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const roadmapRef = useRef(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/roadmap`,
          {
            goal: "Web Development",
            skillLevel: "Beginner",
            weeklyTime: "5",
            topics: "HTML,CSS,JavaScript",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoadmap(res.data.roadmap);

        const savedProgress =
          JSON.parse(localStorage.getItem("roadmapProgress")) || {};
        setProgress(savedProgress);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("❌ Error fetching roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const handleProgressChange = (week, value) => {
    const prevValue = progress[week] || 0;
    const updatedProgress = { ...progress, [week]: value };
    setProgress(updatedProgress);
    localStorage.setItem("roadmapProgress", JSON.stringify(updatedProgress));

    if (prevValue < 100 && value === 100) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FF00FF", "#00FFFF", "#39FF14"],
      });
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    let y = 20;

    pdf.setFontSize(20);
    pdf.text("Personalized Learning Roadmap", 105, y, { align: "center" });
    y += 10;

    const today = new Date().toLocaleDateString();
    pdf.setFontSize(11);
    pdf.text(`Downloaded on: ${today}`, 105, y, { align: "center" });
    y += 10;

    pdf.setDrawColor(200);
    pdf.line(20, y, 190, y);
    y += 10;

    pdf.setFontSize(13);
    roadmap.forEach((item) => {
      const weekText = `Week ${item.week}: ${item.topic}`;
      const hoursText = `Estimated Hours: ${
        item.estimatedHours || "N/A"
      } | Progress: ${progress[item.week] || 0}%`;

      if (y + 20 > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(weekText, 20, y);
      y += 7;
      pdf.setFontSize(11);
      pdf.text(hoursText, 25, y);
      pdf.setFontSize(13);
      y += 12;
    });

    pdf.save("Personalized_Learning_Roadmap.pdf");
  };

  const handleSaveRoadmap = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/roadmap/save`,
        { roadmap, progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Roadmap saved to your profile!");
    } catch (err) {
      console.error("Error saving roadmap:", err);
      alert("❌ Failed to save roadmap.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 font-sans bg-gradient-to-tr from-gray-900 via-purple-900 to-black min-h-screen text-white">
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-cyan-400 drop-shadow-[0_0_20px_#00ffff]"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          Learning Roadmap
        </motion.h2>

        {loading ? (
          <p className="text-lg text-gray-300 text-center">Loading roadmap...</p>
        ) : error ? (
          <p className="text-red-400 text-lg text-center">{error}</p>
        ) : roadmap.length === 0 ? (
          <p className="text-gray-400 text-center">No roadmap available.</p>
        ) : (
          <div
            ref={roadmapRef}
            className="relative flex flex-col items-center gap-16"
          >
            {roadmap.map((item, index) => {
              const weekProgress = progress[item.week] || 0;
              const isCompleted = weekProgress === 100;

              return (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className="relative flex flex-col items-center"
                >
                  {/* Animated Neon Connector */}
                  {index !== 0 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 80 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="absolute -top-20 w-1 bg-gradient-to-b from-pink-500 via-cyan-400 to-lime-400 shadow-[0_0_15px_#00ffff] animate-pulse"
                    ></motion.div>
                  )}

                  {/* Roadmap Node */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`w-72 p-6 text-center rounded-2xl shadow-lg border-2
                      ${
                        isCompleted
                          ? "bg-gray-900 border-lime-400 shadow-[0_0_20px_#39FF14]"
                          : "bg-gray-800 border-cyan-400 shadow-[0_0_15px_#00ffff]"
                      }`}
                  >
                    <h3 className="text-xl font-bold text-pink-400 mb-2 drop-shadow-[0_0_10px_#ff00ff]">
                      Week {item.week}
                    </h3>
                    <p className="text-cyan-300 font-semibold">{item.topic}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Estimated Hours: {item.estimatedHours || "N/A"}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={weekProgress}
                        onChange={(e) =>
                          handleProgressChange(item.week, Number(e.target.value))
                        }
                        className="w-full accent-pink-500 cursor-pointer"
                      />
                      <span
                        className={`text-sm font-semibold ${
                          isCompleted
                            ? "text-lime-400 drop-shadow-[0_0_10px_#39FF14]"
                            : "text-cyan-300"
                        }`}
                      >
                        {weekProgress}%
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <motion.div
          className="mt-12 flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleDownloadPDF}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-[0_0_15px_#ff00ff] transition"
          >
            📄 Download as PDF
          </button>

          <button
            onClick={handleSaveRoadmap}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-[0_0_15px_#00ffff] transition"
          >
            💾 Save to Profile
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default RoadmapPage;
