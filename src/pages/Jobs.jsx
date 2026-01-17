import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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
