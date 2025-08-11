import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/learning-form", label: "Learning Form" },
    { path: "/view-roadmap", label: "View Roadmap" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/my-roadmaps", label: "My Roadmaps" },
  ];

  return (
    <motion.nav
      className="w-full px-6 py-4 flex justify-between items-center 
                 bg-gradient-to-r from-purple-900 via-gray-900 to-black 
                 shadow-lg border-b border-pink-500 sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
    >
      {/* Logo */}
      <motion.h2
        className="text-2xl font-extrabold text-pink-400 soft-neon"
        whileHover={{ scale: 1.05, textShadow: "0 0 8px #FF00FF" }}
      >
        RouteCrafter
      </motion.h2>

      {/* Links */}
      <div className="flex gap-6 items-center">
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" label="Login" />
            <NavLink to="/register" label="Register" />
          </>
        ) : (
          <>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                label={link.label}
                active={location.pathname === link.path}
              />
            ))}
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg text-white font-bold 
                         hover:bg-red-600 transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px #FF4D4F" }}
            >
              Logout
            </motion.button>
          </>
        )}
      </div>

      {/* Softer Neon Text Style */}
      <style>{`
        .soft-neon {
          text-shadow:
            0 0 3px #FF00FF,
            0 0 6px #FF00FF;
        }
      `}</style>
    </motion.nav>
  );
};

const NavLink = ({ to, label, active }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        to={to}
        className={`font-semibold transition-all duration-200 ${
          active
            ? "text-cyan-300 border-b-2 border-cyan-300"
            : "text-white hover:text-pink-300"
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default Navbar;
