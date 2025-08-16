import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LearningFormPage = () => {
  const [formData, setFormData] = useState({
    goal: "",
    skillLevel: "",
    weeklyTime: "",
    topics: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/learning-form",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Form submitted successfully!");
      console.log("Saved form:", res.data);

      setFormData({
        goal: "",
        skillLevel: "",
        weeklyTime: "",
        topics: "",
      });
    } catch (err) {
      console.error(
        "Form submission failed:",
        err.response?.data || err.message
      );
      setMessage("❌ Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-cyan-300 font-mono px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-[#0d0d0d] border border-cyan-500 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.6)] p-8"
      >
        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6 tracking-wider">
          🚀 Personalized Learning Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["goal", "skillLevel", "weeklyTime", "topics"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <label className="block text-sm text-cyan-300 mb-2 capitalize">
                {field === "weeklyTime"
                  ? "Weekly Available Time (hrs)"
                  : field === "skillLevel"
                  ? "Current Skill Level"
                  : field === "topics"
                  ? "Topics of Interest (comma-separated)"
                  : "Learning Goal"}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-black border border-cyan-600 text-cyan-200 placeholder-cyan-500
                           focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none
                           shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300"
                placeholder={`Enter your ${field}`}
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #ff00ff" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-600 
                       text-black font-bold uppercase tracking-wider
                       shadow-[0_0_15px_rgba(255,0,255,0.7)] transition-all duration-300"
          >
            Submit
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-lg font-semibold"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default LearningFormPage;
