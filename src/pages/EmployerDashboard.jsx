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
    <div>
      <h2>Employer Dashboard</h2>

      {/* NAV BUTTONS */}
      <button onClick={() => setView("jobs")}>My Jobs</button>
      <button onClick={() => setView("applications")}>Applications</button>

      {/* JOB MANAGEMENT */}
      {view === "jobs" && (
        <>
          <h3>Post a Job</h3>

          <form onSubmit={addJob}>
            <label>Job Title</label>
            <input name="title" required />

            <label>Job Description</label>
            <textarea name="description" required />

            <label>Job Type</label>
            <select name="type" required>
              <option value="">Select</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="physical">Physical</option>
            </select>

            <label>Education Level</label>
            <select name="education" required>
              <option value="">Select</option>
              <option value="form 4">Form 4</option>
              <option value="certificate">Certificate</option>
              <option value="diploma">Diploma</option>
              <option value="degree">Degree</option>
              <option value="masters">Masters</option>
              <option value="phd">PhD</option>
            </select>

            <label>Company Name</label>
            <input name="company" required />

            <button type="submit">Add Job</button>
          </form>

          <h3>Your Posted Jobs</h3>

          {jobs
            .filter((job) => job.employerEmail === user.email)
            .map((job) => (
              <div
                key={job.id}
                style={{ border: "1px solid #ccc", margin: "10px" }}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p>Type: {job.type}</p>
                <p>Education: {job.education}</p>
                <p>Company: {getCompanyName(job.companyId)}</p>
                <button onClick={() => deleteJob(job.id)}>Delete</button>
              </div>
            ))}
        </>
      )}

      {/* APPLICATIONS VIEW */}
      {view === "applications" && <EmployerApplications />}
    </div>
  );
}

export default EmployerDashboard;
