import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Application form state
  const [name, setName] = useState("");
  const [education, setEducation] = useState("form4");
  const [cvText, setCvText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const token = localStorage.getItem("token"); // JWT token

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://backend-jobs-w76c.onrender.com/jobs/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to load job");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Could not load job. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, token]);

  const handleApply = async () => {
    if (!job || !job.id) {
      alert("Job information is not loaded yet. Refresh the page.");
      return;
    }

    if (!name || !education || !cvText || !coverLetter) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("https://backend-jobs-w76c.onrender.com/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          job_id: job.id,
          applicant_name: name,
          education,
          cv: cvText,
          cover_letter: coverLetter,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Application submitted successfully!");
        setName("");
        setEducation("form4");
        setCvText("");
        setCoverLetter("");
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>
        <strong>Type:</strong> {job.job_type}
      </p>
      <p>
        <strong>Education Required:</strong> {job.education}
      </p>
      <p>
        <strong>Company:</strong>{" "}
        {job.company?.name || job.company_name || "N/A"}
      </p>

      <hr />

      <h3>Apply for this job</h3>

      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <select value={education} onChange={(e) => setEducation(e.target.value)}>
        <option value="form4">Form 4</option>
        <option value="certificate">Certificate</option>
        <option value="diploma">Diploma</option>
        <option value="degree">Degree</option>
        <option value="masters">Masters</option>
        <option value="phd">PhD</option>
      </select>
      <br />
      <br />

      <textarea
        placeholder="Paste your CV here"
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
        rows={6}
        cols={60}
      />
      <br />
      <br />

      <textarea
        placeholder="Paste your cover letter here"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        rows={6}
        cols={60}
      />
      <br />
      <br />

      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default JobDetails;
