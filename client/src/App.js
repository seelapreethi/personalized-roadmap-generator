import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />


        {/* Add more routes here like Register, Dashboard later */}
      </Routes>
    </Router>
  );
}

export default App;
