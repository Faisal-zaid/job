
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/jobs">Jobs</Link> |{" "}
      <Link to="/signup">Get Started</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;