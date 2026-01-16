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
