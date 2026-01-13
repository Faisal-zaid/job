import { link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.job_type}</p>
      <Link to={`/jobs/${job.id}`}>View Details</Link>
    </div>
  );
}

export default JobCard;
