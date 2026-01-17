import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = ({ setUser }) => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("job_seeker");

  const [error, setError] = useState("");

  // Hook used to redirect user after successful registration
  const navigate = useNavigate();

  // Handles user registration request
  const handleRegister = async () => {
    // Send POST request to backend register endpoint
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    // Parse JSON response from server
    const data = await res.json();
    if (res.ok) {
      // Save authentication token and role in local storage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);

      // Update application user state
      setUser(data.user);

      // Redirect user based on role
      if (data.user.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobseeker-dashboard");
      }
    } else {
      // Display error message if registration fails
      setError(data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* Name input */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email input */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password input */}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Role selection */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="job_seeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>

      {/* Register button */}
      <button onClick={handleRegister}>Register</button>

      {/* Show error message if registration fails */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
