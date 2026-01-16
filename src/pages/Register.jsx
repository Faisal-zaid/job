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
  };

  // Parse JSON response from server
  //NOTE: Temporarily commented out because 'await' can't be used outside an async function

  //const data = await res.json();
  if (res.ok) {
    // Save authentication token and role in local storage
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.user.role);
  }
};
