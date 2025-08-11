import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login again.");
        setError(true);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
        setUser(res.data.user);
        setError(false);
      } catch (err) {
        console.error("Unauthorized or error fetching data", err);
        setMessage("❌ Unauthorized. Please login again.");
        setError(true);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-tr from-gray-900 via-purple-900 to-black">
        <motion.div
          className="max-w-xl w-full bg-gray-800 rounded-2xl shadow-lg border border-pink-500 p-6 md:p-10 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          whileHover={{ boxShadow: "0 0 8px #FF00FF, 0 0 8px #00FFFF" }}
        >
          <motion.h1
            className="text-3xl font-bold text-pink-400 soft-neon mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Hi
          </motion.h1>

          <motion.h2
            className={`text-2xl font-semibold mb-4 ${
              error ? "text-red-400" : "text-green-400"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.h2>

          {user && (
            <motion.div
              className="mt-4 space-y-2 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg">
                <span className="font-semibold text-cyan-300">Name:</span>{" "}
                {user.name || "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-cyan-300">Email:</span>{" "}
                {user.email || "No email"}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Softer Glow Style */}
        <style>{`
          .soft-neon {
            text-shadow:
              0 0 3px #FF00FF,
              0 0 6px #00FFFF;
          }
        `}</style>
      </div>
    </>
  );
};

export default DashboardPage;
