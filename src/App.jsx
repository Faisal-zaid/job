import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerApplications from "./pages/EmployerApplications";
import JobDetails from "./pages/JobDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from storage", error);
      }
    }
    setLoading(false);
  }, []);

  // 2. Sync user state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  if (loading) return null; // Prevents navbar flicker on refresh

  return (
    <BrowserRouter>
      {/* Navbar is correctly placed inside BrowserRouter */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Employer dashboard - protected */}
        <Route
          path="/employer-dashboard"
          element={
            user && user.role === "employer" ? (
              <EmployerDashboard user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Job seeker dashboard - protected */}
        <Route
          path="/jobseeker-dashboard"
          element={
            user && user.role === "job_seeker" ? (
              <JobSeekerDashboard user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route
          path="/employer/applications"
          element={
            user && user.role === "employer" ? (
              <EmployerApplications />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all: redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
