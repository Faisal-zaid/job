import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams(); // get job id from route
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const jobFound = jobs.find((j) => j.id === parseInt(id));
    setJob(jobFound);

    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);

    // Check if user already applied
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    const alreadyApplied = applications.some(
      (app) =>
        app.jobId === parseInt(id) && app.userEmail === currentUser?.email
    );
    setApplied(alreadyApplied);
  }, [id]);

  function applyJob(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    applications.push({
      jobId: job.id,
      jobTitle: job.title,
      employerEmail: job.employerEmail,
      applicantName: formData.get("name"),
      applicantEmail: formData.get("email"),
      coverLetter: formData.get("coverLetter"),
      cv: formData.get("cv").name,
      appliedAt: new Date().toISOString(),
    });

    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Application submitted successfully!");
    setApplied(true);
    form.reset();
  }

  function getCompanyName(companyId) {
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown Company";
  }

  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {getCompanyName(job.companyId)}
      </p>
      <p>
        <strong>Type:</strong> {job.type}
      </p>
      <p>
        <strong>Education Required:</strong> {job.education}
      </p>
      <p>{job.description}</p>

      {user?.role === "job_seeker" && !applied && (
        <form onSubmit={applyJob}>
          <h3>Apply for this job</h3>

          <label>Name</label>
          <input name="name" defaultValue={user.name} required />

          <label>Email</label>
          <input name="email" defaultValue={user.email} required />

          <label>Cover Letter</label>
          <textarea name="coverLetter" required />

          <label>Upload CV</label>
          <input type="file" name="cv" required />

          <button type="submit">Submit Application</button>
        </form>
      )}

      {applied && <p>You have already applied for this job.</p>}
    </div>
  );
}

export default JobDetails;
