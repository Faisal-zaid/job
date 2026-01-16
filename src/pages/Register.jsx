import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = ({ setUser }) => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("job_seeker");
};
