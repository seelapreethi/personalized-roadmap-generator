// frontend/src/pages/ResourcesPage.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ResourcesPage = () => {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/resources?query=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResources(res.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black p-8 text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-pink-400 soft-neon"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        📚 Resources
      </motion.h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by topic, e.g., JavaScript"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={fetchResources}
          className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <motion.a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-gray-800 border border-pink-500 hover:border-teal-400 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 12px #FF00FF" }}
            >
              <h2 className="text-2xl font-bold text-teal-300 mb-2">
                {res.title}
              </h2>
              <p className="text-gray-300">{res.description}</p>
            </motion.a>
          ))}
        </div>
      )}

      <style>{`
        .soft-neon {
          text-shadow: 0 0 2px #FF00FF, 0 0 4px #FF00FF;
        }
      `}</style>
    </div>
  );
};

export default ResourcesPage;
