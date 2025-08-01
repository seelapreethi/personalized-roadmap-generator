import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LearningFormPage from './pages/LearningFormPage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
<Route path="/learning-form" element={<LearningFormPage />} />
<Route path="/form" element={<FormPage />} />



        {/* Add more routes here like Register, Dashboard later */}
      </Routes>
    </Router>
  );
}

export default App;
