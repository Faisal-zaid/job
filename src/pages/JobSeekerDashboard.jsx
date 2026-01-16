import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import JobFilter from "../components/JobFilter";
import SearchBar from "../components/SearchBar";

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // 🔹 get JWT token

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to fetch jobs");
      }

      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Jobs data is not an array");

      setJobs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Could not load jobs. Try again later.");
      setJobs([]);
    }
  };
