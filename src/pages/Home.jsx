import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>JobConnect</h1>
      <p>Find jobs or hire talent easily.</p>

      <Link to="/jobs">
        <button>Browse Jobs</button>
      </Link>

      <Link to="/register">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
