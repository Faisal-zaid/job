import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Jobs data is not an array");
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Could not load jobs. Try again later.");
      setJobs([]); // fallback empty array
    }
  };

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Available Jobs</h1>

      <SearchBar search={search} setSearch={setSearch} />

      {filteredJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <small>{job.type}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
