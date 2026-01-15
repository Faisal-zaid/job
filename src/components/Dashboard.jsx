import JobSeekerDashboard from "./JobSeekerDashboard";
import EmployerDashboard from "./EmployerDashboard";

function Dashboard() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user, ask to login
  if (!user) return <p>Please login first</p>;

  // Show dashboard for job seeker
  if (user.role === "job_seeker") return <JobSeekerDashboard user={user} />;

  // Show dashboard for employer
  if (user.role === "employer") return <EmployerDashboard />;

  // Unknown role
  return <p>Unknown role</p>;
}

export default Dashboard;
