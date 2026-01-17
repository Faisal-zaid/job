import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (

    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          {user.role === "employer" && (
            <Link to="/employer-dashboard">Dashboard</Link>
          )}
          {user.role === "job_seeker" && (
            <Link to="/jobseeker-dashboard">Dashboard</Link>
          )}

          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>

    <nav>
      <Link to="/">Home</Link> | <Link to="/jobs">Jobs</Link> |{" "}
      <Link to="/signup">Get Started</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;

