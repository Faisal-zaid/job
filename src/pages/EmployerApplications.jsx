import React, { useState, useEffect } from "react";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/employer/applications", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setApplications(data.applications || []);
  } catch (err) {
    console.error("Error fetching applications:", err);
    setApplications([]);
  }
};
