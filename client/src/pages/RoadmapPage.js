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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      <div className="p-6 text-center font-sans bg-gradient-to-tr from-gray-900 via-purple-900 to-black min-h-screen text-white">
        <h2 className="text-4xl font-bold mb-10 text-teal-300 drop-shadow-lg">
          🚀 Your Personalized Learning Roadmap
        </h2>

        {loading ? (
          <p className="text-lg text-gray-300">Loading roadmap...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : roadmap.length === 0 ? (
          <p className="text-gray-400">No roadmap available.</p>
        ) : (
          <>
            <div
              ref={roadmapRef}
              className="relative max-w-3xl mx-auto pl-8 border-l-4 border-teal-300"
            >
              {roadmap.map((item, index) => {
                const weekProgress = progress[item.week] || 0;
                const isCompleted = weekProgress === 100;

                return (
                  <motion.div
                    key={item.week}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 70,
                    }}
                    className={`relative mb-10 pl-6 ${
                      isCompleted
                        ? "border-l-4 border-lime-400 animate-pulse"
                        : ""
                    }`}
                  >
                    {/* Timeline Dot */}
                    <span
                      className={`absolute -left-4 top-2 w-6 h-6 rounded-full border-4 ${
                        isCompleted
                          ? "border-lime-400 bg-lime-300"
                          : "border-teal-400 bg-teal-300"
                      } shadow-lg`}
                    ></span>

                    {/* Card */}
                    <div
                      className={`p-4 rounded-lg shadow-lg border-2 ${
                        isCompleted
                          ? "bg-gray-800 border-lime-400"
                          : "bg-gray-800 border-teal-400"
                      }`}
                    >
                      <strong className="text-xl text-pink-400">
                        Week {item.week}:
                      </strong>{" "}
                      <span className="text-teal-300">{item.topic}</span>
                      <br />
                      <span className="text-sm text-gray-300">
                        Estimated Hours: {item.estimatedHours || "N/A"}
                      </span>

                      <div className="mt-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="10"
                          value={weekProgress}
                          onChange={(e) =>
                            handleProgressChange(
                              item.week,
                              Number(e.target.value)
                            )
                          }
                          className="w-full accent-pink-400"
                        />
                        <span
                          className={`text-sm font-semibold ${
                            isCompleted
                              ? "text-lime-400"
                              : "text-gray-300"
                          }`}
                        >
                          {weekProgress}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleDownloadPDF}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded shadow-lg"
              >
                📄 Download as PDF
              </button>

              <button
                onClick={handleSaveRoadmap}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded shadow-lg"
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
