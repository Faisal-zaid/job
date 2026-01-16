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

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <h2>Applications for My Jobs</h2>
      {applications.length === 0 && <p>No applications yet</p>}
      {applications.map(app => (
        <div key={app.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><strong>Job:</strong> {app.job_title}</p>
          <p><strong>Applicant:</strong> {app.applicant_name}</p>
          <p><strong>Education:</strong> {app.education}</p>
          <p><strong>Cover Letter:</strong> {app.cover_letter}</p>
          <p><strong>CV:</strong></p>
          <pre>{app.cv}</pre>
        </div>
      ))}
    </div>
  );
};

export default EmployerApplications;
