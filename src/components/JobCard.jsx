import React from "react";
import { Link } from "react-router-dom";

// receives a single job object as a prop
const JobCard = ({ job }) => {
  return (
    // Wrapper container for individual job information
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>Type: {job.job_type}</p>
      <p>Education: {job.education}</p>
      <p>Company: {job.company ? job.company.name : "N/A"}</p>
      <p>
        Salary:{" "}
        {job.salary_min && job.salary_max
          ? `$${job.salary_min} - $${job.salary_max}`
          : "Not specified"}
      </p>
    </div>
  );
};

export default JobCard;
