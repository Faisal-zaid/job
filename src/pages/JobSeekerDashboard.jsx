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

    useEffect(() => {
    fetchJobs();
  }, [token]);

  const filteredJobs = jobs.filter((job) => {
    const matchesType = !filter || job.job_type?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = !searchQuery || job.title?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesSalary = true;

    if (salaryRange && job.salary_min != null && job.salary_max != null) {
      const [min, max] = salaryRange.includes("+")
        ? [500000, Infinity]
        : salaryRange.split("-").map(Number);

      matchesSalary = job.salary_min >= min && job.salary_max <= max;
    }

    return matchesType && matchesSearch && matchesSalary;
  });