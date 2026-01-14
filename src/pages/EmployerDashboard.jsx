import { useState } from "react";
import EmployerApplications from "./EmployerApplications";

function EmployerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [view, setView] = useState("jobs");
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [companies, setCompanies] = useState(
    JSON.parse(localStorage.getItem("companies")) || []
  );

  // --- Styles Object ---
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    header: {
      color: "#1a73e8",
      borderBottom: "2px solid #e1e4e8",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    nav: { display: "flex", gap: "10px", marginBottom: "30px" },
    navBtn: (active) => ({
      padding: "10px 20px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      backgroundColor: active ? "#1a73e8" : "#e1e7f0",
      color: active ? "white" : "#1a73e8",
      fontWeight: "bold",
      transition: "0.3s",
    }),
    form: {
      backgroundColor: "#f0f7ff",
      padding: "25px",
      borderRadius: "8px",
      border: "1px solid #c2d7ff",
      marginBottom: "40px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "600",
      color: "#2c3e50",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "4px",
      border: "1px solid #b4c5e4",
      boxSizing: "border-box",
    },
    submitBtn: {
      backgroundColor: "#1a73e8",
      color: "white",
      padding: "12px 24px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
    },
    jobCard: {
      border: "1px solid #e1e4e8",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "15px",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    deleteBtn: {
      backgroundColor: "#ff4d4d",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    badge: {
      backgroundColor: "#e1f0ff",
      color: "#1a73e8",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      marginRight: "10px",
      fontWeight: "bold",
    },
  };

  function addJob(e) {
    e.preventDefault();
    const form = e.target;
    const companyName = form.company.value.trim();
    let company = companies.find(
      (c) => c.name.toLowerCase() === companyName.toLowerCase()
    );

    if (!company) {
      company = { id: Date.now(), name: companyName };
      const updatedCompanies = [...companies, company];
      setCompanies(updatedCompanies);
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    }

    const newJob = {
      id: Date.now(),
      title: form.title.value,
      description: form.description.value,
      type: form.type.value,
      education: form.education.value,
      companyId: company.id,
      employerEmail: user.email,
    };

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    form.reset();
  }

  function deleteJob(jobId) {
    const password = prompt("Enter your password to delete this job:");
    if (password !== user.password) {
      alert("Incorrect password.");
      return;
    }
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  }

  function getCompanyName(companyId) {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown Company";
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employer Dashboard</h2>

      <div style={styles.nav}>
        <button
          style={styles.navBtn(view === "jobs")}
          onClick={() => setView("jobs")}>
          My Jobs
        </button>
        <button
          style={styles.navBtn(view === "applications")}
          onClick={() => setView("applications")}>
          Applications
        </button>
      </div>

      {view === "jobs" && (
        <>
          <h3 style={{ color: "#2c3e50" }}>Post a New Position</h3>
          <form onSubmit={addJob} style={styles.form}>
            <label style={styles.label}>Job Title</label>
            <input
              name="title"
              required
              style={styles.input}
              placeholder="e.g. Senior Software Engineer"
            />

            <label style={styles.label}>Job Description</label>
            <textarea
              name="description"
              required
              style={{ ...styles.input, height: "100px" }}
            />

            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Job Type</label>
                <select name="type" required style={styles.input}>
                  <option value="">Select</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="physical">Physical</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Education Level</label>
                <select name="education" required style={styles.input}>
                  <option value="">Select</option>
                  <option value="form 4">Form 4</option>
                  <option value="certificate">Certificate</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Degree</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>

            <label style={styles.label}>Company Name</label>
            <input name="company" required style={styles.input} />

            <button type="submit" style={styles.submitBtn}>
              Post Job Listing
            </button>
          </form>

          <h3 style={{ color: "#2c3e50" }}>Your Active Listings</h3>
          {jobs
            .filter((job) => job.employerEmail === user.email)
            .map((job) => (
              <div key={job.id} style={styles.jobCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                  <div>
                    <h4
                      style={{
                        margin: "0 0 10px 0",
                        color: "#1a73e8",
                        fontSize: "20px",
                      }}>
                      {job.title}
                    </h4>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        color: "#666",
                        lineHeight: "1.5",
                      }}>
                      {job.description}
                    </p>
                    <div style={{ marginTop: "10px" }}>
                      <span style={styles.badge}>{job.type.toUpperCase()}</span>
                      <span style={styles.badge}>{job.education}</span>
                      <span style={{ fontSize: "14px", color: "#555" }}>
                        🏢 {getCompanyName(job.companyId)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteJob(job.id)}
                    style={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </>
      )}

      {view === "applications" && <EmployerApplications />}
    </div>
  );
}

export default EmployerDashboard;
