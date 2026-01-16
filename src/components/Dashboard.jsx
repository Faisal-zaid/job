import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role === "employer") navigate("/employer-dashboard");
    else navigate("/jobseeker-dashboard");
  }, [user, navigate]);

  return <div>Redirecting...</div>;
};

export default Dashboard;
