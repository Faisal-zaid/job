import React, { useState, useEffect } from "react";

const EmployerDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    job_type: "remote",
    education: "form4",
    company_name: "",
    salary_min: "",
    salary_max: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  // ---------------------------
  // Fetch Jobs
  // ---------------------------
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    }
  };

  // ---------------------------
  // Fetch Applications
  // ---------------------------
  const fetchApplications = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:5000/employer/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    }
  };

  // ---------------------------
  // Run on Mount
  // ---------------------------
  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // ---------------------------
  // Add Job
  // ---------------------------
  const handleAddJob = async () => {
    if (!form.title || !form.description || !form.company_name) {
      alert("Title, Description, and Company Name are required");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min ? Number(form.salary_min) : null,
          salary_max: form.salary_max ? Number(form.salary_max) : null,
          location: form.job_type === "remote" ? null : form.location,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Job added successfully!");
        setForm({
          title: "",
          description: "",
          job_type: "remote",
          education: "form4",
          company_name: "",
          salary_min: "",
          salary_max: "",
          location: "",
        });
        fetchJobs();
        fetchApplications();
      } else {
        alert(data.message || "Failed to add job");
      }
    } catch (err) {
      console.error("Add job error:", err);
      alert("Something went wrong");
    }
  };

  // ---------------------------
  // Delete Job
  // ---------------------------
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchJobs();
        fetchApplications();
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      console.error("Delete job error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employer Dashboard</h2>

      {/* Add Job */}
      <div>
        <h3>Add Job</h3>
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />

        <select value={form.job_type}
          onChange={e => setForm({ ...form, job_type: e.target.value })}>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="physical">Physical</option>
        </select>

        <select value={form.education}
          onChange={e => setForm({ ...form, education: e.target.value })}>
          <option value="form4">Form 4</option>
          <option value="certificate">Certificate</option>
          <option value="diploma">Diploma</option>
          <option value="degree">Degree</option>
          <option value="masters">Masters</option>
          <option value="phd">PhD</option>
        </select>

        <input placeholder="Company Name" value={form.company_name}
          onChange={e => setForm({ ...form, company_name: e.target.value })} />

        <input type="number" placeholder="Min Salary" value={form.salary_min}
          onChange={e => setForm({ ...form, salary_min: e.target.value })} />

        <input type="number" placeholder="Max Salary" value={form.salary_max}
          onChange={e => setForm({ ...form, salary_max: e.target.value })} />

        {form.job_type !== "remote" && (
          <input placeholder="Location" value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })} />
        )}

        <button onClick={handleAddJob}>Add Job</button>
      </div>

      {/* Jobs */}
      <h3>My Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs yet</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <p>Salary: {job.salary_min && job.salary_max
              ? `${job.salary_min} - ${job.salary_max}`
              : "Not specified"}
            </p>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerDashboard;
