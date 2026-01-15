import JobSeekerDashboard from "./JobSeekerDashboard";
import EmployerDashboard from "./EmployerDashboard";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login first</p>;
  }

  if (user.role === "job_seeker") {
    return <JobSeekerDashboard user={user} />;
  }
}
